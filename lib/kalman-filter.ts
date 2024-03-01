
import {frobenius as distanceMat} from 'simple-linalg';
import arrayToMatrix from '../lib/utils/array-to-matrix';
import setDimensions from '../lib/setup/set-dimensions';
import checkDimensions from '../lib/setup/check-dimensions';
import buildStateProjection from '../lib/setup/build-state-projection';
import extendDynamicInit from '../lib/setup/extend-dynamic-init';
import toFunction from '../lib/utils/to-function';
import deepAssign from '../lib/utils/deep-assign';
import polymorphMatrix from '../lib/utils/polymorph-matrix';
import State from './state';
import * as modelCollection from './model-collection';
import CoreKalmanFilter from './core-kalman-filter';
import {ObservationObjectConfig, WinstonLogger} from './types/ObservationConfig';

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

const buildDefaultDynamic = function (dynamic): {name: string} {
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
const buildDefaultObservation = function (observation): ObservationObjectConfig {
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

const setupModelsParameters = function (args: {
	observation?: number | string | null | ObservationObjectConfig, // ObservationConfig
	dynamic?: any
}) {
	let {observation, dynamic} = args;
	if (typeof (observation) !== 'object' || observation === null) {
		observation = buildDefaultObservation(observation);
	}

	if (typeof (dynamic) !== 'object' || dynamic === null) {
		dynamic = buildDefaultDynamic(dynamic/*, observation*/);
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

export default class KalmanFilter extends CoreKalmanFilter {
	/**
	* @typedef {Object} Config
	* @property {DynamicObjectConfig | DynamicNonObjectConfig} dynamic
	* @property {ObservationObjectConfig | ObservationNonObjectConfig} observation
	*/
	/**
	* @param {Config} options
	*/
	constructor(options: {observation?: any, dynamic?: any, logger?: WinstonLogger} = {}) {
		const modelsParameters = setupModelsParameters(options);
		const coreOptions = modelsParametersToCoreOptions(modelsParameters);

		super({...options, ...coreOptions});
	}

	correct(options: {predicted: State, observation: number[] | number[][]}): State {
		const coreObservation = arrayToMatrix({observation: options.observation, dimension: this.observation.dimension});
		return super.correct({
			...options,
			observation: coreObservation,
		});
	}

	/**
	* Performs the prediction and the correction steps
	* @param {State} previousCorrected
	* @param {<Array.<Number>>} observation
	* @returns {Array.<Number>} the mean of the corrections
	*/

	filter(options) {
		const predicted = super.predict(options);
		return this.correct({
			...options,
			predicted,
		});
	}

	/**
     * Filters all the observations
     * @param {Array.<Array.<Number>>} observations
     * @returns {Array.<Array.<Number>>} the mean of the corrections
     */
	filterAll(observations): number[][] {
		let previousCorrected = this.getInitState();
		const results: number[][] = [];
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
	asymptoticStateCovariance({limitIterations = 1e2, tolerance = 1e-6} = {}): number[][] {
		let previousCorrected = super.getInitState();
		const results:  number[][][] = [];
		for (let i = 0; i < limitIterations; i++) {
			// We create a fake mean that will not be used in order to keep coherence
			const predicted = new State({
				mean: [],
				covariance: super.getPredictedCovariance({previousCorrected}),
			});
			previousCorrected = new State({
				mean: [],
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
	asymptoticGain({tolerance = 1e-6} = {}): number[][] {
		const covariance = this.asymptoticStateCovariance({tolerance});

		const asymptoticState = new State({
			// We create a fake mean that will not be used in order to keep coherence
			mean: Array.from({length: covariance.length}).fill(0).map(() => [0]),
			covariance,
		});
		return super.getGain({predicted: asymptoticState});
	}
}
