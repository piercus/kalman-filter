const CoreKalmanFilter = require('./core-kalman-filter.js');
const diag = require('../lib/linalgebra/diag.js');

const arrayToFunction = function (array) {
	if (typeof (array) === 'function') {
		return array;
	}

	if (!(Array.isArray(array))) {
		throw (new TypeError('Only arrays and function are authorized'));
	}

	if ((Array.isArray(array)) && (Array.isArray(array[0]))) {
		return function () {
			return array;
		};
	}

	if ((Array.isArray(array)) && (typeof (array[0]) === 'number')) {
		const equivalentArray = diag(array);
		return function () {
			return equivalentArray;
		};
	}
};

/**
*@param {Object} Model the model (dynamic or observation), to transform
*@returns {Object} model with respect of the Core Kalman Filter properties
*/
const elementsToFunction = function ({observation, dynamic}) {
	const modelToBeChanged = {observation, dynamic};
	const changedModel = Object.assign({}, modelToBeChanged, {
		observation: Object.assign({}, modelToBeChanged.observation, {
			stateProjection: arrayToFunction(modelToBeChanged.observation.stateProjection),
			covariance: arrayToFunction(modelToBeChanged.observation.covariance)
		}),
		dynamic: Object.assign({}, modelToBeChanged.dynamic, {
			transition: arrayToFunction(modelToBeChanged.dynamic.transition),
			covariance: arrayToFunction(modelToBeChanged.dynamic.covariance)
		})
	});
	return changedModel;
};

/**
*Returns the corresponding matrix in dim*1, given an dim matrix, and checks
* if corresponding with the observation dimension
*@param {Array} observation
*@param {Number} dimension
*@returns {Array<Array>}
*/

const arrayToMatrix = function ({observation, dimension}) {
	if (!Array.isArray(observation)) {
		throw (new TypeError('The observation should be an array'));
	}

	if (observation.length !== dimension) {
		throw (new TypeError('Observation and dimension not matching'));
	}

	if (typeof (observation[0]) === 'number') {
		return observation.map(element => [element]);
	}

	return observation;
};

class KalmanFilter extends CoreKalmanFilter {
	/**
	* @param {DynamicConfig} options.dynamic
	* @param {ObservationConfig} options.observation the system's observation model
	*/
	constructor(options) {
		const coreOptions = elementsToFunction(options);
		super(Object.assign({}, options, coreOptions));
	}

	correct({predicted, observation}) {
		const coreObservation = arrayToMatrix({observation, dimension: this.observation.dimension});
		return super.correct({predicted, observation: coreObservation});
	}

	/**
  * Returns an estimation of the asymptotic state covariance as explained in https://en.wikipedia.org/wiki/Kalman_filter#Asymptotic_form
  * in practice this can be used as a init.covariance value but is very costful calculation (that's why this is not made by default)
  * @param {Number} [tolerance=1e-6] returns when the last values differences are less than tolerance
  * @return {<Array.<Array.<Number>>>} covariance
  */
	asymptoticStateCovariance() {
	}

	/**
  * Returns an estimation of the asymptotic gain, as explained in https://en.wikipedia.org/wiki/Kalman_filter#Asymptotic_form
  * @param {Number} [tolerance=1e-6] returns when the last values differences are less than tolerance
  * @return {<Array.<Array.<Number>>>} gain
  */
	asymptoticGain() {
	}
}

module.exports = KalmanFilter;
