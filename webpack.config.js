const path = require('path');

module.exports = [{
		entry: './index.js',
		mode: 'development',
		optimization: {
	    minimize: false
	  },
		name: 'raw',
		devtool: "inline-source-map",
		output: {
			filename: 'kalman-filter.js',
			library: 'kalmanFilter',
			libraryTarget: 'var'
		}
	},{
		entry: './index.js',
		name: 'min',
		output: {
			filename: 'kalman-filter.min.js',
			library: 'kalmanFilter',
			libraryTarget: 'var'
		}
}];
