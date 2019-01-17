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


