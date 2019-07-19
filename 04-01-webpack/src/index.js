// 有时候确实需要全局变量, 使用以下方法
// expose-loader?全局变量!模块名 它会先加载此模块,然后得到模块的导出对象,挂载到全局对象上
// ?表示传参,!代表loader
// let $ = require('expose-loader?$!jquery')
let $ = require('jquery')
let name = require('./base');
let i1 = require('./i1')
//require('./index.css');
$('#app').innerHTML = name();

// module.hot 标识热更新
if(module.hot){
    // 如果检测到base更新了，执行回调
    module.hot.accept('./base', function() {
        let name = require('./base');
        document.getElementById('app').innerHTML = name();
    });
}