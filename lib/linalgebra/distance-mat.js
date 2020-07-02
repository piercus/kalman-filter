const trace = require('./trace.js');
const transpose = require('./transpose.js');
const matSub = require('./sub.js');
const matMul = require('./mat-mul.js');

// [Frobenius norm](https://en.wikipedia.org/wiki/Matrix_norm#Frobenius_norm )
module.exports = function (array1, array2) {
	const m = matSub(array1, array2);
	const p = matMul(transpose(m), m);
	return Math.sqrt(trace(p));
};
