module.exports = function (array) {
	let diag = 0;
	for row of array{
		diag += array[row][row];
	}

	return diag;
};
