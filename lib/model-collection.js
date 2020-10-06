const registeredDynamicModels = {
	'constant-position': require('../lib/dynamic/constant-position.js'),
	'constant-speed': require('../lib/dynamic/constant-speed.js'),
	'constant-acceleration': require('../lib/dynamic/constant-acceleration.js')
};
const registeredObservationModels = {
	sensor: require('../lib/observation/sensor.js')
};

/**
*RegisterObservation enables to create a new observation model and stock it
* @param {String} name
* @callback fn the function corresponding to the desired model
*/

/**
*registerDynamic enables to create a new dynamic model and stocks it
* @param {String} name
* @callback fn the function corresponding to the desired model
*/

/**
*buildObservation enables to build a model given an observation configuration
* @param {ObservationConfig} observation
* @returns {ObservationConfig} the configuration with respect to the model
*/

/**
*buildDynamic enables to build a model given dynamic and observation configurations
* @param {DynamicConfig} dynamic
* @param {ObservationConfig} observation
* @returns {DynamicConfig} the dynamic configuration with respect to the model
*/

module.exports = {
	registerObservation: (name, fn) => {
		registeredObservationModels[name] = fn;
	},
	registerDynamic: (name, fn) => {
		registeredDynamicModels[name] = fn;
	},
	buildObservation: observation => {
		if (!registeredObservationModels[observation.name]) {
			throw (new Error(`The provided observation model name (${observation.name}) is not registered`));
		}

		return registeredObservationModels[observation.name](observation);
	},
	buildDynamic: (dynamic, observation) => {
		if (!registeredDynamicModels[dynamic.name]) {
			throw (new Error(`The provided dynamic model (${dynamic.name}) name is not registered`));
		}

		return registeredDynamicModels[dynamic.name](dynamic, observation);
	}
};
