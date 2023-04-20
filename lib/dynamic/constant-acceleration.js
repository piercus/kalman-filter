const {identity} = require('simple-linalg');

/**
*Creates a dynamic model, following constant acceleration model with respect with the dimensions provided in the observation parameters
* @param {DynamicConfig} dynamic
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/

module.exports = function (dynamic, observation) {
	const timeStep = dynamic.timeStep || 1;
	const {observedProjection} = observation;
	const {stateProjection} = observation;
	const observationDimension = observation.dimension;
	let dimension;

	if (stateProjection && Number.isInteger(stateProjection[0].length / 3)) {
		dimension = observation.stateProjection[0].length;
	} else if (observedProjection) {
		dimension = observedProjection[0].length * 3;
	} else if (observationDimension) {
		dimension = observationDimension * 3;
	} else {
		throw (new Error('observedProjection or stateProjection should be defined in observation in order to use constant-speed filter'));
	}

	const baseDimension = dimension / 3;
	// We construct the transition and covariance matrices
	const transition = identity(dimension);
	for (let i = 0; i < baseDimension; i++) {
		transition[i][i + baseDimension] = timeStep;
		transition[i][i + (2 * baseDimension)] = 0.5 * (timeStep ** 2);
		transition[i + baseDimension][i + (2 * baseDimension)] = timeStep;
	}

	const arrayCovariance = new Array(baseDimension).fill(1)
		.concat(new Array(baseDimension).fill(timeStep * timeStep))
		.concat(new Array(baseDimension).fill(timeStep ** 4));
	const covariance = dynamic.covariance || arrayCovariance;
	return Object.assign({}, dynamic, {dimension, transition, covariance});
};
