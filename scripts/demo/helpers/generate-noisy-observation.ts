import h from 'hasard';
import {elemWise} from 'simple-linalg';

export default function generateNoisyObservation(args: {groundTruths: number[][], rangeNoise?: number, numberRun?: number}): number[][] {
	const {groundTruths, rangeNoise = 10, numberRun = 1} = args;
	const hasardNoise: number[][] = h.matrix({
		shape: [groundTruths.length, groundTruths[0].length],
		value: h.integer(-rangeNoise, rangeNoise),
	});
	const combinedMatrix = h.fn((noise: number[][], gT: number[][]) => elemWise([noise, gT], ([n, gTCell]) => n + gTCell))(hasardNoise, groundTruths);
	return combinedMatrix.run(numberRun);
}

// module.exports = generateNoisyObservation;
// Console.log('Noisy observation', generateNoiseMatrix({groundTruths: demoGroundTruths}))
