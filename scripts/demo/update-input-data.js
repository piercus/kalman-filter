const fs = require('fs');
const generateNoisyObservation = require('./helpers/generate-noisy-observation');
const calculateObservationCovariance = require('./helpers/calculate-observation-covariance');

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

const noisyObservations = generateNoisyObservation({groundTruths: boxes})[0];
fs.writeFileSync('./demo/src/observations.json', JSON.stringify({observations: noisyObservations}));

const observationCovariance = calculateObservationCovariance({groundTruths: boxes, numberRun: 10});

fs.writeFileSync('./demo/src/observation-covariance.json', JSON.stringify(observationCovariance));
