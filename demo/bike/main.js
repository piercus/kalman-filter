const {KalmanFilter} = kalmanFilter;// eslint-disable-line no-undef
const createElement = require('../shared/views/create-element');
const createGroupBoxes = require('../shared/views/create-group-boxes');
const noisyObservations = require('./observations.json').observations;

const kf = new KalmanFilter(kfOptions);
let predicted = kf.predict();

const img = document.querySelector('#bikes');// eslint-disable-line no-undef

// Create all the elements of the prediction or correction phase
const delay = 200;

let promise = Promise.resolve();

const delayPromise = delay => new Promise(resolve => {
	setTimeout(resolve, delay);
});

const els = [];

module.exports = {
	run() {
		let previousCorrected = null;
		let i = els.length;
		while (i-- >= 0) {
			const el = els[i];
			el.remove();
			els.splice(i, 1);
		}

		for (const [index, box] of noisyObservations.entries()) {
			promise = promise
				.then(() => {
					console.log(previousCorrected.mean);
					predicted = kf.predict({previousCorrected});
					const {mean, covariance} = predicted;

					const element = createGroupBoxes({mean, covariance, parent: img, className: 'predicted', color: 'blue'});
					els.append(element);

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
					els.append(element);

					return delayPromise(delay);
				}).bind(null, box, index))
				.then((b => {
					previousCorrected = kf.correct({predicted, observation: b});
					const {mean, covariance} = previousCorrected;

					const element = createGroupBoxes({mean, covariance, parent: img, className: 'corrected', color: 'red'});
					els.append(element);

					return delayPromise(delay);
				}).bind(null, box, index));
		}
	},
};
