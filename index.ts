import * as modelCollection from './lib/model-collection';
import * as defaultDynamicModels from './lib/dynamic';
import * as defaultObservationModels from './lib/observation';

function camelToDash(str: string) {
	if (str === str.toLowerCase()) {
		return str;
	}
    return str.replaceAll(/[A-Z]/g, m => "-" + m.toLowerCase());
}

Object.keys(defaultDynamicModels).forEach((k: string) => {

	modelCollection.registerDynamic(camelToDash(k), defaultDynamicModels[k]);
});

Object.keys(defaultObservationModels).forEach((k: string) => {
	modelCollection.registerObservation(camelToDash(k), defaultObservationModels[k]);
});

// module.exports = Object.assign({
// 	KalmanFilter: require('./lib/kalman-filter'),
// 	getCovariance: require('./lib/utils/get-covariance'),
// 	State: require('./lib/state'),
// 	checkCovariance: require('./lib/utils/check-covariance'),
// 	correlationToCovariance: require('./lib/utils/correlation-to-covariance'),
// 	covarianceToCorrelation: require('./lib/utils/covariance-to-correlation'),
// 	projectObservation: require('./lib/utils/project-observation'),
// }, modelCollection);

export * from './lib/model-collection';
export * from './lib/dynamic';
export * from './lib/observation';

export { default as KalmanFilter } from './lib/kalman-filter';
export { default as getCovariance } from './lib/utils/get-covariance';
export { default as State } from './lib/state';
export { default as checkCovariance} from './lib/utils/check-covariance';
export { default as correlationToCovariance} from './lib/utils/correlation-to-covariance';
export { default as covarianceToCorrelation} from './lib/utils/covariance-to-correlation';
export { default as projectObservation} from './lib/utils/project-observation';
