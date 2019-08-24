class AsyncSeriesHook {
    constructor(name) {
        this.tasks = []
    }
    tapAsync(key, task) {
        this.tasks.push(task)
    }
    callAsync(...args) {
        let finnalCallback = args.pop();
        let index = 0;
        let next = () => {
            if (index === this.tasks.length) return finnalCallback(...args);
            let task = this.tasks[index++];
            task(...args, next);
        }
        next();
    }
}
class Lesson {
    constructor() {
        this.hooks = {
            arch: new AsyncSeriesHook(['name'])
        }
    }
    tapAsync() {
        this.hooks.arch.tapAsync('node', function (name, next) {
            setTimeout(function () {
                console.log('node', name)
                next()
            }, 2000)
        })
        this.hooks.arch.tapAsync('react', function (name, next) {
            setTimeout(function () {
                console.log('react', name)
                next()
            }, 1000)
        })
    }
    callAsync() {
        this.hooks.arch.callAsync('abc', function () {
            console.log('end')
        })
    }
}

let l = new Lesson(['name'])
l.tapAsync()
l.callAsync()