const {identity, diag} = require('simple-linalg');

const huge = 1e6;

/**
*Creates a dynamic model, considering the null in order to make the predictions
* @param {Array.<Array.<Number>>} staticCovariance generated with moving average
* @param {Number} observationDimension
* @returns {DynamicConfig}
*/
const constantPositionWithNull = function ({staticCovariance, obsDynaIndexes, init}) {
	const dimension = obsDynaIndexes.length;
	if (!init) {
		init = {
			mean: new Array(obsDynaIndexes.length).fill(0).map(() => [0]),
			covariance: diag(new Array(obsDynaIndexes.length).fill(huge)),
			index: -1,
		};
	}

	if (staticCovariance && staticCovariance.length !== dimension) {
		throw (new Error('staticCovariance has wrong size'));
	}

	return {
		dimension,
		transition() {
			return identity(dimension);
		},
		covariance({previousCorrected, index}) {
			const diffBetweenIndexes = index - previousCorrected.index;
			if (staticCovariance) {
				return staticCovariance.map(row => row.map(element => element * diffBetweenIndexes));
			}

			return identity(dimension);
		},
		init,
	};
};

module.exports = constantPositionWithNull;
