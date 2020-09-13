import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import('@/assets/css/saluddigna.min.css')
import print from './directives/print'
import VueHtml2Canvas from 'vue-html2canvas'
Vue.config.productionTip = false
Vue.use(VueHtml2Canvas)
new Vue({
  print,
  
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
