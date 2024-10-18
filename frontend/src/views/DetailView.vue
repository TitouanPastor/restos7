<template>
    <div>
        <div class="flex flex-col">
            <div class="pt-14 flex items-center justify-center">
                <CommentairesDetail />
            </div>
        </div>
    </div>
</template>
  
  <script>
  import CommentairesDetail from "@/components/Detail/CommentairesDetail.vue"
  export default {
    name: 'DetailView',
    components:{
        CommentairesDetail
    },
    data(){
      return{
      }
    }
  }
  </script>
  <style lang="css"></style>
  