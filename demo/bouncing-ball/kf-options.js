
const posVar = 10;
const timeStep = 1;
const huge = 1000;
const floor = 438;

module.exports = {
	observation: {
		dimension: 2,
		stateProjection: [
			[1, 0, 0, 0, 0],
			[0, 1, 0, 0, 0]
		],
		// Covariance generated thanks to getCovariance
		covariance: [posVar/5, posVar/5]
		// Covariance: [posVar, posVar, posVar, posVar],

	},

	dynamic: {
		init: {
			mean: [[943], [385], [0], [0], [0]],

			covariance: [
				[huge, 0, 0, 0, 0],
				[0, huge, 0, 0, 0],
				[0, 0, huge, 0, 0],
				[0, 0, 0, huge, 0],
				[0, 0, 0, 0, huge],
			]
		},

		constant({previousCorrected}) {
			const normalY = previousCorrected.mean[1][0] + previousCorrected.mean[3][0] * timeStep;

			let controlY = 0;

			if (normalY > floor) {
				controlY = 2 * (floor - normalY);
			}
			return [[0], [controlY], [0], [0], [0]];
		},

		transition({previousCorrected}) {
			const normalY = previousCorrected.mean[1][0] + previousCorrected.mean[3][0] * timeStep;
			let vY = 1;

			if (normalY > floor) {
				vY = -1;
			}

			return [
				[1, 0, timeStep, 0, 0],
				[0, 1, 0, timeStep, 0],
				[0, 0, 1, 0, 0],
				[0, 0, 0, vY, timeStep],
				[0, 0, 0, 0, 1]
			];
		},

		dimension: 5,

		covariance: [
			posVar,
			posVar,
			posVar * timeStep * timeStep,
			posVar * timeStep * timeStep,
			posVar * (timeStep ** 4)
		]
	}
};
