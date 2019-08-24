const { AsyncParallelHook } = require('tapable');
// 异步的钩子,并行,需要等待所有并发的异步事件执行后再执行回调
// 同时发送多个请求
// 注册方法 分为 tap注册 tapAsync注册
class Lesson {
    constructor() {
        this.index = 0;
        this.hooks = {
            arch: new AsyncParallelHook(['name'])
        }
    }
    tap() {
        this.hooks.arch.tapAsync('node', (name, next) => {
            setTimeout(() => {
                console.log('node', name)
                next()
            }, 1010)
        })
        this.hooks.arch.tapAsync('react', (data, next) => {
            setTimeout(() => {
                console.log('react', data)
                next()
            }, 1000)
        })
    }
    start() {
        this.hooks.arch.callAsync('abc', function() {
            console.log('finish')
        })
    }
}

let l = new Lesson('name')
l.tap();
l.start()