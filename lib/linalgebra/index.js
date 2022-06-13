const fnNames = ["add", "diag", "distance-mat", "elem-wise", "identity", "index", "invert", "mat-mul", "pad-with-zeros", "sub", "sub-square-matrix", "sum", "trace", "transpose", "zeros"];

const obj = {}
fnNames.forEach(n => {
	obj[n] = require(`./${n}.js`)
})

module.exports = obj;