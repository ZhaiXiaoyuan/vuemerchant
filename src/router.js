import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/account/Login.vue'
import ForgetPassword from './pages/account/ForgetPassword.vue'
import Register from './pages/account/Register.vue'
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
  component: Login,
  meta:{
    title:'登录',
  },
},{
  path: '/register/:step?',
  name: 'register',
  component: Register,
  meta:{
    title:'商家注册',
  },
},{
  path: '/forgetPassword/:step?',
  name: 'forgetPassword',
  component: ForgetPassword,
  meta:{
    title:'设置密码',
  },
}]

const router= new Router({
  routes:routes,
  mode: 'history',
  /* scrollBehavior: function (to, from, savedPosition) {
   return savedPosition || { x: 0, y: 0 }
   }*/
})

//注册全局导航守卫
router.afterEach((to, from) => {
  //修改页面title
  document.title = to.meta.title;
})
//
export default router
