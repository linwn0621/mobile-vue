import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
import router from '@/router/index.js'
import '@/styles/reset.css'
// 引入字体图标
// import { Icon } from 'vant'
// 全局引入提示框

import { Toast, Icon, Uploader, Dialog, Field, Tab, Tabs } from 'vant'

Vue.use(Toast)
Vue.use(Icon)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Tab)
Vue.use(Tabs)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
