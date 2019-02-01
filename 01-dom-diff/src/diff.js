// 1. 规则：当节点类型相同时，去看一下属性是否相同，产生一个属性的补丁包{type: 'ATTRS'. attrs: {class: 'list-group}}
// 2. 新的dom节点不存在{type: 'REMOVE', index: xxxx}
// 3. 节点类型不相同，直接采用替换 {type: 'REPLACE', newNode: newNode}
// 4. 文本变化 {type: 'TEXT', text: 1}
const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
let Index = 0;
const isString = node => {
    return Object.prototype.toString.call(node) === '[object String]'
}
const diffAttr = (oldAttrs, newAttrs) => {
    let patch = {};
    for (let key in oldAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            patch[key] = newAttrs[key];
        }
    }
    for (let key in newAttrs) {
        if (!oldAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key];
        }
    }
    return patch;
}
const diffChildren = (oldChildren, newChildren, patches) => {
    oldChildren.forEach((child, idx) => {
        walk(child, newChildren[idx], ++Index, patches);
    });
}
const walk = (oldNode, newNode, index, patches) => {
    let currentPatch = [];
    let attrs = {};
    if (!newNode) {
        // 说明删除了节点
        currentPatch.push({
            type: REMOVE,
            index
        });
    } else if (isString(oldNode) && isString(newNode)) {
        if (oldNode !== newNode) {
            currentPatch.push({ type: TEXT, text: newNode });
        }
    } else if (oldNode.type === newNode.type) {
        attrs = diffAttr(oldNode.props, newNode.props);
        if (Object.keys(attrs).length > 0) {
            currentPatch.push({ type: ATTRS, attrs });
        }
        diffChildren(oldNode.children, newNode.children, patches);
    } else {
        // 说明节点被替换了
        currentPatch.push({
            type: REPLACE,
            newNode
        });
    }
    if (currentPatch.length > 0) {
        patches[index] = currentPatch
    }
}
export default (oldTree, newTree) => {
    let patches = {};
    let index = 0;
    walk(oldTree, newTree, index, patches);



    return patches;
}
