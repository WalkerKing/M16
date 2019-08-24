class SyncBailHook {
    constructor(args) {
        this.tasks = []
    }
    tap(keys, task) {
        this.tasks.push(task) 
    }
    call(...args) {
        let ret; // 当前函数的返回值,
        let index = 0; // 当前要先执行第一个
        do {
            ret = this.tasks[index++](...args)
        } while(ret === undefined && index < this.tasks.length);
    }
}

let hook = new SyncBailHook(['name'])
hook.tap('node', function(name){
    console.log('node', name)
    // return 1
})
hook.tap('react', function(name){
    console.log('react', name)
})

hook.call('abc')
