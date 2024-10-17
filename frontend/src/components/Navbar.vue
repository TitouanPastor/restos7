<template>
    <div class="border w-full bg">
        <nav class="flex items-center justify-between p-2 max-w-7xl m-auto">
            <router-link to="/">
                <h1 class="text-2xl font-bold">Resto<span style="color: var(--p-primary-400);">7</span></h1>
            </router-link>
            <router-link to="/login"><Button>Login</Button></router-link>

        </nav>
    </div>
</template>

<script>
import Button from 'primevue/button';
export default {
    components: {
        Button,
    },
    data() {
        return {
            isAuthenticated: false,
        };
    },
    methods: {
        toggleAuth() {
            this.isAuthenticated = !this.isAuthenticated;
        },
    },
};
</script>

<style lang="css">
/* Vous pouvez personnaliser les styles ici si nécessaire */
</style>
