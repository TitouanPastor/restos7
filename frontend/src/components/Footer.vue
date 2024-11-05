<template>
    <div class="w-full py-4 fixed bottom-0 z-10">
        <footer class="flex items-center justify-center space-x-6 max-w-7xl m-auto">
            <Button v-if="!isDesktop && !showMap" label="Map" icon="pi pi-map" class="text-sm" severity="contrast" rounded
                @click="toggleView('map')" />
            <Button v-if="!isDesktop && showMap" label="List" icon="pi pi-list" class="text-sm" severity="contrast" rounded
                @click="toggleView('list')" />
            <Button v-if="isDesktop" :label="showMap ? 'Hide Map' : 'Show Map'" icon="pi pi-map" class="text-sm" severity="contrast" rounded
                @click="toggleView('map')" />
        </footer>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import { defineEmits, defineProps } from 'vue';

// Utilisez `emit` pour envoyer l'événement de basculement à la page parente
const emit = defineEmits(['toggleView']);

// Props pour déterminer si la vue est en mode bureau
const { isDesktop,showMap } = defineProps(['isDesktop', 'showMap']);

// Fonction pour envoyer l'événement en fonction de la vue sélectionnée
function toggleView(view) {
    emit('toggleView', view);
}
</script>

<style scoped></style>