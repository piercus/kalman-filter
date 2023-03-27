var kalmanFilter;kalmanFilter =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const modelCollection = __webpack_require__(/*! ./lib/model-collection */ "./lib/model-collection.js");

module.exports = {
	registerDynamic: modelCollection.registerDynamic,
	KalmanFilter: __webpack_require__(/*! ./lib/kalman-filter */ "./lib/kalman-filter.js"),
	registerObservation: modelCollection.registerObservation,
	buildObservation: modelCollection.buildObservation,
	buildDynamic: modelCollection.buildDynamic,
	getCovariance: __webpack_require__(/*! ./lib/utils/get-covariance */ "./lib/utils/get-covariance.js"),
	State: __webpack_require__(/*! ./lib/state */ "./lib/state.js"),
	checkCovariance: __webpack_require__(/*! ./lib/utils/check-covariance */ "./lib/utils/check-covariance.js"),
	correlationToCovariance: __webpack_require__(/*! ./lib/utils/correlation-to-covariance */ "./lib/utils/correlation-to-covariance.js"),
	covarianceToCorrelation: __webpack_require__(/*! ./lib/utils/covariance-to-correlation */ "./lib/utils/covariance-to-correlation.js"),
	linalgebra: __webpack_require__(/*! ./lib/linalgebra */ "./lib/linalgebra/index.js")
};


/***/ }),

/***/ "./lib/core-kalman-filter.js":
/*!***********************************!*\
  !*** ./lib/core-kalman-filter.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const matMul = __webpack_require__(/*! ../lib/linalgebra/mat-mul.js */ "./lib/linalgebra/mat-mul.js");
const transpose = __webpack_require__(/*! ../lib/linalgebra/transpose.js */ "./lib/linalgebra/transpose.js");
const add = __webpack_require__(/*! ../lib/linalgebra/add.js */ "./lib/linalgebra/add.js");
const invert = __webpack_require__(/*! ../lib/linalgebra/invert.js */ "./lib/linalgebra/invert.js");
const sub = __webpack_require__(/*! ../lib/linalgebra/sub.js */ "./lib/linalgebra/sub.js");
const getIdentity = __webpack_require__(/*! ../lib/linalgebra/identity.js */ "./lib/linalgebra/identity.js");
const State = __webpack_require__(/*! ./state.js */ "./lib/state.js");
const checkMatrix = __webpack_require__(/*! ./utils/check-matrix.js */ "./lib/utils/check-matrix.js");
/**
* @callback PreviousCorrectedCallback
* @param {Object} opts
* @param {Number} opts.index
* @param {Number} opts.previousCorrected
* @returns {Array.Array.<Number>>}
*/

/**
* @callback PredictedCallback
* @param {Object} opts
* @param {Number} opts.index
* @param {State} opts.predicted
* @param {Observation} opts.observation
* @returns {Array.Array.<Number>>}
*/

/**
* @typedef {Object} ObservationConfig
* @property {Number} dimension
* @property {PredictedCallback} [fn=null] for extended kalman filter only, the non-linear state to observation function
* @property {Array.Array.<Number>> | PreviousCorrectedCallback} stateProjection the matrix to transform state to observation (for EKF, the jacobian of the fn)
* @property {Array.Array.<Number>> | PreviousCorrectedCallback} covariance the covariance of the observation noise
*/

/**
* @typedef {Object} DynamicConfig
* @property {Number} dimension dimension of the state vector
* @property {PreviousCorrectedCallback} [constant=null] a function that returns the control parameter B_k*u_k of the kalman filter
* @property {PreviousCorrectedCallback} [fn=null] for extended kalman filter only, the non-linear state-transition model
* @property {Array.Array.<Number>> | PredictedCallback} transition the state-transition model (or for EKF the jacobian of the fn)
* @property {Array.Array.<Number>> | PredictedCallback} covariance the covariance of the process noise
*/

/**
* @typedef {Object} CoreConfig
* @property {DynamicConfig} dynamic the system's dynamic model
* @property {ObservationConfig} observation the system's observation model
* @property {Object} [logger=defaultLogger] a Winston-like logger
*/
const defaultLogger = {
	info: (...args) => console.log(...args),
	debug: () => {},
	warn: (...args) => console.log(...args),
	error: (...args) => console.log(...args)
};
/**
 * @param {CoreConfig} options
*/
class CoreKalmanFilter {
	constructor(options) {
		const {dynamic, observation, logger = defaultLogger} = options;
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
		State.check(initState, {title: 'dynamic.init'});
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
		const transition = this.getValue(this.dynamic.transition, getValueOptions);

		checkMatrix(transition, [this.dynamic.dimension, this.dynamic.dimension], 'dynamic.transition');

		const transitionTransposed = transpose(transition);
		const covarianceInter = matMul(transition, previousCorrected.covariance);
		const covariancePrevious = matMul(covarianceInter, transitionTransposed);
		const dynCov = this.getValue(this.dynamic.covariance, getValueOptions);

		const covariance = add(
			dynCov,
			covariancePrevious
		);
		checkMatrix(covariance, [this.dynamic.dimension, this.dynamic.dimension], 'predicted.covariance');

		return covariance;
	}

	predictMean(o) {
		const mean = this.predictMeanWithoutControl(o);
		if (!this.dynamic.constant) {
			return mean;
		}

		const {opts} = o;
		const control = this.dynamic.constant(opts);
		checkMatrix(control, [this.dynamic.dimension, 1], 'dynamic.constant');
		return add(mean, control);
	}

	predictMeanWithoutControl({opts, transition}) {
		if (this.dynamic.fn) {
			return this.dynamic.fn(opts);
		}

		const {previousCorrected} = opts;
		return matMul(transition, previousCorrected.mean);
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
		const getValueOptions = Object.assign({}, options, {
			previousCorrected,
			index
		});

		const transition = this.getValue(this.dynamic.transition, getValueOptions);

		const mean = this.predictMean({transition, opts: getValueOptions});

		const covariance = this.getPredictedCovariance(getValueOptions);

		const predicted = new State({mean, covariance, index});
		this.logger.debug('Prediction done', predicted);
		if(Number.isNaN(predicted.mean[0][0])){
			throw(new Error('nan'))
		}

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

		checkMatrix(stateProjection, [this.observation.dimension, this.dynamic.dimension], 'observation.stateProjection');

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

	getPredictedObservation({opts, stateProjection}) {
		if (this.observation.fn) {
			return this.observation.fn(opts);
		}

		const {predicted} = opts;
		return matMul(stateProjection, predicted.mean);
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
			this.getPredictedObservation({stateProjection, opts: getValueOptions})
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


/***/ }),

/***/ "./lib/dynamic/constant-acceleration.js":
/*!**********************************************!*\
  !*** ./lib/dynamic/constant-acceleration.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const identity = __webpack_require__(/*! ../linalgebra/identity.js */ "./lib/linalgebra/identity.js");

/**
*Creates a dynamic model, following constant acceleration model with respect with the dimensions provided in the observation parameters
* @param {DynamicConfig} dynamic
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/

module.exports = function (dynamic, observation) {
	const timeStep = dynamic.timeStep || 1;
	const {observedProjection} = observation;
	const {stateProjection} = observation;
	const observationDimension = observation.dimension;
	let dimension;

	if (stateProjection && Number.isInteger(stateProjection[0].length / 3)) {
		dimension = observation.stateProjection[0].length;
	} else if (observedProjection) {
		dimension = observedProjection[0].length * 3;
	} else if (observationDimension) {
		dimension = observationDimension * 3;
	} else {
		throw (new Error('observedProjection or stateProjection should be defined in observation in order to use constant-speed filter'));
	}

	const baseDimension = dimension / 3;
	// We construct the transition and covariance matrices
	const transition = identity(dimension);
	for (let i = 0; i < baseDimension; i++) {
		transition[i][i + baseDimension] = timeStep;
		transition[i][i + (2 * baseDimension)] = 0.5 * (timeStep ** 2);
		transition[i + baseDimension][i + (2 * baseDimension)] = timeStep;
	}

	const arrayCovariance = new Array(baseDimension).fill(1)
		.concat(new Array(baseDimension).fill(timeStep * timeStep))
		.concat(new Array(baseDimension).fill(timeStep ** 4));
	const covariance = dynamic.covariance || arrayCovariance;
	return Object.assign({}, dynamic, {dimension, transition, covariance});
};


/***/ }),

/***/ "./lib/dynamic/constant-position.js":
/*!******************************************!*\
  !*** ./lib/dynamic/constant-position.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const identity = __webpack_require__(/*! ../linalgebra/identity.js */ "./lib/linalgebra/identity.js");
/**
*Creates a dynamic model, following constant position model with respect with the dimensions provided in the observation parameters
* @param {DynamicConfig} dynamic
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/

module.exports = function (dynamic, observation) {
	let {dimension} = dynamic;
	const observationDimension = observation.dimension;
	const {observedProjection} = observation;
	const {stateProjection} = observation;
	let {covariance} = dynamic;

	if (!dynamic.dimension) {
		if (observationDimension) {
			dimension = observationDimension;
		} else if (observedProjection) {
			dimension = observedProjection[0].length;
		} else if (stateProjection) {
			dimension = stateProjection[0].length;
		}
	}

	const transition = identity(dimension);
	covariance = covariance || identity(dimension);
	return Object.assign({}, dynamic, {dimension, transition, covariance});
};


/***/ }),

/***/ "./lib/dynamic/constant-speed.js":
/*!***************************************!*\
  !*** ./lib/dynamic/constant-speed.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const identity = __webpack_require__(/*! ../linalgebra/identity.js */ "./lib/linalgebra/identity.js");

/**
*Creates a dynamic model, following constant position model with respect with the dimensions provided in the observation parameters
* @param {DynamicConfig} dynamic
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/

module.exports = function (dynamic, observation) {
	const timeStep = dynamic.timeStep || 1;
	const {observedProjection} = observation;
	const {stateProjection} = observation;
	const observationDimension = observation.dimension;
	let dimension;

	if (stateProjection && Number.isInteger(stateProjection[0].length / 2)) {
		dimension = observation.stateProjection[0].length;
	} else if (observedProjection) {
		dimension = observedProjection[0].length * 2;
	} else if (observationDimension) {
		dimension = observationDimension * 2;
	} else {
		throw (new Error('observedProjection or stateProjection should be defined in observation in order to use constant-speed filter'));
	}

	const baseDimension = dimension / 2;
	// We construct the transition and covariance matrices
	const transition = identity(dimension);
	for (let i = 0; i < baseDimension; i++) {
		transition[i][i + baseDimension] = timeStep;
	}

	const arrayCovariance = new Array(baseDimension).fill(1).concat(new Array(baseDimension).fill(timeStep * timeStep));
	const covariance = dynamic.covariance || arrayCovariance;
	return Object.assign({}, dynamic, {dimension, transition, covariance});
};


/***/ }),

/***/ "./lib/kalman-filter.js":
/*!******************************!*\
  !*** ./lib/kalman-filter.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const arrayToMatrix = __webpack_require__(/*! ../lib/utils/array-to-matrix.js */ "./lib/utils/array-to-matrix.js");
const setDimensions = __webpack_require__(/*! ../lib/setup/set-dimensions.js */ "./lib/setup/set-dimensions.js");
const checkDimensions = __webpack_require__(/*! ../lib/setup/check-dimensions.js */ "./lib/setup/check-dimensions.js");
const buildStateProjection = __webpack_require__(/*! ../lib/setup/build-state-projection.js */ "./lib/setup/build-state-projection.js");
const extendDynamicInit = __webpack_require__(/*! ../lib/setup/extend-dynamic-init.js */ "./lib/setup/extend-dynamic-init.js");
const toFunction = __webpack_require__(/*! ../lib/utils/to-function.js */ "./lib/utils/to-function.js");
const deepAssign = __webpack_require__(/*! ../lib/utils/deep-assign.js */ "./lib/utils/deep-assign.js");
const polymorphMatrix = __webpack_require__(/*! ../lib/utils/polymorph-matrix.js */ "./lib/utils/polymorph-matrix.js");
const distanceMat = __webpack_require__(/*! ../lib/linalgebra/distance-mat.js */ "./lib/linalgebra/distance-mat.js");
const State = __webpack_require__(/*! ./state.js */ "./lib/state.js");
const modelCollection = __webpack_require__(/*! ./model-collection.js */ "./lib/model-collection.js");
const CoreKalmanFilter = __webpack_require__(/*! ./core-kalman-filter.js */ "./lib/core-kalman-filter.js");

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
			covariance: toFunction(polymorphMatrix(observation.covariance, {dimension: observation.dimension}), {label: 'observation.covariance'})
		},
		dynamic: {
			transition: toFunction(polymorphMatrix(dynamic.transition), {label: 'dynamic.transition'}),
			covariance: toFunction(polymorphMatrix(dynamic.covariance, {dimension: dynamic.dimension}), {label: 'dynamic.covariance'})
		}
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
				observation
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
	asymptoticStateCovariance(limitIterations = 1e2, tolerance = 1e-6) {
		let previousCorrected = super.getInitState();
		let predicted;
		const results = [];
		for (let i = 0; i < limitIterations; i++) {
			// We create a fake mean that will not be used in order to keep coherence
			predicted = new State({
				mean: null,
				covariance: super.getPredictedCovariance({previousCorrected})
			});
			previousCorrected = new State({
				mean: null,
				covariance: super.getCorrectedCovariance({predicted})
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
	asymptoticGain(tolerance = 1e-6) {
		const covariance = this.asymptoticStateCovariance(tolerance);

		const asymptoticState = new State({
			// We create a fake mean that will not be used in order to keep coherence
			mean: new Array(covariance.length).fill(0).map(() => [0]),
			covariance
		});

		return super.getGain({previousCorrected: asymptoticState});
	}
}

module.exports = KalmanFilter;


/***/ }),

/***/ "./lib/linalgebra/add.js":
/*!*******************************!*\
  !*** ./lib/linalgebra/add.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const elemWise = __webpack_require__(/*! ./elem-wise */ "./lib/linalgebra/elem-wise.js");
/**
* Add matrixes together
* @param {...Array.<Array.<Number>>} args list of matrix
* @returns {Array.<Array.<Number>>} sum
*/
module.exports = function (...args) {
	return elemWise(args, args2 => {
		return args2.reduce((a, b) => {
			if (a === null || b === null) {
				return null;
			}

			return a + b;
		}, 0);
	});
};


/***/ }),

/***/ "./lib/linalgebra/diag.js":
/*!********************************!*\
  !*** ./lib/linalgebra/diag.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const zeros = __webpack_require__(/*! ./zeros */ "./lib/linalgebra/zeros.js");

module.exports = function (mat) {
	const result = zeros(mat.length, mat.length);

	for (const [i, element] of mat.entries()) {
		result[i][i] = element;
	}

	return result;
};


/***/ }),

/***/ "./lib/linalgebra/distance-mat.js":
/*!****************************************!*\
  !*** ./lib/linalgebra/distance-mat.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const trace = __webpack_require__(/*! ./trace.js */ "./lib/linalgebra/trace.js");
const transpose = __webpack_require__(/*! ./transpose.js */ "./lib/linalgebra/transpose.js");
const matSub = __webpack_require__(/*! ./sub.js */ "./lib/linalgebra/sub.js");
const matMul = __webpack_require__(/*! ./mat-mul.js */ "./lib/linalgebra/mat-mul.js");
const sum = __webpack_require__(/*! ./sum.js */ "./lib/linalgebra/sum.js");

// [Frobenius norm](https://en.wikipedia.org/wiki/Matrix_norm#Frobenius_norm )
module.exports = function (array1, array2) {
	if (typeof (array1) === 'undefined') {
		return sum(array2);
	}

	if (typeof (array2) === 'undefined') {
		return sum(array1);
	}

	const m = matSub(array1, array2);
	const p = matMul(transpose(m), m);
	return Math.sqrt(trace(p));
};


/***/ }),

/***/ "./lib/linalgebra/elem-wise.js":
/*!*************************************!*\
  !*** ./lib/linalgebra/elem-wise.js ***!
  \*************************************/
/***/ ((module) => {

/**
* @callback elemWiseCb
* @param {Array.<Number>} arr
* @param {Number} rowId
* @param {Number} colId
*/
/**
* run a function on cell per cell for each Matrixes
* @param {<Array.<Array.<Array.<Number>>>} arrMatrixes list of matrixes
* @param {elemWiseCb} fn
* @returns {Array.<Array.<Number>>} resulting matrix
* @example
// this will do m1 + m2 + m3 + m4 on matrixes
elemWise([m1, m2, m3, m4], args2 => {
	return args2.reduce((a, b) => a + b, 0);
});
*/

module.exports = function (arrayMatrixes, fn) {
	return arrayMatrixes[0].map((row, rowId) => {
		return row.map((cell, colId) => {
			const array = arrayMatrixes.map(m => m[rowId][colId]);
			return fn(array, rowId, colId);
		});
	});
};



/***/ }),

/***/ "./lib/linalgebra/identity.js":
/*!************************************!*\
  !*** ./lib/linalgebra/identity.js ***!
  \************************************/
/***/ ((module) => {

module.exports = function (stateSize) {
	const identityArray = [];
	for (let i = 0; i < stateSize; i++) {
		const rowIdentity = [];
		for (let j = 0; j < stateSize; j++) {
			if (i === j) {
				rowIdentity.push(1);
			} else {
				rowIdentity.push(0);
			}
		}

		identityArray.push(rowIdentity);
	}

	return identityArray;
};


/***/ }),

/***/ "./lib/linalgebra/index.js":
/*!*********************************!*\
  !*** ./lib/linalgebra/index.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
	add: __webpack_require__(/*! ./add.js */ "./lib/linalgebra/add.js"),
	diag: __webpack_require__(/*! ./diag.js */ "./lib/linalgebra/diag.js"),
	'distance-mat': __webpack_require__(/*! ./distance-mat.js */ "./lib/linalgebra/distance-mat.js"),
	'elem-wise': __webpack_require__(/*! ./elem-wise.js */ "./lib/linalgebra/elem-wise.js"),
	identity: __webpack_require__(/*! ./identity.js */ "./lib/linalgebra/identity.js"),
	invert: __webpack_require__(/*! ./invert.js */ "./lib/linalgebra/invert.js"),
	'mat-mul': __webpack_require__(/*! ./mat-mul.js */ "./lib/linalgebra/mat-mul.js"),
	'pad-with-zeros': __webpack_require__(/*! ./pad-with-zeros.js */ "./lib/linalgebra/pad-with-zeros.js"),
	sub: __webpack_require__(/*! ./sub.js */ "./lib/linalgebra/sub.js"),
	'sub-square-matrix': __webpack_require__(/*! ./sub-square-matrix.js */ "./lib/linalgebra/sub-square-matrix.js"),
	sum: __webpack_require__(/*! ./sum.js */ "./lib/linalgebra/sum.js"),
	trace: __webpack_require__(/*! ./trace.js */ "./lib/linalgebra/trace.js"),
	transpose: __webpack_require__(/*! ./transpose.js */ "./lib/linalgebra/transpose.js"),
	zeros: __webpack_require__(/*! ./zeros.js */ "./lib/linalgebra/zeros.js")
};


/***/ }),

/***/ "./lib/linalgebra/invert.js":
/*!**********************************!*\
  !*** ./lib/linalgebra/invert.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const matrixInverse = __webpack_require__(/*! matrix-inverse */ "./node_modules/matrix-inverse/matrix-inverse.js");

module.exports = function (m) {
	return matrixInverse(m);
};


/***/ }),

/***/ "./lib/linalgebra/mat-mul.js":
/*!***********************************!*\
  !*** ./lib/linalgebra/mat-mul.js ***!
  \***********************************/
/***/ ((module) => {

/**
* Multiply 2 matrixes together
* @param {Array.<Array.<Number>>} m1
* @param {Array.<Array.<Number>>} m2
* @returns {Array.<Array.<Number>>}
*/
module.exports = function (m1, m2) {
	// Console.log({m1, m2});
	const result = [];
	for (let i = 0; i < m1.length; i++) {
		result[i] = [];
		for (let j = 0; j < m2[0].length; j++) {
			let sum = 0;
			let isNull = false;
			for (let k = 0; k < m1[0].length; k++) {
				if ((m1[i][k] === null && m2[k][j] !== 0) || (m2[k][j] === null && m1[i][k] !== 0)) {
					isNull = true;
				}

				sum += m1[i][k] * m2[k][j];
			}

			result[i][j] = isNull ? null : sum;
		}
	}

	return result;
};


/***/ }),

/***/ "./lib/linalgebra/pad-with-zeros.js":
/*!******************************************!*\
  !*** ./lib/linalgebra/pad-with-zeros.js ***!
  \******************************************/
/***/ ((module) => {

/**
*This function returns the stateProjection paded with zeros with respect to a given
*observedProjection
*@param {Array.<Number> | Array.<Array.<Number>>} array the array we need to pad
*@param {Number} dimension in our case, the dynamic dimension
*@returns {Array.<Number> | Array.<Array.<Number>>} paded array
*/
module.exports = function (array, {dimension}) {
	const l1 = array.length;
	const l = array[0].length;
	const result = array.map(a => a.concat());

	if (dimension < l) {
		throw (new TypeError(`Dynamic dimension ${dimension} does not match with observedProjection ${l}`));
	}

	for (let i = 0; i < l1; i++) {
		for (let j = 0; j < dimension - l; j++) {
			result[i].push(0);
		}
	}

	return result;
};


/***/ }),

/***/ "./lib/linalgebra/sub-square-matrix.js":
/*!*********************************************!*\
  !*** ./lib/linalgebra/sub-square-matrix.js ***!
  \*********************************************/
/***/ ((module) => {

module.exports = (mat, obsIndexes) => {
	return obsIndexes.map(s1 => obsIndexes.map(s2 => mat[s1][s2]));
};


/***/ }),

/***/ "./lib/linalgebra/sub.js":
/*!*******************************!*\
  !*** ./lib/linalgebra/sub.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const elemWise = __webpack_require__(/*! ./elem-wise */ "./lib/linalgebra/elem-wise.js");

module.exports = function (...args) {
	return elemWise(args, ([a, b]) => a - b);
};


/***/ }),

/***/ "./lib/linalgebra/sum.js":
/*!*******************************!*\
  !*** ./lib/linalgebra/sum.js ***!
  \*******************************/
/***/ ((module) => {

// Sum all the terms of a given matrix
module.exports = function (array) {
	let s = 0;
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length; j++) {
			s += array[i][j];
		}
	}

	return s;
};


/***/ }),

/***/ "./lib/linalgebra/trace.js":
/*!*********************************!*\
  !*** ./lib/linalgebra/trace.js ***!
  \*********************************/
/***/ ((module) => {

module.exports = function (array) {
	let diag = 0;
	for (const [row, element] of array.entries()) {
		diag += element[row];
	}

	return diag;
};


/***/ }),

/***/ "./lib/linalgebra/transpose.js":
/*!*************************************!*\
  !*** ./lib/linalgebra/transpose.js ***!
  \*************************************/
/***/ ((module) => {

module.exports = function (array) {
	return array[0].map((col, i) => array.map(row => row[i]));
};


/***/ }),

/***/ "./lib/linalgebra/zeros.js":
/*!*********************************!*\
  !*** ./lib/linalgebra/zeros.js ***!
  \*********************************/
/***/ ((module) => {

module.exports = function (rows, cols) {
	return new Array(rows).fill(1).map(() => new Array(cols).fill(0));
};


/***/ }),

/***/ "./lib/model-collection.js":
/*!*********************************!*\
  !*** ./lib/model-collection.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const registeredDynamicModels = {
	'constant-position': __webpack_require__(/*! ../lib/dynamic/constant-position.js */ "./lib/dynamic/constant-position.js"),
	'constant-speed': __webpack_require__(/*! ../lib/dynamic/constant-speed.js */ "./lib/dynamic/constant-speed.js"),
	'constant-acceleration': __webpack_require__(/*! ../lib/dynamic/constant-acceleration.js */ "./lib/dynamic/constant-acceleration.js")
};
const registeredObservationModels = {
	sensor: __webpack_require__(/*! ../lib/observation/sensor.js */ "./lib/observation/sensor.js")
};

/**
*RegisterObservation enables to create a new observation model and stock it
* @param {String} name
* @callback fn the function corresponding to the desired model
*/

/**
*registerDynamic enables to create a new dynamic model and stocks it
* @param {String} name
* @callback fn the function corresponding to the desired model
*/

/**
*buildObservation enables to build a model given an observation configuration
* @param {ObservationConfig} observation
* @returns {ObservationConfig} the configuration with respect to the model
*/

/**
*buildDynamic enables to build a model given dynamic and observation configurations
* @param {DynamicConfig} dynamic
* @param {ObservationConfig} observation
* @returns {DynamicConfig} the dynamic configuration with respect to the model
*/

module.exports = {
	registerObservation: (name, fn) => {
		registeredObservationModels[name] = fn;
	},
	registerDynamic: (name, fn) => {
		registeredDynamicModels[name] = fn;
	},
	buildObservation: observation => {
		if (!registeredObservationModels[observation.name]) {
			throw (new Error(`The provided observation model name (${observation.name}) is not registered`));
		}

		return registeredObservationModels[observation.name](observation);
	},
	buildDynamic: (dynamic, observation) => {
		if (!registeredDynamicModels[dynamic.name]) {
			throw (new Error(`The provided dynamic model (${dynamic.name}) name is not registered`));
		}

		return registeredDynamicModels[dynamic.name](dynamic, observation);
	}
};


/***/ }),

/***/ "./lib/observation/sensor.js":
/*!***********************************!*\
  !*** ./lib/observation/sensor.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const identity = __webpack_require__(/*! ../linalgebra/identity.js */ "./lib/linalgebra/identity.js");
const polymorphMatrix = __webpack_require__(/*! ../utils/polymorph-matrix.js */ "./lib/utils/polymorph-matrix.js");
const checkMatrix = __webpack_require__(/*! ../utils/check-matrix.js */ "./lib/utils/check-matrix.js");

/**
* @param {Number} sensorDimension
* @param {CovarianceParam} sensorCovariance
* @param {Number} nSensors
* @returns {ObservationConfig}
*/

const copy = mat => mat.map(a => a.concat());

module.exports = function (options) {
	const {sensorDimension = 1, sensorCovariance = 1, nSensors = 1} = options;
	const sensorCovarianceFormatted = polymorphMatrix(sensorCovariance, {dimension: sensorDimension});
	checkMatrix(sensorCovarianceFormatted, [sensorDimension, sensorDimension], 'observation.sensorCovariance');
	const oneSensorObservedProjection = identity(sensorDimension);
	let concatenatedObservedProjection = [];
	const dimension = sensorDimension * nSensors;
	const concatenatedCovariance = identity(dimension);
	for (let i = 0; i < nSensors; i++) {
		concatenatedObservedProjection = concatenatedObservedProjection.concat(copy(oneSensorObservedProjection));

		sensorCovarianceFormatted.forEach((r, rIndex) => r.forEach((c, cIndex) => {
			concatenatedCovariance[rIndex + (i * sensorDimension)][cIndex + (i * sensorDimension)] = c;
		}));
	}

	return Object.assign({}, options, {
		dimension,
		observedProjection: concatenatedObservedProjection,
		covariance: concatenatedCovariance
	});
};


/***/ }),

/***/ "./lib/setup/build-state-projection.js":
/*!*********************************************!*\
  !*** ./lib/setup/build-state-projection.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const padWithZeros = __webpack_require__(/*! ../linalgebra/pad-with-zeros.js */ "./lib/linalgebra/pad-with-zeros.js");
const identity = __webpack_require__(/*! ../linalgebra/identity.js */ "./lib/linalgebra/identity.js");
/**
*Builds the stateProjection given an observedProjection
*@param {ObservationConfig} observation
*@param {DynamicConfig} dynamic
*@returns {ObservationConfig, DynamicConfig} the model containing the created stateProjection
*/

module.exports = function ({observation, dynamic}) {
	const {observedProjection, stateProjection} = observation;
	const observationDimension = observation.dimension;
	const dynamicDimension = dynamic.dimension;
	if (observedProjection && stateProjection) {
		throw (new TypeError('You cannot use both observedProjection and stateProjection'));
	}

	if (observedProjection) {
		const stateProjection = padWithZeros(observedProjection, {dimension: dynamicDimension});
		return {
			observation: Object.assign({}, observation, {
				stateProjection
			}),
			dynamic
		};
	}

	if (observationDimension && dynamicDimension && !stateProjection) {
		const observationMatrix = identity(observationDimension);
		return {
			observation: Object.assign({}, observation, {
				stateProjection: padWithZeros(observationMatrix, {dimension: dynamicDimension})
			}),
			dynamic
		};
	}

	return {observation, dynamic};
};


/***/ }),

/***/ "./lib/setup/check-dimensions.js":
/*!***************************************!*\
  !*** ./lib/setup/check-dimensions.js ***!
  \***************************************/
/***/ ((module) => {

/**
*Verifies that dynamic.dimension and observation.dimension are set
*@param {ObservationConfig} observation
*@param {DynamicConfig} dynamic
*/

module.exports = function ({observation, dynamic}) {
	const dynamicDimension = dynamic.dimension;
	const observationDimension = observation.dimension;
	if (!dynamicDimension || !observationDimension) {
		throw (new TypeError('Dimension is not set'));
	}

	return {observation, dynamic};
};


/***/ }),

/***/ "./lib/setup/extend-dynamic-init.js":
/*!******************************************!*\
  !*** ./lib/setup/extend-dynamic-init.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const diag = __webpack_require__(/*! ../linalgebra/diag.js */ "./lib/linalgebra/diag.js");

/**
*Initializes the dynamic.init when not given
*@param {ObservationConfig} observation
*@param {DynamicConfig} dynamic
*@returns {CoreConfig}
*/

module.exports = function ({observation, dynamic}) {
	if (!dynamic.init) {
		const huge = 1e6;
		const dynamicDimension = dynamic.dimension;
		const meanArray = new Array(dynamicDimension).fill(0);
		const covarianceArray = new Array(dynamicDimension).fill(huge);
		const withInitOptions = {
			observation,
			dynamic: Object.assign({}, dynamic, {
				init: {
					mean: meanArray.map(element => [element]),
					covariance: diag(covarianceArray),
					index: -1
				}
			})
		};
		return withInitOptions;
	}

	if (dynamic.init && !dynamic.init.mean) {
		throw (new Error('dynamic.init should have a mean key'));
	}

	return {observation, dynamic};
};


/***/ }),

/***/ "./lib/setup/set-dimensions.js":
/*!*************************************!*\
  !*** ./lib/setup/set-dimensions.js ***!
  \*************************************/
/***/ ((module) => {

/**
*Verifies that dimensions are matching and set dynamic.dimension and observation.dimension
* with respect of stateProjection and transition dimensions
*@param {ObservationConfig} observation
*@param {DynamicConfig} dynamic
*@returns {ObservationConfig, DynamicConfig}
*/

module.exports = function ({observation, dynamic}) {
	const {stateProjection} = observation;
	const {transition} = dynamic;
	const dynamicDimension = dynamic.dimension;
	const observationDimension = observation.dimension;

	if (dynamicDimension && observationDimension && Array.isArray(stateProjection) && (dynamicDimension !== stateProjection[0].length || observationDimension !== stateProjection.length)) {
		throw (new TypeError('stateProjection dimensions not matching with observation and dynamic dimensions'));
	}

	if (dynamicDimension && Array.isArray(transition) && dynamicDimension !== transition.length) {
		throw (new TypeError('transition dimension not matching with dynamic dimension'));
	}

	if (Array.isArray(stateProjection)) {
		return {
			observation: Object.assign({}, observation, {
				dimension: stateProjection.length
			}),
			dynamic: Object.assign({}, dynamic, {
				dimension: stateProjection[0].length
			})
		};
	}

	if (Array.isArray(transition)) {
		return {
			observation,
			dynamic: Object.assign({}, dynamic, {
				dimension: transition.length
			})
		};
	}

	return {observation, dynamic};
};


/***/ }),

/***/ "./lib/state.js":
/*!**********************!*\
  !*** ./lib/state.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const sub = __webpack_require__(/*! ./linalgebra/sub.js */ "./lib/linalgebra/sub.js");
const transpose = __webpack_require__(/*! ./linalgebra/transpose.js */ "./lib/linalgebra/transpose.js");
const matMul = __webpack_require__(/*! ./linalgebra/mat-mul.js */ "./lib/linalgebra/mat-mul.js");
const invert = __webpack_require__(/*! ./linalgebra/invert.js */ "./lib/linalgebra/invert.js");
const elemWise = __webpack_require__(/*! ./linalgebra/elem-wise.js */ "./lib/linalgebra/elem-wise.js");
const subSquareMatrix = __webpack_require__(/*! ./linalgebra/sub-square-matrix */ "./lib/linalgebra/sub-square-matrix.js");
const arrayToMatrix = __webpack_require__(/*! ./utils/array-to-matrix.js */ "./lib/utils/array-to-matrix.js");

const checkMatrix = __webpack_require__(/*! ./utils/check-matrix.js */ "./lib/utils/check-matrix.js");
const checkCovariance = __webpack_require__(/*! ./utils/check-covariance */ "./lib/utils/check-covariance.js");

/**
 * Class representing a multi dimensionnal gaussian, with his mean and his covariance
 * @property {Number} [index=0] the index of the State in the process, this is not mandatory for simple Kalman Filter, but is needed for most of the use case of extended kalman filter
 * @property {Array.<Array.<Number>>} covariance square matrix of size dimension
 * @property {Array.<Array<Number>>} mean column matrix of size dimension x 1
 */
class State {
	constructor({mean, covariance, index}) {
		this.mean = mean;
		this.covariance = covariance;
		this.index = index;
	}

	/**
	* Check the consistency of the State
	* @param {Object} options
	* @returns {Null}
	* @see check
	*/
	check(options) {
		this.constructor.check(this, options);
	}

	/**
	* Check the consistency of the State's attributes
	* @param {State} state
	* @param {Object} [options={}]
	* @param {Array} [options.dimension=null] if defined check the dimension of the state
	* @param {String} [options.title=null] used to log error mor explicitly
	* @param {Boolean} options.eigen
	* @returns {Null}
	*/

	static check(state, {dimension = null, title = null, eigen} = {}) {
		if (!(state instanceof State)) {
			throw (new TypeError(
				'The argument is not a state \n' +
        'Tips: maybe you are using 2 different version of kalman-filter in your npm deps tree'
			));
		}

		const {mean, covariance} = state; // Index
		const meanDimension = mean.length;
		if (typeof (dimension) === 'number' && meanDimension !== dimension) {
			throw (new Error(`[${title}] State.mean ${mean} with dimension ${meanDimension} does not match expected dimension (${dimension})`));
		}

		checkMatrix(mean, [meanDimension, 1], title ? title + '.mean' : 'mean');
		checkMatrix(covariance, [meanDimension, meanDimension], title ? title + '.covariance' : 'covariance');
		checkCovariance({covariance, eigen}, title ? title + '.covariance' : 'covariance');
		// If (typeof (index) !== 'number') {
		// 	throw (new TypeError('t must be a number'));
		// }
	}

	/**
	* Multiply state with matrix
	* @param {State} state
	* @param {Array.<Array.<Number>>} matrix
	* @returns {State}
	*/
	static matMul({state, matrix}) {
		const covariance = matMul(
			matMul(matrix, state.covariance),
			transpose(matrix)
		);
		const mean = matMul(matrix, state.mean);

		return new State({
			mean,
			covariance,
			index: state.index
		});
	}

	/**
	* From a state in n-dimension create a state in a subspace
	* If you see the state as a N-dimension gaussian,
	* this can be viewed as the sub M-dimension gaussian (M < N)
	* @param {Array.<Number>} obsIndexes list of dimension to extract,  (M < N <=> obsIndexes.length < this.mean.length)
	* @returns {State} subState in subspace, with subState.mean.length === obsIndexes.length
	*/
	subState(obsIndexes) {
		const state = new State({
			mean: obsIndexes.map(i => this.mean[i]),
			covariance: subSquareMatrix(this.covariance, obsIndexes),
			index: this.index
		});
		return state;
	}

	/**
	* @typedef {Object} DetailedMahalanobis
	* @property {Array.<[Number]>} diff
	* @property {Array.<Array.<Number>>} covarianceInvert
	* @property {Number} value
	*/
	/**
	* Simple Malahanobis distance between the distribution (this) and a point
	* @param {Array.<[Number]>} point a Nx1 matrix representing a point
	* @returns {DetailedMahalanobis}
	*/
	rawDetailedMahalanobis(point) {
		const diff = sub(this.mean, point);
		this.check();
		const covarianceInvert = invert(this.covariance);
		if (covarianceInvert === null) {
			this.check({eigen: true});
			throw (new Error(`Cannot invert covariance ${JSON.stringify(this.covariance)}`));
		}

		const diffTransposed = transpose(diff);

		// Console.log('covariance in obs space', covarianceInObservationSpace);

		const value = Math.sqrt(
			matMul(
				matMul(
					diffTransposed,
					covarianceInvert
				),
				diff
			)
		);
		if (Number.isNaN(value)) {
			console.log({diff, covarianceInvert, this: this, point}, matMul(
				matMul(
					diffTransposed,
					covarianceInvert
				),
				diff
			));
			throw (new Error('mahalanobis is NaN'));
		}

		return {
			diff,
			covarianceInvert,
			value
		};
	}

	/**
	* Malahanobis distance is made against an observation, so the mean and covariance
	* are projected into the observation space
	* @param {KalmanFilter} kf kalman filter use to project the state in observation's space
	* @param {Observation} observation
	* @param {Array.<Number>} obsIndexes list of indexes of observation state to use for the mahalanobis distance
	* @returns {DetailedMahalanobis}
	*/
	detailedMahalanobis({kf, observation, obsIndexes}) {
		if (observation.length !== kf.observation.dimension) {
			throw (new Error(`Mahalanobis observation ${observation} (dimension: ${observation.length}) does not match with kf observation dimension (${kf.observation.dimension})`));
		}

		let correctlySizedObservation = arrayToMatrix({observation, dimension: observation.length});

		const stateProjection = kf.getValue(kf.observation.stateProjection, {});

		let projectedState = this.constructor.matMul({state: this, matrix: stateProjection});

		if (Array.isArray(obsIndexes)) {
			projectedState = projectedState.subState(obsIndexes);
			correctlySizedObservation = obsIndexes.map(i => correctlySizedObservation[i]);
		}

		return projectedState.rawDetailedMahalanobis(correctlySizedObservation);
	}

	/**
	* @param {Object} options @see detailedMahalanobis
	* @returns {Number}
	*/
	mahalanobis(options) {
		const result = this.detailedMahalanobis(options).value;
		if (Number.isNaN(result)) {
			throw (new TypeError('mahalanobis is NaN'));
		}

		return result;
	}

	/**
	* Bhattacharyya distance is made against in the observation space
	* to do it in the normal space see state.bhattacharyya
	* @param {KalmanFilter} kf kalman filter use to project the state in observation's space
	* @param {State} state
	* @param {Array.<Number>} obsIndexes list of indexes of observation state to use for the bhattacharyya distance
	* @returns {Number}
	*/
	obsBhattacharyya({kf, state, obsIndexes}) {
		const stateProjection = kf.getValue(kf.observation.stateProjection, {});

		let projectedSelfState = this.constructor.matMul({state: this, matrix: stateProjection});
		let projectedOtherState = this.constructor.matMul({state, matrix: stateProjection});

		if (Array.isArray(obsIndexes)) {
			projectedSelfState = projectedSelfState.subState(obsIndexes);
			projectedOtherState = projectedOtherState.subState(obsIndexes);
		}

		return projectedSelfState.bhattacharyya(projectedOtherState);
	}

	/**
	* @param {State} otherState other state to compare with
	* @returns {Number}
	*/
	bhattacharyya(otherState) {
		const state = this;
		const average = elemWise([state.covariance, otherState.covariance], ([a, b]) => (a + b) / 2);

		let covarInverted;
		try {
			covarInverted = invert(average);
		} catch (error) {
			console.log('Cannot invert', average);
			throw (error);
		}

		const diff = sub(state.mean, otherState.mean);

		return matMul(transpose(diff), matMul(covarInverted, diff))[0][0];
	}
}

module.exports = State;


/***/ }),

/***/ "./lib/utils/array-to-matrix.js":
/*!**************************************!*\
  !*** ./lib/utils/array-to-matrix.js ***!
  \**************************************/
/***/ ((module) => {

/**
*Returns the corresponding matrix in dim*1, given an dim matrix, and checks
* if corresponding with the observation dimension
*@param {Array.<Number> | Array.<Array.<Number>>} observation
*@param {Number} dimension
*@returns {Array.<Array.<Number>>}
*/

module.exports = function ({observation, dimension}) {
	if (!Array.isArray(observation)) {
		if (dimension === 1 && typeof (observation) === 'number') {
			return [[observation]];
		}

		throw (new TypeError(`The observation (${observation}) should be an array (dimension: ${dimension})`));
	}

	if (observation.length !== dimension) {
		throw (new TypeError(`Observation (${observation.length}) and dimension (${dimension}) not matching`));
	}

	if (typeof (observation[0]) === 'number' || observation[0] === null) {
		return observation.map(element => [element]);
	}

	return observation;
};


/***/ }),

/***/ "./lib/utils/check-covariance.js":
/*!***************************************!*\
  !*** ./lib/utils/check-covariance.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const tolerance = 0.1;
const Matrix = __webpack_require__(/*! @rayyamhk/matrix */ "./node_modules/@rayyamhk/matrix/lib/index.js");
const checkMatrix = __webpack_require__(/*! ./check-matrix */ "./lib/utils/check-matrix.js");

const checkDefinitePositive = function (covariance, tolerance = 1e-10) {
	const covarianceMatrix = new Matrix(covariance);
	const eigenvalues = covarianceMatrix.eigenvalues();
	eigenvalues.forEach(eigenvalue => {
		if (eigenvalue <= -tolerance) {
			console.log(covariance, eigenvalue);
			throw new Error(`Eigenvalue should be positive (actual: ${eigenvalue})`);
		}
	});
	console.log('is definite positive', covariance);
};

const checkSymetric = function (covariance, title = 'checkSymetric') {
	covariance.forEach((row, rowId) => row.forEach((item, colId) => {
		if (rowId === colId && item < 0) {
			throw new Error(`[${title}] Variance[${colId}] should be positive (actual: ${item})`);
		} else if (Math.abs(item) > Math.sqrt(covariance[rowId][rowId] * covariance[colId][colId])) {
			console.log(covariance);
			throw new Error(`[${title}] Covariance[${rowId}][${colId}] should verify Cauchy Schwarz Inequality ` +
				`(expected: |x| <= sqrt(${covariance[rowId][rowId]} * ${covariance[colId][colId]})` +
				` actual: ${item})`);
		} else if (Math.abs(item - covariance[colId][rowId]) > tolerance) {
			throw new Error(`[${title}] Covariance[${rowId}][${colId}] should equal Covariance[${colId}][${rowId}] ` +
			` (actual diff: ${Math.abs(item - covariance[colId][rowId])})  = ${item} - ${covariance[colId][rowId]}\n` +
			`${covariance.join('\n')} is invalid`
			);
		}
	}));
};

module.exports = function ({covariance, eigen = false}) {
	checkMatrix(covariance);
	checkSymetric(covariance);
	if (eigen) {
		checkDefinitePositive(covariance);
	}
};


/***/ }),

/***/ "./lib/utils/check-matrix.js":
/*!***********************************!*\
  !*** ./lib/utils/check-matrix.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const checkShape = __webpack_require__(/*! ./check-shape */ "./lib/utils/check-shape.js");

module.exports = function (matrix, shape, title = 'checkMatrix') {
	if (!Array.isArray(matrix)) {
		throw (new TypeError(`[${title}] should be a 2-level array matrix and is ${matrix}`));
	}

	matrix.forEach(row => {
		if (!Array.isArray(row)) {
			throw (new TypeError(`[${title}] 1-level array should be a matrix ${JSON.stringify(matrix)}`));
		}
	});
	if (matrix.reduce((a, b) => a.concat(b)).filter(a => Number.isNaN(a)).length > 0) {
		throw (new Error(
			`[${title}] Matrix should not have a NaN\nIn : \n` +
			matrix.join('\n')
		));
	}

	if (shape) {
		checkShape(matrix, shape, title);
	}
};


/***/ }),

/***/ "./lib/utils/check-shape.js":
/*!**********************************!*\
  !*** ./lib/utils/check-shape.js ***!
  \**********************************/
/***/ ((module) => {

const checkShape = function (matrix, shape, title = 'checkShape') {
	if (matrix.length !== shape[0]) {
		throw (new Error(`[${title}] expected size (${shape[0]}) and length (${matrix.length}) does not match`));
	}

	if (shape.length > 1) {
		return matrix.forEach(m => checkShape(m, shape.slice(1), title));
	}
};

module.exports = checkShape;


/***/ }),

/***/ "./lib/utils/correlation-to-covariance.js":
/*!************************************************!*\
  !*** ./lib/utils/correlation-to-covariance.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const checkCovariance = __webpack_require__(/*! ./check-covariance */ "./lib/utils/check-covariance.js");

module.exports = function ({correlation, variance}) {
	checkCovariance({covariance: correlation});
	return correlation.map((c, rowIndex) => c.map((a, colIndex) => a * Math.sqrt(variance[colIndex] * variance[rowIndex])));
};


/***/ }),

/***/ "./lib/utils/covariance-to-correlation.js":
/*!************************************************!*\
  !*** ./lib/utils/covariance-to-correlation.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const checkCovariance = __webpack_require__(/*! ./check-covariance */ "./lib/utils/check-covariance.js");

module.exports = function (covariance) {
	checkCovariance({covariance});
	const variance = covariance.map((_, i) => covariance[i][i]);

	return {
		variance,
		correlation: covariance.map((c, rowIndex) => c.map((a, colIndex) => a / Math.sqrt(variance[colIndex] * variance[rowIndex])))
	};
};


/***/ }),

/***/ "./lib/utils/deep-assign.js":
/*!**********************************!*\
  !*** ./lib/utils/deep-assign.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const uniq = __webpack_require__(/*! ./uniq.js */ "./lib/utils/uniq.js");

const limit = 100;

/**
*Equivalent to the Object.assign method, takes several arguments and creates a new object corresponding to the assignment of the arguments
* @param {Object} args
* @param {Number} step
* @returns {Object}
*/
const deepAssign = function (args, step) {
	if (step > limit) {
		throw (new Error(`In deepAssign, number of recursive call (${step}) reached limit (${limit}), deepAssign is not working on  self-referencing objects`));
	}

	const filterArguments = args.filter(arg => typeof (arg) !== 'undefined' && arg !== null);
	const lastArgument = filterArguments[filterArguments.length - 1];
	if (filterArguments.length === 1) {
		return filterArguments[0];
	}

	if (typeof (lastArgument) !== 'object' || Array.isArray(lastArgument)) {
		return lastArgument;
	}

	if (filterArguments.length === 0) {
		return null;
	}

	const objectsArguments = filterArguments.filter(arg => typeof (arg) === 'object');
	let keys = [];
	objectsArguments.forEach(arg => {
		keys = keys.concat(Object.keys(arg));
	});
	const uniqKeys = uniq(keys);
	const result = {};
	uniqKeys.forEach(key => {
		const values = objectsArguments.map(arg => arg[key]);
		result[key] = deepAssign(values, step + 1);
	});
	return result;
};

module.exports = ((...args) => deepAssign(args, 0));


/***/ }),

/***/ "./lib/utils/get-covariance.js":
/*!*************************************!*\
  !*** ./lib/utils/get-covariance.js ***!
  \*************************************/
/***/ ((module) => {

/**
* @param {Object} opts
* @param {Array.<Array.<Number>>} opts.measures a list of measure, size is LxN L the number of sample, N the dimension
* @param {Array.<Array.<Number>>} opts.averages a list of averages, size is LxN L the number of sample, N the dimension
* @returns {Array.<Array.<Number>>} covariance matrix size is NxN
*/

module.exports = function ({measures, averages}) {
	const l = measures.length;
	const n = measures[0].length;

	if (l === 0) {
		throw (new Error('Cannot find covariance for empty sample'));
	}

	return (new Array(n).fill(1)).map((_, rowIndex) => {
		return (new Array(n).fill(1)).map((_, colIndex) => {
			const stds = measures.map((m, i) => (m[rowIndex] - averages[i][rowIndex]) * (m[colIndex] - averages[i][colIndex]));
			const result = stds.reduce((a, b) => a + b) / l;
			if (Number.isNaN(result)) {
				throw (new TypeError('result is NaN'));
			}

			return result;
		});
	});
};


/***/ }),

/***/ "./lib/utils/polymorph-matrix.js":
/*!***************************************!*\
  !*** ./lib/utils/polymorph-matrix.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
* @typedef {Number | Array.<Number> | Array.<Array.<Number>>} CovarianceParam
*/
const diag = __webpack_require__(/*! ../linalgebra/diag */ "./lib/linalgebra/diag.js");
const checkMatrix = __webpack_require__(/*! ./check-matrix */ "./lib/utils/check-matrix.js");
/**
* If cov is a number, result will be Identity*cov
* If cov is an Array.<Number>, result will be diag(cov)
* If cov is an Array.<Array.<Number>>, result will be cov
* @param {CovarianceParam} cov
* @param {Number} dimension
* @returns {Array.<Array.<Number>>}
*/
module.exports = function (cov, {dimension, title = 'polymorph'} = {}) {
	if (typeof (cov) === 'number' || Array.isArray(cov)) {
		if (typeof (cov) === 'number' && typeof (dimension) === 'number') {
			return diag(new Array(dimension).fill(cov));
		}

		if ((Array.isArray(cov)) && (Array.isArray(cov[0]))) {
			let shape;
			if (typeof (dimension) === 'number') {
				shape = [dimension, dimension];
			}

			checkMatrix(cov, shape, title);
			return cov;
		}

		if ((Array.isArray(cov)) && (typeof (cov[0]) === 'number')) {
			return diag(cov);
		}
	}

	return cov;
};


/***/ }),

/***/ "./lib/utils/to-function.js":
/*!**********************************!*\
  !*** ./lib/utils/to-function.js ***!
  \**********************************/
/***/ ((module) => {

// Const diag = require('../linalgebra/diag.js');

/**
* @callback MatrixCallback
* @returns <Array.<Array.<Number>>
*/

/**
* Tranforms:
** a 2d array into a function (() => array)
** a 1d array into a function (() => diag(array))
*@param {Array.<Number> | Array.<Array.<Number>>} array
*@returns {MatrixCallback}
*/

module.exports = function (array, {label = null} = {}) {
	if (typeof (array) === 'function') {
		return array;
	}

	if (Array.isArray(array)) {
		return array;
	}

	throw (new Error(`${label === null ? '' : label + ' : '}Only arrays and functions are authorized (got: "${array}")`));
};


/***/ }),

/***/ "./lib/utils/uniq.js":
/*!***************************!*\
  !*** ./lib/utils/uniq.js ***!
  \***************************/
/***/ ((module) => {

module.exports = function (array) {
	return array.filter((value, index) =>
		array.indexOf(value) === index
	);
};


/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/instance/getArgument.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/instance/getArgument.js ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the argument of a Complex Number which is restricted to the interval [ 0, 2π ).<br><br>
 * 
 * The argument of the Complex Number is the angle between positive real-axis
 * and the vector representing the Complex Number on Complex plane.<br><br>
 * 
 * If the given Complex Number is considered as 0, returns undefined.
 * @memberof Complex
 * @instance
 * @returns {number} The argument of the Complex Number
 */
function getArgument() {
  var x = this.re;
  var y = this.im;
  var epsilon = 1 / (Math.pow(10, 15) * 2);

  if (Math.abs(x) < epsilon && Math.abs(y) < epsilon) {
    return undefined;
  }

  if (x === 0) {
    if (y > 0) {
      return Math.PI * 0.5;
    }

    return Math.PI * 1.5;
  }

  if (y === 0) {
    if (x > 0) {
      return 0;
    }

    return Math.PI;
  }

  if (x > 0 && y > 0) {
    return Math.atan(y / x);
  }

  if (x < 0 && y > 0) {
    return Math.PI - Math.atan(y / (x * -1));
  }

  if (x < 0 && y < 0) {
    return Math.PI + Math.atan(y * -1 / (x * -1));
  }

  return Math.PI * 2 - Math.atan(y * -1 / x);
}

module.exports = getArgument;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/instance/getImaginary.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/instance/getImaginary.js ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Gets the imaginary part of a Complex Number.
 * @memberof Complex
 * @instance
 * @returns {number} The imaginary part of the Complex Number
 */
function getImaginary() {
  return this.im;
}

module.exports = getImaginary;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/instance/getModulus.js":
/*!************************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/instance/getModulus.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the modulus of a Complex Number.<br><br>
 * 
 * The modulus of the complex number is the length of the vector
 * representing the complex number on complex plane.
 * @memberof Complex
 * @instance
 * @returns {number} The modulus of the Complex Number
 */
function getModulus() {
  return Math.sqrt(Math.pow(this.re, 2) + Math.pow(this.im, 2));
}

module.exports = getModulus;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/instance/getReal.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/instance/getReal.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Gets the real part of a Complex Number.
 * @memberof Complex
 * @instance
 * @returns {number} The real part of the Complex Number
 */
function getReal() {
  return this.re;
}

module.exports = getReal;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/instance/toString.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/instance/toString.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Gets the stringified and formatted Complex Number.
 * @memberof Complex
 * @instance
 * @returns {string} The stringified and formatted Complex Number
 */
function toString() {
  var re = this.re,
      im = this.im;

  if (Number.isNaN(re) || Number.isNaN(im)) {
    return 'NaN';
  }

  if (re === 0 && im === 0) {
    return '0';
  }

  if (re === 0) {
    if (im === 1) {
      return 'i';
    }

    if (im === -1) {
      return '-i';
    }

    return "".concat(im, "i");
  }

  if (im === 0) {
    return "".concat(re);
  }

  if (im > 0) {
    if (im === 1) {
      return "".concat(re, " + i");
    }

    return "".concat(re, " + ").concat(im, "i");
  }

  if (im === -1) {
    return "".concat(re, " - i");
  }

  return "".concat(re, " - ").concat(Math.abs(im), "i");
}

module.exports = toString;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/acos.js":
/*!****************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/acos.js ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the inverse cosine of a Complex Number.
 * @memberof Complex
 * @static
 * @param {Complex} num - Any Complex Number
 * @returns {Complex} The result of inverse cosine function
 */
function acos(num) {
  return this.subtract(new this(Math.PI / 2), this.asin(num));
}

module.exports = acos;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/acot.js":
/*!****************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/acot.js ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the inverse cotangent of a Complex Number.
 * The domain of this function is C / { i , -i , 0 }.<br><br>
 * 
 * If the argument is out of its domain, it returns Complex.NaN.
 * @memberof Complex
 * @static
 * @param {Complex} num - Any Complex Number except i, -i and 0
 * @returns {Complex} The result of inverse cotangent function
 */
function acot(num) {
  return this.atan(this.inverse(num));
}

module.exports = acot;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/acsc.js":
/*!****************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/acsc.js ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the inverse cosecant of a Complex Number.
 * The domain of this function is C / { 0 }.<br><br>
 * 
 * If the argument is out of its domain, it returns Complex.NaN.
 * @memberof Complex
 * @static
 * @param {Complex} num - Any Complex Number except 0
 * @returns {Complex} The result of inverse cosecant function
 */
function acsc(num) {
  return this.asin(this.inverse(num));
}

module.exports = acsc;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/add.js":
/*!***************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/add.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the sum of two Complex Number.
 * @memberof Complex
 * @static
 * @param {Complex} num1 - The Complex Number on the left of '+' operator.
 * @param {Complex} num2 - The Complex Number on the right of '+' operator.
 * @returns {Complex} The sum of two Complex Numbers
 */
function add(num1, num2) {
  if (!(num1 instanceof this) || !(num2 instanceof this)) {
    return this.NaN;
  }

  return new this(num1.re + num2.re, num1.im + num2.im);
}

module.exports = add;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/asec.js":
/*!****************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/asec.js ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the inverse secant of a Complex Number.
 * The domain of this function is C / { 0 }.<br><br>
 * 
 * If the argument is out of its domain, it returns Complex.NaN.
 * @memberof Complex
 * @static
 * @param {Complex} num - Any Complex Number except 0
 * @returns {Complex} The result of inverse secant function
 */
function asec(num) {
  return this.acos(this.inverse(num));
}

module.exports = asec;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/asin.js":
/*!****************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/asin.js ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the inverse sine of a Complex Number.
 * @memberof Complex
 * @static
 * @param {Complex} num - Any Complex Number
 * @returns {Complex} The result of inverse sine function
 */
function asin(num) {
  return this.multiply(new this(0, -1), this.log(this.add(this.multiply(new this(0, 1), num), this.pow(this.subtract(this.ONE, this.pow(num, 2)), 0.5))));
}

module.exports = asin;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/atan.js":
/*!****************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/atan.js ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the inverse tangent of a Complex Number.
 * The domain of this function is C / { i , -i }.<br><br>
 * 
 * If the argument is out of its domain, it returns Complex.NaN.
 * @memberof Complex
 * @static
 * @param {Complex} num - Any Complex Number except i and -i
 * @returns {Complex} The result of inverse tangent function
 */
function atan(num) {
  return this.multiply(new this(0, 1 / 2), this.subtract(this.log(this.subtract(this.ONE, this.multiply(new this(0, 1), num))), this.log(this.add(this.ONE, this.multiply(new this(0, 1), num)))));
}

module.exports = atan;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/conjugate.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/conjugate.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the complex conjugate of the Complex Number.
 * @memberof Complex
 * @static
 * @param {Complex} num - Complex number
 * @returns {Complex} The complex conjugate of the Complex Number
 */
function conjugate(num) {
  if (!(num instanceof this)) {
    return this.NaN;
  }

  return new this(num.getReal(), num.getImaginary() * -1);
}

module.exports = conjugate;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/cos.js":
/*!***************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/cos.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the cosine of a Complex Number.
 * @memberof Complex
 * @static
 * @param {Complex} num - Any Complex Number
 * @returns {Complex} The result of cosine function
 */
function cos(num) {
  if (!(num instanceof this)) {
    return this.NaN;
  }

  var a = num.getReal();
  var b = num.getImaginary();
  return new this(Math.cos(a) * Math.cosh(b), Math.sin(a) * Math.sinh(b) * -1);
}

module.exports = cos;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/cot.js":
/*!***************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/cot.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the cotangent of a Complex Number.
 * The domain of this function is C / { kπ/2 : k is any integer }.<br><br>
 * 
 * If the argument is out of its domain, it returns Complex.NaN.
 * @memberof Complex
 * @static
 * @param {Complex} num - Any Complex Number which is not the multiple of π/2
 * @returns {Complex} The result of cotangent function
 */
function cot(num) {
  return this.divide(this.ONE, this.tan(num));
}

module.exports = cot;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/csc.js":
/*!***************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/csc.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the cosecant of a Complex Number.
 * The domain of this function is C / { kπ : k is any integer }.<br><br>
 * 
 * If the argument is out of its domain, it returns Complex.NaN.
 * @memberof Complex
 * @static
 * @param {Complex} num - Any Complex Number which is not the multiple of π
 * @returns {Complex} The result of cosecant function
 */
function csc(num) {
  return this.divide(this.ONE, this.sin(num));
}

module.exports = csc;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/divide.js":
/*!******************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/divide.js ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the quotient of two Complex Number.<br><br>
 * 
 * Note that if the denominator is considered as 0,
 * returns Complex.NaN instead of Infinity.
 * @memberof Complex
 * @static
 * @param {Complex} num1 - The Complex Number on the left of '/' operator.
 * @param {Complex} num2 - The Complex Number on the right of '/' operator.
 * @returns {Complex} The quotient of two Complex Numbers
 */
function divide(num1, num2) {
  if (!(num1 instanceof this) || !(num2 instanceof this)) {
    return this.NaN;
  }

  var a = num1.re;
  var b = num1.im;
  var c = num2.re;
  var d = num2.im;

  if (Math.abs(c) < this.EPSILON && Math.abs(d) < this.EPSILON) {
    return this.NaN;
  }

  var denominator = Math.pow(c, 2) + Math.pow(d, 2);
  return new this((a * c + b * d) / denominator, (b * c - a * d) / denominator);
}

module.exports = divide;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/exp.js":
/*!***************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/exp.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the exponential function with base E.
 * @memberof Complex
 * @static
 * @param {Complex} num - Exponent
 * @returns {Complex} The value of E to the power of num
 */
function exp(num) {
  if (!(num instanceof this)) {
    return this.NaN;
  }

  var re = num.getReal();
  var theta = num.getImaginary();
  var r = Math.exp(re);
  return new this(r * Math.cos(theta), r * Math.sin(theta));
}

module.exports = exp;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/inverse.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/inverse.js ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the inverse of the Complex Number.
 * @memberof Complex
 * @static
 * @param {Complex} num - Complex Number
 * @returns {number} Inverse of the Complex Number
 */
function inverse(num) {
  if (!(num instanceof this)) {
    return this.NaN;
  }

  return this.divide(this.ONE, num);
}

module.exports = inverse;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/isEqual.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/isEqual.js ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether two Complex Numbers are considered as identical.<br><br>
 * 
 * Two Complex Numbers are considered as identical if either
 * both are NaN or both real and imaginary parts are extremely closed.<br><br>
 * 
 * The test criterion is Math.abs(x - y) < 1 / (10 ** digit * 2).
 * For default value 15, it should be 5e-16.
 * That means if the difference of two numbers is less than 5e-16,
 * they are considered as same value.
 * @memberof Complex
 * @static
 * @param {Complex} num1 - Complex Number
 * @param {Complex} num2 - Complex Number
 * @param {number} [digit=15] - Number of significant digits
 * @returns {boolean} Returns true if two Complex Numbers are considered as identical
 */
function isEqual(num1, num2) {
  var digit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 15;

  if (!(num1 instanceof this) || !(num2 instanceof this)) {
    return false;
  }

  if (!Number.isInteger(digit) || digit < 0) {
    throw new Error('Invalid argument: Expected a non-negative integer digit');
  }

  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var a = num1.getReal();
  var b = num1.getImaginary();
  var c = num2.getReal();
  var d = num2.getImaginary();

  if (Number.isNaN(a) && Number.isNaN(b) && Number.isNaN(c) && Number.isNaN(d)) {
    return true;
  }

  return Math.abs(a - c) < EPSILON && Math.abs(b - d) < EPSILON;
}

module.exports = isEqual;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/isNaN.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/isNaN.js ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the Complex Number is NaN or not.
 * @memberof Complex
 * @static
 * @param {Complex} num - Any Complex number
 * @returns {boolean} Returns true if one of real and imaginary part are NaN
 */
function isNaN(num) {
  if (!(num instanceof this)) {
    return false;
  }

  var re = num.getReal();
  var im = num.getImaginary();

  if (Number.isNaN(re) || Number.isNaN(im)) {
    return true;
  }

  return false;
}

module.exports = isNaN;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/log.js":
/*!***************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/log.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the natural log of the Complex Number.<br><br>
 * 
 * Note that complex log is a multivalued function,
 * and this function only provides the principal value by
 * restricting the imaginary part to the interval [0, 2π).
 * @memberof Complex
 * @static
 * @param {Complex} num - Complex Number
 * @returns {number} Natural log of the Complex Number
 */
function log(num) {
  if (!(num instanceof this)) {
    return this.NaN;
  }

  var r = num.getModulus();
  var theta = num.getArgument();

  if (r < this.EPSILON || theta === undefined) {
    return this.NaN;
  }

  return new this(Math.log(r), theta);
}

module.exports = log;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/multiply.js":
/*!********************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/multiply.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the product of two Complex Number.
 * @memberof Complex
 * @static
 * @param {Complex} num1 - The Complex Number on the left of '*' operator.
 * @param {Complex} num2 - The Complex Number on the right of '*' operator.
 * @returns {Complex} The product of two Complex Numbers
 */
function multiply(num1, num2) {
  if (!(num1 instanceof this) || !(num2 instanceof this)) {
    return this.NaN;
  }

  var a = num1.re;
  var b = num1.im;
  var c = num2.re;
  var d = num2.im;
  return new this(a * c - b * d, a * d + b * c);
}

module.exports = multiply;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/pow.js":
/*!***************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/pow.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the power of the Complex Number.
 * The exponent can be any real number or Complex Number<br><br>
 * 
 * You can find the k-th root of complex number by setting the exponent to 1 / k.
 * But you should know that it only returns one out of k possible solutions.
 * @memberof Complex
 * @static
 * @param {Complex} num - Base
 * @param {Complex|number} n - Exponent
 * @returns {Complex} The result of the exponentiation
 */
function pow(num, n) {
  if (!(num instanceof this) || typeof n !== 'number' && !(n instanceof this)) {
    return this.NaN;
  }

  if (typeof n === 'number') {
    if (!Number.isFinite(n) || Number.isNaN(n)) {
      return this.NaN;
    }

    if (n === 0) {
      return this.ONE;
    }

    if (this.isEqual(num, this.ZERO)) {
      return this.ZERO;
    }

    return this.exp(this.multiply(new this(n, 0), this.log(num)));
  }

  if (n instanceof this) {
    return this.exp(this.multiply(n, this.log(num)));
  }

  return this.NaN;
}

module.exports = pow;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/sec.js":
/*!***************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/sec.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the secant of a Complex Number.
 * The domain of this function is C / { (k + 0.5)π : k is any integer }.<br><br>
 * 
 * If the argument is out of its domain, it returns Complex.NaN.
 * @memberof Complex
 * @static
 * @param {Complex} num - Any Complex Number which is not in the form of (k + 0.5)π
 * @returns {Complex} The result of secant function
 */
function sec(num) {
  return this.divide(this.ONE, this.cos(num));
}

module.exports = sec;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/sin.js":
/*!***************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/sin.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the sine of a Complex Number.
 * @memberof Complex
 * @static
 * @param {Complex} num - Any Complex Number
 * @returns {Complex} The result of sine function
 */
function sin(num) {
  if (!(num instanceof this)) {
    return this.NaN;
  }

  var a = num.getReal();
  var b = num.getImaginary();
  return new this(Math.sin(a) * Math.cosh(b), Math.cos(a) * Math.sinh(b));
}

module.exports = sin;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/subtract.js":
/*!********************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/subtract.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the difference of two Complex Number.
 * @memberof Complex
 * @static
 * @param {Complex} num1 - The Complex Number on the left of '-' operator.
 * @param {Complex} num2 - The Complex Number on the right of '-' operator.
 * @returns {Complex} The difference of two Complex Numbers
 */
function subtract(num1, num2) {
  if (!(num1 instanceof this) || !(num2 instanceof this)) {
    return this.NaN;
  }

  return new this(num1.re - num2.re, num1.im - num2.im);
}

module.exports = subtract;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/core/static/tan.js":
/*!***************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/static/tan.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the tangent of a Complex Number.
 * The domain of this function is C / { (k + 0.5)π : k is any integer }.<br><br>
 * 
 * If the argument is out of its domain, it returns Complex.NaN.
 * @memberof Complex
 * @static
 * @param {Complex} num - Any Complex Number which is not in the form of (k + 0.5)π
 * @returns {Complex} The result of tangent function
 */
function tan(num) {
  return this.divide(this.sin(num), this.cos(num));
}

module.exports = tan;

/***/ }),

/***/ "./node_modules/@rayyamhk/complex/lib/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Creates a new Complex Number.
 * @namespace Complex
 * @class
 * @param {number} arg1 - The real part of the Complex Number
 * @param {number} arg2 - The imaginary part of the Complex Number
 */
function Complex(arg1, arg2) {
  var type1 = _typeof(arg1);

  var type2 = _typeof(arg2);

  if (type1 === 'number' && type2 === 'undefined') {
    if (Number.isNaN(arg1) || !Number.isFinite(arg1)) {
      this.re = NaN;
      this.im = NaN;
      return this;
    }

    this.re = arg1;
    this.im = 0;
    return this;
  }

  if (type1 === 'number' && type2 === 'number') {
    if (Number.isNaN(arg1) || Number.isNaN(arg2) || !Number.isFinite(arg1) || !Number.isFinite(arg2)) {
      this.re = NaN;
      this.im = NaN;
      return this;
    }

    this.re = arg1;
    this.im = arg2;
    return this;
  }

  this.re = NaN;
  this.im = NaN;
  return this;
}

module.exports = Complex;
Complex.prototype.getReal = __webpack_require__(/*! ./core/instance/getReal */ "./node_modules/@rayyamhk/complex/lib/core/instance/getReal.js");
Complex.prototype.getImaginary = __webpack_require__(/*! ./core/instance/getImaginary */ "./node_modules/@rayyamhk/complex/lib/core/instance/getImaginary.js");
Complex.prototype.getModulus = __webpack_require__(/*! ./core/instance/getModulus */ "./node_modules/@rayyamhk/complex/lib/core/instance/getModulus.js");
Complex.prototype.getArgument = __webpack_require__(/*! ./core/instance/getArgument */ "./node_modules/@rayyamhk/complex/lib/core/instance/getArgument.js");
Complex.prototype.toString = __webpack_require__(/*! ./core/instance/toString */ "./node_modules/@rayyamhk/complex/lib/core/instance/toString.js");
Complex.isNaN = __webpack_require__(/*! ./core/static/isNaN */ "./node_modules/@rayyamhk/complex/lib/core/static/isNaN.js");
Complex.isEqual = __webpack_require__(/*! ./core/static/isEqual */ "./node_modules/@rayyamhk/complex/lib/core/static/isEqual.js");
Complex.conjugate = __webpack_require__(/*! ./core/static/conjugate */ "./node_modules/@rayyamhk/complex/lib/core/static/conjugate.js");
Complex.inverse = __webpack_require__(/*! ./core/static/inverse */ "./node_modules/@rayyamhk/complex/lib/core/static/inverse.js");
Complex.add = __webpack_require__(/*! ./core/static/add */ "./node_modules/@rayyamhk/complex/lib/core/static/add.js");
Complex.subtract = __webpack_require__(/*! ./core/static/subtract */ "./node_modules/@rayyamhk/complex/lib/core/static/subtract.js");
Complex.multiply = __webpack_require__(/*! ./core/static/multiply */ "./node_modules/@rayyamhk/complex/lib/core/static/multiply.js");
Complex.divide = __webpack_require__(/*! ./core/static/divide */ "./node_modules/@rayyamhk/complex/lib/core/static/divide.js");
Complex.exp = __webpack_require__(/*! ./core/static/exp */ "./node_modules/@rayyamhk/complex/lib/core/static/exp.js");
Complex.log = __webpack_require__(/*! ./core/static/log */ "./node_modules/@rayyamhk/complex/lib/core/static/log.js");
Complex.pow = __webpack_require__(/*! ./core/static/pow */ "./node_modules/@rayyamhk/complex/lib/core/static/pow.js");
Complex.sin = __webpack_require__(/*! ./core/static/sin */ "./node_modules/@rayyamhk/complex/lib/core/static/sin.js");
Complex.cos = __webpack_require__(/*! ./core/static/cos */ "./node_modules/@rayyamhk/complex/lib/core/static/cos.js");
Complex.tan = __webpack_require__(/*! ./core/static/tan */ "./node_modules/@rayyamhk/complex/lib/core/static/tan.js");
Complex.csc = __webpack_require__(/*! ./core/static/csc */ "./node_modules/@rayyamhk/complex/lib/core/static/csc.js");
Complex.sec = __webpack_require__(/*! ./core/static/sec */ "./node_modules/@rayyamhk/complex/lib/core/static/sec.js");
Complex.cot = __webpack_require__(/*! ./core/static/cot */ "./node_modules/@rayyamhk/complex/lib/core/static/cot.js");
Complex.asin = __webpack_require__(/*! ./core/static/asin */ "./node_modules/@rayyamhk/complex/lib/core/static/asin.js");
Complex.acos = __webpack_require__(/*! ./core/static/acos */ "./node_modules/@rayyamhk/complex/lib/core/static/acos.js");
Complex.atan = __webpack_require__(/*! ./core/static/atan */ "./node_modules/@rayyamhk/complex/lib/core/static/atan.js");
Complex.acsc = __webpack_require__(/*! ./core/static/acsc */ "./node_modules/@rayyamhk/complex/lib/core/static/acsc.js");
Complex.asec = __webpack_require__(/*! ./core/static/asec */ "./node_modules/@rayyamhk/complex/lib/core/static/asec.js");
Complex.acot = __webpack_require__(/*! ./core/static/acot */ "./node_modules/@rayyamhk/complex/lib/core/static/acot.js");
/**
 * It represents NaN in this library. It is equivalent to new Complex(NaN).<br><br>
 * 
 * It is important to know that this library does not introduce the concept of Complex Infinity,
 * all Infinity in this library are represented by Complex.NaN.
 * @static
 */

Complex.NaN = new Complex(NaN);
/** @static */

Complex.ONE = new Complex(1);
/** @static */

Complex.ZERO = new Complex(0);
/** @static */

Complex.PI = new Complex(Math.PI);
/** @static */

Complex.E = new Complex(Math.E);
/**
 * It represents the value of 5e-16, which is the smallest number considered as non-zero in this library.
 * In the other words, any number less than Complex.EPSILON is considered as 0.<br><br>
 * 
 * Note that Complex.EPSILON is number instead of instance of Complex.
 * @static
 */

Complex.EPSILON = 1 / (Math.pow(10, 15) * 2);

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/Error.js":
/*!****************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/Error.js ***!
  \****************************************************/
/***/ ((module) => {

"use strict";


module.exports = {
  INVALID_ARRAY: 'Invalid argument: Received a non-array argument',
  INVALID_MATRIX: 'Invalid argument: Received an invalid matrix',
  INVALID_SQUARE_MATRIX: 'Invalid argument: Received a non-square matrix',
  INVALID_UPPER_TRIANGULAR_MATRIX: 'Invalid argument: Received a non upper-triangular matrix',
  INVALID_LOWER_TRIANGULAR_MATRIX: 'Invalid argument: Received a non lower-triangular matrix',
  INVALID_EXPONENT: 'Invalid argument: Expected a non-negative integer exponent',
  INVALID_ROW_COL: 'Invalid argument: Expected non-negative integer row and column',
  INVALID_ROW: 'Invalid argument: Expected non-negative integer row',
  INVALID_COLUMN: 'Invalid argument: Expected non-negative integer column',
  INVALID_ROWS_EXPRESSION: 'Invalid argument: Received invalid rows expression',
  INVALID_COLUMNS_EXPRESSION: 'Invalid argument: Received invalid columns expression',
  INVALID_P_NORM: 'Invalid argument: Received invalid p-norm',
  OVERFLOW_INDEX: 'Invalid argument: Matrix index overflow',
  OVERFLOW_COLUMN: 'Invalid argument: Column index overflow',
  OVERFLOW_ROW: 'Invalid argument: Row index overflow',
  NO_UNIQUE_SOLUTION: 'Arithmetic Exception: The system has no unique solution',
  SIZE_INCOMPATIBLE: 'Invalid argument: Matrix size-incompatible',
  SINGULAR_MATRIX: 'Arithmetic Exception: The matrix is not invertible',
  EXPECTED_STRING_NUMBER_AT_POS_1_2: 'Invalid argument: Expected a string or a number at arguments[1] and arguments[2]',
  EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES: 'Invalid argument: Expected either an array of numbers or an array of square matrices'
};

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/decompositions/LU.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/decompositions/LU.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Calculates the LUP decomposition of the Matrix,
 * where L is lower triangular matrix which diagonal entries are always 1,
 * U is upper triangular matrix, and P is permutation matrix.<br><br>
 * 
 * It is implemented using Gaussian Elimination with Partial Pivoting in order to
 * reduce the error caused by floating-point arithmetic.<br><br>
 * 
 * Note that if optimized is true, P is a Permutation Array and both L and U are merged
 * into one matrix in order to improve performance.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any matrix
 * @param {boolean} [optimized=false] - Returns [P, LU] if it is true, [P, L, U] if it is false
 * @returns {Matrix[]} The LUP decomposition of Matrix
 */


function LU(A) {
  var optimized = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var size = Math.min(row, col);
  var EPSILON = 1 / (Math.pow(10, A._digit) * 2);
  var permutation = initPermutation(row);

  var copy = this.clone(A)._matrix;

  for (var i = 0; i < row - 1; i++) {
    var currentCol = Math.min(i, col); // apply Partial Pivoting

    PartialPivoting(copy, permutation, currentCol, row, col);
    var ith = permutation[i];
    var pivot = copy[ith][currentCol];

    if (Math.abs(pivot) < EPSILON) {
      continue;
    }

    for (var j = i + 1; j < row; j++) {
      var jth = permutation[j];
      var entry = copy[jth][currentCol];

      if (Math.abs(entry) >= EPSILON) {
        var factor = entry / pivot;

        for (var k = currentCol; k < col; k++) {
          copy[jth][k] -= factor * copy[ith][k];
        }

        copy[jth][currentCol] = factor;
      }
    }
  }

  var result = new Array(row);

  for (var _i2 = 0; _i2 < row; _i2++) {
    result[_i2] = copy[permutation[_i2]];
  }

  if (optimized) {
    return [permutation, new this(result)];
  }

  var P = this.generate(row, row, function (i, j) {
    var idx = permutation[i];

    if (j === idx) {
      return 1;
    }

    return 0;
  });
  var L = this.generate(row, size, function (i, j) {
    if (i === j) {
      return 1;
    }

    if (i < j) {
      return 0;
    }

    return result[i][j];
  });
  var U = this.generate(size, col, function (i, j) {
    if (i > j) {
      return 0;
    }

    return result[i][j];
  });
  return [P, L, U];
}

;

function initPermutation(size) {
  var permutation = new Array(size);

  for (var i = 0; i < size; i++) {
    permutation[i] = i;
  }

  return permutation;
}

function PartialPivoting(matrix, permutation, pos, row, col) {
  var currentCol = Math.min(pos, col);
  var maxIdx = pos;
  var max = Math.abs(matrix[permutation[pos]][currentCol]);

  for (var i = pos + 1; i < row; i++) {
    var value = Math.abs(matrix[permutation[i]][currentCol]);

    if (value > max) {
      maxIdx = i;
      max = value;
    }
  }

  var t = permutation[pos];
  permutation[pos] = permutation[maxIdx];
  permutation[maxIdx] = t;
}

module.exports = LU;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/decompositions/QR.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/decompositions/QR.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Calculates the QR decomposition of the Matrix
 * where Q is orthogonal matrix, R is upper triangular matrix.<br><br>
 * 
 * The algorithm is implemented using Householder Transform instead of Gram–Schmidt process
 * because the Householder Transform is more numerically stable.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any matrix
 * @returns {Matrix[]} The QR decomposition of matrix in the form of [Q, R]
 */


function QR(A) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var size = Math.min(row, col);
  var EPSILON = 1 / (Math.pow(10, A._digit) * 2);

  var matrixR = this.clone(A)._matrix;

  var matrixQ = this.identity(row)._matrix;

  for (var j = 0; j < size; j++) {
    // if all entries below main diagonal are considered as zero, skip this round
    var skip = true;

    for (var i = j + 1; i < row; i++) {
      if (Math.abs(matrixR[i][j]) >= EPSILON) {
        skip = false;
        break;
      }
    }

    if (!skip) {
      // Apply Householder transform
      var norm = 0;

      for (var _i2 = j; _i2 < row; _i2++) {
        norm += Math.pow(matrixR[_i2][j], 2);
      }

      norm = Math.sqrt(norm); // reduce floating point arithmatic error

      var s = -1;

      if (matrixR[j][j] < 0) {
        s = 1;
      }

      var u1 = matrixR[j][j] - s * norm;
      var w = new Array(row - j);

      for (var _i3 = 0; _i3 < row - j; _i3++) {
        w[_i3] = matrixR[_i3 + j][j] / u1;
      }

      w[0] = 1;
      var tau = -1 * s * u1 / norm;
      var subR = new Array(row - j);

      for (var _i4 = 0; _i4 < row - j; _i4++) {
        var newRow = new Array(col);

        for (var k = 0; k < col; k++) {
          newRow[k] = matrixR[j + _i4][k];
        }

        subR[_i4] = newRow;
      }

      for (var _i5 = j; _i5 < row; _i5++) {
        for (var _k = 0; _k < col; _k++) {
          var summation = 0;

          for (var m = 0; m < row - j; m++) {
            summation += subR[m][_k] * w[m];
          }

          matrixR[_i5][_k] = subR[_i5 - j][_k] - tau * w[_i5 - j] * summation;
        }
      }

      var subQ = new Array(row);

      for (var _i6 = 0; _i6 < row; _i6++) {
        var _newRow = new Array(row - j);

        for (var _k2 = 0; _k2 < row - j; _k2++) {
          _newRow[_k2] = matrixQ[_i6][j + _k2];
        }

        subQ[_i6] = _newRow;
      }

      for (var _i7 = 0; _i7 < row; _i7++) {
        for (var _k3 = j; _k3 < row; _k3++) {
          var _summation = 0;

          for (var _m = 0; _m < row - j; _m++) {
            _summation += subQ[_i7][_m] * w[_m];
          }

          matrixQ[_i7][_k3] = subQ[_i7][_k3 - j] - tau * w[_k3 - j] * _summation;
        }
      }
    }
  }

  for (var _i8 = 0; _i8 < row; _i8++) {
    for (var _j = 0; _j < col; _j++) {
      if (_i8 > _j) {
        matrixR[_i8][_j] = 0;
      }
    }
  }

  return [new this(matrixQ), new this(matrixR)];
}

;
module.exports = QR;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/linear-equations/backward.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/linear-equations/backward.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var empty = __webpack_require__(/*! ../../util/empty */ "./node_modules/@rayyamhk/matrix/lib/util/empty.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    INVALID_UPPER_TRIANGULAR_MATRIX = _require.INVALID_UPPER_TRIANGULAR_MATRIX,
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX,
    SIZE_INCOMPATIBLE = _require.SIZE_INCOMPATIBLE,
    NO_UNIQUE_SOLUTION = _require.NO_UNIQUE_SOLUTION;
/**
* Solve system of linear equations Ux = y using backward substitution,
* where U is an upper triangular matrix.
* If there is no unique solutions, an error is thrown.
* @memberof Matrix
* @static
* @param {Matrix} U - Any n x n upper triangular Matrix
* @param {Matrix} y - Any n x 1 Matrix
* @returns {Matrix} n x 1 Matrix which is the solution of Ux = y
*/


function backward(U, y) {
  if (!(U instanceof this) || !(y instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!U.isUpperTriangular()) {
    throw new Error(INVALID_UPPER_TRIANGULAR_MATRIX);
  }

  if (!U.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  var size = U.size()[0];

  var _y$size = y.size(),
      _y$size2 = _slicedToArray(_y$size, 2),
      yrow = _y$size2[0],
      ycol = _y$size2[1];

  var matrixU = U._matrix;
  var matrixY = y._matrix;

  if (yrow !== size || ycol !== 1) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  var EPSILON = 1 / (Math.pow(10, U._digit) * 2);

  for (var i = 0; i < size; i++) {
    if (Math.abs(matrixU[i][i]) < EPSILON) {
      throw new Error(NO_UNIQUE_SOLUTION);
    }
  }

  var coefficients = empty(size, 1);

  for (var _i2 = size - 1; _i2 >= 0; _i2--) {
    var summation = 0;

    for (var j = _i2 + 1; j < size; j++) {
      summation += coefficients[j][0] * matrixU[_i2][j];
    }

    coefficients[_i2][0] = (matrixY[_i2][0] - summation) / matrixU[_i2][_i2];
  }

  return new this(coefficients);
}

;
module.exports = backward;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/linear-equations/forward.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/linear-equations/forward.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var empty = __webpack_require__(/*! ../../util/empty */ "./node_modules/@rayyamhk/matrix/lib/util/empty.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    INVALID_LOWER_TRIANGULAR_MATRIX = _require.INVALID_LOWER_TRIANGULAR_MATRIX,
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX,
    SIZE_INCOMPATIBLE = _require.SIZE_INCOMPATIBLE,
    NO_UNIQUE_SOLUTION = _require.NO_UNIQUE_SOLUTION;
/**
 * Solve system of linear equations Lx = y using forward substitution,
 * where L is a lower triangular matrix.
 * If there is no unique solutions, an error is thrown.
 * @memberof Matrix
 * @static
 * @param {Matrix} L - Any n x n lower triangular Matrix
 * @param {Matrix} y - Any n x 1 Matrix
 * @returns {Matrix} n x 1 Matrix which is the solution of Lx = y
 */


function forward(L, y) {
  if (!(L instanceof this) || !(y instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!L.isLowerTriangular()) {
    throw new Error(INVALID_LOWER_TRIANGULAR_MATRIX);
  }

  if (!L.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  var size = L.size()[0];

  var _y$size = y.size(),
      _y$size2 = _slicedToArray(_y$size, 2),
      yrow = _y$size2[0],
      ycol = _y$size2[1];

  var matrixL = L._matrix;
  var matrixY = y._matrix;

  if (size !== yrow || ycol !== 1) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  var EPSILON = 1 / (Math.pow(10, L._digit) * 2);

  for (var i = 0; i < size; i++) {
    if (Math.abs(matrixL[i][i]) < EPSILON) {
      throw new Error(NO_UNIQUE_SOLUTION);
    }
  }

  var coefficients = empty(size, 1);

  for (var _i2 = 0; _i2 < size; _i2++) {
    var summation = 0;

    for (var j = 0; j < _i2; j++) {
      summation += coefficients[j][0] * matrixL[_i2][j];
    }

    coefficients[_i2][0] = (matrixY[_i2][0] - summation) / matrixL[_i2][_i2];
  }

  return new this(coefficients);
}

;
module.exports = forward;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/linear-equations/solve.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/linear-equations/solve.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    NO_UNIQUE_SOLUTION = _require.NO_UNIQUE_SOLUTION,
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX,
    SIZE_INCOMPATIBLE = _require.SIZE_INCOMPATIBLE;
/**
 * Solve system of linear equations Ax = y using LU decomposition.
 * If there is no unique solutions, an error is thrown.
 * @memberof Matrix
 * @static
 * @param {Matrix} L - Any n x n square Matrix
 * @param {Matrix} y - Any n x 1 Matrix
 * @returns {Matrix} n x 1 Matrix which is the solution of Ax = y
 */


function solve(A, b) {
  if (!(A instanceof this) || !(b instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!A.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      aRow = _A$size2[0],
      aCol = _A$size2[1];

  var _b$size = b.size(),
      _b$size2 = _slicedToArray(_b$size, 2),
      bRow = _b$size2[0],
      bCol = _b$size2[1];

  if (aCol !== bRow || bCol !== 1) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  var EPSILON = 1 / (Math.pow(10, A._digit) * 2);

  var _this$LU = this.LU(A, true),
      _this$LU2 = _slicedToArray(_this$LU, 2),
      P = _this$LU2[0],
      LU = _this$LU2[1];

  var matrixLU = LU._matrix;
  var matrixB = b._matrix;

  for (var i = aRow - 1; i >= 0; i--) {
    if (Math.abs(matrixLU[i][i]) < EPSILON) {
      throw new Error(NO_UNIQUE_SOLUTION);
    }
  }

  var clonedVector = new Array(bRow);
  var coefficients = new Array(bRow);

  for (var _i2 = 0; _i2 < bRow; _i2++) {
    // eslint-disable-next-line prefer-destructuring
    clonedVector[_i2] = matrixB[P[_i2]][0];
  }

  for (var _i3 = 0; _i3 < aRow; _i3++) {
    var summation = 0;

    for (var j = 0; j < _i3; j++) {
      summation += coefficients[j] * matrixLU[_i3][j];
    }

    coefficients[_i3] = clonedVector[_i3] - summation;
  }

  for (var _i4 = aRow - 1; _i4 >= 0; _i4--) {
    var _summation = 0;

    for (var _j = _i4 + 1; _j < aRow; _j++) {
      _summation += matrixLU[_i4][_j] * clonedVector[_j];
    }

    clonedVector[_i4] = (coefficients[_i4] - _summation) / matrixLU[_i4][_i4];
  }

  for (var _i5 = 0; _i5 < bRow; _i5++) {
    coefficients[_i5] = [clonedVector[_i5]];
  }

  return new this(coefficients);
}

;
module.exports = solve;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/operations/add.js":
/*!******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/operations/add.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    SIZE_INCOMPATIBLE = _require.SIZE_INCOMPATIBLE;
/**
 * Calculates the sum of two Matrices.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {Matrix} B - Any Matrix that has same size with A
 * @returns {Matrix} The sum of two Matrices
 */


function add(A, B) {
  if (!(A instanceof this) || !(B instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var _B$size = B.size(),
      _B$size2 = _slicedToArray(_B$size, 2),
      row2 = _B$size2[0],
      col2 = _B$size2[1];

  if (row !== row2 || col !== col2) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  var matrix1 = A._matrix;
  var matrix2 = B._matrix;
  return this.generate(row, col, function (i, j) {
    return matrix1[i][j] + matrix2[i][j];
  });
}

;
module.exports = add;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/operations/inverse.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/operations/inverse.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX,
    SINGULAR_MATRIX = _require.SINGULAR_MATRIX;

var Matrix = __webpack_require__(/*! ../.. */ "./node_modules/@rayyamhk/matrix/lib/index.js");
/**
 * Find the inverse of non-singular matrix using Elementary Row Operations.
 * If the matrix is singular, an error is thrown.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any square Matrix
 * @returns {Matrix} The inverse of A
 */


function inverse(A) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!A.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  var size = A.size()[0];

  if (size === 0) {
    // inverse of 0x0 matrix is itself
    return new Matrix([]);
  }

  var EPSILON = 1 / (Math.pow(10, A._digit) * 2);

  var inv = this.identity(size)._matrix;

  var clone = this.clone(A)._matrix;

  var permutation = initPermutation(size); // iterate each column

  for (var j = 0; j < size; j++) {
    var pivotIdx = j;
    var pivot = clone[permutation[j]][j];

    while (Math.abs(pivot) < EPSILON && pivotIdx < size - 1) {
      pivotIdx++;
      pivot = clone[permutation[pivotIdx]][j];
    }

    if (Math.abs(pivot) < EPSILON) {
      throw new Error(SINGULAR_MATRIX);
    }

    if (j !== pivotIdx) {
      var temp = permutation[j];
      permutation[j] = permutation[pivotIdx];
      permutation[pivotIdx] = temp;
    }

    var pivotRow = permutation[j]; // the pivot is guaranteed to be non-zero

    for (var i = 0; i < size; i++) {
      var ith = permutation[i];

      if (i === j) {
        for (var k = 0; k < size; k++) {
          if (k === j) {
            clone[ith][k] = 1;
          }

          if (k > j) {
            clone[ith][k] /= pivot;
          }

          inv[ith][k] /= pivot;
        }

        pivot = 1;
      }

      if (i !== j && Math.abs(clone[ith][j]) >= EPSILON) {
        var factor = clone[ith][j] / pivot;

        for (var _k = 0; _k < size; _k++) {
          if (_k === j) {
            clone[ith][_k] = 0;
          }

          if (_k > j) {
            clone[ith][_k] -= factor * clone[pivotRow][_k];
          }

          inv[ith][_k] -= factor * inv[pivotRow][_k];
        }
      }
    }
  }

  for (var _i = 0; _i < size; _i++) {
    clone[_i] = inv[permutation[_i]];
  }

  return new this(clone);
}

;

function initPermutation(size) {
  var permutation = new Array(size);

  for (var i = 0; i < size; i++) {
    permutation[i] = i;
  }

  return permutation;
}

module.exports = inverse;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/operations/multiply.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/operations/multiply.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var empty = __webpack_require__(/*! ../../util/empty */ "./node_modules/@rayyamhk/matrix/lib/util/empty.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    SIZE_INCOMPATIBLE = _require.SIZE_INCOMPATIBLE;
/**
 * Calculates the product of two Matrices.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {Matrix} B - Any Matrix that is size-compatible with A
 * @returns {Matrix} The product of two Matrices
 */


function multiply(A, B) {
  if (!(A instanceof this) || !(B instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      Arow = _A$size2[0],
      Acol = _A$size2[1];

  var _B$size = B.size(),
      _B$size2 = _slicedToArray(_B$size, 2),
      Brow = _B$size2[0],
      Bcol = _B$size2[1];

  if (Acol !== Brow) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  var matrixA = A._matrix;
  var matrixB = B._matrix;
  var result = empty(Arow, Bcol);

  for (var i = 0; i < Arow; i++) {
    for (var j = 0; j < Bcol; j++) {
      result[i][j] = 0;

      for (var k = 0; k < Brow; k++) {
        result[i][j] += matrixA[i][k] * matrixB[k][j];
      }
    }
  }

  return new this(result);
}

;
module.exports = multiply;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/operations/pow.js":
/*!******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/operations/pow.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX,
    INVALID_EXPONENT = _require.INVALID_EXPONENT;
/**
 * Calculates the power of any square matrix.
 * The algorithm is implemented recursively.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any square Matrix
 * @param {number} exponent - Any Non-negative integer
 * @returns {Matrix} The power of A
 */


function pow(A, exponent) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!A.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  if (!Number.isInteger(exponent) || exponent < 0) {
    throw new Error(INVALID_EXPONENT);
  }

  var size = A.size()[0];

  if (exponent === 0) {
    return this.identity(size);
  }

  if (exponent === 1) {
    return this.clone(A);
  }

  if (exponent % 2 === 0) {
    var _temp = this.pow(A, exponent / 2);

    return this.multiply(_temp, _temp);
  }

  var temp = this.pow(A, (exponent - 1) / 2);
  return this.multiply(this.multiply(temp, temp), A);
}

;
module.exports = pow;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/operations/subtract.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/operations/subtract.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    SIZE_INCOMPATIBLE = _require.SIZE_INCOMPATIBLE,
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Calculates the difference of two Matrices.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {Matrix} B - Any Matrix that has same size with A
 * @returns {Matrix} The difference of two Matrices
 */


module.exports = function subtract(A, B) {
  if (!(A instanceof this) || !(B instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var _B$size = B.size(),
      _B$size2 = _slicedToArray(_B$size, 2),
      row2 = _B$size2[0],
      col2 = _B$size2[1];

  if (row !== row2 || col !== col2) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  var matrix1 = A._matrix;
  var matrix2 = B._matrix;
  return this.generate(row, col, function (i, j) {
    return matrix1[i][j] - matrix2[i][j];
  });
};

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/operations/transpose.js":
/*!************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/operations/transpose.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Find the transpose of a matrix.
 * @memberof Matrix
 * @static
 * @param { Matrix } A - Any Matrix
 * @returns { Matrix } Returns transpose of A
 */


function transpose(A) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var matrix = A._matrix;
  return this.generate(col, row, function (i, j) {
    return matrix[j][i];
  });
}

;
module.exports = transpose;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/properties/cond.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/cond.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Matrix = __webpack_require__(/*! ../.. */ "./node_modules/@rayyamhk/matrix/lib/index.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_P_NORM = _require.INVALID_P_NORM,
    SINGULAR_MATRIX = _require.SINGULAR_MATRIX,
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX;
/**
 * Calculations the condition number of square Matrix
 * with respect to the choice of Matrix norm. 
 * If the Matrix is singular, returns Infinity.<br><br>
 * The condition number is not cached.
 * @memberof Matrix
 * @instance
 * @param {(1|2|Infinity|'F')} p - Type of Matrix norm
 * @returns {number} The condition number of Matrix
 */


function cond() {
  var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

  if (p !== 1 && p !== 2 && p !== Infinity && p !== 'F') {
    throw new Error(INVALID_P_NORM);
  }

  if (!this.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  try {
    var inverse = Matrix.inverse(this);
    return inverse.norm(p) * this.norm(p);
  } catch (error) {
    if (error.message === SINGULAR_MATRIX) {
      return Infinity;
    }

    throw error;
  }
}

;
module.exports = cond;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/properties/det.js":
/*!******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/det.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* eslint-disable prefer-destructuring */
var Matrix = __webpack_require__(/*! ../.. */ "./node_modules/@rayyamhk/matrix/lib/index.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX;
/**
 * Calculates the determinant of square Matrix.
 * If the Matrix size is larger than 3, it calculates the determinant using
 * LU decomposition, otherwise, using Leibniz Formula.<br><br>
 * The determinant is cached.
 * @memberof Matrix
 * @instance
 * @returns {number} Returns the determinant of square matrirx
 */


function det() {
  if (!this.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  if (this._det !== undefined) {
    return this._det;
  }

  var matrix = this._matrix;
  var size = matrix.length;

  if (size === 0) {
    this._det = 1;
    return 1; // the determinant of 0x0 matrix must be 1
  }

  if (size === 1) {
    this._det = matrix[0][0];
    return this._det;
  }

  if (size === 2) {
    this._det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    return this._det;
  }

  if (size === 3) {
    this._det = matrix[0][0] * matrix[1][1] * matrix[2][2] + matrix[0][1] * matrix[1][2] * matrix[2][0] + matrix[0][2] * matrix[1][0] * matrix[2][1] - matrix[0][2] * matrix[1][1] * matrix[2][0] - matrix[0][1] * matrix[1][0] * matrix[2][2] - matrix[0][0] * matrix[1][2] * matrix[2][1];
    return this._det;
  }

  var _Matrix$LU = Matrix.LU(this, true),
      _Matrix$LU2 = _slicedToArray(_Matrix$LU, 2),
      P = _Matrix$LU2[0],
      LU = _Matrix$LU2[1];

  var matrixLU = LU._matrix; // count whether the number of permutations <swap> is odd or even
  // O(n^2)

  var swap = 0;

  for (var i = 0; i < size; i++) {
    if (P[i] === i) {
      continue;
    }

    while (P[i] !== i) {
      var target = P[i];
      P[i] = P[target];
      P[target] = target;
      swap++;
    }
  }

  var result = 1;

  for (var _i2 = 0; _i2 < size; _i2++) {
    result *= matrixLU[_i2][_i2];
  }

  if (swap % 2 === 1) {
    this._det = result * -1;
    return this._det;
  }

  this._det = result;
  return result;
}

;
module.exports = det;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/properties/eigenvalues.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/eigenvalues.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* eslint-disable no-param-reassign */
// reference: https://people.inf.ethz.ch/arbenz/ewp/Lnotes/chapter4.pdf
var Complex = __webpack_require__(/*! @rayyamhk/complex */ "./node_modules/@rayyamhk/complex/lib/index.js");

var Matrix = __webpack_require__(/*! ../.. */ "./node_modules/@rayyamhk/matrix/lib/index.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX;
/**
 * Calculates the eigenvalues of any square Matrix using QR Algorithm.<br><br>
 * 
 * The eigenvalues can be either real number or complex number.
 * Note that all eigenvalues are instance of Complex,
 * for more details please visit [Complex.js]{@link https://github.com/rayyamhk/Complex.js}.<br><br>
 * 
 * The eigenvalues are cached.
 * @memberof Matrix
 * @instance
 * @returns {Complex[]} Array of eigenvalues
 */


function eigenvalues() {
  if (!this.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  if (this._eigenvalues !== undefined) {
    return this._eigenvalues;
  }

  var size = this.size()[0];
  var values = [];
  var digit = this._digit;
  var EPSILON = 1 / (Math.pow(10, digit) * 2);

  var clone = Matrix.clone(this)._matrix;

  var isConvergent = true; // flag

  var skip = false; // Transform matrix to Hessenberg matrix

  HouseholderTransform(clone, digit);

  for (var i = size - 1; i > 0; i--) {
    var divergenceCount = 0;
    var prev = void 0; // used to determine convergence
    // if obtains complex eigenvalues pair in previous iteration, skip current round

    if (skip) {
      skip = false;
      continue;
    }

    var shift = clone[size - 1][size - 1]; // eslint-disable-next-line no-constant-condition

    while (true) {
      if (!isConvergent) {
        // if the current eigenvalue is not real
        prev = size2Eigenvalues(clone[i - 1][i - 1], clone[i - 1][i], clone[i][i - 1], clone[i][i]).metric;
      } else {
        // if the current eigenvalue is real
        prev = Math.abs(clone[i][i - 1]);
      } // apply single shift


      for (var j = 0; j < size; j++) {
        clone[j][j] -= shift;
      } // Apply QR Algorithm


      HessenbergQR(clone, digit);

      for (var _j = 0; _j < size; _j++) {
        clone[_j][_j] += shift;
      }

      if (isConvergent && prev < Math.abs(clone[i][i - 1])) {
        divergenceCount++;
      } // if the current eigenvalue is real and the entry is almost ZERO => break;


      if (isConvergent && Math.abs(clone[i][i - 1]) < EPSILON) {
        values[i] = new Complex(clone[i][i]);
        break;
      } // if the current eigenvalues pair is complex, if the difference of the previous eiganvalues and the
      // eigenvalues of submatrix is almost ZERO => break


      var _size2Eigenvalues = size2Eigenvalues(clone[i - 1][i - 1], clone[i - 1][i], clone[i][i - 1], clone[i][i]),
          metric = _size2Eigenvalues.metric,
          eigen1 = _size2Eigenvalues.eigen1,
          eigen2 = _size2Eigenvalues.eigen2;

      if (!isConvergent && Math.abs(prev - metric) < EPSILON) {
        isConvergent = true; // re-initialize

        skip = true;
        var re1 = eigen1.re,
            im1 = eigen1.im;
        var re2 = eigen2.re,
            im2 = eigen2.im;
        values[i] = new Complex(re1, im1);
        values[i - 1] = new Complex(re2, im2);
        break;
      } // if the entry doesn't converge => complex eigenvalues pair


      if (divergenceCount > 3) {
        isConvergent = false;
      }
    }
  }

  if (!skip) {
    values[0] = new Complex(clone[0][0]);
  }

  this._eigenvalues = values;
  return values;
}

;

function HouseholderTransform(A, digit) {
  var size = A.length;
  var EPSILON = 1 / (Math.pow(10, digit) * 2);

  for (var j = 0; j < size - 2; j++) {
    var xNorm = 0;
    var u = new Array(size - j - 1);

    for (var i = j + 1; i < size; i++) {
      var entry = A[i][j];
      xNorm += Math.pow(entry, 2);
      u[i - j - 1] = entry;
    }

    xNorm = Math.sqrt(xNorm);

    if (Math.abs(xNorm) < EPSILON) {
      continue;
    }

    if (u[0] >= 0) {
      u[0] += xNorm;
    } else {
      u[0] -= xNorm;
    } // Make 'u' unit vector


    var uNorm = 0;

    for (var _i = 0; _i < u.length; _i++) {
      uNorm += Math.pow(u[_i], 2);
    }

    uNorm = Math.sqrt(uNorm);

    for (var _i2 = 0; _i2 < u.length; _i2++) {
      u[_i2] /= uNorm;
    } // update the matrix, multiply P from left


    for (var n = j; n < size; n++) {
      // column
      var v = new Array(size - j - 1);

      for (var m = j + 1; m < size; m++) {
        v[m - j - 1] = A[m][n];
      }

      var scaler = 0;

      for (var _m = 0; _m < v.length; _m++) {
        scaler += v[_m] * u[_m];
      }

      scaler *= 2;

      for (var _m2 = j + 1; _m2 < size; _m2++) {
        // row
        if (n === j && _m2 !== j + 1) {
          A[_m2][n] = 0;
        } else {
          A[_m2][n] = v[_m2 - j - 1] - scaler * u[_m2 - j - 1];
        }
      }
    } // update the matrix, multiply P from right


    for (var _m3 = 0; _m3 < size; _m3++) {
      // row
      var _v = new Array(size - j - 1);

      for (var _n = j + 1; _n < size; _n++) {
        _v[_n - j - 1] = A[_m3][_n];
      }

      var _scaler = 0;

      for (var _n2 = 0; _n2 < _v.length; _n2++) {
        _scaler += _v[_n2] * u[_n2];
      }

      _scaler *= 2;

      for (var _n3 = j + 1; _n3 < size; _n3++) {
        // column
        A[_m3][_n3] = _v[_n3 - j - 1] - _scaler * u[_n3 - j - 1];
      }
    }
  }
}

function HessenbergQR(H, digit) {
  var size = H.length;
  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var sincos = new Array(size - 1);

  for (var i = 0; i < size - 1; i++) {
    var a = H[i][i];
    var c = H[i + 1][i];
    var norm = Math.sqrt(Math.pow(a, 2) + Math.pow(c, 2));

    if (norm < EPSILON) {
      continue;
    }

    var cos = a / norm;
    var sin = c * -1 / norm;
    sincos[i] = [sin, cos];
    var row1 = new Array(size - i);
    var row2 = new Array(size - i);

    for (var j = i; j < size; j++) {
      row1[j - i] = H[i][j];
      row2[j - i] = H[i + 1][j];
    }

    for (var _j2 = i; _j2 < size; _j2++) {
      H[i][_j2] = cos * row1[_j2 - i] + sin * -1 * row2[_j2 - i];

      if (i === _j2) {
        H[i + 1][_j2] = 0;
      } else {
        H[i + 1][_j2] = sin * row1[_j2 - i] + cos * row2[_j2 - i];
      }
    }
  }

  for (var _j3 = 0; _j3 < size - 1; _j3++) {
    if (!sincos[_j3]) {
      continue;
    }

    var _sincos$_j = _slicedToArray(sincos[_j3], 2),
        _sin = _sincos$_j[0],
        _cos = _sincos$_j[1];

    var col1 = new Array(_j3 + 2);
    var col2 = new Array(_j3 + 2);

    for (var _i3 = 0; _i3 <= _j3 + 1; _i3++) {
      col1[_i3] = H[_i3][_j3];
      col2[_i3] = H[_i3][_j3 + 1];
    }

    for (var _i4 = 0; _i4 <= _j3 + 1; _i4++) {
      H[_i4][_j3] = col1[_i4] * _cos - col2[_i4] * _sin;
      H[_i4][_j3 + 1] = col1[_i4] * _sin + col2[_i4] * _cos;
    }
  }
} // find the eigenvalues of 2x2 matrix


function size2Eigenvalues(e11, e12, e21, e22) {
  var b = (e11 + e22) * -1;
  var c = e11 * e22 - e21 * e12;
  var delta = Math.pow(b, 2) - 4 * c;
  var re1;
  var im1;
  var re2;
  var im2;

  if (delta >= 0) {
    im1 = 0;
    im2 = 0;

    if (b >= 0) {
      re1 = (b * -1 - Math.sqrt(delta)) / 2;
    } else {
      re1 = (b * -1 + Math.sqrt(delta)) / 2;
    }

    re2 = c / re1;
  } else {
    re1 = -b / 2;
    re2 = re1;
    im1 = Math.sqrt(delta * -1) / 2;
    im2 = im1 * -1;
  }

  return {
    metric: Math.sqrt(Math.pow(re1, 2) + Math.pow(im1, 2)),
    eigen1: {
      re: re1,
      im: im1
    },
    eigen2: {
      re: re2,
      im: im2
    }
  };
}

module.exports = eigenvalues;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/properties/norm.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/norm.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Matrix = __webpack_require__(/*! ../.. */ "./node_modules/@rayyamhk/matrix/lib/index.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_P_NORM = _require.INVALID_P_NORM;
/**
 * Calculates the Matrix norm of any Matrix with respect to the choice of norm.<br><br>
 * 
 * 1-norm: Maximum absolute column sum of the Matrix.<br>
 * 2-norm: The largest singular value of Matrix.<br>
 * Infinity-norm: Maximum absolute row sum of the Matrix.<br>
 * Frobenius-norm: Euclidean norm invloving all entries.<br><br>
 * 
 * The norms are not cached.
 * @memberof Matrix
 * @instance
 * @param {(1|2|Infinity|'F')} p - The choice of Matrix norm
 * @returns {number} The norm of the Matrix.
 */


function norm() {
  var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

  var _this$size = this.size(),
      _this$size2 = _slicedToArray(_this$size, 2),
      row = _this$size2[0],
      col = _this$size2[1];

  if (p !== 1 && p !== 2 && p !== Infinity && p !== 'F') {
    throw new Error(INVALID_P_NORM);
  }

  var matrix = this._matrix;
  var result = 0;

  if (p === 1) {
    // max of column sum
    for (var j = 0; j < col; j++) {
      var columnSum = 0;

      for (var i = 0; i < row; i++) {
        columnSum += Math.abs(matrix[i][j]);
      }

      if (columnSum > result) {
        result = columnSum;
      }
    }

    return result;
  } // largest singular value


  if (p === 2) {
    var transpose = Matrix.transpose(this);
    var M = Matrix.multiply(transpose, this);
    var eigenvalues = M.eigenvalues();

    for (var _i2 = 0; _i2 < eigenvalues.length; _i2++) {
      var value = eigenvalues[_i2].getModulus();

      if (value > result) {
        result = value;
      }
    }

    return Math.sqrt(result);
  }

  if (p === Infinity) {
    // max of row sum
    for (var _i3 = 0; _i3 < row; _i3++) {
      var rowSum = 0;

      for (var _j = 0; _j < col; _j++) {
        rowSum += Math.abs(matrix[_i3][_j]);
      }

      if (rowSum > result) {
        result = rowSum;
      }
    }

    return result;
  } // F


  for (var _i4 = 0; _i4 < row; _i4++) {
    for (var _j2 = 0; _j2 < col; _j2++) {
      result += Math.pow(matrix[_i4][_j2], 2);
    }
  }

  return Math.sqrt(result);
}

;
module.exports = norm;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/properties/nullity.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/nullity.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the nullity of any Matrix, which is the dimension
 * of the nullspace.<br><br>
 * 
 * The nullity is cached.
 * @memberof Matrix
 * @instance
 * @returns {number} The nullity of the matrix
 */
function nullity() {
  if (this._nullity !== undefined) {
    return this._nullity;
  }

  var col = this.size()[1];
  var rank = this.rank();
  this._nullity = col - rank;
  return this._nullity;
}

;
module.exports = nullity;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/properties/rank.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/rank.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Matrix = __webpack_require__(/*! ../.. */ "./node_modules/@rayyamhk/matrix/lib/index.js");
/**
 * Calculates the rank of any Matrix,
 * which is the dimension of the row space.<br><br>
 * 
 * The rank is cached.
 * @memberof Matrix
 * @instance
 * @returns {number} The rank of the Matrix
 */


function rank() {
  if (this._rank !== undefined) {
    return this._rank;
  }

  var EPSILON = 1 / (Math.pow(10, this._digit) * 2);
  var R = Matrix.QR(this)[1];
  var matrixR = R._matrix;

  var _R$size = R.size(),
      _R$size2 = _slicedToArray(_R$size, 2),
      row = _R$size2[0],
      col = _R$size2[1];

  if (row === 0) {
    this._rank = 1;
    return 1;
  }

  var rk = 0;

  for (var i = 0; i < row; i++) {
    for (var j = i; j < col; j++) {
      if (Math.abs(matrixR[i][j]) >= EPSILON) {
        rk++;
        break;
      }
    }
  }

  this._rank = rk;
  return rk;
}

;
module.exports = rank;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/properties/size.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/size.js ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Calculates the size of any Matrix,
 * which is in the form of [row, column].<br><br>
 * 
 * The size of Matrix is cached.
 * @memberof Matrix
 * @instance
 * @returns {number[]} The number of rows and columns of a Matrix
 */
function size() {
  if (this._size !== undefined) {
    return this._size;
  }

  var A = this._matrix;

  if (A.length === 0) {
    this._size = [0, 0];
    return this._size;
  }

  this._size = [A.length, A[0].length];
  return this._size;
}

;
module.exports = size;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/properties/trace.js":
/*!********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/trace.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX;
/**
 * Calculates the trace of any square Matrix,
 * which is the sum of all entries on the main diagonal.<br><br>
 * 
 * The trace is cached.
 * @memberof Matrix
 * @instance
 * @returns {number} The trace of the square Matrix.
 */


function trace() {
  var isSquare = this._isSquare !== undefined ? this._isSquare : this.isSquare();

  if (!isSquare) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  if (this._trace !== undefined) {
    return this._trace;
  }

  var A = this._matrix;
  var size = A.length;
  var tr = 0;

  for (var i = 0; i < size; i++) {
    tr += A[i][i];
  }

  this._trace = tr;
  return tr;
}

;
module.exports = trace;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/structure/isDiagonal.js":
/*!************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/structure/isDiagonal.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Determines whether a Matrix is diagonal or not.<br><br>
 * 
 * Diagonal Matrix is a Matrix in which the entries outside the main diagonal
 * are all zero. Note that the term diagonal refers to rectangular diagonal.<br><br>
 * 
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @param {number} [digit=8] - Number of significant digits
 * @returns {boolean} Returns rue if the Matrix is diagonal Matrix
 */
function isDiagonal() {
  var digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

  if (this._isDiagonal !== undefined) {
    return this._isDiagonal;
  }

  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var A = this._matrix;

  var _this$size = this.size(),
      _this$size2 = _slicedToArray(_this$size, 2),
      row = _this$size2[0],
      col = _this$size2[1];

  if (row === 0) {
    this._isDiagonal = true;
    return true;
  }

  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      if (i !== j && Math.abs(A[i][j]) >= EPSILON) {
        this.isDiagonal = false;
        return false;
      }
    }
  }

  this._isDiagonal = true;
  return true;
}

;
module.exports = isDiagonal;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/structure/isLowerTriangular.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/structure/isLowerTriangular.js ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Determines whether a Matrix is lower triangular Matrix or not.<br><br>
 * 
 * Lower triangular Matrix is a Matrix in which all the entries
 * above the main diagonal are zero. Note that it can be applied
 * to any non-square Matrix.<br><br>
 * 
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @param {number} [digit=8] - Number of significant digits
 * @returns {boolean} Returns true if the Matrix is lower triangular
 */
function isLowerTriangular() {
  var digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

  if (this._isLowerTriangular !== undefined) {
    return this._isLowerTriangular;
  }

  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var A = this._matrix;

  var _this$size = this.size(),
      _this$size2 = _slicedToArray(_this$size, 2),
      row = _this$size2[0],
      col = _this$size2[1];

  if (row === 0) {
    // []
    this._isLowerTriangular = true;
    return true;
  }

  for (var i = 0; i < row; i++) {
    for (var j = i + 1; j < col; j++) {
      if (Math.abs(A[i][j]) >= EPSILON) {
        this._isLowerTriangular = false;
        return false;
      }
    }
  }

  this._isLowerTriangular = true;
  return true;
}

;
module.exports = isLowerTriangular;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/structure/isOrthogonal.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/structure/isOrthogonal.js ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether a square Matrix is orthogonal or not.<br><br>
 * 
 * Orthogonal Matrix is a Matrix in which all rows and columns are
 * orthonormal vectors.<br><br>
 * 
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @param {number} [digit=8] - Number of significant digits
 * @returns {boolean} Returns true if the square Matrix is orthogonal
 */
function isOrthogonal() {
  var digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

  if (this._isOrthogonal !== undefined) {
    return this._isOrthogonal;
  }

  if (!this.isSquare()) {
    this._isOrthogonal = false;
    return false;
  }

  var A = this._matrix;
  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var size = A.length;

  for (var i = 0; i < size; i++) {
    for (var j = i; j < size; j++) {
      var entry = 0;

      for (var k = 0; k < size; k++) {
        entry += A[i][k] * A[j][k];
      }

      if (i === j && Math.abs(entry - 1) >= EPSILON) {
        this._isOrthogonal = false;
        return false;
      }

      if (i !== j && Math.abs(entry) >= EPSILON) {
        this._isOrthogonal = false;
        return false;
      }
    }
  }

  this._isOrthogonal = true;
  return true;
}

;
module.exports = isOrthogonal;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/structure/isSkewSymmetric.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/structure/isSkewSymmetric.js ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether a square Matrix is skew symmetric or not.<br><br>
 * 
 * Skew symmetric Matrix is a square Matrix whose transpose equals its negative.<br><br>
 * 
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @param {number} [digit=8] - Number of significant digits
 * @returns {boolean} Returns true if the square Matrix is skew symmetric
 */
function isSkewSymmetric() {
  var digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

  if (this._isSkewSymmetric !== undefined) {
    return this._isSkewSymmetric;
  }

  if (!this.isSquare()) {
    this._isSkewSymmetric = false;
    return false;
  }

  var A = this._matrix;
  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var size = A.length;

  if (size === 0) {
    this._isSkewSymmetric = true;
    return true; // []
  }

  for (var i = 0; i < size; i++) {
    for (var j = 0; j < i; j++) {
      if (Math.abs(A[i][j] + A[j][i]) >= EPSILON) {
        this._isSkewSymmetric = false;
        return false;
      }
    }
  }

  this._isSkewSymmetric = true;
  return true;
}

;
module.exports = isSkewSymmetric;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/structure/isSquare.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/structure/isSquare.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether a Matrix is square or not.<br><br>
 * 
 * Square Matrix is a Matrix with same number of rows and columns.<br><br>
 * 
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @returns {boolean} Returns true if the Matrix is square
 */
function isSquare() {
  if (this._isSquare !== undefined) {
    return this._isSquare;
  }

  var A = this._matrix;

  if (A.length === 0) {
    // 0x0 matrix
    this._isSquare = true;
    return true;
  }

  this._isSquare = A.length === A[0].length;
  return this._isSquare;
}

;
module.exports = isSquare;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/structure/isSymmetric.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/structure/isSymmetric.js ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether a square Matrix is symmetric or not.<br><br>
 * 
 * Symmetric Matrix is a square Matrix that is equal to its transpose.<br><br>
 * 
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @param {number} [digit=8] - Number of significant digits
 * @returns {boolean} Returns true if the square Matrix is symmetric
 */
function isSymmetric() {
  var digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

  if (this._isSymmetric !== undefined) {
    return this._isSymmetric;
  }

  if (!this.isSquare()) {
    return false;
  }

  var A = this._matrix;
  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var size = A.length;

  for (var i = 0; i < size; i++) {
    for (var j = 0; j <= i; j++) {
      if (Math.abs(A[i][j] - A[j][i]) >= EPSILON) {
        this._isSymmetric = false;
        return false;
      }
    }
  }

  this._isSymmetric = true;
  return true;
}

;
module.exports = isSymmetric;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/structure/isUpperTriangular.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/structure/isUpperTriangular.js ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Determines whether a Matrix is upper triangular Matrix or not.<br><br>
 * 
 * Upper triangular Matrix is a Matrix in which all the entries below the
 * main diagonal are zero. Note that it can be applied to any non-square Matrix.<br><br>
 *  
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @param {number} [digit=8] - Number of significant digits
 * @returns {boolean} Returns true if the Matrix is upper triangular
 */
function isUpperTriangular() {
  var digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

  if (this._isUpperTriangular !== undefined) {
    return this._isUpperTriangular;
  }

  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var A = this._matrix;

  var _this$size = this.size(),
      _this$size2 = _slicedToArray(_this$size, 2),
      row = _this$size2[0],
      col = _this$size2[1];

  if (row === 0) {
    // []
    this._isUpperTriangular = true;
    return true;
  }

  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      if (i <= j) {
        continue;
      }

      if (Math.abs(A[i][j]) >= EPSILON) {
        this._isUpperTriangular = false;
        return false;
      }
    }
  }

  this._isUpperTriangular = true;
  return true;
}

;
module.exports = isUpperTriangular;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/clone.js":
/*!***************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/clone.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Creates a copy of Matrix. Note that it resets the cached data.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @returns {Matrix} Copy of A
 */


function clone(A) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var matrix = A._matrix;
  return this.generate(row, col, function (i, j) {
    return matrix[i][j];
  });
}

;
module.exports = clone;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/column.js":
/*!****************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/column.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_ROW_COL = _require.INVALID_ROW_COL,
    OVERFLOW_COLUMN = _require.OVERFLOW_COLUMN,
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Gets the column of a Matrix with valid index.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {number} index - Any valid column index
 * @returns {Matrix} Column of A
 */


function column(A, index) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!Number.isInteger(index) || index < 0) {
    throw new Error(INVALID_ROW_COL);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      r = _A$size2[0],
      c = _A$size2[1];

  if (index >= c) {
    throw new Error(OVERFLOW_COLUMN);
  }

  var matrix = A._matrix;
  return this.generate(r, 1, function (i) {
    return matrix[i][index];
  });
}

;
module.exports = column;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/diag.js":
/*!**************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/diag.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Matrix = __webpack_require__(/*! ../.. */ "./node_modules/@rayyamhk/matrix/lib/index.js");

var isNumber = __webpack_require__(/*! ../../util/isNumber */ "./node_modules/@rayyamhk/matrix/lib/util/isNumber.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_ARRAY = _require.INVALID_ARRAY,
    EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES = _require.EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES,
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX;
/**
 * Generates diagonal Matrix if the argument is an array of numbers,
 * generates block diagonal Matrix if the argument is an array of Matrices.
 * @memberof Matrix
 * @static
 * @param {(number[]|Matrix[])} values - Array of numbers or Matrices
 * @returns {Matrix} Block diagonal Matrix
 */


function diag(values) {
  if (!Array.isArray(values)) {
    throw new Error(INVALID_ARRAY);
  }

  var argsNum = values.length;
  var variant;

  for (var i = 0; i < argsNum; i++) {
    var entry = values[i];

    if (!isNumber(entry) && !(entry instanceof Matrix)) {
      throw new Error(EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES);
    }

    if (isNumber(entry)) {
      if (!variant) {
        variant = 'number';
        continue;
      }

      if (variant !== 'number') {
        throw new Error(EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES);
      }
    } else {
      if (!entry.isSquare()) {
        throw new Error(INVALID_SQUARE_MATRIX);
      }

      if (!variant) {
        variant = 'square';
        continue;
      }

      if (variant !== 'square') {
        throw new Error(EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES);
      }
    }
  } // HERE: variant should be either 'number' or 'square'


  if (variant === 'number') {
    return Matrix.generate(argsNum, argsNum, function (i, j) {
      if (i === j) {
        return values[i];
      }

      return 0;
    });
  } // Guaranteed that [values] is a list of square matrices


  var size = 0;
  var temp = new Array(argsNum);

  for (var _i = 0; _i < argsNum; _i++) {
    var _len = values[_i].size()[0];

    size += _len;
    temp[_i] = _len;
  }

  var idx = 0;
  var start = 0;
  var len = temp[idx];
  return Matrix.generate(size, size, function (i, j) {
    if (i - start === len && j - start === len) {
      start += len;
      idx++;
    }

    var ith = i - start; // ith < 0 if below main diagonal

    var jth = j - start; // jth < 0 if above main diagonal
    // skip 0x0 matrices

    len = temp[idx];

    while (len === 0) {
      idx++;
      len = temp[idx];
    }

    if (ith < len && ith >= 0 && jth < len && jth >= 0) {
      return values[idx]._matrix[ith][jth];
    }

    return 0;
  });
}

;
module.exports = diag;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/elementwise.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/elementwise.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * This callback applies on each entry of a Matrix
 * @callback entryCallback
 * @param {number} entry - Entry of a Matrix
 * @returns {number} New entry value
 */

/**
 * Applys a function over each entry of a Matrix and returns
 * a new copy of the new Matrix.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {entryCallback} cb - Callback function which applies on each entry of A
 * @returns {Matrix} A copy of new Matrix
 */


function elementwise(A, cb) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var matrix = A._matrix;
  return this.generate(row, col, function (i, j) {
    return cb(matrix[i][j]);
  });
}

;
module.exports = elementwise;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/entry.js":
/*!***************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/entry.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_ROW_COL = _require.INVALID_ROW_COL,
    OVERFLOW_INDEX = _require.OVERFLOW_INDEX;
/**
 * Gets the entry of a Matrix.
 * @memberof Matrix
 * @instance
 * @param {number} row - Any valid row index
 * @param {number} col - Any valid column index
 * @returns {number} Entry of the Matrix
 */


function entry(row, col) {
  if (!Number.isInteger(row) || row < 0 || !Number.isInteger(col) || col < 0) {
    throw new Error(INVALID_ROW_COL);
  }

  var A = this._matrix;

  var _this$size = this.size(),
      _this$size2 = _slicedToArray(_this$size, 2),
      r = _this$size2[0],
      c = _this$size2[1];

  if (row >= r || col >= c) {
    throw new Error(OVERFLOW_INDEX);
  }

  return A[row][col];
}

;
module.exports = entry;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/generate.js":
/*!******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/generate.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var empty = __webpack_require__(/*! ../../util/empty */ "./node_modules/@rayyamhk/matrix/lib/util/empty.js");
/**
 * This callback generates each entry of a Matrix
 * @callback generateCallback
 * @param {number} i - The i-th row of Matrix 
 * @param {number} j - The j-th column of Matrix 
 * @returns {number} Entry of Matrix
 */

/**
 * Generates a Matrix which entries are the returned value of callback function.
 * @memberof Matrix
 * @static
 * @param {number} row - Number of rows of Matrix
 * @param {number} col - Number of columns of Matrix
 * @param {generateCallback} cb - Callback function which takes row and column as arguments
 * and generates the corresponding entry
 * @returns {Matrix} - Generated Matrix
 */


function generate(row, col, cb) {
  var matrix = empty(row, col);

  if (row === 0 || col === 0) {
    return new this([]);
  }

  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      matrix[i][j] = cb(i, j);
    }
  }

  return new this(matrix);
}

;
module.exports = generate;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/getDiag.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/getDiag.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Gets the entries on the main diagonal.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @returns {number[]} Array of entries of A on the main diagonal
 */


function getDiag(A) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var size = Math.min(row, col);
  var matrix = A._matrix;
  var diags = new Array(size);

  for (var i = 0; i < size; i++) {
    diags[i] = matrix[i][i];
  }

  return diags;
}

;
module.exports = getDiag;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/getRandomMatrix.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/getRandomMatrix.js ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Generates a random Matrix.
 * @memberof Matrix
 * @static
 * @param {number} row - Number of rows of a Matrix
 * @param {number} col - Number of columns of a Matrix
 * @param {number} min - Lower bound of each entry
 * @param {number} max - Upper bound of each entry
 * @param {number} toFixed - Number of decimal places
 * @returns {Matrix} Generated random Matrix
 */
function getRandomMatrix(row, col) {
  var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var max = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var toFixed = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  return this.generate(row, col, function () {
    return Number.parseFloat((Math.random() * (max - min) + min).toFixed(toFixed));
  });
}

;
module.exports = getRandomMatrix;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/identity.js":
/*!******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/identity.js ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Generates identity Matrix with given size.
 * @memberof Matrix
 * @static
 * @param {number} size - The size of Matrix
 * @returns {Matrix} Identity Matrix
 */
function identity(size) {
  return this.generate(size, size, function (i, j) {
    if (i === j) {
      return 1;
    }

    return 0;
  });
}

;
module.exports = identity;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/isEqual.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/isEqual.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Determines whether two Matrices are considered as equal.<br><br>
 * 
 * The test criterion is Math.abs(x - y) < 1 / (10 ** digit * 2).
 * For default value 5, it should be 5e-5.
 * That means if the difference of two numbers is less than 5e-5,
 * they are considered as same value.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {Matrix} B - Any Matrix
 * @param {number} digit - Number of significant digits
 * @returns {boolean} Returns true if two Matrices are considered as same
 */


function isEqual(A, B) {
  var digit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

  if (!(A instanceof this) || !(B instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      Arow = _A$size2[0],
      Acol = _A$size2[1];

  var _B$size = B.size(),
      _B$size2 = _slicedToArray(_B$size, 2),
      Brow = _B$size2[0],
      Bcol = _B$size2[1];

  if (Arow !== Brow || Acol !== Bcol) {
    return false;
  }

  var EPISILON = 1 / (Math.pow(10, digit) * 2);
  var matrixA = A._matrix;
  var matrixB = B._matrix;

  for (var i = 0; i < Arow; i++) {
    for (var j = 0; j < Acol; j++) {
      if (Math.abs(matrixA[i][j] - matrixB[i][j]) >= EPISILON) {
        return false;
      }
    }
  }

  return true;
}

;
module.exports = isEqual;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/row.js":
/*!*************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/row.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_ROW_COL = _require.INVALID_ROW_COL,
    OVERFLOW_ROW = _require.OVERFLOW_ROW,
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Gets the row of a Matrix with valid index.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {number} index - Any valid row index
 * @returns {Matrix} Row of A
 */


function row(A, index) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!Number.isInteger(index) || index < 0) {
    throw new Error(INVALID_ROW_COL);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      r = _A$size2[0],
      c = _A$size2[1];

  if (index >= r) {
    throw new Error(OVERFLOW_ROW);
  }

  var matrix = A._matrix;
  return this.generate(1, c, function (i, j) {
    return matrix[index][j];
  });
}

;
module.exports = row;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/submatrix.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/submatrix.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    EXPECTED_STRING_NUMBER_AT_POS_1_2 = _require.EXPECTED_STRING_NUMBER_AT_POS_1_2,
    INVALID_ROW = _require.INVALID_ROW,
    INVALID_COLUMN = _require.INVALID_COLUMN,
    OVERFLOW_ROW = _require.OVERFLOW_ROW,
    INVALID_ROWS_EXPRESSION = _require.INVALID_ROWS_EXPRESSION,
    INVALID_COLUMNS_EXPRESSION = _require.INVALID_COLUMNS_EXPRESSION,
    OVERFLOW_COLUMN = _require.OVERFLOW_COLUMN;
/**
 * Generates a submatrix of a matrix.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any matrix
 * @param {string|number} rows - Rows expression
 * @param {string|number} cols - Columns expression
 * @returns {Matrix} Submatrix of A
 */


function submatrix(A, rows, cols) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var arg1Type = _typeof(rows);

  var arg2Type = _typeof(cols);

  if (arg1Type !== 'string' && arg1Type !== 'number' || arg2Type !== 'string' && arg2Type !== 'number') {
    throw new Error(EXPECTED_STRING_NUMBER_AT_POS_1_2);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var rowStart;
  var rowEnd;
  var colStart;
  var colEnd;

  if (arg1Type === 'number') {
    if (!Number.isInteger(rows) || rows < 0) {
      throw new Error(INVALID_ROW);
    }

    if (rows >= row) {
      throw new Error(OVERFLOW_ROW);
    }

    rowStart = rows;
    rowEnd = rows;
  } else {
    // string
    var arg = rows.split(':');

    if (arg.length !== 2) {
      throw new Error(INVALID_ROWS_EXPRESSION);
    }

    var _arg = _slicedToArray(arg, 2),
        r1 = _arg[0],
        r2 = _arg[1];

    if (r1 === '') {
      rowStart = 0;
    } else {
      var r = Number(r1);

      if (!Number.isInteger(r) || r < 0) {
        throw new Error(INVALID_ROW);
      }

      if (r >= row) {
        throw new Error(OVERFLOW_ROW);
      }

      rowStart = r;
    }

    if (r2 === '') {
      rowEnd = row - 1;
    } else {
      var _r = Number(r2);

      if (!Number.isInteger(_r) || _r < 0) {
        throw new Error(INVALID_ROW);
      }

      if (_r >= row) {
        throw new Error(OVERFLOW_ROW);
      }

      rowEnd = _r;
    }

    if (rowStart > rowEnd) {
      throw new Error(INVALID_ROWS_EXPRESSION);
    }
  }

  if (arg2Type === 'number') {
    if (!Number.isInteger(cols) || cols < 0) {
      throw new Error(INVALID_COLUMN);
    }

    if (cols >= col) {
      throw new Error(OVERFLOW_COLUMN);
    }

    colStart = cols;
    colEnd = cols;
  } else {
    // string
    var _arg2 = cols.split(':');

    if (_arg2.length !== 2) {
      throw new Error(INVALID_COLUMNS_EXPRESSION);
    }

    var _arg3 = _slicedToArray(_arg2, 2),
        c1 = _arg3[0],
        c2 = _arg3[1];

    if (c1 === '') {
      colStart = 0;
    } else {
      var c = Number(c1);

      if (!Number.isInteger(c) || c < 0) {
        throw new Error(INVALID_COLUMN);
      }

      if (c >= col) {
        throw new Error(OVERFLOW_COLUMN);
      }

      colStart = c;
    }

    if (c2 === '') {
      colEnd = col - 1;
    } else {
      var _c = Number(c2);

      if (!Number.isInteger(_c) || _c < 0) {
        throw new Error(INVALID_COLUMN);
      }

      if (_c >= col) {
        throw new Error(OVERFLOW_COLUMN);
      }

      colEnd = _c;
    }

    if (colStart > colEnd) {
      throw new Error(INVALID_COLUMNS_EXPRESSION);
    }
  }

  var matrix = A._matrix;
  var subRow = rowEnd - rowStart + 1;
  var subCol = colEnd - colStart + 1;
  var subMatrix = new Array(subRow);

  for (var i = rowStart; i <= rowEnd; i++) {
    var newRow = new Array(subCol);

    for (var j = colStart; j <= colEnd; j++) {
      newRow[j - colStart] = matrix[i][j];
    }

    subMatrix[i - rowStart] = newRow;
  }

  return new this(subMatrix);
}

;
module.exports = submatrix;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/toString.js":
/*!******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/toString.js ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Gets the stringified Matrix
 * @memberof Matrix
 * @instance
 * @returns {string} Stringified Matrix
 */
function toString() {
  var matrix = this._matrix;

  var _this$size = this.size(),
      _this$size2 = _slicedToArray(_this$size, 2),
      row = _this$size2[0],
      col = _this$size2[1];

  var str = '';

  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      str += matrix[i][j].toString();

      if (j !== col - 1) {
        str += ' ';
      }
    }

    if (i !== row - 1) {
      str += '\n';
    }
  }

  return str;
}

;
module.exports = toString;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/zero.js":
/*!**************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/zero.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Generates a zero Matrix
 * @memberof Matrix
 * @static
 * @param {number} row - Number of rows of the Matrix
 * @param {number} col - Number of columns of the Matrix
 * @returns {Matrix} Zero Matrix
 */
function zero(row, col) {
  if (col === undefined) {
    return this.generate(row, row, function () {
      return 0;
    });
  }

  return this.generate(row, col, function () {
    return 0;
  });
}

;
module.exports = zero;

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/index.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isMatrix = __webpack_require__(/*! ./util/isMatrix */ "./node_modules/@rayyamhk/matrix/lib/util/isMatrix.js");

var _require = __webpack_require__(/*! ./Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Creates a new Matrix
 * @namespace Matrix
 * @class
 * @param {number[][]} A - Two dimensional array where
 * A[i][j] represents the i-th row and j-th column of a matrix
 */


function Matrix(A) {
  if (!isMatrix(A)) {
    throw new Error(INVALID_MATRIX);
  }

  this._matrix = A;
  this._digit = 8;
}

module.exports = Matrix; // structure

Matrix.prototype.isDiagonal = __webpack_require__(/*! ./core/structure/isDiagonal */ "./node_modules/@rayyamhk/matrix/lib/core/structure/isDiagonal.js");
Matrix.prototype.isSkewSymmetric = __webpack_require__(/*! ./core/structure/isSkewSymmetric */ "./node_modules/@rayyamhk/matrix/lib/core/structure/isSkewSymmetric.js");
Matrix.prototype.isSquare = __webpack_require__(/*! ./core/structure/isSquare */ "./node_modules/@rayyamhk/matrix/lib/core/structure/isSquare.js");
Matrix.prototype.isSymmetric = __webpack_require__(/*! ./core/structure/isSymmetric */ "./node_modules/@rayyamhk/matrix/lib/core/structure/isSymmetric.js");
Matrix.prototype.isLowerTriangular = __webpack_require__(/*! ./core/structure/isLowerTriangular */ "./node_modules/@rayyamhk/matrix/lib/core/structure/isLowerTriangular.js");
Matrix.prototype.isUpperTriangular = __webpack_require__(/*! ./core/structure/isUpperTriangular */ "./node_modules/@rayyamhk/matrix/lib/core/structure/isUpperTriangular.js");
Matrix.prototype.isOrthogonal = __webpack_require__(/*! ./core/structure/isOrthogonal */ "./node_modules/@rayyamhk/matrix/lib/core/structure/isOrthogonal.js"); // property

Matrix.prototype.cond = __webpack_require__(/*! ./core/properties/cond */ "./node_modules/@rayyamhk/matrix/lib/core/properties/cond.js");
Matrix.prototype.det = __webpack_require__(/*! ./core/properties/det */ "./node_modules/@rayyamhk/matrix/lib/core/properties/det.js");
Matrix.prototype.eigenvalues = __webpack_require__(/*! ./core/properties/eigenvalues */ "./node_modules/@rayyamhk/matrix/lib/core/properties/eigenvalues.js");
Matrix.prototype.nullity = __webpack_require__(/*! ./core/properties/nullity */ "./node_modules/@rayyamhk/matrix/lib/core/properties/nullity.js");
Matrix.prototype.norm = __webpack_require__(/*! ./core/properties/norm */ "./node_modules/@rayyamhk/matrix/lib/core/properties/norm.js");
Matrix.prototype.rank = __webpack_require__(/*! ./core/properties/rank */ "./node_modules/@rayyamhk/matrix/lib/core/properties/rank.js");
Matrix.prototype.size = __webpack_require__(/*! ./core/properties/size */ "./node_modules/@rayyamhk/matrix/lib/core/properties/size.js");
Matrix.prototype.trace = __webpack_require__(/*! ./core/properties/trace */ "./node_modules/@rayyamhk/matrix/lib/core/properties/trace.js"); // operations

Matrix.add = __webpack_require__(/*! ./core/operations/add */ "./node_modules/@rayyamhk/matrix/lib/core/operations/add.js");
Matrix.inverse = __webpack_require__(/*! ./core/operations/inverse */ "./node_modules/@rayyamhk/matrix/lib/core/operations/inverse.js");
Matrix.multiply = __webpack_require__(/*! ./core/operations/multiply */ "./node_modules/@rayyamhk/matrix/lib/core/operations/multiply.js");
Matrix.pow = __webpack_require__(/*! ./core/operations/pow */ "./node_modules/@rayyamhk/matrix/lib/core/operations/pow.js");
Matrix.subtract = __webpack_require__(/*! ./core/operations/subtract */ "./node_modules/@rayyamhk/matrix/lib/core/operations/subtract.js");
Matrix.transpose = __webpack_require__(/*! ./core/operations/transpose */ "./node_modules/@rayyamhk/matrix/lib/core/operations/transpose.js"); // Linear-equations

Matrix.backward = __webpack_require__(/*! ./core/linear-equations/backward */ "./node_modules/@rayyamhk/matrix/lib/core/linear-equations/backward.js");
Matrix.forward = __webpack_require__(/*! ./core/linear-equations/forward */ "./node_modules/@rayyamhk/matrix/lib/core/linear-equations/forward.js");
Matrix.solve = __webpack_require__(/*! ./core/linear-equations/solve */ "./node_modules/@rayyamhk/matrix/lib/core/linear-equations/solve.js"); // decompositions

Matrix.LU = __webpack_require__(/*! ./core/decompositions/LU */ "./node_modules/@rayyamhk/matrix/lib/core/decompositions/LU.js");
Matrix.QR = __webpack_require__(/*! ./core/decompositions/QR */ "./node_modules/@rayyamhk/matrix/lib/core/decompositions/QR.js"); // utils

Matrix.clone = __webpack_require__(/*! ./core/utils/clone */ "./node_modules/@rayyamhk/matrix/lib/core/utils/clone.js");
Matrix.column = __webpack_require__(/*! ./core/utils/column */ "./node_modules/@rayyamhk/matrix/lib/core/utils/column.js");
Matrix.diag = __webpack_require__(/*! ./core/utils/diag */ "./node_modules/@rayyamhk/matrix/lib/core/utils/diag.js");
Matrix.elementwise = __webpack_require__(/*! ./core/utils/elementwise */ "./node_modules/@rayyamhk/matrix/lib/core/utils/elementwise.js");
Matrix.generate = __webpack_require__(/*! ./core/utils/generate */ "./node_modules/@rayyamhk/matrix/lib/core/utils/generate.js");
Matrix.getDiag = __webpack_require__(/*! ./core/utils/getDiag */ "./node_modules/@rayyamhk/matrix/lib/core/utils/getDiag.js");
Matrix.getRandomMatrix = __webpack_require__(/*! ./core/utils/getRandomMatrix */ "./node_modules/@rayyamhk/matrix/lib/core/utils/getRandomMatrix.js");
Matrix.identity = __webpack_require__(/*! ./core/utils/identity */ "./node_modules/@rayyamhk/matrix/lib/core/utils/identity.js");
Matrix.isEqual = __webpack_require__(/*! ./core/utils/isEqual */ "./node_modules/@rayyamhk/matrix/lib/core/utils/isEqual.js");
Matrix.row = __webpack_require__(/*! ./core/utils/row */ "./node_modules/@rayyamhk/matrix/lib/core/utils/row.js");
Matrix.submatrix = __webpack_require__(/*! ./core/utils/submatrix */ "./node_modules/@rayyamhk/matrix/lib/core/utils/submatrix.js");
Matrix.zero = __webpack_require__(/*! ./core/utils/zero */ "./node_modules/@rayyamhk/matrix/lib/core/utils/zero.js");
Matrix.prototype.entry = __webpack_require__(/*! ./core/utils/entry */ "./node_modules/@rayyamhk/matrix/lib/core/utils/entry.js");
Matrix.prototype.toString = __webpack_require__(/*! ./core/utils/toString */ "./node_modules/@rayyamhk/matrix/lib/core/utils/toString.js");

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/util/empty.js":
/*!*********************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/util/empty.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _require = __webpack_require__(/*! ../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_ROW_COL = _require.INVALID_ROW_COL;

module.exports = function empty(row, col) {
  if (!Number.isInteger(row) || row < 0 || !Number.isInteger(col) || col < 0) {
    throw new Error(INVALID_ROW_COL);
  }

  if (row === 0 || col === 0) {
    return [];
  }

  var matrix = new Array(row);

  for (var i = 0; i < row; i++) {
    matrix[i] = new Array(col);
  }

  return matrix;
};

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/util/isMatrix.js":
/*!************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/util/isMatrix.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isNumber = __webpack_require__(/*! ./isNumber */ "./node_modules/@rayyamhk/matrix/lib/util/isNumber.js");

module.exports = function isMatrix(matrix) {
  if (!Array.isArray(matrix)) {
    return false;
  }

  var height = matrix.length;

  if (height === 0) {
    return true; // [] represents empty matrix (0 x 0 matrix)
  }

  var firstRow = matrix[0];

  if (!Array.isArray(firstRow)) {
    return false;
  }

  var width = firstRow.length;

  if (width === 0) {
    return false; // [ [] ] is not allowed
  }

  for (var i = 0; i < height; i++) {
    var row = matrix[i];

    if (!Array.isArray(row) || row.length !== width) {
      return false;
    }

    for (var j = 0; j < width; j++) {
      if (!isNumber(row[j])) {
        return false;
      }
    }
  }

  return true;
};

/***/ }),

/***/ "./node_modules/@rayyamhk/matrix/lib/util/isNumber.js":
/*!************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/util/isNumber.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function isNumber(_int) {
  return Number.isFinite(_int);
};

/***/ }),

/***/ "./node_modules/matrix-inverse/matrix-inverse.js":
/*!*******************************************************!*\
  !*** ./node_modules/matrix-inverse/matrix-inverse.js ***!
  \*******************************************************/
/***/ ((module) => {

var Sylvester = {}

Sylvester.Matrix = function () {}

Sylvester.Matrix.create = function (elements) {
  var M = new Sylvester.Matrix()
  return M.setElements(elements)
}

Sylvester.Matrix.I = function (n) {
  var els = [],
    i = n,
    j
  while (i--) {
    j = n
    els[i] = []
    while (j--) {
      els[i][j] = i === j ? 1 : 0
    }
  }
  return Sylvester.Matrix.create(els)
}

Sylvester.Matrix.prototype = {
  dup: function () {
    return Sylvester.Matrix.create(this.elements)
  },

  isSquare: function () {
    var cols = this.elements.length === 0 ? 0 : this.elements[0].length
    return this.elements.length === cols
  },

  toRightTriangular: function () {
    if (this.elements.length === 0) return Sylvester.Matrix.create([])
    var M = this.dup(),
      els
    var n = this.elements.length,
      i,
      j,
      np = this.elements[0].length,
      p
    for (i = 0; i < n; i++) {
      if (M.elements[i][i] === 0) {
        for (j = i + 1; j < n; j++) {
          if (M.elements[j][i] !== 0) {
            els = []
            for (p = 0; p < np; p++) {
              els.push(M.elements[i][p] + M.elements[j][p])
            }
            M.elements[i] = els
            break
          }
        }
      }
      if (M.elements[i][i] !== 0) {
        for (j = i + 1; j < n; j++) {
          var multiplier = M.elements[j][i] / M.elements[i][i]
          els = []
          for (p = 0; p < np; p++) {
            // Elements with column numbers up to an including the number of the
            // row that we're subtracting can safely be set straight to zero,
            // since that's the point of this routine and it avoids having to
            // loop over and correct rounding errors later
            els.push(
              p <= i ? 0 : M.elements[j][p] - M.elements[i][p] * multiplier
            )
          }
          M.elements[j] = els
        }
      }
    }
    return M
  },

  determinant: function () {
    if (this.elements.length === 0) {
      return 1
    }
    if (!this.isSquare()) {
      return null
    }
    var M = this.toRightTriangular()
    var det = M.elements[0][0],
      n = M.elements.length
    for (var i = 1; i < n; i++) {
      det = det * M.elements[i][i]
    }
    return det
  },

  isSingular: function () {
    return this.isSquare() && this.determinant() === 0
  },

  augment: function (matrix) {
    if (this.elements.length === 0) {
      return this.dup()
    }
    var M = matrix.elements || matrix
    if (typeof M[0][0] === 'undefined') {
      M = Sylvester.Matrix.create(M).elements
    }
    var T = this.dup(),
      cols = T.elements[0].length
    var i = T.elements.length,
      nj = M[0].length,
      j
    if (i !== M.length) {
      return null
    }
    while (i--) {
      j = nj
      while (j--) {
        T.elements[i][cols + j] = M[i][j]
      }
    }
    return T
  },

  inverse: function () {
    if (this.elements.length === 0) {
      return null
    }
    if (!this.isSquare() || this.isSingular()) {
      return null
    }
    var n = this.elements.length,
      i = n,
      j
    var M = this.augment(Sylvester.Matrix.I(n)).toRightTriangular()
    var np = M.elements[0].length,
      p,
      els,
      divisor
    var inverse_elements = [],
      new_element
    // Sylvester.Matrix is non-singular so there will be no zeros on the
    // diagonal. Cycle through rows from last to first.
    while (i--) {
      // First, normalise diagonal elements to 1
      els = []
      inverse_elements[i] = []
      divisor = M.elements[i][i]
      for (p = 0; p < np; p++) {
        new_element = M.elements[i][p] / divisor
        els.push(new_element)
        // Shuffle off the current row of the right hand side into the results
        // array as it will not be modified by later runs through this loop
        if (p >= n) {
          inverse_elements[i].push(new_element)
        }
      }
      M.elements[i] = els
      // Then, subtract this row from those above it to give the identity matrix
      // on the left hand side
      j = i
      while (j--) {
        els = []
        for (p = 0; p < np; p++) {
          els.push(M.elements[j][p] - M.elements[i][p] * M.elements[j][i])
        }
        M.elements[j] = els
      }
    }
    return Sylvester.Matrix.create(inverse_elements)
  },

  setElements: function (els) {
    var i,
      j,
      elements = els.elements || els
    if (elements[0] && typeof elements[0][0] !== 'undefined') {
      i = elements.length
      this.elements = []
      while (i--) {
        j = elements[i].length
        this.elements[i] = []
        while (j--) {
          this.elements[i][j] = elements[i][j]
        }
      }
      return this
    }
    var n = elements.length
    this.elements = []
    for (i = 0; i < n; i++) {
      this.elements.push([elements[i]])
    }
    return this
  },
}

module.exports = function (elements) {
  const mat = Sylvester.Matrix.create(elements).inverse()
  if (mat !== null) {
    return mat.elements
  } else {
    return null
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./index.js");
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9pbmRleC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvY29yZS1rYWxtYW4tZmlsdGVyLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9keW5hbWljL2NvbnN0YW50LWFjY2VsZXJhdGlvbi5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvZHluYW1pYy9jb25zdGFudC1wb3NpdGlvbi5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvZHluYW1pYy9jb25zdGFudC1zcGVlZC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIva2FsbWFuLWZpbHRlci5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvbGluYWxnZWJyYS9hZGQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL2xpbmFsZ2VicmEvZGlhZy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvbGluYWxnZWJyYS9kaXN0YW5jZS1tYXQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL2xpbmFsZ2VicmEvZWxlbS13aXNlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9saW5hbGdlYnJhL2lkZW50aXR5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9saW5hbGdlYnJhL2luZGV4LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9saW5hbGdlYnJhL2ludmVydC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvbGluYWxnZWJyYS9tYXQtbXVsLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9saW5hbGdlYnJhL3BhZC13aXRoLXplcm9zLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9saW5hbGdlYnJhL3N1Yi1zcXVhcmUtbWF0cml4LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9saW5hbGdlYnJhL3N1Yi5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvbGluYWxnZWJyYS9zdW0uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL2xpbmFsZ2VicmEvdHJhY2UuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL2xpbmFsZ2VicmEvdHJhbnNwb3NlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9saW5hbGdlYnJhL3plcm9zLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9tb2RlbC1jb2xsZWN0aW9uLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9vYnNlcnZhdGlvbi9zZW5zb3IuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3NldHVwL2J1aWxkLXN0YXRlLXByb2plY3Rpb24uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3NldHVwL2NoZWNrLWRpbWVuc2lvbnMuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3NldHVwL2V4dGVuZC1keW5hbWljLWluaXQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3NldHVwL3NldC1kaW1lbnNpb25zLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9zdGF0ZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvYXJyYXktdG8tbWF0cml4LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy9jaGVjay1jb3ZhcmlhbmNlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy9jaGVjay1tYXRyaXguanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL2NoZWNrLXNoYXBlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy9jb3JyZWxhdGlvbi10by1jb3ZhcmlhbmNlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy9jb3ZhcmlhbmNlLXRvLWNvcnJlbGF0aW9uLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy9kZWVwLWFzc2lnbi5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvZ2V0LWNvdmFyaWFuY2UuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL3BvbHltb3JwaC1tYXRyaXguanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL3RvLWZ1bmN0aW9uLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy91bmlxLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9pbnN0YW5jZS9nZXRBcmd1bWVudC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvaW5zdGFuY2UvZ2V0SW1hZ2luYXJ5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9pbnN0YW5jZS9nZXRNb2R1bHVzLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9pbnN0YW5jZS9nZXRSZWFsLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9pbnN0YW5jZS90b1N0cmluZy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc3RhdGljL2Fjb3MuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL3N0YXRpYy9hY290LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9zdGF0aWMvYWNzYy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc3RhdGljL2FkZC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc3RhdGljL2FzZWMuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL3N0YXRpYy9hc2luLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9zdGF0aWMvYXRhbi5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc3RhdGljL2Nvbmp1Z2F0ZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc3RhdGljL2Nvcy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc3RhdGljL2NvdC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc3RhdGljL2NzYy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc3RhdGljL2RpdmlkZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc3RhdGljL2V4cC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc3RhdGljL2ludmVyc2UuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL3N0YXRpYy9pc0VxdWFsLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9zdGF0aWMvaXNOYU4uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL3N0YXRpYy9sb2cuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL3N0YXRpYy9tdWx0aXBseS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc3RhdGljL3Bvdy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc3RhdGljL3NlYy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc3RhdGljL3Npbi5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc3RhdGljL3N1YnRyYWN0LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9zdGF0aWMvdGFuLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL0Vycm9yLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL2RlY29tcG9zaXRpb25zL0xVLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL2RlY29tcG9zaXRpb25zL1FSLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL2xpbmVhci1lcXVhdGlvbnMvYmFja3dhcmQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvbGluZWFyLWVxdWF0aW9ucy9mb3J3YXJkLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL2xpbmVhci1lcXVhdGlvbnMvc29sdmUuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvb3BlcmF0aW9ucy9hZGQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvb3BlcmF0aW9ucy9pbnZlcnNlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL29wZXJhdGlvbnMvbXVsdGlwbHkuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvb3BlcmF0aW9ucy9wb3cuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvb3BlcmF0aW9ucy9zdWJ0cmFjdC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9vcGVyYXRpb25zL3RyYW5zcG9zZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9wcm9wZXJ0aWVzL2NvbmQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvcHJvcGVydGllcy9kZXQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvcHJvcGVydGllcy9laWdlbnZhbHVlcy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9wcm9wZXJ0aWVzL25vcm0uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvcHJvcGVydGllcy9udWxsaXR5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3Byb3BlcnRpZXMvcmFuay5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9wcm9wZXJ0aWVzL3NpemUuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvcHJvcGVydGllcy90cmFjZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9zdHJ1Y3R1cmUvaXNEaWFnb25hbC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9zdHJ1Y3R1cmUvaXNMb3dlclRyaWFuZ3VsYXIuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvc3RydWN0dXJlL2lzT3J0aG9nb25hbC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9zdHJ1Y3R1cmUvaXNTa2V3U3ltbWV0cmljLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3N0cnVjdHVyZS9pc1NxdWFyZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9zdHJ1Y3R1cmUvaXNTeW1tZXRyaWMuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvc3RydWN0dXJlL2lzVXBwZXJUcmlhbmd1bGFyLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2Nsb25lLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2NvbHVtbi5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy9kaWFnLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2VsZW1lbnR3aXNlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2VudHJ5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2dlbmVyYXRlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2dldERpYWcuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvZ2V0UmFuZG9tTWF0cml4LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2lkZW50aXR5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2lzRXF1YWwuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvcm93LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL3N1Ym1hdHJpeC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy90b1N0cmluZy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy96ZXJvLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvdXRpbC9lbXB0eS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvdXRpbC9pc01hdHJpeC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvdXRpbC9pc051bWJlci5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvbWF0cml4LWludmVyc2UvbWF0cml4LWludmVyc2UuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2thbG1hbkZpbHRlci93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHdCQUF3QixtQkFBTyxDQUFDLHlEQUF3Qjs7QUFFeEQ7QUFDQTtBQUNBLGVBQWUsbUJBQU8sQ0FBQyxtREFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLG1CQUFPLENBQUMsaUVBQTRCO0FBQ3BELFFBQVEsbUJBQU8sQ0FBQyxtQ0FBYTtBQUM3QixrQkFBa0IsbUJBQU8sQ0FBQyxxRUFBOEI7QUFDeEQsMEJBQTBCLG1CQUFPLENBQUMsdUZBQXVDO0FBQ3pFLDBCQUEwQixtQkFBTyxDQUFDLHVGQUF1QztBQUN6RSxhQUFhLG1CQUFPLENBQUMsbURBQWtCO0FBQ3ZDOzs7Ozs7Ozs7OztBQ2RBLGVBQWUsbUJBQU8sQ0FBQyxpRUFBOEI7QUFDckQsa0JBQWtCLG1CQUFPLENBQUMscUVBQWdDO0FBQzFELFlBQVksbUJBQU8sQ0FBQyx5REFBMEI7QUFDOUMsZUFBZSxtQkFBTyxDQUFDLCtEQUE2QjtBQUNwRCxZ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O1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImthbG1hbi1maWx0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb2RlbENvbGxlY3Rpb24gPSByZXF1aXJlKCcuL2xpYi9tb2RlbC1jb2xsZWN0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRyZWdpc3RlckR5bmFtaWM6IG1vZGVsQ29sbGVjdGlvbi5yZWdpc3RlckR5bmFtaWMsXG5cdEthbG1hbkZpbHRlcjogcmVxdWlyZSgnLi9saWIva2FsbWFuLWZpbHRlcicpLFxuXHRyZWdpc3Rlck9ic2VydmF0aW9uOiBtb2RlbENvbGxlY3Rpb24ucmVnaXN0ZXJPYnNlcnZhdGlvbixcblx0YnVpbGRPYnNlcnZhdGlvbjogbW9kZWxDb2xsZWN0aW9uLmJ1aWxkT2JzZXJ2YXRpb24sXG5cdGJ1aWxkRHluYW1pYzogbW9kZWxDb2xsZWN0aW9uLmJ1aWxkRHluYW1pYyxcblx0Z2V0Q292YXJpYW5jZTogcmVxdWlyZSgnLi9saWIvdXRpbHMvZ2V0LWNvdmFyaWFuY2UnKSxcblx0U3RhdGU6IHJlcXVpcmUoJy4vbGliL3N0YXRlJyksXG5cdGNoZWNrQ292YXJpYW5jZTogcmVxdWlyZSgnLi9saWIvdXRpbHMvY2hlY2stY292YXJpYW5jZScpLFxuXHRjb3JyZWxhdGlvblRvQ292YXJpYW5jZTogcmVxdWlyZSgnLi9saWIvdXRpbHMvY29ycmVsYXRpb24tdG8tY292YXJpYW5jZScpLFxuXHRjb3ZhcmlhbmNlVG9Db3JyZWxhdGlvbjogcmVxdWlyZSgnLi9saWIvdXRpbHMvY292YXJpYW5jZS10by1jb3JyZWxhdGlvbicpLFxuXHRsaW5hbGdlYnJhOiByZXF1aXJlKCcuL2xpYi9saW5hbGdlYnJhJylcbn07XG4iLCJjb25zdCBtYXRNdWwgPSByZXF1aXJlKCcuLi9saWIvbGluYWxnZWJyYS9tYXQtbXVsLmpzJyk7XG5jb25zdCB0cmFuc3Bvc2UgPSByZXF1aXJlKCcuLi9saWIvbGluYWxnZWJyYS90cmFuc3Bvc2UuanMnKTtcbmNvbnN0IGFkZCA9IHJlcXVpcmUoJy4uL2xpYi9saW5hbGdlYnJhL2FkZC5qcycpO1xuY29uc3QgaW52ZXJ0ID0gcmVxdWlyZSgnLi4vbGliL2xpbmFsZ2VicmEvaW52ZXJ0LmpzJyk7XG5jb25zdCBzdWIgPSByZXF1aXJlKCcuLi9saWIvbGluYWxnZWJyYS9zdWIuanMnKTtcbmNvbnN0IGdldElkZW50aXR5ID0gcmVxdWlyZSgnLi4vbGliL2xpbmFsZ2VicmEvaWRlbnRpdHkuanMnKTtcbmNvbnN0IFN0YXRlID0gcmVxdWlyZSgnLi9zdGF0ZS5qcycpO1xuY29uc3QgY2hlY2tNYXRyaXggPSByZXF1aXJlKCcuL3V0aWxzL2NoZWNrLW1hdHJpeC5qcycpO1xuLyoqXG4qIEBjYWxsYmFjayBQcmV2aW91c0NvcnJlY3RlZENhbGxiYWNrXG4qIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4qIEBwYXJhbSB7TnVtYmVyfSBvcHRzLmluZGV4XG4qIEBwYXJhbSB7TnVtYmVyfSBvcHRzLnByZXZpb3VzQ29ycmVjdGVkXG4qIEByZXR1cm5zIHtBcnJheS5BcnJheS48TnVtYmVyPj59XG4qL1xuXG4vKipcbiogQGNhbGxiYWNrIFByZWRpY3RlZENhbGxiYWNrXG4qIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4qIEBwYXJhbSB7TnVtYmVyfSBvcHRzLmluZGV4XG4qIEBwYXJhbSB7U3RhdGV9IG9wdHMucHJlZGljdGVkXG4qIEBwYXJhbSB7T2JzZXJ2YXRpb259IG9wdHMub2JzZXJ2YXRpb25cbiogQHJldHVybnMge0FycmF5LkFycmF5LjxOdW1iZXI+Pn1cbiovXG5cbi8qKlxuKiBAdHlwZWRlZiB7T2JqZWN0fSBPYnNlcnZhdGlvbkNvbmZpZ1xuKiBAcHJvcGVydHkge051bWJlcn0gZGltZW5zaW9uXG4qIEBwcm9wZXJ0eSB7UHJlZGljdGVkQ2FsbGJhY2t9IFtmbj1udWxsXSBmb3IgZXh0ZW5kZWQga2FsbWFuIGZpbHRlciBvbmx5LCB0aGUgbm9uLWxpbmVhciBzdGF0ZSB0byBvYnNlcnZhdGlvbiBmdW5jdGlvblxuKiBAcHJvcGVydHkge0FycmF5LkFycmF5LjxOdW1iZXI+PiB8IFByZXZpb3VzQ29ycmVjdGVkQ2FsbGJhY2t9IHN0YXRlUHJvamVjdGlvbiB0aGUgbWF0cml4IHRvIHRyYW5zZm9ybSBzdGF0ZSB0byBvYnNlcnZhdGlvbiAoZm9yIEVLRiwgdGhlIGphY29iaWFuIG9mIHRoZSBmbilcbiogQHByb3BlcnR5IHtBcnJheS5BcnJheS48TnVtYmVyPj4gfCBQcmV2aW91c0NvcnJlY3RlZENhbGxiYWNrfSBjb3ZhcmlhbmNlIHRoZSBjb3ZhcmlhbmNlIG9mIHRoZSBvYnNlcnZhdGlvbiBub2lzZVxuKi9cblxuLyoqXG4qIEB0eXBlZGVmIHtPYmplY3R9IER5bmFtaWNDb25maWdcbiogQHByb3BlcnR5IHtOdW1iZXJ9IGRpbWVuc2lvbiBkaW1lbnNpb24gb2YgdGhlIHN0YXRlIHZlY3RvclxuKiBAcHJvcGVydHkge1ByZXZpb3VzQ29ycmVjdGVkQ2FsbGJhY2t9IFtjb25zdGFudD1udWxsXSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgY29udHJvbCBwYXJhbWV0ZXIgQl9rKnVfayBvZiB0aGUga2FsbWFuIGZpbHRlclxuKiBAcHJvcGVydHkge1ByZXZpb3VzQ29ycmVjdGVkQ2FsbGJhY2t9IFtmbj1udWxsXSBmb3IgZXh0ZW5kZWQga2FsbWFuIGZpbHRlciBvbmx5LCB0aGUgbm9uLWxpbmVhciBzdGF0ZS10cmFuc2l0aW9uIG1vZGVsXG4qIEBwcm9wZXJ0eSB7QXJyYXkuQXJyYXkuPE51bWJlcj4+IHwgUHJlZGljdGVkQ2FsbGJhY2t9IHRyYW5zaXRpb24gdGhlIHN0YXRlLXRyYW5zaXRpb24gbW9kZWwgKG9yIGZvciBFS0YgdGhlIGphY29iaWFuIG9mIHRoZSBmbilcbiogQHByb3BlcnR5IHtBcnJheS5BcnJheS48TnVtYmVyPj4gfCBQcmVkaWN0ZWRDYWxsYmFja30gY292YXJpYW5jZSB0aGUgY292YXJpYW5jZSBvZiB0aGUgcHJvY2VzcyBub2lzZVxuKi9cblxuLyoqXG4qIEB0eXBlZGVmIHtPYmplY3R9IENvcmVDb25maWdcbiogQHByb3BlcnR5IHtEeW5hbWljQ29uZmlnfSBkeW5hbWljIHRoZSBzeXN0ZW0ncyBkeW5hbWljIG1vZGVsXG4qIEBwcm9wZXJ0eSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uIHRoZSBzeXN0ZW0ncyBvYnNlcnZhdGlvbiBtb2RlbFxuKiBAcHJvcGVydHkge09iamVjdH0gW2xvZ2dlcj1kZWZhdWx0TG9nZ2VyXSBhIFdpbnN0b24tbGlrZSBsb2dnZXJcbiovXG5jb25zdCBkZWZhdWx0TG9nZ2VyID0ge1xuXHRpbmZvOiAoLi4uYXJncykgPT4gY29uc29sZS5sb2coLi4uYXJncyksXG5cdGRlYnVnOiAoKSA9PiB7fSxcblx0d2FybjogKC4uLmFyZ3MpID0+IGNvbnNvbGUubG9nKC4uLmFyZ3MpLFxuXHRlcnJvcjogKC4uLmFyZ3MpID0+IGNvbnNvbGUubG9nKC4uLmFyZ3MpXG59O1xuLyoqXG4gKiBAcGFyYW0ge0NvcmVDb25maWd9IG9wdGlvbnNcbiovXG5jbGFzcyBDb3JlS2FsbWFuRmlsdGVyIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdGNvbnN0IHtkeW5hbWljLCBvYnNlcnZhdGlvbiwgbG9nZ2VyID0gZGVmYXVsdExvZ2dlcn0gPSBvcHRpb25zO1xuXHRcdHRoaXMuZHluYW1pYyA9IGR5bmFtaWM7XG5cdFx0dGhpcy5vYnNlcnZhdGlvbiA9IG9ic2VydmF0aW9uO1xuXHRcdHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuXHR9XG5cblx0Z2V0VmFsdWUoZm4sIG9wdGlvbnMpIHtcblx0XHRyZXR1cm4gKHR5cGVvZiAoZm4pID09PSAnZnVuY3Rpb24nID8gZm4ob3B0aW9ucykgOiBmbik7XG5cdH1cblxuXHRnZXRJbml0U3RhdGUoKSB7XG5cdFx0Y29uc3Qge21lYW46IG1lYW5Jbml0LCBjb3ZhcmlhbmNlOiBjb3ZhcmlhbmNlSW5pdCwgaW5kZXg6IGluZGV4SW5pdH0gPSB0aGlzLmR5bmFtaWMuaW5pdDtcblxuXHRcdGNvbnN0IGluaXRTdGF0ZSA9IG5ldyBTdGF0ZSh7XG5cdFx0XHRtZWFuOiBtZWFuSW5pdCxcblx0XHRcdGNvdmFyaWFuY2U6IGNvdmFyaWFuY2VJbml0LFxuXHRcdFx0aW5kZXg6IGluZGV4SW5pdFxuXHRcdH0pO1xuXHRcdFN0YXRlLmNoZWNrKGluaXRTdGF0ZSwge3RpdGxlOiAnZHluYW1pYy5pbml0J30pO1xuXHRcdHJldHVybiBpbml0U3RhdGU7XG5cdH1cblxuXHQvKipcblx0VGhpcyB3aWxsIHJldHVybiB0aGUgcHJlZGljdGVkIGNvdmFyaWFuY2Ugb2YgYSBnaXZlbiBwcmV2aW91c0NvcnJlY3RlZCBTdGF0ZSwgdGhpcyB3aWxsIGhlbHAgdXMgdG8gYnVpbGQgdGhlIGFzeW1wdG90aWNTdGF0ZS5cblx0KiBAcGFyYW0ge1N0YXRlfSBwcmV2aW91c0NvcnJlY3RlZFxuXHQqIEByZXR1cm5ze0FycmF5LjxBcnJheS48TnVtYmVyPj59XG5cdCovXG5cblx0Z2V0UHJlZGljdGVkQ292YXJpYW5jZShvcHRpb25zID0ge30pIHtcblx0XHRsZXQge3ByZXZpb3VzQ29ycmVjdGVkLCBpbmRleH0gPSBvcHRpb25zO1xuXHRcdHByZXZpb3VzQ29ycmVjdGVkID0gcHJldmlvdXNDb3JyZWN0ZWQgfHwgdGhpcy5nZXRJbml0U3RhdGUoKTtcblxuXHRcdGNvbnN0IGdldFZhbHVlT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHtwcmV2aW91c0NvcnJlY3RlZCwgaW5kZXh9LCBvcHRpb25zKTtcblx0XHRjb25zdCB0cmFuc2l0aW9uID0gdGhpcy5nZXRWYWx1ZSh0aGlzLmR5bmFtaWMudHJhbnNpdGlvbiwgZ2V0VmFsdWVPcHRpb25zKTtcblxuXHRcdGNoZWNrTWF0cml4KHRyYW5zaXRpb24sIFt0aGlzLmR5bmFtaWMuZGltZW5zaW9uLCB0aGlzLmR5bmFtaWMuZGltZW5zaW9uXSwgJ2R5bmFtaWMudHJhbnNpdGlvbicpO1xuXG5cdFx0Y29uc3QgdHJhbnNpdGlvblRyYW5zcG9zZWQgPSB0cmFuc3Bvc2UodHJhbnNpdGlvbik7XG5cdFx0Y29uc3QgY292YXJpYW5jZUludGVyID0gbWF0TXVsKHRyYW5zaXRpb24sIHByZXZpb3VzQ29ycmVjdGVkLmNvdmFyaWFuY2UpO1xuXHRcdGNvbnN0IGNvdmFyaWFuY2VQcmV2aW91cyA9IG1hdE11bChjb3ZhcmlhbmNlSW50ZXIsIHRyYW5zaXRpb25UcmFuc3Bvc2VkKTtcblx0XHRjb25zdCBkeW5Db3YgPSB0aGlzLmdldFZhbHVlKHRoaXMuZHluYW1pYy5jb3ZhcmlhbmNlLCBnZXRWYWx1ZU9wdGlvbnMpO1xuXG5cdFx0Y29uc3QgY292YXJpYW5jZSA9IGFkZChcblx0XHRcdGR5bkNvdixcblx0XHRcdGNvdmFyaWFuY2VQcmV2aW91c1xuXHRcdCk7XG5cdFx0Y2hlY2tNYXRyaXgoY292YXJpYW5jZSwgW3RoaXMuZHluYW1pYy5kaW1lbnNpb24sIHRoaXMuZHluYW1pYy5kaW1lbnNpb25dLCAncHJlZGljdGVkLmNvdmFyaWFuY2UnKTtcblxuXHRcdHJldHVybiBjb3ZhcmlhbmNlO1xuXHR9XG5cblx0cHJlZGljdE1lYW4obykge1xuXHRcdGNvbnN0IG1lYW4gPSB0aGlzLnByZWRpY3RNZWFuV2l0aG91dENvbnRyb2wobyk7XG5cdFx0aWYgKCF0aGlzLmR5bmFtaWMuY29uc3RhbnQpIHtcblx0XHRcdHJldHVybiBtZWFuO1xuXHRcdH1cblxuXHRcdGNvbnN0IHtvcHRzfSA9IG87XG5cdFx0Y29uc3QgY29udHJvbCA9IHRoaXMuZHluYW1pYy5jb25zdGFudChvcHRzKTtcblx0XHRjaGVja01hdHJpeChjb250cm9sLCBbdGhpcy5keW5hbWljLmRpbWVuc2lvbiwgMV0sICdkeW5hbWljLmNvbnN0YW50Jyk7XG5cdFx0cmV0dXJuIGFkZChtZWFuLCBjb250cm9sKTtcblx0fVxuXG5cdHByZWRpY3RNZWFuV2l0aG91dENvbnRyb2woe29wdHMsIHRyYW5zaXRpb259KSB7XG5cdFx0aWYgKHRoaXMuZHluYW1pYy5mbikge1xuXHRcdFx0cmV0dXJuIHRoaXMuZHluYW1pYy5mbihvcHRzKTtcblx0XHR9XG5cblx0XHRjb25zdCB7cHJldmlvdXNDb3JyZWN0ZWR9ID0gb3B0cztcblx0XHRyZXR1cm4gbWF0TXVsKHRyYW5zaXRpb24sIHByZXZpb3VzQ29ycmVjdGVkLm1lYW4pO1xuXHR9XG5cdC8qKlxuXHRUaGlzIHdpbGwgcmV0dXJuIHRoZSBuZXcgcHJlZGljdGlvbiwgcmVsYXRpdmVseSB0byB0aGUgZHluYW1pYyBtb2RlbCBjaG9zZW5cblx0KiBAcGFyYW0ge1N0YXRlfSBwcmV2aW91c0NvcnJlY3RlZCBTdGF0ZSByZWxhdGl2ZSB0byBvdXIgZHluYW1pYyBtb2RlbFxuXHQqIEByZXR1cm5ze1N0YXRlfSBwcmVkaWN0ZWQgU3RhdGVcblx0Ki9cblxuXHRwcmVkaWN0KG9wdGlvbnMgPSB7fSkge1xuXHRcdGxldCB7cHJldmlvdXNDb3JyZWN0ZWQsIGluZGV4fSA9IG9wdGlvbnM7XG5cdFx0cHJldmlvdXNDb3JyZWN0ZWQgPSBwcmV2aW91c0NvcnJlY3RlZCB8fCB0aGlzLmdldEluaXRTdGF0ZSgpO1xuXG5cdFx0aWYgKHR5cGVvZiAoaW5kZXgpICE9PSAnbnVtYmVyJyAmJiB0eXBlb2YgKHByZXZpb3VzQ29ycmVjdGVkLmluZGV4KSA9PT0gJ251bWJlcicpIHtcblx0XHRcdGluZGV4ID0gcHJldmlvdXNDb3JyZWN0ZWQuaW5kZXggKyAxO1xuXHRcdH1cblxuXHRcdFN0YXRlLmNoZWNrKHByZXZpb3VzQ29ycmVjdGVkLCB7ZGltZW5zaW9uOiB0aGlzLmR5bmFtaWMuZGltZW5zaW9ufSk7XG5cdFx0Y29uc3QgZ2V0VmFsdWVPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywge1xuXHRcdFx0cHJldmlvdXNDb3JyZWN0ZWQsXG5cdFx0XHRpbmRleFxuXHRcdH0pO1xuXG5cdFx0Y29uc3QgdHJhbnNpdGlvbiA9IHRoaXMuZ2V0VmFsdWUodGhpcy5keW5hbWljLnRyYW5zaXRpb24sIGdldFZhbHVlT3B0aW9ucyk7XG5cblx0XHRjb25zdCBtZWFuID0gdGhpcy5wcmVkaWN0TWVhbih7dHJhbnNpdGlvbiwgb3B0czogZ2V0VmFsdWVPcHRpb25zfSk7XG5cblx0XHRjb25zdCBjb3ZhcmlhbmNlID0gdGhpcy5nZXRQcmVkaWN0ZWRDb3ZhcmlhbmNlKGdldFZhbHVlT3B0aW9ucyk7XG5cblx0XHRjb25zdCBwcmVkaWN0ZWQgPSBuZXcgU3RhdGUoe21lYW4sIGNvdmFyaWFuY2UsIGluZGV4fSk7XG5cdFx0dGhpcy5sb2dnZXIuZGVidWcoJ1ByZWRpY3Rpb24gZG9uZScsIHByZWRpY3RlZCk7XG5cdFx0aWYoTnVtYmVyLmlzTmFOKHByZWRpY3RlZC5tZWFuWzBdWzBdKSl7XG5cdFx0XHR0aHJvdyhuZXcgRXJyb3IoJ25hbicpKVxuXHRcdH1cblxuXHRcdHJldHVybiBwcmVkaWN0ZWQ7XG5cdH1cblx0LyoqXG5cdFRoaXMgd2lsbCByZXR1cm4gdGhlIG5ldyBjb3JyZWN0aW9uLCB0YWtpbmcgaW50byBhY2NvdW50IHRoZSBwcmVkaWN0aW9uIG1hZGVcblx0YW5kIHRoZSBvYnNlcnZhdGlvbiBvZiB0aGUgc2Vuc29yXG5cdCogQHBhcmFtIHtTdGF0ZX0gcHJlZGljdGVkIHRoZSBwcmV2aW91cyBTdGF0ZVxuXHQqIEByZXR1cm5ze0FycmF5PEFycmF5Pn0ga2FsbWFuR2FpblxuXHQqL1xuXG5cdGdldEdhaW4ob3B0aW9ucykge1xuXHRcdGxldCB7cHJlZGljdGVkLCBzdGF0ZVByb2plY3Rpb259ID0gb3B0aW9ucztcblx0XHRjb25zdCBnZXRWYWx1ZU9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB7aW5kZXg6IHByZWRpY3RlZC5pbmRleH0sIG9wdGlvbnMpO1xuXHRcdHN0YXRlUHJvamVjdGlvbiA9IHN0YXRlUHJvamVjdGlvbiB8fCB0aGlzLmdldFZhbHVlKHRoaXMub2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uLCBnZXRWYWx1ZU9wdGlvbnMpO1xuXHRcdGNvbnN0IG9ic0NvdmFyaWFuY2UgPSB0aGlzLmdldFZhbHVlKHRoaXMub2JzZXJ2YXRpb24uY292YXJpYW5jZSwgZ2V0VmFsdWVPcHRpb25zKTtcblx0XHRjaGVja01hdHJpeChvYnNDb3ZhcmlhbmNlLCBbdGhpcy5vYnNlcnZhdGlvbi5kaW1lbnNpb24sIHRoaXMub2JzZXJ2YXRpb24uZGltZW5zaW9uXSwgJ29ic2VydmF0aW9uLmNvdmFyaWFuY2UnKTtcblx0XHRjb25zdCBzdGF0ZVByb2pUcmFuc3Bvc2VkID0gdHJhbnNwb3NlKHN0YXRlUHJvamVjdGlvbik7XG5cblx0XHRjaGVja01hdHJpeChzdGF0ZVByb2plY3Rpb24sIFt0aGlzLm9ic2VydmF0aW9uLmRpbWVuc2lvbiwgdGhpcy5keW5hbWljLmRpbWVuc2lvbl0sICdvYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24nKTtcblxuXHRcdGNvbnN0IG5vaXNlbGVzc0lubm92YXRpb24gPSBtYXRNdWwoXG5cdFx0XHRtYXRNdWwoc3RhdGVQcm9qZWN0aW9uLCBwcmVkaWN0ZWQuY292YXJpYW5jZSksXG5cdFx0XHRzdGF0ZVByb2pUcmFuc3Bvc2VkXG5cdFx0KTtcblxuXHRcdGNvbnN0IGlubm92YXRpb25Db3ZhcmlhbmNlID0gYWRkKG5vaXNlbGVzc0lubm92YXRpb24sIG9ic0NvdmFyaWFuY2UpO1xuXG5cdFx0Y29uc3Qgb3B0aW1hbEthbG1hbkdhaW4gPSBtYXRNdWwoXG5cdFx0XHRtYXRNdWwocHJlZGljdGVkLmNvdmFyaWFuY2UsIHN0YXRlUHJvalRyYW5zcG9zZWQpLFxuXHRcdFx0aW52ZXJ0KGlubm92YXRpb25Db3ZhcmlhbmNlKVxuXHRcdCk7XG5cblx0XHRyZXR1cm4gb3B0aW1hbEthbG1hbkdhaW47XG5cdH1cblxuXHQvKipcblx0VGhpcyB3aWxsIHJldHVybiB0aGUgY29ycmVjdGVkIGNvdmFyaWFuY2Ugb2YgYSBnaXZlbiBwcmVkaWN0ZWQgU3RhdGUsIHRoaXMgd2lsbCBoZWxwIHVzIHRvIGJ1aWxkIHRoZSBhc3ltcHRvdGljU3RhdGUuXG5cdCogQHBhcmFtIHtTdGF0ZX0gcHJlZGljdGVkIHRoZSBwcmV2aW91cyBTdGF0ZVxuXHQqIEByZXR1cm5ze0FycmF5LjxBcnJheS48TnVtYmVyPj59XG5cdCovXG5cblx0Z2V0Q29ycmVjdGVkQ292YXJpYW5jZShvcHRpb25zKSB7XG5cdFx0bGV0IHtwcmVkaWN0ZWQsIG9wdGltYWxLYWxtYW5HYWluLCBzdGF0ZVByb2plY3Rpb259ID0gb3B0aW9ucztcblx0XHRjb25zdCBpZGVudGl0eSA9IGdldElkZW50aXR5KHByZWRpY3RlZC5jb3ZhcmlhbmNlLmxlbmd0aCk7XG5cdFx0aWYgKCFzdGF0ZVByb2plY3Rpb24pIHtcblx0XHRcdGNvbnN0IGdldFZhbHVlT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHtpbmRleDogcHJlZGljdGVkLmluZGV4fSwgb3B0aW9ucyk7XG5cdFx0XHRzdGF0ZVByb2plY3Rpb24gPSB0aGlzLmdldFZhbHVlKHRoaXMub2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uLCBnZXRWYWx1ZU9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGlmICghb3B0aW1hbEthbG1hbkdhaW4pIHtcblx0XHRcdG9wdGltYWxLYWxtYW5HYWluID0gdGhpcy5nZXRHYWluKE9iamVjdC5hc3NpZ24oe3N0YXRlUHJvamVjdGlvbn0sIG9wdGlvbnMpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbWF0TXVsKFxuXHRcdFx0c3ViKGlkZW50aXR5LCBtYXRNdWwob3B0aW1hbEthbG1hbkdhaW4sIHN0YXRlUHJvamVjdGlvbikpLFxuXHRcdFx0cHJlZGljdGVkLmNvdmFyaWFuY2Vcblx0XHQpO1xuXHR9XG5cblx0Z2V0UHJlZGljdGVkT2JzZXJ2YXRpb24oe29wdHMsIHN0YXRlUHJvamVjdGlvbn0pIHtcblx0XHRpZiAodGhpcy5vYnNlcnZhdGlvbi5mbikge1xuXHRcdFx0cmV0dXJuIHRoaXMub2JzZXJ2YXRpb24uZm4ob3B0cyk7XG5cdFx0fVxuXG5cdFx0Y29uc3Qge3ByZWRpY3RlZH0gPSBvcHRzO1xuXHRcdHJldHVybiBtYXRNdWwoc3RhdGVQcm9qZWN0aW9uLCBwcmVkaWN0ZWQubWVhbik7XG5cdH1cblxuXHQvKipcblx0VGhpcyB3aWxsIHJldHVybiB0aGUgbmV3IGNvcnJlY3Rpb24sIHRha2luZyBpbnRvIGFjY291bnQgdGhlIHByZWRpY3Rpb24gbWFkZVxuXHRhbmQgdGhlIG9ic2VydmF0aW9uIG9mIHRoZSBzZW5zb3Jcblx0KiBAcGFyYW0ge1N0YXRlfSBwcmVkaWN0ZWQgdGhlIHByZXZpb3VzIFN0YXRlXG5cdCogQHBhcmFtIHtBcnJheX0gb2JzZXJ2YXRpb24gdGhlIG9ic2VydmF0aW9uIG9mIHRoZSBzZW5zb3Jcblx0KiBAcmV0dXJuc3tTdGF0ZX0gY29ycmVjdGVkIFN0YXRlIG9mIHRoZSBLYWxtYW4gRmlsdGVyXG5cdCovXG5cblx0Y29ycmVjdChvcHRpb25zKSB7XG5cdFx0Y29uc3Qge3ByZWRpY3RlZCwgb2JzZXJ2YXRpb259ID0gb3B0aW9ucztcblx0XHRTdGF0ZS5jaGVjayhwcmVkaWN0ZWQsIHtkaW1lbnNpb246IHRoaXMuZHluYW1pYy5kaW1lbnNpb259KTtcblx0XHRpZiAoIW9ic2VydmF0aW9uKSB7XG5cdFx0XHR0aHJvdyAobmV3IEVycm9yKCdubyBtZWFzdXJlIGF2YWlsYWJsZScpKTtcblx0XHR9XG5cblx0XHRjb25zdCBnZXRWYWx1ZU9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB7b2JzZXJ2YXRpb24sIHByZWRpY3RlZCwgaW5kZXg6IHByZWRpY3RlZC5pbmRleH0sIG9wdGlvbnMpO1xuXHRcdGNvbnN0IHN0YXRlUHJvamVjdGlvbiA9IHRoaXMuZ2V0VmFsdWUodGhpcy5vYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24sIGdldFZhbHVlT3B0aW9ucyk7XG5cblx0XHRjb25zdCBvcHRpbWFsS2FsbWFuR2FpbiA9IHRoaXMuZ2V0R2FpbihPYmplY3QuYXNzaWduKHtwcmVkaWN0ZWQsIHN0YXRlUHJvamVjdGlvbn0sIG9wdGlvbnMpKTtcblxuXHRcdGNvbnN0IGlubm92YXRpb24gPSBzdWIoXG5cdFx0XHRvYnNlcnZhdGlvbixcblx0XHRcdHRoaXMuZ2V0UHJlZGljdGVkT2JzZXJ2YXRpb24oe3N0YXRlUHJvamVjdGlvbiwgb3B0czogZ2V0VmFsdWVPcHRpb25zfSlcblx0XHQpO1xuXG5cdFx0Y29uc3QgbWVhbiA9IGFkZChcblx0XHRcdHByZWRpY3RlZC5tZWFuLFxuXHRcdFx0bWF0TXVsKG9wdGltYWxLYWxtYW5HYWluLCBpbm5vdmF0aW9uKVxuXHRcdCk7XG5cdFx0aWYgKE51bWJlci5pc05hTihtZWFuWzBdWzBdKSkge1xuXHRcdFx0Y29uc29sZS5sb2coe29wdGltYWxLYWxtYW5HYWluLCBpbm5vdmF0aW9uLCBwcmVkaWN0ZWR9KTtcblx0XHRcdHRocm93IChuZXcgVHlwZUVycm9yKCdNZWFuIGlzIE5hTiBhZnRlciBjb3JyZWN0aW9uJykpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGNvdmFyaWFuY2UgPSB0aGlzLmdldENvcnJlY3RlZENvdmFyaWFuY2UoT2JqZWN0LmFzc2lnbih7cHJlZGljdGVkLCBvcHRpbWFsS2FsbWFuR2Fpbiwgc3RhdGVQcm9qZWN0aW9ufSwgb3B0aW9ucykpO1xuXHRcdGNvbnN0IGNvcnJlY3RlZCA9IG5ldyBTdGF0ZSh7bWVhbiwgY292YXJpYW5jZSwgaW5kZXg6IHByZWRpY3RlZC5pbmRleH0pO1xuXHRcdHRoaXMubG9nZ2VyLmRlYnVnKCdDb3JyZWN0aW9uIGRvbmUnLCBjb3JyZWN0ZWQpO1xuXHRcdHJldHVybiBjb3JyZWN0ZWQ7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb3JlS2FsbWFuRmlsdGVyO1xuIiwiY29uc3QgaWRlbnRpdHkgPSByZXF1aXJlKCcuLi9saW5hbGdlYnJhL2lkZW50aXR5LmpzJyk7XG5cbi8qKlxuKkNyZWF0ZXMgYSBkeW5hbWljIG1vZGVsLCBmb2xsb3dpbmcgY29uc3RhbnQgYWNjZWxlcmF0aW9uIG1vZGVsIHdpdGggcmVzcGVjdCB3aXRoIHRoZSBkaW1lbnNpb25zIHByb3ZpZGVkIGluIHRoZSBvYnNlcnZhdGlvbiBwYXJhbWV0ZXJzXG4qIEBwYXJhbSB7RHluYW1pY0NvbmZpZ30gZHluYW1pY1xuKiBAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvYnNlcnZhdGlvblxuKiBAcmV0dXJucyB7RHluYW1pY0NvbmZpZ31cbiovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGR5bmFtaWMsIG9ic2VydmF0aW9uKSB7XG5cdGNvbnN0IHRpbWVTdGVwID0gZHluYW1pYy50aW1lU3RlcCB8fCAxO1xuXHRjb25zdCB7b2JzZXJ2ZWRQcm9qZWN0aW9ufSA9IG9ic2VydmF0aW9uO1xuXHRjb25zdCB7c3RhdGVQcm9qZWN0aW9ufSA9IG9ic2VydmF0aW9uO1xuXHRjb25zdCBvYnNlcnZhdGlvbkRpbWVuc2lvbiA9IG9ic2VydmF0aW9uLmRpbWVuc2lvbjtcblx0bGV0IGRpbWVuc2lvbjtcblxuXHRpZiAoc3RhdGVQcm9qZWN0aW9uICYmIE51bWJlci5pc0ludGVnZXIoc3RhdGVQcm9qZWN0aW9uWzBdLmxlbmd0aCAvIDMpKSB7XG5cdFx0ZGltZW5zaW9uID0gb2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uWzBdLmxlbmd0aDtcblx0fSBlbHNlIGlmIChvYnNlcnZlZFByb2plY3Rpb24pIHtcblx0XHRkaW1lbnNpb24gPSBvYnNlcnZlZFByb2plY3Rpb25bMF0ubGVuZ3RoICogMztcblx0fSBlbHNlIGlmIChvYnNlcnZhdGlvbkRpbWVuc2lvbikge1xuXHRcdGRpbWVuc2lvbiA9IG9ic2VydmF0aW9uRGltZW5zaW9uICogMztcblx0fSBlbHNlIHtcblx0XHR0aHJvdyAobmV3IEVycm9yKCdvYnNlcnZlZFByb2plY3Rpb24gb3Igc3RhdGVQcm9qZWN0aW9uIHNob3VsZCBiZSBkZWZpbmVkIGluIG9ic2VydmF0aW9uIGluIG9yZGVyIHRvIHVzZSBjb25zdGFudC1zcGVlZCBmaWx0ZXInKSk7XG5cdH1cblxuXHRjb25zdCBiYXNlRGltZW5zaW9uID0gZGltZW5zaW9uIC8gMztcblx0Ly8gV2UgY29uc3RydWN0IHRoZSB0cmFuc2l0aW9uIGFuZCBjb3ZhcmlhbmNlIG1hdHJpY2VzXG5cdGNvbnN0IHRyYW5zaXRpb24gPSBpZGVudGl0eShkaW1lbnNpb24pO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGJhc2VEaW1lbnNpb247IGkrKykge1xuXHRcdHRyYW5zaXRpb25baV1baSArIGJhc2VEaW1lbnNpb25dID0gdGltZVN0ZXA7XG5cdFx0dHJhbnNpdGlvbltpXVtpICsgKDIgKiBiYXNlRGltZW5zaW9uKV0gPSAwLjUgKiAodGltZVN0ZXAgKiogMik7XG5cdFx0dHJhbnNpdGlvbltpICsgYmFzZURpbWVuc2lvbl1baSArICgyICogYmFzZURpbWVuc2lvbildID0gdGltZVN0ZXA7XG5cdH1cblxuXHRjb25zdCBhcnJheUNvdmFyaWFuY2UgPSBuZXcgQXJyYXkoYmFzZURpbWVuc2lvbikuZmlsbCgxKVxuXHRcdC5jb25jYXQobmV3IEFycmF5KGJhc2VEaW1lbnNpb24pLmZpbGwodGltZVN0ZXAgKiB0aW1lU3RlcCkpXG5cdFx0LmNvbmNhdChuZXcgQXJyYXkoYmFzZURpbWVuc2lvbikuZmlsbCh0aW1lU3RlcCAqKiA0KSk7XG5cdGNvbnN0IGNvdmFyaWFuY2UgPSBkeW5hbWljLmNvdmFyaWFuY2UgfHwgYXJyYXlDb3ZhcmlhbmNlO1xuXHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZHluYW1pYywge2RpbWVuc2lvbiwgdHJhbnNpdGlvbiwgY292YXJpYW5jZX0pO1xufTtcbiIsImNvbnN0IGlkZW50aXR5ID0gcmVxdWlyZSgnLi4vbGluYWxnZWJyYS9pZGVudGl0eS5qcycpO1xuLyoqXG4qQ3JlYXRlcyBhIGR5bmFtaWMgbW9kZWwsIGZvbGxvd2luZyBjb25zdGFudCBwb3NpdGlvbiBtb2RlbCB3aXRoIHJlc3BlY3Qgd2l0aCB0aGUgZGltZW5zaW9ucyBwcm92aWRlZCBpbiB0aGUgb2JzZXJ2YXRpb24gcGFyYW1ldGVyc1xuKiBAcGFyYW0ge0R5bmFtaWNDb25maWd9IGR5bmFtaWNcbiogQHBhcmFtIHtPYnNlcnZhdGlvbkNvbmZpZ30gb2JzZXJ2YXRpb25cbiogQHJldHVybnMge0R5bmFtaWNDb25maWd9XG4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkeW5hbWljLCBvYnNlcnZhdGlvbikge1xuXHRsZXQge2RpbWVuc2lvbn0gPSBkeW5hbWljO1xuXHRjb25zdCBvYnNlcnZhdGlvbkRpbWVuc2lvbiA9IG9ic2VydmF0aW9uLmRpbWVuc2lvbjtcblx0Y29uc3Qge29ic2VydmVkUHJvamVjdGlvbn0gPSBvYnNlcnZhdGlvbjtcblx0Y29uc3Qge3N0YXRlUHJvamVjdGlvbn0gPSBvYnNlcnZhdGlvbjtcblx0bGV0IHtjb3ZhcmlhbmNlfSA9IGR5bmFtaWM7XG5cblx0aWYgKCFkeW5hbWljLmRpbWVuc2lvbikge1xuXHRcdGlmIChvYnNlcnZhdGlvbkRpbWVuc2lvbikge1xuXHRcdFx0ZGltZW5zaW9uID0gb2JzZXJ2YXRpb25EaW1lbnNpb247XG5cdFx0fSBlbHNlIGlmIChvYnNlcnZlZFByb2plY3Rpb24pIHtcblx0XHRcdGRpbWVuc2lvbiA9IG9ic2VydmVkUHJvamVjdGlvblswXS5sZW5ndGg7XG5cdFx0fSBlbHNlIGlmIChzdGF0ZVByb2plY3Rpb24pIHtcblx0XHRcdGRpbWVuc2lvbiA9IHN0YXRlUHJvamVjdGlvblswXS5sZW5ndGg7XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgdHJhbnNpdGlvbiA9IGlkZW50aXR5KGRpbWVuc2lvbik7XG5cdGNvdmFyaWFuY2UgPSBjb3ZhcmlhbmNlIHx8IGlkZW50aXR5KGRpbWVuc2lvbik7XG5cdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBkeW5hbWljLCB7ZGltZW5zaW9uLCB0cmFuc2l0aW9uLCBjb3ZhcmlhbmNlfSk7XG59O1xuIiwiY29uc3QgaWRlbnRpdHkgPSByZXF1aXJlKCcuLi9saW5hbGdlYnJhL2lkZW50aXR5LmpzJyk7XG5cbi8qKlxuKkNyZWF0ZXMgYSBkeW5hbWljIG1vZGVsLCBmb2xsb3dpbmcgY29uc3RhbnQgcG9zaXRpb24gbW9kZWwgd2l0aCByZXNwZWN0IHdpdGggdGhlIGRpbWVuc2lvbnMgcHJvdmlkZWQgaW4gdGhlIG9ic2VydmF0aW9uIHBhcmFtZXRlcnNcbiogQHBhcmFtIHtEeW5hbWljQ29uZmlnfSBkeW5hbWljXG4qIEBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uXG4qIEByZXR1cm5zIHtEeW5hbWljQ29uZmlnfVxuKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZHluYW1pYywgb2JzZXJ2YXRpb24pIHtcblx0Y29uc3QgdGltZVN0ZXAgPSBkeW5hbWljLnRpbWVTdGVwIHx8IDE7XG5cdGNvbnN0IHtvYnNlcnZlZFByb2plY3Rpb259ID0gb2JzZXJ2YXRpb247XG5cdGNvbnN0IHtzdGF0ZVByb2plY3Rpb259ID0gb2JzZXJ2YXRpb247XG5cdGNvbnN0IG9ic2VydmF0aW9uRGltZW5zaW9uID0gb2JzZXJ2YXRpb24uZGltZW5zaW9uO1xuXHRsZXQgZGltZW5zaW9uO1xuXG5cdGlmIChzdGF0ZVByb2plY3Rpb24gJiYgTnVtYmVyLmlzSW50ZWdlcihzdGF0ZVByb2plY3Rpb25bMF0ubGVuZ3RoIC8gMikpIHtcblx0XHRkaW1lbnNpb24gPSBvYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb25bMF0ubGVuZ3RoO1xuXHR9IGVsc2UgaWYgKG9ic2VydmVkUHJvamVjdGlvbikge1xuXHRcdGRpbWVuc2lvbiA9IG9ic2VydmVkUHJvamVjdGlvblswXS5sZW5ndGggKiAyO1xuXHR9IGVsc2UgaWYgKG9ic2VydmF0aW9uRGltZW5zaW9uKSB7XG5cdFx0ZGltZW5zaW9uID0gb2JzZXJ2YXRpb25EaW1lbnNpb24gKiAyO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IChuZXcgRXJyb3IoJ29ic2VydmVkUHJvamVjdGlvbiBvciBzdGF0ZVByb2plY3Rpb24gc2hvdWxkIGJlIGRlZmluZWQgaW4gb2JzZXJ2YXRpb24gaW4gb3JkZXIgdG8gdXNlIGNvbnN0YW50LXNwZWVkIGZpbHRlcicpKTtcblx0fVxuXG5cdGNvbnN0IGJhc2VEaW1lbnNpb24gPSBkaW1lbnNpb24gLyAyO1xuXHQvLyBXZSBjb25zdHJ1Y3QgdGhlIHRyYW5zaXRpb24gYW5kIGNvdmFyaWFuY2UgbWF0cmljZXNcblx0Y29uc3QgdHJhbnNpdGlvbiA9IGlkZW50aXR5KGRpbWVuc2lvbik7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgYmFzZURpbWVuc2lvbjsgaSsrKSB7XG5cdFx0dHJhbnNpdGlvbltpXVtpICsgYmFzZURpbWVuc2lvbl0gPSB0aW1lU3RlcDtcblx0fVxuXG5cdGNvbnN0IGFycmF5Q292YXJpYW5jZSA9IG5ldyBBcnJheShiYXNlRGltZW5zaW9uKS5maWxsKDEpLmNvbmNhdChuZXcgQXJyYXkoYmFzZURpbWVuc2lvbikuZmlsbCh0aW1lU3RlcCAqIHRpbWVTdGVwKSk7XG5cdGNvbnN0IGNvdmFyaWFuY2UgPSBkeW5hbWljLmNvdmFyaWFuY2UgfHwgYXJyYXlDb3ZhcmlhbmNlO1xuXHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZHluYW1pYywge2RpbWVuc2lvbiwgdHJhbnNpdGlvbiwgY292YXJpYW5jZX0pO1xufTtcbiIsIlxuY29uc3QgYXJyYXlUb01hdHJpeCA9IHJlcXVpcmUoJy4uL2xpYi91dGlscy9hcnJheS10by1tYXRyaXguanMnKTtcbmNvbnN0IHNldERpbWVuc2lvbnMgPSByZXF1aXJlKCcuLi9saWIvc2V0dXAvc2V0LWRpbWVuc2lvbnMuanMnKTtcbmNvbnN0IGNoZWNrRGltZW5zaW9ucyA9IHJlcXVpcmUoJy4uL2xpYi9zZXR1cC9jaGVjay1kaW1lbnNpb25zLmpzJyk7XG5jb25zdCBidWlsZFN0YXRlUHJvamVjdGlvbiA9IHJlcXVpcmUoJy4uL2xpYi9zZXR1cC9idWlsZC1zdGF0ZS1wcm9qZWN0aW9uLmpzJyk7XG5jb25zdCBleHRlbmREeW5hbWljSW5pdCA9IHJlcXVpcmUoJy4uL2xpYi9zZXR1cC9leHRlbmQtZHluYW1pYy1pbml0LmpzJyk7XG5jb25zdCB0b0Z1bmN0aW9uID0gcmVxdWlyZSgnLi4vbGliL3V0aWxzL3RvLWZ1bmN0aW9uLmpzJyk7XG5jb25zdCBkZWVwQXNzaWduID0gcmVxdWlyZSgnLi4vbGliL3V0aWxzL2RlZXAtYXNzaWduLmpzJyk7XG5jb25zdCBwb2x5bW9ycGhNYXRyaXggPSByZXF1aXJlKCcuLi9saWIvdXRpbHMvcG9seW1vcnBoLW1hdHJpeC5qcycpO1xuY29uc3QgZGlzdGFuY2VNYXQgPSByZXF1aXJlKCcuLi9saWIvbGluYWxnZWJyYS9kaXN0YW5jZS1tYXQuanMnKTtcbmNvbnN0IFN0YXRlID0gcmVxdWlyZSgnLi9zdGF0ZS5qcycpO1xuY29uc3QgbW9kZWxDb2xsZWN0aW9uID0gcmVxdWlyZSgnLi9tb2RlbC1jb2xsZWN0aW9uLmpzJyk7XG5jb25zdCBDb3JlS2FsbWFuRmlsdGVyID0gcmVxdWlyZSgnLi9jb3JlLWthbG1hbi1maWx0ZXIuanMnKTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7U3RyaW5nfSBEeW5hbWljTm9uT2JqZWN0Q29uZmlnXG4gKi9cbi8qKlxuICogQHR5cGVkZWYge0R5bmFtaWNDb25maWd9IER5bmFtaWNPYmplY3RDb25maWdcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lXG4gKi9cbi8qKlxuICogQHBhcmFtIHtEeW5hbWljTm9uT2JqZWN0Q29uZmlnfSBkeW5hbWljXG4gKiBAcmV0dXJucyB7RHluYW1pY09iamVjdENvbmZpZ31cbiAqL1xuXG5jb25zdCBidWlsZERlZmF1bHREeW5hbWljID0gZnVuY3Rpb24gKGR5bmFtaWMpIHtcblx0aWYgKHR5cGVvZiAoZHluYW1pYykgPT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIHtuYW1lOiBkeW5hbWljfTtcblx0fVxuXG5cdHJldHVybiB7bmFtZTogJ2NvbnN0YW50LXBvc2l0aW9uJ307XG59O1xuXG4vKipcbiAqIEB0eXBlZGVmIHtTdHJpbmcgfCBOdW1iZXJ9IE9ic2VydmF0aW9uTm9uT2JqZWN0Q29uZmlnXG4gKi9cbi8qKlxuICogQHR5cGVkZWYge09ic2VydmF0aW9uQ29uZmlnfSBPYnNlcnZhdGlvbk9iamVjdENvbmZpZ1xuICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWVcbiAqL1xuLyoqXG4gKiBAcGFyYW0ge09ic2VydmF0aW9uTm9uT2JqZWN0Q29uZmlnfSBvYnNlcnZhdGlvblxuICogQHJldHVybnMge09ic2VydmF0aW9uT2JqZWN0Q29uZmlnfVxuICovXG5jb25zdCBidWlsZERlZmF1bHRPYnNlcnZhdGlvbiA9IGZ1bmN0aW9uIChvYnNlcnZhdGlvbikge1xuXHRpZiAodHlwZW9mIChvYnNlcnZhdGlvbikgPT09ICdudW1iZXInKSB7XG5cdFx0cmV0dXJuIHtuYW1lOiAnc2Vuc29yJywgc2Vuc29yRGltZW5zaW9uOiBvYnNlcnZhdGlvbn07XG5cdH1cblxuXHRpZiAodHlwZW9mIChvYnNlcnZhdGlvbikgPT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIHtuYW1lOiBvYnNlcnZhdGlvbn07XG5cdH1cblxuXHRyZXR1cm4ge25hbWU6ICdzZW5zb3InfTtcbn07XG4vKipcbipUaGlzIGZ1bmN0aW9uIGZpbGxzIHRoZSBnaXZlbiBvcHRpb25zIGJ5IHN1Y2Nlc3NpdmVseSBjaGVja2luZyBpZiBpdCB1c2VzIGEgcmVnaXN0ZXJlZCBtb2RlbCxcbiogaXQgYnVpbGRzIGFuZCBjaGVja3MgdGhlIGR5bmFtaWMgYW5kIG9ic2VydmF0aW9uIGRpbWVuc2lvbnMsIGJ1aWxkIHRoZSBzdGF0ZVByb2plY3Rpb24gaWYgb25seSBvYnNlcnZlZFByb2plY3Rpb25cbippcyBnaXZlbiwgYW5kIGluaXRpYWxpemUgZHluYW1pYy5pbml0XG4qQHBhcmFtIHtEeW5hbWljT2JqZWN0Q29uZmlnIHwgRHluYW1pY05vbk9iamVjdENvbmZpZ30gb3B0aW9ucy5keW5hbWljXG4qQHBhcmFtIHtPYnNlcnZhdGlvbk9iamVjdENvbmZpZyB8IE9ic2VydmF0aW9uTm9uT2JqZWN0Q29uZmlnfSBvcHRpb25zLm9ic2VydmF0aW9uXG4qIEByZXR1cm5zIHtDb3JlQ29uZmlnfVxuKi9cblxuY29uc3Qgc2V0dXBNb2RlbHNQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKHtvYnNlcnZhdGlvbiwgZHluYW1pY30pIHtcblx0aWYgKHR5cGVvZiAob2JzZXJ2YXRpb24pICE9PSAnb2JqZWN0JyB8fCBvYnNlcnZhdGlvbiA9PT0gbnVsbCkge1xuXHRcdG9ic2VydmF0aW9uID0gYnVpbGREZWZhdWx0T2JzZXJ2YXRpb24ob2JzZXJ2YXRpb24pO1xuXHR9XG5cblx0aWYgKHR5cGVvZiAoZHluYW1pYykgIT09ICdvYmplY3QnIHx8IGR5bmFtaWMgPT09IG51bGwpIHtcblx0XHRkeW5hbWljID0gYnVpbGREZWZhdWx0RHluYW1pYyhkeW5hbWljLCBvYnNlcnZhdGlvbik7XG5cdH1cblxuXHRpZiAodHlwZW9mIChvYnNlcnZhdGlvbi5uYW1lKSA9PT0gJ3N0cmluZycpIHtcblx0XHRvYnNlcnZhdGlvbiA9IG1vZGVsQ29sbGVjdGlvbi5idWlsZE9ic2VydmF0aW9uKG9ic2VydmF0aW9uKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgKGR5bmFtaWMubmFtZSkgPT09ICdzdHJpbmcnKSB7XG5cdFx0ZHluYW1pYyA9IG1vZGVsQ29sbGVjdGlvbi5idWlsZER5bmFtaWMoZHluYW1pYywgb2JzZXJ2YXRpb24pO1xuXHR9XG5cblx0Y29uc3Qgd2l0aERpbWVuc2lvbk9wdGlvbnMgPSBzZXREaW1lbnNpb25zKHtvYnNlcnZhdGlvbiwgZHluYW1pY30pO1xuXHRjb25zdCBjaGVja2VkRGltZW5zaW9uT3B0aW9ucyA9IGNoZWNrRGltZW5zaW9ucyh3aXRoRGltZW5zaW9uT3B0aW9ucyk7XG5cdGNvbnN0IGJ1aWxkU3RhdGVQcm9qZWN0aW9uT3B0aW9ucyA9IGJ1aWxkU3RhdGVQcm9qZWN0aW9uKGNoZWNrZWREaW1lbnNpb25PcHRpb25zKTtcblx0cmV0dXJuIGV4dGVuZER5bmFtaWNJbml0KGJ1aWxkU3RhdGVQcm9qZWN0aW9uT3B0aW9ucyk7XG59O1xuXG4vKipcbiogQHR5cGVkZWYge09iamVjdH0gTW9kZWxzUGFyYW1ldGVyc1xuKiBAcHJvcGVydHkge0R5bmFtaWNPYmplY3RDb25maWd9IGR5bmFtaWNcbiogQHByb3BlcnR5IHtPYnNlcnZhdGlvbk9iamVjdENvbmZpZ30gb2JzZXJ2YXRpb25cbiovXG5cbi8qKlxuKiBSZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIG1vZGVsIHdpdGhvdXQgYXJyYXlzIGFzIHZhbHVlcyBidXQgb25seSBmdW5jdGlvbnNcbiogQHBhcmFtIHtNb2RlbHNQYXJhbWV0ZXJzfSBtb2RlbFRvQmVDaGFuZ2VkXG4qIEByZXR1cm5zIHtDb3JlQ29uZmlnfSBtb2RlbCB3aXRoIHJlc3BlY3Qgb2YgdGhlIENvcmUgS2FsbWFuIEZpbHRlciBwcm9wZXJ0aWVzXG4qL1xuY29uc3QgbW9kZWxzUGFyYW1ldGVyc1RvQ29yZU9wdGlvbnMgPSBmdW5jdGlvbiAobW9kZWxUb0JlQ2hhbmdlZCkge1xuXHRjb25zdCB7b2JzZXJ2YXRpb24sIGR5bmFtaWN9ID0gbW9kZWxUb0JlQ2hhbmdlZDtcblx0cmV0dXJuIGRlZXBBc3NpZ24obW9kZWxUb0JlQ2hhbmdlZCwge1xuXHRcdG9ic2VydmF0aW9uOiB7XG5cdFx0XHRzdGF0ZVByb2plY3Rpb246IHRvRnVuY3Rpb24ocG9seW1vcnBoTWF0cml4KG9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbiksIHtsYWJlbDogJ29ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbid9KSxcblx0XHRcdGNvdmFyaWFuY2U6IHRvRnVuY3Rpb24ocG9seW1vcnBoTWF0cml4KG9ic2VydmF0aW9uLmNvdmFyaWFuY2UsIHtkaW1lbnNpb246IG9ic2VydmF0aW9uLmRpbWVuc2lvbn0pLCB7bGFiZWw6ICdvYnNlcnZhdGlvbi5jb3ZhcmlhbmNlJ30pXG5cdFx0fSxcblx0XHRkeW5hbWljOiB7XG5cdFx0XHR0cmFuc2l0aW9uOiB0b0Z1bmN0aW9uKHBvbHltb3JwaE1hdHJpeChkeW5hbWljLnRyYW5zaXRpb24pLCB7bGFiZWw6ICdkeW5hbWljLnRyYW5zaXRpb24nfSksXG5cdFx0XHRjb3ZhcmlhbmNlOiB0b0Z1bmN0aW9uKHBvbHltb3JwaE1hdHJpeChkeW5hbWljLmNvdmFyaWFuY2UsIHtkaW1lbnNpb246IGR5bmFtaWMuZGltZW5zaW9ufSksIHtsYWJlbDogJ2R5bmFtaWMuY292YXJpYW5jZSd9KVxuXHRcdH1cblx0fSk7XG59O1xuXG5jbGFzcyBLYWxtYW5GaWx0ZXIgZXh0ZW5kcyBDb3JlS2FsbWFuRmlsdGVyIHtcblx0LyoqXG5cdCogQHR5cGVkZWYge09iamVjdH0gQ29uZmlnXG5cdCogQHByb3BlcnR5IHtEeW5hbWljT2JqZWN0Q29uZmlnIHwgRHluYW1pY05vbk9iamVjdENvbmZpZ30gZHluYW1pY1xuXHQqIEBwcm9wZXJ0eSB7T2JzZXJ2YXRpb25PYmplY3RDb25maWcgfCBPYnNlcnZhdGlvbk5vbk9iamVjdENvbmZpZ30gb2JzZXJ2YXRpb25cblx0Ki9cblx0LyoqXG5cdCogQHBhcmFtIHtDb25maWd9IG9wdGlvbnNcblx0Ki9cblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG5cdFx0Y29uc3QgbW9kZWxzUGFyYW1ldGVycyA9IHNldHVwTW9kZWxzUGFyYW1ldGVycyhvcHRpb25zKTtcblx0XHRjb25zdCBjb3JlT3B0aW9ucyA9IG1vZGVsc1BhcmFtZXRlcnNUb0NvcmVPcHRpb25zKG1vZGVsc1BhcmFtZXRlcnMpO1xuXG5cdFx0c3VwZXIoT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywgY29yZU9wdGlvbnMpKTtcblx0fVxuXG5cdGNvcnJlY3Qob3B0aW9ucykge1xuXHRcdGNvbnN0IGNvcmVPYnNlcnZhdGlvbiA9IGFycmF5VG9NYXRyaXgoe29ic2VydmF0aW9uOiBvcHRpb25zLm9ic2VydmF0aW9uLCBkaW1lbnNpb246IHRoaXMub2JzZXJ2YXRpb24uZGltZW5zaW9ufSk7XG5cdFx0cmV0dXJuIHN1cGVyLmNvcnJlY3QoT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywge29ic2VydmF0aW9uOiBjb3JlT2JzZXJ2YXRpb259KSk7XG5cdH1cblxuXHQvKipcblx0KlBlcmZvcm1zIHRoZSBwcmVkaWN0aW9uIGFuZCB0aGUgY29ycmVjdGlvbiBzdGVwc1xuXHQqQHBhcmFtIHtTdGF0ZX0gcHJldmlvdXNDb3JyZWN0ZWRcblx0KkBwYXJhbSB7PEFycmF5LjxOdW1iZXI+Pn0gb2JzZXJ2YXRpb25cblx0KkByZXR1cm5zIHtBcnJheS48TnVtYmVyPn0gdGhlIG1lYW4gb2YgdGhlIGNvcnJlY3Rpb25zXG5cdCovXG5cblx0ZmlsdGVyKG9wdGlvbnMpIHtcblx0XHRjb25zdCBwcmVkaWN0ZWQgPSBzdXBlci5wcmVkaWN0KG9wdGlvbnMpO1xuXHRcdHJldHVybiB0aGlzLmNvcnJlY3QoT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywge3ByZWRpY3RlZH0pKTtcblx0fVxuXG5cdC8qKlxuKkZpbHRlcnMgYWxsIHRoZSBvYnNlcnZhdGlvbnNcbipAcGFyYW0ge0FycmF5LjxBcnJheS48TnVtYmVyPj59IG9ic2VydmF0aW9uc1xuKkByZXR1cm5zIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSB0aGUgbWVhbiBvZiB0aGUgY29ycmVjdGlvbnNcbiovXG5cdGZpbHRlckFsbChvYnNlcnZhdGlvbnMpIHtcblx0XHRsZXQgcHJldmlvdXNDb3JyZWN0ZWQgPSB0aGlzLmdldEluaXRTdGF0ZSgpO1xuXHRcdGNvbnN0IHJlc3VsdHMgPSBbXTtcblx0XHRmb3IgKGNvbnN0IG9ic2VydmF0aW9uIG9mIG9ic2VydmF0aW9ucykge1xuXHRcdFx0Y29uc3QgcHJlZGljdGVkID0gdGhpcy5wcmVkaWN0KHtwcmV2aW91c0NvcnJlY3RlZH0pO1xuXHRcdFx0cHJldmlvdXNDb3JyZWN0ZWQgPSB0aGlzLmNvcnJlY3Qoe1xuXHRcdFx0XHRwcmVkaWN0ZWQsXG5cdFx0XHRcdG9ic2VydmF0aW9uXG5cdFx0XHR9KTtcblx0XHRcdHJlc3VsdHMucHVzaChwcmV2aW91c0NvcnJlY3RlZC5tZWFuLm1hcChtID0+IG1bMF0pKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fVxuXG5cdC8qKlxuXHQqIFJldHVybnMgYW4gZXN0aW1hdGlvbiBvZiB0aGUgYXN5bXB0b3RpYyBzdGF0ZSBjb3ZhcmlhbmNlIGFzIGV4cGxhaW5lZCBpbiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9LYWxtYW5fZmlsdGVyI0FzeW1wdG90aWNfZm9ybVxuXHQqIGluIHByYWN0aWNlIHRoaXMgY2FuIGJlIHVzZWQgYXMgYSBpbml0LmNvdmFyaWFuY2UgdmFsdWUgYnV0IGlzIHZlcnkgY29zdGZ1bCBjYWxjdWxhdGlvbiAodGhhdCdzIHdoeSB0aGlzIGlzIG5vdCBtYWRlIGJ5IGRlZmF1bHQpXG5cdCogQHBhcmFtIHtOdW1iZXJ9IFtsaW1pdEl0ZXJhdGlvbnM9MWUyXSBtYXggbnVtYmVyIG9mIGl0ZXJhdGlvbnNcblx0KiBAcGFyYW0ge051bWJlcn0gW3RvbGVyYW5jZT0xZS02XSByZXR1cm5zIHdoZW4gdGhlIGxhc3QgdmFsdWVzIGRpZmZlcmVuY2VzIGFyZSBsZXNzIHRoYW4gdG9sZXJhbmNlXG5cdCogQHJldHVybiB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gY292YXJpYW5jZVxuXHQqL1xuXHRhc3ltcHRvdGljU3RhdGVDb3ZhcmlhbmNlKGxpbWl0SXRlcmF0aW9ucyA9IDFlMiwgdG9sZXJhbmNlID0gMWUtNikge1xuXHRcdGxldCBwcmV2aW91c0NvcnJlY3RlZCA9IHN1cGVyLmdldEluaXRTdGF0ZSgpO1xuXHRcdGxldCBwcmVkaWN0ZWQ7XG5cdFx0Y29uc3QgcmVzdWx0cyA9IFtdO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGltaXRJdGVyYXRpb25zOyBpKyspIHtcblx0XHRcdC8vIFdlIGNyZWF0ZSBhIGZha2UgbWVhbiB0aGF0IHdpbGwgbm90IGJlIHVzZWQgaW4gb3JkZXIgdG8ga2VlcCBjb2hlcmVuY2Vcblx0XHRcdHByZWRpY3RlZCA9IG5ldyBTdGF0ZSh7XG5cdFx0XHRcdG1lYW46IG51bGwsXG5cdFx0XHRcdGNvdmFyaWFuY2U6IHN1cGVyLmdldFByZWRpY3RlZENvdmFyaWFuY2Uoe3ByZXZpb3VzQ29ycmVjdGVkfSlcblx0XHRcdH0pO1xuXHRcdFx0cHJldmlvdXNDb3JyZWN0ZWQgPSBuZXcgU3RhdGUoe1xuXHRcdFx0XHRtZWFuOiBudWxsLFxuXHRcdFx0XHRjb3ZhcmlhbmNlOiBzdXBlci5nZXRDb3JyZWN0ZWRDb3ZhcmlhbmNlKHtwcmVkaWN0ZWR9KVxuXHRcdFx0fSk7XG5cdFx0XHRyZXN1bHRzLnB1c2gocHJldmlvdXNDb3JyZWN0ZWQuY292YXJpYW5jZSk7XG5cdFx0XHRpZiAoZGlzdGFuY2VNYXQocHJldmlvdXNDb3JyZWN0ZWQuY292YXJpYW5jZSwgcmVzdWx0c1tpIC0gMV0pIDwgdG9sZXJhbmNlKSB7XG5cdFx0XHRcdHJldHVybiByZXN1bHRzW2ldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRocm93IChuZXcgRXJyb3IoJ1RoZSBzdGF0ZSBjb3ZhcmlhbmNlIGRvZXMgbm90IGNvbnZlcmdlIGFzeW1wdG90aWNhbGx5JykpO1xuXHR9XG5cblx0LyoqXG5cdCogUmV0dXJucyBhbiBlc3RpbWF0aW9uIG9mIHRoZSBhc3ltcHRvdGljIGdhaW4sIGFzIGV4cGxhaW5lZCBpbiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9LYWxtYW5fZmlsdGVyI0FzeW1wdG90aWNfZm9ybVxuXHQqIEBwYXJhbSB7TnVtYmVyfSBbdG9sZXJhbmNlPTFlLTZdIHJldHVybnMgd2hlbiB0aGUgbGFzdCB2YWx1ZXMgZGlmZmVyZW5jZXMgYXJlIGxlc3MgdGhhbiB0b2xlcmFuY2Vcblx0KiBAcmV0dXJuIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBnYWluXG5cdCovXG5cdGFzeW1wdG90aWNHYWluKHRvbGVyYW5jZSA9IDFlLTYpIHtcblx0XHRjb25zdCBjb3ZhcmlhbmNlID0gdGhpcy5hc3ltcHRvdGljU3RhdGVDb3ZhcmlhbmNlKHRvbGVyYW5jZSk7XG5cblx0XHRjb25zdCBhc3ltcHRvdGljU3RhdGUgPSBuZXcgU3RhdGUoe1xuXHRcdFx0Ly8gV2UgY3JlYXRlIGEgZmFrZSBtZWFuIHRoYXQgd2lsbCBub3QgYmUgdXNlZCBpbiBvcmRlciB0byBrZWVwIGNvaGVyZW5jZVxuXHRcdFx0bWVhbjogbmV3IEFycmF5KGNvdmFyaWFuY2UubGVuZ3RoKS5maWxsKDApLm1hcCgoKSA9PiBbMF0pLFxuXHRcdFx0Y292YXJpYW5jZVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHN1cGVyLmdldEdhaW4oe3ByZXZpb3VzQ29ycmVjdGVkOiBhc3ltcHRvdGljU3RhdGV9KTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEthbG1hbkZpbHRlcjtcbiIsImNvbnN0IGVsZW1XaXNlID0gcmVxdWlyZSgnLi9lbGVtLXdpc2UnKTtcbi8qKlxuKiBBZGQgbWF0cml4ZXMgdG9nZXRoZXJcbiogQHBhcmFtIHsuLi5BcnJheS48QXJyYXkuPE51bWJlcj4+fSBhcmdzIGxpc3Qgb2YgbWF0cml4XG4qIEByZXR1cm5zIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBzdW1cbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdHJldHVybiBlbGVtV2lzZShhcmdzLCBhcmdzMiA9PiB7XG5cdFx0cmV0dXJuIGFyZ3MyLnJlZHVjZSgoYSwgYikgPT4ge1xuXHRcdFx0aWYgKGEgPT09IG51bGwgfHwgYiA9PT0gbnVsbCkge1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGEgKyBiO1xuXHRcdH0sIDApO1xuXHR9KTtcbn07XG4iLCJjb25zdCB6ZXJvcyA9IHJlcXVpcmUoJy4vemVyb3MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobWF0KSB7XG5cdGNvbnN0IHJlc3VsdCA9IHplcm9zKG1hdC5sZW5ndGgsIG1hdC5sZW5ndGgpO1xuXG5cdGZvciAoY29uc3QgW2ksIGVsZW1lbnRdIG9mIG1hdC5lbnRyaWVzKCkpIHtcblx0XHRyZXN1bHRbaV1baV0gPSBlbGVtZW50O1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG4iLCJjb25zdCB0cmFjZSA9IHJlcXVpcmUoJy4vdHJhY2UuanMnKTtcbmNvbnN0IHRyYW5zcG9zZSA9IHJlcXVpcmUoJy4vdHJhbnNwb3NlLmpzJyk7XG5jb25zdCBtYXRTdWIgPSByZXF1aXJlKCcuL3N1Yi5qcycpO1xuY29uc3QgbWF0TXVsID0gcmVxdWlyZSgnLi9tYXQtbXVsLmpzJyk7XG5jb25zdCBzdW0gPSByZXF1aXJlKCcuL3N1bS5qcycpO1xuXG4vLyBbRnJvYmVuaXVzIG5vcm1dKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01hdHJpeF9ub3JtI0Zyb2Jlbml1c19ub3JtIClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFycmF5MSwgYXJyYXkyKSB7XG5cdGlmICh0eXBlb2YgKGFycmF5MSkgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuIHN1bShhcnJheTIpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiAoYXJyYXkyKSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRyZXR1cm4gc3VtKGFycmF5MSk7XG5cdH1cblxuXHRjb25zdCBtID0gbWF0U3ViKGFycmF5MSwgYXJyYXkyKTtcblx0Y29uc3QgcCA9IG1hdE11bCh0cmFuc3Bvc2UobSksIG0pO1xuXHRyZXR1cm4gTWF0aC5zcXJ0KHRyYWNlKHApKTtcbn07XG4iLCIvKipcbiogQGNhbGxiYWNrIGVsZW1XaXNlQ2JcbiogQHBhcmFtIHtBcnJheS48TnVtYmVyPn0gYXJyXG4qIEBwYXJhbSB7TnVtYmVyfSByb3dJZFxuKiBAcGFyYW0ge051bWJlcn0gY29sSWRcbiovXG4vKipcbiogcnVuIGEgZnVuY3Rpb24gb24gY2VsbCBwZXIgY2VsbCBmb3IgZWFjaCBNYXRyaXhlc1xuKiBAcGFyYW0gezxBcnJheS48QXJyYXkuPEFycmF5LjxOdW1iZXI+Pj59IGFyck1hdHJpeGVzIGxpc3Qgb2YgbWF0cml4ZXNcbiogQHBhcmFtIHtlbGVtV2lzZUNifSBmblxuKiBAcmV0dXJucyB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gcmVzdWx0aW5nIG1hdHJpeFxuKiBAZXhhbXBsZVxuLy8gdGhpcyB3aWxsIGRvIG0xICsgbTIgKyBtMyArIG00IG9uIG1hdHJpeGVzXG5lbGVtV2lzZShbbTEsIG0yLCBtMywgbTRdLCBhcmdzMiA9PiB7XG5cdHJldHVybiBhcmdzMi5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcbn0pO1xuKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJyYXlNYXRyaXhlcywgZm4pIHtcblx0cmV0dXJuIGFycmF5TWF0cml4ZXNbMF0ubWFwKChyb3csIHJvd0lkKSA9PiB7XG5cdFx0cmV0dXJuIHJvdy5tYXAoKGNlbGwsIGNvbElkKSA9PiB7XG5cdFx0XHRjb25zdCBhcnJheSA9IGFycmF5TWF0cml4ZXMubWFwKG0gPT4gbVtyb3dJZF1bY29sSWRdKTtcblx0XHRcdHJldHVybiBmbihhcnJheSwgcm93SWQsIGNvbElkKTtcblx0XHR9KTtcblx0fSk7XG59O1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdGF0ZVNpemUpIHtcblx0Y29uc3QgaWRlbnRpdHlBcnJheSA9IFtdO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IHN0YXRlU2l6ZTsgaSsrKSB7XG5cdFx0Y29uc3Qgcm93SWRlbnRpdHkgPSBbXTtcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IHN0YXRlU2l6ZTsgaisrKSB7XG5cdFx0XHRpZiAoaSA9PT0gaikge1xuXHRcdFx0XHRyb3dJZGVudGl0eS5wdXNoKDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cm93SWRlbnRpdHkucHVzaCgwKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZGVudGl0eUFycmF5LnB1c2gocm93SWRlbnRpdHkpO1xuXHR9XG5cblx0cmV0dXJuIGlkZW50aXR5QXJyYXk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdGFkZDogcmVxdWlyZSgnLi9hZGQuanMnKSxcblx0ZGlhZzogcmVxdWlyZSgnLi9kaWFnLmpzJyksXG5cdCdkaXN0YW5jZS1tYXQnOiByZXF1aXJlKCcuL2Rpc3RhbmNlLW1hdC5qcycpLFxuXHQnZWxlbS13aXNlJzogcmVxdWlyZSgnLi9lbGVtLXdpc2UuanMnKSxcblx0aWRlbnRpdHk6IHJlcXVpcmUoJy4vaWRlbnRpdHkuanMnKSxcblx0aW52ZXJ0OiByZXF1aXJlKCcuL2ludmVydC5qcycpLFxuXHQnbWF0LW11bCc6IHJlcXVpcmUoJy4vbWF0LW11bC5qcycpLFxuXHQncGFkLXdpdGgtemVyb3MnOiByZXF1aXJlKCcuL3BhZC13aXRoLXplcm9zLmpzJyksXG5cdHN1YjogcmVxdWlyZSgnLi9zdWIuanMnKSxcblx0J3N1Yi1zcXVhcmUtbWF0cml4JzogcmVxdWlyZSgnLi9zdWItc3F1YXJlLW1hdHJpeC5qcycpLFxuXHRzdW06IHJlcXVpcmUoJy4vc3VtLmpzJyksXG5cdHRyYWNlOiByZXF1aXJlKCcuL3RyYWNlLmpzJyksXG5cdHRyYW5zcG9zZTogcmVxdWlyZSgnLi90cmFuc3Bvc2UuanMnKSxcblx0emVyb3M6IHJlcXVpcmUoJy4vemVyb3MuanMnKVxufTtcbiIsImNvbnN0IG1hdHJpeEludmVyc2UgPSByZXF1aXJlKCdtYXRyaXgtaW52ZXJzZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtKSB7XG5cdHJldHVybiBtYXRyaXhJbnZlcnNlKG0pO1xufTtcbiIsIi8qKlxuKiBNdWx0aXBseSAyIG1hdHJpeGVzIHRvZ2V0aGVyXG4qIEBwYXJhbSB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gbTFcbiogQHBhcmFtIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBtMlxuKiBAcmV0dXJucyB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn1cbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtMSwgbTIpIHtcblx0Ly8gQ29uc29sZS5sb2coe20xLCBtMn0pO1xuXHRjb25zdCByZXN1bHQgPSBbXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtMS5sZW5ndGg7IGkrKykge1xuXHRcdHJlc3VsdFtpXSA9IFtdO1xuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgbTJbMF0ubGVuZ3RoOyBqKyspIHtcblx0XHRcdGxldCBzdW0gPSAwO1xuXHRcdFx0bGV0IGlzTnVsbCA9IGZhbHNlO1xuXHRcdFx0Zm9yIChsZXQgayA9IDA7IGsgPCBtMVswXS5sZW5ndGg7IGsrKykge1xuXHRcdFx0XHRpZiAoKG0xW2ldW2tdID09PSBudWxsICYmIG0yW2tdW2pdICE9PSAwKSB8fCAobTJba11bal0gPT09IG51bGwgJiYgbTFbaV1ba10gIT09IDApKSB7XG5cdFx0XHRcdFx0aXNOdWxsID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHN1bSArPSBtMVtpXVtrXSAqIG0yW2tdW2pdO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXN1bHRbaV1bal0gPSBpc051bGwgPyBudWxsIDogc3VtO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59O1xuIiwiLyoqXG4qVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSBzdGF0ZVByb2plY3Rpb24gcGFkZWQgd2l0aCB6ZXJvcyB3aXRoIHJlc3BlY3QgdG8gYSBnaXZlblxuKm9ic2VydmVkUHJvamVjdGlvblxuKkBwYXJhbSB7QXJyYXkuPE51bWJlcj4gfCBBcnJheS48QXJyYXkuPE51bWJlcj4+fSBhcnJheSB0aGUgYXJyYXkgd2UgbmVlZCB0byBwYWRcbipAcGFyYW0ge051bWJlcn0gZGltZW5zaW9uIGluIG91ciBjYXNlLCB0aGUgZHluYW1pYyBkaW1lbnNpb25cbipAcmV0dXJucyB7QXJyYXkuPE51bWJlcj4gfCBBcnJheS48QXJyYXkuPE51bWJlcj4+fSBwYWRlZCBhcnJheVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFycmF5LCB7ZGltZW5zaW9ufSkge1xuXHRjb25zdCBsMSA9IGFycmF5Lmxlbmd0aDtcblx0Y29uc3QgbCA9IGFycmF5WzBdLmxlbmd0aDtcblx0Y29uc3QgcmVzdWx0ID0gYXJyYXkubWFwKGEgPT4gYS5jb25jYXQoKSk7XG5cblx0aWYgKGRpbWVuc2lvbiA8IGwpIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihgRHluYW1pYyBkaW1lbnNpb24gJHtkaW1lbnNpb259IGRvZXMgbm90IG1hdGNoIHdpdGggb2JzZXJ2ZWRQcm9qZWN0aW9uICR7bH1gKSk7XG5cdH1cblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGwxOyBpKyspIHtcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IGRpbWVuc2lvbiAtIGw7IGorKykge1xuXHRcdFx0cmVzdWx0W2ldLnB1c2goMCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IChtYXQsIG9ic0luZGV4ZXMpID0+IHtcblx0cmV0dXJuIG9ic0luZGV4ZXMubWFwKHMxID0+IG9ic0luZGV4ZXMubWFwKHMyID0+IG1hdFtzMV1bczJdKSk7XG59O1xuIiwiY29uc3QgZWxlbVdpc2UgPSByZXF1aXJlKCcuL2VsZW0td2lzZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdHJldHVybiBlbGVtV2lzZShhcmdzLCAoW2EsIGJdKSA9PiBhIC0gYik7XG59O1xuIiwiLy8gU3VtIGFsbCB0aGUgdGVybXMgb2YgYSBnaXZlbiBtYXRyaXhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFycmF5KSB7XG5cdGxldCBzID0gMDtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgYXJyYXkubGVuZ3RoOyBqKyspIHtcblx0XHRcdHMgKz0gYXJyYXlbaV1bal07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHM7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJyYXkpIHtcblx0bGV0IGRpYWcgPSAwO1xuXHRmb3IgKGNvbnN0IFtyb3csIGVsZW1lbnRdIG9mIGFycmF5LmVudHJpZXMoKSkge1xuXHRcdGRpYWcgKz0gZWxlbWVudFtyb3ddO1xuXHR9XG5cblx0cmV0dXJuIGRpYWc7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJyYXkpIHtcblx0cmV0dXJuIGFycmF5WzBdLm1hcCgoY29sLCBpKSA9PiBhcnJheS5tYXAocm93ID0+IHJvd1tpXSkpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHJvd3MsIGNvbHMpIHtcblx0cmV0dXJuIG5ldyBBcnJheShyb3dzKS5maWxsKDEpLm1hcCgoKSA9PiBuZXcgQXJyYXkoY29scykuZmlsbCgwKSk7XG59O1xuIiwiY29uc3QgcmVnaXN0ZXJlZER5bmFtaWNNb2RlbHMgPSB7XG5cdCdjb25zdGFudC1wb3NpdGlvbic6IHJlcXVpcmUoJy4uL2xpYi9keW5hbWljL2NvbnN0YW50LXBvc2l0aW9uLmpzJyksXG5cdCdjb25zdGFudC1zcGVlZCc6IHJlcXVpcmUoJy4uL2xpYi9keW5hbWljL2NvbnN0YW50LXNwZWVkLmpzJyksXG5cdCdjb25zdGFudC1hY2NlbGVyYXRpb24nOiByZXF1aXJlKCcuLi9saWIvZHluYW1pYy9jb25zdGFudC1hY2NlbGVyYXRpb24uanMnKVxufTtcbmNvbnN0IHJlZ2lzdGVyZWRPYnNlcnZhdGlvbk1vZGVscyA9IHtcblx0c2Vuc29yOiByZXF1aXJlKCcuLi9saWIvb2JzZXJ2YXRpb24vc2Vuc29yLmpzJylcbn07XG5cbi8qKlxuKlJlZ2lzdGVyT2JzZXJ2YXRpb24gZW5hYmxlcyB0byBjcmVhdGUgYSBuZXcgb2JzZXJ2YXRpb24gbW9kZWwgYW5kIHN0b2NrIGl0XG4qIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4qIEBjYWxsYmFjayBmbiB0aGUgZnVuY3Rpb24gY29ycmVzcG9uZGluZyB0byB0aGUgZGVzaXJlZCBtb2RlbFxuKi9cblxuLyoqXG4qcmVnaXN0ZXJEeW5hbWljIGVuYWJsZXMgdG8gY3JlYXRlIGEgbmV3IGR5bmFtaWMgbW9kZWwgYW5kIHN0b2NrcyBpdFxuKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuKiBAY2FsbGJhY2sgZm4gdGhlIGZ1bmN0aW9uIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGRlc2lyZWQgbW9kZWxcbiovXG5cbi8qKlxuKmJ1aWxkT2JzZXJ2YXRpb24gZW5hYmxlcyB0byBidWlsZCBhIG1vZGVsIGdpdmVuIGFuIG9ic2VydmF0aW9uIGNvbmZpZ3VyYXRpb25cbiogQHBhcmFtIHtPYnNlcnZhdGlvbkNvbmZpZ30gb2JzZXJ2YXRpb25cbiogQHJldHVybnMge09ic2VydmF0aW9uQ29uZmlnfSB0aGUgY29uZmlndXJhdGlvbiB3aXRoIHJlc3BlY3QgdG8gdGhlIG1vZGVsXG4qL1xuXG4vKipcbipidWlsZER5bmFtaWMgZW5hYmxlcyB0byBidWlsZCBhIG1vZGVsIGdpdmVuIGR5bmFtaWMgYW5kIG9ic2VydmF0aW9uIGNvbmZpZ3VyYXRpb25zXG4qIEBwYXJhbSB7RHluYW1pY0NvbmZpZ30gZHluYW1pY1xuKiBAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvYnNlcnZhdGlvblxuKiBAcmV0dXJucyB7RHluYW1pY0NvbmZpZ30gdGhlIGR5bmFtaWMgY29uZmlndXJhdGlvbiB3aXRoIHJlc3BlY3QgdG8gdGhlIG1vZGVsXG4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0cmVnaXN0ZXJPYnNlcnZhdGlvbjogKG5hbWUsIGZuKSA9PiB7XG5cdFx0cmVnaXN0ZXJlZE9ic2VydmF0aW9uTW9kZWxzW25hbWVdID0gZm47XG5cdH0sXG5cdHJlZ2lzdGVyRHluYW1pYzogKG5hbWUsIGZuKSA9PiB7XG5cdFx0cmVnaXN0ZXJlZER5bmFtaWNNb2RlbHNbbmFtZV0gPSBmbjtcblx0fSxcblx0YnVpbGRPYnNlcnZhdGlvbjogb2JzZXJ2YXRpb24gPT4ge1xuXHRcdGlmICghcmVnaXN0ZXJlZE9ic2VydmF0aW9uTW9kZWxzW29ic2VydmF0aW9uLm5hbWVdKSB7XG5cdFx0XHR0aHJvdyAobmV3IEVycm9yKGBUaGUgcHJvdmlkZWQgb2JzZXJ2YXRpb24gbW9kZWwgbmFtZSAoJHtvYnNlcnZhdGlvbi5uYW1lfSkgaXMgbm90IHJlZ2lzdGVyZWRgKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlZ2lzdGVyZWRPYnNlcnZhdGlvbk1vZGVsc1tvYnNlcnZhdGlvbi5uYW1lXShvYnNlcnZhdGlvbik7XG5cdH0sXG5cdGJ1aWxkRHluYW1pYzogKGR5bmFtaWMsIG9ic2VydmF0aW9uKSA9PiB7XG5cdFx0aWYgKCFyZWdpc3RlcmVkRHluYW1pY01vZGVsc1tkeW5hbWljLm5hbWVdKSB7XG5cdFx0XHR0aHJvdyAobmV3IEVycm9yKGBUaGUgcHJvdmlkZWQgZHluYW1pYyBtb2RlbCAoJHtkeW5hbWljLm5hbWV9KSBuYW1lIGlzIG5vdCByZWdpc3RlcmVkYCkpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZWdpc3RlcmVkRHluYW1pY01vZGVsc1tkeW5hbWljLm5hbWVdKGR5bmFtaWMsIG9ic2VydmF0aW9uKTtcblx0fVxufTtcbiIsImNvbnN0IGlkZW50aXR5ID0gcmVxdWlyZSgnLi4vbGluYWxnZWJyYS9pZGVudGl0eS5qcycpO1xuY29uc3QgcG9seW1vcnBoTWF0cml4ID0gcmVxdWlyZSgnLi4vdXRpbHMvcG9seW1vcnBoLW1hdHJpeC5qcycpO1xuY29uc3QgY2hlY2tNYXRyaXggPSByZXF1aXJlKCcuLi91dGlscy9jaGVjay1tYXRyaXguanMnKTtcblxuLyoqXG4qIEBwYXJhbSB7TnVtYmVyfSBzZW5zb3JEaW1lbnNpb25cbiogQHBhcmFtIHtDb3ZhcmlhbmNlUGFyYW19IHNlbnNvckNvdmFyaWFuY2VcbiogQHBhcmFtIHtOdW1iZXJ9IG5TZW5zb3JzXG4qIEByZXR1cm5zIHtPYnNlcnZhdGlvbkNvbmZpZ31cbiovXG5cbmNvbnN0IGNvcHkgPSBtYXQgPT4gbWF0Lm1hcChhID0+IGEuY29uY2F0KCkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdGNvbnN0IHtzZW5zb3JEaW1lbnNpb24gPSAxLCBzZW5zb3JDb3ZhcmlhbmNlID0gMSwgblNlbnNvcnMgPSAxfSA9IG9wdGlvbnM7XG5cdGNvbnN0IHNlbnNvckNvdmFyaWFuY2VGb3JtYXR0ZWQgPSBwb2x5bW9ycGhNYXRyaXgoc2Vuc29yQ292YXJpYW5jZSwge2RpbWVuc2lvbjogc2Vuc29yRGltZW5zaW9ufSk7XG5cdGNoZWNrTWF0cml4KHNlbnNvckNvdmFyaWFuY2VGb3JtYXR0ZWQsIFtzZW5zb3JEaW1lbnNpb24sIHNlbnNvckRpbWVuc2lvbl0sICdvYnNlcnZhdGlvbi5zZW5zb3JDb3ZhcmlhbmNlJyk7XG5cdGNvbnN0IG9uZVNlbnNvck9ic2VydmVkUHJvamVjdGlvbiA9IGlkZW50aXR5KHNlbnNvckRpbWVuc2lvbik7XG5cdGxldCBjb25jYXRlbmF0ZWRPYnNlcnZlZFByb2plY3Rpb24gPSBbXTtcblx0Y29uc3QgZGltZW5zaW9uID0gc2Vuc29yRGltZW5zaW9uICogblNlbnNvcnM7XG5cdGNvbnN0IGNvbmNhdGVuYXRlZENvdmFyaWFuY2UgPSBpZGVudGl0eShkaW1lbnNpb24pO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IG5TZW5zb3JzOyBpKyspIHtcblx0XHRjb25jYXRlbmF0ZWRPYnNlcnZlZFByb2plY3Rpb24gPSBjb25jYXRlbmF0ZWRPYnNlcnZlZFByb2plY3Rpb24uY29uY2F0KGNvcHkob25lU2Vuc29yT2JzZXJ2ZWRQcm9qZWN0aW9uKSk7XG5cblx0XHRzZW5zb3JDb3ZhcmlhbmNlRm9ybWF0dGVkLmZvckVhY2goKHIsIHJJbmRleCkgPT4gci5mb3JFYWNoKChjLCBjSW5kZXgpID0+IHtcblx0XHRcdGNvbmNhdGVuYXRlZENvdmFyaWFuY2VbckluZGV4ICsgKGkgKiBzZW5zb3JEaW1lbnNpb24pXVtjSW5kZXggKyAoaSAqIHNlbnNvckRpbWVuc2lvbildID0gYztcblx0XHR9KSk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywge1xuXHRcdGRpbWVuc2lvbixcblx0XHRvYnNlcnZlZFByb2plY3Rpb246IGNvbmNhdGVuYXRlZE9ic2VydmVkUHJvamVjdGlvbixcblx0XHRjb3ZhcmlhbmNlOiBjb25jYXRlbmF0ZWRDb3ZhcmlhbmNlXG5cdH0pO1xufTtcbiIsImNvbnN0IHBhZFdpdGhaZXJvcyA9IHJlcXVpcmUoJy4uL2xpbmFsZ2VicmEvcGFkLXdpdGgtemVyb3MuanMnKTtcbmNvbnN0IGlkZW50aXR5ID0gcmVxdWlyZSgnLi4vbGluYWxnZWJyYS9pZGVudGl0eS5qcycpO1xuLyoqXG4qQnVpbGRzIHRoZSBzdGF0ZVByb2plY3Rpb24gZ2l2ZW4gYW4gb2JzZXJ2ZWRQcm9qZWN0aW9uXG4qQHBhcmFtIHtPYnNlcnZhdGlvbkNvbmZpZ30gb2JzZXJ2YXRpb25cbipAcGFyYW0ge0R5bmFtaWNDb25maWd9IGR5bmFtaWNcbipAcmV0dXJucyB7T2JzZXJ2YXRpb25Db25maWcsIER5bmFtaWNDb25maWd9IHRoZSBtb2RlbCBjb250YWluaW5nIHRoZSBjcmVhdGVkIHN0YXRlUHJvamVjdGlvblxuKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe29ic2VydmF0aW9uLCBkeW5hbWljfSkge1xuXHRjb25zdCB7b2JzZXJ2ZWRQcm9qZWN0aW9uLCBzdGF0ZVByb2plY3Rpb259ID0gb2JzZXJ2YXRpb247XG5cdGNvbnN0IG9ic2VydmF0aW9uRGltZW5zaW9uID0gb2JzZXJ2YXRpb24uZGltZW5zaW9uO1xuXHRjb25zdCBkeW5hbWljRGltZW5zaW9uID0gZHluYW1pYy5kaW1lbnNpb247XG5cdGlmIChvYnNlcnZlZFByb2plY3Rpb24gJiYgc3RhdGVQcm9qZWN0aW9uKSB7XG5cdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoJ1lvdSBjYW5ub3QgdXNlIGJvdGggb2JzZXJ2ZWRQcm9qZWN0aW9uIGFuZCBzdGF0ZVByb2plY3Rpb24nKSk7XG5cdH1cblxuXHRpZiAob2JzZXJ2ZWRQcm9qZWN0aW9uKSB7XG5cdFx0Y29uc3Qgc3RhdGVQcm9qZWN0aW9uID0gcGFkV2l0aFplcm9zKG9ic2VydmVkUHJvamVjdGlvbiwge2RpbWVuc2lvbjogZHluYW1pY0RpbWVuc2lvbn0pO1xuXHRcdHJldHVybiB7XG5cdFx0XHRvYnNlcnZhdGlvbjogT2JqZWN0LmFzc2lnbih7fSwgb2JzZXJ2YXRpb24sIHtcblx0XHRcdFx0c3RhdGVQcm9qZWN0aW9uXG5cdFx0XHR9KSxcblx0XHRcdGR5bmFtaWNcblx0XHR9O1xuXHR9XG5cblx0aWYgKG9ic2VydmF0aW9uRGltZW5zaW9uICYmIGR5bmFtaWNEaW1lbnNpb24gJiYgIXN0YXRlUHJvamVjdGlvbikge1xuXHRcdGNvbnN0IG9ic2VydmF0aW9uTWF0cml4ID0gaWRlbnRpdHkob2JzZXJ2YXRpb25EaW1lbnNpb24pO1xuXHRcdHJldHVybiB7XG5cdFx0XHRvYnNlcnZhdGlvbjogT2JqZWN0LmFzc2lnbih7fSwgb2JzZXJ2YXRpb24sIHtcblx0XHRcdFx0c3RhdGVQcm9qZWN0aW9uOiBwYWRXaXRoWmVyb3Mob2JzZXJ2YXRpb25NYXRyaXgsIHtkaW1lbnNpb246IGR5bmFtaWNEaW1lbnNpb259KVxuXHRcdFx0fSksXG5cdFx0XHRkeW5hbWljXG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiB7b2JzZXJ2YXRpb24sIGR5bmFtaWN9O1xufTtcbiIsIi8qKlxuKlZlcmlmaWVzIHRoYXQgZHluYW1pYy5kaW1lbnNpb24gYW5kIG9ic2VydmF0aW9uLmRpbWVuc2lvbiBhcmUgc2V0XG4qQHBhcmFtIHtPYnNlcnZhdGlvbkNvbmZpZ30gb2JzZXJ2YXRpb25cbipAcGFyYW0ge0R5bmFtaWNDb25maWd9IGR5bmFtaWNcbiovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHtvYnNlcnZhdGlvbiwgZHluYW1pY30pIHtcblx0Y29uc3QgZHluYW1pY0RpbWVuc2lvbiA9IGR5bmFtaWMuZGltZW5zaW9uO1xuXHRjb25zdCBvYnNlcnZhdGlvbkRpbWVuc2lvbiA9IG9ic2VydmF0aW9uLmRpbWVuc2lvbjtcblx0aWYgKCFkeW5hbWljRGltZW5zaW9uIHx8ICFvYnNlcnZhdGlvbkRpbWVuc2lvbikge1xuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKCdEaW1lbnNpb24gaXMgbm90IHNldCcpKTtcblx0fVxuXG5cdHJldHVybiB7b2JzZXJ2YXRpb24sIGR5bmFtaWN9O1xufTtcbiIsImNvbnN0IGRpYWcgPSByZXF1aXJlKCcuLi9saW5hbGdlYnJhL2RpYWcuanMnKTtcblxuLyoqXG4qSW5pdGlhbGl6ZXMgdGhlIGR5bmFtaWMuaW5pdCB3aGVuIG5vdCBnaXZlblxuKkBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uXG4qQHBhcmFtIHtEeW5hbWljQ29uZmlnfSBkeW5hbWljXG4qQHJldHVybnMge0NvcmVDb25maWd9XG4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7b2JzZXJ2YXRpb24sIGR5bmFtaWN9KSB7XG5cdGlmICghZHluYW1pYy5pbml0KSB7XG5cdFx0Y29uc3QgaHVnZSA9IDFlNjtcblx0XHRjb25zdCBkeW5hbWljRGltZW5zaW9uID0gZHluYW1pYy5kaW1lbnNpb247XG5cdFx0Y29uc3QgbWVhbkFycmF5ID0gbmV3IEFycmF5KGR5bmFtaWNEaW1lbnNpb24pLmZpbGwoMCk7XG5cdFx0Y29uc3QgY292YXJpYW5jZUFycmF5ID0gbmV3IEFycmF5KGR5bmFtaWNEaW1lbnNpb24pLmZpbGwoaHVnZSk7XG5cdFx0Y29uc3Qgd2l0aEluaXRPcHRpb25zID0ge1xuXHRcdFx0b2JzZXJ2YXRpb24sXG5cdFx0XHRkeW5hbWljOiBPYmplY3QuYXNzaWduKHt9LCBkeW5hbWljLCB7XG5cdFx0XHRcdGluaXQ6IHtcblx0XHRcdFx0XHRtZWFuOiBtZWFuQXJyYXkubWFwKGVsZW1lbnQgPT4gW2VsZW1lbnRdKSxcblx0XHRcdFx0XHRjb3ZhcmlhbmNlOiBkaWFnKGNvdmFyaWFuY2VBcnJheSksXG5cdFx0XHRcdFx0aW5kZXg6IC0xXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fTtcblx0XHRyZXR1cm4gd2l0aEluaXRPcHRpb25zO1xuXHR9XG5cblx0aWYgKGR5bmFtaWMuaW5pdCAmJiAhZHluYW1pYy5pbml0Lm1lYW4pIHtcblx0XHR0aHJvdyAobmV3IEVycm9yKCdkeW5hbWljLmluaXQgc2hvdWxkIGhhdmUgYSBtZWFuIGtleScpKTtcblx0fVxuXG5cdHJldHVybiB7b2JzZXJ2YXRpb24sIGR5bmFtaWN9O1xufTtcbiIsIi8qKlxuKlZlcmlmaWVzIHRoYXQgZGltZW5zaW9ucyBhcmUgbWF0Y2hpbmcgYW5kIHNldCBkeW5hbWljLmRpbWVuc2lvbiBhbmQgb2JzZXJ2YXRpb24uZGltZW5zaW9uXG4qIHdpdGggcmVzcGVjdCBvZiBzdGF0ZVByb2plY3Rpb24gYW5kIHRyYW5zaXRpb24gZGltZW5zaW9uc1xuKkBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uXG4qQHBhcmFtIHtEeW5hbWljQ29uZmlnfSBkeW5hbWljXG4qQHJldHVybnMge09ic2VydmF0aW9uQ29uZmlnLCBEeW5hbWljQ29uZmlnfVxuKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe29ic2VydmF0aW9uLCBkeW5hbWljfSkge1xuXHRjb25zdCB7c3RhdGVQcm9qZWN0aW9ufSA9IG9ic2VydmF0aW9uO1xuXHRjb25zdCB7dHJhbnNpdGlvbn0gPSBkeW5hbWljO1xuXHRjb25zdCBkeW5hbWljRGltZW5zaW9uID0gZHluYW1pYy5kaW1lbnNpb247XG5cdGNvbnN0IG9ic2VydmF0aW9uRGltZW5zaW9uID0gb2JzZXJ2YXRpb24uZGltZW5zaW9uO1xuXG5cdGlmIChkeW5hbWljRGltZW5zaW9uICYmIG9ic2VydmF0aW9uRGltZW5zaW9uICYmIEFycmF5LmlzQXJyYXkoc3RhdGVQcm9qZWN0aW9uKSAmJiAoZHluYW1pY0RpbWVuc2lvbiAhPT0gc3RhdGVQcm9qZWN0aW9uWzBdLmxlbmd0aCB8fCBvYnNlcnZhdGlvbkRpbWVuc2lvbiAhPT0gc3RhdGVQcm9qZWN0aW9uLmxlbmd0aCkpIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcignc3RhdGVQcm9qZWN0aW9uIGRpbWVuc2lvbnMgbm90IG1hdGNoaW5nIHdpdGggb2JzZXJ2YXRpb24gYW5kIGR5bmFtaWMgZGltZW5zaW9ucycpKTtcblx0fVxuXG5cdGlmIChkeW5hbWljRGltZW5zaW9uICYmIEFycmF5LmlzQXJyYXkodHJhbnNpdGlvbikgJiYgZHluYW1pY0RpbWVuc2lvbiAhPT0gdHJhbnNpdGlvbi5sZW5ndGgpIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcigndHJhbnNpdGlvbiBkaW1lbnNpb24gbm90IG1hdGNoaW5nIHdpdGggZHluYW1pYyBkaW1lbnNpb24nKSk7XG5cdH1cblxuXHRpZiAoQXJyYXkuaXNBcnJheShzdGF0ZVByb2plY3Rpb24pKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG9ic2VydmF0aW9uOiBPYmplY3QuYXNzaWduKHt9LCBvYnNlcnZhdGlvbiwge1xuXHRcdFx0XHRkaW1lbnNpb246IHN0YXRlUHJvamVjdGlvbi5sZW5ndGhcblx0XHRcdH0pLFxuXHRcdFx0ZHluYW1pYzogT2JqZWN0LmFzc2lnbih7fSwgZHluYW1pYywge1xuXHRcdFx0XHRkaW1lbnNpb246IHN0YXRlUHJvamVjdGlvblswXS5sZW5ndGhcblx0XHRcdH0pXG5cdFx0fTtcblx0fVxuXG5cdGlmIChBcnJheS5pc0FycmF5KHRyYW5zaXRpb24pKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG9ic2VydmF0aW9uLFxuXHRcdFx0ZHluYW1pYzogT2JqZWN0LmFzc2lnbih7fSwgZHluYW1pYywge1xuXHRcdFx0XHRkaW1lbnNpb246IHRyYW5zaXRpb24ubGVuZ3RoXG5cdFx0XHR9KVxuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4ge29ic2VydmF0aW9uLCBkeW5hbWljfTtcbn07XG4iLCJjb25zdCBzdWIgPSByZXF1aXJlKCcuL2xpbmFsZ2VicmEvc3ViLmpzJyk7XG5jb25zdCB0cmFuc3Bvc2UgPSByZXF1aXJlKCcuL2xpbmFsZ2VicmEvdHJhbnNwb3NlLmpzJyk7XG5jb25zdCBtYXRNdWwgPSByZXF1aXJlKCcuL2xpbmFsZ2VicmEvbWF0LW11bC5qcycpO1xuY29uc3QgaW52ZXJ0ID0gcmVxdWlyZSgnLi9saW5hbGdlYnJhL2ludmVydC5qcycpO1xuY29uc3QgZWxlbVdpc2UgPSByZXF1aXJlKCcuL2xpbmFsZ2VicmEvZWxlbS13aXNlLmpzJyk7XG5jb25zdCBzdWJTcXVhcmVNYXRyaXggPSByZXF1aXJlKCcuL2xpbmFsZ2VicmEvc3ViLXNxdWFyZS1tYXRyaXgnKTtcbmNvbnN0IGFycmF5VG9NYXRyaXggPSByZXF1aXJlKCcuL3V0aWxzL2FycmF5LXRvLW1hdHJpeC5qcycpO1xuXG5jb25zdCBjaGVja01hdHJpeCA9IHJlcXVpcmUoJy4vdXRpbHMvY2hlY2stbWF0cml4LmpzJyk7XG5jb25zdCBjaGVja0NvdmFyaWFuY2UgPSByZXF1aXJlKCcuL3V0aWxzL2NoZWNrLWNvdmFyaWFuY2UnKTtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBtdWx0aSBkaW1lbnNpb25uYWwgZ2F1c3NpYW4sIHdpdGggaGlzIG1lYW4gYW5kIGhpcyBjb3ZhcmlhbmNlXG4gKiBAcHJvcGVydHkge051bWJlcn0gW2luZGV4PTBdIHRoZSBpbmRleCBvZiB0aGUgU3RhdGUgaW4gdGhlIHByb2Nlc3MsIHRoaXMgaXMgbm90IG1hbmRhdG9yeSBmb3Igc2ltcGxlIEthbG1hbiBGaWx0ZXIsIGJ1dCBpcyBuZWVkZWQgZm9yIG1vc3Qgb2YgdGhlIHVzZSBjYXNlIG9mIGV4dGVuZGVkIGthbG1hbiBmaWx0ZXJcbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gY292YXJpYW5jZSBzcXVhcmUgbWF0cml4IG9mIHNpemUgZGltZW5zaW9uXG4gKiBAcHJvcGVydHkge0FycmF5LjxBcnJheTxOdW1iZXI+Pn0gbWVhbiBjb2x1bW4gbWF0cml4IG9mIHNpemUgZGltZW5zaW9uIHggMVxuICovXG5jbGFzcyBTdGF0ZSB7XG5cdGNvbnN0cnVjdG9yKHttZWFuLCBjb3ZhcmlhbmNlLCBpbmRleH0pIHtcblx0XHR0aGlzLm1lYW4gPSBtZWFuO1xuXHRcdHRoaXMuY292YXJpYW5jZSA9IGNvdmFyaWFuY2U7XG5cdFx0dGhpcy5pbmRleCA9IGluZGV4O1xuXHR9XG5cblx0LyoqXG5cdCogQ2hlY2sgdGhlIGNvbnNpc3RlbmN5IG9mIHRoZSBTdGF0ZVxuXHQqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG5cdCogQHJldHVybnMge051bGx9XG5cdCogQHNlZSBjaGVja1xuXHQqL1xuXHRjaGVjayhvcHRpb25zKSB7XG5cdFx0dGhpcy5jb25zdHJ1Y3Rvci5jaGVjayh0aGlzLCBvcHRpb25zKTtcblx0fVxuXG5cdC8qKlxuXHQqIENoZWNrIHRoZSBjb25zaXN0ZW5jeSBvZiB0aGUgU3RhdGUncyBhdHRyaWJ1dGVzXG5cdCogQHBhcmFtIHtTdGF0ZX0gc3RhdGVcblx0KiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dXG5cdCogQHBhcmFtIHtBcnJheX0gW29wdGlvbnMuZGltZW5zaW9uPW51bGxdIGlmIGRlZmluZWQgY2hlY2sgdGhlIGRpbWVuc2lvbiBvZiB0aGUgc3RhdGVcblx0KiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMudGl0bGU9bnVsbF0gdXNlZCB0byBsb2cgZXJyb3IgbW9yIGV4cGxpY2l0bHlcblx0KiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuZWlnZW5cblx0KiBAcmV0dXJucyB7TnVsbH1cblx0Ki9cblxuXHRzdGF0aWMgY2hlY2soc3RhdGUsIHtkaW1lbnNpb24gPSBudWxsLCB0aXRsZSA9IG51bGwsIGVpZ2VufSA9IHt9KSB7XG5cdFx0aWYgKCEoc3RhdGUgaW5zdGFuY2VvZiBTdGF0ZSkpIHtcblx0XHRcdHRocm93IChuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIGFyZ3VtZW50IGlzIG5vdCBhIHN0YXRlIFxcbicgK1xuICAgICAgICAnVGlwczogbWF5YmUgeW91IGFyZSB1c2luZyAyIGRpZmZlcmVudCB2ZXJzaW9uIG9mIGthbG1hbi1maWx0ZXIgaW4geW91ciBucG0gZGVwcyB0cmVlJ1xuXHRcdFx0KSk7XG5cdFx0fVxuXG5cdFx0Y29uc3Qge21lYW4sIGNvdmFyaWFuY2V9ID0gc3RhdGU7IC8vIEluZGV4XG5cdFx0Y29uc3QgbWVhbkRpbWVuc2lvbiA9IG1lYW4ubGVuZ3RoO1xuXHRcdGlmICh0eXBlb2YgKGRpbWVuc2lvbikgPT09ICdudW1iZXInICYmIG1lYW5EaW1lbnNpb24gIT09IGRpbWVuc2lvbikge1xuXHRcdFx0dGhyb3cgKG5ldyBFcnJvcihgWyR7dGl0bGV9XSBTdGF0ZS5tZWFuICR7bWVhbn0gd2l0aCBkaW1lbnNpb24gJHttZWFuRGltZW5zaW9ufSBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBkaW1lbnNpb24gKCR7ZGltZW5zaW9ufSlgKSk7XG5cdFx0fVxuXG5cdFx0Y2hlY2tNYXRyaXgobWVhbiwgW21lYW5EaW1lbnNpb24sIDFdLCB0aXRsZSA/IHRpdGxlICsgJy5tZWFuJyA6ICdtZWFuJyk7XG5cdFx0Y2hlY2tNYXRyaXgoY292YXJpYW5jZSwgW21lYW5EaW1lbnNpb24sIG1lYW5EaW1lbnNpb25dLCB0aXRsZSA/IHRpdGxlICsgJy5jb3ZhcmlhbmNlJyA6ICdjb3ZhcmlhbmNlJyk7XG5cdFx0Y2hlY2tDb3ZhcmlhbmNlKHtjb3ZhcmlhbmNlLCBlaWdlbn0sIHRpdGxlID8gdGl0bGUgKyAnLmNvdmFyaWFuY2UnIDogJ2NvdmFyaWFuY2UnKTtcblx0XHQvLyBJZiAodHlwZW9mIChpbmRleCkgIT09ICdudW1iZXInKSB7XG5cdFx0Ly8gXHR0aHJvdyAobmV3IFR5cGVFcnJvcigndCBtdXN0IGJlIGEgbnVtYmVyJykpO1xuXHRcdC8vIH1cblx0fVxuXG5cdC8qKlxuXHQqIE11bHRpcGx5IHN0YXRlIHdpdGggbWF0cml4XG5cdCogQHBhcmFtIHtTdGF0ZX0gc3RhdGVcblx0KiBAcGFyYW0ge0FycmF5LjxBcnJheS48TnVtYmVyPj59IG1hdHJpeFxuXHQqIEByZXR1cm5zIHtTdGF0ZX1cblx0Ki9cblx0c3RhdGljIG1hdE11bCh7c3RhdGUsIG1hdHJpeH0pIHtcblx0XHRjb25zdCBjb3ZhcmlhbmNlID0gbWF0TXVsKFxuXHRcdFx0bWF0TXVsKG1hdHJpeCwgc3RhdGUuY292YXJpYW5jZSksXG5cdFx0XHR0cmFuc3Bvc2UobWF0cml4KVxuXHRcdCk7XG5cdFx0Y29uc3QgbWVhbiA9IG1hdE11bChtYXRyaXgsIHN0YXRlLm1lYW4pO1xuXG5cdFx0cmV0dXJuIG5ldyBTdGF0ZSh7XG5cdFx0XHRtZWFuLFxuXHRcdFx0Y292YXJpYW5jZSxcblx0XHRcdGluZGV4OiBzdGF0ZS5pbmRleFxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCogRnJvbSBhIHN0YXRlIGluIG4tZGltZW5zaW9uIGNyZWF0ZSBhIHN0YXRlIGluIGEgc3Vic3BhY2Vcblx0KiBJZiB5b3Ugc2VlIHRoZSBzdGF0ZSBhcyBhIE4tZGltZW5zaW9uIGdhdXNzaWFuLFxuXHQqIHRoaXMgY2FuIGJlIHZpZXdlZCBhcyB0aGUgc3ViIE0tZGltZW5zaW9uIGdhdXNzaWFuIChNIDwgTilcblx0KiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBvYnNJbmRleGVzIGxpc3Qgb2YgZGltZW5zaW9uIHRvIGV4dHJhY3QsICAoTSA8IE4gPD0+IG9ic0luZGV4ZXMubGVuZ3RoIDwgdGhpcy5tZWFuLmxlbmd0aClcblx0KiBAcmV0dXJucyB7U3RhdGV9IHN1YlN0YXRlIGluIHN1YnNwYWNlLCB3aXRoIHN1YlN0YXRlLm1lYW4ubGVuZ3RoID09PSBvYnNJbmRleGVzLmxlbmd0aFxuXHQqL1xuXHRzdWJTdGF0ZShvYnNJbmRleGVzKSB7XG5cdFx0Y29uc3Qgc3RhdGUgPSBuZXcgU3RhdGUoe1xuXHRcdFx0bWVhbjogb2JzSW5kZXhlcy5tYXAoaSA9PiB0aGlzLm1lYW5baV0pLFxuXHRcdFx0Y292YXJpYW5jZTogc3ViU3F1YXJlTWF0cml4KHRoaXMuY292YXJpYW5jZSwgb2JzSW5kZXhlcyksXG5cdFx0XHRpbmRleDogdGhpcy5pbmRleFxuXHRcdH0pO1xuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdC8qKlxuXHQqIEB0eXBlZGVmIHtPYmplY3R9IERldGFpbGVkTWFoYWxhbm9iaXNcblx0KiBAcHJvcGVydHkge0FycmF5LjxbTnVtYmVyXT59IGRpZmZcblx0KiBAcHJvcGVydHkge0FycmF5LjxBcnJheS48TnVtYmVyPj59IGNvdmFyaWFuY2VJbnZlcnRcblx0KiBAcHJvcGVydHkge051bWJlcn0gdmFsdWVcblx0Ki9cblx0LyoqXG5cdCogU2ltcGxlIE1hbGFoYW5vYmlzIGRpc3RhbmNlIGJldHdlZW4gdGhlIGRpc3RyaWJ1dGlvbiAodGhpcykgYW5kIGEgcG9pbnRcblx0KiBAcGFyYW0ge0FycmF5LjxbTnVtYmVyXT59IHBvaW50IGEgTngxIG1hdHJpeCByZXByZXNlbnRpbmcgYSBwb2ludFxuXHQqIEByZXR1cm5zIHtEZXRhaWxlZE1haGFsYW5vYmlzfVxuXHQqL1xuXHRyYXdEZXRhaWxlZE1haGFsYW5vYmlzKHBvaW50KSB7XG5cdFx0Y29uc3QgZGlmZiA9IHN1Yih0aGlzLm1lYW4sIHBvaW50KTtcblx0XHR0aGlzLmNoZWNrKCk7XG5cdFx0Y29uc3QgY292YXJpYW5jZUludmVydCA9IGludmVydCh0aGlzLmNvdmFyaWFuY2UpO1xuXHRcdGlmIChjb3ZhcmlhbmNlSW52ZXJ0ID09PSBudWxsKSB7XG5cdFx0XHR0aGlzLmNoZWNrKHtlaWdlbjogdHJ1ZX0pO1xuXHRcdFx0dGhyb3cgKG5ldyBFcnJvcihgQ2Fubm90IGludmVydCBjb3ZhcmlhbmNlICR7SlNPTi5zdHJpbmdpZnkodGhpcy5jb3ZhcmlhbmNlKX1gKSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZGlmZlRyYW5zcG9zZWQgPSB0cmFuc3Bvc2UoZGlmZik7XG5cblx0XHQvLyBDb25zb2xlLmxvZygnY292YXJpYW5jZSBpbiBvYnMgc3BhY2UnLCBjb3ZhcmlhbmNlSW5PYnNlcnZhdGlvblNwYWNlKTtcblxuXHRcdGNvbnN0IHZhbHVlID0gTWF0aC5zcXJ0KFxuXHRcdFx0bWF0TXVsKFxuXHRcdFx0XHRtYXRNdWwoXG5cdFx0XHRcdFx0ZGlmZlRyYW5zcG9zZWQsXG5cdFx0XHRcdFx0Y292YXJpYW5jZUludmVydFxuXHRcdFx0XHQpLFxuXHRcdFx0XHRkaWZmXG5cdFx0XHQpXG5cdFx0KTtcblx0XHRpZiAoTnVtYmVyLmlzTmFOKHZhbHVlKSkge1xuXHRcdFx0Y29uc29sZS5sb2coe2RpZmYsIGNvdmFyaWFuY2VJbnZlcnQsIHRoaXM6IHRoaXMsIHBvaW50fSwgbWF0TXVsKFxuXHRcdFx0XHRtYXRNdWwoXG5cdFx0XHRcdFx0ZGlmZlRyYW5zcG9zZWQsXG5cdFx0XHRcdFx0Y292YXJpYW5jZUludmVydFxuXHRcdFx0XHQpLFxuXHRcdFx0XHRkaWZmXG5cdFx0XHQpKTtcblx0XHRcdHRocm93IChuZXcgRXJyb3IoJ21haGFsYW5vYmlzIGlzIE5hTicpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0ZGlmZixcblx0XHRcdGNvdmFyaWFuY2VJbnZlcnQsXG5cdFx0XHR2YWx1ZVxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0KiBNYWxhaGFub2JpcyBkaXN0YW5jZSBpcyBtYWRlIGFnYWluc3QgYW4gb2JzZXJ2YXRpb24sIHNvIHRoZSBtZWFuIGFuZCBjb3ZhcmlhbmNlXG5cdCogYXJlIHByb2plY3RlZCBpbnRvIHRoZSBvYnNlcnZhdGlvbiBzcGFjZVxuXHQqIEBwYXJhbSB7S2FsbWFuRmlsdGVyfSBrZiBrYWxtYW4gZmlsdGVyIHVzZSB0byBwcm9qZWN0IHRoZSBzdGF0ZSBpbiBvYnNlcnZhdGlvbidzIHNwYWNlXG5cdCogQHBhcmFtIHtPYnNlcnZhdGlvbn0gb2JzZXJ2YXRpb25cblx0KiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBvYnNJbmRleGVzIGxpc3Qgb2YgaW5kZXhlcyBvZiBvYnNlcnZhdGlvbiBzdGF0ZSB0byB1c2UgZm9yIHRoZSBtYWhhbGFub2JpcyBkaXN0YW5jZVxuXHQqIEByZXR1cm5zIHtEZXRhaWxlZE1haGFsYW5vYmlzfVxuXHQqL1xuXHRkZXRhaWxlZE1haGFsYW5vYmlzKHtrZiwgb2JzZXJ2YXRpb24sIG9ic0luZGV4ZXN9KSB7XG5cdFx0aWYgKG9ic2VydmF0aW9uLmxlbmd0aCAhPT0ga2Yub2JzZXJ2YXRpb24uZGltZW5zaW9uKSB7XG5cdFx0XHR0aHJvdyAobmV3IEVycm9yKGBNYWhhbGFub2JpcyBvYnNlcnZhdGlvbiAke29ic2VydmF0aW9ufSAoZGltZW5zaW9uOiAke29ic2VydmF0aW9uLmxlbmd0aH0pIGRvZXMgbm90IG1hdGNoIHdpdGgga2Ygb2JzZXJ2YXRpb24gZGltZW5zaW9uICgke2tmLm9ic2VydmF0aW9uLmRpbWVuc2lvbn0pYCkpO1xuXHRcdH1cblxuXHRcdGxldCBjb3JyZWN0bHlTaXplZE9ic2VydmF0aW9uID0gYXJyYXlUb01hdHJpeCh7b2JzZXJ2YXRpb24sIGRpbWVuc2lvbjogb2JzZXJ2YXRpb24ubGVuZ3RofSk7XG5cblx0XHRjb25zdCBzdGF0ZVByb2plY3Rpb24gPSBrZi5nZXRWYWx1ZShrZi5vYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24sIHt9KTtcblxuXHRcdGxldCBwcm9qZWN0ZWRTdGF0ZSA9IHRoaXMuY29uc3RydWN0b3IubWF0TXVsKHtzdGF0ZTogdGhpcywgbWF0cml4OiBzdGF0ZVByb2plY3Rpb259KTtcblxuXHRcdGlmIChBcnJheS5pc0FycmF5KG9ic0luZGV4ZXMpKSB7XG5cdFx0XHRwcm9qZWN0ZWRTdGF0ZSA9IHByb2plY3RlZFN0YXRlLnN1YlN0YXRlKG9ic0luZGV4ZXMpO1xuXHRcdFx0Y29ycmVjdGx5U2l6ZWRPYnNlcnZhdGlvbiA9IG9ic0luZGV4ZXMubWFwKGkgPT4gY29ycmVjdGx5U2l6ZWRPYnNlcnZhdGlvbltpXSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHByb2plY3RlZFN0YXRlLnJhd0RldGFpbGVkTWFoYWxhbm9iaXMoY29ycmVjdGx5U2l6ZWRPYnNlcnZhdGlvbik7XG5cdH1cblxuXHQvKipcblx0KiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBAc2VlIGRldGFpbGVkTWFoYWxhbm9iaXNcblx0KiBAcmV0dXJucyB7TnVtYmVyfVxuXHQqL1xuXHRtYWhhbGFub2JpcyhvcHRpb25zKSB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gdGhpcy5kZXRhaWxlZE1haGFsYW5vYmlzKG9wdGlvbnMpLnZhbHVlO1xuXHRcdGlmIChOdW1iZXIuaXNOYU4ocmVzdWx0KSkge1xuXHRcdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoJ21haGFsYW5vYmlzIGlzIE5hTicpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0LyoqXG5cdCogQmhhdHRhY2hhcnl5YSBkaXN0YW5jZSBpcyBtYWRlIGFnYWluc3QgaW4gdGhlIG9ic2VydmF0aW9uIHNwYWNlXG5cdCogdG8gZG8gaXQgaW4gdGhlIG5vcm1hbCBzcGFjZSBzZWUgc3RhdGUuYmhhdHRhY2hhcnl5YVxuXHQqIEBwYXJhbSB7S2FsbWFuRmlsdGVyfSBrZiBrYWxtYW4gZmlsdGVyIHVzZSB0byBwcm9qZWN0IHRoZSBzdGF0ZSBpbiBvYnNlcnZhdGlvbidzIHNwYWNlXG5cdCogQHBhcmFtIHtTdGF0ZX0gc3RhdGVcblx0KiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBvYnNJbmRleGVzIGxpc3Qgb2YgaW5kZXhlcyBvZiBvYnNlcnZhdGlvbiBzdGF0ZSB0byB1c2UgZm9yIHRoZSBiaGF0dGFjaGFyeXlhIGRpc3RhbmNlXG5cdCogQHJldHVybnMge051bWJlcn1cblx0Ki9cblx0b2JzQmhhdHRhY2hhcnl5YSh7a2YsIHN0YXRlLCBvYnNJbmRleGVzfSkge1xuXHRcdGNvbnN0IHN0YXRlUHJvamVjdGlvbiA9IGtmLmdldFZhbHVlKGtmLm9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbiwge30pO1xuXG5cdFx0bGV0IHByb2plY3RlZFNlbGZTdGF0ZSA9IHRoaXMuY29uc3RydWN0b3IubWF0TXVsKHtzdGF0ZTogdGhpcywgbWF0cml4OiBzdGF0ZVByb2plY3Rpb259KTtcblx0XHRsZXQgcHJvamVjdGVkT3RoZXJTdGF0ZSA9IHRoaXMuY29uc3RydWN0b3IubWF0TXVsKHtzdGF0ZSwgbWF0cml4OiBzdGF0ZVByb2plY3Rpb259KTtcblxuXHRcdGlmIChBcnJheS5pc0FycmF5KG9ic0luZGV4ZXMpKSB7XG5cdFx0XHRwcm9qZWN0ZWRTZWxmU3RhdGUgPSBwcm9qZWN0ZWRTZWxmU3RhdGUuc3ViU3RhdGUob2JzSW5kZXhlcyk7XG5cdFx0XHRwcm9qZWN0ZWRPdGhlclN0YXRlID0gcHJvamVjdGVkT3RoZXJTdGF0ZS5zdWJTdGF0ZShvYnNJbmRleGVzKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcHJvamVjdGVkU2VsZlN0YXRlLmJoYXR0YWNoYXJ5eWEocHJvamVjdGVkT3RoZXJTdGF0ZSk7XG5cdH1cblxuXHQvKipcblx0KiBAcGFyYW0ge1N0YXRlfSBvdGhlclN0YXRlIG90aGVyIHN0YXRlIHRvIGNvbXBhcmUgd2l0aFxuXHQqIEByZXR1cm5zIHtOdW1iZXJ9XG5cdCovXG5cdGJoYXR0YWNoYXJ5eWEob3RoZXJTdGF0ZSkge1xuXHRcdGNvbnN0IHN0YXRlID0gdGhpcztcblx0XHRjb25zdCBhdmVyYWdlID0gZWxlbVdpc2UoW3N0YXRlLmNvdmFyaWFuY2UsIG90aGVyU3RhdGUuY292YXJpYW5jZV0sIChbYSwgYl0pID0+IChhICsgYikgLyAyKTtcblxuXHRcdGxldCBjb3ZhckludmVydGVkO1xuXHRcdHRyeSB7XG5cdFx0XHRjb3ZhckludmVydGVkID0gaW52ZXJ0KGF2ZXJhZ2UpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnQ2Fubm90IGludmVydCcsIGF2ZXJhZ2UpO1xuXHRcdFx0dGhyb3cgKGVycm9yKTtcblx0XHR9XG5cblx0XHRjb25zdCBkaWZmID0gc3ViKHN0YXRlLm1lYW4sIG90aGVyU3RhdGUubWVhbik7XG5cblx0XHRyZXR1cm4gbWF0TXVsKHRyYW5zcG9zZShkaWZmKSwgbWF0TXVsKGNvdmFySW52ZXJ0ZWQsIGRpZmYpKVswXVswXTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXRlO1xuIiwiLyoqXG4qUmV0dXJucyB0aGUgY29ycmVzcG9uZGluZyBtYXRyaXggaW4gZGltKjEsIGdpdmVuIGFuIGRpbSBtYXRyaXgsIGFuZCBjaGVja3NcbiogaWYgY29ycmVzcG9uZGluZyB3aXRoIHRoZSBvYnNlcnZhdGlvbiBkaW1lbnNpb25cbipAcGFyYW0ge0FycmF5LjxOdW1iZXI+IHwgQXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gb2JzZXJ2YXRpb25cbipAcGFyYW0ge051bWJlcn0gZGltZW5zaW9uXG4qQHJldHVybnMge0FycmF5LjxBcnJheS48TnVtYmVyPj59XG4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7b2JzZXJ2YXRpb24sIGRpbWVuc2lvbn0pIHtcblx0aWYgKCFBcnJheS5pc0FycmF5KG9ic2VydmF0aW9uKSkge1xuXHRcdGlmIChkaW1lbnNpb24gPT09IDEgJiYgdHlwZW9mIChvYnNlcnZhdGlvbikgPT09ICdudW1iZXInKSB7XG5cdFx0XHRyZXR1cm4gW1tvYnNlcnZhdGlvbl1dO1xuXHRcdH1cblxuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKGBUaGUgb2JzZXJ2YXRpb24gKCR7b2JzZXJ2YXRpb259KSBzaG91bGQgYmUgYW4gYXJyYXkgKGRpbWVuc2lvbjogJHtkaW1lbnNpb259KWApKTtcblx0fVxuXG5cdGlmIChvYnNlcnZhdGlvbi5sZW5ndGggIT09IGRpbWVuc2lvbikge1xuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKGBPYnNlcnZhdGlvbiAoJHtvYnNlcnZhdGlvbi5sZW5ndGh9KSBhbmQgZGltZW5zaW9uICgke2RpbWVuc2lvbn0pIG5vdCBtYXRjaGluZ2ApKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgKG9ic2VydmF0aW9uWzBdKSA9PT0gJ251bWJlcicgfHwgb2JzZXJ2YXRpb25bMF0gPT09IG51bGwpIHtcblx0XHRyZXR1cm4gb2JzZXJ2YXRpb24ubWFwKGVsZW1lbnQgPT4gW2VsZW1lbnRdKTtcblx0fVxuXG5cdHJldHVybiBvYnNlcnZhdGlvbjtcbn07XG4iLCJjb25zdCB0b2xlcmFuY2UgPSAwLjE7XG5jb25zdCBNYXRyaXggPSByZXF1aXJlKCdAcmF5eWFtaGsvbWF0cml4Jyk7XG5jb25zdCBjaGVja01hdHJpeCA9IHJlcXVpcmUoJy4vY2hlY2stbWF0cml4Jyk7XG5cbmNvbnN0IGNoZWNrRGVmaW5pdGVQb3NpdGl2ZSA9IGZ1bmN0aW9uIChjb3ZhcmlhbmNlLCB0b2xlcmFuY2UgPSAxZS0xMCkge1xuXHRjb25zdCBjb3ZhcmlhbmNlTWF0cml4ID0gbmV3IE1hdHJpeChjb3ZhcmlhbmNlKTtcblx0Y29uc3QgZWlnZW52YWx1ZXMgPSBjb3ZhcmlhbmNlTWF0cml4LmVpZ2VudmFsdWVzKCk7XG5cdGVpZ2VudmFsdWVzLmZvckVhY2goZWlnZW52YWx1ZSA9PiB7XG5cdFx0aWYgKGVpZ2VudmFsdWUgPD0gLXRvbGVyYW5jZSkge1xuXHRcdFx0Y29uc29sZS5sb2coY292YXJpYW5jZSwgZWlnZW52YWx1ZSk7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEVpZ2VudmFsdWUgc2hvdWxkIGJlIHBvc2l0aXZlIChhY3R1YWw6ICR7ZWlnZW52YWx1ZX0pYCk7XG5cdFx0fVxuXHR9KTtcblx0Y29uc29sZS5sb2coJ2lzIGRlZmluaXRlIHBvc2l0aXZlJywgY292YXJpYW5jZSk7XG59O1xuXG5jb25zdCBjaGVja1N5bWV0cmljID0gZnVuY3Rpb24gKGNvdmFyaWFuY2UsIHRpdGxlID0gJ2NoZWNrU3ltZXRyaWMnKSB7XG5cdGNvdmFyaWFuY2UuZm9yRWFjaCgocm93LCByb3dJZCkgPT4gcm93LmZvckVhY2goKGl0ZW0sIGNvbElkKSA9PiB7XG5cdFx0aWYgKHJvd0lkID09PSBjb2xJZCAmJiBpdGVtIDwgMCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBbJHt0aXRsZX1dIFZhcmlhbmNlWyR7Y29sSWR9XSBzaG91bGQgYmUgcG9zaXRpdmUgKGFjdHVhbDogJHtpdGVtfSlgKTtcblx0XHR9IGVsc2UgaWYgKE1hdGguYWJzKGl0ZW0pID4gTWF0aC5zcXJ0KGNvdmFyaWFuY2Vbcm93SWRdW3Jvd0lkXSAqIGNvdmFyaWFuY2VbY29sSWRdW2NvbElkXSkpIHtcblx0XHRcdGNvbnNvbGUubG9nKGNvdmFyaWFuY2UpO1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBbJHt0aXRsZX1dIENvdmFyaWFuY2VbJHtyb3dJZH1dWyR7Y29sSWR9XSBzaG91bGQgdmVyaWZ5IENhdWNoeSBTY2h3YXJ6IEluZXF1YWxpdHkgYCArXG5cdFx0XHRcdGAoZXhwZWN0ZWQ6IHx4fCA8PSBzcXJ0KCR7Y292YXJpYW5jZVtyb3dJZF1bcm93SWRdfSAqICR7Y292YXJpYW5jZVtjb2xJZF1bY29sSWRdfSlgICtcblx0XHRcdFx0YCBhY3R1YWw6ICR7aXRlbX0pYCk7XG5cdFx0fSBlbHNlIGlmIChNYXRoLmFicyhpdGVtIC0gY292YXJpYW5jZVtjb2xJZF1bcm93SWRdKSA+IHRvbGVyYW5jZSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBbJHt0aXRsZX1dIENvdmFyaWFuY2VbJHtyb3dJZH1dWyR7Y29sSWR9XSBzaG91bGQgZXF1YWwgQ292YXJpYW5jZVske2NvbElkfV1bJHtyb3dJZH1dIGAgK1xuXHRcdFx0YCAoYWN0dWFsIGRpZmY6ICR7TWF0aC5hYnMoaXRlbSAtIGNvdmFyaWFuY2VbY29sSWRdW3Jvd0lkXSl9KSAgPSAke2l0ZW19IC0gJHtjb3ZhcmlhbmNlW2NvbElkXVtyb3dJZF19XFxuYCArXG5cdFx0XHRgJHtjb3ZhcmlhbmNlLmpvaW4oJ1xcbicpfSBpcyBpbnZhbGlkYFxuXHRcdFx0KTtcblx0XHR9XG5cdH0pKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHtjb3ZhcmlhbmNlLCBlaWdlbiA9IGZhbHNlfSkge1xuXHRjaGVja01hdHJpeChjb3ZhcmlhbmNlKTtcblx0Y2hlY2tTeW1ldHJpYyhjb3ZhcmlhbmNlKTtcblx0aWYgKGVpZ2VuKSB7XG5cdFx0Y2hlY2tEZWZpbml0ZVBvc2l0aXZlKGNvdmFyaWFuY2UpO1xuXHR9XG59O1xuIiwiY29uc3QgY2hlY2tTaGFwZSA9IHJlcXVpcmUoJy4vY2hlY2stc2hhcGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobWF0cml4LCBzaGFwZSwgdGl0bGUgPSAnY2hlY2tNYXRyaXgnKSB7XG5cdGlmICghQXJyYXkuaXNBcnJheShtYXRyaXgpKSB7XG5cdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoYFske3RpdGxlfV0gc2hvdWxkIGJlIGEgMi1sZXZlbCBhcnJheSBtYXRyaXggYW5kIGlzICR7bWF0cml4fWApKTtcblx0fVxuXG5cdG1hdHJpeC5mb3JFYWNoKHJvdyA9PiB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHJvdykpIHtcblx0XHRcdHRocm93IChuZXcgVHlwZUVycm9yKGBbJHt0aXRsZX1dIDEtbGV2ZWwgYXJyYXkgc2hvdWxkIGJlIGEgbWF0cml4ICR7SlNPTi5zdHJpbmdpZnkobWF0cml4KX1gKSk7XG5cdFx0fVxuXHR9KTtcblx0aWYgKG1hdHJpeC5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIpKS5maWx0ZXIoYSA9PiBOdW1iZXIuaXNOYU4oYSkpLmxlbmd0aCA+IDApIHtcblx0XHR0aHJvdyAobmV3IEVycm9yKFxuXHRcdFx0YFske3RpdGxlfV0gTWF0cml4IHNob3VsZCBub3QgaGF2ZSBhIE5hTlxcbkluIDogXFxuYCArXG5cdFx0XHRtYXRyaXguam9pbignXFxuJylcblx0XHQpKTtcblx0fVxuXG5cdGlmIChzaGFwZSkge1xuXHRcdGNoZWNrU2hhcGUobWF0cml4LCBzaGFwZSwgdGl0bGUpO1xuXHR9XG59O1xuIiwiY29uc3QgY2hlY2tTaGFwZSA9IGZ1bmN0aW9uIChtYXRyaXgsIHNoYXBlLCB0aXRsZSA9ICdjaGVja1NoYXBlJykge1xuXHRpZiAobWF0cml4Lmxlbmd0aCAhPT0gc2hhcGVbMF0pIHtcblx0XHR0aHJvdyAobmV3IEVycm9yKGBbJHt0aXRsZX1dIGV4cGVjdGVkIHNpemUgKCR7c2hhcGVbMF19KSBhbmQgbGVuZ3RoICgke21hdHJpeC5sZW5ndGh9KSBkb2VzIG5vdCBtYXRjaGApKTtcblx0fVxuXG5cdGlmIChzaGFwZS5sZW5ndGggPiAxKSB7XG5cdFx0cmV0dXJuIG1hdHJpeC5mb3JFYWNoKG0gPT4gY2hlY2tTaGFwZShtLCBzaGFwZS5zbGljZSgxKSwgdGl0bGUpKTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjaGVja1NoYXBlO1xuIiwiY29uc3QgY2hlY2tDb3ZhcmlhbmNlID0gcmVxdWlyZSgnLi9jaGVjay1jb3ZhcmlhbmNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHtjb3JyZWxhdGlvbiwgdmFyaWFuY2V9KSB7XG5cdGNoZWNrQ292YXJpYW5jZSh7Y292YXJpYW5jZTogY29ycmVsYXRpb259KTtcblx0cmV0dXJuIGNvcnJlbGF0aW9uLm1hcCgoYywgcm93SW5kZXgpID0+IGMubWFwKChhLCBjb2xJbmRleCkgPT4gYSAqIE1hdGguc3FydCh2YXJpYW5jZVtjb2xJbmRleF0gKiB2YXJpYW5jZVtyb3dJbmRleF0pKSk7XG59O1xuIiwiY29uc3QgY2hlY2tDb3ZhcmlhbmNlID0gcmVxdWlyZSgnLi9jaGVjay1jb3ZhcmlhbmNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNvdmFyaWFuY2UpIHtcblx0Y2hlY2tDb3ZhcmlhbmNlKHtjb3ZhcmlhbmNlfSk7XG5cdGNvbnN0IHZhcmlhbmNlID0gY292YXJpYW5jZS5tYXAoKF8sIGkpID0+IGNvdmFyaWFuY2VbaV1baV0pO1xuXG5cdHJldHVybiB7XG5cdFx0dmFyaWFuY2UsXG5cdFx0Y29ycmVsYXRpb246IGNvdmFyaWFuY2UubWFwKChjLCByb3dJbmRleCkgPT4gYy5tYXAoKGEsIGNvbEluZGV4KSA9PiBhIC8gTWF0aC5zcXJ0KHZhcmlhbmNlW2NvbEluZGV4XSAqIHZhcmlhbmNlW3Jvd0luZGV4XSkpKVxuXHR9O1xufTtcbiIsImNvbnN0IHVuaXEgPSByZXF1aXJlKCcuL3VuaXEuanMnKTtcblxuY29uc3QgbGltaXQgPSAxMDA7XG5cbi8qKlxuKkVxdWl2YWxlbnQgdG8gdGhlIE9iamVjdC5hc3NpZ24gbWV0aG9kLCB0YWtlcyBzZXZlcmFsIGFyZ3VtZW50cyBhbmQgY3JlYXRlcyBhIG5ldyBvYmplY3QgY29ycmVzcG9uZGluZyB0byB0aGUgYXNzaWdubWVudCBvZiB0aGUgYXJndW1lbnRzXG4qIEBwYXJhbSB7T2JqZWN0fSBhcmdzXG4qIEBwYXJhbSB7TnVtYmVyfSBzdGVwXG4qIEByZXR1cm5zIHtPYmplY3R9XG4qL1xuY29uc3QgZGVlcEFzc2lnbiA9IGZ1bmN0aW9uIChhcmdzLCBzdGVwKSB7XG5cdGlmIChzdGVwID4gbGltaXQpIHtcblx0XHR0aHJvdyAobmV3IEVycm9yKGBJbiBkZWVwQXNzaWduLCBudW1iZXIgb2YgcmVjdXJzaXZlIGNhbGwgKCR7c3RlcH0pIHJlYWNoZWQgbGltaXQgKCR7bGltaXR9KSwgZGVlcEFzc2lnbiBpcyBub3Qgd29ya2luZyBvbiAgc2VsZi1yZWZlcmVuY2luZyBvYmplY3RzYCkpO1xuXHR9XG5cblx0Y29uc3QgZmlsdGVyQXJndW1lbnRzID0gYXJncy5maWx0ZXIoYXJnID0+IHR5cGVvZiAoYXJnKSAhPT0gJ3VuZGVmaW5lZCcgJiYgYXJnICE9PSBudWxsKTtcblx0Y29uc3QgbGFzdEFyZ3VtZW50ID0gZmlsdGVyQXJndW1lbnRzW2ZpbHRlckFyZ3VtZW50cy5sZW5ndGggLSAxXTtcblx0aWYgKGZpbHRlckFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRyZXR1cm4gZmlsdGVyQXJndW1lbnRzWzBdO1xuXHR9XG5cblx0aWYgKHR5cGVvZiAobGFzdEFyZ3VtZW50KSAhPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheShsYXN0QXJndW1lbnQpKSB7XG5cdFx0cmV0dXJuIGxhc3RBcmd1bWVudDtcblx0fVxuXG5cdGlmIChmaWx0ZXJBcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRjb25zdCBvYmplY3RzQXJndW1lbnRzID0gZmlsdGVyQXJndW1lbnRzLmZpbHRlcihhcmcgPT4gdHlwZW9mIChhcmcpID09PSAnb2JqZWN0Jyk7XG5cdGxldCBrZXlzID0gW107XG5cdG9iamVjdHNBcmd1bWVudHMuZm9yRWFjaChhcmcgPT4ge1xuXHRcdGtleXMgPSBrZXlzLmNvbmNhdChPYmplY3Qua2V5cyhhcmcpKTtcblx0fSk7XG5cdGNvbnN0IHVuaXFLZXlzID0gdW5pcShrZXlzKTtcblx0Y29uc3QgcmVzdWx0ID0ge307XG5cdHVuaXFLZXlzLmZvckVhY2goa2V5ID0+IHtcblx0XHRjb25zdCB2YWx1ZXMgPSBvYmplY3RzQXJndW1lbnRzLm1hcChhcmcgPT4gYXJnW2tleV0pO1xuXHRcdHJlc3VsdFtrZXldID0gZGVlcEFzc2lnbih2YWx1ZXMsIHN0ZXAgKyAxKTtcblx0fSk7XG5cdHJldHVybiByZXN1bHQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9ICgoLi4uYXJncykgPT4gZGVlcEFzc2lnbihhcmdzLCAwKSk7XG4iLCIvKipcbiogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiogQHBhcmFtIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBvcHRzLm1lYXN1cmVzIGEgbGlzdCBvZiBtZWFzdXJlLCBzaXplIGlzIEx4TiBMIHRoZSBudW1iZXIgb2Ygc2FtcGxlLCBOIHRoZSBkaW1lbnNpb25cbiogQHBhcmFtIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBvcHRzLmF2ZXJhZ2VzIGEgbGlzdCBvZiBhdmVyYWdlcywgc2l6ZSBpcyBMeE4gTCB0aGUgbnVtYmVyIG9mIHNhbXBsZSwgTiB0aGUgZGltZW5zaW9uXG4qIEByZXR1cm5zIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBjb3ZhcmlhbmNlIG1hdHJpeCBzaXplIGlzIE54TlxuKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe21lYXN1cmVzLCBhdmVyYWdlc30pIHtcblx0Y29uc3QgbCA9IG1lYXN1cmVzLmxlbmd0aDtcblx0Y29uc3QgbiA9IG1lYXN1cmVzWzBdLmxlbmd0aDtcblxuXHRpZiAobCA9PT0gMCkge1xuXHRcdHRocm93IChuZXcgRXJyb3IoJ0Nhbm5vdCBmaW5kIGNvdmFyaWFuY2UgZm9yIGVtcHR5IHNhbXBsZScpKTtcblx0fVxuXG5cdHJldHVybiAobmV3IEFycmF5KG4pLmZpbGwoMSkpLm1hcCgoXywgcm93SW5kZXgpID0+IHtcblx0XHRyZXR1cm4gKG5ldyBBcnJheShuKS5maWxsKDEpKS5tYXAoKF8sIGNvbEluZGV4KSA9PiB7XG5cdFx0XHRjb25zdCBzdGRzID0gbWVhc3VyZXMubWFwKChtLCBpKSA9PiAobVtyb3dJbmRleF0gLSBhdmVyYWdlc1tpXVtyb3dJbmRleF0pICogKG1bY29sSW5kZXhdIC0gYXZlcmFnZXNbaV1bY29sSW5kZXhdKSk7XG5cdFx0XHRjb25zdCByZXN1bHQgPSBzdGRzLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpIC8gbDtcblx0XHRcdGlmIChOdW1iZXIuaXNOYU4ocmVzdWx0KSkge1xuXHRcdFx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcigncmVzdWx0IGlzIE5hTicpKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9KTtcblx0fSk7XG59O1xuIiwiLyoqXG4qIEB0eXBlZGVmIHtOdW1iZXIgfCBBcnJheS48TnVtYmVyPiB8IEFycmF5LjxBcnJheS48TnVtYmVyPj59IENvdmFyaWFuY2VQYXJhbVxuKi9cbmNvbnN0IGRpYWcgPSByZXF1aXJlKCcuLi9saW5hbGdlYnJhL2RpYWcnKTtcbmNvbnN0IGNoZWNrTWF0cml4ID0gcmVxdWlyZSgnLi9jaGVjay1tYXRyaXgnKTtcbi8qKlxuKiBJZiBjb3YgaXMgYSBudW1iZXIsIHJlc3VsdCB3aWxsIGJlIElkZW50aXR5KmNvdlxuKiBJZiBjb3YgaXMgYW4gQXJyYXkuPE51bWJlcj4sIHJlc3VsdCB3aWxsIGJlIGRpYWcoY292KVxuKiBJZiBjb3YgaXMgYW4gQXJyYXkuPEFycmF5LjxOdW1iZXI+PiwgcmVzdWx0IHdpbGwgYmUgY292XG4qIEBwYXJhbSB7Q292YXJpYW5jZVBhcmFtfSBjb3ZcbiogQHBhcmFtIHtOdW1iZXJ9IGRpbWVuc2lvblxuKiBAcmV0dXJucyB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn1cbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjb3YsIHtkaW1lbnNpb24sIHRpdGxlID0gJ3BvbHltb3JwaCd9ID0ge30pIHtcblx0aWYgKHR5cGVvZiAoY292KSA9PT0gJ251bWJlcicgfHwgQXJyYXkuaXNBcnJheShjb3YpKSB7XG5cdFx0aWYgKHR5cGVvZiAoY292KSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIChkaW1lbnNpb24pID09PSAnbnVtYmVyJykge1xuXHRcdFx0cmV0dXJuIGRpYWcobmV3IEFycmF5KGRpbWVuc2lvbikuZmlsbChjb3YpKTtcblx0XHR9XG5cblx0XHRpZiAoKEFycmF5LmlzQXJyYXkoY292KSkgJiYgKEFycmF5LmlzQXJyYXkoY292WzBdKSkpIHtcblx0XHRcdGxldCBzaGFwZTtcblx0XHRcdGlmICh0eXBlb2YgKGRpbWVuc2lvbikgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdHNoYXBlID0gW2RpbWVuc2lvbiwgZGltZW5zaW9uXTtcblx0XHRcdH1cblxuXHRcdFx0Y2hlY2tNYXRyaXgoY292LCBzaGFwZSwgdGl0bGUpO1xuXHRcdFx0cmV0dXJuIGNvdjtcblx0XHR9XG5cblx0XHRpZiAoKEFycmF5LmlzQXJyYXkoY292KSkgJiYgKHR5cGVvZiAoY292WzBdKSA9PT0gJ251bWJlcicpKSB7XG5cdFx0XHRyZXR1cm4gZGlhZyhjb3YpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjb3Y7XG59O1xuIiwiLy8gQ29uc3QgZGlhZyA9IHJlcXVpcmUoJy4uL2xpbmFsZ2VicmEvZGlhZy5qcycpO1xuXG4vKipcbiogQGNhbGxiYWNrIE1hdHJpeENhbGxiYWNrXG4qIEByZXR1cm5zIDxBcnJheS48QXJyYXkuPE51bWJlcj4+XG4qL1xuXG4vKipcbiogVHJhbmZvcm1zOlxuKiogYSAyZCBhcnJheSBpbnRvIGEgZnVuY3Rpb24gKCgpID0+IGFycmF5KVxuKiogYSAxZCBhcnJheSBpbnRvIGEgZnVuY3Rpb24gKCgpID0+IGRpYWcoYXJyYXkpKVxuKkBwYXJhbSB7QXJyYXkuPE51bWJlcj4gfCBBcnJheS48QXJyYXkuPE51bWJlcj4+fSBhcnJheVxuKkByZXR1cm5zIHtNYXRyaXhDYWxsYmFja31cbiovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFycmF5LCB7bGFiZWwgPSBudWxsfSA9IHt9KSB7XG5cdGlmICh0eXBlb2YgKGFycmF5KSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHJldHVybiBhcnJheTtcblx0fVxuXG5cdGlmIChBcnJheS5pc0FycmF5KGFycmF5KSkge1xuXHRcdHJldHVybiBhcnJheTtcblx0fVxuXG5cdHRocm93IChuZXcgRXJyb3IoYCR7bGFiZWwgPT09IG51bGwgPyAnJyA6IGxhYmVsICsgJyA6ICd9T25seSBhcnJheXMgYW5kIGZ1bmN0aW9ucyBhcmUgYXV0aG9yaXplZCAoZ290OiBcIiR7YXJyYXl9XCIpYCkpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFycmF5KSB7XG5cdHJldHVybiBhcnJheS5maWx0ZXIoKHZhbHVlLCBpbmRleCkgPT5cblx0XHRhcnJheS5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXhcblx0KTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGFyZ3VtZW50IG9mIGEgQ29tcGxleCBOdW1iZXIgd2hpY2ggaXMgcmVzdHJpY3RlZCB0byB0aGUgaW50ZXJ2YWwgWyAwLCAyz4AgKS48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIGFyZ3VtZW50IG9mIHRoZSBDb21wbGV4IE51bWJlciBpcyB0aGUgYW5nbGUgYmV0d2VlbiBwb3NpdGl2ZSByZWFsLWF4aXNcclxuICogYW5kIHRoZSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBDb21wbGV4IE51bWJlciBvbiBDb21wbGV4IHBsYW5lLjxicj48YnI+XHJcbiAqIFxyXG4gKiBJZiB0aGUgZ2l2ZW4gQ29tcGxleCBOdW1iZXIgaXMgY29uc2lkZXJlZCBhcyAwLCByZXR1cm5zIHVuZGVmaW5lZC5cclxuICogQG1lbWJlcm9mIENvbXBsZXhcclxuICogQGluc3RhbmNlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBhcmd1bWVudCBvZiB0aGUgQ29tcGxleCBOdW1iZXJcclxuICovXG5mdW5jdGlvbiBnZXRBcmd1bWVudCgpIHtcbiAgdmFyIHggPSB0aGlzLnJlO1xuICB2YXIgeSA9IHRoaXMuaW07XG4gIHZhciBlcHNpbG9uID0gMSAvIChNYXRoLnBvdygxMCwgMTUpICogMik7XG5cbiAgaWYgKE1hdGguYWJzKHgpIDwgZXBzaWxvbiAmJiBNYXRoLmFicyh5KSA8IGVwc2lsb24pIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHggPT09IDApIHtcbiAgICBpZiAoeSA+IDApIHtcbiAgICAgIHJldHVybiBNYXRoLlBJICogMC41O1xuICAgIH1cblxuICAgIHJldHVybiBNYXRoLlBJICogMS41O1xuICB9XG5cbiAgaWYgKHkgPT09IDApIHtcbiAgICBpZiAoeCA+IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiBNYXRoLlBJO1xuICB9XG5cbiAgaWYgKHggPiAwICYmIHkgPiAwKSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbih5IC8geCk7XG4gIH1cblxuICBpZiAoeCA8IDAgJiYgeSA+IDApIHtcbiAgICByZXR1cm4gTWF0aC5QSSAtIE1hdGguYXRhbih5IC8gKHggKiAtMSkpO1xuICB9XG5cbiAgaWYgKHggPCAwICYmIHkgPCAwKSB7XG4gICAgcmV0dXJuIE1hdGguUEkgKyBNYXRoLmF0YW4oeSAqIC0xIC8gKHggKiAtMSkpO1xuICB9XG5cbiAgcmV0dXJuIE1hdGguUEkgKiAyIC0gTWF0aC5hdGFuKHkgKiAtMSAvIHgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEFyZ3VtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogR2V0cyB0aGUgaW1hZ2luYXJ5IHBhcnQgb2YgYSBDb21wbGV4IE51bWJlci5cclxuICogQG1lbWJlcm9mIENvbXBsZXhcclxuICogQGluc3RhbmNlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBpbWFnaW5hcnkgcGFydCBvZiB0aGUgQ29tcGxleCBOdW1iZXJcclxuICovXG5mdW5jdGlvbiBnZXRJbWFnaW5hcnkoKSB7XG4gIHJldHVybiB0aGlzLmltO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEltYWdpbmFyeTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIG1vZHVsdXMgb2YgYSBDb21wbGV4IE51bWJlci48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIG1vZHVsdXMgb2YgdGhlIGNvbXBsZXggbnVtYmVyIGlzIHRoZSBsZW5ndGggb2YgdGhlIHZlY3RvclxyXG4gKiByZXByZXNlbnRpbmcgdGhlIGNvbXBsZXggbnVtYmVyIG9uIGNvbXBsZXggcGxhbmUuXHJcbiAqIEBtZW1iZXJvZiBDb21wbGV4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbW9kdWx1cyBvZiB0aGUgQ29tcGxleCBOdW1iZXJcclxuICovXG5mdW5jdGlvbiBnZXRNb2R1bHVzKCkge1xuICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMucmUsIDIpICsgTWF0aC5wb3codGhpcy5pbSwgMikpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE1vZHVsdXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBHZXRzIHRoZSByZWFsIHBhcnQgb2YgYSBDb21wbGV4IE51bWJlci5cclxuICogQG1lbWJlcm9mIENvbXBsZXhcclxuICogQGluc3RhbmNlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSByZWFsIHBhcnQgb2YgdGhlIENvbXBsZXggTnVtYmVyXHJcbiAqL1xuZnVuY3Rpb24gZ2V0UmVhbCgpIHtcbiAgcmV0dXJuIHRoaXMucmU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UmVhbDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIEdldHMgdGhlIHN0cmluZ2lmaWVkIGFuZCBmb3JtYXR0ZWQgQ29tcGxleCBOdW1iZXIuXHJcbiAqIEBtZW1iZXJvZiBDb21wbGV4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgc3RyaW5naWZpZWQgYW5kIGZvcm1hdHRlZCBDb21wbGV4IE51bWJlclxyXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICB2YXIgcmUgPSB0aGlzLnJlLFxuICAgICAgaW0gPSB0aGlzLmltO1xuXG4gIGlmIChOdW1iZXIuaXNOYU4ocmUpIHx8IE51bWJlci5pc05hTihpbSkpIHtcbiAgICByZXR1cm4gJ05hTic7XG4gIH1cblxuICBpZiAocmUgPT09IDAgJiYgaW0gPT09IDApIHtcbiAgICByZXR1cm4gJzAnO1xuICB9XG5cbiAgaWYgKHJlID09PSAwKSB7XG4gICAgaWYgKGltID09PSAxKSB7XG4gICAgICByZXR1cm4gJ2knO1xuICAgIH1cblxuICAgIGlmIChpbSA9PT0gLTEpIHtcbiAgICAgIHJldHVybiAnLWknO1xuICAgIH1cblxuICAgIHJldHVybiBcIlwiLmNvbmNhdChpbSwgXCJpXCIpO1xuICB9XG5cbiAgaWYgKGltID09PSAwKSB7XG4gICAgcmV0dXJuIFwiXCIuY29uY2F0KHJlKTtcbiAgfVxuXG4gIGlmIChpbSA+IDApIHtcbiAgICBpZiAoaW0gPT09IDEpIHtcbiAgICAgIHJldHVybiBcIlwiLmNvbmNhdChyZSwgXCIgKyBpXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBcIlwiLmNvbmNhdChyZSwgXCIgKyBcIikuY29uY2F0KGltLCBcImlcIik7XG4gIH1cblxuICBpZiAoaW0gPT09IC0xKSB7XG4gICAgcmV0dXJuIFwiXCIuY29uY2F0KHJlLCBcIiAtIGlcIik7XG4gIH1cblxuICByZXR1cm4gXCJcIi5jb25jYXQocmUsIFwiIC0gXCIpLmNvbmNhdChNYXRoLmFicyhpbSksIFwiaVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1N0cmluZzsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGludmVyc2UgY29zaW5lIG9mIGEgQ29tcGxleCBOdW1iZXIuXHJcbiAqIEBtZW1iZXJvZiBDb21wbGV4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtDb21wbGV4fSBudW0gLSBBbnkgQ29tcGxleCBOdW1iZXJcclxuICogQHJldHVybnMge0NvbXBsZXh9IFRoZSByZXN1bHQgb2YgaW52ZXJzZSBjb3NpbmUgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBhY29zKG51bSkge1xuICByZXR1cm4gdGhpcy5zdWJ0cmFjdChuZXcgdGhpcyhNYXRoLlBJIC8gMiksIHRoaXMuYXNpbihudW0pKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhY29zOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgaW52ZXJzZSBjb3RhbmdlbnQgb2YgYSBDb21wbGV4IE51bWJlci5cclxuICogVGhlIGRvbWFpbiBvZiB0aGlzIGZ1bmN0aW9uIGlzIEMgLyB7IGkgLCAtaSAsIDAgfS48YnI+PGJyPlxyXG4gKiBcclxuICogSWYgdGhlIGFyZ3VtZW50IGlzIG91dCBvZiBpdHMgZG9tYWluLCBpdCByZXR1cm5zIENvbXBsZXguTmFOLlxyXG4gKiBAbWVtYmVyb2YgQ29tcGxleFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7Q29tcGxleH0gbnVtIC0gQW55IENvbXBsZXggTnVtYmVyIGV4Y2VwdCBpLCAtaSBhbmQgMFxyXG4gKiBAcmV0dXJucyB7Q29tcGxleH0gVGhlIHJlc3VsdCBvZiBpbnZlcnNlIGNvdGFuZ2VudCBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIGFjb3QobnVtKSB7XG4gIHJldHVybiB0aGlzLmF0YW4odGhpcy5pbnZlcnNlKG51bSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFjb3Q7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBpbnZlcnNlIGNvc2VjYW50IG9mIGEgQ29tcGxleCBOdW1iZXIuXHJcbiAqIFRoZSBkb21haW4gb2YgdGhpcyBmdW5jdGlvbiBpcyBDIC8geyAwIH0uPGJyPjxicj5cclxuICogXHJcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBvdXQgb2YgaXRzIGRvbWFpbiwgaXQgcmV0dXJucyBDb21wbGV4Lk5hTi5cclxuICogQG1lbWJlcm9mIENvbXBsZXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge0NvbXBsZXh9IG51bSAtIEFueSBDb21wbGV4IE51bWJlciBleGNlcHQgMFxyXG4gKiBAcmV0dXJucyB7Q29tcGxleH0gVGhlIHJlc3VsdCBvZiBpbnZlcnNlIGNvc2VjYW50IGZ1bmN0aW9uXHJcbiAqL1xuZnVuY3Rpb24gYWNzYyhudW0pIHtcbiAgcmV0dXJuIHRoaXMuYXNpbih0aGlzLmludmVyc2UobnVtKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWNzYzsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIHN1bSBvZiB0d28gQ29tcGxleCBOdW1iZXIuXHJcbiAqIEBtZW1iZXJvZiBDb21wbGV4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtDb21wbGV4fSBudW0xIC0gVGhlIENvbXBsZXggTnVtYmVyIG9uIHRoZSBsZWZ0IG9mICcrJyBvcGVyYXRvci5cclxuICogQHBhcmFtIHtDb21wbGV4fSBudW0yIC0gVGhlIENvbXBsZXggTnVtYmVyIG9uIHRoZSByaWdodCBvZiAnKycgb3BlcmF0b3IuXHJcbiAqIEByZXR1cm5zIHtDb21wbGV4fSBUaGUgc3VtIG9mIHR3byBDb21wbGV4IE51bWJlcnNcclxuICovXG5mdW5jdGlvbiBhZGQobnVtMSwgbnVtMikge1xuICBpZiAoIShudW0xIGluc3RhbmNlb2YgdGhpcykgfHwgIShudW0yIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMobnVtMS5yZSArIG51bTIucmUsIG51bTEuaW0gKyBudW0yLmltKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhZGQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBpbnZlcnNlIHNlY2FudCBvZiBhIENvbXBsZXggTnVtYmVyLlxyXG4gKiBUaGUgZG9tYWluIG9mIHRoaXMgZnVuY3Rpb24gaXMgQyAvIHsgMCB9Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgb3V0IG9mIGl0cyBkb21haW4sIGl0IHJldHVybnMgQ29tcGxleC5OYU4uXHJcbiAqIEBtZW1iZXJvZiBDb21wbGV4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtDb21wbGV4fSBudW0gLSBBbnkgQ29tcGxleCBOdW1iZXIgZXhjZXB0IDBcclxuICogQHJldHVybnMge0NvbXBsZXh9IFRoZSByZXN1bHQgb2YgaW52ZXJzZSBzZWNhbnQgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBhc2VjKG51bSkge1xuICByZXR1cm4gdGhpcy5hY29zKHRoaXMuaW52ZXJzZShudW0pKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc2VjOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgaW52ZXJzZSBzaW5lIG9mIGEgQ29tcGxleCBOdW1iZXIuXHJcbiAqIEBtZW1iZXJvZiBDb21wbGV4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtDb21wbGV4fSBudW0gLSBBbnkgQ29tcGxleCBOdW1iZXJcclxuICogQHJldHVybnMge0NvbXBsZXh9IFRoZSByZXN1bHQgb2YgaW52ZXJzZSBzaW5lIGZ1bmN0aW9uXHJcbiAqL1xuZnVuY3Rpb24gYXNpbihudW0pIHtcbiAgcmV0dXJuIHRoaXMubXVsdGlwbHkobmV3IHRoaXMoMCwgLTEpLCB0aGlzLmxvZyh0aGlzLmFkZCh0aGlzLm11bHRpcGx5KG5ldyB0aGlzKDAsIDEpLCBudW0pLCB0aGlzLnBvdyh0aGlzLnN1YnRyYWN0KHRoaXMuT05FLCB0aGlzLnBvdyhudW0sIDIpKSwgMC41KSkpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc2luOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgaW52ZXJzZSB0YW5nZW50IG9mIGEgQ29tcGxleCBOdW1iZXIuXHJcbiAqIFRoZSBkb21haW4gb2YgdGhpcyBmdW5jdGlvbiBpcyBDIC8geyBpICwgLWkgfS48YnI+PGJyPlxyXG4gKiBcclxuICogSWYgdGhlIGFyZ3VtZW50IGlzIG91dCBvZiBpdHMgZG9tYWluLCBpdCByZXR1cm5zIENvbXBsZXguTmFOLlxyXG4gKiBAbWVtYmVyb2YgQ29tcGxleFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7Q29tcGxleH0gbnVtIC0gQW55IENvbXBsZXggTnVtYmVyIGV4Y2VwdCBpIGFuZCAtaVxyXG4gKiBAcmV0dXJucyB7Q29tcGxleH0gVGhlIHJlc3VsdCBvZiBpbnZlcnNlIHRhbmdlbnQgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBhdGFuKG51bSkge1xuICByZXR1cm4gdGhpcy5tdWx0aXBseShuZXcgdGhpcygwLCAxIC8gMiksIHRoaXMuc3VidHJhY3QodGhpcy5sb2codGhpcy5zdWJ0cmFjdCh0aGlzLk9ORSwgdGhpcy5tdWx0aXBseShuZXcgdGhpcygwLCAxKSwgbnVtKSkpLCB0aGlzLmxvZyh0aGlzLmFkZCh0aGlzLk9ORSwgdGhpcy5tdWx0aXBseShuZXcgdGhpcygwLCAxKSwgbnVtKSkpKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXRhbjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGNvbXBsZXggY29uanVnYXRlIG9mIHRoZSBDb21wbGV4IE51bWJlci5cclxuICogQG1lbWJlcm9mIENvbXBsZXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge0NvbXBsZXh9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm5zIHtDb21wbGV4fSBUaGUgY29tcGxleCBjb25qdWdhdGUgb2YgdGhlIENvbXBsZXggTnVtYmVyXHJcbiAqL1xuZnVuY3Rpb24gY29uanVnYXRlKG51bSkge1xuICBpZiAoIShudW0gaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHJldHVybiBuZXcgdGhpcyhudW0uZ2V0UmVhbCgpLCBudW0uZ2V0SW1hZ2luYXJ5KCkgKiAtMSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29uanVnYXRlOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgY29zaW5lIG9mIGEgQ29tcGxleCBOdW1iZXIuXHJcbiAqIEBtZW1iZXJvZiBDb21wbGV4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtDb21wbGV4fSBudW0gLSBBbnkgQ29tcGxleCBOdW1iZXJcclxuICogQHJldHVybnMge0NvbXBsZXh9IFRoZSByZXN1bHQgb2YgY29zaW5lIGZ1bmN0aW9uXHJcbiAqL1xuZnVuY3Rpb24gY29zKG51bSkge1xuICBpZiAoIShudW0gaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHZhciBhID0gbnVtLmdldFJlYWwoKTtcbiAgdmFyIGIgPSBudW0uZ2V0SW1hZ2luYXJ5KCk7XG4gIHJldHVybiBuZXcgdGhpcyhNYXRoLmNvcyhhKSAqIE1hdGguY29zaChiKSwgTWF0aC5zaW4oYSkgKiBNYXRoLnNpbmgoYikgKiAtMSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29zOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgY290YW5nZW50IG9mIGEgQ29tcGxleCBOdW1iZXIuXHJcbiAqIFRoZSBkb21haW4gb2YgdGhpcyBmdW5jdGlvbiBpcyBDIC8geyBrz4AvMiA6IGsgaXMgYW55IGludGVnZXIgfS48YnI+PGJyPlxyXG4gKiBcclxuICogSWYgdGhlIGFyZ3VtZW50IGlzIG91dCBvZiBpdHMgZG9tYWluLCBpdCByZXR1cm5zIENvbXBsZXguTmFOLlxyXG4gKiBAbWVtYmVyb2YgQ29tcGxleFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7Q29tcGxleH0gbnVtIC0gQW55IENvbXBsZXggTnVtYmVyIHdoaWNoIGlzIG5vdCB0aGUgbXVsdGlwbGUgb2Ygz4AvMlxyXG4gKiBAcmV0dXJucyB7Q29tcGxleH0gVGhlIHJlc3VsdCBvZiBjb3RhbmdlbnQgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBjb3QobnVtKSB7XG4gIHJldHVybiB0aGlzLmRpdmlkZSh0aGlzLk9ORSwgdGhpcy50YW4obnVtKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY290OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgY29zZWNhbnQgb2YgYSBDb21wbGV4IE51bWJlci5cclxuICogVGhlIGRvbWFpbiBvZiB0aGlzIGZ1bmN0aW9uIGlzIEMgLyB7IGvPgCA6IGsgaXMgYW55IGludGVnZXIgfS48YnI+PGJyPlxyXG4gKiBcclxuICogSWYgdGhlIGFyZ3VtZW50IGlzIG91dCBvZiBpdHMgZG9tYWluLCBpdCByZXR1cm5zIENvbXBsZXguTmFOLlxyXG4gKiBAbWVtYmVyb2YgQ29tcGxleFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7Q29tcGxleH0gbnVtIC0gQW55IENvbXBsZXggTnVtYmVyIHdoaWNoIGlzIG5vdCB0aGUgbXVsdGlwbGUgb2Ygz4BcclxuICogQHJldHVybnMge0NvbXBsZXh9IFRoZSByZXN1bHQgb2YgY29zZWNhbnQgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBjc2MobnVtKSB7XG4gIHJldHVybiB0aGlzLmRpdmlkZSh0aGlzLk9ORSwgdGhpcy5zaW4obnVtKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3NjOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgcXVvdGllbnQgb2YgdHdvIENvbXBsZXggTnVtYmVyLjxicj48YnI+XHJcbiAqIFxyXG4gKiBOb3RlIHRoYXQgaWYgdGhlIGRlbm9taW5hdG9yIGlzIGNvbnNpZGVyZWQgYXMgMCxcclxuICogcmV0dXJucyBDb21wbGV4Lk5hTiBpbnN0ZWFkIG9mIEluZmluaXR5LlxyXG4gKiBAbWVtYmVyb2YgQ29tcGxleFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7Q29tcGxleH0gbnVtMSAtIFRoZSBDb21wbGV4IE51bWJlciBvbiB0aGUgbGVmdCBvZiAnLycgb3BlcmF0b3IuXHJcbiAqIEBwYXJhbSB7Q29tcGxleH0gbnVtMiAtIFRoZSBDb21wbGV4IE51bWJlciBvbiB0aGUgcmlnaHQgb2YgJy8nIG9wZXJhdG9yLlxyXG4gKiBAcmV0dXJucyB7Q29tcGxleH0gVGhlIHF1b3RpZW50IG9mIHR3byBDb21wbGV4IE51bWJlcnNcclxuICovXG5mdW5jdGlvbiBkaXZpZGUobnVtMSwgbnVtMikge1xuICBpZiAoIShudW0xIGluc3RhbmNlb2YgdGhpcykgfHwgIShudW0yIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICB2YXIgYSA9IG51bTEucmU7XG4gIHZhciBiID0gbnVtMS5pbTtcbiAgdmFyIGMgPSBudW0yLnJlO1xuICB2YXIgZCA9IG51bTIuaW07XG5cbiAgaWYgKE1hdGguYWJzKGMpIDwgdGhpcy5FUFNJTE9OICYmIE1hdGguYWJzKGQpIDwgdGhpcy5FUFNJTE9OKSB7XG4gICAgcmV0dXJuIHRoaXMuTmFOO1xuICB9XG5cbiAgdmFyIGRlbm9taW5hdG9yID0gTWF0aC5wb3coYywgMikgKyBNYXRoLnBvdyhkLCAyKTtcbiAgcmV0dXJuIG5ldyB0aGlzKChhICogYyArIGIgKiBkKSAvIGRlbm9taW5hdG9yLCAoYiAqIGMgLSBhICogZCkgLyBkZW5vbWluYXRvcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGl2aWRlOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgZXhwb25lbnRpYWwgZnVuY3Rpb24gd2l0aCBiYXNlIEUuXHJcbiAqIEBtZW1iZXJvZiBDb21wbGV4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtDb21wbGV4fSBudW0gLSBFeHBvbmVudFxyXG4gKiBAcmV0dXJucyB7Q29tcGxleH0gVGhlIHZhbHVlIG9mIEUgdG8gdGhlIHBvd2VyIG9mIG51bVxyXG4gKi9cbmZ1bmN0aW9uIGV4cChudW0pIHtcbiAgaWYgKCEobnVtIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICB2YXIgcmUgPSBudW0uZ2V0UmVhbCgpO1xuICB2YXIgdGhldGEgPSBudW0uZ2V0SW1hZ2luYXJ5KCk7XG4gIHZhciByID0gTWF0aC5leHAocmUpO1xuICByZXR1cm4gbmV3IHRoaXMociAqIE1hdGguY29zKHRoZXRhKSwgciAqIE1hdGguc2luKHRoZXRhKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgaW52ZXJzZSBvZiB0aGUgQ29tcGxleCBOdW1iZXIuXHJcbiAqIEBtZW1iZXJvZiBDb21wbGV4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtDb21wbGV4fSBudW0gLSBDb21wbGV4IE51bWJlclxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBJbnZlcnNlIG9mIHRoZSBDb21wbGV4IE51bWJlclxyXG4gKi9cbmZ1bmN0aW9uIGludmVyc2UobnVtKSB7XG4gIGlmICghKG51bSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgcmV0dXJuIHRoaXMuTmFOO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuZGl2aWRlKHRoaXMuT05FLCBudW0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmVyc2U7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdHdvIENvbXBsZXggTnVtYmVycyBhcmUgY29uc2lkZXJlZCBhcyBpZGVudGljYWwuPGJyPjxicj5cclxuICogXHJcbiAqIFR3byBDb21wbGV4IE51bWJlcnMgYXJlIGNvbnNpZGVyZWQgYXMgaWRlbnRpY2FsIGlmIGVpdGhlclxyXG4gKiBib3RoIGFyZSBOYU4gb3IgYm90aCByZWFsIGFuZCBpbWFnaW5hcnkgcGFydHMgYXJlIGV4dHJlbWVseSBjbG9zZWQuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSB0ZXN0IGNyaXRlcmlvbiBpcyBNYXRoLmFicyh4IC0geSkgPCAxIC8gKDEwICoqIGRpZ2l0ICogMikuXHJcbiAqIEZvciBkZWZhdWx0IHZhbHVlIDE1LCBpdCBzaG91bGQgYmUgNWUtMTYuXHJcbiAqIFRoYXQgbWVhbnMgaWYgdGhlIGRpZmZlcmVuY2Ugb2YgdHdvIG51bWJlcnMgaXMgbGVzcyB0aGFuIDVlLTE2LFxyXG4gKiB0aGV5IGFyZSBjb25zaWRlcmVkIGFzIHNhbWUgdmFsdWUuXHJcbiAqIEBtZW1iZXJvZiBDb21wbGV4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtDb21wbGV4fSBudW0xIC0gQ29tcGxleCBOdW1iZXJcclxuICogQHBhcmFtIHtDb21wbGV4fSBudW0yIC0gQ29tcGxleCBOdW1iZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IFtkaWdpdD0xNV0gLSBOdW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdHdvIENvbXBsZXggTnVtYmVycyBhcmUgY29uc2lkZXJlZCBhcyBpZGVudGljYWxcclxuICovXG5mdW5jdGlvbiBpc0VxdWFsKG51bTEsIG51bTIpIHtcbiAgdmFyIGRpZ2l0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAxNTtcblxuICBpZiAoIShudW0xIGluc3RhbmNlb2YgdGhpcykgfHwgIShudW0yIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIU51bWJlci5pc0ludGVnZXIoZGlnaXQpIHx8IGRpZ2l0IDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudDogRXhwZWN0ZWQgYSBub24tbmVnYXRpdmUgaW50ZWdlciBkaWdpdCcpO1xuICB9XG5cbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBkaWdpdCkgKiAyKTtcbiAgdmFyIGEgPSBudW0xLmdldFJlYWwoKTtcbiAgdmFyIGIgPSBudW0xLmdldEltYWdpbmFyeSgpO1xuICB2YXIgYyA9IG51bTIuZ2V0UmVhbCgpO1xuICB2YXIgZCA9IG51bTIuZ2V0SW1hZ2luYXJ5KCk7XG5cbiAgaWYgKE51bWJlci5pc05hTihhKSAmJiBOdW1iZXIuaXNOYU4oYikgJiYgTnVtYmVyLmlzTmFOKGMpICYmIE51bWJlci5pc05hTihkKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIE1hdGguYWJzKGEgLSBjKSA8IEVQU0lMT04gJiYgTWF0aC5hYnMoYiAtIGQpIDwgRVBTSUxPTjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0VxdWFsOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBDb21wbGV4IE51bWJlciBpcyBOYU4gb3Igbm90LlxyXG4gKiBAbWVtYmVyb2YgQ29tcGxleFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7Q29tcGxleH0gbnVtIC0gQW55IENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgb25lIG9mIHJlYWwgYW5kIGltYWdpbmFyeSBwYXJ0IGFyZSBOYU5cclxuICovXG5mdW5jdGlvbiBpc05hTihudW0pIHtcbiAgaWYgKCEobnVtIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgcmUgPSBudW0uZ2V0UmVhbCgpO1xuICB2YXIgaW0gPSBudW0uZ2V0SW1hZ2luYXJ5KCk7XG5cbiAgaWYgKE51bWJlci5pc05hTihyZSkgfHwgTnVtYmVyLmlzTmFOKGltKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTmFOOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgbmF0dXJhbCBsb2cgb2YgdGhlIENvbXBsZXggTnVtYmVyLjxicj48YnI+XHJcbiAqIFxyXG4gKiBOb3RlIHRoYXQgY29tcGxleCBsb2cgaXMgYSBtdWx0aXZhbHVlZCBmdW5jdGlvbixcclxuICogYW5kIHRoaXMgZnVuY3Rpb24gb25seSBwcm92aWRlcyB0aGUgcHJpbmNpcGFsIHZhbHVlIGJ5XHJcbiAqIHJlc3RyaWN0aW5nIHRoZSBpbWFnaW5hcnkgcGFydCB0byB0aGUgaW50ZXJ2YWwgWzAsIDLPgCkuXHJcbiAqIEBtZW1iZXJvZiBDb21wbGV4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtDb21wbGV4fSBudW0gLSBDb21wbGV4IE51bWJlclxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBOYXR1cmFsIGxvZyBvZiB0aGUgQ29tcGxleCBOdW1iZXJcclxuICovXG5mdW5jdGlvbiBsb2cobnVtKSB7XG4gIGlmICghKG51bSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgcmV0dXJuIHRoaXMuTmFOO1xuICB9XG5cbiAgdmFyIHIgPSBudW0uZ2V0TW9kdWx1cygpO1xuICB2YXIgdGhldGEgPSBudW0uZ2V0QXJndW1lbnQoKTtcblxuICBpZiAociA8IHRoaXMuRVBTSUxPTiB8fCB0aGV0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuTmFOO1xuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKE1hdGgubG9nKHIpLCB0aGV0YSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbG9nOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgcHJvZHVjdCBvZiB0d28gQ29tcGxleCBOdW1iZXIuXHJcbiAqIEBtZW1iZXJvZiBDb21wbGV4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtDb21wbGV4fSBudW0xIC0gVGhlIENvbXBsZXggTnVtYmVyIG9uIHRoZSBsZWZ0IG9mICcqJyBvcGVyYXRvci5cclxuICogQHBhcmFtIHtDb21wbGV4fSBudW0yIC0gVGhlIENvbXBsZXggTnVtYmVyIG9uIHRoZSByaWdodCBvZiAnKicgb3BlcmF0b3IuXHJcbiAqIEByZXR1cm5zIHtDb21wbGV4fSBUaGUgcHJvZHVjdCBvZiB0d28gQ29tcGxleCBOdW1iZXJzXHJcbiAqL1xuZnVuY3Rpb24gbXVsdGlwbHkobnVtMSwgbnVtMikge1xuICBpZiAoIShudW0xIGluc3RhbmNlb2YgdGhpcykgfHwgIShudW0yIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICB2YXIgYSA9IG51bTEucmU7XG4gIHZhciBiID0gbnVtMS5pbTtcbiAgdmFyIGMgPSBudW0yLnJlO1xuICB2YXIgZCA9IG51bTIuaW07XG4gIHJldHVybiBuZXcgdGhpcyhhICogYyAtIGIgKiBkLCBhICogZCArIGIgKiBjKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtdWx0aXBseTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIHBvd2VyIG9mIHRoZSBDb21wbGV4IE51bWJlci5cclxuICogVGhlIGV4cG9uZW50IGNhbiBiZSBhbnkgcmVhbCBudW1iZXIgb3IgQ29tcGxleCBOdW1iZXI8YnI+PGJyPlxyXG4gKiBcclxuICogWW91IGNhbiBmaW5kIHRoZSBrLXRoIHJvb3Qgb2YgY29tcGxleCBudW1iZXIgYnkgc2V0dGluZyB0aGUgZXhwb25lbnQgdG8gMSAvIGsuXHJcbiAqIEJ1dCB5b3Ugc2hvdWxkIGtub3cgdGhhdCBpdCBvbmx5IHJldHVybnMgb25lIG91dCBvZiBrIHBvc3NpYmxlIHNvbHV0aW9ucy5cclxuICogQG1lbWJlcm9mIENvbXBsZXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge0NvbXBsZXh9IG51bSAtIEJhc2VcclxuICogQHBhcmFtIHtDb21wbGV4fG51bWJlcn0gbiAtIEV4cG9uZW50XHJcbiAqIEByZXR1cm5zIHtDb21wbGV4fSBUaGUgcmVzdWx0IG9mIHRoZSBleHBvbmVudGlhdGlvblxyXG4gKi9cbmZ1bmN0aW9uIHBvdyhudW0sIG4pIHtcbiAgaWYgKCEobnVtIGluc3RhbmNlb2YgdGhpcykgfHwgdHlwZW9mIG4gIT09ICdudW1iZXInICYmICEobiBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgcmV0dXJuIHRoaXMuTmFOO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBuID09PSAnbnVtYmVyJykge1xuICAgIGlmICghTnVtYmVyLmlzRmluaXRlKG4pIHx8IE51bWJlci5pc05hTihuKSkge1xuICAgICAgcmV0dXJuIHRoaXMuTmFOO1xuICAgIH1cblxuICAgIGlmIChuID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5PTkU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNFcXVhbChudW0sIHRoaXMuWkVSTykpIHtcbiAgICAgIHJldHVybiB0aGlzLlpFUk87XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZXhwKHRoaXMubXVsdGlwbHkobmV3IHRoaXMobiwgMCksIHRoaXMubG9nKG51bSkpKTtcbiAgfVxuXG4gIGlmIChuIGluc3RhbmNlb2YgdGhpcykge1xuICAgIHJldHVybiB0aGlzLmV4cCh0aGlzLm11bHRpcGx5KG4sIHRoaXMubG9nKG51bSkpKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLk5hTjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwb3c7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBzZWNhbnQgb2YgYSBDb21wbGV4IE51bWJlci5cclxuICogVGhlIGRvbWFpbiBvZiB0aGlzIGZ1bmN0aW9uIGlzIEMgLyB7IChrICsgMC41Kc+AIDogayBpcyBhbnkgaW50ZWdlciB9Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgb3V0IG9mIGl0cyBkb21haW4sIGl0IHJldHVybnMgQ29tcGxleC5OYU4uXHJcbiAqIEBtZW1iZXJvZiBDb21wbGV4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtDb21wbGV4fSBudW0gLSBBbnkgQ29tcGxleCBOdW1iZXIgd2hpY2ggaXMgbm90IGluIHRoZSBmb3JtIG9mIChrICsgMC41Kc+AXHJcbiAqIEByZXR1cm5zIHtDb21wbGV4fSBUaGUgcmVzdWx0IG9mIHNlY2FudCBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIHNlYyhudW0pIHtcbiAgcmV0dXJuIHRoaXMuZGl2aWRlKHRoaXMuT05FLCB0aGlzLmNvcyhudW0pKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZWM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBzaW5lIG9mIGEgQ29tcGxleCBOdW1iZXIuXHJcbiAqIEBtZW1iZXJvZiBDb21wbGV4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtDb21wbGV4fSBudW0gLSBBbnkgQ29tcGxleCBOdW1iZXJcclxuICogQHJldHVybnMge0NvbXBsZXh9IFRoZSByZXN1bHQgb2Ygc2luZSBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIHNpbihudW0pIHtcbiAgaWYgKCEobnVtIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICB2YXIgYSA9IG51bS5nZXRSZWFsKCk7XG4gIHZhciBiID0gbnVtLmdldEltYWdpbmFyeSgpO1xuICByZXR1cm4gbmV3IHRoaXMoTWF0aC5zaW4oYSkgKiBNYXRoLmNvc2goYiksIE1hdGguY29zKGEpICogTWF0aC5zaW5oKGIpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaW47IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBkaWZmZXJlbmNlIG9mIHR3byBDb21wbGV4IE51bWJlci5cclxuICogQG1lbWJlcm9mIENvbXBsZXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge0NvbXBsZXh9IG51bTEgLSBUaGUgQ29tcGxleCBOdW1iZXIgb24gdGhlIGxlZnQgb2YgJy0nIG9wZXJhdG9yLlxyXG4gKiBAcGFyYW0ge0NvbXBsZXh9IG51bTIgLSBUaGUgQ29tcGxleCBOdW1iZXIgb24gdGhlIHJpZ2h0IG9mICctJyBvcGVyYXRvci5cclxuICogQHJldHVybnMge0NvbXBsZXh9IFRoZSBkaWZmZXJlbmNlIG9mIHR3byBDb21wbGV4IE51bWJlcnNcclxuICovXG5mdW5jdGlvbiBzdWJ0cmFjdChudW0xLCBudW0yKSB7XG4gIGlmICghKG51bTEgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKG51bTIgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHJldHVybiBuZXcgdGhpcyhudW0xLnJlIC0gbnVtMi5yZSwgbnVtMS5pbSAtIG51bTIuaW0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN1YnRyYWN0OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgdGFuZ2VudCBvZiBhIENvbXBsZXggTnVtYmVyLlxyXG4gKiBUaGUgZG9tYWluIG9mIHRoaXMgZnVuY3Rpb24gaXMgQyAvIHsgKGsgKyAwLjUpz4AgOiBrIGlzIGFueSBpbnRlZ2VyIH0uPGJyPjxicj5cclxuICogXHJcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBvdXQgb2YgaXRzIGRvbWFpbiwgaXQgcmV0dXJucyBDb21wbGV4Lk5hTi5cclxuICogQG1lbWJlcm9mIENvbXBsZXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge0NvbXBsZXh9IG51bSAtIEFueSBDb21wbGV4IE51bWJlciB3aGljaCBpcyBub3QgaW4gdGhlIGZvcm0gb2YgKGsgKyAwLjUpz4BcclxuICogQHJldHVybnMge0NvbXBsZXh9IFRoZSByZXN1bHQgb2YgdGFuZ2VudCBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIHRhbihudW0pIHtcbiAgcmV0dXJuIHRoaXMuZGl2aWRlKHRoaXMuc2luKG51bSksIHRoaXMuY29zKG51bSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRhbjsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG4vKipcclxuICogQ3JlYXRlcyBhIG5ldyBDb21wbGV4IE51bWJlci5cclxuICogQG5hbWVzcGFjZSBDb21wbGV4XHJcbiAqIEBjbGFzc1xyXG4gKiBAcGFyYW0ge251bWJlcn0gYXJnMSAtIFRoZSByZWFsIHBhcnQgb2YgdGhlIENvbXBsZXggTnVtYmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBhcmcyIC0gVGhlIGltYWdpbmFyeSBwYXJ0IG9mIHRoZSBDb21wbGV4IE51bWJlclxyXG4gKi9cbmZ1bmN0aW9uIENvbXBsZXgoYXJnMSwgYXJnMikge1xuICB2YXIgdHlwZTEgPSBfdHlwZW9mKGFyZzEpO1xuXG4gIHZhciB0eXBlMiA9IF90eXBlb2YoYXJnMik7XG5cbiAgaWYgKHR5cGUxID09PSAnbnVtYmVyJyAmJiB0eXBlMiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAoTnVtYmVyLmlzTmFOKGFyZzEpIHx8ICFOdW1iZXIuaXNGaW5pdGUoYXJnMSkpIHtcbiAgICAgIHRoaXMucmUgPSBOYU47XG4gICAgICB0aGlzLmltID0gTmFOO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdGhpcy5yZSA9IGFyZzE7XG4gICAgdGhpcy5pbSA9IDA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAodHlwZTEgPT09ICdudW1iZXInICYmIHR5cGUyID09PSAnbnVtYmVyJykge1xuICAgIGlmIChOdW1iZXIuaXNOYU4oYXJnMSkgfHwgTnVtYmVyLmlzTmFOKGFyZzIpIHx8ICFOdW1iZXIuaXNGaW5pdGUoYXJnMSkgfHwgIU51bWJlci5pc0Zpbml0ZShhcmcyKSkge1xuICAgICAgdGhpcy5yZSA9IE5hTjtcbiAgICAgIHRoaXMuaW0gPSBOYU47XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0aGlzLnJlID0gYXJnMTtcbiAgICB0aGlzLmltID0gYXJnMjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHRoaXMucmUgPSBOYU47XG4gIHRoaXMuaW0gPSBOYU47XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBsZXg7XG5Db21wbGV4LnByb3RvdHlwZS5nZXRSZWFsID0gcmVxdWlyZSgnLi9jb3JlL2luc3RhbmNlL2dldFJlYWwnKTtcbkNvbXBsZXgucHJvdG90eXBlLmdldEltYWdpbmFyeSA9IHJlcXVpcmUoJy4vY29yZS9pbnN0YW5jZS9nZXRJbWFnaW5hcnknKTtcbkNvbXBsZXgucHJvdG90eXBlLmdldE1vZHVsdXMgPSByZXF1aXJlKCcuL2NvcmUvaW5zdGFuY2UvZ2V0TW9kdWx1cycpO1xuQ29tcGxleC5wcm90b3R5cGUuZ2V0QXJndW1lbnQgPSByZXF1aXJlKCcuL2NvcmUvaW5zdGFuY2UvZ2V0QXJndW1lbnQnKTtcbkNvbXBsZXgucHJvdG90eXBlLnRvU3RyaW5nID0gcmVxdWlyZSgnLi9jb3JlL2luc3RhbmNlL3RvU3RyaW5nJyk7XG5Db21wbGV4LmlzTmFOID0gcmVxdWlyZSgnLi9jb3JlL3N0YXRpYy9pc05hTicpO1xuQ29tcGxleC5pc0VxdWFsID0gcmVxdWlyZSgnLi9jb3JlL3N0YXRpYy9pc0VxdWFsJyk7XG5Db21wbGV4LmNvbmp1Z2F0ZSA9IHJlcXVpcmUoJy4vY29yZS9zdGF0aWMvY29uanVnYXRlJyk7XG5Db21wbGV4LmludmVyc2UgPSByZXF1aXJlKCcuL2NvcmUvc3RhdGljL2ludmVyc2UnKTtcbkNvbXBsZXguYWRkID0gcmVxdWlyZSgnLi9jb3JlL3N0YXRpYy9hZGQnKTtcbkNvbXBsZXguc3VidHJhY3QgPSByZXF1aXJlKCcuL2NvcmUvc3RhdGljL3N1YnRyYWN0Jyk7XG5Db21wbGV4Lm11bHRpcGx5ID0gcmVxdWlyZSgnLi9jb3JlL3N0YXRpYy9tdWx0aXBseScpO1xuQ29tcGxleC5kaXZpZGUgPSByZXF1aXJlKCcuL2NvcmUvc3RhdGljL2RpdmlkZScpO1xuQ29tcGxleC5leHAgPSByZXF1aXJlKCcuL2NvcmUvc3RhdGljL2V4cCcpO1xuQ29tcGxleC5sb2cgPSByZXF1aXJlKCcuL2NvcmUvc3RhdGljL2xvZycpO1xuQ29tcGxleC5wb3cgPSByZXF1aXJlKCcuL2NvcmUvc3RhdGljL3BvdycpO1xuQ29tcGxleC5zaW4gPSByZXF1aXJlKCcuL2NvcmUvc3RhdGljL3NpbicpO1xuQ29tcGxleC5jb3MgPSByZXF1aXJlKCcuL2NvcmUvc3RhdGljL2NvcycpO1xuQ29tcGxleC50YW4gPSByZXF1aXJlKCcuL2NvcmUvc3RhdGljL3RhbicpO1xuQ29tcGxleC5jc2MgPSByZXF1aXJlKCcuL2NvcmUvc3RhdGljL2NzYycpO1xuQ29tcGxleC5zZWMgPSByZXF1aXJlKCcuL2NvcmUvc3RhdGljL3NlYycpO1xuQ29tcGxleC5jb3QgPSByZXF1aXJlKCcuL2NvcmUvc3RhdGljL2NvdCcpO1xuQ29tcGxleC5hc2luID0gcmVxdWlyZSgnLi9jb3JlL3N0YXRpYy9hc2luJyk7XG5Db21wbGV4LmFjb3MgPSByZXF1aXJlKCcuL2NvcmUvc3RhdGljL2Fjb3MnKTtcbkNvbXBsZXguYXRhbiA9IHJlcXVpcmUoJy4vY29yZS9zdGF0aWMvYXRhbicpO1xuQ29tcGxleC5hY3NjID0gcmVxdWlyZSgnLi9jb3JlL3N0YXRpYy9hY3NjJyk7XG5Db21wbGV4LmFzZWMgPSByZXF1aXJlKCcuL2NvcmUvc3RhdGljL2FzZWMnKTtcbkNvbXBsZXguYWNvdCA9IHJlcXVpcmUoJy4vY29yZS9zdGF0aWMvYWNvdCcpO1xuLyoqXHJcbiAqIEl0IHJlcHJlc2VudHMgTmFOIGluIHRoaXMgbGlicmFyeS4gSXQgaXMgZXF1aXZhbGVudCB0byBuZXcgQ29tcGxleChOYU4pLjxicj48YnI+XHJcbiAqIFxyXG4gKiBJdCBpcyBpbXBvcnRhbnQgdG8ga25vdyB0aGF0IHRoaXMgbGlicmFyeSBkb2VzIG5vdCBpbnRyb2R1Y2UgdGhlIGNvbmNlcHQgb2YgQ29tcGxleCBJbmZpbml0eSxcclxuICogYWxsIEluZmluaXR5IGluIHRoaXMgbGlicmFyeSBhcmUgcmVwcmVzZW50ZWQgYnkgQ29tcGxleC5OYU4uXHJcbiAqIEBzdGF0aWNcclxuICovXG5cbkNvbXBsZXguTmFOID0gbmV3IENvbXBsZXgoTmFOKTtcbi8qKiBAc3RhdGljICovXG5cbkNvbXBsZXguT05FID0gbmV3IENvbXBsZXgoMSk7XG4vKiogQHN0YXRpYyAqL1xuXG5Db21wbGV4LlpFUk8gPSBuZXcgQ29tcGxleCgwKTtcbi8qKiBAc3RhdGljICovXG5cbkNvbXBsZXguUEkgPSBuZXcgQ29tcGxleChNYXRoLlBJKTtcbi8qKiBAc3RhdGljICovXG5cbkNvbXBsZXguRSA9IG5ldyBDb21wbGV4KE1hdGguRSk7XG4vKipcclxuICogSXQgcmVwcmVzZW50cyB0aGUgdmFsdWUgb2YgNWUtMTYsIHdoaWNoIGlzIHRoZSBzbWFsbGVzdCBudW1iZXIgY29uc2lkZXJlZCBhcyBub24temVybyBpbiB0aGlzIGxpYnJhcnkuXHJcbiAqIEluIHRoZSBvdGhlciB3b3JkcywgYW55IG51bWJlciBsZXNzIHRoYW4gQ29tcGxleC5FUFNJTE9OIGlzIGNvbnNpZGVyZWQgYXMgMC48YnI+PGJyPlxyXG4gKiBcclxuICogTm90ZSB0aGF0IENvbXBsZXguRVBTSUxPTiBpcyBudW1iZXIgaW5zdGVhZCBvZiBpbnN0YW5jZSBvZiBDb21wbGV4LlxyXG4gKiBAc3RhdGljXHJcbiAqL1xuXG5Db21wbGV4LkVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCAxNSkgKiAyKTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIElOVkFMSURfQVJSQVk6ICdJbnZhbGlkIGFyZ3VtZW50OiBSZWNlaXZlZCBhIG5vbi1hcnJheSBhcmd1bWVudCcsXG4gIElOVkFMSURfTUFUUklYOiAnSW52YWxpZCBhcmd1bWVudDogUmVjZWl2ZWQgYW4gaW52YWxpZCBtYXRyaXgnLFxuICBJTlZBTElEX1NRVUFSRV9NQVRSSVg6ICdJbnZhbGlkIGFyZ3VtZW50OiBSZWNlaXZlZCBhIG5vbi1zcXVhcmUgbWF0cml4JyxcbiAgSU5WQUxJRF9VUFBFUl9UUklBTkdVTEFSX01BVFJJWDogJ0ludmFsaWQgYXJndW1lbnQ6IFJlY2VpdmVkIGEgbm9uIHVwcGVyLXRyaWFuZ3VsYXIgbWF0cml4JyxcbiAgSU5WQUxJRF9MT1dFUl9UUklBTkdVTEFSX01BVFJJWDogJ0ludmFsaWQgYXJndW1lbnQ6IFJlY2VpdmVkIGEgbm9uIGxvd2VyLXRyaWFuZ3VsYXIgbWF0cml4JyxcbiAgSU5WQUxJRF9FWFBPTkVOVDogJ0ludmFsaWQgYXJndW1lbnQ6IEV4cGVjdGVkIGEgbm9uLW5lZ2F0aXZlIGludGVnZXIgZXhwb25lbnQnLFxuICBJTlZBTElEX1JPV19DT0w6ICdJbnZhbGlkIGFyZ3VtZW50OiBFeHBlY3RlZCBub24tbmVnYXRpdmUgaW50ZWdlciByb3cgYW5kIGNvbHVtbicsXG4gIElOVkFMSURfUk9XOiAnSW52YWxpZCBhcmd1bWVudDogRXhwZWN0ZWQgbm9uLW5lZ2F0aXZlIGludGVnZXIgcm93JyxcbiAgSU5WQUxJRF9DT0xVTU46ICdJbnZhbGlkIGFyZ3VtZW50OiBFeHBlY3RlZCBub24tbmVnYXRpdmUgaW50ZWdlciBjb2x1bW4nLFxuICBJTlZBTElEX1JPV1NfRVhQUkVTU0lPTjogJ0ludmFsaWQgYXJndW1lbnQ6IFJlY2VpdmVkIGludmFsaWQgcm93cyBleHByZXNzaW9uJyxcbiAgSU5WQUxJRF9DT0xVTU5TX0VYUFJFU1NJT046ICdJbnZhbGlkIGFyZ3VtZW50OiBSZWNlaXZlZCBpbnZhbGlkIGNvbHVtbnMgZXhwcmVzc2lvbicsXG4gIElOVkFMSURfUF9OT1JNOiAnSW52YWxpZCBhcmd1bWVudDogUmVjZWl2ZWQgaW52YWxpZCBwLW5vcm0nLFxuICBPVkVSRkxPV19JTkRFWDogJ0ludmFsaWQgYXJndW1lbnQ6IE1hdHJpeCBpbmRleCBvdmVyZmxvdycsXG4gIE9WRVJGTE9XX0NPTFVNTjogJ0ludmFsaWQgYXJndW1lbnQ6IENvbHVtbiBpbmRleCBvdmVyZmxvdycsXG4gIE9WRVJGTE9XX1JPVzogJ0ludmFsaWQgYXJndW1lbnQ6IFJvdyBpbmRleCBvdmVyZmxvdycsXG4gIE5PX1VOSVFVRV9TT0xVVElPTjogJ0FyaXRobWV0aWMgRXhjZXB0aW9uOiBUaGUgc3lzdGVtIGhhcyBubyB1bmlxdWUgc29sdXRpb24nLFxuICBTSVpFX0lOQ09NUEFUSUJMRTogJ0ludmFsaWQgYXJndW1lbnQ6IE1hdHJpeCBzaXplLWluY29tcGF0aWJsZScsXG4gIFNJTkdVTEFSX01BVFJJWDogJ0FyaXRobWV0aWMgRXhjZXB0aW9uOiBUaGUgbWF0cml4IGlzIG5vdCBpbnZlcnRpYmxlJyxcbiAgRVhQRUNURURfU1RSSU5HX05VTUJFUl9BVF9QT1NfMV8yOiAnSW52YWxpZCBhcmd1bWVudDogRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYSBudW1iZXIgYXQgYXJndW1lbnRzWzFdIGFuZCBhcmd1bWVudHNbMl0nLFxuICBFWFBFQ1RFRF9BUlJBWV9PRl9OVU1CRVJTX09SX01BVFJJQ0VTOiAnSW52YWxpZCBhcmd1bWVudDogRXhwZWN0ZWQgZWl0aGVyIGFuIGFycmF5IG9mIG51bWJlcnMgb3IgYW4gYXJyYXkgb2Ygc3F1YXJlIG1hdHJpY2VzJ1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYO1xuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIExVUCBkZWNvbXBvc2l0aW9uIG9mIHRoZSBNYXRyaXgsXHJcbiAqIHdoZXJlIEwgaXMgbG93ZXIgdHJpYW5ndWxhciBtYXRyaXggd2hpY2ggZGlhZ29uYWwgZW50cmllcyBhcmUgYWx3YXlzIDEsXHJcbiAqIFUgaXMgdXBwZXIgdHJpYW5ndWxhciBtYXRyaXgsIGFuZCBQIGlzIHBlcm11dGF0aW9uIG1hdHJpeC48YnI+PGJyPlxyXG4gKiBcclxuICogSXQgaXMgaW1wbGVtZW50ZWQgdXNpbmcgR2F1c3NpYW4gRWxpbWluYXRpb24gd2l0aCBQYXJ0aWFsIFBpdm90aW5nIGluIG9yZGVyIHRvXHJcbiAqIHJlZHVjZSB0aGUgZXJyb3IgY2F1c2VkIGJ5IGZsb2F0aW5nLXBvaW50IGFyaXRobWV0aWMuPGJyPjxicj5cclxuICogXHJcbiAqIE5vdGUgdGhhdCBpZiBvcHRpbWl6ZWQgaXMgdHJ1ZSwgUCBpcyBhIFBlcm11dGF0aW9uIEFycmF5IGFuZCBib3RoIEwgYW5kIFUgYXJlIG1lcmdlZFxyXG4gKiBpbnRvIG9uZSBtYXRyaXggaW4gb3JkZXIgdG8gaW1wcm92ZSBwZXJmb3JtYW5jZS5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IG1hdHJpeFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpbWl6ZWQ9ZmFsc2VdIC0gUmV0dXJucyBbUCwgTFVdIGlmIGl0IGlzIHRydWUsIFtQLCBMLCBVXSBpZiBpdCBpcyBmYWxzZVxyXG4gKiBAcmV0dXJucyB7TWF0cml4W119IFRoZSBMVVAgZGVjb21wb3NpdGlvbiBvZiBNYXRyaXhcclxuICovXG5cblxuZnVuY3Rpb24gTFUoQSkge1xuICB2YXIgb3B0aW1pemVkID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmYWxzZTtcblxuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIGNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciBzaXplID0gTWF0aC5taW4ocm93LCBjb2wpO1xuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIEEuX2RpZ2l0KSAqIDIpO1xuICB2YXIgcGVybXV0YXRpb24gPSBpbml0UGVybXV0YXRpb24ocm93KTtcblxuICB2YXIgY29weSA9IHRoaXMuY2xvbmUoQSkuX21hdHJpeDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdyAtIDE7IGkrKykge1xuICAgIHZhciBjdXJyZW50Q29sID0gTWF0aC5taW4oaSwgY29sKTsgLy8gYXBwbHkgUGFydGlhbCBQaXZvdGluZ1xuXG4gICAgUGFydGlhbFBpdm90aW5nKGNvcHksIHBlcm11dGF0aW9uLCBjdXJyZW50Q29sLCByb3csIGNvbCk7XG4gICAgdmFyIGl0aCA9IHBlcm11dGF0aW9uW2ldO1xuICAgIHZhciBwaXZvdCA9IGNvcHlbaXRoXVtjdXJyZW50Q29sXTtcblxuICAgIGlmIChNYXRoLmFicyhwaXZvdCkgPCBFUFNJTE9OKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBqID0gaSArIDE7IGogPCByb3c7IGorKykge1xuICAgICAgdmFyIGp0aCA9IHBlcm11dGF0aW9uW2pdO1xuICAgICAgdmFyIGVudHJ5ID0gY29weVtqdGhdW2N1cnJlbnRDb2xdO1xuXG4gICAgICBpZiAoTWF0aC5hYnMoZW50cnkpID49IEVQU0lMT04pIHtcbiAgICAgICAgdmFyIGZhY3RvciA9IGVudHJ5IC8gcGl2b3Q7XG5cbiAgICAgICAgZm9yICh2YXIgayA9IGN1cnJlbnRDb2w7IGsgPCBjb2w7IGsrKykge1xuICAgICAgICAgIGNvcHlbanRoXVtrXSAtPSBmYWN0b3IgKiBjb3B5W2l0aF1ba107XG4gICAgICAgIH1cblxuICAgICAgICBjb3B5W2p0aF1bY3VycmVudENvbF0gPSBmYWN0b3I7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheShyb3cpO1xuXG4gIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IHJvdzsgX2kyKyspIHtcbiAgICByZXN1bHRbX2kyXSA9IGNvcHlbcGVybXV0YXRpb25bX2kyXV07XG4gIH1cblxuICBpZiAob3B0aW1pemVkKSB7XG4gICAgcmV0dXJuIFtwZXJtdXRhdGlvbiwgbmV3IHRoaXMocmVzdWx0KV07XG4gIH1cblxuICB2YXIgUCA9IHRoaXMuZ2VuZXJhdGUocm93LCByb3csIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgdmFyIGlkeCA9IHBlcm11dGF0aW9uW2ldO1xuXG4gICAgaWYgKGogPT09IGlkeCkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH0pO1xuICB2YXIgTCA9IHRoaXMuZ2VuZXJhdGUocm93LCBzaXplLCBmdW5jdGlvbiAoaSwgaikge1xuICAgIGlmIChpID09PSBqKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICBpZiAoaSA8IGopIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRbaV1bal07XG4gIH0pO1xuICB2YXIgVSA9IHRoaXMuZ2VuZXJhdGUoc2l6ZSwgY29sLCBmdW5jdGlvbiAoaSwgaikge1xuICAgIGlmIChpID4gaikge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdFtpXVtqXTtcbiAgfSk7XG4gIHJldHVybiBbUCwgTCwgVV07XG59XG5cbjtcblxuZnVuY3Rpb24gaW5pdFBlcm11dGF0aW9uKHNpemUpIHtcbiAgdmFyIHBlcm11dGF0aW9uID0gbmV3IEFycmF5KHNpemUpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgcGVybXV0YXRpb25baV0gPSBpO1xuICB9XG5cbiAgcmV0dXJuIHBlcm11dGF0aW9uO1xufVxuXG5mdW5jdGlvbiBQYXJ0aWFsUGl2b3RpbmcobWF0cml4LCBwZXJtdXRhdGlvbiwgcG9zLCByb3csIGNvbCkge1xuICB2YXIgY3VycmVudENvbCA9IE1hdGgubWluKHBvcywgY29sKTtcbiAgdmFyIG1heElkeCA9IHBvcztcbiAgdmFyIG1heCA9IE1hdGguYWJzKG1hdHJpeFtwZXJtdXRhdGlvbltwb3NdXVtjdXJyZW50Q29sXSk7XG5cbiAgZm9yICh2YXIgaSA9IHBvcyArIDE7IGkgPCByb3c7IGkrKykge1xuICAgIHZhciB2YWx1ZSA9IE1hdGguYWJzKG1hdHJpeFtwZXJtdXRhdGlvbltpXV1bY3VycmVudENvbF0pO1xuXG4gICAgaWYgKHZhbHVlID4gbWF4KSB7XG4gICAgICBtYXhJZHggPSBpO1xuICAgICAgbWF4ID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgdmFyIHQgPSBwZXJtdXRhdGlvbltwb3NdO1xuICBwZXJtdXRhdGlvbltwb3NdID0gcGVybXV0YXRpb25bbWF4SWR4XTtcbiAgcGVybXV0YXRpb25bbWF4SWR4XSA9IHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTFU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWDtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBRUiBkZWNvbXBvc2l0aW9uIG9mIHRoZSBNYXRyaXhcclxuICogd2hlcmUgUSBpcyBvcnRob2dvbmFsIG1hdHJpeCwgUiBpcyB1cHBlciB0cmlhbmd1bGFyIG1hdHJpeC48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIGFsZ29yaXRobSBpcyBpbXBsZW1lbnRlZCB1c2luZyBIb3VzZWhvbGRlciBUcmFuc2Zvcm0gaW5zdGVhZCBvZiBHcmFt4oCTU2NobWlkdCBwcm9jZXNzXHJcbiAqIGJlY2F1c2UgdGhlIEhvdXNlaG9sZGVyIFRyYW5zZm9ybSBpcyBtb3JlIG51bWVyaWNhbGx5IHN0YWJsZS5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IG1hdHJpeFxyXG4gKiBAcmV0dXJucyB7TWF0cml4W119IFRoZSBRUiBkZWNvbXBvc2l0aW9uIG9mIG1hdHJpeCBpbiB0aGUgZm9ybSBvZiBbUSwgUl1cclxuICovXG5cblxuZnVuY3Rpb24gUVIoQSkge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIGNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciBzaXplID0gTWF0aC5taW4ocm93LCBjb2wpO1xuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIEEuX2RpZ2l0KSAqIDIpO1xuXG4gIHZhciBtYXRyaXhSID0gdGhpcy5jbG9uZShBKS5fbWF0cml4O1xuXG4gIHZhciBtYXRyaXhRID0gdGhpcy5pZGVudGl0eShyb3cpLl9tYXRyaXg7XG5cbiAgZm9yICh2YXIgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAvLyBpZiBhbGwgZW50cmllcyBiZWxvdyBtYWluIGRpYWdvbmFsIGFyZSBjb25zaWRlcmVkIGFzIHplcm8sIHNraXAgdGhpcyByb3VuZFxuICAgIHZhciBza2lwID0gdHJ1ZTtcblxuICAgIGZvciAodmFyIGkgPSBqICsgMTsgaSA8IHJvdzsgaSsrKSB7XG4gICAgICBpZiAoTWF0aC5hYnMobWF0cml4UltpXVtqXSkgPj0gRVBTSUxPTikge1xuICAgICAgICBza2lwID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghc2tpcCkge1xuICAgICAgLy8gQXBwbHkgSG91c2Vob2xkZXIgdHJhbnNmb3JtXG4gICAgICB2YXIgbm9ybSA9IDA7XG5cbiAgICAgIGZvciAodmFyIF9pMiA9IGo7IF9pMiA8IHJvdzsgX2kyKyspIHtcbiAgICAgICAgbm9ybSArPSBNYXRoLnBvdyhtYXRyaXhSW19pMl1bal0sIDIpO1xuICAgICAgfVxuXG4gICAgICBub3JtID0gTWF0aC5zcXJ0KG5vcm0pOyAvLyByZWR1Y2UgZmxvYXRpbmcgcG9pbnQgYXJpdGhtYXRpYyBlcnJvclxuXG4gICAgICB2YXIgcyA9IC0xO1xuXG4gICAgICBpZiAobWF0cml4UltqXVtqXSA8IDApIHtcbiAgICAgICAgcyA9IDE7XG4gICAgICB9XG5cbiAgICAgIHZhciB1MSA9IG1hdHJpeFJbal1bal0gLSBzICogbm9ybTtcbiAgICAgIHZhciB3ID0gbmV3IEFycmF5KHJvdyAtIGopO1xuXG4gICAgICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPCByb3cgLSBqOyBfaTMrKykge1xuICAgICAgICB3W19pM10gPSBtYXRyaXhSW19pMyArIGpdW2pdIC8gdTE7XG4gICAgICB9XG5cbiAgICAgIHdbMF0gPSAxO1xuICAgICAgdmFyIHRhdSA9IC0xICogcyAqIHUxIC8gbm9ybTtcbiAgICAgIHZhciBzdWJSID0gbmV3IEFycmF5KHJvdyAtIGopO1xuXG4gICAgICBmb3IgKHZhciBfaTQgPSAwOyBfaTQgPCByb3cgLSBqOyBfaTQrKykge1xuICAgICAgICB2YXIgbmV3Um93ID0gbmV3IEFycmF5KGNvbCk7XG5cbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBjb2w7IGsrKykge1xuICAgICAgICAgIG5ld1Jvd1trXSA9IG1hdHJpeFJbaiArIF9pNF1ba107XG4gICAgICAgIH1cblxuICAgICAgICBzdWJSW19pNF0gPSBuZXdSb3c7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIF9pNSA9IGo7IF9pNSA8IHJvdzsgX2k1KyspIHtcbiAgICAgICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IGNvbDsgX2srKykge1xuICAgICAgICAgIHZhciBzdW1tYXRpb24gPSAwO1xuXG4gICAgICAgICAgZm9yICh2YXIgbSA9IDA7IG0gPCByb3cgLSBqOyBtKyspIHtcbiAgICAgICAgICAgIHN1bW1hdGlvbiArPSBzdWJSW21dW19rXSAqIHdbbV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbWF0cml4UltfaTVdW19rXSA9IHN1YlJbX2k1IC0gal1bX2tdIC0gdGF1ICogd1tfaTUgLSBqXSAqIHN1bW1hdGlvbjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgc3ViUSA9IG5ldyBBcnJheShyb3cpO1xuXG4gICAgICBmb3IgKHZhciBfaTYgPSAwOyBfaTYgPCByb3c7IF9pNisrKSB7XG4gICAgICAgIHZhciBfbmV3Um93ID0gbmV3IEFycmF5KHJvdyAtIGopO1xuXG4gICAgICAgIGZvciAodmFyIF9rMiA9IDA7IF9rMiA8IHJvdyAtIGo7IF9rMisrKSB7XG4gICAgICAgICAgX25ld1Jvd1tfazJdID0gbWF0cml4UVtfaTZdW2ogKyBfazJdO1xuICAgICAgICB9XG5cbiAgICAgICAgc3ViUVtfaTZdID0gX25ld1JvdztcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgX2k3ID0gMDsgX2k3IDwgcm93OyBfaTcrKykge1xuICAgICAgICBmb3IgKHZhciBfazMgPSBqOyBfazMgPCByb3c7IF9rMysrKSB7XG4gICAgICAgICAgdmFyIF9zdW1tYXRpb24gPSAwO1xuXG4gICAgICAgICAgZm9yICh2YXIgX20gPSAwOyBfbSA8IHJvdyAtIGo7IF9tKyspIHtcbiAgICAgICAgICAgIF9zdW1tYXRpb24gKz0gc3ViUVtfaTddW19tXSAqIHdbX21dO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG1hdHJpeFFbX2k3XVtfazNdID0gc3ViUVtfaTddW19rMyAtIGpdIC0gdGF1ICogd1tfazMgLSBqXSAqIF9zdW1tYXRpb247XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBfaTggPSAwOyBfaTggPCByb3c7IF9pOCsrKSB7XG4gICAgZm9yICh2YXIgX2ogPSAwOyBfaiA8IGNvbDsgX2orKykge1xuICAgICAgaWYgKF9pOCA+IF9qKSB7XG4gICAgICAgIG1hdHJpeFJbX2k4XVtfal0gPSAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBbbmV3IHRoaXMobWF0cml4USksIG5ldyB0aGlzKG1hdHJpeFIpXTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBRUjsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIGVtcHR5ID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9lbXB0eScpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVgsXG4gICAgSU5WQUxJRF9VUFBFUl9UUklBTkdVTEFSX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfVVBQRVJfVFJJQU5HVUxBUl9NQVRSSVgsXG4gICAgSU5WQUxJRF9TUVVBUkVfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9TUVVBUkVfTUFUUklYLFxuICAgIFNJWkVfSU5DT01QQVRJQkxFID0gX3JlcXVpcmUuU0laRV9JTkNPTVBBVElCTEUsXG4gICAgTk9fVU5JUVVFX1NPTFVUSU9OID0gX3JlcXVpcmUuTk9fVU5JUVVFX1NPTFVUSU9OO1xuLyoqXHJcbiogU29sdmUgc3lzdGVtIG9mIGxpbmVhciBlcXVhdGlvbnMgVXggPSB5IHVzaW5nIGJhY2t3YXJkIHN1YnN0aXR1dGlvbixcclxuKiB3aGVyZSBVIGlzIGFuIHVwcGVyIHRyaWFuZ3VsYXIgbWF0cml4LlxyXG4qIElmIHRoZXJlIGlzIG5vIHVuaXF1ZSBzb2x1dGlvbnMsIGFuIGVycm9yIGlzIHRocm93bi5cclxuKiBAbWVtYmVyb2YgTWF0cml4XHJcbiogQHN0YXRpY1xyXG4qIEBwYXJhbSB7TWF0cml4fSBVIC0gQW55IG4geCBuIHVwcGVyIHRyaWFuZ3VsYXIgTWF0cml4XHJcbiogQHBhcmFtIHtNYXRyaXh9IHkgLSBBbnkgbiB4IDEgTWF0cml4XHJcbiogQHJldHVybnMge01hdHJpeH0gbiB4IDEgTWF0cml4IHdoaWNoIGlzIHRoZSBzb2x1dGlvbiBvZiBVeCA9IHlcclxuKi9cblxuXG5mdW5jdGlvbiBiYWNrd2FyZChVLCB5KSB7XG4gIGlmICghKFUgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKHkgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIVUuaXNVcHBlclRyaWFuZ3VsYXIoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1VQUEVSX1RSSUFOR1VMQVJfTUFUUklYKTtcbiAgfVxuXG4gIGlmICghVS5pc1NxdWFyZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfU1FVQVJFX01BVFJJWCk7XG4gIH1cblxuICB2YXIgc2l6ZSA9IFUuc2l6ZSgpWzBdO1xuXG4gIHZhciBfeSRzaXplID0geS5zaXplKCksXG4gICAgICBfeSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF95JHNpemUsIDIpLFxuICAgICAgeXJvdyA9IF95JHNpemUyWzBdLFxuICAgICAgeWNvbCA9IF95JHNpemUyWzFdO1xuXG4gIHZhciBtYXRyaXhVID0gVS5fbWF0cml4O1xuICB2YXIgbWF0cml4WSA9IHkuX21hdHJpeDtcblxuICBpZiAoeXJvdyAhPT0gc2l6ZSB8fCB5Y29sICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFNJWkVfSU5DT01QQVRJQkxFKTtcbiAgfVxuXG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgVS5fZGlnaXQpICogMik7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBpZiAoTWF0aC5hYnMobWF0cml4VVtpXVtpXSkgPCBFUFNJTE9OKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTk9fVU5JUVVFX1NPTFVUSU9OKTtcbiAgICB9XG4gIH1cblxuICB2YXIgY29lZmZpY2llbnRzID0gZW1wdHkoc2l6ZSwgMSk7XG5cbiAgZm9yICh2YXIgX2kyID0gc2l6ZSAtIDE7IF9pMiA+PSAwOyBfaTItLSkge1xuICAgIHZhciBzdW1tYXRpb24gPSAwO1xuXG4gICAgZm9yICh2YXIgaiA9IF9pMiArIDE7IGogPCBzaXplOyBqKyspIHtcbiAgICAgIHN1bW1hdGlvbiArPSBjb2VmZmljaWVudHNbal1bMF0gKiBtYXRyaXhVW19pMl1bal07XG4gICAgfVxuXG4gICAgY29lZmZpY2llbnRzW19pMl1bMF0gPSAobWF0cml4WVtfaTJdWzBdIC0gc3VtbWF0aW9uKSAvIG1hdHJpeFVbX2kyXVtfaTJdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKGNvZWZmaWNpZW50cyk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gYmFja3dhcmQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBlbXB0eSA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvZW1wdHknKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYLFxuICAgIElOVkFMSURfTE9XRVJfVFJJQU5HVUxBUl9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX0xPV0VSX1RSSUFOR1VMQVJfTUFUUklYLFxuICAgIElOVkFMSURfU1FVQVJFX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfU1FVQVJFX01BVFJJWCxcbiAgICBTSVpFX0lOQ09NUEFUSUJMRSA9IF9yZXF1aXJlLlNJWkVfSU5DT01QQVRJQkxFLFxuICAgIE5PX1VOSVFVRV9TT0xVVElPTiA9IF9yZXF1aXJlLk5PX1VOSVFVRV9TT0xVVElPTjtcbi8qKlxyXG4gKiBTb2x2ZSBzeXN0ZW0gb2YgbGluZWFyIGVxdWF0aW9ucyBMeCA9IHkgdXNpbmcgZm9yd2FyZCBzdWJzdGl0dXRpb24sXHJcbiAqIHdoZXJlIEwgaXMgYSBsb3dlciB0cmlhbmd1bGFyIG1hdHJpeC5cclxuICogSWYgdGhlcmUgaXMgbm8gdW5pcXVlIHNvbHV0aW9ucywgYW4gZXJyb3IgaXMgdGhyb3duLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEwgLSBBbnkgbiB4IG4gbG93ZXIgdHJpYW5ndWxhciBNYXRyaXhcclxuICogQHBhcmFtIHtNYXRyaXh9IHkgLSBBbnkgbiB4IDEgTWF0cml4XHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IG4geCAxIE1hdHJpeCB3aGljaCBpcyB0aGUgc29sdXRpb24gb2YgTHggPSB5XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGZvcndhcmQoTCwgeSkge1xuICBpZiAoIShMIGluc3RhbmNlb2YgdGhpcykgfHwgISh5IGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgaWYgKCFMLmlzTG93ZXJUcmlhbmd1bGFyKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9MT1dFUl9UUklBTkdVTEFSX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIUwuaXNTcXVhcmUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1NRVUFSRV9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIHNpemUgPSBMLnNpemUoKVswXTtcblxuICB2YXIgX3kkc2l6ZSA9IHkuc2l6ZSgpLFxuICAgICAgX3kkc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfeSRzaXplLCAyKSxcbiAgICAgIHlyb3cgPSBfeSRzaXplMlswXSxcbiAgICAgIHljb2wgPSBfeSRzaXplMlsxXTtcblxuICB2YXIgbWF0cml4TCA9IEwuX21hdHJpeDtcbiAgdmFyIG1hdHJpeFkgPSB5Ll9tYXRyaXg7XG5cbiAgaWYgKHNpemUgIT09IHlyb3cgfHwgeWNvbCAhPT0gMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihTSVpFX0lOQ09NUEFUSUJMRSk7XG4gIH1cblxuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIEwuX2RpZ2l0KSAqIDIpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgaWYgKE1hdGguYWJzKG1hdHJpeExbaV1baV0pIDwgRVBTSUxPTikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKE5PX1VOSVFVRV9TT0xVVElPTik7XG4gICAgfVxuICB9XG5cbiAgdmFyIGNvZWZmaWNpZW50cyA9IGVtcHR5KHNpemUsIDEpO1xuXG4gIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IHNpemU7IF9pMisrKSB7XG4gICAgdmFyIHN1bW1hdGlvbiA9IDA7XG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IF9pMjsgaisrKSB7XG4gICAgICBzdW1tYXRpb24gKz0gY29lZmZpY2llbnRzW2pdWzBdICogbWF0cml4TFtfaTJdW2pdO1xuICAgIH1cblxuICAgIGNvZWZmaWNpZW50c1tfaTJdWzBdID0gKG1hdHJpeFlbX2kyXVswXSAtIHN1bW1hdGlvbikgLyBtYXRyaXhMW19pMl1bX2kyXTtcbiAgfVxuXG4gIHJldHVybiBuZXcgdGhpcyhjb2VmZmljaWVudHMpO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGZvcndhcmQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWCxcbiAgICBOT19VTklRVUVfU09MVVRJT04gPSBfcmVxdWlyZS5OT19VTklRVUVfU09MVVRJT04sXG4gICAgSU5WQUxJRF9TUVVBUkVfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9TUVVBUkVfTUFUUklYLFxuICAgIFNJWkVfSU5DT01QQVRJQkxFID0gX3JlcXVpcmUuU0laRV9JTkNPTVBBVElCTEU7XG4vKipcclxuICogU29sdmUgc3lzdGVtIG9mIGxpbmVhciBlcXVhdGlvbnMgQXggPSB5IHVzaW5nIExVIGRlY29tcG9zaXRpb24uXHJcbiAqIElmIHRoZXJlIGlzIG5vIHVuaXF1ZSBzb2x1dGlvbnMsIGFuIGVycm9yIGlzIHRocm93bi5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBMIC0gQW55IG4geCBuIHNxdWFyZSBNYXRyaXhcclxuICogQHBhcmFtIHtNYXRyaXh9IHkgLSBBbnkgbiB4IDEgTWF0cml4XHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IG4geCAxIE1hdHJpeCB3aGljaCBpcyB0aGUgc29sdXRpb24gb2YgQXggPSB5XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIHNvbHZlKEEsIGIpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpIHx8ICEoYiBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIGlmICghQS5pc1NxdWFyZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfU1FVQVJFX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIGFSb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIGFDb2wgPSBfQSRzaXplMlsxXTtcblxuICB2YXIgX2Ikc2l6ZSA9IGIuc2l6ZSgpLFxuICAgICAgX2Ikc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfYiRzaXplLCAyKSxcbiAgICAgIGJSb3cgPSBfYiRzaXplMlswXSxcbiAgICAgIGJDb2wgPSBfYiRzaXplMlsxXTtcblxuICBpZiAoYUNvbCAhPT0gYlJvdyB8fCBiQ29sICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFNJWkVfSU5DT01QQVRJQkxFKTtcbiAgfVxuXG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgQS5fZGlnaXQpICogMik7XG5cbiAgdmFyIF90aGlzJExVID0gdGhpcy5MVShBLCB0cnVlKSxcbiAgICAgIF90aGlzJExVMiA9IF9zbGljZWRUb0FycmF5KF90aGlzJExVLCAyKSxcbiAgICAgIFAgPSBfdGhpcyRMVTJbMF0sXG4gICAgICBMVSA9IF90aGlzJExVMlsxXTtcblxuICB2YXIgbWF0cml4TFUgPSBMVS5fbWF0cml4O1xuICB2YXIgbWF0cml4QiA9IGIuX21hdHJpeDtcblxuICBmb3IgKHZhciBpID0gYVJvdyAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKE1hdGguYWJzKG1hdHJpeExVW2ldW2ldKSA8IEVQU0lMT04pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihOT19VTklRVUVfU09MVVRJT04pO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjbG9uZWRWZWN0b3IgPSBuZXcgQXJyYXkoYlJvdyk7XG4gIHZhciBjb2VmZmljaWVudHMgPSBuZXcgQXJyYXkoYlJvdyk7XG5cbiAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgYlJvdzsgX2kyKyspIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICBjbG9uZWRWZWN0b3JbX2kyXSA9IG1hdHJpeEJbUFtfaTJdXVswXTtcbiAgfVxuXG4gIGZvciAodmFyIF9pMyA9IDA7IF9pMyA8IGFSb3c7IF9pMysrKSB7XG4gICAgdmFyIHN1bW1hdGlvbiA9IDA7XG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IF9pMzsgaisrKSB7XG4gICAgICBzdW1tYXRpb24gKz0gY29lZmZpY2llbnRzW2pdICogbWF0cml4TFVbX2kzXVtqXTtcbiAgICB9XG5cbiAgICBjb2VmZmljaWVudHNbX2kzXSA9IGNsb25lZFZlY3RvcltfaTNdIC0gc3VtbWF0aW9uO1xuICB9XG5cbiAgZm9yICh2YXIgX2k0ID0gYVJvdyAtIDE7IF9pNCA+PSAwOyBfaTQtLSkge1xuICAgIHZhciBfc3VtbWF0aW9uID0gMDtcblxuICAgIGZvciAodmFyIF9qID0gX2k0ICsgMTsgX2ogPCBhUm93OyBfaisrKSB7XG4gICAgICBfc3VtbWF0aW9uICs9IG1hdHJpeExVW19pNF1bX2pdICogY2xvbmVkVmVjdG9yW19qXTtcbiAgICB9XG5cbiAgICBjbG9uZWRWZWN0b3JbX2k0XSA9IChjb2VmZmljaWVudHNbX2k0XSAtIF9zdW1tYXRpb24pIC8gbWF0cml4TFVbX2k0XVtfaTRdO1xuICB9XG5cbiAgZm9yICh2YXIgX2k1ID0gMDsgX2k1IDwgYlJvdzsgX2k1KyspIHtcbiAgICBjb2VmZmljaWVudHNbX2k1XSA9IFtjbG9uZWRWZWN0b3JbX2k1XV07XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMoY29lZmZpY2llbnRzKTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBzb2x2ZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYLFxuICAgIFNJWkVfSU5DT01QQVRJQkxFID0gX3JlcXVpcmUuU0laRV9JTkNPTVBBVElCTEU7XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgc3VtIG9mIHR3byBNYXRyaWNlcy5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IE1hdHJpeFxyXG4gKiBAcGFyYW0ge01hdHJpeH0gQiAtIEFueSBNYXRyaXggdGhhdCBoYXMgc2FtZSBzaXplIHdpdGggQVxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBUaGUgc3VtIG9mIHR3byBNYXRyaWNlc1xyXG4gKi9cblxuXG5mdW5jdGlvbiBhZGQoQSwgQikge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykgfHwgIShCIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIGNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciBfQiRzaXplID0gQi5zaXplKCksXG4gICAgICBfQiRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9CJHNpemUsIDIpLFxuICAgICAgcm93MiA9IF9CJHNpemUyWzBdLFxuICAgICAgY29sMiA9IF9CJHNpemUyWzFdO1xuXG4gIGlmIChyb3cgIT09IHJvdzIgfHwgY29sICE9PSBjb2wyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFNJWkVfSU5DT01QQVRJQkxFKTtcbiAgfVxuXG4gIHZhciBtYXRyaXgxID0gQS5fbWF0cml4O1xuICB2YXIgbWF0cml4MiA9IEIuX21hdHJpeDtcbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUocm93LCBjb2wsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgcmV0dXJuIG1hdHJpeDFbaV1bal0gKyBtYXRyaXgyW2ldW2pdO1xuICB9KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBhZGQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWCxcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVgsXG4gICAgU0lOR1VMQVJfTUFUUklYID0gX3JlcXVpcmUuU0lOR1VMQVJfTUFUUklYO1xuXG52YXIgTWF0cml4ID0gcmVxdWlyZSgnLi4vLi4nKTtcbi8qKlxyXG4gKiBGaW5kIHRoZSBpbnZlcnNlIG9mIG5vbi1zaW5ndWxhciBtYXRyaXggdXNpbmcgRWxlbWVudGFyeSBSb3cgT3BlcmF0aW9ucy5cclxuICogSWYgdGhlIG1hdHJpeCBpcyBzaW5ndWxhciwgYW4gZXJyb3IgaXMgdGhyb3duLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgc3F1YXJlIE1hdHJpeFxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBUaGUgaW52ZXJzZSBvZiBBXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGludmVyc2UoQSkge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgaWYgKCFBLmlzU3F1YXJlKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9TUVVBUkVfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBzaXplID0gQS5zaXplKClbMF07XG5cbiAgaWYgKHNpemUgPT09IDApIHtcbiAgICAvLyBpbnZlcnNlIG9mIDB4MCBtYXRyaXggaXMgaXRzZWxmXG4gICAgcmV0dXJuIG5ldyBNYXRyaXgoW10pO1xuICB9XG5cbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBBLl9kaWdpdCkgKiAyKTtcblxuICB2YXIgaW52ID0gdGhpcy5pZGVudGl0eShzaXplKS5fbWF0cml4O1xuXG4gIHZhciBjbG9uZSA9IHRoaXMuY2xvbmUoQSkuX21hdHJpeDtcblxuICB2YXIgcGVybXV0YXRpb24gPSBpbml0UGVybXV0YXRpb24oc2l6ZSk7IC8vIGl0ZXJhdGUgZWFjaCBjb2x1bW5cblxuICBmb3IgKHZhciBqID0gMDsgaiA8IHNpemU7IGorKykge1xuICAgIHZhciBwaXZvdElkeCA9IGo7XG4gICAgdmFyIHBpdm90ID0gY2xvbmVbcGVybXV0YXRpb25bal1dW2pdO1xuXG4gICAgd2hpbGUgKE1hdGguYWJzKHBpdm90KSA8IEVQU0lMT04gJiYgcGl2b3RJZHggPCBzaXplIC0gMSkge1xuICAgICAgcGl2b3RJZHgrKztcbiAgICAgIHBpdm90ID0gY2xvbmVbcGVybXV0YXRpb25bcGl2b3RJZHhdXVtqXTtcbiAgICB9XG5cbiAgICBpZiAoTWF0aC5hYnMocGl2b3QpIDwgRVBTSUxPTikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFNJTkdVTEFSX01BVFJJWCk7XG4gICAgfVxuXG4gICAgaWYgKGogIT09IHBpdm90SWR4KSB7XG4gICAgICB2YXIgdGVtcCA9IHBlcm11dGF0aW9uW2pdO1xuICAgICAgcGVybXV0YXRpb25bal0gPSBwZXJtdXRhdGlvbltwaXZvdElkeF07XG4gICAgICBwZXJtdXRhdGlvbltwaXZvdElkeF0gPSB0ZW1wO1xuICAgIH1cblxuICAgIHZhciBwaXZvdFJvdyA9IHBlcm11dGF0aW9uW2pdOyAvLyB0aGUgcGl2b3QgaXMgZ3VhcmFudGVlZCB0byBiZSBub24temVyb1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIHZhciBpdGggPSBwZXJtdXRhdGlvbltpXTtcblxuICAgICAgaWYgKGkgPT09IGopIHtcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBzaXplOyBrKyspIHtcbiAgICAgICAgICBpZiAoayA9PT0gaikge1xuICAgICAgICAgICAgY2xvbmVbaXRoXVtrXSA9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGsgPiBqKSB7XG4gICAgICAgICAgICBjbG9uZVtpdGhdW2tdIC89IHBpdm90O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGludltpdGhdW2tdIC89IHBpdm90O1xuICAgICAgICB9XG5cbiAgICAgICAgcGl2b3QgPSAxO1xuICAgICAgfVxuXG4gICAgICBpZiAoaSAhPT0gaiAmJiBNYXRoLmFicyhjbG9uZVtpdGhdW2pdKSA+PSBFUFNJTE9OKSB7XG4gICAgICAgIHZhciBmYWN0b3IgPSBjbG9uZVtpdGhdW2pdIC8gcGl2b3Q7XG5cbiAgICAgICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IHNpemU7IF9rKyspIHtcbiAgICAgICAgICBpZiAoX2sgPT09IGopIHtcbiAgICAgICAgICAgIGNsb25lW2l0aF1bX2tdID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoX2sgPiBqKSB7XG4gICAgICAgICAgICBjbG9uZVtpdGhdW19rXSAtPSBmYWN0b3IgKiBjbG9uZVtwaXZvdFJvd11bX2tdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGludltpdGhdW19rXSAtPSBmYWN0b3IgKiBpbnZbcGl2b3RSb3ddW19rXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIF9pID0gMDsgX2kgPCBzaXplOyBfaSsrKSB7XG4gICAgY2xvbmVbX2ldID0gaW52W3Blcm11dGF0aW9uW19pXV07XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMoY2xvbmUpO1xufVxuXG47XG5cbmZ1bmN0aW9uIGluaXRQZXJtdXRhdGlvbihzaXplKSB7XG4gIHZhciBwZXJtdXRhdGlvbiA9IG5ldyBBcnJheShzaXplKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIHBlcm11dGF0aW9uW2ldID0gaTtcbiAgfVxuXG4gIHJldHVybiBwZXJtdXRhdGlvbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnZlcnNlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgZW1wdHkgPSByZXF1aXJlKCcuLi8uLi91dGlsL2VtcHR5Jyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWCxcbiAgICBTSVpFX0lOQ09NUEFUSUJMRSA9IF9yZXF1aXJlLlNJWkVfSU5DT01QQVRJQkxFO1xuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIHByb2R1Y3Qgb2YgdHdvIE1hdHJpY2VzLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgTWF0cml4XHJcbiAqIEBwYXJhbSB7TWF0cml4fSBCIC0gQW55IE1hdHJpeCB0aGF0IGlzIHNpemUtY29tcGF0aWJsZSB3aXRoIEFcclxuICogQHJldHVybnMge01hdHJpeH0gVGhlIHByb2R1Y3Qgb2YgdHdvIE1hdHJpY2VzXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIG11bHRpcGx5KEEsIEIpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpIHx8ICEoQiBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBfQSRzaXplID0gQS5zaXplKCksXG4gICAgICBfQSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9BJHNpemUsIDIpLFxuICAgICAgQXJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgQWNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciBfQiRzaXplID0gQi5zaXplKCksXG4gICAgICBfQiRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9CJHNpemUsIDIpLFxuICAgICAgQnJvdyA9IF9CJHNpemUyWzBdLFxuICAgICAgQmNvbCA9IF9CJHNpemUyWzFdO1xuXG4gIGlmIChBY29sICE9PSBCcm93KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFNJWkVfSU5DT01QQVRJQkxFKTtcbiAgfVxuXG4gIHZhciBtYXRyaXhBID0gQS5fbWF0cml4O1xuICB2YXIgbWF0cml4QiA9IEIuX21hdHJpeDtcbiAgdmFyIHJlc3VsdCA9IGVtcHR5KEFyb3csIEJjb2wpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgQXJvdzsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBCY29sOyBqKyspIHtcbiAgICAgIHJlc3VsdFtpXVtqXSA9IDA7XG5cbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgQnJvdzsgaysrKSB7XG4gICAgICAgIHJlc3VsdFtpXVtqXSArPSBtYXRyaXhBW2ldW2tdICogbWF0cml4QltrXVtqXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMocmVzdWx0KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBtdWx0aXBseTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYLFxuICAgIElOVkFMSURfU1FVQVJFX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfU1FVQVJFX01BVFJJWCxcbiAgICBJTlZBTElEX0VYUE9ORU5UID0gX3JlcXVpcmUuSU5WQUxJRF9FWFBPTkVOVDtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBwb3dlciBvZiBhbnkgc3F1YXJlIG1hdHJpeC5cclxuICogVGhlIGFsZ29yaXRobSBpcyBpbXBsZW1lbnRlZCByZWN1cnNpdmVseS5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IHNxdWFyZSBNYXRyaXhcclxuICogQHBhcmFtIHtudW1iZXJ9IGV4cG9uZW50IC0gQW55IE5vbi1uZWdhdGl2ZSBpbnRlZ2VyXHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IFRoZSBwb3dlciBvZiBBXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIHBvdyhBLCBleHBvbmVudCkge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgaWYgKCFBLmlzU3F1YXJlKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9TUVVBUkVfTUFUUklYKTtcbiAgfVxuXG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihleHBvbmVudCkgfHwgZXhwb25lbnQgPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfRVhQT05FTlQpO1xuICB9XG5cbiAgdmFyIHNpemUgPSBBLnNpemUoKVswXTtcblxuICBpZiAoZXhwb25lbnQgPT09IDApIHtcbiAgICByZXR1cm4gdGhpcy5pZGVudGl0eShzaXplKTtcbiAgfVxuXG4gIGlmIChleHBvbmVudCA9PT0gMSkge1xuICAgIHJldHVybiB0aGlzLmNsb25lKEEpO1xuICB9XG5cbiAgaWYgKGV4cG9uZW50ICUgMiA9PT0gMCkge1xuICAgIHZhciBfdGVtcCA9IHRoaXMucG93KEEsIGV4cG9uZW50IC8gMik7XG5cbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseShfdGVtcCwgX3RlbXApO1xuICB9XG5cbiAgdmFyIHRlbXAgPSB0aGlzLnBvdyhBLCAoZXhwb25lbnQgLSAxKSAvIDIpO1xuICByZXR1cm4gdGhpcy5tdWx0aXBseSh0aGlzLm11bHRpcGx5KHRlbXAsIHRlbXApLCBBKTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBwb3c7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgU0laRV9JTkNPTVBBVElCTEUgPSBfcmVxdWlyZS5TSVpFX0lOQ09NUEFUSUJMRSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYO1xuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGRpZmZlcmVuY2Ugb2YgdHdvIE1hdHJpY2VzLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgTWF0cml4XHJcbiAqIEBwYXJhbSB7TWF0cml4fSBCIC0gQW55IE1hdHJpeCB0aGF0IGhhcyBzYW1lIHNpemUgd2l0aCBBXHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IFRoZSBkaWZmZXJlbmNlIG9mIHR3byBNYXRyaWNlc1xyXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1YnRyYWN0KEEsIEIpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpIHx8ICEoQiBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBfQSRzaXplID0gQS5zaXplKCksXG4gICAgICBfQSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9BJHNpemUsIDIpLFxuICAgICAgcm93ID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfQSRzaXplMlsxXTtcblxuICB2YXIgX0Ikc2l6ZSA9IEIuc2l6ZSgpLFxuICAgICAgX0Ikc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQiRzaXplLCAyKSxcbiAgICAgIHJvdzIgPSBfQiRzaXplMlswXSxcbiAgICAgIGNvbDIgPSBfQiRzaXplMlsxXTtcblxuICBpZiAocm93ICE9PSByb3cyIHx8IGNvbCAhPT0gY29sMikge1xuICAgIHRocm93IG5ldyBFcnJvcihTSVpFX0lOQ09NUEFUSUJMRSk7XG4gIH1cblxuICB2YXIgbWF0cml4MSA9IEEuX21hdHJpeDtcbiAgdmFyIG1hdHJpeDIgPSBCLl9tYXRyaXg7XG4gIHJldHVybiB0aGlzLmdlbmVyYXRlKHJvdywgY29sLCBmdW5jdGlvbiAoaSwgaikge1xuICAgIHJldHVybiBtYXRyaXgxW2ldW2pdIC0gbWF0cml4MltpXVtqXTtcbiAgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogRmluZCB0aGUgdHJhbnNwb3NlIG9mIGEgbWF0cml4LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHsgTWF0cml4IH0gQSAtIEFueSBNYXRyaXhcclxuICogQHJldHVybnMgeyBNYXRyaXggfSBSZXR1cm5zIHRyYW5zcG9zZSBvZiBBXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIHRyYW5zcG9zZShBKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIG1hdHJpeCA9IEEuX21hdHJpeDtcbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUoY29sLCByb3csIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgcmV0dXJuIG1hdHJpeFtqXVtpXTtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gdHJhbnNwb3NlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgTWF0cml4ID0gcmVxdWlyZSgnLi4vLi4nKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX1BfTk9STSA9IF9yZXF1aXJlLklOVkFMSURfUF9OT1JNLFxuICAgIFNJTkdVTEFSX01BVFJJWCA9IF9yZXF1aXJlLlNJTkdVTEFSX01BVFJJWCxcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVg7XG4vKipcclxuICogQ2FsY3VsYXRpb25zIHRoZSBjb25kaXRpb24gbnVtYmVyIG9mIHNxdWFyZSBNYXRyaXhcclxuICogd2l0aCByZXNwZWN0IHRvIHRoZSBjaG9pY2Ugb2YgTWF0cml4IG5vcm0uIFxyXG4gKiBJZiB0aGUgTWF0cml4IGlzIHNpbmd1bGFyLCByZXR1cm5zIEluZmluaXR5Ljxicj48YnI+XHJcbiAqIFRoZSBjb25kaXRpb24gbnVtYmVyIGlzIG5vdCBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7KDF8MnxJbmZpbml0eXwnRicpfSBwIC0gVHlwZSBvZiBNYXRyaXggbm9ybVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgY29uZGl0aW9uIG51bWJlciBvZiBNYXRyaXhcclxuICovXG5cblxuZnVuY3Rpb24gY29uZCgpIHtcbiAgdmFyIHAgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IDI7XG5cbiAgaWYgKHAgIT09IDEgJiYgcCAhPT0gMiAmJiBwICE9PSBJbmZpbml0eSAmJiBwICE9PSAnRicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9QX05PUk0pO1xuICB9XG5cbiAgaWYgKCF0aGlzLmlzU3F1YXJlKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9TUVVBUkVfTUFUUklYKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgdmFyIGludmVyc2UgPSBNYXRyaXguaW52ZXJzZSh0aGlzKTtcbiAgICByZXR1cm4gaW52ZXJzZS5ub3JtKHApICogdGhpcy5ub3JtKHApO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmIChlcnJvci5tZXNzYWdlID09PSBTSU5HVUxBUl9NQVRSSVgpIHtcbiAgICAgIHJldHVybiBJbmZpbml0eTtcbiAgICB9XG5cbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGNvbmQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbi8qIGVzbGludC1kaXNhYmxlIHByZWZlci1kZXN0cnVjdHVyaW5nICovXG52YXIgTWF0cml4ID0gcmVxdWlyZSgnLi4vLi4nKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVg7XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgZGV0ZXJtaW5hbnQgb2Ygc3F1YXJlIE1hdHJpeC5cclxuICogSWYgdGhlIE1hdHJpeCBzaXplIGlzIGxhcmdlciB0aGFuIDMsIGl0IGNhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IHVzaW5nXHJcbiAqIExVIGRlY29tcG9zaXRpb24sIG90aGVyd2lzZSwgdXNpbmcgTGVpYm5peiBGb3JtdWxhLjxicj48YnI+XHJcbiAqIFRoZSBkZXRlcm1pbmFudCBpcyBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGRldGVybWluYW50IG9mIHNxdWFyZSBtYXRyaXJ4XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGRldCgpIHtcbiAgaWYgKCF0aGlzLmlzU3F1YXJlKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9TUVVBUkVfTUFUUklYKTtcbiAgfVxuXG4gIGlmICh0aGlzLl9kZXQgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLl9kZXQ7XG4gIH1cblxuICB2YXIgbWF0cml4ID0gdGhpcy5fbWF0cml4O1xuICB2YXIgc2l6ZSA9IG1hdHJpeC5sZW5ndGg7XG5cbiAgaWYgKHNpemUgPT09IDApIHtcbiAgICB0aGlzLl9kZXQgPSAxO1xuICAgIHJldHVybiAxOyAvLyB0aGUgZGV0ZXJtaW5hbnQgb2YgMHgwIG1hdHJpeCBtdXN0IGJlIDFcbiAgfVxuXG4gIGlmIChzaXplID09PSAxKSB7XG4gICAgdGhpcy5fZGV0ID0gbWF0cml4WzBdWzBdO1xuICAgIHJldHVybiB0aGlzLl9kZXQ7XG4gIH1cblxuICBpZiAoc2l6ZSA9PT0gMikge1xuICAgIHRoaXMuX2RldCA9IG1hdHJpeFswXVswXSAqIG1hdHJpeFsxXVsxXSAtIG1hdHJpeFswXVsxXSAqIG1hdHJpeFsxXVswXTtcbiAgICByZXR1cm4gdGhpcy5fZGV0O1xuICB9XG5cbiAgaWYgKHNpemUgPT09IDMpIHtcbiAgICB0aGlzLl9kZXQgPSBtYXRyaXhbMF1bMF0gKiBtYXRyaXhbMV1bMV0gKiBtYXRyaXhbMl1bMl0gKyBtYXRyaXhbMF1bMV0gKiBtYXRyaXhbMV1bMl0gKiBtYXRyaXhbMl1bMF0gKyBtYXRyaXhbMF1bMl0gKiBtYXRyaXhbMV1bMF0gKiBtYXRyaXhbMl1bMV0gLSBtYXRyaXhbMF1bMl0gKiBtYXRyaXhbMV1bMV0gKiBtYXRyaXhbMl1bMF0gLSBtYXRyaXhbMF1bMV0gKiBtYXRyaXhbMV1bMF0gKiBtYXRyaXhbMl1bMl0gLSBtYXRyaXhbMF1bMF0gKiBtYXRyaXhbMV1bMl0gKiBtYXRyaXhbMl1bMV07XG4gICAgcmV0dXJuIHRoaXMuX2RldDtcbiAgfVxuXG4gIHZhciBfTWF0cml4JExVID0gTWF0cml4LkxVKHRoaXMsIHRydWUpLFxuICAgICAgX01hdHJpeCRMVTIgPSBfc2xpY2VkVG9BcnJheShfTWF0cml4JExVLCAyKSxcbiAgICAgIFAgPSBfTWF0cml4JExVMlswXSxcbiAgICAgIExVID0gX01hdHJpeCRMVTJbMV07XG5cbiAgdmFyIG1hdHJpeExVID0gTFUuX21hdHJpeDsgLy8gY291bnQgd2hldGhlciB0aGUgbnVtYmVyIG9mIHBlcm11dGF0aW9ucyA8c3dhcD4gaXMgb2RkIG9yIGV2ZW5cbiAgLy8gTyhuXjIpXG5cbiAgdmFyIHN3YXAgPSAwO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgaWYgKFBbaV0gPT09IGkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHdoaWxlIChQW2ldICE9PSBpKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gUFtpXTtcbiAgICAgIFBbaV0gPSBQW3RhcmdldF07XG4gICAgICBQW3RhcmdldF0gPSB0YXJnZXQ7XG4gICAgICBzd2FwKys7XG4gICAgfVxuICB9XG5cbiAgdmFyIHJlc3VsdCA9IDE7XG5cbiAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgc2l6ZTsgX2kyKyspIHtcbiAgICByZXN1bHQgKj0gbWF0cml4TFVbX2kyXVtfaTJdO1xuICB9XG5cbiAgaWYgKHN3YXAgJSAyID09PSAxKSB7XG4gICAgdGhpcy5fZGV0ID0gcmVzdWx0ICogLTE7XG4gICAgcmV0dXJuIHRoaXMuX2RldDtcbiAgfVxuXG4gIHRoaXMuX2RldCA9IHJlc3VsdDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBkZXQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4vLyByZWZlcmVuY2U6IGh0dHBzOi8vcGVvcGxlLmluZi5ldGh6LmNoL2FyYmVuei9ld3AvTG5vdGVzL2NoYXB0ZXI0LnBkZlxudmFyIENvbXBsZXggPSByZXF1aXJlKCdAcmF5eWFtaGsvY29tcGxleCcpO1xuXG52YXIgTWF0cml4ID0gcmVxdWlyZSgnLi4vLi4nKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVg7XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgZWlnZW52YWx1ZXMgb2YgYW55IHNxdWFyZSBNYXRyaXggdXNpbmcgUVIgQWxnb3JpdGhtLjxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgZWlnZW52YWx1ZXMgY2FuIGJlIGVpdGhlciByZWFsIG51bWJlciBvciBjb21wbGV4IG51bWJlci5cclxuICogTm90ZSB0aGF0IGFsbCBlaWdlbnZhbHVlcyBhcmUgaW5zdGFuY2Ugb2YgQ29tcGxleCxcclxuICogZm9yIG1vcmUgZGV0YWlscyBwbGVhc2UgdmlzaXQgW0NvbXBsZXguanNde0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9yYXl5YW1oay9Db21wbGV4LmpzfS48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIGVpZ2VudmFsdWVzIGFyZSBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEByZXR1cm5zIHtDb21wbGV4W119IEFycmF5IG9mIGVpZ2VudmFsdWVzXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGVpZ2VudmFsdWVzKCkge1xuICBpZiAoIXRoaXMuaXNTcXVhcmUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1NRVUFSRV9NQVRSSVgpO1xuICB9XG5cbiAgaWYgKHRoaXMuX2VpZ2VudmFsdWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5fZWlnZW52YWx1ZXM7XG4gIH1cblxuICB2YXIgc2l6ZSA9IHRoaXMuc2l6ZSgpWzBdO1xuICB2YXIgdmFsdWVzID0gW107XG4gIHZhciBkaWdpdCA9IHRoaXMuX2RpZ2l0O1xuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuXG4gIHZhciBjbG9uZSA9IE1hdHJpeC5jbG9uZSh0aGlzKS5fbWF0cml4O1xuXG4gIHZhciBpc0NvbnZlcmdlbnQgPSB0cnVlOyAvLyBmbGFnXG5cbiAgdmFyIHNraXAgPSBmYWxzZTsgLy8gVHJhbnNmb3JtIG1hdHJpeCB0byBIZXNzZW5iZXJnIG1hdHJpeFxuXG4gIEhvdXNlaG9sZGVyVHJhbnNmb3JtKGNsb25lLCBkaWdpdCk7XG5cbiAgZm9yICh2YXIgaSA9IHNpemUgLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgdmFyIGRpdmVyZ2VuY2VDb3VudCA9IDA7XG4gICAgdmFyIHByZXYgPSB2b2lkIDA7IC8vIHVzZWQgdG8gZGV0ZXJtaW5lIGNvbnZlcmdlbmNlXG4gICAgLy8gaWYgb2J0YWlucyBjb21wbGV4IGVpZ2VudmFsdWVzIHBhaXIgaW4gcHJldmlvdXMgaXRlcmF0aW9uLCBza2lwIGN1cnJlbnQgcm91bmRcblxuICAgIGlmIChza2lwKSB7XG4gICAgICBza2lwID0gZmFsc2U7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgc2hpZnQgPSBjbG9uZVtzaXplIC0gMV1bc2l6ZSAtIDFdOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgaWYgKCFpc0NvbnZlcmdlbnQpIHtcbiAgICAgICAgLy8gaWYgdGhlIGN1cnJlbnQgZWlnZW52YWx1ZSBpcyBub3QgcmVhbFxuICAgICAgICBwcmV2ID0gc2l6ZTJFaWdlbnZhbHVlcyhjbG9uZVtpIC0gMV1baSAtIDFdLCBjbG9uZVtpIC0gMV1baV0sIGNsb25lW2ldW2kgLSAxXSwgY2xvbmVbaV1baV0pLm1ldHJpYztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIHRoZSBjdXJyZW50IGVpZ2VudmFsdWUgaXMgcmVhbFxuICAgICAgICBwcmV2ID0gTWF0aC5hYnMoY2xvbmVbaV1baSAtIDFdKTtcbiAgICAgIH0gLy8gYXBwbHkgc2luZ2xlIHNoaWZ0XG5cblxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAgICAgY2xvbmVbal1bal0gLT0gc2hpZnQ7XG4gICAgICB9IC8vIEFwcGx5IFFSIEFsZ29yaXRobVxuXG5cbiAgICAgIEhlc3NlbmJlcmdRUihjbG9uZSwgZGlnaXQpO1xuXG4gICAgICBmb3IgKHZhciBfaiA9IDA7IF9qIDwgc2l6ZTsgX2orKykge1xuICAgICAgICBjbG9uZVtfal1bX2pdICs9IHNoaWZ0O1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNDb252ZXJnZW50ICYmIHByZXYgPCBNYXRoLmFicyhjbG9uZVtpXVtpIC0gMV0pKSB7XG4gICAgICAgIGRpdmVyZ2VuY2VDb3VudCsrO1xuICAgICAgfSAvLyBpZiB0aGUgY3VycmVudCBlaWdlbnZhbHVlIGlzIHJlYWwgYW5kIHRoZSBlbnRyeSBpcyBhbG1vc3QgWkVSTyA9PiBicmVhaztcblxuXG4gICAgICBpZiAoaXNDb252ZXJnZW50ICYmIE1hdGguYWJzKGNsb25lW2ldW2kgLSAxXSkgPCBFUFNJTE9OKSB7XG4gICAgICAgIHZhbHVlc1tpXSA9IG5ldyBDb21wbGV4KGNsb25lW2ldW2ldKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IC8vIGlmIHRoZSBjdXJyZW50IGVpZ2VudmFsdWVzIHBhaXIgaXMgY29tcGxleCwgaWYgdGhlIGRpZmZlcmVuY2Ugb2YgdGhlIHByZXZpb3VzIGVpZ2FudmFsdWVzIGFuZCB0aGVcbiAgICAgIC8vIGVpZ2VudmFsdWVzIG9mIHN1Ym1hdHJpeCBpcyBhbG1vc3QgWkVSTyA9PiBicmVha1xuXG5cbiAgICAgIHZhciBfc2l6ZTJFaWdlbnZhbHVlcyA9IHNpemUyRWlnZW52YWx1ZXMoY2xvbmVbaSAtIDFdW2kgLSAxXSwgY2xvbmVbaSAtIDFdW2ldLCBjbG9uZVtpXVtpIC0gMV0sIGNsb25lW2ldW2ldKSxcbiAgICAgICAgICBtZXRyaWMgPSBfc2l6ZTJFaWdlbnZhbHVlcy5tZXRyaWMsXG4gICAgICAgICAgZWlnZW4xID0gX3NpemUyRWlnZW52YWx1ZXMuZWlnZW4xLFxuICAgICAgICAgIGVpZ2VuMiA9IF9zaXplMkVpZ2VudmFsdWVzLmVpZ2VuMjtcblxuICAgICAgaWYgKCFpc0NvbnZlcmdlbnQgJiYgTWF0aC5hYnMocHJldiAtIG1ldHJpYykgPCBFUFNJTE9OKSB7XG4gICAgICAgIGlzQ29udmVyZ2VudCA9IHRydWU7IC8vIHJlLWluaXRpYWxpemVcblxuICAgICAgICBza2lwID0gdHJ1ZTtcbiAgICAgICAgdmFyIHJlMSA9IGVpZ2VuMS5yZSxcbiAgICAgICAgICAgIGltMSA9IGVpZ2VuMS5pbTtcbiAgICAgICAgdmFyIHJlMiA9IGVpZ2VuMi5yZSxcbiAgICAgICAgICAgIGltMiA9IGVpZ2VuMi5pbTtcbiAgICAgICAgdmFsdWVzW2ldID0gbmV3IENvbXBsZXgocmUxLCBpbTEpO1xuICAgICAgICB2YWx1ZXNbaSAtIDFdID0gbmV3IENvbXBsZXgocmUyLCBpbTIpO1xuICAgICAgICBicmVhaztcbiAgICAgIH0gLy8gaWYgdGhlIGVudHJ5IGRvZXNuJ3QgY29udmVyZ2UgPT4gY29tcGxleCBlaWdlbnZhbHVlcyBwYWlyXG5cblxuICAgICAgaWYgKGRpdmVyZ2VuY2VDb3VudCA+IDMpIHtcbiAgICAgICAgaXNDb252ZXJnZW50ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKCFza2lwKSB7XG4gICAgdmFsdWVzWzBdID0gbmV3IENvbXBsZXgoY2xvbmVbMF1bMF0pO1xuICB9XG5cbiAgdGhpcy5fZWlnZW52YWx1ZXMgPSB2YWx1ZXM7XG4gIHJldHVybiB2YWx1ZXM7XG59XG5cbjtcblxuZnVuY3Rpb24gSG91c2Vob2xkZXJUcmFuc2Zvcm0oQSwgZGlnaXQpIHtcbiAgdmFyIHNpemUgPSBBLmxlbmd0aDtcbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBkaWdpdCkgKiAyKTtcblxuICBmb3IgKHZhciBqID0gMDsgaiA8IHNpemUgLSAyOyBqKyspIHtcbiAgICB2YXIgeE5vcm0gPSAwO1xuICAgIHZhciB1ID0gbmV3IEFycmF5KHNpemUgLSBqIC0gMSk7XG5cbiAgICBmb3IgKHZhciBpID0gaiArIDE7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIHZhciBlbnRyeSA9IEFbaV1bal07XG4gICAgICB4Tm9ybSArPSBNYXRoLnBvdyhlbnRyeSwgMik7XG4gICAgICB1W2kgLSBqIC0gMV0gPSBlbnRyeTtcbiAgICB9XG5cbiAgICB4Tm9ybSA9IE1hdGguc3FydCh4Tm9ybSk7XG5cbiAgICBpZiAoTWF0aC5hYnMoeE5vcm0pIDwgRVBTSUxPTikge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHVbMF0gPj0gMCkge1xuICAgICAgdVswXSArPSB4Tm9ybTtcbiAgICB9IGVsc2Uge1xuICAgICAgdVswXSAtPSB4Tm9ybTtcbiAgICB9IC8vIE1ha2UgJ3UnIHVuaXQgdmVjdG9yXG5cblxuICAgIHZhciB1Tm9ybSA9IDA7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgdS5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHVOb3JtICs9IE1hdGgucG93KHVbX2ldLCAyKTtcbiAgICB9XG5cbiAgICB1Tm9ybSA9IE1hdGguc3FydCh1Tm9ybSk7XG5cbiAgICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCB1Lmxlbmd0aDsgX2kyKyspIHtcbiAgICAgIHVbX2kyXSAvPSB1Tm9ybTtcbiAgICB9IC8vIHVwZGF0ZSB0aGUgbWF0cml4LCBtdWx0aXBseSBQIGZyb20gbGVmdFxuXG5cbiAgICBmb3IgKHZhciBuID0gajsgbiA8IHNpemU7IG4rKykge1xuICAgICAgLy8gY29sdW1uXG4gICAgICB2YXIgdiA9IG5ldyBBcnJheShzaXplIC0gaiAtIDEpO1xuXG4gICAgICBmb3IgKHZhciBtID0gaiArIDE7IG0gPCBzaXplOyBtKyspIHtcbiAgICAgICAgdlttIC0gaiAtIDFdID0gQVttXVtuXTtcbiAgICAgIH1cblxuICAgICAgdmFyIHNjYWxlciA9IDA7XG5cbiAgICAgIGZvciAodmFyIF9tID0gMDsgX20gPCB2Lmxlbmd0aDsgX20rKykge1xuICAgICAgICBzY2FsZXIgKz0gdltfbV0gKiB1W19tXTtcbiAgICAgIH1cblxuICAgICAgc2NhbGVyICo9IDI7XG5cbiAgICAgIGZvciAodmFyIF9tMiA9IGogKyAxOyBfbTIgPCBzaXplOyBfbTIrKykge1xuICAgICAgICAvLyByb3dcbiAgICAgICAgaWYgKG4gPT09IGogJiYgX20yICE9PSBqICsgMSkge1xuICAgICAgICAgIEFbX20yXVtuXSA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgQVtfbTJdW25dID0gdltfbTIgLSBqIC0gMV0gLSBzY2FsZXIgKiB1W19tMiAtIGogLSAxXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gLy8gdXBkYXRlIHRoZSBtYXRyaXgsIG11bHRpcGx5IFAgZnJvbSByaWdodFxuXG5cbiAgICBmb3IgKHZhciBfbTMgPSAwOyBfbTMgPCBzaXplOyBfbTMrKykge1xuICAgICAgLy8gcm93XG4gICAgICB2YXIgX3YgPSBuZXcgQXJyYXkoc2l6ZSAtIGogLSAxKTtcblxuICAgICAgZm9yICh2YXIgX24gPSBqICsgMTsgX24gPCBzaXplOyBfbisrKSB7XG4gICAgICAgIF92W19uIC0gaiAtIDFdID0gQVtfbTNdW19uXTtcbiAgICAgIH1cblxuICAgICAgdmFyIF9zY2FsZXIgPSAwO1xuXG4gICAgICBmb3IgKHZhciBfbjIgPSAwOyBfbjIgPCBfdi5sZW5ndGg7IF9uMisrKSB7XG4gICAgICAgIF9zY2FsZXIgKz0gX3ZbX24yXSAqIHVbX24yXTtcbiAgICAgIH1cblxuICAgICAgX3NjYWxlciAqPSAyO1xuXG4gICAgICBmb3IgKHZhciBfbjMgPSBqICsgMTsgX24zIDwgc2l6ZTsgX24zKyspIHtcbiAgICAgICAgLy8gY29sdW1uXG4gICAgICAgIEFbX20zXVtfbjNdID0gX3ZbX24zIC0gaiAtIDFdIC0gX3NjYWxlciAqIHVbX24zIC0gaiAtIDFdO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBIZXNzZW5iZXJnUVIoSCwgZGlnaXQpIHtcbiAgdmFyIHNpemUgPSBILmxlbmd0aDtcbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBkaWdpdCkgKiAyKTtcbiAgdmFyIHNpbmNvcyA9IG5ldyBBcnJheShzaXplIC0gMSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplIC0gMTsgaSsrKSB7XG4gICAgdmFyIGEgPSBIW2ldW2ldO1xuICAgIHZhciBjID0gSFtpICsgMV1baV07XG4gICAgdmFyIG5vcm0gPSBNYXRoLnNxcnQoTWF0aC5wb3coYSwgMikgKyBNYXRoLnBvdyhjLCAyKSk7XG5cbiAgICBpZiAobm9ybSA8IEVQU0lMT04pIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBjb3MgPSBhIC8gbm9ybTtcbiAgICB2YXIgc2luID0gYyAqIC0xIC8gbm9ybTtcbiAgICBzaW5jb3NbaV0gPSBbc2luLCBjb3NdO1xuICAgIHZhciByb3cxID0gbmV3IEFycmF5KHNpemUgLSBpKTtcbiAgICB2YXIgcm93MiA9IG5ldyBBcnJheShzaXplIC0gaSk7XG5cbiAgICBmb3IgKHZhciBqID0gaTsgaiA8IHNpemU7IGorKykge1xuICAgICAgcm93MVtqIC0gaV0gPSBIW2ldW2pdO1xuICAgICAgcm93MltqIC0gaV0gPSBIW2kgKyAxXVtqXTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBfajIgPSBpOyBfajIgPCBzaXplOyBfajIrKykge1xuICAgICAgSFtpXVtfajJdID0gY29zICogcm93MVtfajIgLSBpXSArIHNpbiAqIC0xICogcm93MltfajIgLSBpXTtcblxuICAgICAgaWYgKGkgPT09IF9qMikge1xuICAgICAgICBIW2kgKyAxXVtfajJdID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIEhbaSArIDFdW19qMl0gPSBzaW4gKiByb3cxW19qMiAtIGldICsgY29zICogcm93MltfajIgLSBpXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBfajMgPSAwOyBfajMgPCBzaXplIC0gMTsgX2ozKyspIHtcbiAgICBpZiAoIXNpbmNvc1tfajNdKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgX3NpbmNvcyRfaiA9IF9zbGljZWRUb0FycmF5KHNpbmNvc1tfajNdLCAyKSxcbiAgICAgICAgX3NpbiA9IF9zaW5jb3MkX2pbMF0sXG4gICAgICAgIF9jb3MgPSBfc2luY29zJF9qWzFdO1xuXG4gICAgdmFyIGNvbDEgPSBuZXcgQXJyYXkoX2ozICsgMik7XG4gICAgdmFyIGNvbDIgPSBuZXcgQXJyYXkoX2ozICsgMik7XG5cbiAgICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPD0gX2ozICsgMTsgX2kzKyspIHtcbiAgICAgIGNvbDFbX2kzXSA9IEhbX2kzXVtfajNdO1xuICAgICAgY29sMltfaTNdID0gSFtfaTNdW19qMyArIDFdO1xuICAgIH1cblxuICAgIGZvciAodmFyIF9pNCA9IDA7IF9pNCA8PSBfajMgKyAxOyBfaTQrKykge1xuICAgICAgSFtfaTRdW19qM10gPSBjb2wxW19pNF0gKiBfY29zIC0gY29sMltfaTRdICogX3NpbjtcbiAgICAgIEhbX2k0XVtfajMgKyAxXSA9IGNvbDFbX2k0XSAqIF9zaW4gKyBjb2wyW19pNF0gKiBfY29zO1xuICAgIH1cbiAgfVxufSAvLyBmaW5kIHRoZSBlaWdlbnZhbHVlcyBvZiAyeDIgbWF0cml4XG5cblxuZnVuY3Rpb24gc2l6ZTJFaWdlbnZhbHVlcyhlMTEsIGUxMiwgZTIxLCBlMjIpIHtcbiAgdmFyIGIgPSAoZTExICsgZTIyKSAqIC0xO1xuICB2YXIgYyA9IGUxMSAqIGUyMiAtIGUyMSAqIGUxMjtcbiAgdmFyIGRlbHRhID0gTWF0aC5wb3coYiwgMikgLSA0ICogYztcbiAgdmFyIHJlMTtcbiAgdmFyIGltMTtcbiAgdmFyIHJlMjtcbiAgdmFyIGltMjtcblxuICBpZiAoZGVsdGEgPj0gMCkge1xuICAgIGltMSA9IDA7XG4gICAgaW0yID0gMDtcblxuICAgIGlmIChiID49IDApIHtcbiAgICAgIHJlMSA9IChiICogLTEgLSBNYXRoLnNxcnQoZGVsdGEpKSAvIDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlMSA9IChiICogLTEgKyBNYXRoLnNxcnQoZGVsdGEpKSAvIDI7XG4gICAgfVxuXG4gICAgcmUyID0gYyAvIHJlMTtcbiAgfSBlbHNlIHtcbiAgICByZTEgPSAtYiAvIDI7XG4gICAgcmUyID0gcmUxO1xuICAgIGltMSA9IE1hdGguc3FydChkZWx0YSAqIC0xKSAvIDI7XG4gICAgaW0yID0gaW0xICogLTE7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1ldHJpYzogTWF0aC5zcXJ0KE1hdGgucG93KHJlMSwgMikgKyBNYXRoLnBvdyhpbTEsIDIpKSxcbiAgICBlaWdlbjE6IHtcbiAgICAgIHJlOiByZTEsXG4gICAgICBpbTogaW0xXG4gICAgfSxcbiAgICBlaWdlbjI6IHtcbiAgICAgIHJlOiByZTIsXG4gICAgICBpbTogaW0yXG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVpZ2VudmFsdWVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgTWF0cml4ID0gcmVxdWlyZSgnLi4vLi4nKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX1BfTk9STSA9IF9yZXF1aXJlLklOVkFMSURfUF9OT1JNO1xuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIE1hdHJpeCBub3JtIG9mIGFueSBNYXRyaXggd2l0aCByZXNwZWN0IHRvIHRoZSBjaG9pY2Ugb2Ygbm9ybS48YnI+PGJyPlxyXG4gKiBcclxuICogMS1ub3JtOiBNYXhpbXVtIGFic29sdXRlIGNvbHVtbiBzdW0gb2YgdGhlIE1hdHJpeC48YnI+XHJcbiAqIDItbm9ybTogVGhlIGxhcmdlc3Qgc2luZ3VsYXIgdmFsdWUgb2YgTWF0cml4Ljxicj5cclxuICogSW5maW5pdHktbm9ybTogTWF4aW11bSBhYnNvbHV0ZSByb3cgc3VtIG9mIHRoZSBNYXRyaXguPGJyPlxyXG4gKiBGcm9iZW5pdXMtbm9ybTogRXVjbGlkZWFuIG5vcm0gaW52bG92aW5nIGFsbCBlbnRyaWVzLjxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgbm9ybXMgYXJlIG5vdCBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7KDF8MnxJbmZpbml0eXwnRicpfSBwIC0gVGhlIGNob2ljZSBvZiBNYXRyaXggbm9ybVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbm9ybSBvZiB0aGUgTWF0cml4LlxyXG4gKi9cblxuXG5mdW5jdGlvbiBub3JtKCkge1xuICB2YXIgcCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogMjtcblxuICB2YXIgX3RoaXMkc2l6ZSA9IHRoaXMuc2l6ZSgpLFxuICAgICAgX3RoaXMkc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfdGhpcyRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF90aGlzJHNpemUyWzBdLFxuICAgICAgY29sID0gX3RoaXMkc2l6ZTJbMV07XG5cbiAgaWYgKHAgIT09IDEgJiYgcCAhPT0gMiAmJiBwICE9PSBJbmZpbml0eSAmJiBwICE9PSAnRicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9QX05PUk0pO1xuICB9XG5cbiAgdmFyIG1hdHJpeCA9IHRoaXMuX21hdHJpeDtcbiAgdmFyIHJlc3VsdCA9IDA7XG5cbiAgaWYgKHAgPT09IDEpIHtcbiAgICAvLyBtYXggb2YgY29sdW1uIHN1bVxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29sOyBqKyspIHtcbiAgICAgIHZhciBjb2x1bW5TdW0gPSAwO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgICAgIGNvbHVtblN1bSArPSBNYXRoLmFicyhtYXRyaXhbaV1bal0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29sdW1uU3VtID4gcmVzdWx0KSB7XG4gICAgICAgIHJlc3VsdCA9IGNvbHVtblN1bTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9IC8vIGxhcmdlc3Qgc2luZ3VsYXIgdmFsdWVcblxuXG4gIGlmIChwID09PSAyKSB7XG4gICAgdmFyIHRyYW5zcG9zZSA9IE1hdHJpeC50cmFuc3Bvc2UodGhpcyk7XG4gICAgdmFyIE0gPSBNYXRyaXgubXVsdGlwbHkodHJhbnNwb3NlLCB0aGlzKTtcbiAgICB2YXIgZWlnZW52YWx1ZXMgPSBNLmVpZ2VudmFsdWVzKCk7XG5cbiAgICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBlaWdlbnZhbHVlcy5sZW5ndGg7IF9pMisrKSB7XG4gICAgICB2YXIgdmFsdWUgPSBlaWdlbnZhbHVlc1tfaTJdLmdldE1vZHVsdXMoKTtcblxuICAgICAgaWYgKHZhbHVlID4gcmVzdWx0KSB7XG4gICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBNYXRoLnNxcnQocmVzdWx0KTtcbiAgfVxuXG4gIGlmIChwID09PSBJbmZpbml0eSkge1xuICAgIC8vIG1heCBvZiByb3cgc3VtXG4gICAgZm9yICh2YXIgX2kzID0gMDsgX2kzIDwgcm93OyBfaTMrKykge1xuICAgICAgdmFyIHJvd1N1bSA9IDA7XG5cbiAgICAgIGZvciAodmFyIF9qID0gMDsgX2ogPCBjb2w7IF9qKyspIHtcbiAgICAgICAgcm93U3VtICs9IE1hdGguYWJzKG1hdHJpeFtfaTNdW19qXSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyb3dTdW0gPiByZXN1bHQpIHtcbiAgICAgICAgcmVzdWx0ID0gcm93U3VtO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0gLy8gRlxuXG5cbiAgZm9yICh2YXIgX2k0ID0gMDsgX2k0IDwgcm93OyBfaTQrKykge1xuICAgIGZvciAodmFyIF9qMiA9IDA7IF9qMiA8IGNvbDsgX2oyKyspIHtcbiAgICAgIHJlc3VsdCArPSBNYXRoLnBvdyhtYXRyaXhbX2k0XVtfajJdLCAyKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gTWF0aC5zcXJ0KHJlc3VsdCk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gbm9ybTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIG51bGxpdHkgb2YgYW55IE1hdHJpeCwgd2hpY2ggaXMgdGhlIGRpbWVuc2lvblxyXG4gKiBvZiB0aGUgbnVsbHNwYWNlLjxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgbnVsbGl0eSBpcyBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBudWxsaXR5IG9mIHRoZSBtYXRyaXhcclxuICovXG5mdW5jdGlvbiBudWxsaXR5KCkge1xuICBpZiAodGhpcy5fbnVsbGl0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX251bGxpdHk7XG4gIH1cblxuICB2YXIgY29sID0gdGhpcy5zaXplKClbMV07XG4gIHZhciByYW5rID0gdGhpcy5yYW5rKCk7XG4gIHRoaXMuX251bGxpdHkgPSBjb2wgLSByYW5rO1xuICByZXR1cm4gdGhpcy5fbnVsbGl0eTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBudWxsaXR5OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgTWF0cml4ID0gcmVxdWlyZSgnLi4vLi4nKTtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSByYW5rIG9mIGFueSBNYXRyaXgsXHJcbiAqIHdoaWNoIGlzIHRoZSBkaW1lbnNpb24gb2YgdGhlIHJvdyBzcGFjZS48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIHJhbmsgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgcmFuayBvZiB0aGUgTWF0cml4XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIHJhbmsoKSB7XG4gIGlmICh0aGlzLl9yYW5rICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5fcmFuaztcbiAgfVxuXG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgdGhpcy5fZGlnaXQpICogMik7XG4gIHZhciBSID0gTWF0cml4LlFSKHRoaXMpWzFdO1xuICB2YXIgbWF0cml4UiA9IFIuX21hdHJpeDtcblxuICB2YXIgX1Ikc2l6ZSA9IFIuc2l6ZSgpLFxuICAgICAgX1Ikc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfUiRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9SJHNpemUyWzBdLFxuICAgICAgY29sID0gX1Ikc2l6ZTJbMV07XG5cbiAgaWYgKHJvdyA9PT0gMCkge1xuICAgIHRoaXMuX3JhbmsgPSAxO1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgdmFyIHJrID0gMDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IGk7IGogPCBjb2w7IGorKykge1xuICAgICAgaWYgKE1hdGguYWJzKG1hdHJpeFJbaV1bal0pID49IEVQU0lMT04pIHtcbiAgICAgICAgcmsrKztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5fcmFuayA9IHJrO1xuICByZXR1cm4gcms7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gcmFuazsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIHNpemUgb2YgYW55IE1hdHJpeCxcclxuICogd2hpY2ggaXMgaW4gdGhlIGZvcm0gb2YgW3JvdywgY29sdW1uXS48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIHNpemUgb2YgTWF0cml4IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge251bWJlcltdfSBUaGUgbnVtYmVyIG9mIHJvd3MgYW5kIGNvbHVtbnMgb2YgYSBNYXRyaXhcclxuICovXG5mdW5jdGlvbiBzaXplKCkge1xuICBpZiAodGhpcy5fc2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gIH1cblxuICB2YXIgQSA9IHRoaXMuX21hdHJpeDtcblxuICBpZiAoQS5sZW5ndGggPT09IDApIHtcbiAgICB0aGlzLl9zaXplID0gWzAsIDBdO1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xuICB9XG5cbiAgdGhpcy5fc2l6ZSA9IFtBLmxlbmd0aCwgQVswXS5sZW5ndGhdO1xuICByZXR1cm4gdGhpcy5fc2l6ZTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBzaXplOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfU1FVQVJFX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfU1FVQVJFX01BVFJJWDtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSB0cmFjZSBvZiBhbnkgc3F1YXJlIE1hdHJpeCxcclxuICogd2hpY2ggaXMgdGhlIHN1bSBvZiBhbGwgZW50cmllcyBvbiB0aGUgbWFpbiBkaWFnb25hbC48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIHRyYWNlIGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge251bWJlcn0gVGhlIHRyYWNlIG9mIHRoZSBzcXVhcmUgTWF0cml4LlxyXG4gKi9cblxuXG5mdW5jdGlvbiB0cmFjZSgpIHtcbiAgdmFyIGlzU3F1YXJlID0gdGhpcy5faXNTcXVhcmUgIT09IHVuZGVmaW5lZCA/IHRoaXMuX2lzU3F1YXJlIDogdGhpcy5pc1NxdWFyZSgpO1xuXG4gIGlmICghaXNTcXVhcmUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9TUVVBUkVfTUFUUklYKTtcbiAgfVxuXG4gIGlmICh0aGlzLl90cmFjZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyYWNlO1xuICB9XG5cbiAgdmFyIEEgPSB0aGlzLl9tYXRyaXg7XG4gIHZhciBzaXplID0gQS5sZW5ndGg7XG4gIHZhciB0ciA9IDA7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICB0ciArPSBBW2ldW2ldO1xuICB9XG5cbiAgdGhpcy5fdHJhY2UgPSB0cjtcbiAgcmV0dXJuIHRyO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IHRyYWNlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgTWF0cml4IGlzIGRpYWdvbmFsIG9yIG5vdC48YnI+PGJyPlxyXG4gKiBcclxuICogRGlhZ29uYWwgTWF0cml4IGlzIGEgTWF0cml4IGluIHdoaWNoIHRoZSBlbnRyaWVzIG91dHNpZGUgdGhlIG1haW4gZGlhZ29uYWxcclxuICogYXJlIGFsbCB6ZXJvLiBOb3RlIHRoYXQgdGhlIHRlcm0gZGlhZ29uYWwgcmVmZXJzIHRvIHJlY3Rhbmd1bGFyIGRpYWdvbmFsLjxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgcmVzdWx0IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHBhcmFtIHtudW1iZXJ9IFtkaWdpdD04XSAtIE51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHNcclxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgcnVlIGlmIHRoZSBNYXRyaXggaXMgZGlhZ29uYWwgTWF0cml4XHJcbiAqL1xuZnVuY3Rpb24gaXNEaWFnb25hbCgpIHtcbiAgdmFyIGRpZ2l0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0aGlzLl9kaWdpdDtcblxuICBpZiAodGhpcy5faXNEaWFnb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzRGlhZ29uYWw7XG4gIH1cblxuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuICB2YXIgQSA9IHRoaXMuX21hdHJpeDtcblxuICB2YXIgX3RoaXMkc2l6ZSA9IHRoaXMuc2l6ZSgpLFxuICAgICAgX3RoaXMkc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfdGhpcyRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF90aGlzJHNpemUyWzBdLFxuICAgICAgY29sID0gX3RoaXMkc2l6ZTJbMV07XG5cbiAgaWYgKHJvdyA9PT0gMCkge1xuICAgIHRoaXMuX2lzRGlhZ29uYWwgPSB0cnVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3c7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29sOyBqKyspIHtcbiAgICAgIGlmIChpICE9PSBqICYmIE1hdGguYWJzKEFbaV1bal0pID49IEVQU0lMT04pIHtcbiAgICAgICAgdGhpcy5pc0RpYWdvbmFsID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLl9pc0RpYWdvbmFsID0gdHJ1ZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gaXNEaWFnb25hbDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxuLyoqXHJcbiAqIERldGVybWluZXMgd2hldGhlciBhIE1hdHJpeCBpcyBsb3dlciB0cmlhbmd1bGFyIE1hdHJpeCBvciBub3QuPGJyPjxicj5cclxuICogXHJcbiAqIExvd2VyIHRyaWFuZ3VsYXIgTWF0cml4IGlzIGEgTWF0cml4IGluIHdoaWNoIGFsbCB0aGUgZW50cmllc1xyXG4gKiBhYm92ZSB0aGUgbWFpbiBkaWFnb25hbCBhcmUgemVyby4gTm90ZSB0aGF0IGl0IGNhbiBiZSBhcHBsaWVkXHJcbiAqIHRvIGFueSBub24tc3F1YXJlIE1hdHJpeC48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIHJlc3VsdCBpcyBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbZGlnaXQ9OF0gLSBOdW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIE1hdHJpeCBpcyBsb3dlciB0cmlhbmd1bGFyXHJcbiAqL1xuZnVuY3Rpb24gaXNMb3dlclRyaWFuZ3VsYXIoKSB7XG4gIHZhciBkaWdpdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdGhpcy5fZGlnaXQ7XG5cbiAgaWYgKHRoaXMuX2lzTG93ZXJUcmlhbmd1bGFyICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5faXNMb3dlclRyaWFuZ3VsYXI7XG4gIH1cblxuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuICB2YXIgQSA9IHRoaXMuX21hdHJpeDtcblxuICB2YXIgX3RoaXMkc2l6ZSA9IHRoaXMuc2l6ZSgpLFxuICAgICAgX3RoaXMkc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfdGhpcyRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF90aGlzJHNpemUyWzBdLFxuICAgICAgY29sID0gX3RoaXMkc2l6ZTJbMV07XG5cbiAgaWYgKHJvdyA9PT0gMCkge1xuICAgIC8vIFtdXG4gICAgdGhpcy5faXNMb3dlclRyaWFuZ3VsYXIgPSB0cnVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3c7IGkrKykge1xuICAgIGZvciAodmFyIGogPSBpICsgMTsgaiA8IGNvbDsgaisrKSB7XG4gICAgICBpZiAoTWF0aC5hYnMoQVtpXVtqXSkgPj0gRVBTSUxPTikge1xuICAgICAgICB0aGlzLl9pc0xvd2VyVHJpYW5ndWxhciA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5faXNMb3dlclRyaWFuZ3VsYXIgPSB0cnVlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBpc0xvd2VyVHJpYW5ndWxhcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIERldGVybWluZXMgd2hldGhlciBhIHNxdWFyZSBNYXRyaXggaXMgb3J0aG9nb25hbCBvciBub3QuPGJyPjxicj5cclxuICogXHJcbiAqIE9ydGhvZ29uYWwgTWF0cml4IGlzIGEgTWF0cml4IGluIHdoaWNoIGFsbCByb3dzIGFuZCBjb2x1bW5zIGFyZVxyXG4gKiBvcnRob25vcm1hbCB2ZWN0b3JzLjxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgcmVzdWx0IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHBhcmFtIHtudW1iZXJ9IFtkaWdpdD04XSAtIE51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHNcclxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgc3F1YXJlIE1hdHJpeCBpcyBvcnRob2dvbmFsXHJcbiAqL1xuZnVuY3Rpb24gaXNPcnRob2dvbmFsKCkge1xuICB2YXIgZGlnaXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHRoaXMuX2RpZ2l0O1xuXG4gIGlmICh0aGlzLl9pc09ydGhvZ29uYWwgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLl9pc09ydGhvZ29uYWw7XG4gIH1cblxuICBpZiAoIXRoaXMuaXNTcXVhcmUoKSkge1xuICAgIHRoaXMuX2lzT3J0aG9nb25hbCA9IGZhbHNlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBBID0gdGhpcy5fbWF0cml4O1xuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuICB2YXIgc2l6ZSA9IEEubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IGk7IGogPCBzaXplOyBqKyspIHtcbiAgICAgIHZhciBlbnRyeSA9IDA7XG5cbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgc2l6ZTsgaysrKSB7XG4gICAgICAgIGVudHJ5ICs9IEFbaV1ba10gKiBBW2pdW2tdO1xuICAgICAgfVxuXG4gICAgICBpZiAoaSA9PT0gaiAmJiBNYXRoLmFicyhlbnRyeSAtIDEpID49IEVQU0lMT04pIHtcbiAgICAgICAgdGhpcy5faXNPcnRob2dvbmFsID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGkgIT09IGogJiYgTWF0aC5hYnMoZW50cnkpID49IEVQU0lMT04pIHtcbiAgICAgICAgdGhpcy5faXNPcnRob2dvbmFsID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLl9pc09ydGhvZ29uYWwgPSB0cnVlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBpc09ydGhvZ29uYWw7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBzcXVhcmUgTWF0cml4IGlzIHNrZXcgc3ltbWV0cmljIG9yIG5vdC48YnI+PGJyPlxyXG4gKiBcclxuICogU2tldyBzeW1tZXRyaWMgTWF0cml4IGlzIGEgc3F1YXJlIE1hdHJpeCB3aG9zZSB0cmFuc3Bvc2UgZXF1YWxzIGl0cyBuZWdhdGl2ZS48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIHJlc3VsdCBpcyBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbZGlnaXQ9OF0gLSBOdW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIHNxdWFyZSBNYXRyaXggaXMgc2tldyBzeW1tZXRyaWNcclxuICovXG5mdW5jdGlvbiBpc1NrZXdTeW1tZXRyaWMoKSB7XG4gIHZhciBkaWdpdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdGhpcy5fZGlnaXQ7XG5cbiAgaWYgKHRoaXMuX2lzU2tld1N5bW1ldHJpYyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzU2tld1N5bW1ldHJpYztcbiAgfVxuXG4gIGlmICghdGhpcy5pc1NxdWFyZSgpKSB7XG4gICAgdGhpcy5faXNTa2V3U3ltbWV0cmljID0gZmFsc2U7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIEEgPSB0aGlzLl9tYXRyaXg7XG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgZGlnaXQpICogMik7XG4gIHZhciBzaXplID0gQS5sZW5ndGg7XG5cbiAgaWYgKHNpemUgPT09IDApIHtcbiAgICB0aGlzLl9pc1NrZXdTeW1tZXRyaWMgPSB0cnVlO1xuICAgIHJldHVybiB0cnVlOyAvLyBbXVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGk7IGorKykge1xuICAgICAgaWYgKE1hdGguYWJzKEFbaV1bal0gKyBBW2pdW2ldKSA+PSBFUFNJTE9OKSB7XG4gICAgICAgIHRoaXMuX2lzU2tld1N5bW1ldHJpYyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5faXNTa2V3U3ltbWV0cmljID0gdHJ1ZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gaXNTa2V3U3ltbWV0cmljOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgTWF0cml4IGlzIHNxdWFyZSBvciBub3QuPGJyPjxicj5cclxuICogXHJcbiAqIFNxdWFyZSBNYXRyaXggaXMgYSBNYXRyaXggd2l0aCBzYW1lIG51bWJlciBvZiByb3dzIGFuZCBjb2x1bW5zLjxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgcmVzdWx0IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgTWF0cml4IGlzIHNxdWFyZVxyXG4gKi9cbmZ1bmN0aW9uIGlzU3F1YXJlKCkge1xuICBpZiAodGhpcy5faXNTcXVhcmUgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLl9pc1NxdWFyZTtcbiAgfVxuXG4gIHZhciBBID0gdGhpcy5fbWF0cml4O1xuXG4gIGlmIChBLmxlbmd0aCA9PT0gMCkge1xuICAgIC8vIDB4MCBtYXRyaXhcbiAgICB0aGlzLl9pc1NxdWFyZSA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICB0aGlzLl9pc1NxdWFyZSA9IEEubGVuZ3RoID09PSBBWzBdLmxlbmd0aDtcbiAgcmV0dXJuIHRoaXMuX2lzU3F1YXJlO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGlzU3F1YXJlOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgc3F1YXJlIE1hdHJpeCBpcyBzeW1tZXRyaWMgb3Igbm90Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBTeW1tZXRyaWMgTWF0cml4IGlzIGEgc3F1YXJlIE1hdHJpeCB0aGF0IGlzIGVxdWFsIHRvIGl0cyB0cmFuc3Bvc2UuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSByZXN1bHQgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gW2RpZ2l0PThdIC0gTnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBzcXVhcmUgTWF0cml4IGlzIHN5bW1ldHJpY1xyXG4gKi9cbmZ1bmN0aW9uIGlzU3ltbWV0cmljKCkge1xuICB2YXIgZGlnaXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHRoaXMuX2RpZ2l0O1xuXG4gIGlmICh0aGlzLl9pc1N5bW1ldHJpYyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzU3ltbWV0cmljO1xuICB9XG5cbiAgaWYgKCF0aGlzLmlzU3F1YXJlKCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgQSA9IHRoaXMuX21hdHJpeDtcbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBkaWdpdCkgKiAyKTtcbiAgdmFyIHNpemUgPSBBLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDw9IGk7IGorKykge1xuICAgICAgaWYgKE1hdGguYWJzKEFbaV1bal0gLSBBW2pdW2ldKSA+PSBFUFNJTE9OKSB7XG4gICAgICAgIHRoaXMuX2lzU3ltbWV0cmljID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLl9pc1N5bW1ldHJpYyA9IHRydWU7XG4gIHJldHVybiB0cnVlO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGlzU3ltbWV0cmljOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgTWF0cml4IGlzIHVwcGVyIHRyaWFuZ3VsYXIgTWF0cml4IG9yIG5vdC48YnI+PGJyPlxyXG4gKiBcclxuICogVXBwZXIgdHJpYW5ndWxhciBNYXRyaXggaXMgYSBNYXRyaXggaW4gd2hpY2ggYWxsIHRoZSBlbnRyaWVzIGJlbG93IHRoZVxyXG4gKiBtYWluIGRpYWdvbmFsIGFyZSB6ZXJvLiBOb3RlIHRoYXQgaXQgY2FuIGJlIGFwcGxpZWQgdG8gYW55IG5vbi1zcXVhcmUgTWF0cml4Ljxicj48YnI+XHJcbiAqICBcclxuICogVGhlIHJlc3VsdCBpcyBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbZGlnaXQ9OF0gLSBOdW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIE1hdHJpeCBpcyB1cHBlciB0cmlhbmd1bGFyXHJcbiAqL1xuZnVuY3Rpb24gaXNVcHBlclRyaWFuZ3VsYXIoKSB7XG4gIHZhciBkaWdpdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdGhpcy5fZGlnaXQ7XG5cbiAgaWYgKHRoaXMuX2lzVXBwZXJUcmlhbmd1bGFyICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5faXNVcHBlclRyaWFuZ3VsYXI7XG4gIH1cblxuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuICB2YXIgQSA9IHRoaXMuX21hdHJpeDtcblxuICB2YXIgX3RoaXMkc2l6ZSA9IHRoaXMuc2l6ZSgpLFxuICAgICAgX3RoaXMkc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfdGhpcyRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF90aGlzJHNpemUyWzBdLFxuICAgICAgY29sID0gX3RoaXMkc2l6ZTJbMV07XG5cbiAgaWYgKHJvdyA9PT0gMCkge1xuICAgIC8vIFtdXG4gICAgdGhpcy5faXNVcHBlclRyaWFuZ3VsYXIgPSB0cnVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3c7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29sOyBqKyspIHtcbiAgICAgIGlmIChpIDw9IGopIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChNYXRoLmFicyhBW2ldW2pdKSA+PSBFUFNJTE9OKSB7XG4gICAgICAgIHRoaXMuX2lzVXBwZXJUcmlhbmd1bGFyID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLl9pc1VwcGVyVHJpYW5ndWxhciA9IHRydWU7XG4gIHJldHVybiB0cnVlO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGlzVXBwZXJUcmlhbmd1bGFyOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogQ3JlYXRlcyBhIGNvcHkgb2YgTWF0cml4LiBOb3RlIHRoYXQgaXQgcmVzZXRzIHRoZSBjYWNoZWQgZGF0YS5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IE1hdHJpeFxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBDb3B5IG9mIEFcclxuICovXG5cblxuZnVuY3Rpb24gY2xvbmUoQSkge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIGNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciBtYXRyaXggPSBBLl9tYXRyaXg7XG4gIHJldHVybiB0aGlzLmdlbmVyYXRlKHJvdywgY29sLCBmdW5jdGlvbiAoaSwgaikge1xuICAgIHJldHVybiBtYXRyaXhbaV1bal07XG4gIH0pO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGNsb25lOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfUk9XX0NPTCA9IF9yZXF1aXJlLklOVkFMSURfUk9XX0NPTCxcbiAgICBPVkVSRkxPV19DT0xVTU4gPSBfcmVxdWlyZS5PVkVSRkxPV19DT0xVTU4sXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWDtcbi8qKlxyXG4gKiBHZXRzIHRoZSBjb2x1bW4gb2YgYSBNYXRyaXggd2l0aCB2YWxpZCBpbmRleC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IE1hdHJpeFxyXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBBbnkgdmFsaWQgY29sdW1uIGluZGV4XHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IENvbHVtbiBvZiBBXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGNvbHVtbihBLCBpbmRleCkge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGluZGV4KSB8fCBpbmRleCA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9ST1dfQ09MKTtcbiAgfVxuXG4gIHZhciBfQSRzaXplID0gQS5zaXplKCksXG4gICAgICBfQSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9BJHNpemUsIDIpLFxuICAgICAgciA9IF9BJHNpemUyWzBdLFxuICAgICAgYyA9IF9BJHNpemUyWzFdO1xuXG4gIGlmIChpbmRleCA+PSBjKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKE9WRVJGTE9XX0NPTFVNTik7XG4gIH1cblxuICB2YXIgbWF0cml4ID0gQS5fbWF0cml4O1xuICByZXR1cm4gdGhpcy5nZW5lcmF0ZShyLCAxLCBmdW5jdGlvbiAoaSkge1xuICAgIHJldHVybiBtYXRyaXhbaV1baW5kZXhdO1xuICB9KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBjb2x1bW47IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBNYXRyaXggPSByZXF1aXJlKCcuLi8uLicpO1xuXG52YXIgaXNOdW1iZXIgPSByZXF1aXJlKCcuLi8uLi91dGlsL2lzTnVtYmVyJyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9BUlJBWSA9IF9yZXF1aXJlLklOVkFMSURfQVJSQVksXG4gICAgRVhQRUNURURfQVJSQVlfT0ZfTlVNQkVSU19PUl9NQVRSSUNFUyA9IF9yZXF1aXJlLkVYUEVDVEVEX0FSUkFZX09GX05VTUJFUlNfT1JfTUFUUklDRVMsXG4gICAgSU5WQUxJRF9TUVVBUkVfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9TUVVBUkVfTUFUUklYO1xuLyoqXHJcbiAqIEdlbmVyYXRlcyBkaWFnb25hbCBNYXRyaXggaWYgdGhlIGFyZ3VtZW50IGlzIGFuIGFycmF5IG9mIG51bWJlcnMsXHJcbiAqIGdlbmVyYXRlcyBibG9jayBkaWFnb25hbCBNYXRyaXggaWYgdGhlIGFyZ3VtZW50IGlzIGFuIGFycmF5IG9mIE1hdHJpY2VzLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHsobnVtYmVyW118TWF0cml4W10pfSB2YWx1ZXMgLSBBcnJheSBvZiBudW1iZXJzIG9yIE1hdHJpY2VzXHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IEJsb2NrIGRpYWdvbmFsIE1hdHJpeFxyXG4gKi9cblxuXG5mdW5jdGlvbiBkaWFnKHZhbHVlcykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWVzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX0FSUkFZKTtcbiAgfVxuXG4gIHZhciBhcmdzTnVtID0gdmFsdWVzLmxlbmd0aDtcbiAgdmFyIHZhcmlhbnQ7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzTnVtOyBpKyspIHtcbiAgICB2YXIgZW50cnkgPSB2YWx1ZXNbaV07XG5cbiAgICBpZiAoIWlzTnVtYmVyKGVudHJ5KSAmJiAhKGVudHJ5IGluc3RhbmNlb2YgTWF0cml4KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEVYUEVDVEVEX0FSUkFZX09GX05VTUJFUlNfT1JfTUFUUklDRVMpO1xuICAgIH1cblxuICAgIGlmIChpc051bWJlcihlbnRyeSkpIHtcbiAgICAgIGlmICghdmFyaWFudCkge1xuICAgICAgICB2YXJpYW50ID0gJ251bWJlcic7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodmFyaWFudCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVYUEVDVEVEX0FSUkFZX09GX05VTUJFUlNfT1JfTUFUUklDRVMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWVudHJ5LmlzU3F1YXJlKCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfU1FVQVJFX01BVFJJWCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdmFyaWFudCkge1xuICAgICAgICB2YXJpYW50ID0gJ3NxdWFyZSc7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodmFyaWFudCAhPT0gJ3NxdWFyZScpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVYUEVDVEVEX0FSUkFZX09GX05VTUJFUlNfT1JfTUFUUklDRVMpO1xuICAgICAgfVxuICAgIH1cbiAgfSAvLyBIRVJFOiB2YXJpYW50IHNob3VsZCBiZSBlaXRoZXIgJ251bWJlcicgb3IgJ3NxdWFyZSdcblxuXG4gIGlmICh2YXJpYW50ID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBNYXRyaXguZ2VuZXJhdGUoYXJnc051bSwgYXJnc051bSwgZnVuY3Rpb24gKGksIGopIHtcbiAgICAgIGlmIChpID09PSBqKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZXNbaV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAwO1xuICAgIH0pO1xuICB9IC8vIEd1YXJhbnRlZWQgdGhhdCBbdmFsdWVzXSBpcyBhIGxpc3Qgb2Ygc3F1YXJlIG1hdHJpY2VzXG5cblxuICB2YXIgc2l6ZSA9IDA7XG4gIHZhciB0ZW1wID0gbmV3IEFycmF5KGFyZ3NOdW0pO1xuXG4gIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmdzTnVtOyBfaSsrKSB7XG4gICAgdmFyIF9sZW4gPSB2YWx1ZXNbX2ldLnNpemUoKVswXTtcblxuICAgIHNpemUgKz0gX2xlbjtcbiAgICB0ZW1wW19pXSA9IF9sZW47XG4gIH1cblxuICB2YXIgaWR4ID0gMDtcbiAgdmFyIHN0YXJ0ID0gMDtcbiAgdmFyIGxlbiA9IHRlbXBbaWR4XTtcbiAgcmV0dXJuIE1hdHJpeC5nZW5lcmF0ZShzaXplLCBzaXplLCBmdW5jdGlvbiAoaSwgaikge1xuICAgIGlmIChpIC0gc3RhcnQgPT09IGxlbiAmJiBqIC0gc3RhcnQgPT09IGxlbikge1xuICAgICAgc3RhcnQgKz0gbGVuO1xuICAgICAgaWR4Kys7XG4gICAgfVxuXG4gICAgdmFyIGl0aCA9IGkgLSBzdGFydDsgLy8gaXRoIDwgMCBpZiBiZWxvdyBtYWluIGRpYWdvbmFsXG5cbiAgICB2YXIganRoID0gaiAtIHN0YXJ0OyAvLyBqdGggPCAwIGlmIGFib3ZlIG1haW4gZGlhZ29uYWxcbiAgICAvLyBza2lwIDB4MCBtYXRyaWNlc1xuXG4gICAgbGVuID0gdGVtcFtpZHhdO1xuXG4gICAgd2hpbGUgKGxlbiA9PT0gMCkge1xuICAgICAgaWR4Kys7XG4gICAgICBsZW4gPSB0ZW1wW2lkeF07XG4gICAgfVxuXG4gICAgaWYgKGl0aCA8IGxlbiAmJiBpdGggPj0gMCAmJiBqdGggPCBsZW4gJiYganRoID49IDApIHtcbiAgICAgIHJldHVybiB2YWx1ZXNbaWR4XS5fbWF0cml4W2l0aF1banRoXTtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gZGlhZzsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYO1xuLyoqXHJcbiAqIFRoaXMgY2FsbGJhY2sgYXBwbGllcyBvbiBlYWNoIGVudHJ5IG9mIGEgTWF0cml4XHJcbiAqIEBjYWxsYmFjayBlbnRyeUNhbGxiYWNrXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbnRyeSAtIEVudHJ5IG9mIGEgTWF0cml4XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IE5ldyBlbnRyeSB2YWx1ZVxyXG4gKi9cblxuLyoqXHJcbiAqIEFwcGx5cyBhIGZ1bmN0aW9uIG92ZXIgZWFjaCBlbnRyeSBvZiBhIE1hdHJpeCBhbmQgcmV0dXJuc1xyXG4gKiBhIG5ldyBjb3B5IG9mIHRoZSBuZXcgTWF0cml4LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgTWF0cml4XHJcbiAqIEBwYXJhbSB7ZW50cnlDYWxsYmFja30gY2IgLSBDYWxsYmFjayBmdW5jdGlvbiB3aGljaCBhcHBsaWVzIG9uIGVhY2ggZW50cnkgb2YgQVxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBBIGNvcHkgb2YgbmV3IE1hdHJpeFxyXG4gKi9cblxuXG5mdW5jdGlvbiBlbGVtZW50d2lzZShBLCBjYikge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIGNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciBtYXRyaXggPSBBLl9tYXRyaXg7XG4gIHJldHVybiB0aGlzLmdlbmVyYXRlKHJvdywgY29sLCBmdW5jdGlvbiAoaSwgaikge1xuICAgIHJldHVybiBjYihtYXRyaXhbaV1bal0pO1xuICB9KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBlbGVtZW50d2lzZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX1JPV19DT0wgPSBfcmVxdWlyZS5JTlZBTElEX1JPV19DT0wsXG4gICAgT1ZFUkZMT1dfSU5ERVggPSBfcmVxdWlyZS5PVkVSRkxPV19JTkRFWDtcbi8qKlxyXG4gKiBHZXRzIHRoZSBlbnRyeSBvZiBhIE1hdHJpeC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHBhcmFtIHtudW1iZXJ9IHJvdyAtIEFueSB2YWxpZCByb3cgaW5kZXhcclxuICogQHBhcmFtIHtudW1iZXJ9IGNvbCAtIEFueSB2YWxpZCBjb2x1bW4gaW5kZXhcclxuICogQHJldHVybnMge251bWJlcn0gRW50cnkgb2YgdGhlIE1hdHJpeFxyXG4gKi9cblxuXG5mdW5jdGlvbiBlbnRyeShyb3csIGNvbCkge1xuICBpZiAoIU51bWJlci5pc0ludGVnZXIocm93KSB8fCByb3cgPCAwIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKGNvbCkgfHwgY29sIDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1JPV19DT0wpO1xuICB9XG5cbiAgdmFyIEEgPSB0aGlzLl9tYXRyaXg7XG5cbiAgdmFyIF90aGlzJHNpemUgPSB0aGlzLnNpemUoKSxcbiAgICAgIF90aGlzJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX3RoaXMkc2l6ZSwgMiksXG4gICAgICByID0gX3RoaXMkc2l6ZTJbMF0sXG4gICAgICBjID0gX3RoaXMkc2l6ZTJbMV07XG5cbiAgaWYgKHJvdyA+PSByIHx8IGNvbCA+PSBjKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKE9WRVJGTE9XX0lOREVYKTtcbiAgfVxuXG4gIHJldHVybiBBW3Jvd11bY29sXTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBlbnRyeTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGVtcHR5ID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9lbXB0eScpO1xuLyoqXHJcbiAqIFRoaXMgY2FsbGJhY2sgZ2VuZXJhdGVzIGVhY2ggZW50cnkgb2YgYSBNYXRyaXhcclxuICogQGNhbGxiYWNrIGdlbmVyYXRlQ2FsbGJhY2tcclxuICogQHBhcmFtIHtudW1iZXJ9IGkgLSBUaGUgaS10aCByb3cgb2YgTWF0cml4IFxyXG4gKiBAcGFyYW0ge251bWJlcn0gaiAtIFRoZSBqLXRoIGNvbHVtbiBvZiBNYXRyaXggXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IEVudHJ5IG9mIE1hdHJpeFxyXG4gKi9cblxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIE1hdHJpeCB3aGljaCBlbnRyaWVzIGFyZSB0aGUgcmV0dXJuZWQgdmFsdWUgb2YgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge251bWJlcn0gcm93IC0gTnVtYmVyIG9mIHJvd3Mgb2YgTWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2wgLSBOdW1iZXIgb2YgY29sdW1ucyBvZiBNYXRyaXhcclxuICogQHBhcmFtIHtnZW5lcmF0ZUNhbGxiYWNrfSBjYiAtIENhbGxiYWNrIGZ1bmN0aW9uIHdoaWNoIHRha2VzIHJvdyBhbmQgY29sdW1uIGFzIGFyZ3VtZW50c1xyXG4gKiBhbmQgZ2VuZXJhdGVzIHRoZSBjb3JyZXNwb25kaW5nIGVudHJ5XHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IC0gR2VuZXJhdGVkIE1hdHJpeFxyXG4gKi9cblxuXG5mdW5jdGlvbiBnZW5lcmF0ZShyb3csIGNvbCwgY2IpIHtcbiAgdmFyIG1hdHJpeCA9IGVtcHR5KHJvdywgY29sKTtcblxuICBpZiAocm93ID09PSAwIHx8IGNvbCA9PT0gMCkge1xuICAgIHJldHVybiBuZXcgdGhpcyhbXSk7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2w7IGorKykge1xuICAgICAgbWF0cml4W2ldW2pdID0gY2IoaSwgaik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKG1hdHJpeCk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWDtcbi8qKlxyXG4gKiBHZXRzIHRoZSBlbnRyaWVzIG9uIHRoZSBtYWluIGRpYWdvbmFsLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgTWF0cml4XHJcbiAqIEByZXR1cm5zIHtudW1iZXJbXX0gQXJyYXkgb2YgZW50cmllcyBvZiBBIG9uIHRoZSBtYWluIGRpYWdvbmFsXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGdldERpYWcoQSkge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIGNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciBzaXplID0gTWF0aC5taW4ocm93LCBjb2wpO1xuICB2YXIgbWF0cml4ID0gQS5fbWF0cml4O1xuICB2YXIgZGlhZ3MgPSBuZXcgQXJyYXkoc2l6ZSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBkaWFnc1tpXSA9IG1hdHJpeFtpXVtpXTtcbiAgfVxuXG4gIHJldHVybiBkaWFncztcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBnZXREaWFnOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogR2VuZXJhdGVzIGEgcmFuZG9tIE1hdHJpeC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSByb3cgLSBOdW1iZXIgb2Ygcm93cyBvZiBhIE1hdHJpeFxyXG4gKiBAcGFyYW0ge251bWJlcn0gY29sIC0gTnVtYmVyIG9mIGNvbHVtbnMgb2YgYSBNYXRyaXhcclxuICogQHBhcmFtIHtudW1iZXJ9IG1pbiAtIExvd2VyIGJvdW5kIG9mIGVhY2ggZW50cnlcclxuICogQHBhcmFtIHtudW1iZXJ9IG1heCAtIFVwcGVyIGJvdW5kIG9mIGVhY2ggZW50cnlcclxuICogQHBhcmFtIHtudW1iZXJ9IHRvRml4ZWQgLSBOdW1iZXIgb2YgZGVjaW1hbCBwbGFjZXNcclxuICogQHJldHVybnMge01hdHJpeH0gR2VuZXJhdGVkIHJhbmRvbSBNYXRyaXhcclxuICovXG5mdW5jdGlvbiBnZXRSYW5kb21NYXRyaXgocm93LCBjb2wpIHtcbiAgdmFyIG1pbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogMDtcbiAgdmFyIG1heCA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogMTtcbiAgdmFyIHRvRml4ZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gNCAmJiBhcmd1bWVudHNbNF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s0XSA6IDA7XG4gIHJldHVybiB0aGlzLmdlbmVyYXRlKHJvdywgY29sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUZsb2F0KChNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pLnRvRml4ZWQodG9GaXhlZCkpO1xuICB9KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBnZXRSYW5kb21NYXRyaXg7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBHZW5lcmF0ZXMgaWRlbnRpdHkgTWF0cml4IHdpdGggZ2l2ZW4gc2l6ZS5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIC0gVGhlIHNpemUgb2YgTWF0cml4XHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IElkZW50aXR5IE1hdHJpeFxyXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHNpemUpIHtcbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUoc2l6ZSwgc2l6ZSwgZnVuY3Rpb24gKGksIGopIHtcbiAgICBpZiAoaSA9PT0gaikge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH0pO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGlkZW50aXR5OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHR3byBNYXRyaWNlcyBhcmUgY29uc2lkZXJlZCBhcyBlcXVhbC48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIHRlc3QgY3JpdGVyaW9uIGlzIE1hdGguYWJzKHggLSB5KSA8IDEgLyAoMTAgKiogZGlnaXQgKiAyKS5cclxuICogRm9yIGRlZmF1bHQgdmFsdWUgNSwgaXQgc2hvdWxkIGJlIDVlLTUuXHJcbiAqIFRoYXQgbWVhbnMgaWYgdGhlIGRpZmZlcmVuY2Ugb2YgdHdvIG51bWJlcnMgaXMgbGVzcyB0aGFuIDVlLTUsXHJcbiAqIHRoZXkgYXJlIGNvbnNpZGVyZWQgYXMgc2FtZSB2YWx1ZS5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IE1hdHJpeFxyXG4gKiBAcGFyYW0ge01hdHJpeH0gQiAtIEFueSBNYXRyaXhcclxuICogQHBhcmFtIHtudW1iZXJ9IGRpZ2l0IC0gTnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHR3byBNYXRyaWNlcyBhcmUgY29uc2lkZXJlZCBhcyBzYW1lXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzRXF1YWwoQSwgQikge1xuICB2YXIgZGlnaXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IDU7XG5cbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpIHx8ICEoQiBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBfQSRzaXplID0gQS5zaXplKCksXG4gICAgICBfQSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9BJHNpemUsIDIpLFxuICAgICAgQXJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgQWNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciBfQiRzaXplID0gQi5zaXplKCksXG4gICAgICBfQiRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9CJHNpemUsIDIpLFxuICAgICAgQnJvdyA9IF9CJHNpemUyWzBdLFxuICAgICAgQmNvbCA9IF9CJHNpemUyWzFdO1xuXG4gIGlmIChBcm93ICE9PSBCcm93IHx8IEFjb2wgIT09IEJjb2wpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgRVBJU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBkaWdpdCkgKiAyKTtcbiAgdmFyIG1hdHJpeEEgPSBBLl9tYXRyaXg7XG4gIHZhciBtYXRyaXhCID0gQi5fbWF0cml4O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgQXJvdzsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBBY29sOyBqKyspIHtcbiAgICAgIGlmIChNYXRoLmFicyhtYXRyaXhBW2ldW2pdIC0gbWF0cml4QltpXVtqXSkgPj0gRVBJU0lMT04pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGlzRXF1YWw7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9ST1dfQ09MID0gX3JlcXVpcmUuSU5WQUxJRF9ST1dfQ09MLFxuICAgIE9WRVJGTE9XX1JPVyA9IF9yZXF1aXJlLk9WRVJGTE9XX1JPVyxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYO1xuLyoqXHJcbiAqIEdldHMgdGhlIHJvdyBvZiBhIE1hdHJpeCB3aXRoIHZhbGlkIGluZGV4LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgTWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIEFueSB2YWxpZCByb3cgaW5kZXhcclxuICogQHJldHVybnMge01hdHJpeH0gUm93IG9mIEFcclxuICovXG5cblxuZnVuY3Rpb24gcm93KEEsIGluZGV4KSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIU51bWJlci5pc0ludGVnZXIoaW5kZXgpIHx8IGluZGV4IDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1JPV19DT0wpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBjID0gX0Ekc2l6ZTJbMV07XG5cbiAgaWYgKGluZGV4ID49IHIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfUk9XKTtcbiAgfVxuXG4gIHZhciBtYXRyaXggPSBBLl9tYXRyaXg7XG4gIHJldHVybiB0aGlzLmdlbmVyYXRlKDEsIGMsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgcmV0dXJuIG1hdHJpeFtpbmRleF1bal07XG4gIH0pO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IHJvdzsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVgsXG4gICAgRVhQRUNURURfU1RSSU5HX05VTUJFUl9BVF9QT1NfMV8yID0gX3JlcXVpcmUuRVhQRUNURURfU1RSSU5HX05VTUJFUl9BVF9QT1NfMV8yLFxuICAgIElOVkFMSURfUk9XID0gX3JlcXVpcmUuSU5WQUxJRF9ST1csXG4gICAgSU5WQUxJRF9DT0xVTU4gPSBfcmVxdWlyZS5JTlZBTElEX0NPTFVNTixcbiAgICBPVkVSRkxPV19ST1cgPSBfcmVxdWlyZS5PVkVSRkxPV19ST1csXG4gICAgSU5WQUxJRF9ST1dTX0VYUFJFU1NJT04gPSBfcmVxdWlyZS5JTlZBTElEX1JPV1NfRVhQUkVTU0lPTixcbiAgICBJTlZBTElEX0NPTFVNTlNfRVhQUkVTU0lPTiA9IF9yZXF1aXJlLklOVkFMSURfQ09MVU1OU19FWFBSRVNTSU9OLFxuICAgIE9WRVJGTE9XX0NPTFVNTiA9IF9yZXF1aXJlLk9WRVJGTE9XX0NPTFVNTjtcbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSBzdWJtYXRyaXggb2YgYSBtYXRyaXguXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBtYXRyaXhcclxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSByb3dzIC0gUm93cyBleHByZXNzaW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gY29scyAtIENvbHVtbnMgZXhwcmVzc2lvblxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBTdWJtYXRyaXggb2YgQVxyXG4gKi9cblxuXG5mdW5jdGlvbiBzdWJtYXRyaXgoQSwgcm93cywgY29scykge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIGFyZzFUeXBlID0gX3R5cGVvZihyb3dzKTtcblxuICB2YXIgYXJnMlR5cGUgPSBfdHlwZW9mKGNvbHMpO1xuXG4gIGlmIChhcmcxVHlwZSAhPT0gJ3N0cmluZycgJiYgYXJnMVR5cGUgIT09ICdudW1iZXInIHx8IGFyZzJUeXBlICE9PSAnc3RyaW5nJyAmJiBhcmcyVHlwZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoRVhQRUNURURfU1RSSU5HX05VTUJFUl9BVF9QT1NfMV8yKTtcbiAgfVxuXG4gIHZhciBfQSRzaXplID0gQS5zaXplKCksXG4gICAgICBfQSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9BJHNpemUsIDIpLFxuICAgICAgcm93ID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfQSRzaXplMlsxXTtcblxuICB2YXIgcm93U3RhcnQ7XG4gIHZhciByb3dFbmQ7XG4gIHZhciBjb2xTdGFydDtcbiAgdmFyIGNvbEVuZDtcblxuICBpZiAoYXJnMVR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHJvd3MpIHx8IHJvd3MgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9ST1cpO1xuICAgIH1cblxuICAgIGlmIChyb3dzID49IHJvdykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKE9WRVJGTE9XX1JPVyk7XG4gICAgfVxuXG4gICAgcm93U3RhcnQgPSByb3dzO1xuICAgIHJvd0VuZCA9IHJvd3M7XG4gIH0gZWxzZSB7XG4gICAgLy8gc3RyaW5nXG4gICAgdmFyIGFyZyA9IHJvd3Muc3BsaXQoJzonKTtcblxuICAgIGlmIChhcmcubGVuZ3RoICE9PSAyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9ST1dTX0VYUFJFU1NJT04pO1xuICAgIH1cblxuICAgIHZhciBfYXJnID0gX3NsaWNlZFRvQXJyYXkoYXJnLCAyKSxcbiAgICAgICAgcjEgPSBfYXJnWzBdLFxuICAgICAgICByMiA9IF9hcmdbMV07XG5cbiAgICBpZiAocjEgPT09ICcnKSB7XG4gICAgICByb3dTdGFydCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciByID0gTnVtYmVyKHIxKTtcblxuICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHIpIHx8IHIgPCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1JPVyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyID49IHJvdykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfUk9XKTtcbiAgICAgIH1cblxuICAgICAgcm93U3RhcnQgPSByO1xuICAgIH1cblxuICAgIGlmIChyMiA9PT0gJycpIHtcbiAgICAgIHJvd0VuZCA9IHJvdyAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBfciA9IE51bWJlcihyMik7XG5cbiAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihfcikgfHwgX3IgPCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1JPVyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChfciA+PSByb3cpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKE9WRVJGTE9XX1JPVyk7XG4gICAgICB9XG5cbiAgICAgIHJvd0VuZCA9IF9yO1xuICAgIH1cblxuICAgIGlmIChyb3dTdGFydCA+IHJvd0VuZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUk9XU19FWFBSRVNTSU9OKTtcbiAgICB9XG4gIH1cblxuICBpZiAoYXJnMlR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGNvbHMpIHx8IGNvbHMgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9DT0xVTU4pO1xuICAgIH1cblxuICAgIGlmIChjb2xzID49IGNvbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKE9WRVJGTE9XX0NPTFVNTik7XG4gICAgfVxuXG4gICAgY29sU3RhcnQgPSBjb2xzO1xuICAgIGNvbEVuZCA9IGNvbHM7XG4gIH0gZWxzZSB7XG4gICAgLy8gc3RyaW5nXG4gICAgdmFyIF9hcmcyID0gY29scy5zcGxpdCgnOicpO1xuXG4gICAgaWYgKF9hcmcyLmxlbmd0aCAhPT0gMikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfQ09MVU1OU19FWFBSRVNTSU9OKTtcbiAgICB9XG5cbiAgICB2YXIgX2FyZzMgPSBfc2xpY2VkVG9BcnJheShfYXJnMiwgMiksXG4gICAgICAgIGMxID0gX2FyZzNbMF0sXG4gICAgICAgIGMyID0gX2FyZzNbMV07XG5cbiAgICBpZiAoYzEgPT09ICcnKSB7XG4gICAgICBjb2xTdGFydCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjID0gTnVtYmVyKGMxKTtcblxuICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGMpIHx8IGMgPCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX0NPTFVNTik7XG4gICAgICB9XG5cbiAgICAgIGlmIChjID49IGNvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfQ09MVU1OKTtcbiAgICAgIH1cblxuICAgICAgY29sU3RhcnQgPSBjO1xuICAgIH1cblxuICAgIGlmIChjMiA9PT0gJycpIHtcbiAgICAgIGNvbEVuZCA9IGNvbCAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBfYyA9IE51bWJlcihjMik7XG5cbiAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihfYykgfHwgX2MgPCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX0NPTFVNTik7XG4gICAgICB9XG5cbiAgICAgIGlmIChfYyA+PSBjb2wpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKE9WRVJGTE9XX0NPTFVNTik7XG4gICAgICB9XG5cbiAgICAgIGNvbEVuZCA9IF9jO1xuICAgIH1cblxuICAgIGlmIChjb2xTdGFydCA+IGNvbEVuZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfQ09MVU1OU19FWFBSRVNTSU9OKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbWF0cml4ID0gQS5fbWF0cml4O1xuICB2YXIgc3ViUm93ID0gcm93RW5kIC0gcm93U3RhcnQgKyAxO1xuICB2YXIgc3ViQ29sID0gY29sRW5kIC0gY29sU3RhcnQgKyAxO1xuICB2YXIgc3ViTWF0cml4ID0gbmV3IEFycmF5KHN1YlJvdyk7XG5cbiAgZm9yICh2YXIgaSA9IHJvd1N0YXJ0OyBpIDw9IHJvd0VuZDsgaSsrKSB7XG4gICAgdmFyIG5ld1JvdyA9IG5ldyBBcnJheShzdWJDb2wpO1xuXG4gICAgZm9yICh2YXIgaiA9IGNvbFN0YXJ0OyBqIDw9IGNvbEVuZDsgaisrKSB7XG4gICAgICBuZXdSb3dbaiAtIGNvbFN0YXJ0XSA9IG1hdHJpeFtpXVtqXTtcbiAgICB9XG5cbiAgICBzdWJNYXRyaXhbaSAtIHJvd1N0YXJ0XSA9IG5ld1JvdztcbiAgfVxuXG4gIHJldHVybiBuZXcgdGhpcyhzdWJNYXRyaXgpO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IHN1Ym1hdHJpeDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxuLyoqXHJcbiAqIEdldHMgdGhlIHN0cmluZ2lmaWVkIE1hdHJpeFxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBTdHJpbmdpZmllZCBNYXRyaXhcclxuICovXG5mdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgdmFyIG1hdHJpeCA9IHRoaXMuX21hdHJpeDtcblxuICB2YXIgX3RoaXMkc2l6ZSA9IHRoaXMuc2l6ZSgpLFxuICAgICAgX3RoaXMkc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfdGhpcyRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF90aGlzJHNpemUyWzBdLFxuICAgICAgY29sID0gX3RoaXMkc2l6ZTJbMV07XG5cbiAgdmFyIHN0ciA9ICcnO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcm93OyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbDsgaisrKSB7XG4gICAgICBzdHIgKz0gbWF0cml4W2ldW2pdLnRvU3RyaW5nKCk7XG5cbiAgICAgIGlmIChqICE9PSBjb2wgLSAxKSB7XG4gICAgICAgIHN0ciArPSAnICc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGkgIT09IHJvdyAtIDEpIHtcbiAgICAgIHN0ciArPSAnXFxuJztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RyO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IHRvU3RyaW5nOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogR2VuZXJhdGVzIGEgemVybyBNYXRyaXhcclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSByb3cgLSBOdW1iZXIgb2Ygcm93cyBvZiB0aGUgTWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2wgLSBOdW1iZXIgb2YgY29sdW1ucyBvZiB0aGUgTWF0cml4XHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IFplcm8gTWF0cml4XHJcbiAqL1xuZnVuY3Rpb24gemVybyhyb3csIGNvbCkge1xuICBpZiAoY29sID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZShyb3csIHJvdywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdGhpcy5nZW5lcmF0ZShyb3csIGNvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAwO1xuICB9KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSB6ZXJvOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNNYXRyaXggPSByZXF1aXJlKCcuL3V0aWwvaXNNYXRyaXgnKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogQ3JlYXRlcyBhIG5ldyBNYXRyaXhcclxuICogQG5hbWVzcGFjZSBNYXRyaXhcclxuICogQGNsYXNzXHJcbiAqIEBwYXJhbSB7bnVtYmVyW11bXX0gQSAtIFR3byBkaW1lbnNpb25hbCBhcnJheSB3aGVyZVxyXG4gKiBBW2ldW2pdIHJlcHJlc2VudHMgdGhlIGktdGggcm93IGFuZCBqLXRoIGNvbHVtbiBvZiBhIG1hdHJpeFxyXG4gKi9cblxuXG5mdW5jdGlvbiBNYXRyaXgoQSkge1xuICBpZiAoIWlzTWF0cml4KEEpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHRoaXMuX21hdHJpeCA9IEE7XG4gIHRoaXMuX2RpZ2l0ID0gODtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNYXRyaXg7IC8vIHN0cnVjdHVyZVxuXG5NYXRyaXgucHJvdG90eXBlLmlzRGlhZ29uYWwgPSByZXF1aXJlKCcuL2NvcmUvc3RydWN0dXJlL2lzRGlhZ29uYWwnKTtcbk1hdHJpeC5wcm90b3R5cGUuaXNTa2V3U3ltbWV0cmljID0gcmVxdWlyZSgnLi9jb3JlL3N0cnVjdHVyZS9pc1NrZXdTeW1tZXRyaWMnKTtcbk1hdHJpeC5wcm90b3R5cGUuaXNTcXVhcmUgPSByZXF1aXJlKCcuL2NvcmUvc3RydWN0dXJlL2lzU3F1YXJlJyk7XG5NYXRyaXgucHJvdG90eXBlLmlzU3ltbWV0cmljID0gcmVxdWlyZSgnLi9jb3JlL3N0cnVjdHVyZS9pc1N5bW1ldHJpYycpO1xuTWF0cml4LnByb3RvdHlwZS5pc0xvd2VyVHJpYW5ndWxhciA9IHJlcXVpcmUoJy4vY29yZS9zdHJ1Y3R1cmUvaXNMb3dlclRyaWFuZ3VsYXInKTtcbk1hdHJpeC5wcm90b3R5cGUuaXNVcHBlclRyaWFuZ3VsYXIgPSByZXF1aXJlKCcuL2NvcmUvc3RydWN0dXJlL2lzVXBwZXJUcmlhbmd1bGFyJyk7XG5NYXRyaXgucHJvdG90eXBlLmlzT3J0aG9nb25hbCA9IHJlcXVpcmUoJy4vY29yZS9zdHJ1Y3R1cmUvaXNPcnRob2dvbmFsJyk7IC8vIHByb3BlcnR5XG5cbk1hdHJpeC5wcm90b3R5cGUuY29uZCA9IHJlcXVpcmUoJy4vY29yZS9wcm9wZXJ0aWVzL2NvbmQnKTtcbk1hdHJpeC5wcm90b3R5cGUuZGV0ID0gcmVxdWlyZSgnLi9jb3JlL3Byb3BlcnRpZXMvZGV0Jyk7XG5NYXRyaXgucHJvdG90eXBlLmVpZ2VudmFsdWVzID0gcmVxdWlyZSgnLi9jb3JlL3Byb3BlcnRpZXMvZWlnZW52YWx1ZXMnKTtcbk1hdHJpeC5wcm90b3R5cGUubnVsbGl0eSA9IHJlcXVpcmUoJy4vY29yZS9wcm9wZXJ0aWVzL251bGxpdHknKTtcbk1hdHJpeC5wcm90b3R5cGUubm9ybSA9IHJlcXVpcmUoJy4vY29yZS9wcm9wZXJ0aWVzL25vcm0nKTtcbk1hdHJpeC5wcm90b3R5cGUucmFuayA9IHJlcXVpcmUoJy4vY29yZS9wcm9wZXJ0aWVzL3JhbmsnKTtcbk1hdHJpeC5wcm90b3R5cGUuc2l6ZSA9IHJlcXVpcmUoJy4vY29yZS9wcm9wZXJ0aWVzL3NpemUnKTtcbk1hdHJpeC5wcm90b3R5cGUudHJhY2UgPSByZXF1aXJlKCcuL2NvcmUvcHJvcGVydGllcy90cmFjZScpOyAvLyBvcGVyYXRpb25zXG5cbk1hdHJpeC5hZGQgPSByZXF1aXJlKCcuL2NvcmUvb3BlcmF0aW9ucy9hZGQnKTtcbk1hdHJpeC5pbnZlcnNlID0gcmVxdWlyZSgnLi9jb3JlL29wZXJhdGlvbnMvaW52ZXJzZScpO1xuTWF0cml4Lm11bHRpcGx5ID0gcmVxdWlyZSgnLi9jb3JlL29wZXJhdGlvbnMvbXVsdGlwbHknKTtcbk1hdHJpeC5wb3cgPSByZXF1aXJlKCcuL2NvcmUvb3BlcmF0aW9ucy9wb3cnKTtcbk1hdHJpeC5zdWJ0cmFjdCA9IHJlcXVpcmUoJy4vY29yZS9vcGVyYXRpb25zL3N1YnRyYWN0Jyk7XG5NYXRyaXgudHJhbnNwb3NlID0gcmVxdWlyZSgnLi9jb3JlL29wZXJhdGlvbnMvdHJhbnNwb3NlJyk7IC8vIExpbmVhci1lcXVhdGlvbnNcblxuTWF0cml4LmJhY2t3YXJkID0gcmVxdWlyZSgnLi9jb3JlL2xpbmVhci1lcXVhdGlvbnMvYmFja3dhcmQnKTtcbk1hdHJpeC5mb3J3YXJkID0gcmVxdWlyZSgnLi9jb3JlL2xpbmVhci1lcXVhdGlvbnMvZm9yd2FyZCcpO1xuTWF0cml4LnNvbHZlID0gcmVxdWlyZSgnLi9jb3JlL2xpbmVhci1lcXVhdGlvbnMvc29sdmUnKTsgLy8gZGVjb21wb3NpdGlvbnNcblxuTWF0cml4LkxVID0gcmVxdWlyZSgnLi9jb3JlL2RlY29tcG9zaXRpb25zL0xVJyk7XG5NYXRyaXguUVIgPSByZXF1aXJlKCcuL2NvcmUvZGVjb21wb3NpdGlvbnMvUVInKTsgLy8gdXRpbHNcblxuTWF0cml4LmNsb25lID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2Nsb25lJyk7XG5NYXRyaXguY29sdW1uID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2NvbHVtbicpO1xuTWF0cml4LmRpYWcgPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvZGlhZycpO1xuTWF0cml4LmVsZW1lbnR3aXNlID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2VsZW1lbnR3aXNlJyk7XG5NYXRyaXguZ2VuZXJhdGUgPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvZ2VuZXJhdGUnKTtcbk1hdHJpeC5nZXREaWFnID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2dldERpYWcnKTtcbk1hdHJpeC5nZXRSYW5kb21NYXRyaXggPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvZ2V0UmFuZG9tTWF0cml4Jyk7XG5NYXRyaXguaWRlbnRpdHkgPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvaWRlbnRpdHknKTtcbk1hdHJpeC5pc0VxdWFsID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2lzRXF1YWwnKTtcbk1hdHJpeC5yb3cgPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvcm93Jyk7XG5NYXRyaXguc3VibWF0cml4ID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL3N1Ym1hdHJpeCcpO1xuTWF0cml4Lnplcm8gPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvemVybycpO1xuTWF0cml4LnByb3RvdHlwZS5lbnRyeSA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9lbnRyeScpO1xuTWF0cml4LnByb3RvdHlwZS50b1N0cmluZyA9IHJlcXVpcmUoJy4vY29yZS91dGlscy90b1N0cmluZycpOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi9FcnJvcicpLFxuICAgIElOVkFMSURfUk9XX0NPTCA9IF9yZXF1aXJlLklOVkFMSURfUk9XX0NPTDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbXB0eShyb3csIGNvbCkge1xuICBpZiAoIU51bWJlci5pc0ludGVnZXIocm93KSB8fCByb3cgPCAwIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKGNvbCkgfHwgY29sIDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1JPV19DT0wpO1xuICB9XG5cbiAgaWYgKHJvdyA9PT0gMCB8fCBjb2wgPT09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICB2YXIgbWF0cml4ID0gbmV3IEFycmF5KHJvdyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3c7IGkrKykge1xuICAgIG1hdHJpeFtpXSA9IG5ldyBBcnJheShjb2wpO1xuICB9XG5cbiAgcmV0dXJuIG1hdHJpeDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc051bWJlciA9IHJlcXVpcmUoJy4vaXNOdW1iZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc01hdHJpeChtYXRyaXgpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KG1hdHJpeCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgaGVpZ2h0ID0gbWF0cml4Lmxlbmd0aDtcblxuICBpZiAoaGVpZ2h0ID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7IC8vIFtdIHJlcHJlc2VudHMgZW1wdHkgbWF0cml4ICgwIHggMCBtYXRyaXgpXG4gIH1cblxuICB2YXIgZmlyc3RSb3cgPSBtYXRyaXhbMF07XG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KGZpcnN0Um93KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciB3aWR0aCA9IGZpcnN0Um93Lmxlbmd0aDtcblxuICBpZiAod2lkdGggPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2U7IC8vIFsgW10gXSBpcyBub3QgYWxsb3dlZFxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBoZWlnaHQ7IGkrKykge1xuICAgIHZhciByb3cgPSBtYXRyaXhbaV07XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocm93KSB8fCByb3cubGVuZ3RoICE9PSB3aWR0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgd2lkdGg7IGorKykge1xuICAgICAgaWYgKCFpc051bWJlcihyb3dbal0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNOdW1iZXIoX2ludCkge1xuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKF9pbnQpO1xufTsiLCJ2YXIgU3lsdmVzdGVyID0ge31cblxuU3lsdmVzdGVyLk1hdHJpeCA9IGZ1bmN0aW9uICgpIHt9XG5cblN5bHZlc3Rlci5NYXRyaXguY3JlYXRlID0gZnVuY3Rpb24gKGVsZW1lbnRzKSB7XG4gIHZhciBNID0gbmV3IFN5bHZlc3Rlci5NYXRyaXgoKVxuICByZXR1cm4gTS5zZXRFbGVtZW50cyhlbGVtZW50cylcbn1cblxuU3lsdmVzdGVyLk1hdHJpeC5JID0gZnVuY3Rpb24gKG4pIHtcbiAgdmFyIGVscyA9IFtdLFxuICAgIGkgPSBuLFxuICAgIGpcbiAgd2hpbGUgKGktLSkge1xuICAgIGogPSBuXG4gICAgZWxzW2ldID0gW11cbiAgICB3aGlsZSAoai0tKSB7XG4gICAgICBlbHNbaV1bal0gPSBpID09PSBqID8gMSA6IDBcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFN5bHZlc3Rlci5NYXRyaXguY3JlYXRlKGVscylcbn1cblxuU3lsdmVzdGVyLk1hdHJpeC5wcm90b3R5cGUgPSB7XG4gIGR1cDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBTeWx2ZXN0ZXIuTWF0cml4LmNyZWF0ZSh0aGlzLmVsZW1lbnRzKVxuICB9LFxuXG4gIGlzU3F1YXJlOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvbHMgPSB0aGlzLmVsZW1lbnRzLmxlbmd0aCA9PT0gMCA/IDAgOiB0aGlzLmVsZW1lbnRzWzBdLmxlbmd0aFxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzLmxlbmd0aCA9PT0gY29sc1xuICB9LFxuXG4gIHRvUmlnaHRUcmlhbmd1bGFyOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gU3lsdmVzdGVyLk1hdHJpeC5jcmVhdGUoW10pXG4gICAgdmFyIE0gPSB0aGlzLmR1cCgpLFxuICAgICAgZWxzXG4gICAgdmFyIG4gPSB0aGlzLmVsZW1lbnRzLmxlbmd0aCxcbiAgICAgIGksXG4gICAgICBqLFxuICAgICAgbnAgPSB0aGlzLmVsZW1lbnRzWzBdLmxlbmd0aCxcbiAgICAgIHBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICBpZiAoTS5lbGVtZW50c1tpXVtpXSA9PT0gMCkge1xuICAgICAgICBmb3IgKGogPSBpICsgMTsgaiA8IG47IGorKykge1xuICAgICAgICAgIGlmIChNLmVsZW1lbnRzW2pdW2ldICE9PSAwKSB7XG4gICAgICAgICAgICBlbHMgPSBbXVxuICAgICAgICAgICAgZm9yIChwID0gMDsgcCA8IG5wOyBwKyspIHtcbiAgICAgICAgICAgICAgZWxzLnB1c2goTS5lbGVtZW50c1tpXVtwXSArIE0uZWxlbWVudHNbal1bcF0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBNLmVsZW1lbnRzW2ldID0gZWxzXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKE0uZWxlbWVudHNbaV1baV0gIT09IDApIHtcbiAgICAgICAgZm9yIChqID0gaSArIDE7IGogPCBuOyBqKyspIHtcbiAgICAgICAgICB2YXIgbXVsdGlwbGllciA9IE0uZWxlbWVudHNbal1baV0gLyBNLmVsZW1lbnRzW2ldW2ldXG4gICAgICAgICAgZWxzID0gW11cbiAgICAgICAgICBmb3IgKHAgPSAwOyBwIDwgbnA7IHArKykge1xuICAgICAgICAgICAgLy8gRWxlbWVudHMgd2l0aCBjb2x1bW4gbnVtYmVycyB1cCB0byBhbiBpbmNsdWRpbmcgdGhlIG51bWJlciBvZiB0aGVcbiAgICAgICAgICAgIC8vIHJvdyB0aGF0IHdlJ3JlIHN1YnRyYWN0aW5nIGNhbiBzYWZlbHkgYmUgc2V0IHN0cmFpZ2h0IHRvIHplcm8sXG4gICAgICAgICAgICAvLyBzaW5jZSB0aGF0J3MgdGhlIHBvaW50IG9mIHRoaXMgcm91dGluZSBhbmQgaXQgYXZvaWRzIGhhdmluZyB0b1xuICAgICAgICAgICAgLy8gbG9vcCBvdmVyIGFuZCBjb3JyZWN0IHJvdW5kaW5nIGVycm9ycyBsYXRlclxuICAgICAgICAgICAgZWxzLnB1c2goXG4gICAgICAgICAgICAgIHAgPD0gaSA/IDAgOiBNLmVsZW1lbnRzW2pdW3BdIC0gTS5lbGVtZW50c1tpXVtwXSAqIG11bHRpcGxpZXJcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgICAgTS5lbGVtZW50c1tqXSA9IGVsc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBNXG4gIH0sXG5cbiAgZGV0ZXJtaW5hbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAxXG4gICAgfVxuICAgIGlmICghdGhpcy5pc1NxdWFyZSgpKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICB2YXIgTSA9IHRoaXMudG9SaWdodFRyaWFuZ3VsYXIoKVxuICAgIHZhciBkZXQgPSBNLmVsZW1lbnRzWzBdWzBdLFxuICAgICAgbiA9IE0uZWxlbWVudHMubGVuZ3RoXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBuOyBpKyspIHtcbiAgICAgIGRldCA9IGRldCAqIE0uZWxlbWVudHNbaV1baV1cbiAgICB9XG4gICAgcmV0dXJuIGRldFxuICB9LFxuXG4gIGlzU2luZ3VsYXI6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1NxdWFyZSgpICYmIHRoaXMuZGV0ZXJtaW5hbnQoKSA9PT0gMFxuICB9LFxuXG4gIGF1Z21lbnQ6IGZ1bmN0aW9uIChtYXRyaXgpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmR1cCgpXG4gICAgfVxuICAgIHZhciBNID0gbWF0cml4LmVsZW1lbnRzIHx8IG1hdHJpeFxuICAgIGlmICh0eXBlb2YgTVswXVswXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIE0gPSBTeWx2ZXN0ZXIuTWF0cml4LmNyZWF0ZShNKS5lbGVtZW50c1xuICAgIH1cbiAgICB2YXIgVCA9IHRoaXMuZHVwKCksXG4gICAgICBjb2xzID0gVC5lbGVtZW50c1swXS5sZW5ndGhcbiAgICB2YXIgaSA9IFQuZWxlbWVudHMubGVuZ3RoLFxuICAgICAgbmogPSBNWzBdLmxlbmd0aCxcbiAgICAgIGpcbiAgICBpZiAoaSAhPT0gTS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGogPSBualxuICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICBULmVsZW1lbnRzW2ldW2NvbHMgKyBqXSA9IE1baV1bal1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFRcbiAgfSxcblxuICBpbnZlcnNlOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNTcXVhcmUoKSB8fCB0aGlzLmlzU2luZ3VsYXIoKSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgdmFyIG4gPSB0aGlzLmVsZW1lbnRzLmxlbmd0aCxcbiAgICAgIGkgPSBuLFxuICAgICAgalxuICAgIHZhciBNID0gdGhpcy5hdWdtZW50KFN5bHZlc3Rlci5NYXRyaXguSShuKSkudG9SaWdodFRyaWFuZ3VsYXIoKVxuICAgIHZhciBucCA9IE0uZWxlbWVudHNbMF0ubGVuZ3RoLFxuICAgICAgcCxcbiAgICAgIGVscyxcbiAgICAgIGRpdmlzb3JcbiAgICB2YXIgaW52ZXJzZV9lbGVtZW50cyA9IFtdLFxuICAgICAgbmV3X2VsZW1lbnRcbiAgICAvLyBTeWx2ZXN0ZXIuTWF0cml4IGlzIG5vbi1zaW5ndWxhciBzbyB0aGVyZSB3aWxsIGJlIG5vIHplcm9zIG9uIHRoZVxuICAgIC8vIGRpYWdvbmFsLiBDeWNsZSB0aHJvdWdoIHJvd3MgZnJvbSBsYXN0IHRvIGZpcnN0LlxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIC8vIEZpcnN0LCBub3JtYWxpc2UgZGlhZ29uYWwgZWxlbWVudHMgdG8gMVxuICAgICAgZWxzID0gW11cbiAgICAgIGludmVyc2VfZWxlbWVudHNbaV0gPSBbXVxuICAgICAgZGl2aXNvciA9IE0uZWxlbWVudHNbaV1baV1cbiAgICAgIGZvciAocCA9IDA7IHAgPCBucDsgcCsrKSB7XG4gICAgICAgIG5ld19lbGVtZW50ID0gTS5lbGVtZW50c1tpXVtwXSAvIGRpdmlzb3JcbiAgICAgICAgZWxzLnB1c2gobmV3X2VsZW1lbnQpXG4gICAgICAgIC8vIFNodWZmbGUgb2ZmIHRoZSBjdXJyZW50IHJvdyBvZiB0aGUgcmlnaHQgaGFuZCBzaWRlIGludG8gdGhlIHJlc3VsdHNcbiAgICAgICAgLy8gYXJyYXkgYXMgaXQgd2lsbCBub3QgYmUgbW9kaWZpZWQgYnkgbGF0ZXIgcnVucyB0aHJvdWdoIHRoaXMgbG9vcFxuICAgICAgICBpZiAocCA+PSBuKSB7XG4gICAgICAgICAgaW52ZXJzZV9lbGVtZW50c1tpXS5wdXNoKG5ld19lbGVtZW50KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBNLmVsZW1lbnRzW2ldID0gZWxzXG4gICAgICAvLyBUaGVuLCBzdWJ0cmFjdCB0aGlzIHJvdyBmcm9tIHRob3NlIGFib3ZlIGl0IHRvIGdpdmUgdGhlIGlkZW50aXR5IG1hdHJpeFxuICAgICAgLy8gb24gdGhlIGxlZnQgaGFuZCBzaWRlXG4gICAgICBqID0gaVxuICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICBlbHMgPSBbXVxuICAgICAgICBmb3IgKHAgPSAwOyBwIDwgbnA7IHArKykge1xuICAgICAgICAgIGVscy5wdXNoKE0uZWxlbWVudHNbal1bcF0gLSBNLmVsZW1lbnRzW2ldW3BdICogTS5lbGVtZW50c1tqXVtpXSlcbiAgICAgICAgfVxuICAgICAgICBNLmVsZW1lbnRzW2pdID0gZWxzXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBTeWx2ZXN0ZXIuTWF0cml4LmNyZWF0ZShpbnZlcnNlX2VsZW1lbnRzKVxuICB9LFxuXG4gIHNldEVsZW1lbnRzOiBmdW5jdGlvbiAoZWxzKSB7XG4gICAgdmFyIGksXG4gICAgICBqLFxuICAgICAgZWxlbWVudHMgPSBlbHMuZWxlbWVudHMgfHwgZWxzXG4gICAgaWYgKGVsZW1lbnRzWzBdICYmIHR5cGVvZiBlbGVtZW50c1swXVswXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGkgPSBlbGVtZW50cy5sZW5ndGhcbiAgICAgIHRoaXMuZWxlbWVudHMgPSBbXVxuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBqID0gZWxlbWVudHNbaV0ubGVuZ3RoXG4gICAgICAgIHRoaXMuZWxlbWVudHNbaV0gPSBbXVxuICAgICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50c1tpXVtqXSA9IGVsZW1lbnRzW2ldW2pdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIHZhciBuID0gZWxlbWVudHMubGVuZ3RoXG4gICAgdGhpcy5lbGVtZW50cyA9IFtdXG4gICAgZm9yIChpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgdGhpcy5lbGVtZW50cy5wdXNoKFtlbGVtZW50c1tpXV0pXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH0sXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGVsZW1lbnRzKSB7XG4gIGNvbnN0IG1hdCA9IFN5bHZlc3Rlci5NYXRyaXguY3JlYXRlKGVsZW1lbnRzKS5pbnZlcnNlKClcbiAgaWYgKG1hdCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBtYXQuZWxlbWVudHNcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIG1vZHVsZSBleHBvcnRzIG11c3QgYmUgcmV0dXJuZWQgZnJvbSBydW50aW1lIHNvIGVudHJ5IGlubGluaW5nIGlzIGRpc2FibGVkXG4vLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbnJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9pbmRleC5qc1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=