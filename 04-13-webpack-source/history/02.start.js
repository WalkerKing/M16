const { SyncBailHook } = require('tapable');

class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncBailHook(['name'])
        }
    }
    tap() {
        this.hooks.arch.tap('node', function(name){
            console.log('node', name)
            return 'a'
        })
        this.hooks.arch.tap('react', function(name){
            console.log('react', name)
        })
    }
    start() {
        this.hooks.arch.call('abc')
    }
}

let l = new Lesson('name')
l.tap();
l.start()