/**
 * @typedef {import('../../index.d.ts').KalmanFilter} KalmanFilter
 */
const {KalmanFilter} = kalmanFilter;// eslint-disable-line no-undef
const createElement = require('../shared/views/create-element');
const createGroupPoint = require('../shared/views/create-group-point');
const kfOptions = require('./kf-options.js');
const noisyObservations = require('./observations.json').observations;
/** @type {KalmanFilter} */
const kf = new KalmanFilter(kfOptions);
let predicted = kf.predict();

const img = document.querySelector('#bouncing-ball');// eslint-disable-line no-undef

// Create all the elements of the prediction or correction phase
const delay = 200;

let promise = Promise.resolve();
let previousCorrected = null;

const delayPromise = delay => new Promise(resolve => {
	setTimeout(resolve, delay);
});

module.exports = {
	run() {
		for (const [index, box] of noisyObservations.entries()) {
			promise = promise
				.then(() => {
					predicted = kf.predict({previousCorrected});
					const {mean, covariance} = predicted;

					createGroupPoint({
mean, covariance, parent: img, className: 'predicted', color: 'blue',
});

					return delayPromise(delay);
				})
				.then((b => {
					console.log({b});
					const w = 10;
					const h = 10;
					createElement({
						className: 'observation',
						bbox: [
							b[0],
							b[1],
							w,
							h,
						],
						parent: img,
						color: 'white',
						lineStyle: 'solid',
					});

					return delayPromise(delay);
				}).bind(null, box, index))
				.then((b => {
					previousCorrected = kf.correct({predicted, observation: b});
					const {mean, covariance} = previousCorrected;

					createGroupPoint({
mean, covariance, parent: img, className: 'corrected', color: 'red',
});

					return delayPromise(delay);
				}).bind(null, box, index));
		}
	},
};
