const { SyncWaterfallHook } = require('tapable');

class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncWaterfallHook(['name'])
        }
    }
    tap() {
        this.hooks.arch.tap('node', function(name){
            console.log('node', name)
            return 'Node study good'
        })
        this.hooks.arch.tap('react', function(data){
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