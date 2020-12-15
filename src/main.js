
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use({
  install (Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: 'http://vuejs_backend/api/'
    })
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
