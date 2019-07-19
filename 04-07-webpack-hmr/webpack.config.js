const path = require('path') 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'env',
                            {modules: false}
                        ]
                    }
                },
                include: path.resolve('./src'),
                exclude: /node_modules/
            },
            {
                test: /\.css/,
                loader: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        inline: true, // 打包后文件里注入一个websocket客户端
        hot: true // 启动模块热加载

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin() // 用名称代替id

    ]
}