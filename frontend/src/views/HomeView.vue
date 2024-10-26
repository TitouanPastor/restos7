<template>
  <div class="grid pt-8 max-w-7xl mx-auto sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 pb-24">
    <div v-for="restaurant in posts" :key="restaurant.Id_Restaurant" class="flex justify-center">
      <Post :restaurant="restaurant" />
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Post from "@/components/Post/Post.vue";
import Footer from '@/components/Footer.vue';
import { ref, onMounted } from 'vue';
import api from '@/axios';

const posts = ref([]);

// Fetching data on mounted
onMounted(async () => {
  try {
    const response = await api.get('/restaurants/');
    posts.value = response.data;
    console.log('Restaurants loaded:', posts.value);
  } catch (error) {
    console.error("Failed to load restaurants:", error);
  }
});
</script>

<style lang="css"></style>
