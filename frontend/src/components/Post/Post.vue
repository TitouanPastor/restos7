<template>
    <div class="flex flex-col flex-grow">
      <div class="flex items-center justify-center">
        <div class="w-full max-w-md h-full px-6 sm:px-2 lg:px-0">
          <Images :images="restaurant.photos"/>
          <router-link :to="`/details/${restaurant.Id_Restaurant}`" title="see details">
            <div class="px-1">
              <Header :name="restaurant.name" :note="3" />
              <Footer :description="restaurant.description" />
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, onMounted } from 'vue';
  import Header from './HeaderPost.vue';
  import Footer from './FooterPost.vue';
  import Images from './ImagesPost.vue';
  
  const props = defineProps({
    restaurant: {
      type: Object,
      required: true,
    },
  });

    onMounted(() => {
        console.log('Post component mounted with restaurant:', props.restaurant);
    });
  </script>
  
  <style lang="css"></style>
  