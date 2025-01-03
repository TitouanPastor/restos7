<template>
  <div>
    <div class="container bg-white max-w-7xl mx-auto px-4 pt-4">
      <!-- Spinner pour le chargement -->
      <Spinner v-if="fetching" />

      <div v-else class="flex w-full flex-col md:flex-row md:gap-8">
        <!-- Colonne gauche -->
        <div class="md:w-7/12">
          <!-- Images -->
          <Images v-if="restaurant" :images="restaurant.photos" :custom-breakpoints="customImageBreakpoints"
            :autoplay="false" />

          <!-- En-tête -->
          <Header v-if="restaurant" :name="restaurant.name" :note="restaurant.score" />

          <!-- Description -->
          <FooterPost v-if="restaurant" :description="restaurant.description" />

          <!-- Avis -->
          <hr class="my-4">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold">Customer Reviews</h2>
            <!-- Bouton pour ajouter un avis -->
            <Button v-if="isLoggedIn" label="Add Review" icon="pi pi-pencil" class="p-button-rounded p-button-success"
              @click="toggleReviewPopup" />
          </div>
          <CommentairesDetail v-if="restaurant.reviews.length != 0" :reviews="restaurant.reviews" />
          <p v-else class="text-gray-500">No reviews yet. Be the first to add a review!</p>
        </div>

        <!-- Colonne droite -->
        <div class="md:w-5/12 pt-4 md:pt-0">
          <hr class="mb-4 md:hidden md:pt-0 md:mt-0">
          <div class="flex flex-col h-full">
            <h2 class="text-xl font-bold mb-4">Restaurant Address</h2>
            <div v-if="restaurant" class="bg-gray-100 p-4 rounded-lg shadow">
              <p class="flex items-center mb-2">
                <i class="pi pi-map-marker mr-2"></i>
                <strong>Address:</strong> <span class="ml-2">{{ restaurant.address }}</span>
              </p>
              <p class="flex items-center mb-2">
                <i class="pi pi-building mr-2"></i>
                <strong>City:</strong> <span class="ml-2">{{ restaurant.city }}</span>
              </p>
              <p class="flex items-center mb-2">
                <i class="pi pi-flag mr-2"></i>
                <strong>Country:</strong> <span class="ml-2">{{ restaurant.country.name }}</span>
              </p>
              <a :href="googleMapsLink" target="_blank" class="flex items-center mt-4 text-blue-600 hover:underline">
                <i class="pi pi-external-link mr-2"></i>
                View on Google Maps
              </a>
            </div>

            <!-- Composant Leaflet -->
            <div class="mt-4 mb-8 flex flex-grow h-96">
              <LeafletMap class="h-96" :zoom="14" :center="[restaurant.latitude, restaurant.longitude]"
                :elements="[restaurant]" />
            </div>
          </div>
        </div>
      </div>

      <hr>
      <!-- rubrique commentaires -->
      <div>
        <h2 class="text-xl font-bold mt-4">Comments</h2>
        here you'll be able to see the comments, ask questions, and interact with other users.
      </div>
    </div>

    <!-- Modale pour ajouter une review -->
    <Dialog v-model:visible="isReviewPoPupVisible" modal header="Add Your Review" :closable="true"
      class="w-full m-4 max-w-2xl" :breakpoints="{ '960px': '75vw', '640px': '90vw' }">
      <div>
        <div class="mb-4">
          <label for="comment" class="block font-medium mb-2">Comment</label>
          <Textarea id="comment" v-model="reviewData.comment" rows="3" class="w-full" autoResize
            placeholder="Write your review here..." />
        </div>
        <div class="mb-4">
          <label for="score" class="block font-medium mb-2">Rating</label>
          <Rating id="score" v-model="reviewData.score" />
        </div>
        <div class="flex justify-end space-x-2">
          <Button label="Cancel" @click="closeReviewPopup" severity="contrast" outlined text />
          <Button label="Submit" icon="pi pi-check" @click="submitReview" />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import CommentairesDetail from "@/components/Detail/CommentairesDetail.vue";
import LeafletMap from "@/components/LeafletMap.vue";
import FooterPost from "@/components/Post/FooterPost.vue";
import Images from "@/components/Post/ImagesPost.vue";
import Header from "@/components/Post/HeaderPost.vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Textarea from "primevue/textarea";
import Rating from "primevue/rating";
import Spinner from "@/components/Spinner.vue"; // Import du composant Spinner
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import api from "@/axios";
import { useStore } from 'vuex';

const store = useStore();
const isLoggedIn = computed(() => store.getters.isLoggedIn);
const route = useRoute();
const idRestaurant = ref(route.params.id);
const restaurant = ref(null);

const fetching = ref(true); // État pour afficher le spinner

const isReviewPoPupVisible = ref(false);

const reviewData = ref({
  comment: "",
  rating: 0
});

// Toggle modale
const toggleReviewPopup = () => {
  isReviewPoPupVisible.value = !isReviewPoPupVisible.value;
};

// Fermer la modale et réinitialiser les données
const closeReviewPopup = () => {
  isReviewPoPupVisible.value = false;
  reviewData.value = { comment: "", rating: 0, image: null };
};

// Soumettre la review
const submitReview = async () => {
  if (!reviewData.value.comment || reviewData.value.score === 0) {
    alert("Please provide both a comment and a rating.");
    return;
  }

  try {
    const response = await api.post(`/restaurants/${idRestaurant.value}/reviews`, reviewData.value);

    // Ajouter la nouvelle review localement après succès
    console.log("Review submitted successfully:", response.data);
    restaurant.value.reviews.push(response.data);
    console.log("restaurant.value.reviews", restaurant.value.reviews);
    closeReviewPopup();
  } catch (error) {
    console.error("Error submitting review:", error);
    alert(error.response.data.message || "An error occurred while submitting your review.");
  }
};

// Calculer le lien Google Maps
const googleMapsLink = computed(() => {
  if (!restaurant.value) return "#";
  const query = encodeURIComponent(`${restaurant.value.address}, ${restaurant.value.city}, ${restaurant.value.country.name}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
});

// Calculer les breakpoints dynamiquement
const customImageBreakpoints = computed(() => {
  const imagesLength = restaurant.value?.photos?.length || 0;

  return {
    0: {
      itemsToShow: Math.min(imagesLength, 2), // Afficher jusqu'à 2 images sur petits écrans
      wrapAround: imagesLength > 2, // Activer le wrapAround uniquement s'il y a plus de 2 images
      snapAlign: "start",
    },
    1024: {
      itemsToShow: Math.min(imagesLength, 4), // Afficher jusqu'à 4 images sur grands écrans
      wrapAround: imagesLength > 4, // Activer le wrapAround uniquement s'il y a plus de 4 images
      snapAlign: "start",
    },
  };
});

// Récupérer les informations du restaurant
const fetchRestaurantInformation = async () => {
  try {
    const response = await api.get("/restaurants/" + idRestaurant.value);
    restaurant.value = response.data.restaurant;
  } catch (error) {
    console.error("Error fetching Restaurant: ", error);
  } finally {
    fetching.value = false; // Désactiver le spinner une fois les données chargées
  }
};

onMounted(() => {
  fetchRestaurantInformation();
});
</script>
