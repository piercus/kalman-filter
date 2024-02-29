import {DynamicConfigParcial} from '../types/ObservationConfig';

/**
* Verifies that dynamic.dimension and observation.dimension are set
* Only used by setupModelsParameters
* @param {ObservationConfig} observation
* @param {DynamicConfig} dynamic
*/
export default function checkDimensions(args: {observation, dynamic: DynamicConfigParcial}): {observation: any, dynamic: DynamicConfigParcial} {
	const {observation, dynamic} = args;
	const dynamicDimension = dynamic.dimension;
	const observationDimension = observation.dimension;
	if (!dynamicDimension || !observationDimension) {
		throw (new TypeError('Dimension is not set'));
	}
	return {observation, dynamic};
}
