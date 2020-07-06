const test = require('ava');

const KalmanFilter = require('../../../lib/kalman-filter.js');
const State = require('./state.js');
//Verify that we can use a registered model


test('Check constant position', t => {

});


test('Check constant speed', t => {

});


test('Check sensor', t => {

});


//Verify that we can register a model

test('Registering custom speed', t => {
	const kf = new KalmanFilter({
		dynamic: 'constant-speed',
		timeStep: 0.1,
		covariance: [1, 0.01]
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
});
