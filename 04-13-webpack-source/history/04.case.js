class SyncLoopHook {
    constructor(args) {
        this.tasks = []
    }
    tap(keys, task) {
        this.tasks.push(task)
    }
    call(...args) {
        let ret;
        let index = 0;
        do {
            ret = this.tasks[index](...args);
            if (ret === undefined) {
                index++
            }
        } while (index < this.tasks.length)
    }
}

let total = 3
let hook = new SyncLoopHook(['name'])
hook.tap('node', function (name) {
    console.log('node', name)
    return --total === 0 ? undefined : 'node good'
})
hook.tap('react', function (data) {
    console.log('react', data)
})
hook.tap('vue', function (data) {
    console.log('vue', data)
})

hook.call('abc')
