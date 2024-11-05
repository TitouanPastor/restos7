<!--<template>
    <div v-for="(comment, user) in avis[0]" :key="user" class="flex justify-center">
        <CommentaireDetail :name="user" :avis="comment" />
    </div>
</template>-->
<template>
    <Carousel v-bind="config">
        <Slide v-for="(comment, user) in avis[0]" :key="user">
            <div class="flex justify-center">
                <CommentaireDetail :name="user" :avis="comment" />
            </div>
        </Slide>
    </Carousel>
</template>

<script setup>
import { Carousel,Slide } from 'vue3-carousel'
import CommentaireDetail from './CommentaireDetail.vue';
import { ref } from 'vue';
import { defineProps, onMounted } from 'vue';

const avis = [{TheoB:"Bien", LilianB:"Vraiement Top", LudoA:"Genial"}];

const config = {
  itemsToShow: 1.80,
  wrapAround: true,
  transition: 500,
};

const props = defineProps({
    name: String,
    adresse : String
});

    onMounted(() => {
        console.log('Post component mounted with restaurant:', props.name);
    });

const breakpoints = ref({
    // 700px and up
    700: {
        itemsToShow: avis.length > 1 ? 1.15 : 1,
        snapAlign: 'start',
    },
    // 1024 and up
    1024: {
        itemsToShow: avis.length > 1 ? 1.25 : 1,
        snapAlign: 'start',
    },
});
</script>

<style>
.carousel__slide {
  padding: 5;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1);
}
</style>
