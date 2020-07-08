const diag = require('../linalgebra/diag.js');

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

	if (!(Array.isArray(array))) {
		throw (new TypeError('Only arrays and function are authorized'));
	}

	if ((Array.isArray(array)) && (Array.isArray(array[0]))) {
		return function () {
			return array;
		};
	}

	if ((Array.isArray(array)) && (typeof (array[0]) === 'number')) {
		const equivalentArray = diag(array);
		return function () {
			return equivalentArray;
		};
	}
};
