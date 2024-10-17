<template>
    <div class="flex flex-col">
        <div class="pt-14 flex items-center justify-center">
            <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 class="text-2xl font-bold text-center mb-6">Resto7 - Signup</h2>
                <form @submit.prevent="signup">
                    <div class="mb-4">
                        <label for="firstName" class="block text-sm font-medium mb-2">First Name</label>
                        <InputText id="firstName" v-model="firstName" class="w-full p-inputtext-sm"
                            placeholder="Enter your first name" />
                    </div>
                    <div class="mb-4">
                        <label for="lastName" class="block text-sm font-medium mb-2">Last Name</label>
                        <InputText id="lastName" v-model="lastName" class="w-full p-inputtext-sm"
                            placeholder="Enter your last name" />
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-medium mb-2">Email</label>
                        <InputText id="email" v-model="email" class="w-full p-inputtext-sm"
                            placeholder="Enter your email" />
                    </div>
                    <div class="mb-6">
                        <label for="password" class="block text-sm font-medium mb-2">Password</label>
                        <InputText id="password" type="password" v-model="password" class="w-full p-inputtext-sm"
                            placeholder="Enter your password" />
                    </div>
                    <Button label="Sign Up" type="submit" class="w-full" />
                    <!-- Already have an account? Login link -->
                    <router-link to="/login" class="flex justify-around pt-2">
                        <a class="underline">Already have an account?</a>
                    </router-link>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
    components: {
        InputText,
        Button,
    },
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        };
    },
    methods: {
        signup() {
            // Implémente ici la logique d'inscription
            if (this.firstName && this.lastName && this.email && this.password) {
                console.log('Signing up with:', this.firstName, this.lastName, this.email, this.password);
            } else {
                console.log('Please fill in all the fields.');
            }
        },
    },
};
</script>

<style scoped>
/* Custom styling if needed */
</style>