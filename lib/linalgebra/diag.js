const zeros = require('./zeros');

module.exports = function (mat) {
	const res = zeros(mat.length, mat.length);

	for (const [i, element] of mat.entries()) {
		res[i][i] = element;
	}

	return res;
};
