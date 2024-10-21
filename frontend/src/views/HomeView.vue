<template>
  <div class="flex flex-grow w-full flex-col gap-14 pt-8 bg-gray-100 max-w-7xl mx-auto">
    <div v-for="index in n" :key="index">
      <Post />
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Post from "@/components/Post/Post.vue"
import Footer from '@/components/Footer.vue';
import { ref } from 'vue';


// Data
const n = ref(2)
</script>

<style lang="css"></style>