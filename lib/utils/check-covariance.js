const tolerance = 1e-3;
const Matrix = require('@rayyamhk/matrix');

const checkDefinitePositive = function (covariance, tolerance = 1e-10) {
	const covarianceMatrix = new Matrix(covariance);
	const eigenvalues = covarianceMatrix.eigenvalues();
	console.log(eigenvalues);
	eigenvalues.forEach(eigenvalue => {
		if (eigenvalue <= -tolerance) {
			console.log(covariance, eigenvalue);
			throw new Error(`Eigenvalue should be positive (actual: ${eigenvalue})`);
		}
	});
};

const checkSymetric = function (covariance) {
	covariance.forEach((row, rowId) => row.forEach((item, colId) => {
		if (rowId === colId && item < 0) {
			throw new Error(`Variance[${colId}] should be positive (actual: ${item})`);
		} else if (Math.abs(item) > Math.sqrt(covariance[rowId][rowId] * covariance[colId][colId])) {
			console.log(covariance);
			throw new Error(`Covariance[${rowId}][${colId}] should verify Cauchy Schwarz Inequality ` +
				`(expected: |x| <= sqrt(${covariance[rowId][rowId]} * ${covariance[colId][colId]})` +
				` actual: ${item})`);
		} else if (Math.abs(item - covariance[colId][rowId]) > tolerance) {
			throw new Error(`Covariance[${rowId}][${colId}] should equal Covariance[${colId}][${rowId}] ` +
			` (actual diff: ${Math.abs(item - covariance[colId][rowId])})`);
		}
	}));
};

module.exports = function ({covariance, eigen = false}) {
	checkSymetric(covariance);
	if (eigen) {
		checkDefinitePositive(covariance);
	}
};
