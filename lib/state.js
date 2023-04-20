const {subtract: sub, transpose, matMul, invert, elemWise, subSquareMatrix} = require('simple-linalg');
const arrayToMatrix = require('./utils/array-to-matrix.js');
const checkMatrix = require('./utils/check-matrix.js');
const checkCovariance = require('./utils/check-covariance');

/**
 * Class representing a multi dimensionnal gaussian, with his mean and his covariance
 * @property {Number} [index=0] the index of the State in the process, this is not mandatory for simple Kalman Filter, but is needed for most of the use case of extended kalman filter
 * @property {Array.<Array.<Number>>} covariance square matrix of size dimension
 * @property {Array.<Array<Number>>} mean column matrix of size dimension x 1
 */
class State {
	constructor({mean, covariance, index}) {
		this.mean = mean;
		this.covariance = covariance;
		this.index = index;
	}

	/**
	* Check the consistency of the State
	* @param {Object} options
	* @returns {Null}
	* @see check
	*/
	check(options) {
		this.constructor.check(this, options);
	}

	/**
	* Check the consistency of the State's attributes
	* @param {State} state
	* @param {Object} [options={}]
	* @param {Array} [options.dimension=null] if defined check the dimension of the state
	* @param {String} [options.title=null] used to log error mor explicitly
	* @param {Boolean} options.eigen
	* @returns {Null}
	*/

	static check(state, {dimension = null, title = null, eigen} = {}) {
		if (!(state instanceof State)) {
			throw (new TypeError(
				'The argument is not a state \n'
        + 'Tips: maybe you are using 2 different version of kalman-filter in your npm deps tree',
			));
		}

		const {mean, covariance} = state; // Index
		const meanDimension = mean.length;
		if (typeof (dimension) === 'number' && meanDimension !== dimension) {
			throw (new Error(`[${title}] State.mean ${mean} with dimension ${meanDimension} does not match expected dimension (${dimension})`));
		}

		checkMatrix(mean, [meanDimension, 1], title ? title + '.mean' : 'mean');
		checkMatrix(covariance, [meanDimension, meanDimension], title ? title + '.covariance' : 'covariance');
		checkCovariance({covariance, eigen}, title ? title + '.covariance' : 'covariance');
		// If (typeof (index) !== 'number') {
		// 	throw (new TypeError('t must be a number'));
		// }
	}

	/**
	* Multiply state with matrix
	* @param {State} state
	* @param {Array.<Array.<Number>>} matrix
	* @returns {State}
	*/
	static matMul({state, matrix}) {
		const covariance = matMul(
			matMul(matrix, state.covariance),
			transpose(matrix),
		);
		const mean = matMul(matrix, state.mean);

		return new State({
			mean,
			covariance,
			index: state.index,
		});
	}

	/**
	* From a state in n-dimension create a state in a subspace
	* If you see the state as a N-dimension gaussian,
	* this can be viewed as the sub M-dimension gaussian (M < N)
	* @param {Array.<Number>} obsIndexes list of dimension to extract,  (M < N <=> obsIndexes.length < this.mean.length)
	* @returns {State} subState in subspace, with subState.mean.length === obsIndexes.length
	*/
	subState(obsIndexes) {
		const state = new State({
			mean: obsIndexes.map(i => this.mean[i]),
			covariance: subSquareMatrix(this.covariance, obsIndexes),
			index: this.index,
		});
		return state;
	}

	/**
	* @typedef {Object} DetailedMahalanobis
	* @property {Array.<[Number]>} diff
	* @property {Array.<Array.<Number>>} covarianceInvert
	* @property {Number} value
	*/
	/**
	* Simple Malahanobis distance between the distribution (this) and a point
	* @param {Array.<[Number]>} point a Nx1 matrix representing a point
	* @returns {DetailedMahalanobis}
	*/
	rawDetailedMahalanobis(point) {
		const diff = sub(this.mean, point);
		this.check();
		const covarianceInvert = invert(this.covariance);
		if (covarianceInvert === null) {
			this.check({eigen: true});
			throw (new Error(`Cannot invert covariance ${JSON.stringify(this.covariance)}`));
		}

		const diffTransposed = transpose(diff);

		// Console.log('covariance in obs space', covarianceInObservationSpace);

		const value = Math.sqrt(
			matMul(
				matMul(
					diffTransposed,
					covarianceInvert,
				),
				diff,
			),
		);
		if (Number.isNaN(value)) {
			console.log({diff, covarianceInvert, this: this, point}, matMul(
				matMul(
					diffTransposed,
					covarianceInvert,
				),
				diff,
			));
			throw (new Error('mahalanobis is NaN'));
		}

		return {
			diff,
			covarianceInvert,
			value,
		};
	}

	/**
	* Malahanobis distance is made against an observation, so the mean and covariance
	* are projected into the observation space
	* @param {KalmanFilter} kf kalman filter use to project the state in observation's space
	* @param {Observation} observation
	* @param {Array.<Number>} obsIndexes list of indexes of observation state to use for the mahalanobis distance
	* @returns {DetailedMahalanobis}
	*/
	detailedMahalanobis({kf, observation, obsIndexes}) {
		if (observation.length !== kf.observation.dimension) {
			throw (new Error(`Mahalanobis observation ${observation} (dimension: ${observation.length}) does not match with kf observation dimension (${kf.observation.dimension})`));
		}

		let correctlySizedObservation = arrayToMatrix({observation, dimension: observation.length});

		const stateProjection = kf.getValue(kf.observation.stateProjection, {});

		let projectedState = this.constructor.matMul({state: this, matrix: stateProjection});

		if (Array.isArray(obsIndexes)) {
			projectedState = projectedState.subState(obsIndexes);
			correctlySizedObservation = obsIndexes.map(i => correctlySizedObservation[i]);
		}

		return projectedState.rawDetailedMahalanobis(correctlySizedObservation);
	}

	/**
	* @param {Object} options @see detailedMahalanobis
	* @returns {Number}
	*/
	mahalanobis(options) {
		const result = this.detailedMahalanobis(options).value;
		if (Number.isNaN(result)) {
			throw (new TypeError('mahalanobis is NaN'));
		}

		return result;
	}

	/**
	* Bhattacharyya distance is made against in the observation space
	* to do it in the normal space see state.bhattacharyya
	* @param {KalmanFilter} kf kalman filter use to project the state in observation's space
	* @param {State} state
	* @param {Array.<Number>} obsIndexes list of indexes of observation state to use for the bhattacharyya distance
	* @returns {Number}
	*/
	obsBhattacharyya({kf, state, obsIndexes}) {
		const stateProjection = kf.getValue(kf.observation.stateProjection, {});

		let projectedSelfState = this.constructor.matMul({state: this, matrix: stateProjection});
		let projectedOtherState = this.constructor.matMul({state, matrix: stateProjection});

		if (Array.isArray(obsIndexes)) {
			projectedSelfState = projectedSelfState.subState(obsIndexes);
			projectedOtherState = projectedOtherState.subState(obsIndexes);
		}

		return projectedSelfState.bhattacharyya(projectedOtherState);
	}

	/**
	* @param {State} otherState other state to compare with
	* @returns {Number}
	*/
	bhattacharyya(otherState) {
		const {covariance, mean} = this;
		const average = elemWise([covariance, otherState.covariance], ([a, b]) => (a + b) / 2);

		let covarInverted;
		try {
			covarInverted = invert(average);
		} catch (error) {
			console.log('Cannot invert', average);
			throw (error);
		}

		const diff = sub(mean, otherState.mean);

		return matMul(transpose(diff), matMul(covarInverted, diff))[0][0];
	}
}

module.exports = State;
