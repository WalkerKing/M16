const path = require('path')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                use: {
                    loader: 'babel-loader'
                },
                include: path.resolve('./src'),
                exclude: /node_modules/ 
            }
        ]
    },
    plugins: [
        new WebpackParallelUglifyPlugin({
            uglifyJS: {},
        })
    ]
}