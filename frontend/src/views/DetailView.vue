<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-4">
    <!-- Ajout de px-4 pour les marges latérales sur les petits écrans -->
    <div class="w-full max-w-lg space-y-4 md:max-w-lg">
      <!-- max-w-full pour mobiles, max-w-lg pour écrans plus grands -->
      <CommentairesDetail />
      <LocalisationDetail />
    </div>
  </div>
</template>

  
<script>
  import CommentairesDetail from "@/components/Detail/CommentairesDetail.vue"
  import LocalisationDetail from "@/components/Detail/LocalisationDetail.vue";
  export default {
    name: 'DetailView',
    components:{
        CommentairesDetail,
        LocalisationDetail
    },
    data(){
      return{
      }
    }
  }
  </script>
  <style lang="css"></style>
  