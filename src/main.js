import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false
Vue.use(VueAxios, axios)

axios.defaults.baseURL = 'https://proyecto-computo-agenda.herokuapp.com/api'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
