<template>
    <div>
    <select v-model="travelMode">
      <option disabled value=null>Travel mode</option>
      <option value="DRIVING">Driving</option>
      <option value="WALKING">Walking</option>
      <option value="BICYCLING">Bicycling</option>
      <option value="TRANSIT">Transit</option>
    </select>
  <select v-model="interestKeyword">
    <option disabled value=null>What you are looking for</option>
    <option> Museum</option>
    <option> Restaurant</option>
    <option> Shop</option>
  </select>
  <button v-on:click="query">Query</button>
    </div>
</template>

<script>
export default {
  name: 'QueryControls',
  data () {
    return {
      travelMode: null,
      interestKeyword: null
    }
  },

  methods: {
    query: function () {
      alert('Jeszcze nie zaimplementowane')
    }
  }
}
</script>

<style scoped>

</style>
