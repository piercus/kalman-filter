const arrayToFunction = require('./array-to-function.js');

/**
*@param {Object} model the model (dynamic or observation), to transform
*@returns {Object} model with respect of the Core Kalman Filter properties
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
