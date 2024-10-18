<template>
    <div class="border w-full bg">
        <header class="flex items-center justify-between p-2 max-w-7xl m-auto">
            <h1 class="text-2xl font-bold">{{nom}}</h1>
            <Rating v-model="note" :stars="5" readonly />
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