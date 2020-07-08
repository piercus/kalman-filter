const arrayToFunction = require('./array-to-function.js');

/**
*Returns the corresponding model without arrays as values but only functions
*@param {ObservationConfig} observation
*@param {DynamicConfig} dynamic
*@returns {ObservationConfig, DynamicConfig} model with respect of the Core Kalman Filter properties
*/
module.exports = function ({observation, dynamic}) {
	const modelToBeChanged = {observation, dynamic};
	const changedModel = Object.assign({}, modelToBeChanged, {
		observation: Object.assign({}, modelToBeChanged.observation, {
			stateProjection: arrayToFunction(modelToBeChanged.observation.stateProjection),
			covariance: arrayToFunction(modelToBeChanged.observation.covariance)
		}),
		dynamic: Object.assign({}, modelToBeChanged.dynamic, {
			transition: arrayToFunction(modelToBeChanged.dynamic.transition),
			covariance: arrayToFunction(modelToBeChanged.dynamic.covariance)
		})
	});
	return changedModel;
};
