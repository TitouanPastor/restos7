<template>
    <div>
        <l-map :use-global-leaflet="false" ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                name="OpenStreetMap"></l-tile-layer>
        </l-map>
    </div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { ref } from 'vue';


// Data
const zoom = ref(5);
</script>

<style scoped></style>