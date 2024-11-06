<template>
  <main :class="{ 'h-full': !showMap || isDesktop }" class="flex max-w-7xl relative mx-auto gap-8">
    <div v-if="(!showMap && !isDesktop) || isDesktop"
      :class="{ 'w-full xl:grid-cols-3': (!showMap && !isDesktop) || isDesktop, 'w-6/12 h-full xl:grid-cols-2': isDesktop && showMap }"
      class="w-full grid pt-6 sm:grid-cols-2 gap-x-8 gap-y-10 ">
      <div v-for="restaurant in posts" :key="restaurant.Id_Restaurant" class="flex justify-center">
        <Post :restaurant="restaurant" />
      </div>
      <div v-if="posts.length === 0" class="flex justify-center">
        <p class="text-2xl text-gray-500">No restaurants found</p>
      </div>
    </div>
    <div v-if="showMap" class="flex flex-grow flex-col relative">
      <!-- <div class="sticky top-6" >sticky</div> -->
      <LeafletMap class="z-0 sticky top-14 flex-grow max-h-screen" :elements="posts" />
    </div>
  </main>
  <Footer @toggleView="toggleView" :isDesktop="isDesktop" :showMap="showMap" />
</template>

<script setup>
import Post from "@/components/Post/Post.vue";
import Footer from '@/components/Footer.vue';
import { ref, onMounted, computed, watch } from 'vue';
import LeafletMap from "@/components/LeafletMap.vue";
import api from '@/axios';
import { useRoute } from 'vue-router';

const posts = ref([]);
const showMap = ref(false);

// Détection du mode desktop pour afficher les deux vues
const isDesktop = computed(() => window.innerWidth >= 768);

// Basculer entre la vue carte et liste selon l'option choisie
function toggleView(view) {
  console.log('View:', view);
  if (view === 'map') {
    if (isDesktop.value) {
      showMap.value = !showMap.value;
    } else {
      showMap.value = true;
    }
  } else { // list
    showMap.value = false;
  }
}
const route = useRoute()
watch(
  () => route.params.query,
  async (query) => {
    try {
      if (query == null || query == '') {
        const response = await api.get('/restaurants/');
        posts.value = response.data;
        console.log('Restaurants loaded:', posts.value);
      } else {
        const response = await api.get('/restaurants/search/' + query);
        posts.value = response.data;
        console.log('Restaurants loaded:', posts.value);
      }
    } catch (error) {
      console.error("Failed to load restaurants:", error);
    }
  }
)

// Fetching data on mounted
onMounted(async () => {
  try {
    
    if (route.params.query == null || route.params.query == '') {
      const response = await api.get('/restaurants/');
      posts.value = response.data;
      console.log('Restaurants loaded:', posts.value);
    } else {
      const response = await api.get('/restaurants/search/' + route.params.query);
      posts.value = response.data;
      console.log('Restaurants loaded:', posts.value);
    }
  } catch (error) {
    console.error("Failed to load restaurants:", error);
  }
});
</script>

<style lang="css"></style>
