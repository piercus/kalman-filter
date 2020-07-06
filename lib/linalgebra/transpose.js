module.exports = function (array) {
	return array[0].map((col, i) => array.map(row => row[i]));
};
