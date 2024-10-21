<template>
    <div class="flex justify-center">
        <!-- Carousel -->
        <Carousel
            :numVisible="3"
            :numScroll="3"
            :showNavigators="showNavigators"
            :responsiveOptions="responsiveOptions"
            :value="images"
            circular
            :autoplayInterval="3000"
        >
            <!-- Template pour les images -->
            <template #item="slotProps">
                <div>
                    <div>
                        <div>
                            <!-- Image avec bords arrondis -->
                            <Image
                                :src="slotProps.data.image"
                                :alt="slotProps.data.name"
                                class="rounded-lg overflow-hidden"
                                preview
                            />
                        </div>
                    </div>
                </div>
            </template>
        </Carousel>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Carousel from 'primevue/carousel';
import Image from 'primevue/image';

// Données réactives pour les images et les options réactives du carousel
const images = ref([
    { image: "/sablesOr_1.jpg", name: "sablesOr_1" },
    { image: "/sablesOr_2.jpg", name: "sablesOr_2" },
    { image: "/sablesOr_3.jpg", name: "sablesOr_3" },
]);

const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);

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

<style lang="css">
/* Styles personnalisés si nécessaire */
</style>
