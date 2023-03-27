require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const observationCovariance = require('./observation-covariance.json');

const posVar = 100;
const timeStep = 0.2;

const floor = 442;

module.exports = {
	observation: {
		dimension: 2,
		stateProjection: [
			[1, 0, 0, 0, 0],
			[0, 1, 0, 0, 0]
		],
		// Covariance generated thanks to getCovariance
		covariance: observationCovariance
		// Covariance: [posVar, posVar, posVar, posVar],

	},

	dynamic: {
		init: {
			mean: [[943], [385], [0], [0], [0]],

			covariance: [
				[huge, 0, 0, 0, 0],
				[0, huge, 0, 0, 0],
				[0, 0, huge, 0, 0],
				[0, 0, 0, huge, 0],
				[0, 0, 0, 0, huge],
			]
		},

		constant({previousCorrected}) {
			const normalY = previousCorrected.mean[1][0] + previousCorrected.mean[3][0] * timeStep;

			let controlY = 0;

			if (normalY > floor) {
				controlY = 2 * (floor - normalY);
			}
			return [0, controlY, 0, 0, 0, 0];
		},

		transition({previousCorrected}) {
			const normalY = previousCorrected.mean[1][0] + previousCorrected.mean[3][0] * timeStep;
			let vY = 1;

			if (normalY > floor) {
				vY = -1;
			}

			return [
				[1, 0, timeStep, 0, 0],
				[0, 1, 0, timeStep, 0],
				[0, 0, 1, 0, 0],
				[0, 0, 0, vY, timeStep],
				[0, 0, 0, 0, 1]
			];
		},

		dimension: 5,

		covariance: [
			posVar,
			posVar,
			posVar * timeStep * timeStep,
			posVar * timeStep * timeStep,
			posVar * (timeStep ** 4),
			posVar * (timeStep ** 4)
		]
	}
};

},{"./observation-covariance.json":2}],2:[function(require,module,exports){
module.exports=[[34.31428571428572,-8.114285714285714,-9.185714285714285,3.0428571428571427],[-8.114285714285714,39.08571428571429,1.1857142857142857,-5.5285714285714285],[-9.185714285714285,1.1857142857142857,34.628571428571426,0.7857142857142857],[3.0428571428571427,-5.5285714285714285,0.7857142857142857,39.857142857142854]]
},{}],3:[function(require,module,exports){
module.exports={
	"ground": {
		y: 442
	},
	"observations": [
		[
			15,
			40
		],
		[
			39,
			70
		],
		[
			62,
			106
		],
		[
			83,
			148
		],
		[
			105,
			197
		],
		[
			126,
			253
		],
		[
			145,
			315
		],
		[
			165,
			383
		],
		[
			183,
			423
		],
		[
			202,
			364
		],
		[
			219,
			315
		],
		[
			236,
			274
		],
		[
			253,
			241
		],
		[
			270,
			216
		],
		[
			286,
			198
		],
		[
			302,
			187
		],
		[
			318,
			184
		],
		[
			334,
			187
		],
		[
			364,
			214
		],
		[
			393,
			265
		],
		[
			406,
			301
		],
		[
			419,
			343
		],
		[
			432,
			391
		],
		[
			443,
			434
		],
		[
			456,
			390
		],
		[
			469,
			354
		],
		[
			481,
			326
		],
		[
			494,
			305
		]
	]
}
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

},{}],"main":[function(require,module,exports){
const {KalmanFilter} = kalmanFilter;// eslint-disable-line no-undef

const noisyObservations = require('./observations.json').observations;
const kfOptions = require('./kf-options.js');
const createElement = require('../shared/views/create-element');
const createGroupBoxes = require('../shared/views/create-group-boxes');

const kf = new KalmanFilter(kfOptions);
let predicted = kf.predict();

const img = document.querySelector('#bikes');// eslint-disable-line no-undef

// Create all the elements of the prediction or correction phase
const delay = 200;

let promise = Promise.resolve();
let previousCorrected = null;

const delayPromise = delay => new Promise(resolve => {
	setTimeout(resolve, delay);
});

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

},{"../shared/views/create-element":6,"../shared/views/create-group-boxes":7,"./kf-options.js":1,"./observations.json":3}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vL2JvdW5jaW5nLWJhbGwva2Ytb3B0aW9ucy5qcyIsImRlbW8vYm91bmNpbmctYmFsbC9vYnNlcnZhdGlvbi1jb3ZhcmlhbmNlLmpzb24iLCJkZW1vL2JvdW5jaW5nLWJhbGwvb2JzZXJ2YXRpb25zLmpzb24iLCJkZW1vL3NoYXJlZC92aWV3cy9jcmVhdGUtYXJyb3cuanMiLCJkZW1vL3NoYXJlZC92aWV3cy9jcmVhdGUtY3VzdG9tLWRhc2hlZC1saW5lLmpzIiwiZGVtby9zaGFyZWQvdmlld3MvY3JlYXRlLWVsZW1lbnQuanMiLCJkZW1vL3NoYXJlZC92aWV3cy9jcmVhdGUtZ3JvdXAtYm94ZXMuanMiLCJkZW1vL3NoYXJlZC92aWV3cy9jcmVhdGUtcG9pbnQuanMiLCJkZW1vL2JvdW5jaW5nLWJhbGwvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekVBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IG9ic2VydmF0aW9uQ292YXJpYW5jZSA9IHJlcXVpcmUoJy4vb2JzZXJ2YXRpb24tY292YXJpYW5jZS5qc29uJyk7XG5cbmNvbnN0IHBvc1ZhciA9IDEwMDtcbmNvbnN0IHRpbWVTdGVwID0gMC4yO1xuXG5jb25zdCBmbG9vciA9IDQ0MjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdG9ic2VydmF0aW9uOiB7XG5cdFx0ZGltZW5zaW9uOiAyLFxuXHRcdHN0YXRlUHJvamVjdGlvbjogW1xuXHRcdFx0WzEsIDAsIDAsIDAsIDBdLFxuXHRcdFx0WzAsIDEsIDAsIDAsIDBdXG5cdFx0XSxcblx0XHQvLyBDb3ZhcmlhbmNlIGdlbmVyYXRlZCB0aGFua3MgdG8gZ2V0Q292YXJpYW5jZVxuXHRcdGNvdmFyaWFuY2U6IG9ic2VydmF0aW9uQ292YXJpYW5jZVxuXHRcdC8vIENvdmFyaWFuY2U6IFtwb3NWYXIsIHBvc1ZhciwgcG9zVmFyLCBwb3NWYXJdLFxuXG5cdH0sXG5cblx0ZHluYW1pYzoge1xuXHRcdGluaXQ6IHtcblx0XHRcdG1lYW46IFtbOTQzXSwgWzM4NV0sIFswXSwgWzBdLCBbMF1dLFxuXG5cdFx0XHRjb3ZhcmlhbmNlOiBbXG5cdFx0XHRcdFtodWdlLCAwLCAwLCAwLCAwXSxcblx0XHRcdFx0WzAsIGh1Z2UsIDAsIDAsIDBdLFxuXHRcdFx0XHRbMCwgMCwgaHVnZSwgMCwgMF0sXG5cdFx0XHRcdFswLCAwLCAwLCBodWdlLCAwXSxcblx0XHRcdFx0WzAsIDAsIDAsIDAsIGh1Z2VdLFxuXHRcdFx0XVxuXHRcdH0sXG5cblx0XHRjb25zdGFudCh7cHJldmlvdXNDb3JyZWN0ZWR9KSB7XG5cdFx0XHRjb25zdCBub3JtYWxZID0gcHJldmlvdXNDb3JyZWN0ZWQubWVhblsxXVswXSArIHByZXZpb3VzQ29ycmVjdGVkLm1lYW5bM11bMF0gKiB0aW1lU3RlcDtcblxuXHRcdFx0bGV0IGNvbnRyb2xZID0gMDtcblxuXHRcdFx0aWYgKG5vcm1hbFkgPiBmbG9vcikge1xuXHRcdFx0XHRjb250cm9sWSA9IDIgKiAoZmxvb3IgLSBub3JtYWxZKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBbMCwgY29udHJvbFksIDAsIDAsIDAsIDBdO1xuXHRcdH0sXG5cblx0XHR0cmFuc2l0aW9uKHtwcmV2aW91c0NvcnJlY3RlZH0pIHtcblx0XHRcdGNvbnN0IG5vcm1hbFkgPSBwcmV2aW91c0NvcnJlY3RlZC5tZWFuWzFdWzBdICsgcHJldmlvdXNDb3JyZWN0ZWQubWVhblszXVswXSAqIHRpbWVTdGVwO1xuXHRcdFx0bGV0IHZZID0gMTtcblxuXHRcdFx0aWYgKG5vcm1hbFkgPiBmbG9vcikge1xuXHRcdFx0XHR2WSA9IC0xO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHRbMSwgMCwgdGltZVN0ZXAsIDAsIDBdLFxuXHRcdFx0XHRbMCwgMSwgMCwgdGltZVN0ZXAsIDBdLFxuXHRcdFx0XHRbMCwgMCwgMSwgMCwgMF0sXG5cdFx0XHRcdFswLCAwLCAwLCB2WSwgdGltZVN0ZXBdLFxuXHRcdFx0XHRbMCwgMCwgMCwgMCwgMV1cblx0XHRcdF07XG5cdFx0fSxcblxuXHRcdGRpbWVuc2lvbjogNSxcblxuXHRcdGNvdmFyaWFuY2U6IFtcblx0XHRcdHBvc1Zhcixcblx0XHRcdHBvc1Zhcixcblx0XHRcdHBvc1ZhciAqIHRpbWVTdGVwICogdGltZVN0ZXAsXG5cdFx0XHRwb3NWYXIgKiB0aW1lU3RlcCAqIHRpbWVTdGVwLFxuXHRcdFx0cG9zVmFyICogKHRpbWVTdGVwICoqIDQpLFxuXHRcdFx0cG9zVmFyICogKHRpbWVTdGVwICoqIDQpXG5cdFx0XVxuXHR9XG59O1xuIiwibW9kdWxlLmV4cG9ydHM9W1szNC4zMTQyODU3MTQyODU3MiwtOC4xMTQyODU3MTQyODU3MTQsLTkuMTg1NzE0Mjg1NzE0Mjg1LDMuMDQyODU3MTQyODU3MTQyN10sWy04LjExNDI4NTcxNDI4NTcxNCwzOS4wODU3MTQyODU3MTQyOSwxLjE4NTcxNDI4NTcxNDI4NTcsLTUuNTI4NTcxNDI4NTcxNDI4NV0sWy05LjE4NTcxNDI4NTcxNDI4NSwxLjE4NTcxNDI4NTcxNDI4NTcsMzQuNjI4NTcxNDI4NTcxNDI2LDAuNzg1NzE0Mjg1NzE0Mjg1N10sWzMuMDQyODU3MTQyODU3MTQyNywtNS41Mjg1NzE0Mjg1NzE0Mjg1LDAuNzg1NzE0Mjg1NzE0Mjg1NywzOS44NTcxNDI4NTcxNDI4NTRdXSIsIm1vZHVsZS5leHBvcnRzPXtcblx0XCJncm91bmRcIjoge1xuXHRcdHk6IDQ0MlxuXHR9LFxuXHRcIm9ic2VydmF0aW9uc1wiOiBbXG5cdFx0W1xuXHRcdFx0MTUsXG5cdFx0XHQ0MFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MzksXG5cdFx0XHQ3MFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NjIsXG5cdFx0XHQxMDZcblx0XHRdLFxuXHRcdFtcblx0XHRcdDgzLFxuXHRcdFx0MTQ4XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQxMDUsXG5cdFx0XHQxOTdcblx0XHRdLFxuXHRcdFtcblx0XHRcdDEyNixcblx0XHRcdDI1M1xuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MTQ1LFxuXHRcdFx0MzE1XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQxNjUsXG5cdFx0XHQzODNcblx0XHRdLFxuXHRcdFtcblx0XHRcdDE4Myxcblx0XHRcdDQyM1xuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MjAyLFxuXHRcdFx0MzY0XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQyMTksXG5cdFx0XHQzMTVcblx0XHRdLFxuXHRcdFtcblx0XHRcdDIzNixcblx0XHRcdDI3NFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MjUzLFxuXHRcdFx0MjQxXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQyNzAsXG5cdFx0XHQyMTZcblx0XHRdLFxuXHRcdFtcblx0XHRcdDI4Nixcblx0XHRcdDE5OFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MzAyLFxuXHRcdFx0MTg3XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQzMTgsXG5cdFx0XHQxODRcblx0XHRdLFxuXHRcdFtcblx0XHRcdDMzNCxcblx0XHRcdDE4N1xuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MzY0LFxuXHRcdFx0MjE0XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQzOTMsXG5cdFx0XHQyNjVcblx0XHRdLFxuXHRcdFtcblx0XHRcdDQwNixcblx0XHRcdDMwMVxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NDE5LFxuXHRcdFx0MzQzXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ0MzIsXG5cdFx0XHQzOTFcblx0XHRdLFxuXHRcdFtcblx0XHRcdDQ0Myxcblx0XHRcdDQzNFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NDU2LFxuXHRcdFx0MzkwXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ0NjksXG5cdFx0XHQzNTRcblx0XHRdLFxuXHRcdFtcblx0XHRcdDQ4MSxcblx0XHRcdDMyNlxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NDk0LFxuXHRcdFx0MzA1XG5cdFx0XVxuXHRdXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe2NsYXNzTmFtZSwgdGFnID0gJ2RpdicsIGJib3gsIHBhcmVudCwgcm90YXRpb25Db2VmZmljaWVudCwgc2NhbGUsIGNvbG9yfSkge1xuXHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpOy8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblx0ZWxlbWVudC5pZCA9ICdhcnJvdyc7XG5cdGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXHRlbGVtZW50LnN0eWxlLnRvcCA9IE1hdGgucm91bmQoYmJveFsxXSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKGJib3hbMF0pICsgJ3B4Jztcblx0aWYgKHJvdGF0aW9uQ29lZmZpY2llbnQpIHtcblx0XHRlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHtyb3RhdGlvbkNvZWZmaWNpZW50fWRlZylgO1xuXHRcdGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gJy01cHggMTJweCc7XG5cdH1cblxuXHRlbGVtZW50LnN0eWxlLnNjYWxlID0gc2NhbGU7XG5cdGVsZW1lbnQuc3R5bGUuY29sb3IgPSBjb2xvcjtcblx0cGFyZW50LmFwcGVuZChlbGVtZW50KTtcblx0cmV0dXJuIGVsZW1lbnQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe1xuXHRjbGFzc05hbWUsXG5cdHRhZyA9ICdkaXYnLFxuXHRiYm94LFxuXHRwYXJlbnQsXG5cdGNvbG9yLFxuXHRwZXJjZW50YWdlLFxuXHRwb3NpdGlvbiA9ICd2ZXJ0aWNhbCdcbn0pIHtcblx0Ly8gQmJveCBjb250YWlucyAzIGVsZW1lbnRzOiBsZWZ0LCB0b3AgYW5kIGJvdHRvbSBvZiB0aGUgZGFzaGVkIGxpbmUgb3IgdG9wLCBsZWZ0IGFuZCByaWdodFxuXHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpOy8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblx0Ly8gSWYgKGNvbG9yKSB7XG5cdC8vIFx0ZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3Jcblx0Ly8gfVxuXHRlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcblx0aWYgKHBvc2l0aW9uID09PSAndmVydGljYWwnKSB7XG5cdFx0ZWxlbWVudC5zdHlsZS53aWR0aCA9IDEgKyAncHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gTWF0aC5hYnMoYmJveFsxXSAtIGJib3hbMl0pICsgJ3B4Jztcblx0XHRlbGVtZW50LnN0eWxlLnRvcCA9IGJib3hbMV0gKyAncHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUubGVmdCA9IGJib3hbMF0gKyAncHgnO1xuXHR9XG5cblx0aWYgKHBvc2l0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcblx0XHRlbGVtZW50LnN0eWxlLmhlaWdodCA9IDEgKyAncHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUud2lkdGggPSBNYXRoLmFicyhiYm94WzFdIC0gYmJveFsyXSkgKyAncHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUubGVmdCA9IGJib3hbMV0gKyAncHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUudG9wID0gYmJveFswXSArICdweCc7XG5cdH1cblxuXHQvLyBFbC5zdHlsZS5vcGFjaXR5ID0gMS1wZXJjZW50YWdlXG5cdGNvbnN0IHVybFN0cmluZyA9ICdkYXRhOmltYWdlL3N2Zyt4bWwsJTNjc3ZnICcgK1xuXHRcdCd3aWR0aD1cXCcxMDAlMjVcXCcgJyArXG5cdFx0J2hlaWdodD1cXCcxMDAlMjVcXCcgJyArXG5cdFx0J3htbG5zPVxcJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFwnJTNlJTNjcmVjdCAnICtcblx0XHQnd2lkdGg9XFwnMTAwJTI1XFwnICcgK1xuXHRcdCdoZWlnaHQ9XFwnMTAwJTI1XFwnICcgK1xuXHRcdCdmaWxsPVxcJ25vbmVcXCcgJyArXG5cdFx0YHN0cm9rZT0nJHtjb2xvcn0nIGAgK1xuXHRcdCdzdHJva2Utd2lkdGg9XFwnNFxcJyAnICtcblx0XHRgc3Ryb2tlLWRhc2hhcnJheT0nMTAlMmMke01hdGguZmxvb3IocGVyY2VudGFnZSAqIDEwMCl9JyBgICtcblx0XHQnc3Ryb2tlLWRhc2hvZmZzZXQ9XFwnMFxcJyAnICtcblx0XHQnc3Ryb2tlLWxpbmVjYXA9XFwncm91bmRcXCcvJTNlJTNjL3N2ZyUzZSc7XG5cblx0Y29uc3QgYmFja2dyb3VuZEltYWdlMSA9IGB1cmwoXCIke3VybFN0cmluZ31cIilgO1xuXG5cdC8vIENvbnN0IGJhY2tncm91bmRJbWFnZTIgPSBcInVybChcXFwiZGF0YTppbWFnZS9zdmcreG1sLCUzY3N2ZyB3aWR0aD0nMTAwJTI1JyBoZWlnaHQ9JzEwMCUyNScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyUzZSUzY3JlY3Qgd2lkdGg9JzEwMCUyNScgaGVpZ2h0PScxMDAlMjUnIGZpbGw9J25vbmUnIHN0cm9rZT0nJTIzMzMzJyBzdHJva2Utd2lkdGg9JzQnIHN0cm9rZS1kYXNoYXJyYXk9JzEwJTJjMjAnIHN0cm9rZS1kYXNob2Zmc2V0PScwJyBzdHJva2UtbGluZWNhcD0nc3F1YXJlJy8lM2UlM2Mvc3ZnJTNlXFxcIilcIlxuXHQvLyBjb25zb2xlLmxvZyhiYWNrZ3JvdW5kSW1hZ2UxLCBiYWNrZ3JvdW5kSW1hZ2UyLCBiYWNrZ3JvdW5kSW1hZ2UxPT09YmFja2dyb3VuZEltYWdlMilcblx0ZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBiYWNrZ3JvdW5kSW1hZ2UxO1xuXHRwYXJlbnQuYXBwZW5kKGVsZW1lbnQpO1xuXHRyZXR1cm4gZWxlbWVudDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7aWQsIGNsYXNzTmFtZSwgdGFnID0gJ2RpdicsIGJib3gsIHBhcmVudCwgcm90YXRpb25Db2VmZmljaWVudH0pIHtcblx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTsvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cdGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXHRlbGVtZW50LmlkID0gaWQ7XG5cdC8vIElmIChjb2xvciAmJiBsaW5lU3R5bGUpIHtcblx0Ly8gXHRlbC5zdHlsZS5ib3JkZXIgPSBgMXB4ICR7bGluZVN0eWxlfSAke2NvbG9yfWBcblx0Ly8gfVxuXHRlbGVtZW50LnN0eWxlLndpZHRoID0gTWF0aC5yb3VuZChiYm94WzJdKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gTWF0aC5yb3VuZChiYm94WzNdKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUudG9wID0gTWF0aC5yb3VuZChiYm94WzFdIC0gKGJib3hbM10gLyAyKSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKGJib3hbMF0gLSAoYmJveFsyXSAvIDIpKSArICdweCc7XG5cdGlmIChyb3RhdGlvbkNvZWZmaWNpZW50KSB7XG5cdFx0ZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7cm90YXRpb25Db2VmZmljaWVudH1kZWcpYDtcblx0fVxuXG5cdHBhcmVudC5hcHBlbmQoZWxlbWVudCk7XG5cdHJldHVybiBlbGVtZW50O1xufTtcbiIsImNvbnN0IGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuL2NyZWF0ZS1lbGVtZW50Jyk7XG5jb25zdCBjcmVhdGVQb2ludCA9IHJlcXVpcmUoJy4vY3JlYXRlLXBvaW50Jyk7XG5jb25zdCBjcmVhdGVBcnJvdyA9IHJlcXVpcmUoJy4vY3JlYXRlLWFycm93Jyk7XG5jb25zdCBjcmVhdGVDdXN0b21EYXNoZWRMaW5lID0gcmVxdWlyZSgnLi9jcmVhdGUtY3VzdG9tLWRhc2hlZC1saW5lJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHttZWFuLCBjb3ZhcmlhbmNlLCBjb2xvciwgcGFyZW50LCBjbGFzc05hbWUsIHRhZyA9ICdkaXYnfSkge1xuXHRjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXHRjb250YWluZXIuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXHRjb25zdCBjZW50ZXIgPSBbbWVhblswXVswXSArIChtZWFuWzJdWzBdIC8gMiksIG1lYW5bMV1bMF0gKyAobWVhblszXVswXSAvIDIpXTtcblx0Y3JlYXRlRWxlbWVudCh7XG5cdFx0Y2xhc3NOYW1lOiAnYm94Jyxcblx0XHRiYm94OiBbY2VudGVyWzBdLCBjZW50ZXJbMV0sIG1lYW5bMl1bMF0sIG1lYW5bM11bMF1dLFxuXHRcdHBhcmVudDogY29udGFpbmVyLFxuXHRcdGNvbG9yLFxuXHRcdGxpbmVTdHlsZTogJ3NvbGlkJ1xuXHR9KTtcblx0Y3JlYXRlRWxlbWVudCh7XG5cdFx0Y2xhc3NOYW1lOiAnYm94IHN0ZERldicsXG5cdFx0YmJveDogW1xuXHRcdFx0Y2VudGVyWzBdLFxuXHRcdFx0Y2VudGVyWzFdLFxuXHRcdFx0bWVhblsyXVswXSArICgyICogMyAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzJdWzJdKSksXG5cdFx0XHRtZWFuWzNdWzBdICsgKDIgKiAzICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbM11bM10pKVxuXHRcdF0sXG5cdFx0cGFyZW50OiBjb250YWluZXIsXG5cdFx0Y29sb3Jcblx0fSk7XG5cdGNyZWF0ZVBvaW50KHtcblx0XHRiYm94OiBbY2VudGVyWzBdLCBjZW50ZXJbMV0sIDIsIDJdLFxuXHRcdHBhcmVudDogY29udGFpbmVyLFxuXHRcdGNvbG9yXG5cdH0pO1xuXHRjb25zdCBjb3JyZWxhdGlvblhZID0gY292YXJpYW5jZVswXVsxXSAvIChNYXRoLnNxcnQoY292YXJpYW5jZVswXVswXSkgKiBNYXRoLnNxcnQoY292YXJpYW5jZVsxXVsxXSkpO1xuXHRjcmVhdGVFbGVtZW50KHtcblx0XHRjbGFzc05hbWU6ICdlbGxpcHNlIHN0ZERldicsXG5cdFx0YmJveDogW1xuXHRcdFx0Y2VudGVyWzBdLFxuXHRcdFx0Y2VudGVyWzFdLFxuXHRcdFx0MiAqIDMgKiBNYXRoLnNxcnQoY292YXJpYW5jZVswXVswXSksXG5cdFx0XHQyICogMyAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzFdWzFdKVxuXHRcdF0sXG5cdFx0cGFyZW50OiBjb250YWluZXIsXG5cdFx0cm90YXRpb25Db2VmZmljaWVudDogY29ycmVsYXRpb25YWSxcblx0XHRjb2xvclxuXHR9KTtcblx0Y29uc3QgY29ycmVsYXRpb25YVyA9IGNvdmFyaWFuY2VbMF1bMl0gLyAoTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMF1bMF0pICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMl1bMl0pKTtcblx0Y3JlYXRlQ3VzdG9tRGFzaGVkTGluZSh7XG5cdFx0Y2xhc3NOYW1lOiAnZGFzaGVkTGluZScsXG5cdFx0YmJveDogW1xuXHRcdFx0Y2VudGVyWzBdLFxuXHRcdFx0Y2VudGVyWzFdICsgKDMgKiBNYXRoLnNxcnQoY292YXJpYW5jZVsxXVsxXSkpLFxuXHRcdFx0Y2VudGVyWzFdICsgKG1lYW5bM11bMF0gLyAyKSArICgzICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbM11bM10pKVxuXHRcdF0sXG5cdFx0cGFyZW50OiBjb250YWluZXIsXG5cdFx0cGVyY2VudGFnZTogTWF0aC5hYnMoY29ycmVsYXRpb25YVyksXG5cdFx0Y29sb3Jcblx0fSk7XG5cdGNvbnN0IGNvcnJlbGF0aW9uWUggPSBjb3ZhcmlhbmNlWzFdWzNdIC8gKE1hdGguc3FydChjb3ZhcmlhbmNlWzFdWzFdKSAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzNdWzNdKSk7XG5cdGNyZWF0ZUN1c3RvbURhc2hlZExpbmUoe1xuXHRcdGNsYXNzTmFtZTogJ2Rhc2hlZExpbmUnLFxuXHRcdGJib3g6IFtcblx0XHRcdGNlbnRlclsxXSxcblx0XHRcdGNlbnRlclswXSArICgzICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMF1bMF0pKSxcblx0XHRcdGNlbnRlclswXSArIChtZWFuWzJdWzBdIC8gMikgKyAoMyAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzJdWzJdKSlcblx0XHRdLFxuXHRcdHBhcmVudDogY29udGFpbmVyLFxuXHRcdHBlcmNlbnRhZ2U6IE1hdGguYWJzKGNvcnJlbGF0aW9uWUgpLFxuXHRcdHBvc2l0aW9uOiAnaG9yaXpvbnRhbCcsXG5cdFx0Y29sb3Jcblx0fSk7XG5cdGNvbnN0IGFycm93Um90YXRpb24gPSAoLTEgKiBNYXRoLmF0YW4obWVhbls0XVswXSAvIG1lYW5bNV1bMF0pICogMTgwIC8gTWF0aC5QSSkgLSA0NTtcblx0Y29uc3QgYXJyb3dTY2FsZSA9IE1hdGguc3FydCgobWVhbls0XVswXSAqKiAyKSArIChtZWFuWzVdWzBdICoqIDIpKTtcblx0Y3JlYXRlQXJyb3coe1xuXHRcdGNsYXNzTmFtZTogJ2Fycm93Jyxcblx0XHRiYm94OiBbXG5cdFx0XHRjZW50ZXJbMF0gKyA2LFxuXHRcdFx0Y2VudGVyWzFdIC0gOVxuXHRcdF0sXG5cdFx0cGFyZW50OiBjb250YWluZXIsXG5cdFx0cm90YXRpb25Db2VmZmljaWVudDogYXJyb3dSb3RhdGlvbixcblx0XHRzY2FsZTogYXJyb3dTY2FsZSxcblx0XHRjb2xvclxuXHR9KTtcblx0cGFyZW50LmFwcGVuZChjb250YWluZXIpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHtjbGFzc05hbWUgPSAncG9pbnQnLCB0YWcgPSAnZGl2JywgYmJveCwgcGFyZW50fSkge1xuXHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpOy8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblx0ZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG5cdC8vIElmIChjb2xvcikge1xuXHQvLyBcdGVsLnN0eWxlLmJvcmRlciA9IGAycHggc29saWQgJHtjb2xvcn1gLFxuXHQvLyBcdGVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGAke2NvbG9yfWBcblx0Ly8gfVxuXHRlbGVtZW50LnN0eWxlLndpZHRoID0gTWF0aC5yb3VuZChiYm94WzJdKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gTWF0aC5yb3VuZChiYm94WzNdKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUudG9wID0gTWF0aC5yb3VuZChiYm94WzFdIC0gKGJib3hbM10gLyAyKSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKGJib3hbMF0gLSAoYmJveFsyXSAvIDIpKSArICdweCc7XG5cdHBhcmVudC5hcHBlbmQoZWxlbWVudCk7XG5cdHJldHVybiBlbGVtZW50O1xufTtcbiIsImNvbnN0IHtLYWxtYW5GaWx0ZXJ9ID0ga2FsbWFuRmlsdGVyOy8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuY29uc3Qgbm9pc3lPYnNlcnZhdGlvbnMgPSByZXF1aXJlKCcuL29ic2VydmF0aW9ucy5qc29uJykub2JzZXJ2YXRpb25zO1xuY29uc3Qga2ZPcHRpb25zID0gcmVxdWlyZSgnLi9rZi1vcHRpb25zLmpzJyk7XG5jb25zdCBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vc2hhcmVkL3ZpZXdzL2NyZWF0ZS1lbGVtZW50Jyk7XG5jb25zdCBjcmVhdGVHcm91cEJveGVzID0gcmVxdWlyZSgnLi4vc2hhcmVkL3ZpZXdzL2NyZWF0ZS1ncm91cC1ib3hlcycpO1xuXG5jb25zdCBrZiA9IG5ldyBLYWxtYW5GaWx0ZXIoa2ZPcHRpb25zKTtcbmxldCBwcmVkaWN0ZWQgPSBrZi5wcmVkaWN0KCk7XG5cbmNvbnN0IGltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiaWtlcycpOy8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuLy8gQ3JlYXRlIGFsbCB0aGUgZWxlbWVudHMgb2YgdGhlIHByZWRpY3Rpb24gb3IgY29ycmVjdGlvbiBwaGFzZVxuY29uc3QgZGVsYXkgPSAyMDA7XG5cbmxldCBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG5sZXQgcHJldmlvdXNDb3JyZWN0ZWQgPSBudWxsO1xuXG5jb25zdCBkZWxheVByb21pc2UgPSBkZWxheSA9PiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcblx0c2V0VGltZW91dChyZXNvbHZlLCBkZWxheSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdHJ1bigpIHtcblx0XHRub2lzeU9ic2VydmF0aW9ucy5mb3JFYWNoKChib3gsIGluZGV4KSA9PiB7XG5cdFx0XHRwcm9taXNlID0gcHJvbWlzZVxuXHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0cHJlZGljdGVkID0ga2YucHJlZGljdCh7cHJldmlvdXNDb3JyZWN0ZWR9KTtcblx0XHRcdFx0XHRjb25zdCB7bWVhbiwgY292YXJpYW5jZX0gPSBwcmVkaWN0ZWQ7XG5cblx0XHRcdFx0XHRjcmVhdGVHcm91cEJveGVzKHttZWFuLCBjb3ZhcmlhbmNlLCBwYXJlbnQ6IGltZywgY2xhc3NOYW1lOiAncHJlZGljdGVkJywgY29sb3I6ICdibHVlJ30pO1xuXG5cdFx0XHRcdFx0cmV0dXJuIGRlbGF5UHJvbWlzZShkZWxheSk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKChiID0+IHtcblx0XHRcdFx0XHRjcmVhdGVFbGVtZW50KHtcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ29ic2VydmF0aW9uJyxcblx0XHRcdFx0XHRcdGJib3g6IFtcblx0XHRcdFx0XHRcdFx0YlswXSArIChiWzJdIC8gMiksXG5cdFx0XHRcdFx0XHRcdGJbMV0gKyAoYlszXSAvIDIpLFxuXHRcdFx0XHRcdFx0XHRiWzJdLFxuXHRcdFx0XHRcdFx0XHRiWzNdXG5cdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdFx0cGFyZW50OiBpbWcsXG5cdFx0XHRcdFx0XHRjb2xvcjogJ3doaXRlJyxcblx0XHRcdFx0XHRcdGxpbmVTdHlsZTogJ3NvbGlkJ1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0cmV0dXJuIGRlbGF5UHJvbWlzZShkZWxheSk7XG5cdFx0XHRcdH0pLmJpbmQobnVsbCwgYm94LCBpbmRleCkpXG5cdFx0XHRcdC50aGVuKChiID0+IHtcblx0XHRcdFx0XHRwcmV2aW91c0NvcnJlY3RlZCA9IGtmLmNvcnJlY3Qoe3ByZWRpY3RlZCwgb2JzZXJ2YXRpb246IGJ9KTtcblx0XHRcdFx0XHRjb25zdCB7bWVhbiwgY292YXJpYW5jZX0gPSBwcmV2aW91c0NvcnJlY3RlZDtcblxuXHRcdFx0XHRcdGNyZWF0ZUdyb3VwQm94ZXMoe21lYW4sIGNvdmFyaWFuY2UsIHBhcmVudDogaW1nLCBjbGFzc05hbWU6ICdjb3JyZWN0ZWQnLCBjb2xvcjogJ3JlZCd9KTtcblxuXHRcdFx0XHRcdHJldHVybiBkZWxheVByb21pc2UoZGVsYXkpO1xuXHRcdFx0XHR9KS5iaW5kKG51bGwsIGJveCwgaW5kZXgpKTtcblx0XHR9KTtcblx0fVxufTtcbiJdfQ==
