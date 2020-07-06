//Sum all the terms of a given matrix
module.exports = function(arr) {
	let s=0;
	for (i=0;i<arr.length; i++){
		for (j=0; j<arr.length; j++){
			s += arr[i][j]
		}
	}
	return s;
}
