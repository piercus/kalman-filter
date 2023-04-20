/**
* @typedef {Number | Array.<Number> | Array.<Array.<Number>>} CovarianceParam
*/
const {diag} = require('simple-linalg');
const checkMatrix = require('./check-matrix');
/**
* If cov is a number, result will be Identity*cov
* If cov is an Array.<Number>, result will be diag(cov)
* If cov is an Array.<Array.<Number>>, result will be cov
* @param {CovarianceParam} cov
* @param {Number} dimension
* @returns {Array.<Array.<Number>>}
*/
module.exports = function (cov, {dimension, title = 'polymorph'} = {}) {
	if (typeof (cov) === 'number' || Array.isArray(cov)) {
		if (typeof (cov) === 'number' && typeof (dimension) === 'number') {
			return diag(new Array(dimension).fill(cov));
		}

		if ((Array.isArray(cov)) && (Array.isArray(cov[0]))) {
			let shape;
			if (typeof (dimension) === 'number') {
				shape = [dimension, dimension];
			}

			checkMatrix(cov, shape, title);
			return cov;
		}

		if ((Array.isArray(cov)) && (typeof (cov[0]) === 'number')) {
			return diag(cov);
		}
	}

	return cov;
};
