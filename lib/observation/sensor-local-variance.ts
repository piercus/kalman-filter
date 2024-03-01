import {identity} from 'simple-linalg';

import {buildObservation} from '../model-collection';
import {ObservationConfig} from '../types/ObservationConfig';
/**
* @param {Object} options
* @param {Number} options.sensorDimension
* @param {CovarianceParam} options.sensorCovariance
* @param {Number} options.nSensors
* @returns {ObservationConfig}
*/

export default function nullableSensor(options): ObservationConfig {
	const {dimension, observedProjection, covariance: baseCovariance} = buildObservation({...options, name: 'sensor'});

	return {
		dimension,
		observedProjection,
		covariance(o): number[][] {
			const covariance = identity(dimension);
			const {variance} = o;

			variance.forEach((v, i) => {
				covariance[i][i] = v * baseCovariance[i][i];
			});

			return covariance;
		},
	};
}
