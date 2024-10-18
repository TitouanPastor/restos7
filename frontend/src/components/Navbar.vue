<template>
    <div class="border w-full bg">
        <nav class="flex items-center justify-between p-2 max-w-7xl m-auto">
            <router-link to="/">
                <Logo/>
            </router-link>
            <router-link to="/login"><Button>Login</Button></router-link>

        </nav>
    </div>
</template>

<script setup>
import Logo from '@/components/Logo.vue';
import Button from 'primevue/button';
import { ref } from 'vue';


// Data
const isAuthenticated = ref(false);

// Methods
const toggleAuth = function() {
	isAuthenticated.value = !isAuthenticated.value;
}

</script>

<style lang="css">
/* Vous pouvez personnaliser les styles ici si nécessaire */
</style>