import {render} from './element'
let allPatches = [];
let index = 0;
const doPatch = (node, patches) => {
    patches.forEach(patch => {
        switch (patch.type) {
            case 'ATTRS':
                for (let key in patch.attrs) {
                    let value = patch.attrs[key];
                    switch (key) {
                        case 'value':
                            let tagName = node.tagName.toUpperCase;
                            if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
                                node.value = value;
                            } else {
                                node.setAttribute(key, value);
                            }
                            break;
                        case 'style':
                            node.style.cssText = value;
                            break;
                        default:
                            node.setAttribute(key, value);
                            break;
                    }
                }
                break;
            case 'TEXT':
                node.textContent = patch.text;
                break;
            case 'REPLACE':
                let newNode = (patch.newNode instanceof Element) ? render(patch.newNode) : document.createTextNode(patches.newNode);
                node.parentNode.insertBefore(newNode, node);
                node.parentNode.removeChild(node);
                break;
            case 'REMOVE':
                node.parentNode.removeChild(node);
                break;
            default:
        }
    });
}
const walk = node => {
    let currentPatch = allPatches[index++];
    let childNodes = node.childNodes;
    childNodes.forEach(child => walk(child));
    if (currentPatch) {
        doPatch(node, currentPatch);
    }
}
export default (node, patches) => {
    allPatches = patches;
    walk(node);
}