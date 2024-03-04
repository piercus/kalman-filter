/**
 * @typedef {import('../../index.d.ts').KalmanFilter} KalmanFilter
 */
const {KalmanFilter} = kalmanFilter;// eslint-disable-line no-undef
const createElement = require('../shared/views/create-element');
const createGroupBoxes = require('../shared/views/create-group-boxes');
const noisyObservations = require('./observations.json').observations;
const kfOptions = require('./kf-options');

/** @type {KalmanFilter} */
const kf = new KalmanFilter(kfOptions);
let predicted = kf.predict();

const img = document.querySelector('#bikes');// eslint-disable-line no-undef

// Create all the elements of the prediction or correction phase
const delay = 200;

let promise = Promise.resolve();
let running = false;
const delayPromise = delay => new Promise(resolve => {
	setTimeout(resolve, delay);
});

const els = [];

module.exports = {
	run() {
		if (running) {
			return;
		}

		running = true;
		let previousCorrected = null;
		let i = els.length;
		while (--i >= 0) {
			const element = els[i];
			element.remove();
			els.splice(i, 1);
		}

		for (const [index, box] of noisyObservations.entries()) {
			promise = promise
				.then(() => {
					predicted = kf.predict({previousCorrected});
					const {mean, covariance} = predicted;

					const element = createGroupBoxes({
mean, covariance, parent: img, className: 'predicted', color: 'blue',
});
					els.push(element);

					return delayPromise(delay);
				})
				.then((b => {
					const element = createElement({
						className: 'observation',
						bbox: [
							b[0] + (b[2] / 2),
							b[1] + (b[3] / 2),
							b[2],
							b[3],
						],
						parent: img,
						color: 'white',
						lineStyle: 'solid',
					});
					els.push(element);

					return delayPromise(delay);
				}).bind(null, box, index))
				.then((b => {
					previousCorrected = kf.correct({predicted, observation: b});
					const {mean, covariance} = previousCorrected;

					const element = createGroupBoxes({
mean, covariance, parent: img, className: 'corrected', color: 'red',
});
					els.push(element);

					return delayPromise(delay);
				}).bind(null, box, index));
		}

		promise.then(() => {
			running = false;
		});
	},
};
