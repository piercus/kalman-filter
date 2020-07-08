/**
*Replaces the given observation by the registered model
*@param {ObservationConfig} observation
*@param {DynamicConfig} dynamic
*@param {Object} registeredObservationModels
*@param {String} name the name of the model we want to use
*@returns {ObservationConfig, DynamicConfig}
*/

module.exports = function ({observation, dynamic, registeredObservationModels, name}) {
	if (name) {
		if (typeof (registeredObservationModels[name]) !== 'undefined') {
			return {
				observation: Object.assign({}, observation, registeredObservationModels[name]),
				dynamic
			};
		}
	}

	return {observation, dynamic};
};
