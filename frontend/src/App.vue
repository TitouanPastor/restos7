<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <Navbar  />
  <RouterView class="flex flex-grow w-full my-0 mx-auto px-2 bg-gray-100 border-x" />
  <Footer />
</template>

<style scoped>
</style>
