const elemWise = require('./elem-wise');

module.exports = function (...args) {
	return elemWise(args, ([a, b]) => a - b);
};
