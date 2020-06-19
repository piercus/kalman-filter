
/**
 * @class
 * Class representing a multi dimensionnal gaussian, with his mean and his covariance
 * @property {Number} [index=0] the index of the State in the process, this is not mandatory for simple Kalman Filter, but is needed for most of the use case of extended kalman filter
 * @property {Array.<Array.<Number>>} covariance square matrix of size dimension
 * @property {Array.<Array<Number>>} mean column matrix of size dimension x 1
 */
class State {
	/**
   * Create a State
	 * @property {Number} [opts.index=0] the index of the State in the process, this is not mandatory for simple Kalman Filter, but is needed for most of the use case of extended kalman filter
	 * @property {Array.<Array.<Number>>} opts.covariance square matrix of size dimension
	 * @property {Array.<Number>} opts.mean array of size dimension
   */
	constructor({mean, covariance, index}) {
		this.mean = mean;
		this.covariance = covariance;
		this.index = index;
	}

	/**
	* Check the consistency of the State
	*/
	check() {
		this.constructor.check(this);
	}

	/**
	* Check the consistency of the State's attributes
	*/
	static check({mean, covariance, index}) {
		if (mean.length !== covariance.length) {
			throw (new Error('invalid length do not match'));
		}

		if (covariance.filter(c => c.length !== mean.length).length > 0) {
			throw (new Error('invalid length do not match'));
		}

		if (typeof (index) !== 'number') {
			throw (new TypeError('t must be a number'));
		}
	}
}

module.exports = State;
