const identity = require('../linalgebra/identity.js');
const polymorphMatrix = require('../utils/polymorph-matrix.js');
const checkMatrix = require('../utils/check-matrix.js');

/**
* @param {Number} sensorDimension
* @param {CovarianceParam} sensorCovariance
* @param {Number} nSensors
* @returns {ObservationConfig}
*/

const copy = mat => mat.map(a => a.concat());

module.exports = function (options) {
	const {sensorDimension = 1, sensorCovariance = 1, nSensors = 1} = options;
	const sensorCovarianceFormatted = polymorphMatrix(sensorCovariance, {dimension: sensorDimension});
	checkMatrix(sensorCovarianceFormatted, [sensorDimension, sensorDimension], 'observation.sensorCovariance');
	const oneSensorObservedProjection = identity(sensorDimension);
	let concatenatedObservedProjection = [];
	const dimension = sensorDimension * nSensors;
	const concatenatedCovariance = identity(dimension);
	for (let i = 0; i < nSensors; i++) {
		concatenatedObservedProjection = concatenatedObservedProjection.concat(copy(oneSensorObservedProjection));

		sensorCovarianceFormatted.forEach((r, rIndex) => r.forEach((c, cIndex) => {
			concatenatedCovariance[rIndex + (i * sensorDimension)][cIndex + (i * sensorDimension)] = c;
		}));
	}

	return Object.assign({}, options, {
		dimension,
		observedProjection: concatenatedObservedProjection,
		covariance: concatenatedCovariance
	});
};
