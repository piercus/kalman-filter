const sub = require('./linalgebra/sub.js');
const transpose = require('./linalgebra/transpose.js');
const matMul = require('./linalgebra/mat-mul.js');
const invert = require('./linalgebra/invert.js');
const subSquareMatrix = require('./linalgebra/sub-square-matrix');
const arrayToMatrix = require('./utils/array-to-matrix.js');

const checkMatrix = require('./utils/check-matrix.js');

/**
 * @class
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
	*/
	check() {
		this.constructor.check(this);
	}

	/**
	* Check the consistency of the State's attributes
	*/

	static check(state, {dimension = null} = {}) {
		if (!(state instanceof State)) {
			throw (new TypeError('The argument is not a state'));
		}

		const {mean, covariance} = state; // Index
		const meanDimension = mean.length;
		if (typeof (dimension) === 'number' && meanDimension !== dimension) {
			throw (new Error(`State.mean with dimension ${meanDimension} does not match expected dimension (${dimension})`));
		}

		checkMatrix(mean, [meanDimension, 1]);
		checkMatrix(covariance, [meanDimension, meanDimension]);

		// If (typeof (index) !== 'number') {
		// 	throw (new TypeError('t must be a number'));
		// }
	}

	static matMul({state, matrix}) {
		const covariance = matMul(
			matMul(matrix, state.covariance),
			transpose(matrix)
		);
		const mean = matMul(matrix, state.mean);

		return new State({
			mean,
			covariance,
			index: state.index
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
		return new State({
			mean: obsIndexes.map(i => this.mean[i]),
			covariance: subSquareMatrix(this.covariance, obsIndexes),
			index: this.index
		});
	}

	/**
	* Simple Malahanobis distance between the distribution (this) and a point
	* @param {Array.<[Number]>} point a Nx1 matrix representing a point
	*/
	rawDetailedMahalanobis(point) {
		const diff = sub(this.mean, point);
		const covarianceInvert = invert(this.covariance);
		const diffTransposed = transpose(diff);

		// Console.log('covariance in obs space', covarianceInObservationSpace);

		const value = Math.sqrt(
			matMul(
				matMul(
					diffTransposed,
					covarianceInvert
				),
				diff
			)
		);
		if (Number.isNaN(value)) {
			console.log({diff, covarianceInvert, this: this, point}, matMul(
				matMul(
					diffTransposed,
					covarianceInvert
				),
				diff
			));
			throw (new Error('mahalanobis is NaN'));
		}

		return {
			diff,
			covarianceInvert,
			value
		};
	}

	/**
	* Malahanobis distance is made against an observation, so the mean and covariance
	* are projected into the observation space
	* @param {KalmanFilter} kf kalman filter use to project the state in observation's space
	* @param {Observation} observation
	* @param {Array.<Number>} obsIndexes list of indexes of observation state to use for the mahalanobis distance
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
	* @param {KalmanFilter} kf kalman filter use to project the state in observation's space
	* @param {Observation} observation
	* @param {Array.<Number>} obsIndexes list of indexes of observation state to use for the mahalanobis distance
	* @returns {Number}
	*/
	mahalanobis(options) {
		const result = this.detailedMahalanobis(options).value;
		if (Number.isNaN(result)) {
			throw (new TypeError('mahalanobis is NaN'));
		}

		return result;
	}
}

module.exports = State;
