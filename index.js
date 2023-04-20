const modelCollection = require('./lib/model-collection');
const defaultDynamicModels = require('./lib/dynamic');
const defaultObservationModels = require('./lib/observation');

Object.keys(defaultDynamicModels).forEach(k => {
	modelCollection.registerDynamic(k, defaultDynamicModels[k]);
});

Object.keys(defaultObservationModels).forEach(k => {
	modelCollection.registerObservation(k, defaultObservationModels[k]);
});

module.exports = Object.assign({
	KalmanFilter: require('./lib/kalman-filter'),
	getCovariance: require('./lib/utils/get-covariance'),
	State: require('./lib/state'),
	checkCovariance: require('./lib/utils/check-covariance'),
	correlationToCovariance: require('./lib/utils/correlation-to-covariance'),
	covarianceToCorrelation: require('./lib/utils/covariance-to-correlation'),
	projectObservation: require('./lib/utils/project-observation'),
}, modelCollection);
