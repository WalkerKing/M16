import base from './base'
import React from 'react'
import ReactDOM from 'react-dom'
import ajax from 'ajax'

let fetch = require('fetch')
let result = ajax('/ajax')
// let result = '123'
console.log(fetch.default)
ReactDOM.render(<h1>{fetch.default}</h1>, document.getElementById('root'))