// This function enables to get the correlation between two parameters following
// Gaussian models

module.exports = function (covariance, i, j) {
	const varI = covariance[i][i];
	const varJ = covariance[j][j];
	const covIj = covariance[i][j];
	return covIj / (Math.sqrt(varI) * Math.sqrt(varJ));
};
