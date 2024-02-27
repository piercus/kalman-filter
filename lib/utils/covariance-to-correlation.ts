import checkCovariance from './check-covariance';

export default function covarianceToCorrelation(covariance) {
	checkCovariance({covariance});
	const variance = covariance.map((_, i) => covariance[i][i]);

	return {
		variance,
		correlation: covariance.map((c, rowIndex) => c.map((a, colIndex) => a / Math.sqrt(variance[colIndex] * variance[rowIndex]))),
	};
};
