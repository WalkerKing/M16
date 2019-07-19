const path = require('path')
const webpack = require('webpack')
// 1. 尽量减少搜索范围

module.exports = {
    entry: {
        react: ['react', 'react-dom']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].dll.js',
        library: '_dll_[name]' // 指的是导出的全局变量的名称,其他模块会从此变量上获取到里面的模块
    },  
    plugins: [
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.join(__dirname, 'dist', 'manifest.json') // manifest.json是一个描述文件
        })
    ]
}