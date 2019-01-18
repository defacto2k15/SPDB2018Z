<template>
   <div class="queryControl form-group">
        <select v-model="travelMode" class="inputstl">
          <option disabled value=null>Sposób podróży</option>
          <option value="DRIVING">Autem</option>
          <option value="WALKING">Spacerem</option>
          <option value="BICYCLING">Rowerem</option>
          <option value="TRANSIT">Komunikacją miejską</option>
        </select>
      <select v-model="interestKeyword" class="inputstl"  >
        <option disabled value=null >Czego poszukujesz?</option>
        <option value="museum">Muzeum</option>
        <option value="restaurant">Restauracja</option>
        <option value="shop">Sklep</option>
      </select>
      <button v-on:click="query" class="inputstl"  :disabled="(travelMode==null || interestKeyword == null
        || startPositionLocation == null || endPositionLocation == null || requestIsProcessed) " >
          <span v-if="requestIsProcessed">   <font-awesome-icon icon="coffee" spin /> </span>
          <span v-else>Szukaj</span>
      </button>
       <span class="fa fa-star checked"></span>
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
      endPositionLocation: null,
        requestIsProcessed:false

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
    foo: function(vm, response, newPointsInRoute, callback){
        var i = 0;
        response.data.place_id.forEach(c => {
          if(newPointsInRoute.find( q => q.place.place_id === c)){
              i++;
            return;
          }

          var service = new window.google.maps.places.PlacesService(vm.global.map);
          service.getDetails({
            placeId: c
          }, function (place, status) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                i++;
              vm.routes.interestingPointsNearRoute.push(
                      {
                        location: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()},
                        place: place,
                        isInPlan: false,
                        timeSpent: 0.5
                      });
                callback();
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
        this.requestIsProcessed = true;
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
                    this.foo(vm, response, newPointsInRoute, () => {
                        vm.$eventHub.$emit('updateRoutes',vm.routes );
                    } );
                    vm.requestIsProcessed = false;
                }

                vm.$eventHub.$emit('newRequest');
              })
              .catch(e => {
                console.log("Error in request: "+e);
                vm.requestIsProcessed = false;
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
                      this.foo(vm, response, newPointsInRoute, () => {
                          vm.$eventHub.$emit('updateRoutes',vm.routes );
                      } );
                    vm.routes.interestingRoute.travelObjects.push(to);

                    vm.routes.interestingRoute.travelTime += this.calculateTravelTime(response.data.routes[0]);

                    vm.$eventHub.$emit('newRequest');
                    j++;
                    if(j >= positions.length-1){
                        vm.requestIsProcessed = false;
                    }
                  })
                  .catch(e => {
                    console.log("Error in request: " + e);
                      vm.requestIsProcessed = false;
                  });
        }
      }
    }
  }
}
</script>

<style scoped>
select, button{
    margin-left:20px;
    margin-right:20px;
    margin-top:10px
}
    button{
        width:100px
    }

    .inputstl {
    padding: 9px;
    border: solid 1px #0077B0;
    outline: 0;
    background: -webkit-gradient(linear, left top, left 25, from(#FFFFFF), color-stop(4%, #C6ECFF), to(#FFFFFF));
    background: -moz-linear-gradient(top, #FFFFFF, #C6ECFF 1px, #FFFFFF 25px);
    box-shadow: rgba(0,0,0, 0.1) 0px 0px 8px;
    -moz-box-shadow: rgba(0,0,0, 0.1) 0px 0px 8px;
    -webkit-box-shadow: rgba(0,0,0, 0.1) 0px 0px 8px;

    }
</style>
