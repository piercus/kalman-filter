const test = require('ava');

const CoreKalmanFilter = require('../../../lib/core-kalman-filter.js');
const State = require('../../../lib/state.js');
const trace = require('../../../lib/trace.js');
const equalState = require('../helpers/equal-state.js');

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
		})(),
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
	t.true(kf2.predict instanceof State);
});

// Test 2: Verify that smalls previousCorrected.covariance and dynamic.covariance
// return a small predicted.covariance

test('Impact previousCorrected and dynamic covariance', t => {
	const smallDynamicCovOpts = Object.assign({}, defaultOptions, {
		dynamic: Object.assign({}, defaultOptions.dynamic, {
			covariance: [
				[tiny]
			],
		})
	});
	const kf = new CoreKalmanFilter(smallDynamicCovOpts);
	const previousCorrected = new State({
		mean: [[0]]
		covariance: [[tiny]]
	});
	const predicted = kf.filter({previousCorrected});
	t.true(predicted instanceof State);
	t.is(typeof predicted.index, 'number');
	t.true(2 / trace(predicted.covariance) > huge / 2); //Verifying that the sum of the variance is tiny
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
	t.true(2 / trace(previousCorrected.covariance) < tiny / 2); //Verifying that the sum of the variance is huge
});

// Test 4a: Play with dynamic and previousCorrected covariances

test('Dynamic covariance test', t => {
	const normalPreviousCorrected = new State({
		mean: [[0]],
		covariance: [[1]]
	})
	const smallPreviousCorrected = new State({
		mean: [[0]],
		covariance: [[tiny]]
	})
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
		}),
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
	const smallDynamicCovOpts = Object.assign({}, defaultOptions, {
		dynamic: Object.assign({}, defaultOptions.dynamic, {
			covariance: [
				[tiny]
			]
		}),
		observation: Object.assign({}, defaultOptions.observation, {
			covariance: [[huge]]
		})
	});
	const kf1 = new CoreKalmanFilter(smallDynamicCovOpts);
	const smallObservationCovOpts = Object.assign({}, defaultOptions, {
		dynamic: Object.assign({}, defaultOptions.dynamic, {
			covariance: [
				[huge]
			]
		}),
		observation: Object.assign({}, defaultOptions.observation, {
			covariance: [[tiny]]
		})
	});
	const kf2 = new CoreKalmanFilter(smallObservationCovOpts);
	const predicted1 = kf1.filter({
		previousCorrected: smallDynamicCovOpts.dynamic.init
	});
	const predicted2 = kf2.filter({
		previousCorrected: smallObservationCovOpts.dynamic.init
	});
	const corrected1 = kf1.correct({
		predicted1,
		observation: smallDynamicCovOpts.observation.observations
	});
	const corrected2 = kf2.correct({
		predicted2,
		observation: smallObservationCovOpts.observation.observations
	});
	t.true(trace(corrected1.covariance) > trace(corrected2.covariance));
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
	})
	const corrected1 = kf1.correct({
		predicted1,
		observation: observation
	})
	const corrected2 = kf1.correct({
		predicted1,
		observation: badFittedObs
	})
	t.true(corrected1 instanceof State);
	t.true(corrected2 instanceof State);
	t.true(trace(corrected1.covariance)<trace(corrected2.covariance));

})

// Test : Throw an error if a covariance or mean is wrongly sized

test('Wrongly sized', t => {
	const WrongOpts = Object.assign({}, defaultOptions, {
		dynamic: Object.assign({}, defaultOptions.dynamic, {
			covariance: [
				[tiny,0],
				[0, tiny]
			]
		}),
		observation: Object.assign({}, defaultOptions.observation, {
			covariance: [[huge]]
		})
	});
	const kf = new CoreKalmanFilter(WrongOpts)
	throws(() => {
		kf.predict(), 'An array of the model is wrongly sized'

	})
})

// Test : Throws an error if covariance are non-function
