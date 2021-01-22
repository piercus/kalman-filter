const test = require('ava');

const CoreKalmanFilter = require('../../../lib/core-kalman-filter.js');
const State = require('../../../lib/state.js');
const trace = require('../../../lib/linalgebra/trace.js');
const equalState = require('../../../test/helpers/equal-state.js');
const distanceMat = require('../../../lib/linalgebra/distance-mat.js');
const sum = require('../../../lib/linalgebra/sum.js');

const defaultOptions = {
	observation: {
		dimension: 1,
		stateProjection() {
			return [
				[1]
			];
		},

		covariance() {
			return [
				[1]
			];
		}
	},

	dynamic: {
		dimension: 1,
		init: {
			mean: [[0]],

			covariance: [
				[1]
			]
		},
		transition() { // Constant position model
			return [
				[1]
			];
		},

		covariance() {
			return [
				[1]
			];
		}
	}

};

const observation = [[0.1]];

const huge = 1000;
const tiny = 0.001;

// Test 1: Verify that we have the same result when the previousCorrected.mean =null
// and when previousCorrected.mean = 0

test('Init with zero mean', t => {
	const kf1 = new CoreKalmanFilter(defaultOptions);
	const {mean, covariance, index} = defaultOptions.dynamic.init;
	const initState = new State({mean, covariance, index});
	t.true(equalState(kf1.predict(), kf1.predict({
		previousCorrected: initState
	})));
	t.true(kf1.predict() instanceof State);
});

// Test 2: Verify that smalls previousCorrected.covariance and dynamic.covariance
// return a small predicted.covariance

test('Impact previousCorrected and dynamic covariance', t => {
	const smallDynamicCovOptions = Object.assign({}, defaultOptions, {
		dynamic: Object.assign({}, defaultOptions.dynamic, {
			covariance() {
				return [
					[tiny]
				];
			}
		})
	});
	const kf = new CoreKalmanFilter(smallDynamicCovOptions);
	const previousCorrected = new State({
		mean: [[0]],
		covariance: [[tiny]]
	});
	const predicted = kf.predict({previousCorrected});
	t.true(predicted instanceof State);
	t.is(predicted.index, undefined);
	t.true(2 / trace(predicted.covariance) > huge / 2); // Verifying that the sum of the variance is tiny
});

// Test 3: Verify that a huge predicted.covariance leads to a kalman Gain bigger than 0.9
// (i.e. we trust majorly the observation)
test('Huge predicted covariance', t => {
	const kf = new CoreKalmanFilter(defaultOptions);
	const predicted = new State({
		mean: [[1]],
		covariance: [
			[huge]
		]
	});
	const corrected = kf.correct({
		predicted,
		observation
	});
	const kalmanGain = kf.getGain({predicted, stateProjection: [[1]]});
	t.true(corrected instanceof State);
	t.true(kalmanGain > 0.99);
});

// Test 4a: Play with dynamic and previousCorrected covariances

test('Dynamic covariance test', t => {
	const normalPreviousCorrected = new State({
		mean: [[0]],
		covariance: [[1]]
	});
	// Const smallPreviousCorrected = new State({
	// 	mean: [[0]],
	// 	covariance: [[tiny]]
	// });
	const hugePreviousCorrected = new State({
		mean: [[0]],
		covariance: [[huge]]
	});

	const kfDefault = new CoreKalmanFilter(defaultOptions);

	const hugeDynOptions = Object.assign({}, defaultOptions, {
		dynamic: Object.assign({}, defaultOptions.dynamic, {
			covariance() {
				return [
					[huge]
				];
			}
		})
	});
	const kfHuge = new CoreKalmanFilter(hugeDynOptions);

	const predicted1 = kfDefault.predict({
		previousCorrected: normalPreviousCorrected
	});
	const predicted2 = kfHuge.predict({
		previousCorrected: normalPreviousCorrected
	});

	const predicted3 = kfDefault.predict({
		previousCorrected: hugePreviousCorrected
	});
	t.true(trace(predicted1.covariance) < trace(predicted2.covariance));

	t.true(equalState(predicted2, predicted3));
});

// Test 4b: Play with observation and previousCorrected covariances

test('Observation covariance test', t => {
	const normalPredicted = new State({
		mean: [[0]],
		covariance: [[1]]
	});
	const smallPredicted = new State({
		mean: [[0]],
		covariance: [[tiny]]
	});
	// Const hugePredicted = new State({
	// 	mean: [[0]],
	// 	covariance: [[huge]]
	// });

	const kfDefault = new CoreKalmanFilter(defaultOptions);

	const smallObservationCovOptions = Object.assign({}, defaultOptions, {
		observation: Object.assign({}, defaultOptions.observation, {
			covariance() {
				return [
					[tiny]
				];
			}
		})
	});
	const kfSmall = new CoreKalmanFilter(smallObservationCovOptions);

	const corrected1 = kfDefault.correct({
		predicted: normalPredicted,
		observation
	});

	const corrected2 = kfSmall.correct({
		predicted: normalPredicted,
		observation
	});

	const corrected3 = kfDefault.correct({
		predicted: smallPredicted,
		observation
	});
	t.true(trace(corrected1.covariance) > trace(corrected2.covariance));

	const kalmanGain1 = kfSmall.getGain({predicted: normalPredicted});
	const kalmanGain2 = kfDefault.getGain({predicted: normalPredicted, stateProjection: [[1]]});

	// Verify that the kalman gain is greater when we are more confident in Observation
	t.true(sum(kalmanGain1) > sum(kalmanGain2));
	t.true(equalState(corrected2, corrected3, 0.1));
});

// Test 5: Verify that if predicted.covariance = 0, then newCorrected.covariance = 0

test('Predicted covariance equals to zero', t => {
	const kf = new CoreKalmanFilter(defaultOptions);
	const predicted = new State({
		mean: [[0]],
		covariance: [
			[0]
		]
	});
	const corrected = kf.correct({
		predicted,
		observation
	});
	t.is(trace(corrected.covariance), 0);
});

// Test 6: Verify that if observation fits the model, then the newCorrected.covariance
// is smaller than if not

test('Fitted observation', t => {
	const kf1 = new CoreKalmanFilter(defaultOptions);
	const badFittedObs = [[1.2]];
	const previousCorrected = new State({
		mean: defaultOptions.dynamic.init.mean,
		covariance: defaultOptions.dynamic.init.covariance
	});
	const predicted1 = kf1.predict({
		previousCorrected
	});
	const corrected1 = kf1.correct({
		predicted: predicted1,
		observation
	});
	const corrected2 = kf1.correct({
		predicted: predicted1,
		observation: badFittedObs
	});
	t.true(corrected1 instanceof State);
	t.true(corrected2 instanceof State);

	const dist1 = distanceMat(defaultOptions.dynamic.init.mean, corrected1.mean);
	const dist2 = distanceMat(defaultOptions.dynamic.init.mean, corrected2.mean);

	// We verify that the corrected is broader for the correction with badFittedObs
	t.true(dist1 < dist2);
});

// Test : Throw an error if a covariance or mean is wrongly sized
// I think this test will be done during implementation of normal Kalman Filter

// test('Wrongly sized', t => {
// 	const WrongOptions = Object.assign({}, defaultOptions, {
// 		dynamic: Object.assign({}, defaultOptions.dynamic, {
// 			covariance() {
// 				return [
// 					[tiny, 0],
// 					[0, tiny]
// 				];
// 			}
// 		}),
// 		observation: Object.assign({}, defaultOptions.observation, {
// 			covariance() {
// 				return [
// 					[tiny]
// 				];
// 			}
// 		})
// 	});
// 	const kf = new CoreKalmanFilter(WrongOptions);
// 	const error = t.throws(() => kf.predict());
// 	t.is(error.message, 'An array of the model is wrongly sized');
// });

// Test : Throws an error for NaN predicted

test('NaN Error', t => {
	const previousCorrected = new State({
		mean: [[0]],
		covariance: [[Number.NaN]]
	});
	const kf = new CoreKalmanFilter(defaultOptions);

	const error = t.throws(() => {
		kf.predict({previousCorrected});
	});
	t.is(error.message, '[covariance] Matrix should not have a NaN\nIn : \nNaN');
});
// Error Test: non-squared matrix

test('Non squared matrix', t => {
	const nonSquaredState = new State({
		mean: [[0, 0]],
		covariance: [
			[1, 0, 0],
			[0, 1, 0]
		]
	});
	const kf = new CoreKalmanFilter(defaultOptions);
	const error = t.throws(() => {
		kf.predict({previousCorrected: nonSquaredState});
	});
	t.is(error.message, '[mean] expected size (1) and length (2) does not match');
});
