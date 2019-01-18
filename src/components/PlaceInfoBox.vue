<template>
<div>
    <div v-if="place">
        <div>
            <b>{{place.place.name}}</b>
        </div>
        <div>
            Ocena: {{place.place.rating}}
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
            }
        },
    }
</script>

<style scoped>

</style>
