const path = require('path')
const webpack = require('webpack')
const Happypack = require('happypack')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'happypack/loader?id=babel',
                include: path.resolve('./src'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: 'happypack/loader?id=css',
                include: path.resolve('./src'),
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new Happypack({
            id: 'babel',
            use: ['babel-loader']
        }),
        new Happypack({
            id: 'css',
            loaders:['style-loader', 'css-loader']  
        })
    ]
}