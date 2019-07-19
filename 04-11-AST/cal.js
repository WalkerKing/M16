// let code = `const result = 1000 * 60`
let code = `const result = 1000 * 60 * 60 * 24 * 365`
const types = require('babel-types')
const babel = require('babel-core')
// 预计算
let visitor = {
    BinaryExpression(path) {
        let node = path.node
        let statement
        if (!isNaN(node.left.value) && !isNaN(node.right.value)) {
            let result = eval(node.left.value + node.operator + node.right.value)
            statement = types.numericLiteral(result)
            path.replaceWith(statement)
            if (path.parentPath.node.type === 'BinaryExpression') {
                visitor.BinaryExpression.call(null, path.parentPath)
            }
        }
    }
}

let result = babel.transform(code, {
    plugins: [
        {
            visitor
        }
    ]
})

console.log(result.code) // const result = 31536000000