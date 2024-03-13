import {DynamicConfigParcial, DynamicConfigParcialNoDim} from '../types/ObservationConfig';

/**
 * Verifies that dimensions are matching and set dynamic.dimension and observation.dimension
 * with respect of stateProjection and transition dimensions
 * Only used by setupModelsParameters
 * @param {ObservationConfig} observation
 * @param {DynamicConfig} dynamic
 * @returns {ObservationConfig, DynamicConfig}
 */
export default function setDimensions(args: {observation, dynamic: DynamicConfigParcialNoDim}): {observation: any, dynamic: DynamicConfigParcial} {
	const {observation, dynamic} = args;
	const {stateProjection} = observation;
	const {transition} = dynamic;
	const dynamicDimension: number | undefined = dynamic.dimension;
	const observationDimension = observation.dimension;

	if (dynamicDimension && observationDimension && Array.isArray(stateProjection) && (dynamicDimension !== stateProjection[0].length || observationDimension !== stateProjection.length)) {
		throw (new TypeError('stateProjection dimensions not matching with observation and dynamic dimensions'));
	}

	if (dynamicDimension && Array.isArray(transition) && dynamicDimension !== transition.length) {
		throw (new TypeError('transition dimension not matching with dynamic dimension'));
	}

	if (Array.isArray(stateProjection)) {
		return {
			observation: {
				...observation,
				dimension: stateProjection.length,
			},
			dynamic: {
				...dynamic,
				dimension: stateProjection[0].length,
			},
		};
	}

	if (Array.isArray(transition)) {
		return {
			observation,
			dynamic: {
				...dynamic,
				dimension: transition.length,
			},
		};
	}

	return {observation, dynamic: dynamic as DynamicConfigParcial};
}
