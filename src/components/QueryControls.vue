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
    foo: function(vm, response, newPointsInRoute){
        response.data.place_id.forEach(c => {
          if(newPointsInRoute.find( q => q.place.place_id === c)){
            return;
          }

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
            }
          })
        });
    },
    calculateTravelTime: function(route){
      var sum = 0;
      route.legs[0].steps.forEach(c => {
        sum += c.duration.value;
      });
      return sum;
    },
    query: function () {
      var waypointPointsOfInterest= [];
      var newPointsInRoute = [];
      this.routes.interestingPointsInRoute.forEach(c => {
        if(c.isInPlan) {
          waypointPointsOfInterest.push({timeToSpend: c.timeSpent*3600, place_id: c.place.place_id})
          newPointsInRoute.push(c)
        }
      });
      if(this.routes.interestingPointsNearRoute) {
        this.routes.interestingPointsNearRoute.forEach(c => {
          if (c.isInPlan) {
            waypointPointsOfInterest.push({timeToSpend: c.timeSpent * 3600, place_id: c.place.place_id})
            newPointsInRoute.push(c)
          }
        });
      }

      var getBody = {
        startPosition: {lat: this.startPositionLocation.lat, lng: this.startPositionLocation.lng} ,
        endPosition: {lat: this.endPositionLocation.lat, lng:this.endPositionLocation.lng},
        travelMode: this.travelMode.toLowerCase(),
        pointsOfInterestKeyword: this.interestKeyword
      };

      console.log("We make request!")
      var vm = this;

      vm.routes.interestingPointsInRoute = [];
      vm.routes.interestingPointsNearRoute = [];
      axios.get('http://127.0.0.1:8080/api/messages/', {params:getBody})
      // axios.get('http://127.0.0.1:8090/routes', {body:getBody})
              .then(response => {
                vm.routes.fastestRoute = {travelObjects:  [response.data.routes[0]],
                    travelTime:this.calculateTravelTime(response.data.routes[0]) };
                if(waypointPointsOfInterest.length === 0 ){
                    this.foo(vm, response, newPointsInRoute)
                }

                vm.$eventHub.$emit('newRequest');
              })
              .catch(e => {
                console.log("Error in request: "+e);
              });

      if(waypointPointsOfInterest.length > 0 ) {
        // getBody.waypointPointsOfInterest = waypointPointsOfInterest;

        vm.routes.interestingPointsInRoute = newPointsInRoute;

        var positions = [];
        positions.push({lat: this.startPositionLocation.lat, lng: this.startPositionLocation.lng})
        newPointsInRoute.forEach(c => {
          positions.push({lat: c.place.geometry.location.lat(), lng:c.place.geometry.location.lng()})
        });
        positions.push({lat: this.endPositionLocation.lat, lng:this.endPositionLocation.lng})

        vm.routes.interestingPointsInRoute = newPointsInRoute;

        vm.routes.interestingRoute = {};
        vm.routes.interestingRoute.travelObjects = [];
        vm.routes.interestingRoute.travelTime = 0;
        newPointsInRoute.forEach(c => {
          vm.routes.interestingRoute.travelTime += c.timeSpent*3600;
        });

        var j = 0;
        for(var i = 0; i < positions.length-1; i++) {
          getBody = {
            startPosition: positions[i],
            endPosition: positions[i+1],
            travelMode: this.travelMode.toLowerCase(),
            pointsOfInterestKeyword: this.interestKeyword
          };

          console.log("RequestX: "+i)
          axios.get('http://127.0.0.1:8080/api/messages', {params: getBody})
          // axios.get('http://127.0.0.1:8090/routes2', {body: getBody})
                  .then(response => {
                    var to = response.data.routes[0];
                    to.color = vm.generateColor(j);
                    vm.foo(vm, response, newPointsInRoute);
                    vm.routes.interestingRoute.travelObjects.push(to);

                    vm.routes.interestingRoute.travelTime += this.calculateTravelTime(response.data.routes[0]);

                    vm.$eventHub.$emit('newRequest');
                    vm.$eventHub.$emit('updateRoutes',vm.routes );
                    j++;
                  })
                  .catch(e => {
                    console.log("Error in request: " + e);
                  });
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
