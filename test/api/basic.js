// ReadMe Tests

const test = require('ava');

const KalmanFilter = require('../../lib/kalman-filter.js');
const State = require('../../lib/state.js');
// Const getCovariance = require('../../lib/utils/get-covariance.js');
const observations = [[0, 2], [0.1, 4], [0.5, 9], [0.2, 12]];

test('Default filter : Constant-position on 1D Data', t => {
	const observations = [0, 0.1, 0.5, 0.2, 3, 4, 2, 1, 2, 3, 5, 6];
	const kFilter = new KalmanFilter();
	const result = kFilter.filterAll(observations);
	t.true(Array.isArray(result));
	t.is(result.length, observations.length);
});

test('Simple constant-position 2d', t => {
	const kf = new KalmanFilter({
		observation: 2
	});
	const observations = [[0.11, 0.1], [0.21, 0.19], [0.3, 0.3]];
	const result = kf.filterAll(observations);
	t.true(Array.isArray(result));
});

test('Simple constant-speed 2d', t => {
	const kf = new KalmanFilter({
		observation: 2,
		dynamic: 'constant-speed'
	});
	const observations = [[0.11, 0.1], [0.21, 0.19], [0.3, 0.3]];
	const result = kf.filterAll(observations);
	t.true(Array.isArray(result));
});

test('Constant-position on 2D Data', t => {
	const kFilter = new KalmanFilter({
		observation: {
			sensorDimension: 2,
			name: 'sensor'
		},
		dynamic: {
			name: 'constant-position', // Observation.sensorDimension == dynamic.dimension
			covariance: [3, 4]// Equivalent to diag([3, 4])
		}
	});
	const previousCorrected = new State({
		mean: [[100], [100]],
		covariance: [
			[1, 0],
			[0, 1]
		]
	});
	const predicted = kFilter.predict({previousCorrected});
	const corrected = kFilter.correct({predicted, observation: observations[0]});
	t.true(predicted instanceof State);
	t.true(corrected instanceof State);
});

test('Constant-speed on 3D Data', t => {
	const observations = [[0, 2, 3], [0.1, 4, 5.9], [0.5, 9, 8.4], [0.2, 12, 11]];
	const previousCorrected = new State({
		mean: [[100], [100], [100], [0], [0], [0]],
		covariance: [
			[1, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0],
			[0, 0, 1, 0, 0, 0],
			[0, 0, 0, 0.01, 0, 0],
			[0, 0, 0, 0, 0.01, 0],
			[0, 0, 0, 0, 0, 0.01]
		],
		index: 1
	});
	const kFilter = new KalmanFilter({
		observation: {
			sensorDimension: 3,
			name: 'sensor'
		},
		dynamic: {
			name: 'constant-speed', // Observation.sensorDimension * 2 == state.dimension
			timeStep: 0.1,
			covariance: [1, 1, 1, 0.1, 0.1, 0.1]// Equivalent to diag([3, 3, 3, 4, 4, 4])
		}
	});
	const predicted = kFilter.predict({previousCorrected});
	const corrected = kFilter.correct({predicted, observation: observations[0]});
	t.true(predicted instanceof State);
	t.true(corrected instanceof State);
	t.is(typeof corrected.index, 'number');
	t.is(corrected.covariance.length, 6);

	const timeStep = 0.1;

	const kFilter2 = new KalmanFilter({
		observation: {
			dimension: 3,
			name: 'sensor'
		},
		dynamic: {
			dimension: 6, // (x, y, z, vx, vy, vz)
			transition: [
				[1, 0, 0, timeStep, 0, 0],
				[0, 1, 0, 0, timeStep, 0],
				[0, 0, 1, 0, 0, timeStep],
				[0, 0, 0, 1, 0, 0],
				[0, 0, 0, 0, 1, 0],
				[0, 0, 0, 0, 0, 1]
			],
			covariance: [1, 1, 1, 0.1, 0.1, 0.1]// Equivalent to diag([1, 1, 1, 0.1, 0.1, 0.1])
		}
	});
	t.deepEqual(kFilter2.predict({previousCorrected}), kFilter.predict({previousCorrected}));
});

test('Constant acceleration on 2D Data', t => {
	const kFilter = new KalmanFilter({
		observation: {
			sensorDimension: 2,
			name: 'sensor'
		},
		dynamic: {
			name: 'constant-acceleration', // Observation.sensorDimension * 3 == state.dimension
			timeStep: 0.1,
			covariance: [3, 3, 4, 4, 5, 5]// Equivalent to diag([3, 3, 4, 4, 5, 5])
		}
	});
	const previousCorrected = new State({
		mean: [[100], [100], [10], [10], [0], [0]],
		covariance: [
			[1, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0],
			[0, 0, 0.01, 0, 0, 0],
			[0, 0, 0, 0.01, 0, 0],
			[0, 0, 0, 0, 0.0001, 0],
			[0, 0, 0, 0, 0, 0.0001]
		]
	});
	const obs = [[102], [101]];
	const predicted = kFilter.predict({previousCorrected});
	const corrected = kFilter.correct({
		predicted,
		observation: obs
	});
	t.true(predicted instanceof State);
	t.is(predicted.mean.length, 6);
	t.true(corrected instanceof State);
	t.is(corrected.mean.length, 6);
});

test('Sensor observation', t => {
	const kFilter = new KalmanFilter({
		observation: {
			sensorDimension: 2, // Observation.dimension == observation.sensorDimension * observation.nSensors
			nSensors: 2,
			sensorCovariance: [3, 4],
			name: 'sensor'
		},
		dynamic: {
			name: 'constant-speed', // Observation.sensorDimension * 2 == state.dimension
			covariance: [3, 3, 4, 4]// Equivalent to diag([3, 3, 4, 4])
		}
	});
	t.is(kFilter.observation.stateProjection.length,
		kFilter.observation.sensorDimension * kFilter.observation.nSensors);

	t.is(kFilter.observation.stateProjection[0].length, 4);

	t.is(kFilter.observation.covariance.length, 4);

	const observations = [[[102], [101], [98], [105]]];
	const previousCorrected = new State({
		mean: [[100], [100], [10], [10]],
		covariance: [
			[1, 0, 0, 0],
			[0, 1, 0, 0],
			[0, 0, 0.01, 0],
			[0, 0, 0, 0.01]
		]
	});
	const predicted = kFilter.predict({
		previousCorrected
	});
	const corrected = kFilter.correct({
		predicted,
		observation: observations[0]
	});
	t.true(predicted instanceof State);
	t.is(predicted.mean.length, 4);
	t.true(corrected instanceof State);
	t.is(corrected.mean.length, 4);
});

test('Simple Batch Usage', t => {
	const kFilter = new KalmanFilter({
		observation: {
			sensorDimension: 2,
			name: 'sensor'
		},
		dynamic: {
			name: 'constant-speed', // Observation.sensorDimension == dynamic.dimension
			covariance: [3, 3, 4, 4]// Equivalent to diag([3, 4])
		}
	});
	const results = kFilter.filterAll(observations);
	t.is(results.length, 4);
});

test('Model fits ', t => {
	const kFilter = new KalmanFilter({
		observation: {
			sensorDimension: 2,
			name: 'sensor'
		},
		dynamic: {
			name: 'constant-speed', // Observation.sensorDimension == dynamic.dimension
			covariance: [3, 3, 4, 4]
		}
	});
	const observations = [[0, 2], [0.1, 4], [0.5, 9], [0.2, 12]];

	// Online kalman filter
	let previousCorrected = null;
	const distances = [];
	observations.forEach(observation => {
		const predicted = kFilter.predict({
			previousCorrected
		});

		const dist = predicted.mahalanobis({observation, kf: kFilter});

		previousCorrected = kFilter.correct({
			predicted,
			observation
		});

		distances.push(dist);
	});

	const distance = distances.reduce((d1, d2) => d1 + d2, 0);

	t.true(distance > 0);
});
