<template>
    <div class="w-full py-4 fixed bottom-0 z-10">
        <footer class="flex items-center justify-center space-x-6 max-w-7xl m-auto">
            <!-- Bouton Vue Carte avec icône -->
            <router-link to="/map">
                <Button label="Map" icon="pi pi-map" class="text-sm" severity="contrast" rounded>
                </Button>
            </router-link>

            <!-- Bouton Vue Liste avec icône -->
            <router-link to="/">
                <Button label="List" icon="pi pi-list" class="text-sm" severity="contrast" rounded>
                </Button>
            </router-link>
        </footer>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
</script>

<style lang="css">
/* Optionally, you can add some specific styles for the footer if needed */
</style>
