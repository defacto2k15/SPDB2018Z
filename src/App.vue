<template>
  <div id="app">
    <h1>Django VueJs Template</h1>
    <div id="nav">
     <router-link :to="{ name: 'home' }">Vue</router-link> |
     <router-link :to="{ name: 'messages' }">Django Rest</router-link>
    </div>
    <div class="grid">
      <div class="box header">
        HEADER
      </div>
      <div class="box left" >
        <div>
            <GoogleMap></GoogleMap>
        </div>
        <div>
            <QueryConbtrols></QueryConbtrols>
        </div>
      </div>
      <div class="box right">
        <hello-world></hello-world>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import GoogleMap from './components/GoogleMap'
import QueryConbtrols from './components/QueryControls'
import PlaceDescription from './components/PlaceDescription'
import AddressDescription from './components/AddressDescription'
export default {
  name: 'app',
  components: {
    HelloWorld,
    GoogleMap,
    QueryConbtrols,
    PlaceDescription,
    AddressDescription
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
  margin-top: 60px;
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
