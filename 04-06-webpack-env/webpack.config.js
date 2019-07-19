const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config') 
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'development'){
    module.exports = merge(base, require('./webpack.dev.config'))
}else{
    module.exports = merge(base, require('./webpack.prod.config'))
}
