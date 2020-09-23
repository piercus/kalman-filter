// Const diag = require('../linalgebra/diag.js');

/**
* @callback MatrixCallback
* @returns <Array.<Array.<Number>>
*/

/**
* Tranforms:
** a 2d array into a function (() => array)
** a 1d array into a function (() => diag(array))
*@param {Array.<Number> | Array.<Array.<Number>>} array
*@returns {MatrixCallback}
*/

module.exports = function (array) {
	if (typeof (array) === 'function') {
		return array;
	}

	if (Array.isArray(array)) {
		return array;
	}

	throw (new Error('Only arrays and functions are authorized'));
};
