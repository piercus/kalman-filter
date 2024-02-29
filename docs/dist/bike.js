require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const posVar = 100;
const timeStep = 0.2;
const sizeVar = 1;
const huge = 1e4;
module.exports = {
	observation: {
		dimension: 4,
		stateProjection: [
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
		],
		covariance: [posVar, posVar, sizeVar, sizeVar],
	},

	dynamic: {
		name: 'constant-acceleration',
		dimension: 12,
		init: {
			mean: [[900], [290], [100], [100], [-100], [0], [0], [0], [0], [0], [0], [0]],
			covariance: [
				huge,
				huge,
				huge,
				huge,
				huge,
				huge,
				huge,
				huge,
				huge,
				huge,
				huge,
				huge,
			],
		},
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
			sizeVar * (timeStep ** 4),
		],
	},
};

},{}],2:[function(require,module,exports){
module.exports={"observations":[[842,286,82,81],[714,184,92,80],[560,107,112,116],[418,94,96,110],[277,141,89,89],[146,200,88,72],[22,306,77,82]]}
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
	position = 'vertical',
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
	const urlString = 'data:image/svg+xml,%3csvg '
		+ 'width=\'100%25\' '
		+ 'height=\'100%25\' '
		+ 'xmlns=\'http://www.w3.org/2000/svg\'%3e%3crect '
		+ 'width=\'100%25\' '
		+ 'height=\'100%25\' '
		+ 'fill=\'none\' '
		+ `stroke='${color}' `
		+ 'stroke-width=\'4\' '
		+ `stroke-dasharray='10%2c${Math.floor(percentage * 100)}' `
		+ 'stroke-dashoffset=\'0\' '
		+ 'stroke-linecap=\'round\'/%3e%3c/svg%3e';

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
	const center = [
		mean[0][0] + (mean[2][0] / 2),
		mean[1][0] + (mean[3][0] / 2),
	];
	createElement({
		className: 'box',
		bbox: [center[0], center[1], mean[2][0], mean[3][0]],
		parent: container,
		color,
		lineStyle: 'solid',
	});
	createElement({
		className: 'box stdDev',
		bbox: [
			center[0],
			center[1],
			mean[2][0] + (2 * 3 * Math.sqrt(covariance[2][2])),
			mean[3][0] + (2 * 3 * Math.sqrt(covariance[3][3])),
		],
		parent: container,
		color,
	});
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
	const correlationXW = covariance[0][2] / (Math.sqrt(covariance[0][0]) * Math.sqrt(covariance[2][2]));
	createCustomDashedLine({
		className: 'dashedLine',
		bbox: [
			center[0],
			center[1] + (3 * Math.sqrt(covariance[1][1])),
			center[1] + (mean[3][0] / 2) + (3 * Math.sqrt(covariance[3][3])),
		],
		parent: container,
		percentage: Math.abs(correlationXW),
		color,
	});
	const correlationYH = covariance[1][3] / (Math.sqrt(covariance[1][1]) * Math.sqrt(covariance[3][3]));
	createCustomDashedLine({
		className: 'dashedLine',
		bbox: [
			center[1],
			center[0] + (3 * Math.sqrt(covariance[0][0])),
			center[0] + (mean[2][0] / 2) + (3 * Math.sqrt(covariance[2][2])),
		],
		parent: container,
		percentage: Math.abs(correlationYH),
		position: 'horizontal',
		color,
	});
	const arrowRotation = (-1 * Math.atan(mean[4][0] / mean[5][0]) * 180 / Math.PI) - 45;
	const arrowScale = Math.sqrt((mean[4][0] ** 2) + (mean[5][0] ** 2));
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
	return container;
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

},{}],"bike":[function(require,module,exports){
const {KalmanFilter} = kalmanFilter;// eslint-disable-line no-undef
const createElement = require('../shared/views/create-element');
const createGroupBoxes = require('../shared/views/create-group-boxes');
const noisyObservations = require('./observations.json').observations;
const kfOptions = require('./kf-options');

const kf = new KalmanFilter(kfOptions);
let predicted = kf.predict();

const img = document.querySelector('#bikes');// eslint-disable-line no-undef

// Create all the elements of the prediction or correction phase
const delay = 200;

let promise = Promise.resolve();
let running = false;
const delayPromise = delay => new Promise(resolve => {
	setTimeout(resolve, delay);
});

const els = [];

module.exports = {
	run() {
		if (running) {
			return;
		}

		running = true;
		let previousCorrected = null;
		let i = els.length;
		while (--i >= 0) {
			const element = els[i];
			element.remove();
			els.splice(i, 1);
		}

		for (const [index, box] of noisyObservations.entries()) {
			promise = promise
				.then(() => {
					predicted = kf.predict({previousCorrected});
					const {mean, covariance} = predicted;

					const element = createGroupBoxes({mean, covariance, parent: img, className: 'predicted', color: 'blue'});
					els.push(element);

					return delayPromise(delay);
				})
				.then((b => {
					const element = createElement({
						className: 'observation',
						bbox: [
							b[0] + (b[2] / 2),
							b[1] + (b[3] / 2),
							b[2],
							b[3],
						],
						parent: img,
						color: 'white',
						lineStyle: 'solid',
					});
					els.push(element);

					return delayPromise(delay);
				}).bind(null, box, index))
				.then((b => {
					previousCorrected = kf.correct({predicted, observation: b});
					const {mean, covariance} = previousCorrected;

					const element = createGroupBoxes({mean, covariance, parent: img, className: 'corrected', color: 'red'});
					els.push(element);

					return delayPromise(delay);
				}).bind(null, box, index));
		}

		promise.then(() => {
			running = false;
		});
	},
};

},{"../shared/views/create-element":5,"../shared/views/create-group-boxes":6,"./kf-options":1,"./observations.json":2}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy8ucG5wbS9icm93c2VyLXBhY2tANi4xLjAvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImRlbW8vYmlrZS9rZi1vcHRpb25zLmpzIiwiZGVtby9iaWtlL29ic2VydmF0aW9ucy5qc29uIiwiZGVtby9zaGFyZWQvdmlld3MvY3JlYXRlLWFycm93LmpzIiwiZGVtby9zaGFyZWQvdmlld3MvY3JlYXRlLWN1c3RvbS1kYXNoZWQtbGluZS5qcyIsImRlbW8vc2hhcmVkL3ZpZXdzL2NyZWF0ZS1lbGVtZW50LmpzIiwiZGVtby9zaGFyZWQvdmlld3MvY3JlYXRlLWdyb3VwLWJveGVzLmpzIiwiZGVtby9zaGFyZWQvdmlld3MvY3JlYXRlLXBvaW50LmpzIiwiZGVtby9iaWtlL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBwb3NWYXIgPSAxMDA7XG5jb25zdCB0aW1lU3RlcCA9IDAuMjtcbmNvbnN0IHNpemVWYXIgPSAxO1xuY29uc3QgaHVnZSA9IDFlNDtcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRvYnNlcnZhdGlvbjoge1xuXHRcdGRpbWVuc2lvbjogNCxcblx0XHRzdGF0ZVByb2plY3Rpb246IFtcblx0XHRcdFsxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHRcdFswLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHRcdFswLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHRcdFswLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcblx0XHRdLFxuXHRcdGNvdmFyaWFuY2U6IFtwb3NWYXIsIHBvc1Zhciwgc2l6ZVZhciwgc2l6ZVZhcl0sXG5cdH0sXG5cblx0ZHluYW1pYzoge1xuXHRcdG5hbWU6ICdjb25zdGFudC1hY2NlbGVyYXRpb24nLFxuXHRcdGRpbWVuc2lvbjogMTIsXG5cdFx0aW5pdDoge1xuXHRcdFx0bWVhbjogW1s5MDBdLCBbMjkwXSwgWzEwMF0sIFsxMDBdLCBbLTEwMF0sIFswXSwgWzBdLCBbMF0sIFswXSwgWzBdLCBbMF0sIFswXV0sXG5cdFx0XHRjb3ZhcmlhbmNlOiBbXG5cdFx0XHRcdGh1Z2UsXG5cdFx0XHRcdGh1Z2UsXG5cdFx0XHRcdGh1Z2UsXG5cdFx0XHRcdGh1Z2UsXG5cdFx0XHRcdGh1Z2UsXG5cdFx0XHRcdGh1Z2UsXG5cdFx0XHRcdGh1Z2UsXG5cdFx0XHRcdGh1Z2UsXG5cdFx0XHRcdGh1Z2UsXG5cdFx0XHRcdGh1Z2UsXG5cdFx0XHRcdGh1Z2UsXG5cdFx0XHRcdGh1Z2UsXG5cdFx0XHRdLFxuXHRcdH0sXG5cdFx0Y292YXJpYW5jZTogW1xuXHRcdFx0cG9zVmFyLFxuXHRcdFx0cG9zVmFyLFxuXHRcdFx0c2l6ZVZhcixcblx0XHRcdHNpemVWYXIsXG5cdFx0XHRwb3NWYXIgKiB0aW1lU3RlcCAqIHRpbWVTdGVwLFxuXHRcdFx0cG9zVmFyICogdGltZVN0ZXAgKiB0aW1lU3RlcCxcblx0XHRcdHNpemVWYXIgKiB0aW1lU3RlcCAqIHRpbWVTdGVwLFxuXHRcdFx0c2l6ZVZhciAqIHRpbWVTdGVwICogdGltZVN0ZXAsXG5cdFx0XHRwb3NWYXIgKiAodGltZVN0ZXAgKiogNCksXG5cdFx0XHRwb3NWYXIgKiAodGltZVN0ZXAgKiogNCksXG5cdFx0XHRzaXplVmFyICogKHRpbWVTdGVwICoqIDQpLFxuXHRcdFx0c2l6ZVZhciAqICh0aW1lU3RlcCAqKiA0KSxcblx0XHRdLFxuXHR9LFxufTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcIm9ic2VydmF0aW9uc1wiOltbODQyLDI4Niw4Miw4MV0sWzcxNCwxODQsOTIsODBdLFs1NjAsMTA3LDExMiwxMTZdLFs0MTgsOTQsOTYsMTEwXSxbMjc3LDE0MSw4OSw4OV0sWzE0NiwyMDAsODgsNzJdLFsyMiwzMDYsNzcsODJdXX0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7Y2xhc3NOYW1lLCB0YWcgPSAnZGl2JywgYmJveCwgcGFyZW50LCByb3RhdGlvbkNvZWZmaWNpZW50LCBzY2FsZSwgY29sb3J9KSB7XG5cdGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7Ly8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXHRlbGVtZW50LmlkID0gJ2Fycm93Jztcblx0ZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG5cdGVsZW1lbnQuc3R5bGUudG9wID0gTWF0aC5yb3VuZChiYm94WzFdKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUubGVmdCA9IE1hdGgucm91bmQoYmJveFswXSkgKyAncHgnO1xuXHRpZiAocm90YXRpb25Db2VmZmljaWVudCkge1xuXHRcdGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3JvdGF0aW9uQ29lZmZpY2llbnR9ZGVnKWA7XG5cdFx0ZWxlbWVudC5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSAnLTVweCAxMnB4Jztcblx0fVxuXG5cdGVsZW1lbnQuc3R5bGUuc2NhbGUgPSBzY2FsZTtcblx0ZWxlbWVudC5zdHlsZS5jb2xvciA9IGNvbG9yO1xuXHRwYXJlbnQuYXBwZW5kKGVsZW1lbnQpO1xuXHRyZXR1cm4gZWxlbWVudDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7XG5cdGNsYXNzTmFtZSxcblx0dGFnID0gJ2RpdicsXG5cdGJib3gsXG5cdHBhcmVudCxcblx0Y29sb3IsXG5cdHBlcmNlbnRhZ2UsXG5cdHBvc2l0aW9uID0gJ3ZlcnRpY2FsJyxcbn0pIHtcblx0Ly8gQmJveCBjb250YWlucyAzIGVsZW1lbnRzOiBsZWZ0LCB0b3AgYW5kIGJvdHRvbSBvZiB0aGUgZGFzaGVkIGxpbmUgb3IgdG9wLCBsZWZ0IGFuZCByaWdodFxuXHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpOy8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblx0Ly8gSWYgKGNvbG9yKSB7XG5cdC8vIFx0ZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3Jcblx0Ly8gfVxuXHRlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcblx0aWYgKHBvc2l0aW9uID09PSAndmVydGljYWwnKSB7XG5cdFx0ZWxlbWVudC5zdHlsZS53aWR0aCA9IDEgKyAncHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gTWF0aC5hYnMoYmJveFsxXSAtIGJib3hbMl0pICsgJ3B4Jztcblx0XHRlbGVtZW50LnN0eWxlLnRvcCA9IGJib3hbMV0gKyAncHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUubGVmdCA9IGJib3hbMF0gKyAncHgnO1xuXHR9XG5cblx0aWYgKHBvc2l0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcblx0XHRlbGVtZW50LnN0eWxlLmhlaWdodCA9IDEgKyAncHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUud2lkdGggPSBNYXRoLmFicyhiYm94WzFdIC0gYmJveFsyXSkgKyAncHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUubGVmdCA9IGJib3hbMV0gKyAncHgnO1xuXHRcdGVsZW1lbnQuc3R5bGUudG9wID0gYmJveFswXSArICdweCc7XG5cdH1cblxuXHQvLyBFbC5zdHlsZS5vcGFjaXR5ID0gMS1wZXJjZW50YWdlXG5cdGNvbnN0IHVybFN0cmluZyA9ICdkYXRhOmltYWdlL3N2Zyt4bWwsJTNjc3ZnICdcblx0XHQrICd3aWR0aD1cXCcxMDAlMjVcXCcgJ1xuXHRcdCsgJ2hlaWdodD1cXCcxMDAlMjVcXCcgJ1xuXHRcdCsgJ3htbG5zPVxcJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFwnJTNlJTNjcmVjdCAnXG5cdFx0KyAnd2lkdGg9XFwnMTAwJTI1XFwnICdcblx0XHQrICdoZWlnaHQ9XFwnMTAwJTI1XFwnICdcblx0XHQrICdmaWxsPVxcJ25vbmVcXCcgJ1xuXHRcdCsgYHN0cm9rZT0nJHtjb2xvcn0nIGBcblx0XHQrICdzdHJva2Utd2lkdGg9XFwnNFxcJyAnXG5cdFx0KyBgc3Ryb2tlLWRhc2hhcnJheT0nMTAlMmMke01hdGguZmxvb3IocGVyY2VudGFnZSAqIDEwMCl9JyBgXG5cdFx0KyAnc3Ryb2tlLWRhc2hvZmZzZXQ9XFwnMFxcJyAnXG5cdFx0KyAnc3Ryb2tlLWxpbmVjYXA9XFwncm91bmRcXCcvJTNlJTNjL3N2ZyUzZSc7XG5cblx0Y29uc3QgYmFja2dyb3VuZEltYWdlMSA9IGB1cmwoXCIke3VybFN0cmluZ31cIilgO1xuXG5cdC8vIENvbnN0IGJhY2tncm91bmRJbWFnZTIgPSBcInVybChcXFwiZGF0YTppbWFnZS9zdmcreG1sLCUzY3N2ZyB3aWR0aD0nMTAwJTI1JyBoZWlnaHQ9JzEwMCUyNScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyUzZSUzY3JlY3Qgd2lkdGg9JzEwMCUyNScgaGVpZ2h0PScxMDAlMjUnIGZpbGw9J25vbmUnIHN0cm9rZT0nJTIzMzMzJyBzdHJva2Utd2lkdGg9JzQnIHN0cm9rZS1kYXNoYXJyYXk9JzEwJTJjMjAnIHN0cm9rZS1kYXNob2Zmc2V0PScwJyBzdHJva2UtbGluZWNhcD0nc3F1YXJlJy8lM2UlM2Mvc3ZnJTNlXFxcIilcIlxuXHQvLyBjb25zb2xlLmxvZyhiYWNrZ3JvdW5kSW1hZ2UxLCBiYWNrZ3JvdW5kSW1hZ2UyLCBiYWNrZ3JvdW5kSW1hZ2UxPT09YmFja2dyb3VuZEltYWdlMilcblx0ZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBiYWNrZ3JvdW5kSW1hZ2UxO1xuXHRwYXJlbnQuYXBwZW5kKGVsZW1lbnQpO1xuXHRyZXR1cm4gZWxlbWVudDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7aWQsIGNsYXNzTmFtZSwgdGFnID0gJ2RpdicsIGJib3gsIHBhcmVudCwgcm90YXRpb25Db2VmZmljaWVudH0pIHtcblx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTsvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cdGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXHRlbGVtZW50LmlkID0gaWQ7XG5cdC8vIElmIChjb2xvciAmJiBsaW5lU3R5bGUpIHtcblx0Ly8gXHRlbC5zdHlsZS5ib3JkZXIgPSBgMXB4ICR7bGluZVN0eWxlfSAke2NvbG9yfWBcblx0Ly8gfVxuXHRlbGVtZW50LnN0eWxlLndpZHRoID0gTWF0aC5yb3VuZChiYm94WzJdKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gTWF0aC5yb3VuZChiYm94WzNdKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUudG9wID0gTWF0aC5yb3VuZChiYm94WzFdIC0gKGJib3hbM10gLyAyKSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKGJib3hbMF0gLSAoYmJveFsyXSAvIDIpKSArICdweCc7XG5cdGlmIChyb3RhdGlvbkNvZWZmaWNpZW50KSB7XG5cdFx0ZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7cm90YXRpb25Db2VmZmljaWVudH1kZWcpYDtcblx0fVxuXG5cdHBhcmVudC5hcHBlbmQoZWxlbWVudCk7XG5cdHJldHVybiBlbGVtZW50O1xufTtcbiIsImNvbnN0IGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuL2NyZWF0ZS1lbGVtZW50Jyk7XG5jb25zdCBjcmVhdGVQb2ludCA9IHJlcXVpcmUoJy4vY3JlYXRlLXBvaW50Jyk7XG5jb25zdCBjcmVhdGVBcnJvdyA9IHJlcXVpcmUoJy4vY3JlYXRlLWFycm93Jyk7XG5jb25zdCBjcmVhdGVDdXN0b21EYXNoZWRMaW5lID0gcmVxdWlyZSgnLi9jcmVhdGUtY3VzdG9tLWRhc2hlZC1saW5lJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHttZWFuLCBjb3ZhcmlhbmNlLCBjb2xvciwgcGFyZW50LCBjbGFzc05hbWUsIHRhZyA9ICdkaXYnfSkge1xuXHRjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXHRjb250YWluZXIuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXHRjb25zdCBjZW50ZXIgPSBbXG5cdFx0bWVhblswXVswXSArIChtZWFuWzJdWzBdIC8gMiksXG5cdFx0bWVhblsxXVswXSArIChtZWFuWzNdWzBdIC8gMiksXG5cdF07XG5cdGNyZWF0ZUVsZW1lbnQoe1xuXHRcdGNsYXNzTmFtZTogJ2JveCcsXG5cdFx0YmJveDogW2NlbnRlclswXSwgY2VudGVyWzFdLCBtZWFuWzJdWzBdLCBtZWFuWzNdWzBdXSxcblx0XHRwYXJlbnQ6IGNvbnRhaW5lcixcblx0XHRjb2xvcixcblx0XHRsaW5lU3R5bGU6ICdzb2xpZCcsXG5cdH0pO1xuXHRjcmVhdGVFbGVtZW50KHtcblx0XHRjbGFzc05hbWU6ICdib3ggc3RkRGV2Jyxcblx0XHRiYm94OiBbXG5cdFx0XHRjZW50ZXJbMF0sXG5cdFx0XHRjZW50ZXJbMV0sXG5cdFx0XHRtZWFuWzJdWzBdICsgKDIgKiAzICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMl1bMl0pKSxcblx0XHRcdG1lYW5bM11bMF0gKyAoMiAqIDMgKiBNYXRoLnNxcnQoY292YXJpYW5jZVszXVszXSkpLFxuXHRcdF0sXG5cdFx0cGFyZW50OiBjb250YWluZXIsXG5cdFx0Y29sb3IsXG5cdH0pO1xuXHRjcmVhdGVQb2ludCh7XG5cdFx0YmJveDogW2NlbnRlclswXSwgY2VudGVyWzFdLCAyLCAyXSxcblx0XHRwYXJlbnQ6IGNvbnRhaW5lcixcblx0XHRjb2xvcixcblx0fSk7XG5cdGNvbnN0IGNvcnJlbGF0aW9uWFkgPSBjb3ZhcmlhbmNlWzBdWzFdIC8gKE1hdGguc3FydChjb3ZhcmlhbmNlWzBdWzBdKSAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzFdWzFdKSk7XG5cdGNyZWF0ZUVsZW1lbnQoe1xuXHRcdGNsYXNzTmFtZTogJ2VsbGlwc2Ugc3RkRGV2Jyxcblx0XHRiYm94OiBbXG5cdFx0XHRjZW50ZXJbMF0sXG5cdFx0XHRjZW50ZXJbMV0sXG5cdFx0XHQyICogMyAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzBdWzBdKSxcblx0XHRcdDIgKiAzICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMV1bMV0pLFxuXHRcdF0sXG5cdFx0cGFyZW50OiBjb250YWluZXIsXG5cdFx0cm90YXRpb25Db2VmZmljaWVudDogY29ycmVsYXRpb25YWSxcblx0XHRjb2xvcixcblx0fSk7XG5cdGNvbnN0IGNvcnJlbGF0aW9uWFcgPSBjb3ZhcmlhbmNlWzBdWzJdIC8gKE1hdGguc3FydChjb3ZhcmlhbmNlWzBdWzBdKSAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzJdWzJdKSk7XG5cdGNyZWF0ZUN1c3RvbURhc2hlZExpbmUoe1xuXHRcdGNsYXNzTmFtZTogJ2Rhc2hlZExpbmUnLFxuXHRcdGJib3g6IFtcblx0XHRcdGNlbnRlclswXSxcblx0XHRcdGNlbnRlclsxXSArICgzICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMV1bMV0pKSxcblx0XHRcdGNlbnRlclsxXSArIChtZWFuWzNdWzBdIC8gMikgKyAoMyAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzNdWzNdKSksXG5cdFx0XSxcblx0XHRwYXJlbnQ6IGNvbnRhaW5lcixcblx0XHRwZXJjZW50YWdlOiBNYXRoLmFicyhjb3JyZWxhdGlvblhXKSxcblx0XHRjb2xvcixcblx0fSk7XG5cdGNvbnN0IGNvcnJlbGF0aW9uWUggPSBjb3ZhcmlhbmNlWzFdWzNdIC8gKE1hdGguc3FydChjb3ZhcmlhbmNlWzFdWzFdKSAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzNdWzNdKSk7XG5cdGNyZWF0ZUN1c3RvbURhc2hlZExpbmUoe1xuXHRcdGNsYXNzTmFtZTogJ2Rhc2hlZExpbmUnLFxuXHRcdGJib3g6IFtcblx0XHRcdGNlbnRlclsxXSxcblx0XHRcdGNlbnRlclswXSArICgzICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMF1bMF0pKSxcblx0XHRcdGNlbnRlclswXSArIChtZWFuWzJdWzBdIC8gMikgKyAoMyAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzJdWzJdKSksXG5cdFx0XSxcblx0XHRwYXJlbnQ6IGNvbnRhaW5lcixcblx0XHRwZXJjZW50YWdlOiBNYXRoLmFicyhjb3JyZWxhdGlvbllIKSxcblx0XHRwb3NpdGlvbjogJ2hvcml6b250YWwnLFxuXHRcdGNvbG9yLFxuXHR9KTtcblx0Y29uc3QgYXJyb3dSb3RhdGlvbiA9ICgtMSAqIE1hdGguYXRhbihtZWFuWzRdWzBdIC8gbWVhbls1XVswXSkgKiAxODAgLyBNYXRoLlBJKSAtIDQ1O1xuXHRjb25zdCBhcnJvd1NjYWxlID0gTWF0aC5zcXJ0KChtZWFuWzRdWzBdICoqIDIpICsgKG1lYW5bNV1bMF0gKiogMikpO1xuXHRjcmVhdGVBcnJvdyh7XG5cdFx0Y2xhc3NOYW1lOiAnYXJyb3cnLFxuXHRcdGJib3g6IFtcblx0XHRcdGNlbnRlclswXSArIDYsXG5cdFx0XHRjZW50ZXJbMV0gLSA5LFxuXHRcdF0sXG5cdFx0cGFyZW50OiBjb250YWluZXIsXG5cdFx0cm90YXRpb25Db2VmZmljaWVudDogYXJyb3dSb3RhdGlvbixcblx0XHRzY2FsZTogYXJyb3dTY2FsZSxcblx0XHRjb2xvcixcblx0fSk7XG5cdHBhcmVudC5hcHBlbmQoY29udGFpbmVyKTtcblx0cmV0dXJuIGNvbnRhaW5lcjtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7Y2xhc3NOYW1lID0gJ3BvaW50JywgdGFnID0gJ2RpdicsIGJib3gsIHBhcmVudH0pIHtcblx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTsvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cdGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXHQvLyBJZiAoY29sb3IpIHtcblx0Ly8gXHRlbC5zdHlsZS5ib3JkZXIgPSBgMnB4IHNvbGlkICR7Y29sb3J9YCxcblx0Ly8gXHRlbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgJHtjb2xvcn1gXG5cdC8vIH1cblx0ZWxlbWVudC5zdHlsZS53aWR0aCA9IE1hdGgucm91bmQoYmJveFsyXSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLmhlaWdodCA9IE1hdGgucm91bmQoYmJveFszXSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLnRvcCA9IE1hdGgucm91bmQoYmJveFsxXSAtIChiYm94WzNdIC8gMikpICsgJ3B4Jztcblx0ZWxlbWVudC5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZChiYm94WzBdIC0gKGJib3hbMl0gLyAyKSkgKyAncHgnO1xuXHRwYXJlbnQuYXBwZW5kKGVsZW1lbnQpO1xuXHRyZXR1cm4gZWxlbWVudDtcbn07XG4iLCJjb25zdCB7S2FsbWFuRmlsdGVyfSA9IGthbG1hbkZpbHRlcjsvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5jb25zdCBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vc2hhcmVkL3ZpZXdzL2NyZWF0ZS1lbGVtZW50Jyk7XG5jb25zdCBjcmVhdGVHcm91cEJveGVzID0gcmVxdWlyZSgnLi4vc2hhcmVkL3ZpZXdzL2NyZWF0ZS1ncm91cC1ib3hlcycpO1xuY29uc3Qgbm9pc3lPYnNlcnZhdGlvbnMgPSByZXF1aXJlKCcuL29ic2VydmF0aW9ucy5qc29uJykub2JzZXJ2YXRpb25zO1xuY29uc3Qga2ZPcHRpb25zID0gcmVxdWlyZSgnLi9rZi1vcHRpb25zJyk7XG5cbmNvbnN0IGtmID0gbmV3IEthbG1hbkZpbHRlcihrZk9wdGlvbnMpO1xubGV0IHByZWRpY3RlZCA9IGtmLnByZWRpY3QoKTtcblxuY29uc3QgaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jpa2VzJyk7Ly8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG4vLyBDcmVhdGUgYWxsIHRoZSBlbGVtZW50cyBvZiB0aGUgcHJlZGljdGlvbiBvciBjb3JyZWN0aW9uIHBoYXNlXG5jb25zdCBkZWxheSA9IDIwMDtcblxubGV0IHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbmxldCBydW5uaW5nID0gZmFsc2U7XG5jb25zdCBkZWxheVByb21pc2UgPSBkZWxheSA9PiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcblx0c2V0VGltZW91dChyZXNvbHZlLCBkZWxheSk7XG59KTtcblxuY29uc3QgZWxzID0gW107XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRydW4oKSB7XG5cdFx0aWYgKHJ1bm5pbmcpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRydW5uaW5nID0gdHJ1ZTtcblx0XHRsZXQgcHJldmlvdXNDb3JyZWN0ZWQgPSBudWxsO1xuXHRcdGxldCBpID0gZWxzLmxlbmd0aDtcblx0XHR3aGlsZSAoLS1pID49IDApIHtcblx0XHRcdGNvbnN0IGVsZW1lbnQgPSBlbHNbaV07XG5cdFx0XHRlbGVtZW50LnJlbW92ZSgpO1xuXHRcdFx0ZWxzLnNwbGljZShpLCAxKTtcblx0XHR9XG5cblx0XHRmb3IgKGNvbnN0IFtpbmRleCwgYm94XSBvZiBub2lzeU9ic2VydmF0aW9ucy5lbnRyaWVzKCkpIHtcblx0XHRcdHByb21pc2UgPSBwcm9taXNlXG5cdFx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRwcmVkaWN0ZWQgPSBrZi5wcmVkaWN0KHtwcmV2aW91c0NvcnJlY3RlZH0pO1xuXHRcdFx0XHRcdGNvbnN0IHttZWFuLCBjb3ZhcmlhbmNlfSA9IHByZWRpY3RlZDtcblxuXHRcdFx0XHRcdGNvbnN0IGVsZW1lbnQgPSBjcmVhdGVHcm91cEJveGVzKHttZWFuLCBjb3ZhcmlhbmNlLCBwYXJlbnQ6IGltZywgY2xhc3NOYW1lOiAncHJlZGljdGVkJywgY29sb3I6ICdibHVlJ30pO1xuXHRcdFx0XHRcdGVscy5wdXNoKGVsZW1lbnQpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIGRlbGF5UHJvbWlzZShkZWxheSk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKChiID0+IHtcblx0XHRcdFx0XHRjb25zdCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCh7XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdvYnNlcnZhdGlvbicsXG5cdFx0XHRcdFx0XHRiYm94OiBbXG5cdFx0XHRcdFx0XHRcdGJbMF0gKyAoYlsyXSAvIDIpLFxuXHRcdFx0XHRcdFx0XHRiWzFdICsgKGJbM10gLyAyKSxcblx0XHRcdFx0XHRcdFx0YlsyXSxcblx0XHRcdFx0XHRcdFx0YlszXSxcblx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRwYXJlbnQ6IGltZyxcblx0XHRcdFx0XHRcdGNvbG9yOiAnd2hpdGUnLFxuXHRcdFx0XHRcdFx0bGluZVN0eWxlOiAnc29saWQnLFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGVscy5wdXNoKGVsZW1lbnQpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIGRlbGF5UHJvbWlzZShkZWxheSk7XG5cdFx0XHRcdH0pLmJpbmQobnVsbCwgYm94LCBpbmRleCkpXG5cdFx0XHRcdC50aGVuKChiID0+IHtcblx0XHRcdFx0XHRwcmV2aW91c0NvcnJlY3RlZCA9IGtmLmNvcnJlY3Qoe3ByZWRpY3RlZCwgb2JzZXJ2YXRpb246IGJ9KTtcblx0XHRcdFx0XHRjb25zdCB7bWVhbiwgY292YXJpYW5jZX0gPSBwcmV2aW91c0NvcnJlY3RlZDtcblxuXHRcdFx0XHRcdGNvbnN0IGVsZW1lbnQgPSBjcmVhdGVHcm91cEJveGVzKHttZWFuLCBjb3ZhcmlhbmNlLCBwYXJlbnQ6IGltZywgY2xhc3NOYW1lOiAnY29ycmVjdGVkJywgY29sb3I6ICdyZWQnfSk7XG5cdFx0XHRcdFx0ZWxzLnB1c2goZWxlbWVudCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gZGVsYXlQcm9taXNlKGRlbGF5KTtcblx0XHRcdFx0fSkuYmluZChudWxsLCBib3gsIGluZGV4KSk7XG5cdFx0fVxuXG5cdFx0cHJvbWlzZS50aGVuKCgpID0+IHtcblx0XHRcdHJ1bm5pbmcgPSBmYWxzZTtcblx0XHR9KTtcblx0fSxcbn07XG4iXX0=
