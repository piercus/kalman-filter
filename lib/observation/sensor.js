const identity = require('../linalgebra/identity.js');
const polymorphMatrix = require('../utils/polymorph-matrix.js');

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
	const oneSensorObservedProjection = identity(sensorDimension);
	let concatenatedObservedProjection = [];
	let concatenatedCovariance = [];
	for (let i = 0; i < nSensors; i++) {
		concatenatedObservedProjection = concatenatedObservedProjection.concat(copy(oneSensorObservedProjection));
		concatenatedCovariance = concatenatedCovariance.concat(copy(sensorCovarianceFormatted));
	}

	const formattedCovariance = polymorphMatrix(concatenatedCovariance, {dimension: nSensors * sensorDimension});
	return Object.assign({}, options, {
		dimension: sensorDimension * nSensors,
		observedProjection: concatenatedObservedProjection,
		covariance: formattedCovariance
	});
};
