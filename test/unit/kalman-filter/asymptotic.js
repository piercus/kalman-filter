const test = require('ava');

const KalmanFilter = require('../../../lib/kalman-filter.js');
const distanceMat = require('../../../lib/linalgebra/distance-mat.js');
const sum = require('../../../lib/linalgebra/sum.js');

// Test 1 : Verify that a simple model converges quickly

test('Convergence', t => {
	const kf = new KalmanFilter({
		dynamic: {
			name: 'constant-position',
			dimension: 1,
			covariance: [[1]]
		},
		observation: {
			dimension: 1,
			stateProjection: [[1]],
			covariance: [[1]]
		}
	});
	const asymptoticStateCovariance = kf.asymptoticStateCovariance();
	const asymptoticObjective = [[0.618]];
	t.true(distanceMat(asymptoticStateCovariance, asymptoticObjective) < 0.001);
});

// Test 2: Assert that if both dynamic.covariance and observation.covariance are huge, the covarianceConvergence is very huge

test('Large covariances', t => {
	const kf = new KalmanFilter({
		dynamic: {
			name: 'constant-speed',
			dimension: 2,
			covariance: [
				[1e6, 1e3],
				[1e3, 1e6]
			]
		},
		observation: {
			dimension: 1,
			stateProjection: [[1, 0]],
			covariance: [[1e6]]
		}
	});
	t.true(sum(kf.asymptoticStateCovariance()) > 1e6);
});

// Test Error 1 : Assert that an error is raised when matrices are not linear functions

test('Error when not converging', t => {
	const multiParameterCovariance = function ({previousCorrected}) {
		const changingParameter = previousCorrected.covariance[0][0] ** 2;
		return [
			[1, 0],
			[0, changingParameter]
		];
	};

	const kf = new KalmanFilter({
		dynamic: {
			dimension: 2,
			name: 'constant-speed',
			covariance: multiParameterCovariance
		},
		observation: {
			dimension: 1,
			stateProjection: [[1, 0]],
			covariance: [[1e6]]
		}
	});
	const error = t.throws(() => {
		kf.asymptoticStateCovariance();
	});
	t.is(error.message, 'The state covariance does not converge asymptotically');
});
