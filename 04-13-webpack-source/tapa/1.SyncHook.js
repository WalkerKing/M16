// let { SyncHook } = require('tapable')

class SyncHook {
    constructor() {
        this.hooks = []
    }
    tap(name, fn) {
        this.hooks.push(fn) 
    }
    call() {
        this.hooks.forEach(hook => hook(...arguments))
    }
}

// events EventEmitter
// 触发此事件时候需要传入name参数,然后监听函数可以获取name参数
let queue = new SyncHook(['name', 'age'])
queue.tap('1', function (name, age) {
    console.log(name, 1)
})
queue.tap('2', function (name, age) {
    console.log(name, 2)
})
queue.tap('3', function (name, age) {
    console.log(name, age, 3)
})
queue.call('call', '10') // call的意思是调用,触发事件