let base = require('./base')
let base2 = require('./base2')
require('./index.css')
console.log(base())
document.getElementById('app').innerHTML = base()
document.getElementById('app2').innerHTML = base2()

// js文件变化,实现热更新
if(module.hot) {
    // 如果检测到base模块更新了,会调用此脚本
    module.hot.accept('./base', function () {
        let base = require('./base')
        document.getElementById('app').innerHTML = base() 
    })
}