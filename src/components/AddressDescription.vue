<template>
  <span v-if="location" class="addressDescription">
    <label><b>{{title}}</b></label>
    <label>  <i>{{address}}</i>  </label>
  </span>
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
  border-color: gray;
  padding: 3px;
  padding-left: 10px;
  padding-right: 10px;
  margin:15px
}
</style>
