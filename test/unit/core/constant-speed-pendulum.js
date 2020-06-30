// Considering a pendulum model, in one dimension, with alpha (angle) and Valpha
// (speed), our model is to be considered without external forces on the pendulum
// (constant speed)

// We have used a specific script to build the default parameters

const test = require('ava');

// Tests in 2D with constant speed model

const CoreKalmanFilter = require('../../../lib/core-kalman-filter.js');
const State = require('../../../lib/state.js');
const trace = require('../../../lib/linalgebra/trace.js');
const distanceMat = require('../../../lib/linalgebra/distance-mat.js');
const getCorrelation = require('../../helpers/get-correlation.js');

const defaultOptions = {
	observation: {
		dimension: 1,
		stateProjection() {
			return [
				[1, 0]
			];
		},

		covariance() {
			return [
				[1]
			];
		}
	},

	dynamic: {
		init: {
			mean: [[0], [0]],

			covariance: [
				[huge, 0],
				[0, huge]

			]
		},

		dimension: 2,
		transition() {
			return [
				[1, timeStep],
				[0, 1]
			];
		},

		covariance() {
			return [
				[0.5, 0.00025],
				[0.00025, 0.05]
			];
		}
	}

};

const huge = 1000;
const tiny = 0.001;
const timeStep = 0.1;

const observations = [
	[[0]],
	[[0.2]],
	[[0.3]]
];

// Test 1: Verify that if observation fits the model, then the newCorrected.covariance
// is smaller than if not

test('Fitted observation', t => {
	const kf1 = new CoreKalmanFilter(defaultOptions);
	const firstState = new State({
		mean: [[0], [1]],
		covariance: [
			[1, 0],
			[0, 1]
		]
	});
	const badFittedObs = [[0.5]];
	const predicted1 = kf1.predict({
		previousCorrected: firstState
	});
	const corrected1 = kf1.correct({
		predicted: predicted1,
		observation: observations[1]
	});
	const corrected2 = kf1.correct({
		predicted: predicted1,
		observation: badFittedObs
	});
	t.true(corrected1 instanceof State);
	t.true(corrected2 instanceof State);
	t.true(trace(corrected1.covariance) < trace(corrected2.covariance));
	const dist1 = distanceMat(firstState.mean, corrected1.mean);
	const dist2 = distanceMat(firstState.mean, corrected2.mean);

	// We verify that the new mean has changed more when observation does not fit the model
	t.true(dist1 < dist2);
});

// Test 2: Covariance position/speed in one direction

test('Covariance between position and speed', t => {
	const kf = new CoreKalmanFilter(defaultOptions);
	const {covariance} = kf.predict();
	t.not(covariance[1][2], 0); // Check if the covariance between x and Vx is not zero
	t.not(covariance[2][1], 0);
});

// Test 3a: Predicted near the groundTruth and with small variance on alpha

test('Predicted variance', t => {
	const predicted1 = new State({
		mean: [[0.1], [0.5]],
		covariance: [
			[0.1, 0.0001],
			[0.0001, 0.001]
		]
	});
	const obsNoiseOpts = Object.assign({}, defaultOptions, {
		observation: Object.assign({}, defaultOptions.observation, {
			covariance() {
				return [
					[10]
				];
			}
		})
	});
	const kf = new CoreKalmanFilter(obsNoiseOpts);

	const goodFitObs = [[0.09]];
	const badFitObs = [[0.17]];
	const corrected1 = kf.correct({
		predicted: predicted1,
		observation: goodFitObs
	});
	const corrected2 = kf.correct({
		predicted: predicted1,
		observation: badFitObs
	});

	// Verify that the corrected variance of bad observation is closer to the predicted covariance
	const dist1 = [
		corrected1.covariance[0][0] - predicted1.covariance[0][0],
		corrected1.covariance[1][1] - predicted1.covariance[1][1]
	];
	const dist2 = [
		corrected2.covariance[0][0] - predicted1.covariance[0][0],
		corrected2.covariance[1][1] - predicted1.covariance[1][1]
	];
	t.true(dist1[0] < dist2[0]);
	t.true(dist1[1] < dist2[1]);

	// Check that the covariance between alpha and Valpha is greater when the observation is fitted
	t.true(corrected1.covariance[1][0] > corrected2.covariance[1][0]);
});

// Test 3b: Check in the same case is the correlation between x and vx remain the same
// between predicted and corrected if bad-fit observation

test('Bad fit observation and correlation', t => {
	const predicted1 = new State({
		mean: [[0.1], [0.5]],
		covariance: [
			[0.1, 0.0001],
			[0.0001, 0.001]
		]
	});
	const obsNoiseOpts = Object.assign({}, defaultOptions, {
		observation: Object.assign({}, defaultOptions.observation, {
			covariance() {
				return [
					[10]
				];
			}
		})
	});
	const kf = new CoreKalmanFilter(obsNoiseOpts);

	const badFitObs = [[0.17]];
	const corrected1 = kf.correct({
		predicted: predicted1,
		observation: badFitObs
	});
	t.is(getCorrelation(predicted1.covariance, 0, 1),
		getCorrelation(corrected1.covariance, 0, 1)
	);
});

// Test 4: Impact of a non-null covariance on predicted covariance

test('Non null covariance', t => {
	// PreviousCorrected with non null covariance
	const previousCorrected1 = new State({
		mean: [[0.1], [0.5]],
		covariance: [
			[1, 0.005],
			[0.005, 0.01]
		]
	});
	// PreviousCorrected with null covariance
	const previousCorrected2 = new State({
		mean: [[0.1], [0.5]],
		covariance: [
			[1, 0],
			[0, 0.01]
		]
	});
	const nullCovTransitionOpts = Object.assign({}, defaultOptions, {
		dynamic: Object.assign({}, defaultOptions.dynamic, {
			transition() {
				return [
					[0.5, 0],
					[0, 0.005]
				];
			}
		})
	});

	// Verify that the covariance between alpha and Valpha is greater
	// when both covariances are non null
	const kf1 = new CoreKalmanFilter(defaultOptions);
	const kf2 = new CoreKalmanFilter(nullCovTransitionOpts);

	const predicted1 = kf1.predict(previousCorrected1);
	const predicted2 = kf1.predict(previousCorrected2);
	const predicted3 = kf2.predict(previousCorrected1);

	t.true(predicted1.covariance[0][1] > predicted2.covariance[0][1]);
	t.true(predicted1.covariance[0][1] > predicted3.covariance[0][1]);

	// Verify that alpha variance is also greater is these cases
	t.true(predicted1.covariance[0][0] > predicted2.covariance[0][0]);
	t.true(predicted1.covariance[0][0] > predicted3.covariance[0][0]);
});
