import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue'
import Personal from '@/views/personal.vue'
Vue.use(VueRouter)
// 4. 创建路由对象，进行路由配置
const router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/',
      component: Login
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'personal',
      path: '/personal/:id',
      component: Personal
    }
  ]
})
// 添加导航守卫
router.beforeEach((to, from, next) => {
  // 只有访问那些需要授权的api的时候，才需要进行守卫
  // console.log(to.path.indexOf('/personal/') === 0)
  if (to.path.indexOf('/personal/') === 0) {
    // 判断当前用户是否登录
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
