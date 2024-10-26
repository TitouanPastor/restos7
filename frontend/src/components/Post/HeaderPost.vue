<template>
    <div class="w-full bg">
        <header class="flex items-center justify-between max-w-7xl">
            <h1 class="text-xl font-bold">{{ name }}</h1>
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
});
</script>

<style lang="css"></style>