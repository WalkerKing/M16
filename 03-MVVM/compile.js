class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        if(this.el){
            // 如果这个元素能获取到，我们才开始编译
            // 1. 先把真实的dom移入到内存中，fragment
            let fragment = this.node2fragment(this.el);
            // 2. 编译 => 提取想要的元素节点 v-model 和文本节点 {{}}
            this.compile(fragment);



            // 把编译好的fragment渲染到页面
            this.el.appendChild(fragment);
        }
    }

    /* 专门写辅助方法 */
    isElementNode(node) {
        return node.nodeType === 1;
    }
    isDirective(name) {
        return name.includes('v-');
    }

    /* 核心方法 */

    node2fragment(el) { //将el中的内容全部放到内存中
        let fragment = document.createDocumentFragment();
        let firstChild;
        while(firstChild = el.firstChild){
            fragment.appendChild(firstChild);
        }
        
        return fragment;
    }
    compile(fragment) {
        let childNodes = fragment.childNodes;
        Array.from(childNodes).forEach(node => {
            if(this.isElementNode(node)){
                // 是元素节点，需要继续递归
                // 这里需要编译元素
                this.compileElement(node);
                this.compile(node);
            }else{
                // 文本节点
                this.compileText(node);
            }
        });
    }
    // 编译元素
    compileElement(node) {
        let attrs = node.attributes;
        Array.from(attrs).forEach(attr => {
            // 判属性名字是不是包含v-
            let attrName = attr.name;
            if(this.isDirective(attrName)) {
                // 取到对应的值放到节点中
                let expr = attr.value;
                // let [, type] = attrName.split('-');
                let type = attrName.slice(2);
                CompileUtil[type](node, this.vm, expr);

            }
        })
    }
    // 编译文本
    compileText(node) {
        let expr = node.textContent; // 取文本中的内容
        let reg = /\{\{([^}]+)\}\}/g;
        if(reg.test(expr)) {
            CompileUtil['text'](node, this.vm, expr);
        }
    }

}

let CompileUtil = {
    getVal(vm, expr) {
        expr = expr.split('.');
        return expr.reduce((prev, next) => {
            return prev[next];
        }, vm.$data);
    },
    setVal(vm, expr, value) {
        expr = expr.split('.');
        return expr.reduce((prev, next, currentIndex) => {
            if(currentIndex === expr.length - 1){
                return prev[next] = value;
            }
            return prev[next];
        }, vm.$data);
    },
    getTextVal(vm, expr) {
        return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            return this.getVal(vm, arguments[1]);
        });
    },
    text(node, vm, expr) { // 文本处理
        let updateFn = this.updater['textUpdater'];
        let value = this.getTextVal(vm, expr);
        expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            new Watcher(vm, arguments[1], newValue => {
                updateFn && updateFn(node, this.getTextVal(vm, expr));
            });
        });
        updateFn && updateFn(node, value);
    },

    model(node, vm, expr) { // 输入框处理
        let updateFn = this.updater['modelUpdater'];
        // 加一个watcher，数据发生变化的时候，调用watch的回调
        new Watcher(vm, expr, () => {
            // 值发生变化就执行更新
            updateFn && updateFn(node, this.getVal(vm, expr));
        });
        node.addEventListener('input', e => {
            let newValue = e.target.value;
            this.setVal(vm, expr, newValue);
        });
        updateFn && updateFn(node, this.getVal(vm, expr));
    },

    updater: {
        textUpdater(node, value) {
            node.textContent = value;
        },
        modelUpdater(node, value) {
            node.value = value;
        }
    }
}