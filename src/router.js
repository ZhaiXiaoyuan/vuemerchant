import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/account/Login.vue'
import Device from './pages/device/Device.vue'

Vue.use(Router)

const routes=[ {
  path: '/',
  alias: '/home',
  name: 'home',
  component: Home,
},{
  path: '/device',
  name: 'device',
  component: Device
},{
  path: '/login',
  name: 'login',
  component: Login
}]

export default new Router({
  routes:routes,
  mode: 'history',
 /* scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }*/
})
