let { AsyncSeriesWaterfallHook } = require('tapable')

class Lesson {
    constructor() {
        this.hooks = {
            arch: new AsyncSeriesWaterfallHook(['name'])
        }
    }
    tapAsync() {
        this.hooks.arch.tapAsync('node', function(name, next) {
            setTimeout(function() {
                console.log('node', name)
                next(null, 'node finish')
            }, 1000)
        })
        this.hooks.arch.tapAsync('react', function(name, next) {
            setTimeout(function() {
                console.log('react', name)
                next()
            }, 1000)
        })
    }
    callAsync() {
        this.hooks.arch.callAsync('abc', function(){
            console.log('end')
        })
    }
}

let l = new Lesson(['name'])
l.tapAsync()
l.callAsync()