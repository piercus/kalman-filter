module.exports = function (rows, cols) {
	return new Array(rows).fill(1).map(() => new Array(cols).fill(0));
};
