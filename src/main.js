import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Cloudinary from 'cloudinary-vue'
Vue.config.productionTip = false

Vue.use(Cloudinary, {
  configuration: { cloudName: 'teamb' },
  components: ['CldImage']
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
