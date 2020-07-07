const CoreKalmanFilter = require('./core-kalman-filter.js');
const diag = require('../lib/linalgebra/diag.js');


const arrayToFunction = function (array) {
	if (typeof(array) === 'function') {
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
*@param {Object} elementModel the part of the model (dynamic or observation), to transform
*@returns {Object} transformed element of the model
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

const simpleArrayToMatrix = function (array) {
	return array.map(el => [el])
};

const arrayToMatrix = function (observation) {
	if (!Array.isArray(observation)) {
		throw (new Error('The observation should be an array'))
	};
	if (typeof(observation[0] === 'number')) {
		return simpleArrayToMatrix(observation)
	}
	return observation.map(el => simpleArrayToMatrix(el));
}

class KalmanFilter extends CoreKalmanFilter {
	constructor({observation, dynamic}) {
		const {observation: coreObservation, dynamic: coreDynamic} = elementsToFunction({observation, dynamic});
		super({dynamic: coreDynamic, observation: coreObservation});
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

	/**
	* @param {DynamicConfig} dynamic
	* @param {ObservationConfig} observation the system's observation model
	*/
}

module.exports = KalmanFilter;
