const sub = require('./linalgebra/sub.js');
const transpose = require('./linalgebra/transpose.js');
const matMul = require('./linalgebra/mat-mul.js');
const invert = require('./linalgebra/invert.js');
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
	* @param {KalmanFilter} kf kalman filter use to project the state in observation's space
	* @param {Observation} observation
	* @param {Array.<Number>} selectedIndexes list of indexes of observation state to use for the mahalanobis distance
	*/
	detailedMahalanobis({kf, observation, selectedIndexes}) {
		if (observation.length !== kf.observation.dimension) {
			throw (new Error(`Mahalanobis observation ${observation} (dimension: ${observation.length}) does not match with kf observation dimension (${kf.observation.dimension})`));
		}

		const correctlySizedObservation = arrayToMatrix({observation, dimension: observation.length});

		const stateProjection = kf.getValue(kf.observation.stateProjection, {});

		const projectedState = this.constructor.matMul({state: this, matrix: stateProjection});

		const diff = sub(projectedState.mean, correctlySizedObservation);

		const covarianceInObservationSpace = projectedState.covariance;

		let covarianceInvert;
		let diffSelected;
		if (selectedIndexes) {
			const selectedCov = selectedIndexes.map(s1 => selectedIndexes.map(s2 => covarianceInObservationSpace[s1][s2]));
			covarianceInvert = invert(selectedCov);
			diffSelected = selectedIndexes.map(s1 => diff[s1]);
		} else {
			covarianceInvert = invert(covarianceInObservationSpace);
			diffSelected = diff;
		}

		const diffTransposed = transpose(diffSelected);

		// Console.log('covariance in obs space', covarianceInObservationSpace);

		const value = Math.sqrt(
			matMul(
				matMul(
					diffTransposed,
					covarianceInvert
				),
				diffSelected
			)
		);

		return {
			diff: diffSelected,
			covarianceInvert,
			value
		};
	}

	/**
	* @param {KalmanFilter} kf kalman filter use to project the state in observation's space
	* @param {Observation} observation
	* @param {Array.<Number>} selectedIndexes list of indexes of observation state to use for the mahalanobis distance
	* @returns {Number}
	*/
	mahalanobis(options) {
		return this.detailedMahalanobis(options).value;
	}
}

module.exports = State;
