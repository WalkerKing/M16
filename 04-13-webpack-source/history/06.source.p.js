// AsyncSeriesHook 的promise版实现
class AsyncSeriesHook {
    constructor(name) {
        this.tasks = []
    }
    tapPromise(key, task) {
        this.tasks.push(task)
    }
    promise(...args) {
        let [first, ...others] = this.tasks;
        return others.reduce((p, n) => {
            return p.then(() => n(...args))
        }, first(...args)) 
    }
}
class Lesson {
    constructor() {
        this.hooks = {
            arch: new AsyncSeriesHook(['name'])
        }
    }
    tapAsync() {
        this.hooks.arch.tapPromise('node', function (name) {
            return new Promise((resolve, reject) => {
                setTimeout(function () {
                    console.log('node', name)
                    resolve()
                }, 2000)
            })
        })
        this.hooks.arch.tapPromise('react', function (name) {
            return new Promise((resolve, reject) => {
                setTimeout(function () {
                    console.log('react', name)
                    resolve()
                }, 1000)
            })
        })
    }
    callAsync() {
        this.hooks.arch.promise('abc').then(() => {
            console.log('end')
        })
    }
}

let l = new Lesson(['name'])
l.tapAsync()
l.callAsync()