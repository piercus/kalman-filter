import test from 'ava';
import {KalmanFilter} from '../../index';

test('Sinusoide Extended Kalman-Filter', t => {
	const noiseLevel = 0.25;
	const stdDevA = 0.1;
	const stdDevW = 0.001;
	const deltaTime = 1;
	const startAmplitude = 10;
	const startW = 0.5;
	const kf = new KalmanFilter({
		observation: {
			dimension: 1,
			fn({predicted}) {
				const [a, , offset] = predicted.mean.map(a => a[0]);
				return [[a * Math.sin(offset)]];
			},
			stateProjection({predicted}) {
				const [a, , offset] = predicted.mean.map(a => a[0]);
				return [[Math.sin(offset), 0, a * Math.cos(offset)]];
			},
			covariance: [[noiseLevel * noiseLevel]],
		},
		dynamic: {
			init: {mean: [[startAmplitude], [startW], [0]], covariance: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]},
			transition: [
				[1, 0, 0],
				[0, 1, 0],
				[0, deltaTime, 1],
			],
			covariance: [
				[deltaTime * stdDevA * stdDevA, 0, 0],
				[0, deltaTime * stdDevW * stdDevW, deltaTime * deltaTime * stdDevW * stdDevW / 2],
				[0, deltaTime * deltaTime * stdDevW * stdDevW / 2, deltaTime * deltaTime * deltaTime * stdDevW * stdDevW / 3],
			],
		},
	});

	function boxMuller() {
		let u = 0;
		let v = 0;
		while (u === 0) {
			u = Math.random();
		}

		while (v === 0) {
			v = Math.random();
		}

		const x = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
		return x;
	}

	let time = 1;
	const maxTime = 100;
	const values: any[] = [];
	let a = startAmplitude;
	let w = startW;
	const offset = 0;

	while (time < maxTime) {
		a += boxMuller() * stdDevA;
		w += boxMuller() * stdDevW;
		// Offset += boxMuller(stdDevOffset);
		const phi = (time * w) + offset;
		const gt = Math.sin(phi) * a;
		const sensor = gt + (boxMuller() * noiseLevel);
		values.push({
gt, sensor, a, w, phi,
});
		time++;
	}

	const observations = values.map(v => [v.sensor]);
	const response = kf.filterAll(observations);
	t.is(response.length, values.length);
});
