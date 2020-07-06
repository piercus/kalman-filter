const test = require('ava');

const equalState = require('../../../test/helpers/equal-state.js');

const KalmanFilter = require('../../../lib/kalman-filter.js');
const State = require('./state.js');

const huge = 1000;
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
			mean: [[500], [500], [0], [0]],

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

//Test 1: Verify polymorphism in a dynamic parameter

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

	//Verify that the transition is a function even if constructor's option is a matrixOptions
	t.true(typeof(kf3.dynamic.transition), 'function');
	t.true(typeof(kf2.dynamic.covariance), 'function');

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
	const corrected2 = kf2.correct({
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


//Test 2: Verify polymorphism on observation

test('Polymorphism on observation', t => {
	const arrayObservation = [1, 2];

	const kf = new KalmanFilter(defaultOptions);
	const predicted = kf.predict();
	const corrected1 = kf.correct({
		predicted,
		observation: observation[1]
	});
	const corrected2 = kf.correct({
		predicted,
		observation: arrayObservation
	});
	t.true(corrected1 instanceof State);
	t.true(corrected2 instanceof State);
	t.true(equalState(corrected1, corrected2));
});
