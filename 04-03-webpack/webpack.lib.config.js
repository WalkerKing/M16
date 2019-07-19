const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './src/lib.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        libraryTarget: 'commonjs',
        library: 'getName'
    },
}