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
*@param {Object} model the model (dynamic or observation), to transform
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

const useModel = function ({options, registeredModels, name}) {
	if (name) {
		if (typeof (registeredModels[name]) !== 'undefined') {
			return Object.assign({}, options, registeredModels[name]);
		}
	}

	return options;
};

const setDimensions = function ({options}) {
	const stateProjection = options.observation.stateProjection;
	const transition = options.dynamic.transition;
	const dynamicDimension = options.dynamic.dimension;
	const observationDimension = options.observation.dimension;

	if (dynamicDimension && observationDimension && Array.isArray(stateProjection)) {
		if (dynamicDimension !== stateProjection[0].length || observationDimension !== stateProjection.length) {
			throw (new TypeError('stateProjection dimensions not matching with observation and dynamic dimensions'));
		}
	}

	if (dynamicDimension && Array.isArray(transition)) {
		if (dynamicDimension !== transition.length) {
			throw (new TypeError('transition dimension not matching with dynamic dimension'));
		}
	}

	if (Array.isArray(stateProjection)) {
		return Object.assign({}, options, {
			observation: Object.assign({}, options.observation, {
				dimension: stateProjection.length
			}),
			dynamic: Object.assign({}, options.dynamic, {
				dimension: stateProjection[0].length
			})
		});
	}

	if (Array.isArray(transition)) {
		return Object.assign({}, options, {
			dynamic: Object.assign({}, options.dynamic, {
				dimension: transition.length
			})
		});
	}

	return options;
};

const checkDimensions = function ({options}) {
	const dynamicDimension = options.dynamic.dimension;
	const observationDimension = options.observation.dimension;
	if (!dynamicDimension || !observationDimension) {
		throw (new TypeError('Dimension is not set'));
	}

	return options;
};

/**
*This function returns the stateProjection paded with zeros with respect to a given
*observedProjection
*@param {Array} array
*@param {Number} dimension in our case, the dynamic dimension
*@returns {Array} paded array
*/
const padWithZeros = function (array, {dimension}) {
	const l = array.length;
	if (dimension < l) {
		throw (new TypeError('Dynamic dimension does not match with observedProjection'));
	}

	for (let i = 0; i < l; i++) {
		for (let j = 0; j < dimension - l; j++) {
			array[i].push(0);
		}
	}

	return array;
};

const buildStateProjection = function ({options}) {
	const observedProjection = options.observation.observedProjection;
	if (observedProjection && options.observation.stateProjection) {
		throw (new TypeError('You cannot use both observedProjection and stateProjection'));
	}

	if (observedProjection) {
		const withStateProjectionOptions = Object.assign({}, options, {
			observation: Object.assign({}, options.observation, {
				stateProjection: padWithZeros(observedProjection, {dimension: options.dynamic.dimension})
			})
		});
		return withStateProjectionOptions;
	}

	return options;
};

const withInit = function ({options}) {
	if (!options.dynamic.init) {
		const huge = 1e6;
		const dynamicDimension = options.dynamic.dimension;
		const meanArray = new Array(dynamicDimension).fill(0);
		const covarianceArray = new Array(dynamicDimension).fill(huge);
		const withInitOptions = Object.assign({}, options, {
			dynamic: Object.assign({}, options.dynamic, {
				init: {
					mean: meanArray.map(element => [element]),
					covariance: diag(covarianceArray)
				}
			})
		});
		return withInitOptions;
	}

	return options;
};

/**
*This function fills the given options by successively checking if it uses a registered model,
* it builds and checks the dynamic and observation dimensions, build the stateProjection if only observedProjection
*is given, and initialize dynamic.init
*@param {DynamicConfig} options.dynamic
*@param {ObservationConfig} options.observation
*/

const fill = function (options) {
	const modelOptions = useModel({
		options,
		registeredModels: KalmanFilter.registeredObservationModels,
		name: options.observation.name
	});
	const modelsOptions = useModel({
		options: modelOptions,
		registeredModels: KalmanFilter.registeredDynamicModels,
		name: options.dynamic.name
	});
	const withDimensionOptions = setDimensions({options: modelsOptions});
	const checkedDimensionOptions = checkDimensions({options: withDimensionOptions});
	const buildStateProjectionOptions = buildStateProjection({options: checkedDimensionOptions});
	return withInit({options: buildStateProjectionOptions});
};

// const registeredObservationModels = {};
// const registeredDynamicModels = {};

class KalmanFilter extends CoreKalmanFilter {
	/**
	* @param {DynamicConfig} options.dynamic
	* @param {ObservationConfig} options.observation the system's observation model
	*/
	constructor(options) {
		const filledOptions = fill(options);
		const coreOptions = elementsToFunction(filledOptions);
		// Const coreOptions = elementsToFunction(options);
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
