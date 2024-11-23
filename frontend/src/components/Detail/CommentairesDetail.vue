<template>
  <Carousel :items-to-show="2" :snapAlign="start" :autoplay="4000" :pauseAutoplayOnHover="true"
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
      <Pagination />
    </template>
  </Carousel>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import Button from 'primevue/button';
import Rating from 'primevue/rating';
import 'vue3-carousel/dist/carousel.css';

// Définition des props
const props = defineProps({
  reviews: {
    type: Array,
    default: () => [],
  },
});

const breakpoints = ref({
  // 1024 and up
  1024: {
    itemsToShow: 4,
    snapAlign: 'start',
  },
});

// Variable pour contrôler la visibilité des navigators
const showNavigators = ref(false);

// Lors du montage, ajuster la visibilité des navigators selon la taille de l'écran
onMounted(() => {
  const checkWindowSize = () => {
    showNavigators.value = window.innerWidth >= 1024; // 'lg' corresponds to 1024px in Tailwind
  };

  // Vérifie la taille actuelle de la fenêtre
  checkWindowSize();

  // Écoute les changements de redimensionnement de la fenêtre
  window.addEventListener('resize', checkWindowSize);

  // Nettoyage lors de la destruction du composant
  return () => {
    window.removeEventListener('resize', checkWindowSize);
  };
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
