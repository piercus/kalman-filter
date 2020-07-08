const identity = require('../linalgebra/identity.js');
const diag = require('../linalgebra/diag.js');

/**
* @param {CovarianceParam} covariance
* @param {Number} timeStep
* @returns {DynamicConfig}
*/

module.exports = function ({timeStep, covariance}, observation) {
	timeStep = timeStep || 1;
	const observedProjection = observation.observedProjection;
	const stateProjection = observation.stateProjection;
	let dimension;
	if (stateProjection && Number.isInteger(stateProjection[0].length / 2)) {
		dimension = observation.stateProjection[0].length;
	} else if (observedProjection) {
		dimension = observedProjection[0].length * 2;
	} else {
		throw (new Error('observedProjection or stateProjection should be defined in observation in order to use constant-speed filter'));
	}

	const baseDimension = dimension / 2;

	// We construct the transition and covariance matrices
	const transition = identity(dimension);
	for (let i = 0; i < baseDimension; i++) {
		transition[i][i + baseDimension] = timeStep;
	}

	const arrayCovariance = new Array(baseDimension).fill(1).concat(new Array(baseDimension).fill(timeStep * timeStep));
	covariance = covariance || diag(arrayCovariance);
	return {dimension, transition, covariance};
};
