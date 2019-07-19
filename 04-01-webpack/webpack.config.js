// webpack内部有个事件流 tapable1.0
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    // entry: './src/index.js',
    // entry: ['./src/base.js', './src/index.js'],
    // 先找到每个入口(Entry),然后从各个入口分别出发,找到依赖的模块,然后生成一个chunk(代码块),最后会把chunk写到文件系统中(Assets)
    // entry: {
    //     index: './src/index.js',
    //     base: './src/base.js',
    //     common: './src/common.js'
    // },
    entry: './src/main.js',
    output: {
        path: path.resolve(path.join(__dirname, 'dist')),
        filename: '[name].[hash:8].js'
    },
    // 表示监控源文件的变化,当源文件发生变化后,重新打包
    watch: false,
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000, // 每秒钟询问的次数
        aggregateTimeout:500, // 表示监控源文件的变化,当源文件发生变化后,重新打包
    },
    resolve: {
        // 配置别名
        alias: {

        },
        // extensions: ['', '.js', 'less', '.json']
    },
    module: {
        rules: [
            // 也可以用以下方式把jquery加载进去
            // {
            //     test: /^jquery$/,
            //     loader: 'expose-loader?$'
            // },
            {
                test: require.resolve('jquery'), // 得到一个模块的绝对路径
                use: {
                    loader: 'expose-loader',
                    options: '$'
                }
            },
            // {
            //     //file-loader是解析图片地址,把图片拷贝到目标位置 
            //     // 可以处理任意的二进制数据
            //     // url-loader可以在文件比较小的时候直变成base64内嵌到页面中
            //     test: /\.(png|jpg|gif|svg|bmp)$/,
            //     use: {
            //         loader: 'file-loader',
            //         options: {
            //             outputPath: './images' // 指定输出目录
            //         }
            //     }
            // },
            {
                //file-loader是解析图片地址,把图片拷贝到目标位置 
                // 可以处理任意的二进制数据
                // url-loader可以在文件比较小的时候直变成base64内嵌到页面中
                test: /\.(png|jpg|gif|svg|bmp)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5 * 1024,
                        outputPath: './images' // 指定输出目录
                    }
                }
            },
            {
                test: /\.(html|htm)$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env', { modules: false }], // 不编译模块语法
                        ]
                    }
                },
                include: path.resolve('./src'),
                exclude: '/node_modules/'
            }
        ]
    },
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             // 从不同页面之间的公用模块
    //             common: {
    //                 chunks: 'initial',
    //                 minChunks: 2, // 最少有2个复用
    //             },
    //             vender: {
    //                 chunks: 'initial',
    //                 test: /node_modules/,
    //                 name: 'vender'
    //             }
    //         },

    //     }
    // },
    devServer: {
        contentBase: './dist',
        host: 'localhost',
        port: '8080',
        inline: true, // 在打包文件里注入一个websocket客户端
        hot: true,
    },
    // devtool: 'cheap-module-eval-source-map',
    plugins: [
        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // }),
        new CleanWebpackPlugin(),
        //此插件可以自动产出html文件
        new HtmlWebpackPlugin({
            template: './src/index.html',// 指定产出的html模板
            filename: 'index.html', //产出的html文件名
            title: '欢迎光临 index',
            hash: true, //会在引入的js中加入查询字符串避免缓存
            // chunks: ['common', 'index'],
            minify: {
                removeAttributeQuotes: true // 把属性的双引号删除
            }
        }),
        new UglifyjsPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'public'),
                to: path.join(__dirname, 'dist', 'public')
            }
        ]),
        // new HtmlWebpackPlugin({
        //     template: './src/index.html' ,// 指定产出的html模板
        //     filename: 'base.html', //产出的html文件名
        //     title: '欢迎光临 base',
        //     hash: true, //会在引入的js中加入查询字符串避免缓存
        //     chunks: ['common', 'base'],
        //     minify: {
        //         removeAttributeQuotes: true // 把属性的双引号删除

        //     }
        // }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }), 
        // new webpack.HotModuleReplacementPlugin(), //热更新插件
        // new webpack.NamedModulesPlugin(), // 使用名称替代id

    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    }
}