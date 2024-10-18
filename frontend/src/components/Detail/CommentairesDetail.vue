<template>
    <div class="flex justify-center my-8">
        <Carousel :numVisible="1" :numScroll="1" :responsiveOptions="responsiveOptions" :value="images">
            <template #item>
                <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
                    <div class="mb-4">
                        <div class="relative mx-auto">
                            <CommentaireDetail />
                        </div>
                    </div>
                </div>
            </template>
        </Carousel>
    </div>
</template>

<script>
import Carousel from 'primevue/carousel';
import CommentaireDetail from './CommentaireDetail.vue';
import { ref } from 'vue';

export default {
    components: {
        Carousel,
        CommentaireDetail
    },
    setup() {
        // Simule un tableau d'images (même si vous n'avez pas besoin de les utiliser dans ce cas)
        const images = ref([{}, {}, {}]);

        // Options responsives pour le Carousel
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

        return {
            images,
            responsiveOptions
        };
    }
}
</script>

<style lang="">
/* Votre style ici */
</style>