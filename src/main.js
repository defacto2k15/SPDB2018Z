import Vue from 'vue'
import App from '@/App.vue'

import * as VueGoogleMaps from 'vue2-google-maps'
import VueFlex from 'vue-flex'
import 'vue-flex/dist/vue-flex.css'
import axios from 'axios'

import store from '@/store' 
import router from '@/router'

Vue.config.productionTip = false

// Vue.use(VueRouter)

Vue.use(VueGoogleMaps, {
  load: {
    key: App.GOOGLE_API_KEY,
    libraries: 'places' // This is required if you use the Autocomplete plugin
  }
})

Vue.use(VueFlex)
Vue.use(axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

