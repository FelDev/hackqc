<template>
  <div>
    <div>
      <h2>Search and add a pin</h2>
      <label>
        <gmap-autocomplete @place_changed="setPlace"></gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
      <br>
    </div>
    <br>
    <gmap-map ref="mapRef" :center="center" :zoom="12" style="width:100%;  height: 400px;">
      <gmap-cluster>
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          @click="selectMarker(m)"
        ></gmap-marker>
      </gmap-cluster>
    </gmap-map>
  </div>
</template>


<script src="vue-google-maps.js"></script>

<script>
import { isEmpty } from "lodash";
import GmapCluster from "vue2-google-maps/dist/components/cluster";
import { gmapApi } from "vue2-google-maps";

export default {
  name: "GoogleMap",
  components: {
    GmapCluster
  },
  computed: {
    google: gmapApi
  },
  props: {
    donnee: {
      type: Array,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },

  mounted() {
    this.geolocate();
    //this.$watch("google", watev => console.log(watev));
    this.$watch(
      () => {
        if (!this.google) return [];
        return this.donnee;
      },
      data => {
        if (isEmpty(data)) return;

        let bounds = new this.google.maps.LatLngBounds();

        this.markers = data.map(singleData => {
          bounds.extend(
            new this.google.maps.LatLng(singleData.lat, singleData.lng)
          );
          return {
            position: {
              lat: singleData.lat,
              lng: singleData.lng
            }
          };
        });

        this.$refs.mapRef.$mapPromise.then(map => {
          map.fitBounds(bounds);
        });
      },
      { immediate: true }
    );
  },

  methods: {
    selectMarker(marker) {
      console.log(marker);
    },
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>
