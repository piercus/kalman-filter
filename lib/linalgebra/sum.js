// Sum all the terms of a given matrix
module.exports = function (array) {
	let s = 0;
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length; j++) {
			s += array[i][j];
		}
	}

	return s;
};
