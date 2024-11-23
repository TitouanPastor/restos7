<template>
    <div class="w-full bg">
        <header class="flex items-center justify-between max-w-7xl">
            <div class="flex items-center gap-2">
                <h1 class="text-2xl font-bold">{{ name }}</h1>
            </div>
            <!-- Utilisation de :model-value et @update:model-value pour la note -->
            <Rating :model-value="note" readonly />
        </header>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Rating from 'primevue/rating';

const props = defineProps({
    name: String,
    note: Number,
    idRestaurant: Number,
});
</script>

<style lang="css"></style>