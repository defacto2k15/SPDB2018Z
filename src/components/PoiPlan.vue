<template>
    <div>
        <div v-for="poi in pointsOfInterest" >
            <div v-if="poi.isInPlan">
                <div>{{poi.place.name}}</div>
                <div>
                    Czas spędzony: <vue-slider-component v-model="poi.timeSpent"
                                                         :min=0.5 :max=6 :interval=0.5 formatter="{value} godzin"></vue-slider-component>
                </div>
                <div v-html="poi.place.adr_address"></div>
                <div>Ocena: {{poi.place.rating}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import VueSliderComponent from "vue-slider-component/src/vue2-slider"
    export default {
        name: "PoiPlan",
        components: {VueSliderComponent},
        props: ["pointsOfInterest"],
        data (){
            return{
                pois: []
            }
        },
            mounted() {
                this.$eventHub.$on('addPlaceToPlan', place=> {
                    this.$pois = this.pois;
                    this.pois.push({place:place, timeSpent:1});
                });
                var vm = this;
                this.$eventHub.$on('removePlaceFromPlan', place=> {
                    var i = 0;
                    vm.pois.forEach(c => {
                        if(c.place.id === place.id){
                            return;
                        }
                        i++;
                    });

                    this.pois.splice(i, 1);
                    this.$pois = this.pois;
                });
            },
    }
</script>

<style scoped>

</style>
