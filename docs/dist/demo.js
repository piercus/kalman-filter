require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const observationCovariance = require('./observation-covariance.json');
const posVar = 100;
const timeStep = 0.2;
const sizeVar = 1;

module.exports = {
	observation: {
		dimension: 4,
		stateProjection: [
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
		],
		// Covariance generated thanks to getCovariance
		covariance: observationCovariance
		// Covariance: [posVar, posVar, posVar, posVar],

	},

	dynamic: {
		name: 'constant-acceleration',
		timeStep: 0.2,
		// Init: {
		// 	mean: [[943], [385], [75], [65], [-200], [-200], [0], [0], [-20], [-20], [0], [0]],
		//
		// 	covariance: [
		// 		[huge, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// 		[0, huge, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// 		[0, 0, huge, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// 		[0, 0, 0, huge, 0, 0, 0, 0, 0, 0, 0, 0],
		// 		[0, 0, 0, 0, huge, 0, 0, 0, 0, 0, 0, 0],
		// 		[0, 0, 0, 0, 0, huge, 0, 0, 0, 0, 0, 0],
		// 		[0, 0, 0, 0, 0, 0, huge, 0, 0, 0, 0, 0],
		// 		[0, 0, 0, 0, 0, 0, 0, huge, 0, 0, 0, 0],
		// 		[0, 0, 0, 0, 0, 0, 0, 0, huge, 0, 0, 0],
		// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, huge, 0, 0],
		// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, huge, 0],
		// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, huge],
		// 	]
		// },

		dimension: 12,

		covariance: [
			posVar,
			posVar,
			sizeVar,
			sizeVar,
			posVar * timeStep * timeStep,
			posVar * timeStep * timeStep,
			sizeVar * timeStep * timeStep,
			sizeVar * timeStep * timeStep,
			posVar * (timeStep ** 4),
			posVar * (timeStep ** 4),
			sizeVar * (timeStep ** 4),
			sizeVar * (timeStep ** 4)
		]
	}
};

},{"./observation-covariance.json":2}],2:[function(require,module,exports){
module.exports=[[34.31428571428572,-8.114285714285714,-9.185714285714285,3.0428571428571427],[-8.114285714285714,39.08571428571429,1.1857142857142857,-5.5285714285714285],[-9.185714285714285,1.1857142857142857,34.628571428571426,0.7857142857142857],[3.0428571428571427,-5.5285714285714285,0.7857142857142857,39.857142857142854]]
},{}],3:[function(require,module,exports){
module.exports={"observations":[[842,286,82,81],[714,184,92,80],[560,107,112,116],[418,94,96,110],[277,141,89,89],[146,200,88,72],[22,306,77,82]]}
},{}],4:[function(require,module,exports){
module.exports = function ({className, tag = 'div', bbox, parent, rotationCoefficient, scale, color}) {
	const element = document.createElement(tag);// eslint-disable-line no-undef
	element.id = 'arrow';
	element.className = className;
	element.style.top = Math.round(bbox[1]) + 'px';
	element.style.left = Math.round(bbox[0]) + 'px';
	if (rotationCoefficient) {
		element.style.transform = `rotate(${rotationCoefficient}deg)`;
		element.style.transformOrigin = '-5px 12px';
	}

	element.style.scale = scale;
	element.style.color = color;
	parent.append(element);
	return element;
};

},{}],5:[function(require,module,exports){
module.exports = function ({
	className,
	tag = 'div',
	bbox,
	parent,
	color,
	percentage,
	position = 'vertical'
}) {
	// Bbox contains 3 elements: left, top and bottom of the dashed line or top, left and right
	const element = document.createElement(tag);// eslint-disable-line no-undef
	// If (color) {
	// 	el.style.backgroundColor = color
	// }
	element.className = className;
	if (position === 'vertical') {
		element.style.width = 1 + 'px';
		element.style.height = Math.abs(bbox[1] - bbox[2]) + 'px';
		element.style.top = bbox[1] + 'px';
		element.style.left = bbox[0] + 'px';
	}

	if (position === 'horizontal') {
		element.style.height = 1 + 'px';
		element.style.width = Math.abs(bbox[1] - bbox[2]) + 'px';
		element.style.left = bbox[1] + 'px';
		element.style.top = bbox[0] + 'px';
	}

	// El.style.opacity = 1-percentage
	const urlString = 'data:image/svg+xml,%3csvg ' +
		'width=\'100%25\' ' +
		'height=\'100%25\' ' +
		'xmlns=\'http://www.w3.org/2000/svg\'%3e%3crect ' +
		'width=\'100%25\' ' +
		'height=\'100%25\' ' +
		'fill=\'none\' ' +
		`stroke='${color}' ` +
		'stroke-width=\'4\' ' +
		`stroke-dasharray='10%2c${Math.floor(percentage * 100)}' ` +
		'stroke-dashoffset=\'0\' ' +
		'stroke-linecap=\'round\'/%3e%3c/svg%3e';

	const backgroundImage1 = `url("${urlString}")`;

	// Const backgroundImage2 = "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='4' stroke-dasharray='10%2c20' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")"
	// console.log(backgroundImage1, backgroundImage2, backgroundImage1===backgroundImage2)
	element.style.backgroundImage = backgroundImage1;
	parent.append(element);
	return element;
};

},{}],6:[function(require,module,exports){
module.exports = function ({id, className, tag = 'div', bbox, parent, rotationCoefficient}) {
	const element = document.createElement(tag);// eslint-disable-line no-undef
	element.className = className;
	element.id = id;
	// If (color && lineStyle) {
	// 	el.style.border = `1px ${lineStyle} ${color}`
	// }
	element.style.width = Math.round(bbox[2]) + 'px';
	element.style.height = Math.round(bbox[3]) + 'px';
	element.style.top = Math.round(bbox[1] - (bbox[3] / 2)) + 'px';
	element.style.left = Math.round(bbox[0] - (bbox[2] / 2)) + 'px';
	if (rotationCoefficient) {
		element.style.transform = `rotate(${rotationCoefficient}deg)`;
	}

	parent.append(element);
	return element;
};

},{}],7:[function(require,module,exports){
const createElement = require('./create-element');
const createPoint = require('./create-point');
const createArrow = require('./create-arrow');
const createCustomDashedLine = require('./create-custom-dashed-line');

module.exports = function ({mean, covariance, color, parent, className, tag = 'div'}) {
	const container = document.createElement(tag); // eslint-disable-line no-undef

	container.className = className;
	const center = [mean[0][0] + (mean[2][0] / 2), mean[1][0] + (mean[3][0] / 2)];
	createElement({
		className: 'box',
		bbox: [center[0], center[1], mean[2][0], mean[3][0]],
		parent: container,
		color,
		lineStyle: 'solid'
	});
	createElement({
		className: 'box stdDev',
		bbox: [
			center[0],
			center[1],
			mean[2][0] + (2 * 3 * Math.sqrt(covariance[2][2])),
			mean[3][0] + (2 * 3 * Math.sqrt(covariance[3][3]))
		],
		parent: container,
		color
	});
	createPoint({
		bbox: [center[0], center[1], 2, 2],
		parent: container,
		color
	});
	const correlationXY = covariance[0][1] / (Math.sqrt(covariance[0][0]) * Math.sqrt(covariance[1][1]));
	createElement({
		className: 'ellipse stdDev',
		bbox: [
			center[0],
			center[1],
			2 * 3 * Math.sqrt(covariance[0][0]),
			2 * 3 * Math.sqrt(covariance[1][1])
		],
		parent: container,
		rotationCoefficient: correlationXY,
		color
	});
	const correlationXW = covariance[0][2] / (Math.sqrt(covariance[0][0]) * Math.sqrt(covariance[2][2]));
	createCustomDashedLine({
		className: 'dashedLine',
		bbox: [
			center[0],
			center[1] + (3 * Math.sqrt(covariance[1][1])),
			center[1] + (mean[3][0] / 2) + (3 * Math.sqrt(covariance[3][3]))
		],
		parent: container,
		percentage: Math.abs(correlationXW),
		color
	});
	const correlationYH = covariance[1][3] / (Math.sqrt(covariance[1][1]) * Math.sqrt(covariance[3][3]));
	createCustomDashedLine({
		className: 'dashedLine',
		bbox: [
			center[1],
			center[0] + (3 * Math.sqrt(covariance[0][0])),
			center[0] + (mean[2][0] / 2) + (3 * Math.sqrt(covariance[2][2]))
		],
		parent: container,
		percentage: Math.abs(correlationYH),
		position: 'horizontal',
		color
	});
	const arrowRotation = (-1 * Math.atan(mean[4][0] / mean[5][0]) * 180 / Math.PI) - 45;
	const arrowScale = Math.sqrt((mean[4][0] ** 2) + (mean[5][0] ** 2));
	createArrow({
		className: 'arrow',
		bbox: [
			center[0] + 6,
			center[1] - 9
		],
		parent: container,
		rotationCoefficient: arrowRotation,
		scale: arrowScale,
		color
	});
	parent.append(container);
};

},{"./create-arrow":4,"./create-custom-dashed-line":5,"./create-element":6,"./create-point":8}],8:[function(require,module,exports){
module.exports = function ({className = 'point', tag = 'div', bbox, parent}) {
	const element = document.createElement(tag);// eslint-disable-line no-undef
	element.className = className;
	// If (color) {
	// 	el.style.border = `2px solid ${color}`,
	// 	el.style.backgroundColor = `${color}`
	// }
	element.style.width = Math.round(bbox[2]) + 'px';
	element.style.height = Math.round(bbox[3]) + 'px';
	element.style.top = Math.round(bbox[1] - (bbox[3] / 2)) + 'px';
	element.style.left = Math.round(bbox[0] - (bbox[2] / 2)) + 'px';
	parent.append(element);
	return element;
};

},{}],9:[function(require,module,exports){
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

const defaultLogger = {
	info: (...args) => console.log(...args),
	debug: () => {},
	warn: (...args) => console.log(...args),
	error: (...args) => console.log(...args)
};

/**
* @class
* @property {DynamicConfig} dynamic the system's dynamic model
* @property {ObservationConfig} observation the system's observation model
*@property logger a Winston-like logger
*/
class CoreKalmanFilter {
	/**
	* @param {DynamicConfig} dynamic
	* @param {ObservationConfig} observation the system's observation model
	*/

	constructor({dynamic, observation, logger = defaultLogger}) {
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
			index: indexInit});
		return initState;
	}

	/**
	This will return the predicted covariance of a given previousCorrected State, this will help us to build the asymptoticState.
	* @param {State} previousCorrected
	* @returns{Array.<Array.<Number>>}
	*/

	getPredictedCovariance({previousCorrected} = {}) {
		previousCorrected = previousCorrected || this.getInitState();

		const getValueOptions = {previousCorrected, index: previousCorrected.index};
		const d = this.getValue(this.dynamic.transition, getValueOptions);
		const dTransposed = transpose(d);
		const covarianceInter = matMul(d, previousCorrected.covariance);
		const covariancePrevious = matMul(covarianceInter, dTransposed);
		const dynCov = this.getValue(this.dynamic.covariance, getValueOptions);

		const covariance = add(
			dynCov,
			covariancePrevious
		);
		return covariance;
	}

	/**
	This will return the new prediction, relatively to the dynamic model chosen
	* @param {State} previousCorrected State relative to our dynamic model
	* @returns{State} predicted State
	*/

	predict({previousCorrected} = {}) {
		previousCorrected = previousCorrected || this.getInitState();

		State.check(previousCorrected, {dimension: this.dynamic.dimension});

		const getValueOptions = {previousCorrected, index: previousCorrected.index};
		const d = this.getValue(this.dynamic.transition, getValueOptions);

		const mean = matMul(d, previousCorrected.mean);

		const covariance = this.getPredictedCovariance({previousCorrected});
		let index;
		if (typeof (previousCorrected.index) === 'number') {
			index = previousCorrected.index + 1;
		} else {
			index = null;
		}

		const predicted = new State({mean, covariance, index});
		this.logger.debug('Prediction done', predicted);
		return predicted;
	}
	/**
	This will return the new correction, taking into account the prediction made
	and the observation of the sensor
	* @param {State} predicted the previous State
	* @returns{Array<Array>} kalmanGain
	*/

	getGain({predicted, stateProjection}) {
		const getValueOptions = {predicted, index: predicted.index};
		stateProjection = stateProjection || this.getValue(this.observation.stateProjection, getValueOptions);
		const obsCovariance = this.getValue(this.observation.covariance, getValueOptions);
		const stateProjTransposed = transpose(stateProjection);
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

	getCorrectedCovariance({predicted}) {
		const getValueOptions = {predicted, index: predicted.index};
		const identity = getIdentity(predicted.covariance.length);
		const stateProj = this.getValue(this.observation.stateProjection, getValueOptions);
		const optimalKalmanGain = this.getGain({predicted, stateProjection: stateProj});
		return matMul(
			sub(identity, matMul(optimalKalmanGain, stateProj)),
			predicted.covariance
		);
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

		const getValueOptions = {predicted, index: predicted.index};
		const stateProj = this.getValue(this.observation.stateProjection, getValueOptions);

		const optimalKalmanGain = this.getGain({predicted, stateProjection: stateProj});
		const innovation = sub(
			observation,
			matMul(stateProj, predicted.mean)
		);
		const mean = add(
			predicted.mean,
			matMul(optimalKalmanGain, innovation)
		);
		if (Number.isNaN(mean[0][0])) {
			throw (new TypeError('Mean is NaN after correction'));
		}

		const covariance = this.getCorrectedCovariance({predicted});
		const corrected = new State({mean, covariance, index: predicted.index});
		this.logger.debug('Correction done', corrected);
		return corrected;
	}
}

module.exports = CoreKalmanFilter;

},{"../lib/linalgebra/add.js":14,"../lib/linalgebra/identity.js":18,"../lib/linalgebra/invert.js":19,"../lib/linalgebra/mat-mul.js":20,"../lib/linalgebra/sub.js":22,"../lib/linalgebra/transpose.js":25,"./state.js":33}],10:[function(require,module,exports){
const identity = require('../linalgebra/identity.js');

/**
*Creates a dynamic model, following constant acceleration model with respect with the dimensions provided in the observation parameters
* @param {DynamicConfig} dynamic
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/

module.exports = function (dynamic, observation) {
	const timeStep = dynamic.timeStep || 1;
	const observedProjection = observation.observedProjection;
	const stateProjection = observation.stateProjection;
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

},{"../linalgebra/identity.js":18}],11:[function(require,module,exports){
const identity = require('../linalgebra/identity.js');
/**
*Creates a dynamic model, following constant position model with respect with the dimensions provided in the observation parameters
* @param {DynamicConfig} dynamic
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/

module.exports = function (dynamic, observation) {
	let dimension = dynamic.dimension;
	const observationDimension = observation.dimension;
	const observedProjection = observation.observedProjection;
	const stateProjection = observation.stateProjection;
	let covariance = dynamic.covariance;

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

},{"../linalgebra/identity.js":18}],12:[function(require,module,exports){
const identity = require('../linalgebra/identity.js');

/**
*Creates a dynamic model, following constant position model with respect with the dimensions provided in the observation parameters
* @param {DynamicConfig} dynamic
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/

module.exports = function (dynamic, observation) {
	const timeStep = dynamic.timeStep || 1;
	const observedProjection = observation.observedProjection;
	const stateProjection = observation.stateProjection;
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

},{"../linalgebra/identity.js":18}],13:[function(require,module,exports){
const CoreKalmanFilter = require('./core-kalman-filter.js');

const arrayToMatrix = require('../lib/utils/array-to-matrix.js');
const setDimensions = require('../lib/setup/set-dimensions.js');
const checkDimensions = require('../lib/setup/check-dimensions.js');
const buildStateProjection = require('../lib/setup/build-state-projection.js');
const extendDynamicInit = require('../lib/setup/extend-dynamic-init.js');
const modelCollection = require('./model-collection.js');
const toFunction = require('../lib/utils/to-function.js');
const deepAssign = require('../lib/utils/deep-assign.js');
const polymorphMatrix = require('../lib/utils/polymorph-matrix.js');
const State = require('./state.js');
const distanceMat = require('../lib/linalgebra/distance-mat.js');

/**
*This function fills the given options by successively checking if it uses a registered model,
* it builds and checks the dynamic and observation dimensions, build the stateProjection if only observedProjection
*is given, and initialize dynamic.init
*@param {DynamicConfig} options.dynamic
*@param {ObservationConfig} options.observation
*/

const setupModelsParameters = function ({observation, dynamic}) {
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
*Returns the corresponding model without arrays as values but only functions
*@param {ObservationConfig} observation
*@param {DynamicConfig} dynamic
*@returns {ObservationConfig, DynamicConfig} model with respect of the Core Kalman Filter properties
*/
const modelsParametersToCoreOptions = function (modelToBeChanged) {
	const {observation, dynamic} = modelToBeChanged;
	return deepAssign(modelToBeChanged, {
		observation: {
			stateProjection: toFunction(polymorphMatrix(observation.stateProjection)),
			covariance: toFunction(polymorphMatrix(observation.covariance, {dimension: observation.dimension}))
		},
		dynamic: {
			transition: toFunction(polymorphMatrix(dynamic.transition)),
			covariance: toFunction(polymorphMatrix(dynamic.covariance, {dimension: dynamic.dimension}))
		}
	});
};

class KalmanFilter extends CoreKalmanFilter {
	/**
	* @param {DynamicConfig} options.dynamic
	* @param {ObservationConfig} options.observation the system's observation model
	*/
	constructor(options) {
		const modelsParameters = setupModelsParameters(options);
		const coreOptions = modelsParametersToCoreOptions(modelsParameters);

		super(Object.assign({}, options, coreOptions));
	}

	correct({predicted, observation}) {
		const coreObservation = arrayToMatrix({observation, dimension: this.observation.dimension});
		return super.correct({predicted, observation: coreObservation});
	}

	/**
	*Performs the prediction and the correction steps
	*@param {State} previousCorrected
	*@param {<Array.<Number>>} observation
	*@returns {Array.<Number>} the mean of the corrections
	*/

	filter({previousCorrected, observation}) {
		const predicted = super.predict({previousCorrected});
		return this.correct({predicted, observation});
	}

	/**
*Filters all the observations
*@param {Array.<Array.<Number>>} observations
*@returns {Array.<Number>} the mean of the corrections
*/
	filterAll(observations) {
		const {mean: meanInit, covariance: covarianceInit, index: indexInit} = this.dynamic.init;
		let previousCorrected = new State({
			mean: meanInit,
			covariance: covarianceInit,
			index: indexInit});
		const results = [];
		for (const observation of observations) {
			const predicted = this.predict({previousCorrected});
			previousCorrected = this.correct({
				predicted,
				observation
			});
			results.push(previousCorrected.mean);
		}

		return results;
	}

	/**
	* Returns an estimation of the asymptotic state covariance as explained in https://en.wikipedia.org/wiki/Kalman_filter#Asymptotic_form
	* in practice this can be used as a init.covariance value but is very costful calculation (that's why this is not made by default)
	* @param {Number} [tolerance=1e-6] returns when the last values differences are less than tolerance
	* @return {<Array.<Array.<Number>>>} covariance
	*/
	asymptoticStateCovariance(limitIterations = 1e2, tolerance = 1e-6) {
		let previousCorrected = super.getInitState();
		let predicted;
		const results = [];
		for (let i = 0; i < limitIterations; i++) {
			let count = 0;
			predicted = new State({covariance: super.getPredictedCovariance({previousCorrected})});
			previousCorrected = new State({covariance: super.getCorrectedCovariance({predicted})});
			results.push(previousCorrected.covariance);
			for (let j = 1; j < 4; j++) {
				if (distanceMat(previousCorrected.covariance, results[i - j]) < tolerance) {
					count += 1;
				}
			}

			if (count === 3) {
				return results[i];
			}
		}

		throw (new Error('The state covariance does not converge asymptotically'));
	}

	/**
	* Returns an estimation of the asymptotic gain, as explained in https://en.wikipedia.org/wiki/Kalman_filter#Asymptotic_form
	* @param {Number} [tolerance=1e-6] returns when the last values differences are less than tolerance
	* @return {<Array.<Array.<Number>>>} gain
	*/
	asymptoticGain(tolerance = 1e-6) {
		const asymptoticState = new State({covariance: this.asymptoticStateCovariance(tolerance)});
		return super.getGain({previousCorrected: asymptoticState});
	}
}

module.exports = KalmanFilter;

},{"../lib/linalgebra/distance-mat.js":16,"../lib/setup/build-state-projection.js":29,"../lib/setup/check-dimensions.js":30,"../lib/setup/extend-dynamic-init.js":31,"../lib/setup/set-dimensions.js":32,"../lib/utils/array-to-matrix.js":34,"../lib/utils/deep-assign.js":35,"../lib/utils/polymorph-matrix.js":36,"../lib/utils/to-function.js":37,"./core-kalman-filter.js":9,"./model-collection.js":27,"./state.js":33}],14:[function(require,module,exports){
const elemWise = require('./elem-wise');
/**
* Add matrixes together
* @param {...<Array.<Array.<Number>>} args list of matrix
* @returns {Array.<Array.<Number>>} sum
*/
module.exports = function (...args) {
	return elemWise(args, args2 => {
		return args2.reduce((a, b) => a + b, 0);
	});
};

},{"./elem-wise":17}],15:[function(require,module,exports){
const zeros = require('./zeros');

module.exports = function (mat) {
	const result = zeros(mat.length, mat.length);

	for (const [i, element] of mat.entries()) {
		result[i][i] = element;
	}

	return result;
};

},{"./zeros":26}],16:[function(require,module,exports){
const trace = require('./trace.js');
const transpose = require('./transpose.js');
const matSub = require('./sub.js');
const matMul = require('./mat-mul.js');
const sum = require('./sum.js');

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

},{"./mat-mul.js":20,"./sub.js":22,"./sum.js":23,"./trace.js":24,"./transpose.js":25}],17:[function(require,module,exports){
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


},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
const matrixInverse = require('matrix-inverse');

module.exports = function (m) {
	return matrixInverse(m);
};

},{"matrix-inverse":39}],20:[function(require,module,exports){
/**
* Multiply 2 matrixes together
* @param {<Array.<Array.<Number>>} m1
* @param {<Array.<Array.<Number>>} m2
* @returns {Array.<Array.<Number>>}
*/
module.exports = function (m1, m2) {
	// Console.log({m1, m2});
	const result = [];
	for (let i = 0; i < m1.length; i++) {
		result[i] = [];
		for (let j = 0; j < m2[0].length; j++) {
			let sum = 0;
			for (let k = 0; k < m1[0].length; k++) {
				sum += m1[i][k] * m2[k][j];
			}

			result[i][j] = sum;
		}
	}

	return result;
};

},{}],21:[function(require,module,exports){
/**
*This function returns the stateProjection paded with zeros with respect to a given
*observedProjection
*@param {Array.<Number> | Array.<Array.<Number>>} array the array we need to pad
*@param {Number} dimension in our case, the dynamic dimension
*@returns {Array.<Number> | Array.<Array.<Number>>} paded array
*/
module.exports = function (array, {dimension}) {
	const l = array[0].length;
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

},{}],22:[function(require,module,exports){
const elemWise = require('./elem-wise');

module.exports = function (...args) {
	return elemWise(args, ([a, b]) => a - b);
};

},{"./elem-wise":17}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
module.exports = function (array) {
	let diag = 0;
	for (const [row, element] of array.entries()) {
		diag += element[row];
	}

	return diag;
};

},{}],25:[function(require,module,exports){
module.exports = function (array) {
	return array[0].map((col, i) => array.map(row => row[i]));
};

},{}],26:[function(require,module,exports){
module.exports = function (rows, cols) {
	return new Array(rows).fill(1).map(() => new Array(cols).fill(0));
};

},{}],27:[function(require,module,exports){
const registeredDynamicModels = {
	'constant-position': require('../lib/dynamic/constant-position.js'),
	'constant-speed': require('../lib/dynamic/constant-speed.js'),
	'constant-acceleration': require('../lib/dynamic/constant-acceleration.js')
};
const registeredObservationModels = {
	sensors: require('../lib/observation/sensor.js')
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
			throw (new Error('The provided observation model name is not registered'));
		}

		return registeredObservationModels[observation.name](observation);
	},
	buildDynamic: (dynamic, observation) => {
		if (!registeredDynamicModels[dynamic.name]) {
			throw (new Error('The provided dynamic model name is not registered'));
		}

		return registeredDynamicModels[dynamic.name](dynamic, observation);
	}
};

},{"../lib/dynamic/constant-acceleration.js":10,"../lib/dynamic/constant-position.js":11,"../lib/dynamic/constant-speed.js":12,"../lib/observation/sensor.js":28}],28:[function(require,module,exports){
const identity = require('../linalgebra/identity.js');
const polymorphMatrix = require('../utils/polymorph-matrix.js');

/**
* @param {Number} sensorDimension
* @param {CovarianceParam} sensorCovariance
* @param {Number} nSensors
* @returns {ObservationConfig}
*/

module.exports = function (options) {
	const {sensorDimension = 1, sensorCovariance = 1, nSensors = 1} = options;
	const sensorsCovariance = polymorphMatrix(sensorCovariance, {dimension: sensorDimension});
	const oneSensorObservedProjection = identity(sensorDimension);
	let concatenatedObservedProjection = [];
	let concatenatedCovariance = [];
	for (let i = 0; i < nSensors; i++) {
		concatenatedObservedProjection = concatenatedObservedProjection.concat(oneSensorObservedProjection);
		concatenatedCovariance = concatenatedCovariance.concat(sensorsCovariance);
	}

	const formattedCovariance = polymorphMatrix(concatenatedCovariance, {dimension: nSensors * sensorDimension});
	return Object.assign({}, options, {
		dimension: sensorDimension * nSensors,
		observedProjection: concatenatedObservedProjection,
		covariance: formattedCovariance
	});
};

},{"../linalgebra/identity.js":18,"../utils/polymorph-matrix.js":36}],29:[function(require,module,exports){
const padWithZeros = require('../linalgebra/pad-with-zeros.js');
const identity = require('../linalgebra/identity.js');
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
		return {
			observation: Object.assign({}, observation, {
				stateProjection: padWithZeros(observedProjection, {dimension: dynamicDimension})
			}),
			dynamic
		};
	}

	if (observationDimension && dynamicDimension) {
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

},{"../linalgebra/identity.js":18,"../linalgebra/pad-with-zeros.js":21}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
const diag = require('../linalgebra/diag.js');

/**
*Initializes the dynamic.init when not given
*@param {ObservationConfig} observation
*@param {DynamicConfig} dynamic
*@returns {ObservationConfig, DynamicConfig}
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
					covariance: diag(covarianceArray)
				}
			})
		};
		return withInitOptions;
	}

	return {observation, dynamic};
};

},{"../linalgebra/diag.js":15}],32:[function(require,module,exports){
/**
*Verifies that dimensions are matching and set dynamic.dimension and observation.dimension
* with respect of stateProjection and transition dimensions
*@param {ObservationConfig} observation
*@param {DynamicConfig} dynamic
*@returns {ObservationConfig, DynamicConfig}
*/

module.exports = function ({observation, dynamic}) {
	const stateProjection = observation.stateProjection;
	const transition = dynamic.transition;
	const dynamicDimension = dynamic.dimension;
	const observationDimension = observation.dimension;

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

},{}],33:[function(require,module,exports){
const checkMatrix = function (matrix, shape) {
	if (matrix.reduce((a, b) => a.concat(b)).filter(a => Number.isNaN(a)).length > 0) {
		throw (new Error('Matrix should not have a NaN'));
	}

	if (shape) {
		checkShape(matrix, shape);
	}
};

const checkShape = function (matrix, shape) {
	if (matrix.length !== shape[0]) {
		throw (new Error('shape and length do not match'));
	}

	if (shape.length > 1) {
		return matrix.forEach(m => checkShape(m, shape.slice(1)));
	}
};

/**
 * @class
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
	*/
	check() {
		this.constructor.check(this);
	}

	/**
	* Check the consistency of the State's attributes
	*/

	static check(state, {dimension = null} = {}) {
		if (!(state instanceof State)) {
			throw (new TypeError('The argument is not a state'));
		}

		const {mean, covariance} = state; // Index
		const meanDimension = mean.length;
		if (typeof (dimension) === 'number' && meanDimension !== dimension) {
			throw (new Error(`${meanDimension} and ${dimension} are not the same`));
		}

		checkMatrix(mean, [meanDimension, 1]);
		checkMatrix(covariance, [meanDimension, meanDimension]);

		// If (typeof (index) !== 'number') {
		// 	throw (new TypeError('t must be a number'));
		// }
	}
}

module.exports = State;

},{}],34:[function(require,module,exports){
/**
*Returns the corresponding matrix in dim*1, given an dim matrix, and checks
* if corresponding with the observation dimension
*@param {Array.<Number> | Array.<Array.<Number>>} observation
*@param {Number} dimension
*@returns {Array.<Array.<Number>>}
*/

module.exports = function ({observation, dimension}) {
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

},{}],35:[function(require,module,exports){
const uniq = require('./uniq.js');
const limit = 100;

/**
*Equivalent to the Object.assign methode, takes several arguments and creates a new object corresponding to the assignment of the arguments
* @param {Object} args
* @param {Number} step
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

},{"./uniq.js":38}],36:[function(require,module,exports){
/**
* @typedef {Number | Array.<Number> | Array.<Array.<Number>>} CovarianceParam
*/
const diag = require('../linalgebra/diag');
/**
* If cov is a number, result will be Identity*cov
* If cov is an Array.<Number>, result will be diag(cov)
* If cov is an Array.<Array.<Number>>, result will be cov
* @param {CovarianceParam} cov
* @param {Number} dimension
* @returns {Array.<Array.<Number>>}
*/
module.exports = function (array, {dimension} = {}) {
	if (typeof (array) === 'number' || Array.isArray(array)) {
		if (typeof (array) === 'number' && typeof (dimension) === 'number') {
			return diag(new Array(dimension).fill(array));
		}

		if ((Array.isArray(array)) && (Array.isArray(array[0]))) {
			return array;
		}

		if ((Array.isArray(array)) && (typeof (array[0]) === 'number')) {
			return diag(array);
		}
	}

	return array;
};

},{"../linalgebra/diag":15}],37:[function(require,module,exports){
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

module.exports = function (array) {
	if (typeof (array) === 'function') {
		return array;
	}

	if (Array.isArray(array)) {
		return function () {
			return array;
		};
	}

	throw (new Error('Only arrays and functions are authorized'));
};

},{}],38:[function(require,module,exports){
module.exports = function (array) {
	return array.filter((value, index) =>
		array.indexOf(value) === index
	);
};

},{}],39:[function(require,module,exports){
var Sylvester = {}

Sylvester.Matrix = function() {}

Sylvester.Matrix.create = function(elements) {
  var M = new Sylvester.Matrix()
  return M.setElements(elements)
}

Sylvester.Matrix.I = function(n) {
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
  dup: function() {
    return Sylvester.Matrix.create(this.elements)
  },

  isSquare: function() {
    var cols = this.elements.length === 0 ? 0 : this.elements[0].length
    return this.elements.length === cols
  },

  toRightTriangular: function() {
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

  determinant: function() {
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

  isSingular: function() {
    return this.isSquare() && this.determinant() === 0
  },

  augment: function(matrix) {
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

  inverse: function() {
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

  setElements: function(els) {
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

module.exports = function(elements) {
  return Sylvester.Matrix.create(elements).inverse().elements
}

},{}],"main":[function(require,module,exports){
const KalmanFilter = require('../../lib/kalman-filter');

const noisyObservations = require('./observations.json').observations;
const kfOptions = require('./kf-options.js');
const createElement = require('./views/create-element');
const createGroupBoxes = require('./views/create-group-boxes');

const kf = new KalmanFilter(kfOptions);
let predicted = kf.predict();

const img = document.querySelector('#bikes');// eslint-disable-line no-undef

// Create all the elements of the prediction or correction phase
const delay = 200;

let promise = Promise.resolve();
let previousCorrected = null;

const delayPromise = delay => new Promise(resolve => setTimeout(resolve, delay));

module.exports = {
	run() {
		noisyObservations.forEach((box, index) => {
			promise = promise
				.then(() => {
					predicted = kf.predict({previousCorrected});
					const {mean, covariance} = predicted;

					createGroupBoxes({mean, covariance, parent: img, className: 'predicted', color: 'blue'});

					return delayPromise(delay);
				})
				.then((b => {
					createElement({
						className: 'observation',
						bbox: [
							b[0] + (b[2] / 2),
							b[1] + (b[3] / 2),
							b[2],
							b[3]
						],
						parent: img,
						color: 'white',
						lineStyle: 'solid'
					});

					return delayPromise(delay);
				}).bind(null, box, index))
				.then((b => {
					previousCorrected = kf.correct({predicted, observation: b});
					const {mean, covariance} = previousCorrected;

					createGroupBoxes({mean, covariance, parent: img, className: 'corrected', color: 'red'});

					return delayPromise(delay);
				}).bind(null, box, index));
		});
	}
};


},{"../../lib/kalman-filter":13,"./kf-options.js":1,"./observations.json":3,"./views/create-element":6,"./views/create-group-boxes":7}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vL3NyYy9rZi1vcHRpb25zLmpzIiwiZGVtby9zcmMvb2JzZXJ2YXRpb24tY292YXJpYW5jZS5qc29uIiwiZGVtby9zcmMvb2JzZXJ2YXRpb25zLmpzb24iLCJkZW1vL3NyYy92aWV3cy9jcmVhdGUtYXJyb3cuanMiLCJkZW1vL3NyYy92aWV3cy9jcmVhdGUtY3VzdG9tLWRhc2hlZC1saW5lLmpzIiwiZGVtby9zcmMvdmlld3MvY3JlYXRlLWVsZW1lbnQuanMiLCJkZW1vL3NyYy92aWV3cy9jcmVhdGUtZ3JvdXAtYm94ZXMuanMiLCJkZW1vL3NyYy92aWV3cy9jcmVhdGUtcG9pbnQuanMiLCJsaWIvY29yZS1rYWxtYW4tZmlsdGVyLmpzIiwibGliL2R5bmFtaWMvY29uc3RhbnQtYWNjZWxlcmF0aW9uLmpzIiwibGliL2R5bmFtaWMvY29uc3RhbnQtcG9zaXRpb24uanMiLCJsaWIvZHluYW1pYy9jb25zdGFudC1zcGVlZC5qcyIsImxpYi9rYWxtYW4tZmlsdGVyLmpzIiwibGliL2xpbmFsZ2VicmEvYWRkLmpzIiwibGliL2xpbmFsZ2VicmEvZGlhZy5qcyIsImxpYi9saW5hbGdlYnJhL2Rpc3RhbmNlLW1hdC5qcyIsImxpYi9saW5hbGdlYnJhL2VsZW0td2lzZS5qcyIsImxpYi9saW5hbGdlYnJhL2lkZW50aXR5LmpzIiwibGliL2xpbmFsZ2VicmEvaW52ZXJ0LmpzIiwibGliL2xpbmFsZ2VicmEvbWF0LW11bC5qcyIsImxpYi9saW5hbGdlYnJhL3BhZC13aXRoLXplcm9zLmpzIiwibGliL2xpbmFsZ2VicmEvc3ViLmpzIiwibGliL2xpbmFsZ2VicmEvc3VtLmpzIiwibGliL2xpbmFsZ2VicmEvdHJhY2UuanMiLCJsaWIvbGluYWxnZWJyYS90cmFuc3Bvc2UuanMiLCJsaWIvbGluYWxnZWJyYS96ZXJvcy5qcyIsImxpYi9tb2RlbC1jb2xsZWN0aW9uLmpzIiwibGliL29ic2VydmF0aW9uL3NlbnNvci5qcyIsImxpYi9zZXR1cC9idWlsZC1zdGF0ZS1wcm9qZWN0aW9uLmpzIiwibGliL3NldHVwL2NoZWNrLWRpbWVuc2lvbnMuanMiLCJsaWIvc2V0dXAvZXh0ZW5kLWR5bmFtaWMtaW5pdC5qcyIsImxpYi9zZXR1cC9zZXQtZGltZW5zaW9ucy5qcyIsImxpYi9zdGF0ZS5qcyIsImxpYi91dGlscy9hcnJheS10by1tYXRyaXguanMiLCJsaWIvdXRpbHMvZGVlcC1hc3NpZ24uanMiLCJsaWIvdXRpbHMvcG9seW1vcnBoLW1hdHJpeC5qcyIsImxpYi91dGlscy90by1mdW5jdGlvbi5qcyIsImxpYi91dGlscy91bmlxLmpzIiwibm9kZV9tb2R1bGVzL21hdHJpeC1pbnZlcnNlL21hdHJpeC1pbnZlcnNlLmpzIiwiZGVtby9zcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTs7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN01BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBvYnNlcnZhdGlvbkNvdmFyaWFuY2UgPSByZXF1aXJlKCcuL29ic2VydmF0aW9uLWNvdmFyaWFuY2UuanNvbicpO1xuY29uc3QgcG9zVmFyID0gMTAwO1xuY29uc3QgdGltZVN0ZXAgPSAwLjI7XG5jb25zdCBzaXplVmFyID0gMTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdG9ic2VydmF0aW9uOiB7XG5cdFx0ZGltZW5zaW9uOiA0LFxuXHRcdHN0YXRlUHJvamVjdGlvbjogW1xuXHRcdFx0WzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuXHRcdFx0WzAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuXHRcdFx0WzAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuXHRcdFx0WzAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdXG5cdFx0XSxcblx0XHQvLyBDb3ZhcmlhbmNlIGdlbmVyYXRlZCB0aGFua3MgdG8gZ2V0Q292YXJpYW5jZVxuXHRcdGNvdmFyaWFuY2U6IG9ic2VydmF0aW9uQ292YXJpYW5jZVxuXHRcdC8vIENvdmFyaWFuY2U6IFtwb3NWYXIsIHBvc1ZhciwgcG9zVmFyLCBwb3NWYXJdLFxuXG5cdH0sXG5cblx0ZHluYW1pYzoge1xuXHRcdG5hbWU6ICdjb25zdGFudC1hY2NlbGVyYXRpb24nLFxuXHRcdHRpbWVTdGVwOiAwLjIsXG5cdFx0Ly8gSW5pdDoge1xuXHRcdC8vIFx0bWVhbjogW1s5NDNdLCBbMzg1XSwgWzc1XSwgWzY1XSwgWy0yMDBdLCBbLTIwMF0sIFswXSwgWzBdLCBbLTIwXSwgWy0yMF0sIFswXSwgWzBdXSxcblx0XHQvL1xuXHRcdC8vIFx0Y292YXJpYW5jZTogW1xuXHRcdC8vIFx0XHRbaHVnZSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0Ly8gXHRcdFswLCBodWdlLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHQvLyBcdFx0WzAsIDAsIGh1Z2UsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuXHRcdC8vIFx0XHRbMCwgMCwgMCwgaHVnZSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0Ly8gXHRcdFswLCAwLCAwLCAwLCBodWdlLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHQvLyBcdFx0WzAsIDAsIDAsIDAsIDAsIGh1Z2UsIDAsIDAsIDAsIDAsIDAsIDBdLFxuXHRcdC8vIFx0XHRbMCwgMCwgMCwgMCwgMCwgMCwgaHVnZSwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0Ly8gXHRcdFswLCAwLCAwLCAwLCAwLCAwLCAwLCBodWdlLCAwLCAwLCAwLCAwXSxcblx0XHQvLyBcdFx0WzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIGh1Z2UsIDAsIDAsIDBdLFxuXHRcdC8vIFx0XHRbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgaHVnZSwgMCwgMF0sXG5cdFx0Ly8gXHRcdFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCBodWdlLCAwXSxcblx0XHQvLyBcdFx0WzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIGh1Z2VdLFxuXHRcdC8vIFx0XVxuXHRcdC8vIH0sXG5cblx0XHRkaW1lbnNpb246IDEyLFxuXG5cdFx0Y292YXJpYW5jZTogW1xuXHRcdFx0cG9zVmFyLFxuXHRcdFx0cG9zVmFyLFxuXHRcdFx0c2l6ZVZhcixcblx0XHRcdHNpemVWYXIsXG5cdFx0XHRwb3NWYXIgKiB0aW1lU3RlcCAqIHRpbWVTdGVwLFxuXHRcdFx0cG9zVmFyICogdGltZVN0ZXAgKiB0aW1lU3RlcCxcblx0XHRcdHNpemVWYXIgKiB0aW1lU3RlcCAqIHRpbWVTdGVwLFxuXHRcdFx0c2l6ZVZhciAqIHRpbWVTdGVwICogdGltZVN0ZXAsXG5cdFx0XHRwb3NWYXIgKiAodGltZVN0ZXAgKiogNCksXG5cdFx0XHRwb3NWYXIgKiAodGltZVN0ZXAgKiogNCksXG5cdFx0XHRzaXplVmFyICogKHRpbWVTdGVwICoqIDQpLFxuXHRcdFx0c2l6ZVZhciAqICh0aW1lU3RlcCAqKiA0KVxuXHRcdF1cblx0fVxufTtcbiIsIm1vZHVsZS5leHBvcnRzPVtbMzQuMzE0Mjg1NzE0Mjg1NzIsLTguMTE0Mjg1NzE0Mjg1NzE0LC05LjE4NTcxNDI4NTcxNDI4NSwzLjA0Mjg1NzE0Mjg1NzE0MjddLFstOC4xMTQyODU3MTQyODU3MTQsMzkuMDg1NzE0Mjg1NzE0MjksMS4xODU3MTQyODU3MTQyODU3LC01LjUyODU3MTQyODU3MTQyODVdLFstOS4xODU3MTQyODU3MTQyODUsMS4xODU3MTQyODU3MTQyODU3LDM0LjYyODU3MTQyODU3MTQyNiwwLjc4NTcxNDI4NTcxNDI4NTddLFszLjA0Mjg1NzE0Mjg1NzE0MjcsLTUuNTI4NTcxNDI4NTcxNDI4NSwwLjc4NTcxNDI4NTcxNDI4NTcsMzkuODU3MTQyODU3MTQyODU0XV0iLCJtb2R1bGUuZXhwb3J0cz17XCJvYnNlcnZhdGlvbnNcIjpbWzg0MiwyODYsODIsODFdLFs3MTQsMTg0LDkyLDgwXSxbNTYwLDEwNywxMTIsMTE2XSxbNDE4LDk0LDk2LDExMF0sWzI3NywxNDEsODksODldLFsxNDYsMjAwLDg4LDcyXSxbMjIsMzA2LDc3LDgyXV19IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe2NsYXNzTmFtZSwgdGFnID0gJ2RpdicsIGJib3gsIHBhcmVudCwgcm90YXRpb25Db2VmZmljaWVudCwgc2NhbGUsIGNvbG9yfSkge1xuXHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpOy8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblx0ZWxlbWVudC5pZCA9ICdhcnJvdyc7XG5cdGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXHRlbGVtZW50LnN0eWxlLnRvcCA9IE1hdGgucm91bmQoYmJveFsxXSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKGJib3hbMF0pICsgJ3B4Jztcblx0aWYgKHJvdGF0aW9uQ29lZmZpY2llbnQpIHtcblx0XHRlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHtyb3RhdGlvbkNvZWZmaWNpZW50fWRlZylgO1xuXHRcdGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gJy01cHggMTJweCc7XG5cdH1cblxuXHRlbGVtZW50LnN0eWxlLnNjYWxlID0gc2NhbGU7XG5cdGVsZW1lbnQuc3R5bGUuY29sb3IgPSBjb2xvcjtcblx0cGFyZW50LmFwcGVuZChlbGVtZW50KTtcblx0cmV0dXJuIGVsZW1lbnQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe1xuXHRjbGFzc05hbWUsXG5cdHRhZyA9ICdkaXYnLFxuXHRiYm94LFxuXHRwYXJlbnQsXG5cdGNvbG9yLFxuXHRwZXJjZW50YWdlLFxuXHRwb3NpdGlvbiA9ICd2ZXJ0aWNhbCdcbn0pIHtcblx0Ly8gQmJveCBjb250YWlucyAzIGVsZW1lbnRzOiBsZWZ0LCB0b3AgYW5kIGJvdHRvbSBvZiB0aGUgZGFzaGVkIGxpbmUgb3IgdG9wLCBsZWZ0IGFuZCByaWdodFxuXHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpOy8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblx0Ly8gSWYgKGNvbG9yKSB7XG5cdC8vIFx0ZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3Jcblx0Ly8gfVxuXHRlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcblx0aWYgKHBvc2l0aW9uID09PSAndmVydGljYWwnKSB7XG5cdFx0ZWxlbWVudC5zdHlsZS53aWR0aCA9IDEgKyAncHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gTWF0aC5hYnMoYmJveFsxXSAtIGJib3hbMl0pICsgJ3B4Jztcblx0XHRlbGVtZW50LnN0eWxlLnRvcCA9IGJib3hbMV0gKyAncHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUubGVmdCA9IGJib3hbMF0gKyAncHgnO1xuXHR9XG5cblx0aWYgKHBvc2l0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcblx0XHRlbGVtZW50LnN0eWxlLmhlaWdodCA9IDEgKyAncHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUud2lkdGggPSBNYXRoLmFicyhiYm94WzFdIC0gYmJveFsyXSkgKyAncHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUubGVmdCA9IGJib3hbMV0gKyAncHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUudG9wID0gYmJveFswXSArICdweCc7XG5cdH1cblxuXHQvLyBFbC5zdHlsZS5vcGFjaXR5ID0gMS1wZXJjZW50YWdlXG5cdGNvbnN0IHVybFN0cmluZyA9ICdkYXRhOmltYWdlL3N2Zyt4bWwsJTNjc3ZnICcgK1xuXHRcdCd3aWR0aD1cXCcxMDAlMjVcXCcgJyArXG5cdFx0J2hlaWdodD1cXCcxMDAlMjVcXCcgJyArXG5cdFx0J3htbG5zPVxcJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFwnJTNlJTNjcmVjdCAnICtcblx0XHQnd2lkdGg9XFwnMTAwJTI1XFwnICcgK1xuXHRcdCdoZWlnaHQ9XFwnMTAwJTI1XFwnICcgK1xuXHRcdCdmaWxsPVxcJ25vbmVcXCcgJyArXG5cdFx0YHN0cm9rZT0nJHtjb2xvcn0nIGAgK1xuXHRcdCdzdHJva2Utd2lkdGg9XFwnNFxcJyAnICtcblx0XHRgc3Ryb2tlLWRhc2hhcnJheT0nMTAlMmMke01hdGguZmxvb3IocGVyY2VudGFnZSAqIDEwMCl9JyBgICtcblx0XHQnc3Ryb2tlLWRhc2hvZmZzZXQ9XFwnMFxcJyAnICtcblx0XHQnc3Ryb2tlLWxpbmVjYXA9XFwncm91bmRcXCcvJTNlJTNjL3N2ZyUzZSc7XG5cblx0Y29uc3QgYmFja2dyb3VuZEltYWdlMSA9IGB1cmwoXCIke3VybFN0cmluZ31cIilgO1xuXG5cdC8vIENvbnN0IGJhY2tncm91bmRJbWFnZTIgPSBcInVybChcXFwiZGF0YTppbWFnZS9zdmcreG1sLCUzY3N2ZyB3aWR0aD0nMTAwJTI1JyBoZWlnaHQ9JzEwMCUyNScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyUzZSUzY3JlY3Qgd2lkdGg9JzEwMCUyNScgaGVpZ2h0PScxMDAlMjUnIGZpbGw9J25vbmUnIHN0cm9rZT0nJTIzMzMzJyBzdHJva2Utd2lkdGg9JzQnIHN0cm9rZS1kYXNoYXJyYXk9JzEwJTJjMjAnIHN0cm9rZS1kYXNob2Zmc2V0PScwJyBzdHJva2UtbGluZWNhcD0nc3F1YXJlJy8lM2UlM2Mvc3ZnJTNlXFxcIilcIlxuXHQvLyBjb25zb2xlLmxvZyhiYWNrZ3JvdW5kSW1hZ2UxLCBiYWNrZ3JvdW5kSW1hZ2UyLCBiYWNrZ3JvdW5kSW1hZ2UxPT09YmFja2dyb3VuZEltYWdlMilcblx0ZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBiYWNrZ3JvdW5kSW1hZ2UxO1xuXHRwYXJlbnQuYXBwZW5kKGVsZW1lbnQpO1xuXHRyZXR1cm4gZWxlbWVudDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7aWQsIGNsYXNzTmFtZSwgdGFnID0gJ2RpdicsIGJib3gsIHBhcmVudCwgcm90YXRpb25Db2VmZmljaWVudH0pIHtcblx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTsvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cdGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXHRlbGVtZW50LmlkID0gaWQ7XG5cdC8vIElmIChjb2xvciAmJiBsaW5lU3R5bGUpIHtcblx0Ly8gXHRlbC5zdHlsZS5ib3JkZXIgPSBgMXB4ICR7bGluZVN0eWxlfSAke2NvbG9yfWBcblx0Ly8gfVxuXHRlbGVtZW50LnN0eWxlLndpZHRoID0gTWF0aC5yb3VuZChiYm94WzJdKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gTWF0aC5yb3VuZChiYm94WzNdKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUudG9wID0gTWF0aC5yb3VuZChiYm94WzFdIC0gKGJib3hbM10gLyAyKSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKGJib3hbMF0gLSAoYmJveFsyXSAvIDIpKSArICdweCc7XG5cdGlmIChyb3RhdGlvbkNvZWZmaWNpZW50KSB7XG5cdFx0ZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7cm90YXRpb25Db2VmZmljaWVudH1kZWcpYDtcblx0fVxuXG5cdHBhcmVudC5hcHBlbmQoZWxlbWVudCk7XG5cdHJldHVybiBlbGVtZW50O1xufTtcbiIsImNvbnN0IGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuL2NyZWF0ZS1lbGVtZW50Jyk7XG5jb25zdCBjcmVhdGVQb2ludCA9IHJlcXVpcmUoJy4vY3JlYXRlLXBvaW50Jyk7XG5jb25zdCBjcmVhdGVBcnJvdyA9IHJlcXVpcmUoJy4vY3JlYXRlLWFycm93Jyk7XG5jb25zdCBjcmVhdGVDdXN0b21EYXNoZWRMaW5lID0gcmVxdWlyZSgnLi9jcmVhdGUtY3VzdG9tLWRhc2hlZC1saW5lJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHttZWFuLCBjb3ZhcmlhbmNlLCBjb2xvciwgcGFyZW50LCBjbGFzc05hbWUsIHRhZyA9ICdkaXYnfSkge1xuXHRjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXHRjb250YWluZXIuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXHRjb25zdCBjZW50ZXIgPSBbbWVhblswXVswXSArIChtZWFuWzJdWzBdIC8gMiksIG1lYW5bMV1bMF0gKyAobWVhblszXVswXSAvIDIpXTtcblx0Y3JlYXRlRWxlbWVudCh7XG5cdFx0Y2xhc3NOYW1lOiAnYm94Jyxcblx0XHRiYm94OiBbY2VudGVyWzBdLCBjZW50ZXJbMV0sIG1lYW5bMl1bMF0sIG1lYW5bM11bMF1dLFxuXHRcdHBhcmVudDogY29udGFpbmVyLFxuXHRcdGNvbG9yLFxuXHRcdGxpbmVTdHlsZTogJ3NvbGlkJ1xuXHR9KTtcblx0Y3JlYXRlRWxlbWVudCh7XG5cdFx0Y2xhc3NOYW1lOiAnYm94IHN0ZERldicsXG5cdFx0YmJveDogW1xuXHRcdFx0Y2VudGVyWzBdLFxuXHRcdFx0Y2VudGVyWzFdLFxuXHRcdFx0bWVhblsyXVswXSArICgyICogMyAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzJdWzJdKSksXG5cdFx0XHRtZWFuWzNdWzBdICsgKDIgKiAzICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbM11bM10pKVxuXHRcdF0sXG5cdFx0cGFyZW50OiBjb250YWluZXIsXG5cdFx0Y29sb3Jcblx0fSk7XG5cdGNyZWF0ZVBvaW50KHtcblx0XHRiYm94OiBbY2VudGVyWzBdLCBjZW50ZXJbMV0sIDIsIDJdLFxuXHRcdHBhcmVudDogY29udGFpbmVyLFxuXHRcdGNvbG9yXG5cdH0pO1xuXHRjb25zdCBjb3JyZWxhdGlvblhZID0gY292YXJpYW5jZVswXVsxXSAvIChNYXRoLnNxcnQoY292YXJpYW5jZVswXVswXSkgKiBNYXRoLnNxcnQoY292YXJpYW5jZVsxXVsxXSkpO1xuXHRjcmVhdGVFbGVtZW50KHtcblx0XHRjbGFzc05hbWU6ICdlbGxpcHNlIHN0ZERldicsXG5cdFx0YmJveDogW1xuXHRcdFx0Y2VudGVyWzBdLFxuXHRcdFx0Y2VudGVyWzFdLFxuXHRcdFx0MiAqIDMgKiBNYXRoLnNxcnQoY292YXJpYW5jZVswXVswXSksXG5cdFx0XHQyICogMyAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzFdWzFdKVxuXHRcdF0sXG5cdFx0cGFyZW50OiBjb250YWluZXIsXG5cdFx0cm90YXRpb25Db2VmZmljaWVudDogY29ycmVsYXRpb25YWSxcblx0XHRjb2xvclxuXHR9KTtcblx0Y29uc3QgY29ycmVsYXRpb25YVyA9IGNvdmFyaWFuY2VbMF1bMl0gLyAoTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMF1bMF0pICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMl1bMl0pKTtcblx0Y3JlYXRlQ3VzdG9tRGFzaGVkTGluZSh7XG5cdFx0Y2xhc3NOYW1lOiAnZGFzaGVkTGluZScsXG5cdFx0YmJveDogW1xuXHRcdFx0Y2VudGVyWzBdLFxuXHRcdFx0Y2VudGVyWzFdICsgKDMgKiBNYXRoLnNxcnQoY292YXJpYW5jZVsxXVsxXSkpLFxuXHRcdFx0Y2VudGVyWzFdICsgKG1lYW5bM11bMF0gLyAyKSArICgzICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbM11bM10pKVxuXHRcdF0sXG5cdFx0cGFyZW50OiBjb250YWluZXIsXG5cdFx0cGVyY2VudGFnZTogTWF0aC5hYnMoY29ycmVsYXRpb25YVyksXG5cdFx0Y29sb3Jcblx0fSk7XG5cdGNvbnN0IGNvcnJlbGF0aW9uWUggPSBjb3ZhcmlhbmNlWzFdWzNdIC8gKE1hdGguc3FydChjb3ZhcmlhbmNlWzFdWzFdKSAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzNdWzNdKSk7XG5cdGNyZWF0ZUN1c3RvbURhc2hlZExpbmUoe1xuXHRcdGNsYXNzTmFtZTogJ2Rhc2hlZExpbmUnLFxuXHRcdGJib3g6IFtcblx0XHRcdGNlbnRlclsxXSxcblx0XHRcdGNlbnRlclswXSArICgzICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMF1bMF0pKSxcblx0XHRcdGNlbnRlclswXSArIChtZWFuWzJdWzBdIC8gMikgKyAoMyAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzJdWzJdKSlcblx0XHRdLFxuXHRcdHBhcmVudDogY29udGFpbmVyLFxuXHRcdHBlcmNlbnRhZ2U6IE1hdGguYWJzKGNvcnJlbGF0aW9uWUgpLFxuXHRcdHBvc2l0aW9uOiAnaG9yaXpvbnRhbCcsXG5cdFx0Y29sb3Jcblx0fSk7XG5cdGNvbnN0IGFycm93Um90YXRpb24gPSAoLTEgKiBNYXRoLmF0YW4obWVhbls0XVswXSAvIG1lYW5bNV1bMF0pICogMTgwIC8gTWF0aC5QSSkgLSA0NTtcblx0Y29uc3QgYXJyb3dTY2FsZSA9IE1hdGguc3FydCgobWVhbls0XVswXSAqKiAyKSArIChtZWFuWzVdWzBdICoqIDIpKTtcblx0Y3JlYXRlQXJyb3coe1xuXHRcdGNsYXNzTmFtZTogJ2Fycm93Jyxcblx0XHRiYm94OiBbXG5cdFx0XHRjZW50ZXJbMF0gKyA2LFxuXHRcdFx0Y2VudGVyWzFdIC0gOVxuXHRcdF0sXG5cdFx0cGFyZW50OiBjb250YWluZXIsXG5cdFx0cm90YXRpb25Db2VmZmljaWVudDogYXJyb3dSb3RhdGlvbixcblx0XHRzY2FsZTogYXJyb3dTY2FsZSxcblx0XHRjb2xvclxuXHR9KTtcblx0cGFyZW50LmFwcGVuZChjb250YWluZXIpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHtjbGFzc05hbWUgPSAncG9pbnQnLCB0YWcgPSAnZGl2JywgYmJveCwgcGFyZW50fSkge1xuXHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpOy8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblx0ZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG5cdC8vIElmIChjb2xvcikge1xuXHQvLyBcdGVsLnN0eWxlLmJvcmRlciA9IGAycHggc29saWQgJHtjb2xvcn1gLFxuXHQvLyBcdGVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGAke2NvbG9yfWBcblx0Ly8gfVxuXHRlbGVtZW50LnN0eWxlLndpZHRoID0gTWF0aC5yb3VuZChiYm94WzJdKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gTWF0aC5yb3VuZChiYm94WzNdKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUudG9wID0gTWF0aC5yb3VuZChiYm94WzFdIC0gKGJib3hbM10gLyAyKSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKGJib3hbMF0gLSAoYmJveFsyXSAvIDIpKSArICdweCc7XG5cdHBhcmVudC5hcHBlbmQoZWxlbWVudCk7XG5cdHJldHVybiBlbGVtZW50O1xufTtcbiIsImNvbnN0IG1hdE11bCA9IHJlcXVpcmUoJy4uL2xpYi9saW5hbGdlYnJhL21hdC1tdWwuanMnKTtcbmNvbnN0IHRyYW5zcG9zZSA9IHJlcXVpcmUoJy4uL2xpYi9saW5hbGdlYnJhL3RyYW5zcG9zZS5qcycpO1xuY29uc3QgYWRkID0gcmVxdWlyZSgnLi4vbGliL2xpbmFsZ2VicmEvYWRkLmpzJyk7XG5jb25zdCBpbnZlcnQgPSByZXF1aXJlKCcuLi9saWIvbGluYWxnZWJyYS9pbnZlcnQuanMnKTtcbmNvbnN0IHN1YiA9IHJlcXVpcmUoJy4uL2xpYi9saW5hbGdlYnJhL3N1Yi5qcycpO1xuY29uc3QgZ2V0SWRlbnRpdHkgPSByZXF1aXJlKCcuLi9saWIvbGluYWxnZWJyYS9pZGVudGl0eS5qcycpO1xuY29uc3QgU3RhdGUgPSByZXF1aXJlKCcuL3N0YXRlLmpzJyk7XG5cbi8qKlxuKiBAY2FsbGJhY2sgT2JzZXJ2YXRpb25DYWxsYmFja1xuKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuKiBAcGFyYW0ge051bWJlcn0gb3B0cy5pbmRleFxuKiBAcGFyYW0ge051bWJlcn0gb3B0cy5wcmV2aW91c0NvcnJlY3RlZFxuKi9cblxuLyoqXG4qIEB0eXBlZGVmIHtPYmplY3R9IE9ic2VydmF0aW9uQ29uZmlnXG4qIEBwcm9wZXJ0eSB7TnVtYmVyfSBkaW1lbnNpb25cbiogQHByb3BlcnR5IHtBcnJheS5BcnJheS48TnVtYmVyPj4gfCBPYnNlcnZhdGlvbkNhbGxiYWNrfSBzdGF0ZVByb2plY3Rpb24sXG4qIEBwcm9wZXJ0eSB7QXJyYXkuQXJyYXkuPE51bWJlcj4+IHwgT2JzZXJ2YXRpb25DYWxsYmFja30gY292YXJpYW5jZVxuKi9cblxuLyoqXG4qIEBjYWxsYmFjayBEeW5hbWljQ2FsbGJhY2tcbiogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiogQHBhcmFtIHtOdW1iZXJ9IG9wdHMuaW5kZXhcbiogQHBhcmFtIHtTdGF0ZX0gb3B0cy5wcmVkaWN0ZWRcbiogQHBhcmFtIHtPYnNlcnZhdGlvbn0gb3B0cy5vYnNlcnZhdGlvblxuKi9cblxuLyoqXG4qIEB0eXBlZGVmIHtPYmplY3R9IER5bmFtaWNDb25maWdcbiogQHByb3BlcnR5IHtOdW1iZXJ9IGRpbWVuc2lvblxuKiBAcHJvcGVydHkge0FycmF5LkFycmF5LjxOdW1iZXI+PiB8IER5bmFtaWNDYWxsYmFja30gdHJhbnNpdGlvbixcbiogQHByb3BlcnR5IHtBcnJheS5BcnJheS48TnVtYmVyPj4gfCBEeW5hbWljQ2FsbGJhY2t9IGNvdmFyaWFuY2VcbiovXG5cbmNvbnN0IGRlZmF1bHRMb2dnZXIgPSB7XG5cdGluZm86ICguLi5hcmdzKSA9PiBjb25zb2xlLmxvZyguLi5hcmdzKSxcblx0ZGVidWc6ICgpID0+IHt9LFxuXHR3YXJuOiAoLi4uYXJncykgPT4gY29uc29sZS5sb2coLi4uYXJncyksXG5cdGVycm9yOiAoLi4uYXJncykgPT4gY29uc29sZS5sb2coLi4uYXJncylcbn07XG5cbi8qKlxuKiBAY2xhc3NcbiogQHByb3BlcnR5IHtEeW5hbWljQ29uZmlnfSBkeW5hbWljIHRoZSBzeXN0ZW0ncyBkeW5hbWljIG1vZGVsXG4qIEBwcm9wZXJ0eSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uIHRoZSBzeXN0ZW0ncyBvYnNlcnZhdGlvbiBtb2RlbFxuKkBwcm9wZXJ0eSBsb2dnZXIgYSBXaW5zdG9uLWxpa2UgbG9nZ2VyXG4qL1xuY2xhc3MgQ29yZUthbG1hbkZpbHRlciB7XG5cdC8qKlxuXHQqIEBwYXJhbSB7RHluYW1pY0NvbmZpZ30gZHluYW1pY1xuXHQqIEBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uIHRoZSBzeXN0ZW0ncyBvYnNlcnZhdGlvbiBtb2RlbFxuXHQqL1xuXG5cdGNvbnN0cnVjdG9yKHtkeW5hbWljLCBvYnNlcnZhdGlvbiwgbG9nZ2VyID0gZGVmYXVsdExvZ2dlcn0pIHtcblx0XHR0aGlzLmR5bmFtaWMgPSBkeW5hbWljO1xuXHRcdHRoaXMub2JzZXJ2YXRpb24gPSBvYnNlcnZhdGlvbjtcblx0XHR0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcblx0fVxuXG5cdGdldFZhbHVlKGZuLCBvcHRpb25zKSB7XG5cdFx0cmV0dXJuICh0eXBlb2YgKGZuKSA9PT0gJ2Z1bmN0aW9uJyA/IGZuKG9wdGlvbnMpIDogZm4pO1xuXHR9XG5cblx0Z2V0SW5pdFN0YXRlKCkge1xuXHRcdGNvbnN0IHttZWFuOiBtZWFuSW5pdCwgY292YXJpYW5jZTogY292YXJpYW5jZUluaXQsIGluZGV4OiBpbmRleEluaXR9ID0gdGhpcy5keW5hbWljLmluaXQ7XG5cdFx0Y29uc3QgaW5pdFN0YXRlID0gbmV3IFN0YXRlKHtcblx0XHRcdG1lYW46IG1lYW5Jbml0LFxuXHRcdFx0Y292YXJpYW5jZTogY292YXJpYW5jZUluaXQsXG5cdFx0XHRpbmRleDogaW5kZXhJbml0fSk7XG5cdFx0cmV0dXJuIGluaXRTdGF0ZTtcblx0fVxuXG5cdC8qKlxuXHRUaGlzIHdpbGwgcmV0dXJuIHRoZSBwcmVkaWN0ZWQgY292YXJpYW5jZSBvZiBhIGdpdmVuIHByZXZpb3VzQ29ycmVjdGVkIFN0YXRlLCB0aGlzIHdpbGwgaGVscCB1cyB0byBidWlsZCB0aGUgYXN5bXB0b3RpY1N0YXRlLlxuXHQqIEBwYXJhbSB7U3RhdGV9IHByZXZpb3VzQ29ycmVjdGVkXG5cdCogQHJldHVybnN7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn1cblx0Ki9cblxuXHRnZXRQcmVkaWN0ZWRDb3ZhcmlhbmNlKHtwcmV2aW91c0NvcnJlY3RlZH0gPSB7fSkge1xuXHRcdHByZXZpb3VzQ29ycmVjdGVkID0gcHJldmlvdXNDb3JyZWN0ZWQgfHwgdGhpcy5nZXRJbml0U3RhdGUoKTtcblxuXHRcdGNvbnN0IGdldFZhbHVlT3B0aW9ucyA9IHtwcmV2aW91c0NvcnJlY3RlZCwgaW5kZXg6IHByZXZpb3VzQ29ycmVjdGVkLmluZGV4fTtcblx0XHRjb25zdCBkID0gdGhpcy5nZXRWYWx1ZSh0aGlzLmR5bmFtaWMudHJhbnNpdGlvbiwgZ2V0VmFsdWVPcHRpb25zKTtcblx0XHRjb25zdCBkVHJhbnNwb3NlZCA9IHRyYW5zcG9zZShkKTtcblx0XHRjb25zdCBjb3ZhcmlhbmNlSW50ZXIgPSBtYXRNdWwoZCwgcHJldmlvdXNDb3JyZWN0ZWQuY292YXJpYW5jZSk7XG5cdFx0Y29uc3QgY292YXJpYW5jZVByZXZpb3VzID0gbWF0TXVsKGNvdmFyaWFuY2VJbnRlciwgZFRyYW5zcG9zZWQpO1xuXHRcdGNvbnN0IGR5bkNvdiA9IHRoaXMuZ2V0VmFsdWUodGhpcy5keW5hbWljLmNvdmFyaWFuY2UsIGdldFZhbHVlT3B0aW9ucyk7XG5cblx0XHRjb25zdCBjb3ZhcmlhbmNlID0gYWRkKFxuXHRcdFx0ZHluQ292LFxuXHRcdFx0Y292YXJpYW5jZVByZXZpb3VzXG5cdFx0KTtcblx0XHRyZXR1cm4gY292YXJpYW5jZTtcblx0fVxuXG5cdC8qKlxuXHRUaGlzIHdpbGwgcmV0dXJuIHRoZSBuZXcgcHJlZGljdGlvbiwgcmVsYXRpdmVseSB0byB0aGUgZHluYW1pYyBtb2RlbCBjaG9zZW5cblx0KiBAcGFyYW0ge1N0YXRlfSBwcmV2aW91c0NvcnJlY3RlZCBTdGF0ZSByZWxhdGl2ZSB0byBvdXIgZHluYW1pYyBtb2RlbFxuXHQqIEByZXR1cm5ze1N0YXRlfSBwcmVkaWN0ZWQgU3RhdGVcblx0Ki9cblxuXHRwcmVkaWN0KHtwcmV2aW91c0NvcnJlY3RlZH0gPSB7fSkge1xuXHRcdHByZXZpb3VzQ29ycmVjdGVkID0gcHJldmlvdXNDb3JyZWN0ZWQgfHwgdGhpcy5nZXRJbml0U3RhdGUoKTtcblxuXHRcdFN0YXRlLmNoZWNrKHByZXZpb3VzQ29ycmVjdGVkLCB7ZGltZW5zaW9uOiB0aGlzLmR5bmFtaWMuZGltZW5zaW9ufSk7XG5cblx0XHRjb25zdCBnZXRWYWx1ZU9wdGlvbnMgPSB7cHJldmlvdXNDb3JyZWN0ZWQsIGluZGV4OiBwcmV2aW91c0NvcnJlY3RlZC5pbmRleH07XG5cdFx0Y29uc3QgZCA9IHRoaXMuZ2V0VmFsdWUodGhpcy5keW5hbWljLnRyYW5zaXRpb24sIGdldFZhbHVlT3B0aW9ucyk7XG5cblx0XHRjb25zdCBtZWFuID0gbWF0TXVsKGQsIHByZXZpb3VzQ29ycmVjdGVkLm1lYW4pO1xuXG5cdFx0Y29uc3QgY292YXJpYW5jZSA9IHRoaXMuZ2V0UHJlZGljdGVkQ292YXJpYW5jZSh7cHJldmlvdXNDb3JyZWN0ZWR9KTtcblx0XHRsZXQgaW5kZXg7XG5cdFx0aWYgKHR5cGVvZiAocHJldmlvdXNDb3JyZWN0ZWQuaW5kZXgpID09PSAnbnVtYmVyJykge1xuXHRcdFx0aW5kZXggPSBwcmV2aW91c0NvcnJlY3RlZC5pbmRleCArIDE7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGluZGV4ID0gbnVsbDtcblx0XHR9XG5cblx0XHRjb25zdCBwcmVkaWN0ZWQgPSBuZXcgU3RhdGUoe21lYW4sIGNvdmFyaWFuY2UsIGluZGV4fSk7XG5cdFx0dGhpcy5sb2dnZXIuZGVidWcoJ1ByZWRpY3Rpb24gZG9uZScsIHByZWRpY3RlZCk7XG5cdFx0cmV0dXJuIHByZWRpY3RlZDtcblx0fVxuXHQvKipcblx0VGhpcyB3aWxsIHJldHVybiB0aGUgbmV3IGNvcnJlY3Rpb24sIHRha2luZyBpbnRvIGFjY291bnQgdGhlIHByZWRpY3Rpb24gbWFkZVxuXHRhbmQgdGhlIG9ic2VydmF0aW9uIG9mIHRoZSBzZW5zb3Jcblx0KiBAcGFyYW0ge1N0YXRlfSBwcmVkaWN0ZWQgdGhlIHByZXZpb3VzIFN0YXRlXG5cdCogQHJldHVybnN7QXJyYXk8QXJyYXk+fSBrYWxtYW5HYWluXG5cdCovXG5cblx0Z2V0R2Fpbih7cHJlZGljdGVkLCBzdGF0ZVByb2plY3Rpb259KSB7XG5cdFx0Y29uc3QgZ2V0VmFsdWVPcHRpb25zID0ge3ByZWRpY3RlZCwgaW5kZXg6IHByZWRpY3RlZC5pbmRleH07XG5cdFx0c3RhdGVQcm9qZWN0aW9uID0gc3RhdGVQcm9qZWN0aW9uIHx8IHRoaXMuZ2V0VmFsdWUodGhpcy5vYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24sIGdldFZhbHVlT3B0aW9ucyk7XG5cdFx0Y29uc3Qgb2JzQ292YXJpYW5jZSA9IHRoaXMuZ2V0VmFsdWUodGhpcy5vYnNlcnZhdGlvbi5jb3ZhcmlhbmNlLCBnZXRWYWx1ZU9wdGlvbnMpO1xuXHRcdGNvbnN0IHN0YXRlUHJvalRyYW5zcG9zZWQgPSB0cmFuc3Bvc2Uoc3RhdGVQcm9qZWN0aW9uKTtcblx0XHRjb25zdCBub2lzZWxlc3NJbm5vdmF0aW9uID0gbWF0TXVsKFxuXHRcdFx0bWF0TXVsKHN0YXRlUHJvamVjdGlvbiwgcHJlZGljdGVkLmNvdmFyaWFuY2UpLFxuXHRcdFx0c3RhdGVQcm9qVHJhbnNwb3NlZFxuXHRcdCk7XG5cdFx0Y29uc3QgaW5ub3ZhdGlvbkNvdmFyaWFuY2UgPSBhZGQobm9pc2VsZXNzSW5ub3ZhdGlvbiwgb2JzQ292YXJpYW5jZSk7XG5cdFx0Y29uc3Qgb3B0aW1hbEthbG1hbkdhaW4gPSBtYXRNdWwoXG5cdFx0XHRtYXRNdWwocHJlZGljdGVkLmNvdmFyaWFuY2UsIHN0YXRlUHJvalRyYW5zcG9zZWQpLFxuXHRcdFx0aW52ZXJ0KGlubm92YXRpb25Db3ZhcmlhbmNlKVxuXHRcdCk7XG5cdFx0cmV0dXJuIG9wdGltYWxLYWxtYW5HYWluO1xuXHR9XG5cblx0LyoqXG5cdFRoaXMgd2lsbCByZXR1cm4gdGhlIGNvcnJlY3RlZCBjb3ZhcmlhbmNlIG9mIGEgZ2l2ZW4gcHJlZGljdGVkIFN0YXRlLCB0aGlzIHdpbGwgaGVscCB1cyB0byBidWlsZCB0aGUgYXN5bXB0b3RpY1N0YXRlLlxuXHQqIEBwYXJhbSB7U3RhdGV9IHByZWRpY3RlZCB0aGUgcHJldmlvdXMgU3RhdGVcblx0KiBAcmV0dXJuc3tBcnJheS48QXJyYXkuPE51bWJlcj4+fVxuXHQqL1xuXG5cdGdldENvcnJlY3RlZENvdmFyaWFuY2Uoe3ByZWRpY3RlZH0pIHtcblx0XHRjb25zdCBnZXRWYWx1ZU9wdGlvbnMgPSB7cHJlZGljdGVkLCBpbmRleDogcHJlZGljdGVkLmluZGV4fTtcblx0XHRjb25zdCBpZGVudGl0eSA9IGdldElkZW50aXR5KHByZWRpY3RlZC5jb3ZhcmlhbmNlLmxlbmd0aCk7XG5cdFx0Y29uc3Qgc3RhdGVQcm9qID0gdGhpcy5nZXRWYWx1ZSh0aGlzLm9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbiwgZ2V0VmFsdWVPcHRpb25zKTtcblx0XHRjb25zdCBvcHRpbWFsS2FsbWFuR2FpbiA9IHRoaXMuZ2V0R2Fpbih7cHJlZGljdGVkLCBzdGF0ZVByb2plY3Rpb246IHN0YXRlUHJvan0pO1xuXHRcdHJldHVybiBtYXRNdWwoXG5cdFx0XHRzdWIoaWRlbnRpdHksIG1hdE11bChvcHRpbWFsS2FsbWFuR2Fpbiwgc3RhdGVQcm9qKSksXG5cdFx0XHRwcmVkaWN0ZWQuY292YXJpYW5jZVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0VGhpcyB3aWxsIHJldHVybiB0aGUgbmV3IGNvcnJlY3Rpb24sIHRha2luZyBpbnRvIGFjY291bnQgdGhlIHByZWRpY3Rpb24gbWFkZVxuXHRhbmQgdGhlIG9ic2VydmF0aW9uIG9mIHRoZSBzZW5zb3Jcblx0KiBAcGFyYW0ge1N0YXRlfSBwcmVkaWN0ZWQgdGhlIHByZXZpb3VzIFN0YXRlXG5cdCogQHBhcmFtIHtBcnJheX0gb2JzZXJ2YXRpb24gdGhlIG9ic2VydmF0aW9uIG9mIHRoZSBzZW5zb3Jcblx0KiBAcmV0dXJuc3tTdGF0ZX0gY29ycmVjdGVkIFN0YXRlIG9mIHRoZSBLYWxtYW4gRmlsdGVyXG5cdCovXG5cblx0Y29ycmVjdCh7cHJlZGljdGVkLCBvYnNlcnZhdGlvbn0pIHtcblx0XHRTdGF0ZS5jaGVjayhwcmVkaWN0ZWQsIHtkaW1lbnNpb246IHRoaXMuZHluYW1pYy5kaW1lbnNpb259KTtcblx0XHRpZiAoIW9ic2VydmF0aW9uKSB7XG5cdFx0XHR0aHJvdyAobmV3IEVycm9yKCdubyBtZWFzdXJlIGF2YWlsYWJsZScpKTtcblx0XHR9XG5cblx0XHRjb25zdCBnZXRWYWx1ZU9wdGlvbnMgPSB7cHJlZGljdGVkLCBpbmRleDogcHJlZGljdGVkLmluZGV4fTtcblx0XHRjb25zdCBzdGF0ZVByb2ogPSB0aGlzLmdldFZhbHVlKHRoaXMub2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uLCBnZXRWYWx1ZU9wdGlvbnMpO1xuXG5cdFx0Y29uc3Qgb3B0aW1hbEthbG1hbkdhaW4gPSB0aGlzLmdldEdhaW4oe3ByZWRpY3RlZCwgc3RhdGVQcm9qZWN0aW9uOiBzdGF0ZVByb2p9KTtcblx0XHRjb25zdCBpbm5vdmF0aW9uID0gc3ViKFxuXHRcdFx0b2JzZXJ2YXRpb24sXG5cdFx0XHRtYXRNdWwoc3RhdGVQcm9qLCBwcmVkaWN0ZWQubWVhbilcblx0XHQpO1xuXHRcdGNvbnN0IG1lYW4gPSBhZGQoXG5cdFx0XHRwcmVkaWN0ZWQubWVhbixcblx0XHRcdG1hdE11bChvcHRpbWFsS2FsbWFuR2FpbiwgaW5ub3ZhdGlvbilcblx0XHQpO1xuXHRcdGlmIChOdW1iZXIuaXNOYU4obWVhblswXVswXSkpIHtcblx0XHRcdHRocm93IChuZXcgVHlwZUVycm9yKCdNZWFuIGlzIE5hTiBhZnRlciBjb3JyZWN0aW9uJykpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGNvdmFyaWFuY2UgPSB0aGlzLmdldENvcnJlY3RlZENvdmFyaWFuY2Uoe3ByZWRpY3RlZH0pO1xuXHRcdGNvbnN0IGNvcnJlY3RlZCA9IG5ldyBTdGF0ZSh7bWVhbiwgY292YXJpYW5jZSwgaW5kZXg6IHByZWRpY3RlZC5pbmRleH0pO1xuXHRcdHRoaXMubG9nZ2VyLmRlYnVnKCdDb3JyZWN0aW9uIGRvbmUnLCBjb3JyZWN0ZWQpO1xuXHRcdHJldHVybiBjb3JyZWN0ZWQ7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb3JlS2FsbWFuRmlsdGVyO1xuIiwiY29uc3QgaWRlbnRpdHkgPSByZXF1aXJlKCcuLi9saW5hbGdlYnJhL2lkZW50aXR5LmpzJyk7XG5cbi8qKlxuKkNyZWF0ZXMgYSBkeW5hbWljIG1vZGVsLCBmb2xsb3dpbmcgY29uc3RhbnQgYWNjZWxlcmF0aW9uIG1vZGVsIHdpdGggcmVzcGVjdCB3aXRoIHRoZSBkaW1lbnNpb25zIHByb3ZpZGVkIGluIHRoZSBvYnNlcnZhdGlvbiBwYXJhbWV0ZXJzXG4qIEBwYXJhbSB7RHluYW1pY0NvbmZpZ30gZHluYW1pY1xuKiBAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvYnNlcnZhdGlvblxuKiBAcmV0dXJucyB7RHluYW1pY0NvbmZpZ31cbiovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGR5bmFtaWMsIG9ic2VydmF0aW9uKSB7XG5cdGNvbnN0IHRpbWVTdGVwID0gZHluYW1pYy50aW1lU3RlcCB8fCAxO1xuXHRjb25zdCBvYnNlcnZlZFByb2plY3Rpb24gPSBvYnNlcnZhdGlvbi5vYnNlcnZlZFByb2plY3Rpb247XG5cdGNvbnN0IHN0YXRlUHJvamVjdGlvbiA9IG9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbjtcblx0Y29uc3Qgb2JzZXJ2YXRpb25EaW1lbnNpb24gPSBvYnNlcnZhdGlvbi5kaW1lbnNpb247XG5cdGxldCBkaW1lbnNpb247XG5cblx0aWYgKHN0YXRlUHJvamVjdGlvbiAmJiBOdW1iZXIuaXNJbnRlZ2VyKHN0YXRlUHJvamVjdGlvblswXS5sZW5ndGggLyAzKSkge1xuXHRcdGRpbWVuc2lvbiA9IG9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvblswXS5sZW5ndGg7XG5cdH0gZWxzZSBpZiAob2JzZXJ2ZWRQcm9qZWN0aW9uKSB7XG5cdFx0ZGltZW5zaW9uID0gb2JzZXJ2ZWRQcm9qZWN0aW9uWzBdLmxlbmd0aCAqIDM7XG5cdH0gZWxzZSBpZiAob2JzZXJ2YXRpb25EaW1lbnNpb24pIHtcblx0XHRkaW1lbnNpb24gPSBvYnNlcnZhdGlvbkRpbWVuc2lvbiAqIDM7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgKG5ldyBFcnJvcignb2JzZXJ2ZWRQcm9qZWN0aW9uIG9yIHN0YXRlUHJvamVjdGlvbiBzaG91bGQgYmUgZGVmaW5lZCBpbiBvYnNlcnZhdGlvbiBpbiBvcmRlciB0byB1c2UgY29uc3RhbnQtc3BlZWQgZmlsdGVyJykpO1xuXHR9XG5cblx0Y29uc3QgYmFzZURpbWVuc2lvbiA9IGRpbWVuc2lvbiAvIDM7XG5cdC8vIFdlIGNvbnN0cnVjdCB0aGUgdHJhbnNpdGlvbiBhbmQgY292YXJpYW5jZSBtYXRyaWNlc1xuXHRjb25zdCB0cmFuc2l0aW9uID0gaWRlbnRpdHkoZGltZW5zaW9uKTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBiYXNlRGltZW5zaW9uOyBpKyspIHtcblx0XHR0cmFuc2l0aW9uW2ldW2kgKyBiYXNlRGltZW5zaW9uXSA9IHRpbWVTdGVwO1xuXHRcdHRyYW5zaXRpb25baV1baSArICgyICogYmFzZURpbWVuc2lvbildID0gMC41ICogKHRpbWVTdGVwICoqIDIpO1xuXHRcdHRyYW5zaXRpb25baSArIGJhc2VEaW1lbnNpb25dW2kgKyAoMiAqIGJhc2VEaW1lbnNpb24pXSA9IHRpbWVTdGVwO1xuXHR9XG5cblx0Y29uc3QgYXJyYXlDb3ZhcmlhbmNlID0gbmV3IEFycmF5KGJhc2VEaW1lbnNpb24pLmZpbGwoMSlcblx0XHQuY29uY2F0KG5ldyBBcnJheShiYXNlRGltZW5zaW9uKS5maWxsKHRpbWVTdGVwICogdGltZVN0ZXApKVxuXHRcdC5jb25jYXQobmV3IEFycmF5KGJhc2VEaW1lbnNpb24pLmZpbGwodGltZVN0ZXAgKiogNCkpO1xuXHRjb25zdCBjb3ZhcmlhbmNlID0gZHluYW1pYy5jb3ZhcmlhbmNlIHx8IGFycmF5Q292YXJpYW5jZTtcblx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGR5bmFtaWMsIHtkaW1lbnNpb24sIHRyYW5zaXRpb24sIGNvdmFyaWFuY2V9KTtcbn07XG4iLCJjb25zdCBpZGVudGl0eSA9IHJlcXVpcmUoJy4uL2xpbmFsZ2VicmEvaWRlbnRpdHkuanMnKTtcbi8qKlxuKkNyZWF0ZXMgYSBkeW5hbWljIG1vZGVsLCBmb2xsb3dpbmcgY29uc3RhbnQgcG9zaXRpb24gbW9kZWwgd2l0aCByZXNwZWN0IHdpdGggdGhlIGRpbWVuc2lvbnMgcHJvdmlkZWQgaW4gdGhlIG9ic2VydmF0aW9uIHBhcmFtZXRlcnNcbiogQHBhcmFtIHtEeW5hbWljQ29uZmlnfSBkeW5hbWljXG4qIEBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uXG4qIEByZXR1cm5zIHtEeW5hbWljQ29uZmlnfVxuKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZHluYW1pYywgb2JzZXJ2YXRpb24pIHtcblx0bGV0IGRpbWVuc2lvbiA9IGR5bmFtaWMuZGltZW5zaW9uO1xuXHRjb25zdCBvYnNlcnZhdGlvbkRpbWVuc2lvbiA9IG9ic2VydmF0aW9uLmRpbWVuc2lvbjtcblx0Y29uc3Qgb2JzZXJ2ZWRQcm9qZWN0aW9uID0gb2JzZXJ2YXRpb24ub2JzZXJ2ZWRQcm9qZWN0aW9uO1xuXHRjb25zdCBzdGF0ZVByb2plY3Rpb24gPSBvYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb247XG5cdGxldCBjb3ZhcmlhbmNlID0gZHluYW1pYy5jb3ZhcmlhbmNlO1xuXG5cdGlmICghZHluYW1pYy5kaW1lbnNpb24pIHtcblx0XHRpZiAob2JzZXJ2YXRpb25EaW1lbnNpb24pIHtcblx0XHRcdGRpbWVuc2lvbiA9IG9ic2VydmF0aW9uRGltZW5zaW9uO1xuXHRcdH0gZWxzZSBpZiAob2JzZXJ2ZWRQcm9qZWN0aW9uKSB7XG5cdFx0XHRkaW1lbnNpb24gPSBvYnNlcnZlZFByb2plY3Rpb25bMF0ubGVuZ3RoO1xuXHRcdH0gZWxzZSBpZiAoc3RhdGVQcm9qZWN0aW9uKSB7XG5cdFx0XHRkaW1lbnNpb24gPSBzdGF0ZVByb2plY3Rpb25bMF0ubGVuZ3RoO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0IHRyYW5zaXRpb24gPSBpZGVudGl0eShkaW1lbnNpb24pO1xuXHRjb3ZhcmlhbmNlID0gY292YXJpYW5jZSB8fCBpZGVudGl0eShkaW1lbnNpb24pO1xuXHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZHluYW1pYywge2RpbWVuc2lvbiwgdHJhbnNpdGlvbiwgY292YXJpYW5jZX0pO1xufTtcbiIsImNvbnN0IGlkZW50aXR5ID0gcmVxdWlyZSgnLi4vbGluYWxnZWJyYS9pZGVudGl0eS5qcycpO1xuXG4vKipcbipDcmVhdGVzIGEgZHluYW1pYyBtb2RlbCwgZm9sbG93aW5nIGNvbnN0YW50IHBvc2l0aW9uIG1vZGVsIHdpdGggcmVzcGVjdCB3aXRoIHRoZSBkaW1lbnNpb25zIHByb3ZpZGVkIGluIHRoZSBvYnNlcnZhdGlvbiBwYXJhbWV0ZXJzXG4qIEBwYXJhbSB7RHluYW1pY0NvbmZpZ30gZHluYW1pY1xuKiBAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvYnNlcnZhdGlvblxuKiBAcmV0dXJucyB7RHluYW1pY0NvbmZpZ31cbiovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGR5bmFtaWMsIG9ic2VydmF0aW9uKSB7XG5cdGNvbnN0IHRpbWVTdGVwID0gZHluYW1pYy50aW1lU3RlcCB8fCAxO1xuXHRjb25zdCBvYnNlcnZlZFByb2plY3Rpb24gPSBvYnNlcnZhdGlvbi5vYnNlcnZlZFByb2plY3Rpb247XG5cdGNvbnN0IHN0YXRlUHJvamVjdGlvbiA9IG9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbjtcblx0Y29uc3Qgb2JzZXJ2YXRpb25EaW1lbnNpb24gPSBvYnNlcnZhdGlvbi5kaW1lbnNpb247XG5cdGxldCBkaW1lbnNpb247XG5cblx0aWYgKHN0YXRlUHJvamVjdGlvbiAmJiBOdW1iZXIuaXNJbnRlZ2VyKHN0YXRlUHJvamVjdGlvblswXS5sZW5ndGggLyAyKSkge1xuXHRcdGRpbWVuc2lvbiA9IG9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvblswXS5sZW5ndGg7XG5cdH0gZWxzZSBpZiAob2JzZXJ2ZWRQcm9qZWN0aW9uKSB7XG5cdFx0ZGltZW5zaW9uID0gb2JzZXJ2ZWRQcm9qZWN0aW9uWzBdLmxlbmd0aCAqIDI7XG5cdH0gZWxzZSBpZiAob2JzZXJ2YXRpb25EaW1lbnNpb24pIHtcblx0XHRkaW1lbnNpb24gPSBvYnNlcnZhdGlvbkRpbWVuc2lvbiAqIDI7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgKG5ldyBFcnJvcignb2JzZXJ2ZWRQcm9qZWN0aW9uIG9yIHN0YXRlUHJvamVjdGlvbiBzaG91bGQgYmUgZGVmaW5lZCBpbiBvYnNlcnZhdGlvbiBpbiBvcmRlciB0byB1c2UgY29uc3RhbnQtc3BlZWQgZmlsdGVyJykpO1xuXHR9XG5cblx0Y29uc3QgYmFzZURpbWVuc2lvbiA9IGRpbWVuc2lvbiAvIDI7XG5cdC8vIFdlIGNvbnN0cnVjdCB0aGUgdHJhbnNpdGlvbiBhbmQgY292YXJpYW5jZSBtYXRyaWNlc1xuXHRjb25zdCB0cmFuc2l0aW9uID0gaWRlbnRpdHkoZGltZW5zaW9uKTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBiYXNlRGltZW5zaW9uOyBpKyspIHtcblx0XHR0cmFuc2l0aW9uW2ldW2kgKyBiYXNlRGltZW5zaW9uXSA9IHRpbWVTdGVwO1xuXHR9XG5cblx0Y29uc3QgYXJyYXlDb3ZhcmlhbmNlID0gbmV3IEFycmF5KGJhc2VEaW1lbnNpb24pLmZpbGwoMSkuY29uY2F0KG5ldyBBcnJheShiYXNlRGltZW5zaW9uKS5maWxsKHRpbWVTdGVwICogdGltZVN0ZXApKTtcblx0Y29uc3QgY292YXJpYW5jZSA9IGR5bmFtaWMuY292YXJpYW5jZSB8fCBhcnJheUNvdmFyaWFuY2U7XG5cdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBkeW5hbWljLCB7ZGltZW5zaW9uLCB0cmFuc2l0aW9uLCBjb3ZhcmlhbmNlfSk7XG59O1xuIiwiY29uc3QgQ29yZUthbG1hbkZpbHRlciA9IHJlcXVpcmUoJy4vY29yZS1rYWxtYW4tZmlsdGVyLmpzJyk7XG5cbmNvbnN0IGFycmF5VG9NYXRyaXggPSByZXF1aXJlKCcuLi9saWIvdXRpbHMvYXJyYXktdG8tbWF0cml4LmpzJyk7XG5jb25zdCBzZXREaW1lbnNpb25zID0gcmVxdWlyZSgnLi4vbGliL3NldHVwL3NldC1kaW1lbnNpb25zLmpzJyk7XG5jb25zdCBjaGVja0RpbWVuc2lvbnMgPSByZXF1aXJlKCcuLi9saWIvc2V0dXAvY2hlY2stZGltZW5zaW9ucy5qcycpO1xuY29uc3QgYnVpbGRTdGF0ZVByb2plY3Rpb24gPSByZXF1aXJlKCcuLi9saWIvc2V0dXAvYnVpbGQtc3RhdGUtcHJvamVjdGlvbi5qcycpO1xuY29uc3QgZXh0ZW5kRHluYW1pY0luaXQgPSByZXF1aXJlKCcuLi9saWIvc2V0dXAvZXh0ZW5kLWR5bmFtaWMtaW5pdC5qcycpO1xuY29uc3QgbW9kZWxDb2xsZWN0aW9uID0gcmVxdWlyZSgnLi9tb2RlbC1jb2xsZWN0aW9uLmpzJyk7XG5jb25zdCB0b0Z1bmN0aW9uID0gcmVxdWlyZSgnLi4vbGliL3V0aWxzL3RvLWZ1bmN0aW9uLmpzJyk7XG5jb25zdCBkZWVwQXNzaWduID0gcmVxdWlyZSgnLi4vbGliL3V0aWxzL2RlZXAtYXNzaWduLmpzJyk7XG5jb25zdCBwb2x5bW9ycGhNYXRyaXggPSByZXF1aXJlKCcuLi9saWIvdXRpbHMvcG9seW1vcnBoLW1hdHJpeC5qcycpO1xuY29uc3QgU3RhdGUgPSByZXF1aXJlKCcuL3N0YXRlLmpzJyk7XG5jb25zdCBkaXN0YW5jZU1hdCA9IHJlcXVpcmUoJy4uL2xpYi9saW5hbGdlYnJhL2Rpc3RhbmNlLW1hdC5qcycpO1xuXG4vKipcbipUaGlzIGZ1bmN0aW9uIGZpbGxzIHRoZSBnaXZlbiBvcHRpb25zIGJ5IHN1Y2Nlc3NpdmVseSBjaGVja2luZyBpZiBpdCB1c2VzIGEgcmVnaXN0ZXJlZCBtb2RlbCxcbiogaXQgYnVpbGRzIGFuZCBjaGVja3MgdGhlIGR5bmFtaWMgYW5kIG9ic2VydmF0aW9uIGRpbWVuc2lvbnMsIGJ1aWxkIHRoZSBzdGF0ZVByb2plY3Rpb24gaWYgb25seSBvYnNlcnZlZFByb2plY3Rpb25cbippcyBnaXZlbiwgYW5kIGluaXRpYWxpemUgZHluYW1pYy5pbml0XG4qQHBhcmFtIHtEeW5hbWljQ29uZmlnfSBvcHRpb25zLmR5bmFtaWNcbipAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvcHRpb25zLm9ic2VydmF0aW9uXG4qL1xuXG5jb25zdCBzZXR1cE1vZGVsc1BhcmFtZXRlcnMgPSBmdW5jdGlvbiAoe29ic2VydmF0aW9uLCBkeW5hbWljfSkge1xuXHRpZiAodHlwZW9mIChvYnNlcnZhdGlvbi5uYW1lKSA9PT0gJ3N0cmluZycpIHtcblx0XHRvYnNlcnZhdGlvbiA9IG1vZGVsQ29sbGVjdGlvbi5idWlsZE9ic2VydmF0aW9uKG9ic2VydmF0aW9uKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgKGR5bmFtaWMubmFtZSkgPT09ICdzdHJpbmcnKSB7XG5cdFx0ZHluYW1pYyA9IG1vZGVsQ29sbGVjdGlvbi5idWlsZER5bmFtaWMoZHluYW1pYywgb2JzZXJ2YXRpb24pO1xuXHR9XG5cblx0Y29uc3Qgd2l0aERpbWVuc2lvbk9wdGlvbnMgPSBzZXREaW1lbnNpb25zKHtvYnNlcnZhdGlvbiwgZHluYW1pY30pO1xuXHRjb25zdCBjaGVja2VkRGltZW5zaW9uT3B0aW9ucyA9IGNoZWNrRGltZW5zaW9ucyh3aXRoRGltZW5zaW9uT3B0aW9ucyk7XG5cdGNvbnN0IGJ1aWxkU3RhdGVQcm9qZWN0aW9uT3B0aW9ucyA9IGJ1aWxkU3RhdGVQcm9qZWN0aW9uKGNoZWNrZWREaW1lbnNpb25PcHRpb25zKTtcblx0cmV0dXJuIGV4dGVuZER5bmFtaWNJbml0KGJ1aWxkU3RhdGVQcm9qZWN0aW9uT3B0aW9ucyk7XG59O1xuXG4vKipcbipSZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIG1vZGVsIHdpdGhvdXQgYXJyYXlzIGFzIHZhbHVlcyBidXQgb25seSBmdW5jdGlvbnNcbipAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvYnNlcnZhdGlvblxuKkBwYXJhbSB7RHluYW1pY0NvbmZpZ30gZHluYW1pY1xuKkByZXR1cm5zIHtPYnNlcnZhdGlvbkNvbmZpZywgRHluYW1pY0NvbmZpZ30gbW9kZWwgd2l0aCByZXNwZWN0IG9mIHRoZSBDb3JlIEthbG1hbiBGaWx0ZXIgcHJvcGVydGllc1xuKi9cbmNvbnN0IG1vZGVsc1BhcmFtZXRlcnNUb0NvcmVPcHRpb25zID0gZnVuY3Rpb24gKG1vZGVsVG9CZUNoYW5nZWQpIHtcblx0Y29uc3Qge29ic2VydmF0aW9uLCBkeW5hbWljfSA9IG1vZGVsVG9CZUNoYW5nZWQ7XG5cdHJldHVybiBkZWVwQXNzaWduKG1vZGVsVG9CZUNoYW5nZWQsIHtcblx0XHRvYnNlcnZhdGlvbjoge1xuXHRcdFx0c3RhdGVQcm9qZWN0aW9uOiB0b0Z1bmN0aW9uKHBvbHltb3JwaE1hdHJpeChvYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24pKSxcblx0XHRcdGNvdmFyaWFuY2U6IHRvRnVuY3Rpb24ocG9seW1vcnBoTWF0cml4KG9ic2VydmF0aW9uLmNvdmFyaWFuY2UsIHtkaW1lbnNpb246IG9ic2VydmF0aW9uLmRpbWVuc2lvbn0pKVxuXHRcdH0sXG5cdFx0ZHluYW1pYzoge1xuXHRcdFx0dHJhbnNpdGlvbjogdG9GdW5jdGlvbihwb2x5bW9ycGhNYXRyaXgoZHluYW1pYy50cmFuc2l0aW9uKSksXG5cdFx0XHRjb3ZhcmlhbmNlOiB0b0Z1bmN0aW9uKHBvbHltb3JwaE1hdHJpeChkeW5hbWljLmNvdmFyaWFuY2UsIHtkaW1lbnNpb246IGR5bmFtaWMuZGltZW5zaW9ufSkpXG5cdFx0fVxuXHR9KTtcbn07XG5cbmNsYXNzIEthbG1hbkZpbHRlciBleHRlbmRzIENvcmVLYWxtYW5GaWx0ZXIge1xuXHQvKipcblx0KiBAcGFyYW0ge0R5bmFtaWNDb25maWd9IG9wdGlvbnMuZHluYW1pY1xuXHQqIEBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9wdGlvbnMub2JzZXJ2YXRpb24gdGhlIHN5c3RlbSdzIG9ic2VydmF0aW9uIG1vZGVsXG5cdCovXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRjb25zdCBtb2RlbHNQYXJhbWV0ZXJzID0gc2V0dXBNb2RlbHNQYXJhbWV0ZXJzKG9wdGlvbnMpO1xuXHRcdGNvbnN0IGNvcmVPcHRpb25zID0gbW9kZWxzUGFyYW1ldGVyc1RvQ29yZU9wdGlvbnMobW9kZWxzUGFyYW1ldGVycyk7XG5cblx0XHRzdXBlcihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCBjb3JlT3B0aW9ucykpO1xuXHR9XG5cblx0Y29ycmVjdCh7cHJlZGljdGVkLCBvYnNlcnZhdGlvbn0pIHtcblx0XHRjb25zdCBjb3JlT2JzZXJ2YXRpb24gPSBhcnJheVRvTWF0cml4KHtvYnNlcnZhdGlvbiwgZGltZW5zaW9uOiB0aGlzLm9ic2VydmF0aW9uLmRpbWVuc2lvbn0pO1xuXHRcdHJldHVybiBzdXBlci5jb3JyZWN0KHtwcmVkaWN0ZWQsIG9ic2VydmF0aW9uOiBjb3JlT2JzZXJ2YXRpb259KTtcblx0fVxuXG5cdC8qKlxuXHQqUGVyZm9ybXMgdGhlIHByZWRpY3Rpb24gYW5kIHRoZSBjb3JyZWN0aW9uIHN0ZXBzXG5cdCpAcGFyYW0ge1N0YXRlfSBwcmV2aW91c0NvcnJlY3RlZFxuXHQqQHBhcmFtIHs8QXJyYXkuPE51bWJlcj4+fSBvYnNlcnZhdGlvblxuXHQqQHJldHVybnMge0FycmF5LjxOdW1iZXI+fSB0aGUgbWVhbiBvZiB0aGUgY29ycmVjdGlvbnNcblx0Ki9cblxuXHRmaWx0ZXIoe3ByZXZpb3VzQ29ycmVjdGVkLCBvYnNlcnZhdGlvbn0pIHtcblx0XHRjb25zdCBwcmVkaWN0ZWQgPSBzdXBlci5wcmVkaWN0KHtwcmV2aW91c0NvcnJlY3RlZH0pO1xuXHRcdHJldHVybiB0aGlzLmNvcnJlY3Qoe3ByZWRpY3RlZCwgb2JzZXJ2YXRpb259KTtcblx0fVxuXG5cdC8qKlxuKkZpbHRlcnMgYWxsIHRoZSBvYnNlcnZhdGlvbnNcbipAcGFyYW0ge0FycmF5LjxBcnJheS48TnVtYmVyPj59IG9ic2VydmF0aW9uc1xuKkByZXR1cm5zIHtBcnJheS48TnVtYmVyPn0gdGhlIG1lYW4gb2YgdGhlIGNvcnJlY3Rpb25zXG4qL1xuXHRmaWx0ZXJBbGwob2JzZXJ2YXRpb25zKSB7XG5cdFx0Y29uc3Qge21lYW46IG1lYW5Jbml0LCBjb3ZhcmlhbmNlOiBjb3ZhcmlhbmNlSW5pdCwgaW5kZXg6IGluZGV4SW5pdH0gPSB0aGlzLmR5bmFtaWMuaW5pdDtcblx0XHRsZXQgcHJldmlvdXNDb3JyZWN0ZWQgPSBuZXcgU3RhdGUoe1xuXHRcdFx0bWVhbjogbWVhbkluaXQsXG5cdFx0XHRjb3ZhcmlhbmNlOiBjb3ZhcmlhbmNlSW5pdCxcblx0XHRcdGluZGV4OiBpbmRleEluaXR9KTtcblx0XHRjb25zdCByZXN1bHRzID0gW107XG5cdFx0Zm9yIChjb25zdCBvYnNlcnZhdGlvbiBvZiBvYnNlcnZhdGlvbnMpIHtcblx0XHRcdGNvbnN0IHByZWRpY3RlZCA9IHRoaXMucHJlZGljdCh7cHJldmlvdXNDb3JyZWN0ZWR9KTtcblx0XHRcdHByZXZpb3VzQ29ycmVjdGVkID0gdGhpcy5jb3JyZWN0KHtcblx0XHRcdFx0cHJlZGljdGVkLFxuXHRcdFx0XHRvYnNlcnZhdGlvblxuXHRcdFx0fSk7XG5cdFx0XHRyZXN1bHRzLnB1c2gocHJldmlvdXNDb3JyZWN0ZWQubWVhbik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHQvKipcblx0KiBSZXR1cm5zIGFuIGVzdGltYXRpb24gb2YgdGhlIGFzeW1wdG90aWMgc3RhdGUgY292YXJpYW5jZSBhcyBleHBsYWluZWQgaW4gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvS2FsbWFuX2ZpbHRlciNBc3ltcHRvdGljX2Zvcm1cblx0KiBpbiBwcmFjdGljZSB0aGlzIGNhbiBiZSB1c2VkIGFzIGEgaW5pdC5jb3ZhcmlhbmNlIHZhbHVlIGJ1dCBpcyB2ZXJ5IGNvc3RmdWwgY2FsY3VsYXRpb24gKHRoYXQncyB3aHkgdGhpcyBpcyBub3QgbWFkZSBieSBkZWZhdWx0KVxuXHQqIEBwYXJhbSB7TnVtYmVyfSBbdG9sZXJhbmNlPTFlLTZdIHJldHVybnMgd2hlbiB0aGUgbGFzdCB2YWx1ZXMgZGlmZmVyZW5jZXMgYXJlIGxlc3MgdGhhbiB0b2xlcmFuY2Vcblx0KiBAcmV0dXJuIHs8QXJyYXkuPEFycmF5LjxOdW1iZXI+Pj59IGNvdmFyaWFuY2Vcblx0Ki9cblx0YXN5bXB0b3RpY1N0YXRlQ292YXJpYW5jZShsaW1pdEl0ZXJhdGlvbnMgPSAxZTIsIHRvbGVyYW5jZSA9IDFlLTYpIHtcblx0XHRsZXQgcHJldmlvdXNDb3JyZWN0ZWQgPSBzdXBlci5nZXRJbml0U3RhdGUoKTtcblx0XHRsZXQgcHJlZGljdGVkO1xuXHRcdGNvbnN0IHJlc3VsdHMgPSBbXTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxpbWl0SXRlcmF0aW9uczsgaSsrKSB7XG5cdFx0XHRsZXQgY291bnQgPSAwO1xuXHRcdFx0cHJlZGljdGVkID0gbmV3IFN0YXRlKHtjb3ZhcmlhbmNlOiBzdXBlci5nZXRQcmVkaWN0ZWRDb3ZhcmlhbmNlKHtwcmV2aW91c0NvcnJlY3RlZH0pfSk7XG5cdFx0XHRwcmV2aW91c0NvcnJlY3RlZCA9IG5ldyBTdGF0ZSh7Y292YXJpYW5jZTogc3VwZXIuZ2V0Q29ycmVjdGVkQ292YXJpYW5jZSh7cHJlZGljdGVkfSl9KTtcblx0XHRcdHJlc3VsdHMucHVzaChwcmV2aW91c0NvcnJlY3RlZC5jb3ZhcmlhbmNlKTtcblx0XHRcdGZvciAobGV0IGogPSAxOyBqIDwgNDsgaisrKSB7XG5cdFx0XHRcdGlmIChkaXN0YW5jZU1hdChwcmV2aW91c0NvcnJlY3RlZC5jb3ZhcmlhbmNlLCByZXN1bHRzW2kgLSBqXSkgPCB0b2xlcmFuY2UpIHtcblx0XHRcdFx0XHRjb3VudCArPSAxO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjb3VudCA9PT0gMykge1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0c1tpXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aHJvdyAobmV3IEVycm9yKCdUaGUgc3RhdGUgY292YXJpYW5jZSBkb2VzIG5vdCBjb252ZXJnZSBhc3ltcHRvdGljYWxseScpKTtcblx0fVxuXG5cdC8qKlxuXHQqIFJldHVybnMgYW4gZXN0aW1hdGlvbiBvZiB0aGUgYXN5bXB0b3RpYyBnYWluLCBhcyBleHBsYWluZWQgaW4gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvS2FsbWFuX2ZpbHRlciNBc3ltcHRvdGljX2Zvcm1cblx0KiBAcGFyYW0ge051bWJlcn0gW3RvbGVyYW5jZT0xZS02XSByZXR1cm5zIHdoZW4gdGhlIGxhc3QgdmFsdWVzIGRpZmZlcmVuY2VzIGFyZSBsZXNzIHRoYW4gdG9sZXJhbmNlXG5cdCogQHJldHVybiB7PEFycmF5LjxBcnJheS48TnVtYmVyPj4+fSBnYWluXG5cdCovXG5cdGFzeW1wdG90aWNHYWluKHRvbGVyYW5jZSA9IDFlLTYpIHtcblx0XHRjb25zdCBhc3ltcHRvdGljU3RhdGUgPSBuZXcgU3RhdGUoe2NvdmFyaWFuY2U6IHRoaXMuYXN5bXB0b3RpY1N0YXRlQ292YXJpYW5jZSh0b2xlcmFuY2UpfSk7XG5cdFx0cmV0dXJuIHN1cGVyLmdldEdhaW4oe3ByZXZpb3VzQ29ycmVjdGVkOiBhc3ltcHRvdGljU3RhdGV9KTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEthbG1hbkZpbHRlcjtcbiIsImNvbnN0IGVsZW1XaXNlID0gcmVxdWlyZSgnLi9lbGVtLXdpc2UnKTtcbi8qKlxuKiBBZGQgbWF0cml4ZXMgdG9nZXRoZXJcbiogQHBhcmFtIHsuLi48QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gYXJncyBsaXN0IG9mIG1hdHJpeFxuKiBAcmV0dXJucyB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gc3VtXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRyZXR1cm4gZWxlbVdpc2UoYXJncywgYXJnczIgPT4ge1xuXHRcdHJldHVybiBhcmdzMi5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcblx0fSk7XG59O1xuIiwiY29uc3QgemVyb3MgPSByZXF1aXJlKCcuL3plcm9zJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1hdCkge1xuXHRjb25zdCByZXN1bHQgPSB6ZXJvcyhtYXQubGVuZ3RoLCBtYXQubGVuZ3RoKTtcblxuXHRmb3IgKGNvbnN0IFtpLCBlbGVtZW50XSBvZiBtYXQuZW50cmllcygpKSB7XG5cdFx0cmVzdWx0W2ldW2ldID0gZWxlbWVudDtcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59O1xuIiwiY29uc3QgdHJhY2UgPSByZXF1aXJlKCcuL3RyYWNlLmpzJyk7XG5jb25zdCB0cmFuc3Bvc2UgPSByZXF1aXJlKCcuL3RyYW5zcG9zZS5qcycpO1xuY29uc3QgbWF0U3ViID0gcmVxdWlyZSgnLi9zdWIuanMnKTtcbmNvbnN0IG1hdE11bCA9IHJlcXVpcmUoJy4vbWF0LW11bC5qcycpO1xuY29uc3Qgc3VtID0gcmVxdWlyZSgnLi9zdW0uanMnKTtcblxuLy8gW0Zyb2Jlbml1cyBub3JtXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9NYXRyaXhfbm9ybSNGcm9iZW5pdXNfbm9ybSApXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcnJheTEsIGFycmF5Mikge1xuXHRpZiAodHlwZW9mIChhcnJheTEpID09PSAndW5kZWZpbmVkJykge1xuXHRcdHJldHVybiBzdW0oYXJyYXkyKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgKGFycmF5MikgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuIHN1bShhcnJheTEpO1xuXHR9XG5cblx0Y29uc3QgbSA9IG1hdFN1YihhcnJheTEsIGFycmF5Mik7XG5cdGNvbnN0IHAgPSBtYXRNdWwodHJhbnNwb3NlKG0pLCBtKTtcblx0cmV0dXJuIE1hdGguc3FydCh0cmFjZShwKSk7XG59O1xuIiwiLyoqXG4qIEBjYWxsYmFjayBlbGVtV2lzZUNiXG4qIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IGFyclxuKiBAcGFyYW0ge051bWJlcn0gcm93SWRcbiogQHBhcmFtIHtOdW1iZXJ9IGNvbElkXG4qL1xuLyoqXG4qIHJ1biBhIGZ1bmN0aW9uIG9uIGNlbGwgcGVyIGNlbGwgZm9yIGVhY2ggTWF0cml4ZXNcbiogQHBhcmFtIHs8QXJyYXkuPEFycmF5LjxBcnJheS48TnVtYmVyPj4+fSBhcnJNYXRyaXhlcyBsaXN0IG9mIG1hdHJpeGVzXG4qIEBwYXJhbSB7ZWxlbVdpc2VDYn0gZm5cbiogQHJldHVybnMge0FycmF5LjxBcnJheS48TnVtYmVyPj59IHJlc3VsdGluZyBtYXRyaXhcbiogQGV4YW1wbGVcbi8vIHRoaXMgd2lsbCBkbyBtMSArIG0yICsgbTMgKyBtNCBvbiBtYXRyaXhlc1xuZWxlbVdpc2UoW20xLCBtMiwgbTMsIG00XSwgYXJnczIgPT4ge1xuXHRyZXR1cm4gYXJnczIucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG59KTtcbiovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFycmF5TWF0cml4ZXMsIGZuKSB7XG5cdHJldHVybiBhcnJheU1hdHJpeGVzWzBdLm1hcCgocm93LCByb3dJZCkgPT4ge1xuXHRcdHJldHVybiByb3cubWFwKChjZWxsLCBjb2xJZCkgPT4ge1xuXHRcdFx0Y29uc3QgYXJyYXkgPSBhcnJheU1hdHJpeGVzLm1hcChtID0+IG1bcm93SWRdW2NvbElkXSk7XG5cdFx0XHRyZXR1cm4gZm4oYXJyYXksIHJvd0lkLCBjb2xJZCk7XG5cdFx0fSk7XG5cdH0pO1xufTtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RhdGVTaXplKSB7XG5cdGNvbnN0IGlkZW50aXR5QXJyYXkgPSBbXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzdGF0ZVNpemU7IGkrKykge1xuXHRcdGNvbnN0IHJvd0lkZW50aXR5ID0gW107XG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBzdGF0ZVNpemU7IGorKykge1xuXHRcdFx0aWYgKGkgPT09IGopIHtcblx0XHRcdFx0cm93SWRlbnRpdHkucHVzaCgxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJvd0lkZW50aXR5LnB1c2goMCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWRlbnRpdHlBcnJheS5wdXNoKHJvd0lkZW50aXR5KTtcblx0fVxuXG5cdHJldHVybiBpZGVudGl0eUFycmF5O1xufTtcbiIsImNvbnN0IG1hdHJpeEludmVyc2UgPSByZXF1aXJlKCdtYXRyaXgtaW52ZXJzZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtKSB7XG5cdHJldHVybiBtYXRyaXhJbnZlcnNlKG0pO1xufTtcbiIsIi8qKlxuKiBNdWx0aXBseSAyIG1hdHJpeGVzIHRvZ2V0aGVyXG4qIEBwYXJhbSB7PEFycmF5LjxBcnJheS48TnVtYmVyPj59IG0xXG4qIEBwYXJhbSB7PEFycmF5LjxBcnJheS48TnVtYmVyPj59IG0yXG4qIEByZXR1cm5zIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG0xLCBtMikge1xuXHQvLyBDb25zb2xlLmxvZyh7bTEsIG0yfSk7XG5cdGNvbnN0IHJlc3VsdCA9IFtdO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IG0xLmxlbmd0aDsgaSsrKSB7XG5cdFx0cmVzdWx0W2ldID0gW107XG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBtMlswXS5sZW5ndGg7IGorKykge1xuXHRcdFx0bGV0IHN1bSA9IDA7XG5cdFx0XHRmb3IgKGxldCBrID0gMDsgayA8IG0xWzBdLmxlbmd0aDsgaysrKSB7XG5cdFx0XHRcdHN1bSArPSBtMVtpXVtrXSAqIG0yW2tdW2pdO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXN1bHRbaV1bal0gPSBzdW07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvKipcbipUaGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHN0YXRlUHJvamVjdGlvbiBwYWRlZCB3aXRoIHplcm9zIHdpdGggcmVzcGVjdCB0byBhIGdpdmVuXG4qb2JzZXJ2ZWRQcm9qZWN0aW9uXG4qQHBhcmFtIHtBcnJheS48TnVtYmVyPiB8IEFycmF5LjxBcnJheS48TnVtYmVyPj59IGFycmF5IHRoZSBhcnJheSB3ZSBuZWVkIHRvIHBhZFxuKkBwYXJhbSB7TnVtYmVyfSBkaW1lbnNpb24gaW4gb3VyIGNhc2UsIHRoZSBkeW5hbWljIGRpbWVuc2lvblxuKkByZXR1cm5zIHtBcnJheS48TnVtYmVyPiB8IEFycmF5LjxBcnJheS48TnVtYmVyPj59IHBhZGVkIGFycmF5XG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJyYXksIHtkaW1lbnNpb259KSB7XG5cdGNvbnN0IGwgPSBhcnJheVswXS5sZW5ndGg7XG5cdGlmIChkaW1lbnNpb24gPCBsKSB7XG5cdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoJ0R5bmFtaWMgZGltZW5zaW9uIGRvZXMgbm90IG1hdGNoIHdpdGggb2JzZXJ2ZWRQcm9qZWN0aW9uJykpO1xuXHR9XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IGRpbWVuc2lvbiAtIGw7IGorKykge1xuXHRcdFx0YXJyYXlbaV0ucHVzaCgwKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gYXJyYXk7XG59O1xuIiwiY29uc3QgZWxlbVdpc2UgPSByZXF1aXJlKCcuL2VsZW0td2lzZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdHJldHVybiBlbGVtV2lzZShhcmdzLCAoW2EsIGJdKSA9PiBhIC0gYik7XG59O1xuIiwiLy8gU3VtIGFsbCB0aGUgdGVybXMgb2YgYSBnaXZlbiBtYXRyaXhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFycmF5KSB7XG5cdGxldCBzID0gMDtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgYXJyYXkubGVuZ3RoOyBqKyspIHtcblx0XHRcdHMgKz0gYXJyYXlbaV1bal07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHM7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJyYXkpIHtcblx0bGV0IGRpYWcgPSAwO1xuXHRmb3IgKGNvbnN0IFtyb3csIGVsZW1lbnRdIG9mIGFycmF5LmVudHJpZXMoKSkge1xuXHRcdGRpYWcgKz0gZWxlbWVudFtyb3ddO1xuXHR9XG5cblx0cmV0dXJuIGRpYWc7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJyYXkpIHtcblx0cmV0dXJuIGFycmF5WzBdLm1hcCgoY29sLCBpKSA9PiBhcnJheS5tYXAocm93ID0+IHJvd1tpXSkpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHJvd3MsIGNvbHMpIHtcblx0cmV0dXJuIG5ldyBBcnJheShyb3dzKS5maWxsKDEpLm1hcCgoKSA9PiBuZXcgQXJyYXkoY29scykuZmlsbCgwKSk7XG59O1xuIiwiY29uc3QgcmVnaXN0ZXJlZER5bmFtaWNNb2RlbHMgPSB7XG5cdCdjb25zdGFudC1wb3NpdGlvbic6IHJlcXVpcmUoJy4uL2xpYi9keW5hbWljL2NvbnN0YW50LXBvc2l0aW9uLmpzJyksXG5cdCdjb25zdGFudC1zcGVlZCc6IHJlcXVpcmUoJy4uL2xpYi9keW5hbWljL2NvbnN0YW50LXNwZWVkLmpzJyksXG5cdCdjb25zdGFudC1hY2NlbGVyYXRpb24nOiByZXF1aXJlKCcuLi9saWIvZHluYW1pYy9jb25zdGFudC1hY2NlbGVyYXRpb24uanMnKVxufTtcbmNvbnN0IHJlZ2lzdGVyZWRPYnNlcnZhdGlvbk1vZGVscyA9IHtcblx0c2Vuc29yczogcmVxdWlyZSgnLi4vbGliL29ic2VydmF0aW9uL3NlbnNvci5qcycpXG59O1xuXG4vKipcbipSZWdpc3Rlck9ic2VydmF0aW9uIGVuYWJsZXMgdG8gY3JlYXRlIGEgbmV3IG9ic2VydmF0aW9uIG1vZGVsIGFuZCBzdG9jayBpdFxuKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuKiBAY2FsbGJhY2sgZm4gdGhlIGZ1bmN0aW9uIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGRlc2lyZWQgbW9kZWxcbiovXG5cbi8qKlxuKnJlZ2lzdGVyRHluYW1pYyBlbmFibGVzIHRvIGNyZWF0ZSBhIG5ldyBkeW5hbWljIG1vZGVsIGFuZCBzdG9ja3MgaXRcbiogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiogQGNhbGxiYWNrIGZuIHRoZSBmdW5jdGlvbiBjb3JyZXNwb25kaW5nIHRvIHRoZSBkZXNpcmVkIG1vZGVsXG4qL1xuXG4vKipcbipidWlsZE9ic2VydmF0aW9uIGVuYWJsZXMgdG8gYnVpbGQgYSBtb2RlbCBnaXZlbiBhbiBvYnNlcnZhdGlvbiBjb25maWd1cmF0aW9uXG4qIEBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uXG4qIEByZXR1cm5zIHtPYnNlcnZhdGlvbkNvbmZpZ30gdGhlIGNvbmZpZ3VyYXRpb24gd2l0aCByZXNwZWN0IHRvIHRoZSBtb2RlbFxuKi9cblxuLyoqXG4qYnVpbGREeW5hbWljIGVuYWJsZXMgdG8gYnVpbGQgYSBtb2RlbCBnaXZlbiBkeW5hbWljIGFuZCBvYnNlcnZhdGlvbiBjb25maWd1cmF0aW9uc1xuKiBAcGFyYW0ge0R5bmFtaWNDb25maWd9IGR5bmFtaWNcbiogQHBhcmFtIHtPYnNlcnZhdGlvbkNvbmZpZ30gb2JzZXJ2YXRpb25cbiogQHJldHVybnMge0R5bmFtaWNDb25maWd9IHRoZSBkeW5hbWljIGNvbmZpZ3VyYXRpb24gd2l0aCByZXNwZWN0IHRvIHRoZSBtb2RlbFxuKi9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdHJlZ2lzdGVyT2JzZXJ2YXRpb246IChuYW1lLCBmbikgPT4ge1xuXHRcdHJlZ2lzdGVyZWRPYnNlcnZhdGlvbk1vZGVsc1tuYW1lXSA9IGZuO1xuXHR9LFxuXHRyZWdpc3RlckR5bmFtaWM6IChuYW1lLCBmbikgPT4ge1xuXHRcdHJlZ2lzdGVyZWREeW5hbWljTW9kZWxzW25hbWVdID0gZm47XG5cdH0sXG5cdGJ1aWxkT2JzZXJ2YXRpb246IG9ic2VydmF0aW9uID0+IHtcblx0XHRpZiAoIXJlZ2lzdGVyZWRPYnNlcnZhdGlvbk1vZGVsc1tvYnNlcnZhdGlvbi5uYW1lXSkge1xuXHRcdFx0dGhyb3cgKG5ldyBFcnJvcignVGhlIHByb3ZpZGVkIG9ic2VydmF0aW9uIG1vZGVsIG5hbWUgaXMgbm90IHJlZ2lzdGVyZWQnKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlZ2lzdGVyZWRPYnNlcnZhdGlvbk1vZGVsc1tvYnNlcnZhdGlvbi5uYW1lXShvYnNlcnZhdGlvbik7XG5cdH0sXG5cdGJ1aWxkRHluYW1pYzogKGR5bmFtaWMsIG9ic2VydmF0aW9uKSA9PiB7XG5cdFx0aWYgKCFyZWdpc3RlcmVkRHluYW1pY01vZGVsc1tkeW5hbWljLm5hbWVdKSB7XG5cdFx0XHR0aHJvdyAobmV3IEVycm9yKCdUaGUgcHJvdmlkZWQgZHluYW1pYyBtb2RlbCBuYW1lIGlzIG5vdCByZWdpc3RlcmVkJykpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZWdpc3RlcmVkRHluYW1pY01vZGVsc1tkeW5hbWljLm5hbWVdKGR5bmFtaWMsIG9ic2VydmF0aW9uKTtcblx0fVxufTtcbiIsImNvbnN0IGlkZW50aXR5ID0gcmVxdWlyZSgnLi4vbGluYWxnZWJyYS9pZGVudGl0eS5qcycpO1xuY29uc3QgcG9seW1vcnBoTWF0cml4ID0gcmVxdWlyZSgnLi4vdXRpbHMvcG9seW1vcnBoLW1hdHJpeC5qcycpO1xuXG4vKipcbiogQHBhcmFtIHtOdW1iZXJ9IHNlbnNvckRpbWVuc2lvblxuKiBAcGFyYW0ge0NvdmFyaWFuY2VQYXJhbX0gc2Vuc29yQ292YXJpYW5jZVxuKiBAcGFyYW0ge051bWJlcn0gblNlbnNvcnNcbiogQHJldHVybnMge09ic2VydmF0aW9uQ29uZmlnfVxuKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRjb25zdCB7c2Vuc29yRGltZW5zaW9uID0gMSwgc2Vuc29yQ292YXJpYW5jZSA9IDEsIG5TZW5zb3JzID0gMX0gPSBvcHRpb25zO1xuXHRjb25zdCBzZW5zb3JzQ292YXJpYW5jZSA9IHBvbHltb3JwaE1hdHJpeChzZW5zb3JDb3ZhcmlhbmNlLCB7ZGltZW5zaW9uOiBzZW5zb3JEaW1lbnNpb259KTtcblx0Y29uc3Qgb25lU2Vuc29yT2JzZXJ2ZWRQcm9qZWN0aW9uID0gaWRlbnRpdHkoc2Vuc29yRGltZW5zaW9uKTtcblx0bGV0IGNvbmNhdGVuYXRlZE9ic2VydmVkUHJvamVjdGlvbiA9IFtdO1xuXHRsZXQgY29uY2F0ZW5hdGVkQ292YXJpYW5jZSA9IFtdO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IG5TZW5zb3JzOyBpKyspIHtcblx0XHRjb25jYXRlbmF0ZWRPYnNlcnZlZFByb2plY3Rpb24gPSBjb25jYXRlbmF0ZWRPYnNlcnZlZFByb2plY3Rpb24uY29uY2F0KG9uZVNlbnNvck9ic2VydmVkUHJvamVjdGlvbik7XG5cdFx0Y29uY2F0ZW5hdGVkQ292YXJpYW5jZSA9IGNvbmNhdGVuYXRlZENvdmFyaWFuY2UuY29uY2F0KHNlbnNvcnNDb3ZhcmlhbmNlKTtcblx0fVxuXG5cdGNvbnN0IGZvcm1hdHRlZENvdmFyaWFuY2UgPSBwb2x5bW9ycGhNYXRyaXgoY29uY2F0ZW5hdGVkQ292YXJpYW5jZSwge2RpbWVuc2lvbjogblNlbnNvcnMgKiBzZW5zb3JEaW1lbnNpb259KTtcblx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHtcblx0XHRkaW1lbnNpb246IHNlbnNvckRpbWVuc2lvbiAqIG5TZW5zb3JzLFxuXHRcdG9ic2VydmVkUHJvamVjdGlvbjogY29uY2F0ZW5hdGVkT2JzZXJ2ZWRQcm9qZWN0aW9uLFxuXHRcdGNvdmFyaWFuY2U6IGZvcm1hdHRlZENvdmFyaWFuY2Vcblx0fSk7XG59O1xuIiwiY29uc3QgcGFkV2l0aFplcm9zID0gcmVxdWlyZSgnLi4vbGluYWxnZWJyYS9wYWQtd2l0aC16ZXJvcy5qcycpO1xuY29uc3QgaWRlbnRpdHkgPSByZXF1aXJlKCcuLi9saW5hbGdlYnJhL2lkZW50aXR5LmpzJyk7XG4vKipcbipCdWlsZHMgdGhlIHN0YXRlUHJvamVjdGlvbiBnaXZlbiBhbiBvYnNlcnZlZFByb2plY3Rpb25cbipAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvYnNlcnZhdGlvblxuKkBwYXJhbSB7RHluYW1pY0NvbmZpZ30gZHluYW1pY1xuKkByZXR1cm5zIHtPYnNlcnZhdGlvbkNvbmZpZywgRHluYW1pY0NvbmZpZ30gdGhlIG1vZGVsIGNvbnRhaW5pbmcgdGhlIGNyZWF0ZWQgc3RhdGVQcm9qZWN0aW9uXG4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7b2JzZXJ2YXRpb24sIGR5bmFtaWN9KSB7XG5cdGNvbnN0IHtvYnNlcnZlZFByb2plY3Rpb24sIHN0YXRlUHJvamVjdGlvbn0gPSBvYnNlcnZhdGlvbjtcblx0Y29uc3Qgb2JzZXJ2YXRpb25EaW1lbnNpb24gPSBvYnNlcnZhdGlvbi5kaW1lbnNpb247XG5cdGNvbnN0IGR5bmFtaWNEaW1lbnNpb24gPSBkeW5hbWljLmRpbWVuc2lvbjtcblx0aWYgKG9ic2VydmVkUHJvamVjdGlvbiAmJiBzdGF0ZVByb2plY3Rpb24pIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcignWW91IGNhbm5vdCB1c2UgYm90aCBvYnNlcnZlZFByb2plY3Rpb24gYW5kIHN0YXRlUHJvamVjdGlvbicpKTtcblx0fVxuXG5cdGlmIChvYnNlcnZlZFByb2plY3Rpb24pIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0b2JzZXJ2YXRpb246IE9iamVjdC5hc3NpZ24oe30sIG9ic2VydmF0aW9uLCB7XG5cdFx0XHRcdHN0YXRlUHJvamVjdGlvbjogcGFkV2l0aFplcm9zKG9ic2VydmVkUHJvamVjdGlvbiwge2RpbWVuc2lvbjogZHluYW1pY0RpbWVuc2lvbn0pXG5cdFx0XHR9KSxcblx0XHRcdGR5bmFtaWNcblx0XHR9O1xuXHR9XG5cblx0aWYgKG9ic2VydmF0aW9uRGltZW5zaW9uICYmIGR5bmFtaWNEaW1lbnNpb24pIHtcblx0XHRjb25zdCBvYnNlcnZhdGlvbk1hdHJpeCA9IGlkZW50aXR5KG9ic2VydmF0aW9uRGltZW5zaW9uKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0b2JzZXJ2YXRpb246IE9iamVjdC5hc3NpZ24oe30sIG9ic2VydmF0aW9uLCB7XG5cdFx0XHRcdHN0YXRlUHJvamVjdGlvbjogcGFkV2l0aFplcm9zKG9ic2VydmF0aW9uTWF0cml4LCB7ZGltZW5zaW9uOiBkeW5hbWljRGltZW5zaW9ufSlcblx0XHRcdH0pLFxuXHRcdFx0ZHluYW1pY1xuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4ge29ic2VydmF0aW9uLCBkeW5hbWljfTtcbn07XG4iLCIvKipcbipWZXJpZmllcyB0aGF0IGR5bmFtaWMuZGltZW5zaW9uIGFuZCBvYnNlcnZhdGlvbi5kaW1lbnNpb24gYXJlIHNldFxuKkBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uXG4qQHBhcmFtIHtEeW5hbWljQ29uZmlnfSBkeW5hbWljXG4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7b2JzZXJ2YXRpb24sIGR5bmFtaWN9KSB7XG5cdGNvbnN0IGR5bmFtaWNEaW1lbnNpb24gPSBkeW5hbWljLmRpbWVuc2lvbjtcblx0Y29uc3Qgb2JzZXJ2YXRpb25EaW1lbnNpb24gPSBvYnNlcnZhdGlvbi5kaW1lbnNpb247XG5cdGlmICghZHluYW1pY0RpbWVuc2lvbiB8fCAhb2JzZXJ2YXRpb25EaW1lbnNpb24pIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcignRGltZW5zaW9uIGlzIG5vdCBzZXQnKSk7XG5cdH1cblxuXHRyZXR1cm4ge29ic2VydmF0aW9uLCBkeW5hbWljfTtcbn07XG4iLCJjb25zdCBkaWFnID0gcmVxdWlyZSgnLi4vbGluYWxnZWJyYS9kaWFnLmpzJyk7XG5cbi8qKlxuKkluaXRpYWxpemVzIHRoZSBkeW5hbWljLmluaXQgd2hlbiBub3QgZ2l2ZW5cbipAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvYnNlcnZhdGlvblxuKkBwYXJhbSB7RHluYW1pY0NvbmZpZ30gZHluYW1pY1xuKkByZXR1cm5zIHtPYnNlcnZhdGlvbkNvbmZpZywgRHluYW1pY0NvbmZpZ31cbiovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHtvYnNlcnZhdGlvbiwgZHluYW1pY30pIHtcblx0aWYgKCFkeW5hbWljLmluaXQpIHtcblx0XHRjb25zdCBodWdlID0gMWU2O1xuXHRcdGNvbnN0IGR5bmFtaWNEaW1lbnNpb24gPSBkeW5hbWljLmRpbWVuc2lvbjtcblx0XHRjb25zdCBtZWFuQXJyYXkgPSBuZXcgQXJyYXkoZHluYW1pY0RpbWVuc2lvbikuZmlsbCgwKTtcblx0XHRjb25zdCBjb3ZhcmlhbmNlQXJyYXkgPSBuZXcgQXJyYXkoZHluYW1pY0RpbWVuc2lvbikuZmlsbChodWdlKTtcblx0XHRjb25zdCB3aXRoSW5pdE9wdGlvbnMgPSB7XG5cdFx0XHRvYnNlcnZhdGlvbixcblx0XHRcdGR5bmFtaWM6IE9iamVjdC5hc3NpZ24oe30sIGR5bmFtaWMsIHtcblx0XHRcdFx0aW5pdDoge1xuXHRcdFx0XHRcdG1lYW46IG1lYW5BcnJheS5tYXAoZWxlbWVudCA9PiBbZWxlbWVudF0pLFxuXHRcdFx0XHRcdGNvdmFyaWFuY2U6IGRpYWcoY292YXJpYW5jZUFycmF5KVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH07XG5cdFx0cmV0dXJuIHdpdGhJbml0T3B0aW9ucztcblx0fVxuXG5cdHJldHVybiB7b2JzZXJ2YXRpb24sIGR5bmFtaWN9O1xufTtcbiIsIi8qKlxuKlZlcmlmaWVzIHRoYXQgZGltZW5zaW9ucyBhcmUgbWF0Y2hpbmcgYW5kIHNldCBkeW5hbWljLmRpbWVuc2lvbiBhbmQgb2JzZXJ2YXRpb24uZGltZW5zaW9uXG4qIHdpdGggcmVzcGVjdCBvZiBzdGF0ZVByb2plY3Rpb24gYW5kIHRyYW5zaXRpb24gZGltZW5zaW9uc1xuKkBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uXG4qQHBhcmFtIHtEeW5hbWljQ29uZmlnfSBkeW5hbWljXG4qQHJldHVybnMge09ic2VydmF0aW9uQ29uZmlnLCBEeW5hbWljQ29uZmlnfVxuKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe29ic2VydmF0aW9uLCBkeW5hbWljfSkge1xuXHRjb25zdCBzdGF0ZVByb2plY3Rpb24gPSBvYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb247XG5cdGNvbnN0IHRyYW5zaXRpb24gPSBkeW5hbWljLnRyYW5zaXRpb247XG5cdGNvbnN0IGR5bmFtaWNEaW1lbnNpb24gPSBkeW5hbWljLmRpbWVuc2lvbjtcblx0Y29uc3Qgb2JzZXJ2YXRpb25EaW1lbnNpb24gPSBvYnNlcnZhdGlvbi5kaW1lbnNpb247XG5cblx0aWYgKGR5bmFtaWNEaW1lbnNpb24gJiYgb2JzZXJ2YXRpb25EaW1lbnNpb24gJiYgQXJyYXkuaXNBcnJheShzdGF0ZVByb2plY3Rpb24pKSB7XG5cdFx0aWYgKGR5bmFtaWNEaW1lbnNpb24gIT09IHN0YXRlUHJvamVjdGlvblswXS5sZW5ndGggfHwgb2JzZXJ2YXRpb25EaW1lbnNpb24gIT09IHN0YXRlUHJvamVjdGlvbi5sZW5ndGgpIHtcblx0XHRcdHRocm93IChuZXcgVHlwZUVycm9yKCdzdGF0ZVByb2plY3Rpb24gZGltZW5zaW9ucyBub3QgbWF0Y2hpbmcgd2l0aCBvYnNlcnZhdGlvbiBhbmQgZHluYW1pYyBkaW1lbnNpb25zJykpO1xuXHRcdH1cblx0fVxuXG5cdGlmIChkeW5hbWljRGltZW5zaW9uICYmIEFycmF5LmlzQXJyYXkodHJhbnNpdGlvbikpIHtcblx0XHRpZiAoZHluYW1pY0RpbWVuc2lvbiAhPT0gdHJhbnNpdGlvbi5sZW5ndGgpIHtcblx0XHRcdHRocm93IChuZXcgVHlwZUVycm9yKCd0cmFuc2l0aW9uIGRpbWVuc2lvbiBub3QgbWF0Y2hpbmcgd2l0aCBkeW5hbWljIGRpbWVuc2lvbicpKTtcblx0XHR9XG5cdH1cblxuXHRpZiAoQXJyYXkuaXNBcnJheShzdGF0ZVByb2plY3Rpb24pKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG9ic2VydmF0aW9uOiBPYmplY3QuYXNzaWduKHt9LCBvYnNlcnZhdGlvbiwge1xuXHRcdFx0XHRkaW1lbnNpb246IHN0YXRlUHJvamVjdGlvbi5sZW5ndGhcblx0XHRcdH0pLFxuXHRcdFx0ZHluYW1pYzogT2JqZWN0LmFzc2lnbih7fSwgZHluYW1pYywge1xuXHRcdFx0XHRkaW1lbnNpb246IHN0YXRlUHJvamVjdGlvblswXS5sZW5ndGhcblx0XHRcdH0pXG5cdFx0fTtcblx0fVxuXG5cdGlmIChBcnJheS5pc0FycmF5KHRyYW5zaXRpb24pKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG9ic2VydmF0aW9uLFxuXHRcdFx0ZHluYW1pYzogT2JqZWN0LmFzc2lnbih7fSwgZHluYW1pYywge1xuXHRcdFx0XHRkaW1lbnNpb246IHRyYW5zaXRpb24ubGVuZ3RoXG5cdFx0XHR9KVxuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4ge29ic2VydmF0aW9uLCBkeW5hbWljfTtcbn07XG4iLCJjb25zdCBjaGVja01hdHJpeCA9IGZ1bmN0aW9uIChtYXRyaXgsIHNoYXBlKSB7XG5cdGlmIChtYXRyaXgucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSkuZmlsdGVyKGEgPT4gTnVtYmVyLmlzTmFOKGEpKS5sZW5ndGggPiAwKSB7XG5cdFx0dGhyb3cgKG5ldyBFcnJvcignTWF0cml4IHNob3VsZCBub3QgaGF2ZSBhIE5hTicpKTtcblx0fVxuXG5cdGlmIChzaGFwZSkge1xuXHRcdGNoZWNrU2hhcGUobWF0cml4LCBzaGFwZSk7XG5cdH1cbn07XG5cbmNvbnN0IGNoZWNrU2hhcGUgPSBmdW5jdGlvbiAobWF0cml4LCBzaGFwZSkge1xuXHRpZiAobWF0cml4Lmxlbmd0aCAhPT0gc2hhcGVbMF0pIHtcblx0XHR0aHJvdyAobmV3IEVycm9yKCdzaGFwZSBhbmQgbGVuZ3RoIGRvIG5vdCBtYXRjaCcpKTtcblx0fVxuXG5cdGlmIChzaGFwZS5sZW5ndGggPiAxKSB7XG5cdFx0cmV0dXJuIG1hdHJpeC5mb3JFYWNoKG0gPT4gY2hlY2tTaGFwZShtLCBzaGFwZS5zbGljZSgxKSkpO1xuXHR9XG59O1xuXG4vKipcbiAqIEBjbGFzc1xuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgbXVsdGkgZGltZW5zaW9ubmFsIGdhdXNzaWFuLCB3aXRoIGhpcyBtZWFuIGFuZCBoaXMgY292YXJpYW5jZVxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFtpbmRleD0wXSB0aGUgaW5kZXggb2YgdGhlIFN0YXRlIGluIHRoZSBwcm9jZXNzLCB0aGlzIGlzIG5vdCBtYW5kYXRvcnkgZm9yIHNpbXBsZSBLYWxtYW4gRmlsdGVyLCBidXQgaXMgbmVlZGVkIGZvciBtb3N0IG9mIHRoZSB1c2UgY2FzZSBvZiBleHRlbmRlZCBrYWxtYW4gZmlsdGVyXG4gKiBAcHJvcGVydHkge0FycmF5LjxBcnJheS48TnVtYmVyPj59IGNvdmFyaWFuY2Ugc3F1YXJlIG1hdHJpeCBvZiBzaXplIGRpbWVuc2lvblxuICogQHByb3BlcnR5IHtBcnJheS48QXJyYXk8TnVtYmVyPj59IG1lYW4gY29sdW1uIG1hdHJpeCBvZiBzaXplIGRpbWVuc2lvbiB4IDFcbiAqL1xuY2xhc3MgU3RhdGUge1xuXHRjb25zdHJ1Y3Rvcih7bWVhbiwgY292YXJpYW5jZSwgaW5kZXh9KSB7XG5cdFx0dGhpcy5tZWFuID0gbWVhbjtcblx0XHR0aGlzLmNvdmFyaWFuY2UgPSBjb3ZhcmlhbmNlO1xuXHRcdHRoaXMuaW5kZXggPSBpbmRleDtcblx0fVxuXG5cdC8qKlxuXHQqIENoZWNrIHRoZSBjb25zaXN0ZW5jeSBvZiB0aGUgU3RhdGVcblx0Ki9cblx0Y2hlY2soKSB7XG5cdFx0dGhpcy5jb25zdHJ1Y3Rvci5jaGVjayh0aGlzKTtcblx0fVxuXG5cdC8qKlxuXHQqIENoZWNrIHRoZSBjb25zaXN0ZW5jeSBvZiB0aGUgU3RhdGUncyBhdHRyaWJ1dGVzXG5cdCovXG5cblx0c3RhdGljIGNoZWNrKHN0YXRlLCB7ZGltZW5zaW9uID0gbnVsbH0gPSB7fSkge1xuXHRcdGlmICghKHN0YXRlIGluc3RhbmNlb2YgU3RhdGUpKSB7XG5cdFx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcignVGhlIGFyZ3VtZW50IGlzIG5vdCBhIHN0YXRlJykpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHttZWFuLCBjb3ZhcmlhbmNlfSA9IHN0YXRlOyAvLyBJbmRleFxuXHRcdGNvbnN0IG1lYW5EaW1lbnNpb24gPSBtZWFuLmxlbmd0aDtcblx0XHRpZiAodHlwZW9mIChkaW1lbnNpb24pID09PSAnbnVtYmVyJyAmJiBtZWFuRGltZW5zaW9uICE9PSBkaW1lbnNpb24pIHtcblx0XHRcdHRocm93IChuZXcgRXJyb3IoYCR7bWVhbkRpbWVuc2lvbn0gYW5kICR7ZGltZW5zaW9ufSBhcmUgbm90IHRoZSBzYW1lYCkpO1xuXHRcdH1cblxuXHRcdGNoZWNrTWF0cml4KG1lYW4sIFttZWFuRGltZW5zaW9uLCAxXSk7XG5cdFx0Y2hlY2tNYXRyaXgoY292YXJpYW5jZSwgW21lYW5EaW1lbnNpb24sIG1lYW5EaW1lbnNpb25dKTtcblxuXHRcdC8vIElmICh0eXBlb2YgKGluZGV4KSAhPT0gJ251bWJlcicpIHtcblx0XHQvLyBcdHRocm93IChuZXcgVHlwZUVycm9yKCd0IG11c3QgYmUgYSBudW1iZXInKSk7XG5cdFx0Ly8gfVxuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3RhdGU7XG4iLCIvKipcbipSZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIG1hdHJpeCBpbiBkaW0qMSwgZ2l2ZW4gYW4gZGltIG1hdHJpeCwgYW5kIGNoZWNrc1xuKiBpZiBjb3JyZXNwb25kaW5nIHdpdGggdGhlIG9ic2VydmF0aW9uIGRpbWVuc2lvblxuKkBwYXJhbSB7QXJyYXkuPE51bWJlcj4gfCBBcnJheS48QXJyYXkuPE51bWJlcj4+fSBvYnNlcnZhdGlvblxuKkBwYXJhbSB7TnVtYmVyfSBkaW1lbnNpb25cbipAcmV0dXJucyB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn1cbiovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHtvYnNlcnZhdGlvbiwgZGltZW5zaW9ufSkge1xuXHRpZiAoIUFycmF5LmlzQXJyYXkob2JzZXJ2YXRpb24pKSB7XG5cdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoJ1RoZSBvYnNlcnZhdGlvbiBzaG91bGQgYmUgYW4gYXJyYXknKSk7XG5cdH1cblxuXHRpZiAob2JzZXJ2YXRpb24ubGVuZ3RoICE9PSBkaW1lbnNpb24pIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcignT2JzZXJ2YXRpb24gYW5kIGRpbWVuc2lvbiBub3QgbWF0Y2hpbmcnKSk7XG5cdH1cblxuXHRpZiAodHlwZW9mIChvYnNlcnZhdGlvblswXSkgPT09ICdudW1iZXInKSB7XG5cdFx0cmV0dXJuIG9ic2VydmF0aW9uLm1hcChlbGVtZW50ID0+IFtlbGVtZW50XSk7XG5cdH1cblxuXHRyZXR1cm4gb2JzZXJ2YXRpb247XG59O1xuIiwiY29uc3QgdW5pcSA9IHJlcXVpcmUoJy4vdW5pcS5qcycpO1xuY29uc3QgbGltaXQgPSAxMDA7XG5cbi8qKlxuKkVxdWl2YWxlbnQgdG8gdGhlIE9iamVjdC5hc3NpZ24gbWV0aG9kZSwgdGFrZXMgc2V2ZXJhbCBhcmd1bWVudHMgYW5kIGNyZWF0ZXMgYSBuZXcgb2JqZWN0IGNvcnJlc3BvbmRpbmcgdG8gdGhlIGFzc2lnbm1lbnQgb2YgdGhlIGFyZ3VtZW50c1xuKiBAcGFyYW0ge09iamVjdH0gYXJnc1xuKiBAcGFyYW0ge051bWJlcn0gc3RlcFxuKi9cbmNvbnN0IGRlZXBBc3NpZ24gPSBmdW5jdGlvbiAoYXJncywgc3RlcCkge1xuXHRpZiAoc3RlcCA+IGxpbWl0KSB7XG5cdFx0dGhyb3cgKG5ldyBFcnJvcihgSW4gZGVlcEFzc2lnbiwgbnVtYmVyIG9mIHJlY3Vyc2l2ZSBjYWxsICgke3N0ZXB9KSByZWFjaGVkIGxpbWl0ICgke2xpbWl0fSksIGRlZXBBc3NpZ24gaXMgbm90IHdvcmtpbmcgb24gIHNlbGYtcmVmZXJlbmNpbmcgb2JqZWN0c2ApKTtcblx0fVxuXG5cdGNvbnN0IGZpbHRlckFyZ3VtZW50cyA9IGFyZ3MuZmlsdGVyKGFyZyA9PiB0eXBlb2YgKGFyZykgIT09ICd1bmRlZmluZWQnICYmIGFyZyAhPT0gbnVsbCk7XG5cdGNvbnN0IGxhc3RBcmd1bWVudCA9IGZpbHRlckFyZ3VtZW50c1tmaWx0ZXJBcmd1bWVudHMubGVuZ3RoIC0gMV07XG5cdGlmIChmaWx0ZXJBcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0cmV0dXJuIGZpbHRlckFyZ3VtZW50c1swXTtcblx0fVxuXG5cdGlmICh0eXBlb2YgKGxhc3RBcmd1bWVudCkgIT09ICdvYmplY3QnIHx8IEFycmF5LmlzQXJyYXkobGFzdEFyZ3VtZW50KSkge1xuXHRcdHJldHVybiBsYXN0QXJndW1lbnQ7XG5cdH1cblxuXHRpZiAoZmlsdGVyQXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Y29uc3Qgb2JqZWN0c0FyZ3VtZW50cyA9IGZpbHRlckFyZ3VtZW50cy5maWx0ZXIoYXJnID0+IHR5cGVvZiAoYXJnKSA9PT0gJ29iamVjdCcpO1xuXHRsZXQga2V5cyA9IFtdO1xuXHRvYmplY3RzQXJndW1lbnRzLmZvckVhY2goYXJnID0+IHtcblx0XHRrZXlzID0ga2V5cy5jb25jYXQoT2JqZWN0LmtleXMoYXJnKSk7XG5cdH0pO1xuXHRjb25zdCB1bmlxS2V5cyA9IHVuaXEoa2V5cyk7XG5cdGNvbnN0IHJlc3VsdCA9IHt9O1xuXHR1bmlxS2V5cy5mb3JFYWNoKGtleSA9PiB7XG5cdFx0Y29uc3QgdmFsdWVzID0gb2JqZWN0c0FyZ3VtZW50cy5tYXAoYXJnID0+IGFyZ1trZXldKTtcblx0XHRyZXN1bHRba2V5XSA9IGRlZXBBc3NpZ24odmFsdWVzLCBzdGVwICsgMSk7XG5cdH0pO1xuXHRyZXR1cm4gcmVzdWx0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAoKC4uLmFyZ3MpID0+IGRlZXBBc3NpZ24oYXJncywgMCkpO1xuIiwiLyoqXG4qIEB0eXBlZGVmIHtOdW1iZXIgfCBBcnJheS48TnVtYmVyPiB8IEFycmF5LjxBcnJheS48TnVtYmVyPj59IENvdmFyaWFuY2VQYXJhbVxuKi9cbmNvbnN0IGRpYWcgPSByZXF1aXJlKCcuLi9saW5hbGdlYnJhL2RpYWcnKTtcbi8qKlxuKiBJZiBjb3YgaXMgYSBudW1iZXIsIHJlc3VsdCB3aWxsIGJlIElkZW50aXR5KmNvdlxuKiBJZiBjb3YgaXMgYW4gQXJyYXkuPE51bWJlcj4sIHJlc3VsdCB3aWxsIGJlIGRpYWcoY292KVxuKiBJZiBjb3YgaXMgYW4gQXJyYXkuPEFycmF5LjxOdW1iZXI+PiwgcmVzdWx0IHdpbGwgYmUgY292XG4qIEBwYXJhbSB7Q292YXJpYW5jZVBhcmFtfSBjb3ZcbiogQHBhcmFtIHtOdW1iZXJ9IGRpbWVuc2lvblxuKiBAcmV0dXJucyB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn1cbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcnJheSwge2RpbWVuc2lvbn0gPSB7fSkge1xuXHRpZiAodHlwZW9mIChhcnJheSkgPT09ICdudW1iZXInIHx8IEFycmF5LmlzQXJyYXkoYXJyYXkpKSB7XG5cdFx0aWYgKHR5cGVvZiAoYXJyYXkpID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgKGRpbWVuc2lvbikgPT09ICdudW1iZXInKSB7XG5cdFx0XHRyZXR1cm4gZGlhZyhuZXcgQXJyYXkoZGltZW5zaW9uKS5maWxsKGFycmF5KSk7XG5cdFx0fVxuXG5cdFx0aWYgKChBcnJheS5pc0FycmF5KGFycmF5KSkgJiYgKEFycmF5LmlzQXJyYXkoYXJyYXlbMF0pKSkge1xuXHRcdFx0cmV0dXJuIGFycmF5O1xuXHRcdH1cblxuXHRcdGlmICgoQXJyYXkuaXNBcnJheShhcnJheSkpICYmICh0eXBlb2YgKGFycmF5WzBdKSA9PT0gJ251bWJlcicpKSB7XG5cdFx0XHRyZXR1cm4gZGlhZyhhcnJheSk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGFycmF5O1xufTtcbiIsIi8vIENvbnN0IGRpYWcgPSByZXF1aXJlKCcuLi9saW5hbGdlYnJhL2RpYWcuanMnKTtcblxuLyoqXG4qIEBjYWxsYmFjayBNYXRyaXhDYWxsYmFja1xuKiBAcmV0dXJucyA8QXJyYXkuPEFycmF5LjxOdW1iZXI+PlxuKi9cblxuLyoqXG4qIFRyYW5mb3JtczpcbioqIGEgMmQgYXJyYXkgaW50byBhIGZ1bmN0aW9uICgoKSA9PiBhcnJheSlcbioqIGEgMWQgYXJyYXkgaW50byBhIGZ1bmN0aW9uICgoKSA9PiBkaWFnKGFycmF5KSlcbipAcGFyYW0ge0FycmF5LjxOdW1iZXI+IHwgQXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gYXJyYXlcbipAcmV0dXJucyB7TWF0cml4Q2FsbGJhY2t9XG4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcnJheSkge1xuXHRpZiAodHlwZW9mIChhcnJheSkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gYXJyYXk7XG5cdH1cblxuXHRpZiAoQXJyYXkuaXNBcnJheShhcnJheSkpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGFycmF5O1xuXHRcdH07XG5cdH1cblxuXHR0aHJvdyAobmV3IEVycm9yKCdPbmx5IGFycmF5cyBhbmQgZnVuY3Rpb25zIGFyZSBhdXRob3JpemVkJykpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFycmF5KSB7XG5cdHJldHVybiBhcnJheS5maWx0ZXIoKHZhbHVlLCBpbmRleCkgPT5cblx0XHRhcnJheS5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXhcblx0KTtcbn07XG4iLCJ2YXIgU3lsdmVzdGVyID0ge31cblxuU3lsdmVzdGVyLk1hdHJpeCA9IGZ1bmN0aW9uKCkge31cblxuU3lsdmVzdGVyLk1hdHJpeC5jcmVhdGUgPSBmdW5jdGlvbihlbGVtZW50cykge1xuICB2YXIgTSA9IG5ldyBTeWx2ZXN0ZXIuTWF0cml4KClcbiAgcmV0dXJuIE0uc2V0RWxlbWVudHMoZWxlbWVudHMpXG59XG5cblN5bHZlc3Rlci5NYXRyaXguSSA9IGZ1bmN0aW9uKG4pIHtcbiAgdmFyIGVscyA9IFtdLFxuICAgIGkgPSBuLFxuICAgIGpcbiAgd2hpbGUgKGktLSkge1xuICAgIGogPSBuXG4gICAgZWxzW2ldID0gW11cbiAgICB3aGlsZSAoai0tKSB7XG4gICAgICBlbHNbaV1bal0gPSBpID09PSBqID8gMSA6IDBcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFN5bHZlc3Rlci5NYXRyaXguY3JlYXRlKGVscylcbn1cblxuU3lsdmVzdGVyLk1hdHJpeC5wcm90b3R5cGUgPSB7XG4gIGR1cDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFN5bHZlc3Rlci5NYXRyaXguY3JlYXRlKHRoaXMuZWxlbWVudHMpXG4gIH0sXG5cbiAgaXNTcXVhcmU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb2xzID0gdGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDAgPyAwIDogdGhpcy5lbGVtZW50c1swXS5sZW5ndGhcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50cy5sZW5ndGggPT09IGNvbHNcbiAgfSxcblxuICB0b1JpZ2h0VHJpYW5ndWxhcjogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gU3lsdmVzdGVyLk1hdHJpeC5jcmVhdGUoW10pXG4gICAgdmFyIE0gPSB0aGlzLmR1cCgpLFxuICAgICAgZWxzXG4gICAgdmFyIG4gPSB0aGlzLmVsZW1lbnRzLmxlbmd0aCxcbiAgICAgIGksXG4gICAgICBqLFxuICAgICAgbnAgPSB0aGlzLmVsZW1lbnRzWzBdLmxlbmd0aCxcbiAgICAgIHBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICBpZiAoTS5lbGVtZW50c1tpXVtpXSA9PT0gMCkge1xuICAgICAgICBmb3IgKGogPSBpICsgMTsgaiA8IG47IGorKykge1xuICAgICAgICAgIGlmIChNLmVsZW1lbnRzW2pdW2ldICE9PSAwKSB7XG4gICAgICAgICAgICBlbHMgPSBbXVxuICAgICAgICAgICAgZm9yIChwID0gMDsgcCA8IG5wOyBwKyspIHtcbiAgICAgICAgICAgICAgZWxzLnB1c2goTS5lbGVtZW50c1tpXVtwXSArIE0uZWxlbWVudHNbal1bcF0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBNLmVsZW1lbnRzW2ldID0gZWxzXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKE0uZWxlbWVudHNbaV1baV0gIT09IDApIHtcbiAgICAgICAgZm9yIChqID0gaSArIDE7IGogPCBuOyBqKyspIHtcbiAgICAgICAgICB2YXIgbXVsdGlwbGllciA9IE0uZWxlbWVudHNbal1baV0gLyBNLmVsZW1lbnRzW2ldW2ldXG4gICAgICAgICAgZWxzID0gW11cbiAgICAgICAgICBmb3IgKHAgPSAwOyBwIDwgbnA7IHArKykge1xuICAgICAgICAgICAgLy8gRWxlbWVudHMgd2l0aCBjb2x1bW4gbnVtYmVycyB1cCB0byBhbiBpbmNsdWRpbmcgdGhlIG51bWJlciBvZiB0aGVcbiAgICAgICAgICAgIC8vIHJvdyB0aGF0IHdlJ3JlIHN1YnRyYWN0aW5nIGNhbiBzYWZlbHkgYmUgc2V0IHN0cmFpZ2h0IHRvIHplcm8sXG4gICAgICAgICAgICAvLyBzaW5jZSB0aGF0J3MgdGhlIHBvaW50IG9mIHRoaXMgcm91dGluZSBhbmQgaXQgYXZvaWRzIGhhdmluZyB0b1xuICAgICAgICAgICAgLy8gbG9vcCBvdmVyIGFuZCBjb3JyZWN0IHJvdW5kaW5nIGVycm9ycyBsYXRlclxuICAgICAgICAgICAgZWxzLnB1c2goXG4gICAgICAgICAgICAgIHAgPD0gaSA/IDAgOiBNLmVsZW1lbnRzW2pdW3BdIC0gTS5lbGVtZW50c1tpXVtwXSAqIG11bHRpcGxpZXJcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgICAgTS5lbGVtZW50c1tqXSA9IGVsc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBNXG4gIH0sXG5cbiAgZGV0ZXJtaW5hbnQ6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIDFcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzU3F1YXJlKCkpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHZhciBNID0gdGhpcy50b1JpZ2h0VHJpYW5ndWxhcigpXG4gICAgdmFyIGRldCA9IE0uZWxlbWVudHNbMF1bMF0sXG4gICAgICBuID0gTS5lbGVtZW50cy5sZW5ndGhcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IG47IGkrKykge1xuICAgICAgZGV0ID0gZGV0ICogTS5lbGVtZW50c1tpXVtpXVxuICAgIH1cbiAgICByZXR1cm4gZGV0XG4gIH0sXG5cbiAgaXNTaW5ndWxhcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNTcXVhcmUoKSAmJiB0aGlzLmRldGVybWluYW50KCkgPT09IDBcbiAgfSxcblxuICBhdWdtZW50OiBmdW5jdGlvbihtYXRyaXgpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmR1cCgpXG4gICAgfVxuICAgIHZhciBNID0gbWF0cml4LmVsZW1lbnRzIHx8IG1hdHJpeFxuICAgIGlmICh0eXBlb2YgTVswXVswXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIE0gPSBTeWx2ZXN0ZXIuTWF0cml4LmNyZWF0ZShNKS5lbGVtZW50c1xuICAgIH1cbiAgICB2YXIgVCA9IHRoaXMuZHVwKCksXG4gICAgICBjb2xzID0gVC5lbGVtZW50c1swXS5sZW5ndGhcbiAgICB2YXIgaSA9IFQuZWxlbWVudHMubGVuZ3RoLFxuICAgICAgbmogPSBNWzBdLmxlbmd0aCxcbiAgICAgIGpcbiAgICBpZiAoaSAhPT0gTS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGogPSBualxuICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICBULmVsZW1lbnRzW2ldW2NvbHMgKyBqXSA9IE1baV1bal1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFRcbiAgfSxcblxuICBpbnZlcnNlOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGlmICghdGhpcy5pc1NxdWFyZSgpIHx8IHRoaXMuaXNTaW5ndWxhcigpKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICB2YXIgbiA9IHRoaXMuZWxlbWVudHMubGVuZ3RoLFxuICAgICAgaSA9IG4sXG4gICAgICBqXG4gICAgdmFyIE0gPSB0aGlzLmF1Z21lbnQoU3lsdmVzdGVyLk1hdHJpeC5JKG4pKS50b1JpZ2h0VHJpYW5ndWxhcigpXG4gICAgdmFyIG5wID0gTS5lbGVtZW50c1swXS5sZW5ndGgsXG4gICAgICBwLFxuICAgICAgZWxzLFxuICAgICAgZGl2aXNvclxuICAgIHZhciBpbnZlcnNlX2VsZW1lbnRzID0gW10sXG4gICAgICBuZXdfZWxlbWVudFxuICAgIC8vIFN5bHZlc3Rlci5NYXRyaXggaXMgbm9uLXNpbmd1bGFyIHNvIHRoZXJlIHdpbGwgYmUgbm8gemVyb3Mgb24gdGhlXG4gICAgLy8gZGlhZ29uYWwuIEN5Y2xlIHRocm91Z2ggcm93cyBmcm9tIGxhc3QgdG8gZmlyc3QuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgLy8gRmlyc3QsIG5vcm1hbGlzZSBkaWFnb25hbCBlbGVtZW50cyB0byAxXG4gICAgICBlbHMgPSBbXVxuICAgICAgaW52ZXJzZV9lbGVtZW50c1tpXSA9IFtdXG4gICAgICBkaXZpc29yID0gTS5lbGVtZW50c1tpXVtpXVxuICAgICAgZm9yIChwID0gMDsgcCA8IG5wOyBwKyspIHtcbiAgICAgICAgbmV3X2VsZW1lbnQgPSBNLmVsZW1lbnRzW2ldW3BdIC8gZGl2aXNvclxuICAgICAgICBlbHMucHVzaChuZXdfZWxlbWVudClcbiAgICAgICAgLy8gU2h1ZmZsZSBvZmYgdGhlIGN1cnJlbnQgcm93IG9mIHRoZSByaWdodCBoYW5kIHNpZGUgaW50byB0aGUgcmVzdWx0c1xuICAgICAgICAvLyBhcnJheSBhcyBpdCB3aWxsIG5vdCBiZSBtb2RpZmllZCBieSBsYXRlciBydW5zIHRocm91Z2ggdGhpcyBsb29wXG4gICAgICAgIGlmIChwID49IG4pIHtcbiAgICAgICAgICBpbnZlcnNlX2VsZW1lbnRzW2ldLnB1c2gobmV3X2VsZW1lbnQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIE0uZWxlbWVudHNbaV0gPSBlbHNcbiAgICAgIC8vIFRoZW4sIHN1YnRyYWN0IHRoaXMgcm93IGZyb20gdGhvc2UgYWJvdmUgaXQgdG8gZ2l2ZSB0aGUgaWRlbnRpdHkgbWF0cml4XG4gICAgICAvLyBvbiB0aGUgbGVmdCBoYW5kIHNpZGVcbiAgICAgIGogPSBpXG4gICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgIGVscyA9IFtdXG4gICAgICAgIGZvciAocCA9IDA7IHAgPCBucDsgcCsrKSB7XG4gICAgICAgICAgZWxzLnB1c2goTS5lbGVtZW50c1tqXVtwXSAtIE0uZWxlbWVudHNbaV1bcF0gKiBNLmVsZW1lbnRzW2pdW2ldKVxuICAgICAgICB9XG4gICAgICAgIE0uZWxlbWVudHNbal0gPSBlbHNcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFN5bHZlc3Rlci5NYXRyaXguY3JlYXRlKGludmVyc2VfZWxlbWVudHMpXG4gIH0sXG5cbiAgc2V0RWxlbWVudHM6IGZ1bmN0aW9uKGVscykge1xuICAgIHZhciBpLFxuICAgICAgaixcbiAgICAgIGVsZW1lbnRzID0gZWxzLmVsZW1lbnRzIHx8IGVsc1xuICAgIGlmIChlbGVtZW50c1swXSAmJiB0eXBlb2YgZWxlbWVudHNbMF1bMF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpID0gZWxlbWVudHMubGVuZ3RoXG4gICAgICB0aGlzLmVsZW1lbnRzID0gW11cbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgaiA9IGVsZW1lbnRzW2ldLmxlbmd0aFxuICAgICAgICB0aGlzLmVsZW1lbnRzW2ldID0gW11cbiAgICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICAgIHRoaXMuZWxlbWVudHNbaV1bal0gPSBlbGVtZW50c1tpXVtqXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICB2YXIgbiA9IGVsZW1lbnRzLmxlbmd0aFxuICAgIHRoaXMuZWxlbWVudHMgPSBbXVxuICAgIGZvciAoaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgIHRoaXMuZWxlbWVudHMucHVzaChbZWxlbWVudHNbaV1dKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9LFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGVsZW1lbnRzKSB7XG4gIHJldHVybiBTeWx2ZXN0ZXIuTWF0cml4LmNyZWF0ZShlbGVtZW50cykuaW52ZXJzZSgpLmVsZW1lbnRzXG59XG4iLCJjb25zdCBLYWxtYW5GaWx0ZXIgPSByZXF1aXJlKCcuLi8uLi9saWIva2FsbWFuLWZpbHRlcicpO1xuXG5jb25zdCBub2lzeU9ic2VydmF0aW9ucyA9IHJlcXVpcmUoJy4vb2JzZXJ2YXRpb25zLmpzb24nKS5vYnNlcnZhdGlvbnM7XG5jb25zdCBrZk9wdGlvbnMgPSByZXF1aXJlKCcuL2tmLW9wdGlvbnMuanMnKTtcbmNvbnN0IGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuL3ZpZXdzL2NyZWF0ZS1lbGVtZW50Jyk7XG5jb25zdCBjcmVhdGVHcm91cEJveGVzID0gcmVxdWlyZSgnLi92aWV3cy9jcmVhdGUtZ3JvdXAtYm94ZXMnKTtcblxuY29uc3Qga2YgPSBuZXcgS2FsbWFuRmlsdGVyKGtmT3B0aW9ucyk7XG5sZXQgcHJlZGljdGVkID0ga2YucHJlZGljdCgpO1xuXG5jb25zdCBpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmlrZXMnKTsvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cbi8vIENyZWF0ZSBhbGwgdGhlIGVsZW1lbnRzIG9mIHRoZSBwcmVkaWN0aW9uIG9yIGNvcnJlY3Rpb24gcGhhc2VcbmNvbnN0IGRlbGF5ID0gMjAwO1xuXG5sZXQgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xubGV0IHByZXZpb3VzQ29ycmVjdGVkID0gbnVsbDtcblxuY29uc3QgZGVsYXlQcm9taXNlID0gZGVsYXkgPT4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIGRlbGF5KSk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRydW4oKSB7XG5cdFx0bm9pc3lPYnNlcnZhdGlvbnMuZm9yRWFjaCgoYm94LCBpbmRleCkgPT4ge1xuXHRcdFx0cHJvbWlzZSA9IHByb21pc2Vcblx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdHByZWRpY3RlZCA9IGtmLnByZWRpY3Qoe3ByZXZpb3VzQ29ycmVjdGVkfSk7XG5cdFx0XHRcdFx0Y29uc3Qge21lYW4sIGNvdmFyaWFuY2V9ID0gcHJlZGljdGVkO1xuXG5cdFx0XHRcdFx0Y3JlYXRlR3JvdXBCb3hlcyh7bWVhbiwgY292YXJpYW5jZSwgcGFyZW50OiBpbWcsIGNsYXNzTmFtZTogJ3ByZWRpY3RlZCcsIGNvbG9yOiAnYmx1ZSd9KTtcblxuXHRcdFx0XHRcdHJldHVybiBkZWxheVByb21pc2UoZGVsYXkpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQudGhlbigoYiA9PiB7XG5cdFx0XHRcdFx0Y3JlYXRlRWxlbWVudCh7XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdvYnNlcnZhdGlvbicsXG5cdFx0XHRcdFx0XHRiYm94OiBbXG5cdFx0XHRcdFx0XHRcdGJbMF0gKyAoYlsyXSAvIDIpLFxuXHRcdFx0XHRcdFx0XHRiWzFdICsgKGJbM10gLyAyKSxcblx0XHRcdFx0XHRcdFx0YlsyXSxcblx0XHRcdFx0XHRcdFx0YlszXVxuXHRcdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRcdHBhcmVudDogaW1nLFxuXHRcdFx0XHRcdFx0Y29sb3I6ICd3aGl0ZScsXG5cdFx0XHRcdFx0XHRsaW5lU3R5bGU6ICdzb2xpZCdcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHJldHVybiBkZWxheVByb21pc2UoZGVsYXkpO1xuXHRcdFx0XHR9KS5iaW5kKG51bGwsIGJveCwgaW5kZXgpKVxuXHRcdFx0XHQudGhlbigoYiA9PiB7XG5cdFx0XHRcdFx0cHJldmlvdXNDb3JyZWN0ZWQgPSBrZi5jb3JyZWN0KHtwcmVkaWN0ZWQsIG9ic2VydmF0aW9uOiBifSk7XG5cdFx0XHRcdFx0Y29uc3Qge21lYW4sIGNvdmFyaWFuY2V9ID0gcHJldmlvdXNDb3JyZWN0ZWQ7XG5cblx0XHRcdFx0XHRjcmVhdGVHcm91cEJveGVzKHttZWFuLCBjb3ZhcmlhbmNlLCBwYXJlbnQ6IGltZywgY2xhc3NOYW1lOiAnY29ycmVjdGVkJywgY29sb3I6ICdyZWQnfSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gZGVsYXlQcm9taXNlKGRlbGF5KTtcblx0XHRcdFx0fSkuYmluZChudWxsLCBib3gsIGluZGV4KSk7XG5cdFx0fSk7XG5cdH1cbn07XG5cbiJdfQ==
