<template>
  <main :class="{ 'h-full': !showMap || isDesktop }" class="w-full flex flex-grow max-w-7xl relative mx-auto gap-8">
    <Spinner v-if="fetching" />
    <div v-show="(!showMap && !isDesktop) || isDesktop"
      :class="{ 'w-full xl:grid-cols-3': (!showMap && !isDesktop) || (isDesktop && !showMap), 'w-1/2 h-full xl:grid-cols-2': (isDesktop && showMap) }"
      class="grid pt-6 sm:grid-cols-2 gap-x-8 gap-y-10 ">
      <div v-for="restaurant in posts.restaurants" :key="restaurant.Id_Restaurant" class="flex justify-center">
        <Post :restaurant="restaurant" />
      </div>
      <div v-if="posts.length === 0 && !fetching" class="flex justify-center">
        <p class="text-2xl text-gray-500">No restaurants found</p>
      </div>
    </div>
    <div v-if="showMap" class="flex flex-grow flex-col relative bg-slate-200">
      <LeafletMap class="z-0 sticky top-14 flex-grow max-h-screen" :elements="posts.restaurants"
        :center="[posts.centerCoordinates.latitude, posts.centerCoordinates.longitude]" />
    </div>
  </main>
  <Footer @toggleView="toggleView" :isDesktop="isDesktop" :showMap="showMap" />
</template>

<script setup>
import Post from "@/components/Post/Post.vue";
import Spinner from "@/components/Spinner.vue";
import Footer from '@/components/Footer.vue';
import { ref, onMounted, computed, watch } from 'vue';
import LeafletMap from "@/components/LeafletMap.vue";
import api from '@/axios';
import { useRoute } from 'vue-router';

const posts = ref([]);
const fetching = ref(false);
const showMap = ref(false);

// Détection du mode desktop pour afficher les deux vues
const isDesktop = computed(() => window.innerWidth >= 768);

// Basculer entre la vue carte et liste selon l'option choisie
function toggleView(view) {
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
        fetching.value = true;
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
    } finally {
      fetching.value = false;
    }
  },
)

// Fetching data on mounted
onMounted(async () => {
  try {

    if (route.params.query == null || route.params.query == '') {
      fetching.value = true;
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
  } finally {
    fetching.value = false;
  }
});
</script>

<style lang="css"></style>
