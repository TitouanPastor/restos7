<template>
    <div v-if="!['/auth/login', '/auth/register'].includes(router.currentRoute.value.path)" class="border w-full bg">
        <nav class="flex items-center justify-between p-2 max-w-7xl m-auto">
            <router-link to="/">
                <Logo />
            </router-link>

            <div v-if="isLoggedIn" class="flex gap-1">
                <router-link to="/users/me" class="flex items-center">
                    <Button label="Profile" icon="pi pi-user" severity="secondary"
                        :title="'connected as ' + currentUser.name" />
                </router-link>
                <router-link to="/auth/login">
                    <Button icon="pi pi-sign-out" iconPos="right" @click="logout"></Button>
                </router-link>
            </div>

            <router-link v-else to="/auth/login">
                <Button>Login</Button>
            </router-link>
        </nav>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Logo from '@/components/Logo.vue';
import Button from 'primevue/button';
import router from '@/router';

// Utilise Vuex pour accéder aux données du store
const store = useStore();
const isLoggedIn = computed(() => store.getters.isLoggedIn);
const currentUser = computed(() => store.getters.currentUser);

// Méthode pour déconnecter l'utilisateur
const logout = () => {
    store.dispatch('logout');
};
</script>

<style scoped>
/* Custom styling if needed */
</style>
