<template>
    <div>
    <select v-model="travelMode">
      <option disabled value=null>Travel mode</option>
      <option value="DRIVING">Driving</option>
      <option value="WALKING">Walking</option>
      <option value="BICYCLING">Bicycling</option>
      <option value="TRANSIT">Transit</option>
    </select>
  <select v-model="interestKeyword">
    <option disabled value=null>What you are looking for</option>
    <option> Museum</option>
    <option> Restaurant</option>
    <option> Shop</option>
  </select>
  <button v-on:click="query"  :disabled="(travelMode==null || interestKeyword == null
    || startPositionLocation == null || endPositionLocation == null) && false" >Query</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'QueryControls',
  props: ["pointsOfInterest", "routes", "global"],
  data () {
    return {
      travelMode: null,
      interestKeyword: null,
      startPositionLocation: null,
      endPositionLocation: null
    }
  },
  mounted() {
    this.$eventHub.$on('startPositionChange', data => {
        this.startPositionLocation = data
    });
    this.$eventHub.$on('endPositionChange', data => {
      this.endPositionLocation = data
    });
  },

  methods: {
    query: function () {
      var waypointPointsOfInterest= [];
      this.pointsOfInterest.forEach(c => {
        if(c.isInPlan) {
          waypointPointsOfInterest.push({timeToSpend: c.timeSpent*3600, place_id: c.place.place_id})
        }
      });

      var getBody = {
        startPosition: this.startPositionLocation,
        endPosition: this.endPositionLocation,
        travelMode: this.travelMode,
        waypointPointsOfInterest: waypointPointsOfInterest,
        pointsOfIntereseKeyword: this.interestKeyword
      };

      var vm = this;
      vm.routes.interestingPointsInRoute = []
      axios.get('http://127.0.0.1:8090/routes', {body:getBody})
              .then(response => {
                vm.routes.fastestRoute = response.data;
              })
              .catch(e => {
                console.log("Error in request: "+e);
              });

      axios.get('http://127.0.0.1:8090/routes2', {body:getBody})
              .then(response => {
                vm.routes.interestingRoute = response.data;

                response.data.pointsOfInterestNearRoute.forEach(c => {
                  var service = new window.google.maps.places.PlacesService(vm.global.map);
                    service.getDetails({
                      placeId: c
                    }, function (place, status) {
                      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        vm.routes.interestingPointsInRoute.push(
                                {
                                  location: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()},
                                  place: place,
                                  isInPlan: false
                                });
                      }})});


              })
              .catch(e => {
                console.log("Error in request: "+e);
              });
    }
  }
}
</script>

<style scoped>

</style>
