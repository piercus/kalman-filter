const observationCovariance = require('./observation-covariance.json');

const posVar = 100;
const timeStep = 0.2;
const sizeVar = 1;

module.exports = {
	observation: {
		dimension: 4,
		stateProjection: [
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
		],
		// Covariance generated thanks to getCovariance
		covariance: observationCovariance
		// Covariance: [posVar, posVar, posVar, posVar],

	},

	dynamic: {
		name: 'constant-acceleration',
		timeStep: 0.2,
		// Init: {
		// 	mean: [[943], [385], [75], [65], [-200], [-200], [0], [0], [-20], [-20], [0], [0]],
		//
		// 	covariance: [
		// 		[huge, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// 		[0, huge, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// 		[0, 0, huge, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// 		[0, 0, 0, huge, 0, 0, 0, 0, 0, 0, 0, 0],
		// 		[0, 0, 0, 0, huge, 0, 0, 0, 0, 0, 0, 0],
		// 		[0, 0, 0, 0, 0, huge, 0, 0, 0, 0, 0, 0],
		// 		[0, 0, 0, 0, 0, 0, huge, 0, 0, 0, 0, 0],
		// 		[0, 0, 0, 0, 0, 0, 0, huge, 0, 0, 0, 0],
		// 		[0, 0, 0, 0, 0, 0, 0, 0, huge, 0, 0, 0],
		// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, huge, 0, 0],
		// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, huge, 0],
		// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, huge],
		// 	]
		// },

		dimension: 12,

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
			sizeVar * (timeStep ** 4)
		]
	}
};
