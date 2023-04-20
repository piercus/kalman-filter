const checkShape = require('./check-shape');

module.exports = function (matrix, shape, title = 'checkMatrix') {
	if (!Array.isArray(matrix)) {
		throw (new TypeError(`[${title}] should be a 2-level array matrix and is ${matrix}`));
	}

	for (const row of matrix) {
		if (!Array.isArray(row)) {
			throw (new TypeError(`[${title}] 1-level array should be a matrix ${JSON.stringify(matrix)}`));
		}
	}

	if (matrix.reduce((a, b) => a.concat(b)).some(a => Number.isNaN(a))) {
		throw (new Error(
			`[${title}] Matrix should not have a NaN\nIn : \n`
			+ matrix.join('\n'),
		));
	}

	if (shape) {
		checkShape(matrix, shape, title);
	}
};
