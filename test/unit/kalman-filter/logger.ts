import test  from 'ava';
import { KalmanFilter} from '../../..';

test('Logger.debug', t => {
	let hasDebug = false;
	const kf = new KalmanFilter({
		observation: {
			name: 'sensor',
		},
		dynamic: {
			name: 'constant-speed',
		},
		logger: {
			info: (...args) => console.log(...args),
			debug() {
				hasDebug = true;
				// Console.log(...args);
			},
			warn: (...args) => console.log(...args),
			error: (...args) => console.log(...args),
		},
	});
	kf.predict();
	t.is(hasDebug, true);
});
