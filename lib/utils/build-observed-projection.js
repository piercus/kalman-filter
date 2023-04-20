module.exports = function ({inDimension, outDimension, inIndexes, selectedStateProjection, outIndexes}) {
	if (selectedStateProjection.length !== outIndexes.length) {
		throw (new Error(`shape mismatch (${selectedStateProjection.length} vs ${outIndexes.length})`));
	}

	if (selectedStateProjection[0].length !== inIndexes.length) {
		throw (new Error(`shape mismatch (${selectedStateProjection[0].length} vs ${inIndexes.length})`));
	}

	return new Array(outDimension).fill(0).map((_, i) => new Array(inDimension).fill(0).map((_, j) => {
		if (inIndexes.includes(j) && outIndexes.includes(i)) {
			return selectedStateProjection[outIndexes.indexOf(i)][inIndexes.indexOf(j)];
		}

		return 0;
	}));
};
