let fs = require('fs');
let path = require('path');
// babylon 把源码转换成ast
let babylon = require('babylon');
// @babel/traverse
let traverse = require('@babel/traverse').default;
// @babel/types
let t = require('@babel/types');
// @babel/generator
let generator = require('@babel/generator').default;

let ejs = require('ejs');
class Compiler {
    constructor(config) {
        this.config = config;
        // 需要保存入口文件的路径
        this.entryId;
        // 需要保存所有模块依赖
        this.modules = {};
        // 入口路径
        this.entry = config.entry;
        // 获取工作路径
        this.root = process.cwd();
    }
    getSource(modulePath) {
        let source = fs.readFileSync(modulePath, 'utf8');
        let rules = this.config.module.rules;
        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i];
            let { test, use } = rule;
            if (test.test(modulePath)) { // 说明这个模块需要使用loader处理
                // 获取到对应的loader函数
                let loaderURL = ''
                while (loaderURL = use.pop()) {
                    let loader = require(loaderURL);
                    source = loader(source);
                }
            }
        }
        return source;
    }
    parse(source, parentPath) {
        let ast = babylon.parse(source);
        let dependencies = [];
        traverse(ast, {
            CallExpression(p) {
                let node = p.node;
                if (node.callee.name === 'require') {
                    node.callee.name = '__webpack_require__';
                    let moduleName = node.arguments[0].value;
                    moduleName += (path.extname(moduleName) ? '' : '.js');
                    moduleName = './' + path.join(parentPath, moduleName);
                    dependencies.push(moduleName);
                    node.arguments = [t.stringLiteral(moduleName)];
                }
            }
        })
        let sourceCode = generator(ast).code;
        return { sourceCode, dependencies }
    }
    buildModule(modulePath, isEntry) {
        let source = this.getSource(modulePath);

        let moduleName = './' + path.relative(this.root, modulePath)

        if (isEntry) this.entryId = moduleName;

        // 解析:把source源码进行改造,返回一个依赖列表
        let { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName));

        this.modules[moduleName] = sourceCode;
        dependencies.forEach(dep => { // 附模块的递归加载
            this.buildModule(path.join(this.root, dep), false)
        });
    }
    emitFile() {
        // 用数据 渲染模板
        // 获取输出目录
        let main = path.join(this.config.output.path, this.config.output.filename);
        let templateStr = this.getSource(path.join(__dirname, 'main.ejs'));
        let code = ejs.render(templateStr, { entryId: this.entryId, modules: this.modules });

        this.assets = {};

        this.assets[main] = code;

        fs.writeFileSync(main, this.assets[main]);
    }
    run() {
        // 执行并创建模块的依赖关系
        this.buildModule(path.resolve(this.root, this.entry), true);
        this.emitFile();
    }
}

module.exports = Compiler;