<template>
    <div class="flex flex-col">
        <div class="flex flex-grow items-center justify-center">
            <div class="w-full max-w-md h-full px-7">
                <Images />
                <router-link to="/details" title="see details">
                    <div >
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