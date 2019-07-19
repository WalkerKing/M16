const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash:8].js'
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin() 
    ]
}