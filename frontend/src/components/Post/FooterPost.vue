<template lang="">
    <div class="border w-full bg">
        <footer class="flex items-center justify-between p-2 max-w-7xl m-auto">
            <p class="pr-4">
                {{description}}
            </p>
            <router-link to="/detail">
                <Button class="">Voir plus</Button>
            </router-link>
        </footer>
    </div>
</template>
<script>
import Button from 'primevue/button';
export default {
    components:{
        Button,
    },
    data(){
        return {
            description:"Le sable d'or est un des tacos les plus connu de l'N7." //Description à récupérer dans la BDD
        };
    }  
};
</script>
<style lang="">
    
</style>