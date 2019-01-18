<template>
<div class="infoBox">
    <div v-if="place">
        <div>
            <b>{{place.place.name}}</b>
        </div>
        <div>
            Ocena:

            <span v-for="i in [1,2,3,4,5]" >
                    <font-awesome-icon v-if="shouldShowStar(i, place.place.rating)" icon="star"></font-awesome-icon>
                    <font-awesome-icon v-else-if="shouldShowHalfStar(i, place.place.rating)" icon="star-half"></font-awesome-icon>
            </span>


            {{place.place.rating}}
        </div>
        <div>
            {{place.place.vicinity}}
        </div>
        <button v-on:click="addToPlan(place)" >  <label v-if="!place.isInPlan">Odwiedź</label> <label v-if="place.isInPlan">Anuluj</label> </button>
    </div>
</div>
</template>

<script>
    export default {
        name: "PlaceInfoBox",
        props: ["place"],
        data (){
            return {
            }
        },
        methods: {
            addToPlan: function (place) {
                place.isInPlan = !place.isInPlan;
                this.$eventHub.$emit('poiChange');
            },
            shouldShowStar: function(i, rating){
                return parseFloat(rating) >= (i)
            },
            shouldShowHalfStar: function(i, rating){
                return parseFloat(rating) >= (i-0.5)
            }
        },
    }
</script>

<style scoped>
    .infoBox{

    }

</style>
