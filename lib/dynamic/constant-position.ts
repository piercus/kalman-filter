import {identity} from 'simple-linalg';
/**
* Creates a dynamic model, following constant position model with respect with the dimensions provided in the observation parameters
* @param {DynamicConfig} dynamic
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/

export default function constantPosition(dynamic, observation) {
	let {dimension} = dynamic;
	const observationDimension = observation.dimension;
	const {observedProjection} = observation;
	const {stateProjection} = observation;
	let {covariance} = dynamic;

	if (!dynamic.dimension) {
		if (observationDimension) {
			dimension = observationDimension;
		} else if (observedProjection) {
			dimension = observedProjection[0].length;
		} else if (stateProjection) {
			dimension = stateProjection[0].length;
		}
	}

	const transition = identity(dimension);
	covariance ||= identity(dimension);
	return {
		...dynamic, dimension, transition, covariance,
	};
}
