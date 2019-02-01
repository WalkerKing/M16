export class Element {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}
const setAttr = (node, key, value) => {
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
export const createElement = (type, props, children) => {
    return new Element(type, props, children);
}
export const render = vDom => {
    let el = document.createElement(vDom.type);
    for (let key in vDom.props) {
        setAttr(el, key, vDom.props[key]);
    }

    vDom.children.forEach(child => {
        child = (child instanceof Element) ? render(child) : document.createTextNode(child);
        el.appendChild(child);
    });
    return el;
}

export const renderDom = (el, target) => {
    target.appendChild(el);
}