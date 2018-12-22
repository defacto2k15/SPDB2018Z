<template>
  <div class="map">
    <div>
      <h2>Search and add a pin</h2>
      <label> Start point:
        <gmap-autocomplete @place_changed="setStartMarker" placeholder="Set start position">
        </gmap-autocomplete>
      </label>
      <label> End point:
        <gmap-autocomplete @place_changed="setEndMarker" aria-placeholder="Set end position">
        </gmap-autocomplete>
      </label>
      <br/>
      <PlaceDescription :map="mapObject" :placeid="startPlaceId" title="Start"></PlaceDescription>
      <PlaceDescription :map="mapObject" :placeid="endPlaceId" title="End"></PlaceDescription>
      <AddressDescription :map="mapObject" :location="startMarker.location" title="StartPosition" ></AddressDescription>
      <AddressDescription :map="mapObject" :location="endMarker.location" title="EndPosition" ></AddressDescription>
      <div id="terminalMarkerDescription">
        <div id="startMarkerDescription">

        </div>
        <div id="endMarkerDescription">

        </div>

      </div>

    </div>
    <br>
    <gmap-map id="VueGoogleMap" ref="mapRef"
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      ></gmap-marker>
      <gmap-marker
        :position="startMarker.location"
        :clickable="true"
        label="start"
        :draggable="true"
        @click="center=startMarker.location"
        @dragend="updateStartPosition"
      ></gmap-marker>
      <gmap-marker
        :position="endMarker.location"
        :clickable="true"
        label="end"
        :draggable="true"
        @click="center=endMarker.location"
        @dragend="updateEndPosition"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>

import PlaceDescription from './PlaceDescription'
import AddressDescription from './AddressDescription'

export default {
  name: 'GoogleMap',
  components: { AddressDescription, PlaceDescription },
  data () {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null,
      startMarker: {
        location: null,
        description: null
      },
      endMarker: {
        location: null,
        description: null
      },
      mapObject: null,
      startPlaceId: null,
      endPlaceId: null,
    }
  },

  mounted () {
    this.$refs.mapRef.$mapPromise.then((map) => {
      this.mapObject = map
    })
    this.geolocate()
  },

  methods: {
    empty: function () {},
    // receives a place object via the autocomplete component
    setPlace (place) {
      this.currentPlace = place
    },
    addMarker () {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    },
    setStartMarker: function (location) {
      this.startPlaceId = location.place_id
      this.startMarker.location = {
        lat: location.geometry.location.lat(),
        lng: location.geometry.location.lng()
      }
      this.center = this.startMarker.location
    },
    setEndMarker: function (location) {
      this.endPlaceId = location.place_id
      this.endMarker.location = {
        lat: location.geometry.location.lat(),
        lng: location.geometry.location.lng()
      }
      this.center = this.endMarker.location
    },
    updateStartPosition: function (location) {
      this.startMarker.location = { lat: location.latLng.lat(), lng: location.latLng.lng() }
      this.startPlaceId = null
    },
    updateEndPosition: function (location) {
      this.endMarker.location = { lat: location.latLng.lat(), lng: location.latLng.lng() }
      this.endPlaceId = null
    },
    onResults (results) {
      alert(results)
      if (results) {
        this.placeLocation = results.geometry.location
      }
    }
  }
}
</script>
