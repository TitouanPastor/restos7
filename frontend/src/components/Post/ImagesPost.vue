<template>
    <div class="flex justify-center my-8">
        <Carousel :numVisible="1" :numScroll="1" :responsiveOptions="responsiveOptions" :value="images">
            <template #item>
                <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
                    <div class="mb-4">
                        <div class="relative mx-auto">
                            <img src="./test.png" alt="item.name" class="w-full rounded" />
                        </div>
                    </div>
                </div>
            </template>
        </Carousel>
    </div>
</template>

<script>
import { ref } from "vue";
import Carousel from 'primevue/carousel';

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


console.log(images.value);

export default {
    components:{
        Carousel,
    },
    data(){
        return {
            images: [],
            responsiveOptions: []
        };
    }  
};

</script>

<style lang="css">
/* Styles personnalisés si nécessaire */
</style>