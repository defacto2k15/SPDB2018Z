<template>
  <div id="app">
    <div class="grid">
      <div class="box header">
          <h1>Zaplanuj podróż</h1>
      </div>
      <div class="box left" >
        <div>
            <GoogleMap :points-of-interest="pointsOfInterest" :routes="routes" :global="global"></GoogleMap>
        </div>
        <div>
            <QueryControls :points-of-interest="pointsOfInterest" :routes="routes" :global="global" ></QueryControls>
        </div>
      </div>
        <div class="box right">
          <PoiPlan :points-of-interest="pointsOfInterest"></PoiPlan>
          <PathDescriptionBox :routes="routes" route-name="Najszybsza trasa"></PathDescriptionBox>
          <InterestingPathDescriptionBox :routes="routes"></InterestingPathDescriptionBox>
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
}

html, body {
  height: 100%;
  margin: 0;
}
.grid {
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.grid > .left, .grid > .right {
  display: flex;
  flex-basis: calc(50% - 14px);
  justify-content: center;
  flex-direction: column;
}
.grid > .header {
  display: flex;
  margin-top: 0px;
  flex-basis: calc(100% - 22px);
  justify-content: center;
  flex-direction: column;
}
.grid > div > div {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.box { margin: 10px 0 10px 10px}
.left {background-color: aquamarine; }
.box2 { background-color: orange; }
.box3 { background-color: purple; }
.box4 { background-color: grey; }
</style>
