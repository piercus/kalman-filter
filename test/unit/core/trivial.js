const test = require('ava');

const CoreKalmanFilter = require('../../../lib/core-kalman-filter.js');
const State = require('../../../lib/state.js');
const trace = require('../../../lib/trace.js');
const equalState = require('../helpers/equal-state.js');
const distanceMat = require('../../../lib/distance-mat.js');

const defaultOptions = {
	observation: {
		dimension: 1,
		stateProjection: (function () {
			return [
				[1]
			];
		})(),

		covariance: (function () {
			return [
				[1]
			];
		})()
	},

	dynamic: {
		dimension: 1,
		init: {
			mean: [[0]],

			covariance: [
				[1]
			]
		},
		transition: (function () { // Constant position model
			return [
				[1]
			];
		})(),

		covariance: (function () {
			return [
				[1]
			];
		})()
	}

};

const observation = [[0.1]];

const huge = 1000;
const tiny = 0.001;

// Test 1: Verify that we have the same result when the previousCorrected.mean =null
// and when previousCorrected.mean = 0

test('Init with zero mean', t => {
	const kf1 = new CoreKalmanFilter(defaultOptions);
	t.true(equalState(kf1.predict(), kf1.predict({
		previousCorrected: defaultOptions.dynamic.init
	})));
	t.true(kf1.predict instanceof State);
});

// Test 2: Verify that smalls previousCorrected.covariance and dynamic.covariance
// return a small predicted.covariance

test('Impact previousCorrected and dynamic covariance', t => {
	const smallDynamicCovOpts = Object.assign({}, defaultOptions, {
		dynamic: Object.assign({}, defaultOptions.dynamic, {
			covariance: [
				[tiny]
			]
		})
	});
	const kf = new CoreKalmanFilter(smallDynamicCovOpts);
	const previousCorrected = new State({
		mean: [[0]],
		covariance: [[tiny]]
	});
	const predicted = kf.filter({previousCorrected});
	t.true(predicted instanceof State);
	t.is(typeof predicted.index, 'number');
	t.true(2 / trace(predicted.covariance) > huge / 2); // Verifying that the sum of the variance is tiny
});

// Test 3: Verify that a huge predicted.covariance return a huge newCorrected.covariance

test('Huge predicted covariance', t => {
	const kf = new CoreKalmanFilter(defaultOptions);
	const predicted = new State({
		covariance: [
			[huge]
		]
	});
	const corrected = kf.correct({
		predicted,
		observation: defaultOptions.observation.observations
	});
	t.true(corrected instanceof State);
	t.true(2 / trace(corrected.covariance) < tiny / 2); // Verifying that the sum of the variance is huge
});

// Test 4a: Play with dynamic and previousCorrected covariances

test('Dynamic covariance test', t => {
	const normalPreviousCorrected = new State({
		mean: [[0]],
		covariance: [[1]]
	});
	const smallPreviousCorrected = new State({
		mean: [[0]],
		covariance: [[tiny]]
	});
	const hugePreviousCorrected = new State({
		mean: [[0]],
		covariance: [[huge]]
	});

	const kfDefault = new CoreKalmanFilter(defaultOptions);

	const hugeDynOpts = Object.assign({}, defaultOptions, {
		dynamic: Object.assign({}, defaultOptions.dynamic, {
			covariance: [
				[huge]
			]
		})
	});
	const kfHuge = new CoreKalmanFilter(hugeDynOpts);

	const predicted1 = kfDefault.filter({
		previousCorrected: normalPreviousCorrected
	});
	const predicted2 = kfHuge.filter({
		previousCorrected: normalPreviousCorrected
	});
	const predicted3 = kfHuge.filter({
		previousCorrected: smallPreviousCorrected
	});
	const predicted4 = kfDefault.filter({
		previousCorrected: hugePreviousCorrected
	});
	t.true(trace(predicted1.covariance) < trace(predicted2.covariance));
	t.true(equalState(predicted1, predicted3));
	t.true(equalState(predicted2, predicted4));
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
	const hugePredicted = new State({
		mean: [[0]],
		covariance: [[huge]]
	});

	const kfDefault = new CoreKalmanFilter(defaultOptions);

	const smallObservationCovOpts = Object.assign({}, defaultOptions, {
		observation: Object.assign({}, defaultOptions.observation, {
			covariance: [[tiny]]
		})
	});
	const kfSmall = new CoreKalmanFilter(smallObservationCovOpts);

	const corrected1 = kfDefault.correct({
		predicted: normalPredicted,
		observation
	});
	const corrected2 = kfSmall.correct({
		predicted: normalPredicted,
		observation
	});
	const corrected3 = kfSmall.correct({
		predicted: hugePredicted,
		observation
	});
	const corrected4 = kfDefault.correct({
		previousCorrected: smallPredicted,
		observation
	});
	t.true(trace(corrected1.covariance) > trace(corrected2.covariance));
	t.true(equalState(corrected1, corrected3));
	t.true(equalState(corrected2, corrected4));
});

// Test 5: Verify that if predicted.covariance = 0, then newCorrected.covariance = 0

test('Predicted covariance equals to zero', t => {
	const kf = new CoreKalmanFilter(defaultOptions);
	const predicted = new State({
		covariance: [
			[0]
		]
	});
	const corrected = kf.correct({
		predicted,
		observation: defaultOptions.observation.observations
	});
	t.is(trace(corrected.covariance), 0);
});

// Test 6: Verify that if observation fits the model, then the newCorrected.covariance
// is smaller than if not

test('Fitted observation', t => {
	const kf1 = new CoreKalmanFilter(defaultOptions);
	const badFittedObs = [[1.2]];
	const predicted1 = kf1.predict({
		previousCorrected: defaultOptions.dynamic.init
	});
	const corrected1 = kf1.correct({
		predicted1,
		observation
	});
	const corrected2 = kf1.correct({
		predicted1,
		observation: badFittedObs
	});
	t.true(corrected1 instanceof State);
	t.true(corrected2 instanceof State);
	t.true(trace(corrected1.covariance) < trace(corrected2.covariance));
	const dist1 = distanceMat(defaultOptions.dynamic.init, corrected1.mean);
	const dist2 = distanceMat(defaultOptions.dynamic.init, corrected2.mean);

	// We verify that the corrected is broader for the correction with badFittedObs
	t.true(dist1 < dist2);
});

// Test : Throw an error if a covariance or mean is wrongly sized

test('Wrongly sized', () => {
	const WrongOpts = Object.assign({}, defaultOptions, {
		dynamic: Object.assign({}, defaultOptions.dynamic, {
			covariance: [
				[tiny, 0],
				[0, tiny]
			]
		}),
		observation: Object.assign({}, defaultOptions.observation, {
			covariance: [[huge]]
		})
	});
	const kf = new CoreKalmanFilter(WrongOpts);
	throws(() => {
		kf.predict({previousCorrected: defaultOptions.dynamic.init},
			'An array of the model is wrongly sized');
	});
});

// Test : Throws an error if covariance are non-function
