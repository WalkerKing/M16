const path = require('path')
// 1. 尽量减少搜索范围

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    
    resolve: {
        extensions: ['.js', '.json'],
        // 当需要指定除node_modules之外的其他模块目录时,需要使用modules字段,这个字段决定从哪里查找模块
        modules: ['node_modules', './lib'],

        mainFields: ['main', 'broswer', 'node'], // 用于配置第三方使用哪个入口文件,当target为web或webworker时,值为['broswer', 'mudule'. 'main']

        alias: {
            react: path.resolve(__dirname, './node_modules/react/cjs/react.production.min.js')
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        // options: {
                        //     presets: ['env', 'stage-0', 'react']
                        // }
                    }
                ],
                // 只转换或者编译src目录下的文件,这里只能用绝对路径
                include: path.resolve('./src'),
                exclude: /(node_modules|bower_components)/, // 不要解析node_modules 文件夹
            }
        ]
    }

}