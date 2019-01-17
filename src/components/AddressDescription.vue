<template>
  <div v-if="location" class="addressDescription">
    <label><b>{{title}}</b></label>
    <label>{{address}}  </label>
  </div>
</template>

<script>
export default {
  name: 'AddressDescription',
  props: ['title', 'map', 'location'],
  watch: {
    location: function (newVal) {
      if (newVal) {
        var vm = this
        var geocoder = new window.google.maps.Geocoder
        geocoder.geocode({ location: this.location }, function (results, status) {
          if (status === 'OK') {
            vm.address = results[0].formatted_address
          }
        })
      }
    }
  },
  data () {
    return {
      address: null
    }
  }
}
</script>

<style scoped>
.addressDescription{
  border-style: solid;
}
</style>
