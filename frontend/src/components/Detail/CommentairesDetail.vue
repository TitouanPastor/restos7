<template>
  <Carousel :items-to-show="2" :wrap-around="false"
    :breakpoints="breakpoints">
    <Slide v-for="review in reviews" :key="review.Id_User" class="px-2 py-2">
      <div class="review-card p-4 w-full h-full bg-white shadow-md rounded-lg flex flex-col justify-between">
        <!-- Commentaire -->
        <div class="review-content">
          <p class="review-text text-gray-700 text-sm italic mb-2">
            "{{ review.comment }}"
          </p>
          <p class="review-author font-bold text-gray-900 text-base">
            {{ review.user.firstname }} {{ review.user.name }}
          </p>
        </div>
        <!-- Note -->
        <Rating :model-value="review.score" readonly />
      </div>
    </Slide>

    <template #addons>
      <navigation v-if="showNavigators">
        <template #next>
          <Button icon="pi pi-angle-right" severity="contrast" rounded class="w-full h-full" />
        </template>
        <template #prev>
          <Button icon="pi pi-angle-left" severity="contrast" rounded class="w-full h-full" />
        </template>
      </navigation>
      <Pagination v-if="showPagination" />
    </template>
  </Carousel>
</template>

<script setup>
import { ref, defineProps, computed, onUnmounted } from "vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import Button from "primevue/button";
import Rating from "primevue/rating";
import "vue3-carousel/dist/carousel.css";

// Props pour les données des reviews
const props = defineProps({
  reviews: {
    type: Array,
    default: () => [],
  },
});

// Breakpoints pour le carousel
const breakpoints = ref({
  1024: {
    itemsToShow: 4,
  },
  768: {
    itemsToShow: 3,
  },
  480: {
    itemsToShow: 2,
  },
});

// Calculer dynamiquement le nombre d'items affichés
const itemsToShow = computed(() => {
  const width = window.innerWidth;
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  if (width >= 480) return 2;
  return 1;
});

// Calculs dynamiques pour les navigateurs et la pagination
const showNavigators = computed(() => props.reviews.length > itemsToShow.value);
const showPagination = computed(() => props.reviews.length > itemsToShow.value);

// Mettre à jour les valeurs en fonction du redimensionnement de la fenêtre
const updateCarouselVisibility = () => {
  const width = window.innerWidth;
  // itemsToShow sera automatiquement recalculé grâce à `computed`
};

// Ajouter un écouteur d'événement pour surveiller les changements de taille de fenêtre
window.addEventListener("resize", updateCarouselVisibility);

// Nettoyage lors de la destruction du composant
onUnmounted(() => {
  window.removeEventListener("resize", updateCarouselVisibility);
});
</script>

<style scoped>
.review-card {
  transition: transform 0.3s ease-in-out;
}

.review-card:hover {
  transform: scale(1.05);
}

.pi-star-fill,
.pi-star,
.pi-star-half {
  font-size: 1.25rem;
  margin-right: 0.25rem;
}
</style>
