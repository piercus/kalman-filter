const CoreKalmanFilter = require('./core-kalman-filter');

class KalmanFilter extends CoreKalmanFilter {
	/**
  * Returns an estimation of the asymptotic state covariance as explained in https://en.wikipedia.org/wiki/Kalman_filter#Asymptotic_form
  * in practice this can be used as a init.covariance value but is very costful calculation (that's why this is not made by default)
  * @param {Number} [tolerance=1e-6] returns when the last values differences are less than tolerance
  * @return {<Array.<Array.<Number>>>} covariance
  */
	asymptoticStateCovariance() {
	}

	/**
  * Returns an estimation of the asymptotic gain, as explained in https://en.wikipedia.org/wiki/Kalman_filter#Asymptotic_form
  * @param {Number} [tolerance=1e-6] returns when the last values differences are less than tolerance
  * @return {<Array.<Array.<Number>>>} gain
  */
	asymptoticGain() {
	}

	arrayToFunction ({opt}) {

	}

	/**
	*@param {Object} elementModel the part of the model (dynamic or observation), to transform
	*@returns {Object} transformed element of the model
	*/
	elementsToFunction({elementModel}) {
		for (const property in obj) {
			if ((typeof(obj[property]))==='Array' && (typeof(obj[property][0]) === 'Array')) {

			}
		}
	}
	/**
	* @param {DynamicConfig} dynamic
	* @param {ObservationConfig} observation the system's observation model
	*/
	constructor({dynamic, observation}) {

	}
}
