const webpack = require('webpack');
const path = require('path');
const CleanWebpckPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // 先找到每个入口，然后从各个入口触发，找到依赖的模块（module）
    // 然后生成一个chunk，最后把chunk写到文件系统中Assets
    entry: {
        index: './src/index.js',
        base: './src/base.js',
        common: './src/common.js'
    },
    output: {
        path: path.join(__dirname, 'dist'), // 输出文件夹，只能是绝对路径
        // name是entry名字main，hash根据打包内容计算出来的一个hash值
        filename: '[name].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: require.resolve('jquery'), // 使用绝对路径
                // loader: 'expose-loader?$'
                use: {
                    loader: 'expose-loader',
                    options: '$'
                }
            },
            {
                test: /\.css$/, // 转换文件的匹配正则
                // css-loader用来把css文件转变成一个模块，解析处理css文件中的url路径
                // style-loader 可以把css文件转变成styl标签插入html
                // 多个loader是有顺序要求的，从右往左处理
                loader: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        // ProvidePlugin 用于向模块注入变量
        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // }),
        new CleanWebpckPlugin([path.join(__dirname, 'dist')]),
        new HtmlWebpackPlugin({
            template: './src/index.html', // 模板位置
            filename: 'index.html', // 产出的文件名
            title: 'welcome index',
            hash: true,
            chunks: ['common', 'index'],
            minify: {
                removeAttributeQuotes: true,
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/base.html', // 模板位置
            filename: 'base.html', // 产出的文件名
            title: 'welcome base',
            hash: true,
            chunks: ['common', 'base'],
            minify: {
                removeAttributeQuotes: true,
            }
        })
    ],
    devServer: {
        contentBase: './dist',
        host: 'localhost',
        port: 8080,
        compress: true, //是否gzip压缩
    }
}