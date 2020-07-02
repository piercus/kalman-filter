module.exports = function (array) {
	let diag = 0;
	for (let row = 0; row < array.length; row++) {
		diag += array[row][row];
	}

	return diag;
};
