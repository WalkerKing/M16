import {createElement, render, renderDom} from './element';
import patch from './patch'
import diff from './diff';

let vDom1 = createElement('ul', {
    class: 'list',
}, [
    createElement('li', {class: 'item'}, ['a']),
    createElement('li', {class: 'item'}, ['b']),
    createElement('li', {class: 'item'}, ['c']),
]);

let vDom2 = createElement('ul', {
    class: 'group-list',
}, [
    createElement('li', {class: 'list-item'}, ['1']),
    createElement('li', {class: 'item'}, ['b']),
    createElement('li', {class: 'list-item'}, ['3']),
]);

let patches = diff(vDom1, vDom2);

console.log(patches);
let el = render(vDom1);
// console.log(vDom1);
console.log(el);
renderDom(el, window.root);

patch(el, patches);
