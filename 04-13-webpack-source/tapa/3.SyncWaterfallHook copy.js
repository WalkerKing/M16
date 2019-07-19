// let { SyncWaterfallHook } = require('tapable')

class SyncWaterfallHook {
    constructor() {
        this.hooks = []
    }
    tap(name, fn) {
        this.hooks.push(fn)
    }
    call() {
        let result =arguments
        for(let i = 0; i < this.hooks.length; i++) {
            let hook = this.hooks[i]
            result = i === 0 ? hook(...arguments) : hook(result)
        }
    }
}

// events EventEmitter
// 触发此事件时候需要传入name参数,然后监听函数可以获取name参数
let queue = new SyncWaterfallHook(['name', 'age'])
queue.tap('1', function (name, age) {
    console.log(name, 1)
    return '1'
})
queue.tap('2', function (data) {
    console.log(data, 2)
    return '2'
})
queue.tap('3', function (data) {
    console.log(data, 3)
})
queue.call('start', '10') // call的意思是调用,触发事件