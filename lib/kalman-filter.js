const CoreKalmanFilter = require('./core-kalman-filter.js');

const elementsToFunction = require('../lib/utils/elements-to-function.js');
const arrayToMatrix = require('../lib/utils/array-to-matrix.js');
const setUpModelsParameters = require('../lib/utils/set-up-models-parameters.js');

// Const registeredObservationModels = {};
// const registeredDynamicModels = {};

class KalmanFilter extends CoreKalmanFilter {
	/**
	* @param {DynamicConfig} options.dynamic
	* @param {ObservationConfig} options.observation the system's observation model
	*/
	constructor(options) {
		const setUpOptions = setUpModelsParameters(options);
		const coreOptions = elementsToFunction(setUpOptions);
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
