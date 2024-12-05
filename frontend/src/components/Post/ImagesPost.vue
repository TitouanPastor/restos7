<template>
  <Carousel
    :items-to-show="1"
    :wrap-around="true"
    :autoplay="computedAutoplay"
    :pauseAutoplayOnHover="computedPauseAutoplayOnHover"
    :breakpoints="breakpoints"
  >
    <Slide v-for="image in images" :key="image.photo.Id_Photo" class="p-2">
      <div class="w-full h-56">
        <Image
          class="w-full h-full"
          imageClass="w-full h-full object-cover rounded-lg overflow-hidden"
          :src="getImageUrl(image.photo.url)"
          :alt="image.photo.alt"
          preview
        />
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
import { ref, onMounted, defineProps, computed } from "vue";
import Image from "primevue/image";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import Button from "primevue/button";

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
  customBreakpoints: {
    type: Object,
    default: null,
  },
  autoplay: {
    type: Boolean,
    default: true, // Par défaut, autoplay est activé
  },
  autoplayDuration: {
    type: Number,
    default: 2500, // Durée par défaut de 2500ms
  },
  stopAutoplayOnHover: {
    type: Boolean,
    default: true, // Par défaut, pause autoplay au survol
  },
});

// Récupérer l'URL de base depuis l'environnement
const baseFileUrl = import.meta.env.VITE_BASE_FILE_URL; // Ici, on récupère l'URL depuis l'environnement

// Fonction pour obtenir l'URL complète de l'image
const getImageUrl = (url) => {
  return `${baseFileUrl}${url}`;
};

// Calculer les breakpoints à utiliser
const defaultBreakpoints = ref({
  700: {
    itemsToShow: props.images.length > 1 ? 1.15 : 1,
    snapAlign: "start",
  },
  1024: {
    itemsToShow: props.images.length > 1 ? 1.25 : 1,
    snapAlign: "start",
  },
});
const breakpoints = computed(() => props.customBreakpoints || defaultBreakpoints.value);

// Données réactives pour les images
const images = ref(props.images);

// Propriétés calculées pour les comportements facultatifs
const computedAutoplay = computed(() => (props.autoplay ? props.autoplayDuration : 0));
const computedPauseAutoplayOnHover = computed(() => props.stopAutoplayOnHover);

// Contrôle des navigateurs
const showNavigators = ref(false);

// Ajuster la visibilité des navigateurs en fonction de la taille de la fenêtre
onMounted(() => {
  const checkWindowSize = () => {
    showNavigators.value = window.innerWidth >= 1024; // 'lg' corresponds to 1024px in Tailwind
  };

  // Vérifie la taille actuelle de la fenêtre
  checkWindowSize();

  // Écoute les changements de redimensionnement de la fenêtre pour ajuster
  window.addEventListener("resize", checkWindowSize);

  // Nettoyage lors de la destruction du composant
  return () => {
    window.removeEventListener("resize", checkWindowSize);
  };
});
</script>

<style lang="css"></style>
