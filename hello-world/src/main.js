import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueFlex from 'vue-flex'
import 'vue-flex/dist/vue-flex.css'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: App.GOOGLE_API_KEY,
    libraries: 'places' // This is required if you use the Autocomplete plugin
  }
})

Vue.use(VueFlex)
Vue.use(axios)

new Vue({
  render: h => h(App)
}).$mount('#app')
