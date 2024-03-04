module.exports = [{
    entry: './index.ts', // Entry point is index.ts
    mode: 'development',
    optimization: {
        minimize: false,
    },
    name: 'raw',
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.js'], // Add .ts extension to resolve TypeScript files
    },
    module: {
        rules: [
            {
                test: /\.ts$/, // Include .ts files
                use: 'ts-loader', // Use ts-loader for TypeScript compilation
                exclude: /node_modules/, // Exclude node_modules directory
            },
        ],
    },
    output: {
        filename: 'kalman-filter.js',
        library: 'kalmanFilter',
        libraryTarget: 'var',
    },
}, {
    entry: './index.ts', // Entry point is index.ts
    name: 'min',
    resolve: {
        extensions: ['.ts', '.js'], // Add .ts extension to resolve TypeScript files
    },
    module: {
        rules: [
            {
                test: /\.ts$/, // Include .ts files
                use: 'ts-loader', // Use ts-loader for TypeScript compilation
                exclude: /node_modules/, // Exclude node_modules directory
            },
        ],
    },
    output: {
        filename: 'kalman-filter.min.js',
        library: 'kalmanFilter',
        libraryTarget: 'var',
    },
}];
