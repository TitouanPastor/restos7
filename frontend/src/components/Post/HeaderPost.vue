<template>
    <div class="w-full bg">
        <header class="flex items-center justify-between max-w-7xl">
            <h1 class="text-xl font-bold">{{nom}}</h1>
            <Rating v-model="note" readonly />
        </header>
    </div>
</template>
<script>
import Rating from 'primevue/rating';
export default {
    components: {
        Rating,
    },
    data() {
        return {
            nom: "Les sables d'OR", //Nom à récupérer dans la BDD
            note: 3  // Note à récupérer dans la BDD
        };
    }
};
</script>
<style lang="css">
    
</style>