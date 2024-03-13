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
