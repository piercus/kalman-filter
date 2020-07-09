const identity = require('../linalgebra/identity.js');
/**
* @param {CovarianceParam} covariance
* @returns {DynamicConfig}
*/

module.exports = function (dynamic, observation) {
	let dimension = dynamic.dimension;
	if (!dynamic.dimension) {
		if (observationDimension) {
			dimension = observationDimension;
		} else if (observedProjection) {
			dimension = observedProjection[0].length;
		} else if (stateProjection) {
			dimension = stateProjection[0].length;
		}
	}

	const observationDimension = observation.dimension;
	const observedProjection = observation.observedProjection;
	const stateProjection = observation.stateProjection;
	let covariance = observation.covariance;
	const transition = identity(dimension);
	covariance = covariance || identity(dimension);
	return {dimension, transition, covariance};
};
