<template>
    <div class="flex justify-center">
        <Carousel :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions" :value="images" circular
            :autoplayInterval="3000">
            <template #item="slotProps">
                <div>
                    <div>
                        <div>
                            <Image :src="slotProps.data.image" :alt="slotProps.data.name"
                                class="rounded-lg overflow-hidden" preview />
                        </div>
                    </div>
                </div>
            </template>
        </Carousel>
    </div>
</template>

<script setup>
import { ref } from 'vue';
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

</script>

<style lang="css">
/* Styles personnalisés si nécessaire */
</style>
