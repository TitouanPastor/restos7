<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-4">
    <!-- Ajout de px-4 pour les marges latérales sur les petits écrans -->
    <div class="w-full max-w-lg space-y-4 md:max-w-lg">
      <!-- max-w-full pour mobiles, max-w-lg pour écrans plus grands -->
      <Header v-if="restaurant" :name="restaurant.name" :note="3" />
      <Images v-if="restaurant" :images="restaurant.photos"/>
      <CommentairesDetail v-if="restaurant" :name="restaurant.name" />
      <LocalisationDetail v-if="restaurant" :adresse="restaurant.adresse" />
    </div>
  </div>
</template>

<script setup>
import CommentairesDetail from "@/components/Detail/CommentairesDetail.vue"
import LocalisationDetail from "@/components/Detail/LocalisationDetail.vue"
import Images from "@/components/Post/ImagesPost.vue";
import Header from "@/components/Post/HeaderPost.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import api from '@/axios'; // Importe l'instance Axios configurée

const route = useRoute()
const idRestaurant = ref(route.params.id)
const restaurant = ref(null);

const fetchRestaurantInformation = async () => {
  try {
      const response = await api.get('/restaurants/'+ idRestaurant.value)
      console.log('Restaurant :', response.data);
      restaurant.value = response.data;
      console.log('nom resto :', restaurant.value.name);
    } catch (error) {
      console.error('Error fetching Restaurant: ', error);
    }
};

onMounted (() => {
  console.log("id : ", idRestaurant);
  fetchRestaurantInformation();
})

</script>

<style lang="css"></style>