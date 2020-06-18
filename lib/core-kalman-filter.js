/**
* @callback ObservationCallback
* @param {Object} opts
* @param {Number} opts.index
* @param {Number} opts.previousCorrected
*/

/**
* @typedef {Object} ObservationConfig
* @property {Number} dimension
* @property {Array.Array.<Number>> | ObservationCallback} measureToState,
* @property {Array.Array.<Number>> | ObservationCallback} covariance
*/

/**
* @callback DynamicCallback
* @param {Object} opts
* @param {Number} opts.index
* @param {KalmanPoint} opts.predicted
* @param {Observation} opts.measure
*/

/**
* @typedef {Object} DynamicConfig
* @property {Number} dimension
* @property {Array.Array.<Number>> | DynamicCallback} transition,
* @property {Array.Array.<Number>> | DynamicCallback} covariance
*/

/**
* @class
* @property {DynamicConfig} dynamic
* @property {ObservationConfig} observation
*/
class CoreKalmanFilter {
	/**
	* @param {DynamicConfig} dynamic
	* @param {ObservationConfig} observation
	*/
	constructor({dynamic, observation}) {
		this.dynamic = dynamic;
		this.observation = observation;
	}
	/**
	* Filter a multivariate gaussian (equivalent to predict and correct it with with observation)
	* @param {Object} opts, see details below
	* NB: any not-documented additional key in opts will also be passed to functions parameters like (e.g. transition(opts), covariance(opts), see Extended Kalman Filter in documentation)
	* @param {State} [opts.previousCorrected=null] see predict.previousCorrected
	* @param {Number} [opts.index=0] see predict.index
	* @param {Observation} opts.observation
	* @returns {State} correctedState the returned corrected state with state.index = index 
	*/
	filter(){}
	/**
	* @param {Object} opts, see filter.opts
	* @param {State} [opts.previousCorrected=null] the previous corrected state, 
	* if previousCorrected.index is defined, then we use index = previousCorrected.index + 1 
	* @param {Number} [opts.index=0] 
	* if index is not defined : 
	* (1) if previousCorrected.index is a number, then use previousCorrected.index + 1, 
	* (2) if previousCorrected is defined but previousCorrected.index is not a number, throw an error
	* (3) if previousCorrected is not defined use 0
	* @returns {State} predictedState the returned predicted state with state.index = index 
	*/
	predict(){}
	/**
	* @param {Object} opts, see filter.opts
	* @param {State} [opts.predicted=null] typically the output of predict method
	* @param {Observation} opts.observation
	* @returns {State} correctedState the returned corrected state with state.index = index 
	*/
	correct(){}
}

module.exports = CoreKalmanFilter;
