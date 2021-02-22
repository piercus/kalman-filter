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

},{}],"main":[function(require,module,exports){
const {KalmanFilter} = kalmanFilter;// eslint-disable-line no-undef

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

},{"./kf-options.js":1,"./observations.json":3,"./views/create-element":6,"./views/create-group-boxes":7}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vL3NyYy9rZi1vcHRpb25zLmpzIiwiZGVtby9zcmMvb2JzZXJ2YXRpb24tY292YXJpYW5jZS5qc29uIiwiZGVtby9zcmMvb2JzZXJ2YXRpb25zLmpzb24iLCJkZW1vL3NyYy92aWV3cy9jcmVhdGUtYXJyb3cuanMiLCJkZW1vL3NyYy92aWV3cy9jcmVhdGUtY3VzdG9tLWRhc2hlZC1saW5lLmpzIiwiZGVtby9zcmMvdmlld3MvY3JlYXRlLWVsZW1lbnQuanMiLCJkZW1vL3NyYy92aWV3cy9jcmVhdGUtZ3JvdXAtYm94ZXMuanMiLCJkZW1vL3NyYy92aWV3cy9jcmVhdGUtcG9pbnQuanMiLCJkZW1vL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7O0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBvYnNlcnZhdGlvbkNvdmFyaWFuY2UgPSByZXF1aXJlKCcuL29ic2VydmF0aW9uLWNvdmFyaWFuY2UuanNvbicpO1xuXG5jb25zdCBwb3NWYXIgPSAxMDA7XG5jb25zdCB0aW1lU3RlcCA9IDAuMjtcbmNvbnN0IHNpemVWYXIgPSAxO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0b2JzZXJ2YXRpb246IHtcblx0XHRkaW1lbnNpb246IDQsXG5cdFx0c3RhdGVQcm9qZWN0aW9uOiBbXG5cdFx0XHRbMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0XHRbMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0XHRbMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0XHRbMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF1cblx0XHRdLFxuXHRcdC8vIENvdmFyaWFuY2UgZ2VuZXJhdGVkIHRoYW5rcyB0byBnZXRDb3ZhcmlhbmNlXG5cdFx0Y292YXJpYW5jZTogb2JzZXJ2YXRpb25Db3ZhcmlhbmNlXG5cdFx0Ly8gQ292YXJpYW5jZTogW3Bvc1ZhciwgcG9zVmFyLCBwb3NWYXIsIHBvc1Zhcl0sXG5cblx0fSxcblxuXHRkeW5hbWljOiB7XG5cdFx0bmFtZTogJ2NvbnN0YW50LWFjY2VsZXJhdGlvbicsXG5cdFx0dGltZVN0ZXA6IDAuMixcblx0XHQvLyBJbml0OiB7XG5cdFx0Ly8gXHRtZWFuOiBbWzk0M10sIFszODVdLCBbNzVdLCBbNjVdLCBbLTIwMF0sIFstMjAwXSwgWzBdLCBbMF0sIFstMjBdLCBbLTIwXSwgWzBdLCBbMF1dLFxuXHRcdC8vXG5cdFx0Ly8gXHRjb3ZhcmlhbmNlOiBbXG5cdFx0Ly8gXHRcdFtodWdlLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHQvLyBcdFx0WzAsIGh1Z2UsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuXHRcdC8vIFx0XHRbMCwgMCwgaHVnZSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0Ly8gXHRcdFswLCAwLCAwLCBodWdlLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHQvLyBcdFx0WzAsIDAsIDAsIDAsIGh1Z2UsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuXHRcdC8vIFx0XHRbMCwgMCwgMCwgMCwgMCwgaHVnZSwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0Ly8gXHRcdFswLCAwLCAwLCAwLCAwLCAwLCBodWdlLCAwLCAwLCAwLCAwLCAwXSxcblx0XHQvLyBcdFx0WzAsIDAsIDAsIDAsIDAsIDAsIDAsIGh1Z2UsIDAsIDAsIDAsIDBdLFxuXHRcdC8vIFx0XHRbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgaHVnZSwgMCwgMCwgMF0sXG5cdFx0Ly8gXHRcdFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCBodWdlLCAwLCAwXSxcblx0XHQvLyBcdFx0WzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIGh1Z2UsIDBdLFxuXHRcdC8vIFx0XHRbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgaHVnZV0sXG5cdFx0Ly8gXHRdXG5cdFx0Ly8gfSxcblxuXHRcdGRpbWVuc2lvbjogMTIsXG5cblx0XHRjb3ZhcmlhbmNlOiBbXG5cdFx0XHRwb3NWYXIsXG5cdFx0XHRwb3NWYXIsXG5cdFx0XHRzaXplVmFyLFxuXHRcdFx0c2l6ZVZhcixcblx0XHRcdHBvc1ZhciAqIHRpbWVTdGVwICogdGltZVN0ZXAsXG5cdFx0XHRwb3NWYXIgKiB0aW1lU3RlcCAqIHRpbWVTdGVwLFxuXHRcdFx0c2l6ZVZhciAqIHRpbWVTdGVwICogdGltZVN0ZXAsXG5cdFx0XHRzaXplVmFyICogdGltZVN0ZXAgKiB0aW1lU3RlcCxcblx0XHRcdHBvc1ZhciAqICh0aW1lU3RlcCAqKiA0KSxcblx0XHRcdHBvc1ZhciAqICh0aW1lU3RlcCAqKiA0KSxcblx0XHRcdHNpemVWYXIgKiAodGltZVN0ZXAgKiogNCksXG5cdFx0XHRzaXplVmFyICogKHRpbWVTdGVwICoqIDQpXG5cdFx0XVxuXHR9XG59O1xuIiwibW9kdWxlLmV4cG9ydHM9W1szNC4zMTQyODU3MTQyODU3MiwtOC4xMTQyODU3MTQyODU3MTQsLTkuMTg1NzE0Mjg1NzE0Mjg1LDMuMDQyODU3MTQyODU3MTQyN10sWy04LjExNDI4NTcxNDI4NTcxNCwzOS4wODU3MTQyODU3MTQyOSwxLjE4NTcxNDI4NTcxNDI4NTcsLTUuNTI4NTcxNDI4NTcxNDI4NV0sWy05LjE4NTcxNDI4NTcxNDI4NSwxLjE4NTcxNDI4NTcxNDI4NTcsMzQuNjI4NTcxNDI4NTcxNDI2LDAuNzg1NzE0Mjg1NzE0Mjg1N10sWzMuMDQyODU3MTQyODU3MTQyNywtNS41Mjg1NzE0Mjg1NzE0Mjg1LDAuNzg1NzE0Mjg1NzE0Mjg1NywzOS44NTcxNDI4NTcxNDI4NTRdXSIsIm1vZHVsZS5leHBvcnRzPXtcIm9ic2VydmF0aW9uc1wiOltbODQyLDI4Niw4Miw4MV0sWzcxNCwxODQsOTIsODBdLFs1NjAsMTA3LDExMiwxMTZdLFs0MTgsOTQsOTYsMTEwXSxbMjc3LDE0MSw4OSw4OV0sWzE0NiwyMDAsODgsNzJdLFsyMiwzMDYsNzcsODJdXX0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7Y2xhc3NOYW1lLCB0YWcgPSAnZGl2JywgYmJveCwgcGFyZW50LCByb3RhdGlvbkNvZWZmaWNpZW50LCBzY2FsZSwgY29sb3J9KSB7XG5cdGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7Ly8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXHRlbGVtZW50LmlkID0gJ2Fycm93Jztcblx0ZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG5cdGVsZW1lbnQuc3R5bGUudG9wID0gTWF0aC5yb3VuZChiYm94WzFdKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUubGVmdCA9IE1hdGgucm91bmQoYmJveFswXSkgKyAncHgnO1xuXHRpZiAocm90YXRpb25Db2VmZmljaWVudCkge1xuXHRcdGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3JvdGF0aW9uQ29lZmZpY2llbnR9ZGVnKWA7XG5cdFx0ZWxlbWVudC5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSAnLTVweCAxMnB4Jztcblx0fVxuXG5cdGVsZW1lbnQuc3R5bGUuc2NhbGUgPSBzY2FsZTtcblx0ZWxlbWVudC5zdHlsZS5jb2xvciA9IGNvbG9yO1xuXHRwYXJlbnQuYXBwZW5kKGVsZW1lbnQpO1xuXHRyZXR1cm4gZWxlbWVudDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7XG5cdGNsYXNzTmFtZSxcblx0dGFnID0gJ2RpdicsXG5cdGJib3gsXG5cdHBhcmVudCxcblx0Y29sb3IsXG5cdHBlcmNlbnRhZ2UsXG5cdHBvc2l0aW9uID0gJ3ZlcnRpY2FsJ1xufSkge1xuXHQvLyBCYm94IGNvbnRhaW5zIDMgZWxlbWVudHM6IGxlZnQsIHRvcCBhbmQgYm90dG9tIG9mIHRoZSBkYXNoZWQgbGluZSBvciB0b3AsIGxlZnQgYW5kIHJpZ2h0XG5cdGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7Ly8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXHQvLyBJZiAoY29sb3IpIHtcblx0Ly8gXHRlbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvclxuXHQvLyB9XG5cdGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXHRpZiAocG9zaXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcblx0XHRlbGVtZW50LnN0eWxlLndpZHRoID0gMSArICdweCc7XG5cdFx0ZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBNYXRoLmFicyhiYm94WzFdIC0gYmJveFsyXSkgKyAncHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUudG9wID0gYmJveFsxXSArICdweCc7XG5cdFx0ZWxlbWVudC5zdHlsZS5sZWZ0ID0gYmJveFswXSArICdweCc7XG5cdH1cblxuXHRpZiAocG9zaXRpb24gPT09ICdob3Jpem9udGFsJykge1xuXHRcdGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gMSArICdweCc7XG5cdFx0ZWxlbWVudC5zdHlsZS53aWR0aCA9IE1hdGguYWJzKGJib3hbMV0gLSBiYm94WzJdKSArICdweCc7XG5cdFx0ZWxlbWVudC5zdHlsZS5sZWZ0ID0gYmJveFsxXSArICdweCc7XG5cdFx0ZWxlbWVudC5zdHlsZS50b3AgPSBiYm94WzBdICsgJ3B4Jztcblx0fVxuXG5cdC8vIEVsLnN0eWxlLm9wYWNpdHkgPSAxLXBlcmNlbnRhZ2Vcblx0Y29uc3QgdXJsU3RyaW5nID0gJ2RhdGE6aW1hZ2Uvc3ZnK3htbCwlM2NzdmcgJyArXG5cdFx0J3dpZHRoPVxcJzEwMCUyNVxcJyAnICtcblx0XHQnaGVpZ2h0PVxcJzEwMCUyNVxcJyAnICtcblx0XHQneG1sbnM9XFwnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXCclM2UlM2NyZWN0ICcgK1xuXHRcdCd3aWR0aD1cXCcxMDAlMjVcXCcgJyArXG5cdFx0J2hlaWdodD1cXCcxMDAlMjVcXCcgJyArXG5cdFx0J2ZpbGw9XFwnbm9uZVxcJyAnICtcblx0XHRgc3Ryb2tlPScke2NvbG9yfScgYCArXG5cdFx0J3N0cm9rZS13aWR0aD1cXCc0XFwnICcgK1xuXHRcdGBzdHJva2UtZGFzaGFycmF5PScxMCUyYyR7TWF0aC5mbG9vcihwZXJjZW50YWdlICogMTAwKX0nIGAgK1xuXHRcdCdzdHJva2UtZGFzaG9mZnNldD1cXCcwXFwnICcgK1xuXHRcdCdzdHJva2UtbGluZWNhcD1cXCdyb3VuZFxcJy8lM2UlM2Mvc3ZnJTNlJztcblxuXHRjb25zdCBiYWNrZ3JvdW5kSW1hZ2UxID0gYHVybChcIiR7dXJsU3RyaW5nfVwiKWA7XG5cblx0Ly8gQ29uc3QgYmFja2dyb3VuZEltYWdlMiA9IFwidXJsKFxcXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNjc3ZnIHdpZHRoPScxMDAlMjUnIGhlaWdodD0nMTAwJTI1JyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnJTNlJTNjcmVjdCB3aWR0aD0nMTAwJTI1JyBoZWlnaHQ9JzEwMCUyNScgZmlsbD0nbm9uZScgc3Ryb2tlPSclMjMzMzMnIHN0cm9rZS13aWR0aD0nNCcgc3Ryb2tlLWRhc2hhcnJheT0nMTAlMmMyMCcgc3Ryb2tlLWRhc2hvZmZzZXQ9JzAnIHN0cm9rZS1saW5lY2FwPSdzcXVhcmUnLyUzZSUzYy9zdmclM2VcXFwiKVwiXG5cdC8vIGNvbnNvbGUubG9nKGJhY2tncm91bmRJbWFnZTEsIGJhY2tncm91bmRJbWFnZTIsIGJhY2tncm91bmRJbWFnZTE9PT1iYWNrZ3JvdW5kSW1hZ2UyKVxuXHRlbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGJhY2tncm91bmRJbWFnZTE7XG5cdHBhcmVudC5hcHBlbmQoZWxlbWVudCk7XG5cdHJldHVybiBlbGVtZW50O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHtpZCwgY2xhc3NOYW1lLCB0YWcgPSAnZGl2JywgYmJveCwgcGFyZW50LCByb3RhdGlvbkNvZWZmaWNpZW50fSkge1xuXHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpOy8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblx0ZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG5cdGVsZW1lbnQuaWQgPSBpZDtcblx0Ly8gSWYgKGNvbG9yICYmIGxpbmVTdHlsZSkge1xuXHQvLyBcdGVsLnN0eWxlLmJvcmRlciA9IGAxcHggJHtsaW5lU3R5bGV9ICR7Y29sb3J9YFxuXHQvLyB9XG5cdGVsZW1lbnQuc3R5bGUud2lkdGggPSBNYXRoLnJvdW5kKGJib3hbMl0pICsgJ3B4Jztcblx0ZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBNYXRoLnJvdW5kKGJib3hbM10pICsgJ3B4Jztcblx0ZWxlbWVudC5zdHlsZS50b3AgPSBNYXRoLnJvdW5kKGJib3hbMV0gLSAoYmJveFszXSAvIDIpKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUubGVmdCA9IE1hdGgucm91bmQoYmJveFswXSAtIChiYm94WzJdIC8gMikpICsgJ3B4Jztcblx0aWYgKHJvdGF0aW9uQ29lZmZpY2llbnQpIHtcblx0XHRlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHtyb3RhdGlvbkNvZWZmaWNpZW50fWRlZylgO1xuXHR9XG5cblx0cGFyZW50LmFwcGVuZChlbGVtZW50KTtcblx0cmV0dXJuIGVsZW1lbnQ7XG59O1xuIiwiY29uc3QgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4vY3JlYXRlLWVsZW1lbnQnKTtcbmNvbnN0IGNyZWF0ZVBvaW50ID0gcmVxdWlyZSgnLi9jcmVhdGUtcG9pbnQnKTtcbmNvbnN0IGNyZWF0ZUFycm93ID0gcmVxdWlyZSgnLi9jcmVhdGUtYXJyb3cnKTtcbmNvbnN0IGNyZWF0ZUN1c3RvbURhc2hlZExpbmUgPSByZXF1aXJlKCcuL2NyZWF0ZS1jdXN0b20tZGFzaGVkLWxpbmUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe21lYW4sIGNvdmFyaWFuY2UsIGNvbG9yLCBwYXJlbnQsIGNsYXNzTmFtZSwgdGFnID0gJ2Rpdid9KSB7XG5cdGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cdGNvbnRhaW5lci5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG5cdGNvbnN0IGNlbnRlciA9IFttZWFuWzBdWzBdICsgKG1lYW5bMl1bMF0gLyAyKSwgbWVhblsxXVswXSArIChtZWFuWzNdWzBdIC8gMildO1xuXHRjcmVhdGVFbGVtZW50KHtcblx0XHRjbGFzc05hbWU6ICdib3gnLFxuXHRcdGJib3g6IFtjZW50ZXJbMF0sIGNlbnRlclsxXSwgbWVhblsyXVswXSwgbWVhblszXVswXV0sXG5cdFx0cGFyZW50OiBjb250YWluZXIsXG5cdFx0Y29sb3IsXG5cdFx0bGluZVN0eWxlOiAnc29saWQnXG5cdH0pO1xuXHRjcmVhdGVFbGVtZW50KHtcblx0XHRjbGFzc05hbWU6ICdib3ggc3RkRGV2Jyxcblx0XHRiYm94OiBbXG5cdFx0XHRjZW50ZXJbMF0sXG5cdFx0XHRjZW50ZXJbMV0sXG5cdFx0XHRtZWFuWzJdWzBdICsgKDIgKiAzICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMl1bMl0pKSxcblx0XHRcdG1lYW5bM11bMF0gKyAoMiAqIDMgKiBNYXRoLnNxcnQoY292YXJpYW5jZVszXVszXSkpXG5cdFx0XSxcblx0XHRwYXJlbnQ6IGNvbnRhaW5lcixcblx0XHRjb2xvclxuXHR9KTtcblx0Y3JlYXRlUG9pbnQoe1xuXHRcdGJib3g6IFtjZW50ZXJbMF0sIGNlbnRlclsxXSwgMiwgMl0sXG5cdFx0cGFyZW50OiBjb250YWluZXIsXG5cdFx0Y29sb3Jcblx0fSk7XG5cdGNvbnN0IGNvcnJlbGF0aW9uWFkgPSBjb3ZhcmlhbmNlWzBdWzFdIC8gKE1hdGguc3FydChjb3ZhcmlhbmNlWzBdWzBdKSAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzFdWzFdKSk7XG5cdGNyZWF0ZUVsZW1lbnQoe1xuXHRcdGNsYXNzTmFtZTogJ2VsbGlwc2Ugc3RkRGV2Jyxcblx0XHRiYm94OiBbXG5cdFx0XHRjZW50ZXJbMF0sXG5cdFx0XHRjZW50ZXJbMV0sXG5cdFx0XHQyICogMyAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzBdWzBdKSxcblx0XHRcdDIgKiAzICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMV1bMV0pXG5cdFx0XSxcblx0XHRwYXJlbnQ6IGNvbnRhaW5lcixcblx0XHRyb3RhdGlvbkNvZWZmaWNpZW50OiBjb3JyZWxhdGlvblhZLFxuXHRcdGNvbG9yXG5cdH0pO1xuXHRjb25zdCBjb3JyZWxhdGlvblhXID0gY292YXJpYW5jZVswXVsyXSAvIChNYXRoLnNxcnQoY292YXJpYW5jZVswXVswXSkgKiBNYXRoLnNxcnQoY292YXJpYW5jZVsyXVsyXSkpO1xuXHRjcmVhdGVDdXN0b21EYXNoZWRMaW5lKHtcblx0XHRjbGFzc05hbWU6ICdkYXNoZWRMaW5lJyxcblx0XHRiYm94OiBbXG5cdFx0XHRjZW50ZXJbMF0sXG5cdFx0XHRjZW50ZXJbMV0gKyAoMyAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzFdWzFdKSksXG5cdFx0XHRjZW50ZXJbMV0gKyAobWVhblszXVswXSAvIDIpICsgKDMgKiBNYXRoLnNxcnQoY292YXJpYW5jZVszXVszXSkpXG5cdFx0XSxcblx0XHRwYXJlbnQ6IGNvbnRhaW5lcixcblx0XHRwZXJjZW50YWdlOiBNYXRoLmFicyhjb3JyZWxhdGlvblhXKSxcblx0XHRjb2xvclxuXHR9KTtcblx0Y29uc3QgY29ycmVsYXRpb25ZSCA9IGNvdmFyaWFuY2VbMV1bM10gLyAoTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMV1bMV0pICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbM11bM10pKTtcblx0Y3JlYXRlQ3VzdG9tRGFzaGVkTGluZSh7XG5cdFx0Y2xhc3NOYW1lOiAnZGFzaGVkTGluZScsXG5cdFx0YmJveDogW1xuXHRcdFx0Y2VudGVyWzFdLFxuXHRcdFx0Y2VudGVyWzBdICsgKDMgKiBNYXRoLnNxcnQoY292YXJpYW5jZVswXVswXSkpLFxuXHRcdFx0Y2VudGVyWzBdICsgKG1lYW5bMl1bMF0gLyAyKSArICgzICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMl1bMl0pKVxuXHRcdF0sXG5cdFx0cGFyZW50OiBjb250YWluZXIsXG5cdFx0cGVyY2VudGFnZTogTWF0aC5hYnMoY29ycmVsYXRpb25ZSCksXG5cdFx0cG9zaXRpb246ICdob3Jpem9udGFsJyxcblx0XHRjb2xvclxuXHR9KTtcblx0Y29uc3QgYXJyb3dSb3RhdGlvbiA9ICgtMSAqIE1hdGguYXRhbihtZWFuWzRdWzBdIC8gbWVhbls1XVswXSkgKiAxODAgLyBNYXRoLlBJKSAtIDQ1O1xuXHRjb25zdCBhcnJvd1NjYWxlID0gTWF0aC5zcXJ0KChtZWFuWzRdWzBdICoqIDIpICsgKG1lYW5bNV1bMF0gKiogMikpO1xuXHRjcmVhdGVBcnJvdyh7XG5cdFx0Y2xhc3NOYW1lOiAnYXJyb3cnLFxuXHRcdGJib3g6IFtcblx0XHRcdGNlbnRlclswXSArIDYsXG5cdFx0XHRjZW50ZXJbMV0gLSA5XG5cdFx0XSxcblx0XHRwYXJlbnQ6IGNvbnRhaW5lcixcblx0XHRyb3RhdGlvbkNvZWZmaWNpZW50OiBhcnJvd1JvdGF0aW9uLFxuXHRcdHNjYWxlOiBhcnJvd1NjYWxlLFxuXHRcdGNvbG9yXG5cdH0pO1xuXHRwYXJlbnQuYXBwZW5kKGNvbnRhaW5lcik7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe2NsYXNzTmFtZSA9ICdwb2ludCcsIHRhZyA9ICdkaXYnLCBiYm94LCBwYXJlbnR9KSB7XG5cdGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7Ly8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXHRlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcblx0Ly8gSWYgKGNvbG9yKSB7XG5cdC8vIFx0ZWwuc3R5bGUuYm9yZGVyID0gYDJweCBzb2xpZCAke2NvbG9yfWAsXG5cdC8vIFx0ZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYCR7Y29sb3J9YFxuXHQvLyB9XG5cdGVsZW1lbnQuc3R5bGUud2lkdGggPSBNYXRoLnJvdW5kKGJib3hbMl0pICsgJ3B4Jztcblx0ZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBNYXRoLnJvdW5kKGJib3hbM10pICsgJ3B4Jztcblx0ZWxlbWVudC5zdHlsZS50b3AgPSBNYXRoLnJvdW5kKGJib3hbMV0gLSAoYmJveFszXSAvIDIpKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUubGVmdCA9IE1hdGgucm91bmQoYmJveFswXSAtIChiYm94WzJdIC8gMikpICsgJ3B4Jztcblx0cGFyZW50LmFwcGVuZChlbGVtZW50KTtcblx0cmV0dXJuIGVsZW1lbnQ7XG59O1xuIiwiY29uc3Qge0thbG1hbkZpbHRlcn0gPSBrYWxtYW5GaWx0ZXI7Ly8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5jb25zdCBub2lzeU9ic2VydmF0aW9ucyA9IHJlcXVpcmUoJy4vb2JzZXJ2YXRpb25zLmpzb24nKS5vYnNlcnZhdGlvbnM7XG5jb25zdCBrZk9wdGlvbnMgPSByZXF1aXJlKCcuL2tmLW9wdGlvbnMuanMnKTtcbmNvbnN0IGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuL3ZpZXdzL2NyZWF0ZS1lbGVtZW50Jyk7XG5jb25zdCBjcmVhdGVHcm91cEJveGVzID0gcmVxdWlyZSgnLi92aWV3cy9jcmVhdGUtZ3JvdXAtYm94ZXMnKTtcblxuY29uc3Qga2YgPSBuZXcgS2FsbWFuRmlsdGVyKGtmT3B0aW9ucyk7XG5sZXQgcHJlZGljdGVkID0ga2YucHJlZGljdCgpO1xuXG5jb25zdCBpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmlrZXMnKTsvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cbi8vIENyZWF0ZSBhbGwgdGhlIGVsZW1lbnRzIG9mIHRoZSBwcmVkaWN0aW9uIG9yIGNvcnJlY3Rpb24gcGhhc2VcbmNvbnN0IGRlbGF5ID0gMjAwO1xuXG5sZXQgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xubGV0IHByZXZpb3VzQ29ycmVjdGVkID0gbnVsbDtcblxuY29uc3QgZGVsYXlQcm9taXNlID0gZGVsYXkgPT4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIGRlbGF5KSk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRydW4oKSB7XG5cdFx0bm9pc3lPYnNlcnZhdGlvbnMuZm9yRWFjaCgoYm94LCBpbmRleCkgPT4ge1xuXHRcdFx0cHJvbWlzZSA9IHByb21pc2Vcblx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdHByZWRpY3RlZCA9IGtmLnByZWRpY3Qoe3ByZXZpb3VzQ29ycmVjdGVkfSk7XG5cdFx0XHRcdFx0Y29uc3Qge21lYW4sIGNvdmFyaWFuY2V9ID0gcHJlZGljdGVkO1xuXG5cdFx0XHRcdFx0Y3JlYXRlR3JvdXBCb3hlcyh7bWVhbiwgY292YXJpYW5jZSwgcGFyZW50OiBpbWcsIGNsYXNzTmFtZTogJ3ByZWRpY3RlZCcsIGNvbG9yOiAnYmx1ZSd9KTtcblxuXHRcdFx0XHRcdHJldHVybiBkZWxheVByb21pc2UoZGVsYXkpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQudGhlbigoYiA9PiB7XG5cdFx0XHRcdFx0Y3JlYXRlRWxlbWVudCh7XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdvYnNlcnZhdGlvbicsXG5cdFx0XHRcdFx0XHRiYm94OiBbXG5cdFx0XHRcdFx0XHRcdGJbMF0gKyAoYlsyXSAvIDIpLFxuXHRcdFx0XHRcdFx0XHRiWzFdICsgKGJbM10gLyAyKSxcblx0XHRcdFx0XHRcdFx0YlsyXSxcblx0XHRcdFx0XHRcdFx0YlszXVxuXHRcdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRcdHBhcmVudDogaW1nLFxuXHRcdFx0XHRcdFx0Y29sb3I6ICd3aGl0ZScsXG5cdFx0XHRcdFx0XHRsaW5lU3R5bGU6ICdzb2xpZCdcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHJldHVybiBkZWxheVByb21pc2UoZGVsYXkpO1xuXHRcdFx0XHR9KS5iaW5kKG51bGwsIGJveCwgaW5kZXgpKVxuXHRcdFx0XHQudGhlbigoYiA9PiB7XG5cdFx0XHRcdFx0cHJldmlvdXNDb3JyZWN0ZWQgPSBrZi5jb3JyZWN0KHtwcmVkaWN0ZWQsIG9ic2VydmF0aW9uOiBifSk7XG5cdFx0XHRcdFx0Y29uc3Qge21lYW4sIGNvdmFyaWFuY2V9ID0gcHJldmlvdXNDb3JyZWN0ZWQ7XG5cblx0XHRcdFx0XHRjcmVhdGVHcm91cEJveGVzKHttZWFuLCBjb3ZhcmlhbmNlLCBwYXJlbnQ6IGltZywgY2xhc3NOYW1lOiAnY29ycmVjdGVkJywgY29sb3I6ICdyZWQnfSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gZGVsYXlQcm9taXNlKGRlbGF5KTtcblx0XHRcdFx0fSkuYmluZChudWxsLCBib3gsIGluZGV4KSk7XG5cdFx0fSk7XG5cdH1cbn07XG4iXX0=
