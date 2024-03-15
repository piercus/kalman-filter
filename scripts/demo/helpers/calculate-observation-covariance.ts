import getCovariance from '../../../lib/utils/get-covariance';
import generateNoisyObservation from './generate-noisy-observation';

export default function calculateObservationCovariance(args: {groundTruths: number[][], rangeNoise?: number, numberRun?: number}): number[][] {
	const {groundTruths, rangeNoise = 10, numberRun = 1} = args;

	const noisyMatrixes = generateNoisyObservation({groundTruths, rangeNoise, numberRun});
	const measures = noisyMatrixes.reduce((a, b) => a.concat(b));

	const averages = new Array(numberRun).fill(0).map(() => groundTruths).reduce((a, b) => a.concat(b));
	const covariance = getCovariance({
		measures,
		averages,
	});
	// Console.log(measures, averages, measures.length, averages.length,covariance);
	return covariance;
}
