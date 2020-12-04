const getCovariance = require('../../../lib/utils/get-covariance.js');
const generateNoisyObservation = require('./generate-noisy-observation.js');

const calculateObservationCovariance = function ({groundTruths, rangeNoise = 10, numberRun = 1}) {
	const noisyMatrixes = generateNoisyObservation({groundTruths, rangeNoise, numberRun});
	const measures = noisyMatrixes.reduce((a, b) => a.concat(b));

	const averages = new Array(numberRun).fill(0).map(() => groundTruths).reduce((a, b) => a.concat(b));
	const covariance = getCovariance({
		measures,
		averages
	});
	// Console.log(measures, averages, measures.length, averages.length,covariance);

	return covariance;
};

module.exports = calculateObservationCovariance;
