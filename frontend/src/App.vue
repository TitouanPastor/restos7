<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
</script>

<template>
  <Navbar class="sticky top-0 z-10 bg-white" />
  <RouterView class="flex flex-grow w-full my-0 mx-auto px-2 bg-gray-100 border-x" />
</template>

<style scoped>
</style>
