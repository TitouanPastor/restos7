<template>
    <main class="">
        <l-map ref="map" v-model:zoom="zoom" v-model:center="center" :useGlobalLeaflet="false">
            <l-tile-layer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                      layer-type="base"
                      name="Stadia Maps Basemap"></l-tile-layer>
      
            <l-marker v-for="arcade in arcades.features" :lat-lng="arcade.geometry.coordinates.reverse()"></l-marker>
        </l-map>
    </main>
</template>

<script setup>
    import { ref } from "vue";
    import "leaflet/dist/leaflet.css";
    import { LMap, LTileLayer, LMarker} from "@vue-leaflet/vue-leaflet";

    import arcades from "./arcades.json"
    let zoom = ref(6)
    let center = ref([38, 139.69])
</script>
  
<style>
    html, body {
        margin: 0;
        padding: 0;
    }

    main {
        height: 50vh;
        width: 50vw;
    }

    /*
    .map-container {

        margin: 20px;
        width: 600px;
        height: 400px;
    }*/
    
</style>