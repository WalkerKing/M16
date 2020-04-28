import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'map',
        component: () => import('@/views/map')
    },
    {
        path: '/moment',
        name: 'moment',
        component: () => import('@/views/moment')
    },
    {
        path: '/lodash',
        name: 'lodash',
        component: () => import('@/views/lodash')
    },
]

export default new VueRouter({ routes })
