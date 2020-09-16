var generateNoisyObservation = require('./helpers/generate-noisy-observation');
const fs = require('fs');

const boxes = [
	[
		849, 294, 86, 83
	],
	[
		705, 186, 101, 86
	],
	[
		564, 108, 108, 109
	],
	[
		427, 100, 87, 101
	],
	[
		285, 132, 84, 89
	],
	[
		152, 195, 84, 77
	],
	[
		21, 302, 83, 83
	]
];

const noisyObservations = generateNoisyObservation({groundTruths: boxes});
fs.writeFileSync('./demo/observations.json', JSON.stringify({observations: noisyObservations}));