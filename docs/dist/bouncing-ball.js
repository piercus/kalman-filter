require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

const posVar = 10;
const timeStep = 1;
const huge = 1000;
const floor = 438;

module.exports = {
	observation: {
		dimension: 2,
		stateProjection: [
			[1, 0, 0, 0, 0],
			[0, 1, 0, 0, 0],
		],
		// Covariance generated thanks to getCovariance
		covariance: [posVar / 5, posVar / 5],
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
			],
		},

		constant({previousCorrected}) {
			const normalY = previousCorrected.mean[1][0] + (previousCorrected.mean[3][0] * timeStep);

			let controlY = 0;

			if (normalY > floor) {
				controlY = 2 * (floor - normalY);
			}

			return [[0], [controlY], [0], [0], [0]];
		},

		transition({previousCorrected}) {
			const normalY = previousCorrected.mean[1][0] + (previousCorrected.mean[3][0] * timeStep);
			let vY = 1;

			if (normalY > floor) {
				vY = -1;
			}

			return [
				[1, 0, timeStep, 0, 0],
				[0, 1, 0, timeStep, 0],
				[0, 0, 1, 0, 0],
				[0, 0, 0, vY, timeStep],
				[0, 0, 0, 0, 1],
			];
		},

		dimension: 5,

		covariance: [
			posVar,
			posVar,
			posVar * timeStep * timeStep,
			posVar * timeStep * timeStep,
			posVar * (timeStep ** 4),
		],
	},
};

},{}],2:[function(require,module,exports){
module.exports={
	"ground": {
		"y": 442
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
			350,
			197
		],
		[
			364,
			214
		],
		[
			378,
			236
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
		],
		[
			506,
			292
		],
		[
			519,
			285
		],
		[
			531,
			285
		],
		[
			544,
			291
		],
		[
			556,
			305
		],
		[
			568,
			323
		],
		[
			580,
			350
		],
		[
			591,
			380
		],
		[
			602,
			419
		],
		[
			613,
			420
		],
		[
			624,
			390
		],
		[
			613,
			420
		]
	]
}
},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
const createElement = require('./create-element');
const createPoint = require('./create-point');
const createArrow = require('./create-arrow');

module.exports = function ({mean, covariance, color, parent, className, tag = 'div'}) {
	const container = document.createElement(tag); // eslint-disable-line no-undef

	container.className = className;
	const center = [mean[0][0], mean[1][0]];

	createPoint({
		bbox: [center[0], center[1], 2, 2],
		parent: container,
		color,
	});

	const correlationXY = covariance[0][1] / (Math.sqrt(covariance[0][0]) * Math.sqrt(covariance[1][1]));
	createElement({
		className: 'ellipse stdDev',
		bbox: [
			center[0],
			center[1],
			2 * 3 * Math.sqrt(covariance[0][0]),
			2 * 3 * Math.sqrt(covariance[1][1]),
		],
		parent: container,
		rotationCoefficient: correlationXY,
		color,
	});
	const arrowRotation = (-1 * Math.atan(mean[2][0] / mean[3][0]) * 180 / Math.PI) - 45;
	const arrowScale = Math.hypot((mean[2][0]), (mean[3][0]));
	createArrow({
		className: 'arrow',
		bbox: [
			center[0] + 6,
			center[1] - 9,
		],
		parent: container,
		rotationCoefficient: arrowRotation,
		scale: arrowScale,
		color,
	});
	parent.append(container);
};

},{"./create-arrow":3,"./create-element":4,"./create-point":6}],6:[function(require,module,exports){
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

},{}],"bouncing-ball":[function(require,module,exports){
/**
 * @typedef {typeof import('../../index.d.ts')} kalmanFilter
 */
const { KalmanFilter } = /** @type {kalmanFilter} */ (kalmanFilter);// eslint-disable-line no-undef
const createElement = require('../shared/views/create-element');
const createGroupPoint = require('../shared/views/create-group-point');
const kfOptions = require('./kf-options.js');
const noisyObservations = require('./observations.json').observations;
const kf = new KalmanFilter(kfOptions);
let predicted = kf.predict();

const img = document.querySelector('#bouncing-ball');// eslint-disable-line no-undef
if (!img)
	throw Error('#bouncing-ball div is missing from the DOM')

// Create all the elements of the prediction or correction phase
const delay = 200;

let promise = Promise.resolve();
let previousCorrected = null;

const delayPromise = delay => new Promise(resolve => {
	setTimeout(resolve, delay);
});

module.exports = {
	run() {
		for (const [index, box] of noisyObservations.entries()) {
			promise = promise
				.then(() => {
					predicted = kf.predict({previousCorrected});
					const {mean, covariance} = predicted;

					createGroupPoint({
mean, covariance, parent: img, className: 'predicted', color: 'blue',
});

					return delayPromise(delay);
				})
				.then((b => {
					console.log({b});
					const w = 10;
					const h = 10;
					createElement({
						className: 'observation',
						bbox: [
							b[0],
							b[1],
							w,
							h,
						],
						parent: img,
						color: 'white',
						lineStyle: 'solid',
					});

					return delayPromise(delay);
				}).bind(null, box, index))
				.then((b => {
					previousCorrected = kf.correct({predicted, observation: b});
					const {mean, covariance} = previousCorrected;

					createGroupPoint({
mean, covariance, parent: img, className: 'corrected', color: 'red',
});

					return delayPromise(delay);
				}).bind(null, box, index));
		}
	},
};

},{"../shared/views/create-element":4,"../shared/views/create-group-point":5,"./kf-options.js":1,"./observations.json":2}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy8ucG5wbS9icm93c2VyLXBhY2tANi4xLjAvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImRlbW8vYm91bmNpbmctYmFsbC9rZi1vcHRpb25zLmpzIiwiZGVtby9ib3VuY2luZy1iYWxsL29ic2VydmF0aW9ucy5qc29uIiwiZGVtby9zaGFyZWQvdmlld3MvY3JlYXRlLWFycm93LmpzIiwiZGVtby9zaGFyZWQvdmlld3MvY3JlYXRlLWVsZW1lbnQuanMiLCJkZW1vL3NoYXJlZC92aWV3cy9jcmVhdGUtZ3JvdXAtcG9pbnQuanMiLCJkZW1vL3NoYXJlZC92aWV3cy9jcmVhdGUtcG9pbnQuanMiLCJkZW1vL2JvdW5jaW5nLWJhbGwvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxuY29uc3QgcG9zVmFyID0gMTA7XG5jb25zdCB0aW1lU3RlcCA9IDE7XG5jb25zdCBodWdlID0gMTAwMDtcbmNvbnN0IGZsb29yID0gNDM4O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0b2JzZXJ2YXRpb246IHtcblx0XHRkaW1lbnNpb246IDIsXG5cdFx0c3RhdGVQcm9qZWN0aW9uOiBbXG5cdFx0XHRbMSwgMCwgMCwgMCwgMF0sXG5cdFx0XHRbMCwgMSwgMCwgMCwgMF0sXG5cdFx0XSxcblx0XHQvLyBDb3ZhcmlhbmNlIGdlbmVyYXRlZCB0aGFua3MgdG8gZ2V0Q292YXJpYW5jZVxuXHRcdGNvdmFyaWFuY2U6IFtwb3NWYXIgLyA1LCBwb3NWYXIgLyA1XSxcblx0XHQvLyBDb3ZhcmlhbmNlOiBbcG9zVmFyLCBwb3NWYXIsIHBvc1ZhciwgcG9zVmFyXSxcblxuXHR9LFxuXG5cdGR5bmFtaWM6IHtcblx0XHRpbml0OiB7XG5cdFx0XHRtZWFuOiBbWzk0M10sIFszODVdLCBbMF0sIFswXSwgWzBdXSxcblxuXHRcdFx0Y292YXJpYW5jZTogW1xuXHRcdFx0XHRbaHVnZSwgMCwgMCwgMCwgMF0sXG5cdFx0XHRcdFswLCBodWdlLCAwLCAwLCAwXSxcblx0XHRcdFx0WzAsIDAsIGh1Z2UsIDAsIDBdLFxuXHRcdFx0XHRbMCwgMCwgMCwgaHVnZSwgMF0sXG5cdFx0XHRcdFswLCAwLCAwLCAwLCBodWdlXSxcblx0XHRcdF0sXG5cdFx0fSxcblxuXHRcdGNvbnN0YW50KHtwcmV2aW91c0NvcnJlY3RlZH0pIHtcblx0XHRcdGNvbnN0IG5vcm1hbFkgPSBwcmV2aW91c0NvcnJlY3RlZC5tZWFuWzFdWzBdICsgKHByZXZpb3VzQ29ycmVjdGVkLm1lYW5bM11bMF0gKiB0aW1lU3RlcCk7XG5cblx0XHRcdGxldCBjb250cm9sWSA9IDA7XG5cblx0XHRcdGlmIChub3JtYWxZID4gZmxvb3IpIHtcblx0XHRcdFx0Y29udHJvbFkgPSAyICogKGZsb29yIC0gbm9ybWFsWSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBbWzBdLCBbY29udHJvbFldLCBbMF0sIFswXSwgWzBdXTtcblx0XHR9LFxuXG5cdFx0dHJhbnNpdGlvbih7cHJldmlvdXNDb3JyZWN0ZWR9KSB7XG5cdFx0XHRjb25zdCBub3JtYWxZID0gcHJldmlvdXNDb3JyZWN0ZWQubWVhblsxXVswXSArIChwcmV2aW91c0NvcnJlY3RlZC5tZWFuWzNdWzBdICogdGltZVN0ZXApO1xuXHRcdFx0bGV0IHZZID0gMTtcblxuXHRcdFx0aWYgKG5vcm1hbFkgPiBmbG9vcikge1xuXHRcdFx0XHR2WSA9IC0xO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHRbMSwgMCwgdGltZVN0ZXAsIDAsIDBdLFxuXHRcdFx0XHRbMCwgMSwgMCwgdGltZVN0ZXAsIDBdLFxuXHRcdFx0XHRbMCwgMCwgMSwgMCwgMF0sXG5cdFx0XHRcdFswLCAwLCAwLCB2WSwgdGltZVN0ZXBdLFxuXHRcdFx0XHRbMCwgMCwgMCwgMCwgMV0sXG5cdFx0XHRdO1xuXHRcdH0sXG5cblx0XHRkaW1lbnNpb246IDUsXG5cblx0XHRjb3ZhcmlhbmNlOiBbXG5cdFx0XHRwb3NWYXIsXG5cdFx0XHRwb3NWYXIsXG5cdFx0XHRwb3NWYXIgKiB0aW1lU3RlcCAqIHRpbWVTdGVwLFxuXHRcdFx0cG9zVmFyICogdGltZVN0ZXAgKiB0aW1lU3RlcCxcblx0XHRcdHBvc1ZhciAqICh0aW1lU3RlcCAqKiA0KSxcblx0XHRdLFxuXHR9LFxufTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcblx0XCJncm91bmRcIjoge1xuXHRcdFwieVwiOiA0NDJcblx0fSxcblx0XCJvYnNlcnZhdGlvbnNcIjogW1xuXHRcdFtcblx0XHRcdDE1LFxuXHRcdFx0NDBcblx0XHRdLFxuXHRcdFtcblx0XHRcdDM5LFxuXHRcdFx0NzBcblx0XHRdLFxuXHRcdFtcblx0XHRcdDYyLFxuXHRcdFx0MTA2XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ4Myxcblx0XHRcdDE0OFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MTA1LFxuXHRcdFx0MTk3XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQxMjYsXG5cdFx0XHQyNTNcblx0XHRdLFxuXHRcdFtcblx0XHRcdDE0NSxcblx0XHRcdDMxNVxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MTY1LFxuXHRcdFx0MzgzXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQxODMsXG5cdFx0XHQ0MjNcblx0XHRdLFxuXHRcdFtcblx0XHRcdDIwMixcblx0XHRcdDM2NFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MjE5LFxuXHRcdFx0MzE1XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQyMzYsXG5cdFx0XHQyNzRcblx0XHRdLFxuXHRcdFtcblx0XHRcdDI1Myxcblx0XHRcdDI0MVxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MjcwLFxuXHRcdFx0MjE2XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQyODYsXG5cdFx0XHQxOThcblx0XHRdLFxuXHRcdFtcblx0XHRcdDMwMixcblx0XHRcdDE4N1xuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MzE4LFxuXHRcdFx0MTg0XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQzMzQsXG5cdFx0XHQxODdcblx0XHRdLFxuXHRcdFtcblx0XHRcdDM1MCxcblx0XHRcdDE5N1xuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MzY0LFxuXHRcdFx0MjE0XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQzNzgsXG5cdFx0XHQyMzZcblx0XHRdLFxuXHRcdFtcblx0XHRcdDM5Myxcblx0XHRcdDI2NVxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NDA2LFxuXHRcdFx0MzAxXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ0MTksXG5cdFx0XHQzNDNcblx0XHRdLFxuXHRcdFtcblx0XHRcdDQzMixcblx0XHRcdDM5MVxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NDQzLFxuXHRcdFx0NDM0XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ0NTYsXG5cdFx0XHQzOTBcblx0XHRdLFxuXHRcdFtcblx0XHRcdDQ2OSxcblx0XHRcdDM1NFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NDgxLFxuXHRcdFx0MzI2XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ0OTQsXG5cdFx0XHQzMDVcblx0XHRdLFxuXHRcdFtcblx0XHRcdDUwNixcblx0XHRcdDI5MlxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NTE5LFxuXHRcdFx0Mjg1XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ1MzEsXG5cdFx0XHQyODVcblx0XHRdLFxuXHRcdFtcblx0XHRcdDU0NCxcblx0XHRcdDI5MVxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NTU2LFxuXHRcdFx0MzA1XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ1NjgsXG5cdFx0XHQzMjNcblx0XHRdLFxuXHRcdFtcblx0XHRcdDU4MCxcblx0XHRcdDM1MFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NTkxLFxuXHRcdFx0MzgwXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ2MDIsXG5cdFx0XHQ0MTlcblx0XHRdLFxuXHRcdFtcblx0XHRcdDYxMyxcblx0XHRcdDQyMFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NjI0LFxuXHRcdFx0MzkwXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ2MTMsXG5cdFx0XHQ0MjBcblx0XHRdXG5cdF1cbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7Y2xhc3NOYW1lLCB0YWcgPSAnZGl2JywgYmJveCwgcGFyZW50LCByb3RhdGlvbkNvZWZmaWNpZW50LCBzY2FsZSwgY29sb3J9KSB7XG5cdGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7Ly8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXHRlbGVtZW50LmlkID0gJ2Fycm93Jztcblx0ZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG5cdGVsZW1lbnQuc3R5bGUudG9wID0gTWF0aC5yb3VuZChiYm94WzFdKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUubGVmdCA9IE1hdGgucm91bmQoYmJveFswXSkgKyAncHgnO1xuXHRpZiAocm90YXRpb25Db2VmZmljaWVudCkge1xuXHRcdGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3JvdGF0aW9uQ29lZmZpY2llbnR9ZGVnKWA7XG5cdFx0ZWxlbWVudC5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSAnLTVweCAxMnB4Jztcblx0fVxuXG5cdGVsZW1lbnQuc3R5bGUuc2NhbGUgPSBzY2FsZTtcblx0ZWxlbWVudC5zdHlsZS5jb2xvciA9IGNvbG9yO1xuXHRwYXJlbnQuYXBwZW5kKGVsZW1lbnQpO1xuXHRyZXR1cm4gZWxlbWVudDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7aWQsIGNsYXNzTmFtZSwgdGFnID0gJ2RpdicsIGJib3gsIHBhcmVudCwgcm90YXRpb25Db2VmZmljaWVudH0pIHtcblx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTsvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cdGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXHRlbGVtZW50LmlkID0gaWQ7XG5cdC8vIElmIChjb2xvciAmJiBsaW5lU3R5bGUpIHtcblx0Ly8gXHRlbC5zdHlsZS5ib3JkZXIgPSBgMXB4ICR7bGluZVN0eWxlfSAke2NvbG9yfWBcblx0Ly8gfVxuXHRlbGVtZW50LnN0eWxlLndpZHRoID0gTWF0aC5yb3VuZChiYm94WzJdKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gTWF0aC5yb3VuZChiYm94WzNdKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUudG9wID0gTWF0aC5yb3VuZChiYm94WzFdIC0gKGJib3hbM10gLyAyKSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKGJib3hbMF0gLSAoYmJveFsyXSAvIDIpKSArICdweCc7XG5cdGlmIChyb3RhdGlvbkNvZWZmaWNpZW50KSB7XG5cdFx0ZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7cm90YXRpb25Db2VmZmljaWVudH1kZWcpYDtcblx0fVxuXG5cdHBhcmVudC5hcHBlbmQoZWxlbWVudCk7XG5cdHJldHVybiBlbGVtZW50O1xufTtcbiIsImNvbnN0IGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuL2NyZWF0ZS1lbGVtZW50Jyk7XG5jb25zdCBjcmVhdGVQb2ludCA9IHJlcXVpcmUoJy4vY3JlYXRlLXBvaW50Jyk7XG5jb25zdCBjcmVhdGVBcnJvdyA9IHJlcXVpcmUoJy4vY3JlYXRlLWFycm93Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHttZWFuLCBjb3ZhcmlhbmNlLCBjb2xvciwgcGFyZW50LCBjbGFzc05hbWUsIHRhZyA9ICdkaXYnfSkge1xuXHRjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXHRjb250YWluZXIuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXHRjb25zdCBjZW50ZXIgPSBbbWVhblswXVswXSwgbWVhblsxXVswXV07XG5cblx0Y3JlYXRlUG9pbnQoe1xuXHRcdGJib3g6IFtjZW50ZXJbMF0sIGNlbnRlclsxXSwgMiwgMl0sXG5cdFx0cGFyZW50OiBjb250YWluZXIsXG5cdFx0Y29sb3IsXG5cdH0pO1xuXG5cdGNvbnN0IGNvcnJlbGF0aW9uWFkgPSBjb3ZhcmlhbmNlWzBdWzFdIC8gKE1hdGguc3FydChjb3ZhcmlhbmNlWzBdWzBdKSAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzFdWzFdKSk7XG5cdGNyZWF0ZUVsZW1lbnQoe1xuXHRcdGNsYXNzTmFtZTogJ2VsbGlwc2Ugc3RkRGV2Jyxcblx0XHRiYm94OiBbXG5cdFx0XHRjZW50ZXJbMF0sXG5cdFx0XHRjZW50ZXJbMV0sXG5cdFx0XHQyICogMyAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzBdWzBdKSxcblx0XHRcdDIgKiAzICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMV1bMV0pLFxuXHRcdF0sXG5cdFx0cGFyZW50OiBjb250YWluZXIsXG5cdFx0cm90YXRpb25Db2VmZmljaWVudDogY29ycmVsYXRpb25YWSxcblx0XHRjb2xvcixcblx0fSk7XG5cdGNvbnN0IGFycm93Um90YXRpb24gPSAoLTEgKiBNYXRoLmF0YW4obWVhblsyXVswXSAvIG1lYW5bM11bMF0pICogMTgwIC8gTWF0aC5QSSkgLSA0NTtcblx0Y29uc3QgYXJyb3dTY2FsZSA9IE1hdGguaHlwb3QoKG1lYW5bMl1bMF0pLCAobWVhblszXVswXSkpO1xuXHRjcmVhdGVBcnJvdyh7XG5cdFx0Y2xhc3NOYW1lOiAnYXJyb3cnLFxuXHRcdGJib3g6IFtcblx0XHRcdGNlbnRlclswXSArIDYsXG5cdFx0XHRjZW50ZXJbMV0gLSA5LFxuXHRcdF0sXG5cdFx0cGFyZW50OiBjb250YWluZXIsXG5cdFx0cm90YXRpb25Db2VmZmljaWVudDogYXJyb3dSb3RhdGlvbixcblx0XHRzY2FsZTogYXJyb3dTY2FsZSxcblx0XHRjb2xvcixcblx0fSk7XG5cdHBhcmVudC5hcHBlbmQoY29udGFpbmVyKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7Y2xhc3NOYW1lID0gJ3BvaW50JywgdGFnID0gJ2RpdicsIGJib3gsIHBhcmVudH0pIHtcblx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTsvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cdGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXHQvLyBJZiAoY29sb3IpIHtcblx0Ly8gXHRlbC5zdHlsZS5ib3JkZXIgPSBgMnB4IHNvbGlkICR7Y29sb3J9YCxcblx0Ly8gXHRlbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgJHtjb2xvcn1gXG5cdC8vIH1cblx0ZWxlbWVudC5zdHlsZS53aWR0aCA9IE1hdGgucm91bmQoYmJveFsyXSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLmhlaWdodCA9IE1hdGgucm91bmQoYmJveFszXSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLnRvcCA9IE1hdGgucm91bmQoYmJveFsxXSAtIChiYm94WzNdIC8gMikpICsgJ3B4Jztcblx0ZWxlbWVudC5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZChiYm94WzBdIC0gKGJib3hbMl0gLyAyKSkgKyAncHgnO1xuXHRwYXJlbnQuYXBwZW5kKGVsZW1lbnQpO1xuXHRyZXR1cm4gZWxlbWVudDtcbn07XG4iLCIvKipcbiAqIEB0eXBlZGVmIHt0eXBlb2YgaW1wb3J0KCcuLi8uLi9pbmRleC5kLnRzJyl9IGthbG1hbkZpbHRlclxuICovXG5jb25zdCB7IEthbG1hbkZpbHRlciB9ID0gLyoqIEB0eXBlIHtrYWxtYW5GaWx0ZXJ9ICovIChrYWxtYW5GaWx0ZXIpOy8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbmNvbnN0IGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9zaGFyZWQvdmlld3MvY3JlYXRlLWVsZW1lbnQnKTtcbmNvbnN0IGNyZWF0ZUdyb3VwUG9pbnQgPSByZXF1aXJlKCcuLi9zaGFyZWQvdmlld3MvY3JlYXRlLWdyb3VwLXBvaW50Jyk7XG5jb25zdCBrZk9wdGlvbnMgPSByZXF1aXJlKCcuL2tmLW9wdGlvbnMuanMnKTtcbmNvbnN0IG5vaXN5T2JzZXJ2YXRpb25zID0gcmVxdWlyZSgnLi9vYnNlcnZhdGlvbnMuanNvbicpLm9ic2VydmF0aW9ucztcbmNvbnN0IGtmID0gbmV3IEthbG1hbkZpbHRlcihrZk9wdGlvbnMpO1xubGV0IHByZWRpY3RlZCA9IGtmLnByZWRpY3QoKTtcblxuY29uc3QgaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JvdW5jaW5nLWJhbGwnKTsvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5pZiAoIWltZylcblx0dGhyb3cgRXJyb3IoJyNib3VuY2luZy1iYWxsIGRpdiBpcyBtaXNzaW5nIGZyb20gdGhlIERPTScpXG5cbi8vIENyZWF0ZSBhbGwgdGhlIGVsZW1lbnRzIG9mIHRoZSBwcmVkaWN0aW9uIG9yIGNvcnJlY3Rpb24gcGhhc2VcbmNvbnN0IGRlbGF5ID0gMjAwO1xuXG5sZXQgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xubGV0IHByZXZpb3VzQ29ycmVjdGVkID0gbnVsbDtcblxuY29uc3QgZGVsYXlQcm9taXNlID0gZGVsYXkgPT4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG5cdHNldFRpbWVvdXQocmVzb2x2ZSwgZGVsYXkpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRydW4oKSB7XG5cdFx0Zm9yIChjb25zdCBbaW5kZXgsIGJveF0gb2Ygbm9pc3lPYnNlcnZhdGlvbnMuZW50cmllcygpKSB7XG5cdFx0XHRwcm9taXNlID0gcHJvbWlzZVxuXHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0cHJlZGljdGVkID0ga2YucHJlZGljdCh7cHJldmlvdXNDb3JyZWN0ZWR9KTtcblx0XHRcdFx0XHRjb25zdCB7bWVhbiwgY292YXJpYW5jZX0gPSBwcmVkaWN0ZWQ7XG5cblx0XHRcdFx0XHRjcmVhdGVHcm91cFBvaW50KHtcbm1lYW4sIGNvdmFyaWFuY2UsIHBhcmVudDogaW1nLCBjbGFzc05hbWU6ICdwcmVkaWN0ZWQnLCBjb2xvcjogJ2JsdWUnLFxufSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gZGVsYXlQcm9taXNlKGRlbGF5KTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oKGIgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHtifSk7XG5cdFx0XHRcdFx0Y29uc3QgdyA9IDEwO1xuXHRcdFx0XHRcdGNvbnN0IGggPSAxMDtcblx0XHRcdFx0XHRjcmVhdGVFbGVtZW50KHtcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ29ic2VydmF0aW9uJyxcblx0XHRcdFx0XHRcdGJib3g6IFtcblx0XHRcdFx0XHRcdFx0YlswXSxcblx0XHRcdFx0XHRcdFx0YlsxXSxcblx0XHRcdFx0XHRcdFx0dyxcblx0XHRcdFx0XHRcdFx0aCxcblx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRwYXJlbnQ6IGltZyxcblx0XHRcdFx0XHRcdGNvbG9yOiAnd2hpdGUnLFxuXHRcdFx0XHRcdFx0bGluZVN0eWxlOiAnc29saWQnLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0cmV0dXJuIGRlbGF5UHJvbWlzZShkZWxheSk7XG5cdFx0XHRcdH0pLmJpbmQobnVsbCwgYm94LCBpbmRleCkpXG5cdFx0XHRcdC50aGVuKChiID0+IHtcblx0XHRcdFx0XHRwcmV2aW91c0NvcnJlY3RlZCA9IGtmLmNvcnJlY3Qoe3ByZWRpY3RlZCwgb2JzZXJ2YXRpb246IGJ9KTtcblx0XHRcdFx0XHRjb25zdCB7bWVhbiwgY292YXJpYW5jZX0gPSBwcmV2aW91c0NvcnJlY3RlZDtcblxuXHRcdFx0XHRcdGNyZWF0ZUdyb3VwUG9pbnQoe1xubWVhbiwgY292YXJpYW5jZSwgcGFyZW50OiBpbWcsIGNsYXNzTmFtZTogJ2NvcnJlY3RlZCcsIGNvbG9yOiAncmVkJyxcbn0pO1xuXG5cdFx0XHRcdFx0cmV0dXJuIGRlbGF5UHJvbWlzZShkZWxheSk7XG5cdFx0XHRcdH0pLmJpbmQobnVsbCwgYm94LCBpbmRleCkpO1xuXHRcdH1cblx0fSxcbn07XG4iXX0=
