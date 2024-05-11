const getShape = function (matrix) {
	if (!Array.isArray(matrix)) {
		return [];
	}

	return [matrix.length].concat(getShape(matrix[0]));
};

module.exports = getShape;
