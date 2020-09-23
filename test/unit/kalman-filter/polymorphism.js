const test = require('ava');

const equalState = require('../../../test/helpers/equal-state.js');

const KalmanFilter = require('../../../lib/kalman-filter.js');
const State = require('../../../lib/state.js');

const huge = 1e6;
const timeStep = 0.1;

const defaultOptions = {
	observation: {
		dimension: 2,
		stateProjection() {
			return [
				[1, 0, 0, 0],
				[0, 1, 0, 0]
			];
		},

		covariance() {
			return [
				[1, 0],
				[0, 1]
			];
		}
	},

	dynamic: {
		init: {
			mean: [[0], [0], [0], [0]],

			covariance: [
				[huge, 0, 0, 0],
				[0, huge, 0, 0],
				[0, 0, huge, 0],
				[0, 0, 0, huge]
			]
		},

		dimension: 4,
		transition() {
			return [
				[1, 0, timeStep, 0],
				[0, 1, 0, timeStep],
				[0, 0, 1, 0],
				[0, 0, 0, 1]
			];
		},

		covariance() {
			return [
				[1, 0, 0, 0],
				[0, 1, 0, 0],
				[0, 0, 0.01, 0],
				[0, 0, 0, 0.01]
			];
		}
	}

};

const observations = [
	[[1], [2]],
	[[2.1], [3.9]],
	[[3], [6]]
];

// Test 1: Verify polymorphism in a dynamic parameter

test('Polymorphism', t => {
	const kf1 = new KalmanFilter(defaultOptions);

	const matrixOptions = Object.assign({}, defaultOptions, {
		dynamic: Object.assign({}, defaultOptions.dynamic, {
			transition: [
				[1, 0, timeStep, 0],
				[0, 1, 0, timeStep],
				[0, 0, 1, 0],
				[0, 0, 0, 1]
			]
		})
	});
	const simpleArrayOptions = Object.assign({}, defaultOptions, {
		dynamic: Object.assign({}, defaultOptions.dynamic, {
			covariance: [1, 1, 0.01, 0.01]
		})
	});

	const kf2 = new KalmanFilter(matrixOptions);
	const kf3 = new KalmanFilter(simpleArrayOptions);

	// Verify that the transition is a function even if constructor's option is a matrixOptions
	t.is(typeof (kf2.dynamic.transition), 'object');
	t.is(typeof (kf3.dynamic.covariance), 'object');

	const predicted1 = kf1.predict();
	const predicted2 = kf2.predict();
	const predicted3 = kf3.predict();

	const corrected1 = kf1.correct({
		predicted: predicted1,
		observation: observations[0]
	});
	const corrected2 = kf2.correct({
		predicted: predicted2,
		observation: observations[0]
	});
	const corrected3 = kf2.correct({
		predicted: predicted3,
		observation: observations[0]
	});

	t.true(predicted1 instanceof State);
	t.true(predicted2 instanceof State);
	t.true(predicted3 instanceof State);
	t.true(corrected1 instanceof State);
	t.true(corrected2 instanceof State);
	t.true(corrected3 instanceof State);

	t.true(equalState(predicted1, predicted2));
	t.true(equalState(predicted1, predicted3));
	t.true(equalState(predicted3, predicted2));

	t.true(equalState(corrected1, corrected2));
	t.true(equalState(corrected1, corrected3));
	t.true(equalState(corrected3, corrected2));
});

// Test 2: Verify polymorphism on observation

test('Polymorphism on observation', t => {
	const arrayObservation = [1, 2];

	const kf = new KalmanFilter(defaultOptions);
	const predicted = kf.predict();
	const corrected1 = kf.correct({
		predicted,
		observation: observations[0]
	});
	const corrected2 = kf.correct({
		predicted,
		observation: arrayObservation
	});
	t.true(corrected1 instanceof State);
	t.true(corrected2 instanceof State);
	t.true(equalState(corrected1, corrected2));
});

// Test 3: Verify the dynamic.init by defaultOptions

test('Dynamic init', t => {
	const noInitOptions = Object.assign({}, defaultOptions, {
		dynamic: Object.assign({}, defaultOptions.dynamic, {
			init: undefined
		})
	});
	const kf = new KalmanFilter(noInitOptions);
	const predicted = kf.predict();
	const corrected = kf.correct({predicted, observation: observations[0]});

	t.true(predicted instanceof State);
	t.true(corrected instanceof State);

	// We verify that init has been correctly initialized
	t.not(kf.dynamic.init, undefined);
	const huge = 1e6;
	const initObjective = {
		mean: [[0], [0], [0], [0]],
		index: -1,
		covariance: [
			[huge, 0, 0, 0],
			[0, huge, 0, 0],
			[0, 0, huge, 0],
			[0, 0, 0, huge]
		]
	};
	t.deepEqual(kf.dynamic.init, initObjective);

	const kf2 = new KalmanFilter(defaultOptions);
	const predicted2 = kf2.predict();
	const corrected2 = kf2.correct({predicted: predicted2, observation: observations[0]});

	t.true(equalState(predicted, predicted2));
	t.true(equalState(corrected, corrected2));
});

// Test 4a: Verify that dynamic.dimension and observation.dimension are linked to stateProjection
// dimensions when stateProjection is a matrix

test('stateProjection dimensions', t => {
	const noDimensionsOptions = Object.assign({}, defaultOptions, {
		dynamic: Object.assign({}, defaultOptions.dynamic, {
			dimension: undefined
		}),
		observation: Object.assign({}, defaultOptions.observation, {
			dimension: undefined,
			stateProjection: [
				[1, 0, 0, 0],
				[0, 1, 0, 0]
			]
		})
	});
	const kf = new KalmanFilter(noDimensionsOptions);
	t.is(kf.dynamic.dimension, 4);
	t.is(kf.observation.dimension, 2);
});

// Test 4b: Verify that dynamic.dimension is set with respect to transition matrix
// dimension when transition is a matrix

test('Transition dimension', t => {
	const noDynamicDimensionOptions = Object.assign({}, defaultOptions, {
		dynamic: Object.assign({}, defaultOptions.dynamic, {
			dimension: undefined,
			transition: [
				[1, 0, timeStep, 0],
				[0, 1, 0, timeStep],
				[0, 0, 1, 0],
				[0, 0, 0, 1]
			]
		})
	});
	const kf = new KalmanFilter(noDynamicDimensionOptions);
	t.is(kf.dynamic.dimension, 4);
});

// Test 5: Verify that stateProjection is build if observedProjection is given only

test('Building stateProjection', t => {
	const noStateProjectionOptions = Object.assign({}, defaultOptions, {
		observation: Object.assign({}, defaultOptions.observation, {
			stateProjection: undefined,
			observedProjection: [
				[1, 0],
				[0, 1]
			]
		})
	});
	const kf = new KalmanFilter(noStateProjectionOptions);
	const stateProjectionObjective = [
		[1, 0, 0, 0],
		[0, 1, 0, 0]
	];
	t.deepEqual(kf.observation.stateProjection, stateProjectionObjective);
});

// Test Error 1: Verify that an error if thrown when there is a difference between
// dynamic.dimension, observation.dimension and stateProjection

test('Dimension Error with stateProjection', t => {
	const badSetOptions = Object.assign({}, defaultOptions, {
		dynamic: Object.assign({}, defaultOptions.dynamic, {
			dimension: 4
		}),
		observation: Object.assign({}, defaultOptions.observation, {
			dimension: 2,
			stateProjection: [
				[1, 0],
				[0, 1]
			]
		})
	});
	const error = t.throws(() => {
		const kf = new KalmanFilter(badSetOptions);
		kf.predict();
	});
	t.is(error.message, 'stateProjection dimensions not matching with observation and dynamic dimensions');
});

// Test Error 2: Verify that an error if thrown when there is a difference between
// dynamic.dimension and transition matrix dimension

test('Dimension Error with Transition', t => {
	const badSetOptions = Object.assign({}, defaultOptions, {
		dynamic: Object.assign({}, defaultOptions.dynamic, {
			dimension: 2,
			transition: [
				[1, 0, timeStep, 0],
				[0, 1, 0, timeStep],
				[0, 0, 1, 0],
				[0, 0, 0, 1]
			]
		})
	});
	const error = t.throws(() => {
		const kf = new KalmanFilter(badSetOptions);
		kf.predict();
	});
	t.is(error.message, 'transition dimension not matching with dynamic dimension');
});

// Test Error 3: Throw an error if both observedProjection and stateProjection are defined

test('Observed and State Projections', t => {
	const badSetOptions = Object.assign({}, defaultOptions, {
		observation: Object.assign({}, defaultOptions.observation, {
			observedProjection: [
				[1, 0],
				[0, 1]
			],
			stateProjection: [
				[1, 0, 0, 0],
				[0, 1, 0, 0]
			]
		})
	});
	const error = t.throws(() => {
		const kf = new KalmanFilter(badSetOptions);
		kf.predict();
	});
	t.is(error.message, 'You cannot use both observedProjection and stateProjection');
});

// Test index is not NaN if undefined

test('Index initialization', t => {
	const kf = new KalmanFilter(defaultOptions);
	const firstState = new State({
		mean: [[0], [0], [0], [0]],
		covariance: [
			[1, 0, 0, 0],
			[0, 1, 0, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 1]
		]
	});
	const predicted1 = kf.predict();
	const predicted2 = kf.predict({previousCorrected: firstState});
	t.false(Number.isNaN(predicted1.index));
	t.false(Number.isNaN(predicted2.index));
	t.is(predicted1.index, undefined);
	t.is(predicted2.index, undefined);
});
