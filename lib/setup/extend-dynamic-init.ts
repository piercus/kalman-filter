import {diag} from 'simple-linalg';
import polymorphMatrix from '../utils/polymorph-matrix';

/**
 * Initializes the dynamic.init when not given
 * @param {ObservationConfig} observation
 * @param {DynamicConfig} dynamic
 * @returns {CoreConfig}
 */

export default function extendDynamicInit({observation, dynamic}) {
	if (!dynamic.init) {
		const huge = 1e6;
		const dynamicDimension = dynamic.dimension;
		const meanArray = new Array(dynamicDimension).fill(0);
		const covarianceArray = new Array(dynamicDimension).fill(huge);
		const withInitOptions = {
			observation,
			dynamic: Object.assign({}, dynamic, {
				init: {
					mean: meanArray.map(element => [element]),
					covariance: diag(covarianceArray),
					index: -1,
				},
			}),
		};
		return withInitOptions;
	}

	if (dynamic.init && !dynamic.init.mean) {
		throw (new Error('dynamic.init should have a mean key'));
	}

	dynamic.init = Object.assign({}, dynamic.init, {
		covariance: polymorphMatrix(dynamic.init.covariance, {dimension: dynamic.dimension}),
	});

	return {observation, dynamic};
}
