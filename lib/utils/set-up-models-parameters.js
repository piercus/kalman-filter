const useObservationModel = require('./use-observation-model.js');
const useDynamicModel = require('./use-dynamic-model.js');
const setDimensions = require('./set-dimensions.js');
const checkDimensions = require('./check-dimensions.js');
const buildStateProjection = require('./build-state-projection.js');
const extendDynamicInit = require('./extend-dynamic-init.js');
const KalmanFilter = require('../../lib/kalman-filter.js');

/**
*This function fills the given options by successively checking if it uses a registered model,
* it builds and checks the dynamic and observation dimensions, build the stateProjection if only observedProjection
*is given, and initialize dynamic.init
*@param {DynamicConfig} options.dynamic
*@param {ObservationConfig} options.observation
*/

module.exports = function ({observation, dynamic}) {
	const modelOptions = useObservationModel({
		observation,
		dynamic,
		registeredModels: KalmanFilter.registeredObservationModels,
		name: observation.name
	});
	const modelsOptions = useDynamicModel({
		observation: modelOptions.observation,
		dynamic: modelOptions.dynamic,
		registeredModels: KalmanFilter.registeredDynamicModels,
		name: modelOptions.dynamic.name
	});
	const withDimensionOptions = setDimensions(modelsOptions);
	const checkedDimensionOptions = checkDimensions(withDimensionOptions);
	const buildStateProjectionOptions = buildStateProjection(checkedDimensionOptions);
	return extendDynamicInit(buildStateProjectionOptions);
};
