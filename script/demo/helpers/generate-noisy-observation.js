const h = require('hasard');
const elemWise = require('../../../lib/linalgebra/elem-wise.js');

const generateNoisyObservation = function ({groundTruths, rangeNoise = 10, numberRun = 1}) {
	const hasardNoise = h.matrix({
		shape: [groundTruths.length, groundTruths[0].length],
		value: h.integer(-rangeNoise, rangeNoise)
	});
	const combinedMatrix = h.fn((noise, gT) => {
		return elemWise([noise, gT], ([n, gTCell]) => n + gTCell);
	})(hasardNoise, groundTruths);
	return combinedMatrix.run(numberRun);
};

module.exports = generateNoisyObservation;
// Console.log('Noisy observation', generateNoiseMatrix({groundTruths: demoGroundTruths}))
