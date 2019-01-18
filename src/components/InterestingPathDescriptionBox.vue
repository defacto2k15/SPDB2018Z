<template>
   <div class="pathDescription" v-if="routes.interestingRoute">
       <div class="wholePathDescription">
           <div><h3>Trasa ciekawa</h3></div>
           <div>Czas podróży:{{travelTime | timeInHours}} <span class="timeDelta">+{{deltaTime | timeInHours}}</span></div>
           <div>Czas wyjazdu:{{startTime | formatDate }}</div>
           <div>Czas przyjazdu:{{endTime | formatDate}}</div>
       </div>

       <div v-for="(travelObject, i) in travelObjects" :key="travelObject.location"
                    class="pathSegment" v-bind:style="{ borderColor:  travelObject.color}">
           <div >
               <b>{{i+1}}:</b> Trasa do
                    <b v-if="routes.interestingPointsInRoute[i]"  >{{routes.interestingPointsInRoute[i].place.name}}</b>
                    <b v-else>końca</b>
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
                if(routes.interestingRoute){
                    vm.travelObjects = routes.interestingRoute.travelObjects;
                }
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
.pathDescription{
    margin-top:40px;
    border-left-style: dotted;
    border-right-style: dotted;
    border-bottom-style: solid;
    border-top-style: solid;
    border-top-width: 10px;
}
.wholePathDescription{
    text-align: left;
    padding-left: 30%;
}
    .pathSegment{
        border-top-style: solid !important;
    border-radius: 50px;
    border-top-width: 5px;
    padding-top: 20px;
    border-color: rgb(255, 0, 255);
    margin-top: 20px;
    }

    .timeDelta{
        color:darkred;
        font-weight: bolder;
    }

</style>
