import Vue from 'vue'
import App from '@/App.vue'

import * as VueGoogleMaps from 'vue2-google-maps'
import VueFlex from 'vue-flex'
import 'vue-flex/dist/vue-flex.css'
import axios from 'axios'

import store from '@/store'
import router from '@/router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee)
library.add(faStar)
library.add(faStarHalf)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// Vue.use(VueRouter)

Vue.use(BootstrapVue);
Vue.use(VueGoogleMaps, {
  load: {
    key: App.GOOGLE_API_KEY,
    libraries: ['places','geometry'] // This is required if you use the Autocomplete plugin
  }
})

Vue.use(VueFlex)
Vue.use(axios)

Vue.prototype.$pois = []
Vue.prototype.$eventHub = new Vue();

Vue.filter('timeInHours', function(value) {
    let hours =  parseInt(Math.floor(value / 3600));
    let minutes = parseInt(Math.floor((value - (hours * 3600)) / 60));
    let seconds= parseInt((value - ((hours * 360) + (minutes * 60))) % 60);

    let dHours = (hours > 9 ? hours : '0' + hours);
    let dMins = (minutes > 9 ? minutes : '0' + minutes);
    let dSecs = (seconds > 9 ? seconds : '0' + seconds);

    return dHours + ":" + dMins
});

Vue.filter('formatDate', function(value) {
  if (value) {
      var minutes = value.getMinutes();
        let dMins = (minutes > 9 ? minutes : '0' + minutes);
      return value.getHours()+":"+dMins;
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


