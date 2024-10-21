<template>
    <div class="flex flex-col max-w-4xl pt-4 md:flex-row md:p-8">
      <!-- Section Profil -->
      <div class="flex flex-col items-center md:items-start md:w-1/3">
        <div class="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mb-4">
          <!-- Placeholder for profile picture -->
          <i class="pi pi-user text-6xl text-gray-500"></i>
        </div>
        <p class="text-xl font-semibold mb-2">{{ userProfile?.name }} {{ userProfile?.firstname }}</p>
        <p class="text-gray-500">{{ userProfile?.email }}</p>
        <Button label="Edit Profile" class="mt-6 w-full md:w-auto p-button-outlined" />
      </div>
  
      <!-- Section Infos Utilisateur -->
      <div class="mt-8 w-full md:w-2/3 md:mt-0 md:pl-12">
        <h2 class="text-2xl font-semibold mb-4">Account Information</h2>
        <div class="space-y-4">
          <div class="flex justify-between border-b pb-3">
            <span class="text-gray-600 font-semibold">Name:</span>
            <span>{{ userProfile?.name }}</span>
          </div>
          <div class="flex justify-between border-b pb-3">
            <span class="text-gray-600 font-semibold">First Name:</span>
            <span>{{ userProfile?.firstname }}</span>
          </div>
          <div class="flex justify-between border-b pb-3">
            <span class="text-gray-600 font-semibold">Email:</span>
            <span>{{ userProfile?.email }}</span>
          </div>
        </div>
        <Button label="Logout" class="mt-6 w-full md:w-auto bg-red-500 hover:bg-red-600 text-white" @click="logout" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
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
  /* Custom styling if needed */
  </style>
  