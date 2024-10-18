<template lang="html">
  <div v-for="index in n" :key="index">
      <Post />
  </div>
</template>

<script>
import Post from "@/components/Post/Post.vue"
export default {
  name: 'HomeView',
  components:{
    Post
  },
  data(){
    return{
      n : 5
    }
  }
}
</script>
<style lang="css"></style>
