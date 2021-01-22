const matMul = require('../lib/linalgebra/mat-mul.js');
const transpose = require('../lib/linalgebra/transpose.js');
const add = require('../lib/linalgebra/add.js');
const invert = require('../lib/linalgebra/invert.js');
const sub = require('../lib/linalgebra/sub.js');
const getIdentity = require('../lib/linalgebra/identity.js');
const State = require('./state.js');
const checkMatrix = require('./utils/check-matrix.js');
/**
* @callback ObservationCallback
* @param {Object} opts
* @param {Number} opts.index
* @param {Number} opts.previousCorrected
*/

/**
* @typedef {Object} ObservationConfig
* @property {Number} dimension
* @property {Array.Array.<Number>> | ObservationCallback} stateProjection,
* @property {Array.Array.<Number>> | ObservationCallback} covariance
*/

/**
* @callback DynamicCallback
* @param {Object} opts
* @param {Number} opts.index
* @param {State} opts.predicted
* @param {Observation} opts.observation
*/

/**
* @typedef {Object} DynamicConfig
* @property {Number} dimension
* @property {Array.Array.<Number>> | DynamicCallback} transition,
* @property {Array.Array.<Number>> | DynamicCallback} covariance
*/

const defaultLogger = {
	info: (...args) => console.log(...args),
	debug: () => {},
	warn: (...args) => console.log(...args),
	error: (...args) => console.log(...args)
};

/**
* @class
* @property {DynamicConfig} dynamic the system's dynamic model
* @property {ObservationConfig} observation the system's observation model
*@property logger a Winston-like logger
*/
class CoreKalmanFilter {
	/**
	* @param {DynamicConfig} dynamic
	* @param {ObservationConfig} observation the system's observation model
	*/

	constructor({dynamic, observation, logger = defaultLogger}) {
		this.dynamic = dynamic;
		this.observation = observation;
		this.logger = logger;
	}

	getValue(fn, options) {
		return (typeof (fn) === 'function' ? fn(options) : fn);
	}

	getInitState() {
		const {mean: meanInit, covariance: covarianceInit, index: indexInit} = this.dynamic.init;
		const initState = new State({
			mean: meanInit,
			covariance: covarianceInit,
			index: indexInit
		});
		return initState;
	}

	/**
	This will return the predicted covariance of a given previousCorrected State, this will help us to build the asymptoticState.
	* @param {State} previousCorrected
	* @returns{Array.<Array.<Number>>}
	*/

	getPredictedCovariance(options = {}) {
		let {previousCorrected, index} = options;
		previousCorrected = previousCorrected || this.getInitState();

		const getValueOptions = Object.assign({}, {previousCorrected, index}, options);
		const d = this.getValue(this.dynamic.transition, getValueOptions);
		const dTransposed = transpose(d);
		const covarianceInter = matMul(d, previousCorrected.covariance);
		const covariancePrevious = matMul(covarianceInter, dTransposed);
		const dynCov = this.getValue(this.dynamic.covariance, getValueOptions);

		const covariance = add(
			dynCov,
			covariancePrevious
		);
		checkMatrix(covariance, [this.dynamic.dimension, this.dynamic.dimension], 'predicted.covariance');

		return covariance;
	}

	/**
	This will return the new prediction, relatively to the dynamic model chosen
	* @param {State} previousCorrected State relative to our dynamic model
	* @returns{State} predicted State
	*/

	predict(options = {}) {
		let {previousCorrected, index} = options;
		previousCorrected = previousCorrected || this.getInitState();

		if (typeof (index) !== 'number' && typeof (previousCorrected.index) === 'number') {
			index = previousCorrected.index + 1;
		}

		State.check(previousCorrected, {dimension: this.dynamic.dimension});

		const getValueOptions = Object.assign({}, {
			previousCorrected,
			index
		}, options);
		const d = this.getValue(this.dynamic.transition, getValueOptions);

		checkMatrix(d, [this.dynamic.dimension, this.dynamic.dimension], 'dynamic.transition');

		const mean = matMul(d, previousCorrected.mean);

		const covariance = this.getPredictedCovariance(getValueOptions);

		const predicted = new State({mean, covariance, index});
		this.logger.debug('Prediction done', predicted);

		return predicted;
	}
	/**
	This will return the new correction, taking into account the prediction made
	and the observation of the sensor
	* @param {State} predicted the previous State
	* @returns{Array<Array>} kalmanGain
	*/

	getGain(options) {
		let {predicted, stateProjection} = options;
		const getValueOptions = Object.assign({}, {index: predicted.index}, options);
		stateProjection = stateProjection || this.getValue(this.observation.stateProjection, getValueOptions);
		const obsCovariance = this.getValue(this.observation.covariance, getValueOptions);
		checkMatrix(obsCovariance, [this.observation.dimension, this.observation.dimension], 'observation.covariance');

		const stateProjTransposed = transpose(stateProjection);
		const noiselessInnovation = matMul(
			matMul(stateProjection, predicted.covariance),
			stateProjTransposed
		);

		const innovationCovariance = add(noiselessInnovation, obsCovariance);

		const optimalKalmanGain = matMul(
			matMul(predicted.covariance, stateProjTransposed),
			invert(innovationCovariance)
		);

		return optimalKalmanGain;
	}

	/**
	This will return the corrected covariance of a given predicted State, this will help us to build the asymptoticState.
	* @param {State} predicted the previous State
	* @returns{Array.<Array.<Number>>}
	*/

	getCorrectedCovariance(options) {
		let {predicted, optimalKalmanGain, stateProjection} = options;
		const identity = getIdentity(predicted.covariance.length);
		if (!stateProjection) {
			const getValueOptions = Object.assign({}, {index: predicted.index}, options);
			stateProjection = this.getValue(this.observation.stateProjection, getValueOptions);
		}

		if (!optimalKalmanGain) {
			optimalKalmanGain = this.getGain(Object.assign({stateProjection}, options));
		}

		return matMul(
			sub(identity, matMul(optimalKalmanGain, stateProjection)),
			predicted.covariance
		);
	}

	/**
	This will return the new correction, taking into account the prediction made
	and the observation of the sensor
	* @param {State} predicted the previous State
	* @param {Array} observation the observation of the sensor
	* @returns{State} corrected State of the Kalman Filter
	*/

	correct(options) {
		const {predicted, observation} = options;
		State.check(predicted, {dimension: this.dynamic.dimension});
		if (!observation) {
			throw (new Error('no measure available'));
		}

		const getValueOptions = Object.assign({}, {observation, predicted, index: predicted.index}, options);
		const stateProjection = this.getValue(this.observation.stateProjection, getValueOptions);

		const optimalKalmanGain = this.getGain(Object.assign({predicted, stateProjection}, options));

		const innovation = sub(
			observation,
			matMul(stateProjection, predicted.mean)
		);
		const mean = add(
			predicted.mean,
			matMul(optimalKalmanGain, innovation)
		);
		if (Number.isNaN(mean[0][0])) {
			console.log({optimalKalmanGain, innovation, predicted});
			throw (new TypeError('Mean is NaN after correction'));
		}

		const covariance = this.getCorrectedCovariance(Object.assign({predicted, optimalKalmanGain, stateProjection}, options));
		const corrected = new State({mean, covariance, index: predicted.index});
		this.logger.debug('Correction done', corrected);
		return corrected;
	}
}

module.exports = CoreKalmanFilter;
