<template>
    <div class="w-full">
      <div class="flex items-center justify-between max-w-7xl">
        <p class="text-base">{{ description }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    description: String,
  });
  </script>
  
  <style lang="css"></style>
  