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
    generateColor: function(i){
      var colors = ['#FF0000', '#FF00FF', '#00FF00', '#0000FF', '#00FFFF', '#FF0088']
      return colors[i%colors.length];
    },
    query: function () {
      var waypointPointsOfInterest= [];
      this.routes.interestingPointsInRoute.forEach(c => {
        if(c.isInPlan) {
          waypointPointsOfInterest.push({timeToSpend: c.timeSpent*3600, place_id: c.place.place_id})
        }
      });
      if(this.routes.interestingPointsNearRoute) {
        this.routes.interestingPointsNearRoute.forEach(c => {
          if (c.isInPlan) {
            waypointPointsOfInterest.push({timeToSpend: c.timeSpent * 3600, place_id: c.place.place_id})
          }
        });
      }

      var getBody = {
        startPosition: this.startPositionLocation,
        endPosition: this.endPositionLocation,
        travelMode: this.travelMode,
        waypointPointsOfInterest: waypointPointsOfInterest,
        pointsOfIntereseKeyword: this.interestKeyword
      };

      var vm = this;

      vm.routes.interestingPointsInRoute = [];
      vm.routes.interestingPointsNearRoute = [];
      // axios.get('http://127.0.0.1:8090/api/messages/', {body:getBody})
      axios.get('http://127.0.0.1:8090/routes', {body:getBody})
              .then(response => {
                vm.routes.fastestRoute = response.data;
              })
              .catch(e => {
                console.log("Error in request: "+e);
              });

      // axios.get('http://127.0.0.1:8080/api/messages', {body:getBody})
      axios.get('http://127.0.0.1:8090/routes2', {body:getBody})
              .then(response => {
                vm.routes.interestingRoute = response.data;
                var i = 0;
                vm.routes.interestingRoute.travelObjects.forEach(c => {
                  c.color = vm.generateColor(i);
                  i = i + 1;
                });

                response.data.pointsOfInterestNearRoute.forEach(c => {
                  var service = new window.google.maps.places.PlacesService(vm.global.map);
                    service.getDetails({
                      placeId: c
                    }, function (place, status) {
                      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        vm.routes.interestingPointsNearRoute.push(
                                {
                                  location: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()},
                                  place: place,
                                  isInPlan: false,
                                  timeSpent: 0.5
                                });
                      }})
                });

                response.data.pointsOfInterestInRoute.forEach(c => {
                  var service = new window.google.maps.places.PlacesService(vm.global.map);
                  service.getDetails({
                    placeId: c
                  }, function (place, status) {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                      var time = 0.5;
                      waypointPointsOfInterest.forEach(c => {
                        if(c.place_id === place.place_id){
                          time = c.timeToSpend / 3600;
                        }
                      });

                      vm.routes.interestingPointsInRoute.push(
                              {
                                location: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()},
                                place: place,
                                isInPlan: true,
                                timeSpent: time
                              });
                    }})
                });
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
