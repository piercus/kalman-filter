import {writeFileSync} from 'node:fs';
import generateNoisyObservation from './helpers/generate-noisy-observation';
import calculateObservationCovariance from './helpers/calculate-observation-covariance';

const boxes: number[][] = [
	[
		849, 294, 86, 83,
	],
	[
		705, 186, 101, 86,
	],
	[
		564, 108, 108, 109,
	],
	[
		427, 100, 87, 101,
	],
	[
		285, 132, 84, 89,
	],
	[
		152, 195, 84, 77,
	],
	[
		21, 302, 83, 83,
	],
];

const noisyObservations = generateNoisyObservation({groundTruths: boxes})[0];
const observationsJSON = JSON.stringify({observations: noisyObservations});
// console.log(`generating ./demo/src/observations.json with: ${observationsJSON}`);
writeFileSync('./demo/src/observations.json', observationsJSON);

const observationCovariance = calculateObservationCovariance({groundTruths: boxes, numberRun: 10});
const observationCovarianceJSON = JSON.stringify(observationCovariance);
writeFileSync('./demo/src/observation-covariance.json', observationCovarianceJSON);
