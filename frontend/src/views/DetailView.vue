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
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold">Customer Reviews</h2>
          <!-- Bouton pour ajouter un avis -->
          <Button label="Add Review" icon="pi pi-pencil" class="p-button-rounded p-button-success"
            @click="toggleReviewPopup" />
        </div>
        <CommentairesDetail v-if="restaurant" :reviews="restaurant.reviews" />
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

    <!-- Modale pour ajouter une review -->
    <Dialog v-model:visible="isReviewPoPupVisible" modal header="Add Your Review" :closable="true" class="w-full m-4"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }">
      <div>
        <div class="mb-4">
          <label for="comment" class="block font-medium mb-2">Comment</label>
          <Textarea id="comment" v-model="reviewData.comment" rows="3" class="w-full" autoResize placeholder="Write your review here..." />
        </div>
        <div class="mb-4">
          <label for="rating" class="block font-medium mb-2">Rating</label>
          <Rating id="rating" v-model="reviewData.rating" />
        </div>
        <div class="flex justify-end space-x-2">
          <Button label="Cancel" @click="closeReviewPopup" severity="contrast" outlined text/>
          <Button label="Submit" icon="pi pi-check" @click="submitReview" />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import CommentairesDetail from "@/components/Detail/CommentairesDetail.vue";
import LocalisationDetail from "@/components/Detail/LocalisationDetail.vue";
import FooterPost from "@/components/Post/FooterPost.vue";
import Images from "@/components/Post/ImagesPost.vue";
import Header from "@/components/Post/HeaderPost.vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Textarea from "primevue/textarea";
import Rating from "primevue/rating";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import api from "@/axios";

const route = useRoute();
const idRestaurant = ref(route.params.id);
const restaurant = ref(null);

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
  if (!reviewData.value.comment || reviewData.value.rating === 0) {
    alert("Please provide both a comment and a rating.");
    return;
  }

  try {
    console.log("Submitting review:", reviewData.value);
    const response = await api.post(`/restaurants/${idRestaurant.value}/reviews`, reviewData.value);

    // Ajouter la nouvelle review localement après succès
    restaurant.value.reviews.push(response.data.review);
    alert("Review submitted successfully!");
    closeReviewPopup();
  } catch (error) {
    console.error("Error submitting review:", error);
    alert("Failed to submit review. Please try again.");
  }
};

// Récupérer les informations du restaurant
const fetchRestaurantInformation = async () => {
  try {
    const response = await api.get("/restaurants/" + idRestaurant.value);
    restaurant.value = response.data.restaurant;
  } catch (error) {
    console.error("Error fetching Restaurant: ", error);
  }
};

// Breakpoints par défaut pour les images
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
  fetchRestaurantInformation();
});
</script>

<style scoped>
.field label {
  font-weight: bold;
}
</style>
