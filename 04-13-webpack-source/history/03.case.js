class SyncWaterfallHook {
    constructor(args) {
        this.tasks = []
    }
    tap(keys, task) {
        this.tasks.push(task) 
    }
    call(...args) {
        let [first, ...others] = this.tasks;
        let ret = first(...args)
        // others.forEach(task => {
        //     ret = task(ret, ...args)
        // })
        others.reduce((prev, current) => {
            return current(prev)
        }, ret)
    }
}

let hook = new SyncWaterfallHook(['name'])
hook.tap('node', function(name){
    console.log('node', name)
    return 'node good'
})
hook.tap('react', function(data){
    console.log('react', data)
    return 'react good'
})
hook.tap('vue', function(data){
    console.log('vue', data)
})

hook.call('abc')
