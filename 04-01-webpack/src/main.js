require('./index.css')
require('./less.less')
require('./sass.scss')
let src = require('./images/tiger.png')

let img = new Image()

img.src = src

document.body.appendChild(img)

import str from './base.js'
let getStr = () => {
    return str()()
}
console.log(getStr())