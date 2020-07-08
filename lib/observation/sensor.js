const zeros = require('../linalgebra/zeros.js');
/**
* @param {Number} sensorDimension
* @param {CovarianceParam} sensorCovariance
* @param {Number} nSensors
* @returns {ObservationConfig}
*/

module.exports = function ({sensorDimension, sensorCovariance, nSensors}) {
	const oneSensorObservedProjection = identity(sensorDimension);
	const concatenatedObservedProjection = oneSensorObservedProjection;
	const concatenatedCovariance = sensorCovariance;
	for (let i= 0; i<nSensors; i++) {
		concatenatedObservedProjection = concatenatedObservedProjection.concat(oneSensorObservedProjection);
		concatenatedCovariance = concatenatedCovariance.concat(sensorCovariance);
	}

	return {
		observation: {
			dimension: sensorDimension,
			observedProjection: concatenatedObservedProjection,
			covariance: concatenatedCovariance
	}}
};
