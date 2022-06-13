const fnNames = ['add', 'diag', 'distance-mat', 'elem-wise', 'identity', 'index', 'invert', 'mat-mul', 'pad-with-zeros', 'sub', 'sub-square-matrix', 'sum', 'trace', 'transpose', 'zeros'];

const object = {};
fnNames.forEach(n => {
	object[n] = require(`./${n}.js`);
});

module.exports = object;
