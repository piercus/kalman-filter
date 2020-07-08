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
	buildObservation: (observation) => registeredObservationModels[observation.name](observation),
	buildDynamic: (dynamic) => registeredDynamicModels[dynamic.name](dynamic)
};
