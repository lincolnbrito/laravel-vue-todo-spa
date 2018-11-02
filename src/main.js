// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VeeValidae from 'vee-validate'
import CxltToastr from 'cxlt-vue2-toastr'
import Master from './components/layouts/Master'
import store from './store/store'
import routes from './routes'

const toastrConfig = {
  position: 'bottom right',
  showDuration: 2000,
  timeOut: 5000,
  progressBar: true
}

window.eventBus = new Vue()

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VeeValidae)
Vue.use(CxltToastr, toastrConfig)

const router = new VueRouter({
  mode: "history",
  routes
})

router.beforeEach( (to, from, next) => {
  if(to.matched.some( record => record.meta.requiresAuth)) {
    if(!store.getters.loggedIn) {
      next({
        name: 'login',
        // query: { redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else if(to.matched.some( record => record.meta.requiresVisitor)) {
    if(store.getters.loggedIn) {
      next({
        name: 'todo',
        // query: { redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router: router,
  components: { Master },
  template: '<Master/>'
})
