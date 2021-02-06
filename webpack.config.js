module.exports = [{
	entry: './index.js',
	mode: 'development',
	optimization: {
		minimize: false
	},
	name: 'raw',
	devtool: 'inline-source-map',
	resolve: {},
	output: {
		filename: 'kalman-filter.js',
		library: 'kalmanFilter',
		libraryTarget: 'var'
	}
}, {
	entry: './index.js',
	name: 'min',
	resolve: {},
	output: {
		filename: 'kalman-filter.min.js',
		library: 'kalmanFilter',
		libraryTarget: 'var'
	}
}];
