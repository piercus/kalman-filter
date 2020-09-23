/**
* @typedef {Number | Array.<Number> | Array.<Array.<Number>>} CovarianceParam
*/
const diag = require('../linalgebra/diag');
const checkMatrix = require('./check-matrix');
/**
* If cov is a number, result will be Identity*cov
* If cov is an Array.<Number>, result will be diag(cov)
* If cov is an Array.<Array.<Number>>, result will be cov
* @param {CovarianceParam} cov
* @param {Number} dimension
* @returns {Array.<Array.<Number>>}
*/
module.exports = function (array, {dimension, title = 'polymorph'} = {}) {
	if (typeof (array) === 'number' || Array.isArray(array)) {
		if (typeof (array) === 'number' && typeof (dimension) === 'number') {
			return diag(new Array(dimension).fill(array));
		}

		if ((Array.isArray(array)) && (Array.isArray(array[0]))) {
			let shape;
			if (typeof (dimension) === 'number') {
				shape = [dimension, dimension];
			}

			checkMatrix(array, shape, title);
			return array;
		}

		if ((Array.isArray(array)) && (typeof (array[0]) === 'number')) {
			return diag(array);
		}
	}

	return array;
};
