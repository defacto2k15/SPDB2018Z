<template>
   <div class="pathDescription" v-if="routes.interestingRoute">
       <div>
           <div><b>Trasa ciekawa</b></div>
           <div>Czas podróży:{{travelTime | timeInHours}} <span class="timeDelta">+{{deltaTime | timeInHours}}</span></div>
           <div>Czas wyjazdu:{{startTime | formatDate }}</div>
           <div>Czas przyjazdu:{{endTime | formatDate}}</div>
       </div>

       <div v-for="(travelObject, i) in travelObjects" :key="travelObject.location">
           <div v-if="routes.interestingPointsInRoute[i]">
               <b>{{i+1}}:</b> Trasa do <b>{{routes.interestingPointsInRoute[i].place.name}}</b>
           </div>
           <div>Odcinek <b>{{travelObject.summary}}</b></div>
           <div>Czas odcinka:{{travelObject.legs[0].duration.text}}</div>
           <div v-for="step in travelObject.legs[0].steps" :key="step.end_address">
               <PathStepDescription :stepInfo="step"></PathStepDescription>
           </div>
       </div>
  </div>
</template>

<script>
    import PathStepDescription from "./PathStepDescription";
    export default {
        name: "InterestingPathDescriptionBox",
        components: {PathStepDescription},
        props: ["routes" ],

        data () {
            return {
                steps: [],
                travelObjects: []
            }
        },
        mounted () {
            var vm = this;
            vm.$eventHub.$on('updateRoutes',routes => {
                vm.travelObjects = routes.interestingRoute.travelObjects;
            } );
        },
        computed:{
            startTime: function () {
                return new Date();
            },
            travelTime: function(){
                return this.routes.interestingRoute.travelTime;
            },
            endTime: function(){
                return new Date(this.startTime.getTime() + this.travelTime*1000);
            },
            deltaTime: function(){
                return this.travelTime - this.routes.fastestRoute.travelTime;
            }
        },

    }
</script>

<style scoped>
.pathDescription{
    border-style: dotted;
}

</style>
