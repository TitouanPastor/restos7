<template>
    <div class="flex flex-col">
        <div class="pt-14 flex items-center justify-center">
            <div class="w-full max-w-md bg-stone-200 shadow-lg rounded-lg py-8 px-4">
                <HeaderPost :name="name" :note="3" />
                <p>
                    {{ avis }}
                </p> 
            </div>
        </div>
    </div>
</template>

<script setup>

    import HeaderPost from '../Post/HeaderPost.vue';
    import { defineProps, onMounted } from 'vue';

    const props = defineProps({
        name: String, 
        avis: String
    });

    onMounted(() => {
            console.log('nom resto :', props.name);
    });

</script>

<style lang="css">
    
</style>