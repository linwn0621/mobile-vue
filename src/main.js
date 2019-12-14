import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
import router from '@/router/index.js'
import '@/styles/reset.css'
// 全局引入提示框
import { Toast } from 'vant'
Vue.use(Toast)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
