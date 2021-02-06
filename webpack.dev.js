const path = require('path');

module.exports = {
	entry: './index.js',
	mode: 'development',
	optimization: {
		minimize: false
	},
	devtool: 'inline-source-map',
	output: {
		filename: 'kalman-filter.js',
		library: 'kalmanFilter',
		libraryTarget: 'var',
		path: path.resolve(__dirname)
	}
};
