<template>
  <div v-for="index in n" :key="index">
      <Post />
  </div>
  <Footer />
</template>

<script setup>
import Post from "@/components/Post/Post.vue"
import Footer from '@/components/Footer.vue';
import { ref } from 'vue';


// Data
const n = ref(5);
</script>

<style lang="css"></style>