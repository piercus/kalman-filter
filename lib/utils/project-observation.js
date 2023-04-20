// From observationTracks to movingAverageGroundTruthsStates with speed

const {matMul, invert} = require('simple-linalg');

module.exports = function ({observation, obsIndexes, selectedStateProjection, invertSelectedStateProjection}) {
	if (!observation) {
		return null;
	}

	const value = observation.observation || observation;

	const vec = obsIndexes.map(i => {
		if ((value[i]) === undefined) {
			throw (new TypeError(`obsIndexes (${obsIndexes}) is not matching with observation (${observation})`));
		}

		return [value[i]];
	});

	const inverse = invertSelectedStateProjection || invert(selectedStateProjection);

	if (inverse === null) {
		throw (new Error('selectedStateProjection is not invertible, please provide invertSelectedStateProjection'));
	}

	const out = matMul(inverse, vec);

	return out
		.map(v => v[0])
		.map(v => {
			if (Number.isNaN(v)) {
				throw (new TypeError('NaN in projection'));
			}

			return v;
		});
};
