<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

// Accéder au store Vuex
const store = useStore();

// Vérifier la validité du token lorsque le composant est monté
onMounted(() => {
  store.dispatch('checkTokenValidity');
});
</script>

<template>
  <Navbar class="sticky top-0 z-10 bg-white" />
  <RouterView class="flex flex-grow w-full my-0 mx-auto px-2 bg-gray-100 border-x" />
</template>

<style scoped></style>
