// Xt ~ N(dynamic.transition°Xt-1, dynamic.covariance)

const matMul = require('../lib/linalgebra/mat-mul.js');

module.exports = function () {
	const timeStep = 0.1;
	const transition = [
		[1, timeStep],
		[0, 1]
	];

	const gtAlpha = function (iteration) {
		return 10 * Math.sin(iteration * timeStep);
	};

	const gtValpha = function (iteration) {
		return 10 * timeStep * Math.cos(iteration * timeStep);
	};

	const gtList = [[[gtAlpha(0)], [gtAlpha(0)]]];

	const predictions = [[[0], [0]]];

	const l = 10000;
	for (let i = 1; i <= l; i++) {
		gtList.push([[gtAlpha(i)], [gtValpha(i)]]);
	}

	for (let i = 0; i < l; i++) {
		predictions.push(matMul(transition, gtList[i]));
	}

	const covariance = gtList.map((gt, index) => {
		const deltaX = gt[0][0] - predictions[index][0][0];
		const deltaVx = gt[1][0] - predictions[index][1][0];
		return [
			[deltaX * deltaX, deltaX * deltaVx],
			[deltaX * deltaVx, deltaVx * deltaVx]
		];
	})
		.reduce((a, b) => ([
			[a[0][0] + b[0][0], a[0][1] + b[0][1]],
			[a[1][0] + b[1][0], a[1][1] + b[1][1]]
		]))
		.map(r => r.map(a => a / gtList.length));
	return covariance;
};
