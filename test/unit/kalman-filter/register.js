const test = require('ava');

const KalmanFilter = require('../../../lib/kalman-filter.js');
const State = require('../../../lib/state.js');
const equalState = require('../../helpers/equal-state.js');
const modelCollection = require('../../../lib/model-collection.js');
const identity = require('../../../lib/linalgebra/identity.js');

// Verify that we can use a registered model, the observations are here in 1D

test('Check constant position', t => {
	const previousCorrected = new State({
		mean: [[0]],
		covariance: [[1]]
	});
	const kf = new KalmanFilter({
		observation: {
			dimension: 1,
			covariance: [[1]],
			stateProjection: [[1]]
		},
		dynamic: {
			dimension: 1,
			name: 'constant-position'
		}
	});
	// Const observations = [[0.1], [0.2], [0.1]];
	const result = kf.predict({previousCorrected});
	const stateObjective = new State({
		mean: [[0]],
		covariance: [[2]]
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
			dimension: 1,
			covariance: [[1]],
			stateProjection: [[1, 0]]
		},
		dynamic: {
			name: 'constant-speed',
			covariance: [
				[1, 0],
				[0, 0.01]
			],
			timeStep: 0.1
		}
	});
	const observations = [[0.11], [0.21], [0.3]];
	const predicted = kf.predict({previousCorrected});
	const corrected = kf.correct({predicted, observation: observations[0]});
	// Result calculated by hand
	const timeStep = 0.1;
	const stateObjective = new State({
		mean: [[timeStep + 0.006], [1]],
		covariance: [
			[0.66, 0.33 * timeStep],
			[0, 1.01]
		]
	});
	t.true(predicted instanceof State);
	t.true(corrected instanceof State);
	// We verify that the registered model returns the good result
	t.true(equalState(corrected, stateObjective, 0.1));
});

test('Check constant acceleration', t => {
	const previousCorrected = new State({
		mean: [[0], [1], [1]],
		covariance: [
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 1]
		]
	});
	const kf = new KalmanFilter({
		observation: {
			dimension: 1,
			covariance: [[1]],
			stateProjection: [[1, 0, 0]]
		},
		dynamic: {
			name: 'constant-acceleration',
			covariance: [
				[1, 0, 0],
				[0, 0.01, 0],
				[0, 0, 0.0001]
			],
			timeStep: 0.1
		}
	});
	const observations = [[0.11], [0.21], [0.3]];
	const predicted = kf.predict({previousCorrected});
	const corrected = kf.correct({predicted, observation: observations[0]});

	t.true(predicted instanceof State);
	t.true(corrected instanceof State);
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
			name: 'sensor',
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
	const result = kf.predict({previousCorrected, observation: observations[0]});
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
		},
		observation: {
			name: 'sensor'
		}
	});
	modelCollection.registerDynamic('custom-speed', (dynamic, observation) => {
		const timeStep = dynamic.timeStep || 1;
		const {observedProjection} = observation;
		const {stateProjection} = observation;
		const observationDimension = observation.dimension;
		let dimension;
		if (stateProjection && Number.isInteger(stateProjection[0].length / 2)) {
			dimension = observation.stateProjection[0].length;
		} else if (observedProjection) {
			dimension = observedProjection[0].length * 2;
		} else if (observationDimension) {
			dimension = observationDimension * 2;
		} else {
			throw (new Error('observedProjection or stateProjection should be defined in observation in order to use constant-speed filter'));
		}

		const baseDimension = dimension / 2;
		// We construct the transition and covariance matrices
		const transition = identity(dimension);
		for (let i = 0; i < baseDimension; i++) {
			transition[i][i + baseDimension] = timeStep;
		}

		const arrayCovariance = new Array(baseDimension).fill(1).concat(new Array(baseDimension).fill(timeStep * timeStep));
		const covariance = dynamic.covariance || arrayCovariance;
		return {dimension, transition, covariance};
	});

	const kf2 = new KalmanFilter({
		dynamic: {
			name: 'custom-speed',
			timeStep: 0.1,
			covariance: [1, 0.01]
		},
		observation: {
			name: 'sensor'
		}
	});
	const predicted1 = kf.predict();
	const predicted2 = kf2.predict();

	t.true(predicted1 instanceof State);
	t.true(predicted2 instanceof State);
	t.true(equalState(predicted1, predicted2));

	// Verify that the model had been correctly added to the list of exiting models
	// t.true(KalmanFilter.registeredModels.some(model => model.name === 'custom-speed'));
});

// Verify that init is conserved if defined

test('Init and registered model', t => {
	const kf = new KalmanFilter({
		observation: {
			dimension: 1,
			covariance: [[1]],
			stateProjection: [[1, 0]]
		},
		dynamic: {
			name: 'constant-speed',
			covariance: [
				[1, 0],
				[0, 0.01]
			],
			timeStep: 0.1,
			init: {
				mean: [[0], [1]],
				covariance: [
					[1, 0],
					[0, 1]
				]
			}
		}
	});
	console.log(kf.dynamic.init.covariance);
	t.deepEqual(
		kf.dynamic.init.covariance,
		[[1, 0],
			[0, 1]]
	);
});
