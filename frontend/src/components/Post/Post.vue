<template>
    <div class="flex flex-col">
        <div class="pt-14 flex items-center justify-center">
            <div class="w-full max-w-md bg-stone-200 shadow-lg rounded-lg py-8 px-4">
                <Header />

                <Images />

                <Footer />
            </div>
        </div>
    </div>
</template>
<script>
import Header from './HeaderPost.vue';
import Footer from './FooterPost.vue';
import Images from './ImagesPost.vue';

export default {
    components: {
        Header,
        Footer,
        Images
    }
};
</script>
<style lang="css">
    
</style>