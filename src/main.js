// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert'

Vue.use(Vuetify, {
  theme: {
    primary: '#B71C1C',
    secondary: '#D32F2F',
    accent: '#0D47A1',
    error: '#f44336',
    warning: '#ffeb3b',
    info: '#2196f3',
    success: '#4caf50'
  }
})

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyD-05yK80S4zXISrmoVX4-E_qwlPDVKD38',
      authDomain: 'sadc0dersblog.firebaseapp.com',
      databaseURL: 'https://sadc0dersblog.firebaseio.com',
      projectId: 'sadc0dersblog',
      storageBucket: 'sadc0dersblog.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadPosts')
  }
})
