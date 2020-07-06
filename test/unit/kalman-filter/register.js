const test = require('ava');

const KalmanFilter = require('../../../lib/kalman-filter.js');
const State = require('./state.js');
//Verify that we can use a registered model, the observations are here in 1D


test('Check constant position', t => {
	const previousCorrected = new State({
		mean: [[0]],
		covariance: [[1]]
	});
	const kf = new KalmanFilter({
		observation: {
			sensorDimension: 1,
			covariance: [[1]],
			stateProjection: [[1]]
		},
		dynamic: {
			dimension: 1,
			name: 'constant-position',
			covariance: [[1]]
		}
	});
	const observations = [[0.1],[0.2], [0.1]];
	const res = kf.filter(observations[0]);
	const stateObjective = new State({
		mean: [[]]
	})
	t.true(equalState(res, stateObjective));
});


test('Check constant speed', t => {

});


test('Check sensor', t => {

});


//Verify that we can register a model and use it correctly

test('Registering custom speed', t => {
	const kf = new KalmanFilter({
		dynamic: {
			name: 'constant-speed',
			timeStep: 0.1,
			covariance: [1, 0.01]
		}
	});

	registerDynamic('custom-speed', function(){
		const dimension = 2;
		const transition = [
			[1, timeStep],
			[0, 1]
		];
		const covariance = [
			[1, 0],
			[0, 0.01]
		];
		return {dimension, transition, covariance};
	});

	const kf2 = new KalmanFilter({
		dynamic: 'custom-speed',
		timeStep: 0.1,
		covariance: [1, 0.01]
	})
	const predicted1 = kf.predict({});
	const predicted2 = kf2.predict({});

	t.true(predicted1 instanceof State);
	t.true(predicted2 instanceof State);
	t.true(equalState(predicted1, predicted2));

	// Verify that the model had been correctly added to the list of exiting models
	t.true(registeredModels.some(model => model.name === 'custom-speed'));
});
