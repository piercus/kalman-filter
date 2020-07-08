/**
*Replaces the given dynamic config by the registered model
*@param {ObservationConfig} observation
*@param {DynamicConfig} dynamic
*@param {Object} registeredDynamicModels
*@param {String} name the name of the model we want to use
*@returns {ObservationConfig, DynamicConfig}
*/

module.exports = function ({observation, dynamic, registeredDynamicModels, name}) {
	if (name) {
		if (typeof (registeredDynamicModels[name]) !== 'undefined') {
			return {
				observation,
				dynamic: Object.assign({}, dynamic, registeredDynamicModels[name])
			};
		}
	}

	return {observation, dynamic};
};
