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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vL2Jpa2Uva2Ytb3B0aW9ucy5qcyIsImRlbW8vYmlrZS9vYnNlcnZhdGlvbi1jb3ZhcmlhbmNlLmpzb24iLCJkZW1vL2Jpa2Uvb2JzZXJ2YXRpb25zLmpzb24iLCJkZW1vL3NoYXJlZC92aWV3cy9jcmVhdGUtYXJyb3cuanMiLCJkZW1vL3NoYXJlZC92aWV3cy9jcmVhdGUtY3VzdG9tLWRhc2hlZC1saW5lLmpzIiwiZGVtby9zaGFyZWQvdmlld3MvY3JlYXRlLWVsZW1lbnQuanMiLCJkZW1vL3NoYXJlZC92aWV3cy9jcmVhdGUtZ3JvdXAtYm94ZXMuanMiLCJkZW1vL3NoYXJlZC92aWV3cy9jcmVhdGUtcG9pbnQuanMiLCJkZW1vL2Jpa2UvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBOztBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IG9ic2VydmF0aW9uQ292YXJpYW5jZSA9IHJlcXVpcmUoJy4vb2JzZXJ2YXRpb24tY292YXJpYW5jZS5qc29uJyk7XG5cbmNvbnN0IHBvc1ZhciA9IDEwMDtcbmNvbnN0IHRpbWVTdGVwID0gMC4yO1xuY29uc3Qgc2l6ZVZhciA9IDE7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRvYnNlcnZhdGlvbjoge1xuXHRcdGRpbWVuc2lvbjogNCxcblx0XHRzdGF0ZVByb2plY3Rpb246IFtcblx0XHRcdFsxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHRcdFswLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHRcdFswLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHRcdFswLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXVxuXHRcdF0sXG5cdFx0Ly8gQ292YXJpYW5jZSBnZW5lcmF0ZWQgdGhhbmtzIHRvIGdldENvdmFyaWFuY2Vcblx0XHRjb3ZhcmlhbmNlOiBvYnNlcnZhdGlvbkNvdmFyaWFuY2Vcblx0XHQvLyBDb3ZhcmlhbmNlOiBbcG9zVmFyLCBwb3NWYXIsIHBvc1ZhciwgcG9zVmFyXSxcblxuXHR9LFxuXG5cdGR5bmFtaWM6IHtcblx0XHRuYW1lOiAnY29uc3RhbnQtYWNjZWxlcmF0aW9uJyxcblx0XHR0aW1lU3RlcDogMC4yLFxuXHRcdC8vIEluaXQ6IHtcblx0XHQvLyBcdG1lYW46IFtbOTQzXSwgWzM4NV0sIFs3NV0sIFs2NV0sIFstMjAwXSwgWy0yMDBdLCBbMF0sIFswXSwgWy0yMF0sIFstMjBdLCBbMF0sIFswXV0sXG5cdFx0Ly9cblx0XHQvLyBcdGNvdmFyaWFuY2U6IFtcblx0XHQvLyBcdFx0W2h1Z2UsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuXHRcdC8vIFx0XHRbMCwgaHVnZSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0Ly8gXHRcdFswLCAwLCBodWdlLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHQvLyBcdFx0WzAsIDAsIDAsIGh1Z2UsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuXHRcdC8vIFx0XHRbMCwgMCwgMCwgMCwgaHVnZSwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0Ly8gXHRcdFswLCAwLCAwLCAwLCAwLCBodWdlLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHQvLyBcdFx0WzAsIDAsIDAsIDAsIDAsIDAsIGh1Z2UsIDAsIDAsIDAsIDAsIDBdLFxuXHRcdC8vIFx0XHRbMCwgMCwgMCwgMCwgMCwgMCwgMCwgaHVnZSwgMCwgMCwgMCwgMF0sXG5cdFx0Ly8gXHRcdFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCBodWdlLCAwLCAwLCAwXSxcblx0XHQvLyBcdFx0WzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIGh1Z2UsIDAsIDBdLFxuXHRcdC8vIFx0XHRbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgaHVnZSwgMF0sXG5cdFx0Ly8gXHRcdFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCBodWdlXSxcblx0XHQvLyBcdF1cblx0XHQvLyB9LFxuXG5cdFx0ZGltZW5zaW9uOiAxMixcblxuXHRcdGNvdmFyaWFuY2U6IFtcblx0XHRcdHBvc1Zhcixcblx0XHRcdHBvc1Zhcixcblx0XHRcdHNpemVWYXIsXG5cdFx0XHRzaXplVmFyLFxuXHRcdFx0cG9zVmFyICogdGltZVN0ZXAgKiB0aW1lU3RlcCxcblx0XHRcdHBvc1ZhciAqIHRpbWVTdGVwICogdGltZVN0ZXAsXG5cdFx0XHRzaXplVmFyICogdGltZVN0ZXAgKiB0aW1lU3RlcCxcblx0XHRcdHNpemVWYXIgKiB0aW1lU3RlcCAqIHRpbWVTdGVwLFxuXHRcdFx0cG9zVmFyICogKHRpbWVTdGVwICoqIDQpLFxuXHRcdFx0cG9zVmFyICogKHRpbWVTdGVwICoqIDQpLFxuXHRcdFx0c2l6ZVZhciAqICh0aW1lU3RlcCAqKiA0KSxcblx0XHRcdHNpemVWYXIgKiAodGltZVN0ZXAgKiogNClcblx0XHRdXG5cdH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cz1bWzM0LjMxNDI4NTcxNDI4NTcyLC04LjExNDI4NTcxNDI4NTcxNCwtOS4xODU3MTQyODU3MTQyODUsMy4wNDI4NTcxNDI4NTcxNDI3XSxbLTguMTE0Mjg1NzE0Mjg1NzE0LDM5LjA4NTcxNDI4NTcxNDI5LDEuMTg1NzE0Mjg1NzE0Mjg1NywtNS41Mjg1NzE0Mjg1NzE0Mjg1XSxbLTkuMTg1NzE0Mjg1NzE0Mjg1LDEuMTg1NzE0Mjg1NzE0Mjg1NywzNC42Mjg1NzE0Mjg1NzE0MjYsMC43ODU3MTQyODU3MTQyODU3XSxbMy4wNDI4NTcxNDI4NTcxNDI3LC01LjUyODU3MTQyODU3MTQyODUsMC43ODU3MTQyODU3MTQyODU3LDM5Ljg1NzE0Mjg1NzE0Mjg1NF1dIiwibW9kdWxlLmV4cG9ydHM9e1wib2JzZXJ2YXRpb25zXCI6W1s4NDIsMjg2LDgyLDgxXSxbNzE0LDE4NCw5Miw4MF0sWzU2MCwxMDcsMTEyLDExNl0sWzQxOCw5NCw5NiwxMTBdLFsyNzcsMTQxLDg5LDg5XSxbMTQ2LDIwMCw4OCw3Ml0sWzIyLDMwNiw3Nyw4Ml1dfSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHtjbGFzc05hbWUsIHRhZyA9ICdkaXYnLCBiYm94LCBwYXJlbnQsIHJvdGF0aW9uQ29lZmZpY2llbnQsIHNjYWxlLCBjb2xvcn0pIHtcblx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTsvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cdGVsZW1lbnQuaWQgPSAnYXJyb3cnO1xuXHRlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcblx0ZWxlbWVudC5zdHlsZS50b3AgPSBNYXRoLnJvdW5kKGJib3hbMV0pICsgJ3B4Jztcblx0ZWxlbWVudC5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZChiYm94WzBdKSArICdweCc7XG5cdGlmIChyb3RhdGlvbkNvZWZmaWNpZW50KSB7XG5cdFx0ZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7cm90YXRpb25Db2VmZmljaWVudH1kZWcpYDtcblx0XHRlbGVtZW50LnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9ICctNXB4IDEycHgnO1xuXHR9XG5cblx0ZWxlbWVudC5zdHlsZS5zY2FsZSA9IHNjYWxlO1xuXHRlbGVtZW50LnN0eWxlLmNvbG9yID0gY29sb3I7XG5cdHBhcmVudC5hcHBlbmQoZWxlbWVudCk7XG5cdHJldHVybiBlbGVtZW50O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHtcblx0Y2xhc3NOYW1lLFxuXHR0YWcgPSAnZGl2Jyxcblx0YmJveCxcblx0cGFyZW50LFxuXHRjb2xvcixcblx0cGVyY2VudGFnZSxcblx0cG9zaXRpb24gPSAndmVydGljYWwnXG59KSB7XG5cdC8vIEJib3ggY29udGFpbnMgMyBlbGVtZW50czogbGVmdCwgdG9wIGFuZCBib3R0b20gb2YgdGhlIGRhc2hlZCBsaW5lIG9yIHRvcCwgbGVmdCBhbmQgcmlnaHRcblx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTsvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cdC8vIElmIChjb2xvcikge1xuXHQvLyBcdGVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yXG5cdC8vIH1cblx0ZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG5cdGlmIChwb3NpdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuXHRcdGVsZW1lbnQuc3R5bGUud2lkdGggPSAxICsgJ3B4Jztcblx0XHRlbGVtZW50LnN0eWxlLmhlaWdodCA9IE1hdGguYWJzKGJib3hbMV0gLSBiYm94WzJdKSArICdweCc7XG5cdFx0ZWxlbWVudC5zdHlsZS50b3AgPSBiYm94WzFdICsgJ3B4Jztcblx0XHRlbGVtZW50LnN0eWxlLmxlZnQgPSBiYm94WzBdICsgJ3B4Jztcblx0fVxuXG5cdGlmIChwb3NpdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG5cdFx0ZWxlbWVudC5zdHlsZS5oZWlnaHQgPSAxICsgJ3B4Jztcblx0XHRlbGVtZW50LnN0eWxlLndpZHRoID0gTWF0aC5hYnMoYmJveFsxXSAtIGJib3hbMl0pICsgJ3B4Jztcblx0XHRlbGVtZW50LnN0eWxlLmxlZnQgPSBiYm94WzFdICsgJ3B4Jztcblx0XHRlbGVtZW50LnN0eWxlLnRvcCA9IGJib3hbMF0gKyAncHgnO1xuXHR9XG5cblx0Ly8gRWwuc3R5bGUub3BhY2l0eSA9IDEtcGVyY2VudGFnZVxuXHRjb25zdCB1cmxTdHJpbmcgPSAnZGF0YTppbWFnZS9zdmcreG1sLCUzY3N2ZyAnICtcblx0XHQnd2lkdGg9XFwnMTAwJTI1XFwnICcgK1xuXHRcdCdoZWlnaHQ9XFwnMTAwJTI1XFwnICcgK1xuXHRcdCd4bWxucz1cXCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcJyUzZSUzY3JlY3QgJyArXG5cdFx0J3dpZHRoPVxcJzEwMCUyNVxcJyAnICtcblx0XHQnaGVpZ2h0PVxcJzEwMCUyNVxcJyAnICtcblx0XHQnZmlsbD1cXCdub25lXFwnICcgK1xuXHRcdGBzdHJva2U9JyR7Y29sb3J9JyBgICtcblx0XHQnc3Ryb2tlLXdpZHRoPVxcJzRcXCcgJyArXG5cdFx0YHN0cm9rZS1kYXNoYXJyYXk9JzEwJTJjJHtNYXRoLmZsb29yKHBlcmNlbnRhZ2UgKiAxMDApfScgYCArXG5cdFx0J3N0cm9rZS1kYXNob2Zmc2V0PVxcJzBcXCcgJyArXG5cdFx0J3N0cm9rZS1saW5lY2FwPVxcJ3JvdW5kXFwnLyUzZSUzYy9zdmclM2UnO1xuXG5cdGNvbnN0IGJhY2tncm91bmRJbWFnZTEgPSBgdXJsKFwiJHt1cmxTdHJpbmd9XCIpYDtcblxuXHQvLyBDb25zdCBiYWNrZ3JvdW5kSW1hZ2UyID0gXCJ1cmwoXFxcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM2Nzdmcgd2lkdGg9JzEwMCUyNScgaGVpZ2h0PScxMDAlMjUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyclM2UlM2NyZWN0IHdpZHRoPScxMDAlMjUnIGhlaWdodD0nMTAwJTI1JyBmaWxsPSdub25lJyBzdHJva2U9JyUyMzMzMycgc3Ryb2tlLXdpZHRoPSc0JyBzdHJva2UtZGFzaGFycmF5PScxMCUyYzIwJyBzdHJva2UtZGFzaG9mZnNldD0nMCcgc3Ryb2tlLWxpbmVjYXA9J3NxdWFyZScvJTNlJTNjL3N2ZyUzZVxcXCIpXCJcblx0Ly8gY29uc29sZS5sb2coYmFja2dyb3VuZEltYWdlMSwgYmFja2dyb3VuZEltYWdlMiwgYmFja2dyb3VuZEltYWdlMT09PWJhY2tncm91bmRJbWFnZTIpXG5cdGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYmFja2dyb3VuZEltYWdlMTtcblx0cGFyZW50LmFwcGVuZChlbGVtZW50KTtcblx0cmV0dXJuIGVsZW1lbnQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe2lkLCBjbGFzc05hbWUsIHRhZyA9ICdkaXYnLCBiYm94LCBwYXJlbnQsIHJvdGF0aW9uQ29lZmZpY2llbnR9KSB7XG5cdGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7Ly8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXHRlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcblx0ZWxlbWVudC5pZCA9IGlkO1xuXHQvLyBJZiAoY29sb3IgJiYgbGluZVN0eWxlKSB7XG5cdC8vIFx0ZWwuc3R5bGUuYm9yZGVyID0gYDFweCAke2xpbmVTdHlsZX0gJHtjb2xvcn1gXG5cdC8vIH1cblx0ZWxlbWVudC5zdHlsZS53aWR0aCA9IE1hdGgucm91bmQoYmJveFsyXSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLmhlaWdodCA9IE1hdGgucm91bmQoYmJveFszXSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLnRvcCA9IE1hdGgucm91bmQoYmJveFsxXSAtIChiYm94WzNdIC8gMikpICsgJ3B4Jztcblx0ZWxlbWVudC5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZChiYm94WzBdIC0gKGJib3hbMl0gLyAyKSkgKyAncHgnO1xuXHRpZiAocm90YXRpb25Db2VmZmljaWVudCkge1xuXHRcdGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3JvdGF0aW9uQ29lZmZpY2llbnR9ZGVnKWA7XG5cdH1cblxuXHRwYXJlbnQuYXBwZW5kKGVsZW1lbnQpO1xuXHRyZXR1cm4gZWxlbWVudDtcbn07XG4iLCJjb25zdCBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi9jcmVhdGUtZWxlbWVudCcpO1xuY29uc3QgY3JlYXRlUG9pbnQgPSByZXF1aXJlKCcuL2NyZWF0ZS1wb2ludCcpO1xuY29uc3QgY3JlYXRlQXJyb3cgPSByZXF1aXJlKCcuL2NyZWF0ZS1hcnJvdycpO1xuY29uc3QgY3JlYXRlQ3VzdG9tRGFzaGVkTGluZSA9IHJlcXVpcmUoJy4vY3JlYXRlLWN1c3RvbS1kYXNoZWQtbGluZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7bWVhbiwgY292YXJpYW5jZSwgY29sb3IsIHBhcmVudCwgY2xhc3NOYW1lLCB0YWcgPSAnZGl2J30pIHtcblx0Y29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblx0Y29udGFpbmVyLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcblx0Y29uc3QgY2VudGVyID0gW21lYW5bMF1bMF0gKyAobWVhblsyXVswXSAvIDIpLCBtZWFuWzFdWzBdICsgKG1lYW5bM11bMF0gLyAyKV07XG5cdGNyZWF0ZUVsZW1lbnQoe1xuXHRcdGNsYXNzTmFtZTogJ2JveCcsXG5cdFx0YmJveDogW2NlbnRlclswXSwgY2VudGVyWzFdLCBtZWFuWzJdWzBdLCBtZWFuWzNdWzBdXSxcblx0XHRwYXJlbnQ6IGNvbnRhaW5lcixcblx0XHRjb2xvcixcblx0XHRsaW5lU3R5bGU6ICdzb2xpZCdcblx0fSk7XG5cdGNyZWF0ZUVsZW1lbnQoe1xuXHRcdGNsYXNzTmFtZTogJ2JveCBzdGREZXYnLFxuXHRcdGJib3g6IFtcblx0XHRcdGNlbnRlclswXSxcblx0XHRcdGNlbnRlclsxXSxcblx0XHRcdG1lYW5bMl1bMF0gKyAoMiAqIDMgKiBNYXRoLnNxcnQoY292YXJpYW5jZVsyXVsyXSkpLFxuXHRcdFx0bWVhblszXVswXSArICgyICogMyAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzNdWzNdKSlcblx0XHRdLFxuXHRcdHBhcmVudDogY29udGFpbmVyLFxuXHRcdGNvbG9yXG5cdH0pO1xuXHRjcmVhdGVQb2ludCh7XG5cdFx0YmJveDogW2NlbnRlclswXSwgY2VudGVyWzFdLCAyLCAyXSxcblx0XHRwYXJlbnQ6IGNvbnRhaW5lcixcblx0XHRjb2xvclxuXHR9KTtcblx0Y29uc3QgY29ycmVsYXRpb25YWSA9IGNvdmFyaWFuY2VbMF1bMV0gLyAoTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMF1bMF0pICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMV1bMV0pKTtcblx0Y3JlYXRlRWxlbWVudCh7XG5cdFx0Y2xhc3NOYW1lOiAnZWxsaXBzZSBzdGREZXYnLFxuXHRcdGJib3g6IFtcblx0XHRcdGNlbnRlclswXSxcblx0XHRcdGNlbnRlclsxXSxcblx0XHRcdDIgKiAzICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMF1bMF0pLFxuXHRcdFx0MiAqIDMgKiBNYXRoLnNxcnQoY292YXJpYW5jZVsxXVsxXSlcblx0XHRdLFxuXHRcdHBhcmVudDogY29udGFpbmVyLFxuXHRcdHJvdGF0aW9uQ29lZmZpY2llbnQ6IGNvcnJlbGF0aW9uWFksXG5cdFx0Y29sb3Jcblx0fSk7XG5cdGNvbnN0IGNvcnJlbGF0aW9uWFcgPSBjb3ZhcmlhbmNlWzBdWzJdIC8gKE1hdGguc3FydChjb3ZhcmlhbmNlWzBdWzBdKSAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzJdWzJdKSk7XG5cdGNyZWF0ZUN1c3RvbURhc2hlZExpbmUoe1xuXHRcdGNsYXNzTmFtZTogJ2Rhc2hlZExpbmUnLFxuXHRcdGJib3g6IFtcblx0XHRcdGNlbnRlclswXSxcblx0XHRcdGNlbnRlclsxXSArICgzICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMV1bMV0pKSxcblx0XHRcdGNlbnRlclsxXSArIChtZWFuWzNdWzBdIC8gMikgKyAoMyAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzNdWzNdKSlcblx0XHRdLFxuXHRcdHBhcmVudDogY29udGFpbmVyLFxuXHRcdHBlcmNlbnRhZ2U6IE1hdGguYWJzKGNvcnJlbGF0aW9uWFcpLFxuXHRcdGNvbG9yXG5cdH0pO1xuXHRjb25zdCBjb3JyZWxhdGlvbllIID0gY292YXJpYW5jZVsxXVszXSAvIChNYXRoLnNxcnQoY292YXJpYW5jZVsxXVsxXSkgKiBNYXRoLnNxcnQoY292YXJpYW5jZVszXVszXSkpO1xuXHRjcmVhdGVDdXN0b21EYXNoZWRMaW5lKHtcblx0XHRjbGFzc05hbWU6ICdkYXNoZWRMaW5lJyxcblx0XHRiYm94OiBbXG5cdFx0XHRjZW50ZXJbMV0sXG5cdFx0XHRjZW50ZXJbMF0gKyAoMyAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzBdWzBdKSksXG5cdFx0XHRjZW50ZXJbMF0gKyAobWVhblsyXVswXSAvIDIpICsgKDMgKiBNYXRoLnNxcnQoY292YXJpYW5jZVsyXVsyXSkpXG5cdFx0XSxcblx0XHRwYXJlbnQ6IGNvbnRhaW5lcixcblx0XHRwZXJjZW50YWdlOiBNYXRoLmFicyhjb3JyZWxhdGlvbllIKSxcblx0XHRwb3NpdGlvbjogJ2hvcml6b250YWwnLFxuXHRcdGNvbG9yXG5cdH0pO1xuXHRjb25zdCBhcnJvd1JvdGF0aW9uID0gKC0xICogTWF0aC5hdGFuKG1lYW5bNF1bMF0gLyBtZWFuWzVdWzBdKSAqIDE4MCAvIE1hdGguUEkpIC0gNDU7XG5cdGNvbnN0IGFycm93U2NhbGUgPSBNYXRoLnNxcnQoKG1lYW5bNF1bMF0gKiogMikgKyAobWVhbls1XVswXSAqKiAyKSk7XG5cdGNyZWF0ZUFycm93KHtcblx0XHRjbGFzc05hbWU6ICdhcnJvdycsXG5cdFx0YmJveDogW1xuXHRcdFx0Y2VudGVyWzBdICsgNixcblx0XHRcdGNlbnRlclsxXSAtIDlcblx0XHRdLFxuXHRcdHBhcmVudDogY29udGFpbmVyLFxuXHRcdHJvdGF0aW9uQ29lZmZpY2llbnQ6IGFycm93Um90YXRpb24sXG5cdFx0c2NhbGU6IGFycm93U2NhbGUsXG5cdFx0Y29sb3Jcblx0fSk7XG5cdHBhcmVudC5hcHBlbmQoY29udGFpbmVyKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7Y2xhc3NOYW1lID0gJ3BvaW50JywgdGFnID0gJ2RpdicsIGJib3gsIHBhcmVudH0pIHtcblx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTsvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cdGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXHQvLyBJZiAoY29sb3IpIHtcblx0Ly8gXHRlbC5zdHlsZS5ib3JkZXIgPSBgMnB4IHNvbGlkICR7Y29sb3J9YCxcblx0Ly8gXHRlbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgJHtjb2xvcn1gXG5cdC8vIH1cblx0ZWxlbWVudC5zdHlsZS53aWR0aCA9IE1hdGgucm91bmQoYmJveFsyXSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLmhlaWdodCA9IE1hdGgucm91bmQoYmJveFszXSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLnRvcCA9IE1hdGgucm91bmQoYmJveFsxXSAtIChiYm94WzNdIC8gMikpICsgJ3B4Jztcblx0ZWxlbWVudC5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZChiYm94WzBdIC0gKGJib3hbMl0gLyAyKSkgKyAncHgnO1xuXHRwYXJlbnQuYXBwZW5kKGVsZW1lbnQpO1xuXHRyZXR1cm4gZWxlbWVudDtcbn07XG4iLCJjb25zdCB7S2FsbWFuRmlsdGVyfSA9IGthbG1hbkZpbHRlcjsvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cbmNvbnN0IG5vaXN5T2JzZXJ2YXRpb25zID0gcmVxdWlyZSgnLi9vYnNlcnZhdGlvbnMuanNvbicpLm9ic2VydmF0aW9ucztcbmNvbnN0IGtmT3B0aW9ucyA9IHJlcXVpcmUoJy4va2Ytb3B0aW9ucy5qcycpO1xuY29uc3QgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL3NoYXJlZC92aWV3cy9jcmVhdGUtZWxlbWVudCcpO1xuY29uc3QgY3JlYXRlR3JvdXBCb3hlcyA9IHJlcXVpcmUoJy4uL3NoYXJlZC92aWV3cy9jcmVhdGUtZ3JvdXAtYm94ZXMnKTtcblxuY29uc3Qga2YgPSBuZXcgS2FsbWFuRmlsdGVyKGtmT3B0aW9ucyk7XG5sZXQgcHJlZGljdGVkID0ga2YucHJlZGljdCgpO1xuXG5jb25zdCBpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmlrZXMnKTsvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cbi8vIENyZWF0ZSBhbGwgdGhlIGVsZW1lbnRzIG9mIHRoZSBwcmVkaWN0aW9uIG9yIGNvcnJlY3Rpb24gcGhhc2VcbmNvbnN0IGRlbGF5ID0gMjAwO1xuXG5sZXQgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xubGV0IHByZXZpb3VzQ29ycmVjdGVkID0gbnVsbDtcblxuY29uc3QgZGVsYXlQcm9taXNlID0gZGVsYXkgPT4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG5cdHNldFRpbWVvdXQocmVzb2x2ZSwgZGVsYXkpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRydW4oKSB7XG5cdFx0bm9pc3lPYnNlcnZhdGlvbnMuZm9yRWFjaCgoYm94LCBpbmRleCkgPT4ge1xuXHRcdFx0cHJvbWlzZSA9IHByb21pc2Vcblx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdHByZWRpY3RlZCA9IGtmLnByZWRpY3Qoe3ByZXZpb3VzQ29ycmVjdGVkfSk7XG5cdFx0XHRcdFx0Y29uc3Qge21lYW4sIGNvdmFyaWFuY2V9ID0gcHJlZGljdGVkO1xuXG5cdFx0XHRcdFx0Y3JlYXRlR3JvdXBCb3hlcyh7bWVhbiwgY292YXJpYW5jZSwgcGFyZW50OiBpbWcsIGNsYXNzTmFtZTogJ3ByZWRpY3RlZCcsIGNvbG9yOiAnYmx1ZSd9KTtcblxuXHRcdFx0XHRcdHJldHVybiBkZWxheVByb21pc2UoZGVsYXkpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQudGhlbigoYiA9PiB7XG5cdFx0XHRcdFx0Y3JlYXRlRWxlbWVudCh7XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdvYnNlcnZhdGlvbicsXG5cdFx0XHRcdFx0XHRiYm94OiBbXG5cdFx0XHRcdFx0XHRcdGJbMF0gKyAoYlsyXSAvIDIpLFxuXHRcdFx0XHRcdFx0XHRiWzFdICsgKGJbM10gLyAyKSxcblx0XHRcdFx0XHRcdFx0YlsyXSxcblx0XHRcdFx0XHRcdFx0YlszXVxuXHRcdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRcdHBhcmVudDogaW1nLFxuXHRcdFx0XHRcdFx0Y29sb3I6ICd3aGl0ZScsXG5cdFx0XHRcdFx0XHRsaW5lU3R5bGU6ICdzb2xpZCdcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHJldHVybiBkZWxheVByb21pc2UoZGVsYXkpO1xuXHRcdFx0XHR9KS5iaW5kKG51bGwsIGJveCwgaW5kZXgpKVxuXHRcdFx0XHQudGhlbigoYiA9PiB7XG5cdFx0XHRcdFx0cHJldmlvdXNDb3JyZWN0ZWQgPSBrZi5jb3JyZWN0KHtwcmVkaWN0ZWQsIG9ic2VydmF0aW9uOiBifSk7XG5cdFx0XHRcdFx0Y29uc3Qge21lYW4sIGNvdmFyaWFuY2V9ID0gcHJldmlvdXNDb3JyZWN0ZWQ7XG5cblx0XHRcdFx0XHRjcmVhdGVHcm91cEJveGVzKHttZWFuLCBjb3ZhcmlhbmNlLCBwYXJlbnQ6IGltZywgY2xhc3NOYW1lOiAnY29ycmVjdGVkJywgY29sb3I6ICdyZWQnfSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gZGVsYXlQcm9taXNlKGRlbGF5KTtcblx0XHRcdFx0fSkuYmluZChudWxsLCBib3gsIGluZGV4KSk7XG5cdFx0fSk7XG5cdH1cbn07XG4iXX0=
