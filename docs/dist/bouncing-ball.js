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
			[0, 1, 0, 0, 0]
		],
		// Covariance generated thanks to getCovariance
		covariance: [posVar/5, posVar/5]
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
			return [[0], [controlY], [0], [0], [0]];
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
			posVar * (timeStep ** 4)
		]
	}
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
const createElement = require('./create-element');
const createPoint = require('./create-point');
const createArrow = require('./create-arrow');
const createCustomDashedLine = require('./create-custom-dashed-line');

module.exports = function ({mean, covariance, color, parent, className, tag = 'div'}) {
	const container = document.createElement(tag); // eslint-disable-line no-undef

	container.className = className;
	const center = [mean[0][0], mean[1][0]];

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
	const arrowRotation = (-1 * Math.atan(mean[2][0] / mean[3][0]) * 180 / Math.PI) - 45;
	const arrowScale = Math.sqrt((mean[2][0] ** 2) + (mean[3][0] ** 2));
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

},{"./create-arrow":3,"./create-custom-dashed-line":4,"./create-element":5,"./create-point":7}],7:[function(require,module,exports){
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

const noisyObservations = require('./observations.json').observations;
const kfOptions = require('./kf-options.js');
const createElement = require('../shared/views/create-element');
const createGroupPoint = require('../shared/views/create-group-point');

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
		noisyObservations.forEach((box, index) => {
			promise = promise
				.then(() => {
					predicted = kf.predict({previousCorrected});
					const {mean, covariance} = predicted;

					createGroupPoint({mean, covariance, parent: img, className: 'predicted', color: 'blue'});

					return delayPromise(delay);
				})
				.then((b => {
					console.log({b})
					const w = 10;
					const h = 10;
					createElement({
						className: 'observation',
						bbox: [
							b[0],
							b[1],
							w,
							h
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

					createGroupPoint({mean, covariance, parent: img, className: 'corrected', color: 'red'});

					return delayPromise(delay);
				}).bind(null, box, index));
		});
	}
};

},{"../shared/views/create-element":5,"../shared/views/create-group-point":6,"./kf-options.js":1,"./observations.json":2}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vL2JvdW5jaW5nLWJhbGwva2Ytb3B0aW9ucy5qcyIsImRlbW8vYm91bmNpbmctYmFsbC9vYnNlcnZhdGlvbnMuanNvbiIsImRlbW8vc2hhcmVkL3ZpZXdzL2NyZWF0ZS1hcnJvdy5qcyIsImRlbW8vc2hhcmVkL3ZpZXdzL2NyZWF0ZS1jdXN0b20tZGFzaGVkLWxpbmUuanMiLCJkZW1vL3NoYXJlZC92aWV3cy9jcmVhdGUtZWxlbWVudC5qcyIsImRlbW8vc2hhcmVkL3ZpZXdzL2NyZWF0ZS1ncm91cC1wb2ludC5qcyIsImRlbW8vc2hhcmVkL3ZpZXdzL2NyZWF0ZS1wb2ludC5qcyIsImRlbW8vYm91bmNpbmctYmFsbC9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcbmNvbnN0IHBvc1ZhciA9IDEwO1xuY29uc3QgdGltZVN0ZXAgPSAxO1xuY29uc3QgaHVnZSA9IDEwMDA7XG5jb25zdCBmbG9vciA9IDQzODtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdG9ic2VydmF0aW9uOiB7XG5cdFx0ZGltZW5zaW9uOiAyLFxuXHRcdHN0YXRlUHJvamVjdGlvbjogW1xuXHRcdFx0WzEsIDAsIDAsIDAsIDBdLFxuXHRcdFx0WzAsIDEsIDAsIDAsIDBdXG5cdFx0XSxcblx0XHQvLyBDb3ZhcmlhbmNlIGdlbmVyYXRlZCB0aGFua3MgdG8gZ2V0Q292YXJpYW5jZVxuXHRcdGNvdmFyaWFuY2U6IFtwb3NWYXIvNSwgcG9zVmFyLzVdXG5cdFx0Ly8gQ292YXJpYW5jZTogW3Bvc1ZhciwgcG9zVmFyLCBwb3NWYXIsIHBvc1Zhcl0sXG5cblx0fSxcblxuXHRkeW5hbWljOiB7XG5cdFx0aW5pdDoge1xuXHRcdFx0bWVhbjogW1s5NDNdLCBbMzg1XSwgWzBdLCBbMF0sIFswXV0sXG5cblx0XHRcdGNvdmFyaWFuY2U6IFtcblx0XHRcdFx0W2h1Z2UsIDAsIDAsIDAsIDBdLFxuXHRcdFx0XHRbMCwgaHVnZSwgMCwgMCwgMF0sXG5cdFx0XHRcdFswLCAwLCBodWdlLCAwLCAwXSxcblx0XHRcdFx0WzAsIDAsIDAsIGh1Z2UsIDBdLFxuXHRcdFx0XHRbMCwgMCwgMCwgMCwgaHVnZV0sXG5cdFx0XHRdXG5cdFx0fSxcblxuXHRcdGNvbnN0YW50KHtwcmV2aW91c0NvcnJlY3RlZH0pIHtcblx0XHRcdGNvbnN0IG5vcm1hbFkgPSBwcmV2aW91c0NvcnJlY3RlZC5tZWFuWzFdWzBdICsgcHJldmlvdXNDb3JyZWN0ZWQubWVhblszXVswXSAqIHRpbWVTdGVwO1xuXG5cdFx0XHRsZXQgY29udHJvbFkgPSAwO1xuXG5cdFx0XHRpZiAobm9ybWFsWSA+IGZsb29yKSB7XG5cdFx0XHRcdGNvbnRyb2xZID0gMiAqIChmbG9vciAtIG5vcm1hbFkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFtbMF0sIFtjb250cm9sWV0sIFswXSwgWzBdLCBbMF1dO1xuXHRcdH0sXG5cblx0XHR0cmFuc2l0aW9uKHtwcmV2aW91c0NvcnJlY3RlZH0pIHtcblx0XHRcdGNvbnN0IG5vcm1hbFkgPSBwcmV2aW91c0NvcnJlY3RlZC5tZWFuWzFdWzBdICsgcHJldmlvdXNDb3JyZWN0ZWQubWVhblszXVswXSAqIHRpbWVTdGVwO1xuXHRcdFx0bGV0IHZZID0gMTtcblxuXHRcdFx0aWYgKG5vcm1hbFkgPiBmbG9vcikge1xuXHRcdFx0XHR2WSA9IC0xO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHRbMSwgMCwgdGltZVN0ZXAsIDAsIDBdLFxuXHRcdFx0XHRbMCwgMSwgMCwgdGltZVN0ZXAsIDBdLFxuXHRcdFx0XHRbMCwgMCwgMSwgMCwgMF0sXG5cdFx0XHRcdFswLCAwLCAwLCB2WSwgdGltZVN0ZXBdLFxuXHRcdFx0XHRbMCwgMCwgMCwgMCwgMV1cblx0XHRcdF07XG5cdFx0fSxcblxuXHRcdGRpbWVuc2lvbjogNSxcblxuXHRcdGNvdmFyaWFuY2U6IFtcblx0XHRcdHBvc1Zhcixcblx0XHRcdHBvc1Zhcixcblx0XHRcdHBvc1ZhciAqIHRpbWVTdGVwICogdGltZVN0ZXAsXG5cdFx0XHRwb3NWYXIgKiB0aW1lU3RlcCAqIHRpbWVTdGVwLFxuXHRcdFx0cG9zVmFyICogKHRpbWVTdGVwICoqIDQpXG5cdFx0XVxuXHR9XG59O1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuXHRcImdyb3VuZFwiOiB7XG5cdFx0eTogNDQyXG5cdH0sXG5cdFwib2JzZXJ2YXRpb25zXCI6IFtcblx0XHRbXG5cdFx0XHQxNSxcblx0XHRcdDQwXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQzOSxcblx0XHRcdDcwXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ2Mixcblx0XHRcdDEwNlxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0ODMsXG5cdFx0XHQxNDhcblx0XHRdLFxuXHRcdFtcblx0XHRcdDEwNSxcblx0XHRcdDE5N1xuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MTI2LFxuXHRcdFx0MjUzXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQxNDUsXG5cdFx0XHQzMTVcblx0XHRdLFxuXHRcdFtcblx0XHRcdDE2NSxcblx0XHRcdDM4M1xuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MTgzLFxuXHRcdFx0NDIzXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQyMDIsXG5cdFx0XHQzNjRcblx0XHRdLFxuXHRcdFtcblx0XHRcdDIxOSxcblx0XHRcdDMxNVxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MjM2LFxuXHRcdFx0Mjc0XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQyNTMsXG5cdFx0XHQyNDFcblx0XHRdLFxuXHRcdFtcblx0XHRcdDI3MCxcblx0XHRcdDIxNlxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0Mjg2LFxuXHRcdFx0MTk4XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQzMDIsXG5cdFx0XHQxODdcblx0XHRdLFxuXHRcdFtcblx0XHRcdDMxOCxcblx0XHRcdDE4NFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MzM0LFxuXHRcdFx0MTg3XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQzNTAsXG5cdFx0XHQxOTdcblx0XHRdLFxuXHRcdFtcblx0XHRcdDM2NCxcblx0XHRcdDIxNFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0Mzc4LFxuXHRcdFx0MjM2XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQzOTMsXG5cdFx0XHQyNjVcblx0XHRdLFxuXHRcdFtcblx0XHRcdDQwNixcblx0XHRcdDMwMVxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NDE5LFxuXHRcdFx0MzQzXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ0MzIsXG5cdFx0XHQzOTFcblx0XHRdLFxuXHRcdFtcblx0XHRcdDQ0Myxcblx0XHRcdDQzNFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NDU2LFxuXHRcdFx0MzkwXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ0NjksXG5cdFx0XHQzNTRcblx0XHRdLFxuXHRcdFtcblx0XHRcdDQ4MSxcblx0XHRcdDMyNlxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NDk0LFxuXHRcdFx0MzA1XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ1MDYsXG5cdFx0XHQyOTJcblx0XHRdLFxuXHRcdFtcblx0XHRcdDUxOSxcblx0XHRcdDI4NVxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NTMxLFxuXHRcdFx0Mjg1XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ1NDQsXG5cdFx0XHQyOTFcblx0XHRdLFxuXHRcdFtcblx0XHRcdDU1Nixcblx0XHRcdDMwNVxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NTY4LFxuXHRcdFx0MzIzXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ1ODAsXG5cdFx0XHQzNTBcblx0XHRdLFxuXHRcdFtcblx0XHRcdDU5MSxcblx0XHRcdDM4MFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NjAyLFxuXHRcdFx0NDE5XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ2MTMsXG5cdFx0XHQ0MjBcblx0XHRdLFxuXHRcdFtcblx0XHRcdDYyNCxcblx0XHRcdDM5MFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NjEzLFxuXHRcdFx0NDIwXG5cdFx0XVxuXHRdXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe2NsYXNzTmFtZSwgdGFnID0gJ2RpdicsIGJib3gsIHBhcmVudCwgcm90YXRpb25Db2VmZmljaWVudCwgc2NhbGUsIGNvbG9yfSkge1xuXHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpOy8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblx0ZWxlbWVudC5pZCA9ICdhcnJvdyc7XG5cdGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXHRlbGVtZW50LnN0eWxlLnRvcCA9IE1hdGgucm91bmQoYmJveFsxXSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKGJib3hbMF0pICsgJ3B4Jztcblx0aWYgKHJvdGF0aW9uQ29lZmZpY2llbnQpIHtcblx0XHRlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHtyb3RhdGlvbkNvZWZmaWNpZW50fWRlZylgO1xuXHRcdGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gJy01cHggMTJweCc7XG5cdH1cblxuXHRlbGVtZW50LnN0eWxlLnNjYWxlID0gc2NhbGU7XG5cdGVsZW1lbnQuc3R5bGUuY29sb3IgPSBjb2xvcjtcblx0cGFyZW50LmFwcGVuZChlbGVtZW50KTtcblx0cmV0dXJuIGVsZW1lbnQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe1xuXHRjbGFzc05hbWUsXG5cdHRhZyA9ICdkaXYnLFxuXHRiYm94LFxuXHRwYXJlbnQsXG5cdGNvbG9yLFxuXHRwZXJjZW50YWdlLFxuXHRwb3NpdGlvbiA9ICd2ZXJ0aWNhbCdcbn0pIHtcblx0Ly8gQmJveCBjb250YWlucyAzIGVsZW1lbnRzOiBsZWZ0LCB0b3AgYW5kIGJvdHRvbSBvZiB0aGUgZGFzaGVkIGxpbmUgb3IgdG9wLCBsZWZ0IGFuZCByaWdodFxuXHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpOy8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblx0Ly8gSWYgKGNvbG9yKSB7XG5cdC8vIFx0ZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3Jcblx0Ly8gfVxuXHRlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcblx0aWYgKHBvc2l0aW9uID09PSAndmVydGljYWwnKSB7XG5cdFx0ZWxlbWVudC5zdHlsZS53aWR0aCA9IDEgKyAncHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gTWF0aC5hYnMoYmJveFsxXSAtIGJib3hbMl0pICsgJ3B4Jztcblx0XHRlbGVtZW50LnN0eWxlLnRvcCA9IGJib3hbMV0gKyAncHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUubGVmdCA9IGJib3hbMF0gKyAncHgnO1xuXHR9XG5cblx0aWYgKHBvc2l0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcblx0XHRlbGVtZW50LnN0eWxlLmhlaWdodCA9IDEgKyAncHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUud2lkdGggPSBNYXRoLmFicyhiYm94WzFdIC0gYmJveFsyXSkgKyAncHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUubGVmdCA9IGJib3hbMV0gKyAncHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUudG9wID0gYmJveFswXSArICdweCc7XG5cdH1cblxuXHQvLyBFbC5zdHlsZS5vcGFjaXR5ID0gMS1wZXJjZW50YWdlXG5cdGNvbnN0IHVybFN0cmluZyA9ICdkYXRhOmltYWdlL3N2Zyt4bWwsJTNjc3ZnICcgK1xuXHRcdCd3aWR0aD1cXCcxMDAlMjVcXCcgJyArXG5cdFx0J2hlaWdodD1cXCcxMDAlMjVcXCcgJyArXG5cdFx0J3htbG5zPVxcJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFwnJTNlJTNjcmVjdCAnICtcblx0XHQnd2lkdGg9XFwnMTAwJTI1XFwnICcgK1xuXHRcdCdoZWlnaHQ9XFwnMTAwJTI1XFwnICcgK1xuXHRcdCdmaWxsPVxcJ25vbmVcXCcgJyArXG5cdFx0YHN0cm9rZT0nJHtjb2xvcn0nIGAgK1xuXHRcdCdzdHJva2Utd2lkdGg9XFwnNFxcJyAnICtcblx0XHRgc3Ryb2tlLWRhc2hhcnJheT0nMTAlMmMke01hdGguZmxvb3IocGVyY2VudGFnZSAqIDEwMCl9JyBgICtcblx0XHQnc3Ryb2tlLWRhc2hvZmZzZXQ9XFwnMFxcJyAnICtcblx0XHQnc3Ryb2tlLWxpbmVjYXA9XFwncm91bmRcXCcvJTNlJTNjL3N2ZyUzZSc7XG5cblx0Y29uc3QgYmFja2dyb3VuZEltYWdlMSA9IGB1cmwoXCIke3VybFN0cmluZ31cIilgO1xuXG5cdC8vIENvbnN0IGJhY2tncm91bmRJbWFnZTIgPSBcInVybChcXFwiZGF0YTppbWFnZS9zdmcreG1sLCUzY3N2ZyB3aWR0aD0nMTAwJTI1JyBoZWlnaHQ9JzEwMCUyNScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyUzZSUzY3JlY3Qgd2lkdGg9JzEwMCUyNScgaGVpZ2h0PScxMDAlMjUnIGZpbGw9J25vbmUnIHN0cm9rZT0nJTIzMzMzJyBzdHJva2Utd2lkdGg9JzQnIHN0cm9rZS1kYXNoYXJyYXk9JzEwJTJjMjAnIHN0cm9rZS1kYXNob2Zmc2V0PScwJyBzdHJva2UtbGluZWNhcD0nc3F1YXJlJy8lM2UlM2Mvc3ZnJTNlXFxcIilcIlxuXHQvLyBjb25zb2xlLmxvZyhiYWNrZ3JvdW5kSW1hZ2UxLCBiYWNrZ3JvdW5kSW1hZ2UyLCBiYWNrZ3JvdW5kSW1hZ2UxPT09YmFja2dyb3VuZEltYWdlMilcblx0ZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBiYWNrZ3JvdW5kSW1hZ2UxO1xuXHRwYXJlbnQuYXBwZW5kKGVsZW1lbnQpO1xuXHRyZXR1cm4gZWxlbWVudDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7aWQsIGNsYXNzTmFtZSwgdGFnID0gJ2RpdicsIGJib3gsIHBhcmVudCwgcm90YXRpb25Db2VmZmljaWVudH0pIHtcblx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTsvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cdGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXHRlbGVtZW50LmlkID0gaWQ7XG5cdC8vIElmIChjb2xvciAmJiBsaW5lU3R5bGUpIHtcblx0Ly8gXHRlbC5zdHlsZS5ib3JkZXIgPSBgMXB4ICR7bGluZVN0eWxlfSAke2NvbG9yfWBcblx0Ly8gfVxuXHRlbGVtZW50LnN0eWxlLndpZHRoID0gTWF0aC5yb3VuZChiYm94WzJdKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gTWF0aC5yb3VuZChiYm94WzNdKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUudG9wID0gTWF0aC5yb3VuZChiYm94WzFdIC0gKGJib3hbM10gLyAyKSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKGJib3hbMF0gLSAoYmJveFsyXSAvIDIpKSArICdweCc7XG5cdGlmIChyb3RhdGlvbkNvZWZmaWNpZW50KSB7XG5cdFx0ZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7cm90YXRpb25Db2VmZmljaWVudH1kZWcpYDtcblx0fVxuXG5cdHBhcmVudC5hcHBlbmQoZWxlbWVudCk7XG5cdHJldHVybiBlbGVtZW50O1xufTtcbiIsImNvbnN0IGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuL2NyZWF0ZS1lbGVtZW50Jyk7XG5jb25zdCBjcmVhdGVQb2ludCA9IHJlcXVpcmUoJy4vY3JlYXRlLXBvaW50Jyk7XG5jb25zdCBjcmVhdGVBcnJvdyA9IHJlcXVpcmUoJy4vY3JlYXRlLWFycm93Jyk7XG5jb25zdCBjcmVhdGVDdXN0b21EYXNoZWRMaW5lID0gcmVxdWlyZSgnLi9jcmVhdGUtY3VzdG9tLWRhc2hlZC1saW5lJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHttZWFuLCBjb3ZhcmlhbmNlLCBjb2xvciwgcGFyZW50LCBjbGFzc05hbWUsIHRhZyA9ICdkaXYnfSkge1xuXHRjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXHRjb250YWluZXIuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXHRjb25zdCBjZW50ZXIgPSBbbWVhblswXVswXSwgbWVhblsxXVswXV07XG5cblx0Y3JlYXRlUG9pbnQoe1xuXHRcdGJib3g6IFtjZW50ZXJbMF0sIGNlbnRlclsxXSwgMiwgMl0sXG5cdFx0cGFyZW50OiBjb250YWluZXIsXG5cdFx0Y29sb3Jcblx0fSk7XG5cblx0Y29uc3QgY29ycmVsYXRpb25YWSA9IGNvdmFyaWFuY2VbMF1bMV0gLyAoTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMF1bMF0pICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMV1bMV0pKTtcblx0Y3JlYXRlRWxlbWVudCh7XG5cdFx0Y2xhc3NOYW1lOiAnZWxsaXBzZSBzdGREZXYnLFxuXHRcdGJib3g6IFtcblx0XHRcdGNlbnRlclswXSxcblx0XHRcdGNlbnRlclsxXSxcblx0XHRcdDIgKiAzICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMF1bMF0pLFxuXHRcdFx0MiAqIDMgKiBNYXRoLnNxcnQoY292YXJpYW5jZVsxXVsxXSlcblx0XHRdLFxuXHRcdHBhcmVudDogY29udGFpbmVyLFxuXHRcdHJvdGF0aW9uQ29lZmZpY2llbnQ6IGNvcnJlbGF0aW9uWFksXG5cdFx0Y29sb3Jcblx0fSk7XG5cdGNvbnN0IGFycm93Um90YXRpb24gPSAoLTEgKiBNYXRoLmF0YW4obWVhblsyXVswXSAvIG1lYW5bM11bMF0pICogMTgwIC8gTWF0aC5QSSkgLSA0NTtcblx0Y29uc3QgYXJyb3dTY2FsZSA9IE1hdGguc3FydCgobWVhblsyXVswXSAqKiAyKSArIChtZWFuWzNdWzBdICoqIDIpKTtcblx0Y3JlYXRlQXJyb3coe1xuXHRcdGNsYXNzTmFtZTogJ2Fycm93Jyxcblx0XHRiYm94OiBbXG5cdFx0XHRjZW50ZXJbMF0gKyA2LFxuXHRcdFx0Y2VudGVyWzFdIC0gOVxuXHRcdF0sXG5cdFx0cGFyZW50OiBjb250YWluZXIsXG5cdFx0cm90YXRpb25Db2VmZmljaWVudDogYXJyb3dSb3RhdGlvbixcblx0XHRzY2FsZTogYXJyb3dTY2FsZSxcblx0XHRjb2xvclxuXHR9KTtcblx0cGFyZW50LmFwcGVuZChjb250YWluZXIpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHtjbGFzc05hbWUgPSAncG9pbnQnLCB0YWcgPSAnZGl2JywgYmJveCwgcGFyZW50fSkge1xuXHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpOy8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblx0ZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG5cdC8vIElmIChjb2xvcikge1xuXHQvLyBcdGVsLnN0eWxlLmJvcmRlciA9IGAycHggc29saWQgJHtjb2xvcn1gLFxuXHQvLyBcdGVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGAke2NvbG9yfWBcblx0Ly8gfVxuXHRlbGVtZW50LnN0eWxlLndpZHRoID0gTWF0aC5yb3VuZChiYm94WzJdKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gTWF0aC5yb3VuZChiYm94WzNdKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUudG9wID0gTWF0aC5yb3VuZChiYm94WzFdIC0gKGJib3hbM10gLyAyKSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKGJib3hbMF0gLSAoYmJveFsyXSAvIDIpKSArICdweCc7XG5cdHBhcmVudC5hcHBlbmQoZWxlbWVudCk7XG5cdHJldHVybiBlbGVtZW50O1xufTtcbiIsImNvbnN0IHtLYWxtYW5GaWx0ZXJ9ID0ga2FsbWFuRmlsdGVyOy8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuY29uc3Qgbm9pc3lPYnNlcnZhdGlvbnMgPSByZXF1aXJlKCcuL29ic2VydmF0aW9ucy5qc29uJykub2JzZXJ2YXRpb25zO1xuY29uc3Qga2ZPcHRpb25zID0gcmVxdWlyZSgnLi9rZi1vcHRpb25zLmpzJyk7XG5jb25zdCBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vc2hhcmVkL3ZpZXdzL2NyZWF0ZS1lbGVtZW50Jyk7XG5jb25zdCBjcmVhdGVHcm91cFBvaW50ID0gcmVxdWlyZSgnLi4vc2hhcmVkL3ZpZXdzL2NyZWF0ZS1ncm91cC1wb2ludCcpO1xuXG5jb25zdCBrZiA9IG5ldyBLYWxtYW5GaWx0ZXIoa2ZPcHRpb25zKTtcbmxldCBwcmVkaWN0ZWQgPSBrZi5wcmVkaWN0KCk7XG5cbmNvbnN0IGltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNib3VuY2luZy1iYWxsJyk7Ly8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG4vLyBDcmVhdGUgYWxsIHRoZSBlbGVtZW50cyBvZiB0aGUgcHJlZGljdGlvbiBvciBjb3JyZWN0aW9uIHBoYXNlXG5jb25zdCBkZWxheSA9IDIwMDtcblxubGV0IHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbmxldCBwcmV2aW91c0NvcnJlY3RlZCA9IG51bGw7XG5cbmNvbnN0IGRlbGF5UHJvbWlzZSA9IGRlbGF5ID0+IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuXHRzZXRUaW1lb3V0KHJlc29sdmUsIGRlbGF5KTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0cnVuKCkge1xuXHRcdG5vaXN5T2JzZXJ2YXRpb25zLmZvckVhY2goKGJveCwgaW5kZXgpID0+IHtcblx0XHRcdHByb21pc2UgPSBwcm9taXNlXG5cdFx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRwcmVkaWN0ZWQgPSBrZi5wcmVkaWN0KHtwcmV2aW91c0NvcnJlY3RlZH0pO1xuXHRcdFx0XHRcdGNvbnN0IHttZWFuLCBjb3ZhcmlhbmNlfSA9IHByZWRpY3RlZDtcblxuXHRcdFx0XHRcdGNyZWF0ZUdyb3VwUG9pbnQoe21lYW4sIGNvdmFyaWFuY2UsIHBhcmVudDogaW1nLCBjbGFzc05hbWU6ICdwcmVkaWN0ZWQnLCBjb2xvcjogJ2JsdWUnfSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gZGVsYXlQcm9taXNlKGRlbGF5KTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oKGIgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHtifSlcblx0XHRcdFx0XHRjb25zdCB3ID0gMTA7XG5cdFx0XHRcdFx0Y29uc3QgaCA9IDEwO1xuXHRcdFx0XHRcdGNyZWF0ZUVsZW1lbnQoe1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnb2JzZXJ2YXRpb24nLFxuXHRcdFx0XHRcdFx0YmJveDogW1xuXHRcdFx0XHRcdFx0XHRiWzBdLFxuXHRcdFx0XHRcdFx0XHRiWzFdLFxuXHRcdFx0XHRcdFx0XHR3LFxuXHRcdFx0XHRcdFx0XHRoXG5cdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdFx0cGFyZW50OiBpbWcsXG5cdFx0XHRcdFx0XHRjb2xvcjogJ3doaXRlJyxcblx0XHRcdFx0XHRcdGxpbmVTdHlsZTogJ3NvbGlkJ1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0cmV0dXJuIGRlbGF5UHJvbWlzZShkZWxheSk7XG5cdFx0XHRcdH0pLmJpbmQobnVsbCwgYm94LCBpbmRleCkpXG5cdFx0XHRcdC50aGVuKChiID0+IHtcblx0XHRcdFx0XHRwcmV2aW91c0NvcnJlY3RlZCA9IGtmLmNvcnJlY3Qoe3ByZWRpY3RlZCwgb2JzZXJ2YXRpb246IGJ9KTtcblx0XHRcdFx0XHRjb25zdCB7bWVhbiwgY292YXJpYW5jZX0gPSBwcmV2aW91c0NvcnJlY3RlZDtcblxuXHRcdFx0XHRcdGNyZWF0ZUdyb3VwUG9pbnQoe21lYW4sIGNvdmFyaWFuY2UsIHBhcmVudDogaW1nLCBjbGFzc05hbWU6ICdjb3JyZWN0ZWQnLCBjb2xvcjogJ3JlZCd9KTtcblxuXHRcdFx0XHRcdHJldHVybiBkZWxheVByb21pc2UoZGVsYXkpO1xuXHRcdFx0XHR9KS5iaW5kKG51bGwsIGJveCwgaW5kZXgpKTtcblx0XHR9KTtcblx0fVxufTtcbiJdfQ==
