import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import EventBus from '@/plugins/event-bus'
import('@/assets/css/saluddigna.min.css')
Vue.config.productionTip = false
Vue.use(EventBus)
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
