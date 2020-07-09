const registeredDynamicModels = {
	'constant-position': require('../lib/dynamic/constant-position.js'),
	'constant-speed': require('../lib/dynamic/constant-speed.js')
};
const registeredObservationModels = {
	sensors: require('../lib/observation/sensor.js')
};

module.exports = {
	registerObservation: (name, fn) => registeredObservationModels[name] = fn,
	registerDynamic: (name, fn) => registeredDynamicModels[name] = fn,
	buildObservation: observation => {
		if (!registeredObservationModels[observation.name]) {
			throw (new Error('The provided observation model name is not registered'));
		}

		return registeredObservationModels[observation.name](observation);
	},
	buildDynamic: (dynamic, observation) => {
		if (!registeredDynamicModels[dynamic.name]) {
			throw (new Error('The provided dynamic model name is not registered'));
		}

		return registeredDynamicModels[dynamic.name](dynamic, observation);
	}
};
