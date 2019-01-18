<template>
  <div class="map">
    <div class="topMapInfo">
      <span class="form-group">
          <label>Miejsce startu: </label>
            <gmap-autocomplete @place_changed="setStartPosition" placeholder="Miejsce startu">
            </gmap-autocomplete>
      </span>
      <span class="form-group">
        <label>Miejsce końca: </label>
        <gmap-autocomplete @place_changed="setEndPosition" aria-placeholder="Miejsce końca trasy">
        </gmap-autocomplete>
      </span>
      <br/>
      <!--<PlaceDescription :map="mapObject" :placeid="startPlaceId" title="Start"></PlaceDescription>-->
      <!--<PlaceDescription :map="mapObject" :placeid="endPlaceId" title="End"></PlaceDescription>-->
      <AddressDescription :map="mapObject" :location="startMarker.location" title="Początek: " ></AddressDescription>
      <AddressDescription :map="mapObject" :location="endMarker.location" title="Koniec: " ></AddressDescription>
      <div id="terminalMarkerDescription">
        <div id="startMarkerDescription">
        </div>
        <div id="endMarkerDescription">
        </div>
      </div>

    </div>
    <br>
    <gmap-map id="VueGoogleMap" ref="mapRef"
      :center="center"
      :zoom="12"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      ></gmap-marker>
      <gmap-marker
        :position="startMarker.location"
        :clickable="true"
        label="S"
        :draggable="true"
        @click="center=startMarker.location"
        @dragend="updateStartPosition"
      ></gmap-marker>
      <gmap-marker
        :position="endMarker.location"
        :clickable="true"
        label="K"
        :draggable="true"
        @click="center=endMarker.location"
        @dragend="updateEndPosition"
      ></gmap-marker>

      <gmap-marker v-for="(place, i) in interestingPointsInRoute"
                   :position="place.location"
                   :clickable="true"
                   :label="i"
                   :draggable="false"
                   @click="clickedInterestingPlaceMarker(place)"
                   :icon="findPointOfInterestIcon(place)"
      ></gmap-marker>
      <gmap-marker v-for="place in interestingPointsNearRoute"
                   :position="place.location"
                   :clickable="true"
                   label="!"
                   :draggable="false"
                   @click="clickedInterestingPlaceMarker(place)"
                   :icon="findPointOfInterestIcon(place)"
      ></gmap-marker>

      <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
        <PlaceInfoBox :place="infoboxInterestingPlace"></PlaceInfoBox>
      </gmap-info-window>
       <gmap-polyline v-if="fastestPath.length > 0" :path="fastestPath" :editable="false" ref="polyline">
       </gmap-polyline>

      <gmap-polyline v-for="line in polilineInterestingPathsField" :path="line.path"
                     :editable="false" :options='{strokeColor:line.color}' >
      </gmap-polyline>
    </gmap-map>
  </div>
</template>

<script>

import PlaceDescription from './PlaceDescription'
import AddressDescription from './AddressDescription'
import PlaceInfoBox from "./PlaceInfoBox";

export default {
  name: 'GoogleMap',
  props: ["pointsOfInterest", "routes", "global"],
  components: {PlaceInfoBox, AddressDescription, PlaceDescription },
  data () {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null,
      startMarker: {
        location: null,
        description: null
      },
      endMarker: {
        location: null,
        description: null
      },
      mapObject: null,
      startPlaceId: null,
      endPlaceId: null,

      path:[],

      infoWindowPos: null,
      infoWinOpen: false,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      interestingPointsNearRoute: [],
      interestingPointsInRoute: [],
      infoboxInterestingPlace: null,

      polilineInterestingPathsField:[]

    }
  },

  mounted () {
    var vm = this;
    this.$refs.mapRef.$mapPromise.then((map) => {
      this.mapObject = map;
      vm.global.map = map;
    });
    this.geolocate();

    this.$eventHub.$on('newRequest', response => {
      console.log("Update!")
      vm.$forceUpdate();
    });

    this.$eventHub.$on('updateRoutes',  routes => {
      vm.routes = routes;
      vm.polilineInterestingPathsField =  vm.polilineInterestingPathsFunc();

      vm.interestingPointsInRoute = routes.interestingPointsInRoute;
      vm.interestingPointsNearRoute = routes.interestingPointsNearRoute;
    });
  },

  computed:{
    fastestPath: function(){
      var toReturn = []
      if(this.routes.fastestRoute) {
        var decoded = google.maps.geometry.encoding.decodePath(this.routes.fastestRoute.travelObjects[0].overview_polyline.points);
        decoded.forEach(d => {
          toReturn.push({lat: d.lat(), lng: d.lng()})
        });
      }
      return toReturn;
    },
     polilineInterestingPaths: function () {
       var toReturn = []
       if(this.routes.interestingRoute){
         this.routes.interestingRoute.travelObjects.forEach(c => {
           var decoded = google.maps.geometry.encoding.decodePath(c.overview_polyline.points);
           var thisLinePoints = [];
           decoded.forEach(d => {
             thisLinePoints.push({lat: d.lat(), lng: d.lng()})
           });
            toReturn.push({path:thisLinePoints, color: c.color})
         });
       }
        return toReturn;
     }
  },

  methods: {
    empty: function () {},
    // receives a place object via the autocomplete component
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    },
    polilineInterestingPathsFunc: function () {
      var toReturn = []
      if(this.routes.interestingRoute){
        this.routes.interestingRoute.travelObjects.forEach(c => {
          var decoded = google.maps.geometry.encoding.decodePath(c.overview_polyline.points);
          var thisLinePoints = [];
          decoded.forEach(d => {
            thisLinePoints.push({lat: d.lat(), lng: d.lng()})
          });
          toReturn.push({path:thisLinePoints, color: c.color})
        });
      }
      return toReturn;
    },
    setStartPosition: function (location) {
      this.startPlaceId = location.place_id
      this.setStartMarker({
        lat: location.geometry.location.lat(),
        lng: location.geometry.location.lng()
      });
      if(this.startMarker.location && this.endMarker.location){
        this.fitBounds();
      }else{
        this.center = this.startMarker.location
      }
    },
    setEndPosition: function (location) {
      this.endPlaceId = location.place_id
      this.setEndMarker({
        lat: location.geometry.location.lat(),
        lng: location.geometry.location.lng()
      });

      if(this.startMarker.location && this.endMarker.location){
        this.fitBounds();
      }else{
        this.center = this.endMarker.location
      }
    },
    updateStartPosition: function (location) {
      this.setStartMarker({ lat: location.latLng.lat(), lng: location.latLng.lng() });
      this.startPlaceId = null

      if(this.startMarker.location && this.endMarker.location){
        this.fitBounds();
      }
    },
    updateEndPosition: function (location) {
      this.setEndMarker({ lat: location.latLng.lat(), lng: location.latLng.lng() })
      this.endPlaceId = null;

      if(this.startMarker.location && this.endMarker.location){
        this.fitBounds();
      }
    },
    setStartMarker: function(location){
      this.startMarker.location = location;
      this.$eventHub.$emit('startPositionChange', this.startMarker.location)
    },
    setEndMarker: function (location) {
      this.endMarker.location = location;
      this.$eventHub.$emit('endPositionChange', this.endMarker.location);
    },

    fitBounds: function(){
      var b = new google.maps.LatLngBounds();
      b.extend(this.startMarker.location);
      b.extend(this.endMarker.location);
      this.$refs.mapRef.fitBounds(b)
    },

       toggleInfoWindow: function(position) {
        this.infoWindowPos = position;

        //check if its the same marker that was selected if yes toggle
        // if (this.currentMidx == idx) {
        //   this.infoWinOpen = !this.infoWinOpen;
        // }
        //if different marker set infowindow to open and reset current marker index
        // else {
          this.infoWinOpen = true;
        // }
      },

    clickedInterestingPlaceMarker: function(place){
      this.infoboxInterestingPlace = place;
      this.toggleInfoWindow(place.location)
    },

    findPointOfInterestIcon: function(place){
      if(place.isInPlan){
        return "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
      }else{
        return 'http://fxprotect.com/wp-content/uploads/2017/03/marker-blue.png'
      }
    }
  }
}
</script>
<style>
#VueGoogleMap{
  width:100%;
  height: 700px;
  padding: 5px 5px  5px 5px
}
  .topMapInfo{
    padding-top:10px
  }

.topMapInfo > .form-group{
  margin-left:30px;
  margin-right:30px;
}
</style>
