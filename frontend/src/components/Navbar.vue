<template>
    <div v-if="!['/auth/login', '/auth/register'].includes(router.currentRoute.value.path)" class="border w-full bg">
        <nav class="flex items-center justify-between p-2 max-w-7xl m-auto w-full z-50">
            <router-link to="/">
                <Logo />
            </router-link>

            <div class="flex flex-grow justify-end text-sm md:text-base">
                <div class="flex-grow mx-4 flex items-center max-w-xs md:hidden">
                    <Button icon="pi pi-search" @click="toggleSearchPopup" severity="secondary" class="p-button-rounded p-button-text"></Button>
                </div>

                <div class="hidden md:flex flex-grow mx-4 items-center max-w-xs">
                    <InputGroup class="p-input-icon-left m-auto">
                        <InputGroupAddon class="bg-slate-100">
                            <i class="pi pi-search"></i>
                        </InputGroupAddon>
                        <InputText placeholder="Search..." v-model="searchQuery" class="w-full p-inputtext-sm" />
                    </InputGroup>
                </div>

                <div v-if="isLoggedIn" class="flex gap-1 items-center">
                    <router-link to="/users/me" class="flex items-center">
                        <Button label="Profile" icon="pi pi-user" severity="secondary" :title="'Connected as ' + currentUser.name" />
                    </router-link>
                    <router-link v-if="isAbleToCreate" to="/restaurants/create">
                        <Button icon="pi pi-plus"></Button>
                    </router-link>
                    <Button icon="pi pi-sign-out" iconPos="right" @click="logout" class="p-button-danger"></Button>
                </div>

                <router-link v-else to="/auth/login">
                    <Button>Login</Button>
                </router-link>
            </div>
        </nav>

        <!-- Popup de recherche pour les mobiles -->
        <Dialog v-model:visible="isSearchPopupVisible" modal class="w-full sm:max-w-md" position="top" closable="true">
            <div class="flex flex-col items-center p-4 space-y-4">

                <!-- Champ de recherche avec styles améliorés -->
                <div class="flex items-center w-full rounded-lg p-1 shadow-lg bg-gray-100">
                    <i class="pi pi-search text-gray-400 p-2"></i>
                    <InputText placeholder="Type your search..." v-model="searchQuery" class="w-full border-0 bg-transparent focus:outline-none" />
                </div>

                <!-- Bouton de recherche (facultatif) -->
                <Button label="Search" icon="pi pi-arrow-right" class="w-full mt-2 p-button-outlined p-button-secondary" @click="toggleSearchPopup" />
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import Logo from '@/components/Logo.vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Dialog from 'primevue/dialog';
import router from '@/router';

const store = useStore();
const isLoggedIn = computed(() => store.getters.isLoggedIn);
const currentUser = computed(() => store.getters.currentUser);
const isAbleToCreate = computed(() => store.getters.isAdmin || store.getters.isCreator);
const searchQuery = ref('');

const isSearchPopupVisible = ref(false);

const toggleSearchPopup = () => {
    isSearchPopupVisible.value = !isSearchPopupVisible.value;
};

const logout = () => {
    store.dispatch('logout');
};

// Recherche automatique lors de la saisie
watch(searchQuery, (query) => {
    if (query.length == 0) {
        router.push({ path: '/' });
        return;
    }
    router.push({ path: '/search/'+query });
});

onMounted(async () => {
    if (router.currentRoute.value.path.includes('/search')) {
        searchQuery.value = router.currentRoute.value.params.query;
    }
});

//Update la route quand je clique sur l'icon de recherche
watch(() => router.currentRoute.value.path, (path) => {
    if (path.includes('/search')) {
        searchQuery.value = router.currentRoute.value.params.query;
    }
});




</script>

<style scoped>
/* Styling pour le popup */
.p-dialog.w-full {
    border-radius: 8px;
    overflow: hidden;
}

.p-dialog-header {
    background: transparent;
    border: none;
}

.p-dialog-content {
    padding: 1rem;
}

.p-inputtext-sm {
    font-size: 1rem;
}
</style>
