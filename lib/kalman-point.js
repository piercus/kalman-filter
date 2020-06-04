
/**
 * @class
 * Class representing a multi dimensionnal gaussian, with his average (point.av) and his sigma (point.sigma)
 * @property {Number} [index=0] the index of the KalmanPoint in the process, this is not mandatory for simple Kalman Filter, but is needed for most of the use case of extended kalman filter
 * @property {Array.<Array.<Number>>} sigma square matrix of size dimension
 * @property {Array.<Number>} av array of size dimension
 */
class KalmanPoint {
	/**
   * Create a KalmanPoint
	 * @property {Number} [opts.index=0] the index of the KalmanPoint in the process, this is not mandatory for simple Kalman Filter, but is needed for most of the use case of extended kalman filter
	 * @property {Array.<Array.<Number>>} opts.sigma square matrix of size dimension
	 * @property {Array.<Number>} opts.av array of size dimension
   */
	constructor({av, sigma, index}) {
		this.av = av;
		this.sigma = sigma;
		this.index = index;
	}

	/**
	* Check the consistency of the KalmanPoint
	*/
	check() {
		this.constructor.check(this);
	}

	/**
	* Check the consistency of the KalmanPoint's attributes
	*/
	static check({av, sigma, index}) {
		if (av.length !== sigma.length) {
			throw (new Error('invalid length do not match'));
		}

		if (sigma.filter(s => s.length !== av.length).length > 0) {
			throw (new Error('invalid length do not match'));
		}

		if (typeof (index) !== 'number') {
			throw (new TypeError('t must be a number'));
		}
	}
}

module.exports = KalmanPoint;
