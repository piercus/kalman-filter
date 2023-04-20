const {identity} = require('simple-linalg');
const correlationToCovariance = require('../utils/correlation-to-covariance');
const covarianceToCorrelation = require('../utils/covariance-to-correlation');
const buildObservedProjection = require('../utils/build-observed-projection.js');

/**
*Creates an observation model with a observedProjection corresponding to
* @param {DynamicConfig} dynamic
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/

const sensorProjected = function ({selectedCovariance, totalDimension, obsIndexes, selectedStateProjection}) {
	if (!selectedStateProjection) {
		selectedStateProjection = new Array(obsIndexes.length).fill(0).map(() => new Array(obsIndexes.length).fill(0));
		obsIndexes.forEach((index1, i1) => {
			selectedStateProjection[i1][i1] = 1;
		});
	} else if (selectedStateProjection.length !== obsIndexes.length) {
		throw (new Error(`[Sensor-projected] Shape mismatch between ${selectedStateProjection.length} and ${obsIndexes.length}`));
	}

	const baseCovariance = identity(totalDimension);
	obsIndexes.forEach((index1, i1) => {
		if (selectedCovariance) {
			obsIndexes.forEach((index2, i2) => {
				baseCovariance[index1][index2] = selectedCovariance[i1][i2];
			});
		}
	});
	const {correlation: baseCorrelation, variance: baseVariance} = covarianceToCorrelation(baseCovariance);

	const dynaDimension = selectedStateProjection[0].length;

	const observedProjection = buildObservedProjection({
		inDimension: dynaDimension,
		inIndexes: selectedStateProjection[0].map((_, i) => i),
		outIndexes: obsIndexes,
		selectedStateProjection,
		outDimension: totalDimension,
	});

	return {
		dimension: totalDimension,
		observedProjection,
		covariance(o) {
			const {variance} = o;
			if (!variance) {
				return baseCovariance;
			}

			if (variance.length !== baseCovariance.length) {
				throw (new Error('variance is difference size from baseCovariance'));
			}

			const result = correlationToCovariance({correlation: baseCorrelation, variance: baseVariance.map((b, i) => variance[i] * b)});

			return result;
		},
	};
};

module.exports = sensorProjected;
