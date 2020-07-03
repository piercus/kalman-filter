const matMul = require('../lib/linalgebra/mat-mul.js');
const transpose = require('../lib/linalgebra/transpose.js');
const add = require('../lib/linalgebra/add.js');
const invert = require('../lib/linalgebra/invert.js');
const sub = require('../lib/linalgebra/sub.js');
const getIdentity = require('../lib/linalgebra/identity.js');
const State = require('./state.js');

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

/**
* @class
* @property {DynamicConfig} dynamic the system's dynamic model
* @property {ObservationConfig} observation the system's observation model
*/
class CoreKalmanFilter {
	/**
	* @param {DynamicConfig} dynamic
	* @param {ObservationConfig} observation the system's observation model
	*/

	constructor({dynamic, observation}) {
		this.dynamic = dynamic;
		this.observation = observation;
	}

	getValue(fn, {opts} = {}) {
		return (typeof (fn) === 'function' ? fn({opts}) : fn);
	}

	/**
	This will return the new prediction, relatively to the dynamic model chosen
	* @param {State} previousCorrected State relative to our dynamic model
	* @returns{State} predicted State
	*/

	predict({previousCorrected} = {}) {
		const {mean: meanInit, covariance: covarianceInit, index: indexInit} = this.dynamic.init;
		const initState = new State({
			mean: meanInit,
			covariance: covarianceInit,
			index: indexInit});
		previousCorrected = previousCorrected || initState;

		State.check(previousCorrected, {dimension: this.dynamic.dimension});

		const d = this.getValue(this.dynamic.transition);
		const dTransposed = transpose(d);

		const mean = matMul(d, previousCorrected.mean);

		const covarianceInter = matMul(d, previousCorrected.covariance);
		const covariancePrevious = matMul(covarianceInter, dTransposed);
		const dynCov = this.getValue(this.dynamic.covariance);

		const covariance = add(
			dynCov,
			covariancePrevious
		);

		const index = previousCorrected.index + 1;

		const predicted = new State({mean, covariance, index});

		return predicted;
	}
	/**
	This will return the new correction, taking into account the prediction made
	and the observation of the sensor
	* @param {State} predicted the previous State
	* @returns{Array<Array>} kalmanGain
	*/

	getGain({predicted}) {
		const obsCovariance = this.getValue(this.observation.covariance);
		const stateProj = this.getValue(this.observation.stateProjection);
		const stateProjTransposed = transpose(stateProj);

		const noiselessInnovation = matMul(
			matMul(stateProj, predicted.covariance),
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
	This will return the new correction, taking into account the prediction made
	and the observation of the sensor
	* @param {State} predicted the previous State
	* @param {Array} observation the observation of the sensor
	* @returns{State} corrected State of the Kalman Filter
	*/

	correct({predicted, observation}) {
		State.check(predicted, {dimension: this.dynamic.dimension});
		if (!observation) {
			throw (new Error('no measure available'));
		}

		const identity = getIdentity(predicted.covariance.length);
		const stateProj = this.getValue(this.observation.stateProjection);

		const optimalKalmanGain = this.getGain({predicted});
		const innovation = sub(
			observation,
			matMul(stateProj, predicted.mean)
		);
		const mean = add(
			predicted.mean,
			matMul(optimalKalmanGain, innovation)
		);

		const covariance = matMul(
			sub(identity, matMul(optimalKalmanGain, stateProj)),
			predicted.covariance
		);
		const corrected = new State({mean, covariance, index: predicted.index});
		return corrected;
	}
}

module.exports = CoreKalmanFilter;
