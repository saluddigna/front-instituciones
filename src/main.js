import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import('@/assets/css/saluddigna.min.css')
import print from './directives/print'
Vue.config.productionTip = false

new Vue({
  print,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
