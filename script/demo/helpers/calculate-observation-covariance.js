const generateNoisyObservation = require('./generate-noisy-observation.js');
const getCovariance = require('../../lib/utils/get-covariance.js');

const calculateObservationCovariance = function ({groundTruths, rangeNoise = 10, numberRun = 1}) {
	const noisyMatrixes = generateNoisyObservation({groundTruths, rangeNoise, numberRun});
	return noisyMatrixes.map(noisyMatrix => getCovariance({measures: noisyMatrix, averages: groundTruths}));
};

module.exports = calculateObservationCovariance;
