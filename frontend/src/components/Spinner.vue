<template>
    <div class="spinner-container">
      <ProgressSpinner
        style="width: 50px; height: 50px"
        strokeWidth="6"
        fill="transparent"
        animationDuration="0.5s"
      />
    </div>
  </template>
  
  <script setup>
  import ProgressSpinner from "primevue/progressspinner";
  </script>
  
  <style scoped>
  .spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.8);
  }
  </style>
  