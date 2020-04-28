const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: [".js", '.vue', ".json"],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    hotReload: true // 关闭热重载
                }
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                ]
            },

        ]
    },
    plugins: [
        // 请确保引入这个插件！
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            // filename: 'index.html',
            template: 'public/index.html',
        }),
        new BundleAnalyzerPlugin(), // 报http://127.0.0.1:8888/ access denied的时候,就是这个插件
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./public/manifest/vendor.dll.manifest.json')
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./public/manifest/util.dll.manifest.json')
        }),
        // 将dll资源自动插入html并将文件复制至相应位置
        new AddAssetHtmlPlugin([
            {
                // 要添加到编译中的文件的绝对路径，以及生成的HTML文件。支持globby字符串
                filepath: path.resolve(__dirname, './public/lib/*.js'),
                // 文件输出目录
                outputPath: 'vendor',
                // 脚本或链接标记的公共路径
                publicPath: 'vendor'
            },
        ]),
        new CleanWebpackPlugin(),
    ]
}