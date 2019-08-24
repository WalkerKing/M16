class AsyncParallelHook {
    constructor(args) {
        this.tasks = []
    }
    tapAsync(keys, task) {
        this.tasks.push(task)
    }
    callAsync(...args) {
        let index = 0;
        let finalCallback = args.pop();
        let done = () => {  // Promise.all
            index++;
            if(index === this.tasks.length){
                finalCallback()
            }
        }
        this.tasks.forEach(task => {
            task(...args, done)
        })
    }
}

let total = 3
let hook = new AsyncParallelHook(['name'])
hook.tapAsync('node', function (name, next) {
    setTimeout(() => {
        console.log('node', name)
        next()
    }, 1010)
})
hook.tapAsync('react', function (data, next) {
    setTimeout(() => {
        console.log('react', data)
        next()
    }, 1000)
})
hook.tapAsync('vue', function (data) {
    console.log('vue', data)
})

hook.callAsync('abc', function () {
    console.log('end')
})
