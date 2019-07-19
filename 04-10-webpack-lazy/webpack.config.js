const path = require('path')
const HtmlWebpaclPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/lazy.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash:8].js'
    },

    plugins: [
        new HtmlWebpaclPlugin({
            template: './src/index.html'
        })
    ]
}