const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolveLoader: {
        modules: ['node_modules', path.resolve(__dirname, 'loaders')]
        // alias: {
        //     loader1: path.resolve(__dirname, 'loaders', 'loader1.js')
        // }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['loader3', 'loader2', 'loader1']
            }
        ]
    }
}