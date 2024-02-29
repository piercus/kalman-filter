import { identity, diag } from 'simple-linalg';

const nullModels = {
	linear(a: number): number {
		return a;
	},
	one(): number {
		return 1;
	},
	square(a: number): number {
		return a * a;
	},
};
const huge = 1e6;
/**
*Creates a dynamic model, considering the null in order to make the predictions
* @param {Array.<Array.<Number>>} staticCovariance generated with moving average
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/
export default function constantSpeedWithNull(args: {staticCovariance?: number[][], obsDynaIndexes?: number[], nullGapModel?: string[], init}, observation) {
	let {staticCovariance, obsDynaIndexes, nullGapModel = null, init} = args;
	if (!obsDynaIndexes) {
		const l = observation.observedProjection[0].length;
		obsDynaIndexes = new Array(l).fill(0).map((_, i) => i);
	}

	if (staticCovariance && Number.isNaN(staticCovariance[0][0])) {
		throw (new Error('NaN staticCovariance'));
	}

	const dimension = 2 * obsDynaIndexes.length;
	init ||= {
			mean: new Array(obsDynaIndexes.length * 2).fill(0).map(() => [0]),
			covariance: diag(new Array(obsDynaIndexes.length * 2).fill(huge)),
			index: -1,
		};

	nullGapModel ||= new Array(dimension).fill(0).map(() => 'linear');

	return {
		dimension,
		init,
		transition({previousCorrected, index}) {
			const diffBetweenIndexes = index - previousCorrected.index;

			if (Number.isNaN(diffBetweenIndexes)) {
				throw (new TypeError('diffBetweenIndexes is NaN'));
			}

			const emptyTransition = new Array(dimension).fill(new Array(dimension).fill(undefined));

			const observationDimension = dimension / 2;
			const transition = emptyTransition.map((row, rowId) => row.map((col, colId) => {
				if (rowId === colId) {
					return 1;
				}

				if (rowId + observationDimension === colId) {
					if (index === 0) {
						return 0;
					}

					return diffBetweenIndexes;
				}

				return 0;
			}));
			return transition;
		},
		covariance({previousCorrected, index}) {
			const diffBetweenIndexes = index - previousCorrected.index;
			if (staticCovariance) {
				const covariance = staticCovariance.map((row, rowIndex) => row.map((element, colIndex) => {
					const factor = Math.sqrt(nullModels[nullGapModel[rowIndex]](diffBetweenIndexes) * nullModels[nullGapModel[colIndex]](diffBetweenIndexes));
					return element * factor;
				}));

				return covariance;
			}

			return identity(dimension);
		},
	};
};
