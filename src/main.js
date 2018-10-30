// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Master from './components/layouts/Master'
import App from './App'
import LandingPage from './components/marketing/LandingPage'
import {store} from './store/store'

window.eventBus = new Vue()

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/', component: LandingPage },
  { path: '/todo', component: App },
]

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router: router,
  components: { Master },
  template: '<Master/>'
})
