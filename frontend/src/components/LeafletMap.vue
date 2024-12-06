<template>
    <div class="w-full h-full">
        <l-map :use-global-leaflet="false" ref="map" :zoom="zoom" :center="center">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                name="OpenStreetMap"></l-tile-layer>
            <!-- for each elements, get latitude and longitude to show as a marker -->
            <l-marker v-for="element in elements" :key="element.Id_Restaurant" :lat-lng="[element.latitude, element.longitude]">
                <l-popup>
                    <Post :restaurant="element"/>
                </l-popup>
            </l-marker>
        </l-map>
    </div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import Post from "./Post/Post.vue";
import { ref } from "vue";

// Définir les props avec des valeurs par défaut
const props = defineProps({
    center: {
        type: Array,
        default: () => [46.628237,  2.457814]
    },
    zoom: {
        type: Number,
        default: 6
    },
    elements: {
        type: Array,
        default: () => []
    }
});

// Réactiver les valeurs des props
const center = ref(props.center);
const zoom = ref(props.zoom);
</script>

<style scoped></style>