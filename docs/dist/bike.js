require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
			[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
		],
		covariance: [posVar, posVar, sizeVar, sizeVar],
	},

	dynamic: {
		name: 'constant-acceleration',
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
	const center = [mean[0][0] + (mean[2][0] / 2), mean[1][0] + (mean[3][0] / 2)];
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
const kfOptions = require('./kf-options.js');
const noisyObservations = require('./observations.json').observations;

const kf = new KalmanFilter(kfOptions);
let predicted = kf.predict();

const img = document.querySelector('#bikes');// eslint-disable-line no-undef

// Create all the elements of the prediction or correction phase
const delay = 200;

let promise = Promise.resolve();

const delayPromise = delay => new Promise(resolve => {
	setTimeout(resolve, delay);
});

const els = [];

module.exports = {
	run() {
		let previousCorrected = null;
		let i = els.length;
		while (i-- >= 0) {
			const el = els[i];
			el.remove();
			els.splice(i, 1);
		}

		for (const [index, box] of noisyObservations.entries()) {
			promise = promise
				.then(() => {
					console.log(previousCorrected.mean);
					predicted = kf.predict({previousCorrected});
					const {mean, covariance} = predicted;

					const element = createGroupBoxes({mean, covariance, parent: img, className: 'predicted', color: 'blue'});
					els.append(element);

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
					els.append(element);

					return delayPromise(delay);
				}).bind(null, box, index))
				.then((b => {
					previousCorrected = kf.correct({predicted, observation: b});
					const {mean, covariance} = previousCorrected;

					const element = createGroupBoxes({mean, covariance, parent: img, className: 'corrected', color: 'red'});
					els.append(element);

					return delayPromise(delay);
				}).bind(null, box, index));
		}
	},
};

},{"../shared/views/create-element":5,"../shared/views/create-group-boxes":6,"./kf-options.js":1,"./observations.json":2}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vL2Jpa2Uva2Ytb3B0aW9ucy5qcyIsImRlbW8vYmlrZS9vYnNlcnZhdGlvbnMuanNvbiIsImRlbW8vc2hhcmVkL3ZpZXdzL2NyZWF0ZS1hcnJvdy5qcyIsImRlbW8vc2hhcmVkL3ZpZXdzL2NyZWF0ZS1jdXN0b20tZGFzaGVkLWxpbmUuanMiLCJkZW1vL3NoYXJlZC92aWV3cy9jcmVhdGUtZWxlbWVudC5qcyIsImRlbW8vc2hhcmVkL3ZpZXdzL2NyZWF0ZS1ncm91cC1ib3hlcy5qcyIsImRlbW8vc2hhcmVkL3ZpZXdzL2NyZWF0ZS1wb2ludC5qcyIsImRlbW8vYmlrZS9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBwb3NWYXIgPSAxMDA7XG5jb25zdCB0aW1lU3RlcCA9IDAuMjtcbmNvbnN0IHNpemVWYXIgPSAxO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0b2JzZXJ2YXRpb246IHtcblx0XHRkaW1lbnNpb246IDQsXG5cdFx0c3RhdGVQcm9qZWN0aW9uOiBbXG5cdFx0XHRbMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0XHRbMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0XHRbMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0XHRbMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXG5cdFx0XSxcblx0XHRjb3ZhcmlhbmNlOiBbcG9zVmFyLCBwb3NWYXIsIHNpemVWYXIsIHNpemVWYXJdLFxuXHR9LFxuXG5cdGR5bmFtaWM6IHtcblx0XHRuYW1lOiAnY29uc3RhbnQtYWNjZWxlcmF0aW9uJyxcblx0XHRkaW1lbnNpb246IDEyLFxuXHRcdGNvdmFyaWFuY2U6IFtcblx0XHRcdHBvc1Zhcixcblx0XHRcdHBvc1Zhcixcblx0XHRcdHNpemVWYXIsXG5cdFx0XHRzaXplVmFyLFxuXHRcdFx0cG9zVmFyICogdGltZVN0ZXAgKiB0aW1lU3RlcCxcblx0XHRcdHBvc1ZhciAqIHRpbWVTdGVwICogdGltZVN0ZXAsXG5cdFx0XHRzaXplVmFyICogdGltZVN0ZXAgKiB0aW1lU3RlcCxcblx0XHRcdHNpemVWYXIgKiB0aW1lU3RlcCAqIHRpbWVTdGVwLFxuXHRcdFx0cG9zVmFyICogKHRpbWVTdGVwICoqIDQpLFxuXHRcdFx0cG9zVmFyICogKHRpbWVTdGVwICoqIDQpLFxuXHRcdFx0c2l6ZVZhciAqICh0aW1lU3RlcCAqKiA0KSxcblx0XHRcdHNpemVWYXIgKiAodGltZVN0ZXAgKiogNCksXG5cdFx0XSxcblx0fSxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cz17XCJvYnNlcnZhdGlvbnNcIjpbWzg0MiwyODYsODIsODFdLFs3MTQsMTg0LDkyLDgwXSxbNTYwLDEwNywxMTIsMTE2XSxbNDE4LDk0LDk2LDExMF0sWzI3NywxNDEsODksODldLFsxNDYsMjAwLDg4LDcyXSxbMjIsMzA2LDc3LDgyXV19IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe2NsYXNzTmFtZSwgdGFnID0gJ2RpdicsIGJib3gsIHBhcmVudCwgcm90YXRpb25Db2VmZmljaWVudCwgc2NhbGUsIGNvbG9yfSkge1xuXHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpOy8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblx0ZWxlbWVudC5pZCA9ICdhcnJvdyc7XG5cdGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXHRlbGVtZW50LnN0eWxlLnRvcCA9IE1hdGgucm91bmQoYmJveFsxXSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKGJib3hbMF0pICsgJ3B4Jztcblx0aWYgKHJvdGF0aW9uQ29lZmZpY2llbnQpIHtcblx0XHRlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHtyb3RhdGlvbkNvZWZmaWNpZW50fWRlZylgO1xuXHRcdGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gJy01cHggMTJweCc7XG5cdH1cblxuXHRlbGVtZW50LnN0eWxlLnNjYWxlID0gc2NhbGU7XG5cdGVsZW1lbnQuc3R5bGUuY29sb3IgPSBjb2xvcjtcblx0cGFyZW50LmFwcGVuZChlbGVtZW50KTtcblx0cmV0dXJuIGVsZW1lbnQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe1xuXHRjbGFzc05hbWUsXG5cdHRhZyA9ICdkaXYnLFxuXHRiYm94LFxuXHRwYXJlbnQsXG5cdGNvbG9yLFxuXHRwZXJjZW50YWdlLFxuXHRwb3NpdGlvbiA9ICd2ZXJ0aWNhbCcsXG59KSB7XG5cdC8vIEJib3ggY29udGFpbnMgMyBlbGVtZW50czogbGVmdCwgdG9wIGFuZCBib3R0b20gb2YgdGhlIGRhc2hlZCBsaW5lIG9yIHRvcCwgbGVmdCBhbmQgcmlnaHRcblx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTsvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cdC8vIElmIChjb2xvcikge1xuXHQvLyBcdGVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yXG5cdC8vIH1cblx0ZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG5cdGlmIChwb3NpdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuXHRcdGVsZW1lbnQuc3R5bGUud2lkdGggPSAxICsgJ3B4Jztcblx0XHRlbGVtZW50LnN0eWxlLmhlaWdodCA9IE1hdGguYWJzKGJib3hbMV0gLSBiYm94WzJdKSArICdweCc7XG5cdFx0ZWxlbWVudC5zdHlsZS50b3AgPSBiYm94WzFdICsgJ3B4Jztcblx0XHRlbGVtZW50LnN0eWxlLmxlZnQgPSBiYm94WzBdICsgJ3B4Jztcblx0fVxuXG5cdGlmIChwb3NpdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG5cdFx0ZWxlbWVudC5zdHlsZS5oZWlnaHQgPSAxICsgJ3B4Jztcblx0XHRlbGVtZW50LnN0eWxlLndpZHRoID0gTWF0aC5hYnMoYmJveFsxXSAtIGJib3hbMl0pICsgJ3B4Jztcblx0XHRlbGVtZW50LnN0eWxlLmxlZnQgPSBiYm94WzFdICsgJ3B4Jztcblx0XHRlbGVtZW50LnN0eWxlLnRvcCA9IGJib3hbMF0gKyAncHgnO1xuXHR9XG5cblx0Ly8gRWwuc3R5bGUub3BhY2l0eSA9IDEtcGVyY2VudGFnZVxuXHRjb25zdCB1cmxTdHJpbmcgPSAnZGF0YTppbWFnZS9zdmcreG1sLCUzY3N2ZyAnXG5cdFx0KyAnd2lkdGg9XFwnMTAwJTI1XFwnICdcblx0XHQrICdoZWlnaHQ9XFwnMTAwJTI1XFwnICdcblx0XHQrICd4bWxucz1cXCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcJyUzZSUzY3JlY3QgJ1xuXHRcdCsgJ3dpZHRoPVxcJzEwMCUyNVxcJyAnXG5cdFx0KyAnaGVpZ2h0PVxcJzEwMCUyNVxcJyAnXG5cdFx0KyAnZmlsbD1cXCdub25lXFwnICdcblx0XHQrIGBzdHJva2U9JyR7Y29sb3J9JyBgXG5cdFx0KyAnc3Ryb2tlLXdpZHRoPVxcJzRcXCcgJ1xuXHRcdCsgYHN0cm9rZS1kYXNoYXJyYXk9JzEwJTJjJHtNYXRoLmZsb29yKHBlcmNlbnRhZ2UgKiAxMDApfScgYFxuXHRcdCsgJ3N0cm9rZS1kYXNob2Zmc2V0PVxcJzBcXCcgJ1xuXHRcdCsgJ3N0cm9rZS1saW5lY2FwPVxcJ3JvdW5kXFwnLyUzZSUzYy9zdmclM2UnO1xuXG5cdGNvbnN0IGJhY2tncm91bmRJbWFnZTEgPSBgdXJsKFwiJHt1cmxTdHJpbmd9XCIpYDtcblxuXHQvLyBDb25zdCBiYWNrZ3JvdW5kSW1hZ2UyID0gXCJ1cmwoXFxcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM2Nzdmcgd2lkdGg9JzEwMCUyNScgaGVpZ2h0PScxMDAlMjUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyclM2UlM2NyZWN0IHdpZHRoPScxMDAlMjUnIGhlaWdodD0nMTAwJTI1JyBmaWxsPSdub25lJyBzdHJva2U9JyUyMzMzMycgc3Ryb2tlLXdpZHRoPSc0JyBzdHJva2UtZGFzaGFycmF5PScxMCUyYzIwJyBzdHJva2UtZGFzaG9mZnNldD0nMCcgc3Ryb2tlLWxpbmVjYXA9J3NxdWFyZScvJTNlJTNjL3N2ZyUzZVxcXCIpXCJcblx0Ly8gY29uc29sZS5sb2coYmFja2dyb3VuZEltYWdlMSwgYmFja2dyb3VuZEltYWdlMiwgYmFja2dyb3VuZEltYWdlMT09PWJhY2tncm91bmRJbWFnZTIpXG5cdGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYmFja2dyb3VuZEltYWdlMTtcblx0cGFyZW50LmFwcGVuZChlbGVtZW50KTtcblx0cmV0dXJuIGVsZW1lbnQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe2lkLCBjbGFzc05hbWUsIHRhZyA9ICdkaXYnLCBiYm94LCBwYXJlbnQsIHJvdGF0aW9uQ29lZmZpY2llbnR9KSB7XG5cdGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7Ly8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXHRlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcblx0ZWxlbWVudC5pZCA9IGlkO1xuXHQvLyBJZiAoY29sb3IgJiYgbGluZVN0eWxlKSB7XG5cdC8vIFx0ZWwuc3R5bGUuYm9yZGVyID0gYDFweCAke2xpbmVTdHlsZX0gJHtjb2xvcn1gXG5cdC8vIH1cblx0ZWxlbWVudC5zdHlsZS53aWR0aCA9IE1hdGgucm91bmQoYmJveFsyXSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLmhlaWdodCA9IE1hdGgucm91bmQoYmJveFszXSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLnRvcCA9IE1hdGgucm91bmQoYmJveFsxXSAtIChiYm94WzNdIC8gMikpICsgJ3B4Jztcblx0ZWxlbWVudC5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZChiYm94WzBdIC0gKGJib3hbMl0gLyAyKSkgKyAncHgnO1xuXHRpZiAocm90YXRpb25Db2VmZmljaWVudCkge1xuXHRcdGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3JvdGF0aW9uQ29lZmZpY2llbnR9ZGVnKWA7XG5cdH1cblxuXHRwYXJlbnQuYXBwZW5kKGVsZW1lbnQpO1xuXHRyZXR1cm4gZWxlbWVudDtcbn07XG4iLCJjb25zdCBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi9jcmVhdGUtZWxlbWVudCcpO1xuY29uc3QgY3JlYXRlUG9pbnQgPSByZXF1aXJlKCcuL2NyZWF0ZS1wb2ludCcpO1xuY29uc3QgY3JlYXRlQXJyb3cgPSByZXF1aXJlKCcuL2NyZWF0ZS1hcnJvdycpO1xuY29uc3QgY3JlYXRlQ3VzdG9tRGFzaGVkTGluZSA9IHJlcXVpcmUoJy4vY3JlYXRlLWN1c3RvbS1kYXNoZWQtbGluZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7bWVhbiwgY292YXJpYW5jZSwgY29sb3IsIHBhcmVudCwgY2xhc3NOYW1lLCB0YWcgPSAnZGl2J30pIHtcblx0Y29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblx0Y29udGFpbmVyLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcblx0Y29uc3QgY2VudGVyID0gW21lYW5bMF1bMF0gKyAobWVhblsyXVswXSAvIDIpLCBtZWFuWzFdWzBdICsgKG1lYW5bM11bMF0gLyAyKV07XG5cdGNyZWF0ZUVsZW1lbnQoe1xuXHRcdGNsYXNzTmFtZTogJ2JveCcsXG5cdFx0YmJveDogW2NlbnRlclswXSwgY2VudGVyWzFdLCBtZWFuWzJdWzBdLCBtZWFuWzNdWzBdXSxcblx0XHRwYXJlbnQ6IGNvbnRhaW5lcixcblx0XHRjb2xvcixcblx0XHRsaW5lU3R5bGU6ICdzb2xpZCcsXG5cdH0pO1xuXHRjcmVhdGVFbGVtZW50KHtcblx0XHRjbGFzc05hbWU6ICdib3ggc3RkRGV2Jyxcblx0XHRiYm94OiBbXG5cdFx0XHRjZW50ZXJbMF0sXG5cdFx0XHRjZW50ZXJbMV0sXG5cdFx0XHRtZWFuWzJdWzBdICsgKDIgKiAzICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMl1bMl0pKSxcblx0XHRcdG1lYW5bM11bMF0gKyAoMiAqIDMgKiBNYXRoLnNxcnQoY292YXJpYW5jZVszXVszXSkpLFxuXHRcdF0sXG5cdFx0cGFyZW50OiBjb250YWluZXIsXG5cdFx0Y29sb3IsXG5cdH0pO1xuXHRjcmVhdGVQb2ludCh7XG5cdFx0YmJveDogW2NlbnRlclswXSwgY2VudGVyWzFdLCAyLCAyXSxcblx0XHRwYXJlbnQ6IGNvbnRhaW5lcixcblx0XHRjb2xvcixcblx0fSk7XG5cdGNvbnN0IGNvcnJlbGF0aW9uWFkgPSBjb3ZhcmlhbmNlWzBdWzFdIC8gKE1hdGguc3FydChjb3ZhcmlhbmNlWzBdWzBdKSAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzFdWzFdKSk7XG5cdGNyZWF0ZUVsZW1lbnQoe1xuXHRcdGNsYXNzTmFtZTogJ2VsbGlwc2Ugc3RkRGV2Jyxcblx0XHRiYm94OiBbXG5cdFx0XHRjZW50ZXJbMF0sXG5cdFx0XHRjZW50ZXJbMV0sXG5cdFx0XHQyICogMyAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzBdWzBdKSxcblx0XHRcdDIgKiAzICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMV1bMV0pLFxuXHRcdF0sXG5cdFx0cGFyZW50OiBjb250YWluZXIsXG5cdFx0cm90YXRpb25Db2VmZmljaWVudDogY29ycmVsYXRpb25YWSxcblx0XHRjb2xvcixcblx0fSk7XG5cdGNvbnN0IGNvcnJlbGF0aW9uWFcgPSBjb3ZhcmlhbmNlWzBdWzJdIC8gKE1hdGguc3FydChjb3ZhcmlhbmNlWzBdWzBdKSAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzJdWzJdKSk7XG5cdGNyZWF0ZUN1c3RvbURhc2hlZExpbmUoe1xuXHRcdGNsYXNzTmFtZTogJ2Rhc2hlZExpbmUnLFxuXHRcdGJib3g6IFtcblx0XHRcdGNlbnRlclswXSxcblx0XHRcdGNlbnRlclsxXSArICgzICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMV1bMV0pKSxcblx0XHRcdGNlbnRlclsxXSArIChtZWFuWzNdWzBdIC8gMikgKyAoMyAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzNdWzNdKSksXG5cdFx0XSxcblx0XHRwYXJlbnQ6IGNvbnRhaW5lcixcblx0XHRwZXJjZW50YWdlOiBNYXRoLmFicyhjb3JyZWxhdGlvblhXKSxcblx0XHRjb2xvcixcblx0fSk7XG5cdGNvbnN0IGNvcnJlbGF0aW9uWUggPSBjb3ZhcmlhbmNlWzFdWzNdIC8gKE1hdGguc3FydChjb3ZhcmlhbmNlWzFdWzFdKSAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzNdWzNdKSk7XG5cdGNyZWF0ZUN1c3RvbURhc2hlZExpbmUoe1xuXHRcdGNsYXNzTmFtZTogJ2Rhc2hlZExpbmUnLFxuXHRcdGJib3g6IFtcblx0XHRcdGNlbnRlclsxXSxcblx0XHRcdGNlbnRlclswXSArICgzICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMF1bMF0pKSxcblx0XHRcdGNlbnRlclswXSArIChtZWFuWzJdWzBdIC8gMikgKyAoMyAqIE1hdGguc3FydChjb3ZhcmlhbmNlWzJdWzJdKSksXG5cdFx0XSxcblx0XHRwYXJlbnQ6IGNvbnRhaW5lcixcblx0XHRwZXJjZW50YWdlOiBNYXRoLmFicyhjb3JyZWxhdGlvbllIKSxcblx0XHRwb3NpdGlvbjogJ2hvcml6b250YWwnLFxuXHRcdGNvbG9yLFxuXHR9KTtcblx0Y29uc3QgYXJyb3dSb3RhdGlvbiA9ICgtMSAqIE1hdGguYXRhbihtZWFuWzRdWzBdIC8gbWVhbls1XVswXSkgKiAxODAgLyBNYXRoLlBJKSAtIDQ1O1xuXHRjb25zdCBhcnJvd1NjYWxlID0gTWF0aC5zcXJ0KChtZWFuWzRdWzBdICoqIDIpICsgKG1lYW5bNV1bMF0gKiogMikpO1xuXHRjcmVhdGVBcnJvdyh7XG5cdFx0Y2xhc3NOYW1lOiAnYXJyb3cnLFxuXHRcdGJib3g6IFtcblx0XHRcdGNlbnRlclswXSArIDYsXG5cdFx0XHRjZW50ZXJbMV0gLSA5LFxuXHRcdF0sXG5cdFx0cGFyZW50OiBjb250YWluZXIsXG5cdFx0cm90YXRpb25Db2VmZmljaWVudDogYXJyb3dSb3RhdGlvbixcblx0XHRzY2FsZTogYXJyb3dTY2FsZSxcblx0XHRjb2xvcixcblx0fSk7XG5cdHBhcmVudC5hcHBlbmQoY29udGFpbmVyKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh7Y2xhc3NOYW1lID0gJ3BvaW50JywgdGFnID0gJ2RpdicsIGJib3gsIHBhcmVudH0pIHtcblx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTsvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cdGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXHQvLyBJZiAoY29sb3IpIHtcblx0Ly8gXHRlbC5zdHlsZS5ib3JkZXIgPSBgMnB4IHNvbGlkICR7Y29sb3J9YCxcblx0Ly8gXHRlbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgJHtjb2xvcn1gXG5cdC8vIH1cblx0ZWxlbWVudC5zdHlsZS53aWR0aCA9IE1hdGgucm91bmQoYmJveFsyXSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLmhlaWdodCA9IE1hdGgucm91bmQoYmJveFszXSkgKyAncHgnO1xuXHRlbGVtZW50LnN0eWxlLnRvcCA9IE1hdGgucm91bmQoYmJveFsxXSAtIChiYm94WzNdIC8gMikpICsgJ3B4Jztcblx0ZWxlbWVudC5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZChiYm94WzBdIC0gKGJib3hbMl0gLyAyKSkgKyAncHgnO1xuXHRwYXJlbnQuYXBwZW5kKGVsZW1lbnQpO1xuXHRyZXR1cm4gZWxlbWVudDtcbn07XG4iLCJjb25zdCB7S2FsbWFuRmlsdGVyfSA9IGthbG1hbkZpbHRlcjsvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5jb25zdCBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vc2hhcmVkL3ZpZXdzL2NyZWF0ZS1lbGVtZW50Jyk7XG5jb25zdCBjcmVhdGVHcm91cEJveGVzID0gcmVxdWlyZSgnLi4vc2hhcmVkL3ZpZXdzL2NyZWF0ZS1ncm91cC1ib3hlcycpO1xuY29uc3Qga2ZPcHRpb25zID0gcmVxdWlyZSgnLi9rZi1vcHRpb25zLmpzJyk7XG5jb25zdCBub2lzeU9ic2VydmF0aW9ucyA9IHJlcXVpcmUoJy4vb2JzZXJ2YXRpb25zLmpzb24nKS5vYnNlcnZhdGlvbnM7XG5cbmNvbnN0IGtmID0gbmV3IEthbG1hbkZpbHRlcihrZk9wdGlvbnMpO1xubGV0IHByZWRpY3RlZCA9IGtmLnByZWRpY3QoKTtcblxuY29uc3QgaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jpa2VzJyk7Ly8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG4vLyBDcmVhdGUgYWxsIHRoZSBlbGVtZW50cyBvZiB0aGUgcHJlZGljdGlvbiBvciBjb3JyZWN0aW9uIHBoYXNlXG5jb25zdCBkZWxheSA9IDIwMDtcblxubGV0IHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcblxuY29uc3QgZGVsYXlQcm9taXNlID0gZGVsYXkgPT4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG5cdHNldFRpbWVvdXQocmVzb2x2ZSwgZGVsYXkpO1xufSk7XG5cbmNvbnN0IGVscyA9IFtdO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0cnVuKCkge1xuXHRcdGxldCBwcmV2aW91c0NvcnJlY3RlZCA9IG51bGw7XG5cdFx0bGV0IGkgPSBlbHMubGVuZ3RoO1xuXHRcdHdoaWxlIChpLS0gPj0gMCkge1xuXHRcdFx0Y29uc3QgZWwgPSBlbHNbaV07XG5cdFx0XHRlbC5yZW1vdmUoKTtcblx0XHRcdGVscy5zcGxpY2UoaSwgMSk7XG5cdFx0fVxuXG5cdFx0Zm9yIChjb25zdCBbaW5kZXgsIGJveF0gb2Ygbm9pc3lPYnNlcnZhdGlvbnMuZW50cmllcygpKSB7XG5cdFx0XHRwcm9taXNlID0gcHJvbWlzZVxuXHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2cocHJldmlvdXNDb3JyZWN0ZWQubWVhbik7XG5cdFx0XHRcdFx0cHJlZGljdGVkID0ga2YucHJlZGljdCh7cHJldmlvdXNDb3JyZWN0ZWR9KTtcblx0XHRcdFx0XHRjb25zdCB7bWVhbiwgY292YXJpYW5jZX0gPSBwcmVkaWN0ZWQ7XG5cblx0XHRcdFx0XHRjb25zdCBlbGVtZW50ID0gY3JlYXRlR3JvdXBCb3hlcyh7bWVhbiwgY292YXJpYW5jZSwgcGFyZW50OiBpbWcsIGNsYXNzTmFtZTogJ3ByZWRpY3RlZCcsIGNvbG9yOiAnYmx1ZSd9KTtcblx0XHRcdFx0XHRlbHMuYXBwZW5kKGVsZW1lbnQpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIGRlbGF5UHJvbWlzZShkZWxheSk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKChiID0+IHtcblx0XHRcdFx0XHRjb25zdCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCh7XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdvYnNlcnZhdGlvbicsXG5cdFx0XHRcdFx0XHRiYm94OiBbXG5cdFx0XHRcdFx0XHRcdGJbMF0gKyAoYlsyXSAvIDIpLFxuXHRcdFx0XHRcdFx0XHRiWzFdICsgKGJbM10gLyAyKSxcblx0XHRcdFx0XHRcdFx0YlsyXSxcblx0XHRcdFx0XHRcdFx0YlszXSxcblx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRwYXJlbnQ6IGltZyxcblx0XHRcdFx0XHRcdGNvbG9yOiAnd2hpdGUnLFxuXHRcdFx0XHRcdFx0bGluZVN0eWxlOiAnc29saWQnLFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGVscy5hcHBlbmQoZWxlbWVudCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gZGVsYXlQcm9taXNlKGRlbGF5KTtcblx0XHRcdFx0fSkuYmluZChudWxsLCBib3gsIGluZGV4KSlcblx0XHRcdFx0LnRoZW4oKGIgPT4ge1xuXHRcdFx0XHRcdHByZXZpb3VzQ29ycmVjdGVkID0ga2YuY29ycmVjdCh7cHJlZGljdGVkLCBvYnNlcnZhdGlvbjogYn0pO1xuXHRcdFx0XHRcdGNvbnN0IHttZWFuLCBjb3ZhcmlhbmNlfSA9IHByZXZpb3VzQ29ycmVjdGVkO1xuXG5cdFx0XHRcdFx0Y29uc3QgZWxlbWVudCA9IGNyZWF0ZUdyb3VwQm94ZXMoe21lYW4sIGNvdmFyaWFuY2UsIHBhcmVudDogaW1nLCBjbGFzc05hbWU6ICdjb3JyZWN0ZWQnLCBjb2xvcjogJ3JlZCd9KTtcblx0XHRcdFx0XHRlbHMuYXBwZW5kKGVsZW1lbnQpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIGRlbGF5UHJvbWlzZShkZWxheSk7XG5cdFx0XHRcdH0pLmJpbmQobnVsbCwgYm94LCBpbmRleCkpO1xuXHRcdH1cblx0fSxcbn07XG4iXX0=
