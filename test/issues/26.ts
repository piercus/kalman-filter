import test from 'ava';
const {KalmanFilter} = require('../../index.js');

const START_TIME_DELTA_SECS = 1;
const COVARIANCE_FILL = 1;

test('#26', t => {
	const flags = {};
	const kFilter = new KalmanFilter({
		observation: {
			dimension: 2,
			stateProjection() {
				flags['observation.stateProjection'] = true;
				const t_delta = 1;
				return [[1, 0, t_delta, 0, 0.5 * t_delta * t_delta, 0],
					[0, 1, 0, t_delta, 0, 0.5 * t_delta * t_delta]];
			},
			covariance() {
				flags['observation.covariance'] = true;
				const t_delta = 1;
				return [[COVARIANCE_FILL * t_delta, 0],
					[0, COVARIANCE_FILL * t_delta]];
			},
		},
		dynamic: {
			dimension: 6,
			timeStep: 1,
			init: {
				mean: [[0], [0], [0], [0], [0], [0]],
				covariance: [[1 / COVARIANCE_FILL, 0, 0, 0, 0, 0],
					[0, 1 / COVARIANCE_FILL, 0, 0, 0, 0],
					[0, 0, 1 / COVARIANCE_FILL * START_TIME_DELTA_SECS, 0, 0, 0],
					[0, 0, 0, 1 / COVARIANCE_FILL * START_TIME_DELTA_SECS, 0, 0],
					[0, 0, 0, 0, 1 / COVARIANCE_FILL * START_TIME_DELTA_SECS * START_TIME_DELTA_SECS, 0],
					[0, 0, 0, 0, 0, 1 / COVARIANCE_FILL * START_TIME_DELTA_SECS * START_TIME_DELTA_SECS]],
				index: -1,
			},
			transition() {
				flags['dynamic.transition'] = true;
				const t_delta = 1;
				return [[1, 0, t_delta, 0, 0.5 * t_delta * t_delta, 0],
					[0, 1, 0, t_delta, 0, 0.5 * t_delta * t_delta],
					[0, 0, 1, 0, t_delta, 0],
					[0, 0, 0, 1, 0, t_delta],
					[0, 0, 0, 0, 1, 0],
					[0, 0, 0, 0, 0, 1]];
			},
			covariance() {
				flags['dynamic.covariance'] = true;
				const t_delta = 1;
				return [[1 / COVARIANCE_FILL, 0, 0, 0, 0, 0],
					[0, 1 / COVARIANCE_FILL, 0, 0, 0, 0],
					[0, 0, 1 / COVARIANCE_FILL * t_delta, 0, 0, 0],
					[0, 0, 0, 1 / COVARIANCE_FILL * t_delta, 0, 0],
					[0, 0, 0, 0, 1 / COVARIANCE_FILL * t_delta * t_delta, 0],
					[0, 0, 0, 0, 0, 1 / COVARIANCE_FILL * t_delta * t_delta]];
			},
		},
	});

	const nextPredicted = kFilter.predict({previousCorrected: null});
	kFilter.correct({predicted: nextPredicted, observation: [[0], [0]]});

	t.is(Object.keys(flags).length, 4);
});

