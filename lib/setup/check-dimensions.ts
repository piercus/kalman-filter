/**
* Verifies that dynamic.dimension and observation.dimension are set
* @param {ObservationConfig} observation
* @param {DynamicConfig} dynamic
*/

export default function checkDimensions({observation, dynamic}) {
	const dynamicDimension = dynamic.dimension;
	const observationDimension = observation.dimension;
	if (!dynamicDimension || !observationDimension) {
		throw (new TypeError('Dimension is not set'));
	}

	return {observation, dynamic};
};
