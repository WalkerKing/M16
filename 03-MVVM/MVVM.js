class MVVM {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        
        if(this.$el){

            // 数据劫持，把所有的属性改成get和set方法
            new Observer(this.$data);
            this.proxyData(this.$data);
            //模板编译
            new Compile(this.$el, this);
        }
    }

    proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                get() {
                    return data[key];
                },
                set(value) {
                    data[key] = value;
                }
            });
        });
    }
}