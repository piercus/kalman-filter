const posVar = 100;
const timeStep = 0.2;
const sizeVar = 1;
const huge = 1e4;
module.exports = {
	observation: {
		dimension: 4,
		stateProjection: [
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
		],
		covariance: [posVar, posVar, sizeVar, sizeVar],
	},

	dynamic: {
		name: 'constant-acceleration',
		dimension: 12,
		init: {
			mean: [[900], [290], [100], [100], [-100], [0], [0], [0], [0], [0], [0], [0]],
			covariance: [
				huge,
				huge,
				huge,
				huge,
				huge,
				huge,
				huge,
				huge,
				huge,
				huge,
				huge,
				huge,
			],
		},
		covariance: [
			posVar,
			posVar,
			sizeVar,
			sizeVar,
			posVar * timeStep * timeStep,
			posVar * timeStep * timeStep,
			sizeVar * timeStep * timeStep,
			sizeVar * timeStep * timeStep,
			posVar * (timeStep ** 4),
			posVar * (timeStep ** 4),
			sizeVar * (timeStep ** 4),
			sizeVar * (timeStep ** 4),
		],
	},
};
