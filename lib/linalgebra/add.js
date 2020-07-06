const elemWise = require('./elem-wise');
/**
* Add matrixes together
* @param {...<Array.<Array.<Number>>} args list of matrix
* @returns {Array.<Array.<Number>>} sum
*/
module.exports = function (...args) {
	return elemWise(args, args2 => {
		return args2.reduce((a, b) => a + b, 0);
	});
};
