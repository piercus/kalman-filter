module.exports = function (array) {
	let diag = 0;
	for (const [row, element] of array.entries()) {
		diag += element[row];
	}

	return diag;
};
