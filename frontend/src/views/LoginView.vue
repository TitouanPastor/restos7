<template>
    <div class="flex flex-col">
        <div class="pt-14 flex items-center justify-center">
            <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 class="text-2xl font-bold text-center mb-6">Resto7 - Login</h2>
                <form @submit.prevent="login">
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
                    <Button label="Login" type="submit" class="w-full" />
                    <!-- signup btn -->
                    <router-link to="/signup" class="flex justify-around pt-2">
                        <a class="underline">Don't have an account</a>
                        <a class="underline">Forgot password</a>
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
            email: '',
            password: '',
        };
    },
    methods: {
        login() {
            // Implement login logic here
            if (this.email && this.password) {
                console.log('Logging in with:', this.email, this.password);
            } else {
                console.log('Please enter both email and password.');
            }
        },
    },
};
</script>

<style scoped>
/* Custom styling if needed */
</style>