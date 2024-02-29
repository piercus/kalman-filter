// This function enables to get the correlation between two parameters following
// Gaussian models

export default function getCorrelation(covariance: number[][], i: number, j: number) {
	const varI = covariance[i][i];
	const varJ = covariance[j][j];
	const covIj = covariance[i][j];
	return covIj / (Math.sqrt(varI) * Math.sqrt(varJ));
};
