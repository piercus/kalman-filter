/**
* @typedef {Number | Array.<Number> | Array.<Array.<Number>>} CovarianceParam
*/
const diag = require('../linalgebra/diag');// eslint-disable-line no-unused-vars
/**
* If cov is a number, result will be Identity*cov
* If cov is an Array.<Number>, result will be diag(cov)
* If cov is an Array.<Array.<Number>>, result will be cov
* @param {CovarianceParam} cov
* @param {Number} dimension 
* @returns {Array.<Array.<Number>>}
*/
module.exports = function (array, {dimension} = {}) {// eslint-disable-line no-unused-vars

	if (typeof(array) === 'number' && typeof(dimension) === 'number') {
		return diag(new Array(dimension).fill(array));
	}
	if ((Array.isArray(array)) && (Array.isArray(array[0]))) {
		return array;
	}

	if ((Array.isArray(array)) && (typeof (array[0]) === 'number')) {
		return diag(array);
	}
	throw (new TypeError('Only arrays and function are authorized'));
};
