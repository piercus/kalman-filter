const tolerance = 0.1;
const Matrix = require('@rayyamhk/matrix');
const checkMatrix = require('./check-matrix');

const checkDefinitePositive = function (covariance, tolerance = 1e-10) {
	const covarianceMatrix = new Matrix(covariance);
	const eigenvalues = covarianceMatrix.eigenvalues();
	for (const eigenvalue of eigenvalues) {
		if (eigenvalue <= -tolerance) {
			console.log(covariance, eigenvalue);
			throw new Error(`Eigenvalue should be positive (actual: ${eigenvalue})`);
		}
	}

	console.log('is definite positive', covariance);
};

const checkSymetric = function (covariance, title = 'checkSymetric') {
	for (const [rowId, row] of covariance.entries()) {
		for (const [colId, item] of row.entries()) {
			if (rowId === colId && item < 0) {
				throw new Error(`[${title}] Variance[${colId}] should be positive (actual: ${item})`);
			} else if (Math.abs(item) > Math.sqrt(covariance[rowId][rowId] * covariance[colId][colId])) {
				console.log(covariance);
				throw new Error(`[${title}] Covariance[${rowId}][${colId}] should verify Cauchy Schwarz Inequality `
				+ `(expected: |x| <= sqrt(${covariance[rowId][rowId]} * ${covariance[colId][colId]})`
				+ ` actual: ${item})`);
			} else if (Math.abs(item - covariance[colId][rowId]) > tolerance) {
				throw new Error(`[${title}] Covariance[${rowId}][${colId}] should equal Covariance[${colId}][${rowId}] `
			+ ` (actual diff: ${Math.abs(item - covariance[colId][rowId])})  = ${item} - ${covariance[colId][rowId]}\n`
			+ `${covariance.join('\n')} is invalid`,
				);
			}
		}
	}
};

module.exports = function ({covariance, eigen = false}) {
	checkMatrix(covariance);
	checkSymetric(covariance);
	if (eigen) {
		checkDefinitePositive(covariance);
	}
};
