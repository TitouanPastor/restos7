<template>
  <div class="container bg-white mx-auto px-4 pt-4">
    <div class="flex w-full flex-col md:flex-row md:gap-8 min-h-screen">
      <!-- Colonne gauche -->
      <div class="md:w-7/12">
        <!-- Images -->
        <Images v-if="restaurant" :images="restaurant.photos" :custom-breakpoints="customImageBreakpoints" />

        <!-- En-tête -->
        <Header v-if="restaurant" :name="restaurant.name" :note="restaurant.score" />

        <!-- Description -->
        <FooterPost v-if="restaurant" :description="restaurant.description" />

        <!-- Avis -->
        <hr class="my-4">
        <div>
          <h2 class="text-xl font-bold mb-2">Customer Reviews</h2>
          <CommentairesDetail v-if="restaurant" :reviews="restaurant.reviews" />
        </div>
      </div>

      <!-- Colonne droite -->
      <div class="md:w-5/12 pt-4 md:pt-0">
        <!-- Localisation -->
        <hr class="mb-4 md:hidden md:pt-0 md:mt-0">
        <div>
          <h2 class="text-xl font-bold mb-2">Restaurant Address</h2>
          <LocalisationDetail v-if="restaurant" :restaurant="restaurant" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CommentairesDetail from "@/components/Detail/CommentairesDetail.vue";
import LocalisationDetail from "@/components/Detail/LocalisationDetail.vue";
import FooterPost from "@/components/Post/FooterPost.vue";
import Images from "@/components/Post/ImagesPost.vue";
import Header from "@/components/Post/HeaderPost.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import api from '@/axios'; // Importe l'instance Axios configurée

const route = useRoute();
const idRestaurant = ref(route.params.id);
const restaurant = ref(null);

const fetchRestaurantInformation = async () => {
  try {
    const response = await api.get('/restaurants/' + idRestaurant.value);
    console.log('Restaurant :', response.data);
    restaurant.value = response.data.restaurant;
    console.log('nom resto :', restaurant.value.name);
  } catch (error) {
    console.error('Error fetching Restaurant: ', error);
  }
};

// Breakpoints par défaut
const customImageBreakpoints = ref({
    0: {
        itemsToShow: 2,
        snapAlign: "start",
    },
    1024: {
        itemsToShow: 4,
        snapAlign: "start",
    },
});

onMounted(() => {
  console.log("id : ", idRestaurant);
  fetchRestaurantInformation();
});
</script>

<style lang="css">
/* Ajoute des styles supplémentaires si besoin */
</style>
