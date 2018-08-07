const path = require('path');

module.exports = {
    target: 'node',

    entry: './src/templates.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'templates.js',
        libraryTarget: 'commonjs'
    },

    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },

    resolve: {
        alias: {
            handlebars: 'handlebars/dist/handlebars.js'
        }
    }
};
