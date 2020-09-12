import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Inicio from '../views/Inicio.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: Inicio
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
const DEFAULT_TITLE = 'Instituciones - Salud Digna'
router.afterEach((to) => {
  document.title = to.meta.title || DEFAULT_TITLE
})
export default router
