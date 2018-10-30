// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Master from './components/layouts/Master'
import store from './store/store'
import routes from './routes'

window.eventBus = new Vue()

Vue.config.productionTip = false
Vue.use(VueRouter)



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
