const test = require('ava');

const equalState = require('../../../test/helpers/equal-state.js');

const KalmanFilter = require('../../../lib/kalman-filter.js');
const State = require('../../../lib/state.js');

test('Filter method', t => {
	const observations = [[0.11], [0.21], [0.3]];
	const kf = new KalmanFilter({
		dynamic: {
			name: 'constant-speed'
		},
		observation: {
			name: 'sensor'
		}
	});
	const filtered = kf.filter({observation: observations[0]});
	t.true(filtered instanceof State);

	const predicted = kf.predict();
	const corrected = kf.correct({predicted, observation: observations[0]});
	t.true(equalState(filtered, corrected));
});

test('FilterAll', t => {
	const observations = [[0.11], [0.21], [0.3]];
	const kf = new KalmanFilter({
		dynamic: {
			name: 'constant-speed'
		},
		observation: {
			name: 'sensor'
		}
	});
	const allFiltered = kf.filterAll(observations);
	t.is(allFiltered.length, 3);
	const filtered = kf.filter({observation: observations[0]});
	const firstMean = filtered.mean.map(m => m[0]);
	t.deepEqual(firstMean, allFiltered[0]);
});
