<template>
    <div class="flex flex-col">
        <div class="flex items-center justify-center">
            <div class="w-full max-w-md">
                <Images />
                <router-link to="/details" title="see details">
                    <div class="px-4">
                        <Header />
                        <Footer />
                    </div>
                </router-link>
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
<style lang="css"></style>