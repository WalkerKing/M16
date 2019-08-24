// promise版的
class AsyncParallelHook {
    constructor(args) {
        this.tasks = []
        this.promiseList = []
    }
    tapAsync(keys, task) {
        this.tasks.push(task)
    }
    tapPromise(keys, task) {
        this.tasks.push(task)
    }
    callAsync(...args) {
        let index = 0;
        let finalCallback = args.pop();
        let done = () => {  // Promise.all
            index++;
            if (index === this.tasks.length) {
                finalCallback()
            }
        }
        this.tasks.forEach(task => {
            task(...args, done)
        })
    }
    callPromise(...args) {
        let list = [];
        this.tasks.forEach(task => {
            list.push(task(...args))
        })
        return Promise.all(list)
    }
}

let total = 3
let hook = new AsyncParallelHook(['name'])
hook.tapPromise('node', function (name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node', name)
            resolve()
        }, 1010)
    })
})
hook.tapPromise('react', function (data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react', data)
            resolve()
        }, 2000)
    })
})

hook.callPromise('abc').then(() => {
    console.log('end')
})
