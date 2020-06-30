//ReadMe Tests

const test = require('ava');

const {KalmanFilter} = require('kalman-filter');
const State = require('../../../lib/state.js');
const trace = require('../../../lib/linalgebra/trace.js');
const equalState = require('../test/helpers/equal-state.js');
const distanceMat = require('../../../lib/linalgebra/distance-mat.js');


const defaultOptions = {
	observation: {
		sensorDimension: 1,
		name: 'sensors'
	},

	dynamic: {
		dimension: 1,
		init: {
			mean: [[0]],

			covariance: [
				[1]
			]
		},
		name: 'constant-position',
		timeStep: 0.1,
		covariance: [1]
	}
};

const observations = [[0, 2], [0.1, 4], [0.5, 9], [0.2, 12]];

const huge = 1000;
const tiny = 0.001;


test('Constant-position on 2D Data', t => {
	const kFilter = new KalmanFilter({
		observation: {
			sensorDimension: 2,
			name: 'sensors'
		},
		dynamic: {
			name: 'constant-position',// observation.sensorDimension == dynamic.dimension
			covariance: [3, 4]// equivalent to diag([3, 4])
		}
	});
	const predicted = kFilter.predict();
	const corrected = kFilter.correct({predicted, observation: observations[0]});
	t.true(predicted instanceof State);
	t.true(corrected instanceof State);
	t.is(typeof corrected.index, 'number');
})

test('Constant-speed on 3D Data', t => {
	const previousCorrected = null;
	const kFilter = new KalmanFilter({
		observation: {
			sensorDimension: 3,
			name: 'sensors'
		},
		dynamic: {
			name: 'constant-speed',// observation.sensorDimension * 2 == state.dimension
			timeStep: 0.1,
			covariance: [3, 3, 3, 4, 4, 4]// equivalent to diag([3, 3, 3, 4, 4, 4])
		}
	});
	const predicted = kFilter.predict({previousCorrected});
	const corrected = kFilter.correct({predicted, observation: observations[0]});
	t.true(predicted instanceof State);
	t.true(corrected instanceof State);
	t.is(typeof corrected.index, 'number');
	t.is(corrected.covariance.length, 6);
})
