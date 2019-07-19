const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin') 

module.exports = {
    entry: './src/index.js' ,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash:8].js',
        publicPath: 'http://localhost:8080/'
    },
    plugins: [
        new webpack.DefinePlugin({
            __development__: JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}