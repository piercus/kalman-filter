import {padWithZeroCols as padWithZeros} from 'simple-linalg';
import {identity} from 'simple-linalg';
import {DynamicConfigParcial} from '../types/ObservationConfig';

/**
* Builds the stateProjection given an observedProjection
* Only used by setupModelsParameters
* @param {ObservationConfig} observation
* @param {DynamicConfig} dynamic
* @returns {ObservationConfig, DynamicConfig} the model containing the created stateProjection
*/
export default function buildStateProjection(args: {observation, dynamic: DynamicConfigParcial}): {observation: any; dynamic: DynamicConfigParcial} {
	const {observation, dynamic} = args;
	const {observedProjection, stateProjection} = observation;
	const observationDimension = observation.dimension;
	const dynamicDimension = dynamic.dimension;
	if (observedProjection && stateProjection) {
		throw (new TypeError('You cannot use both observedProjection and stateProjection'));
	}

	if (observedProjection) {
		const stateProjection = padWithZeros(observedProjection, {columns: dynamicDimension});
		return {
			observation: {
				...observation,
				stateProjection,
			},
			dynamic,
		};
	}

	if (observationDimension && dynamicDimension && !stateProjection) {
		const observationMatrix = identity(observationDimension);
		return {
			observation: {
				...observation,
				stateProjection: padWithZeros(observationMatrix, {columns: dynamicDimension}),
			},
			dynamic,
		};
	}

	return {observation, dynamic};
}
