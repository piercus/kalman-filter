const diag = require('../linalgebra/diag.js');

/**
*This function transforms an array into a corresponding function
*@param {Array} array
@returns {function}
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
