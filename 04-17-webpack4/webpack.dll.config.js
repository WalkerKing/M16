const path = require('path')
const webpack = require('webpack')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const outputDir = './public'
module.exports = {
    mode: 'production',
    entry: {
        vendor: [
            'vue',
            'vue-router',
            'vuex',
        ],
        util: [
            'lodash',
            'moment',
        ]
    },
    output: {
        // 指定生成文件所在目录
        path: path.resolve(__dirname, 'public/lib'),
        filename: '[name].dll.[chunkhash:8].js',
        library: '[name]_dll_lib'
    },
    plugins: [
        // 会生成一个json文件，里面是关于dll.js的一些配置信息
        new webpack.DllPlugin({
            path: path.resolve(__dirname, 'public/manifest', '[name].dll.manifest.json'),
            name: '[name]_dll_lib',// 与上面output中配置对应
            // context: __dirname, // 上下文环境路径（必填，为了与DllReferencePlugin存在与同一上下文中）
        }),
        new MomentLocalesPlugin({
            localesToKeep: ['es-us', 'zh-cn'],
        }),
        new CleanWebpackPlugin()
    ]
}