var kalmanFilter;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const modelCollection = __webpack_require__(/*! ./lib/model-collection */ "./lib/model-collection.js");
const defaultDynamicModels = __webpack_require__(/*! ./lib/dynamic */ "./lib/dynamic/index.js");
const defaultObservationModels = __webpack_require__(/*! ./lib/observation */ "./lib/observation/index.js");

Object.keys(defaultDynamicModels).forEach(k => {
	modelCollection.registerDynamic(k, defaultDynamicModels[k]);
});

Object.keys(defaultObservationModels).forEach(k => {
	modelCollection.registerObservation(k, defaultObservationModels[k]);
});

module.exports = Object.assign({
	KalmanFilter: __webpack_require__(/*! ./lib/kalman-filter */ "./lib/kalman-filter.js"),
	getCovariance: __webpack_require__(/*! ./lib/utils/get-covariance */ "./lib/utils/get-covariance.js"),
	State: __webpack_require__(/*! ./lib/state */ "./lib/state.js"),
	checkCovariance: __webpack_require__(/*! ./lib/utils/check-covariance */ "./lib/utils/check-covariance.js"),
	correlationToCovariance: __webpack_require__(/*! ./lib/utils/correlation-to-covariance */ "./lib/utils/correlation-to-covariance.js"),
	covarianceToCorrelation: __webpack_require__(/*! ./lib/utils/covariance-to-correlation */ "./lib/utils/covariance-to-correlation.js"),
	projectObservation: __webpack_require__(/*! ./lib/utils/project-observation */ "./lib/utils/project-observation.js"),
}, modelCollection);


/***/ }),

/***/ "./lib/core-kalman-filter.js":
/*!***********************************!*\
  !*** ./lib/core-kalman-filter.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {matMul, transpose, add, invert, subtract: sub, identity: getIdentity} = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
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
	debug() {},
	warn: (...args) => console.log(...args),
	error: (...args) => console.log(...args),
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
			index: indexInit,
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
			covariancePrevious,
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
			index,
		});

		const transition = this.getValue(this.dynamic.transition, getValueOptions);

		const mean = this.predictMean({transition, opts: getValueOptions});

		const covariance = this.getPredictedCovariance(getValueOptions);

		const predicted = new State({mean, covariance, index});
		this.logger.debug('Prediction done', predicted);
		if (Number.isNaN(predicted.mean[0][0])) {
			throw (new TypeError('nan'));
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
			stateProjTransposed,
		);

		const innovationCovariance = add(noiselessInnovation, obsCovariance);

		const optimalKalmanGain = matMul(
			matMul(predicted.covariance, stateProjTransposed),
			invert(innovationCovariance),
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
			predicted.covariance,
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
			this.getPredictedObservation({stateProjection, opts: getValueOptions}),
		);

		const mean = add(
			predicted.mean,
			matMul(optimalKalmanGain, innovation),
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

/***/ "./lib/dynamic/composition.js":
/*!************************************!*\
  !*** ./lib/dynamic/composition.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {buildDynamic} = __webpack_require__(/*! ../model-collection */ "./lib/model-collection.js");

/**
* @typedef {Object.<DynamicName, DynamicConfig>} PerNameConfigs
*/
/**
* @typedef {Object} DynamicConfig
* @param {Array.<Number>} obsIndexes
* @param {Covariance} staticCovariance
*/

/**
*Creates a dynamic model, considering the null in order to make the predictions
* @param {Object} main
* @param {Object.<String, DynamicConfig>} main.perName
* @param {ObservationConfig} observation
* @param {Array.<Array.<Number>>} opts.observedProjection
* @returns {DynamicConfig}
*/
module.exports = function ({perName}, observation) {
	const {observedProjection} = observation;
	const observedDynamDimension = observedProjection[0].length;

	const dynamicNames = Object.keys(perName);

	const confs = {};
	let nextDynamicDimension = observedDynamDimension;
	let nextObservedDimension = 0;
	dynamicNames.forEach(k => {
		const obsDynaIndexes = perName[k].obsDynaIndexes;
		if (typeof (perName[k].name) === 'string' && perName[k].name !== k) {
			throw (new Error(`${perName[k].name} and "${k}" should match`));
		}

		perName[k].name = k;

		const {dimension, transition, covariance, init} = buildDynamic(perName[k], observation);

		const dynamicIndexes = [];
		for (let i = 0; i < dimension; i++) {
			const isObserved = (i < obsDynaIndexes.length);
			let newIndex;
			if (isObserved) {
				newIndex = nextObservedDimension;
				if (newIndex !== obsDynaIndexes[i]) {
					throw (new Error('thsoe should match'));
				}

				nextObservedDimension++;
			} else {
				newIndex = nextDynamicDimension;
				nextDynamicDimension++;
			}

			dynamicIndexes.push(newIndex);
		}

		confs[k] = {
			dynamicIndexes,
			transition,
			dimension,
			covariance,
			init,
		};
	});

	const totalDimension = dynamicNames.map(k => confs[k].dimension).reduce((a, b) => a + b, 0);

	if (nextDynamicDimension !== totalDimension) {
		throw (new Error('miscalculation of transition'));
	}

	const init = {
		index: -1,
		mean: new Array(totalDimension),
		covariance: new Array(totalDimension).fill(0).map(() => new Array(totalDimension).fill(0)),
	};
	dynamicNames.forEach(k => {
		const {
			dynamicIndexes,
			init: localInit,
		} = confs[k];
		if (typeof (localInit) !== 'object') {
			throw new TypeError('Init is mandatory');
		}

		dynamicIndexes.forEach((c1, i1) => dynamicIndexes.forEach((c2, i2) => {
			init.covariance[c1][c2] = localInit.covariance[i1][i2];
		}));
		dynamicIndexes.forEach((c1, i1) => {
			init.mean[c1] = localInit.mean[i1];
		});
	});
	return {
		dimension: totalDimension,
		init,
		transition(options) {
			const {previousCorrected} = options;
			const resultTransition = new Array(totalDimension).fill().map(() => new Array(totalDimension).fill(0));

			dynamicNames.forEach(k => {
				const {
					dynamicIndexes,
					transition,
				} = confs[k];

				const options2 = Object.assign({}, options, {previousCorrected: previousCorrected.subState(dynamicIndexes)});
				const trans = transition(options2);
				dynamicIndexes.forEach((c1, i1) => dynamicIndexes.forEach((c2, i2) => {
					resultTransition[c1][c2] = trans[i1][i2];
				}));
			});
			return resultTransition;
		},
		covariance(options) {
			const {previousCorrected} = options;
			const resultCovariance = new Array(totalDimension).fill().map(() => new Array(totalDimension).fill(0));

			dynamicNames.forEach(k => {
				const {
					dynamicIndexes,
					covariance,
				} = confs[k];

				const options2 = Object.assign({}, options, {previousCorrected: previousCorrected.subState(dynamicIndexes)});

				const cov = covariance(options2);
				// Console.log('dynamic.composition',k, cov, dynamicIndexes)
				dynamicIndexes.forEach((c1, i1) => dynamicIndexes.forEach((c2, i2) => {
					resultCovariance[c1][c2] = cov[i1][i2];
				}));
			});
			return resultCovariance;
		},
	};
};


/***/ }),

/***/ "./lib/dynamic/constant-acceleration.js":
/*!**********************************************!*\
  !*** ./lib/dynamic/constant-acceleration.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {identity} = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");

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

/***/ "./lib/dynamic/constant-position-with-null.js":
/*!****************************************************!*\
  !*** ./lib/dynamic/constant-position-with-null.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {identity, diag} = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");

const huge = 1e6;

/**
*Creates a dynamic model, considering the null in order to make the predictions
* @param {Array.<Array.<Number>>} staticCovariance generated with moving average
* @param {Number} observationDimension
* @returns {DynamicConfig}
*/
const constantPositionWithNull = function ({staticCovariance, obsDynaIndexes, init}) {
	const dimension = obsDynaIndexes.length;
	if (!init) {
		init = {
			mean: new Array(obsDynaIndexes.length).fill(0).map(() => [0]),
			covariance: diag(new Array(obsDynaIndexes.length).fill(huge)),
			index: -1,
		};
	}

	if (staticCovariance && staticCovariance.length !== dimension) {
		throw (new Error('staticCovariance has wrong size'));
	}

	return {
		dimension,
		transition() {
			return identity(dimension);
		},
		covariance({previousCorrected, index}) {
			const diffBetweenIndexes = index - previousCorrected.index;
			if (staticCovariance) {
				return staticCovariance.map(row => row.map(element => element * diffBetweenIndexes));
			}

			return identity(dimension);
		},
		init,
	};
};

module.exports = constantPositionWithNull;


/***/ }),

/***/ "./lib/dynamic/constant-position.js":
/*!******************************************!*\
  !*** ./lib/dynamic/constant-position.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {identity} = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
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

/***/ "./lib/dynamic/constant-speed-dynamic.js":
/*!***********************************************!*\
  !*** ./lib/dynamic/constant-speed-dynamic.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {diag} = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");

/**
*Creates a dynamic model, considering the null in order to make the predictions
* @param {Array.<Number>} staticCovariance
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/
const constantSpeedDynamic = function ({staticCovariance, avSpeed, center}, observation) {
	const observationDimension = observation.observedProjection[0].length;

	const dimension = 2 * observationDimension;

	if ((center) === undefined) {
		throw (new TypeError('Center must be defined'));
	}

	if (center.length !== observationDimension) {
		throw (new TypeError(`Center size should be ${observationDimension}`));
	}

	if (avSpeed.length !== observationDimension) {
		throw (new TypeError(`avSpeed size should be ${observationDimension}`));
	}

	const initCov = diag(center.map(c => c * c / 3).concat(avSpeed.map(c => c * c / 3)));

	const init = {
		mean: center.map(c => [c]).concat(center.map(() => [0])),
		covariance: initCov,
		index: -1,
	};

	const transition = ({getTime, index, previousCorrected}) => {
		const dT = getTime(index) - getTime(previousCorrected.index);
		if (typeof (dT) !== 'number' || Number.isNaN(dT)) {
			throw (new TypeError(`dT (${dT}) should be a number`));
		}
		// Example is :
		// [
		// 	[1, 0, dT, 0],
		// 	[0, 1, 0, dT],
		// 	[0, 0, 1, 0],
		// 	[0, 0, 0, 1]
		// ];
		// constant speed usual matrix

		// create identity matrix
		const mat = diag(center.map(() => 1).concat(center.map(() => 1)));
		// Then add dT
		for (let i = 0; i < observationDimension; i++) {
			mat[i][observationDimension + i] = dT;
		}

		if (Number.isNaN(mat[0][2])) {
			throw (new TypeError('nan mat'));
		}

		return mat;
	};

	const covariance = ({index, previousCorrected, getTime}) => {
		const dT = getTime(index) - getTime(previousCorrected.index);

		if (typeof (dT) !== 'number') {
			throw (new TypeError(`dT (${dT}) should be a number`));
		}

		// State is (x, y, vx, vy)
		const sqrt = Math.sqrt(dT);
		if (Number.isNaN(sqrt)) {
			console.log({lastPreviousIndex: previousCorrected.index, index});
			console.log(dT, previousCorrected.index, index, getTime(index), getTime(previousCorrected.index));
			throw (new Error('Sqrt(dT) is NaN'));
		}

		return diag(staticCovariance.map(v => v * sqrt));
	};

	return {
		init,
		dimension,
		transition,
		covariance,
	};
};

module.exports = constantSpeedDynamic;


/***/ }),

/***/ "./lib/dynamic/constant-speed-with-null.js":
/*!*************************************************!*\
  !*** ./lib/dynamic/constant-speed-with-null.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {identity, diag} = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");

const nullModels = {
	linear(a) {
		return a;
	},
	one() {
		return 1;
	},
	square(a) {
		return a * a;
	},
};
const huge = 1e6;
/**
*Creates a dynamic model, considering the null in order to make the predictions
* @param {Array.<Array.<Number>>} staticCovariance generated with moving average
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/
const constantSpeedWithNull = function ({staticCovariance, obsDynaIndexes, nullGapModel = null, init}, observation) {
	if (!obsDynaIndexes) {
		const l = observation.observedProjection[0].length;
		obsDynaIndexes = new Array(l).fill(0).map((_, i) => i);
	}

	if (staticCovariance && Number.isNaN(staticCovariance[0][0])) {
		throw (new Error('NaN staticCovariance'));
	}

	const dimension = 2 * obsDynaIndexes.length;
	if (!init) {
		init = {
			mean: new Array(obsDynaIndexes.length * 2).fill(0).map(() => [0]),
			covariance: diag(new Array(obsDynaIndexes.length * 2).fill(huge)),
			index: -1,
		};
	}

	if (!nullGapModel) {
		nullGapModel = new Array(dimension).fill(0).map(() => 'linear');
	}

	return {
		dimension,
		init,
		transition({previousCorrected, index}) {
			const diffBetweenIndexes = index - previousCorrected.index;

			if (Number.isNaN(diffBetweenIndexes)) {
				throw (new TypeError('diffBetweenIndexes is NaN'));
			}

			const emptyTransition = new Array(dimension).fill(new Array(dimension).fill());

			const observationDimension = dimension / 2;
			const transition = emptyTransition.map((row, rowId) => row.map((col, colId) => {
				if (rowId === colId) {
					return 1;
				}

				if (rowId + observationDimension === colId) {
					if (index === 0) {
						return 0;
					}

					return diffBetweenIndexes;
				}

				return 0;
			}));
			return transition;
		},
		covariance({previousCorrected, index}) {
			const diffBetweenIndexes = index - previousCorrected.index;
			if (staticCovariance) {
				const covariance = staticCovariance.map((row, rowIndex) => row.map((element, colIndex) => {
					const factor = Math.sqrt(nullModels[nullGapModel[rowIndex]](diffBetweenIndexes) * nullModels[nullGapModel[colIndex]](diffBetweenIndexes));
					return element * factor;
				}));

				return covariance;
			}

			return identity(dimension);
		},
	};
};

module.exports = constantSpeedWithNull;


/***/ }),

/***/ "./lib/dynamic/constant-speed.js":
/*!***************************************!*\
  !*** ./lib/dynamic/constant-speed.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {identity} = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");

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

/***/ "./lib/dynamic/index.js":
/*!******************************!*\
  !*** ./lib/dynamic/index.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
	'constant-position': __webpack_require__(/*! ./constant-position.js */ "./lib/dynamic/constant-position.js"),
	'constant-speed': __webpack_require__(/*! ./constant-speed.js */ "./lib/dynamic/constant-speed.js"),
	'constant-acceleration': __webpack_require__(/*! ./constant-acceleration.js */ "./lib/dynamic/constant-acceleration.js"),
	composition: __webpack_require__(/*! ./composition.js */ "./lib/dynamic/composition.js"),
	'constant-position-with-null': __webpack_require__(/*! ./constant-position-with-null.js */ "./lib/dynamic/constant-position-with-null.js"),
	'constant-speed-with-null': __webpack_require__(/*! ./constant-speed-with-null.js */ "./lib/dynamic/constant-speed-with-null.js"),
	'constant-speed-dynamic': __webpack_require__(/*! ./constant-speed-dynamic.js */ "./lib/dynamic/constant-speed-dynamic.js"),
	'shortterm-constant-speed': __webpack_require__(/*! ./shortterm-constant-speed.js */ "./lib/dynamic/shortterm-constant-speed.js"),
};


/***/ }),

/***/ "./lib/dynamic/shortterm-constant-speed.js":
/*!*************************************************!*\
  !*** ./lib/dynamic/shortterm-constant-speed.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {elemWise, diag} = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
const constantSpeedDynamic = __webpack_require__(/*! ./constant-speed-dynamic */ "./lib/dynamic/constant-speed-dynamic.js");

const safeDiv = function (a, b) {
	if (a === 0) {
		return 0;
	}

	if (b === 0) {
		return 1;
	}

	return a / b;
};

/**
* This model is based on the constant speed model
* The constant speed model creates problems when dT >> fps (the track is lost)
* then the expected position can be very far from the center of the field
* to solve that, we use a model with 2 more hidden variable that are always center of the field
* When dT << typicalTime the model acts exactly as a constant speed model
* When dT >> typicalTime the model is a constant [x,y] = center model, sigma = defaultVariance
* @param {Object} options
* @param {ObservationConfig} observation
* @param {Number} [options.typicalTime=10]
* @returns {DynamicConfig}
*/
module.exports = function (options, observation) {
	const {typicalTimes} = options;

	if (!Array.isArray(typicalTimes)) {
		throw (new TypeError('typicalTimes must be defined'));
	}

	const constantSpeed = constantSpeedDynamic(options, observation);
	const {dimension, init} = constantSpeed;

	if (typicalTimes.length !== dimension) {
		throw (new TypeError(`typicalTimes (${typicalTimes.length}) length is not as expected (${dimension})`));
	}

	const mixMatrix = function ({
		ratios,
		aMat,
		bMat,
	}) {
		return elemWise([aMat, bMat], ([m, d], rowIndex, colIndex) => {
			const ratio = rowIndex === colIndex ? ratios[rowIndex] : (ratios[rowIndex] + ratios[colIndex]) / 2;

			return (ratio * m) + ((1 - ratio) * d);
		});
	};

	return {
		dimension,
		init,
		transition(options) {
			const aMat = constantSpeed.transition(options);

			const {getTime, index, previousCorrected} = options;
			const dT = getTime(index) - getTime(previousCorrected.index);

			const ratios = typicalTimes.map(t => Math.exp(-1 * dT / t));

			// 'back to init' matrix
			const bMat = diag(
				elemWise([init.mean, previousCorrected.mean], ([m, d]) => safeDiv(m, d))
				// Flatten cause this is a Nx1 matrix -> N array
					.reduce((a, b) => a.concat(b)),
			);

			return mixMatrix({ratios, aMat, bMat});
		},
		covariance(options, observation) {
			const {getTime, index, previousCorrected} = options;

			const dT = getTime(index) - getTime(previousCorrected.index);
			// State is (x, y, vx, vy)
			const ratios = typicalTimes.map(t => Math.exp(-1 * dT / t));
			const aMat = constantSpeed.covariance(options, observation);
			return mixMatrix({ratios, aMat, bMat: init.covariance});
		},
	};
};


/***/ }),

/***/ "./lib/kalman-filter.js":
/*!******************************!*\
  !*** ./lib/kalman-filter.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const {frobenius: distanceMat} = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
const arrayToMatrix = __webpack_require__(/*! ../lib/utils/array-to-matrix.js */ "./lib/utils/array-to-matrix.js");
const setDimensions = __webpack_require__(/*! ../lib/setup/set-dimensions.js */ "./lib/setup/set-dimensions.js");
const checkDimensions = __webpack_require__(/*! ../lib/setup/check-dimensions.js */ "./lib/setup/check-dimensions.js");
const buildStateProjection = __webpack_require__(/*! ../lib/setup/build-state-projection.js */ "./lib/setup/build-state-projection.js");
const extendDynamicInit = __webpack_require__(/*! ../lib/setup/extend-dynamic-init.js */ "./lib/setup/extend-dynamic-init.js");
const toFunction = __webpack_require__(/*! ../lib/utils/to-function.js */ "./lib/utils/to-function.js");
const deepAssign = __webpack_require__(/*! ../lib/utils/deep-assign.js */ "./lib/utils/deep-assign.js");
const polymorphMatrix = __webpack_require__(/*! ../lib/utils/polymorph-matrix.js */ "./lib/utils/polymorph-matrix.js");
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


/***/ }),

/***/ "./lib/model-collection.js":
/*!*********************************!*\
  !*** ./lib/model-collection.js ***!
  \*********************************/
/***/ ((module) => {


const registeredObservationModels = {};
const registeredDynamicModels = {};

module.exports = {
	/**
	* Enables to register observation model and store it
	* @param {String} name
	* @callback fn the function corresponding to the desired model
	*/

	registerObservation(name, fn) {
		registeredObservationModels[name] = fn;
	},
	/**
	* Enables to register dynamic model and store it
	* @param {String} name
	* @callback fn the function corresponding to the desired model
	*/

	registerDynamic(name, fn) {
		registeredDynamicModels[name] = fn;
	},
	/**
	* Build a model given an observation configuration
	* @param {ObservationConfig} observation
	* @returns {ObservationConfig} the configuration with respect to the model
	*/
	buildObservation(observation) {
		if (typeof (registeredObservationModels[observation.name]) !== 'function') {
			throw (new TypeError(`The provided observation model name (${observation.name}) is not registered`));
		}

		return registeredObservationModels[observation.name](observation);
	},
	/**
	* Build a model given dynamic and observation configurations
	* @param {DynamicConfig} dynamic
	* @param {ObservationConfig} observation
	* @returns {DynamicConfig} the dynamic configuration with respect to the model
	*/

	buildDynamic(dynamic, observation) {
		if (typeof (registeredDynamicModels[dynamic.name]) !== 'function') {
			throw (new TypeError(`The provided dynamic model (${dynamic.name}) name is not registered`));
		}

		return registeredDynamicModels[dynamic.name](dynamic, observation);
	},
};


/***/ }),

/***/ "./lib/observation/index.js":
/*!**********************************!*\
  !*** ./lib/observation/index.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
	sensor: __webpack_require__(/*! ./sensor.js */ "./lib/observation/sensor.js"),
	'sensor-local-variance': __webpack_require__(/*! ./sensor-local-variance */ "./lib/observation/sensor-local-variance.js"),
	'sensor-projected': __webpack_require__(/*! ./sensor-projected */ "./lib/observation/sensor-projected.js"),
};


/***/ }),

/***/ "./lib/observation/sensor-local-variance.js":
/*!**************************************************!*\
  !*** ./lib/observation/sensor-local-variance.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {identity} = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
const {buildObservation} = __webpack_require__(/*! ../model-collection */ "./lib/model-collection.js");
/**
* @param {Object} options
* @param {Number} options.sensorDimension
* @param {CovarianceParam} options.sensorCovariance
* @param {Number} options.nSensors
* @returns {ObservationConfig}
*/

const nullableSensor = function (options) {
	const {dimension, observedProjection, covariance: baseCovariance} = buildObservation(Object.assign({}, options, {name: 'sensor'}));

	return {
		dimension,
		observedProjection,
		covariance(o) {
			const covariance = identity(dimension);
			const {variance} = o;

			variance.forEach((v, i) => {
				covariance[i][i] = v * baseCovariance[i][i];
			});

			return covariance;
		},
	};
};

module.exports = nullableSensor;



/***/ }),

/***/ "./lib/observation/sensor-projected.js":
/*!*********************************************!*\
  !*** ./lib/observation/sensor-projected.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {identity, matPermutation} = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
const correlationToCovariance = __webpack_require__(/*! ../utils/correlation-to-covariance */ "./lib/utils/correlation-to-covariance.js");
const covarianceToCorrelation = __webpack_require__(/*! ../utils/covariance-to-correlation */ "./lib/utils/covariance-to-correlation.js");

/**
*Creates an observation model with a observedProjection corresponding to
* @param {DynamicConfig} dynamic
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/

const sensorProjected = function ({selectedCovariance, totalDimension, obsIndexes, selectedStateProjection}) {
	if (!selectedStateProjection) {
		selectedStateProjection = new Array(obsIndexes.length).fill(0).map(() => new Array(obsIndexes.length).fill(0));
		obsIndexes.forEach((index1, i1) => {
			selectedStateProjection[i1][i1] = 1;
		});
	} else if (selectedStateProjection.length !== obsIndexes.length) {
		throw (new Error(`[Sensor-projected] Shape mismatch between ${selectedStateProjection.length} and ${obsIndexes.length}`));
	}

	const baseCovariance = identity(totalDimension);
	obsIndexes.forEach((index1, i1) => {
		if (selectedCovariance) {
			obsIndexes.forEach((index2, i2) => {
				baseCovariance[index1][index2] = selectedCovariance[i1][i2];
			});
		}
	});
	const {correlation: baseCorrelation, variance: baseVariance} = covarianceToCorrelation(baseCovariance);

	const dynaDimension = selectedStateProjection[0].length;

	if (selectedStateProjection.length !== obsIndexes.length) {
		throw (new Error(`shape mismatch (${selectedStateProjection.length} vs ${obsIndexes.length})`));
	}

	const observedProjection = matPermutation({
		outputSize: [totalDimension, dynaDimension],
		colIndexes: selectedStateProjection[0].map((_, i) => i),
		rowIndexes: obsIndexes,
		matrix: selectedStateProjection,
	});

	return {
		dimension: totalDimension,
		observedProjection,
		covariance(o) {
			const {variance} = o;
			if (!variance) {
				return baseCovariance;
			}

			if (variance.length !== baseCovariance.length) {
				throw (new Error('variance is difference size from baseCovariance'));
			}

			const result = correlationToCovariance({correlation: baseCorrelation, variance: baseVariance.map((b, i) => variance[i] * b)});

			return result;
		},
	};
};

module.exports = sensorProjected;


/***/ }),

/***/ "./lib/observation/sensor.js":
/*!***********************************!*\
  !*** ./lib/observation/sensor.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {identity} = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
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

		for (const [rIndex, r] of sensorCovarianceFormatted.entries()) {
			for (const [cIndex, c] of r.entries()) {
				concatenatedCovariance[rIndex + (i * sensorDimension)][cIndex + (i * sensorDimension)] = c;
			}
		}
	}

	return Object.assign({}, options, {
		dimension,
		observedProjection: concatenatedObservedProjection,
		covariance: concatenatedCovariance,
	});
};


/***/ }),

/***/ "./lib/setup/build-state-projection.js":
/*!*********************************************!*\
  !*** ./lib/setup/build-state-projection.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {padWithZeroCols: padWithZeros} = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
const {identity} = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
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
		const stateProjection = padWithZeros(observedProjection, {columns: dynamicDimension});
		return {
			observation: Object.assign({}, observation, {
				stateProjection,
			}),
			dynamic,
		};
	}

	if (observationDimension && dynamicDimension && !stateProjection) {
		const observationMatrix = identity(observationDimension);
		return {
			observation: Object.assign({}, observation, {
				stateProjection: padWithZeros(observationMatrix, {columns: dynamicDimension}),
			}),
			dynamic,
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

const {diag} = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
const polymorphMatrix = __webpack_require__(/*! ../utils/polymorph-matrix.js */ "./lib/utils/polymorph-matrix.js");

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
					index: -1,
				},
			}),
		};
		return withInitOptions;
	}

	if (dynamic.init && !dynamic.init.mean) {
		throw (new Error('dynamic.init should have a mean key'));
	}

	dynamic.init = Object.assign({}, dynamic.init, {
		covariance: polymorphMatrix(dynamic.init.covariance, {dimension: dynamic.dimension}),
	});

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
				dimension: stateProjection.length,
			}),
			dynamic: Object.assign({}, dynamic, {
				dimension: stateProjection[0].length,
			}),
		};
	}

	if (Array.isArray(transition)) {
		return {
			observation,
			dynamic: Object.assign({}, dynamic, {
				dimension: transition.length,
			}),
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

const {subtract: sub, transpose, matMul, invert, elemWise, subSquareMatrix} = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
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
				'The argument is not a state \n'
        + 'Tips: maybe you are using 2 different version of kalman-filter in your npm deps tree',
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
			transpose(matrix),
		);
		const mean = matMul(matrix, state.mean);

		return new State({
			mean,
			covariance,
			index: state.index,
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
			index: this.index,
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
					covarianceInvert,
				),
				diff,
			),
		);
		if (Number.isNaN(value)) {
			console.log({diff, covarianceInvert, this: this, point}, matMul(
				matMul(
					diffTransposed,
					covarianceInvert,
				),
				diff,
			));
			throw (new Error('mahalanobis is NaN'));
		}

		return {
			diff,
			covarianceInvert,
			value,
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
		const {covariance, mean} = this;
		const average = elemWise([covariance, otherState.covariance], ([a, b]) => (a + b) / 2);

		let covarInverted;
		try {
			covarInverted = invert(average);
		} catch (error) {
			console.log('Cannot invert', average);
			throw (error);
		}

		const diff = sub(mean, otherState.mean);

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
	for (const eigenvalue of eigenvalues) {
		if (eigenvalue <= -tolerance) {
			console.log(covariance, eigenvalue);
			throw new Error(`Eigenvalue should be positive (actual: ${eigenvalue})`);
		}
	}

	console.log('is definite positive', covariance);
};

const checkSymetric = function (covariance, title = 'checkSymetric') {
	for (const [rowId, row] of covariance.entries()) {
		for (const [colId, item] of row.entries()) {
			if (rowId === colId && item < 0) {
				throw new Error(`[${title}] Variance[${colId}] should be positive (actual: ${item})`);
			} else if (Math.abs(item) > Math.sqrt(covariance[rowId][rowId] * covariance[colId][colId])) {
				console.log(covariance);
				throw new Error(`[${title}] Covariance[${rowId}][${colId}] should verify Cauchy Schwarz Inequality `
				+ `(expected: |x| <= sqrt(${covariance[rowId][rowId]} * ${covariance[colId][colId]})`
				+ ` actual: ${item})`);
			} else if (Math.abs(item - covariance[colId][rowId]) > tolerance) {
				throw new Error(`[${title}] Covariance[${rowId}][${colId}] should equal Covariance[${colId}][${rowId}] `
			+ ` (actual diff: ${Math.abs(item - covariance[colId][rowId])})  = ${item} - ${covariance[colId][rowId]}\n`
			+ `${covariance.join('\n')} is invalid`,
				);
			}
		}
	}
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

	for (const row of matrix) {
		if (!Array.isArray(row)) {
			throw (new TypeError(`[${title}] 1-level array should be a matrix ${JSON.stringify(matrix)}`));
		}
	}

	if (matrix.reduce((a, b) => a.concat(b)).some(a => Number.isNaN(a))) {
		throw (new Error(
			`[${title}] Matrix should not have a NaN\nIn : \n`
			+ matrix.join('\n'),
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
		correlation: covariance.map((c, rowIndex) => c.map((a, colIndex) => a / Math.sqrt(variance[colIndex] * variance[rowIndex]))),
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

	const filterArguments = args.filter(arg => (arg) !== undefined && arg !== null);
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
	for (const arg of objectsArguments) {
		keys = keys.concat(Object.keys(arg));
	}

	const uniqKeys = uniq(keys);
	const result = {};
	for (const key of uniqKeys) {
		const values = objectsArguments.map(arg => arg[key]);
		result[key] = deepAssign(values, step + 1);
	}

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

	return (new Array(n).fill(1)).map((_, rowIndex) => (new Array(n).fill(1)).map((_, colIndex) => {
		const stds = measures.map((m, i) => (m[rowIndex] - averages[i][rowIndex]) * (m[colIndex] - averages[i][colIndex]));
		const result = stds.reduce((a, b) => a + b) / l;
		if (Number.isNaN(result)) {
			throw (new TypeError('result is NaN'));
		}

		return result;
	}));
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
const {diag} = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
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

/***/ "./lib/utils/project-observation.js":
/*!******************************************!*\
  !*** ./lib/utils/project-observation.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// From observationTracks to movingAverageGroundTruthsStates with speed

const {matMul, invert} = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");

module.exports = function ({observation, obsIndexes, selectedStateProjection, invertSelectedStateProjection}) {
	if (!observation) {
		return null;
	}

	const value = observation.observation || observation;

	const vec = obsIndexes.map(i => {
		if ((value[i]) === undefined) {
			throw (new TypeError(`obsIndexes (${obsIndexes}) is not matching with observation (${observation})`));
		}

		return [value[i]];
	});

	const inverse = invertSelectedStateProjection || invert(selectedStateProjection);

	if (inverse === null) {
		throw (new Error('selectedStateProjection is not invertible, please provide invertSelectedStateProjection'));
	}

	const out = matMul(inverse, vec);

	return out
		.map(v => v[0])
		.map(v => {
			if (Number.isNaN(v)) {
				throw (new TypeError('NaN in projection'));
			}

			return v;
		});
};


/***/ }),

/***/ "./lib/utils/to-function.js":
/*!**********************************!*\
  !*** ./lib/utils/to-function.js ***!
  \**********************************/
/***/ ((module) => {

// Const {diag} = require('simple-linalg');;

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
		array.indexOf(value) === index,
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


/***/ }),

/***/ "./node_modules/simple-linalg/index.js":
/*!*********************************************!*\
  !*** ./node_modules/simple-linalg/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/index.js */ "./node_modules/simple-linalg/lib/index.js");


/***/ }),

/***/ "./node_modules/simple-linalg/lib/add.js":
/*!***********************************************!*\
  !*** ./node_modules/simple-linalg/lib/add.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const elemWise = __webpack_require__(/*! ./elem-wise */ "./node_modules/simple-linalg/lib/elem-wise.js");
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

/***/ "./node_modules/simple-linalg/lib/cos-similarity.js":
/*!**********************************************************!*\
  !*** ./node_modules/simple-linalg/lib/cos-similarity.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const dotProduct = __webpack_require__(/*! ./dot-product.js */ "./node_modules/simple-linalg/lib/dot-product.js");
const norm = __webpack_require__(/*! ./norm.js */ "./node_modules/simple-linalg/lib/norm.js");

module.exports = function (vector1, vector2) {
	if (vector1.length !== vector2.length) {
		throw (new Error('The lengths of the vectors do not match'));
	}

	return dotProduct(vector1, vector2) / (norm(vector1) * norm(vector2));
};


/***/ }),

/***/ "./node_modules/simple-linalg/lib/diag-block.js":
/*!******************************************************!*\
  !*** ./node_modules/simple-linalg/lib/diag-block.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const identity = __webpack_require__(/*! ./identity.js */ "./node_modules/simple-linalg/lib/identity.js");

module.exports = function ({blocks, order = null}) {
	const dimL = blocks.map(a => a.length).reduce((a, b) => a + b, 0);
	const result = identity(dimL);
	let current = 0;
	for (const mat of blocks) {
		for (const [i] of mat.entries()) {
			for (const [j] of mat.entries()) {
				result[i + current][j + current] = mat[i][j];
			}
		}

		current += mat.length;
	}

	if (order) {
		return order.map(i => order.map(j => result[i][j]));
	}

	return result;
};


/***/ }),

/***/ "./node_modules/simple-linalg/lib/diag.js":
/*!************************************************!*\
  !*** ./node_modules/simple-linalg/lib/diag.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const zeros = __webpack_require__(/*! ./zeros */ "./node_modules/simple-linalg/lib/zeros.js");

module.exports = function (mat) {
	const result = zeros(mat.length, mat.length);

	for (const [i, element] of mat.entries()) {
		result[i][i] = element;
	}

	return result;
};


/***/ }),

/***/ "./node_modules/simple-linalg/lib/dot-product.js":
/*!*******************************************************!*\
  !*** ./node_modules/simple-linalg/lib/dot-product.js ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = function (vector1, vector2) {
	if (vector1.length !== vector2.length) {
		throw (new Error('Lengths not maching'));
	}

	let result = 0;
	for (const [i, element] of vector1.entries()) {
		result += element * vector2[i];
	}

	return result;
};


/***/ }),

/***/ "./node_modules/simple-linalg/lib/elem-wise.js":
/*!*****************************************************!*\
  !*** ./node_modules/simple-linalg/lib/elem-wise.js ***!
  \*****************************************************/
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

/***/ "./node_modules/simple-linalg/lib/euclidean-dist.js":
/*!**********************************************************!*\
  !*** ./node_modules/simple-linalg/lib/euclidean-dist.js ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = function (array1, array2) {
	if (array1.length !== array2.length) {
		throw new Error('Invalid array lengths');
	}

	const diff = array1.map((element, index) => element - array2[index]).map(element => element * element);
	return Math.sqrt(diff.reduce((a, b) => a + b));
};


/***/ }),

/***/ "./node_modules/simple-linalg/lib/frobenius.js":
/*!*****************************************************!*\
  !*** ./node_modules/simple-linalg/lib/frobenius.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const trace = __webpack_require__(/*! ./trace.js */ "./node_modules/simple-linalg/lib/trace.js");
const transpose = __webpack_require__(/*! ./transpose.js */ "./node_modules/simple-linalg/lib/transpose.js");
const matSub = __webpack_require__(/*! ./subtract.js */ "./node_modules/simple-linalg/lib/subtract.js");
const matMul = __webpack_require__(/*! ./mat-mul.js */ "./node_modules/simple-linalg/lib/mat-mul.js");
const sum = __webpack_require__(/*! ./sum.js */ "./node_modules/simple-linalg/lib/sum.js");

// [Frobenius norm](https://en.wikipedia.org/wiki/Matrix_norm#Frobenius_norm )
module.exports = function (array1, array2) {
	if (array1 === undefined) {
		return sum(array2);
	}

	if (array2 === undefined) {
		return sum(array1);
	}

	const m = matSub(array1, array2);
	const p = matMul(transpose(m), m);
	return Math.sqrt(trace(p));
};


/***/ }),

/***/ "./node_modules/simple-linalg/lib/identity.js":
/*!****************************************************!*\
  !*** ./node_modules/simple-linalg/lib/identity.js ***!
  \****************************************************/
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

/***/ "./node_modules/simple-linalg/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/simple-linalg/lib/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
	add: __webpack_require__(/*! ./add.js */ "./node_modules/simple-linalg/lib/add.js"),
	cosSimilarity: __webpack_require__(/*! ./cos-similarity */ "./node_modules/simple-linalg/lib/cos-similarity.js"),
	euclideanDist: __webpack_require__(/*! ./euclidean-dist */ "./node_modules/simple-linalg/lib/euclidean-dist.js"),
	diag: __webpack_require__(/*! ./diag.js */ "./node_modules/simple-linalg/lib/diag.js"),
	diagBlock: __webpack_require__(/*! ./diag-block */ "./node_modules/simple-linalg/lib/diag-block.js"),
	dotProduct: __webpack_require__(/*! ./dot-product */ "./node_modules/simple-linalg/lib/dot-product.js"),
	elemWise: __webpack_require__(/*! ./elem-wise.js */ "./node_modules/simple-linalg/lib/elem-wise.js"),
	frobenius: __webpack_require__(/*! ./frobenius.js */ "./node_modules/simple-linalg/lib/frobenius.js"),
	identity: __webpack_require__(/*! ./identity.js */ "./node_modules/simple-linalg/lib/identity.js"),
	invert: __webpack_require__(/*! ./invert.js */ "./node_modules/simple-linalg/lib/invert.js"),
	mapMatrix: __webpack_require__(/*! ./map-matrix.js */ "./node_modules/simple-linalg/lib/map-matrix.js"),
	matMul: __webpack_require__(/*! ./mat-mul.js */ "./node_modules/simple-linalg/lib/mat-mul.js"),
	matPermutation: __webpack_require__(/*! ./mat-permutation.js */ "./node_modules/simple-linalg/lib/mat-permutation.js"),
	padWithZeroCols: __webpack_require__(/*! ./pad-with-zero-cols.js */ "./node_modules/simple-linalg/lib/pad-with-zero-cols.js"),
	subtract: __webpack_require__(/*! ./subtract.js */ "./node_modules/simple-linalg/lib/subtract.js"),
	subSquareMatrix: __webpack_require__(/*! ./sub-square-matrix.js */ "./node_modules/simple-linalg/lib/sub-square-matrix.js"),
	sum: __webpack_require__(/*! ./sum.js */ "./node_modules/simple-linalg/lib/sum.js"),
	trace: __webpack_require__(/*! ./trace.js */ "./node_modules/simple-linalg/lib/trace.js"),
	transpose: __webpack_require__(/*! ./transpose.js */ "./node_modules/simple-linalg/lib/transpose.js"),
	zeros: __webpack_require__(/*! ./zeros.js */ "./node_modules/simple-linalg/lib/zeros.js"),
	norm: __webpack_require__(/*! ./norm.js */ "./node_modules/simple-linalg/lib/norm.js"),
};


/***/ }),

/***/ "./node_modules/simple-linalg/lib/invert.js":
/*!**************************************************!*\
  !*** ./node_modules/simple-linalg/lib/invert.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const matrixInverse = __webpack_require__(/*! matrix-inverse */ "./node_modules/matrix-inverse/matrix-inverse.js");

module.exports = function (m) {
	return matrixInverse(m);
};


/***/ }),

/***/ "./node_modules/simple-linalg/lib/map-matrix.js":
/*!******************************************************!*\
  !*** ./node_modules/simple-linalg/lib/map-matrix.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports = function (a, fn) {
	return a.map((row, rowId) => row.map((cell, colId) => fn(cell, rowId, colId)));
};


/***/ }),

/***/ "./node_modules/simple-linalg/lib/mat-mul.js":
/*!***************************************************!*\
  !*** ./node_modules/simple-linalg/lib/mat-mul.js ***!
  \***************************************************/
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

/***/ "./node_modules/simple-linalg/lib/mat-permutation.js":
/*!***********************************************************!*\
  !*** ./node_modules/simple-linalg/lib/mat-permutation.js ***!
  \***********************************************************/
/***/ ((module) => {

/**
 *
 * @param {Array.<Array.<Number>>} matrix
 * @param {[Number, Number]} outputSize
 * @param {Array.<Number>} rowIndexes the permutation indexes, result[j][k] = matrix[rowIndexes.indexOf(j)][colIndexes.indexOf(k)]
 * @param {Array.<Number>} colIndexes the permutation indexes, result[j][k] = matrix[rowIndexes.indexOf(j)][colIndexes.indexOf(k)]
 * @returns {Array.<Array.<Number>>}
 */
module.exports = function ({
	matrix,
	outputSize,
	rowIndexes,
	colIndexes,
}) {
	const [nRow, nCol] = outputSize;

	if (!Array.isArray(rowIndexes)) {
		throw (new TypeError(`Invalid rowIndexes ${rowIndexes}`));
	}

	if (!Array.isArray(colIndexes)) {
		throw (new TypeError(`Invalid colIndexes ${colIndexes}`));
	}

	return new Array(nRow).fill(0).map((_, i) => new Array(nCol).fill(0).map((_, j) => {
		if (colIndexes.includes(j) && rowIndexes.includes(i)) {
			return matrix[rowIndexes.indexOf(i)][colIndexes.indexOf(j)];
		}

		return 0;
	}));
};


/***/ }),

/***/ "./node_modules/simple-linalg/lib/norm.js":
/*!************************************************!*\
  !*** ./node_modules/simple-linalg/lib/norm.js ***!
  \************************************************/
/***/ ((module) => {

module.exports = function (vector) {
	let result = 0;
	for (const element of vector) {
		result += (element * element);
	}

	return Math.sqrt(result);
};


/***/ }),

/***/ "./node_modules/simple-linalg/lib/pad-with-zero-cols.js":
/*!**************************************************************!*\
  !*** ./node_modules/simple-linalg/lib/pad-with-zero-cols.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const matPermutation = __webpack_require__(/*! ./mat-permutation */ "./node_modules/simple-linalg/lib/mat-permutation.js");
/**
*This function returns the padded matrix with zeros with respect to a given
* target columns number
*@param {Array.<Array.<Number>>} matrix the matrix we need to pad
*@param {Number} columns in our case, the dynamic dimension
*@returns {Array.<Array.<Number>>} padded matrix
*/
module.exports = function (matrix, {columns}) {
	if (columns < matrix[0].length) {
		throw (new TypeError(`Output columns ${columns} is greater than input columns ${matrix[0].length}`));
	}

	return matPermutation({
		matrix,
		outputSize: [matrix.length, columns],
		rowIndexes: new Array(matrix.length).fill(0).map((_, index) => index),
		colIndexes: new Array(matrix[0].length).fill(0).map((_, index) => index),
	});
};


/***/ }),

/***/ "./node_modules/simple-linalg/lib/sub-square-matrix.js":
/*!*************************************************************!*\
  !*** ./node_modules/simple-linalg/lib/sub-square-matrix.js ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = (mat, indexes) => {
	return indexes.map(s1 => indexes.map(s2 => mat[s1][s2]));
};


/***/ }),

/***/ "./node_modules/simple-linalg/lib/subtract.js":
/*!****************************************************!*\
  !*** ./node_modules/simple-linalg/lib/subtract.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const elemWise = __webpack_require__(/*! ./elem-wise */ "./node_modules/simple-linalg/lib/elem-wise.js");

module.exports = function (...args) {
	return elemWise(args, ([a, b]) => a - b);
};


/***/ }),

/***/ "./node_modules/simple-linalg/lib/sum.js":
/*!***********************************************!*\
  !*** ./node_modules/simple-linalg/lib/sum.js ***!
  \***********************************************/
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

/***/ "./node_modules/simple-linalg/lib/trace.js":
/*!*************************************************!*\
  !*** ./node_modules/simple-linalg/lib/trace.js ***!
  \*************************************************/
/***/ ((module) => {

module.exports = function (array) {
	let diag = 0;
	for (const [row, element] of array.entries()) {
		diag += element[row];
	}

	return diag;
};


/***/ }),

/***/ "./node_modules/simple-linalg/lib/transpose.js":
/*!*****************************************************!*\
  !*** ./node_modules/simple-linalg/lib/transpose.js ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = function (array) {
	return array[0].map((col, i) => array.map(row => row[i]));
};


/***/ }),

/***/ "./node_modules/simple-linalg/lib/zeros.js":
/*!*************************************************!*\
  !*** ./node_modules/simple-linalg/lib/zeros.js ***!
  \*************************************************/
/***/ ((module) => {

module.exports = function (rows, cols) {
	return new Array(rows).fill(1).map(() => new Array(cols).fill(0));
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	kalmanFilter = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2thbG1hbkZpbHRlci8uL2luZGV4LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9jb3JlLWthbG1hbi1maWx0ZXIuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL2R5bmFtaWMvY29tcG9zaXRpb24uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL2R5bmFtaWMvY29uc3RhbnQtYWNjZWxlcmF0aW9uLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9keW5hbWljL2NvbnN0YW50LXBvc2l0aW9uLXdpdGgtbnVsbC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvZHluYW1pYy9jb25zdGFudC1wb3NpdGlvbi5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvZHluYW1pYy9jb25zdGFudC1zcGVlZC1keW5hbWljLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9keW5hbWljL2NvbnN0YW50LXNwZWVkLXdpdGgtbnVsbC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvZHluYW1pYy9jb25zdGFudC1zcGVlZC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvZHluYW1pYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvZHluYW1pYy9zaG9ydHRlcm0tY29uc3RhbnQtc3BlZWQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL2thbG1hbi1maWx0ZXIuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL21vZGVsLWNvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL29ic2VydmF0aW9uL2luZGV4LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9vYnNlcnZhdGlvbi9zZW5zb3ItbG9jYWwtdmFyaWFuY2UuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL29ic2VydmF0aW9uL3NlbnNvci1wcm9qZWN0ZWQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL29ic2VydmF0aW9uL3NlbnNvci5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvc2V0dXAvYnVpbGQtc3RhdGUtcHJvamVjdGlvbi5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvc2V0dXAvY2hlY2stZGltZW5zaW9ucy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvc2V0dXAvZXh0ZW5kLWR5bmFtaWMtaW5pdC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvc2V0dXAvc2V0LWRpbWVuc2lvbnMuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3N0YXRlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy9hcnJheS10by1tYXRyaXguanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL2NoZWNrLWNvdmFyaWFuY2UuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL2NoZWNrLW1hdHJpeC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvY2hlY2stc2hhcGUuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL2NvcnJlbGF0aW9uLXRvLWNvdmFyaWFuY2UuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL2NvdmFyaWFuY2UtdG8tY29ycmVsYXRpb24uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL2RlZXAtYXNzaWduLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy9nZXQtY292YXJpYW5jZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvcG9seW1vcnBoLW1hdHJpeC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvcHJvamVjdC1vYnNlcnZhdGlvbi5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvdG8tZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL3VuaXEuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2luc3RhbmNlL2dldEFyZ3VtZW50LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9pbnN0YW5jZS9nZXRJbWFnaW5hcnkuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2luc3RhbmNlL2dldE1vZHVsdXMuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2luc3RhbmNlL2dldFJlYWwuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2luc3RhbmNlL3RvU3RyaW5nLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9zdGF0aWMvYWNvcy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc3RhdGljL2Fjb3QuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL3N0YXRpYy9hY3NjLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9zdGF0aWMvYWRkLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9zdGF0aWMvYXNlYy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc3RhdGljL2FzaW4uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL3N0YXRpYy9hdGFuLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9zdGF0aWMvY29uanVnYXRlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9zdGF0aWMvY29zLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9zdGF0aWMvY290LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9zdGF0aWMvY3NjLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9zdGF0aWMvZGl2aWRlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9zdGF0aWMvZXhwLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9zdGF0aWMvaW52ZXJzZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc3RhdGljL2lzRXF1YWwuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL3N0YXRpYy9pc05hTi5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc3RhdGljL2xvZy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc3RhdGljL211bHRpcGx5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9zdGF0aWMvcG93LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9zdGF0aWMvc2VjLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9zdGF0aWMvc2luLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9zdGF0aWMvc3VidHJhY3QuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL3N0YXRpYy90YW4uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvRXJyb3IuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvZGVjb21wb3NpdGlvbnMvTFUuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvZGVjb21wb3NpdGlvbnMvUVIuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvbGluZWFyLWVxdWF0aW9ucy9iYWNrd2FyZC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9saW5lYXItZXF1YXRpb25zL2ZvcndhcmQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvbGluZWFyLWVxdWF0aW9ucy9zb2x2ZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9vcGVyYXRpb25zL2FkZC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9vcGVyYXRpb25zL2ludmVyc2UuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvb3BlcmF0aW9ucy9tdWx0aXBseS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9vcGVyYXRpb25zL3Bvdy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9vcGVyYXRpb25zL3N1YnRyYWN0LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL29wZXJhdGlvbnMvdHJhbnNwb3NlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3Byb3BlcnRpZXMvY29uZC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9wcm9wZXJ0aWVzL2RldC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9wcm9wZXJ0aWVzL2VpZ2VudmFsdWVzLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3Byb3BlcnRpZXMvbm9ybS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9wcm9wZXJ0aWVzL251bGxpdHkuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvcHJvcGVydGllcy9yYW5rLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3Byb3BlcnRpZXMvc2l6ZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9wcm9wZXJ0aWVzL3RyYWNlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3N0cnVjdHVyZS9pc0RpYWdvbmFsLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3N0cnVjdHVyZS9pc0xvd2VyVHJpYW5ndWxhci5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9zdHJ1Y3R1cmUvaXNPcnRob2dvbmFsLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3N0cnVjdHVyZS9pc1NrZXdTeW1tZXRyaWMuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvc3RydWN0dXJlL2lzU3F1YXJlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3N0cnVjdHVyZS9pc1N5bW1ldHJpYy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9zdHJ1Y3R1cmUvaXNVcHBlclRyaWFuZ3VsYXIuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvY2xvbmUuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvY29sdW1uLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2RpYWcuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvZWxlbWVudHdpc2UuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvZW50cnkuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvZ2VuZXJhdGUuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvZ2V0RGlhZy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy9nZXRSYW5kb21NYXRyaXguanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvaWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvaXNFcXVhbC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy9yb3cuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvc3VibWF0cml4LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL3RvU3RyaW5nLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL3plcm8uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2luZGV4LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi91dGlsL2VtcHR5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi91dGlsL2lzTWF0cml4LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi91dGlsL2lzTnVtYmVyLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9tYXRyaXgtaW52ZXJzZS9tYXRyaXgtaW52ZXJzZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9pbmRleC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvYWRkLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9jb3Mtc2ltaWxhcml0eS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvZGlhZy1ibG9jay5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvZGlhZy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvZG90LXByb2R1Y3QuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL2VsZW0td2lzZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvZXVjbGlkZWFuLWRpc3QuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL2Zyb2Jlbml1cy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvaWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL2luZGV4LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9pbnZlcnQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL21hcC1tYXRyaXguanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL21hdC1tdWwuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL21hdC1wZXJtdXRhdGlvbi5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvbm9ybS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvcGFkLXdpdGgtemVyby1jb2xzLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9zdWItc3F1YXJlLW1hdHJpeC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvc3VidHJhY3QuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL3N1bS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvdHJhY2UuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL3RyYW5zcG9zZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvemVyb3MuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2thbG1hbkZpbHRlci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2thbG1hbkZpbHRlci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb2RlbENvbGxlY3Rpb24gPSByZXF1aXJlKCcuL2xpYi9tb2RlbC1jb2xsZWN0aW9uJyk7XG5jb25zdCBkZWZhdWx0RHluYW1pY01vZGVscyA9IHJlcXVpcmUoJy4vbGliL2R5bmFtaWMnKTtcbmNvbnN0IGRlZmF1bHRPYnNlcnZhdGlvbk1vZGVscyA9IHJlcXVpcmUoJy4vbGliL29ic2VydmF0aW9uJyk7XG5cbk9iamVjdC5rZXlzKGRlZmF1bHREeW5hbWljTW9kZWxzKS5mb3JFYWNoKGsgPT4ge1xuXHRtb2RlbENvbGxlY3Rpb24ucmVnaXN0ZXJEeW5hbWljKGssIGRlZmF1bHREeW5hbWljTW9kZWxzW2tdKTtcbn0pO1xuXG5PYmplY3Qua2V5cyhkZWZhdWx0T2JzZXJ2YXRpb25Nb2RlbHMpLmZvckVhY2goayA9PiB7XG5cdG1vZGVsQ29sbGVjdGlvbi5yZWdpc3Rlck9ic2VydmF0aW9uKGssIGRlZmF1bHRPYnNlcnZhdGlvbk1vZGVsc1trXSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKHtcblx0S2FsbWFuRmlsdGVyOiByZXF1aXJlKCcuL2xpYi9rYWxtYW4tZmlsdGVyJyksXG5cdGdldENvdmFyaWFuY2U6IHJlcXVpcmUoJy4vbGliL3V0aWxzL2dldC1jb3ZhcmlhbmNlJyksXG5cdFN0YXRlOiByZXF1aXJlKCcuL2xpYi9zdGF0ZScpLFxuXHRjaGVja0NvdmFyaWFuY2U6IHJlcXVpcmUoJy4vbGliL3V0aWxzL2NoZWNrLWNvdmFyaWFuY2UnKSxcblx0Y29ycmVsYXRpb25Ub0NvdmFyaWFuY2U6IHJlcXVpcmUoJy4vbGliL3V0aWxzL2NvcnJlbGF0aW9uLXRvLWNvdmFyaWFuY2UnKSxcblx0Y292YXJpYW5jZVRvQ29ycmVsYXRpb246IHJlcXVpcmUoJy4vbGliL3V0aWxzL2NvdmFyaWFuY2UtdG8tY29ycmVsYXRpb24nKSxcblx0cHJvamVjdE9ic2VydmF0aW9uOiByZXF1aXJlKCcuL2xpYi91dGlscy9wcm9qZWN0LW9ic2VydmF0aW9uJyksXG59LCBtb2RlbENvbGxlY3Rpb24pO1xuIiwiY29uc3Qge21hdE11bCwgdHJhbnNwb3NlLCBhZGQsIGludmVydCwgc3VidHJhY3Q6IHN1YiwgaWRlbnRpdHk6IGdldElkZW50aXR5fSA9IHJlcXVpcmUoJ3NpbXBsZS1saW5hbGcnKTtcbmNvbnN0IFN0YXRlID0gcmVxdWlyZSgnLi9zdGF0ZS5qcycpO1xuY29uc3QgY2hlY2tNYXRyaXggPSByZXF1aXJlKCcuL3V0aWxzL2NoZWNrLW1hdHJpeC5qcycpO1xuLyoqXG4qIEBjYWxsYmFjayBQcmV2aW91c0NvcnJlY3RlZENhbGxiYWNrXG4qIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4qIEBwYXJhbSB7TnVtYmVyfSBvcHRzLmluZGV4XG4qIEBwYXJhbSB7TnVtYmVyfSBvcHRzLnByZXZpb3VzQ29ycmVjdGVkXG4qIEByZXR1cm5zIHtBcnJheS5BcnJheS48TnVtYmVyPj59XG4qL1xuXG4vKipcbiogQGNhbGxiYWNrIFByZWRpY3RlZENhbGxiYWNrXG4qIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4qIEBwYXJhbSB7TnVtYmVyfSBvcHRzLmluZGV4XG4qIEBwYXJhbSB7U3RhdGV9IG9wdHMucHJlZGljdGVkXG4qIEBwYXJhbSB7T2JzZXJ2YXRpb259IG9wdHMub2JzZXJ2YXRpb25cbiogQHJldHVybnMge0FycmF5LkFycmF5LjxOdW1iZXI+Pn1cbiovXG5cbi8qKlxuKiBAdHlwZWRlZiB7T2JqZWN0fSBPYnNlcnZhdGlvbkNvbmZpZ1xuKiBAcHJvcGVydHkge051bWJlcn0gZGltZW5zaW9uXG4qIEBwcm9wZXJ0eSB7UHJlZGljdGVkQ2FsbGJhY2t9IFtmbj1udWxsXSBmb3IgZXh0ZW5kZWQga2FsbWFuIGZpbHRlciBvbmx5LCB0aGUgbm9uLWxpbmVhciBzdGF0ZSB0byBvYnNlcnZhdGlvbiBmdW5jdGlvblxuKiBAcHJvcGVydHkge0FycmF5LkFycmF5LjxOdW1iZXI+PiB8IFByZXZpb3VzQ29ycmVjdGVkQ2FsbGJhY2t9IHN0YXRlUHJvamVjdGlvbiB0aGUgbWF0cml4IHRvIHRyYW5zZm9ybSBzdGF0ZSB0byBvYnNlcnZhdGlvbiAoZm9yIEVLRiwgdGhlIGphY29iaWFuIG9mIHRoZSBmbilcbiogQHByb3BlcnR5IHtBcnJheS5BcnJheS48TnVtYmVyPj4gfCBQcmV2aW91c0NvcnJlY3RlZENhbGxiYWNrfSBjb3ZhcmlhbmNlIHRoZSBjb3ZhcmlhbmNlIG9mIHRoZSBvYnNlcnZhdGlvbiBub2lzZVxuKi9cblxuLyoqXG4qIEB0eXBlZGVmIHtPYmplY3R9IER5bmFtaWNDb25maWdcbiogQHByb3BlcnR5IHtOdW1iZXJ9IGRpbWVuc2lvbiBkaW1lbnNpb24gb2YgdGhlIHN0YXRlIHZlY3RvclxuKiBAcHJvcGVydHkge1ByZXZpb3VzQ29ycmVjdGVkQ2FsbGJhY2t9IFtjb25zdGFudD1udWxsXSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgY29udHJvbCBwYXJhbWV0ZXIgQl9rKnVfayBvZiB0aGUga2FsbWFuIGZpbHRlclxuKiBAcHJvcGVydHkge1ByZXZpb3VzQ29ycmVjdGVkQ2FsbGJhY2t9IFtmbj1udWxsXSBmb3IgZXh0ZW5kZWQga2FsbWFuIGZpbHRlciBvbmx5LCB0aGUgbm9uLWxpbmVhciBzdGF0ZS10cmFuc2l0aW9uIG1vZGVsXG4qIEBwcm9wZXJ0eSB7QXJyYXkuQXJyYXkuPE51bWJlcj4+IHwgUHJlZGljdGVkQ2FsbGJhY2t9IHRyYW5zaXRpb24gdGhlIHN0YXRlLXRyYW5zaXRpb24gbW9kZWwgKG9yIGZvciBFS0YgdGhlIGphY29iaWFuIG9mIHRoZSBmbilcbiogQHByb3BlcnR5IHtBcnJheS5BcnJheS48TnVtYmVyPj4gfCBQcmVkaWN0ZWRDYWxsYmFja30gY292YXJpYW5jZSB0aGUgY292YXJpYW5jZSBvZiB0aGUgcHJvY2VzcyBub2lzZVxuKi9cblxuLyoqXG4qIEB0eXBlZGVmIHtPYmplY3R9IENvcmVDb25maWdcbiogQHByb3BlcnR5IHtEeW5hbWljQ29uZmlnfSBkeW5hbWljIHRoZSBzeXN0ZW0ncyBkeW5hbWljIG1vZGVsXG4qIEBwcm9wZXJ0eSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uIHRoZSBzeXN0ZW0ncyBvYnNlcnZhdGlvbiBtb2RlbFxuKiBAcHJvcGVydHkge09iamVjdH0gW2xvZ2dlcj1kZWZhdWx0TG9nZ2VyXSBhIFdpbnN0b24tbGlrZSBsb2dnZXJcbiovXG5jb25zdCBkZWZhdWx0TG9nZ2VyID0ge1xuXHRpbmZvOiAoLi4uYXJncykgPT4gY29uc29sZS5sb2coLi4uYXJncyksXG5cdGRlYnVnKCkge30sXG5cdHdhcm46ICguLi5hcmdzKSA9PiBjb25zb2xlLmxvZyguLi5hcmdzKSxcblx0ZXJyb3I6ICguLi5hcmdzKSA9PiBjb25zb2xlLmxvZyguLi5hcmdzKSxcbn07XG4vKipcbiAqIEBwYXJhbSB7Q29yZUNvbmZpZ30gb3B0aW9uc1xuKi9cbmNsYXNzIENvcmVLYWxtYW5GaWx0ZXIge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0Y29uc3Qge2R5bmFtaWMsIG9ic2VydmF0aW9uLCBsb2dnZXIgPSBkZWZhdWx0TG9nZ2VyfSA9IG9wdGlvbnM7XG5cdFx0dGhpcy5keW5hbWljID0gZHluYW1pYztcblx0XHR0aGlzLm9ic2VydmF0aW9uID0gb2JzZXJ2YXRpb247XG5cdFx0dGhpcy5sb2dnZXIgPSBsb2dnZXI7XG5cdH1cblxuXHRnZXRWYWx1ZShmbiwgb3B0aW9ucykge1xuXHRcdHJldHVybiAodHlwZW9mIChmbikgPT09ICdmdW5jdGlvbicgPyBmbihvcHRpb25zKSA6IGZuKTtcblx0fVxuXG5cdGdldEluaXRTdGF0ZSgpIHtcblx0XHRjb25zdCB7bWVhbjogbWVhbkluaXQsIGNvdmFyaWFuY2U6IGNvdmFyaWFuY2VJbml0LCBpbmRleDogaW5kZXhJbml0fSA9IHRoaXMuZHluYW1pYy5pbml0O1xuXG5cdFx0Y29uc3QgaW5pdFN0YXRlID0gbmV3IFN0YXRlKHtcblx0XHRcdG1lYW46IG1lYW5Jbml0LFxuXHRcdFx0Y292YXJpYW5jZTogY292YXJpYW5jZUluaXQsXG5cdFx0XHRpbmRleDogaW5kZXhJbml0LFxuXHRcdH0pO1xuXHRcdFN0YXRlLmNoZWNrKGluaXRTdGF0ZSwge3RpdGxlOiAnZHluYW1pYy5pbml0J30pO1xuXHRcdHJldHVybiBpbml0U3RhdGU7XG5cdH1cblxuXHQvKipcblx0VGhpcyB3aWxsIHJldHVybiB0aGUgcHJlZGljdGVkIGNvdmFyaWFuY2Ugb2YgYSBnaXZlbiBwcmV2aW91c0NvcnJlY3RlZCBTdGF0ZSwgdGhpcyB3aWxsIGhlbHAgdXMgdG8gYnVpbGQgdGhlIGFzeW1wdG90aWNTdGF0ZS5cblx0KiBAcGFyYW0ge1N0YXRlfSBwcmV2aW91c0NvcnJlY3RlZFxuXHQqIEByZXR1cm5ze0FycmF5LjxBcnJheS48TnVtYmVyPj59XG5cdCovXG5cblx0Z2V0UHJlZGljdGVkQ292YXJpYW5jZShvcHRpb25zID0ge30pIHtcblx0XHRsZXQge3ByZXZpb3VzQ29ycmVjdGVkLCBpbmRleH0gPSBvcHRpb25zO1xuXHRcdHByZXZpb3VzQ29ycmVjdGVkID0gcHJldmlvdXNDb3JyZWN0ZWQgfHwgdGhpcy5nZXRJbml0U3RhdGUoKTtcblxuXHRcdGNvbnN0IGdldFZhbHVlT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHtwcmV2aW91c0NvcnJlY3RlZCwgaW5kZXh9LCBvcHRpb25zKTtcblx0XHRjb25zdCB0cmFuc2l0aW9uID0gdGhpcy5nZXRWYWx1ZSh0aGlzLmR5bmFtaWMudHJhbnNpdGlvbiwgZ2V0VmFsdWVPcHRpb25zKTtcblxuXHRcdGNoZWNrTWF0cml4KHRyYW5zaXRpb24sIFt0aGlzLmR5bmFtaWMuZGltZW5zaW9uLCB0aGlzLmR5bmFtaWMuZGltZW5zaW9uXSwgJ2R5bmFtaWMudHJhbnNpdGlvbicpO1xuXG5cdFx0Y29uc3QgdHJhbnNpdGlvblRyYW5zcG9zZWQgPSB0cmFuc3Bvc2UodHJhbnNpdGlvbik7XG5cdFx0Y29uc3QgY292YXJpYW5jZUludGVyID0gbWF0TXVsKHRyYW5zaXRpb24sIHByZXZpb3VzQ29ycmVjdGVkLmNvdmFyaWFuY2UpO1xuXHRcdGNvbnN0IGNvdmFyaWFuY2VQcmV2aW91cyA9IG1hdE11bChjb3ZhcmlhbmNlSW50ZXIsIHRyYW5zaXRpb25UcmFuc3Bvc2VkKTtcblx0XHRjb25zdCBkeW5Db3YgPSB0aGlzLmdldFZhbHVlKHRoaXMuZHluYW1pYy5jb3ZhcmlhbmNlLCBnZXRWYWx1ZU9wdGlvbnMpO1xuXG5cdFx0Y29uc3QgY292YXJpYW5jZSA9IGFkZChcblx0XHRcdGR5bkNvdixcblx0XHRcdGNvdmFyaWFuY2VQcmV2aW91cyxcblx0XHQpO1xuXHRcdGNoZWNrTWF0cml4KGNvdmFyaWFuY2UsIFt0aGlzLmR5bmFtaWMuZGltZW5zaW9uLCB0aGlzLmR5bmFtaWMuZGltZW5zaW9uXSwgJ3ByZWRpY3RlZC5jb3ZhcmlhbmNlJyk7XG5cblx0XHRyZXR1cm4gY292YXJpYW5jZTtcblx0fVxuXG5cdHByZWRpY3RNZWFuKG8pIHtcblx0XHRjb25zdCBtZWFuID0gdGhpcy5wcmVkaWN0TWVhbldpdGhvdXRDb250cm9sKG8pO1xuXHRcdGlmICghdGhpcy5keW5hbWljLmNvbnN0YW50KSB7XG5cdFx0XHRyZXR1cm4gbWVhbjtcblx0XHR9XG5cblx0XHRjb25zdCB7b3B0c30gPSBvO1xuXHRcdGNvbnN0IGNvbnRyb2wgPSB0aGlzLmR5bmFtaWMuY29uc3RhbnQob3B0cyk7XG5cdFx0Y2hlY2tNYXRyaXgoY29udHJvbCwgW3RoaXMuZHluYW1pYy5kaW1lbnNpb24sIDFdLCAnZHluYW1pYy5jb25zdGFudCcpO1xuXHRcdHJldHVybiBhZGQobWVhbiwgY29udHJvbCk7XG5cdH1cblxuXHRwcmVkaWN0TWVhbldpdGhvdXRDb250cm9sKHtvcHRzLCB0cmFuc2l0aW9ufSkge1xuXHRcdGlmICh0aGlzLmR5bmFtaWMuZm4pIHtcblx0XHRcdHJldHVybiB0aGlzLmR5bmFtaWMuZm4ob3B0cyk7XG5cdFx0fVxuXG5cdFx0Y29uc3Qge3ByZXZpb3VzQ29ycmVjdGVkfSA9IG9wdHM7XG5cdFx0cmV0dXJuIG1hdE11bCh0cmFuc2l0aW9uLCBwcmV2aW91c0NvcnJlY3RlZC5tZWFuKTtcblx0fVxuXHQvKipcblx0VGhpcyB3aWxsIHJldHVybiB0aGUgbmV3IHByZWRpY3Rpb24sIHJlbGF0aXZlbHkgdG8gdGhlIGR5bmFtaWMgbW9kZWwgY2hvc2VuXG5cdCogQHBhcmFtIHtTdGF0ZX0gcHJldmlvdXNDb3JyZWN0ZWQgU3RhdGUgcmVsYXRpdmUgdG8gb3VyIGR5bmFtaWMgbW9kZWxcblx0KiBAcmV0dXJuc3tTdGF0ZX0gcHJlZGljdGVkIFN0YXRlXG5cdCovXG5cblx0cHJlZGljdChvcHRpb25zID0ge30pIHtcblx0XHRsZXQge3ByZXZpb3VzQ29ycmVjdGVkLCBpbmRleH0gPSBvcHRpb25zO1xuXHRcdHByZXZpb3VzQ29ycmVjdGVkID0gcHJldmlvdXNDb3JyZWN0ZWQgfHwgdGhpcy5nZXRJbml0U3RhdGUoKTtcblxuXHRcdGlmICh0eXBlb2YgKGluZGV4KSAhPT0gJ251bWJlcicgJiYgdHlwZW9mIChwcmV2aW91c0NvcnJlY3RlZC5pbmRleCkgPT09ICdudW1iZXInKSB7XG5cdFx0XHRpbmRleCA9IHByZXZpb3VzQ29ycmVjdGVkLmluZGV4ICsgMTtcblx0XHR9XG5cblx0XHRTdGF0ZS5jaGVjayhwcmV2aW91c0NvcnJlY3RlZCwge2RpbWVuc2lvbjogdGhpcy5keW5hbWljLmRpbWVuc2lvbn0pO1xuXHRcdGNvbnN0IGdldFZhbHVlT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHtcblx0XHRcdHByZXZpb3VzQ29ycmVjdGVkLFxuXHRcdFx0aW5kZXgsXG5cdFx0fSk7XG5cblx0XHRjb25zdCB0cmFuc2l0aW9uID0gdGhpcy5nZXRWYWx1ZSh0aGlzLmR5bmFtaWMudHJhbnNpdGlvbiwgZ2V0VmFsdWVPcHRpb25zKTtcblxuXHRcdGNvbnN0IG1lYW4gPSB0aGlzLnByZWRpY3RNZWFuKHt0cmFuc2l0aW9uLCBvcHRzOiBnZXRWYWx1ZU9wdGlvbnN9KTtcblxuXHRcdGNvbnN0IGNvdmFyaWFuY2UgPSB0aGlzLmdldFByZWRpY3RlZENvdmFyaWFuY2UoZ2V0VmFsdWVPcHRpb25zKTtcblxuXHRcdGNvbnN0IHByZWRpY3RlZCA9IG5ldyBTdGF0ZSh7bWVhbiwgY292YXJpYW5jZSwgaW5kZXh9KTtcblx0XHR0aGlzLmxvZ2dlci5kZWJ1ZygnUHJlZGljdGlvbiBkb25lJywgcHJlZGljdGVkKTtcblx0XHRpZiAoTnVtYmVyLmlzTmFOKHByZWRpY3RlZC5tZWFuWzBdWzBdKSkge1xuXHRcdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoJ25hbicpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcHJlZGljdGVkO1xuXHR9XG5cdC8qKlxuXHRUaGlzIHdpbGwgcmV0dXJuIHRoZSBuZXcgY29ycmVjdGlvbiwgdGFraW5nIGludG8gYWNjb3VudCB0aGUgcHJlZGljdGlvbiBtYWRlXG5cdGFuZCB0aGUgb2JzZXJ2YXRpb24gb2YgdGhlIHNlbnNvclxuXHQqIEBwYXJhbSB7U3RhdGV9IHByZWRpY3RlZCB0aGUgcHJldmlvdXMgU3RhdGVcblx0KiBAcmV0dXJuc3tBcnJheTxBcnJheT59IGthbG1hbkdhaW5cblx0Ki9cblxuXHRnZXRHYWluKG9wdGlvbnMpIHtcblx0XHRsZXQge3ByZWRpY3RlZCwgc3RhdGVQcm9qZWN0aW9ufSA9IG9wdGlvbnM7XG5cdFx0Y29uc3QgZ2V0VmFsdWVPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwge2luZGV4OiBwcmVkaWN0ZWQuaW5kZXh9LCBvcHRpb25zKTtcblx0XHRzdGF0ZVByb2plY3Rpb24gPSBzdGF0ZVByb2plY3Rpb24gfHwgdGhpcy5nZXRWYWx1ZSh0aGlzLm9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbiwgZ2V0VmFsdWVPcHRpb25zKTtcblx0XHRjb25zdCBvYnNDb3ZhcmlhbmNlID0gdGhpcy5nZXRWYWx1ZSh0aGlzLm9ic2VydmF0aW9uLmNvdmFyaWFuY2UsIGdldFZhbHVlT3B0aW9ucyk7XG5cdFx0Y2hlY2tNYXRyaXgob2JzQ292YXJpYW5jZSwgW3RoaXMub2JzZXJ2YXRpb24uZGltZW5zaW9uLCB0aGlzLm9ic2VydmF0aW9uLmRpbWVuc2lvbl0sICdvYnNlcnZhdGlvbi5jb3ZhcmlhbmNlJyk7XG5cdFx0Y29uc3Qgc3RhdGVQcm9qVHJhbnNwb3NlZCA9IHRyYW5zcG9zZShzdGF0ZVByb2plY3Rpb24pO1xuXG5cdFx0Y2hlY2tNYXRyaXgoc3RhdGVQcm9qZWN0aW9uLCBbdGhpcy5vYnNlcnZhdGlvbi5kaW1lbnNpb24sIHRoaXMuZHluYW1pYy5kaW1lbnNpb25dLCAnb2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uJyk7XG5cblx0XHRjb25zdCBub2lzZWxlc3NJbm5vdmF0aW9uID0gbWF0TXVsKFxuXHRcdFx0bWF0TXVsKHN0YXRlUHJvamVjdGlvbiwgcHJlZGljdGVkLmNvdmFyaWFuY2UpLFxuXHRcdFx0c3RhdGVQcm9qVHJhbnNwb3NlZCxcblx0XHQpO1xuXG5cdFx0Y29uc3QgaW5ub3ZhdGlvbkNvdmFyaWFuY2UgPSBhZGQobm9pc2VsZXNzSW5ub3ZhdGlvbiwgb2JzQ292YXJpYW5jZSk7XG5cblx0XHRjb25zdCBvcHRpbWFsS2FsbWFuR2FpbiA9IG1hdE11bChcblx0XHRcdG1hdE11bChwcmVkaWN0ZWQuY292YXJpYW5jZSwgc3RhdGVQcm9qVHJhbnNwb3NlZCksXG5cdFx0XHRpbnZlcnQoaW5ub3ZhdGlvbkNvdmFyaWFuY2UpLFxuXHRcdCk7XG5cblx0XHRyZXR1cm4gb3B0aW1hbEthbG1hbkdhaW47XG5cdH1cblxuXHQvKipcblx0VGhpcyB3aWxsIHJldHVybiB0aGUgY29ycmVjdGVkIGNvdmFyaWFuY2Ugb2YgYSBnaXZlbiBwcmVkaWN0ZWQgU3RhdGUsIHRoaXMgd2lsbCBoZWxwIHVzIHRvIGJ1aWxkIHRoZSBhc3ltcHRvdGljU3RhdGUuXG5cdCogQHBhcmFtIHtTdGF0ZX0gcHJlZGljdGVkIHRoZSBwcmV2aW91cyBTdGF0ZVxuXHQqIEByZXR1cm5ze0FycmF5LjxBcnJheS48TnVtYmVyPj59XG5cdCovXG5cblx0Z2V0Q29ycmVjdGVkQ292YXJpYW5jZShvcHRpb25zKSB7XG5cdFx0bGV0IHtwcmVkaWN0ZWQsIG9wdGltYWxLYWxtYW5HYWluLCBzdGF0ZVByb2plY3Rpb259ID0gb3B0aW9ucztcblx0XHRjb25zdCBpZGVudGl0eSA9IGdldElkZW50aXR5KHByZWRpY3RlZC5jb3ZhcmlhbmNlLmxlbmd0aCk7XG5cdFx0aWYgKCFzdGF0ZVByb2plY3Rpb24pIHtcblx0XHRcdGNvbnN0IGdldFZhbHVlT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHtpbmRleDogcHJlZGljdGVkLmluZGV4fSwgb3B0aW9ucyk7XG5cdFx0XHRzdGF0ZVByb2plY3Rpb24gPSB0aGlzLmdldFZhbHVlKHRoaXMub2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uLCBnZXRWYWx1ZU9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGlmICghb3B0aW1hbEthbG1hbkdhaW4pIHtcblx0XHRcdG9wdGltYWxLYWxtYW5HYWluID0gdGhpcy5nZXRHYWluKE9iamVjdC5hc3NpZ24oe3N0YXRlUHJvamVjdGlvbn0sIG9wdGlvbnMpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbWF0TXVsKFxuXHRcdFx0c3ViKGlkZW50aXR5LCBtYXRNdWwob3B0aW1hbEthbG1hbkdhaW4sIHN0YXRlUHJvamVjdGlvbikpLFxuXHRcdFx0cHJlZGljdGVkLmNvdmFyaWFuY2UsXG5cdFx0KTtcblx0fVxuXG5cdGdldFByZWRpY3RlZE9ic2VydmF0aW9uKHtvcHRzLCBzdGF0ZVByb2plY3Rpb259KSB7XG5cdFx0aWYgKHRoaXMub2JzZXJ2YXRpb24uZm4pIHtcblx0XHRcdHJldHVybiB0aGlzLm9ic2VydmF0aW9uLmZuKG9wdHMpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHtwcmVkaWN0ZWR9ID0gb3B0cztcblx0XHRyZXR1cm4gbWF0TXVsKHN0YXRlUHJvamVjdGlvbiwgcHJlZGljdGVkLm1lYW4pO1xuXHR9XG5cblx0LyoqXG5cdFRoaXMgd2lsbCByZXR1cm4gdGhlIG5ldyBjb3JyZWN0aW9uLCB0YWtpbmcgaW50byBhY2NvdW50IHRoZSBwcmVkaWN0aW9uIG1hZGVcblx0YW5kIHRoZSBvYnNlcnZhdGlvbiBvZiB0aGUgc2Vuc29yXG5cdCogQHBhcmFtIHtTdGF0ZX0gcHJlZGljdGVkIHRoZSBwcmV2aW91cyBTdGF0ZVxuXHQqIEBwYXJhbSB7QXJyYXl9IG9ic2VydmF0aW9uIHRoZSBvYnNlcnZhdGlvbiBvZiB0aGUgc2Vuc29yXG5cdCogQHJldHVybnN7U3RhdGV9IGNvcnJlY3RlZCBTdGF0ZSBvZiB0aGUgS2FsbWFuIEZpbHRlclxuXHQqL1xuXG5cdGNvcnJlY3Qob3B0aW9ucykge1xuXHRcdGNvbnN0IHtwcmVkaWN0ZWQsIG9ic2VydmF0aW9ufSA9IG9wdGlvbnM7XG5cdFx0U3RhdGUuY2hlY2socHJlZGljdGVkLCB7ZGltZW5zaW9uOiB0aGlzLmR5bmFtaWMuZGltZW5zaW9ufSk7XG5cdFx0aWYgKCFvYnNlcnZhdGlvbikge1xuXHRcdFx0dGhyb3cgKG5ldyBFcnJvcignbm8gbWVhc3VyZSBhdmFpbGFibGUnKSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0VmFsdWVPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwge29ic2VydmF0aW9uLCBwcmVkaWN0ZWQsIGluZGV4OiBwcmVkaWN0ZWQuaW5kZXh9LCBvcHRpb25zKTtcblx0XHRjb25zdCBzdGF0ZVByb2plY3Rpb24gPSB0aGlzLmdldFZhbHVlKHRoaXMub2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uLCBnZXRWYWx1ZU9wdGlvbnMpO1xuXG5cdFx0Y29uc3Qgb3B0aW1hbEthbG1hbkdhaW4gPSB0aGlzLmdldEdhaW4oT2JqZWN0LmFzc2lnbih7cHJlZGljdGVkLCBzdGF0ZVByb2plY3Rpb259LCBvcHRpb25zKSk7XG5cblx0XHRjb25zdCBpbm5vdmF0aW9uID0gc3ViKFxuXHRcdFx0b2JzZXJ2YXRpb24sXG5cdFx0XHR0aGlzLmdldFByZWRpY3RlZE9ic2VydmF0aW9uKHtzdGF0ZVByb2plY3Rpb24sIG9wdHM6IGdldFZhbHVlT3B0aW9uc30pLFxuXHRcdCk7XG5cblx0XHRjb25zdCBtZWFuID0gYWRkKFxuXHRcdFx0cHJlZGljdGVkLm1lYW4sXG5cdFx0XHRtYXRNdWwob3B0aW1hbEthbG1hbkdhaW4sIGlubm92YXRpb24pLFxuXHRcdCk7XG5cdFx0aWYgKE51bWJlci5pc05hTihtZWFuWzBdWzBdKSkge1xuXHRcdFx0Y29uc29sZS5sb2coe29wdGltYWxLYWxtYW5HYWluLCBpbm5vdmF0aW9uLCBwcmVkaWN0ZWR9KTtcblx0XHRcdHRocm93IChuZXcgVHlwZUVycm9yKCdNZWFuIGlzIE5hTiBhZnRlciBjb3JyZWN0aW9uJykpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGNvdmFyaWFuY2UgPSB0aGlzLmdldENvcnJlY3RlZENvdmFyaWFuY2UoT2JqZWN0LmFzc2lnbih7cHJlZGljdGVkLCBvcHRpbWFsS2FsbWFuR2Fpbiwgc3RhdGVQcm9qZWN0aW9ufSwgb3B0aW9ucykpO1xuXHRcdGNvbnN0IGNvcnJlY3RlZCA9IG5ldyBTdGF0ZSh7bWVhbiwgY292YXJpYW5jZSwgaW5kZXg6IHByZWRpY3RlZC5pbmRleH0pO1xuXHRcdHRoaXMubG9nZ2VyLmRlYnVnKCdDb3JyZWN0aW9uIGRvbmUnLCBjb3JyZWN0ZWQpO1xuXHRcdHJldHVybiBjb3JyZWN0ZWQ7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb3JlS2FsbWFuRmlsdGVyO1xuIiwiY29uc3Qge2J1aWxkRHluYW1pY30gPSByZXF1aXJlKCcuLi9tb2RlbC1jb2xsZWN0aW9uJyk7XG5cbi8qKlxuKiBAdHlwZWRlZiB7T2JqZWN0LjxEeW5hbWljTmFtZSwgRHluYW1pY0NvbmZpZz59IFBlck5hbWVDb25maWdzXG4qL1xuLyoqXG4qIEB0eXBlZGVmIHtPYmplY3R9IER5bmFtaWNDb25maWdcbiogQHBhcmFtIHtBcnJheS48TnVtYmVyPn0gb2JzSW5kZXhlc1xuKiBAcGFyYW0ge0NvdmFyaWFuY2V9IHN0YXRpY0NvdmFyaWFuY2VcbiovXG5cbi8qKlxuKkNyZWF0ZXMgYSBkeW5hbWljIG1vZGVsLCBjb25zaWRlcmluZyB0aGUgbnVsbCBpbiBvcmRlciB0byBtYWtlIHRoZSBwcmVkaWN0aW9uc1xuKiBAcGFyYW0ge09iamVjdH0gbWFpblxuKiBAcGFyYW0ge09iamVjdC48U3RyaW5nLCBEeW5hbWljQ29uZmlnPn0gbWFpbi5wZXJOYW1lXG4qIEBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uXG4qIEBwYXJhbSB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gb3B0cy5vYnNlcnZlZFByb2plY3Rpb25cbiogQHJldHVybnMge0R5bmFtaWNDb25maWd9XG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe3Blck5hbWV9LCBvYnNlcnZhdGlvbikge1xuXHRjb25zdCB7b2JzZXJ2ZWRQcm9qZWN0aW9ufSA9IG9ic2VydmF0aW9uO1xuXHRjb25zdCBvYnNlcnZlZER5bmFtRGltZW5zaW9uID0gb2JzZXJ2ZWRQcm9qZWN0aW9uWzBdLmxlbmd0aDtcblxuXHRjb25zdCBkeW5hbWljTmFtZXMgPSBPYmplY3Qua2V5cyhwZXJOYW1lKTtcblxuXHRjb25zdCBjb25mcyA9IHt9O1xuXHRsZXQgbmV4dER5bmFtaWNEaW1lbnNpb24gPSBvYnNlcnZlZER5bmFtRGltZW5zaW9uO1xuXHRsZXQgbmV4dE9ic2VydmVkRGltZW5zaW9uID0gMDtcblx0ZHluYW1pY05hbWVzLmZvckVhY2goayA9PiB7XG5cdFx0Y29uc3Qgb2JzRHluYUluZGV4ZXMgPSBwZXJOYW1lW2tdLm9ic0R5bmFJbmRleGVzO1xuXHRcdGlmICh0eXBlb2YgKHBlck5hbWVba10ubmFtZSkgPT09ICdzdHJpbmcnICYmIHBlck5hbWVba10ubmFtZSAhPT0gaykge1xuXHRcdFx0dGhyb3cgKG5ldyBFcnJvcihgJHtwZXJOYW1lW2tdLm5hbWV9IGFuZCBcIiR7a31cIiBzaG91bGQgbWF0Y2hgKSk7XG5cdFx0fVxuXG5cdFx0cGVyTmFtZVtrXS5uYW1lID0gaztcblxuXHRcdGNvbnN0IHtkaW1lbnNpb24sIHRyYW5zaXRpb24sIGNvdmFyaWFuY2UsIGluaXR9ID0gYnVpbGREeW5hbWljKHBlck5hbWVba10sIG9ic2VydmF0aW9uKTtcblxuXHRcdGNvbnN0IGR5bmFtaWNJbmRleGVzID0gW107XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkaW1lbnNpb247IGkrKykge1xuXHRcdFx0Y29uc3QgaXNPYnNlcnZlZCA9IChpIDwgb2JzRHluYUluZGV4ZXMubGVuZ3RoKTtcblx0XHRcdGxldCBuZXdJbmRleDtcblx0XHRcdGlmIChpc09ic2VydmVkKSB7XG5cdFx0XHRcdG5ld0luZGV4ID0gbmV4dE9ic2VydmVkRGltZW5zaW9uO1xuXHRcdFx0XHRpZiAobmV3SW5kZXggIT09IG9ic0R5bmFJbmRleGVzW2ldKSB7XG5cdFx0XHRcdFx0dGhyb3cgKG5ldyBFcnJvcigndGhzb2Ugc2hvdWxkIG1hdGNoJykpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bmV4dE9ic2VydmVkRGltZW5zaW9uKys7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRuZXdJbmRleCA9IG5leHREeW5hbWljRGltZW5zaW9uO1xuXHRcdFx0XHRuZXh0RHluYW1pY0RpbWVuc2lvbisrO1xuXHRcdFx0fVxuXG5cdFx0XHRkeW5hbWljSW5kZXhlcy5wdXNoKG5ld0luZGV4KTtcblx0XHR9XG5cblx0XHRjb25mc1trXSA9IHtcblx0XHRcdGR5bmFtaWNJbmRleGVzLFxuXHRcdFx0dHJhbnNpdGlvbixcblx0XHRcdGRpbWVuc2lvbixcblx0XHRcdGNvdmFyaWFuY2UsXG5cdFx0XHRpbml0LFxuXHRcdH07XG5cdH0pO1xuXG5cdGNvbnN0IHRvdGFsRGltZW5zaW9uID0gZHluYW1pY05hbWVzLm1hcChrID0+IGNvbmZzW2tdLmRpbWVuc2lvbikucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG5cblx0aWYgKG5leHREeW5hbWljRGltZW5zaW9uICE9PSB0b3RhbERpbWVuc2lvbikge1xuXHRcdHRocm93IChuZXcgRXJyb3IoJ21pc2NhbGN1bGF0aW9uIG9mIHRyYW5zaXRpb24nKSk7XG5cdH1cblxuXHRjb25zdCBpbml0ID0ge1xuXHRcdGluZGV4OiAtMSxcblx0XHRtZWFuOiBuZXcgQXJyYXkodG90YWxEaW1lbnNpb24pLFxuXHRcdGNvdmFyaWFuY2U6IG5ldyBBcnJheSh0b3RhbERpbWVuc2lvbikuZmlsbCgwKS5tYXAoKCkgPT4gbmV3IEFycmF5KHRvdGFsRGltZW5zaW9uKS5maWxsKDApKSxcblx0fTtcblx0ZHluYW1pY05hbWVzLmZvckVhY2goayA9PiB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0ZHluYW1pY0luZGV4ZXMsXG5cdFx0XHRpbml0OiBsb2NhbEluaXQsXG5cdFx0fSA9IGNvbmZzW2tdO1xuXHRcdGlmICh0eXBlb2YgKGxvY2FsSW5pdCkgIT09ICdvYmplY3QnKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdJbml0IGlzIG1hbmRhdG9yeScpO1xuXHRcdH1cblxuXHRcdGR5bmFtaWNJbmRleGVzLmZvckVhY2goKGMxLCBpMSkgPT4gZHluYW1pY0luZGV4ZXMuZm9yRWFjaCgoYzIsIGkyKSA9PiB7XG5cdFx0XHRpbml0LmNvdmFyaWFuY2VbYzFdW2MyXSA9IGxvY2FsSW5pdC5jb3ZhcmlhbmNlW2kxXVtpMl07XG5cdFx0fSkpO1xuXHRcdGR5bmFtaWNJbmRleGVzLmZvckVhY2goKGMxLCBpMSkgPT4ge1xuXHRcdFx0aW5pdC5tZWFuW2MxXSA9IGxvY2FsSW5pdC5tZWFuW2kxXTtcblx0XHR9KTtcblx0fSk7XG5cdHJldHVybiB7XG5cdFx0ZGltZW5zaW9uOiB0b3RhbERpbWVuc2lvbixcblx0XHRpbml0LFxuXHRcdHRyYW5zaXRpb24ob3B0aW9ucykge1xuXHRcdFx0Y29uc3Qge3ByZXZpb3VzQ29ycmVjdGVkfSA9IG9wdGlvbnM7XG5cdFx0XHRjb25zdCByZXN1bHRUcmFuc2l0aW9uID0gbmV3IEFycmF5KHRvdGFsRGltZW5zaW9uKS5maWxsKCkubWFwKCgpID0+IG5ldyBBcnJheSh0b3RhbERpbWVuc2lvbikuZmlsbCgwKSk7XG5cblx0XHRcdGR5bmFtaWNOYW1lcy5mb3JFYWNoKGsgPT4ge1xuXHRcdFx0XHRjb25zdCB7XG5cdFx0XHRcdFx0ZHluYW1pY0luZGV4ZXMsXG5cdFx0XHRcdFx0dHJhbnNpdGlvbixcblx0XHRcdFx0fSA9IGNvbmZzW2tdO1xuXG5cdFx0XHRcdGNvbnN0IG9wdGlvbnMyID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywge3ByZXZpb3VzQ29ycmVjdGVkOiBwcmV2aW91c0NvcnJlY3RlZC5zdWJTdGF0ZShkeW5hbWljSW5kZXhlcyl9KTtcblx0XHRcdFx0Y29uc3QgdHJhbnMgPSB0cmFuc2l0aW9uKG9wdGlvbnMyKTtcblx0XHRcdFx0ZHluYW1pY0luZGV4ZXMuZm9yRWFjaCgoYzEsIGkxKSA9PiBkeW5hbWljSW5kZXhlcy5mb3JFYWNoKChjMiwgaTIpID0+IHtcblx0XHRcdFx0XHRyZXN1bHRUcmFuc2l0aW9uW2MxXVtjMl0gPSB0cmFuc1tpMV1baTJdO1xuXHRcdFx0XHR9KSk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHRUcmFuc2l0aW9uO1xuXHRcdH0sXG5cdFx0Y292YXJpYW5jZShvcHRpb25zKSB7XG5cdFx0XHRjb25zdCB7cHJldmlvdXNDb3JyZWN0ZWR9ID0gb3B0aW9ucztcblx0XHRcdGNvbnN0IHJlc3VsdENvdmFyaWFuY2UgPSBuZXcgQXJyYXkodG90YWxEaW1lbnNpb24pLmZpbGwoKS5tYXAoKCkgPT4gbmV3IEFycmF5KHRvdGFsRGltZW5zaW9uKS5maWxsKDApKTtcblxuXHRcdFx0ZHluYW1pY05hbWVzLmZvckVhY2goayA9PiB7XG5cdFx0XHRcdGNvbnN0IHtcblx0XHRcdFx0XHRkeW5hbWljSW5kZXhlcyxcblx0XHRcdFx0XHRjb3ZhcmlhbmNlLFxuXHRcdFx0XHR9ID0gY29uZnNba107XG5cblx0XHRcdFx0Y29uc3Qgb3B0aW9uczIgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCB7cHJldmlvdXNDb3JyZWN0ZWQ6IHByZXZpb3VzQ29ycmVjdGVkLnN1YlN0YXRlKGR5bmFtaWNJbmRleGVzKX0pO1xuXG5cdFx0XHRcdGNvbnN0IGNvdiA9IGNvdmFyaWFuY2Uob3B0aW9uczIpO1xuXHRcdFx0XHQvLyBDb25zb2xlLmxvZygnZHluYW1pYy5jb21wb3NpdGlvbicsaywgY292LCBkeW5hbWljSW5kZXhlcylcblx0XHRcdFx0ZHluYW1pY0luZGV4ZXMuZm9yRWFjaCgoYzEsIGkxKSA9PiBkeW5hbWljSW5kZXhlcy5mb3JFYWNoKChjMiwgaTIpID0+IHtcblx0XHRcdFx0XHRyZXN1bHRDb3ZhcmlhbmNlW2MxXVtjMl0gPSBjb3ZbaTFdW2kyXTtcblx0XHRcdFx0fSkpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0Q292YXJpYW5jZTtcblx0XHR9LFxuXHR9O1xufTtcbiIsImNvbnN0IHtpZGVudGl0eX0gPSByZXF1aXJlKCdzaW1wbGUtbGluYWxnJyk7XG5cbi8qKlxuKkNyZWF0ZXMgYSBkeW5hbWljIG1vZGVsLCBmb2xsb3dpbmcgY29uc3RhbnQgYWNjZWxlcmF0aW9uIG1vZGVsIHdpdGggcmVzcGVjdCB3aXRoIHRoZSBkaW1lbnNpb25zIHByb3ZpZGVkIGluIHRoZSBvYnNlcnZhdGlvbiBwYXJhbWV0ZXJzXG4qIEBwYXJhbSB7RHluYW1pY0NvbmZpZ30gZHluYW1pY1xuKiBAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvYnNlcnZhdGlvblxuKiBAcmV0dXJucyB7RHluYW1pY0NvbmZpZ31cbiovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGR5bmFtaWMsIG9ic2VydmF0aW9uKSB7XG5cdGNvbnN0IHRpbWVTdGVwID0gZHluYW1pYy50aW1lU3RlcCB8fCAxO1xuXHRjb25zdCB7b2JzZXJ2ZWRQcm9qZWN0aW9ufSA9IG9ic2VydmF0aW9uO1xuXHRjb25zdCB7c3RhdGVQcm9qZWN0aW9ufSA9IG9ic2VydmF0aW9uO1xuXHRjb25zdCBvYnNlcnZhdGlvbkRpbWVuc2lvbiA9IG9ic2VydmF0aW9uLmRpbWVuc2lvbjtcblx0bGV0IGRpbWVuc2lvbjtcblxuXHRpZiAoc3RhdGVQcm9qZWN0aW9uICYmIE51bWJlci5pc0ludGVnZXIoc3RhdGVQcm9qZWN0aW9uWzBdLmxlbmd0aCAvIDMpKSB7XG5cdFx0ZGltZW5zaW9uID0gb2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uWzBdLmxlbmd0aDtcblx0fSBlbHNlIGlmIChvYnNlcnZlZFByb2plY3Rpb24pIHtcblx0XHRkaW1lbnNpb24gPSBvYnNlcnZlZFByb2plY3Rpb25bMF0ubGVuZ3RoICogMztcblx0fSBlbHNlIGlmIChvYnNlcnZhdGlvbkRpbWVuc2lvbikge1xuXHRcdGRpbWVuc2lvbiA9IG9ic2VydmF0aW9uRGltZW5zaW9uICogMztcblx0fSBlbHNlIHtcblx0XHR0aHJvdyAobmV3IEVycm9yKCdvYnNlcnZlZFByb2plY3Rpb24gb3Igc3RhdGVQcm9qZWN0aW9uIHNob3VsZCBiZSBkZWZpbmVkIGluIG9ic2VydmF0aW9uIGluIG9yZGVyIHRvIHVzZSBjb25zdGFudC1zcGVlZCBmaWx0ZXInKSk7XG5cdH1cblxuXHRjb25zdCBiYXNlRGltZW5zaW9uID0gZGltZW5zaW9uIC8gMztcblx0Ly8gV2UgY29uc3RydWN0IHRoZSB0cmFuc2l0aW9uIGFuZCBjb3ZhcmlhbmNlIG1hdHJpY2VzXG5cdGNvbnN0IHRyYW5zaXRpb24gPSBpZGVudGl0eShkaW1lbnNpb24pO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGJhc2VEaW1lbnNpb247IGkrKykge1xuXHRcdHRyYW5zaXRpb25baV1baSArIGJhc2VEaW1lbnNpb25dID0gdGltZVN0ZXA7XG5cdFx0dHJhbnNpdGlvbltpXVtpICsgKDIgKiBiYXNlRGltZW5zaW9uKV0gPSAwLjUgKiAodGltZVN0ZXAgKiogMik7XG5cdFx0dHJhbnNpdGlvbltpICsgYmFzZURpbWVuc2lvbl1baSArICgyICogYmFzZURpbWVuc2lvbildID0gdGltZVN0ZXA7XG5cdH1cblxuXHRjb25zdCBhcnJheUNvdmFyaWFuY2UgPSBuZXcgQXJyYXkoYmFzZURpbWVuc2lvbikuZmlsbCgxKVxuXHRcdC5jb25jYXQobmV3IEFycmF5KGJhc2VEaW1lbnNpb24pLmZpbGwodGltZVN0ZXAgKiB0aW1lU3RlcCkpXG5cdFx0LmNvbmNhdChuZXcgQXJyYXkoYmFzZURpbWVuc2lvbikuZmlsbCh0aW1lU3RlcCAqKiA0KSk7XG5cdGNvbnN0IGNvdmFyaWFuY2UgPSBkeW5hbWljLmNvdmFyaWFuY2UgfHwgYXJyYXlDb3ZhcmlhbmNlO1xuXHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZHluYW1pYywge2RpbWVuc2lvbiwgdHJhbnNpdGlvbiwgY292YXJpYW5jZX0pO1xufTtcbiIsImNvbnN0IHtpZGVudGl0eSwgZGlhZ30gPSByZXF1aXJlKCdzaW1wbGUtbGluYWxnJyk7XG5cbmNvbnN0IGh1Z2UgPSAxZTY7XG5cbi8qKlxuKkNyZWF0ZXMgYSBkeW5hbWljIG1vZGVsLCBjb25zaWRlcmluZyB0aGUgbnVsbCBpbiBvcmRlciB0byBtYWtlIHRoZSBwcmVkaWN0aW9uc1xuKiBAcGFyYW0ge0FycmF5LjxBcnJheS48TnVtYmVyPj59IHN0YXRpY0NvdmFyaWFuY2UgZ2VuZXJhdGVkIHdpdGggbW92aW5nIGF2ZXJhZ2VcbiogQHBhcmFtIHtOdW1iZXJ9IG9ic2VydmF0aW9uRGltZW5zaW9uXG4qIEByZXR1cm5zIHtEeW5hbWljQ29uZmlnfVxuKi9cbmNvbnN0IGNvbnN0YW50UG9zaXRpb25XaXRoTnVsbCA9IGZ1bmN0aW9uICh7c3RhdGljQ292YXJpYW5jZSwgb2JzRHluYUluZGV4ZXMsIGluaXR9KSB7XG5cdGNvbnN0IGRpbWVuc2lvbiA9IG9ic0R5bmFJbmRleGVzLmxlbmd0aDtcblx0aWYgKCFpbml0KSB7XG5cdFx0aW5pdCA9IHtcblx0XHRcdG1lYW46IG5ldyBBcnJheShvYnNEeW5hSW5kZXhlcy5sZW5ndGgpLmZpbGwoMCkubWFwKCgpID0+IFswXSksXG5cdFx0XHRjb3ZhcmlhbmNlOiBkaWFnKG5ldyBBcnJheShvYnNEeW5hSW5kZXhlcy5sZW5ndGgpLmZpbGwoaHVnZSkpLFxuXHRcdFx0aW5kZXg6IC0xLFxuXHRcdH07XG5cdH1cblxuXHRpZiAoc3RhdGljQ292YXJpYW5jZSAmJiBzdGF0aWNDb3ZhcmlhbmNlLmxlbmd0aCAhPT0gZGltZW5zaW9uKSB7XG5cdFx0dGhyb3cgKG5ldyBFcnJvcignc3RhdGljQ292YXJpYW5jZSBoYXMgd3Jvbmcgc2l6ZScpKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0ZGltZW5zaW9uLFxuXHRcdHRyYW5zaXRpb24oKSB7XG5cdFx0XHRyZXR1cm4gaWRlbnRpdHkoZGltZW5zaW9uKTtcblx0XHR9LFxuXHRcdGNvdmFyaWFuY2Uoe3ByZXZpb3VzQ29ycmVjdGVkLCBpbmRleH0pIHtcblx0XHRcdGNvbnN0IGRpZmZCZXR3ZWVuSW5kZXhlcyA9IGluZGV4IC0gcHJldmlvdXNDb3JyZWN0ZWQuaW5kZXg7XG5cdFx0XHRpZiAoc3RhdGljQ292YXJpYW5jZSkge1xuXHRcdFx0XHRyZXR1cm4gc3RhdGljQ292YXJpYW5jZS5tYXAocm93ID0+IHJvdy5tYXAoZWxlbWVudCA9PiBlbGVtZW50ICogZGlmZkJldHdlZW5JbmRleGVzKSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBpZGVudGl0eShkaW1lbnNpb24pO1xuXHRcdH0sXG5cdFx0aW5pdCxcblx0fTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY29uc3RhbnRQb3NpdGlvbldpdGhOdWxsO1xuIiwiY29uc3Qge2lkZW50aXR5fSA9IHJlcXVpcmUoJ3NpbXBsZS1saW5hbGcnKTtcbi8qKlxuKkNyZWF0ZXMgYSBkeW5hbWljIG1vZGVsLCBmb2xsb3dpbmcgY29uc3RhbnQgcG9zaXRpb24gbW9kZWwgd2l0aCByZXNwZWN0IHdpdGggdGhlIGRpbWVuc2lvbnMgcHJvdmlkZWQgaW4gdGhlIG9ic2VydmF0aW9uIHBhcmFtZXRlcnNcbiogQHBhcmFtIHtEeW5hbWljQ29uZmlnfSBkeW5hbWljXG4qIEBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uXG4qIEByZXR1cm5zIHtEeW5hbWljQ29uZmlnfVxuKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZHluYW1pYywgb2JzZXJ2YXRpb24pIHtcblx0bGV0IHtkaW1lbnNpb259ID0gZHluYW1pYztcblx0Y29uc3Qgb2JzZXJ2YXRpb25EaW1lbnNpb24gPSBvYnNlcnZhdGlvbi5kaW1lbnNpb247XG5cdGNvbnN0IHtvYnNlcnZlZFByb2plY3Rpb259ID0gb2JzZXJ2YXRpb247XG5cdGNvbnN0IHtzdGF0ZVByb2plY3Rpb259ID0gb2JzZXJ2YXRpb247XG5cdGxldCB7Y292YXJpYW5jZX0gPSBkeW5hbWljO1xuXG5cdGlmICghZHluYW1pYy5kaW1lbnNpb24pIHtcblx0XHRpZiAob2JzZXJ2YXRpb25EaW1lbnNpb24pIHtcblx0XHRcdGRpbWVuc2lvbiA9IG9ic2VydmF0aW9uRGltZW5zaW9uO1xuXHRcdH0gZWxzZSBpZiAob2JzZXJ2ZWRQcm9qZWN0aW9uKSB7XG5cdFx0XHRkaW1lbnNpb24gPSBvYnNlcnZlZFByb2plY3Rpb25bMF0ubGVuZ3RoO1xuXHRcdH0gZWxzZSBpZiAoc3RhdGVQcm9qZWN0aW9uKSB7XG5cdFx0XHRkaW1lbnNpb24gPSBzdGF0ZVByb2plY3Rpb25bMF0ubGVuZ3RoO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0IHRyYW5zaXRpb24gPSBpZGVudGl0eShkaW1lbnNpb24pO1xuXHRjb3ZhcmlhbmNlID0gY292YXJpYW5jZSB8fCBpZGVudGl0eShkaW1lbnNpb24pO1xuXHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZHluYW1pYywge2RpbWVuc2lvbiwgdHJhbnNpdGlvbiwgY292YXJpYW5jZX0pO1xufTtcbiIsImNvbnN0IHtkaWFnfSA9IHJlcXVpcmUoJ3NpbXBsZS1saW5hbGcnKTtcblxuLyoqXG4qQ3JlYXRlcyBhIGR5bmFtaWMgbW9kZWwsIGNvbnNpZGVyaW5nIHRoZSBudWxsIGluIG9yZGVyIHRvIG1ha2UgdGhlIHByZWRpY3Rpb25zXG4qIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IHN0YXRpY0NvdmFyaWFuY2VcbiogQHBhcmFtIHtPYnNlcnZhdGlvbkNvbmZpZ30gb2JzZXJ2YXRpb25cbiogQHJldHVybnMge0R5bmFtaWNDb25maWd9XG4qL1xuY29uc3QgY29uc3RhbnRTcGVlZER5bmFtaWMgPSBmdW5jdGlvbiAoe3N0YXRpY0NvdmFyaWFuY2UsIGF2U3BlZWQsIGNlbnRlcn0sIG9ic2VydmF0aW9uKSB7XG5cdGNvbnN0IG9ic2VydmF0aW9uRGltZW5zaW9uID0gb2JzZXJ2YXRpb24ub2JzZXJ2ZWRQcm9qZWN0aW9uWzBdLmxlbmd0aDtcblxuXHRjb25zdCBkaW1lbnNpb24gPSAyICogb2JzZXJ2YXRpb25EaW1lbnNpb247XG5cblx0aWYgKChjZW50ZXIpID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcignQ2VudGVyIG11c3QgYmUgZGVmaW5lZCcpKTtcblx0fVxuXG5cdGlmIChjZW50ZXIubGVuZ3RoICE9PSBvYnNlcnZhdGlvbkRpbWVuc2lvbikge1xuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKGBDZW50ZXIgc2l6ZSBzaG91bGQgYmUgJHtvYnNlcnZhdGlvbkRpbWVuc2lvbn1gKSk7XG5cdH1cblxuXHRpZiAoYXZTcGVlZC5sZW5ndGggIT09IG9ic2VydmF0aW9uRGltZW5zaW9uKSB7XG5cdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoYGF2U3BlZWQgc2l6ZSBzaG91bGQgYmUgJHtvYnNlcnZhdGlvbkRpbWVuc2lvbn1gKSk7XG5cdH1cblxuXHRjb25zdCBpbml0Q292ID0gZGlhZyhjZW50ZXIubWFwKGMgPT4gYyAqIGMgLyAzKS5jb25jYXQoYXZTcGVlZC5tYXAoYyA9PiBjICogYyAvIDMpKSk7XG5cblx0Y29uc3QgaW5pdCA9IHtcblx0XHRtZWFuOiBjZW50ZXIubWFwKGMgPT4gW2NdKS5jb25jYXQoY2VudGVyLm1hcCgoKSA9PiBbMF0pKSxcblx0XHRjb3ZhcmlhbmNlOiBpbml0Q292LFxuXHRcdGluZGV4OiAtMSxcblx0fTtcblxuXHRjb25zdCB0cmFuc2l0aW9uID0gKHtnZXRUaW1lLCBpbmRleCwgcHJldmlvdXNDb3JyZWN0ZWR9KSA9PiB7XG5cdFx0Y29uc3QgZFQgPSBnZXRUaW1lKGluZGV4KSAtIGdldFRpbWUocHJldmlvdXNDb3JyZWN0ZWQuaW5kZXgpO1xuXHRcdGlmICh0eXBlb2YgKGRUKSAhPT0gJ251bWJlcicgfHwgTnVtYmVyLmlzTmFOKGRUKSkge1xuXHRcdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoYGRUICgke2RUfSkgc2hvdWxkIGJlIGEgbnVtYmVyYCkpO1xuXHRcdH1cblx0XHQvLyBFeGFtcGxlIGlzIDpcblx0XHQvLyBbXG5cdFx0Ly8gXHRbMSwgMCwgZFQsIDBdLFxuXHRcdC8vIFx0WzAsIDEsIDAsIGRUXSxcblx0XHQvLyBcdFswLCAwLCAxLCAwXSxcblx0XHQvLyBcdFswLCAwLCAwLCAxXVxuXHRcdC8vIF07XG5cdFx0Ly8gY29uc3RhbnQgc3BlZWQgdXN1YWwgbWF0cml4XG5cblx0XHQvLyBjcmVhdGUgaWRlbnRpdHkgbWF0cml4XG5cdFx0Y29uc3QgbWF0ID0gZGlhZyhjZW50ZXIubWFwKCgpID0+IDEpLmNvbmNhdChjZW50ZXIubWFwKCgpID0+IDEpKSk7XG5cdFx0Ly8gVGhlbiBhZGQgZFRcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG9ic2VydmF0aW9uRGltZW5zaW9uOyBpKyspIHtcblx0XHRcdG1hdFtpXVtvYnNlcnZhdGlvbkRpbWVuc2lvbiArIGldID0gZFQ7XG5cdFx0fVxuXG5cdFx0aWYgKE51bWJlci5pc05hTihtYXRbMF1bMl0pKSB7XG5cdFx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcignbmFuIG1hdCcpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbWF0O1xuXHR9O1xuXG5cdGNvbnN0IGNvdmFyaWFuY2UgPSAoe2luZGV4LCBwcmV2aW91c0NvcnJlY3RlZCwgZ2V0VGltZX0pID0+IHtcblx0XHRjb25zdCBkVCA9IGdldFRpbWUoaW5kZXgpIC0gZ2V0VGltZShwcmV2aW91c0NvcnJlY3RlZC5pbmRleCk7XG5cblx0XHRpZiAodHlwZW9mIChkVCkgIT09ICdudW1iZXInKSB7XG5cdFx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihgZFQgKCR7ZFR9KSBzaG91bGQgYmUgYSBudW1iZXJgKSk7XG5cdFx0fVxuXG5cdFx0Ly8gU3RhdGUgaXMgKHgsIHksIHZ4LCB2eSlcblx0XHRjb25zdCBzcXJ0ID0gTWF0aC5zcXJ0KGRUKTtcblx0XHRpZiAoTnVtYmVyLmlzTmFOKHNxcnQpKSB7XG5cdFx0XHRjb25zb2xlLmxvZyh7bGFzdFByZXZpb3VzSW5kZXg6IHByZXZpb3VzQ29ycmVjdGVkLmluZGV4LCBpbmRleH0pO1xuXHRcdFx0Y29uc29sZS5sb2coZFQsIHByZXZpb3VzQ29ycmVjdGVkLmluZGV4LCBpbmRleCwgZ2V0VGltZShpbmRleCksIGdldFRpbWUocHJldmlvdXNDb3JyZWN0ZWQuaW5kZXgpKTtcblx0XHRcdHRocm93IChuZXcgRXJyb3IoJ1NxcnQoZFQpIGlzIE5hTicpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGlhZyhzdGF0aWNDb3ZhcmlhbmNlLm1hcCh2ID0+IHYgKiBzcXJ0KSk7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRpbml0LFxuXHRcdGRpbWVuc2lvbixcblx0XHR0cmFuc2l0aW9uLFxuXHRcdGNvdmFyaWFuY2UsXG5cdH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnN0YW50U3BlZWREeW5hbWljO1xuIiwiY29uc3Qge2lkZW50aXR5LCBkaWFnfSA9IHJlcXVpcmUoJ3NpbXBsZS1saW5hbGcnKTtcblxuY29uc3QgbnVsbE1vZGVscyA9IHtcblx0bGluZWFyKGEpIHtcblx0XHRyZXR1cm4gYTtcblx0fSxcblx0b25lKCkge1xuXHRcdHJldHVybiAxO1xuXHR9LFxuXHRzcXVhcmUoYSkge1xuXHRcdHJldHVybiBhICogYTtcblx0fSxcbn07XG5jb25zdCBodWdlID0gMWU2O1xuLyoqXG4qQ3JlYXRlcyBhIGR5bmFtaWMgbW9kZWwsIGNvbnNpZGVyaW5nIHRoZSBudWxsIGluIG9yZGVyIHRvIG1ha2UgdGhlIHByZWRpY3Rpb25zXG4qIEBwYXJhbSB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gc3RhdGljQ292YXJpYW5jZSBnZW5lcmF0ZWQgd2l0aCBtb3ZpbmcgYXZlcmFnZVxuKiBAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvYnNlcnZhdGlvblxuKiBAcmV0dXJucyB7RHluYW1pY0NvbmZpZ31cbiovXG5jb25zdCBjb25zdGFudFNwZWVkV2l0aE51bGwgPSBmdW5jdGlvbiAoe3N0YXRpY0NvdmFyaWFuY2UsIG9ic0R5bmFJbmRleGVzLCBudWxsR2FwTW9kZWwgPSBudWxsLCBpbml0fSwgb2JzZXJ2YXRpb24pIHtcblx0aWYgKCFvYnNEeW5hSW5kZXhlcykge1xuXHRcdGNvbnN0IGwgPSBvYnNlcnZhdGlvbi5vYnNlcnZlZFByb2plY3Rpb25bMF0ubGVuZ3RoO1xuXHRcdG9ic0R5bmFJbmRleGVzID0gbmV3IEFycmF5KGwpLmZpbGwoMCkubWFwKChfLCBpKSA9PiBpKTtcblx0fVxuXG5cdGlmIChzdGF0aWNDb3ZhcmlhbmNlICYmIE51bWJlci5pc05hTihzdGF0aWNDb3ZhcmlhbmNlWzBdWzBdKSkge1xuXHRcdHRocm93IChuZXcgRXJyb3IoJ05hTiBzdGF0aWNDb3ZhcmlhbmNlJykpO1xuXHR9XG5cblx0Y29uc3QgZGltZW5zaW9uID0gMiAqIG9ic0R5bmFJbmRleGVzLmxlbmd0aDtcblx0aWYgKCFpbml0KSB7XG5cdFx0aW5pdCA9IHtcblx0XHRcdG1lYW46IG5ldyBBcnJheShvYnNEeW5hSW5kZXhlcy5sZW5ndGggKiAyKS5maWxsKDApLm1hcCgoKSA9PiBbMF0pLFxuXHRcdFx0Y292YXJpYW5jZTogZGlhZyhuZXcgQXJyYXkob2JzRHluYUluZGV4ZXMubGVuZ3RoICogMikuZmlsbChodWdlKSksXG5cdFx0XHRpbmRleDogLTEsXG5cdFx0fTtcblx0fVxuXG5cdGlmICghbnVsbEdhcE1vZGVsKSB7XG5cdFx0bnVsbEdhcE1vZGVsID0gbmV3IEFycmF5KGRpbWVuc2lvbikuZmlsbCgwKS5tYXAoKCkgPT4gJ2xpbmVhcicpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRkaW1lbnNpb24sXG5cdFx0aW5pdCxcblx0XHR0cmFuc2l0aW9uKHtwcmV2aW91c0NvcnJlY3RlZCwgaW5kZXh9KSB7XG5cdFx0XHRjb25zdCBkaWZmQmV0d2VlbkluZGV4ZXMgPSBpbmRleCAtIHByZXZpb3VzQ29ycmVjdGVkLmluZGV4O1xuXG5cdFx0XHRpZiAoTnVtYmVyLmlzTmFOKGRpZmZCZXR3ZWVuSW5kZXhlcykpIHtcblx0XHRcdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoJ2RpZmZCZXR3ZWVuSW5kZXhlcyBpcyBOYU4nKSk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGVtcHR5VHJhbnNpdGlvbiA9IG5ldyBBcnJheShkaW1lbnNpb24pLmZpbGwobmV3IEFycmF5KGRpbWVuc2lvbikuZmlsbCgpKTtcblxuXHRcdFx0Y29uc3Qgb2JzZXJ2YXRpb25EaW1lbnNpb24gPSBkaW1lbnNpb24gLyAyO1xuXHRcdFx0Y29uc3QgdHJhbnNpdGlvbiA9IGVtcHR5VHJhbnNpdGlvbi5tYXAoKHJvdywgcm93SWQpID0+IHJvdy5tYXAoKGNvbCwgY29sSWQpID0+IHtcblx0XHRcdFx0aWYgKHJvd0lkID09PSBjb2xJZCkge1xuXHRcdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHJvd0lkICsgb2JzZXJ2YXRpb25EaW1lbnNpb24gPT09IGNvbElkKSB7XG5cdFx0XHRcdFx0aWYgKGluZGV4ID09PSAwKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gZGlmZkJldHdlZW5JbmRleGVzO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9KSk7XG5cdFx0XHRyZXR1cm4gdHJhbnNpdGlvbjtcblx0XHR9LFxuXHRcdGNvdmFyaWFuY2Uoe3ByZXZpb3VzQ29ycmVjdGVkLCBpbmRleH0pIHtcblx0XHRcdGNvbnN0IGRpZmZCZXR3ZWVuSW5kZXhlcyA9IGluZGV4IC0gcHJldmlvdXNDb3JyZWN0ZWQuaW5kZXg7XG5cdFx0XHRpZiAoc3RhdGljQ292YXJpYW5jZSkge1xuXHRcdFx0XHRjb25zdCBjb3ZhcmlhbmNlID0gc3RhdGljQ292YXJpYW5jZS5tYXAoKHJvdywgcm93SW5kZXgpID0+IHJvdy5tYXAoKGVsZW1lbnQsIGNvbEluZGV4KSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgZmFjdG9yID0gTWF0aC5zcXJ0KG51bGxNb2RlbHNbbnVsbEdhcE1vZGVsW3Jvd0luZGV4XV0oZGlmZkJldHdlZW5JbmRleGVzKSAqIG51bGxNb2RlbHNbbnVsbEdhcE1vZGVsW2NvbEluZGV4XV0oZGlmZkJldHdlZW5JbmRleGVzKSk7XG5cdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnQgKiBmYWN0b3I7XG5cdFx0XHRcdH0pKTtcblxuXHRcdFx0XHRyZXR1cm4gY292YXJpYW5jZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGlkZW50aXR5KGRpbWVuc2lvbik7XG5cdFx0fSxcblx0fTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY29uc3RhbnRTcGVlZFdpdGhOdWxsO1xuIiwiY29uc3Qge2lkZW50aXR5fSA9IHJlcXVpcmUoJ3NpbXBsZS1saW5hbGcnKTtcblxuLyoqXG4qQ3JlYXRlcyBhIGR5bmFtaWMgbW9kZWwsIGZvbGxvd2luZyBjb25zdGFudCBwb3NpdGlvbiBtb2RlbCB3aXRoIHJlc3BlY3Qgd2l0aCB0aGUgZGltZW5zaW9ucyBwcm92aWRlZCBpbiB0aGUgb2JzZXJ2YXRpb24gcGFyYW1ldGVyc1xuKiBAcGFyYW0ge0R5bmFtaWNDb25maWd9IGR5bmFtaWNcbiogQHBhcmFtIHtPYnNlcnZhdGlvbkNvbmZpZ30gb2JzZXJ2YXRpb25cbiogQHJldHVybnMge0R5bmFtaWNDb25maWd9XG4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkeW5hbWljLCBvYnNlcnZhdGlvbikge1xuXHRjb25zdCB0aW1lU3RlcCA9IGR5bmFtaWMudGltZVN0ZXAgfHwgMTtcblx0Y29uc3Qge29ic2VydmVkUHJvamVjdGlvbn0gPSBvYnNlcnZhdGlvbjtcblx0Y29uc3Qge3N0YXRlUHJvamVjdGlvbn0gPSBvYnNlcnZhdGlvbjtcblx0Y29uc3Qgb2JzZXJ2YXRpb25EaW1lbnNpb24gPSBvYnNlcnZhdGlvbi5kaW1lbnNpb247XG5cdGxldCBkaW1lbnNpb247XG5cblx0aWYgKHN0YXRlUHJvamVjdGlvbiAmJiBOdW1iZXIuaXNJbnRlZ2VyKHN0YXRlUHJvamVjdGlvblswXS5sZW5ndGggLyAyKSkge1xuXHRcdGRpbWVuc2lvbiA9IG9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvblswXS5sZW5ndGg7XG5cdH0gZWxzZSBpZiAob2JzZXJ2ZWRQcm9qZWN0aW9uKSB7XG5cdFx0ZGltZW5zaW9uID0gb2JzZXJ2ZWRQcm9qZWN0aW9uWzBdLmxlbmd0aCAqIDI7XG5cdH0gZWxzZSBpZiAob2JzZXJ2YXRpb25EaW1lbnNpb24pIHtcblx0XHRkaW1lbnNpb24gPSBvYnNlcnZhdGlvbkRpbWVuc2lvbiAqIDI7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgKG5ldyBFcnJvcignb2JzZXJ2ZWRQcm9qZWN0aW9uIG9yIHN0YXRlUHJvamVjdGlvbiBzaG91bGQgYmUgZGVmaW5lZCBpbiBvYnNlcnZhdGlvbiBpbiBvcmRlciB0byB1c2UgY29uc3RhbnQtc3BlZWQgZmlsdGVyJykpO1xuXHR9XG5cblx0Y29uc3QgYmFzZURpbWVuc2lvbiA9IGRpbWVuc2lvbiAvIDI7XG5cdC8vIFdlIGNvbnN0cnVjdCB0aGUgdHJhbnNpdGlvbiBhbmQgY292YXJpYW5jZSBtYXRyaWNlc1xuXHRjb25zdCB0cmFuc2l0aW9uID0gaWRlbnRpdHkoZGltZW5zaW9uKTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBiYXNlRGltZW5zaW9uOyBpKyspIHtcblx0XHR0cmFuc2l0aW9uW2ldW2kgKyBiYXNlRGltZW5zaW9uXSA9IHRpbWVTdGVwO1xuXHR9XG5cblx0Y29uc3QgYXJyYXlDb3ZhcmlhbmNlID0gbmV3IEFycmF5KGJhc2VEaW1lbnNpb24pLmZpbGwoMSkuY29uY2F0KG5ldyBBcnJheShiYXNlRGltZW5zaW9uKS5maWxsKHRpbWVTdGVwICogdGltZVN0ZXApKTtcblx0Y29uc3QgY292YXJpYW5jZSA9IGR5bmFtaWMuY292YXJpYW5jZSB8fCBhcnJheUNvdmFyaWFuY2U7XG5cdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBkeW5hbWljLCB7ZGltZW5zaW9uLCB0cmFuc2l0aW9uLCBjb3ZhcmlhbmNlfSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdCdjb25zdGFudC1wb3NpdGlvbic6IHJlcXVpcmUoJy4vY29uc3RhbnQtcG9zaXRpb24uanMnKSxcblx0J2NvbnN0YW50LXNwZWVkJzogcmVxdWlyZSgnLi9jb25zdGFudC1zcGVlZC5qcycpLFxuXHQnY29uc3RhbnQtYWNjZWxlcmF0aW9uJzogcmVxdWlyZSgnLi9jb25zdGFudC1hY2NlbGVyYXRpb24uanMnKSxcblx0Y29tcG9zaXRpb246IHJlcXVpcmUoJy4vY29tcG9zaXRpb24uanMnKSxcblx0J2NvbnN0YW50LXBvc2l0aW9uLXdpdGgtbnVsbCc6IHJlcXVpcmUoJy4vY29uc3RhbnQtcG9zaXRpb24td2l0aC1udWxsLmpzJyksXG5cdCdjb25zdGFudC1zcGVlZC13aXRoLW51bGwnOiByZXF1aXJlKCcuL2NvbnN0YW50LXNwZWVkLXdpdGgtbnVsbC5qcycpLFxuXHQnY29uc3RhbnQtc3BlZWQtZHluYW1pYyc6IHJlcXVpcmUoJy4vY29uc3RhbnQtc3BlZWQtZHluYW1pYy5qcycpLFxuXHQnc2hvcnR0ZXJtLWNvbnN0YW50LXNwZWVkJzogcmVxdWlyZSgnLi9zaG9ydHRlcm0tY29uc3RhbnQtc3BlZWQuanMnKSxcbn07XG4iLCJjb25zdCB7ZWxlbVdpc2UsIGRpYWd9ID0gcmVxdWlyZSgnc2ltcGxlLWxpbmFsZycpO1xuY29uc3QgY29uc3RhbnRTcGVlZER5bmFtaWMgPSByZXF1aXJlKCcuL2NvbnN0YW50LXNwZWVkLWR5bmFtaWMnKTtcblxuY29uc3Qgc2FmZURpdiA9IGZ1bmN0aW9uIChhLCBiKSB7XG5cdGlmIChhID09PSAwKSB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHRpZiAoYiA9PT0gMCkge1xuXHRcdHJldHVybiAxO1xuXHR9XG5cblx0cmV0dXJuIGEgLyBiO1xufTtcblxuLyoqXG4qIFRoaXMgbW9kZWwgaXMgYmFzZWQgb24gdGhlIGNvbnN0YW50IHNwZWVkIG1vZGVsXG4qIFRoZSBjb25zdGFudCBzcGVlZCBtb2RlbCBjcmVhdGVzIHByb2JsZW1zIHdoZW4gZFQgPj4gZnBzICh0aGUgdHJhY2sgaXMgbG9zdClcbiogdGhlbiB0aGUgZXhwZWN0ZWQgcG9zaXRpb24gY2FuIGJlIHZlcnkgZmFyIGZyb20gdGhlIGNlbnRlciBvZiB0aGUgZmllbGRcbiogdG8gc29sdmUgdGhhdCwgd2UgdXNlIGEgbW9kZWwgd2l0aCAyIG1vcmUgaGlkZGVuIHZhcmlhYmxlIHRoYXQgYXJlIGFsd2F5cyBjZW50ZXIgb2YgdGhlIGZpZWxkXG4qIFdoZW4gZFQgPDwgdHlwaWNhbFRpbWUgdGhlIG1vZGVsIGFjdHMgZXhhY3RseSBhcyBhIGNvbnN0YW50IHNwZWVkIG1vZGVsXG4qIFdoZW4gZFQgPj4gdHlwaWNhbFRpbWUgdGhlIG1vZGVsIGlzIGEgY29uc3RhbnQgW3gseV0gPSBjZW50ZXIgbW9kZWwsIHNpZ21hID0gZGVmYXVsdFZhcmlhbmNlXG4qIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4qIEBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uXG4qIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy50eXBpY2FsVGltZT0xMF1cbiogQHJldHVybnMge0R5bmFtaWNDb25maWd9XG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0aW9ucywgb2JzZXJ2YXRpb24pIHtcblx0Y29uc3Qge3R5cGljYWxUaW1lc30gPSBvcHRpb25zO1xuXG5cdGlmICghQXJyYXkuaXNBcnJheSh0eXBpY2FsVGltZXMpKSB7XG5cdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoJ3R5cGljYWxUaW1lcyBtdXN0IGJlIGRlZmluZWQnKSk7XG5cdH1cblxuXHRjb25zdCBjb25zdGFudFNwZWVkID0gY29uc3RhbnRTcGVlZER5bmFtaWMob3B0aW9ucywgb2JzZXJ2YXRpb24pO1xuXHRjb25zdCB7ZGltZW5zaW9uLCBpbml0fSA9IGNvbnN0YW50U3BlZWQ7XG5cblx0aWYgKHR5cGljYWxUaW1lcy5sZW5ndGggIT09IGRpbWVuc2lvbikge1xuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKGB0eXBpY2FsVGltZXMgKCR7dHlwaWNhbFRpbWVzLmxlbmd0aH0pIGxlbmd0aCBpcyBub3QgYXMgZXhwZWN0ZWQgKCR7ZGltZW5zaW9ufSlgKSk7XG5cdH1cblxuXHRjb25zdCBtaXhNYXRyaXggPSBmdW5jdGlvbiAoe1xuXHRcdHJhdGlvcyxcblx0XHRhTWF0LFxuXHRcdGJNYXQsXG5cdH0pIHtcblx0XHRyZXR1cm4gZWxlbVdpc2UoW2FNYXQsIGJNYXRdLCAoW20sIGRdLCByb3dJbmRleCwgY29sSW5kZXgpID0+IHtcblx0XHRcdGNvbnN0IHJhdGlvID0gcm93SW5kZXggPT09IGNvbEluZGV4ID8gcmF0aW9zW3Jvd0luZGV4XSA6IChyYXRpb3Nbcm93SW5kZXhdICsgcmF0aW9zW2NvbEluZGV4XSkgLyAyO1xuXG5cdFx0XHRyZXR1cm4gKHJhdGlvICogbSkgKyAoKDEgLSByYXRpbykgKiBkKTtcblx0XHR9KTtcblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdGRpbWVuc2lvbixcblx0XHRpbml0LFxuXHRcdHRyYW5zaXRpb24ob3B0aW9ucykge1xuXHRcdFx0Y29uc3QgYU1hdCA9IGNvbnN0YW50U3BlZWQudHJhbnNpdGlvbihvcHRpb25zKTtcblxuXHRcdFx0Y29uc3Qge2dldFRpbWUsIGluZGV4LCBwcmV2aW91c0NvcnJlY3RlZH0gPSBvcHRpb25zO1xuXHRcdFx0Y29uc3QgZFQgPSBnZXRUaW1lKGluZGV4KSAtIGdldFRpbWUocHJldmlvdXNDb3JyZWN0ZWQuaW5kZXgpO1xuXG5cdFx0XHRjb25zdCByYXRpb3MgPSB0eXBpY2FsVGltZXMubWFwKHQgPT4gTWF0aC5leHAoLTEgKiBkVCAvIHQpKTtcblxuXHRcdFx0Ly8gJ2JhY2sgdG8gaW5pdCcgbWF0cml4XG5cdFx0XHRjb25zdCBiTWF0ID0gZGlhZyhcblx0XHRcdFx0ZWxlbVdpc2UoW2luaXQubWVhbiwgcHJldmlvdXNDb3JyZWN0ZWQubWVhbl0sIChbbSwgZF0pID0+IHNhZmVEaXYobSwgZCkpXG5cdFx0XHRcdC8vIEZsYXR0ZW4gY2F1c2UgdGhpcyBpcyBhIE54MSBtYXRyaXggLT4gTiBhcnJheVxuXHRcdFx0XHRcdC5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIpKSxcblx0XHRcdCk7XG5cblx0XHRcdHJldHVybiBtaXhNYXRyaXgoe3JhdGlvcywgYU1hdCwgYk1hdH0pO1xuXHRcdH0sXG5cdFx0Y292YXJpYW5jZShvcHRpb25zLCBvYnNlcnZhdGlvbikge1xuXHRcdFx0Y29uc3Qge2dldFRpbWUsIGluZGV4LCBwcmV2aW91c0NvcnJlY3RlZH0gPSBvcHRpb25zO1xuXG5cdFx0XHRjb25zdCBkVCA9IGdldFRpbWUoaW5kZXgpIC0gZ2V0VGltZShwcmV2aW91c0NvcnJlY3RlZC5pbmRleCk7XG5cdFx0XHQvLyBTdGF0ZSBpcyAoeCwgeSwgdngsIHZ5KVxuXHRcdFx0Y29uc3QgcmF0aW9zID0gdHlwaWNhbFRpbWVzLm1hcCh0ID0+IE1hdGguZXhwKC0xICogZFQgLyB0KSk7XG5cdFx0XHRjb25zdCBhTWF0ID0gY29uc3RhbnRTcGVlZC5jb3ZhcmlhbmNlKG9wdGlvbnMsIG9ic2VydmF0aW9uKTtcblx0XHRcdHJldHVybiBtaXhNYXRyaXgoe3JhdGlvcywgYU1hdCwgYk1hdDogaW5pdC5jb3ZhcmlhbmNlfSk7XG5cdFx0fSxcblx0fTtcbn07XG4iLCJcbmNvbnN0IHtmcm9iZW5pdXM6IGRpc3RhbmNlTWF0fSA9IHJlcXVpcmUoJ3NpbXBsZS1saW5hbGcnKTtcbmNvbnN0IGFycmF5VG9NYXRyaXggPSByZXF1aXJlKCcuLi9saWIvdXRpbHMvYXJyYXktdG8tbWF0cml4LmpzJyk7XG5jb25zdCBzZXREaW1lbnNpb25zID0gcmVxdWlyZSgnLi4vbGliL3NldHVwL3NldC1kaW1lbnNpb25zLmpzJyk7XG5jb25zdCBjaGVja0RpbWVuc2lvbnMgPSByZXF1aXJlKCcuLi9saWIvc2V0dXAvY2hlY2stZGltZW5zaW9ucy5qcycpO1xuY29uc3QgYnVpbGRTdGF0ZVByb2plY3Rpb24gPSByZXF1aXJlKCcuLi9saWIvc2V0dXAvYnVpbGQtc3RhdGUtcHJvamVjdGlvbi5qcycpO1xuY29uc3QgZXh0ZW5kRHluYW1pY0luaXQgPSByZXF1aXJlKCcuLi9saWIvc2V0dXAvZXh0ZW5kLWR5bmFtaWMtaW5pdC5qcycpO1xuY29uc3QgdG9GdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2xpYi91dGlscy90by1mdW5jdGlvbi5qcycpO1xuY29uc3QgZGVlcEFzc2lnbiA9IHJlcXVpcmUoJy4uL2xpYi91dGlscy9kZWVwLWFzc2lnbi5qcycpO1xuY29uc3QgcG9seW1vcnBoTWF0cml4ID0gcmVxdWlyZSgnLi4vbGliL3V0aWxzL3BvbHltb3JwaC1tYXRyaXguanMnKTtcbmNvbnN0IFN0YXRlID0gcmVxdWlyZSgnLi9zdGF0ZS5qcycpO1xuY29uc3QgbW9kZWxDb2xsZWN0aW9uID0gcmVxdWlyZSgnLi9tb2RlbC1jb2xsZWN0aW9uLmpzJyk7XG5jb25zdCBDb3JlS2FsbWFuRmlsdGVyID0gcmVxdWlyZSgnLi9jb3JlLWthbG1hbi1maWx0ZXIuanMnKTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7U3RyaW5nfSBEeW5hbWljTm9uT2JqZWN0Q29uZmlnXG4gKi9cbi8qKlxuICogQHR5cGVkZWYge0R5bmFtaWNDb25maWd9IER5bmFtaWNPYmplY3RDb25maWdcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lXG4gKi9cbi8qKlxuICogQHBhcmFtIHtEeW5hbWljTm9uT2JqZWN0Q29uZmlnfSBkeW5hbWljXG4gKiBAcmV0dXJucyB7RHluYW1pY09iamVjdENvbmZpZ31cbiAqL1xuXG5jb25zdCBidWlsZERlZmF1bHREeW5hbWljID0gZnVuY3Rpb24gKGR5bmFtaWMpIHtcblx0aWYgKHR5cGVvZiAoZHluYW1pYykgPT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIHtuYW1lOiBkeW5hbWljfTtcblx0fVxuXG5cdHJldHVybiB7bmFtZTogJ2NvbnN0YW50LXBvc2l0aW9uJ307XG59O1xuXG4vKipcbiAqIEB0eXBlZGVmIHtTdHJpbmcgfCBOdW1iZXJ9IE9ic2VydmF0aW9uTm9uT2JqZWN0Q29uZmlnXG4gKi9cbi8qKlxuICogQHR5cGVkZWYge09ic2VydmF0aW9uQ29uZmlnfSBPYnNlcnZhdGlvbk9iamVjdENvbmZpZ1xuICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWVcbiAqL1xuLyoqXG4gKiBAcGFyYW0ge09ic2VydmF0aW9uTm9uT2JqZWN0Q29uZmlnfSBvYnNlcnZhdGlvblxuICogQHJldHVybnMge09ic2VydmF0aW9uT2JqZWN0Q29uZmlnfVxuICovXG5jb25zdCBidWlsZERlZmF1bHRPYnNlcnZhdGlvbiA9IGZ1bmN0aW9uIChvYnNlcnZhdGlvbikge1xuXHRpZiAodHlwZW9mIChvYnNlcnZhdGlvbikgPT09ICdudW1iZXInKSB7XG5cdFx0cmV0dXJuIHtuYW1lOiAnc2Vuc29yJywgc2Vuc29yRGltZW5zaW9uOiBvYnNlcnZhdGlvbn07XG5cdH1cblxuXHRpZiAodHlwZW9mIChvYnNlcnZhdGlvbikgPT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIHtuYW1lOiBvYnNlcnZhdGlvbn07XG5cdH1cblxuXHRyZXR1cm4ge25hbWU6ICdzZW5zb3InfTtcbn07XG4vKipcbipUaGlzIGZ1bmN0aW9uIGZpbGxzIHRoZSBnaXZlbiBvcHRpb25zIGJ5IHN1Y2Nlc3NpdmVseSBjaGVja2luZyBpZiBpdCB1c2VzIGEgcmVnaXN0ZXJlZCBtb2RlbCxcbiogaXQgYnVpbGRzIGFuZCBjaGVja3MgdGhlIGR5bmFtaWMgYW5kIG9ic2VydmF0aW9uIGRpbWVuc2lvbnMsIGJ1aWxkIHRoZSBzdGF0ZVByb2plY3Rpb24gaWYgb25seSBvYnNlcnZlZFByb2plY3Rpb25cbippcyBnaXZlbiwgYW5kIGluaXRpYWxpemUgZHluYW1pYy5pbml0XG4qQHBhcmFtIHtEeW5hbWljT2JqZWN0Q29uZmlnIHwgRHluYW1pY05vbk9iamVjdENvbmZpZ30gb3B0aW9ucy5keW5hbWljXG4qQHBhcmFtIHtPYnNlcnZhdGlvbk9iamVjdENvbmZpZyB8IE9ic2VydmF0aW9uTm9uT2JqZWN0Q29uZmlnfSBvcHRpb25zLm9ic2VydmF0aW9uXG4qIEByZXR1cm5zIHtDb3JlQ29uZmlnfVxuKi9cblxuY29uc3Qgc2V0dXBNb2RlbHNQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKHtvYnNlcnZhdGlvbiwgZHluYW1pY30pIHtcblx0aWYgKHR5cGVvZiAob2JzZXJ2YXRpb24pICE9PSAnb2JqZWN0JyB8fCBvYnNlcnZhdGlvbiA9PT0gbnVsbCkge1xuXHRcdG9ic2VydmF0aW9uID0gYnVpbGREZWZhdWx0T2JzZXJ2YXRpb24ob2JzZXJ2YXRpb24pO1xuXHR9XG5cblx0aWYgKHR5cGVvZiAoZHluYW1pYykgIT09ICdvYmplY3QnIHx8IGR5bmFtaWMgPT09IG51bGwpIHtcblx0XHRkeW5hbWljID0gYnVpbGREZWZhdWx0RHluYW1pYyhkeW5hbWljLCBvYnNlcnZhdGlvbik7XG5cdH1cblxuXHRpZiAodHlwZW9mIChvYnNlcnZhdGlvbi5uYW1lKSA9PT0gJ3N0cmluZycpIHtcblx0XHRvYnNlcnZhdGlvbiA9IG1vZGVsQ29sbGVjdGlvbi5idWlsZE9ic2VydmF0aW9uKG9ic2VydmF0aW9uKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgKGR5bmFtaWMubmFtZSkgPT09ICdzdHJpbmcnKSB7XG5cdFx0ZHluYW1pYyA9IG1vZGVsQ29sbGVjdGlvbi5idWlsZER5bmFtaWMoZHluYW1pYywgb2JzZXJ2YXRpb24pO1xuXHR9XG5cblx0Y29uc3Qgd2l0aERpbWVuc2lvbk9wdGlvbnMgPSBzZXREaW1lbnNpb25zKHtvYnNlcnZhdGlvbiwgZHluYW1pY30pO1xuXHRjb25zdCBjaGVja2VkRGltZW5zaW9uT3B0aW9ucyA9IGNoZWNrRGltZW5zaW9ucyh3aXRoRGltZW5zaW9uT3B0aW9ucyk7XG5cdGNvbnN0IGJ1aWxkU3RhdGVQcm9qZWN0aW9uT3B0aW9ucyA9IGJ1aWxkU3RhdGVQcm9qZWN0aW9uKGNoZWNrZWREaW1lbnNpb25PcHRpb25zKTtcblx0cmV0dXJuIGV4dGVuZER5bmFtaWNJbml0KGJ1aWxkU3RhdGVQcm9qZWN0aW9uT3B0aW9ucyk7XG59O1xuXG4vKipcbiogQHR5cGVkZWYge09iamVjdH0gTW9kZWxzUGFyYW1ldGVyc1xuKiBAcHJvcGVydHkge0R5bmFtaWNPYmplY3RDb25maWd9IGR5bmFtaWNcbiogQHByb3BlcnR5IHtPYnNlcnZhdGlvbk9iamVjdENvbmZpZ30gb2JzZXJ2YXRpb25cbiovXG5cbi8qKlxuKiBSZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIG1vZGVsIHdpdGhvdXQgYXJyYXlzIGFzIHZhbHVlcyBidXQgb25seSBmdW5jdGlvbnNcbiogQHBhcmFtIHtNb2RlbHNQYXJhbWV0ZXJzfSBtb2RlbFRvQmVDaGFuZ2VkXG4qIEByZXR1cm5zIHtDb3JlQ29uZmlnfSBtb2RlbCB3aXRoIHJlc3BlY3Qgb2YgdGhlIENvcmUgS2FsbWFuIEZpbHRlciBwcm9wZXJ0aWVzXG4qL1xuY29uc3QgbW9kZWxzUGFyYW1ldGVyc1RvQ29yZU9wdGlvbnMgPSBmdW5jdGlvbiAobW9kZWxUb0JlQ2hhbmdlZCkge1xuXHRjb25zdCB7b2JzZXJ2YXRpb24sIGR5bmFtaWN9ID0gbW9kZWxUb0JlQ2hhbmdlZDtcblx0cmV0dXJuIGRlZXBBc3NpZ24obW9kZWxUb0JlQ2hhbmdlZCwge1xuXHRcdG9ic2VydmF0aW9uOiB7XG5cdFx0XHRzdGF0ZVByb2plY3Rpb246IHRvRnVuY3Rpb24ocG9seW1vcnBoTWF0cml4KG9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbiksIHtsYWJlbDogJ29ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbid9KSxcblx0XHRcdGNvdmFyaWFuY2U6IHRvRnVuY3Rpb24ocG9seW1vcnBoTWF0cml4KG9ic2VydmF0aW9uLmNvdmFyaWFuY2UsIHtkaW1lbnNpb246IG9ic2VydmF0aW9uLmRpbWVuc2lvbn0pLCB7bGFiZWw6ICdvYnNlcnZhdGlvbi5jb3ZhcmlhbmNlJ30pLFxuXHRcdH0sXG5cdFx0ZHluYW1pYzoge1xuXHRcdFx0dHJhbnNpdGlvbjogdG9GdW5jdGlvbihwb2x5bW9ycGhNYXRyaXgoZHluYW1pYy50cmFuc2l0aW9uKSwge2xhYmVsOiAnZHluYW1pYy50cmFuc2l0aW9uJ30pLFxuXHRcdFx0Y292YXJpYW5jZTogdG9GdW5jdGlvbihwb2x5bW9ycGhNYXRyaXgoZHluYW1pYy5jb3ZhcmlhbmNlLCB7ZGltZW5zaW9uOiBkeW5hbWljLmRpbWVuc2lvbn0pLCB7bGFiZWw6ICdkeW5hbWljLmNvdmFyaWFuY2UnfSksXG5cdFx0fSxcblx0fSk7XG59O1xuXG5jbGFzcyBLYWxtYW5GaWx0ZXIgZXh0ZW5kcyBDb3JlS2FsbWFuRmlsdGVyIHtcblx0LyoqXG5cdCogQHR5cGVkZWYge09iamVjdH0gQ29uZmlnXG5cdCogQHByb3BlcnR5IHtEeW5hbWljT2JqZWN0Q29uZmlnIHwgRHluYW1pY05vbk9iamVjdENvbmZpZ30gZHluYW1pY1xuXHQqIEBwcm9wZXJ0eSB7T2JzZXJ2YXRpb25PYmplY3RDb25maWcgfCBPYnNlcnZhdGlvbk5vbk9iamVjdENvbmZpZ30gb2JzZXJ2YXRpb25cblx0Ki9cblx0LyoqXG5cdCogQHBhcmFtIHtDb25maWd9IG9wdGlvbnNcblx0Ki9cblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG5cdFx0Y29uc3QgbW9kZWxzUGFyYW1ldGVycyA9IHNldHVwTW9kZWxzUGFyYW1ldGVycyhvcHRpb25zKTtcblx0XHRjb25zdCBjb3JlT3B0aW9ucyA9IG1vZGVsc1BhcmFtZXRlcnNUb0NvcmVPcHRpb25zKG1vZGVsc1BhcmFtZXRlcnMpO1xuXG5cdFx0c3VwZXIoT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywgY29yZU9wdGlvbnMpKTtcblx0fVxuXG5cdGNvcnJlY3Qob3B0aW9ucykge1xuXHRcdGNvbnN0IGNvcmVPYnNlcnZhdGlvbiA9IGFycmF5VG9NYXRyaXgoe29ic2VydmF0aW9uOiBvcHRpb25zLm9ic2VydmF0aW9uLCBkaW1lbnNpb246IHRoaXMub2JzZXJ2YXRpb24uZGltZW5zaW9ufSk7XG5cdFx0cmV0dXJuIHN1cGVyLmNvcnJlY3QoT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywge29ic2VydmF0aW9uOiBjb3JlT2JzZXJ2YXRpb259KSk7XG5cdH1cblxuXHQvKipcblx0KlBlcmZvcm1zIHRoZSBwcmVkaWN0aW9uIGFuZCB0aGUgY29ycmVjdGlvbiBzdGVwc1xuXHQqQHBhcmFtIHtTdGF0ZX0gcHJldmlvdXNDb3JyZWN0ZWRcblx0KkBwYXJhbSB7PEFycmF5LjxOdW1iZXI+Pn0gb2JzZXJ2YXRpb25cblx0KkByZXR1cm5zIHtBcnJheS48TnVtYmVyPn0gdGhlIG1lYW4gb2YgdGhlIGNvcnJlY3Rpb25zXG5cdCovXG5cblx0ZmlsdGVyKG9wdGlvbnMpIHtcblx0XHRjb25zdCBwcmVkaWN0ZWQgPSBzdXBlci5wcmVkaWN0KG9wdGlvbnMpO1xuXHRcdHJldHVybiB0aGlzLmNvcnJlY3QoT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywge3ByZWRpY3RlZH0pKTtcblx0fVxuXG5cdC8qKlxuKkZpbHRlcnMgYWxsIHRoZSBvYnNlcnZhdGlvbnNcbipAcGFyYW0ge0FycmF5LjxBcnJheS48TnVtYmVyPj59IG9ic2VydmF0aW9uc1xuKkByZXR1cm5zIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSB0aGUgbWVhbiBvZiB0aGUgY29ycmVjdGlvbnNcbiovXG5cdGZpbHRlckFsbChvYnNlcnZhdGlvbnMpIHtcblx0XHRsZXQgcHJldmlvdXNDb3JyZWN0ZWQgPSB0aGlzLmdldEluaXRTdGF0ZSgpO1xuXHRcdGNvbnN0IHJlc3VsdHMgPSBbXTtcblx0XHRmb3IgKGNvbnN0IG9ic2VydmF0aW9uIG9mIG9ic2VydmF0aW9ucykge1xuXHRcdFx0Y29uc3QgcHJlZGljdGVkID0gdGhpcy5wcmVkaWN0KHtwcmV2aW91c0NvcnJlY3RlZH0pO1xuXHRcdFx0cHJldmlvdXNDb3JyZWN0ZWQgPSB0aGlzLmNvcnJlY3Qoe1xuXHRcdFx0XHRwcmVkaWN0ZWQsXG5cdFx0XHRcdG9ic2VydmF0aW9uLFxuXHRcdFx0fSk7XG5cdFx0XHRyZXN1bHRzLnB1c2gocHJldmlvdXNDb3JyZWN0ZWQubWVhbi5tYXAobSA9PiBtWzBdKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHQvKipcblx0KiBSZXR1cm5zIGFuIGVzdGltYXRpb24gb2YgdGhlIGFzeW1wdG90aWMgc3RhdGUgY292YXJpYW5jZSBhcyBleHBsYWluZWQgaW4gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvS2FsbWFuX2ZpbHRlciNBc3ltcHRvdGljX2Zvcm1cblx0KiBpbiBwcmFjdGljZSB0aGlzIGNhbiBiZSB1c2VkIGFzIGEgaW5pdC5jb3ZhcmlhbmNlIHZhbHVlIGJ1dCBpcyB2ZXJ5IGNvc3RmdWwgY2FsY3VsYXRpb24gKHRoYXQncyB3aHkgdGhpcyBpcyBub3QgbWFkZSBieSBkZWZhdWx0KVxuXHQqIEBwYXJhbSB7TnVtYmVyfSBbbGltaXRJdGVyYXRpb25zPTFlMl0gbWF4IG51bWJlciBvZiBpdGVyYXRpb25zXG5cdCogQHBhcmFtIHtOdW1iZXJ9IFt0b2xlcmFuY2U9MWUtNl0gcmV0dXJucyB3aGVuIHRoZSBsYXN0IHZhbHVlcyBkaWZmZXJlbmNlcyBhcmUgbGVzcyB0aGFuIHRvbGVyYW5jZVxuXHQqIEByZXR1cm4ge0FycmF5LjxBcnJheS48TnVtYmVyPj59IGNvdmFyaWFuY2Vcblx0Ki9cblx0YXN5bXB0b3RpY1N0YXRlQ292YXJpYW5jZSh7bGltaXRJdGVyYXRpb25zID0gMWUyLCB0b2xlcmFuY2UgPSAxZS02fSA9IHt9KSB7XG5cdFx0bGV0IHByZXZpb3VzQ29ycmVjdGVkID0gc3VwZXIuZ2V0SW5pdFN0YXRlKCk7XG5cdFx0bGV0IHByZWRpY3RlZDtcblx0XHRjb25zdCByZXN1bHRzID0gW107XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsaW1pdEl0ZXJhdGlvbnM7IGkrKykge1xuXHRcdFx0Ly8gV2UgY3JlYXRlIGEgZmFrZSBtZWFuIHRoYXQgd2lsbCBub3QgYmUgdXNlZCBpbiBvcmRlciB0byBrZWVwIGNvaGVyZW5jZVxuXHRcdFx0cHJlZGljdGVkID0gbmV3IFN0YXRlKHtcblx0XHRcdFx0bWVhbjogbnVsbCxcblx0XHRcdFx0Y292YXJpYW5jZTogc3VwZXIuZ2V0UHJlZGljdGVkQ292YXJpYW5jZSh7cHJldmlvdXNDb3JyZWN0ZWR9KSxcblx0XHRcdH0pO1xuXHRcdFx0cHJldmlvdXNDb3JyZWN0ZWQgPSBuZXcgU3RhdGUoe1xuXHRcdFx0XHRtZWFuOiBudWxsLFxuXHRcdFx0XHRjb3ZhcmlhbmNlOiBzdXBlci5nZXRDb3JyZWN0ZWRDb3ZhcmlhbmNlKHtwcmVkaWN0ZWR9KSxcblx0XHRcdH0pO1xuXHRcdFx0cmVzdWx0cy5wdXNoKHByZXZpb3VzQ29ycmVjdGVkLmNvdmFyaWFuY2UpO1xuXHRcdFx0aWYgKGRpc3RhbmNlTWF0KHByZXZpb3VzQ29ycmVjdGVkLmNvdmFyaWFuY2UsIHJlc3VsdHNbaSAtIDFdKSA8IHRvbGVyYW5jZSkge1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0c1tpXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aHJvdyAobmV3IEVycm9yKCdUaGUgc3RhdGUgY292YXJpYW5jZSBkb2VzIG5vdCBjb252ZXJnZSBhc3ltcHRvdGljYWxseScpKTtcblx0fVxuXG5cdC8qKlxuXHQqIFJldHVybnMgYW4gZXN0aW1hdGlvbiBvZiB0aGUgYXN5bXB0b3RpYyBnYWluLCBhcyBleHBsYWluZWQgaW4gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvS2FsbWFuX2ZpbHRlciNBc3ltcHRvdGljX2Zvcm1cblx0KiBAcGFyYW0ge051bWJlcn0gW3RvbGVyYW5jZT0xZS02XSByZXR1cm5zIHdoZW4gdGhlIGxhc3QgdmFsdWVzIGRpZmZlcmVuY2VzIGFyZSBsZXNzIHRoYW4gdG9sZXJhbmNlXG5cdCogQHJldHVybiB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gZ2FpblxuXHQqL1xuXHRhc3ltcHRvdGljR2Fpbih7dG9sZXJhbmNlID0gMWUtNn0gPSB7fSkge1xuXHRcdGNvbnN0IGNvdmFyaWFuY2UgPSB0aGlzLmFzeW1wdG90aWNTdGF0ZUNvdmFyaWFuY2Uoe3RvbGVyYW5jZX0pO1xuXG5cdFx0Y29uc3QgYXN5bXB0b3RpY1N0YXRlID0gbmV3IFN0YXRlKHtcblx0XHRcdC8vIFdlIGNyZWF0ZSBhIGZha2UgbWVhbiB0aGF0IHdpbGwgbm90IGJlIHVzZWQgaW4gb3JkZXIgdG8ga2VlcCBjb2hlcmVuY2Vcblx0XHRcdG1lYW46IEFycmF5LmZyb20oe2xlbmd0aDogY292YXJpYW5jZS5sZW5ndGh9KS5maWxsKDApLm1hcCgoKSA9PiBbMF0pLFxuXHRcdFx0Y292YXJpYW5jZSxcblx0XHR9KTtcblxuXHRcdHJldHVybiBzdXBlci5nZXRHYWluKHtwcmVkaWN0ZWQ6IGFzeW1wdG90aWNTdGF0ZX0pO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gS2FsbWFuRmlsdGVyO1xuIiwiXG5jb25zdCByZWdpc3RlcmVkT2JzZXJ2YXRpb25Nb2RlbHMgPSB7fTtcbmNvbnN0IHJlZ2lzdGVyZWREeW5hbWljTW9kZWxzID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHQvKipcblx0KiBFbmFibGVzIHRvIHJlZ2lzdGVyIG9ic2VydmF0aW9uIG1vZGVsIGFuZCBzdG9yZSBpdFxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG5cdCogQGNhbGxiYWNrIGZuIHRoZSBmdW5jdGlvbiBjb3JyZXNwb25kaW5nIHRvIHRoZSBkZXNpcmVkIG1vZGVsXG5cdCovXG5cblx0cmVnaXN0ZXJPYnNlcnZhdGlvbihuYW1lLCBmbikge1xuXHRcdHJlZ2lzdGVyZWRPYnNlcnZhdGlvbk1vZGVsc1tuYW1lXSA9IGZuO1xuXHR9LFxuXHQvKipcblx0KiBFbmFibGVzIHRvIHJlZ2lzdGVyIGR5bmFtaWMgbW9kZWwgYW5kIHN0b3JlIGl0XG5cdCogQHBhcmFtIHtTdHJpbmd9IG5hbWVcblx0KiBAY2FsbGJhY2sgZm4gdGhlIGZ1bmN0aW9uIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGRlc2lyZWQgbW9kZWxcblx0Ki9cblxuXHRyZWdpc3RlckR5bmFtaWMobmFtZSwgZm4pIHtcblx0XHRyZWdpc3RlcmVkRHluYW1pY01vZGVsc1tuYW1lXSA9IGZuO1xuXHR9LFxuXHQvKipcblx0KiBCdWlsZCBhIG1vZGVsIGdpdmVuIGFuIG9ic2VydmF0aW9uIGNvbmZpZ3VyYXRpb25cblx0KiBAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvYnNlcnZhdGlvblxuXHQqIEByZXR1cm5zIHtPYnNlcnZhdGlvbkNvbmZpZ30gdGhlIGNvbmZpZ3VyYXRpb24gd2l0aCByZXNwZWN0IHRvIHRoZSBtb2RlbFxuXHQqL1xuXHRidWlsZE9ic2VydmF0aW9uKG9ic2VydmF0aW9uKSB7XG5cdFx0aWYgKHR5cGVvZiAocmVnaXN0ZXJlZE9ic2VydmF0aW9uTW9kZWxzW29ic2VydmF0aW9uLm5hbWVdKSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoYFRoZSBwcm92aWRlZCBvYnNlcnZhdGlvbiBtb2RlbCBuYW1lICgke29ic2VydmF0aW9uLm5hbWV9KSBpcyBub3QgcmVnaXN0ZXJlZGApKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVnaXN0ZXJlZE9ic2VydmF0aW9uTW9kZWxzW29ic2VydmF0aW9uLm5hbWVdKG9ic2VydmF0aW9uKTtcblx0fSxcblx0LyoqXG5cdCogQnVpbGQgYSBtb2RlbCBnaXZlbiBkeW5hbWljIGFuZCBvYnNlcnZhdGlvbiBjb25maWd1cmF0aW9uc1xuXHQqIEBwYXJhbSB7RHluYW1pY0NvbmZpZ30gZHluYW1pY1xuXHQqIEBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uXG5cdCogQHJldHVybnMge0R5bmFtaWNDb25maWd9IHRoZSBkeW5hbWljIGNvbmZpZ3VyYXRpb24gd2l0aCByZXNwZWN0IHRvIHRoZSBtb2RlbFxuXHQqL1xuXG5cdGJ1aWxkRHluYW1pYyhkeW5hbWljLCBvYnNlcnZhdGlvbikge1xuXHRcdGlmICh0eXBlb2YgKHJlZ2lzdGVyZWREeW5hbWljTW9kZWxzW2R5bmFtaWMubmFtZV0pICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihgVGhlIHByb3ZpZGVkIGR5bmFtaWMgbW9kZWwgKCR7ZHluYW1pYy5uYW1lfSkgbmFtZSBpcyBub3QgcmVnaXN0ZXJlZGApKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVnaXN0ZXJlZER5bmFtaWNNb2RlbHNbZHluYW1pYy5uYW1lXShkeW5hbWljLCBvYnNlcnZhdGlvbik7XG5cdH0sXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdHNlbnNvcjogcmVxdWlyZSgnLi9zZW5zb3IuanMnKSxcblx0J3NlbnNvci1sb2NhbC12YXJpYW5jZSc6IHJlcXVpcmUoJy4vc2Vuc29yLWxvY2FsLXZhcmlhbmNlJyksXG5cdCdzZW5zb3ItcHJvamVjdGVkJzogcmVxdWlyZSgnLi9zZW5zb3ItcHJvamVjdGVkJyksXG59O1xuIiwiY29uc3Qge2lkZW50aXR5fSA9IHJlcXVpcmUoJ3NpbXBsZS1saW5hbGcnKTtcbmNvbnN0IHtidWlsZE9ic2VydmF0aW9ufSA9IHJlcXVpcmUoJy4uL21vZGVsLWNvbGxlY3Rpb24nKTtcbi8qKlxuKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5zZW5zb3JEaW1lbnNpb25cbiogQHBhcmFtIHtDb3ZhcmlhbmNlUGFyYW19IG9wdGlvbnMuc2Vuc29yQ292YXJpYW5jZVxuKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5uU2Vuc29yc1xuKiBAcmV0dXJucyB7T2JzZXJ2YXRpb25Db25maWd9XG4qL1xuXG5jb25zdCBudWxsYWJsZVNlbnNvciA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdGNvbnN0IHtkaW1lbnNpb24sIG9ic2VydmVkUHJvamVjdGlvbiwgY292YXJpYW5jZTogYmFzZUNvdmFyaWFuY2V9ID0gYnVpbGRPYnNlcnZhdGlvbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCB7bmFtZTogJ3NlbnNvcid9KSk7XG5cblx0cmV0dXJuIHtcblx0XHRkaW1lbnNpb24sXG5cdFx0b2JzZXJ2ZWRQcm9qZWN0aW9uLFxuXHRcdGNvdmFyaWFuY2Uobykge1xuXHRcdFx0Y29uc3QgY292YXJpYW5jZSA9IGlkZW50aXR5KGRpbWVuc2lvbik7XG5cdFx0XHRjb25zdCB7dmFyaWFuY2V9ID0gbztcblxuXHRcdFx0dmFyaWFuY2UuZm9yRWFjaCgodiwgaSkgPT4ge1xuXHRcdFx0XHRjb3ZhcmlhbmNlW2ldW2ldID0gdiAqIGJhc2VDb3ZhcmlhbmNlW2ldW2ldO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBjb3ZhcmlhbmNlO1xuXHRcdH0sXG5cdH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG51bGxhYmxlU2Vuc29yO1xuXG4iLCJjb25zdCB7aWRlbnRpdHksIG1hdFBlcm11dGF0aW9ufSA9IHJlcXVpcmUoJ3NpbXBsZS1saW5hbGcnKTtcbmNvbnN0IGNvcnJlbGF0aW9uVG9Db3ZhcmlhbmNlID0gcmVxdWlyZSgnLi4vdXRpbHMvY29ycmVsYXRpb24tdG8tY292YXJpYW5jZScpO1xuY29uc3QgY292YXJpYW5jZVRvQ29ycmVsYXRpb24gPSByZXF1aXJlKCcuLi91dGlscy9jb3ZhcmlhbmNlLXRvLWNvcnJlbGF0aW9uJyk7XG5cbi8qKlxuKkNyZWF0ZXMgYW4gb2JzZXJ2YXRpb24gbW9kZWwgd2l0aCBhIG9ic2VydmVkUHJvamVjdGlvbiBjb3JyZXNwb25kaW5nIHRvXG4qIEBwYXJhbSB7RHluYW1pY0NvbmZpZ30gZHluYW1pY1xuKiBAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvYnNlcnZhdGlvblxuKiBAcmV0dXJucyB7RHluYW1pY0NvbmZpZ31cbiovXG5cbmNvbnN0IHNlbnNvclByb2plY3RlZCA9IGZ1bmN0aW9uICh7c2VsZWN0ZWRDb3ZhcmlhbmNlLCB0b3RhbERpbWVuc2lvbiwgb2JzSW5kZXhlcywgc2VsZWN0ZWRTdGF0ZVByb2plY3Rpb259KSB7XG5cdGlmICghc2VsZWN0ZWRTdGF0ZVByb2plY3Rpb24pIHtcblx0XHRzZWxlY3RlZFN0YXRlUHJvamVjdGlvbiA9IG5ldyBBcnJheShvYnNJbmRleGVzLmxlbmd0aCkuZmlsbCgwKS5tYXAoKCkgPT4gbmV3IEFycmF5KG9ic0luZGV4ZXMubGVuZ3RoKS5maWxsKDApKTtcblx0XHRvYnNJbmRleGVzLmZvckVhY2goKGluZGV4MSwgaTEpID0+IHtcblx0XHRcdHNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uW2kxXVtpMV0gPSAxO1xuXHRcdH0pO1xuXHR9IGVsc2UgaWYgKHNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uLmxlbmd0aCAhPT0gb2JzSW5kZXhlcy5sZW5ndGgpIHtcblx0XHR0aHJvdyAobmV3IEVycm9yKGBbU2Vuc29yLXByb2plY3RlZF0gU2hhcGUgbWlzbWF0Y2ggYmV0d2VlbiAke3NlbGVjdGVkU3RhdGVQcm9qZWN0aW9uLmxlbmd0aH0gYW5kICR7b2JzSW5kZXhlcy5sZW5ndGh9YCkpO1xuXHR9XG5cblx0Y29uc3QgYmFzZUNvdmFyaWFuY2UgPSBpZGVudGl0eSh0b3RhbERpbWVuc2lvbik7XG5cdG9ic0luZGV4ZXMuZm9yRWFjaCgoaW5kZXgxLCBpMSkgPT4ge1xuXHRcdGlmIChzZWxlY3RlZENvdmFyaWFuY2UpIHtcblx0XHRcdG9ic0luZGV4ZXMuZm9yRWFjaCgoaW5kZXgyLCBpMikgPT4ge1xuXHRcdFx0XHRiYXNlQ292YXJpYW5jZVtpbmRleDFdW2luZGV4Ml0gPSBzZWxlY3RlZENvdmFyaWFuY2VbaTFdW2kyXTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG5cdGNvbnN0IHtjb3JyZWxhdGlvbjogYmFzZUNvcnJlbGF0aW9uLCB2YXJpYW5jZTogYmFzZVZhcmlhbmNlfSA9IGNvdmFyaWFuY2VUb0NvcnJlbGF0aW9uKGJhc2VDb3ZhcmlhbmNlKTtcblxuXHRjb25zdCBkeW5hRGltZW5zaW9uID0gc2VsZWN0ZWRTdGF0ZVByb2plY3Rpb25bMF0ubGVuZ3RoO1xuXG5cdGlmIChzZWxlY3RlZFN0YXRlUHJvamVjdGlvbi5sZW5ndGggIT09IG9ic0luZGV4ZXMubGVuZ3RoKSB7XG5cdFx0dGhyb3cgKG5ldyBFcnJvcihgc2hhcGUgbWlzbWF0Y2ggKCR7c2VsZWN0ZWRTdGF0ZVByb2plY3Rpb24ubGVuZ3RofSB2cyAke29ic0luZGV4ZXMubGVuZ3RofSlgKSk7XG5cdH1cblxuXHRjb25zdCBvYnNlcnZlZFByb2plY3Rpb24gPSBtYXRQZXJtdXRhdGlvbih7XG5cdFx0b3V0cHV0U2l6ZTogW3RvdGFsRGltZW5zaW9uLCBkeW5hRGltZW5zaW9uXSxcblx0XHRjb2xJbmRleGVzOiBzZWxlY3RlZFN0YXRlUHJvamVjdGlvblswXS5tYXAoKF8sIGkpID0+IGkpLFxuXHRcdHJvd0luZGV4ZXM6IG9ic0luZGV4ZXMsXG5cdFx0bWF0cml4OiBzZWxlY3RlZFN0YXRlUHJvamVjdGlvbixcblx0fSk7XG5cblx0cmV0dXJuIHtcblx0XHRkaW1lbnNpb246IHRvdGFsRGltZW5zaW9uLFxuXHRcdG9ic2VydmVkUHJvamVjdGlvbixcblx0XHRjb3ZhcmlhbmNlKG8pIHtcblx0XHRcdGNvbnN0IHt2YXJpYW5jZX0gPSBvO1xuXHRcdFx0aWYgKCF2YXJpYW5jZSkge1xuXHRcdFx0XHRyZXR1cm4gYmFzZUNvdmFyaWFuY2U7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh2YXJpYW5jZS5sZW5ndGggIT09IGJhc2VDb3ZhcmlhbmNlLmxlbmd0aCkge1xuXHRcdFx0XHR0aHJvdyAobmV3IEVycm9yKCd2YXJpYW5jZSBpcyBkaWZmZXJlbmNlIHNpemUgZnJvbSBiYXNlQ292YXJpYW5jZScpKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgcmVzdWx0ID0gY29ycmVsYXRpb25Ub0NvdmFyaWFuY2Uoe2NvcnJlbGF0aW9uOiBiYXNlQ29ycmVsYXRpb24sIHZhcmlhbmNlOiBiYXNlVmFyaWFuY2UubWFwKChiLCBpKSA9PiB2YXJpYW5jZVtpXSAqIGIpfSk7XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblx0fTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2Vuc29yUHJvamVjdGVkO1xuIiwiY29uc3Qge2lkZW50aXR5fSA9IHJlcXVpcmUoJ3NpbXBsZS1saW5hbGcnKTtcbmNvbnN0IHBvbHltb3JwaE1hdHJpeCA9IHJlcXVpcmUoJy4uL3V0aWxzL3BvbHltb3JwaC1tYXRyaXguanMnKTtcbmNvbnN0IGNoZWNrTWF0cml4ID0gcmVxdWlyZSgnLi4vdXRpbHMvY2hlY2stbWF0cml4LmpzJyk7XG5cbi8qKlxuKiBAcGFyYW0ge051bWJlcn0gc2Vuc29yRGltZW5zaW9uXG4qIEBwYXJhbSB7Q292YXJpYW5jZVBhcmFtfSBzZW5zb3JDb3ZhcmlhbmNlXG4qIEBwYXJhbSB7TnVtYmVyfSBuU2Vuc29yc1xuKiBAcmV0dXJucyB7T2JzZXJ2YXRpb25Db25maWd9XG4qL1xuXG5jb25zdCBjb3B5ID0gbWF0ID0+IG1hdC5tYXAoYSA9PiBhLmNvbmNhdCgpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRjb25zdCB7c2Vuc29yRGltZW5zaW9uID0gMSwgc2Vuc29yQ292YXJpYW5jZSA9IDEsIG5TZW5zb3JzID0gMX0gPSBvcHRpb25zO1xuXHRjb25zdCBzZW5zb3JDb3ZhcmlhbmNlRm9ybWF0dGVkID0gcG9seW1vcnBoTWF0cml4KHNlbnNvckNvdmFyaWFuY2UsIHtkaW1lbnNpb246IHNlbnNvckRpbWVuc2lvbn0pO1xuXHRjaGVja01hdHJpeChzZW5zb3JDb3ZhcmlhbmNlRm9ybWF0dGVkLCBbc2Vuc29yRGltZW5zaW9uLCBzZW5zb3JEaW1lbnNpb25dLCAnb2JzZXJ2YXRpb24uc2Vuc29yQ292YXJpYW5jZScpO1xuXHRjb25zdCBvbmVTZW5zb3JPYnNlcnZlZFByb2plY3Rpb24gPSBpZGVudGl0eShzZW5zb3JEaW1lbnNpb24pO1xuXHRsZXQgY29uY2F0ZW5hdGVkT2JzZXJ2ZWRQcm9qZWN0aW9uID0gW107XG5cdGNvbnN0IGRpbWVuc2lvbiA9IHNlbnNvckRpbWVuc2lvbiAqIG5TZW5zb3JzO1xuXHRjb25zdCBjb25jYXRlbmF0ZWRDb3ZhcmlhbmNlID0gaWRlbnRpdHkoZGltZW5zaW9uKTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBuU2Vuc29yczsgaSsrKSB7XG5cdFx0Y29uY2F0ZW5hdGVkT2JzZXJ2ZWRQcm9qZWN0aW9uID0gY29uY2F0ZW5hdGVkT2JzZXJ2ZWRQcm9qZWN0aW9uLmNvbmNhdChjb3B5KG9uZVNlbnNvck9ic2VydmVkUHJvamVjdGlvbikpO1xuXG5cdFx0Zm9yIChjb25zdCBbckluZGV4LCByXSBvZiBzZW5zb3JDb3ZhcmlhbmNlRm9ybWF0dGVkLmVudHJpZXMoKSkge1xuXHRcdFx0Zm9yIChjb25zdCBbY0luZGV4LCBjXSBvZiByLmVudHJpZXMoKSkge1xuXHRcdFx0XHRjb25jYXRlbmF0ZWRDb3ZhcmlhbmNlW3JJbmRleCArIChpICogc2Vuc29yRGltZW5zaW9uKV1bY0luZGV4ICsgKGkgKiBzZW5zb3JEaW1lbnNpb24pXSA9IGM7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHtcblx0XHRkaW1lbnNpb24sXG5cdFx0b2JzZXJ2ZWRQcm9qZWN0aW9uOiBjb25jYXRlbmF0ZWRPYnNlcnZlZFByb2plY3Rpb24sXG5cdFx0Y292YXJpYW5jZTogY29uY2F0ZW5hdGVkQ292YXJpYW5jZSxcblx0fSk7XG59O1xuIiwiY29uc3Qge3BhZFdpdGhaZXJvQ29sczogcGFkV2l0aFplcm9zfSA9IHJlcXVpcmUoJ3NpbXBsZS1saW5hbGcnKTtcbmNvbnN0IHtpZGVudGl0eX0gPSByZXF1aXJlKCdzaW1wbGUtbGluYWxnJyk7XG4vKipcbipCdWlsZHMgdGhlIHN0YXRlUHJvamVjdGlvbiBnaXZlbiBhbiBvYnNlcnZlZFByb2plY3Rpb25cbipAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvYnNlcnZhdGlvblxuKkBwYXJhbSB7RHluYW1pY0NvbmZpZ30gZHluYW1pY1xuKkByZXR1cm5zIHtPYnNlcnZhdGlvbkNvbmZpZywgRHluYW1pY0NvbmZpZ30gdGhlIG1vZGVsIGNvbnRhaW5pbmcgdGhlIGNyZWF0ZWQgc3RhdGVQcm9qZWN0aW9uXG4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7b2JzZXJ2YXRpb24sIGR5bmFtaWN9KSB7XG5cdGNvbnN0IHtvYnNlcnZlZFByb2plY3Rpb24sIHN0YXRlUHJvamVjdGlvbn0gPSBvYnNlcnZhdGlvbjtcblx0Y29uc3Qgb2JzZXJ2YXRpb25EaW1lbnNpb24gPSBvYnNlcnZhdGlvbi5kaW1lbnNpb247XG5cdGNvbnN0IGR5bmFtaWNEaW1lbnNpb24gPSBkeW5hbWljLmRpbWVuc2lvbjtcblx0aWYgKG9ic2VydmVkUHJvamVjdGlvbiAmJiBzdGF0ZVByb2plY3Rpb24pIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcignWW91IGNhbm5vdCB1c2UgYm90aCBvYnNlcnZlZFByb2plY3Rpb24gYW5kIHN0YXRlUHJvamVjdGlvbicpKTtcblx0fVxuXG5cdGlmIChvYnNlcnZlZFByb2plY3Rpb24pIHtcblx0XHRjb25zdCBzdGF0ZVByb2plY3Rpb24gPSBwYWRXaXRoWmVyb3Mob2JzZXJ2ZWRQcm9qZWN0aW9uLCB7Y29sdW1uczogZHluYW1pY0RpbWVuc2lvbn0pO1xuXHRcdHJldHVybiB7XG5cdFx0XHRvYnNlcnZhdGlvbjogT2JqZWN0LmFzc2lnbih7fSwgb2JzZXJ2YXRpb24sIHtcblx0XHRcdFx0c3RhdGVQcm9qZWN0aW9uLFxuXHRcdFx0fSksXG5cdFx0XHRkeW5hbWljLFxuXHRcdH07XG5cdH1cblxuXHRpZiAob2JzZXJ2YXRpb25EaW1lbnNpb24gJiYgZHluYW1pY0RpbWVuc2lvbiAmJiAhc3RhdGVQcm9qZWN0aW9uKSB7XG5cdFx0Y29uc3Qgb2JzZXJ2YXRpb25NYXRyaXggPSBpZGVudGl0eShvYnNlcnZhdGlvbkRpbWVuc2lvbik7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG9ic2VydmF0aW9uOiBPYmplY3QuYXNzaWduKHt9LCBvYnNlcnZhdGlvbiwge1xuXHRcdFx0XHRzdGF0ZVByb2plY3Rpb246IHBhZFdpdGhaZXJvcyhvYnNlcnZhdGlvbk1hdHJpeCwge2NvbHVtbnM6IGR5bmFtaWNEaW1lbnNpb259KSxcblx0XHRcdH0pLFxuXHRcdFx0ZHluYW1pYyxcblx0XHR9O1xuXHR9XG5cblx0cmV0dXJuIHtvYnNlcnZhdGlvbiwgZHluYW1pY307XG59O1xuIiwiLyoqXG4qVmVyaWZpZXMgdGhhdCBkeW5hbWljLmRpbWVuc2lvbiBhbmQgb2JzZXJ2YXRpb24uZGltZW5zaW9uIGFyZSBzZXRcbipAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvYnNlcnZhdGlvblxuKkBwYXJhbSB7RHluYW1pY0NvbmZpZ30gZHluYW1pY1xuKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe29ic2VydmF0aW9uLCBkeW5hbWljfSkge1xuXHRjb25zdCBkeW5hbWljRGltZW5zaW9uID0gZHluYW1pYy5kaW1lbnNpb247XG5cdGNvbnN0IG9ic2VydmF0aW9uRGltZW5zaW9uID0gb2JzZXJ2YXRpb24uZGltZW5zaW9uO1xuXHRpZiAoIWR5bmFtaWNEaW1lbnNpb24gfHwgIW9ic2VydmF0aW9uRGltZW5zaW9uKSB7XG5cdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoJ0RpbWVuc2lvbiBpcyBub3Qgc2V0JykpO1xuXHR9XG5cblx0cmV0dXJuIHtvYnNlcnZhdGlvbiwgZHluYW1pY307XG59O1xuIiwiY29uc3Qge2RpYWd9ID0gcmVxdWlyZSgnc2ltcGxlLWxpbmFsZycpO1xuY29uc3QgcG9seW1vcnBoTWF0cml4ID0gcmVxdWlyZSgnLi4vdXRpbHMvcG9seW1vcnBoLW1hdHJpeC5qcycpO1xuXG4vKipcbipJbml0aWFsaXplcyB0aGUgZHluYW1pYy5pbml0IHdoZW4gbm90IGdpdmVuXG4qQHBhcmFtIHtPYnNlcnZhdGlvbkNvbmZpZ30gb2JzZXJ2YXRpb25cbipAcGFyYW0ge0R5bmFtaWNDb25maWd9IGR5bmFtaWNcbipAcmV0dXJucyB7Q29yZUNvbmZpZ31cbiovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHtvYnNlcnZhdGlvbiwgZHluYW1pY30pIHtcblx0aWYgKCFkeW5hbWljLmluaXQpIHtcblx0XHRjb25zdCBodWdlID0gMWU2O1xuXHRcdGNvbnN0IGR5bmFtaWNEaW1lbnNpb24gPSBkeW5hbWljLmRpbWVuc2lvbjtcblx0XHRjb25zdCBtZWFuQXJyYXkgPSBuZXcgQXJyYXkoZHluYW1pY0RpbWVuc2lvbikuZmlsbCgwKTtcblx0XHRjb25zdCBjb3ZhcmlhbmNlQXJyYXkgPSBuZXcgQXJyYXkoZHluYW1pY0RpbWVuc2lvbikuZmlsbChodWdlKTtcblx0XHRjb25zdCB3aXRoSW5pdE9wdGlvbnMgPSB7XG5cdFx0XHRvYnNlcnZhdGlvbixcblx0XHRcdGR5bmFtaWM6IE9iamVjdC5hc3NpZ24oe30sIGR5bmFtaWMsIHtcblx0XHRcdFx0aW5pdDoge1xuXHRcdFx0XHRcdG1lYW46IG1lYW5BcnJheS5tYXAoZWxlbWVudCA9PiBbZWxlbWVudF0pLFxuXHRcdFx0XHRcdGNvdmFyaWFuY2U6IGRpYWcoY292YXJpYW5jZUFycmF5KSxcblx0XHRcdFx0XHRpbmRleDogLTEsXG5cdFx0XHRcdH0sXG5cdFx0XHR9KSxcblx0XHR9O1xuXHRcdHJldHVybiB3aXRoSW5pdE9wdGlvbnM7XG5cdH1cblxuXHRpZiAoZHluYW1pYy5pbml0ICYmICFkeW5hbWljLmluaXQubWVhbikge1xuXHRcdHRocm93IChuZXcgRXJyb3IoJ2R5bmFtaWMuaW5pdCBzaG91bGQgaGF2ZSBhIG1lYW4ga2V5JykpO1xuXHR9XG5cblx0ZHluYW1pYy5pbml0ID0gT2JqZWN0LmFzc2lnbih7fSwgZHluYW1pYy5pbml0LCB7XG5cdFx0Y292YXJpYW5jZTogcG9seW1vcnBoTWF0cml4KGR5bmFtaWMuaW5pdC5jb3ZhcmlhbmNlLCB7ZGltZW5zaW9uOiBkeW5hbWljLmRpbWVuc2lvbn0pLFxuXHR9KTtcblxuXHRyZXR1cm4ge29ic2VydmF0aW9uLCBkeW5hbWljfTtcbn07XG4iLCIvKipcbipWZXJpZmllcyB0aGF0IGRpbWVuc2lvbnMgYXJlIG1hdGNoaW5nIGFuZCBzZXQgZHluYW1pYy5kaW1lbnNpb24gYW5kIG9ic2VydmF0aW9uLmRpbWVuc2lvblxuKiB3aXRoIHJlc3BlY3Qgb2Ygc3RhdGVQcm9qZWN0aW9uIGFuZCB0cmFuc2l0aW9uIGRpbWVuc2lvbnNcbipAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvYnNlcnZhdGlvblxuKkBwYXJhbSB7RHluYW1pY0NvbmZpZ30gZHluYW1pY1xuKkByZXR1cm5zIHtPYnNlcnZhdGlvbkNvbmZpZywgRHluYW1pY0NvbmZpZ31cbiovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHtvYnNlcnZhdGlvbiwgZHluYW1pY30pIHtcblx0Y29uc3Qge3N0YXRlUHJvamVjdGlvbn0gPSBvYnNlcnZhdGlvbjtcblx0Y29uc3Qge3RyYW5zaXRpb259ID0gZHluYW1pYztcblx0Y29uc3QgZHluYW1pY0RpbWVuc2lvbiA9IGR5bmFtaWMuZGltZW5zaW9uO1xuXHRjb25zdCBvYnNlcnZhdGlvbkRpbWVuc2lvbiA9IG9ic2VydmF0aW9uLmRpbWVuc2lvbjtcblxuXHRpZiAoZHluYW1pY0RpbWVuc2lvbiAmJiBvYnNlcnZhdGlvbkRpbWVuc2lvbiAmJiBBcnJheS5pc0FycmF5KHN0YXRlUHJvamVjdGlvbikgJiYgKGR5bmFtaWNEaW1lbnNpb24gIT09IHN0YXRlUHJvamVjdGlvblswXS5sZW5ndGggfHwgb2JzZXJ2YXRpb25EaW1lbnNpb24gIT09IHN0YXRlUHJvamVjdGlvbi5sZW5ndGgpKSB7XG5cdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoJ3N0YXRlUHJvamVjdGlvbiBkaW1lbnNpb25zIG5vdCBtYXRjaGluZyB3aXRoIG9ic2VydmF0aW9uIGFuZCBkeW5hbWljIGRpbWVuc2lvbnMnKSk7XG5cdH1cblxuXHRpZiAoZHluYW1pY0RpbWVuc2lvbiAmJiBBcnJheS5pc0FycmF5KHRyYW5zaXRpb24pICYmIGR5bmFtaWNEaW1lbnNpb24gIT09IHRyYW5zaXRpb24ubGVuZ3RoKSB7XG5cdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoJ3RyYW5zaXRpb24gZGltZW5zaW9uIG5vdCBtYXRjaGluZyB3aXRoIGR5bmFtaWMgZGltZW5zaW9uJykpO1xuXHR9XG5cblx0aWYgKEFycmF5LmlzQXJyYXkoc3RhdGVQcm9qZWN0aW9uKSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRvYnNlcnZhdGlvbjogT2JqZWN0LmFzc2lnbih7fSwgb2JzZXJ2YXRpb24sIHtcblx0XHRcdFx0ZGltZW5zaW9uOiBzdGF0ZVByb2plY3Rpb24ubGVuZ3RoLFxuXHRcdFx0fSksXG5cdFx0XHRkeW5hbWljOiBPYmplY3QuYXNzaWduKHt9LCBkeW5hbWljLCB7XG5cdFx0XHRcdGRpbWVuc2lvbjogc3RhdGVQcm9qZWN0aW9uWzBdLmxlbmd0aCxcblx0XHRcdH0pLFxuXHRcdH07XG5cdH1cblxuXHRpZiAoQXJyYXkuaXNBcnJheSh0cmFuc2l0aW9uKSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRvYnNlcnZhdGlvbixcblx0XHRcdGR5bmFtaWM6IE9iamVjdC5hc3NpZ24oe30sIGR5bmFtaWMsIHtcblx0XHRcdFx0ZGltZW5zaW9uOiB0cmFuc2l0aW9uLmxlbmd0aCxcblx0XHRcdH0pLFxuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4ge29ic2VydmF0aW9uLCBkeW5hbWljfTtcbn07XG4iLCJjb25zdCB7c3VidHJhY3Q6IHN1YiwgdHJhbnNwb3NlLCBtYXRNdWwsIGludmVydCwgZWxlbVdpc2UsIHN1YlNxdWFyZU1hdHJpeH0gPSByZXF1aXJlKCdzaW1wbGUtbGluYWxnJyk7XG5jb25zdCBhcnJheVRvTWF0cml4ID0gcmVxdWlyZSgnLi91dGlscy9hcnJheS10by1tYXRyaXguanMnKTtcbmNvbnN0IGNoZWNrTWF0cml4ID0gcmVxdWlyZSgnLi91dGlscy9jaGVjay1tYXRyaXguanMnKTtcbmNvbnN0IGNoZWNrQ292YXJpYW5jZSA9IHJlcXVpcmUoJy4vdXRpbHMvY2hlY2stY292YXJpYW5jZScpO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIG11bHRpIGRpbWVuc2lvbm5hbCBnYXVzc2lhbiwgd2l0aCBoaXMgbWVhbiBhbmQgaGlzIGNvdmFyaWFuY2VcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBbaW5kZXg9MF0gdGhlIGluZGV4IG9mIHRoZSBTdGF0ZSBpbiB0aGUgcHJvY2VzcywgdGhpcyBpcyBub3QgbWFuZGF0b3J5IGZvciBzaW1wbGUgS2FsbWFuIEZpbHRlciwgYnV0IGlzIG5lZWRlZCBmb3IgbW9zdCBvZiB0aGUgdXNlIGNhc2Ugb2YgZXh0ZW5kZWQga2FsbWFuIGZpbHRlclxuICogQHByb3BlcnR5IHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBjb3ZhcmlhbmNlIHNxdWFyZSBtYXRyaXggb2Ygc2l6ZSBkaW1lbnNpb25cbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPEFycmF5PE51bWJlcj4+fSBtZWFuIGNvbHVtbiBtYXRyaXggb2Ygc2l6ZSBkaW1lbnNpb24geCAxXG4gKi9cbmNsYXNzIFN0YXRlIHtcblx0Y29uc3RydWN0b3Ioe21lYW4sIGNvdmFyaWFuY2UsIGluZGV4fSkge1xuXHRcdHRoaXMubWVhbiA9IG1lYW47XG5cdFx0dGhpcy5jb3ZhcmlhbmNlID0gY292YXJpYW5jZTtcblx0XHR0aGlzLmluZGV4ID0gaW5kZXg7XG5cdH1cblxuXHQvKipcblx0KiBDaGVjayB0aGUgY29uc2lzdGVuY3kgb2YgdGhlIFN0YXRlXG5cdCogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcblx0KiBAcmV0dXJucyB7TnVsbH1cblx0KiBAc2VlIGNoZWNrXG5cdCovXG5cdGNoZWNrKG9wdGlvbnMpIHtcblx0XHR0aGlzLmNvbnN0cnVjdG9yLmNoZWNrKHRoaXMsIG9wdGlvbnMpO1xuXHR9XG5cblx0LyoqXG5cdCogQ2hlY2sgdGhlIGNvbnNpc3RlbmN5IG9mIHRoZSBTdGF0ZSdzIGF0dHJpYnV0ZXNcblx0KiBAcGFyYW0ge1N0YXRlfSBzdGF0ZVxuXHQqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV1cblx0KiBAcGFyYW0ge0FycmF5fSBbb3B0aW9ucy5kaW1lbnNpb249bnVsbF0gaWYgZGVmaW5lZCBjaGVjayB0aGUgZGltZW5zaW9uIG9mIHRoZSBzdGF0ZVxuXHQqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy50aXRsZT1udWxsXSB1c2VkIHRvIGxvZyBlcnJvciBtb3IgZXhwbGljaXRseVxuXHQqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5laWdlblxuXHQqIEByZXR1cm5zIHtOdWxsfVxuXHQqL1xuXG5cdHN0YXRpYyBjaGVjayhzdGF0ZSwge2RpbWVuc2lvbiA9IG51bGwsIHRpdGxlID0gbnVsbCwgZWlnZW59ID0ge30pIHtcblx0XHRpZiAoIShzdGF0ZSBpbnN0YW5jZW9mIFN0YXRlKSkge1xuXHRcdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgYXJndW1lbnQgaXMgbm90IGEgc3RhdGUgXFxuJ1xuICAgICAgICArICdUaXBzOiBtYXliZSB5b3UgYXJlIHVzaW5nIDIgZGlmZmVyZW50IHZlcnNpb24gb2Yga2FsbWFuLWZpbHRlciBpbiB5b3VyIG5wbSBkZXBzIHRyZWUnLFxuXHRcdFx0KSk7XG5cdFx0fVxuXG5cdFx0Y29uc3Qge21lYW4sIGNvdmFyaWFuY2V9ID0gc3RhdGU7IC8vIEluZGV4XG5cdFx0Y29uc3QgbWVhbkRpbWVuc2lvbiA9IG1lYW4ubGVuZ3RoO1xuXHRcdGlmICh0eXBlb2YgKGRpbWVuc2lvbikgPT09ICdudW1iZXInICYmIG1lYW5EaW1lbnNpb24gIT09IGRpbWVuc2lvbikge1xuXHRcdFx0dGhyb3cgKG5ldyBFcnJvcihgWyR7dGl0bGV9XSBTdGF0ZS5tZWFuICR7bWVhbn0gd2l0aCBkaW1lbnNpb24gJHttZWFuRGltZW5zaW9ufSBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBkaW1lbnNpb24gKCR7ZGltZW5zaW9ufSlgKSk7XG5cdFx0fVxuXG5cdFx0Y2hlY2tNYXRyaXgobWVhbiwgW21lYW5EaW1lbnNpb24sIDFdLCB0aXRsZSA/IHRpdGxlICsgJy5tZWFuJyA6ICdtZWFuJyk7XG5cdFx0Y2hlY2tNYXRyaXgoY292YXJpYW5jZSwgW21lYW5EaW1lbnNpb24sIG1lYW5EaW1lbnNpb25dLCB0aXRsZSA/IHRpdGxlICsgJy5jb3ZhcmlhbmNlJyA6ICdjb3ZhcmlhbmNlJyk7XG5cdFx0Y2hlY2tDb3ZhcmlhbmNlKHtjb3ZhcmlhbmNlLCBlaWdlbn0sIHRpdGxlID8gdGl0bGUgKyAnLmNvdmFyaWFuY2UnIDogJ2NvdmFyaWFuY2UnKTtcblx0XHQvLyBJZiAodHlwZW9mIChpbmRleCkgIT09ICdudW1iZXInKSB7XG5cdFx0Ly8gXHR0aHJvdyAobmV3IFR5cGVFcnJvcigndCBtdXN0IGJlIGEgbnVtYmVyJykpO1xuXHRcdC8vIH1cblx0fVxuXG5cdC8qKlxuXHQqIE11bHRpcGx5IHN0YXRlIHdpdGggbWF0cml4XG5cdCogQHBhcmFtIHtTdGF0ZX0gc3RhdGVcblx0KiBAcGFyYW0ge0FycmF5LjxBcnJheS48TnVtYmVyPj59IG1hdHJpeFxuXHQqIEByZXR1cm5zIHtTdGF0ZX1cblx0Ki9cblx0c3RhdGljIG1hdE11bCh7c3RhdGUsIG1hdHJpeH0pIHtcblx0XHRjb25zdCBjb3ZhcmlhbmNlID0gbWF0TXVsKFxuXHRcdFx0bWF0TXVsKG1hdHJpeCwgc3RhdGUuY292YXJpYW5jZSksXG5cdFx0XHR0cmFuc3Bvc2UobWF0cml4KSxcblx0XHQpO1xuXHRcdGNvbnN0IG1lYW4gPSBtYXRNdWwobWF0cml4LCBzdGF0ZS5tZWFuKTtcblxuXHRcdHJldHVybiBuZXcgU3RhdGUoe1xuXHRcdFx0bWVhbixcblx0XHRcdGNvdmFyaWFuY2UsXG5cdFx0XHRpbmRleDogc3RhdGUuaW5kZXgsXG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0KiBGcm9tIGEgc3RhdGUgaW4gbi1kaW1lbnNpb24gY3JlYXRlIGEgc3RhdGUgaW4gYSBzdWJzcGFjZVxuXHQqIElmIHlvdSBzZWUgdGhlIHN0YXRlIGFzIGEgTi1kaW1lbnNpb24gZ2F1c3NpYW4sXG5cdCogdGhpcyBjYW4gYmUgdmlld2VkIGFzIHRoZSBzdWIgTS1kaW1lbnNpb24gZ2F1c3NpYW4gKE0gPCBOKVxuXHQqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IG9ic0luZGV4ZXMgbGlzdCBvZiBkaW1lbnNpb24gdG8gZXh0cmFjdCwgIChNIDwgTiA8PT4gb2JzSW5kZXhlcy5sZW5ndGggPCB0aGlzLm1lYW4ubGVuZ3RoKVxuXHQqIEByZXR1cm5zIHtTdGF0ZX0gc3ViU3RhdGUgaW4gc3Vic3BhY2UsIHdpdGggc3ViU3RhdGUubWVhbi5sZW5ndGggPT09IG9ic0luZGV4ZXMubGVuZ3RoXG5cdCovXG5cdHN1YlN0YXRlKG9ic0luZGV4ZXMpIHtcblx0XHRjb25zdCBzdGF0ZSA9IG5ldyBTdGF0ZSh7XG5cdFx0XHRtZWFuOiBvYnNJbmRleGVzLm1hcChpID0+IHRoaXMubWVhbltpXSksXG5cdFx0XHRjb3ZhcmlhbmNlOiBzdWJTcXVhcmVNYXRyaXgodGhpcy5jb3ZhcmlhbmNlLCBvYnNJbmRleGVzKSxcblx0XHRcdGluZGV4OiB0aGlzLmluZGV4LFxuXHRcdH0pO1xuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdC8qKlxuXHQqIEB0eXBlZGVmIHtPYmplY3R9IERldGFpbGVkTWFoYWxhbm9iaXNcblx0KiBAcHJvcGVydHkge0FycmF5LjxbTnVtYmVyXT59IGRpZmZcblx0KiBAcHJvcGVydHkge0FycmF5LjxBcnJheS48TnVtYmVyPj59IGNvdmFyaWFuY2VJbnZlcnRcblx0KiBAcHJvcGVydHkge051bWJlcn0gdmFsdWVcblx0Ki9cblx0LyoqXG5cdCogU2ltcGxlIE1hbGFoYW5vYmlzIGRpc3RhbmNlIGJldHdlZW4gdGhlIGRpc3RyaWJ1dGlvbiAodGhpcykgYW5kIGEgcG9pbnRcblx0KiBAcGFyYW0ge0FycmF5LjxbTnVtYmVyXT59IHBvaW50IGEgTngxIG1hdHJpeCByZXByZXNlbnRpbmcgYSBwb2ludFxuXHQqIEByZXR1cm5zIHtEZXRhaWxlZE1haGFsYW5vYmlzfVxuXHQqL1xuXHRyYXdEZXRhaWxlZE1haGFsYW5vYmlzKHBvaW50KSB7XG5cdFx0Y29uc3QgZGlmZiA9IHN1Yih0aGlzLm1lYW4sIHBvaW50KTtcblx0XHR0aGlzLmNoZWNrKCk7XG5cdFx0Y29uc3QgY292YXJpYW5jZUludmVydCA9IGludmVydCh0aGlzLmNvdmFyaWFuY2UpO1xuXHRcdGlmIChjb3ZhcmlhbmNlSW52ZXJ0ID09PSBudWxsKSB7XG5cdFx0XHR0aGlzLmNoZWNrKHtlaWdlbjogdHJ1ZX0pO1xuXHRcdFx0dGhyb3cgKG5ldyBFcnJvcihgQ2Fubm90IGludmVydCBjb3ZhcmlhbmNlICR7SlNPTi5zdHJpbmdpZnkodGhpcy5jb3ZhcmlhbmNlKX1gKSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZGlmZlRyYW5zcG9zZWQgPSB0cmFuc3Bvc2UoZGlmZik7XG5cblx0XHQvLyBDb25zb2xlLmxvZygnY292YXJpYW5jZSBpbiBvYnMgc3BhY2UnLCBjb3ZhcmlhbmNlSW5PYnNlcnZhdGlvblNwYWNlKTtcblxuXHRcdGNvbnN0IHZhbHVlID0gTWF0aC5zcXJ0KFxuXHRcdFx0bWF0TXVsKFxuXHRcdFx0XHRtYXRNdWwoXG5cdFx0XHRcdFx0ZGlmZlRyYW5zcG9zZWQsXG5cdFx0XHRcdFx0Y292YXJpYW5jZUludmVydCxcblx0XHRcdFx0KSxcblx0XHRcdFx0ZGlmZixcblx0XHRcdCksXG5cdFx0KTtcblx0XHRpZiAoTnVtYmVyLmlzTmFOKHZhbHVlKSkge1xuXHRcdFx0Y29uc29sZS5sb2coe2RpZmYsIGNvdmFyaWFuY2VJbnZlcnQsIHRoaXM6IHRoaXMsIHBvaW50fSwgbWF0TXVsKFxuXHRcdFx0XHRtYXRNdWwoXG5cdFx0XHRcdFx0ZGlmZlRyYW5zcG9zZWQsXG5cdFx0XHRcdFx0Y292YXJpYW5jZUludmVydCxcblx0XHRcdFx0KSxcblx0XHRcdFx0ZGlmZixcblx0XHRcdCkpO1xuXHRcdFx0dGhyb3cgKG5ldyBFcnJvcignbWFoYWxhbm9iaXMgaXMgTmFOJykpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRkaWZmLFxuXHRcdFx0Y292YXJpYW5jZUludmVydCxcblx0XHRcdHZhbHVlLFxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0KiBNYWxhaGFub2JpcyBkaXN0YW5jZSBpcyBtYWRlIGFnYWluc3QgYW4gb2JzZXJ2YXRpb24sIHNvIHRoZSBtZWFuIGFuZCBjb3ZhcmlhbmNlXG5cdCogYXJlIHByb2plY3RlZCBpbnRvIHRoZSBvYnNlcnZhdGlvbiBzcGFjZVxuXHQqIEBwYXJhbSB7S2FsbWFuRmlsdGVyfSBrZiBrYWxtYW4gZmlsdGVyIHVzZSB0byBwcm9qZWN0IHRoZSBzdGF0ZSBpbiBvYnNlcnZhdGlvbidzIHNwYWNlXG5cdCogQHBhcmFtIHtPYnNlcnZhdGlvbn0gb2JzZXJ2YXRpb25cblx0KiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBvYnNJbmRleGVzIGxpc3Qgb2YgaW5kZXhlcyBvZiBvYnNlcnZhdGlvbiBzdGF0ZSB0byB1c2UgZm9yIHRoZSBtYWhhbGFub2JpcyBkaXN0YW5jZVxuXHQqIEByZXR1cm5zIHtEZXRhaWxlZE1haGFsYW5vYmlzfVxuXHQqL1xuXHRkZXRhaWxlZE1haGFsYW5vYmlzKHtrZiwgb2JzZXJ2YXRpb24sIG9ic0luZGV4ZXN9KSB7XG5cdFx0aWYgKG9ic2VydmF0aW9uLmxlbmd0aCAhPT0ga2Yub2JzZXJ2YXRpb24uZGltZW5zaW9uKSB7XG5cdFx0XHR0aHJvdyAobmV3IEVycm9yKGBNYWhhbGFub2JpcyBvYnNlcnZhdGlvbiAke29ic2VydmF0aW9ufSAoZGltZW5zaW9uOiAke29ic2VydmF0aW9uLmxlbmd0aH0pIGRvZXMgbm90IG1hdGNoIHdpdGgga2Ygb2JzZXJ2YXRpb24gZGltZW5zaW9uICgke2tmLm9ic2VydmF0aW9uLmRpbWVuc2lvbn0pYCkpO1xuXHRcdH1cblxuXHRcdGxldCBjb3JyZWN0bHlTaXplZE9ic2VydmF0aW9uID0gYXJyYXlUb01hdHJpeCh7b2JzZXJ2YXRpb24sIGRpbWVuc2lvbjogb2JzZXJ2YXRpb24ubGVuZ3RofSk7XG5cblx0XHRjb25zdCBzdGF0ZVByb2plY3Rpb24gPSBrZi5nZXRWYWx1ZShrZi5vYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24sIHt9KTtcblxuXHRcdGxldCBwcm9qZWN0ZWRTdGF0ZSA9IHRoaXMuY29uc3RydWN0b3IubWF0TXVsKHtzdGF0ZTogdGhpcywgbWF0cml4OiBzdGF0ZVByb2plY3Rpb259KTtcblxuXHRcdGlmIChBcnJheS5pc0FycmF5KG9ic0luZGV4ZXMpKSB7XG5cdFx0XHRwcm9qZWN0ZWRTdGF0ZSA9IHByb2plY3RlZFN0YXRlLnN1YlN0YXRlKG9ic0luZGV4ZXMpO1xuXHRcdFx0Y29ycmVjdGx5U2l6ZWRPYnNlcnZhdGlvbiA9IG9ic0luZGV4ZXMubWFwKGkgPT4gY29ycmVjdGx5U2l6ZWRPYnNlcnZhdGlvbltpXSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHByb2plY3RlZFN0YXRlLnJhd0RldGFpbGVkTWFoYWxhbm9iaXMoY29ycmVjdGx5U2l6ZWRPYnNlcnZhdGlvbik7XG5cdH1cblxuXHQvKipcblx0KiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBAc2VlIGRldGFpbGVkTWFoYWxhbm9iaXNcblx0KiBAcmV0dXJucyB7TnVtYmVyfVxuXHQqL1xuXHRtYWhhbGFub2JpcyhvcHRpb25zKSB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gdGhpcy5kZXRhaWxlZE1haGFsYW5vYmlzKG9wdGlvbnMpLnZhbHVlO1xuXHRcdGlmIChOdW1iZXIuaXNOYU4ocmVzdWx0KSkge1xuXHRcdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoJ21haGFsYW5vYmlzIGlzIE5hTicpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0LyoqXG5cdCogQmhhdHRhY2hhcnl5YSBkaXN0YW5jZSBpcyBtYWRlIGFnYWluc3QgaW4gdGhlIG9ic2VydmF0aW9uIHNwYWNlXG5cdCogdG8gZG8gaXQgaW4gdGhlIG5vcm1hbCBzcGFjZSBzZWUgc3RhdGUuYmhhdHRhY2hhcnl5YVxuXHQqIEBwYXJhbSB7S2FsbWFuRmlsdGVyfSBrZiBrYWxtYW4gZmlsdGVyIHVzZSB0byBwcm9qZWN0IHRoZSBzdGF0ZSBpbiBvYnNlcnZhdGlvbidzIHNwYWNlXG5cdCogQHBhcmFtIHtTdGF0ZX0gc3RhdGVcblx0KiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBvYnNJbmRleGVzIGxpc3Qgb2YgaW5kZXhlcyBvZiBvYnNlcnZhdGlvbiBzdGF0ZSB0byB1c2UgZm9yIHRoZSBiaGF0dGFjaGFyeXlhIGRpc3RhbmNlXG5cdCogQHJldHVybnMge051bWJlcn1cblx0Ki9cblx0b2JzQmhhdHRhY2hhcnl5YSh7a2YsIHN0YXRlLCBvYnNJbmRleGVzfSkge1xuXHRcdGNvbnN0IHN0YXRlUHJvamVjdGlvbiA9IGtmLmdldFZhbHVlKGtmLm9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbiwge30pO1xuXG5cdFx0bGV0IHByb2plY3RlZFNlbGZTdGF0ZSA9IHRoaXMuY29uc3RydWN0b3IubWF0TXVsKHtzdGF0ZTogdGhpcywgbWF0cml4OiBzdGF0ZVByb2plY3Rpb259KTtcblx0XHRsZXQgcHJvamVjdGVkT3RoZXJTdGF0ZSA9IHRoaXMuY29uc3RydWN0b3IubWF0TXVsKHtzdGF0ZSwgbWF0cml4OiBzdGF0ZVByb2plY3Rpb259KTtcblxuXHRcdGlmIChBcnJheS5pc0FycmF5KG9ic0luZGV4ZXMpKSB7XG5cdFx0XHRwcm9qZWN0ZWRTZWxmU3RhdGUgPSBwcm9qZWN0ZWRTZWxmU3RhdGUuc3ViU3RhdGUob2JzSW5kZXhlcyk7XG5cdFx0XHRwcm9qZWN0ZWRPdGhlclN0YXRlID0gcHJvamVjdGVkT3RoZXJTdGF0ZS5zdWJTdGF0ZShvYnNJbmRleGVzKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcHJvamVjdGVkU2VsZlN0YXRlLmJoYXR0YWNoYXJ5eWEocHJvamVjdGVkT3RoZXJTdGF0ZSk7XG5cdH1cblxuXHQvKipcblx0KiBAcGFyYW0ge1N0YXRlfSBvdGhlclN0YXRlIG90aGVyIHN0YXRlIHRvIGNvbXBhcmUgd2l0aFxuXHQqIEByZXR1cm5zIHtOdW1iZXJ9XG5cdCovXG5cdGJoYXR0YWNoYXJ5eWEob3RoZXJTdGF0ZSkge1xuXHRcdGNvbnN0IHtjb3ZhcmlhbmNlLCBtZWFufSA9IHRoaXM7XG5cdFx0Y29uc3QgYXZlcmFnZSA9IGVsZW1XaXNlKFtjb3ZhcmlhbmNlLCBvdGhlclN0YXRlLmNvdmFyaWFuY2VdLCAoW2EsIGJdKSA9PiAoYSArIGIpIC8gMik7XG5cblx0XHRsZXQgY292YXJJbnZlcnRlZDtcblx0XHR0cnkge1xuXHRcdFx0Y292YXJJbnZlcnRlZCA9IGludmVydChhdmVyYWdlKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5sb2coJ0Nhbm5vdCBpbnZlcnQnLCBhdmVyYWdlKTtcblx0XHRcdHRocm93IChlcnJvcik7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZGlmZiA9IHN1YihtZWFuLCBvdGhlclN0YXRlLm1lYW4pO1xuXG5cdFx0cmV0dXJuIG1hdE11bCh0cmFuc3Bvc2UoZGlmZiksIG1hdE11bChjb3ZhckludmVydGVkLCBkaWZmKSlbMF1bMF07XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0ZTtcbiIsIi8qKlxuKlJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgbWF0cml4IGluIGRpbSoxLCBnaXZlbiBhbiBkaW0gbWF0cml4LCBhbmQgY2hlY2tzXG4qIGlmIGNvcnJlc3BvbmRpbmcgd2l0aCB0aGUgb2JzZXJ2YXRpb24gZGltZW5zaW9uXG4qQHBhcmFtIHtBcnJheS48TnVtYmVyPiB8IEFycmF5LjxBcnJheS48TnVtYmVyPj59IG9ic2VydmF0aW9uXG4qQHBhcmFtIHtOdW1iZXJ9IGRpbWVuc2lvblxuKkByZXR1cm5zIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fVxuKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe29ic2VydmF0aW9uLCBkaW1lbnNpb259KSB7XG5cdGlmICghQXJyYXkuaXNBcnJheShvYnNlcnZhdGlvbikpIHtcblx0XHRpZiAoZGltZW5zaW9uID09PSAxICYmIHR5cGVvZiAob2JzZXJ2YXRpb24pID09PSAnbnVtYmVyJykge1xuXHRcdFx0cmV0dXJuIFtbb2JzZXJ2YXRpb25dXTtcblx0XHR9XG5cblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihgVGhlIG9ic2VydmF0aW9uICgke29ic2VydmF0aW9ufSkgc2hvdWxkIGJlIGFuIGFycmF5IChkaW1lbnNpb246ICR7ZGltZW5zaW9ufSlgKSk7XG5cdH1cblxuXHRpZiAob2JzZXJ2YXRpb24ubGVuZ3RoICE9PSBkaW1lbnNpb24pIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihgT2JzZXJ2YXRpb24gKCR7b2JzZXJ2YXRpb24ubGVuZ3RofSkgYW5kIGRpbWVuc2lvbiAoJHtkaW1lbnNpb259KSBub3QgbWF0Y2hpbmdgKSk7XG5cdH1cblxuXHRpZiAodHlwZW9mIChvYnNlcnZhdGlvblswXSkgPT09ICdudW1iZXInIHx8IG9ic2VydmF0aW9uWzBdID09PSBudWxsKSB7XG5cdFx0cmV0dXJuIG9ic2VydmF0aW9uLm1hcChlbGVtZW50ID0+IFtlbGVtZW50XSk7XG5cdH1cblxuXHRyZXR1cm4gb2JzZXJ2YXRpb247XG59O1xuIiwiY29uc3QgdG9sZXJhbmNlID0gMC4xO1xuY29uc3QgTWF0cml4ID0gcmVxdWlyZSgnQHJheXlhbWhrL21hdHJpeCcpO1xuY29uc3QgY2hlY2tNYXRyaXggPSByZXF1aXJlKCcuL2NoZWNrLW1hdHJpeCcpO1xuXG5jb25zdCBjaGVja0RlZmluaXRlUG9zaXRpdmUgPSBmdW5jdGlvbiAoY292YXJpYW5jZSwgdG9sZXJhbmNlID0gMWUtMTApIHtcblx0Y29uc3QgY292YXJpYW5jZU1hdHJpeCA9IG5ldyBNYXRyaXgoY292YXJpYW5jZSk7XG5cdGNvbnN0IGVpZ2VudmFsdWVzID0gY292YXJpYW5jZU1hdHJpeC5laWdlbnZhbHVlcygpO1xuXHRmb3IgKGNvbnN0IGVpZ2VudmFsdWUgb2YgZWlnZW52YWx1ZXMpIHtcblx0XHRpZiAoZWlnZW52YWx1ZSA8PSAtdG9sZXJhbmNlKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhjb3ZhcmlhbmNlLCBlaWdlbnZhbHVlKTtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgRWlnZW52YWx1ZSBzaG91bGQgYmUgcG9zaXRpdmUgKGFjdHVhbDogJHtlaWdlbnZhbHVlfSlgKTtcblx0XHR9XG5cdH1cblxuXHRjb25zb2xlLmxvZygnaXMgZGVmaW5pdGUgcG9zaXRpdmUnLCBjb3ZhcmlhbmNlKTtcbn07XG5cbmNvbnN0IGNoZWNrU3ltZXRyaWMgPSBmdW5jdGlvbiAoY292YXJpYW5jZSwgdGl0bGUgPSAnY2hlY2tTeW1ldHJpYycpIHtcblx0Zm9yIChjb25zdCBbcm93SWQsIHJvd10gb2YgY292YXJpYW5jZS5lbnRyaWVzKCkpIHtcblx0XHRmb3IgKGNvbnN0IFtjb2xJZCwgaXRlbV0gb2Ygcm93LmVudHJpZXMoKSkge1xuXHRcdFx0aWYgKHJvd0lkID09PSBjb2xJZCAmJiBpdGVtIDwgMCkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFske3RpdGxlfV0gVmFyaWFuY2VbJHtjb2xJZH1dIHNob3VsZCBiZSBwb3NpdGl2ZSAoYWN0dWFsOiAke2l0ZW19KWApO1xuXHRcdFx0fSBlbHNlIGlmIChNYXRoLmFicyhpdGVtKSA+IE1hdGguc3FydChjb3ZhcmlhbmNlW3Jvd0lkXVtyb3dJZF0gKiBjb3ZhcmlhbmNlW2NvbElkXVtjb2xJZF0pKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGNvdmFyaWFuY2UpO1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFske3RpdGxlfV0gQ292YXJpYW5jZVske3Jvd0lkfV1bJHtjb2xJZH1dIHNob3VsZCB2ZXJpZnkgQ2F1Y2h5IFNjaHdhcnogSW5lcXVhbGl0eSBgXG5cdFx0XHRcdCsgYChleHBlY3RlZDogfHh8IDw9IHNxcnQoJHtjb3ZhcmlhbmNlW3Jvd0lkXVtyb3dJZF19ICogJHtjb3ZhcmlhbmNlW2NvbElkXVtjb2xJZF19KWBcblx0XHRcdFx0KyBgIGFjdHVhbDogJHtpdGVtfSlgKTtcblx0XHRcdH0gZWxzZSBpZiAoTWF0aC5hYnMoaXRlbSAtIGNvdmFyaWFuY2VbY29sSWRdW3Jvd0lkXSkgPiB0b2xlcmFuY2UpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBbJHt0aXRsZX1dIENvdmFyaWFuY2VbJHtyb3dJZH1dWyR7Y29sSWR9XSBzaG91bGQgZXF1YWwgQ292YXJpYW5jZVske2NvbElkfV1bJHtyb3dJZH1dIGBcblx0XHRcdCsgYCAoYWN0dWFsIGRpZmY6ICR7TWF0aC5hYnMoaXRlbSAtIGNvdmFyaWFuY2VbY29sSWRdW3Jvd0lkXSl9KSAgPSAke2l0ZW19IC0gJHtjb3ZhcmlhbmNlW2NvbElkXVtyb3dJZF19XFxuYFxuXHRcdFx0KyBgJHtjb3ZhcmlhbmNlLmpvaW4oJ1xcbicpfSBpcyBpbnZhbGlkYCxcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHtjb3ZhcmlhbmNlLCBlaWdlbiA9IGZhbHNlfSkge1xuXHRjaGVja01hdHJpeChjb3ZhcmlhbmNlKTtcblx0Y2hlY2tTeW1ldHJpYyhjb3ZhcmlhbmNlKTtcblx0aWYgKGVpZ2VuKSB7XG5cdFx0Y2hlY2tEZWZpbml0ZVBvc2l0aXZlKGNvdmFyaWFuY2UpO1xuXHR9XG59O1xuIiwiY29uc3QgY2hlY2tTaGFwZSA9IHJlcXVpcmUoJy4vY2hlY2stc2hhcGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobWF0cml4LCBzaGFwZSwgdGl0bGUgPSAnY2hlY2tNYXRyaXgnKSB7XG5cdGlmICghQXJyYXkuaXNBcnJheShtYXRyaXgpKSB7XG5cdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoYFske3RpdGxlfV0gc2hvdWxkIGJlIGEgMi1sZXZlbCBhcnJheSBtYXRyaXggYW5kIGlzICR7bWF0cml4fWApKTtcblx0fVxuXG5cdGZvciAoY29uc3Qgcm93IG9mIG1hdHJpeCkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShyb3cpKSB7XG5cdFx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihgWyR7dGl0bGV9XSAxLWxldmVsIGFycmF5IHNob3VsZCBiZSBhIG1hdHJpeCAke0pTT04uc3RyaW5naWZ5KG1hdHJpeCl9YCkpO1xuXHRcdH1cblx0fVxuXG5cdGlmIChtYXRyaXgucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSkuc29tZShhID0+IE51bWJlci5pc05hTihhKSkpIHtcblx0XHR0aHJvdyAobmV3IEVycm9yKFxuXHRcdFx0YFske3RpdGxlfV0gTWF0cml4IHNob3VsZCBub3QgaGF2ZSBhIE5hTlxcbkluIDogXFxuYFxuXHRcdFx0KyBtYXRyaXguam9pbignXFxuJyksXG5cdFx0KSk7XG5cdH1cblxuXHRpZiAoc2hhcGUpIHtcblx0XHRjaGVja1NoYXBlKG1hdHJpeCwgc2hhcGUsIHRpdGxlKTtcblx0fVxufTtcbiIsImNvbnN0IGNoZWNrU2hhcGUgPSBmdW5jdGlvbiAobWF0cml4LCBzaGFwZSwgdGl0bGUgPSAnY2hlY2tTaGFwZScpIHtcblx0aWYgKG1hdHJpeC5sZW5ndGggIT09IHNoYXBlWzBdKSB7XG5cdFx0dGhyb3cgKG5ldyBFcnJvcihgWyR7dGl0bGV9XSBleHBlY3RlZCBzaXplICgke3NoYXBlWzBdfSkgYW5kIGxlbmd0aCAoJHttYXRyaXgubGVuZ3RofSkgZG9lcyBub3QgbWF0Y2hgKSk7XG5cdH1cblxuXHRpZiAoc2hhcGUubGVuZ3RoID4gMSkge1xuXHRcdHJldHVybiBtYXRyaXguZm9yRWFjaChtID0+IGNoZWNrU2hhcGUobSwgc2hhcGUuc2xpY2UoMSksIHRpdGxlKSk7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tTaGFwZTtcbiIsImNvbnN0IGNoZWNrQ292YXJpYW5jZSA9IHJlcXVpcmUoJy4vY2hlY2stY292YXJpYW5jZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7Y29ycmVsYXRpb24sIHZhcmlhbmNlfSkge1xuXHRjaGVja0NvdmFyaWFuY2Uoe2NvdmFyaWFuY2U6IGNvcnJlbGF0aW9ufSk7XG5cdHJldHVybiBjb3JyZWxhdGlvbi5tYXAoKGMsIHJvd0luZGV4KSA9PiBjLm1hcCgoYSwgY29sSW5kZXgpID0+IGEgKiBNYXRoLnNxcnQodmFyaWFuY2VbY29sSW5kZXhdICogdmFyaWFuY2Vbcm93SW5kZXhdKSkpO1xufTtcbiIsImNvbnN0IGNoZWNrQ292YXJpYW5jZSA9IHJlcXVpcmUoJy4vY2hlY2stY292YXJpYW5jZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjb3ZhcmlhbmNlKSB7XG5cdGNoZWNrQ292YXJpYW5jZSh7Y292YXJpYW5jZX0pO1xuXHRjb25zdCB2YXJpYW5jZSA9IGNvdmFyaWFuY2UubWFwKChfLCBpKSA9PiBjb3ZhcmlhbmNlW2ldW2ldKTtcblxuXHRyZXR1cm4ge1xuXHRcdHZhcmlhbmNlLFxuXHRcdGNvcnJlbGF0aW9uOiBjb3ZhcmlhbmNlLm1hcCgoYywgcm93SW5kZXgpID0+IGMubWFwKChhLCBjb2xJbmRleCkgPT4gYSAvIE1hdGguc3FydCh2YXJpYW5jZVtjb2xJbmRleF0gKiB2YXJpYW5jZVtyb3dJbmRleF0pKSksXG5cdH07XG59O1xuIiwiY29uc3QgdW5pcSA9IHJlcXVpcmUoJy4vdW5pcS5qcycpO1xuXG5jb25zdCBsaW1pdCA9IDEwMDtcblxuLyoqXG4qRXF1aXZhbGVudCB0byB0aGUgT2JqZWN0LmFzc2lnbiBtZXRob2QsIHRha2VzIHNldmVyYWwgYXJndW1lbnRzIGFuZCBjcmVhdGVzIGEgbmV3IG9iamVjdCBjb3JyZXNwb25kaW5nIHRvIHRoZSBhc3NpZ25tZW50IG9mIHRoZSBhcmd1bWVudHNcbiogQHBhcmFtIHtPYmplY3R9IGFyZ3NcbiogQHBhcmFtIHtOdW1iZXJ9IHN0ZXBcbiogQHJldHVybnMge09iamVjdH1cbiovXG5jb25zdCBkZWVwQXNzaWduID0gZnVuY3Rpb24gKGFyZ3MsIHN0ZXApIHtcblx0aWYgKHN0ZXAgPiBsaW1pdCkge1xuXHRcdHRocm93IChuZXcgRXJyb3IoYEluIGRlZXBBc3NpZ24sIG51bWJlciBvZiByZWN1cnNpdmUgY2FsbCAoJHtzdGVwfSkgcmVhY2hlZCBsaW1pdCAoJHtsaW1pdH0pLCBkZWVwQXNzaWduIGlzIG5vdCB3b3JraW5nIG9uICBzZWxmLXJlZmVyZW5jaW5nIG9iamVjdHNgKSk7XG5cdH1cblxuXHRjb25zdCBmaWx0ZXJBcmd1bWVudHMgPSBhcmdzLmZpbHRlcihhcmcgPT4gKGFyZykgIT09IHVuZGVmaW5lZCAmJiBhcmcgIT09IG51bGwpO1xuXHRjb25zdCBsYXN0QXJndW1lbnQgPSBmaWx0ZXJBcmd1bWVudHNbZmlsdGVyQXJndW1lbnRzLmxlbmd0aCAtIDFdO1xuXHRpZiAoZmlsdGVyQXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdHJldHVybiBmaWx0ZXJBcmd1bWVudHNbMF07XG5cdH1cblxuXHRpZiAodHlwZW9mIChsYXN0QXJndW1lbnQpICE9PSAnb2JqZWN0JyB8fCBBcnJheS5pc0FycmF5KGxhc3RBcmd1bWVudCkpIHtcblx0XHRyZXR1cm4gbGFzdEFyZ3VtZW50O1xuXHR9XG5cblx0aWYgKGZpbHRlckFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGNvbnN0IG9iamVjdHNBcmd1bWVudHMgPSBmaWx0ZXJBcmd1bWVudHMuZmlsdGVyKGFyZyA9PiB0eXBlb2YgKGFyZykgPT09ICdvYmplY3QnKTtcblx0bGV0IGtleXMgPSBbXTtcblx0Zm9yIChjb25zdCBhcmcgb2Ygb2JqZWN0c0FyZ3VtZW50cykge1xuXHRcdGtleXMgPSBrZXlzLmNvbmNhdChPYmplY3Qua2V5cyhhcmcpKTtcblx0fVxuXG5cdGNvbnN0IHVuaXFLZXlzID0gdW5pcShrZXlzKTtcblx0Y29uc3QgcmVzdWx0ID0ge307XG5cdGZvciAoY29uc3Qga2V5IG9mIHVuaXFLZXlzKSB7XG5cdFx0Y29uc3QgdmFsdWVzID0gb2JqZWN0c0FyZ3VtZW50cy5tYXAoYXJnID0+IGFyZ1trZXldKTtcblx0XHRyZXN1bHRba2V5XSA9IGRlZXBBc3NpZ24odmFsdWVzLCBzdGVwICsgMSk7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAoKC4uLmFyZ3MpID0+IGRlZXBBc3NpZ24oYXJncywgMCkpO1xuIiwiLyoqXG4qIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4qIEBwYXJhbSB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gb3B0cy5tZWFzdXJlcyBhIGxpc3Qgb2YgbWVhc3VyZSwgc2l6ZSBpcyBMeE4gTCB0aGUgbnVtYmVyIG9mIHNhbXBsZSwgTiB0aGUgZGltZW5zaW9uXG4qIEBwYXJhbSB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gb3B0cy5hdmVyYWdlcyBhIGxpc3Qgb2YgYXZlcmFnZXMsIHNpemUgaXMgTHhOIEwgdGhlIG51bWJlciBvZiBzYW1wbGUsIE4gdGhlIGRpbWVuc2lvblxuKiBAcmV0dXJucyB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gY292YXJpYW5jZSBtYXRyaXggc2l6ZSBpcyBOeE5cbiovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHttZWFzdXJlcywgYXZlcmFnZXN9KSB7XG5cdGNvbnN0IGwgPSBtZWFzdXJlcy5sZW5ndGg7XG5cdGNvbnN0IG4gPSBtZWFzdXJlc1swXS5sZW5ndGg7XG5cblx0aWYgKGwgPT09IDApIHtcblx0XHR0aHJvdyAobmV3IEVycm9yKCdDYW5ub3QgZmluZCBjb3ZhcmlhbmNlIGZvciBlbXB0eSBzYW1wbGUnKSk7XG5cdH1cblxuXHRyZXR1cm4gKG5ldyBBcnJheShuKS5maWxsKDEpKS5tYXAoKF8sIHJvd0luZGV4KSA9PiAobmV3IEFycmF5KG4pLmZpbGwoMSkpLm1hcCgoXywgY29sSW5kZXgpID0+IHtcblx0XHRjb25zdCBzdGRzID0gbWVhc3VyZXMubWFwKChtLCBpKSA9PiAobVtyb3dJbmRleF0gLSBhdmVyYWdlc1tpXVtyb3dJbmRleF0pICogKG1bY29sSW5kZXhdIC0gYXZlcmFnZXNbaV1bY29sSW5kZXhdKSk7XG5cdFx0Y29uc3QgcmVzdWx0ID0gc3Rkcy5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKSAvIGw7XG5cdFx0aWYgKE51bWJlci5pc05hTihyZXN1bHQpKSB7XG5cdFx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcigncmVzdWx0IGlzIE5hTicpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KSk7XG59O1xuIiwiLyoqXG4qIEB0eXBlZGVmIHtOdW1iZXIgfCBBcnJheS48TnVtYmVyPiB8IEFycmF5LjxBcnJheS48TnVtYmVyPj59IENvdmFyaWFuY2VQYXJhbVxuKi9cbmNvbnN0IHtkaWFnfSA9IHJlcXVpcmUoJ3NpbXBsZS1saW5hbGcnKTtcbmNvbnN0IGNoZWNrTWF0cml4ID0gcmVxdWlyZSgnLi9jaGVjay1tYXRyaXgnKTtcbi8qKlxuKiBJZiBjb3YgaXMgYSBudW1iZXIsIHJlc3VsdCB3aWxsIGJlIElkZW50aXR5KmNvdlxuKiBJZiBjb3YgaXMgYW4gQXJyYXkuPE51bWJlcj4sIHJlc3VsdCB3aWxsIGJlIGRpYWcoY292KVxuKiBJZiBjb3YgaXMgYW4gQXJyYXkuPEFycmF5LjxOdW1iZXI+PiwgcmVzdWx0IHdpbGwgYmUgY292XG4qIEBwYXJhbSB7Q292YXJpYW5jZVBhcmFtfSBjb3ZcbiogQHBhcmFtIHtOdW1iZXJ9IGRpbWVuc2lvblxuKiBAcmV0dXJucyB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn1cbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjb3YsIHtkaW1lbnNpb24sIHRpdGxlID0gJ3BvbHltb3JwaCd9ID0ge30pIHtcblx0aWYgKHR5cGVvZiAoY292KSA9PT0gJ251bWJlcicgfHwgQXJyYXkuaXNBcnJheShjb3YpKSB7XG5cdFx0aWYgKHR5cGVvZiAoY292KSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIChkaW1lbnNpb24pID09PSAnbnVtYmVyJykge1xuXHRcdFx0cmV0dXJuIGRpYWcobmV3IEFycmF5KGRpbWVuc2lvbikuZmlsbChjb3YpKTtcblx0XHR9XG5cblx0XHRpZiAoKEFycmF5LmlzQXJyYXkoY292KSkgJiYgKEFycmF5LmlzQXJyYXkoY292WzBdKSkpIHtcblx0XHRcdGxldCBzaGFwZTtcblx0XHRcdGlmICh0eXBlb2YgKGRpbWVuc2lvbikgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdHNoYXBlID0gW2RpbWVuc2lvbiwgZGltZW5zaW9uXTtcblx0XHRcdH1cblxuXHRcdFx0Y2hlY2tNYXRyaXgoY292LCBzaGFwZSwgdGl0bGUpO1xuXHRcdFx0cmV0dXJuIGNvdjtcblx0XHR9XG5cblx0XHRpZiAoKEFycmF5LmlzQXJyYXkoY292KSkgJiYgKHR5cGVvZiAoY292WzBdKSA9PT0gJ251bWJlcicpKSB7XG5cdFx0XHRyZXR1cm4gZGlhZyhjb3YpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjb3Y7XG59O1xuIiwiLy8gRnJvbSBvYnNlcnZhdGlvblRyYWNrcyB0byBtb3ZpbmdBdmVyYWdlR3JvdW5kVHJ1dGhzU3RhdGVzIHdpdGggc3BlZWRcblxuY29uc3Qge21hdE11bCwgaW52ZXJ0fSA9IHJlcXVpcmUoJ3NpbXBsZS1saW5hbGcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe29ic2VydmF0aW9uLCBvYnNJbmRleGVzLCBzZWxlY3RlZFN0YXRlUHJvamVjdGlvbiwgaW52ZXJ0U2VsZWN0ZWRTdGF0ZVByb2plY3Rpb259KSB7XG5cdGlmICghb2JzZXJ2YXRpb24pIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGNvbnN0IHZhbHVlID0gb2JzZXJ2YXRpb24ub2JzZXJ2YXRpb24gfHwgb2JzZXJ2YXRpb247XG5cblx0Y29uc3QgdmVjID0gb2JzSW5kZXhlcy5tYXAoaSA9PiB7XG5cdFx0aWYgKCh2YWx1ZVtpXSkgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoYG9ic0luZGV4ZXMgKCR7b2JzSW5kZXhlc30pIGlzIG5vdCBtYXRjaGluZyB3aXRoIG9ic2VydmF0aW9uICgke29ic2VydmF0aW9ufSlgKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFt2YWx1ZVtpXV07XG5cdH0pO1xuXG5cdGNvbnN0IGludmVyc2UgPSBpbnZlcnRTZWxlY3RlZFN0YXRlUHJvamVjdGlvbiB8fCBpbnZlcnQoc2VsZWN0ZWRTdGF0ZVByb2plY3Rpb24pO1xuXG5cdGlmIChpbnZlcnNlID09PSBudWxsKSB7XG5cdFx0dGhyb3cgKG5ldyBFcnJvcignc2VsZWN0ZWRTdGF0ZVByb2plY3Rpb24gaXMgbm90IGludmVydGlibGUsIHBsZWFzZSBwcm92aWRlIGludmVydFNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uJykpO1xuXHR9XG5cblx0Y29uc3Qgb3V0ID0gbWF0TXVsKGludmVyc2UsIHZlYyk7XG5cblx0cmV0dXJuIG91dFxuXHRcdC5tYXAodiA9PiB2WzBdKVxuXHRcdC5tYXAodiA9PiB7XG5cdFx0XHRpZiAoTnVtYmVyLmlzTmFOKHYpKSB7XG5cdFx0XHRcdHRocm93IChuZXcgVHlwZUVycm9yKCdOYU4gaW4gcHJvamVjdGlvbicpKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHY7XG5cdFx0fSk7XG59O1xuIiwiLy8gQ29uc3Qge2RpYWd9ID0gcmVxdWlyZSgnc2ltcGxlLWxpbmFsZycpOztcblxuLyoqXG4qIEBjYWxsYmFjayBNYXRyaXhDYWxsYmFja1xuKiBAcmV0dXJucyA8QXJyYXkuPEFycmF5LjxOdW1iZXI+PlxuKi9cblxuLyoqXG4qIFRyYW5mb3JtczpcbioqIGEgMmQgYXJyYXkgaW50byBhIGZ1bmN0aW9uICgoKSA9PiBhcnJheSlcbioqIGEgMWQgYXJyYXkgaW50byBhIGZ1bmN0aW9uICgoKSA9PiBkaWFnKGFycmF5KSlcbipAcGFyYW0ge0FycmF5LjxOdW1iZXI+IHwgQXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gYXJyYXlcbipAcmV0dXJucyB7TWF0cml4Q2FsbGJhY2t9XG4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcnJheSwge2xhYmVsID0gbnVsbH0gPSB7fSkge1xuXHRpZiAodHlwZW9mIChhcnJheSkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gYXJyYXk7XG5cdH1cblxuXHRpZiAoQXJyYXkuaXNBcnJheShhcnJheSkpIHtcblx0XHRyZXR1cm4gYXJyYXk7XG5cdH1cblxuXHR0aHJvdyAobmV3IEVycm9yKGAke2xhYmVsID09PSBudWxsID8gJycgOiBsYWJlbCArICcgOiAnfU9ubHkgYXJyYXlzIGFuZCBmdW5jdGlvbnMgYXJlIGF1dGhvcml6ZWQgKGdvdDogXCIke2FycmF5fVwiKWApKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcnJheSkge1xuXHRyZXR1cm4gYXJyYXkuZmlsdGVyKCh2YWx1ZSwgaW5kZXgpID0+XG5cdFx0YXJyYXkuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4LFxuXHQpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgYXJndW1lbnQgb2YgYSBDb21wbGV4IE51bWJlciB3aGljaCBpcyByZXN0cmljdGVkIHRvIHRoZSBpbnRlcnZhbCBbIDAsIDLPgCApLjxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgYXJndW1lbnQgb2YgdGhlIENvbXBsZXggTnVtYmVyIGlzIHRoZSBhbmdsZSBiZXR3ZWVuIHBvc2l0aXZlIHJlYWwtYXhpc1xyXG4gKiBhbmQgdGhlIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIENvbXBsZXggTnVtYmVyIG9uIENvbXBsZXggcGxhbmUuPGJyPjxicj5cclxuICogXHJcbiAqIElmIHRoZSBnaXZlbiBDb21wbGV4IE51bWJlciBpcyBjb25zaWRlcmVkIGFzIDAsIHJldHVybnMgdW5kZWZpbmVkLlxyXG4gKiBAbWVtYmVyb2YgQ29tcGxleFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge251bWJlcn0gVGhlIGFyZ3VtZW50IG9mIHRoZSBDb21wbGV4IE51bWJlclxyXG4gKi9cbmZ1bmN0aW9uIGdldEFyZ3VtZW50KCkge1xuICB2YXIgeCA9IHRoaXMucmU7XG4gIHZhciB5ID0gdGhpcy5pbTtcbiAgdmFyIGVwc2lsb24gPSAxIC8gKE1hdGgucG93KDEwLCAxNSkgKiAyKTtcblxuICBpZiAoTWF0aC5hYnMoeCkgPCBlcHNpbG9uICYmIE1hdGguYWJzKHkpIDwgZXBzaWxvbikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAoeCA9PT0gMCkge1xuICAgIGlmICh5ID4gMCkge1xuICAgICAgcmV0dXJuIE1hdGguUEkgKiAwLjU7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGguUEkgKiAxLjU7XG4gIH1cblxuICBpZiAoeSA9PT0gMCkge1xuICAgIGlmICh4ID4gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGguUEk7XG4gIH1cblxuICBpZiAoeCA+IDAgJiYgeSA+IDApIHtcbiAgICByZXR1cm4gTWF0aC5hdGFuKHkgLyB4KTtcbiAgfVxuXG4gIGlmICh4IDwgMCAmJiB5ID4gMCkge1xuICAgIHJldHVybiBNYXRoLlBJIC0gTWF0aC5hdGFuKHkgLyAoeCAqIC0xKSk7XG4gIH1cblxuICBpZiAoeCA8IDAgJiYgeSA8IDApIHtcbiAgICByZXR1cm4gTWF0aC5QSSArIE1hdGguYXRhbih5ICogLTEgLyAoeCAqIC0xKSk7XG4gIH1cblxuICByZXR1cm4gTWF0aC5QSSAqIDIgLSBNYXRoLmF0YW4oeSAqIC0xIC8geCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QXJndW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBHZXRzIHRoZSBpbWFnaW5hcnkgcGFydCBvZiBhIENvbXBsZXggTnVtYmVyLlxyXG4gKiBAbWVtYmVyb2YgQ29tcGxleFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge251bWJlcn0gVGhlIGltYWdpbmFyeSBwYXJ0IG9mIHRoZSBDb21wbGV4IE51bWJlclxyXG4gKi9cbmZ1bmN0aW9uIGdldEltYWdpbmFyeSgpIHtcbiAgcmV0dXJuIHRoaXMuaW07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0SW1hZ2luYXJ5OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgbW9kdWx1cyBvZiBhIENvbXBsZXggTnVtYmVyLjxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgbW9kdWx1cyBvZiB0aGUgY29tcGxleCBudW1iZXIgaXMgdGhlIGxlbmd0aCBvZiB0aGUgdmVjdG9yXHJcbiAqIHJlcHJlc2VudGluZyB0aGUgY29tcGxleCBudW1iZXIgb24gY29tcGxleCBwbGFuZS5cclxuICogQG1lbWJlcm9mIENvbXBsZXhcclxuICogQGluc3RhbmNlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBtb2R1bHVzIG9mIHRoZSBDb21wbGV4IE51bWJlclxyXG4gKi9cbmZ1bmN0aW9uIGdldE1vZHVsdXMoKSB7XG4gIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codGhpcy5yZSwgMikgKyBNYXRoLnBvdyh0aGlzLmltLCAyKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TW9kdWx1czsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIEdldHMgdGhlIHJlYWwgcGFydCBvZiBhIENvbXBsZXggTnVtYmVyLlxyXG4gKiBAbWVtYmVyb2YgQ29tcGxleFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge251bWJlcn0gVGhlIHJlYWwgcGFydCBvZiB0aGUgQ29tcGxleCBOdW1iZXJcclxuICovXG5mdW5jdGlvbiBnZXRSZWFsKCkge1xuICByZXR1cm4gdGhpcy5yZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSZWFsOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogR2V0cyB0aGUgc3RyaW5naWZpZWQgYW5kIGZvcm1hdHRlZCBDb21wbGV4IE51bWJlci5cclxuICogQG1lbWJlcm9mIENvbXBsZXhcclxuICogQGluc3RhbmNlXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBzdHJpbmdpZmllZCBhbmQgZm9ybWF0dGVkIENvbXBsZXggTnVtYmVyXHJcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHZhciByZSA9IHRoaXMucmUsXG4gICAgICBpbSA9IHRoaXMuaW07XG5cbiAgaWYgKE51bWJlci5pc05hTihyZSkgfHwgTnVtYmVyLmlzTmFOKGltKSkge1xuICAgIHJldHVybiAnTmFOJztcbiAgfVxuXG4gIGlmIChyZSA9PT0gMCAmJiBpbSA9PT0gMCkge1xuICAgIHJldHVybiAnMCc7XG4gIH1cblxuICBpZiAocmUgPT09IDApIHtcbiAgICBpZiAoaW0gPT09IDEpIHtcbiAgICAgIHJldHVybiAnaSc7XG4gICAgfVxuXG4gICAgaWYgKGltID09PSAtMSkge1xuICAgICAgcmV0dXJuICctaSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIFwiXCIuY29uY2F0KGltLCBcImlcIik7XG4gIH1cblxuICBpZiAoaW0gPT09IDApIHtcbiAgICByZXR1cm4gXCJcIi5jb25jYXQocmUpO1xuICB9XG5cbiAgaWYgKGltID4gMCkge1xuICAgIGlmIChpbSA9PT0gMSkge1xuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KHJlLCBcIiArIGlcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFwiXCIuY29uY2F0KHJlLCBcIiArIFwiKS5jb25jYXQoaW0sIFwiaVwiKTtcbiAgfVxuXG4gIGlmIChpbSA9PT0gLTEpIHtcbiAgICByZXR1cm4gXCJcIi5jb25jYXQocmUsIFwiIC0gaVwiKTtcbiAgfVxuXG4gIHJldHVybiBcIlwiLmNvbmNhdChyZSwgXCIgLSBcIikuY29uY2F0KE1hdGguYWJzKGltKSwgXCJpXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvU3RyaW5nOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgaW52ZXJzZSBjb3NpbmUgb2YgYSBDb21wbGV4IE51bWJlci5cclxuICogQG1lbWJlcm9mIENvbXBsZXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge0NvbXBsZXh9IG51bSAtIEFueSBDb21wbGV4IE51bWJlclxyXG4gKiBAcmV0dXJucyB7Q29tcGxleH0gVGhlIHJlc3VsdCBvZiBpbnZlcnNlIGNvc2luZSBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIGFjb3MobnVtKSB7XG4gIHJldHVybiB0aGlzLnN1YnRyYWN0KG5ldyB0aGlzKE1hdGguUEkgLyAyKSwgdGhpcy5hc2luKG51bSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFjb3M7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBpbnZlcnNlIGNvdGFuZ2VudCBvZiBhIENvbXBsZXggTnVtYmVyLlxyXG4gKiBUaGUgZG9tYWluIG9mIHRoaXMgZnVuY3Rpb24gaXMgQyAvIHsgaSAsIC1pICwgMCB9Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgb3V0IG9mIGl0cyBkb21haW4sIGl0IHJldHVybnMgQ29tcGxleC5OYU4uXHJcbiAqIEBtZW1iZXJvZiBDb21wbGV4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtDb21wbGV4fSBudW0gLSBBbnkgQ29tcGxleCBOdW1iZXIgZXhjZXB0IGksIC1pIGFuZCAwXHJcbiAqIEByZXR1cm5zIHtDb21wbGV4fSBUaGUgcmVzdWx0IG9mIGludmVyc2UgY290YW5nZW50IGZ1bmN0aW9uXHJcbiAqL1xuZnVuY3Rpb24gYWNvdChudW0pIHtcbiAgcmV0dXJuIHRoaXMuYXRhbih0aGlzLmludmVyc2UobnVtKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWNvdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGludmVyc2UgY29zZWNhbnQgb2YgYSBDb21wbGV4IE51bWJlci5cclxuICogVGhlIGRvbWFpbiBvZiB0aGlzIGZ1bmN0aW9uIGlzIEMgLyB7IDAgfS48YnI+PGJyPlxyXG4gKiBcclxuICogSWYgdGhlIGFyZ3VtZW50IGlzIG91dCBvZiBpdHMgZG9tYWluLCBpdCByZXR1cm5zIENvbXBsZXguTmFOLlxyXG4gKiBAbWVtYmVyb2YgQ29tcGxleFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7Q29tcGxleH0gbnVtIC0gQW55IENvbXBsZXggTnVtYmVyIGV4Y2VwdCAwXHJcbiAqIEByZXR1cm5zIHtDb21wbGV4fSBUaGUgcmVzdWx0IG9mIGludmVyc2UgY29zZWNhbnQgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBhY3NjKG51bSkge1xuICByZXR1cm4gdGhpcy5hc2luKHRoaXMuaW52ZXJzZShudW0pKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhY3NjOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgc3VtIG9mIHR3byBDb21wbGV4IE51bWJlci5cclxuICogQG1lbWJlcm9mIENvbXBsZXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge0NvbXBsZXh9IG51bTEgLSBUaGUgQ29tcGxleCBOdW1iZXIgb24gdGhlIGxlZnQgb2YgJysnIG9wZXJhdG9yLlxyXG4gKiBAcGFyYW0ge0NvbXBsZXh9IG51bTIgLSBUaGUgQ29tcGxleCBOdW1iZXIgb24gdGhlIHJpZ2h0IG9mICcrJyBvcGVyYXRvci5cclxuICogQHJldHVybnMge0NvbXBsZXh9IFRoZSBzdW0gb2YgdHdvIENvbXBsZXggTnVtYmVyc1xyXG4gKi9cbmZ1bmN0aW9uIGFkZChudW0xLCBudW0yKSB7XG4gIGlmICghKG51bTEgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKG51bTIgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHJldHVybiBuZXcgdGhpcyhudW0xLnJlICsgbnVtMi5yZSwgbnVtMS5pbSArIG51bTIuaW0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGludmVyc2Ugc2VjYW50IG9mIGEgQ29tcGxleCBOdW1iZXIuXHJcbiAqIFRoZSBkb21haW4gb2YgdGhpcyBmdW5jdGlvbiBpcyBDIC8geyAwIH0uPGJyPjxicj5cclxuICogXHJcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBvdXQgb2YgaXRzIGRvbWFpbiwgaXQgcmV0dXJucyBDb21wbGV4Lk5hTi5cclxuICogQG1lbWJlcm9mIENvbXBsZXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge0NvbXBsZXh9IG51bSAtIEFueSBDb21wbGV4IE51bWJlciBleGNlcHQgMFxyXG4gKiBAcmV0dXJucyB7Q29tcGxleH0gVGhlIHJlc3VsdCBvZiBpbnZlcnNlIHNlY2FudCBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIGFzZWMobnVtKSB7XG4gIHJldHVybiB0aGlzLmFjb3ModGhpcy5pbnZlcnNlKG51bSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzZWM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBpbnZlcnNlIHNpbmUgb2YgYSBDb21wbGV4IE51bWJlci5cclxuICogQG1lbWJlcm9mIENvbXBsZXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge0NvbXBsZXh9IG51bSAtIEFueSBDb21wbGV4IE51bWJlclxyXG4gKiBAcmV0dXJucyB7Q29tcGxleH0gVGhlIHJlc3VsdCBvZiBpbnZlcnNlIHNpbmUgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBhc2luKG51bSkge1xuICByZXR1cm4gdGhpcy5tdWx0aXBseShuZXcgdGhpcygwLCAtMSksIHRoaXMubG9nKHRoaXMuYWRkKHRoaXMubXVsdGlwbHkobmV3IHRoaXMoMCwgMSksIG51bSksIHRoaXMucG93KHRoaXMuc3VidHJhY3QodGhpcy5PTkUsIHRoaXMucG93KG51bSwgMikpLCAwLjUpKSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzaW47IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBpbnZlcnNlIHRhbmdlbnQgb2YgYSBDb21wbGV4IE51bWJlci5cclxuICogVGhlIGRvbWFpbiBvZiB0aGlzIGZ1bmN0aW9uIGlzIEMgLyB7IGkgLCAtaSB9Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgb3V0IG9mIGl0cyBkb21haW4sIGl0IHJldHVybnMgQ29tcGxleC5OYU4uXHJcbiAqIEBtZW1iZXJvZiBDb21wbGV4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtDb21wbGV4fSBudW0gLSBBbnkgQ29tcGxleCBOdW1iZXIgZXhjZXB0IGkgYW5kIC1pXHJcbiAqIEByZXR1cm5zIHtDb21wbGV4fSBUaGUgcmVzdWx0IG9mIGludmVyc2UgdGFuZ2VudCBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIGF0YW4obnVtKSB7XG4gIHJldHVybiB0aGlzLm11bHRpcGx5KG5ldyB0aGlzKDAsIDEgLyAyKSwgdGhpcy5zdWJ0cmFjdCh0aGlzLmxvZyh0aGlzLnN1YnRyYWN0KHRoaXMuT05FLCB0aGlzLm11bHRpcGx5KG5ldyB0aGlzKDAsIDEpLCBudW0pKSksIHRoaXMubG9nKHRoaXMuYWRkKHRoaXMuT05FLCB0aGlzLm11bHRpcGx5KG5ldyB0aGlzKDAsIDEpLCBudW0pKSkpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhdGFuOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgY29tcGxleCBjb25qdWdhdGUgb2YgdGhlIENvbXBsZXggTnVtYmVyLlxyXG4gKiBAbWVtYmVyb2YgQ29tcGxleFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7Q29tcGxleH0gbnVtIC0gQ29tcGxleCBudW1iZXJcclxuICogQHJldHVybnMge0NvbXBsZXh9IFRoZSBjb21wbGV4IGNvbmp1Z2F0ZSBvZiB0aGUgQ29tcGxleCBOdW1iZXJcclxuICovXG5mdW5jdGlvbiBjb25qdWdhdGUobnVtKSB7XG4gIGlmICghKG51bSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgcmV0dXJuIHRoaXMuTmFOO1xuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKG51bS5nZXRSZWFsKCksIG51bS5nZXRJbWFnaW5hcnkoKSAqIC0xKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb25qdWdhdGU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBjb3NpbmUgb2YgYSBDb21wbGV4IE51bWJlci5cclxuICogQG1lbWJlcm9mIENvbXBsZXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge0NvbXBsZXh9IG51bSAtIEFueSBDb21wbGV4IE51bWJlclxyXG4gKiBAcmV0dXJucyB7Q29tcGxleH0gVGhlIHJlc3VsdCBvZiBjb3NpbmUgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBjb3MobnVtKSB7XG4gIGlmICghKG51bSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgcmV0dXJuIHRoaXMuTmFOO1xuICB9XG5cbiAgdmFyIGEgPSBudW0uZ2V0UmVhbCgpO1xuICB2YXIgYiA9IG51bS5nZXRJbWFnaW5hcnkoKTtcbiAgcmV0dXJuIG5ldyB0aGlzKE1hdGguY29zKGEpICogTWF0aC5jb3NoKGIpLCBNYXRoLnNpbihhKSAqIE1hdGguc2luaChiKSAqIC0xKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb3M7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBjb3RhbmdlbnQgb2YgYSBDb21wbGV4IE51bWJlci5cclxuICogVGhlIGRvbWFpbiBvZiB0aGlzIGZ1bmN0aW9uIGlzIEMgLyB7IGvPgC8yIDogayBpcyBhbnkgaW50ZWdlciB9Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgb3V0IG9mIGl0cyBkb21haW4sIGl0IHJldHVybnMgQ29tcGxleC5OYU4uXHJcbiAqIEBtZW1iZXJvZiBDb21wbGV4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtDb21wbGV4fSBudW0gLSBBbnkgQ29tcGxleCBOdW1iZXIgd2hpY2ggaXMgbm90IHRoZSBtdWx0aXBsZSBvZiDPgC8yXHJcbiAqIEByZXR1cm5zIHtDb21wbGV4fSBUaGUgcmVzdWx0IG9mIGNvdGFuZ2VudCBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIGNvdChudW0pIHtcbiAgcmV0dXJuIHRoaXMuZGl2aWRlKHRoaXMuT05FLCB0aGlzLnRhbihudW0pKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb3Q7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBjb3NlY2FudCBvZiBhIENvbXBsZXggTnVtYmVyLlxyXG4gKiBUaGUgZG9tYWluIG9mIHRoaXMgZnVuY3Rpb24gaXMgQyAvIHsga8+AIDogayBpcyBhbnkgaW50ZWdlciB9Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgb3V0IG9mIGl0cyBkb21haW4sIGl0IHJldHVybnMgQ29tcGxleC5OYU4uXHJcbiAqIEBtZW1iZXJvZiBDb21wbGV4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtDb21wbGV4fSBudW0gLSBBbnkgQ29tcGxleCBOdW1iZXIgd2hpY2ggaXMgbm90IHRoZSBtdWx0aXBsZSBvZiDPgFxyXG4gKiBAcmV0dXJucyB7Q29tcGxleH0gVGhlIHJlc3VsdCBvZiBjb3NlY2FudCBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIGNzYyhudW0pIHtcbiAgcmV0dXJuIHRoaXMuZGl2aWRlKHRoaXMuT05FLCB0aGlzLnNpbihudW0pKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjc2M7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBxdW90aWVudCBvZiB0d28gQ29tcGxleCBOdW1iZXIuPGJyPjxicj5cclxuICogXHJcbiAqIE5vdGUgdGhhdCBpZiB0aGUgZGVub21pbmF0b3IgaXMgY29uc2lkZXJlZCBhcyAwLFxyXG4gKiByZXR1cm5zIENvbXBsZXguTmFOIGluc3RlYWQgb2YgSW5maW5pdHkuXHJcbiAqIEBtZW1iZXJvZiBDb21wbGV4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtDb21wbGV4fSBudW0xIC0gVGhlIENvbXBsZXggTnVtYmVyIG9uIHRoZSBsZWZ0IG9mICcvJyBvcGVyYXRvci5cclxuICogQHBhcmFtIHtDb21wbGV4fSBudW0yIC0gVGhlIENvbXBsZXggTnVtYmVyIG9uIHRoZSByaWdodCBvZiAnLycgb3BlcmF0b3IuXHJcbiAqIEByZXR1cm5zIHtDb21wbGV4fSBUaGUgcXVvdGllbnQgb2YgdHdvIENvbXBsZXggTnVtYmVyc1xyXG4gKi9cbmZ1bmN0aW9uIGRpdmlkZShudW0xLCBudW0yKSB7XG4gIGlmICghKG51bTEgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKG51bTIgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHZhciBhID0gbnVtMS5yZTtcbiAgdmFyIGIgPSBudW0xLmltO1xuICB2YXIgYyA9IG51bTIucmU7XG4gIHZhciBkID0gbnVtMi5pbTtcblxuICBpZiAoTWF0aC5hYnMoYykgPCB0aGlzLkVQU0lMT04gJiYgTWF0aC5hYnMoZCkgPCB0aGlzLkVQU0lMT04pIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICB2YXIgZGVub21pbmF0b3IgPSBNYXRoLnBvdyhjLCAyKSArIE1hdGgucG93KGQsIDIpO1xuICByZXR1cm4gbmV3IHRoaXMoKGEgKiBjICsgYiAqIGQpIC8gZGVub21pbmF0b3IsIChiICogYyAtIGEgKiBkKSAvIGRlbm9taW5hdG9yKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaXZpZGU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBleHBvbmVudGlhbCBmdW5jdGlvbiB3aXRoIGJhc2UgRS5cclxuICogQG1lbWJlcm9mIENvbXBsZXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge0NvbXBsZXh9IG51bSAtIEV4cG9uZW50XHJcbiAqIEByZXR1cm5zIHtDb21wbGV4fSBUaGUgdmFsdWUgb2YgRSB0byB0aGUgcG93ZXIgb2YgbnVtXHJcbiAqL1xuZnVuY3Rpb24gZXhwKG51bSkge1xuICBpZiAoIShudW0gaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHZhciByZSA9IG51bS5nZXRSZWFsKCk7XG4gIHZhciB0aGV0YSA9IG51bS5nZXRJbWFnaW5hcnkoKTtcbiAgdmFyIHIgPSBNYXRoLmV4cChyZSk7XG4gIHJldHVybiBuZXcgdGhpcyhyICogTWF0aC5jb3ModGhldGEpLCByICogTWF0aC5zaW4odGhldGEpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHA7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBpbnZlcnNlIG9mIHRoZSBDb21wbGV4IE51bWJlci5cclxuICogQG1lbWJlcm9mIENvbXBsZXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge0NvbXBsZXh9IG51bSAtIENvbXBsZXggTnVtYmVyXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IEludmVyc2Ugb2YgdGhlIENvbXBsZXggTnVtYmVyXHJcbiAqL1xuZnVuY3Rpb24gaW52ZXJzZShudW0pIHtcbiAgaWYgKCEobnVtIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICByZXR1cm4gdGhpcy5kaXZpZGUodGhpcy5PTkUsIG51bSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW52ZXJzZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIERldGVybWluZXMgd2hldGhlciB0d28gQ29tcGxleCBOdW1iZXJzIGFyZSBjb25zaWRlcmVkIGFzIGlkZW50aWNhbC48YnI+PGJyPlxyXG4gKiBcclxuICogVHdvIENvbXBsZXggTnVtYmVycyBhcmUgY29uc2lkZXJlZCBhcyBpZGVudGljYWwgaWYgZWl0aGVyXHJcbiAqIGJvdGggYXJlIE5hTiBvciBib3RoIHJlYWwgYW5kIGltYWdpbmFyeSBwYXJ0cyBhcmUgZXh0cmVtZWx5IGNsb3NlZC48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIHRlc3QgY3JpdGVyaW9uIGlzIE1hdGguYWJzKHggLSB5KSA8IDEgLyAoMTAgKiogZGlnaXQgKiAyKS5cclxuICogRm9yIGRlZmF1bHQgdmFsdWUgMTUsIGl0IHNob3VsZCBiZSA1ZS0xNi5cclxuICogVGhhdCBtZWFucyBpZiB0aGUgZGlmZmVyZW5jZSBvZiB0d28gbnVtYmVycyBpcyBsZXNzIHRoYW4gNWUtMTYsXHJcbiAqIHRoZXkgYXJlIGNvbnNpZGVyZWQgYXMgc2FtZSB2YWx1ZS5cclxuICogQG1lbWJlcm9mIENvbXBsZXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge0NvbXBsZXh9IG51bTEgLSBDb21wbGV4IE51bWJlclxyXG4gKiBAcGFyYW0ge0NvbXBsZXh9IG51bTIgLSBDb21wbGV4IE51bWJlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gW2RpZ2l0PTE1XSAtIE51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHNcclxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0d28gQ29tcGxleCBOdW1iZXJzIGFyZSBjb25zaWRlcmVkIGFzIGlkZW50aWNhbFxyXG4gKi9cbmZ1bmN0aW9uIGlzRXF1YWwobnVtMSwgbnVtMikge1xuICB2YXIgZGlnaXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IDE1O1xuXG4gIGlmICghKG51bTEgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKG51bTIgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihkaWdpdCkgfHwgZGlnaXQgPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50OiBFeHBlY3RlZCBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyIGRpZ2l0Jyk7XG4gIH1cblxuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuICB2YXIgYSA9IG51bTEuZ2V0UmVhbCgpO1xuICB2YXIgYiA9IG51bTEuZ2V0SW1hZ2luYXJ5KCk7XG4gIHZhciBjID0gbnVtMi5nZXRSZWFsKCk7XG4gIHZhciBkID0gbnVtMi5nZXRJbWFnaW5hcnkoKTtcblxuICBpZiAoTnVtYmVyLmlzTmFOKGEpICYmIE51bWJlci5pc05hTihiKSAmJiBOdW1iZXIuaXNOYU4oYykgJiYgTnVtYmVyLmlzTmFOKGQpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gTWF0aC5hYnMoYSAtIGMpIDwgRVBTSUxPTiAmJiBNYXRoLmFicyhiIC0gZCkgPCBFUFNJTE9OO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRXF1YWw7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIENvbXBsZXggTnVtYmVyIGlzIE5hTiBvciBub3QuXHJcbiAqIEBtZW1iZXJvZiBDb21wbGV4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtDb21wbGV4fSBudW0gLSBBbnkgQ29tcGxleCBudW1iZXJcclxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBvbmUgb2YgcmVhbCBhbmQgaW1hZ2luYXJ5IHBhcnQgYXJlIE5hTlxyXG4gKi9cbmZ1bmN0aW9uIGlzTmFOKG51bSkge1xuICBpZiAoIShudW0gaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciByZSA9IG51bS5nZXRSZWFsKCk7XG4gIHZhciBpbSA9IG51bS5nZXRJbWFnaW5hcnkoKTtcblxuICBpZiAoTnVtYmVyLmlzTmFOKHJlKSB8fCBOdW1iZXIuaXNOYU4oaW0pKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNOYU47IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBuYXR1cmFsIGxvZyBvZiB0aGUgQ29tcGxleCBOdW1iZXIuPGJyPjxicj5cclxuICogXHJcbiAqIE5vdGUgdGhhdCBjb21wbGV4IGxvZyBpcyBhIG11bHRpdmFsdWVkIGZ1bmN0aW9uLFxyXG4gKiBhbmQgdGhpcyBmdW5jdGlvbiBvbmx5IHByb3ZpZGVzIHRoZSBwcmluY2lwYWwgdmFsdWUgYnlcclxuICogcmVzdHJpY3RpbmcgdGhlIGltYWdpbmFyeSBwYXJ0IHRvIHRoZSBpbnRlcnZhbCBbMCwgMs+AKS5cclxuICogQG1lbWJlcm9mIENvbXBsZXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge0NvbXBsZXh9IG51bSAtIENvbXBsZXggTnVtYmVyXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IE5hdHVyYWwgbG9nIG9mIHRoZSBDb21wbGV4IE51bWJlclxyXG4gKi9cbmZ1bmN0aW9uIGxvZyhudW0pIHtcbiAgaWYgKCEobnVtIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICB2YXIgciA9IG51bS5nZXRNb2R1bHVzKCk7XG4gIHZhciB0aGV0YSA9IG51bS5nZXRBcmd1bWVudCgpO1xuXG4gIGlmIChyIDwgdGhpcy5FUFNJTE9OIHx8IHRoZXRhID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMoTWF0aC5sb2cociksIHRoZXRhKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsb2c7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBwcm9kdWN0IG9mIHR3byBDb21wbGV4IE51bWJlci5cclxuICogQG1lbWJlcm9mIENvbXBsZXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge0NvbXBsZXh9IG51bTEgLSBUaGUgQ29tcGxleCBOdW1iZXIgb24gdGhlIGxlZnQgb2YgJyonIG9wZXJhdG9yLlxyXG4gKiBAcGFyYW0ge0NvbXBsZXh9IG51bTIgLSBUaGUgQ29tcGxleCBOdW1iZXIgb24gdGhlIHJpZ2h0IG9mICcqJyBvcGVyYXRvci5cclxuICogQHJldHVybnMge0NvbXBsZXh9IFRoZSBwcm9kdWN0IG9mIHR3byBDb21wbGV4IE51bWJlcnNcclxuICovXG5mdW5jdGlvbiBtdWx0aXBseShudW0xLCBudW0yKSB7XG4gIGlmICghKG51bTEgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKG51bTIgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHZhciBhID0gbnVtMS5yZTtcbiAgdmFyIGIgPSBudW0xLmltO1xuICB2YXIgYyA9IG51bTIucmU7XG4gIHZhciBkID0gbnVtMi5pbTtcbiAgcmV0dXJuIG5ldyB0aGlzKGEgKiBjIC0gYiAqIGQsIGEgKiBkICsgYiAqIGMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG11bHRpcGx5OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgcG93ZXIgb2YgdGhlIENvbXBsZXggTnVtYmVyLlxyXG4gKiBUaGUgZXhwb25lbnQgY2FuIGJlIGFueSByZWFsIG51bWJlciBvciBDb21wbGV4IE51bWJlcjxicj48YnI+XHJcbiAqIFxyXG4gKiBZb3UgY2FuIGZpbmQgdGhlIGstdGggcm9vdCBvZiBjb21wbGV4IG51bWJlciBieSBzZXR0aW5nIHRoZSBleHBvbmVudCB0byAxIC8gay5cclxuICogQnV0IHlvdSBzaG91bGQga25vdyB0aGF0IGl0IG9ubHkgcmV0dXJucyBvbmUgb3V0IG9mIGsgcG9zc2libGUgc29sdXRpb25zLlxyXG4gKiBAbWVtYmVyb2YgQ29tcGxleFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7Q29tcGxleH0gbnVtIC0gQmFzZVxyXG4gKiBAcGFyYW0ge0NvbXBsZXh8bnVtYmVyfSBuIC0gRXhwb25lbnRcclxuICogQHJldHVybnMge0NvbXBsZXh9IFRoZSByZXN1bHQgb2YgdGhlIGV4cG9uZW50aWF0aW9uXHJcbiAqL1xuZnVuY3Rpb24gcG93KG51bSwgbikge1xuICBpZiAoIShudW0gaW5zdGFuY2VvZiB0aGlzKSB8fCB0eXBlb2YgbiAhPT0gJ251bWJlcicgJiYgIShuIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICBpZiAodHlwZW9mIG4gPT09ICdudW1iZXInKSB7XG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUobikgfHwgTnVtYmVyLmlzTmFOKG4pKSB7XG4gICAgICByZXR1cm4gdGhpcy5OYU47XG4gICAgfVxuXG4gICAgaWYgKG4gPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLk9ORTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0VxdWFsKG51bSwgdGhpcy5aRVJPKSkge1xuICAgICAgcmV0dXJuIHRoaXMuWkVSTztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5leHAodGhpcy5tdWx0aXBseShuZXcgdGhpcyhuLCAwKSwgdGhpcy5sb2cobnVtKSkpO1xuICB9XG5cbiAgaWYgKG4gaW5zdGFuY2VvZiB0aGlzKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwKHRoaXMubXVsdGlwbHkobiwgdGhpcy5sb2cobnVtKSkpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuTmFOO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBvdzsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIHNlY2FudCBvZiBhIENvbXBsZXggTnVtYmVyLlxyXG4gKiBUaGUgZG9tYWluIG9mIHRoaXMgZnVuY3Rpb24gaXMgQyAvIHsgKGsgKyAwLjUpz4AgOiBrIGlzIGFueSBpbnRlZ2VyIH0uPGJyPjxicj5cclxuICogXHJcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBvdXQgb2YgaXRzIGRvbWFpbiwgaXQgcmV0dXJucyBDb21wbGV4Lk5hTi5cclxuICogQG1lbWJlcm9mIENvbXBsZXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge0NvbXBsZXh9IG51bSAtIEFueSBDb21wbGV4IE51bWJlciB3aGljaCBpcyBub3QgaW4gdGhlIGZvcm0gb2YgKGsgKyAwLjUpz4BcclxuICogQHJldHVybnMge0NvbXBsZXh9IFRoZSByZXN1bHQgb2Ygc2VjYW50IGZ1bmN0aW9uXHJcbiAqL1xuZnVuY3Rpb24gc2VjKG51bSkge1xuICByZXR1cm4gdGhpcy5kaXZpZGUodGhpcy5PTkUsIHRoaXMuY29zKG51bSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNlYzsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIHNpbmUgb2YgYSBDb21wbGV4IE51bWJlci5cclxuICogQG1lbWJlcm9mIENvbXBsZXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge0NvbXBsZXh9IG51bSAtIEFueSBDb21wbGV4IE51bWJlclxyXG4gKiBAcmV0dXJucyB7Q29tcGxleH0gVGhlIHJlc3VsdCBvZiBzaW5lIGZ1bmN0aW9uXHJcbiAqL1xuZnVuY3Rpb24gc2luKG51bSkge1xuICBpZiAoIShudW0gaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHZhciBhID0gbnVtLmdldFJlYWwoKTtcbiAgdmFyIGIgPSBudW0uZ2V0SW1hZ2luYXJ5KCk7XG4gIHJldHVybiBuZXcgdGhpcyhNYXRoLnNpbihhKSAqIE1hdGguY29zaChiKSwgTWF0aC5jb3MoYSkgKiBNYXRoLnNpbmgoYikpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNpbjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGRpZmZlcmVuY2Ugb2YgdHdvIENvbXBsZXggTnVtYmVyLlxyXG4gKiBAbWVtYmVyb2YgQ29tcGxleFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7Q29tcGxleH0gbnVtMSAtIFRoZSBDb21wbGV4IE51bWJlciBvbiB0aGUgbGVmdCBvZiAnLScgb3BlcmF0b3IuXHJcbiAqIEBwYXJhbSB7Q29tcGxleH0gbnVtMiAtIFRoZSBDb21wbGV4IE51bWJlciBvbiB0aGUgcmlnaHQgb2YgJy0nIG9wZXJhdG9yLlxyXG4gKiBAcmV0dXJucyB7Q29tcGxleH0gVGhlIGRpZmZlcmVuY2Ugb2YgdHdvIENvbXBsZXggTnVtYmVyc1xyXG4gKi9cbmZ1bmN0aW9uIHN1YnRyYWN0KG51bTEsIG51bTIpIHtcbiAgaWYgKCEobnVtMSBpbnN0YW5jZW9mIHRoaXMpIHx8ICEobnVtMiBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgcmV0dXJuIHRoaXMuTmFOO1xuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKG51bTEucmUgLSBudW0yLnJlLCBudW0xLmltIC0gbnVtMi5pbSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3VidHJhY3Q7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSB0YW5nZW50IG9mIGEgQ29tcGxleCBOdW1iZXIuXHJcbiAqIFRoZSBkb21haW4gb2YgdGhpcyBmdW5jdGlvbiBpcyBDIC8geyAoayArIDAuNSnPgCA6IGsgaXMgYW55IGludGVnZXIgfS48YnI+PGJyPlxyXG4gKiBcclxuICogSWYgdGhlIGFyZ3VtZW50IGlzIG91dCBvZiBpdHMgZG9tYWluLCBpdCByZXR1cm5zIENvbXBsZXguTmFOLlxyXG4gKiBAbWVtYmVyb2YgQ29tcGxleFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7Q29tcGxleH0gbnVtIC0gQW55IENvbXBsZXggTnVtYmVyIHdoaWNoIGlzIG5vdCBpbiB0aGUgZm9ybSBvZiAoayArIDAuNSnPgFxyXG4gKiBAcmV0dXJucyB7Q29tcGxleH0gVGhlIHJlc3VsdCBvZiB0YW5nZW50IGZ1bmN0aW9uXHJcbiAqL1xuZnVuY3Rpb24gdGFuKG51bSkge1xuICByZXR1cm4gdGhpcy5kaXZpZGUodGhpcy5zaW4obnVtKSwgdGhpcy5jb3MobnVtKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGFuOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IENvbXBsZXggTnVtYmVyLlxyXG4gKiBAbmFtZXNwYWNlIENvbXBsZXhcclxuICogQGNsYXNzXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBhcmcxIC0gVGhlIHJlYWwgcGFydCBvZiB0aGUgQ29tcGxleCBOdW1iZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IGFyZzIgLSBUaGUgaW1hZ2luYXJ5IHBhcnQgb2YgdGhlIENvbXBsZXggTnVtYmVyXHJcbiAqL1xuZnVuY3Rpb24gQ29tcGxleChhcmcxLCBhcmcyKSB7XG4gIHZhciB0eXBlMSA9IF90eXBlb2YoYXJnMSk7XG5cbiAgdmFyIHR5cGUyID0gX3R5cGVvZihhcmcyKTtcblxuICBpZiAodHlwZTEgPT09ICdudW1iZXInICYmIHR5cGUyID09PSAndW5kZWZpbmVkJykge1xuICAgIGlmIChOdW1iZXIuaXNOYU4oYXJnMSkgfHwgIU51bWJlci5pc0Zpbml0ZShhcmcxKSkge1xuICAgICAgdGhpcy5yZSA9IE5hTjtcbiAgICAgIHRoaXMuaW0gPSBOYU47XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0aGlzLnJlID0gYXJnMTtcbiAgICB0aGlzLmltID0gMDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmICh0eXBlMSA9PT0gJ251bWJlcicgJiYgdHlwZTIgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKE51bWJlci5pc05hTihhcmcxKSB8fCBOdW1iZXIuaXNOYU4oYXJnMikgfHwgIU51bWJlci5pc0Zpbml0ZShhcmcxKSB8fCAhTnVtYmVyLmlzRmluaXRlKGFyZzIpKSB7XG4gICAgICB0aGlzLnJlID0gTmFOO1xuICAgICAgdGhpcy5pbSA9IE5hTjtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRoaXMucmUgPSBhcmcxO1xuICAgIHRoaXMuaW0gPSBhcmcyO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdGhpcy5yZSA9IE5hTjtcbiAgdGhpcy5pbSA9IE5hTjtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcGxleDtcbkNvbXBsZXgucHJvdG90eXBlLmdldFJlYWwgPSByZXF1aXJlKCcuL2NvcmUvaW5zdGFuY2UvZ2V0UmVhbCcpO1xuQ29tcGxleC5wcm90b3R5cGUuZ2V0SW1hZ2luYXJ5ID0gcmVxdWlyZSgnLi9jb3JlL2luc3RhbmNlL2dldEltYWdpbmFyeScpO1xuQ29tcGxleC5wcm90b3R5cGUuZ2V0TW9kdWx1cyA9IHJlcXVpcmUoJy4vY29yZS9pbnN0YW5jZS9nZXRNb2R1bHVzJyk7XG5Db21wbGV4LnByb3RvdHlwZS5nZXRBcmd1bWVudCA9IHJlcXVpcmUoJy4vY29yZS9pbnN0YW5jZS9nZXRBcmd1bWVudCcpO1xuQ29tcGxleC5wcm90b3R5cGUudG9TdHJpbmcgPSByZXF1aXJlKCcuL2NvcmUvaW5zdGFuY2UvdG9TdHJpbmcnKTtcbkNvbXBsZXguaXNOYU4gPSByZXF1aXJlKCcuL2NvcmUvc3RhdGljL2lzTmFOJyk7XG5Db21wbGV4LmlzRXF1YWwgPSByZXF1aXJlKCcuL2NvcmUvc3RhdGljL2lzRXF1YWwnKTtcbkNvbXBsZXguY29uanVnYXRlID0gcmVxdWlyZSgnLi9jb3JlL3N0YXRpYy9jb25qdWdhdGUnKTtcbkNvbXBsZXguaW52ZXJzZSA9IHJlcXVpcmUoJy4vY29yZS9zdGF0aWMvaW52ZXJzZScpO1xuQ29tcGxleC5hZGQgPSByZXF1aXJlKCcuL2NvcmUvc3RhdGljL2FkZCcpO1xuQ29tcGxleC5zdWJ0cmFjdCA9IHJlcXVpcmUoJy4vY29yZS9zdGF0aWMvc3VidHJhY3QnKTtcbkNvbXBsZXgubXVsdGlwbHkgPSByZXF1aXJlKCcuL2NvcmUvc3RhdGljL211bHRpcGx5Jyk7XG5Db21wbGV4LmRpdmlkZSA9IHJlcXVpcmUoJy4vY29yZS9zdGF0aWMvZGl2aWRlJyk7XG5Db21wbGV4LmV4cCA9IHJlcXVpcmUoJy4vY29yZS9zdGF0aWMvZXhwJyk7XG5Db21wbGV4LmxvZyA9IHJlcXVpcmUoJy4vY29yZS9zdGF0aWMvbG9nJyk7XG5Db21wbGV4LnBvdyA9IHJlcXVpcmUoJy4vY29yZS9zdGF0aWMvcG93Jyk7XG5Db21wbGV4LnNpbiA9IHJlcXVpcmUoJy4vY29yZS9zdGF0aWMvc2luJyk7XG5Db21wbGV4LmNvcyA9IHJlcXVpcmUoJy4vY29yZS9zdGF0aWMvY29zJyk7XG5Db21wbGV4LnRhbiA9IHJlcXVpcmUoJy4vY29yZS9zdGF0aWMvdGFuJyk7XG5Db21wbGV4LmNzYyA9IHJlcXVpcmUoJy4vY29yZS9zdGF0aWMvY3NjJyk7XG5Db21wbGV4LnNlYyA9IHJlcXVpcmUoJy4vY29yZS9zdGF0aWMvc2VjJyk7XG5Db21wbGV4LmNvdCA9IHJlcXVpcmUoJy4vY29yZS9zdGF0aWMvY290Jyk7XG5Db21wbGV4LmFzaW4gPSByZXF1aXJlKCcuL2NvcmUvc3RhdGljL2FzaW4nKTtcbkNvbXBsZXguYWNvcyA9IHJlcXVpcmUoJy4vY29yZS9zdGF0aWMvYWNvcycpO1xuQ29tcGxleC5hdGFuID0gcmVxdWlyZSgnLi9jb3JlL3N0YXRpYy9hdGFuJyk7XG5Db21wbGV4LmFjc2MgPSByZXF1aXJlKCcuL2NvcmUvc3RhdGljL2Fjc2MnKTtcbkNvbXBsZXguYXNlYyA9IHJlcXVpcmUoJy4vY29yZS9zdGF0aWMvYXNlYycpO1xuQ29tcGxleC5hY290ID0gcmVxdWlyZSgnLi9jb3JlL3N0YXRpYy9hY290Jyk7XG4vKipcclxuICogSXQgcmVwcmVzZW50cyBOYU4gaW4gdGhpcyBsaWJyYXJ5LiBJdCBpcyBlcXVpdmFsZW50IHRvIG5ldyBDb21wbGV4KE5hTikuPGJyPjxicj5cclxuICogXHJcbiAqIEl0IGlzIGltcG9ydGFudCB0byBrbm93IHRoYXQgdGhpcyBsaWJyYXJ5IGRvZXMgbm90IGludHJvZHVjZSB0aGUgY29uY2VwdCBvZiBDb21wbGV4IEluZmluaXR5LFxyXG4gKiBhbGwgSW5maW5pdHkgaW4gdGhpcyBsaWJyYXJ5IGFyZSByZXByZXNlbnRlZCBieSBDb21wbGV4Lk5hTi5cclxuICogQHN0YXRpY1xyXG4gKi9cblxuQ29tcGxleC5OYU4gPSBuZXcgQ29tcGxleChOYU4pO1xuLyoqIEBzdGF0aWMgKi9cblxuQ29tcGxleC5PTkUgPSBuZXcgQ29tcGxleCgxKTtcbi8qKiBAc3RhdGljICovXG5cbkNvbXBsZXguWkVSTyA9IG5ldyBDb21wbGV4KDApO1xuLyoqIEBzdGF0aWMgKi9cblxuQ29tcGxleC5QSSA9IG5ldyBDb21wbGV4KE1hdGguUEkpO1xuLyoqIEBzdGF0aWMgKi9cblxuQ29tcGxleC5FID0gbmV3IENvbXBsZXgoTWF0aC5FKTtcbi8qKlxyXG4gKiBJdCByZXByZXNlbnRzIHRoZSB2YWx1ZSBvZiA1ZS0xNiwgd2hpY2ggaXMgdGhlIHNtYWxsZXN0IG51bWJlciBjb25zaWRlcmVkIGFzIG5vbi16ZXJvIGluIHRoaXMgbGlicmFyeS5cclxuICogSW4gdGhlIG90aGVyIHdvcmRzLCBhbnkgbnVtYmVyIGxlc3MgdGhhbiBDb21wbGV4LkVQU0lMT04gaXMgY29uc2lkZXJlZCBhcyAwLjxicj48YnI+XHJcbiAqIFxyXG4gKiBOb3RlIHRoYXQgQ29tcGxleC5FUFNJTE9OIGlzIG51bWJlciBpbnN0ZWFkIG9mIGluc3RhbmNlIG9mIENvbXBsZXguXHJcbiAqIEBzdGF0aWNcclxuICovXG5cbkNvbXBsZXguRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIDE1KSAqIDIpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgSU5WQUxJRF9BUlJBWTogJ0ludmFsaWQgYXJndW1lbnQ6IFJlY2VpdmVkIGEgbm9uLWFycmF5IGFyZ3VtZW50JyxcbiAgSU5WQUxJRF9NQVRSSVg6ICdJbnZhbGlkIGFyZ3VtZW50OiBSZWNlaXZlZCBhbiBpbnZhbGlkIG1hdHJpeCcsXG4gIElOVkFMSURfU1FVQVJFX01BVFJJWDogJ0ludmFsaWQgYXJndW1lbnQ6IFJlY2VpdmVkIGEgbm9uLXNxdWFyZSBtYXRyaXgnLFxuICBJTlZBTElEX1VQUEVSX1RSSUFOR1VMQVJfTUFUUklYOiAnSW52YWxpZCBhcmd1bWVudDogUmVjZWl2ZWQgYSBub24gdXBwZXItdHJpYW5ndWxhciBtYXRyaXgnLFxuICBJTlZBTElEX0xPV0VSX1RSSUFOR1VMQVJfTUFUUklYOiAnSW52YWxpZCBhcmd1bWVudDogUmVjZWl2ZWQgYSBub24gbG93ZXItdHJpYW5ndWxhciBtYXRyaXgnLFxuICBJTlZBTElEX0VYUE9ORU5UOiAnSW52YWxpZCBhcmd1bWVudDogRXhwZWN0ZWQgYSBub24tbmVnYXRpdmUgaW50ZWdlciBleHBvbmVudCcsXG4gIElOVkFMSURfUk9XX0NPTDogJ0ludmFsaWQgYXJndW1lbnQ6IEV4cGVjdGVkIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyIHJvdyBhbmQgY29sdW1uJyxcbiAgSU5WQUxJRF9ST1c6ICdJbnZhbGlkIGFyZ3VtZW50OiBFeHBlY3RlZCBub24tbmVnYXRpdmUgaW50ZWdlciByb3cnLFxuICBJTlZBTElEX0NPTFVNTjogJ0ludmFsaWQgYXJndW1lbnQ6IEV4cGVjdGVkIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyIGNvbHVtbicsXG4gIElOVkFMSURfUk9XU19FWFBSRVNTSU9OOiAnSW52YWxpZCBhcmd1bWVudDogUmVjZWl2ZWQgaW52YWxpZCByb3dzIGV4cHJlc3Npb24nLFxuICBJTlZBTElEX0NPTFVNTlNfRVhQUkVTU0lPTjogJ0ludmFsaWQgYXJndW1lbnQ6IFJlY2VpdmVkIGludmFsaWQgY29sdW1ucyBleHByZXNzaW9uJyxcbiAgSU5WQUxJRF9QX05PUk06ICdJbnZhbGlkIGFyZ3VtZW50OiBSZWNlaXZlZCBpbnZhbGlkIHAtbm9ybScsXG4gIE9WRVJGTE9XX0lOREVYOiAnSW52YWxpZCBhcmd1bWVudDogTWF0cml4IGluZGV4IG92ZXJmbG93JyxcbiAgT1ZFUkZMT1dfQ09MVU1OOiAnSW52YWxpZCBhcmd1bWVudDogQ29sdW1uIGluZGV4IG92ZXJmbG93JyxcbiAgT1ZFUkZMT1dfUk9XOiAnSW52YWxpZCBhcmd1bWVudDogUm93IGluZGV4IG92ZXJmbG93JyxcbiAgTk9fVU5JUVVFX1NPTFVUSU9OOiAnQXJpdGhtZXRpYyBFeGNlcHRpb246IFRoZSBzeXN0ZW0gaGFzIG5vIHVuaXF1ZSBzb2x1dGlvbicsXG4gIFNJWkVfSU5DT01QQVRJQkxFOiAnSW52YWxpZCBhcmd1bWVudDogTWF0cml4IHNpemUtaW5jb21wYXRpYmxlJyxcbiAgU0lOR1VMQVJfTUFUUklYOiAnQXJpdGhtZXRpYyBFeGNlcHRpb246IFRoZSBtYXRyaXggaXMgbm90IGludmVydGlibGUnLFxuICBFWFBFQ1RFRF9TVFJJTkdfTlVNQkVSX0FUX1BPU18xXzI6ICdJbnZhbGlkIGFyZ3VtZW50OiBFeHBlY3RlZCBhIHN0cmluZyBvciBhIG51bWJlciBhdCBhcmd1bWVudHNbMV0gYW5kIGFyZ3VtZW50c1syXScsXG4gIEVYUEVDVEVEX0FSUkFZX09GX05VTUJFUlNfT1JfTUFUUklDRVM6ICdJbnZhbGlkIGFyZ3VtZW50OiBFeHBlY3RlZCBlaXRoZXIgYW4gYXJyYXkgb2YgbnVtYmVycyBvciBhbiBhcnJheSBvZiBzcXVhcmUgbWF0cmljZXMnXG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgTFVQIGRlY29tcG9zaXRpb24gb2YgdGhlIE1hdHJpeCxcclxuICogd2hlcmUgTCBpcyBsb3dlciB0cmlhbmd1bGFyIG1hdHJpeCB3aGljaCBkaWFnb25hbCBlbnRyaWVzIGFyZSBhbHdheXMgMSxcclxuICogVSBpcyB1cHBlciB0cmlhbmd1bGFyIG1hdHJpeCwgYW5kIFAgaXMgcGVybXV0YXRpb24gbWF0cml4Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBJdCBpcyBpbXBsZW1lbnRlZCB1c2luZyBHYXVzc2lhbiBFbGltaW5hdGlvbiB3aXRoIFBhcnRpYWwgUGl2b3RpbmcgaW4gb3JkZXIgdG9cclxuICogcmVkdWNlIHRoZSBlcnJvciBjYXVzZWQgYnkgZmxvYXRpbmctcG9pbnQgYXJpdGhtZXRpYy48YnI+PGJyPlxyXG4gKiBcclxuICogTm90ZSB0aGF0IGlmIG9wdGltaXplZCBpcyB0cnVlLCBQIGlzIGEgUGVybXV0YXRpb24gQXJyYXkgYW5kIGJvdGggTCBhbmQgVSBhcmUgbWVyZ2VkXHJcbiAqIGludG8gb25lIG1hdHJpeCBpbiBvcmRlciB0byBpbXByb3ZlIHBlcmZvcm1hbmNlLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgbWF0cml4XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGltaXplZD1mYWxzZV0gLSBSZXR1cm5zIFtQLCBMVV0gaWYgaXQgaXMgdHJ1ZSwgW1AsIEwsIFVdIGlmIGl0IGlzIGZhbHNlXHJcbiAqIEByZXR1cm5zIHtNYXRyaXhbXX0gVGhlIExVUCBkZWNvbXBvc2l0aW9uIG9mIE1hdHJpeFxyXG4gKi9cblxuXG5mdW5jdGlvbiBMVShBKSB7XG4gIHZhciBvcHRpbWl6ZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGZhbHNlO1xuXG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIHNpemUgPSBNYXRoLm1pbihyb3csIGNvbCk7XG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgQS5fZGlnaXQpICogMik7XG4gIHZhciBwZXJtdXRhdGlvbiA9IGluaXRQZXJtdXRhdGlvbihyb3cpO1xuXG4gIHZhciBjb3B5ID0gdGhpcy5jbG9uZShBKS5fbWF0cml4O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcm93IC0gMTsgaSsrKSB7XG4gICAgdmFyIGN1cnJlbnRDb2wgPSBNYXRoLm1pbihpLCBjb2wpOyAvLyBhcHBseSBQYXJ0aWFsIFBpdm90aW5nXG5cbiAgICBQYXJ0aWFsUGl2b3RpbmcoY29weSwgcGVybXV0YXRpb24sIGN1cnJlbnRDb2wsIHJvdywgY29sKTtcbiAgICB2YXIgaXRoID0gcGVybXV0YXRpb25baV07XG4gICAgdmFyIHBpdm90ID0gY29weVtpdGhdW2N1cnJlbnRDb2xdO1xuXG4gICAgaWYgKE1hdGguYWJzKHBpdm90KSA8IEVQU0lMT04pIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGZvciAodmFyIGogPSBpICsgMTsgaiA8IHJvdzsgaisrKSB7XG4gICAgICB2YXIganRoID0gcGVybXV0YXRpb25bal07XG4gICAgICB2YXIgZW50cnkgPSBjb3B5W2p0aF1bY3VycmVudENvbF07XG5cbiAgICAgIGlmIChNYXRoLmFicyhlbnRyeSkgPj0gRVBTSUxPTikge1xuICAgICAgICB2YXIgZmFjdG9yID0gZW50cnkgLyBwaXZvdDtcblxuICAgICAgICBmb3IgKHZhciBrID0gY3VycmVudENvbDsgayA8IGNvbDsgaysrKSB7XG4gICAgICAgICAgY29weVtqdGhdW2tdIC09IGZhY3RvciAqIGNvcHlbaXRoXVtrXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvcHlbanRoXVtjdXJyZW50Q29sXSA9IGZhY3RvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KHJvdyk7XG5cbiAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgcm93OyBfaTIrKykge1xuICAgIHJlc3VsdFtfaTJdID0gY29weVtwZXJtdXRhdGlvbltfaTJdXTtcbiAgfVxuXG4gIGlmIChvcHRpbWl6ZWQpIHtcbiAgICByZXR1cm4gW3Blcm11dGF0aW9uLCBuZXcgdGhpcyhyZXN1bHQpXTtcbiAgfVxuXG4gIHZhciBQID0gdGhpcy5nZW5lcmF0ZShyb3csIHJvdywgZnVuY3Rpb24gKGksIGopIHtcbiAgICB2YXIgaWR4ID0gcGVybXV0YXRpb25baV07XG5cbiAgICBpZiAoaiA9PT0gaWR4KSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfSk7XG4gIHZhciBMID0gdGhpcy5nZW5lcmF0ZShyb3csIHNpemUsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgaWYgKGkgPT09IGopIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIGlmIChpIDwgaikge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdFtpXVtqXTtcbiAgfSk7XG4gIHZhciBVID0gdGhpcy5nZW5lcmF0ZShzaXplLCBjb2wsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgaWYgKGkgPiBqKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0W2ldW2pdO1xuICB9KTtcbiAgcmV0dXJuIFtQLCBMLCBVXTtcbn1cblxuO1xuXG5mdW5jdGlvbiBpbml0UGVybXV0YXRpb24oc2l6ZSkge1xuICB2YXIgcGVybXV0YXRpb24gPSBuZXcgQXJyYXkoc2l6ZSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBwZXJtdXRhdGlvbltpXSA9IGk7XG4gIH1cblxuICByZXR1cm4gcGVybXV0YXRpb247XG59XG5cbmZ1bmN0aW9uIFBhcnRpYWxQaXZvdGluZyhtYXRyaXgsIHBlcm11dGF0aW9uLCBwb3MsIHJvdywgY29sKSB7XG4gIHZhciBjdXJyZW50Q29sID0gTWF0aC5taW4ocG9zLCBjb2wpO1xuICB2YXIgbWF4SWR4ID0gcG9zO1xuICB2YXIgbWF4ID0gTWF0aC5hYnMobWF0cml4W3Blcm11dGF0aW9uW3Bvc11dW2N1cnJlbnRDb2xdKTtcblxuICBmb3IgKHZhciBpID0gcG9zICsgMTsgaSA8IHJvdzsgaSsrKSB7XG4gICAgdmFyIHZhbHVlID0gTWF0aC5hYnMobWF0cml4W3Blcm11dGF0aW9uW2ldXVtjdXJyZW50Q29sXSk7XG5cbiAgICBpZiAodmFsdWUgPiBtYXgpIHtcbiAgICAgIG1heElkeCA9IGk7XG4gICAgICBtYXggPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICB2YXIgdCA9IHBlcm11dGF0aW9uW3Bvc107XG4gIHBlcm11dGF0aW9uW3Bvc10gPSBwZXJtdXRhdGlvblttYXhJZHhdO1xuICBwZXJtdXRhdGlvblttYXhJZHhdID0gdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMVTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYO1xuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIFFSIGRlY29tcG9zaXRpb24gb2YgdGhlIE1hdHJpeFxyXG4gKiB3aGVyZSBRIGlzIG9ydGhvZ29uYWwgbWF0cml4LCBSIGlzIHVwcGVyIHRyaWFuZ3VsYXIgbWF0cml4Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgYWxnb3JpdGhtIGlzIGltcGxlbWVudGVkIHVzaW5nIEhvdXNlaG9sZGVyIFRyYW5zZm9ybSBpbnN0ZWFkIG9mIEdyYW3igJNTY2htaWR0IHByb2Nlc3NcclxuICogYmVjYXVzZSB0aGUgSG91c2Vob2xkZXIgVHJhbnNmb3JtIGlzIG1vcmUgbnVtZXJpY2FsbHkgc3RhYmxlLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgbWF0cml4XHJcbiAqIEByZXR1cm5zIHtNYXRyaXhbXX0gVGhlIFFSIGRlY29tcG9zaXRpb24gb2YgbWF0cml4IGluIHRoZSBmb3JtIG9mIFtRLCBSXVxyXG4gKi9cblxuXG5mdW5jdGlvbiBRUihBKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIHNpemUgPSBNYXRoLm1pbihyb3csIGNvbCk7XG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgQS5fZGlnaXQpICogMik7XG5cbiAgdmFyIG1hdHJpeFIgPSB0aGlzLmNsb25lKEEpLl9tYXRyaXg7XG5cbiAgdmFyIG1hdHJpeFEgPSB0aGlzLmlkZW50aXR5KHJvdykuX21hdHJpeDtcblxuICBmb3IgKHZhciBqID0gMDsgaiA8IHNpemU7IGorKykge1xuICAgIC8vIGlmIGFsbCBlbnRyaWVzIGJlbG93IG1haW4gZGlhZ29uYWwgYXJlIGNvbnNpZGVyZWQgYXMgemVybywgc2tpcCB0aGlzIHJvdW5kXG4gICAgdmFyIHNraXAgPSB0cnVlO1xuXG4gICAgZm9yICh2YXIgaSA9IGogKyAxOyBpIDwgcm93OyBpKyspIHtcbiAgICAgIGlmIChNYXRoLmFicyhtYXRyaXhSW2ldW2pdKSA+PSBFUFNJTE9OKSB7XG4gICAgICAgIHNraXAgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFza2lwKSB7XG4gICAgICAvLyBBcHBseSBIb3VzZWhvbGRlciB0cmFuc2Zvcm1cbiAgICAgIHZhciBub3JtID0gMDtcblxuICAgICAgZm9yICh2YXIgX2kyID0gajsgX2kyIDwgcm93OyBfaTIrKykge1xuICAgICAgICBub3JtICs9IE1hdGgucG93KG1hdHJpeFJbX2kyXVtqXSwgMik7XG4gICAgICB9XG5cbiAgICAgIG5vcm0gPSBNYXRoLnNxcnQobm9ybSk7IC8vIHJlZHVjZSBmbG9hdGluZyBwb2ludCBhcml0aG1hdGljIGVycm9yXG5cbiAgICAgIHZhciBzID0gLTE7XG5cbiAgICAgIGlmIChtYXRyaXhSW2pdW2pdIDwgMCkge1xuICAgICAgICBzID0gMTtcbiAgICAgIH1cblxuICAgICAgdmFyIHUxID0gbWF0cml4UltqXVtqXSAtIHMgKiBub3JtO1xuICAgICAgdmFyIHcgPSBuZXcgQXJyYXkocm93IC0gaik7XG5cbiAgICAgIGZvciAodmFyIF9pMyA9IDA7IF9pMyA8IHJvdyAtIGo7IF9pMysrKSB7XG4gICAgICAgIHdbX2kzXSA9IG1hdHJpeFJbX2kzICsgal1bal0gLyB1MTtcbiAgICAgIH1cblxuICAgICAgd1swXSA9IDE7XG4gICAgICB2YXIgdGF1ID0gLTEgKiBzICogdTEgLyBub3JtO1xuICAgICAgdmFyIHN1YlIgPSBuZXcgQXJyYXkocm93IC0gaik7XG5cbiAgICAgIGZvciAodmFyIF9pNCA9IDA7IF9pNCA8IHJvdyAtIGo7IF9pNCsrKSB7XG4gICAgICAgIHZhciBuZXdSb3cgPSBuZXcgQXJyYXkoY29sKTtcblxuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGNvbDsgaysrKSB7XG4gICAgICAgICAgbmV3Um93W2tdID0gbWF0cml4UltqICsgX2k0XVtrXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1YlJbX2k0XSA9IG5ld1JvdztcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgX2k1ID0gajsgX2k1IDwgcm93OyBfaTUrKykge1xuICAgICAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgY29sOyBfaysrKSB7XG4gICAgICAgICAgdmFyIHN1bW1hdGlvbiA9IDA7XG5cbiAgICAgICAgICBmb3IgKHZhciBtID0gMDsgbSA8IHJvdyAtIGo7IG0rKykge1xuICAgICAgICAgICAgc3VtbWF0aW9uICs9IHN1YlJbbV1bX2tdICogd1ttXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBtYXRyaXhSW19pNV1bX2tdID0gc3ViUltfaTUgLSBqXVtfa10gLSB0YXUgKiB3W19pNSAtIGpdICogc3VtbWF0aW9uO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBzdWJRID0gbmV3IEFycmF5KHJvdyk7XG5cbiAgICAgIGZvciAodmFyIF9pNiA9IDA7IF9pNiA8IHJvdzsgX2k2KyspIHtcbiAgICAgICAgdmFyIF9uZXdSb3cgPSBuZXcgQXJyYXkocm93IC0gaik7XG5cbiAgICAgICAgZm9yICh2YXIgX2syID0gMDsgX2syIDwgcm93IC0gajsgX2syKyspIHtcbiAgICAgICAgICBfbmV3Um93W19rMl0gPSBtYXRyaXhRW19pNl1baiArIF9rMl07XG4gICAgICAgIH1cblxuICAgICAgICBzdWJRW19pNl0gPSBfbmV3Um93O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBfaTcgPSAwOyBfaTcgPCByb3c7IF9pNysrKSB7XG4gICAgICAgIGZvciAodmFyIF9rMyA9IGo7IF9rMyA8IHJvdzsgX2szKyspIHtcbiAgICAgICAgICB2YXIgX3N1bW1hdGlvbiA9IDA7XG5cbiAgICAgICAgICBmb3IgKHZhciBfbSA9IDA7IF9tIDwgcm93IC0gajsgX20rKykge1xuICAgICAgICAgICAgX3N1bW1hdGlvbiArPSBzdWJRW19pN11bX21dICogd1tfbV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbWF0cml4UVtfaTddW19rM10gPSBzdWJRW19pN11bX2szIC0gal0gLSB0YXUgKiB3W19rMyAtIGpdICogX3N1bW1hdGlvbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIF9pOCA9IDA7IF9pOCA8IHJvdzsgX2k4KyspIHtcbiAgICBmb3IgKHZhciBfaiA9IDA7IF9qIDwgY29sOyBfaisrKSB7XG4gICAgICBpZiAoX2k4ID4gX2opIHtcbiAgICAgICAgbWF0cml4UltfaThdW19qXSA9IDA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFtuZXcgdGhpcyhtYXRyaXhRKSwgbmV3IHRoaXMobWF0cml4UildO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IFFSOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgZW1wdHkgPSByZXF1aXJlKCcuLi8uLi91dGlsL2VtcHR5Jyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWCxcbiAgICBJTlZBTElEX1VQUEVSX1RSSUFOR1VMQVJfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9VUFBFUl9UUklBTkdVTEFSX01BVFJJWCxcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVgsXG4gICAgU0laRV9JTkNPTVBBVElCTEUgPSBfcmVxdWlyZS5TSVpFX0lOQ09NUEFUSUJMRSxcbiAgICBOT19VTklRVUVfU09MVVRJT04gPSBfcmVxdWlyZS5OT19VTklRVUVfU09MVVRJT047XG4vKipcclxuKiBTb2x2ZSBzeXN0ZW0gb2YgbGluZWFyIGVxdWF0aW9ucyBVeCA9IHkgdXNpbmcgYmFja3dhcmQgc3Vic3RpdHV0aW9uLFxyXG4qIHdoZXJlIFUgaXMgYW4gdXBwZXIgdHJpYW5ndWxhciBtYXRyaXguXHJcbiogSWYgdGhlcmUgaXMgbm8gdW5pcXVlIHNvbHV0aW9ucywgYW4gZXJyb3IgaXMgdGhyb3duLlxyXG4qIEBtZW1iZXJvZiBNYXRyaXhcclxuKiBAc3RhdGljXHJcbiogQHBhcmFtIHtNYXRyaXh9IFUgLSBBbnkgbiB4IG4gdXBwZXIgdHJpYW5ndWxhciBNYXRyaXhcclxuKiBAcGFyYW0ge01hdHJpeH0geSAtIEFueSBuIHggMSBNYXRyaXhcclxuKiBAcmV0dXJucyB7TWF0cml4fSBuIHggMSBNYXRyaXggd2hpY2ggaXMgdGhlIHNvbHV0aW9uIG9mIFV4ID0geVxyXG4qL1xuXG5cbmZ1bmN0aW9uIGJhY2t3YXJkKFUsIHkpIHtcbiAgaWYgKCEoVSBpbnN0YW5jZW9mIHRoaXMpIHx8ICEoeSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIGlmICghVS5pc1VwcGVyVHJpYW5ndWxhcigpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfVVBQRVJfVFJJQU5HVUxBUl9NQVRSSVgpO1xuICB9XG5cbiAgaWYgKCFVLmlzU3F1YXJlKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9TUVVBUkVfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBzaXplID0gVS5zaXplKClbMF07XG5cbiAgdmFyIF95JHNpemUgPSB5LnNpemUoKSxcbiAgICAgIF95JHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX3kkc2l6ZSwgMiksXG4gICAgICB5cm93ID0gX3kkc2l6ZTJbMF0sXG4gICAgICB5Y29sID0gX3kkc2l6ZTJbMV07XG5cbiAgdmFyIG1hdHJpeFUgPSBVLl9tYXRyaXg7XG4gIHZhciBtYXRyaXhZID0geS5fbWF0cml4O1xuXG4gIGlmICh5cm93ICE9PSBzaXplIHx8IHljb2wgIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoU0laRV9JTkNPTVBBVElCTEUpO1xuICB9XG5cbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBVLl9kaWdpdCkgKiAyKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIGlmIChNYXRoLmFicyhtYXRyaXhVW2ldW2ldKSA8IEVQU0lMT04pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihOT19VTklRVUVfU09MVVRJT04pO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb2VmZmljaWVudHMgPSBlbXB0eShzaXplLCAxKTtcblxuICBmb3IgKHZhciBfaTIgPSBzaXplIC0gMTsgX2kyID49IDA7IF9pMi0tKSB7XG4gICAgdmFyIHN1bW1hdGlvbiA9IDA7XG5cbiAgICBmb3IgKHZhciBqID0gX2kyICsgMTsgaiA8IHNpemU7IGorKykge1xuICAgICAgc3VtbWF0aW9uICs9IGNvZWZmaWNpZW50c1tqXVswXSAqIG1hdHJpeFVbX2kyXVtqXTtcbiAgICB9XG5cbiAgICBjb2VmZmljaWVudHNbX2kyXVswXSA9IChtYXRyaXhZW19pMl1bMF0gLSBzdW1tYXRpb24pIC8gbWF0cml4VVtfaTJdW19pMl07XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMoY29lZmZpY2llbnRzKTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBiYWNrd2FyZDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIGVtcHR5ID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9lbXB0eScpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVgsXG4gICAgSU5WQUxJRF9MT1dFUl9UUklBTkdVTEFSX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTE9XRVJfVFJJQU5HVUxBUl9NQVRSSVgsXG4gICAgSU5WQUxJRF9TUVVBUkVfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9TUVVBUkVfTUFUUklYLFxuICAgIFNJWkVfSU5DT01QQVRJQkxFID0gX3JlcXVpcmUuU0laRV9JTkNPTVBBVElCTEUsXG4gICAgTk9fVU5JUVVFX1NPTFVUSU9OID0gX3JlcXVpcmUuTk9fVU5JUVVFX1NPTFVUSU9OO1xuLyoqXHJcbiAqIFNvbHZlIHN5c3RlbSBvZiBsaW5lYXIgZXF1YXRpb25zIEx4ID0geSB1c2luZyBmb3J3YXJkIHN1YnN0aXR1dGlvbixcclxuICogd2hlcmUgTCBpcyBhIGxvd2VyIHRyaWFuZ3VsYXIgbWF0cml4LlxyXG4gKiBJZiB0aGVyZSBpcyBubyB1bmlxdWUgc29sdXRpb25zLCBhbiBlcnJvciBpcyB0aHJvd24uXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gTCAtIEFueSBuIHggbiBsb3dlciB0cmlhbmd1bGFyIE1hdHJpeFxyXG4gKiBAcGFyYW0ge01hdHJpeH0geSAtIEFueSBuIHggMSBNYXRyaXhcclxuICogQHJldHVybnMge01hdHJpeH0gbiB4IDEgTWF0cml4IHdoaWNoIGlzIHRoZSBzb2x1dGlvbiBvZiBMeCA9IHlcclxuICovXG5cblxuZnVuY3Rpb24gZm9yd2FyZChMLCB5KSB7XG4gIGlmICghKEwgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKHkgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIUwuaXNMb3dlclRyaWFuZ3VsYXIoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX0xPV0VSX1RSSUFOR1VMQVJfTUFUUklYKTtcbiAgfVxuXG4gIGlmICghTC5pc1NxdWFyZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfU1FVQVJFX01BVFJJWCk7XG4gIH1cblxuICB2YXIgc2l6ZSA9IEwuc2l6ZSgpWzBdO1xuXG4gIHZhciBfeSRzaXplID0geS5zaXplKCksXG4gICAgICBfeSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF95JHNpemUsIDIpLFxuICAgICAgeXJvdyA9IF95JHNpemUyWzBdLFxuICAgICAgeWNvbCA9IF95JHNpemUyWzFdO1xuXG4gIHZhciBtYXRyaXhMID0gTC5fbWF0cml4O1xuICB2YXIgbWF0cml4WSA9IHkuX21hdHJpeDtcblxuICBpZiAoc2l6ZSAhPT0geXJvdyB8fCB5Y29sICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFNJWkVfSU5DT01QQVRJQkxFKTtcbiAgfVxuXG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgTC5fZGlnaXQpICogMik7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBpZiAoTWF0aC5hYnMobWF0cml4TFtpXVtpXSkgPCBFUFNJTE9OKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTk9fVU5JUVVFX1NPTFVUSU9OKTtcbiAgICB9XG4gIH1cblxuICB2YXIgY29lZmZpY2llbnRzID0gZW1wdHkoc2l6ZSwgMSk7XG5cbiAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgc2l6ZTsgX2kyKyspIHtcbiAgICB2YXIgc3VtbWF0aW9uID0gMDtcblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgX2kyOyBqKyspIHtcbiAgICAgIHN1bW1hdGlvbiArPSBjb2VmZmljaWVudHNbal1bMF0gKiBtYXRyaXhMW19pMl1bal07XG4gICAgfVxuXG4gICAgY29lZmZpY2llbnRzW19pMl1bMF0gPSAobWF0cml4WVtfaTJdWzBdIC0gc3VtbWF0aW9uKSAvIG1hdHJpeExbX2kyXVtfaTJdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKGNvZWZmaWNpZW50cyk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gZm9yd2FyZDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYLFxuICAgIE5PX1VOSVFVRV9TT0xVVElPTiA9IF9yZXF1aXJlLk5PX1VOSVFVRV9TT0xVVElPTixcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVgsXG4gICAgU0laRV9JTkNPTVBBVElCTEUgPSBfcmVxdWlyZS5TSVpFX0lOQ09NUEFUSUJMRTtcbi8qKlxyXG4gKiBTb2x2ZSBzeXN0ZW0gb2YgbGluZWFyIGVxdWF0aW9ucyBBeCA9IHkgdXNpbmcgTFUgZGVjb21wb3NpdGlvbi5cclxuICogSWYgdGhlcmUgaXMgbm8gdW5pcXVlIHNvbHV0aW9ucywgYW4gZXJyb3IgaXMgdGhyb3duLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEwgLSBBbnkgbiB4IG4gc3F1YXJlIE1hdHJpeFxyXG4gKiBAcGFyYW0ge01hdHJpeH0geSAtIEFueSBuIHggMSBNYXRyaXhcclxuICogQHJldHVybnMge01hdHJpeH0gbiB4IDEgTWF0cml4IHdoaWNoIGlzIHRoZSBzb2x1dGlvbiBvZiBBeCA9IHlcclxuICovXG5cblxuZnVuY3Rpb24gc29sdmUoQSwgYikge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykgfHwgIShiIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgaWYgKCFBLmlzU3F1YXJlKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9TUVVBUkVfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBfQSRzaXplID0gQS5zaXplKCksXG4gICAgICBfQSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9BJHNpemUsIDIpLFxuICAgICAgYVJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgYUNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciBfYiRzaXplID0gYi5zaXplKCksXG4gICAgICBfYiRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9iJHNpemUsIDIpLFxuICAgICAgYlJvdyA9IF9iJHNpemUyWzBdLFxuICAgICAgYkNvbCA9IF9iJHNpemUyWzFdO1xuXG4gIGlmIChhQ29sICE9PSBiUm93IHx8IGJDb2wgIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoU0laRV9JTkNPTVBBVElCTEUpO1xuICB9XG5cbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBBLl9kaWdpdCkgKiAyKTtcblxuICB2YXIgX3RoaXMkTFUgPSB0aGlzLkxVKEEsIHRydWUpLFxuICAgICAgX3RoaXMkTFUyID0gX3NsaWNlZFRvQXJyYXkoX3RoaXMkTFUsIDIpLFxuICAgICAgUCA9IF90aGlzJExVMlswXSxcbiAgICAgIExVID0gX3RoaXMkTFUyWzFdO1xuXG4gIHZhciBtYXRyaXhMVSA9IExVLl9tYXRyaXg7XG4gIHZhciBtYXRyaXhCID0gYi5fbWF0cml4O1xuXG4gIGZvciAodmFyIGkgPSBhUm93IC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoTWF0aC5hYnMobWF0cml4TFVbaV1baV0pIDwgRVBTSUxPTikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKE5PX1VOSVFVRV9TT0xVVElPTik7XG4gICAgfVxuICB9XG5cbiAgdmFyIGNsb25lZFZlY3RvciA9IG5ldyBBcnJheShiUm93KTtcbiAgdmFyIGNvZWZmaWNpZW50cyA9IG5ldyBBcnJheShiUm93KTtcblxuICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBiUm93OyBfaTIrKykge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgIGNsb25lZFZlY3RvcltfaTJdID0gbWF0cml4QltQW19pMl1dWzBdO1xuICB9XG5cbiAgZm9yICh2YXIgX2kzID0gMDsgX2kzIDwgYVJvdzsgX2kzKyspIHtcbiAgICB2YXIgc3VtbWF0aW9uID0gMDtcblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgX2kzOyBqKyspIHtcbiAgICAgIHN1bW1hdGlvbiArPSBjb2VmZmljaWVudHNbal0gKiBtYXRyaXhMVVtfaTNdW2pdO1xuICAgIH1cblxuICAgIGNvZWZmaWNpZW50c1tfaTNdID0gY2xvbmVkVmVjdG9yW19pM10gLSBzdW1tYXRpb247XG4gIH1cblxuICBmb3IgKHZhciBfaTQgPSBhUm93IC0gMTsgX2k0ID49IDA7IF9pNC0tKSB7XG4gICAgdmFyIF9zdW1tYXRpb24gPSAwO1xuXG4gICAgZm9yICh2YXIgX2ogPSBfaTQgKyAxOyBfaiA8IGFSb3c7IF9qKyspIHtcbiAgICAgIF9zdW1tYXRpb24gKz0gbWF0cml4TFVbX2k0XVtfal0gKiBjbG9uZWRWZWN0b3JbX2pdO1xuICAgIH1cblxuICAgIGNsb25lZFZlY3RvcltfaTRdID0gKGNvZWZmaWNpZW50c1tfaTRdIC0gX3N1bW1hdGlvbikgLyBtYXRyaXhMVVtfaTRdW19pNF07XG4gIH1cblxuICBmb3IgKHZhciBfaTUgPSAwOyBfaTUgPCBiUm93OyBfaTUrKykge1xuICAgIGNvZWZmaWNpZW50c1tfaTVdID0gW2Nsb25lZFZlY3RvcltfaTVdXTtcbiAgfVxuXG4gIHJldHVybiBuZXcgdGhpcyhjb2VmZmljaWVudHMpO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IHNvbHZlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVgsXG4gICAgU0laRV9JTkNPTVBBVElCTEUgPSBfcmVxdWlyZS5TSVpFX0lOQ09NUEFUSUJMRTtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBzdW0gb2YgdHdvIE1hdHJpY2VzLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgTWF0cml4XHJcbiAqIEBwYXJhbSB7TWF0cml4fSBCIC0gQW55IE1hdHJpeCB0aGF0IGhhcyBzYW1lIHNpemUgd2l0aCBBXHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IFRoZSBzdW0gb2YgdHdvIE1hdHJpY2VzXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGFkZChBLCBCKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKEIgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIF9CJHNpemUgPSBCLnNpemUoKSxcbiAgICAgIF9CJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ikc2l6ZSwgMiksXG4gICAgICByb3cyID0gX0Ikc2l6ZTJbMF0sXG4gICAgICBjb2wyID0gX0Ikc2l6ZTJbMV07XG5cbiAgaWYgKHJvdyAhPT0gcm93MiB8fCBjb2wgIT09IGNvbDIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoU0laRV9JTkNPTVBBVElCTEUpO1xuICB9XG5cbiAgdmFyIG1hdHJpeDEgPSBBLl9tYXRyaXg7XG4gIHZhciBtYXRyaXgyID0gQi5fbWF0cml4O1xuICByZXR1cm4gdGhpcy5nZW5lcmF0ZShyb3csIGNvbCwgZnVuY3Rpb24gKGksIGopIHtcbiAgICByZXR1cm4gbWF0cml4MVtpXVtqXSArIG1hdHJpeDJbaV1bal07XG4gIH0pO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGFkZDsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYLFxuICAgIElOVkFMSURfU1FVQVJFX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfU1FVQVJFX01BVFJJWCxcbiAgICBTSU5HVUxBUl9NQVRSSVggPSBfcmVxdWlyZS5TSU5HVUxBUl9NQVRSSVg7XG5cbnZhciBNYXRyaXggPSByZXF1aXJlKCcuLi8uLicpO1xuLyoqXHJcbiAqIEZpbmQgdGhlIGludmVyc2Ugb2Ygbm9uLXNpbmd1bGFyIG1hdHJpeCB1c2luZyBFbGVtZW50YXJ5IFJvdyBPcGVyYXRpb25zLlxyXG4gKiBJZiB0aGUgbWF0cml4IGlzIHNpbmd1bGFyLCBhbiBlcnJvciBpcyB0aHJvd24uXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBzcXVhcmUgTWF0cml4XHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IFRoZSBpbnZlcnNlIG9mIEFcclxuICovXG5cblxuZnVuY3Rpb24gaW52ZXJzZShBKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIUEuaXNTcXVhcmUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1NRVUFSRV9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIHNpemUgPSBBLnNpemUoKVswXTtcblxuICBpZiAoc2l6ZSA9PT0gMCkge1xuICAgIC8vIGludmVyc2Ugb2YgMHgwIG1hdHJpeCBpcyBpdHNlbGZcbiAgICByZXR1cm4gbmV3IE1hdHJpeChbXSk7XG4gIH1cblxuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIEEuX2RpZ2l0KSAqIDIpO1xuXG4gIHZhciBpbnYgPSB0aGlzLmlkZW50aXR5KHNpemUpLl9tYXRyaXg7XG5cbiAgdmFyIGNsb25lID0gdGhpcy5jbG9uZShBKS5fbWF0cml4O1xuXG4gIHZhciBwZXJtdXRhdGlvbiA9IGluaXRQZXJtdXRhdGlvbihzaXplKTsgLy8gaXRlcmF0ZSBlYWNoIGNvbHVtblxuXG4gIGZvciAodmFyIGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgdmFyIHBpdm90SWR4ID0gajtcbiAgICB2YXIgcGl2b3QgPSBjbG9uZVtwZXJtdXRhdGlvbltqXV1bal07XG5cbiAgICB3aGlsZSAoTWF0aC5hYnMocGl2b3QpIDwgRVBTSUxPTiAmJiBwaXZvdElkeCA8IHNpemUgLSAxKSB7XG4gICAgICBwaXZvdElkeCsrO1xuICAgICAgcGl2b3QgPSBjbG9uZVtwZXJtdXRhdGlvbltwaXZvdElkeF1dW2pdO1xuICAgIH1cblxuICAgIGlmIChNYXRoLmFicyhwaXZvdCkgPCBFUFNJTE9OKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoU0lOR1VMQVJfTUFUUklYKTtcbiAgICB9XG5cbiAgICBpZiAoaiAhPT0gcGl2b3RJZHgpIHtcbiAgICAgIHZhciB0ZW1wID0gcGVybXV0YXRpb25bal07XG4gICAgICBwZXJtdXRhdGlvbltqXSA9IHBlcm11dGF0aW9uW3Bpdm90SWR4XTtcbiAgICAgIHBlcm11dGF0aW9uW3Bpdm90SWR4XSA9IHRlbXA7XG4gICAgfVxuXG4gICAgdmFyIHBpdm90Um93ID0gcGVybXV0YXRpb25bal07IC8vIHRoZSBwaXZvdCBpcyBndWFyYW50ZWVkIHRvIGJlIG5vbi16ZXJvXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgdmFyIGl0aCA9IHBlcm11dGF0aW9uW2ldO1xuXG4gICAgICBpZiAoaSA9PT0gaikge1xuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHNpemU7IGsrKykge1xuICAgICAgICAgIGlmIChrID09PSBqKSB7XG4gICAgICAgICAgICBjbG9uZVtpdGhdW2tdID0gMTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoayA+IGopIHtcbiAgICAgICAgICAgIGNsb25lW2l0aF1ba10gLz0gcGl2b3Q7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaW52W2l0aF1ba10gLz0gcGl2b3Q7XG4gICAgICAgIH1cblxuICAgICAgICBwaXZvdCA9IDE7XG4gICAgICB9XG5cbiAgICAgIGlmIChpICE9PSBqICYmIE1hdGguYWJzKGNsb25lW2l0aF1bal0pID49IEVQU0lMT04pIHtcbiAgICAgICAgdmFyIGZhY3RvciA9IGNsb25lW2l0aF1bal0gLyBwaXZvdDtcblxuICAgICAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgc2l6ZTsgX2srKykge1xuICAgICAgICAgIGlmIChfayA9PT0gaikge1xuICAgICAgICAgICAgY2xvbmVbaXRoXVtfa10gPSAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChfayA+IGopIHtcbiAgICAgICAgICAgIGNsb25lW2l0aF1bX2tdIC09IGZhY3RvciAqIGNsb25lW3Bpdm90Um93XVtfa107XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaW52W2l0aF1bX2tdIC09IGZhY3RvciAqIGludltwaXZvdFJvd11bX2tdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IHNpemU7IF9pKyspIHtcbiAgICBjbG9uZVtfaV0gPSBpbnZbcGVybXV0YXRpb25bX2ldXTtcbiAgfVxuXG4gIHJldHVybiBuZXcgdGhpcyhjbG9uZSk7XG59XG5cbjtcblxuZnVuY3Rpb24gaW5pdFBlcm11dGF0aW9uKHNpemUpIHtcbiAgdmFyIHBlcm11dGF0aW9uID0gbmV3IEFycmF5KHNpemUpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgcGVybXV0YXRpb25baV0gPSBpO1xuICB9XG5cbiAgcmV0dXJuIHBlcm11dGF0aW9uO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmVyc2U7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBlbXB0eSA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvZW1wdHknKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYLFxuICAgIFNJWkVfSU5DT01QQVRJQkxFID0gX3JlcXVpcmUuU0laRV9JTkNPTVBBVElCTEU7XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgcHJvZHVjdCBvZiB0d28gTWF0cmljZXMuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBNYXRyaXhcclxuICogQHBhcmFtIHtNYXRyaXh9IEIgLSBBbnkgTWF0cml4IHRoYXQgaXMgc2l6ZS1jb21wYXRpYmxlIHdpdGggQVxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBUaGUgcHJvZHVjdCBvZiB0d28gTWF0cmljZXNcclxuICovXG5cblxuZnVuY3Rpb24gbXVsdGlwbHkoQSwgQikge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykgfHwgIShCIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICBBcm93ID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBBY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIF9CJHNpemUgPSBCLnNpemUoKSxcbiAgICAgIF9CJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ikc2l6ZSwgMiksXG4gICAgICBCcm93ID0gX0Ikc2l6ZTJbMF0sXG4gICAgICBCY29sID0gX0Ikc2l6ZTJbMV07XG5cbiAgaWYgKEFjb2wgIT09IEJyb3cpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoU0laRV9JTkNPTVBBVElCTEUpO1xuICB9XG5cbiAgdmFyIG1hdHJpeEEgPSBBLl9tYXRyaXg7XG4gIHZhciBtYXRyaXhCID0gQi5fbWF0cml4O1xuICB2YXIgcmVzdWx0ID0gZW1wdHkoQXJvdywgQmNvbCk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBBcm93OyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IEJjb2w7IGorKykge1xuICAgICAgcmVzdWx0W2ldW2pdID0gMDtcblxuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBCcm93OyBrKyspIHtcbiAgICAgICAgcmVzdWx0W2ldW2pdICs9IG1hdHJpeEFbaV1ba10gKiBtYXRyaXhCW2tdW2pdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgdGhpcyhyZXN1bHQpO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IG11bHRpcGx5OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVgsXG4gICAgSU5WQUxJRF9TUVVBUkVfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9TUVVBUkVfTUFUUklYLFxuICAgIElOVkFMSURfRVhQT05FTlQgPSBfcmVxdWlyZS5JTlZBTElEX0VYUE9ORU5UO1xuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIHBvd2VyIG9mIGFueSBzcXVhcmUgbWF0cml4LlxyXG4gKiBUaGUgYWxnb3JpdGhtIGlzIGltcGxlbWVudGVkIHJlY3Vyc2l2ZWx5LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgc3F1YXJlIE1hdHJpeFxyXG4gKiBAcGFyYW0ge251bWJlcn0gZXhwb25lbnQgLSBBbnkgTm9uLW5lZ2F0aXZlIGludGVnZXJcclxuICogQHJldHVybnMge01hdHJpeH0gVGhlIHBvd2VyIG9mIEFcclxuICovXG5cblxuZnVuY3Rpb24gcG93KEEsIGV4cG9uZW50KSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIUEuaXNTcXVhcmUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1NRVUFSRV9NQVRSSVgpO1xuICB9XG5cbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGV4cG9uZW50KSB8fCBleHBvbmVudCA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9FWFBPTkVOVCk7XG4gIH1cblxuICB2YXIgc2l6ZSA9IEEuc2l6ZSgpWzBdO1xuXG4gIGlmIChleHBvbmVudCA9PT0gMCkge1xuICAgIHJldHVybiB0aGlzLmlkZW50aXR5KHNpemUpO1xuICB9XG5cbiAgaWYgKGV4cG9uZW50ID09PSAxKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoQSk7XG4gIH1cblxuICBpZiAoZXhwb25lbnQgJSAyID09PSAwKSB7XG4gICAgdmFyIF90ZW1wID0gdGhpcy5wb3coQSwgZXhwb25lbnQgLyAyKTtcblxuICAgIHJldHVybiB0aGlzLm11bHRpcGx5KF90ZW1wLCBfdGVtcCk7XG4gIH1cblxuICB2YXIgdGVtcCA9IHRoaXMucG93KEEsIChleHBvbmVudCAtIDEpIC8gMik7XG4gIHJldHVybiB0aGlzLm11bHRpcGx5KHRoaXMubXVsdGlwbHkodGVtcCwgdGVtcCksIEEpO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IHBvdzsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBTSVpFX0lOQ09NUEFUSUJMRSA9IF9yZXF1aXJlLlNJWkVfSU5DT01QQVRJQkxFLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgZGlmZmVyZW5jZSBvZiB0d28gTWF0cmljZXMuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBNYXRyaXhcclxuICogQHBhcmFtIHtNYXRyaXh9IEIgLSBBbnkgTWF0cml4IHRoYXQgaGFzIHNhbWUgc2l6ZSB3aXRoIEFcclxuICogQHJldHVybnMge01hdHJpeH0gVGhlIGRpZmZlcmVuY2Ugb2YgdHdvIE1hdHJpY2VzXHJcbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VidHJhY3QoQSwgQikge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykgfHwgIShCIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIGNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciBfQiRzaXplID0gQi5zaXplKCksXG4gICAgICBfQiRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9CJHNpemUsIDIpLFxuICAgICAgcm93MiA9IF9CJHNpemUyWzBdLFxuICAgICAgY29sMiA9IF9CJHNpemUyWzFdO1xuXG4gIGlmIChyb3cgIT09IHJvdzIgfHwgY29sICE9PSBjb2wyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFNJWkVfSU5DT01QQVRJQkxFKTtcbiAgfVxuXG4gIHZhciBtYXRyaXgxID0gQS5fbWF0cml4O1xuICB2YXIgbWF0cml4MiA9IEIuX21hdHJpeDtcbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUocm93LCBjb2wsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgcmV0dXJuIG1hdHJpeDFbaV1bal0gLSBtYXRyaXgyW2ldW2pdO1xuICB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWDtcbi8qKlxyXG4gKiBGaW5kIHRoZSB0cmFuc3Bvc2Ugb2YgYSBtYXRyaXguXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0geyBNYXRyaXggfSBBIC0gQW55IE1hdHJpeFxyXG4gKiBAcmV0dXJucyB7IE1hdHJpeCB9IFJldHVybnMgdHJhbnNwb3NlIG9mIEFcclxuICovXG5cblxuZnVuY3Rpb24gdHJhbnNwb3NlKEEpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBfQSRzaXplID0gQS5zaXplKCksXG4gICAgICBfQSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9BJHNpemUsIDIpLFxuICAgICAgcm93ID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfQSRzaXplMlsxXTtcblxuICB2YXIgbWF0cml4ID0gQS5fbWF0cml4O1xuICByZXR1cm4gdGhpcy5nZW5lcmF0ZShjb2wsIHJvdywgZnVuY3Rpb24gKGksIGopIHtcbiAgICByZXR1cm4gbWF0cml4W2pdW2ldO1xuICB9KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSB0cmFuc3Bvc2U7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBNYXRyaXggPSByZXF1aXJlKCcuLi8uLicpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfUF9OT1JNID0gX3JlcXVpcmUuSU5WQUxJRF9QX05PUk0sXG4gICAgU0lOR1VMQVJfTUFUUklYID0gX3JlcXVpcmUuU0lOR1VMQVJfTUFUUklYLFxuICAgIElOVkFMSURfU1FVQVJFX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfU1FVQVJFX01BVFJJWDtcbi8qKlxyXG4gKiBDYWxjdWxhdGlvbnMgdGhlIGNvbmRpdGlvbiBudW1iZXIgb2Ygc3F1YXJlIE1hdHJpeFxyXG4gKiB3aXRoIHJlc3BlY3QgdG8gdGhlIGNob2ljZSBvZiBNYXRyaXggbm9ybS4gXHJcbiAqIElmIHRoZSBNYXRyaXggaXMgc2luZ3VsYXIsIHJldHVybnMgSW5maW5pdHkuPGJyPjxicj5cclxuICogVGhlIGNvbmRpdGlvbiBudW1iZXIgaXMgbm90IGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHBhcmFtIHsoMXwyfEluZmluaXR5fCdGJyl9IHAgLSBUeXBlIG9mIE1hdHJpeCBub3JtXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBjb25kaXRpb24gbnVtYmVyIG9mIE1hdHJpeFxyXG4gKi9cblxuXG5mdW5jdGlvbiBjb25kKCkge1xuICB2YXIgcCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogMjtcblxuICBpZiAocCAhPT0gMSAmJiBwICE9PSAyICYmIHAgIT09IEluZmluaXR5ICYmIHAgIT09ICdGJykge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1BfTk9STSk7XG4gIH1cblxuICBpZiAoIXRoaXMuaXNTcXVhcmUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1NRVUFSRV9NQVRSSVgpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICB2YXIgaW52ZXJzZSA9IE1hdHJpeC5pbnZlcnNlKHRoaXMpO1xuICAgIHJldHVybiBpbnZlcnNlLm5vcm0ocCkgKiB0aGlzLm5vcm0ocCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKGVycm9yLm1lc3NhZ2UgPT09IFNJTkdVTEFSX01BVFJJWCkge1xuICAgICAgcmV0dXJuIEluZmluaXR5O1xuICAgIH1cblxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gY29uZDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxuLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLWRlc3RydWN0dXJpbmcgKi9cbnZhciBNYXRyaXggPSByZXF1aXJlKCcuLi8uLicpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfU1FVQVJFX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfU1FVQVJFX01BVFJJWDtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBzcXVhcmUgTWF0cml4LlxyXG4gKiBJZiB0aGUgTWF0cml4IHNpemUgaXMgbGFyZ2VyIHRoYW4gMywgaXQgY2FsY3VsYXRlcyB0aGUgZGV0ZXJtaW5hbnQgdXNpbmdcclxuICogTFUgZGVjb21wb3NpdGlvbiwgb3RoZXJ3aXNlLCB1c2luZyBMZWlibml6IEZvcm11bGEuPGJyPjxicj5cclxuICogVGhlIGRldGVybWluYW50IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgZGV0ZXJtaW5hbnQgb2Ygc3F1YXJlIG1hdHJpcnhcclxuICovXG5cblxuZnVuY3Rpb24gZGV0KCkge1xuICBpZiAoIXRoaXMuaXNTcXVhcmUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1NRVUFSRV9NQVRSSVgpO1xuICB9XG5cbiAgaWYgKHRoaXMuX2RldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RldDtcbiAgfVxuXG4gIHZhciBtYXRyaXggPSB0aGlzLl9tYXRyaXg7XG4gIHZhciBzaXplID0gbWF0cml4Lmxlbmd0aDtcblxuICBpZiAoc2l6ZSA9PT0gMCkge1xuICAgIHRoaXMuX2RldCA9IDE7XG4gICAgcmV0dXJuIDE7IC8vIHRoZSBkZXRlcm1pbmFudCBvZiAweDAgbWF0cml4IG11c3QgYmUgMVxuICB9XG5cbiAgaWYgKHNpemUgPT09IDEpIHtcbiAgICB0aGlzLl9kZXQgPSBtYXRyaXhbMF1bMF07XG4gICAgcmV0dXJuIHRoaXMuX2RldDtcbiAgfVxuXG4gIGlmIChzaXplID09PSAyKSB7XG4gICAgdGhpcy5fZGV0ID0gbWF0cml4WzBdWzBdICogbWF0cml4WzFdWzFdIC0gbWF0cml4WzBdWzFdICogbWF0cml4WzFdWzBdO1xuICAgIHJldHVybiB0aGlzLl9kZXQ7XG4gIH1cblxuICBpZiAoc2l6ZSA9PT0gMykge1xuICAgIHRoaXMuX2RldCA9IG1hdHJpeFswXVswXSAqIG1hdHJpeFsxXVsxXSAqIG1hdHJpeFsyXVsyXSArIG1hdHJpeFswXVsxXSAqIG1hdHJpeFsxXVsyXSAqIG1hdHJpeFsyXVswXSArIG1hdHJpeFswXVsyXSAqIG1hdHJpeFsxXVswXSAqIG1hdHJpeFsyXVsxXSAtIG1hdHJpeFswXVsyXSAqIG1hdHJpeFsxXVsxXSAqIG1hdHJpeFsyXVswXSAtIG1hdHJpeFswXVsxXSAqIG1hdHJpeFsxXVswXSAqIG1hdHJpeFsyXVsyXSAtIG1hdHJpeFswXVswXSAqIG1hdHJpeFsxXVsyXSAqIG1hdHJpeFsyXVsxXTtcbiAgICByZXR1cm4gdGhpcy5fZGV0O1xuICB9XG5cbiAgdmFyIF9NYXRyaXgkTFUgPSBNYXRyaXguTFUodGhpcywgdHJ1ZSksXG4gICAgICBfTWF0cml4JExVMiA9IF9zbGljZWRUb0FycmF5KF9NYXRyaXgkTFUsIDIpLFxuICAgICAgUCA9IF9NYXRyaXgkTFUyWzBdLFxuICAgICAgTFUgPSBfTWF0cml4JExVMlsxXTtcblxuICB2YXIgbWF0cml4TFUgPSBMVS5fbWF0cml4OyAvLyBjb3VudCB3aGV0aGVyIHRoZSBudW1iZXIgb2YgcGVybXV0YXRpb25zIDxzd2FwPiBpcyBvZGQgb3IgZXZlblxuICAvLyBPKG5eMilcblxuICB2YXIgc3dhcCA9IDA7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBpZiAoUFtpXSA9PT0gaSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgd2hpbGUgKFBbaV0gIT09IGkpIHtcbiAgICAgIHZhciB0YXJnZXQgPSBQW2ldO1xuICAgICAgUFtpXSA9IFBbdGFyZ2V0XTtcbiAgICAgIFBbdGFyZ2V0XSA9IHRhcmdldDtcbiAgICAgIHN3YXArKztcbiAgICB9XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gMTtcblxuICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBzaXplOyBfaTIrKykge1xuICAgIHJlc3VsdCAqPSBtYXRyaXhMVVtfaTJdW19pMl07XG4gIH1cblxuICBpZiAoc3dhcCAlIDIgPT09IDEpIHtcbiAgICB0aGlzLl9kZXQgPSByZXN1bHQgKiAtMTtcbiAgICByZXR1cm4gdGhpcy5fZGV0O1xuICB9XG5cbiAgdGhpcy5fZGV0ID0gcmVzdWx0O1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGRldDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbi8vIHJlZmVyZW5jZTogaHR0cHM6Ly9wZW9wbGUuaW5mLmV0aHouY2gvYXJiZW56L2V3cC9Mbm90ZXMvY2hhcHRlcjQucGRmXG52YXIgQ29tcGxleCA9IHJlcXVpcmUoJ0ByYXl5YW1oay9jb21wbGV4Jyk7XG5cbnZhciBNYXRyaXggPSByZXF1aXJlKCcuLi8uLicpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfU1FVQVJFX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfU1FVQVJFX01BVFJJWDtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBlaWdlbnZhbHVlcyBvZiBhbnkgc3F1YXJlIE1hdHJpeCB1c2luZyBRUiBBbGdvcml0aG0uPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSBlaWdlbnZhbHVlcyBjYW4gYmUgZWl0aGVyIHJlYWwgbnVtYmVyIG9yIGNvbXBsZXggbnVtYmVyLlxyXG4gKiBOb3RlIHRoYXQgYWxsIGVpZ2VudmFsdWVzIGFyZSBpbnN0YW5jZSBvZiBDb21wbGV4LFxyXG4gKiBmb3IgbW9yZSBkZXRhaWxzIHBsZWFzZSB2aXNpdCBbQ29tcGxleC5qc117QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL3JheXlhbWhrL0NvbXBsZXguanN9Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgZWlnZW52YWx1ZXMgYXJlIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge0NvbXBsZXhbXX0gQXJyYXkgb2YgZWlnZW52YWx1ZXNcclxuICovXG5cblxuZnVuY3Rpb24gZWlnZW52YWx1ZXMoKSB7XG4gIGlmICghdGhpcy5pc1NxdWFyZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfU1FVQVJFX01BVFJJWCk7XG4gIH1cblxuICBpZiAodGhpcy5fZWlnZW52YWx1ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLl9laWdlbnZhbHVlcztcbiAgfVxuXG4gIHZhciBzaXplID0gdGhpcy5zaXplKClbMF07XG4gIHZhciB2YWx1ZXMgPSBbXTtcbiAgdmFyIGRpZ2l0ID0gdGhpcy5fZGlnaXQ7XG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgZGlnaXQpICogMik7XG5cbiAgdmFyIGNsb25lID0gTWF0cml4LmNsb25lKHRoaXMpLl9tYXRyaXg7XG5cbiAgdmFyIGlzQ29udmVyZ2VudCA9IHRydWU7IC8vIGZsYWdcblxuICB2YXIgc2tpcCA9IGZhbHNlOyAvLyBUcmFuc2Zvcm0gbWF0cml4IHRvIEhlc3NlbmJlcmcgbWF0cml4XG5cbiAgSG91c2Vob2xkZXJUcmFuc2Zvcm0oY2xvbmUsIGRpZ2l0KTtcblxuICBmb3IgKHZhciBpID0gc2l6ZSAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICB2YXIgZGl2ZXJnZW5jZUNvdW50ID0gMDtcbiAgICB2YXIgcHJldiA9IHZvaWQgMDsgLy8gdXNlZCB0byBkZXRlcm1pbmUgY29udmVyZ2VuY2VcbiAgICAvLyBpZiBvYnRhaW5zIGNvbXBsZXggZWlnZW52YWx1ZXMgcGFpciBpbiBwcmV2aW91cyBpdGVyYXRpb24sIHNraXAgY3VycmVudCByb3VuZFxuXG4gICAgaWYgKHNraXApIHtcbiAgICAgIHNraXAgPSBmYWxzZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBzaGlmdCA9IGNsb25lW3NpemUgLSAxXVtzaXplIC0gMV07IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBpZiAoIWlzQ29udmVyZ2VudCkge1xuICAgICAgICAvLyBpZiB0aGUgY3VycmVudCBlaWdlbnZhbHVlIGlzIG5vdCByZWFsXG4gICAgICAgIHByZXYgPSBzaXplMkVpZ2VudmFsdWVzKGNsb25lW2kgLSAxXVtpIC0gMV0sIGNsb25lW2kgLSAxXVtpXSwgY2xvbmVbaV1baSAtIDFdLCBjbG9uZVtpXVtpXSkubWV0cmljO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaWYgdGhlIGN1cnJlbnQgZWlnZW52YWx1ZSBpcyByZWFsXG4gICAgICAgIHByZXYgPSBNYXRoLmFicyhjbG9uZVtpXVtpIC0gMV0pO1xuICAgICAgfSAvLyBhcHBseSBzaW5nbGUgc2hpZnRcblxuXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNpemU7IGorKykge1xuICAgICAgICBjbG9uZVtqXVtqXSAtPSBzaGlmdDtcbiAgICAgIH0gLy8gQXBwbHkgUVIgQWxnb3JpdGhtXG5cblxuICAgICAgSGVzc2VuYmVyZ1FSKGNsb25lLCBkaWdpdCk7XG5cbiAgICAgIGZvciAodmFyIF9qID0gMDsgX2ogPCBzaXplOyBfaisrKSB7XG4gICAgICAgIGNsb25lW19qXVtfal0gKz0gc2hpZnQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0NvbnZlcmdlbnQgJiYgcHJldiA8IE1hdGguYWJzKGNsb25lW2ldW2kgLSAxXSkpIHtcbiAgICAgICAgZGl2ZXJnZW5jZUNvdW50Kys7XG4gICAgICB9IC8vIGlmIHRoZSBjdXJyZW50IGVpZ2VudmFsdWUgaXMgcmVhbCBhbmQgdGhlIGVudHJ5IGlzIGFsbW9zdCBaRVJPID0+IGJyZWFrO1xuXG5cbiAgICAgIGlmIChpc0NvbnZlcmdlbnQgJiYgTWF0aC5hYnMoY2xvbmVbaV1baSAtIDFdKSA8IEVQU0lMT04pIHtcbiAgICAgICAgdmFsdWVzW2ldID0gbmV3IENvbXBsZXgoY2xvbmVbaV1baV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIH0gLy8gaWYgdGhlIGN1cnJlbnQgZWlnZW52YWx1ZXMgcGFpciBpcyBjb21wbGV4LCBpZiB0aGUgZGlmZmVyZW5jZSBvZiB0aGUgcHJldmlvdXMgZWlnYW52YWx1ZXMgYW5kIHRoZVxuICAgICAgLy8gZWlnZW52YWx1ZXMgb2Ygc3VibWF0cml4IGlzIGFsbW9zdCBaRVJPID0+IGJyZWFrXG5cblxuICAgICAgdmFyIF9zaXplMkVpZ2VudmFsdWVzID0gc2l6ZTJFaWdlbnZhbHVlcyhjbG9uZVtpIC0gMV1baSAtIDFdLCBjbG9uZVtpIC0gMV1baV0sIGNsb25lW2ldW2kgLSAxXSwgY2xvbmVbaV1baV0pLFxuICAgICAgICAgIG1ldHJpYyA9IF9zaXplMkVpZ2VudmFsdWVzLm1ldHJpYyxcbiAgICAgICAgICBlaWdlbjEgPSBfc2l6ZTJFaWdlbnZhbHVlcy5laWdlbjEsXG4gICAgICAgICAgZWlnZW4yID0gX3NpemUyRWlnZW52YWx1ZXMuZWlnZW4yO1xuXG4gICAgICBpZiAoIWlzQ29udmVyZ2VudCAmJiBNYXRoLmFicyhwcmV2IC0gbWV0cmljKSA8IEVQU0lMT04pIHtcbiAgICAgICAgaXNDb252ZXJnZW50ID0gdHJ1ZTsgLy8gcmUtaW5pdGlhbGl6ZVxuXG4gICAgICAgIHNraXAgPSB0cnVlO1xuICAgICAgICB2YXIgcmUxID0gZWlnZW4xLnJlLFxuICAgICAgICAgICAgaW0xID0gZWlnZW4xLmltO1xuICAgICAgICB2YXIgcmUyID0gZWlnZW4yLnJlLFxuICAgICAgICAgICAgaW0yID0gZWlnZW4yLmltO1xuICAgICAgICB2YWx1ZXNbaV0gPSBuZXcgQ29tcGxleChyZTEsIGltMSk7XG4gICAgICAgIHZhbHVlc1tpIC0gMV0gPSBuZXcgQ29tcGxleChyZTIsIGltMik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSAvLyBpZiB0aGUgZW50cnkgZG9lc24ndCBjb252ZXJnZSA9PiBjb21wbGV4IGVpZ2VudmFsdWVzIHBhaXJcblxuXG4gICAgICBpZiAoZGl2ZXJnZW5jZUNvdW50ID4gMykge1xuICAgICAgICBpc0NvbnZlcmdlbnQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoIXNraXApIHtcbiAgICB2YWx1ZXNbMF0gPSBuZXcgQ29tcGxleChjbG9uZVswXVswXSk7XG4gIH1cblxuICB0aGlzLl9laWdlbnZhbHVlcyA9IHZhbHVlcztcbiAgcmV0dXJuIHZhbHVlcztcbn1cblxuO1xuXG5mdW5jdGlvbiBIb3VzZWhvbGRlclRyYW5zZm9ybShBLCBkaWdpdCkge1xuICB2YXIgc2l6ZSA9IEEubGVuZ3RoO1xuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuXG4gIGZvciAodmFyIGogPSAwOyBqIDwgc2l6ZSAtIDI7IGorKykge1xuICAgIHZhciB4Tm9ybSA9IDA7XG4gICAgdmFyIHUgPSBuZXcgQXJyYXkoc2l6ZSAtIGogLSAxKTtcblxuICAgIGZvciAodmFyIGkgPSBqICsgMTsgaSA8IHNpemU7IGkrKykge1xuICAgICAgdmFyIGVudHJ5ID0gQVtpXVtqXTtcbiAgICAgIHhOb3JtICs9IE1hdGgucG93KGVudHJ5LCAyKTtcbiAgICAgIHVbaSAtIGogLSAxXSA9IGVudHJ5O1xuICAgIH1cblxuICAgIHhOb3JtID0gTWF0aC5zcXJ0KHhOb3JtKTtcblxuICAgIGlmIChNYXRoLmFicyh4Tm9ybSkgPCBFUFNJTE9OKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAodVswXSA+PSAwKSB7XG4gICAgICB1WzBdICs9IHhOb3JtO1xuICAgIH0gZWxzZSB7XG4gICAgICB1WzBdIC09IHhOb3JtO1xuICAgIH0gLy8gTWFrZSAndScgdW5pdCB2ZWN0b3JcblxuXG4gICAgdmFyIHVOb3JtID0gMDtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCB1Lmxlbmd0aDsgX2krKykge1xuICAgICAgdU5vcm0gKz0gTWF0aC5wb3codVtfaV0sIDIpO1xuICAgIH1cblxuICAgIHVOb3JtID0gTWF0aC5zcXJ0KHVOb3JtKTtcblxuICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IHUubGVuZ3RoOyBfaTIrKykge1xuICAgICAgdVtfaTJdIC89IHVOb3JtO1xuICAgIH0gLy8gdXBkYXRlIHRoZSBtYXRyaXgsIG11bHRpcGx5IFAgZnJvbSBsZWZ0XG5cblxuICAgIGZvciAodmFyIG4gPSBqOyBuIDwgc2l6ZTsgbisrKSB7XG4gICAgICAvLyBjb2x1bW5cbiAgICAgIHZhciB2ID0gbmV3IEFycmF5KHNpemUgLSBqIC0gMSk7XG5cbiAgICAgIGZvciAodmFyIG0gPSBqICsgMTsgbSA8IHNpemU7IG0rKykge1xuICAgICAgICB2W20gLSBqIC0gMV0gPSBBW21dW25dO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2NhbGVyID0gMDtcblxuICAgICAgZm9yICh2YXIgX20gPSAwOyBfbSA8IHYubGVuZ3RoOyBfbSsrKSB7XG4gICAgICAgIHNjYWxlciArPSB2W19tXSAqIHVbX21dO1xuICAgICAgfVxuXG4gICAgICBzY2FsZXIgKj0gMjtcblxuICAgICAgZm9yICh2YXIgX20yID0gaiArIDE7IF9tMiA8IHNpemU7IF9tMisrKSB7XG4gICAgICAgIC8vIHJvd1xuICAgICAgICBpZiAobiA9PT0gaiAmJiBfbTIgIT09IGogKyAxKSB7XG4gICAgICAgICAgQVtfbTJdW25dID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBBW19tMl1bbl0gPSB2W19tMiAtIGogLSAxXSAtIHNjYWxlciAqIHVbX20yIC0gaiAtIDFdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSAvLyB1cGRhdGUgdGhlIG1hdHJpeCwgbXVsdGlwbHkgUCBmcm9tIHJpZ2h0XG5cblxuICAgIGZvciAodmFyIF9tMyA9IDA7IF9tMyA8IHNpemU7IF9tMysrKSB7XG4gICAgICAvLyByb3dcbiAgICAgIHZhciBfdiA9IG5ldyBBcnJheShzaXplIC0gaiAtIDEpO1xuXG4gICAgICBmb3IgKHZhciBfbiA9IGogKyAxOyBfbiA8IHNpemU7IF9uKyspIHtcbiAgICAgICAgX3ZbX24gLSBqIC0gMV0gPSBBW19tM11bX25dO1xuICAgICAgfVxuXG4gICAgICB2YXIgX3NjYWxlciA9IDA7XG5cbiAgICAgIGZvciAodmFyIF9uMiA9IDA7IF9uMiA8IF92Lmxlbmd0aDsgX24yKyspIHtcbiAgICAgICAgX3NjYWxlciArPSBfdltfbjJdICogdVtfbjJdO1xuICAgICAgfVxuXG4gICAgICBfc2NhbGVyICo9IDI7XG5cbiAgICAgIGZvciAodmFyIF9uMyA9IGogKyAxOyBfbjMgPCBzaXplOyBfbjMrKykge1xuICAgICAgICAvLyBjb2x1bW5cbiAgICAgICAgQVtfbTNdW19uM10gPSBfdltfbjMgLSBqIC0gMV0gLSBfc2NhbGVyICogdVtfbjMgLSBqIC0gMV07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIEhlc3NlbmJlcmdRUihILCBkaWdpdCkge1xuICB2YXIgc2l6ZSA9IEgubGVuZ3RoO1xuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuICB2YXIgc2luY29zID0gbmV3IEFycmF5KHNpemUgLSAxKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemUgLSAxOyBpKyspIHtcbiAgICB2YXIgYSA9IEhbaV1baV07XG4gICAgdmFyIGMgPSBIW2kgKyAxXVtpXTtcbiAgICB2YXIgbm9ybSA9IE1hdGguc3FydChNYXRoLnBvdyhhLCAyKSArIE1hdGgucG93KGMsIDIpKTtcblxuICAgIGlmIChub3JtIDwgRVBTSUxPTikge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGNvcyA9IGEgLyBub3JtO1xuICAgIHZhciBzaW4gPSBjICogLTEgLyBub3JtO1xuICAgIHNpbmNvc1tpXSA9IFtzaW4sIGNvc107XG4gICAgdmFyIHJvdzEgPSBuZXcgQXJyYXkoc2l6ZSAtIGkpO1xuICAgIHZhciByb3cyID0gbmV3IEFycmF5KHNpemUgLSBpKTtcblxuICAgIGZvciAodmFyIGogPSBpOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICByb3cxW2ogLSBpXSA9IEhbaV1bal07XG4gICAgICByb3cyW2ogLSBpXSA9IEhbaSArIDFdW2pdO1xuICAgIH1cblxuICAgIGZvciAodmFyIF9qMiA9IGk7IF9qMiA8IHNpemU7IF9qMisrKSB7XG4gICAgICBIW2ldW19qMl0gPSBjb3MgKiByb3cxW19qMiAtIGldICsgc2luICogLTEgKiByb3cyW19qMiAtIGldO1xuXG4gICAgICBpZiAoaSA9PT0gX2oyKSB7XG4gICAgICAgIEhbaSArIDFdW19qMl0gPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgSFtpICsgMV1bX2oyXSA9IHNpbiAqIHJvdzFbX2oyIC0gaV0gKyBjb3MgKiByb3cyW19qMiAtIGldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIF9qMyA9IDA7IF9qMyA8IHNpemUgLSAxOyBfajMrKykge1xuICAgIGlmICghc2luY29zW19qM10pIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBfc2luY29zJF9qID0gX3NsaWNlZFRvQXJyYXkoc2luY29zW19qM10sIDIpLFxuICAgICAgICBfc2luID0gX3NpbmNvcyRfalswXSxcbiAgICAgICAgX2NvcyA9IF9zaW5jb3MkX2pbMV07XG5cbiAgICB2YXIgY29sMSA9IG5ldyBBcnJheShfajMgKyAyKTtcbiAgICB2YXIgY29sMiA9IG5ldyBBcnJheShfajMgKyAyKTtcblxuICAgIGZvciAodmFyIF9pMyA9IDA7IF9pMyA8PSBfajMgKyAxOyBfaTMrKykge1xuICAgICAgY29sMVtfaTNdID0gSFtfaTNdW19qM107XG4gICAgICBjb2wyW19pM10gPSBIW19pM11bX2ozICsgMV07XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2k0ID0gMDsgX2k0IDw9IF9qMyArIDE7IF9pNCsrKSB7XG4gICAgICBIW19pNF1bX2ozXSA9IGNvbDFbX2k0XSAqIF9jb3MgLSBjb2wyW19pNF0gKiBfc2luO1xuICAgICAgSFtfaTRdW19qMyArIDFdID0gY29sMVtfaTRdICogX3NpbiArIGNvbDJbX2k0XSAqIF9jb3M7XG4gICAgfVxuICB9XG59IC8vIGZpbmQgdGhlIGVpZ2VudmFsdWVzIG9mIDJ4MiBtYXRyaXhcblxuXG5mdW5jdGlvbiBzaXplMkVpZ2VudmFsdWVzKGUxMSwgZTEyLCBlMjEsIGUyMikge1xuICB2YXIgYiA9IChlMTEgKyBlMjIpICogLTE7XG4gIHZhciBjID0gZTExICogZTIyIC0gZTIxICogZTEyO1xuICB2YXIgZGVsdGEgPSBNYXRoLnBvdyhiLCAyKSAtIDQgKiBjO1xuICB2YXIgcmUxO1xuICB2YXIgaW0xO1xuICB2YXIgcmUyO1xuICB2YXIgaW0yO1xuXG4gIGlmIChkZWx0YSA+PSAwKSB7XG4gICAgaW0xID0gMDtcbiAgICBpbTIgPSAwO1xuXG4gICAgaWYgKGIgPj0gMCkge1xuICAgICAgcmUxID0gKGIgKiAtMSAtIE1hdGguc3FydChkZWx0YSkpIC8gMjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmUxID0gKGIgKiAtMSArIE1hdGguc3FydChkZWx0YSkpIC8gMjtcbiAgICB9XG5cbiAgICByZTIgPSBjIC8gcmUxO1xuICB9IGVsc2Uge1xuICAgIHJlMSA9IC1iIC8gMjtcbiAgICByZTIgPSByZTE7XG4gICAgaW0xID0gTWF0aC5zcXJ0KGRlbHRhICogLTEpIC8gMjtcbiAgICBpbTIgPSBpbTEgKiAtMTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbWV0cmljOiBNYXRoLnNxcnQoTWF0aC5wb3cocmUxLCAyKSArIE1hdGgucG93KGltMSwgMikpLFxuICAgIGVpZ2VuMToge1xuICAgICAgcmU6IHJlMSxcbiAgICAgIGltOiBpbTFcbiAgICB9LFxuICAgIGVpZ2VuMjoge1xuICAgICAgcmU6IHJlMixcbiAgICAgIGltOiBpbTJcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZWlnZW52YWx1ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBNYXRyaXggPSByZXF1aXJlKCcuLi8uLicpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfUF9OT1JNID0gX3JlcXVpcmUuSU5WQUxJRF9QX05PUk07XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgTWF0cml4IG5vcm0gb2YgYW55IE1hdHJpeCB3aXRoIHJlc3BlY3QgdG8gdGhlIGNob2ljZSBvZiBub3JtLjxicj48YnI+XHJcbiAqIFxyXG4gKiAxLW5vcm06IE1heGltdW0gYWJzb2x1dGUgY29sdW1uIHN1bSBvZiB0aGUgTWF0cml4Ljxicj5cclxuICogMi1ub3JtOiBUaGUgbGFyZ2VzdCBzaW5ndWxhciB2YWx1ZSBvZiBNYXRyaXguPGJyPlxyXG4gKiBJbmZpbml0eS1ub3JtOiBNYXhpbXVtIGFic29sdXRlIHJvdyBzdW0gb2YgdGhlIE1hdHJpeC48YnI+XHJcbiAqIEZyb2Jlbml1cy1ub3JtOiBFdWNsaWRlYW4gbm9ybSBpbnZsb3ZpbmcgYWxsIGVudHJpZXMuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSBub3JtcyBhcmUgbm90IGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHBhcmFtIHsoMXwyfEluZmluaXR5fCdGJyl9IHAgLSBUaGUgY2hvaWNlIG9mIE1hdHJpeCBub3JtXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBub3JtIG9mIHRoZSBNYXRyaXguXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIG5vcm0oKSB7XG4gIHZhciBwID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAyO1xuXG4gIHZhciBfdGhpcyRzaXplID0gdGhpcy5zaXplKCksXG4gICAgICBfdGhpcyRzaXplMiA9IF9zbGljZWRUb0FycmF5KF90aGlzJHNpemUsIDIpLFxuICAgICAgcm93ID0gX3RoaXMkc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfdGhpcyRzaXplMlsxXTtcblxuICBpZiAocCAhPT0gMSAmJiBwICE9PSAyICYmIHAgIT09IEluZmluaXR5ICYmIHAgIT09ICdGJykge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1BfTk9STSk7XG4gIH1cblxuICB2YXIgbWF0cml4ID0gdGhpcy5fbWF0cml4O1xuICB2YXIgcmVzdWx0ID0gMDtcblxuICBpZiAocCA9PT0gMSkge1xuICAgIC8vIG1heCBvZiBjb2x1bW4gc3VtXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2w7IGorKykge1xuICAgICAgdmFyIGNvbHVtblN1bSA9IDA7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93OyBpKyspIHtcbiAgICAgICAgY29sdW1uU3VtICs9IE1hdGguYWJzKG1hdHJpeFtpXVtqXSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb2x1bW5TdW0gPiByZXN1bHQpIHtcbiAgICAgICAgcmVzdWx0ID0gY29sdW1uU3VtO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0gLy8gbGFyZ2VzdCBzaW5ndWxhciB2YWx1ZVxuXG5cbiAgaWYgKHAgPT09IDIpIHtcbiAgICB2YXIgdHJhbnNwb3NlID0gTWF0cml4LnRyYW5zcG9zZSh0aGlzKTtcbiAgICB2YXIgTSA9IE1hdHJpeC5tdWx0aXBseSh0cmFuc3Bvc2UsIHRoaXMpO1xuICAgIHZhciBlaWdlbnZhbHVlcyA9IE0uZWlnZW52YWx1ZXMoKTtcblxuICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IGVpZ2VudmFsdWVzLmxlbmd0aDsgX2kyKyspIHtcbiAgICAgIHZhciB2YWx1ZSA9IGVpZ2VudmFsdWVzW19pMl0uZ2V0TW9kdWx1cygpO1xuXG4gICAgICBpZiAodmFsdWUgPiByZXN1bHQpIHtcbiAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGguc3FydChyZXN1bHQpO1xuICB9XG5cbiAgaWYgKHAgPT09IEluZmluaXR5KSB7XG4gICAgLy8gbWF4IG9mIHJvdyBzdW1cbiAgICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPCByb3c7IF9pMysrKSB7XG4gICAgICB2YXIgcm93U3VtID0gMDtcblxuICAgICAgZm9yICh2YXIgX2ogPSAwOyBfaiA8IGNvbDsgX2orKykge1xuICAgICAgICByb3dTdW0gKz0gTWF0aC5hYnMobWF0cml4W19pM11bX2pdKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJvd1N1bSA+IHJlc3VsdCkge1xuICAgICAgICByZXN1bHQgPSByb3dTdW07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSAvLyBGXG5cblxuICBmb3IgKHZhciBfaTQgPSAwOyBfaTQgPCByb3c7IF9pNCsrKSB7XG4gICAgZm9yICh2YXIgX2oyID0gMDsgX2oyIDwgY29sOyBfajIrKykge1xuICAgICAgcmVzdWx0ICs9IE1hdGgucG93KG1hdHJpeFtfaTRdW19qMl0sIDIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBNYXRoLnNxcnQocmVzdWx0KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBub3JtOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgbnVsbGl0eSBvZiBhbnkgTWF0cml4LCB3aGljaCBpcyB0aGUgZGltZW5zaW9uXHJcbiAqIG9mIHRoZSBudWxsc3BhY2UuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSBudWxsaXR5IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge251bWJlcn0gVGhlIG51bGxpdHkgb2YgdGhlIG1hdHJpeFxyXG4gKi9cbmZ1bmN0aW9uIG51bGxpdHkoKSB7XG4gIGlmICh0aGlzLl9udWxsaXR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5fbnVsbGl0eTtcbiAgfVxuXG4gIHZhciBjb2wgPSB0aGlzLnNpemUoKVsxXTtcbiAgdmFyIHJhbmsgPSB0aGlzLnJhbmsoKTtcbiAgdGhpcy5fbnVsbGl0eSA9IGNvbCAtIHJhbms7XG4gIHJldHVybiB0aGlzLl9udWxsaXR5O1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IG51bGxpdHk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBNYXRyaXggPSByZXF1aXJlKCcuLi8uLicpO1xuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIHJhbmsgb2YgYW55IE1hdHJpeCxcclxuICogd2hpY2ggaXMgdGhlIGRpbWVuc2lvbiBvZiB0aGUgcm93IHNwYWNlLjxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgcmFuayBpcyBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSByYW5rIG9mIHRoZSBNYXRyaXhcclxuICovXG5cblxuZnVuY3Rpb24gcmFuaygpIHtcbiAgaWYgKHRoaXMuX3JhbmsgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLl9yYW5rO1xuICB9XG5cbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCB0aGlzLl9kaWdpdCkgKiAyKTtcbiAgdmFyIFIgPSBNYXRyaXguUVIodGhpcylbMV07XG4gIHZhciBtYXRyaXhSID0gUi5fbWF0cml4O1xuXG4gIHZhciBfUiRzaXplID0gUi5zaXplKCksXG4gICAgICBfUiRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9SJHNpemUsIDIpLFxuICAgICAgcm93ID0gX1Ikc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfUiRzaXplMlsxXTtcblxuICBpZiAocm93ID09PSAwKSB7XG4gICAgdGhpcy5fcmFuayA9IDE7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICB2YXIgcmsgPSAwO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcm93OyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gaTsgaiA8IGNvbDsgaisrKSB7XG4gICAgICBpZiAoTWF0aC5hYnMobWF0cml4UltpXVtqXSkgPj0gRVBTSUxPTikge1xuICAgICAgICByaysrO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLl9yYW5rID0gcms7XG4gIHJldHVybiByaztcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSByYW5rOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgc2l6ZSBvZiBhbnkgTWF0cml4LFxyXG4gKiB3aGljaCBpcyBpbiB0aGUgZm9ybSBvZiBbcm93LCBjb2x1bW5dLjxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgc2l6ZSBvZiBNYXRyaXggaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyW119IFRoZSBudW1iZXIgb2Ygcm93cyBhbmQgY29sdW1ucyBvZiBhIE1hdHJpeFxyXG4gKi9cbmZ1bmN0aW9uIHNpemUoKSB7XG4gIGlmICh0aGlzLl9zaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuXG4gIHZhciBBID0gdGhpcy5fbWF0cml4O1xuXG4gIGlmIChBLmxlbmd0aCA9PT0gMCkge1xuICAgIHRoaXMuX3NpemUgPSBbMCwgMF07XG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gIH1cblxuICB0aGlzLl9zaXplID0gW0EubGVuZ3RoLCBBWzBdLmxlbmd0aF07XG4gIHJldHVybiB0aGlzLl9zaXplO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IHNpemU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9TUVVBUkVfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9TUVVBUkVfTUFUUklYO1xuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIHRyYWNlIG9mIGFueSBzcXVhcmUgTWF0cml4LFxyXG4gKiB3aGljaCBpcyB0aGUgc3VtIG9mIGFsbCBlbnRyaWVzIG9uIHRoZSBtYWluIGRpYWdvbmFsLjxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgdHJhY2UgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgdHJhY2Ugb2YgdGhlIHNxdWFyZSBNYXRyaXguXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIHRyYWNlKCkge1xuICB2YXIgaXNTcXVhcmUgPSB0aGlzLl9pc1NxdWFyZSAhPT0gdW5kZWZpbmVkID8gdGhpcy5faXNTcXVhcmUgOiB0aGlzLmlzU3F1YXJlKCk7XG5cbiAgaWYgKCFpc1NxdWFyZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1NRVUFSRV9NQVRSSVgpO1xuICB9XG5cbiAgaWYgKHRoaXMuX3RyYWNlICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5fdHJhY2U7XG4gIH1cblxuICB2YXIgQSA9IHRoaXMuX21hdHJpeDtcbiAgdmFyIHNpemUgPSBBLmxlbmd0aDtcbiAgdmFyIHRyID0gMDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIHRyICs9IEFbaV1baV07XG4gIH1cblxuICB0aGlzLl90cmFjZSA9IHRyO1xuICByZXR1cm4gdHI7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gdHJhY2U7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBNYXRyaXggaXMgZGlhZ29uYWwgb3Igbm90Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBEaWFnb25hbCBNYXRyaXggaXMgYSBNYXRyaXggaW4gd2hpY2ggdGhlIGVudHJpZXMgb3V0c2lkZSB0aGUgbWFpbiBkaWFnb25hbFxyXG4gKiBhcmUgYWxsIHplcm8uIE5vdGUgdGhhdCB0aGUgdGVybSBkaWFnb25hbCByZWZlcnMgdG8gcmVjdGFuZ3VsYXIgZGlhZ29uYWwuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSByZXN1bHQgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gW2RpZ2l0PThdIC0gTnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBydWUgaWYgdGhlIE1hdHJpeCBpcyBkaWFnb25hbCBNYXRyaXhcclxuICovXG5mdW5jdGlvbiBpc0RpYWdvbmFsKCkge1xuICB2YXIgZGlnaXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHRoaXMuX2RpZ2l0O1xuXG4gIGlmICh0aGlzLl9pc0RpYWdvbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5faXNEaWFnb25hbDtcbiAgfVxuXG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgZGlnaXQpICogMik7XG4gIHZhciBBID0gdGhpcy5fbWF0cml4O1xuXG4gIHZhciBfdGhpcyRzaXplID0gdGhpcy5zaXplKCksXG4gICAgICBfdGhpcyRzaXplMiA9IF9zbGljZWRUb0FycmF5KF90aGlzJHNpemUsIDIpLFxuICAgICAgcm93ID0gX3RoaXMkc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfdGhpcyRzaXplMlsxXTtcblxuICBpZiAocm93ID09PSAwKSB7XG4gICAgdGhpcy5faXNEaWFnb25hbCA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2w7IGorKykge1xuICAgICAgaWYgKGkgIT09IGogJiYgTWF0aC5hYnMoQVtpXVtqXSkgPj0gRVBTSUxPTikge1xuICAgICAgICB0aGlzLmlzRGlhZ29uYWwgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuX2lzRGlhZ29uYWwgPSB0cnVlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBpc0RpYWdvbmFsOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgTWF0cml4IGlzIGxvd2VyIHRyaWFuZ3VsYXIgTWF0cml4IG9yIG5vdC48YnI+PGJyPlxyXG4gKiBcclxuICogTG93ZXIgdHJpYW5ndWxhciBNYXRyaXggaXMgYSBNYXRyaXggaW4gd2hpY2ggYWxsIHRoZSBlbnRyaWVzXHJcbiAqIGFib3ZlIHRoZSBtYWluIGRpYWdvbmFsIGFyZSB6ZXJvLiBOb3RlIHRoYXQgaXQgY2FuIGJlIGFwcGxpZWRcclxuICogdG8gYW55IG5vbi1zcXVhcmUgTWF0cml4Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgcmVzdWx0IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHBhcmFtIHtudW1iZXJ9IFtkaWdpdD04XSAtIE51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHNcclxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgTWF0cml4IGlzIGxvd2VyIHRyaWFuZ3VsYXJcclxuICovXG5mdW5jdGlvbiBpc0xvd2VyVHJpYW5ndWxhcigpIHtcbiAgdmFyIGRpZ2l0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0aGlzLl9kaWdpdDtcblxuICBpZiAodGhpcy5faXNMb3dlclRyaWFuZ3VsYXIgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLl9pc0xvd2VyVHJpYW5ndWxhcjtcbiAgfVxuXG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgZGlnaXQpICogMik7XG4gIHZhciBBID0gdGhpcy5fbWF0cml4O1xuXG4gIHZhciBfdGhpcyRzaXplID0gdGhpcy5zaXplKCksXG4gICAgICBfdGhpcyRzaXplMiA9IF9zbGljZWRUb0FycmF5KF90aGlzJHNpemUsIDIpLFxuICAgICAgcm93ID0gX3RoaXMkc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfdGhpcyRzaXplMlsxXTtcblxuICBpZiAocm93ID09PSAwKSB7XG4gICAgLy8gW11cbiAgICB0aGlzLl9pc0xvd2VyVHJpYW5ndWxhciA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IGkgKyAxOyBqIDwgY29sOyBqKyspIHtcbiAgICAgIGlmIChNYXRoLmFicyhBW2ldW2pdKSA+PSBFUFNJTE9OKSB7XG4gICAgICAgIHRoaXMuX2lzTG93ZXJUcmlhbmd1bGFyID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLl9pc0xvd2VyVHJpYW5ndWxhciA9IHRydWU7XG4gIHJldHVybiB0cnVlO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGlzTG93ZXJUcmlhbmd1bGFyOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgc3F1YXJlIE1hdHJpeCBpcyBvcnRob2dvbmFsIG9yIG5vdC48YnI+PGJyPlxyXG4gKiBcclxuICogT3J0aG9nb25hbCBNYXRyaXggaXMgYSBNYXRyaXggaW4gd2hpY2ggYWxsIHJvd3MgYW5kIGNvbHVtbnMgYXJlXHJcbiAqIG9ydGhvbm9ybWFsIHZlY3RvcnMuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSByZXN1bHQgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gW2RpZ2l0PThdIC0gTnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBzcXVhcmUgTWF0cml4IGlzIG9ydGhvZ29uYWxcclxuICovXG5mdW5jdGlvbiBpc09ydGhvZ29uYWwoKSB7XG4gIHZhciBkaWdpdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdGhpcy5fZGlnaXQ7XG5cbiAgaWYgKHRoaXMuX2lzT3J0aG9nb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzT3J0aG9nb25hbDtcbiAgfVxuXG4gIGlmICghdGhpcy5pc1NxdWFyZSgpKSB7XG4gICAgdGhpcy5faXNPcnRob2dvbmFsID0gZmFsc2U7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIEEgPSB0aGlzLl9tYXRyaXg7XG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgZGlnaXQpICogMik7XG4gIHZhciBzaXplID0gQS5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gaTsgaiA8IHNpemU7IGorKykge1xuICAgICAgdmFyIGVudHJ5ID0gMDtcblxuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBzaXplOyBrKyspIHtcbiAgICAgICAgZW50cnkgKz0gQVtpXVtrXSAqIEFbal1ba107XG4gICAgICB9XG5cbiAgICAgIGlmIChpID09PSBqICYmIE1hdGguYWJzKGVudHJ5IC0gMSkgPj0gRVBTSUxPTikge1xuICAgICAgICB0aGlzLl9pc09ydGhvZ29uYWwgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoaSAhPT0gaiAmJiBNYXRoLmFicyhlbnRyeSkgPj0gRVBTSUxPTikge1xuICAgICAgICB0aGlzLl9pc09ydGhvZ29uYWwgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuX2lzT3J0aG9nb25hbCA9IHRydWU7XG4gIHJldHVybiB0cnVlO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGlzT3J0aG9nb25hbDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIERldGVybWluZXMgd2hldGhlciBhIHNxdWFyZSBNYXRyaXggaXMgc2tldyBzeW1tZXRyaWMgb3Igbm90Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBTa2V3IHN5bW1ldHJpYyBNYXRyaXggaXMgYSBzcXVhcmUgTWF0cml4IHdob3NlIHRyYW5zcG9zZSBlcXVhbHMgaXRzIG5lZ2F0aXZlLjxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgcmVzdWx0IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHBhcmFtIHtudW1iZXJ9IFtkaWdpdD04XSAtIE51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHNcclxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgc3F1YXJlIE1hdHJpeCBpcyBza2V3IHN5bW1ldHJpY1xyXG4gKi9cbmZ1bmN0aW9uIGlzU2tld1N5bW1ldHJpYygpIHtcbiAgdmFyIGRpZ2l0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0aGlzLl9kaWdpdDtcblxuICBpZiAodGhpcy5faXNTa2V3U3ltbWV0cmljICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5faXNTa2V3U3ltbWV0cmljO1xuICB9XG5cbiAgaWYgKCF0aGlzLmlzU3F1YXJlKCkpIHtcbiAgICB0aGlzLl9pc1NrZXdTeW1tZXRyaWMgPSBmYWxzZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgQSA9IHRoaXMuX21hdHJpeDtcbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBkaWdpdCkgKiAyKTtcbiAgdmFyIHNpemUgPSBBLmxlbmd0aDtcblxuICBpZiAoc2l6ZSA9PT0gMCkge1xuICAgIHRoaXMuX2lzU2tld1N5bW1ldHJpYyA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7IC8vIFtdXG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgaTsgaisrKSB7XG4gICAgICBpZiAoTWF0aC5hYnMoQVtpXVtqXSArIEFbal1baV0pID49IEVQU0lMT04pIHtcbiAgICAgICAgdGhpcy5faXNTa2V3U3ltbWV0cmljID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLl9pc1NrZXdTeW1tZXRyaWMgPSB0cnVlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBpc1NrZXdTeW1tZXRyaWM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBNYXRyaXggaXMgc3F1YXJlIG9yIG5vdC48YnI+PGJyPlxyXG4gKiBcclxuICogU3F1YXJlIE1hdHJpeCBpcyBhIE1hdHJpeCB3aXRoIHNhbWUgbnVtYmVyIG9mIHJvd3MgYW5kIGNvbHVtbnMuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSByZXN1bHQgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBNYXRyaXggaXMgc3F1YXJlXHJcbiAqL1xuZnVuY3Rpb24gaXNTcXVhcmUoKSB7XG4gIGlmICh0aGlzLl9pc1NxdWFyZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzU3F1YXJlO1xuICB9XG5cbiAgdmFyIEEgPSB0aGlzLl9tYXRyaXg7XG5cbiAgaWYgKEEubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gMHgwIG1hdHJpeFxuICAgIHRoaXMuX2lzU3F1YXJlID0gdHJ1ZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHRoaXMuX2lzU3F1YXJlID0gQS5sZW5ndGggPT09IEFbMF0ubGVuZ3RoO1xuICByZXR1cm4gdGhpcy5faXNTcXVhcmU7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gaXNTcXVhcmU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBzcXVhcmUgTWF0cml4IGlzIHN5bW1ldHJpYyBvciBub3QuPGJyPjxicj5cclxuICogXHJcbiAqIFN5bW1ldHJpYyBNYXRyaXggaXMgYSBzcXVhcmUgTWF0cml4IHRoYXQgaXMgZXF1YWwgdG8gaXRzIHRyYW5zcG9zZS48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIHJlc3VsdCBpcyBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbZGlnaXQ9OF0gLSBOdW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIHNxdWFyZSBNYXRyaXggaXMgc3ltbWV0cmljXHJcbiAqL1xuZnVuY3Rpb24gaXNTeW1tZXRyaWMoKSB7XG4gIHZhciBkaWdpdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdGhpcy5fZGlnaXQ7XG5cbiAgaWYgKHRoaXMuX2lzU3ltbWV0cmljICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5faXNTeW1tZXRyaWM7XG4gIH1cblxuICBpZiAoIXRoaXMuaXNTcXVhcmUoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBBID0gdGhpcy5fbWF0cml4O1xuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuICB2YXIgc2l6ZSA9IEEubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPD0gaTsgaisrKSB7XG4gICAgICBpZiAoTWF0aC5hYnMoQVtpXVtqXSAtIEFbal1baV0pID49IEVQU0lMT04pIHtcbiAgICAgICAgdGhpcy5faXNTeW1tZXRyaWMgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuX2lzU3ltbWV0cmljID0gdHJ1ZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gaXNTeW1tZXRyaWM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBNYXRyaXggaXMgdXBwZXIgdHJpYW5ndWxhciBNYXRyaXggb3Igbm90Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBVcHBlciB0cmlhbmd1bGFyIE1hdHJpeCBpcyBhIE1hdHJpeCBpbiB3aGljaCBhbGwgdGhlIGVudHJpZXMgYmVsb3cgdGhlXHJcbiAqIG1haW4gZGlhZ29uYWwgYXJlIHplcm8uIE5vdGUgdGhhdCBpdCBjYW4gYmUgYXBwbGllZCB0byBhbnkgbm9uLXNxdWFyZSBNYXRyaXguPGJyPjxicj5cclxuICogIFxyXG4gKiBUaGUgcmVzdWx0IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHBhcmFtIHtudW1iZXJ9IFtkaWdpdD04XSAtIE51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHNcclxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgTWF0cml4IGlzIHVwcGVyIHRyaWFuZ3VsYXJcclxuICovXG5mdW5jdGlvbiBpc1VwcGVyVHJpYW5ndWxhcigpIHtcbiAgdmFyIGRpZ2l0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0aGlzLl9kaWdpdDtcblxuICBpZiAodGhpcy5faXNVcHBlclRyaWFuZ3VsYXIgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLl9pc1VwcGVyVHJpYW5ndWxhcjtcbiAgfVxuXG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgZGlnaXQpICogMik7XG4gIHZhciBBID0gdGhpcy5fbWF0cml4O1xuXG4gIHZhciBfdGhpcyRzaXplID0gdGhpcy5zaXplKCksXG4gICAgICBfdGhpcyRzaXplMiA9IF9zbGljZWRUb0FycmF5KF90aGlzJHNpemUsIDIpLFxuICAgICAgcm93ID0gX3RoaXMkc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfdGhpcyRzaXplMlsxXTtcblxuICBpZiAocm93ID09PSAwKSB7XG4gICAgLy8gW11cbiAgICB0aGlzLl9pc1VwcGVyVHJpYW5ndWxhciA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2w7IGorKykge1xuICAgICAgaWYgKGkgPD0gaikge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKE1hdGguYWJzKEFbaV1bal0pID49IEVQU0lMT04pIHtcbiAgICAgICAgdGhpcy5faXNVcHBlclRyaWFuZ3VsYXIgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuX2lzVXBwZXJUcmlhbmd1bGFyID0gdHJ1ZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gaXNVcHBlclRyaWFuZ3VsYXI7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWDtcbi8qKlxyXG4gKiBDcmVhdGVzIGEgY29weSBvZiBNYXRyaXguIE5vdGUgdGhhdCBpdCByZXNldHMgdGhlIGNhY2hlZCBkYXRhLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgTWF0cml4XHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IENvcHkgb2YgQVxyXG4gKi9cblxuXG5mdW5jdGlvbiBjbG9uZShBKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIG1hdHJpeCA9IEEuX21hdHJpeDtcbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUocm93LCBjb2wsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgcmV0dXJuIG1hdHJpeFtpXVtqXTtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gY2xvbmU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9ST1dfQ09MID0gX3JlcXVpcmUuSU5WQUxJRF9ST1dfQ09MLFxuICAgIE9WRVJGTE9XX0NPTFVNTiA9IF9yZXF1aXJlLk9WRVJGTE9XX0NPTFVNTixcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYO1xuLyoqXHJcbiAqIEdldHMgdGhlIGNvbHVtbiBvZiBhIE1hdHJpeCB3aXRoIHZhbGlkIGluZGV4LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgTWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIEFueSB2YWxpZCBjb2x1bW4gaW5kZXhcclxuICogQHJldHVybnMge01hdHJpeH0gQ29sdW1uIG9mIEFcclxuICovXG5cblxuZnVuY3Rpb24gY29sdW1uKEEsIGluZGV4KSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIU51bWJlci5pc0ludGVnZXIoaW5kZXgpIHx8IGluZGV4IDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1JPV19DT0wpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBjID0gX0Ekc2l6ZTJbMV07XG5cbiAgaWYgKGluZGV4ID49IGMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfQ09MVU1OKTtcbiAgfVxuXG4gIHZhciBtYXRyaXggPSBBLl9tYXRyaXg7XG4gIHJldHVybiB0aGlzLmdlbmVyYXRlKHIsIDEsIGZ1bmN0aW9uIChpKSB7XG4gICAgcmV0dXJuIG1hdHJpeFtpXVtpbmRleF07XG4gIH0pO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGNvbHVtbjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIE1hdHJpeCA9IHJlcXVpcmUoJy4uLy4uJyk7XG5cbnZhciBpc051bWJlciA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvaXNOdW1iZXInKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX0FSUkFZID0gX3JlcXVpcmUuSU5WQUxJRF9BUlJBWSxcbiAgICBFWFBFQ1RFRF9BUlJBWV9PRl9OVU1CRVJTX09SX01BVFJJQ0VTID0gX3JlcXVpcmUuRVhQRUNURURfQVJSQVlfT0ZfTlVNQkVSU19PUl9NQVRSSUNFUyxcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVg7XG4vKipcclxuICogR2VuZXJhdGVzIGRpYWdvbmFsIE1hdHJpeCBpZiB0aGUgYXJndW1lbnQgaXMgYW4gYXJyYXkgb2YgbnVtYmVycyxcclxuICogZ2VuZXJhdGVzIGJsb2NrIGRpYWdvbmFsIE1hdHJpeCBpZiB0aGUgYXJndW1lbnQgaXMgYW4gYXJyYXkgb2YgTWF0cmljZXMuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0geyhudW1iZXJbXXxNYXRyaXhbXSl9IHZhbHVlcyAtIEFycmF5IG9mIG51bWJlcnMgb3IgTWF0cmljZXNcclxuICogQHJldHVybnMge01hdHJpeH0gQmxvY2sgZGlhZ29uYWwgTWF0cml4XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGRpYWcodmFsdWVzKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfQVJSQVkpO1xuICB9XG5cbiAgdmFyIGFyZ3NOdW0gPSB2YWx1ZXMubGVuZ3RoO1xuICB2YXIgdmFyaWFudDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3NOdW07IGkrKykge1xuICAgIHZhciBlbnRyeSA9IHZhbHVlc1tpXTtcblxuICAgIGlmICghaXNOdW1iZXIoZW50cnkpICYmICEoZW50cnkgaW5zdGFuY2VvZiBNYXRyaXgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoRVhQRUNURURfQVJSQVlfT0ZfTlVNQkVSU19PUl9NQVRSSUNFUyk7XG4gICAgfVxuXG4gICAgaWYgKGlzTnVtYmVyKGVudHJ5KSkge1xuICAgICAgaWYgKCF2YXJpYW50KSB7XG4gICAgICAgIHZhcmlhbnQgPSAnbnVtYmVyJztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh2YXJpYW50ICE9PSAnbnVtYmVyJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVhQRUNURURfQVJSQVlfT0ZfTlVNQkVSU19PUl9NQVRSSUNFUyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghZW50cnkuaXNTcXVhcmUoKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9TUVVBUkVfTUFUUklYKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF2YXJpYW50KSB7XG4gICAgICAgIHZhcmlhbnQgPSAnc3F1YXJlJztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh2YXJpYW50ICE9PSAnc3F1YXJlJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVhQRUNURURfQVJSQVlfT0ZfTlVNQkVSU19PUl9NQVRSSUNFUyk7XG4gICAgICB9XG4gICAgfVxuICB9IC8vIEhFUkU6IHZhcmlhbnQgc2hvdWxkIGJlIGVpdGhlciAnbnVtYmVyJyBvciAnc3F1YXJlJ1xuXG5cbiAgaWYgKHZhcmlhbnQgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIE1hdHJpeC5nZW5lcmF0ZShhcmdzTnVtLCBhcmdzTnVtLCBmdW5jdGlvbiAoaSwgaikge1xuICAgICAgaWYgKGkgPT09IGopIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlc1tpXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG4gIH0gLy8gR3VhcmFudGVlZCB0aGF0IFt2YWx1ZXNdIGlzIGEgbGlzdCBvZiBzcXVhcmUgbWF0cmljZXNcblxuXG4gIHZhciBzaXplID0gMDtcbiAgdmFyIHRlbXAgPSBuZXcgQXJyYXkoYXJnc051bSk7XG5cbiAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3NOdW07IF9pKyspIHtcbiAgICB2YXIgX2xlbiA9IHZhbHVlc1tfaV0uc2l6ZSgpWzBdO1xuXG4gICAgc2l6ZSArPSBfbGVuO1xuICAgIHRlbXBbX2ldID0gX2xlbjtcbiAgfVxuXG4gIHZhciBpZHggPSAwO1xuICB2YXIgc3RhcnQgPSAwO1xuICB2YXIgbGVuID0gdGVtcFtpZHhdO1xuICByZXR1cm4gTWF0cml4LmdlbmVyYXRlKHNpemUsIHNpemUsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgaWYgKGkgLSBzdGFydCA9PT0gbGVuICYmIGogLSBzdGFydCA9PT0gbGVuKSB7XG4gICAgICBzdGFydCArPSBsZW47XG4gICAgICBpZHgrKztcbiAgICB9XG5cbiAgICB2YXIgaXRoID0gaSAtIHN0YXJ0OyAvLyBpdGggPCAwIGlmIGJlbG93IG1haW4gZGlhZ29uYWxcblxuICAgIHZhciBqdGggPSBqIC0gc3RhcnQ7IC8vIGp0aCA8IDAgaWYgYWJvdmUgbWFpbiBkaWFnb25hbFxuICAgIC8vIHNraXAgMHgwIG1hdHJpY2VzXG5cbiAgICBsZW4gPSB0ZW1wW2lkeF07XG5cbiAgICB3aGlsZSAobGVuID09PSAwKSB7XG4gICAgICBpZHgrKztcbiAgICAgIGxlbiA9IHRlbXBbaWR4XTtcbiAgICB9XG5cbiAgICBpZiAoaXRoIDwgbGVuICYmIGl0aCA+PSAwICYmIGp0aCA8IGxlbiAmJiBqdGggPj0gMCkge1xuICAgICAgcmV0dXJuIHZhbHVlc1tpZHhdLl9tYXRyaXhbaXRoXVtqdGhdO1xuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBkaWFnOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogVGhpcyBjYWxsYmFjayBhcHBsaWVzIG9uIGVhY2ggZW50cnkgb2YgYSBNYXRyaXhcclxuICogQGNhbGxiYWNrIGVudHJ5Q2FsbGJhY2tcclxuICogQHBhcmFtIHtudW1iZXJ9IGVudHJ5IC0gRW50cnkgb2YgYSBNYXRyaXhcclxuICogQHJldHVybnMge251bWJlcn0gTmV3IGVudHJ5IHZhbHVlXHJcbiAqL1xuXG4vKipcclxuICogQXBwbHlzIGEgZnVuY3Rpb24gb3ZlciBlYWNoIGVudHJ5IG9mIGEgTWF0cml4IGFuZCByZXR1cm5zXHJcbiAqIGEgbmV3IGNvcHkgb2YgdGhlIG5ldyBNYXRyaXguXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBNYXRyaXhcclxuICogQHBhcmFtIHtlbnRyeUNhbGxiYWNrfSBjYiAtIENhbGxiYWNrIGZ1bmN0aW9uIHdoaWNoIGFwcGxpZXMgb24gZWFjaCBlbnRyeSBvZiBBXHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IEEgY29weSBvZiBuZXcgTWF0cml4XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGVsZW1lbnR3aXNlKEEsIGNiKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIG1hdHJpeCA9IEEuX21hdHJpeDtcbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUocm93LCBjb2wsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgcmV0dXJuIGNiKG1hdHJpeFtpXVtqXSk7XG4gIH0pO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGVsZW1lbnR3aXNlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfUk9XX0NPTCA9IF9yZXF1aXJlLklOVkFMSURfUk9XX0NPTCxcbiAgICBPVkVSRkxPV19JTkRFWCA9IF9yZXF1aXJlLk9WRVJGTE9XX0lOREVYO1xuLyoqXHJcbiAqIEdldHMgdGhlIGVudHJ5IG9mIGEgTWF0cml4LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gcm93IC0gQW55IHZhbGlkIHJvdyBpbmRleFxyXG4gKiBAcGFyYW0ge251bWJlcn0gY29sIC0gQW55IHZhbGlkIGNvbHVtbiBpbmRleFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBFbnRyeSBvZiB0aGUgTWF0cml4XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGVudHJ5KHJvdywgY29sKSB7XG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihyb3cpIHx8IHJvdyA8IDAgfHwgIU51bWJlci5pc0ludGVnZXIoY29sKSB8fCBjb2wgPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUk9XX0NPTCk7XG4gIH1cblxuICB2YXIgQSA9IHRoaXMuX21hdHJpeDtcblxuICB2YXIgX3RoaXMkc2l6ZSA9IHRoaXMuc2l6ZSgpLFxuICAgICAgX3RoaXMkc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfdGhpcyRzaXplLCAyKSxcbiAgICAgIHIgPSBfdGhpcyRzaXplMlswXSxcbiAgICAgIGMgPSBfdGhpcyRzaXplMlsxXTtcblxuICBpZiAocm93ID49IHIgfHwgY29sID49IGMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfSU5ERVgpO1xuICB9XG5cbiAgcmV0dXJuIEFbcm93XVtjb2xdO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGVudHJ5OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZW1wdHkgPSByZXF1aXJlKCcuLi8uLi91dGlsL2VtcHR5Jyk7XG4vKipcclxuICogVGhpcyBjYWxsYmFjayBnZW5lcmF0ZXMgZWFjaCBlbnRyeSBvZiBhIE1hdHJpeFxyXG4gKiBAY2FsbGJhY2sgZ2VuZXJhdGVDYWxsYmFja1xyXG4gKiBAcGFyYW0ge251bWJlcn0gaSAtIFRoZSBpLXRoIHJvdyBvZiBNYXRyaXggXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBqIC0gVGhlIGotdGggY29sdW1uIG9mIE1hdHJpeCBcclxuICogQHJldHVybnMge251bWJlcn0gRW50cnkgb2YgTWF0cml4XHJcbiAqL1xuXG4vKipcclxuICogR2VuZXJhdGVzIGEgTWF0cml4IHdoaWNoIGVudHJpZXMgYXJlIHRoZSByZXR1cm5lZCB2YWx1ZSBvZiBjYWxsYmFjayBmdW5jdGlvbi5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSByb3cgLSBOdW1iZXIgb2Ygcm93cyBvZiBNYXRyaXhcclxuICogQHBhcmFtIHtudW1iZXJ9IGNvbCAtIE51bWJlciBvZiBjb2x1bW5zIG9mIE1hdHJpeFxyXG4gKiBAcGFyYW0ge2dlbmVyYXRlQ2FsbGJhY2t9IGNiIC0gQ2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggdGFrZXMgcm93IGFuZCBjb2x1bW4gYXMgYXJndW1lbnRzXHJcbiAqIGFuZCBnZW5lcmF0ZXMgdGhlIGNvcnJlc3BvbmRpbmcgZW50cnlcclxuICogQHJldHVybnMge01hdHJpeH0gLSBHZW5lcmF0ZWQgTWF0cml4XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGdlbmVyYXRlKHJvdywgY29sLCBjYikge1xuICB2YXIgbWF0cml4ID0gZW1wdHkocm93LCBjb2wpO1xuXG4gIGlmIChyb3cgPT09IDAgfHwgY29sID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzKFtdKTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcm93OyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbDsgaisrKSB7XG4gICAgICBtYXRyaXhbaV1bal0gPSBjYihpLCBqKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMobWF0cml4KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYO1xuLyoqXHJcbiAqIEdldHMgdGhlIGVudHJpZXMgb24gdGhlIG1haW4gZGlhZ29uYWwuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBNYXRyaXhcclxuICogQHJldHVybnMge251bWJlcltdfSBBcnJheSBvZiBlbnRyaWVzIG9mIEEgb24gdGhlIG1haW4gZGlhZ29uYWxcclxuICovXG5cblxuZnVuY3Rpb24gZ2V0RGlhZyhBKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIHNpemUgPSBNYXRoLm1pbihyb3csIGNvbCk7XG4gIHZhciBtYXRyaXggPSBBLl9tYXRyaXg7XG4gIHZhciBkaWFncyA9IG5ldyBBcnJheShzaXplKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIGRpYWdzW2ldID0gbWF0cml4W2ldW2ldO1xuICB9XG5cbiAgcmV0dXJuIGRpYWdzO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGdldERpYWc7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gTWF0cml4LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtudW1iZXJ9IHJvdyAtIE51bWJlciBvZiByb3dzIG9mIGEgTWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2wgLSBOdW1iZXIgb2YgY29sdW1ucyBvZiBhIE1hdHJpeFxyXG4gKiBAcGFyYW0ge251bWJlcn0gbWluIC0gTG93ZXIgYm91bmQgb2YgZWFjaCBlbnRyeVxyXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4IC0gVXBwZXIgYm91bmQgb2YgZWFjaCBlbnRyeVxyXG4gKiBAcGFyYW0ge251bWJlcn0gdG9GaXhlZCAtIE51bWJlciBvZiBkZWNpbWFsIHBsYWNlc1xyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBHZW5lcmF0ZWQgcmFuZG9tIE1hdHJpeFxyXG4gKi9cbmZ1bmN0aW9uIGdldFJhbmRvbU1hdHJpeChyb3csIGNvbCkge1xuICB2YXIgbWluID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAwO1xuICB2YXIgbWF4ID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiAxO1xuICB2YXIgdG9GaXhlZCA9IGFyZ3VtZW50cy5sZW5ndGggPiA0ICYmIGFyZ3VtZW50c1s0XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzRdIDogMDtcbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUocm93LCBjb2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlRmxvYXQoKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbikudG9GaXhlZCh0b0ZpeGVkKSk7XG4gIH0pO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGdldFJhbmRvbU1hdHJpeDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIEdlbmVyYXRlcyBpZGVudGl0eSBNYXRyaXggd2l0aCBnaXZlbiBzaXplLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtudW1iZXJ9IHNpemUgLSBUaGUgc2l6ZSBvZiBNYXRyaXhcclxuICogQHJldHVybnMge01hdHJpeH0gSWRlbnRpdHkgTWF0cml4XHJcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkoc2l6ZSkge1xuICByZXR1cm4gdGhpcy5nZW5lcmF0ZShzaXplLCBzaXplLCBmdW5jdGlvbiAoaSwgaikge1xuICAgIGlmIChpID09PSBqKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gaWRlbnRpdHk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWDtcbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdHdvIE1hdHJpY2VzIGFyZSBjb25zaWRlcmVkIGFzIGVxdWFsLjxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgdGVzdCBjcml0ZXJpb24gaXMgTWF0aC5hYnMoeCAtIHkpIDwgMSAvICgxMCAqKiBkaWdpdCAqIDIpLlxyXG4gKiBGb3IgZGVmYXVsdCB2YWx1ZSA1LCBpdCBzaG91bGQgYmUgNWUtNS5cclxuICogVGhhdCBtZWFucyBpZiB0aGUgZGlmZmVyZW5jZSBvZiB0d28gbnVtYmVycyBpcyBsZXNzIHRoYW4gNWUtNSxcclxuICogdGhleSBhcmUgY29uc2lkZXJlZCBhcyBzYW1lIHZhbHVlLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgTWF0cml4XHJcbiAqIEBwYXJhbSB7TWF0cml4fSBCIC0gQW55IE1hdHJpeFxyXG4gKiBAcGFyYW0ge251bWJlcn0gZGlnaXQgLSBOdW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdHdvIE1hdHJpY2VzIGFyZSBjb25zaWRlcmVkIGFzIHNhbWVcclxuICovXG5cblxuZnVuY3Rpb24gaXNFcXVhbChBLCBCKSB7XG4gIHZhciBkaWdpdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogNTtcblxuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykgfHwgIShCIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICBBcm93ID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBBY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIF9CJHNpemUgPSBCLnNpemUoKSxcbiAgICAgIF9CJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ikc2l6ZSwgMiksXG4gICAgICBCcm93ID0gX0Ikc2l6ZTJbMF0sXG4gICAgICBCY29sID0gX0Ikc2l6ZTJbMV07XG5cbiAgaWYgKEFyb3cgIT09IEJyb3cgfHwgQWNvbCAhPT0gQmNvbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBFUElTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuICB2YXIgbWF0cml4QSA9IEEuX21hdHJpeDtcbiAgdmFyIG1hdHJpeEIgPSBCLl9tYXRyaXg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBBcm93OyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IEFjb2w7IGorKykge1xuICAgICAgaWYgKE1hdGguYWJzKG1hdHJpeEFbaV1bal0gLSBtYXRyaXhCW2ldW2pdKSA+PSBFUElTSUxPTikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gaXNFcXVhbDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX1JPV19DT0wgPSBfcmVxdWlyZS5JTlZBTElEX1JPV19DT0wsXG4gICAgT1ZFUkZMT1dfUk9XID0gX3JlcXVpcmUuT1ZFUkZMT1dfUk9XLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogR2V0cyB0aGUgcm93IG9mIGEgTWF0cml4IHdpdGggdmFsaWQgaW5kZXguXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBNYXRyaXhcclxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gQW55IHZhbGlkIHJvdyBpbmRleFxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBSb3cgb2YgQVxyXG4gKi9cblxuXG5mdW5jdGlvbiByb3coQSwgaW5kZXgpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihpbmRleCkgfHwgaW5kZXggPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUk9XX0NPTCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHIgPSBfQSRzaXplMlswXSxcbiAgICAgIGMgPSBfQSRzaXplMlsxXTtcblxuICBpZiAoaW5kZXggPj0gcikge1xuICAgIHRocm93IG5ldyBFcnJvcihPVkVSRkxPV19ST1cpO1xuICB9XG5cbiAgdmFyIG1hdHJpeCA9IEEuX21hdHJpeDtcbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUoMSwgYywgZnVuY3Rpb24gKGksIGopIHtcbiAgICByZXR1cm4gbWF0cml4W2luZGV4XVtqXTtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gcm93OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWCxcbiAgICBFWFBFQ1RFRF9TVFJJTkdfTlVNQkVSX0FUX1BPU18xXzIgPSBfcmVxdWlyZS5FWFBFQ1RFRF9TVFJJTkdfTlVNQkVSX0FUX1BPU18xXzIsXG4gICAgSU5WQUxJRF9ST1cgPSBfcmVxdWlyZS5JTlZBTElEX1JPVyxcbiAgICBJTlZBTElEX0NPTFVNTiA9IF9yZXF1aXJlLklOVkFMSURfQ09MVU1OLFxuICAgIE9WRVJGTE9XX1JPVyA9IF9yZXF1aXJlLk9WRVJGTE9XX1JPVyxcbiAgICBJTlZBTElEX1JPV1NfRVhQUkVTU0lPTiA9IF9yZXF1aXJlLklOVkFMSURfUk9XU19FWFBSRVNTSU9OLFxuICAgIElOVkFMSURfQ09MVU1OU19FWFBSRVNTSU9OID0gX3JlcXVpcmUuSU5WQUxJRF9DT0xVTU5TX0VYUFJFU1NJT04sXG4gICAgT1ZFUkZMT1dfQ09MVU1OID0gX3JlcXVpcmUuT1ZFUkZMT1dfQ09MVU1OO1xuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIHN1Ym1hdHJpeCBvZiBhIG1hdHJpeC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IG1hdHJpeFxyXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IHJvd3MgLSBSb3dzIGV4cHJlc3Npb25cclxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBjb2xzIC0gQ29sdW1ucyBleHByZXNzaW9uXHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IFN1Ym1hdHJpeCBvZiBBXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIHN1Ym1hdHJpeChBLCByb3dzLCBjb2xzKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgYXJnMVR5cGUgPSBfdHlwZW9mKHJvd3MpO1xuXG4gIHZhciBhcmcyVHlwZSA9IF90eXBlb2YoY29scyk7XG5cbiAgaWYgKGFyZzFUeXBlICE9PSAnc3RyaW5nJyAmJiBhcmcxVHlwZSAhPT0gJ251bWJlcicgfHwgYXJnMlR5cGUgIT09ICdzdHJpbmcnICYmIGFyZzJUeXBlICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBFcnJvcihFWFBFQ1RFRF9TVFJJTkdfTlVNQkVSX0FUX1BPU18xXzIpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIGNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciByb3dTdGFydDtcbiAgdmFyIHJvd0VuZDtcbiAgdmFyIGNvbFN0YXJ0O1xuICB2YXIgY29sRW5kO1xuXG4gIGlmIChhcmcxVHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIocm93cykgfHwgcm93cyA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1JPVyk7XG4gICAgfVxuXG4gICAgaWYgKHJvd3MgPj0gcm93KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfUk9XKTtcbiAgICB9XG5cbiAgICByb3dTdGFydCA9IHJvd3M7XG4gICAgcm93RW5kID0gcm93cztcbiAgfSBlbHNlIHtcbiAgICAvLyBzdHJpbmdcbiAgICB2YXIgYXJnID0gcm93cy5zcGxpdCgnOicpO1xuXG4gICAgaWYgKGFyZy5sZW5ndGggIT09IDIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1JPV1NfRVhQUkVTU0lPTik7XG4gICAgfVxuXG4gICAgdmFyIF9hcmcgPSBfc2xpY2VkVG9BcnJheShhcmcsIDIpLFxuICAgICAgICByMSA9IF9hcmdbMF0sXG4gICAgICAgIHIyID0gX2FyZ1sxXTtcblxuICAgIGlmIChyMSA9PT0gJycpIHtcbiAgICAgIHJvd1N0YXJ0ID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHIgPSBOdW1iZXIocjEpO1xuXG4gICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIocikgfHwgciA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUk9XKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHIgPj0gcm93KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihPVkVSRkxPV19ST1cpO1xuICAgICAgfVxuXG4gICAgICByb3dTdGFydCA9IHI7XG4gICAgfVxuXG4gICAgaWYgKHIyID09PSAnJykge1xuICAgICAgcm93RW5kID0gcm93IC0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIF9yID0gTnVtYmVyKHIyKTtcblxuICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKF9yKSB8fCBfciA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUk9XKTtcbiAgICAgIH1cblxuICAgICAgaWYgKF9yID49IHJvdykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfUk9XKTtcbiAgICAgIH1cblxuICAgICAgcm93RW5kID0gX3I7XG4gICAgfVxuXG4gICAgaWYgKHJvd1N0YXJ0ID4gcm93RW5kKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9ST1dTX0VYUFJFU1NJT04pO1xuICAgIH1cbiAgfVxuXG4gIGlmIChhcmcyVHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoY29scykgfHwgY29scyA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX0NPTFVNTik7XG4gICAgfVxuXG4gICAgaWYgKGNvbHMgPj0gY29sKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfQ09MVU1OKTtcbiAgICB9XG5cbiAgICBjb2xTdGFydCA9IGNvbHM7XG4gICAgY29sRW5kID0gY29scztcbiAgfSBlbHNlIHtcbiAgICAvLyBzdHJpbmdcbiAgICB2YXIgX2FyZzIgPSBjb2xzLnNwbGl0KCc6Jyk7XG5cbiAgICBpZiAoX2FyZzIubGVuZ3RoICE9PSAyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9DT0xVTU5TX0VYUFJFU1NJT04pO1xuICAgIH1cblxuICAgIHZhciBfYXJnMyA9IF9zbGljZWRUb0FycmF5KF9hcmcyLCAyKSxcbiAgICAgICAgYzEgPSBfYXJnM1swXSxcbiAgICAgICAgYzIgPSBfYXJnM1sxXTtcblxuICAgIGlmIChjMSA9PT0gJycpIHtcbiAgICAgIGNvbFN0YXJ0ID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGMgPSBOdW1iZXIoYzEpO1xuXG4gICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoYykgfHwgYyA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfQ09MVU1OKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGMgPj0gY29sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihPVkVSRkxPV19DT0xVTU4pO1xuICAgICAgfVxuXG4gICAgICBjb2xTdGFydCA9IGM7XG4gICAgfVxuXG4gICAgaWYgKGMyID09PSAnJykge1xuICAgICAgY29sRW5kID0gY29sIC0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIF9jID0gTnVtYmVyKGMyKTtcblxuICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKF9jKSB8fCBfYyA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfQ09MVU1OKTtcbiAgICAgIH1cblxuICAgICAgaWYgKF9jID49IGNvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfQ09MVU1OKTtcbiAgICAgIH1cblxuICAgICAgY29sRW5kID0gX2M7XG4gICAgfVxuXG4gICAgaWYgKGNvbFN0YXJ0ID4gY29sRW5kKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9DT0xVTU5TX0VYUFJFU1NJT04pO1xuICAgIH1cbiAgfVxuXG4gIHZhciBtYXRyaXggPSBBLl9tYXRyaXg7XG4gIHZhciBzdWJSb3cgPSByb3dFbmQgLSByb3dTdGFydCArIDE7XG4gIHZhciBzdWJDb2wgPSBjb2xFbmQgLSBjb2xTdGFydCArIDE7XG4gIHZhciBzdWJNYXRyaXggPSBuZXcgQXJyYXkoc3ViUm93KTtcblxuICBmb3IgKHZhciBpID0gcm93U3RhcnQ7IGkgPD0gcm93RW5kOyBpKyspIHtcbiAgICB2YXIgbmV3Um93ID0gbmV3IEFycmF5KHN1YkNvbCk7XG5cbiAgICBmb3IgKHZhciBqID0gY29sU3RhcnQ7IGogPD0gY29sRW5kOyBqKyspIHtcbiAgICAgIG5ld1Jvd1tqIC0gY29sU3RhcnRdID0gbWF0cml4W2ldW2pdO1xuICAgIH1cblxuICAgIHN1Yk1hdHJpeFtpIC0gcm93U3RhcnRdID0gbmV3Um93O1xuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKHN1Yk1hdHJpeCk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gc3VibWF0cml4OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG4vKipcclxuICogR2V0cyB0aGUgc3RyaW5naWZpZWQgTWF0cml4XHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFN0cmluZ2lmaWVkIE1hdHJpeFxyXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICB2YXIgbWF0cml4ID0gdGhpcy5fbWF0cml4O1xuXG4gIHZhciBfdGhpcyRzaXplID0gdGhpcy5zaXplKCksXG4gICAgICBfdGhpcyRzaXplMiA9IF9zbGljZWRUb0FycmF5KF90aGlzJHNpemUsIDIpLFxuICAgICAgcm93ID0gX3RoaXMkc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfdGhpcyRzaXplMlsxXTtcblxuICB2YXIgc3RyID0gJyc7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3c7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29sOyBqKyspIHtcbiAgICAgIHN0ciArPSBtYXRyaXhbaV1bal0udG9TdHJpbmcoKTtcblxuICAgICAgaWYgKGogIT09IGNvbCAtIDEpIHtcbiAgICAgICAgc3RyICs9ICcgJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaSAhPT0gcm93IC0gMSkge1xuICAgICAgc3RyICs9ICdcXG4nO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdHI7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gdG9TdHJpbmc7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSB6ZXJvIE1hdHJpeFxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtudW1iZXJ9IHJvdyAtIE51bWJlciBvZiByb3dzIG9mIHRoZSBNYXRyaXhcclxuICogQHBhcmFtIHtudW1iZXJ9IGNvbCAtIE51bWJlciBvZiBjb2x1bW5zIG9mIHRoZSBNYXRyaXhcclxuICogQHJldHVybnMge01hdHJpeH0gWmVybyBNYXRyaXhcclxuICovXG5mdW5jdGlvbiB6ZXJvKHJvdywgY29sKSB7XG4gIGlmIChjb2wgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLmdlbmVyYXRlKHJvdywgcm93LCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmdlbmVyYXRlKHJvdywgY29sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIDA7XG4gIH0pO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IHplcm87IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc01hdHJpeCA9IHJlcXVpcmUoJy4vdXRpbC9pc01hdHJpeCcpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWDtcbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IE1hdHJpeFxyXG4gKiBAbmFtZXNwYWNlIE1hdHJpeFxyXG4gKiBAY2xhc3NcclxuICogQHBhcmFtIHtudW1iZXJbXVtdfSBBIC0gVHdvIGRpbWVuc2lvbmFsIGFycmF5IHdoZXJlXHJcbiAqIEFbaV1bal0gcmVwcmVzZW50cyB0aGUgaS10aCByb3cgYW5kIGotdGggY29sdW1uIG9mIGEgbWF0cml4XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIE1hdHJpeChBKSB7XG4gIGlmICghaXNNYXRyaXgoQSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgdGhpcy5fbWF0cml4ID0gQTtcbiAgdGhpcy5fZGlnaXQgPSA4O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hdHJpeDsgLy8gc3RydWN0dXJlXG5cbk1hdHJpeC5wcm90b3R5cGUuaXNEaWFnb25hbCA9IHJlcXVpcmUoJy4vY29yZS9zdHJ1Y3R1cmUvaXNEaWFnb25hbCcpO1xuTWF0cml4LnByb3RvdHlwZS5pc1NrZXdTeW1tZXRyaWMgPSByZXF1aXJlKCcuL2NvcmUvc3RydWN0dXJlL2lzU2tld1N5bW1ldHJpYycpO1xuTWF0cml4LnByb3RvdHlwZS5pc1NxdWFyZSA9IHJlcXVpcmUoJy4vY29yZS9zdHJ1Y3R1cmUvaXNTcXVhcmUnKTtcbk1hdHJpeC5wcm90b3R5cGUuaXNTeW1tZXRyaWMgPSByZXF1aXJlKCcuL2NvcmUvc3RydWN0dXJlL2lzU3ltbWV0cmljJyk7XG5NYXRyaXgucHJvdG90eXBlLmlzTG93ZXJUcmlhbmd1bGFyID0gcmVxdWlyZSgnLi9jb3JlL3N0cnVjdHVyZS9pc0xvd2VyVHJpYW5ndWxhcicpO1xuTWF0cml4LnByb3RvdHlwZS5pc1VwcGVyVHJpYW5ndWxhciA9IHJlcXVpcmUoJy4vY29yZS9zdHJ1Y3R1cmUvaXNVcHBlclRyaWFuZ3VsYXInKTtcbk1hdHJpeC5wcm90b3R5cGUuaXNPcnRob2dvbmFsID0gcmVxdWlyZSgnLi9jb3JlL3N0cnVjdHVyZS9pc09ydGhvZ29uYWwnKTsgLy8gcHJvcGVydHlcblxuTWF0cml4LnByb3RvdHlwZS5jb25kID0gcmVxdWlyZSgnLi9jb3JlL3Byb3BlcnRpZXMvY29uZCcpO1xuTWF0cml4LnByb3RvdHlwZS5kZXQgPSByZXF1aXJlKCcuL2NvcmUvcHJvcGVydGllcy9kZXQnKTtcbk1hdHJpeC5wcm90b3R5cGUuZWlnZW52YWx1ZXMgPSByZXF1aXJlKCcuL2NvcmUvcHJvcGVydGllcy9laWdlbnZhbHVlcycpO1xuTWF0cml4LnByb3RvdHlwZS5udWxsaXR5ID0gcmVxdWlyZSgnLi9jb3JlL3Byb3BlcnRpZXMvbnVsbGl0eScpO1xuTWF0cml4LnByb3RvdHlwZS5ub3JtID0gcmVxdWlyZSgnLi9jb3JlL3Byb3BlcnRpZXMvbm9ybScpO1xuTWF0cml4LnByb3RvdHlwZS5yYW5rID0gcmVxdWlyZSgnLi9jb3JlL3Byb3BlcnRpZXMvcmFuaycpO1xuTWF0cml4LnByb3RvdHlwZS5zaXplID0gcmVxdWlyZSgnLi9jb3JlL3Byb3BlcnRpZXMvc2l6ZScpO1xuTWF0cml4LnByb3RvdHlwZS50cmFjZSA9IHJlcXVpcmUoJy4vY29yZS9wcm9wZXJ0aWVzL3RyYWNlJyk7IC8vIG9wZXJhdGlvbnNcblxuTWF0cml4LmFkZCA9IHJlcXVpcmUoJy4vY29yZS9vcGVyYXRpb25zL2FkZCcpO1xuTWF0cml4LmludmVyc2UgPSByZXF1aXJlKCcuL2NvcmUvb3BlcmF0aW9ucy9pbnZlcnNlJyk7XG5NYXRyaXgubXVsdGlwbHkgPSByZXF1aXJlKCcuL2NvcmUvb3BlcmF0aW9ucy9tdWx0aXBseScpO1xuTWF0cml4LnBvdyA9IHJlcXVpcmUoJy4vY29yZS9vcGVyYXRpb25zL3BvdycpO1xuTWF0cml4LnN1YnRyYWN0ID0gcmVxdWlyZSgnLi9jb3JlL29wZXJhdGlvbnMvc3VidHJhY3QnKTtcbk1hdHJpeC50cmFuc3Bvc2UgPSByZXF1aXJlKCcuL2NvcmUvb3BlcmF0aW9ucy90cmFuc3Bvc2UnKTsgLy8gTGluZWFyLWVxdWF0aW9uc1xuXG5NYXRyaXguYmFja3dhcmQgPSByZXF1aXJlKCcuL2NvcmUvbGluZWFyLWVxdWF0aW9ucy9iYWNrd2FyZCcpO1xuTWF0cml4LmZvcndhcmQgPSByZXF1aXJlKCcuL2NvcmUvbGluZWFyLWVxdWF0aW9ucy9mb3J3YXJkJyk7XG5NYXRyaXguc29sdmUgPSByZXF1aXJlKCcuL2NvcmUvbGluZWFyLWVxdWF0aW9ucy9zb2x2ZScpOyAvLyBkZWNvbXBvc2l0aW9uc1xuXG5NYXRyaXguTFUgPSByZXF1aXJlKCcuL2NvcmUvZGVjb21wb3NpdGlvbnMvTFUnKTtcbk1hdHJpeC5RUiA9IHJlcXVpcmUoJy4vY29yZS9kZWNvbXBvc2l0aW9ucy9RUicpOyAvLyB1dGlsc1xuXG5NYXRyaXguY2xvbmUgPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvY2xvbmUnKTtcbk1hdHJpeC5jb2x1bW4gPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvY29sdW1uJyk7XG5NYXRyaXguZGlhZyA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9kaWFnJyk7XG5NYXRyaXguZWxlbWVudHdpc2UgPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvZWxlbWVudHdpc2UnKTtcbk1hdHJpeC5nZW5lcmF0ZSA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9nZW5lcmF0ZScpO1xuTWF0cml4LmdldERpYWcgPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvZ2V0RGlhZycpO1xuTWF0cml4LmdldFJhbmRvbU1hdHJpeCA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9nZXRSYW5kb21NYXRyaXgnKTtcbk1hdHJpeC5pZGVudGl0eSA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9pZGVudGl0eScpO1xuTWF0cml4LmlzRXF1YWwgPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvaXNFcXVhbCcpO1xuTWF0cml4LnJvdyA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9yb3cnKTtcbk1hdHJpeC5zdWJtYXRyaXggPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvc3VibWF0cml4Jyk7XG5NYXRyaXguemVybyA9IHJlcXVpcmUoJy4vY29yZS91dGlscy96ZXJvJyk7XG5NYXRyaXgucHJvdG90eXBlLmVudHJ5ID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2VudHJ5Jyk7XG5NYXRyaXgucHJvdG90eXBlLnRvU3RyaW5nID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL3RvU3RyaW5nJyk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9ST1dfQ09MID0gX3JlcXVpcmUuSU5WQUxJRF9ST1dfQ09MO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVtcHR5KHJvdywgY29sKSB7XG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihyb3cpIHx8IHJvdyA8IDAgfHwgIU51bWJlci5pc0ludGVnZXIoY29sKSB8fCBjb2wgPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUk9XX0NPTCk7XG4gIH1cblxuICBpZiAocm93ID09PSAwIHx8IGNvbCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHZhciBtYXRyaXggPSBuZXcgQXJyYXkocm93KTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgbWF0cml4W2ldID0gbmV3IEFycmF5KGNvbCk7XG4gIH1cblxuICByZXR1cm4gbWF0cml4O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzTnVtYmVyID0gcmVxdWlyZSgnLi9pc051bWJlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzTWF0cml4KG1hdHJpeCkge1xuICBpZiAoIUFycmF5LmlzQXJyYXkobWF0cml4KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBoZWlnaHQgPSBtYXRyaXgubGVuZ3RoO1xuXG4gIGlmIChoZWlnaHQgPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTsgLy8gW10gcmVwcmVzZW50cyBlbXB0eSBtYXRyaXggKDAgeCAwIG1hdHJpeClcbiAgfVxuXG4gIHZhciBmaXJzdFJvdyA9IG1hdHJpeFswXTtcblxuICBpZiAoIUFycmF5LmlzQXJyYXkoZmlyc3RSb3cpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHdpZHRoID0gZmlyc3RSb3cubGVuZ3RoO1xuXG4gIGlmICh3aWR0aCA9PT0gMCkge1xuICAgIHJldHVybiBmYWxzZTsgLy8gWyBbXSBdIGlzIG5vdCBhbGxvd2VkXG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGhlaWdodDsgaSsrKSB7XG4gICAgdmFyIHJvdyA9IG1hdHJpeFtpXTtcblxuICAgIGlmICghQXJyYXkuaXNBcnJheShyb3cpIHx8IHJvdy5sZW5ndGggIT09IHdpZHRoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCB3aWR0aDsgaisrKSB7XG4gICAgICBpZiAoIWlzTnVtYmVyKHJvd1tqXSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc051bWJlcihfaW50KSB7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUoX2ludCk7XG59OyIsInZhciBTeWx2ZXN0ZXIgPSB7fVxuXG5TeWx2ZXN0ZXIuTWF0cml4ID0gZnVuY3Rpb24gKCkge31cblxuU3lsdmVzdGVyLk1hdHJpeC5jcmVhdGUgPSBmdW5jdGlvbiAoZWxlbWVudHMpIHtcbiAgdmFyIE0gPSBuZXcgU3lsdmVzdGVyLk1hdHJpeCgpXG4gIHJldHVybiBNLnNldEVsZW1lbnRzKGVsZW1lbnRzKVxufVxuXG5TeWx2ZXN0ZXIuTWF0cml4LkkgPSBmdW5jdGlvbiAobikge1xuICB2YXIgZWxzID0gW10sXG4gICAgaSA9IG4sXG4gICAgalxuICB3aGlsZSAoaS0tKSB7XG4gICAgaiA9IG5cbiAgICBlbHNbaV0gPSBbXVxuICAgIHdoaWxlIChqLS0pIHtcbiAgICAgIGVsc1tpXVtqXSA9IGkgPT09IGogPyAxIDogMFxuICAgIH1cbiAgfVxuICByZXR1cm4gU3lsdmVzdGVyLk1hdHJpeC5jcmVhdGUoZWxzKVxufVxuXG5TeWx2ZXN0ZXIuTWF0cml4LnByb3RvdHlwZSA9IHtcbiAgZHVwOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFN5bHZlc3Rlci5NYXRyaXguY3JlYXRlKHRoaXMuZWxlbWVudHMpXG4gIH0sXG5cbiAgaXNTcXVhcmU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY29scyA9IHRoaXMuZWxlbWVudHMubGVuZ3RoID09PSAwID8gMCA6IHRoaXMuZWxlbWVudHNbMF0ubGVuZ3RoXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHMubGVuZ3RoID09PSBjb2xzXG4gIH0sXG5cbiAgdG9SaWdodFRyaWFuZ3VsYXI6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDApIHJldHVybiBTeWx2ZXN0ZXIuTWF0cml4LmNyZWF0ZShbXSlcbiAgICB2YXIgTSA9IHRoaXMuZHVwKCksXG4gICAgICBlbHNcbiAgICB2YXIgbiA9IHRoaXMuZWxlbWVudHMubGVuZ3RoLFxuICAgICAgaSxcbiAgICAgIGosXG4gICAgICBucCA9IHRoaXMuZWxlbWVudHNbMF0ubGVuZ3RoLFxuICAgICAgcFxuICAgIGZvciAoaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgIGlmIChNLmVsZW1lbnRzW2ldW2ldID09PSAwKSB7XG4gICAgICAgIGZvciAoaiA9IGkgKyAxOyBqIDwgbjsgaisrKSB7XG4gICAgICAgICAgaWYgKE0uZWxlbWVudHNbal1baV0gIT09IDApIHtcbiAgICAgICAgICAgIGVscyA9IFtdXG4gICAgICAgICAgICBmb3IgKHAgPSAwOyBwIDwgbnA7IHArKykge1xuICAgICAgICAgICAgICBlbHMucHVzaChNLmVsZW1lbnRzW2ldW3BdICsgTS5lbGVtZW50c1tqXVtwXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE0uZWxlbWVudHNbaV0gPSBlbHNcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoTS5lbGVtZW50c1tpXVtpXSAhPT0gMCkge1xuICAgICAgICBmb3IgKGogPSBpICsgMTsgaiA8IG47IGorKykge1xuICAgICAgICAgIHZhciBtdWx0aXBsaWVyID0gTS5lbGVtZW50c1tqXVtpXSAvIE0uZWxlbWVudHNbaV1baV1cbiAgICAgICAgICBlbHMgPSBbXVxuICAgICAgICAgIGZvciAocCA9IDA7IHAgPCBucDsgcCsrKSB7XG4gICAgICAgICAgICAvLyBFbGVtZW50cyB3aXRoIGNvbHVtbiBudW1iZXJzIHVwIHRvIGFuIGluY2x1ZGluZyB0aGUgbnVtYmVyIG9mIHRoZVxuICAgICAgICAgICAgLy8gcm93IHRoYXQgd2UncmUgc3VidHJhY3RpbmcgY2FuIHNhZmVseSBiZSBzZXQgc3RyYWlnaHQgdG8gemVybyxcbiAgICAgICAgICAgIC8vIHNpbmNlIHRoYXQncyB0aGUgcG9pbnQgb2YgdGhpcyByb3V0aW5lIGFuZCBpdCBhdm9pZHMgaGF2aW5nIHRvXG4gICAgICAgICAgICAvLyBsb29wIG92ZXIgYW5kIGNvcnJlY3Qgcm91bmRpbmcgZXJyb3JzIGxhdGVyXG4gICAgICAgICAgICBlbHMucHVzaChcbiAgICAgICAgICAgICAgcCA8PSBpID8gMCA6IE0uZWxlbWVudHNbal1bcF0gLSBNLmVsZW1lbnRzW2ldW3BdICogbXVsdGlwbGllclxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBNLmVsZW1lbnRzW2pdID0gZWxzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIE1cbiAgfSxcblxuICBkZXRlcm1pbmFudDogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIDFcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzU3F1YXJlKCkpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHZhciBNID0gdGhpcy50b1JpZ2h0VHJpYW5ndWxhcigpXG4gICAgdmFyIGRldCA9IE0uZWxlbWVudHNbMF1bMF0sXG4gICAgICBuID0gTS5lbGVtZW50cy5sZW5ndGhcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IG47IGkrKykge1xuICAgICAgZGV0ID0gZGV0ICogTS5lbGVtZW50c1tpXVtpXVxuICAgIH1cbiAgICByZXR1cm4gZGV0XG4gIH0sXG5cbiAgaXNTaW5ndWxhcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmlzU3F1YXJlKCkgJiYgdGhpcy5kZXRlcm1pbmFudCgpID09PSAwXG4gIH0sXG5cbiAgYXVnbWVudDogZnVuY3Rpb24gKG1hdHJpeCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZHVwKClcbiAgICB9XG4gICAgdmFyIE0gPSBtYXRyaXguZWxlbWVudHMgfHwgbWF0cml4XG4gICAgaWYgKHR5cGVvZiBNWzBdWzBdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgTSA9IFN5bHZlc3Rlci5NYXRyaXguY3JlYXRlKE0pLmVsZW1lbnRzXG4gICAgfVxuICAgIHZhciBUID0gdGhpcy5kdXAoKSxcbiAgICAgIGNvbHMgPSBULmVsZW1lbnRzWzBdLmxlbmd0aFxuICAgIHZhciBpID0gVC5lbGVtZW50cy5sZW5ndGgsXG4gICAgICBuaiA9IE1bMF0ubGVuZ3RoLFxuICAgICAgalxuICAgIGlmIChpICE9PSBNLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaiA9IG5qXG4gICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgIFQuZWxlbWVudHNbaV1bY29scyArIGpdID0gTVtpXVtqXVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gVFxuICB9LFxuXG4gIGludmVyc2U6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGlmICghdGhpcy5pc1NxdWFyZSgpIHx8IHRoaXMuaXNTaW5ndWxhcigpKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICB2YXIgbiA9IHRoaXMuZWxlbWVudHMubGVuZ3RoLFxuICAgICAgaSA9IG4sXG4gICAgICBqXG4gICAgdmFyIE0gPSB0aGlzLmF1Z21lbnQoU3lsdmVzdGVyLk1hdHJpeC5JKG4pKS50b1JpZ2h0VHJpYW5ndWxhcigpXG4gICAgdmFyIG5wID0gTS5lbGVtZW50c1swXS5sZW5ndGgsXG4gICAgICBwLFxuICAgICAgZWxzLFxuICAgICAgZGl2aXNvclxuICAgIHZhciBpbnZlcnNlX2VsZW1lbnRzID0gW10sXG4gICAgICBuZXdfZWxlbWVudFxuICAgIC8vIFN5bHZlc3Rlci5NYXRyaXggaXMgbm9uLXNpbmd1bGFyIHNvIHRoZXJlIHdpbGwgYmUgbm8gemVyb3Mgb24gdGhlXG4gICAgLy8gZGlhZ29uYWwuIEN5Y2xlIHRocm91Z2ggcm93cyBmcm9tIGxhc3QgdG8gZmlyc3QuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgLy8gRmlyc3QsIG5vcm1hbGlzZSBkaWFnb25hbCBlbGVtZW50cyB0byAxXG4gICAgICBlbHMgPSBbXVxuICAgICAgaW52ZXJzZV9lbGVtZW50c1tpXSA9IFtdXG4gICAgICBkaXZpc29yID0gTS5lbGVtZW50c1tpXVtpXVxuICAgICAgZm9yIChwID0gMDsgcCA8IG5wOyBwKyspIHtcbiAgICAgICAgbmV3X2VsZW1lbnQgPSBNLmVsZW1lbnRzW2ldW3BdIC8gZGl2aXNvclxuICAgICAgICBlbHMucHVzaChuZXdfZWxlbWVudClcbiAgICAgICAgLy8gU2h1ZmZsZSBvZmYgdGhlIGN1cnJlbnQgcm93IG9mIHRoZSByaWdodCBoYW5kIHNpZGUgaW50byB0aGUgcmVzdWx0c1xuICAgICAgICAvLyBhcnJheSBhcyBpdCB3aWxsIG5vdCBiZSBtb2RpZmllZCBieSBsYXRlciBydW5zIHRocm91Z2ggdGhpcyBsb29wXG4gICAgICAgIGlmIChwID49IG4pIHtcbiAgICAgICAgICBpbnZlcnNlX2VsZW1lbnRzW2ldLnB1c2gobmV3X2VsZW1lbnQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIE0uZWxlbWVudHNbaV0gPSBlbHNcbiAgICAgIC8vIFRoZW4sIHN1YnRyYWN0IHRoaXMgcm93IGZyb20gdGhvc2UgYWJvdmUgaXQgdG8gZ2l2ZSB0aGUgaWRlbnRpdHkgbWF0cml4XG4gICAgICAvLyBvbiB0aGUgbGVmdCBoYW5kIHNpZGVcbiAgICAgIGogPSBpXG4gICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgIGVscyA9IFtdXG4gICAgICAgIGZvciAocCA9IDA7IHAgPCBucDsgcCsrKSB7XG4gICAgICAgICAgZWxzLnB1c2goTS5lbGVtZW50c1tqXVtwXSAtIE0uZWxlbWVudHNbaV1bcF0gKiBNLmVsZW1lbnRzW2pdW2ldKVxuICAgICAgICB9XG4gICAgICAgIE0uZWxlbWVudHNbal0gPSBlbHNcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFN5bHZlc3Rlci5NYXRyaXguY3JlYXRlKGludmVyc2VfZWxlbWVudHMpXG4gIH0sXG5cbiAgc2V0RWxlbWVudHM6IGZ1bmN0aW9uIChlbHMpIHtcbiAgICB2YXIgaSxcbiAgICAgIGosXG4gICAgICBlbGVtZW50cyA9IGVscy5lbGVtZW50cyB8fCBlbHNcbiAgICBpZiAoZWxlbWVudHNbMF0gJiYgdHlwZW9mIGVsZW1lbnRzWzBdWzBdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaSA9IGVsZW1lbnRzLmxlbmd0aFxuICAgICAgdGhpcy5lbGVtZW50cyA9IFtdXG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGogPSBlbGVtZW50c1tpXS5sZW5ndGhcbiAgICAgICAgdGhpcy5lbGVtZW50c1tpXSA9IFtdXG4gICAgICAgIHdoaWxlIChqLS0pIHtcbiAgICAgICAgICB0aGlzLmVsZW1lbnRzW2ldW2pdID0gZWxlbWVudHNbaV1bal1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgdmFyIG4gPSBlbGVtZW50cy5sZW5ndGhcbiAgICB0aGlzLmVsZW1lbnRzID0gW11cbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICB0aGlzLmVsZW1lbnRzLnB1c2goW2VsZW1lbnRzW2ldXSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfSxcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWxlbWVudHMpIHtcbiAgY29uc3QgbWF0ID0gU3lsdmVzdGVyLk1hdHJpeC5jcmVhdGUoZWxlbWVudHMpLmludmVyc2UoKVxuICBpZiAobWF0ICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIG1hdC5lbGVtZW50c1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvaW5kZXguanMnKTtcbiIsImNvbnN0IGVsZW1XaXNlID0gcmVxdWlyZSgnLi9lbGVtLXdpc2UnKTtcbi8qKlxuKiBBZGQgbWF0cml4ZXMgdG9nZXRoZXJcbiogQHBhcmFtIHsuLi5BcnJheS48QXJyYXkuPE51bWJlcj4+fSBhcmdzIGxpc3Qgb2YgbWF0cml4XG4qIEByZXR1cm5zIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBzdW1cbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdHJldHVybiBlbGVtV2lzZShhcmdzLCBhcmdzMiA9PiB7XG5cdFx0cmV0dXJuIGFyZ3MyLnJlZHVjZSgoYSwgYikgPT4ge1xuXHRcdFx0aWYgKGEgPT09IG51bGwgfHwgYiA9PT0gbnVsbCkge1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGEgKyBiO1xuXHRcdH0sIDApO1xuXHR9KTtcbn07XG4iLCJjb25zdCBkb3RQcm9kdWN0ID0gcmVxdWlyZSgnLi9kb3QtcHJvZHVjdC5qcycpO1xuY29uc3Qgbm9ybSA9IHJlcXVpcmUoJy4vbm9ybS5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2ZWN0b3IxLCB2ZWN0b3IyKSB7XG5cdGlmICh2ZWN0b3IxLmxlbmd0aCAhPT0gdmVjdG9yMi5sZW5ndGgpIHtcblx0XHR0aHJvdyAobmV3IEVycm9yKCdUaGUgbGVuZ3RocyBvZiB0aGUgdmVjdG9ycyBkbyBub3QgbWF0Y2gnKSk7XG5cdH1cblxuXHRyZXR1cm4gZG90UHJvZHVjdCh2ZWN0b3IxLCB2ZWN0b3IyKSAvIChub3JtKHZlY3RvcjEpICogbm9ybSh2ZWN0b3IyKSk7XG59O1xuIiwiY29uc3QgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5LmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHtibG9ja3MsIG9yZGVyID0gbnVsbH0pIHtcblx0Y29uc3QgZGltTCA9IGJsb2Nrcy5tYXAoYSA9PiBhLmxlbmd0aCkucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG5cdGNvbnN0IHJlc3VsdCA9IGlkZW50aXR5KGRpbUwpO1xuXHRsZXQgY3VycmVudCA9IDA7XG5cdGZvciAoY29uc3QgbWF0IG9mIGJsb2Nrcykge1xuXHRcdGZvciAoY29uc3QgW2ldIG9mIG1hdC5lbnRyaWVzKCkpIHtcblx0XHRcdGZvciAoY29uc3QgW2pdIG9mIG1hdC5lbnRyaWVzKCkpIHtcblx0XHRcdFx0cmVzdWx0W2kgKyBjdXJyZW50XVtqICsgY3VycmVudF0gPSBtYXRbaV1bal07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y3VycmVudCArPSBtYXQubGVuZ3RoO1xuXHR9XG5cblx0aWYgKG9yZGVyKSB7XG5cdFx0cmV0dXJuIG9yZGVyLm1hcChpID0+IG9yZGVyLm1hcChqID0+IHJlc3VsdFtpXVtqXSkpO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG4iLCJjb25zdCB6ZXJvcyA9IHJlcXVpcmUoJy4vemVyb3MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobWF0KSB7XG5cdGNvbnN0IHJlc3VsdCA9IHplcm9zKG1hdC5sZW5ndGgsIG1hdC5sZW5ndGgpO1xuXG5cdGZvciAoY29uc3QgW2ksIGVsZW1lbnRdIG9mIG1hdC5lbnRyaWVzKCkpIHtcblx0XHRyZXN1bHRbaV1baV0gPSBlbGVtZW50O1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2ZWN0b3IxLCB2ZWN0b3IyKSB7XG5cdGlmICh2ZWN0b3IxLmxlbmd0aCAhPT0gdmVjdG9yMi5sZW5ndGgpIHtcblx0XHR0aHJvdyAobmV3IEVycm9yKCdMZW5ndGhzIG5vdCBtYWNoaW5nJykpO1xuXHR9XG5cblx0bGV0IHJlc3VsdCA9IDA7XG5cdGZvciAoY29uc3QgW2ksIGVsZW1lbnRdIG9mIHZlY3RvcjEuZW50cmllcygpKSB7XG5cdFx0cmVzdWx0ICs9IGVsZW1lbnQgKiB2ZWN0b3IyW2ldO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvKipcbiogQGNhbGxiYWNrIGVsZW1XaXNlQ2JcbiogQHBhcmFtIHtBcnJheS48TnVtYmVyPn0gYXJyXG4qIEBwYXJhbSB7TnVtYmVyfSByb3dJZFxuKiBAcGFyYW0ge051bWJlcn0gY29sSWRcbiovXG4vKipcbiogcnVuIGEgZnVuY3Rpb24gb24gY2VsbCBwZXIgY2VsbCBmb3IgZWFjaCBNYXRyaXhlc1xuKiBAcGFyYW0gezxBcnJheS48QXJyYXkuPEFycmF5LjxOdW1iZXI+Pj59IGFyck1hdHJpeGVzIGxpc3Qgb2YgbWF0cml4ZXNcbiogQHBhcmFtIHtlbGVtV2lzZUNifSBmblxuKiBAcmV0dXJucyB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gcmVzdWx0aW5nIG1hdHJpeFxuKiBAZXhhbXBsZVxuLy8gdGhpcyB3aWxsIGRvIG0xICsgbTIgKyBtMyArIG00IG9uIG1hdHJpeGVzXG5lbGVtV2lzZShbbTEsIG0yLCBtMywgbTRdLCBhcmdzMiA9PiB7XG5cdHJldHVybiBhcmdzMi5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcbn0pO1xuKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJyYXlNYXRyaXhlcywgZm4pIHtcblx0cmV0dXJuIGFycmF5TWF0cml4ZXNbMF0ubWFwKChyb3csIHJvd0lkKSA9PiB7XG5cdFx0cmV0dXJuIHJvdy5tYXAoKGNlbGwsIGNvbElkKSA9PiB7XG5cdFx0XHRjb25zdCBhcnJheSA9IGFycmF5TWF0cml4ZXMubWFwKG0gPT4gbVtyb3dJZF1bY29sSWRdKTtcblx0XHRcdHJldHVybiBmbihhcnJheSwgcm93SWQsIGNvbElkKTtcblx0XHR9KTtcblx0fSk7XG59O1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcnJheTEsIGFycmF5Mikge1xuXHRpZiAoYXJyYXkxLmxlbmd0aCAhPT0gYXJyYXkyLmxlbmd0aCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcnJheSBsZW5ndGhzJyk7XG5cdH1cblxuXHRjb25zdCBkaWZmID0gYXJyYXkxLm1hcCgoZWxlbWVudCwgaW5kZXgpID0+IGVsZW1lbnQgLSBhcnJheTJbaW5kZXhdKS5tYXAoZWxlbWVudCA9PiBlbGVtZW50ICogZWxlbWVudCk7XG5cdHJldHVybiBNYXRoLnNxcnQoZGlmZi5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKSk7XG59O1xuIiwiY29uc3QgdHJhY2UgPSByZXF1aXJlKCcuL3RyYWNlLmpzJyk7XG5jb25zdCB0cmFuc3Bvc2UgPSByZXF1aXJlKCcuL3RyYW5zcG9zZS5qcycpO1xuY29uc3QgbWF0U3ViID0gcmVxdWlyZSgnLi9zdWJ0cmFjdC5qcycpO1xuY29uc3QgbWF0TXVsID0gcmVxdWlyZSgnLi9tYXQtbXVsLmpzJyk7XG5jb25zdCBzdW0gPSByZXF1aXJlKCcuL3N1bS5qcycpO1xuXG4vLyBbRnJvYmVuaXVzIG5vcm1dKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01hdHJpeF9ub3JtI0Zyb2Jlbml1c19ub3JtIClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFycmF5MSwgYXJyYXkyKSB7XG5cdGlmIChhcnJheTEgPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBzdW0oYXJyYXkyKTtcblx0fVxuXG5cdGlmIChhcnJheTIgPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBzdW0oYXJyYXkxKTtcblx0fVxuXG5cdGNvbnN0IG0gPSBtYXRTdWIoYXJyYXkxLCBhcnJheTIpO1xuXHRjb25zdCBwID0gbWF0TXVsKHRyYW5zcG9zZShtKSwgbSk7XG5cdHJldHVybiBNYXRoLnNxcnQodHJhY2UocCkpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0YXRlU2l6ZSkge1xuXHRjb25zdCBpZGVudGl0eUFycmF5ID0gW107XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgc3RhdGVTaXplOyBpKyspIHtcblx0XHRjb25zdCByb3dJZGVudGl0eSA9IFtdO1xuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgc3RhdGVTaXplOyBqKyspIHtcblx0XHRcdGlmIChpID09PSBqKSB7XG5cdFx0XHRcdHJvd0lkZW50aXR5LnB1c2goMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyb3dJZGVudGl0eS5wdXNoKDApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlkZW50aXR5QXJyYXkucHVzaChyb3dJZGVudGl0eSk7XG5cdH1cblxuXHRyZXR1cm4gaWRlbnRpdHlBcnJheTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0YWRkOiByZXF1aXJlKCcuL2FkZC5qcycpLFxuXHRjb3NTaW1pbGFyaXR5OiByZXF1aXJlKCcuL2Nvcy1zaW1pbGFyaXR5JyksXG5cdGV1Y2xpZGVhbkRpc3Q6IHJlcXVpcmUoJy4vZXVjbGlkZWFuLWRpc3QnKSxcblx0ZGlhZzogcmVxdWlyZSgnLi9kaWFnLmpzJyksXG5cdGRpYWdCbG9jazogcmVxdWlyZSgnLi9kaWFnLWJsb2NrJyksXG5cdGRvdFByb2R1Y3Q6IHJlcXVpcmUoJy4vZG90LXByb2R1Y3QnKSxcblx0ZWxlbVdpc2U6IHJlcXVpcmUoJy4vZWxlbS13aXNlLmpzJyksXG5cdGZyb2Jlbml1czogcmVxdWlyZSgnLi9mcm9iZW5pdXMuanMnKSxcblx0aWRlbnRpdHk6IHJlcXVpcmUoJy4vaWRlbnRpdHkuanMnKSxcblx0aW52ZXJ0OiByZXF1aXJlKCcuL2ludmVydC5qcycpLFxuXHRtYXBNYXRyaXg6IHJlcXVpcmUoJy4vbWFwLW1hdHJpeC5qcycpLFxuXHRtYXRNdWw6IHJlcXVpcmUoJy4vbWF0LW11bC5qcycpLFxuXHRtYXRQZXJtdXRhdGlvbjogcmVxdWlyZSgnLi9tYXQtcGVybXV0YXRpb24uanMnKSxcblx0cGFkV2l0aFplcm9Db2xzOiByZXF1aXJlKCcuL3BhZC13aXRoLXplcm8tY29scy5qcycpLFxuXHRzdWJ0cmFjdDogcmVxdWlyZSgnLi9zdWJ0cmFjdC5qcycpLFxuXHRzdWJTcXVhcmVNYXRyaXg6IHJlcXVpcmUoJy4vc3ViLXNxdWFyZS1tYXRyaXguanMnKSxcblx0c3VtOiByZXF1aXJlKCcuL3N1bS5qcycpLFxuXHR0cmFjZTogcmVxdWlyZSgnLi90cmFjZS5qcycpLFxuXHR0cmFuc3Bvc2U6IHJlcXVpcmUoJy4vdHJhbnNwb3NlLmpzJyksXG5cdHplcm9zOiByZXF1aXJlKCcuL3plcm9zLmpzJyksXG5cdG5vcm06IHJlcXVpcmUoJy4vbm9ybS5qcycpLFxufTtcbiIsImNvbnN0IG1hdHJpeEludmVyc2UgPSByZXF1aXJlKCdtYXRyaXgtaW52ZXJzZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtKSB7XG5cdHJldHVybiBtYXRyaXhJbnZlcnNlKG0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGEsIGZuKSB7XG5cdHJldHVybiBhLm1hcCgocm93LCByb3dJZCkgPT4gcm93Lm1hcCgoY2VsbCwgY29sSWQpID0+IGZuKGNlbGwsIHJvd0lkLCBjb2xJZCkpKTtcbn07XG4iLCIvKipcbiogTXVsdGlwbHkgMiBtYXRyaXhlcyB0b2dldGhlclxuKiBAcGFyYW0ge0FycmF5LjxBcnJheS48TnVtYmVyPj59IG0xXG4qIEBwYXJhbSB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gbTJcbiogQHJldHVybnMge0FycmF5LjxBcnJheS48TnVtYmVyPj59XG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobTEsIG0yKSB7XG5cdC8vIENvbnNvbGUubG9nKHttMSwgbTJ9KTtcblx0Y29uc3QgcmVzdWx0ID0gW107XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbTEubGVuZ3RoOyBpKyspIHtcblx0XHRyZXN1bHRbaV0gPSBbXTtcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IG0yWzBdLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRsZXQgc3VtID0gMDtcblx0XHRcdGxldCBpc051bGwgPSBmYWxzZTtcblx0XHRcdGZvciAobGV0IGsgPSAwOyBrIDwgbTFbMF0ubGVuZ3RoOyBrKyspIHtcblx0XHRcdFx0aWYgKChtMVtpXVtrXSA9PT0gbnVsbCAmJiBtMltrXVtqXSAhPT0gMCkgfHwgKG0yW2tdW2pdID09PSBudWxsICYmIG0xW2ldW2tdICE9PSAwKSkge1xuXHRcdFx0XHRcdGlzTnVsbCA9IHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzdW0gKz0gbTFbaV1ba10gKiBtMltrXVtqXTtcblx0XHRcdH1cblxuXHRcdFx0cmVzdWx0W2ldW2pdID0gaXNOdWxsID8gbnVsbCA6IHN1bTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8qKlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gbWF0cml4XG4gKiBAcGFyYW0ge1tOdW1iZXIsIE51bWJlcl19IG91dHB1dFNpemVcbiAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IHJvd0luZGV4ZXMgdGhlIHBlcm11dGF0aW9uIGluZGV4ZXMsIHJlc3VsdFtqXVtrXSA9IG1hdHJpeFtyb3dJbmRleGVzLmluZGV4T2YoaildW2NvbEluZGV4ZXMuaW5kZXhPZihrKV1cbiAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IGNvbEluZGV4ZXMgdGhlIHBlcm11dGF0aW9uIGluZGV4ZXMsIHJlc3VsdFtqXVtrXSA9IG1hdHJpeFtyb3dJbmRleGVzLmluZGV4T2YoaildW2NvbEluZGV4ZXMuaW5kZXhPZihrKV1cbiAqIEByZXR1cm5zIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7XG5cdG1hdHJpeCxcblx0b3V0cHV0U2l6ZSxcblx0cm93SW5kZXhlcyxcblx0Y29sSW5kZXhlcyxcbn0pIHtcblx0Y29uc3QgW25Sb3csIG5Db2xdID0gb3V0cHV0U2l6ZTtcblxuXHRpZiAoIUFycmF5LmlzQXJyYXkocm93SW5kZXhlcykpIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihgSW52YWxpZCByb3dJbmRleGVzICR7cm93SW5kZXhlc31gKSk7XG5cdH1cblxuXHRpZiAoIUFycmF5LmlzQXJyYXkoY29sSW5kZXhlcykpIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihgSW52YWxpZCBjb2xJbmRleGVzICR7Y29sSW5kZXhlc31gKSk7XG5cdH1cblxuXHRyZXR1cm4gbmV3IEFycmF5KG5Sb3cpLmZpbGwoMCkubWFwKChfLCBpKSA9PiBuZXcgQXJyYXkobkNvbCkuZmlsbCgwKS5tYXAoKF8sIGopID0+IHtcblx0XHRpZiAoY29sSW5kZXhlcy5pbmNsdWRlcyhqKSAmJiByb3dJbmRleGVzLmluY2x1ZGVzKGkpKSB7XG5cdFx0XHRyZXR1cm4gbWF0cml4W3Jvd0luZGV4ZXMuaW5kZXhPZihpKV1bY29sSW5kZXhlcy5pbmRleE9mKGopXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gMDtcblx0fSkpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZlY3Rvcikge1xuXHRsZXQgcmVzdWx0ID0gMDtcblx0Zm9yIChjb25zdCBlbGVtZW50IG9mIHZlY3Rvcikge1xuXHRcdHJlc3VsdCArPSAoZWxlbWVudCAqIGVsZW1lbnQpO1xuXHR9XG5cblx0cmV0dXJuIE1hdGguc3FydChyZXN1bHQpO1xufTtcbiIsImNvbnN0IG1hdFBlcm11dGF0aW9uID0gcmVxdWlyZSgnLi9tYXQtcGVybXV0YXRpb24nKTtcbi8qKlxuKlRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcGFkZGVkIG1hdHJpeCB3aXRoIHplcm9zIHdpdGggcmVzcGVjdCB0byBhIGdpdmVuXG4qIHRhcmdldCBjb2x1bW5zIG51bWJlclxuKkBwYXJhbSB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gbWF0cml4IHRoZSBtYXRyaXggd2UgbmVlZCB0byBwYWRcbipAcGFyYW0ge051bWJlcn0gY29sdW1ucyBpbiBvdXIgY2FzZSwgdGhlIGR5bmFtaWMgZGltZW5zaW9uXG4qQHJldHVybnMge0FycmF5LjxBcnJheS48TnVtYmVyPj59IHBhZGRlZCBtYXRyaXhcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtYXRyaXgsIHtjb2x1bW5zfSkge1xuXHRpZiAoY29sdW1ucyA8IG1hdHJpeFswXS5sZW5ndGgpIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihgT3V0cHV0IGNvbHVtbnMgJHtjb2x1bW5zfSBpcyBncmVhdGVyIHRoYW4gaW5wdXQgY29sdW1ucyAke21hdHJpeFswXS5sZW5ndGh9YCkpO1xuXHR9XG5cblx0cmV0dXJuIG1hdFBlcm11dGF0aW9uKHtcblx0XHRtYXRyaXgsXG5cdFx0b3V0cHV0U2l6ZTogW21hdHJpeC5sZW5ndGgsIGNvbHVtbnNdLFxuXHRcdHJvd0luZGV4ZXM6IG5ldyBBcnJheShtYXRyaXgubGVuZ3RoKS5maWxsKDApLm1hcCgoXywgaW5kZXgpID0+IGluZGV4KSxcblx0XHRjb2xJbmRleGVzOiBuZXcgQXJyYXkobWF0cml4WzBdLmxlbmd0aCkuZmlsbCgwKS5tYXAoKF8sIGluZGV4KSA9PiBpbmRleCksXG5cdH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gKG1hdCwgaW5kZXhlcykgPT4ge1xuXHRyZXR1cm4gaW5kZXhlcy5tYXAoczEgPT4gaW5kZXhlcy5tYXAoczIgPT4gbWF0W3MxXVtzMl0pKTtcbn07XG4iLCJjb25zdCBlbGVtV2lzZSA9IHJlcXVpcmUoJy4vZWxlbS13aXNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0cmV0dXJuIGVsZW1XaXNlKGFyZ3MsIChbYSwgYl0pID0+IGEgLSBiKTtcbn07XG4iLCIvLyBTdW0gYWxsIHRoZSB0ZXJtcyBvZiBhIGdpdmVuIG1hdHJpeFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJyYXkpIHtcblx0bGV0IHMgPSAwO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBhcnJheS5sZW5ndGg7IGorKykge1xuXHRcdFx0cyArPSBhcnJheVtpXVtqXTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcnJheSkge1xuXHRsZXQgZGlhZyA9IDA7XG5cdGZvciAoY29uc3QgW3JvdywgZWxlbWVudF0gb2YgYXJyYXkuZW50cmllcygpKSB7XG5cdFx0ZGlhZyArPSBlbGVtZW50W3Jvd107XG5cdH1cblxuXHRyZXR1cm4gZGlhZztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcnJheSkge1xuXHRyZXR1cm4gYXJyYXlbMF0ubWFwKChjb2wsIGkpID0+IGFycmF5Lm1hcChyb3cgPT4gcm93W2ldKSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocm93cywgY29scykge1xuXHRyZXR1cm4gbmV3IEFycmF5KHJvd3MpLmZpbGwoMSkubWFwKCgpID0+IG5ldyBBcnJheShjb2xzKS5maWxsKDApKTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==