
<template>
    <div>
        <h1>Nous trouver</h1>
        <div id="map" style="height:90vh;"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';

const initialMap = ref(null);

const addressPoints = [
    { latitude: 43.60455, longitude: 1.453815 }
];

onMounted(()=> {
    initialMap.value = L.map('map').setView([43.60455, 1.453815], 14);

    // Création d'un groupe de calques pour les marqueurs
    const markers = L.layerGroup().addTo(initialMap.value);
    
    addressPoints.forEach((element, index) => {
        const each_marker = new L.marker([element.latitude, element.longitude])
        .bindPopup(`<strong> Nom Resto </strong> <br> 2 rue de la colombette`);
        markers.addLayer(each_marker);
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, 
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

    }).addTo(initialMap.value);
});
</script>