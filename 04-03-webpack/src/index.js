import React from 'react'
import ReactDOM from 'react-dom'
import lib from './lib.js'

let res = lib()
console.log(res)
let s = 'Hello'
ReactDOM.render(<h1>{s}{res}</h1>, document.getElementById('root'))