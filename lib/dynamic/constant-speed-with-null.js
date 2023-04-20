const {identity, diag} = require('simple-linalg');

const nullModels = {
	linear(a) {
		return a;
	},
	one() {
		return 1;
	},
	square(a) {
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
const constantSpeedWithNull = function ({staticCovariance, obsDynaIndexes, nullGapModel = null, init}, observation) {
	if (!obsDynaIndexes) {
		const l = observation.observedProjection[0].length;
		obsDynaIndexes = new Array(l).fill(0).map((_, i) => i);
	}

	if (staticCovariance && Number.isNaN(staticCovariance[0][0])) {
		throw (new Error('NaN staticCovariance'));
	}

	const dimension = 2 * obsDynaIndexes.length;
	if (!init) {
		init = {
			mean: new Array(obsDynaIndexes.length * 2).fill(0).map(() => [0]),
			covariance: diag(new Array(obsDynaIndexes.length * 2).fill(huge)),
			index: -1,
		};
	}

	if (!nullGapModel) {
		nullGapModel = new Array(dimension).fill(0).map(() => 'linear');
	}

	return {
		dimension,
		init,
		transition({previousCorrected, index}) {
			const diffBetweenIndexes = index - previousCorrected.index;

			if (Number.isNaN(diffBetweenIndexes)) {
				throw (new TypeError('diffBetweenIndexes is NaN'));
			}

			const emptyTransition = new Array(dimension).fill(new Array(dimension).fill());

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

module.exports = constantSpeedWithNull;
