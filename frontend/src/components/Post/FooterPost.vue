<template lang="">
    <div class="w-full">
        <div class="flex items-center justify-between max-w-7xl">
            <p class="text-base">
                {{description}}
            </p>
        </div>
    </div>
</template>
<script>
import Button from 'primevue/button';
export default {
    components: {
        Button,
    },
    data() {
        return {
            description: "Le sable d'or est un des tacos les plus connu de l'N7. Spécial ref a Théo Baratéon client fidèle" //Description à récupérer dans la BDD
        };
    }
};
</script>
<style lang="">

</style>