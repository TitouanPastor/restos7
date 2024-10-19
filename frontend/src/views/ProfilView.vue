<template>
    <div class="flex flex-col max-w-4xl mx-auto p-6">
        <h1 class="text-3xl font-bold mb-6">My Profile</h1>

        <div class="flex gap-6 items-center">
            <!-- Placeholder for profile picture -->
            <div class="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                <!-- Future profile image goes here -->
                <i class="pi pi-user text-4xl text-gray-500"></i>
            </div>

            <!-- User Information -->
            <div v-if="userProfile" class="flex-grow">
                <p class="text-lg mb-2"><strong>Name:</strong> {{ userProfile.name }}</p>
                <p class="text-lg mb-2"><strong>First Name:</strong> {{ userProfile.firstname }}</p>
                <p class="text-lg mb-2"><strong>Email:</strong> {{ userProfile.email }}</p>

                <!-- Future buttons like Edit Profile or Change Password can go here -->
                <Button label="Edit Profile" class="mt-4" />
            </div>
        </div>

        <!-- Additional future functionalities (Change Password, Update Profile Picture) -->
        <div class="mt-8">
            <h2 class="text-xl font-semibold mb-4">Additional Features</h2>
            <p>Here you can later add functionalities such as:</p>
            <ul class="list-disc list-inside">
                <li>Change profile picture</li>
                <li>Update your password</li>
                <li>Manage account settings</li>
            </ul>
        </div>

        <!-- Logout Button -->
        <Button label="Logout" class="mt-8 bg-red-500 hover:bg-red-600 text-white" @click="logout" />
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import api from '@/axios'; // Importe l'instance Axios configurée
import router from '@/router'; // Importe le router pour rediriger l'utilisateur
import { useStore } from "vuex"; // Utiliser le store Vuex
import Button from 'primevue/button';

const userProfile = ref(null); // User profile data

// Data
const store = useStore();

// Fetch user profile when the component is mounted
const fetchUserProfile = async () => {
    try {
        const response = await api.get('/users/me');
        console.log('User profile:', response.data);
        userProfile.value = response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
};

// Call the API to get user profile on component mount
onMounted(() => {
    fetchUserProfile();
});

// Logout function
const logout = () => {
    store.dispatch('logout');
    router.push('/auth/login');
};
</script>

<style scoped>
/* Add some custom styling if needed */
</style>
