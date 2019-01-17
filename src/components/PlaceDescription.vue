<template>
    <div v-if="placeDetails" class="placeDescription">
      <label><b>{{title}}</b></label>
      <label>{{placeDetails.name}}  </label>
      <label>{{placeDetails.formatted_address}}</label>
    </div>
</template>

<script>
export default {
  name: 'PlaceDescription',
  props: ['title', 'map', 'placeid'],
  watch: {
    placeid: function (newVal, oldVal) {
      var vm = this
      if (newVal == null) {
        this.placeDetails = null
      } else if (newVal) {
        var service = new window.google.maps.places.PlacesService(this.map)
        service.getDetails({
          placeId: this.placeid
        }, function (place, status) {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            vm.placeDetails = place
          }
        })
      }
    }
  },
  data () {
    return {
      placeDetails: null
    }
  },

  mounted: function () {
  }
}
</script>

<style scoped>
.placeDescription {
  border-style: dotted;
}
</style>
