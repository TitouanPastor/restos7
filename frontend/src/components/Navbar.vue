<template>
    <div v-if="!['/auth/login', '/auth/register'].includes(router.currentRoute.value.path)" class="border w-full bg">
        <nav class="flex items-center justify-between p-2 max-w-7xl m-auto w-full">
            <!-- Logo -->
            <router-link to="/">
                <Logo />
            </router-link>


            <div class="flex flex-grow justify-end">
                <!-- Barre de recherche avec icône de loupe -->
                <div class="flex-grow mx-4 flex items-center max-w-xs">
                    <InputGroup class="p-input-icon-left  m-auto">
                        <InputGroupAddon class="bg-slate-100">
                            <i class="pi pi-search"></i>
                        </InputGroupAddon>
                        <InputText placeholder="Search..." v-model="searchQuery" class="w-full p-inputtext-sm" />
                    </InputGroup>
                </div>
                <!-- Boutons Login/Profile -->
                <div v-if="isLoggedIn" class="flex gap-1">
                    <!-- Profile Button -->
                    <router-link to="/users/me" class="flex items-center">
                        <Button label="Profile" icon="pi pi-user" severity="secondary"
                            :title="'Connected as ' + currentUser.name" />
                    </router-link>
                    <!-- create restaurant ("+") btn -->
                    <router-link v-if="isAbleToCreate" to="/restaurants/create">
                        <Button icon="pi pi-plus" class="p-button-success"></Button>
                    </router-link>
                    <!-- Logout Button -->
                    <Button icon="pi pi-sign-out" iconPos="right" @click="logout" class="p-button-danger"></Button>
                </div>

                <router-link v-else to="/auth/login">
                    <Button>Login</Button>
                </router-link>
            </div>

        </nav>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import Logo from '@/components/Logo.vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext'; // Import du composant InputText
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import router from '@/router';

// Utilise Vuex pour accéder aux données du store
const store = useStore();
const isLoggedIn = computed(() => store.getters.isLoggedIn);
const currentUser = computed(() => store.getters.currentUser);
const isAbleToCreate = computed(() => store.getters.isAdmin || store.getters.isCreator);

// Barre de recherche
const searchQuery = ref(''); // Référence pour la barre de recherche

// Méthode pour déconnecter l'utilisateur
const logout = () => {
    store.dispatch('logout');
};
</script>

<style scoped>
/* Custom styling if needed */
</style>
