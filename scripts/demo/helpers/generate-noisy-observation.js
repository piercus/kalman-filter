const h = require('hasard');
const {elemWise} = require('simple-linalg');

const generateNoisyObservation = function ({groundTruths, rangeNoise = 10, numberRun = 1}) {
	const hasardNoise = h.matrix({
		shape: [groundTruths.length, groundTruths[0].length],
		value: h.integer(-rangeNoise, rangeNoise),
	});
	const combinedMatrix = h.fn((noise, gT) => elemWise([noise, gT], ([n, gTCell]) => n + gTCell))(hasardNoise, groundTruths);
	return combinedMatrix.run(numberRun);
};

module.exports = generateNoisyObservation;
// Console.log('Noisy observation', generateNoiseMatrix({groundTruths: demoGroundTruths}))
