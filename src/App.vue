<template>
  <div id="app">
    <div class="grid">
        <div class="top box header">
            <h1>Zaplanuj podróż</h1>
        </div>
        <div class="down">
            <div class="box left" id="leftBox">
                <div class="d1">
                    <GoogleMap :points-of-interest="pointsOfInterest" :routes="routes" :global="global"></GoogleMap>
                </div>
                <div>
                    <QueryControls :points-of-interest="pointsOfInterest" :routes="routes" :global="global" ></QueryControls>
                </div>
            </div>
            <div class="box right">
                <PoiPlan :routes="routes"></PoiPlan>
                <PathDescriptionBox :routes="routes" route-name="Najszybsza trasa"></PathDescriptionBox>
                <InterestingPathDescriptionBox :routes="routes"></InterestingPathDescriptionBox>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component/src/vue2-slider.vue'

import GoogleMap from './components/GoogleMap'
import QueryControls from './components/QueryControls'
import PlaceDescription from './components/PlaceDescription'
import AddressDescription from './components/AddressDescription'
import PathDescriptionBox from "./components/PathDescriptionBox";
import PlaceInforBox from './components/PlaceInfoBox'
import PoiPlan from  './components/PoiPlan'
import InterestingPathDescriptionBox from "./components/InterestingPathDescriptionBox";
export default {
  name: 'app',
  components: {
    InterestingPathDescriptionBox,
    PathDescriptionBox,
    GoogleMap,
    QueryControls,
    PlaceDescription,
    AddressDescription,
      PlaceInforBox,
      PoiPlan,
    vueSlider
  },
    data (){
      return {
        pointsOfInterest: [],
        routes:{ fastestRoute:null, interestingRoute:null, interestingPointsInRoute:[]},
        global: {map:{}}
      }
    },
    mounted(){
    var vm = this;
      this.$eventHub.$on('updateRoutes',  routes => {
        vm.routes = routes
      });
    },
  GOOGLE_API_KEY: 'AIzaSyDCLwOaPymlOIpbOZcVZLzhqLZVHxaIbf8',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
div{
}
#leftBox{
  flex: 0 0 70%;
}

html, body {
  height: 100%;
  margin: 0;
}
.grid {
  min-height: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
}
.grid > .left, .grid > .right {
  display: inline-flex;
  justify-content: end;
  flex-direction: column;
}
.grid > .header {
  margin-top: 0px;
  flex-basis: calc(100% - 22px);
  justify-content: center;
  flex-direction: column;
  height: 50px
}
.grid > div > div {
  justify-content: center;
  flex-direction: column;
}
.box { margin: 10px 0 10px 10px}
.left {
  flex: 0 0 70%;
  background-color: aquamarine;
}

.right{
  flex: 0 0 28%;
  height: 870px;
    overflow:scroll;
}

.down{
    display:flex;
    height: 900px;
}

@import '../dist/static/'
</style>
