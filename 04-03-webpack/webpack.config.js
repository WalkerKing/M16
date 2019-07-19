const path = require('path')
const webpack = require('webpack')
const Happypack = require('happypack')
// 1. 尽量减少搜索范围

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'happypack/loader?id=babel'
            }
        ]
    },
    plugins: [
        new Happypack({
            id: 'babel',
            loaders: [
                {
                    loader: 'babel-loader',
                    query: {compact: false}
                }
            ]
        })
        // new webpack.DllReferencePlugin({
        //     manifest: path.join(__dirname, 'dist', 'manifest.json')
        // })
    ]
}