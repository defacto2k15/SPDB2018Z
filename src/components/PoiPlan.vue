<template>
    <div class="poiPlanBox">
        <div v-for="poi in routes.interestingPointsInRoute" >
            <div v-if="poi.isInPlan">
                <h2>{{poi.place.name}}</h2>
                <div>
                    Czas spędzony: <vue-slider-component class="slider" v-model="poi.timeSpent"
                                                         :min=0.5 :max=6 :interval=0.5 formatter="{value} godzin"></vue-slider-component>
                </div>
                <div v-html="poi.place.adr_address"></div>
                <div>Ocena: {{poi.place.rating}}
                    <span v-for="i in [1,2,3,4,5]" >
                         <font-awesome-icon v-if="shouldShowStar(i, poi.place.rating)" icon="star" spin></font-awesome-icon>
                         <font-awesome-icon v-else-if="shouldShowHalfStar(i,poi.place.rating)" icon="star-half" spin></font-awesome-icon>
                    </span>
                </div>
            </div>
        </div>
        <div v-for="poi in routes.interestingPointsNearRoute" >
            <div v-if="poi.isInPlan">
                <div>{{poi.place.name}}</div>
                <div>
                    Czas spędzony: <vue-slider-component class="slider" v-model="poi.timeSpent"
                                                         :min=0.5 :max=6 :interval=0.5 formatter="{value} godzin"></vue-slider-component>
                </div>
                <div v-html="poi.place.adr_address"></div>
                <div>Ocena: {{poi.place.rating}}
                    <span v-for="i in [1,2,3,4,5]" >
                         <font-awesome-icon v-if="shouldShowStar(i, poi.place.rating)" icon="star" spin></font-awesome-icon>
                         <font-awesome-icon v-else-if="shouldShowHalfStar(i,poi.place.rating)" icon="star-half" spin></font-awesome-icon>
                    </span>
                </div>
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
            var vm = this;
            this.$eventHub.$on('poiChange', c => {
                vm.$forceUpdate();
            })
        },
        methods:{
            shouldShowStar: function(i, rating){
                return parseFloat(rating) >= (i)
            },
            shouldShowHalfStar: function(i, rating){
                return parseFloat(rating) >= (i-0.5)
            }
        }
    }
</script>

<style scoped>
.poiPlanBox{
    padding-bottom: 10px;
}
    .slider{
        padding-left: 40px !important;
        padding-right: 40px !important;
    }
</style>
