const test = require('ava');

// Tests in 4D with constant speed model

const CoreKalmanFilter = require('../../../lib/core-kalman-filter.js');
const State = require('../../../lib/state.js');
const distanceMat = require('../../../lib/linalgebra/distance-mat.js');
const getCorrelation = require('../../helpers/get-correlation.js');

const huge = 1000;

const defaultOptions = {
	observation: {
		dimension: 4,
		stateProjection() {
			return [
				[1, 0, 0, 0, 0, 0, 0, 0],
				[0, 1, 0, 0, 0, 0, 0, 0],
				[0, 0, 1, 0, 0, 0, 0, 0],
				[0, 0, 0, 1, 0, 0, 0, 0]
			];
		},

		covariance() {
			return [
				[1, 0, 0, 0],
				[0, 1, 0, 0],
				[0, 0, 1, 0],
				[0, 0, 0, 1]
			];
		}
	},

	dynamic: {
		init: {
			mean: [[500], [500], [100], [100], [0], [0], [0], [0]],

			covariance: [
				[huge, 0, 0, 0, 0, 0, 0, 0],
				[0, huge, 0, 0, 0, 0, 0, 0],
				[0, 0, huge, 0, 0, 0, 0, 0],
				[0, 0, 0, huge, 0, 0, 0, 0],
				[0, 0, 0, 0, huge, 0, 0, 0],
				[0, 0, 0, 0, 0, huge, 0, 0],
				[0, 0, 0, 0, 0, 0, huge, 0],
				[0, 0, 0, 0, 0, 0, 0, huge]
			]
		},

		dimension: 8,

		transition() {
			return [
				[1, 0, 0, 0, timeStep, 0, 0, 0],
				[0, 1, 0, 0, 0, timeStep, 0, 0],
				[0, 0, 1, 0, 0, 0, timeStep, 0],
				[0, 0, 0, 1, 0, 0, 0, timeStep],
				[0, 0, 0, 0, 1, 0, 0, 0],
				[0, 0, 0, 0, 0, 1, 0, 0],
				[0, 0, 0, 0, 0, 0, 1, 0],
				[0, 0, 0, 0, 0, 0, 0, 1]

			];
		},

		covariance() {
			// We consider a screen having 1280*720 pixels and a size of a box of 100*100 pixels
			return [
				[1, 0, 0, 0, 0, 0, 0, 0],
				[0, 1, 0, 0, 0, 0, 0, 0],
				[0, 0, 0.1, 0, 0, 0, 0, 0],
				[0, 0, 0, 0.1, 0, 0, 0, 0],
				[0, 0, 0, 0, 0.01, 0, 0, 0],
				[0, 0, 0, 0, 0, 0.01, 0, 0],
				[0, 0, 0, 0, 0, 0, 0.001, 0],
				[0, 0, 0, 0, 0, 0, 0, 0.001]
			];
		}
	}
};

const timeStep = 0.1;

const observations = [
	[[1], [2], [1], [1]],
	[[2.1], [3.9], [1.02], [1.05]],
	[[3], [6], [1.04], [1.09]]
];

// Test 1: Verify that if observation fits the model, then the newCorrected.covariance
// is smaller than if not

test('Fitted observation', t => {
	const kf1 = new CoreKalmanFilter(defaultOptions);
	const firstState = new State({
		mean: [[1], [2], [1], [1], [11], [19], [0.2], [0.5]],
		covariance: [
			// The 0.3 covariance tells us that 30% of the time, when x moves out of constant
			// speed modelisation, it is because of occlusion which impacts w in the same
			// direction
			[1, 0, 0.3, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0],
			[0.3, 0, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 0, 0],
			[0, 0, 0, 0, 0.1, 0, 0, 0],
			[0, 0, 0, 0, 0, 0.1, 0, 0],
			[0, 0, 0, 0, 0, 0, 0.1, 0],
			[0, 0, 0, 0, 0, 0, 0, 0.1]
		]
	});
	const badFittedObs = [[3.2], [2.9], [1.7], [1.2]];
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

// Test 2: Impact of stateProjection on the model

test('stateProjection', t => {
	const otherStateProjectionOptions = Object.assign({}, defaultOptions, {
		observation: Object.assign({}, defaultOptions.observation, {
			stateProjection() {
				return [
					// State is centerX, centerY, width, height
					// Observation is left,top, width, height
					[1, 0, -0.5, 0, 0, 0, 0, 0],
					[0, 1, 0, 0.5, 0, 0, 0, 0],
					[0, 0, 1, 0, 0, 0, 0, 0],
					[0, 0, 0, 1, 0, 0, 0, 0]
				];
			}
		})
	});
	const firstState = new State({
		mean: [[1], [2], [0.1], [0.1], [11], [19], [1], [1]],

		covariance: [
			[1, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0.1, 0, 0, 0, 0, 0],
			[0, 0, 0, 0.1, 0, 0, 0, 0],
			[0, 0, 0, 0, 0.01, 0, 0, 0],
			[0, 0, 0, 0, 0, 0.01, 0, 0],
			[0, 0, 0, 0, 0, 0, 0.001, 0],
			[0, 0, 0, 0, 0, 0, 0, 0.001]
		]
	});
	const kf1 = new CoreKalmanFilter(defaultOptions);
	const kf2 = new CoreKalmanFilter(otherStateProjectionOptions);
	const predicted1 = kf1.predict({
		previousCorrected: firstState
	});
	const predicted2 = kf2.predict({
		previousCorrected: firstState
	});
	const corrected1 = kf1.correct({
		predicted: predicted1,
		observation: observations[1]
	});
	const corrected2 = kf2.correct({
		predicted: predicted2,
		observation: observations[1]
	});

	// Verify that the correlation between w and x is greater when the stateProjection
	// includes a dependance between x and w
	t.true(
		Math.abs(getCorrelation(corrected1.covariance, 2, 0)) <
		Math.abs(getCorrelation(corrected2.covariance, 2, 0))
	);
});

// Test 3: Mixed fitted observation: some terms are well fitted, others not

test('Mixed fitted observation', t => {
	const yBadFittedObs = [[2], [2.9], [1.02], [1.05]];
	const yAndhBadFittedObs = [[2], [2.9], [1.02], [1]];

	const kf1 = new CoreKalmanFilter(defaultOptions);
	const firstState = new State({
		mean: [[1], [2], [1], [1], [11], [19], [0.2], [0.5]],
		covariance: [
			// The 0.3 covariance tells us that 30% of the time, when x moves out of constant
			// speed modelisation, it is because of occlusion which impacts w in the same
			// direction
			[1, 0, 0.3, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0],
			[0.3, 0, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 0, 0],
			[0, 0, 0, 0, 0.1, 0, 0, 0],
			[0, 0, 0, 0, 0, 0.1, 0, 0],
			[0, 0, 0, 0, 0, 0, 0.1, 0],
			[0, 0, 0, 0, 0, 0, 0, 0.1]
		]
	});
	const predicted = kf1.predict({
		previousCorrected: firstState
	});
	const corrected1 = kf1.correct({
		predicted,
		observation: observations[1]
	});
	const corrected2 = kf1.correct({
		predicted,
		observation: yBadFittedObs
	});
	const corrected3 = kf1.correct({
		predicted,
		observation: yAndhBadFittedObs
	});
	// Objective1: Verify that the corrected covariance is bigger for y and h
	t.true(Math.abs(corrected2.covariance[1][1]) > Math.abs(corrected2.covariance[0][0]));
	// T.true(Math.abs(corrected2.covariance[1][1]) > Math.abs(corrected1.covariance[1][1]));
	// False: same result if fitted or not

	// Objective2: Verify that there is a covariance term between y and h if both are
	// badly fitted

	// t.not(corrected3.covariance[1][3], 0);
	// Not true also

	// Verify that the mean is broader to the prediction for y and h when UnFitted

	const dist1 = [
		Math.abs(corrected1.mean[1] - predicted.mean[1]),
		Math.abs(corrected1.mean[3] - predicted.mean[3])
	];
	const dist2 = [
		Math.abs(corrected3.mean[1] - predicted.mean[1]),
		Math.abs(corrected3.mean[3] - predicted.mean[3])
	];

	t.true(dist1[0] < dist2[0]);
	t.true(dist1[1] < dist2[1]);
});
