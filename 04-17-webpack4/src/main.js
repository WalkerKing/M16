import Vue from 'vue'
import router from './router/index.js'
import App from './App.vue'

window.document.body.addEventListener('click', () => {
    import('vconsole').then(VConsole => {
        new VConsole.default
    })
})

new Vue({
    el: '#app',
    router,
    render: (h) => h(App)
})