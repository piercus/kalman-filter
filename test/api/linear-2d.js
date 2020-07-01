const test = require('ava');

// Tests in 2D with constant speed model

const CoreKalmanFilter = require('../../../lib/core-kalman-filter.js');
const State = require('../../../lib/state.js');
const trace = require('../../../lib/linalgebra/trace.js');
const distanceMat = require('../../../lib/linalgebra/distance-mat.js');

const defaultOptions = {
	observation: {
		sensorDimension: 2,
		nSensors: 1,
		stateProjection: [
			[1, 0, 0, 0],
			[0, 1, 0, 0]
		],

		sensorCovariance: [1, 1]
	},

	dynamic: {
		name: 'constant-speed',
		init: {
			mean: [[500], [500], [0], [0]],

			covariance: [
				[huge, 0, 0, 0],
				[0, huge, 0, 0],
				[0, 0, huge, 0],
				[0, 0, 0, huge]
			]
		},
		timeStep: 0.1,
		covariance: [1, 1, 0.1, 0.1]
	}

};

const huge = 1000;
const tiny = 0.001;

const observations = [
	[1, 2],
	[2.1, 3.9],
	[3, 6]
];
