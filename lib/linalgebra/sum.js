// Sum all the terms of a given matrix
module.exports = function (arr) {
	let s = 0;
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length; j++) {
			s += arr[i][j];
		}
	}

	return s;
};
