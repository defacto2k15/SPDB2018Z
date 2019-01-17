<template>
   <div class="pathDescription" v-if="routes.interestingRoute">
       <div>
           <div><b>Trasa ciekawa</b></div>
           <div>Czas podróży:{{travelTime | timeInHours}}</div>
           <div>Czas wyjazdu:{{startTime | formatDate }}</div>
           <div>Czas przyjazdu:{{endTime | formatDate}}</div>
       </div>

       <div v-for="(travelObject, i) in routes.interestingRoute.travelObjects">
           <div>Odcinek <b>{{travelObject.summary}}</b></div>
           <div>Czas odcinka:{{travelObject.legs[0].duration.text}}</div>
           <div v-for="step in travelObject.legs[0].steps">
               <PathStepDescription :stepInfo="step"></PathStepDescription>
           </div>
           <div > {{i}}
               Dojechałeś do {{routes.interestingPointsInRoute[i].name}}
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
            }
        },
        mounted () {
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
        },

    }
</script>

<style scoped>
.pathDescription{
    border-style: dotted;
}

</style>
