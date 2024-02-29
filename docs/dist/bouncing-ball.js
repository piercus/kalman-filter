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
	const arrowScale = Math.sqrt((mean[2][0] ** 2) + (mean[3][0] ** 2));
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
const {KalmanFilter} = kalmanFilter;// eslint-disable-line no-undef
const createElement = require('../shared/views/create-element');
const createGroupPoint = require('../shared/views/create-group-point');
const kfOptions = require('./kf-options.js');
const noisyObservations = require('./observations.json').observations;

const kf = new KalmanFilter(kfOptions);
let predicted = kf.predict();

const img = document.querySelector('#bouncing-ball');// eslint-disable-line no-undef

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

					createGroupPoint({mean, covariance, parent: img, className: 'predicted', color: 'blue'});

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

					createGroupPoint({mean, covariance, parent: img, className: 'corrected', color: 'red'});

					return delayPromise(delay);
				}).bind(null, box, index));
		}
	},
};

},{"../shared/views/create-element":4,"../shared/views/create-group-point":5,"./kf-options.js":1,"./observations.json":2}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy8ucG5wbS9icm93c2VyLXBhY2tANi4xLjAvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImRlbW8vYm91bmNpbmctYmFsbC9rZi1vcHRpb25zLmpzIiwiZGVtby9ib3VuY2luZy1iYWxsL29ic2VydmF0aW9ucy5qc29uIiwiZGVtby9zaGFyZWQvdmlld3MvY3JlYXRlLWFycm93LmpzIiwiZGVtby9zaGFyZWQvdmlld3MvY3JlYXRlLWVsZW1lbnQuanMiLCJkZW1vL3NoYXJlZC92aWV3cy9jcmVhdGUtZ3JvdXAtcG9pbnQuanMiLCJkZW1vL3NoYXJlZC92aWV3cy9jcmVhdGUtcG9pbnQuanMiLCJkZW1vL2JvdW5jaW5nLWJhbGwvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXG5jb25zdCBwb3NWYXIgPSAxMDtcbmNvbnN0IHRpbWVTdGVwID0gMTtcbmNvbnN0IGh1Z2UgPSAxMDAwO1xuY29uc3QgZmxvb3IgPSA0Mzg7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRvYnNlcnZhdGlvbjoge1xuXHRcdGRpbWVuc2lvbjogMixcblx0XHRzdGF0ZVByb2plY3Rpb246IFtcblx0XHRcdFsxLCAwLCAwLCAwLCAwXSxcblx0XHRcdFswLCAxLCAwLCAwLCAwXSxcblx0XHRdLFxuXHRcdC8vIENvdmFyaWFuY2UgZ2VuZXJhdGVkIHRoYW5rcyB0byBnZXRDb3ZhcmlhbmNlXG5cdFx0Y292YXJpYW5jZTogW3Bvc1ZhciAvIDUsIHBvc1ZhciAvIDVdLFxuXHRcdC8vIENvdmFyaWFuY2U6IFtwb3NWYXIsIHBvc1ZhciwgcG9zVmFyLCBwb3NWYXJdLFxuXG5cdH0sXG5cblx0ZHluYW1pYzoge1xuXHRcdGluaXQ6IHtcblx0XHRcdG1lYW46IFtbOTQzXSwgWzM4NV0sIFswXSwgWzBdLCBbMF1dLFxuXG5cdFx0XHRjb3ZhcmlhbmNlOiBbXG5cdFx0XHRcdFtodWdlLCAwLCAwLCAwLCAwXSxcblx0XHRcdFx0WzAsIGh1Z2UsIDAsIDAsIDBdLFxuXHRcdFx0XHRbMCwgMCwgaHVnZSwgMCwgMF0sXG5cdFx0XHRcdFswLCAwLCAwLCBodWdlLCAwXSxcblx0XHRcdFx0WzAsIDAsIDAsIDAsIGh1Z2VdLFxuXHRcdFx0XSxcblx0XHR9LFxuXG5cdFx0Y29uc3RhbnQoe3ByZXZpb3VzQ29ycmVjdGVkfSkge1xuXHRcdFx0Y29uc3Qgbm9ybWFsWSA9IHByZXZpb3VzQ29ycmVjdGVkLm1lYW5bMV1bMF0gKyAocHJldmlvdXNDb3JyZWN0ZWQubWVhblszXVswXSAqIHRpbWVTdGVwKTtcblxuXHRcdFx0bGV0IGNvbnRyb2xZID0gMDtcblxuXHRcdFx0aWYgKG5vcm1hbFkgPiBmbG9vcikge1xuXHRcdFx0XHRjb250cm9sWSA9IDIgKiAoZmxvb3IgLSBub3JtYWxZKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFtbMF0sIFtjb250cm9sWV0sIFswXSwgWzBdLCBbMF1dO1xuXHRcdH0sXG5cblx0XHR0cmFuc2l0aW9uKHtwcmV2aW91c0NvcnJlY3RlZH0pIHtcblx0XHRcdGNvbnN0IG5vcm1hbFkgPSBwcmV2aW91c0NvcnJlY3RlZC5tZWFuWzFdWzBdICsgKHByZXZpb3VzQ29ycmVjdGVkLm1lYW5bM11bMF0gKiB0aW1lU3RlcCk7XG5cdFx0XHRsZXQgdlkgPSAxO1xuXG5cdFx0XHRpZiAobm9ybWFsWSA+IGZsb29yKSB7XG5cdFx0XHRcdHZZID0gLTE7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBbXG5cdFx0XHRcdFsxLCAwLCB0aW1lU3RlcCwgMCwgMF0sXG5cdFx0XHRcdFswLCAxLCAwLCB0aW1lU3RlcCwgMF0sXG5cdFx0XHRcdFswLCAwLCAxLCAwLCAwXSxcblx0XHRcdFx0WzAsIDAsIDAsIHZZLCB0aW1lU3RlcF0sXG5cdFx0XHRcdFswLCAwLCAwLCAwLCAxXSxcblx0XHRcdF07XG5cdFx0fSxcblxuXHRcdGRpbWVuc2lvbjogNSxcblxuXHRcdGNvdmFyaWFuY2U6IFtcblx0XHRcdHBvc1Zhcixcblx0XHRcdHBvc1Zhcixcblx0XHRcdHBvc1ZhciAqIHRpbWVTdGVwICogdGltZVN0ZXAsXG5cdFx0XHRwb3NWYXIgKiB0aW1lU3RlcCAqIHRpbWVTdGVwLFxuXHRcdFx0cG9zVmFyICogKHRpbWVTdGVwICoqIDQpLFxuXHRcdF0sXG5cdH0sXG59O1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuXHRcImdyb3VuZFwiOiB7XG5cdFx0eTogNDQyXG5cdH0sXG5cdFwib2JzZXJ2YXRpb25zXCI6IFtcblx0XHRbXG5cdFx0XHQxNSxcblx0XHRcdDQwXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQzOSxcblx0XHRcdDcwXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ2Mixcblx0XHRcdDEwNlxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0ODMsXG5cdFx0XHQxNDhcblx0XHRdLFxuXHRcdFtcblx0XHRcdDEwNSxcblx0XHRcdDE5N1xuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MTI2LFxuXHRcdFx0MjUzXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQxNDUsXG5cdFx0XHQzMTVcblx0XHRdLFxuXHRcdFtcblx0XHRcdDE2NSxcblx0XHRcdDM4M1xuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MTgzLFxuXHRcdFx0NDIzXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQyMDIsXG5cdFx0XHQzNjRcblx0XHRdLFxuXHRcdFtcblx0XHRcdDIxOSxcblx0XHRcdDMxNVxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MjM2LFxuXHRcdFx0Mjc0XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQyNTMsXG5cdFx0XHQyNDFcblx0XHRdLFxuXHRcdFtcblx0XHRcdDI3MCxcblx0XHRcdDIxNlxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0Mjg2LFxuXHRcdFx0MTk4XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQzMDIsXG5cdFx0XHQxODdcblx0XHRdLFxuXHRcdFtcblx0XHRcdDMxOCxcblx0XHRcdDE4NFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MzM0LFxuXHRcdFx0MTg3XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQzNTAsXG5cdFx0XHQxOTdcblx0XHRdLFxuXHRcdFtcblx0XHRcdDM2NCxcblx0XHRcdDIxNFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0Mzc4LFxuXHRcdFx0MjM2XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQzOTMsXG5cdFx0XHQyNjVcblx0XHRdLFxuXHRcdFtcblx0XHRcdDQwNixcblx0XHRcdDMwMVxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NDE5LFxuXHRcdFx0MzQzXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ0MzIsXG5cdFx0XHQzOTFcblx0XHRdLFxuXHRcdFtcblx0XHRcdDQ0Myxcblx0XHRcdDQzNFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NDU2LFxuXHRcdFx0MzkwXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ0NjksXG5cdFx0XHQzNTRcblx0XHRdLFxuXHRcdFtcblx0XHRcdDQ4MSxcblx0XHRcdDMyNlxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NDk0LFxuXHRcdFx0MzA1XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ1MDYsXG5cdFx0XHQyOTJcblx0XHRdLFxuXHRcdFtcblx0XHRcdDUxOSxcblx0XHRcdDI4NVxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NTMxLFxuXHRcdFx0Mjg1XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ1NDQsXG5cdFx0XHQyOTFcblx0XHRdLFxuXHRcdFtcblx0XHRcdDU1Nixcblx0XHRcdDMwNVxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NTY4LFxuXHRcdFx0MzIzXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ1ODAsXG5cdFx0XHQzNTBcblx0XHRdLFxuXHRcdFtcblx0XHRcdDU5MSxcblx0XHRcdDM4MFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NjAyLFxuXHRcdFx0NDE5XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ2MTMsXG5cdFx0XHQ0MjBcblx0XHRdLFxuXHRcdFtcblx0XHRcdDYyNCxcblx0XHRcdDM5MFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NjEzLFxuXHRcdFx0NDIwXG5cdFx0XVxuXHRdXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe2NsYXNzTmFtZSwgdGFnID0gJ2RpdicsIGJib3gsIHBhcmVudCwgcm90YXRpb25Db2VmZmljaWVudCwgc2NhbGUsIGNvbG9yfSkge1xuXHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpOy8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblx0ZWxlbWVudC5pZCA9ICdhcnJvdyc7XG5cdGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXHRlbGVtZW50LnN0eWxlLnRvcCA9IE1hdGgucm91bmQoYmJveFsxXSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKGJib3hbMF0pICsgJ3B4Jztcblx0aWYgKHJvdGF0aW9uQ29lZmZpY2llbnQpIHtcblx0XHRlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHtyb3RhdGlvbkNvZWZmaWNpZW50fWRlZylgO1xuXHRcdGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gJy01cHggMTJweCc7XG5cdH1cblxuXHRlbGVtZW50LnN0eWxlLnNjYWxlID0gc2NhbGU7XG5cdGVsZW1lbnQuc3R5bGUuY29sb3IgPSBjb2xvcjtcblx0cGFyZW50LmFwcGVuZChlbGVtZW50KTtcblx0cmV0dXJuIGVsZW1lbnQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe2lkLCBjbGFzc05hbWUsIHRhZyA9ICdkaXYnLCBiYm94LCBwYXJlbnQsIHJvdGF0aW9uQ29lZmZpY2llbnR9KSB7XG5cdGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7Ly8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXHRlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcblx0ZWxlbWVudC5pZCA9IGlkO1xuXHQvLyBJZiAoY29sb3IgJiYgbGluZVN0eWxlKSB7XG5cdC8vIFx0ZWwuc3R5bGUuYm9yZGVyID0gYDFweCAke2xpbmVTdHlsZX0gJHtjb2xvcn1gXG5cdC8vIH1cblx0ZWxlbWVudC5zdHlsZS53aWR0aCA9IE1hdGgucm91bmQoYmJveFsyXSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLmhlaWdodCA9IE1hdGgucm91bmQoYmJveFszXSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLnRvcCA9IE1hdGgucm91bmQoYmJveFsxXSAtIChiYm94WzNdIC8gMikpICsgJ3B4Jztcblx0ZWxlbWVudC5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZChiYm94WzBdIC0gKGJib3hbMl0gLyAyKSkgKyAncHgnO1xuXHRpZiAocm90YXRpb25Db2VmZmljaWVudCkge1xuXHRcdGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3JvdGF0aW9uQ29lZmZpY2llbnR9ZGVnKWA7XG5cdH1cblxuXHRwYXJlbnQuYXBwZW5kKGVsZW1lbnQpO1xuXHRyZXR1cm4gZWxlbWVudDtcbn07XG4iLCJjb25zdCBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi9jcmVhdGUtZWxlbWVudCcpO1xuY29uc3QgY3JlYXRlUG9pbnQgPSByZXF1aXJlKCcuL2NyZWF0ZS1wb2ludCcpO1xuY29uc3QgY3JlYXRlQXJyb3cgPSByZXF1aXJlKCcuL2NyZWF0ZS1hcnJvdycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7bWVhbiwgY292YXJpYW5jZSwgY29sb3IsIHBhcmVudCwgY2xhc3NOYW1lLCB0YWcgPSAnZGl2J30pIHtcblx0Y29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblx0Y29udGFpbmVyLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcblx0Y29uc3QgY2VudGVyID0gW21lYW5bMF1bMF0sIG1lYW5bMV1bMF1dO1xuXG5cdGNyZWF0ZVBvaW50KHtcblx0XHRiYm94OiBbY2VudGVyWzBdLCBjZW50ZXJbMV0sIDIsIDJdLFxuXHRcdHBhcmVudDogY29udGFpbmVyLFxuXHRcdGNvbG9yLFxuXHR9KTtcblxuXHRjb25zdCBjb3JyZWxhdGlvblhZID0gY292YXJpYW5jZVswXVsxXSAvIChNYXRoLnNxcnQoY292YXJpYW5jZVswXVswXSkgKiBNYXRoLnNxcnQoY292YXJpYW5jZVsxXVsxXSkpO1xuXHRjcmVhdGVFbGVtZW50KHtcblx0XHRjbGFzc05hbWU6ICdlbGxpcHNlIHN0ZERldicsXG5cdFx0YmJveDogW1xuXHRcdFx0Y2VudGVyWzBdLFxuXHRcdFx0Y2VudGVyWzFdLFxuXHRcdFx0MiAqIDMgKiBNYXRoLnNxcnQoY292YXJpYW5jZVswXVswXSksXG5cdFx0XHQyICogMyAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzFdWzFdKSxcblx0XHRdLFxuXHRcdHBhcmVudDogY29udGFpbmVyLFxuXHRcdHJvdGF0aW9uQ29lZmZpY2llbnQ6IGNvcnJlbGF0aW9uWFksXG5cdFx0Y29sb3IsXG5cdH0pO1xuXHRjb25zdCBhcnJvd1JvdGF0aW9uID0gKC0xICogTWF0aC5hdGFuKG1lYW5bMl1bMF0gLyBtZWFuWzNdWzBdKSAqIDE4MCAvIE1hdGguUEkpIC0gNDU7XG5cdGNvbnN0IGFycm93U2NhbGUgPSBNYXRoLnNxcnQoKG1lYW5bMl1bMF0gKiogMikgKyAobWVhblszXVswXSAqKiAyKSk7XG5cdGNyZWF0ZUFycm93KHtcblx0XHRjbGFzc05hbWU6ICdhcnJvdycsXG5cdFx0YmJveDogW1xuXHRcdFx0Y2VudGVyWzBdICsgNixcblx0XHRcdGNlbnRlclsxXSAtIDksXG5cdFx0XSxcblx0XHRwYXJlbnQ6IGNvbnRhaW5lcixcblx0XHRyb3RhdGlvbkNvZWZmaWNpZW50OiBhcnJvd1JvdGF0aW9uLFxuXHRcdHNjYWxlOiBhcnJvd1NjYWxlLFxuXHRcdGNvbG9yLFxuXHR9KTtcblx0cGFyZW50LmFwcGVuZChjb250YWluZXIpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHtjbGFzc05hbWUgPSAncG9pbnQnLCB0YWcgPSAnZGl2JywgYmJveCwgcGFyZW50fSkge1xuXHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpOy8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblx0ZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG5cdC8vIElmIChjb2xvcikge1xuXHQvLyBcdGVsLnN0eWxlLmJvcmRlciA9IGAycHggc29saWQgJHtjb2xvcn1gLFxuXHQvLyBcdGVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGAke2NvbG9yfWBcblx0Ly8gfVxuXHRlbGVtZW50LnN0eWxlLndpZHRoID0gTWF0aC5yb3VuZChiYm94WzJdKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gTWF0aC5yb3VuZChiYm94WzNdKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUudG9wID0gTWF0aC5yb3VuZChiYm94WzFdIC0gKGJib3hbM10gLyAyKSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKGJib3hbMF0gLSAoYmJveFsyXSAvIDIpKSArICdweCc7XG5cdHBhcmVudC5hcHBlbmQoZWxlbWVudCk7XG5cdHJldHVybiBlbGVtZW50O1xufTtcbiIsImNvbnN0IHtLYWxtYW5GaWx0ZXJ9ID0ga2FsbWFuRmlsdGVyOy8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbmNvbnN0IGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9zaGFyZWQvdmlld3MvY3JlYXRlLWVsZW1lbnQnKTtcbmNvbnN0IGNyZWF0ZUdyb3VwUG9pbnQgPSByZXF1aXJlKCcuLi9zaGFyZWQvdmlld3MvY3JlYXRlLWdyb3VwLXBvaW50Jyk7XG5jb25zdCBrZk9wdGlvbnMgPSByZXF1aXJlKCcuL2tmLW9wdGlvbnMuanMnKTtcbmNvbnN0IG5vaXN5T2JzZXJ2YXRpb25zID0gcmVxdWlyZSgnLi9vYnNlcnZhdGlvbnMuanNvbicpLm9ic2VydmF0aW9ucztcblxuY29uc3Qga2YgPSBuZXcgS2FsbWFuRmlsdGVyKGtmT3B0aW9ucyk7XG5sZXQgcHJlZGljdGVkID0ga2YucHJlZGljdCgpO1xuXG5jb25zdCBpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYm91bmNpbmctYmFsbCcpOy8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuLy8gQ3JlYXRlIGFsbCB0aGUgZWxlbWVudHMgb2YgdGhlIHByZWRpY3Rpb24gb3IgY29ycmVjdGlvbiBwaGFzZVxuY29uc3QgZGVsYXkgPSAyMDA7XG5cbmxldCBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG5sZXQgcHJldmlvdXNDb3JyZWN0ZWQgPSBudWxsO1xuXG5jb25zdCBkZWxheVByb21pc2UgPSBkZWxheSA9PiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcblx0c2V0VGltZW91dChyZXNvbHZlLCBkZWxheSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdHJ1bigpIHtcblx0XHRmb3IgKGNvbnN0IFtpbmRleCwgYm94XSBvZiBub2lzeU9ic2VydmF0aW9ucy5lbnRyaWVzKCkpIHtcblx0XHRcdHByb21pc2UgPSBwcm9taXNlXG5cdFx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRwcmVkaWN0ZWQgPSBrZi5wcmVkaWN0KHtwcmV2aW91c0NvcnJlY3RlZH0pO1xuXHRcdFx0XHRcdGNvbnN0IHttZWFuLCBjb3ZhcmlhbmNlfSA9IHByZWRpY3RlZDtcblxuXHRcdFx0XHRcdGNyZWF0ZUdyb3VwUG9pbnQoe21lYW4sIGNvdmFyaWFuY2UsIHBhcmVudDogaW1nLCBjbGFzc05hbWU6ICdwcmVkaWN0ZWQnLCBjb2xvcjogJ2JsdWUnfSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gZGVsYXlQcm9taXNlKGRlbGF5KTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oKGIgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHtifSk7XG5cdFx0XHRcdFx0Y29uc3QgdyA9IDEwO1xuXHRcdFx0XHRcdGNvbnN0IGggPSAxMDtcblx0XHRcdFx0XHRjcmVhdGVFbGVtZW50KHtcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ29ic2VydmF0aW9uJyxcblx0XHRcdFx0XHRcdGJib3g6IFtcblx0XHRcdFx0XHRcdFx0YlswXSxcblx0XHRcdFx0XHRcdFx0YlsxXSxcblx0XHRcdFx0XHRcdFx0dyxcblx0XHRcdFx0XHRcdFx0aCxcblx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRwYXJlbnQ6IGltZyxcblx0XHRcdFx0XHRcdGNvbG9yOiAnd2hpdGUnLFxuXHRcdFx0XHRcdFx0bGluZVN0eWxlOiAnc29saWQnLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0cmV0dXJuIGRlbGF5UHJvbWlzZShkZWxheSk7XG5cdFx0XHRcdH0pLmJpbmQobnVsbCwgYm94LCBpbmRleCkpXG5cdFx0XHRcdC50aGVuKChiID0+IHtcblx0XHRcdFx0XHRwcmV2aW91c0NvcnJlY3RlZCA9IGtmLmNvcnJlY3Qoe3ByZWRpY3RlZCwgb2JzZXJ2YXRpb246IGJ9KTtcblx0XHRcdFx0XHRjb25zdCB7bWVhbiwgY292YXJpYW5jZX0gPSBwcmV2aW91c0NvcnJlY3RlZDtcblxuXHRcdFx0XHRcdGNyZWF0ZUdyb3VwUG9pbnQoe21lYW4sIGNvdmFyaWFuY2UsIHBhcmVudDogaW1nLCBjbGFzc05hbWU6ICdjb3JyZWN0ZWQnLCBjb2xvcjogJ3JlZCd9KTtcblxuXHRcdFx0XHRcdHJldHVybiBkZWxheVByb21pc2UoZGVsYXkpO1xuXHRcdFx0XHR9KS5iaW5kKG51bGwsIGJveCwgaW5kZXgpKTtcblx0XHR9XG5cdH0sXG59O1xuIl19
