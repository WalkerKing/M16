const babel = require('babel-core')
const types = require('babel-types')

let code = `import {flatten, join} from 'lodash'`

let visitor = {
    ImportDeclaration(path) {
        let node = path.node
        let specifiers = node.specifiers
        if (!types.isImportDefaultSpecifier(specifiers[0])) {
            let newImports = specifiers.map(specifier => {
                return types.importDeclaration([types.importDefaultSpecifier(specifier.local)],
                    types.stringLiteral(`${node.source.value}/${specifier.local.name}`))
            })
            path.replaceWithMultiple(newImports)
        }
    }
}

let s = babel.transform(code, {
    plugins: [
        { visitor }
    ]
})

console.log(s.code)