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
* @property {DynamicConfig} dynamic
* @property {ObservationConfig} observation
*/
class CoreKalmanFilter {
	/**
	* @param {DynamicConfig} dynamic
	* @param {ObservationConfig} observation
	*/
	constructor({dynamic, observation}) {
		this.dynamic = dynamic;
		this.observation = observation;
	}

	getValue(fn) {
		return (typeof (fn) === 'function' ? fn() : fn);
	}

	/**
	This will return the new prediction, relatively to the dynamic model chosen
	* @param {State} previousCorrected the previous State
	* @returns{State} predicted State
	*/
	predict({previousCorrected}) {
		if (!previousCorrected) {
			previousCorrected = this.dynamic.init;
		}

		const d = this.getValue(this.dynamic.transition);
		const dTransposed = transpose(d);

		const predicted = new State({});
		predicted.mean = matMul(d, previousCorrected.mean);

		const covarianceInter = matMul(d, previousCorrected.covariance);
		const covariancePrev = matMul(covarianceInter, dTransposed);
		const dynCov = this.getValue(this.dynamic.covariance);

		predicted.covariance = add(
			dynCov,
			covariancePrev
		);

		predicted.index = previousCorrected.index + 1;

		return predicted;
	}

	/**
	This will return the new correction, taking into account the prediction made
	and the observation of the sensor
	* @param {State} predicted the previous State
	* @param {Array} observation the observation of the sensor
	* @returns{State} corrected State of the Kalman Filter
	*/
	correct({predicted, observation}) {
		if (!observation) {
			throw (new Error('no measure available'));
		}
		//console.log("The predicted state is: ", predicted)
		//console.log("The observation covariance is: ", this.getValue(this.observation.covariance))
		const corrected = new State({});

		const identity = getIdentity(predicted.covariance.length);
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
		console.log("Gain: ", optimalKalmanGain);
		const innovation = sub(
			observation,
			matMul(stateProj, predicted.mean)
		);
		corrected.mean = add(
			predicted.mean,
			matMul(optimalKalmanGain, innovation)
		);

		corrected.covariance = matMul(
			sub(identity, matMul(optimalKalmanGain, stateProj)),
			predicted.covariance
		);
		corrected.index = predicted.index;
		//console.log("The corrected state is: ", corrected)

		return corrected;
	}
}

const defaultOptions = {
	observation: {
		dimension: 1,
		stateProjection(opts) {
			return [
				[1]
			];
		},

		covariance(opts) {
			return [
				[1]
			];
		}
	},

	dynamic: {
		dimension: 1,
		init: {
			mean: [[0]],

			covariance: [
				[1]
			]
		},
		transition(opts) { // Constant position model
			return [
				[1]
			];
		},

		covariance(opts) {
			return [
				[1]
			];
		}
	}

};

// const kf1 = new CoreKalmanFilter({
// 	dynamic: defaultOptions.dynamic,
// 	observation: defaultOptions.observation
// });
// const previousCorrected = new State({
// 	mean: [[2]],
// 	covariance: [[1]],
// 	index: 1
// });
//
// console.log("Prediction", kf1.predict({previousCorrected}));


module.exports = CoreKalmanFilter;
