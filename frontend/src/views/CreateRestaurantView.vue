<template>
    <div class="flex flex-col flex-grow items-center pt-6 px-4 pb-4 max-w-2xl mx-auto bg-white">
        <h1 class="text-2xl font-bold pb-4">{{ restaurant.name ? restaurant.name : 'New Restaurant' }}</h1>

        <form @submit.prevent="submitForm" class="flex flex-col w-full space-y-4 text-sm md:text-base">
            <InputText v-model="restaurant.name" placeholder="Name" />
            <InputText v-model="restaurant.postal_code" placeholder="Postal Code" />
            <InputText v-model="restaurant.city" placeholder="City" />
            <InputText v-model="restaurant.address" placeholder="Address" />
            <Textarea v-model="restaurant.description" placeholder="Description" rows="5" />
            <InputText v-model="restaurant.website" placeholder="Website" />
            <InputText v-model="restaurant.Id_Country" placeholder="Country ID (To change)" type="number" />

            <FileUpload name="photos" multiple accept="image/*" class="mb-4" file-limit="10"
                invalid-file-limit-message="Up to 10 images can be added." customUpload="true" :showUploadButton="false"
                :showCancelButton="false" @select="handleFileSelect" chooseLabel="Select image(s)">
                <template #empty>
                    <span class="hidden md:block">Drag and drop files to here to upload.</span>
                </template>
            </FileUpload>


            <div v-if="errorMessage" class="mt-2">
                <Message severity="error">
                    {{ errorMessage }}
                </Message>
            </div>
            <div v-if="successMessage" class="mt-2">
                <Message severity="success">
                    {{ successMessage }}
                </Message>
            </div>
            <Button :label="restaurant.name ? 'Create ' + restaurant.name : 'Create'" type="submit" class="w-full" />

            <Toast ref="toast" />
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import Message from 'primevue/message';
import api from '@/axios';

const restaurant = ref({
    name: '',
    postal_code: '',
    city: '',
    address: '',
    description: '',
    website: '',
    Id_Country: null,
    photos: []
});
const errorMessage = ref('');
const successMessage = ref('');
const toast = ref(null);
const uploadUrl = '/restaurants';

const submitForm = async () => {
    errorMessage.value = '';

    if (!restaurant.value.name || !restaurant.value.city || !restaurant.value.address || !restaurant.value.postal_code || !restaurant.value.Id_Country || !restaurant.value.photos.length || !restaurant.value.description || !restaurant.value.website) {
        errorMessage.value = 'You must fill all fields.';
        console.error('Missing required fields');
        return;
    }

    const formData = new FormData();
    for (const key in restaurant.value) {
        if (key !== 'photos') {
            formData.append(key, restaurant.value[key]);
        }
    }

    // Ajout des photos au FormData
    restaurant.value.photos.forEach(file => {
        formData.append('photos', file);
    });

    try {
        await api.post(uploadUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        successMessage.value = 'Restaurant created successfully!';
        // Reset the form
        restaurant.value = {
            name: '',
            postal_code: '',
            city: '',
            address: '',
            description: '',
            website: '',
            Id_Country: null,
            photos: []
        };
    } catch (error) {
        errorMessage.value = 'Failed to create restaurant. Try again later.';
    }
};

const handleFileSelect = (event) => {
    // Ajouter les fichiers sélectionnés au tableau `restaurant.value.photos`
    restaurant.value.photos = event.files;
};

</script>

<style scoped>
/* Ajoute les styles si nécessaire */
</style>