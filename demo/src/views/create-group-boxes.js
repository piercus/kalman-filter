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
