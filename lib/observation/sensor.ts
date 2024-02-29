import {identity} from 'simple-linalg';

import polymorphMatrix from '../utils/polymorph-matrix';
import checkMatrix from '../utils/check-matrix';

/**
* @param {Number} sensorDimension
* @param {CovarianceParam} sensorCovariance
* @param {Number} nSensors
* @returns {ObservationConfig}
*/

const copy = mat => mat.map(a => a.concat());

export default function sensor(options) {
	const {sensorDimension = 1, sensorCovariance = 1, nSensors = 1} = options;
	const sensorCovarianceFormatted = polymorphMatrix(sensorCovariance, {dimension: sensorDimension});
	checkMatrix(sensorCovarianceFormatted, [sensorDimension, sensorDimension], 'observation.sensorCovariance');
	const oneSensorObservedProjection = identity(sensorDimension);
	let concatenatedObservedProjection = [];
	const dimension = sensorDimension * nSensors;
	const concatenatedCovariance = identity(dimension);
	for (let i = 0; i < nSensors; i++) {
		concatenatedObservedProjection = concatenatedObservedProjection.concat(copy(oneSensorObservedProjection));

		for (const [rIndex, r] of sensorCovarianceFormatted.entries()) {
			for (const [cIndex, c] of r.entries()) {
				concatenatedCovariance[rIndex + (i * sensorDimension)][cIndex + (i * sensorDimension)] = c;
			}
		}
	}

	return Object.assign({}, options, {
		dimension,
		observedProjection: concatenatedObservedProjection,
		covariance: concatenatedCovariance,
	});
}
