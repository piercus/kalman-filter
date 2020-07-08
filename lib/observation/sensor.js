const identity = require('../linalgebra/identity.js');

/**
* @param {Number} sensorDimension
* @param {CovarianceParam} sensorCovariance
* @param {Number} nSensors
* @returns {ObservationConfig}
*/

module.exports = function (options) {
	const {sensorDimension = 1, sensorCovariance = 1, nSensors = 1} = options;
	const formattedSensorCovariance = polymorphMatrix(sensorCovariance, {dimension: sensorDimension});
	const oneSensorObservedProjection = identity(sensorDimension);
	let concatenatedObservedProjection = [];
	let concatenatedCovariance = [];
	for (let i = 0; i < nSensors; i++) {
		concatenatedObservedProjection = concatenatedObservedProjection.concat(oneSensorObservedProjection);
		concatenatedCovariance = concatenatedCovariance.concat(formattedSensorCovariance);
	}

	return Object.assign({}, options, {
		dimension: sensorDimension,
		observedProjection: concatenatedObservedProjection,
		covariance: concatenatedCovariance
	});
};
