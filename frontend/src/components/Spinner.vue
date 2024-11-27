<template>
    <div class="spinner-container">
      <ProgressSpinner
        style="width: 50px; height: 50px"
        strokeWidth="7"
        fill="transparent"
        animationDuration=".5s"
        aria-label="Custom ProgressSpinner"
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
    height: 100vh; /* Prend toute la hauteur de la vue */
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.8); /* Optionnel : un fond légèrement opaque */
    z-index: 1000; /* Assure qu'il soit au-dessus de tout */
  }
  </style>
  