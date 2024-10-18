<template>
    <div class="border w-full bg py-4">
        <footer class="flex items-center justify-between p-2 max-w-7xl m-auto">
            <router-link to="/carte">
                <Button class="">Vue Carte</Button>
            </router-link>
            <router-link to="/">
                <Button>Vue Liste</Button>
            </router-link>
        </footer>
    </div>
</template>


<script>
    import Button from 'primevue/button';
</script>

<style lang="css">
</style>