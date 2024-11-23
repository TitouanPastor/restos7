<!-- https://ismail9k.github.io/vue3-carousel/examples.html -->
<template>
    <Carousel :items-to-show="1" :wrap-around="true" :autoplay="2500" :pauseAutoplayOnHover="true"
        :breakpoints="breakpoints">
        <Slide v-for="image in images" :key="image.photo.Id_Photo" class="p-2">
            <div class="w-full h-56">
                <Image class="w-full h-full" imageClass="w-full h-full object-cover rounded-lg overflow-hidden"
                    :src="'http://localhost:3001' + image.photo.url" :alt="image.photo.alt" preview />
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
import { ref, onMounted, defineProps, computed } from 'vue';
import Image from 'primevue/image';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import Button from 'primevue/button';

const props = defineProps({
    images: {
        type: Array,
        default: () => [],
    },
    customBreakpoints: {
        type: Object,
        default: null,
    },
});

// Breakpoints par défaut
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

// Calcul des breakpoints à utiliser
const breakpoints = computed(() => props.customBreakpoints || defaultBreakpoints.value);

const images = ref(props.images);

const config = {
    autoplay: 2000,
    wrapAround: true,
    pauseAutoplayOnHover: true,
};

// Variable pour contrôler la visibilité des navigators
const showNavigators = ref(false);

// Lors du montage, ajuster la visibilité des navigators selon la taille de l'écran
onMounted(() => {
    // Si la fenêtre a une largeur supérieure ou égale à 1024px (taille 'lg' de Tailwind)
    const checkWindowSize = () => {
        showNavigators.value = window.innerWidth >= 1024; // 'lg' corresponds to 1024px in Tailwind
    };

    // Vérifie la taille actuelle de la fenêtre
    checkWindowSize();

    // Écoute les changements de redimensionnement de la fenêtre pour ajuster
    window.addEventListener('resize', checkWindowSize);

    // Nettoyage lors de la destruction du composant
    return () => {
        window.removeEventListener('resize', checkWindowSize);
    };
});
</script>

<style lang="css"></style>