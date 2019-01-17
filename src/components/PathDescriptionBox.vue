<template>
   <div class="pathDescription" v-if="routes.fastestRoute">
       <div>
           <div><b>{{routeName}}</b></div>
           <div>Czas podróży:{{travelTime | timeInHours}}</div>
           <div>Czas wyjazdu:{{startTime | formatDate }}</div>
           <div>Czas przyjazdu:{{endTime | formatDate}}</div>
       </div>
       <div v-for="step in routes.fastestRoute.travelObjects[0].legs[0].steps">
           <PathStepDescription :stepInfo="step"></PathStepDescription>
       </div>
  </div>
</template>

<script>
    import PathStepDescription from "./PathStepDescription";
    export default {
        name: "PathDescriptionBox",
        components: {PathStepDescription},
        props: ["routes", "routeName"],

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
                return this.routes.fastestRoute.travelTime;
            },
            endTime: function(){
                return new Date(this.startTime.getTime() + this.travelTime*1000);
            },
        }

    }
</script>

<style scoped>
.pathDescription{
    border-style: dotted;
}

</style>
