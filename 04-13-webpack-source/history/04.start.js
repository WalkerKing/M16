const { SyncLoopHook } = require('tapable');
// SyncLoopHook钩子的特性,返回值只要不是undefined就继续执行
class Lesson {
    constructor() {
        this.index = 0;
        this.hooks = {
            arch: new SyncLoopHook(['name'])
        }
    }
    tap() {
        this.hooks.arch.tap('node', name => {
            console.log('node', name)
            return ++this.index === 3 ? undefined : 'go on'
        })
        this.hooks.arch.tap('react', (data) => {
            console.log('react', data)
        })
    }
    start() {
        this.hooks.arch.call('abc')
    }
}

let l = new Lesson('name')
l.tap();
l.start()