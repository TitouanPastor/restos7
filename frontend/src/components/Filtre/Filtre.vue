<template>
    <div>
        <MultiSelect v-model="selectedCities" :options="cities" filter optionLabel="name" placeholder="Select Cities"
    :maxSelectedLabels="3" class="w-full md:w-80" />
    </div>
</template>
<script>
import MultiSelect from 'primevue/multiselect';
export default {
    
}
</script>
<style lang="">
    
</style>