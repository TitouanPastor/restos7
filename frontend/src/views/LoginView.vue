<template>
    <div class="flex flex-col">
        <div class="pt-14 flex items-center justify-center">
            <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 class="flex justify-center text-2xl font-bold text-center mb-6">
                    <Logo />&nbsp;- Login
                </h2>
                <form @submit.prevent="login">
                    <InputGroup class=" mb-4">
                        <InputGroupAddon>
                            <i class="pi pi-envelope"></i>
                        </InputGroupAddon>
                        <InputText id="email" v-model="email" class="w-full p-inputtext-sm"
                            placeholder="Enter your email" :invalid="!emailGood" />
                    </InputGroup>
                    <InputGroup class="mb-8">
                        <Password id="password" v-model="password" class="w-full p-inputtext-sm rounded-l-none"
                            placeholder="Enter your password" toggleMask :invalid="!passwordGood" />
                    </InputGroup>
                    <div v-if="passwordError" class="text-red-500 text-sm mb-4">{{ emailError }}</div>
                    <Message v-if="errorMsg" class="text-red-500 text-sm mb-4 mt-2" severity="error">{{ errorMsg }}
                    </Message>
                    <Message v-if="successMsg" class="text-green-500 text-sm mb-4 mt-2" severity="success">{{ successMsg }}</Message>
                    <Button label="Login" type="submit" class="w-full" />
                    <router-link to="/register" class="flex justify-around pt-2">
                        <a class="underline">Don't have an account</a>
                        <a class="underline">Forgot password</a>
                    </router-link>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Message from 'primevue/message';
import { ref, onMounted } from 'vue';
import Logo from '@/components/Logo.vue';
import api from '@/axios'; // Importe l'instance Axios configurée
import router from '@/router'; // Importe le router pour rediriger l'utilisateur
import { useStore } from "vuex"; // Utiliser le store Vuex

// Data
const email = ref('');
const emailGood = ref(true);
const password = ref('');
const passwordGood = ref(true);
const errorMsg = ref('');
const successMsg = ref('');

// Utiliser Vuex store
const store = useStore();

// Methods
const login = async function () {
    // restet the success message if any
    successMsg.value = '';
    // Reset validation indicators
    emailGood.value = isValidEmail(email.value);
    passwordGood.value = !!password.value.trim();

    if (emailGood.value && passwordGood.value) {
        try {
            const response = await api.post('/auth/login', {
                email: email.value,
                password: password.value,
            });

            console.log('Login successful:', response.data);
            const { token, user } = response.data;

            // Utilise Vuex pour stocker l'utilisateur et le token
            store.dispatch('login', { user, token });

            // Rediriger l'utilisateur après un login réussi
            router.push('/');
        } catch (error) {
            errorMsg.value = error.response?.data?.error || 'Login failed';
        }
    } else {
        errorMsg.value = 'Please enter your email and password in a correct format';
    }
};

const isValidEmail = function (email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
};

// Check for query parameter on component mount
onMounted(() => {
    const query = router.currentRoute.value.query;
    if (query.message) {
        successMsg.value = query.message;
    }
});
</script>

<style scoped>
/* Custom styling if needed */
</style>