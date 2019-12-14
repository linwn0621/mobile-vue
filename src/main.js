import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
import router from '@/router/index.js'
import '@/styles/reset.css'
// 引入字体图标
// import { Icon } from 'vant'
// 全局引入提示框
import { Toast, Icon } from 'vant'

Vue.use(Toast)
Vue.use(Icon)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
