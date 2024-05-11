const {elemWise, diag} = require('simple-linalg');
const constantSpeedDynamic = require('./constant-speed-dynamic');

const safeDiv = function (a, b) {
	if (a === 0) {
		return 0;
	}

	if (b === 0) {
		return 1;
	}

	return a / b;
};

/**
* This model is based on the constant speed model
* The constant speed model creates problems when dT >> fps (the track is lost)
* then the expected position can be very far from the center of the field
* to solve that, we use a model with 2 more hidden variable that are always center of the field
* When dT << typicalTime the model acts exactly as a constant speed model
* When dT >> typicalTime the model is a constant [x,y] = center model, sigma = defaultVariance
* @param {Object} options
* @param {ObservationConfig} observation
* @param {Number} [options.typicalTime=10]
* @returns {DynamicConfig}
*/
module.exports = function (options, observation) {
	const {typicalTimes} = options;

	if (!Array.isArray(typicalTimes)) {
		throw (new TypeError('typicalTimes must be defined'));
	}

	const constantSpeed = constantSpeedDynamic(options, observation);
	const {dimension, init} = constantSpeed;

	if (typicalTimes.length !== dimension) {
		throw (new TypeError(`typicalTimes (${typicalTimes.length}) length is not as expected (${dimension})`));
	}

	const mixMatrix = function ({
		ratios,
		aMat,
		bMat,
	}) {
		return elemWise([aMat, bMat], ([m, d], rowIndex, colIndex) => {
			const ratio = rowIndex === colIndex ? ratios[rowIndex] : (ratios[rowIndex] + ratios[colIndex]) / 2;

			return (ratio * m) + ((1 - ratio) * d);
		});
	};

	return {
		dimension,
		init,
		transition(options) {
			const aMat = constantSpeed.transition(options);

			const {getTime, index, previousCorrected} = options;
			const dT = getTime(index) - getTime(previousCorrected.index);

			const ratios = typicalTimes.map(t => Math.exp(-1 * dT / t));

			// 'back to init' matrix
			const bMat = diag(
				elemWise([init.mean, previousCorrected.mean], ([m, d]) => safeDiv(m, d))
				// Flatten cause this is a Nx1 matrix -> N array
					.reduce((a, b) => a.concat(b)),
			);

			return mixMatrix({ratios, aMat, bMat});
		},
		covariance(options, observation) {
			const {getTime, index, previousCorrected} = options;

			const dT = getTime(index) - getTime(previousCorrected.index);
			// State is (x, y, vx, vy)
			const ratios = typicalTimes.map(t => Math.exp(-1 * dT / t));
			const aMat = constantSpeed.covariance(options, observation);
			return mixMatrix({ratios, aMat, bMat: init.covariance});
		},
	};
};
