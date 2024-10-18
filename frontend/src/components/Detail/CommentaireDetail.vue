
<template>
    <div class="flex flex-col">
        <div class="pt-14 flex items-center justify-center">
            <div class="w-full max-w-md bg-stone-200 shadow-lg rounded-lg py-8 px-4">
                <HeaderPost />
                <p>
                    <!-- {{Avis}} -->
                    Très bon restaurant, très contente de mon choix.
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import HeaderPost from '../Post/HeaderPost.vue';

export default {
    components:{
    HeaderPost,
    Avis: "Très bon restaurant, très contente de mon choix." //Commentaire à récupérer dans la BDD
  }
}
</script>
<style lang="css">
    
</style>