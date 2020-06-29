const test = require('ava');

// Tests in 4D with constant speed model

const CoreKalmanFilter = require('../../../lib/core-kalman-filter.js');
const State = require('../../../lib/state.js');
const trace = require('../../../lib/linalgebra/trace.js');
const distanceMat = require('../../../lib/linalgebra/distance-mat.js');

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
			mean: [[500], [500], [500], [500], [0], [0], [0], [0]],

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
			return [
				[1, 0, 0, 0, 0, 0, 0, 0],
				[0, 1, 0, 0, 0, 0, 0, 0],
				[0, 0, 1, 0, 0, 0, 0, 0],
				[0, 0, 0, 1, 0, 0, 0, 0],
				[0, 0, 0, 0, 0.1, 0, 0, 0],
				[0, 0, 0, 0, 0, 0.1, 0, 0],
				[0, 0, 0, 0, 0, 0, 0.1, 0],
				[0, 0, 0, 0, 0, 0, 0, 0.1]
			];
		}
	}
};

const huge = 1000;
const tiny = 0.001;
const timeStep = 0.1;

const observations = [
	[1, 2, 1, 1],
	[2.1, 3.9, 1.2, 1.5],
	[3, 6, 1.4, 1.9]
];

// Test 1: Verify that if observation fits the model, then the newCorrected.covariance
// is smaller than if not

test('Fitted observation', t => {
	const kf1 = new CoreKalmanFilter(defaultOptions);
	const firstState = new State({
		mean: [[1], [2], [1], [1], [11], [19], [12], [15]],
		covariance: [
			[1, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 0, 0],
			[0, 0, 0, 0, 0.1, 0, 0, 0],
			[0, 0, 0, 0, 0, 0.1, 0, 0],
			[0, 0, 0, 0, 0, 0, 0.1, 0],
			[0, 0, 0, 0, 0, 0, 0, 0.1]
		]
	});
	const badFittedObs = [[3.2, 2.9, 1.7, 1.2]];
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

// Test 2: Impact of stateProjection on the model

test('stateProjection', t => {
	const otherStateProjectionOpts = Object.assign({}, defaultOptions, {
		dynamic: Object.assign({}, defaultOptions.dynamic, {
			stateProjection() {
				return [
					[2, 0, 0, 0, 0, 0, 0, 0],
					[0, 2, 0, 0, 0, 0, 0, 0],
					[0, 0, 1, 0, 0, 0, 0, 0],
					[0, 0, 0, 1, 0, 0, 0, 0]
				];
			}
		})
	});
	const firstState = new State({
		mean: [[1], [2], [1], [1], [11], [19], [12], [15]],
		covariance: [
			[1, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 0, 0],
			[0, 0, 0, 0, 0.1, 0, 0, 0],
			[0, 0, 0, 0, 0, 0.1, 0, 0],
			[0, 0, 0, 0, 0, 0, 0.1, 0],
			[0, 0, 0, 0, 0, 0, 0, 0.1]
		]
	});
	const kf1 = new CoreKalmanFilter(defaultOptions);
	const kf2 = new CoreKalmanFilter(otherStateProjectionOpts);
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
	const corrected2 = kf1.correct({
		predicted: predicted2,
		observation: observations[1]
	});

	// If our model is correct, the difference between corrected mean and predicted mean
	// should be greater for the stateProjection that gives more importance to some parameters
	const diff1 = distanceMat(corrected1.mean, predicted1.mean);
	const diff2 = distanceMat(corrected2.mean, predicted2.mean);

	t.true(diff2 > diff1);
});
