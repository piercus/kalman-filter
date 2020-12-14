module.exports = function (covariance) {
	const variance = covariance.map((_, i) => covariance[i][i]);
	if (variance.some(v => v <= 0)) {
		throw (new Error('variance must be > 0'));
	}

	return {
		variance,
		correlation: covariance.map((c, rowIndex) => c.map((a, colIndex) => a / Math.sqrt(variance[colIndex] * variance[rowIndex])))
	};
};
