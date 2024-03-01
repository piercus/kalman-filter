import {diag} from 'simple-linalg';
import polymorphMatrix from '../utils/polymorph-matrix';
import {DynamicConfig, DynamicConfigParcial, ObservationConfig} from '../types/ObservationConfig';

/**
 * Initializes the dynamic.init when not given
 * Only used by setupModelsParameters
 * @param {ObservationConfig} observation
 * @param {DynamicConfigParcial} dynamic
 * @returns {CoreConfig}
 */

export default function extendDynamicInit(args: {observation: ObservationConfig, dynamic: DynamicConfigParcial}): {observation: ObservationConfig, dynamic: DynamicConfig} {
	const {observation, dynamic} = args;
	if (!dynamic.init) {
		const huge = 1e6;
		const dynamicDimension = dynamic.dimension;
		const meanArray = new Array(dynamicDimension).fill(0);
		const covarianceArray = new Array(dynamicDimension).fill(huge);
		const withInitOptions = {
			observation,
			dynamic: {
				...dynamic,
				init: {
					mean: meanArray.map(element => [element]),
					covariance: diag(covarianceArray),
					index: -1,
				},
			},
		};
		return withInitOptions;
	}

	if (dynamic.init && !dynamic.init.mean) {
		throw (new Error('dynamic.init should have a mean key'));
	}

	dynamic.init = {
		...dynamic.init,
		covariance: polymorphMatrix(dynamic.init.covariance, {dimension: dynamic.dimension}),
	};

	return {observation, dynamic: dynamic as DynamicConfig};
}
