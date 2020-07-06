const test = require('ava');

const KalmanFilter = require('../../../lib/kalman-filter.js');
const State = require('./state.js');
const equalState = require('../../helpers/equal-state.js');

// Verify that we can use a registered model, the observations are here in 1D

test('Check constant position', t => {
	const previousCorrected = new State({
		mean: [[0]],
		covariance: [[1]]
	});
	const kf = new KalmanFilter({
		observation: {
			sensorDimension: 1,
			covariance: [[1]],
			stateProjection: [[1]]
		},
		dynamic: {
			dimension: 1,
			name: 'constant-position',
			covariance: [[1]]
		}
	});
	const observations = [[0.1], [0.2], [0.1]];
	const result = kf.filter({previousCorrected, observation: observations[0]});
	const stateObjective = new State({
		mean: [[2 / 30]],
		covariance: [[2 / 3]]
	});
	t.true(result instanceof State);
	// We verify that the registered model returns the good correction
	t.true(equalState(result, stateObjective));
});

test('Check constant speed', t => {
	const previousCorrected = new State({
		mean: [[0], [1]],
		covariance: [
			[1, 0],
			[0, 1]
		]
	});
	const kf = new KalmanFilter({
		observation: {
			sensorDimension: 1,
			covariance: [[1]]
		},
		dynamic: {
			dimension: 2,
			name: 'constant-speed',
			covariance: [
				[1, 0],
				[0, 0.01]
			],
			timeStep: 0.1
		}
	});
	const observations = [[0.11], [0.21], [0.3]];
	const result = kf.filter({previousCorrected, observation: observations[0]});
	// Result calculted by hand
	const timeStep = 0.1;
	const stateObjective = new State({
		mean: [[timeStep + 0.006], [1]],
		covariance: [
			[0.66, 0.33 * timeStep],
			[0, 1.01]
		]
	});
	t.true(result instanceof State);
	// We verify that the registered model returns the good result
	t.true(equalState(result, stateObjective));
});

test('Check sensor', t => {
	const previousCorrected = new State({
		mean: [[0], [1]],
		covariance: [
			[1, 0],
			[0, 1]
		]
	});
	const kf = new KalmanFilter({
		dynamic: {
			name: 'constant-speed',
			timeStep: 0.1,
			covariance: [1, 0.01]
		},
		observation: {
			name: 'sensors',
			nSensors: 2,
			sensorDimension: 1,
			covariance: [1] // Equivalent to diag(1,1)
		}
	});
	const kf2 = new KalmanFilter({
		dynamic: {
			name: 'constant-speed',
			timeStep: 0.1,
			covariance: [1, 0.01]
		},
		observation: {
			dimension: 2,
			stateProjection: [
				[1, 0],
				[1, 0]
			],
			covariance: [
				[1, 0],
				[0, 1]
			]
		}
	});
	const observations = [[[0.11], [0.1]], [[0.21], [0.19]], [[0.3], [0.3]]];
	const result = kf.filter({previousCorrected, observation: observations[0]});
	t.true(result instanceof State);

	const stateObjective = kf2.predict({previousCorrected, observation: observations[0]});
	t.true(equalState(result, stateObjective));
});

// Verify that we can register a model and use it correctly

test('Registering custom speed', t => {
	const kf = new KalmanFilter({
		dynamic: {
			name: 'constant-speed',
			timeStep: 0.1,
			covariance: [1, 0.01]
		}
	});
	const timeStep = 0.1;
	KalmanFilter.registerDynamic('custom-speed', () => {
		const dimension = 2;
		const transition = [
			[1, timeStep],
			[0, 1]
		];
		const covariance = [
			[1, 0],
			[0, 0.01]
		];
		return {dimension, transition, covariance};
	});

	const kf2 = new KalmanFilter({
		dynamic: {
			name: 'custom-speed',
			timeStep: 0.1,
			covariance: [1, 0.01]
		}
	});
	const predicted1 = kf.predict();
	const predicted2 = kf2.predict();

	t.true(predicted1 instanceof State);
	t.true(predicted2 instanceof State);
	t.true(equalState(predicted1, predicted2));

	// Verify that the model had been correctly added to the list of exiting models
	t.true(KalmanFilter.registeredModels.some(model => model.name === 'custom-speed'));
});
