/**
* @typedef {Number | Array.<Number> | Array.<Array.<Number>>} CovarianceParam
*/
const diag = require('../linalgebra/diag');
/**
* If cov is a number, result will be Identity*cov
* If cov is an Array.<Number>, result will be diag(cov)
* If cov is an Array.<Array.<Number>>, result will be cov
* @param {CovarianceParam} cov
* @returns {Array.<Array.<Number>>}
*/
module.exports = function(cov){
	
}