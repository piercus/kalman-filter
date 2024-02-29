import { diag } from 'simple-linalg';
import State from '../state';

/**
* Creates a dynamic model, considering the null in order to make the predictions
* @param {Array.<Number>} staticCovariance
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/
export default function constantSpeedDynamic(args: {staticCovariance: number[], avSpeed: number[], center: number[]}, observation) {
	const { staticCovariance, avSpeed, center } = args;
	const observationDimension = observation.observedProjection[0].length;

	const dimension = 2 * observationDimension;

	if ((center) === undefined) {
		throw (new TypeError('Center must be defined'));
	}

	if (center.length !== observationDimension) {
		throw (new TypeError(`Center size should be ${observationDimension}`));
	}

	if (avSpeed.length !== observationDimension) {
		throw (new TypeError(`avSpeed size should be ${observationDimension}`));
	}

	const initCov = diag(center.map(c => c * c / 3).concat(avSpeed.map(c => c * c / 3)));

	const init = {
		mean: center.map(c => [c]).concat(center.map(() => [0])),
		covariance: initCov,
		index: -1,
	};

	const transition = (args: {getTime: (index: number) => number, index: number, previousCorrected: State}) => {
		const {getTime, index, previousCorrected} = args;
		const dT = getTime(index) - getTime(previousCorrected.index);
		if (typeof (dT) !== 'number' || Number.isNaN(dT)) {
			throw (new TypeError(`dT (${dT}) should be a number`));
		}
		// Example is :
		// [
		// 	[1, 0, dT, 0],
		// 	[0, 1, 0, dT],
		// 	[0, 0, 1, 0],
		// 	[0, 0, 0, 1]
		// ];
		// constant speed usual matrix

		// create identity matrix
		const mat = diag(center.map(() => 1).concat(center.map(() => 1)));
		// Then add dT
		for (let i = 0; i < observationDimension; i++) {
			mat[i][observationDimension + i] = dT;
		}

		if (Number.isNaN(mat[0][2])) {
			throw (new TypeError('nan mat'));
		}

		return mat;
	};

	const covariance = (args: {index: number, previousCorrected: State, getTime: (index: number) => number}) => {
		const {index, previousCorrected, getTime} = args;
		const dT = getTime(index) - getTime(previousCorrected.index);

		if (typeof (dT) !== 'number') {
			throw (new TypeError(`dT (${dT}) should be a number`));
		}

		// State is (x, y, vx, vy)
		const sqrt = Math.sqrt(dT);
		if (Number.isNaN(sqrt)) {
			console.log({lastPreviousIndex: previousCorrected.index, index});
			console.log(dT, previousCorrected.index, index, getTime(index), getTime(previousCorrected.index));
			throw (new Error('Sqrt(dT) is NaN'));
		}

		return diag(staticCovariance.map(v => v * sqrt));
	};

	return {
		init,
		dimension,
		transition,
		covariance,
	};
}

// module.exports = constantSpeedDynamic;
