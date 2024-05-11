import checkCovariance from './check-covariance';

export default function correlationToCovariance({correlation, variance}) {
	checkCovariance({covariance: correlation});
	return correlation.map((c, rowIndex) => c.map((a, colIndex) => a * Math.sqrt(variance[colIndex] * variance[rowIndex])));
}
