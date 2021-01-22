const checkShape = require('./check-shape');

module.exports = function (matrix, shape, title = 'checkMatrix') {
	if (matrix.reduce((a, b) => a.concat(b)).filter(a => Number.isNaN(a)).length > 0) {
		throw (new Error(
			`[${title}] Matrix should not have a NaN\nIn : \n` +
			matrix.join('\n')
		));
	}

	if (shape) {
		checkShape(matrix, shape, title);
	}
};
