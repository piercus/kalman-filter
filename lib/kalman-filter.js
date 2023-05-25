
const {frobenius: distanceMat} = require('simple-linalg');
const arrayToMatrix = require('../lib/utils/array-to-matrix.js');
const setDimensions = require('../lib/setup/set-dimensions.js');
const checkDimensions = require('../lib/setup/check-dimensions.js');
const buildStateProjection = require('../lib/setup/build-state-projection.js');
const extendDynamicInit = require('../lib/setup/extend-dynamic-init.js');
const toFunction = require('../lib/utils/to-function.js');
const deepAssign = require('../lib/utils/deep-assign.js');
const polymorphMatrix = require('../lib/utils/polymorph-matrix.js');
const State = require('./state.js');
const modelCollection = require('./model-collection.js');
const CoreKalmanFilter = require('./core-kalman-filter.js');

/**
 * @typedef {String} DynamicNonObjectConfig
 */
/**
 * @typedef {DynamicConfig} DynamicObjectConfig
 * @property {String} name
 */
/**
 * @param {DynamicNonObjectConfig} dynamic
 * @returns {DynamicObjectConfig}
 */

const buildDefaultDynamic = function (dynamic) {
	if (typeof (dynamic) === 'string') {
		return {name: dynamic};
	}

	return {name: 'constant-position'};
};

/**
 * @typedef {String | Number} ObservationNonObjectConfig
 */
/**
 * @typedef {ObservationConfig} ObservationObjectConfig
 * @property {String} name
 */
/**
 * @param {ObservationNonObjectConfig} observation
 * @returns {ObservationObjectConfig}
 */
const buildDefaultObservation = function (observation) {
	if (typeof (observation) === 'number') {
		return {name: 'sensor', sensorDimension: observation};
	}

	if (typeof (observation) === 'string') {
		return {name: observation};
	}

	return {name: 'sensor'};
};
/**
*This function fills the given options by successively checking if it uses a registered model,
* it builds and checks the dynamic and observation dimensions, build the stateProjection if only observedProjection
*is given, and initialize dynamic.init
*@param {DynamicObjectConfig | DynamicNonObjectConfig} options.dynamic
*@param {ObservationObjectConfig | ObservationNonObjectConfig} options.observation
* @returns {CoreConfig}
*/

const setupModelsParameters = function ({observation, dynamic}) {
	if (typeof (observation) !== 'object' || observation === null) {
		observation = buildDefaultObservation(observation);
	}

	if (typeof (dynamic) !== 'object' || dynamic === null) {
		dynamic = buildDefaultDynamic(dynamic, observation);
	}

	if (typeof (observation.name) === 'string') {
		observation = modelCollection.buildObservation(observation);
	}

	if (typeof (dynamic.name) === 'string') {
		dynamic = modelCollection.buildDynamic(dynamic, observation);
	}

	const withDimensionOptions = setDimensions({observation, dynamic});
	const checkedDimensionOptions = checkDimensions(withDimensionOptions);
	const buildStateProjectionOptions = buildStateProjection(checkedDimensionOptions);
	return extendDynamicInit(buildStateProjectionOptions);
};

/**
* @typedef {Object} ModelsParameters
* @property {DynamicObjectConfig} dynamic
* @property {ObservationObjectConfig} observation
*/

/**
* Returns the corresponding model without arrays as values but only functions
* @param {ModelsParameters} modelToBeChanged
* @returns {CoreConfig} model with respect of the Core Kalman Filter properties
*/
const modelsParametersToCoreOptions = function (modelToBeChanged) {
	const {observation, dynamic} = modelToBeChanged;
	return deepAssign(modelToBeChanged, {
		observation: {
			stateProjection: toFunction(polymorphMatrix(observation.stateProjection), {label: 'observation.stateProjection'}),
			covariance: toFunction(polymorphMatrix(observation.covariance, {dimension: observation.dimension}), {label: 'observation.covariance'}),
		},
		dynamic: {
			transition: toFunction(polymorphMatrix(dynamic.transition), {label: 'dynamic.transition'}),
			covariance: toFunction(polymorphMatrix(dynamic.covariance, {dimension: dynamic.dimension}), {label: 'dynamic.covariance'}),
		},
	});
};

class KalmanFilter extends CoreKalmanFilter {
	/**
	* @typedef {Object} Config
	* @property {DynamicObjectConfig | DynamicNonObjectConfig} dynamic
	* @property {ObservationObjectConfig | ObservationNonObjectConfig} observation
	*/
	/**
	* @param {Config} options
	*/
	constructor(options = {}) {
		const modelsParameters = setupModelsParameters(options);
		const coreOptions = modelsParametersToCoreOptions(modelsParameters);

		super(Object.assign({}, options, coreOptions));
	}

	correct(options) {
		const coreObservation = arrayToMatrix({observation: options.observation, dimension: this.observation.dimension});
		return super.correct(Object.assign({}, options, {observation: coreObservation}));
	}

	/**
	*Performs the prediction and the correction steps
	*@param {State} previousCorrected
	*@param {<Array.<Number>>} observation
	*@returns {Array.<Number>} the mean of the corrections
	*/

	filter(options) {
		const predicted = super.predict(options);
		return this.correct(Object.assign({}, options, {predicted}));
	}

	/**
*Filters all the observations
*@param {Array.<Array.<Number>>} observations
*@returns {Array.<Array.<Number>>} the mean of the corrections
*/
	filterAll(observations) {
		let previousCorrected = this.getInitState();
		const results = [];
		for (const observation of observations) {
			const predicted = this.predict({previousCorrected});
			previousCorrected = this.correct({
				predicted,
				observation,
			});
			results.push(previousCorrected.mean.map(m => m[0]));
		}

		return results;
	}

	/**
	* Returns an estimation of the asymptotic state covariance as explained in https://en.wikipedia.org/wiki/Kalman_filter#Asymptotic_form
	* in practice this can be used as a init.covariance value but is very costful calculation (that's why this is not made by default)
	* @param {Number} [limitIterations=1e2] max number of iterations
	* @param {Number} [tolerance=1e-6] returns when the last values differences are less than tolerance
	* @return {Array.<Array.<Number>>} covariance
	*/
	asymptoticStateCovariance({limitIterations = 1e2, tolerance = 1e-6} = {}) {
		let previousCorrected = super.getInitState();
		let predicted;
		const results = [];
		for (let i = 0; i < limitIterations; i++) {
			// We create a fake mean that will not be used in order to keep coherence
			predicted = new State({
				mean: null,
				covariance: super.getPredictedCovariance({previousCorrected}),
			});
			previousCorrected = new State({
				mean: null,
				covariance: super.getCorrectedCovariance({predicted}),
			});
			results.push(previousCorrected.covariance);
			if (distanceMat(previousCorrected.covariance, results[i - 1]) < tolerance) {
				return results[i];
			}
		}

		throw (new Error('The state covariance does not converge asymptotically'));
	}

	/**
	* Returns an estimation of the asymptotic gain, as explained in https://en.wikipedia.org/wiki/Kalman_filter#Asymptotic_form
	* @param {Number} [tolerance=1e-6] returns when the last values differences are less than tolerance
	* @return {Array.<Array.<Number>>} gain
	*/
	asymptoticGain({tolerance = 1e-6} = {}) {
		const covariance = this.asymptoticStateCovariance({tolerance});

		const asymptoticState = new State({
			// We create a fake mean that will not be used in order to keep coherence
			mean: Array.from({length: covariance.length}).fill(0).map(() => [0]),
			covariance,
		});

		return super.getGain({predicted: asymptoticState});
	}
}

module.exports = KalmanFilter;
