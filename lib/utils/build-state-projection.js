const padWithZeros = require('../linalgebra/pad-with-zeros.js');

/**
*Builds the stateProjection given an observedProjection
*@param {ObservationConfig} observation
*@param {DynamicConfig} dynamic
*@returns {ObservationConfig, DynamicConfig} the model containing the created stateProjection
*/

module.exports = function ({observation, dynamic}) {
	const {observedProjection, stateProjection} = observation;
	if (observedProjection && stateProjection) {
		throw (new TypeError('You cannot use both observedProjection and stateProjection'));
	}

	if (observedProjection) {
		return {
			observation: Object.assign({}, observation, {
				stateProjection: padWithZeros(observedProjection, {dimension: dynamic.dimension})
			}),
			dynamic
		};
	}
	return {observation, dynamic};
};
