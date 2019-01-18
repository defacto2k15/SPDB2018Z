<template>
    <div>
        <div v-for="poi in routes.interestingPointsInRoute" >
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
        <div v-for="poi in routes.interestingPointsNearRoute" >
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
        props: ["routes"],
        data: function(){
            return {
                pois: []
            }
        },
        mounted() {
        },
    }
</script>

<style scoped>

</style>
