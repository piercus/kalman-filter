// Considering a pendulum model, in one dimension, with alpha (angle) and Valpha
// (speed), our model is to be considered without external forces on the pendulum
// (constant speed)

// We have used a specific script to build the default parameters [script](../../../script/covariance-pendulum.js)

const test = require('ava');

// Tests in 2D with constant speed model

const CoreKalmanFilter = require('../../../lib/core-kalman-filter.js');
const State = require('../../../lib/state.js');
const distanceMat = require('../../../lib/linalgebra/distance-mat.js');
const getCorrelation = require('../../helpers/get-correlation.js');

const huge = 1000;

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

// Const tiny = 0.001;
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
	const dist1 = distanceMat(firstState.mean, corrected1.mean);
	const dist2 = distanceMat(firstState.mean, corrected2.mean);

	// We verify that the new mean has changed more when observation does not fit the model
	t.true(dist1 < dist2);
});

// Test 2: Covariance position/speed in one direction

test('Covariance between position and speed', t => {
	const kf = new CoreKalmanFilter(defaultOptions);
	const {covariance} = kf.predict();

	t.not(covariance[0][1], 0); // Check if the covariance between alpha and Valpha is not zero
	t.not(covariance[1][0], 0);
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
	const obsNoiseOptions = Object.assign({}, defaultOptions, {
		observation: Object.assign({}, defaultOptions.observation, {
			covariance() {
				return [
					[10]
				];
			}
		})
	});
	const kf = new CoreKalmanFilter(obsNoiseOptions);

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

	// Verify that the corrected variance is not linked to the quality of the observation
	const dist1 = [
		Math.abs(corrected1.covariance[0][0] - predicted1.covariance[0][0]),
		Math.abs(corrected1.covariance[1][1] - predicted1.covariance[1][1])
	];
	const dist2 = [
		Math.abs(corrected2.covariance[0][0] - predicted1.covariance[0][0]),
		Math.abs(corrected2.covariance[1][1] - predicted1.covariance[1][1])
	];
	t.is(dist1[0], dist2[0]);
	t.is(dist1[1], dist2[1]);

	// Check that it is the same for the covariance between alpha and Valpha
	t.is(corrected1.covariance[1][0], corrected2.covariance[1][0]);
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
	const obsNoiseOptions = Object.assign({}, defaultOptions, {
		observation: Object.assign({}, defaultOptions.observation, {
			covariance() {
				return [
					[10]
				];
			}
		})
	});
	const kf = new CoreKalmanFilter(obsNoiseOptions);

	const badFitObs = [[0.17]];
	const corrected1 = kf.correct({
		predicted: predicted1,
		observation: badFitObs
	});
	const diff = Math.abs(
		getCorrelation(predicted1.covariance, 0, 1) - getCorrelation(corrected1.covariance, 0, 1)
	);
	t.true(diff < 0.1);
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
	const nullCovTransitionOptions = Object.assign({}, defaultOptions, {
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
	const kf2 = new CoreKalmanFilter(nullCovTransitionOptions);

	const predicted1 = kf1.predict({
		previousCorrected: previousCorrected1
	});
	const predicted2 = kf1.predict({
		previousCorrected: previousCorrected2
	});
	const predicted3 = kf2.predict({
		previousCorrected: previousCorrected1
	});

	t.true(Math.abs(predicted1.covariance[0][1]) > Math.abs(predicted2.covariance[0][1]));
	t.true(Math.abs(predicted1.covariance[0][1]) > Math.abs(predicted3.covariance[0][1]));

	// Verify that alpha variance is also greater is these cases
	t.true(Math.abs(predicted1.covariance[0][0]) > Math.abs(predicted2.covariance[0][0]));
	t.true(Math.abs(predicted1.covariance[0][0]) > Math.abs(predicted3.covariance[0][0]));
});

// Test the getValue function:

test('getValue function', t => {
	const previousCorrected1 = new State({
		mean: [[0.1], [0.5]],
		covariance: [
			[1, 0.005],
			[0.005, 0.01]
		],
		index: 1
	});
	const multiParameterTransition = function ({previousCorrected, index}) {
		const timeStep = (index % 2) ? 1 : 0.5;
		// We consider a resistance from the air, proportionnal to v*v
		// NB: this model is not a good physical modeling
		const speedSlowDownFactor = Math.min(previousCorrected.mean[1][0] ^ 2 * 0.01, 1);
		return [
			[1, timeStep],
			[0, 1 - speedSlowDownFactor]
		];
	};

	const multiParameterTransitionOptions = Object.assign({}, defaultOptions, {
		dynamic: Object.assign({}, defaultOptions.dynamic, {
			transition: multiParameterTransition
		})
	});
	const kf = new CoreKalmanFilter(multiParameterTransitionOptions);
	const predicted = kf.predict({previousCorrected: previousCorrected1});
	t.true(predicted instanceof State);

	const previousCorrected2 = new State({
		mean: [[0.1], [3]],
		covariance: [
			[1, 0.005],
			[0.005, 0.01]
		],
		index: 1
	});

	// With a high speed, our predicted should be a constant-position
	const predicted2 = kf.predict({previousCorrected: previousCorrected2});
	t.is(predicted2.mean[1][0], 0);
});
