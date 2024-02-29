import {padWithZeroCols as padWithZeros} from 'simple-linalg';
import {identity} from 'simple-linalg';

/**
*Builds the stateProjection given an observedProjection
*@param {ObservationConfig} observation
*@param {DynamicConfig} dynamic
*@returns {ObservationConfig, DynamicConfig} the model containing the created stateProjection
*/

export default function buildStateProjection({observation, dynamic}) {
	const {observedProjection, stateProjection} = observation;
	const observationDimension = observation.dimension;
	const dynamicDimension = dynamic.dimension;
	if (observedProjection && stateProjection) {
		throw (new TypeError('You cannot use both observedProjection and stateProjection'));
	}

	if (observedProjection) {
		const stateProjection = padWithZeros(observedProjection, {columns: dynamicDimension});
		return {
			observation: Object.assign({}, observation, {
				stateProjection,
			}),
			dynamic,
		};
	}

	if (observationDimension && dynamicDimension && !stateProjection) {
		const observationMatrix = identity(observationDimension);
		return {
			observation: Object.assign({}, observation, {
				stateProjection: padWithZeros(observationMatrix, {columns: dynamicDimension}),
			}),
			dynamic,
		};
	}

	return {observation, dynamic};
}
