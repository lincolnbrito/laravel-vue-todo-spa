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
