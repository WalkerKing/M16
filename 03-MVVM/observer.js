class Observer {
    constructor(data) {
        this.observer(data);
    }

    // data数据改成get和set形式
    observer(data) {
        if(!data || typeof data !== 'object'){
            return ;
        }
        // 要将数据一一，获取data的key和value
        Object.keys(data).forEach(key => {
            // 劫持
            this.defineReactive(data, key, data[key]);
            this.observer(data[key]);
        });
    }
    // 定义响应式
    defineReactive(obj, key, value) {
        let that = this;
        let dep = new Dep();
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            set(newValue) {
                if(newValue != value) {
                    that.observer(newValue);
                    value = newValue;
                    dep.notify();
                }
            }
        });
    }
}

class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(watcher) {
        this.subs.push(watcher);
    }
    notify() {
        this.subs.forEach(watcher => watcher.update());
    }
}