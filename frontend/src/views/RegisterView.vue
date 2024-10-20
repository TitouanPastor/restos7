<template>
    <div class="flex flex-col justify-center">
        <div class="flex items-center justify-center">
            <div class="flex flex-col gap-10 w-full max-w-lg rounded-lg p-8">
                <div>
                    <h2 class="flex justify-center text-4xl font-bold text-center">
                        <Logo class="text-4xl" /><span>&nbsp;- Sign Up</span>
                    </h2>
                    <img src="/svg/Welcome-bro.svg" alt="Login image" class="mx-auto w-64" />
                </div>
                <form @submit.prevent="register">
                    <InputText id="firstName" v-model="firstName" class="w-full p-inputtext-sm mb-4"
                        placeholder="First Name" :invalid="!firstNameGood" />
                    <InputText id="lastName" v-model="lastName" class="w-full p-inputtext-sm mb-4"
                        placeholder="Last Name" :invalid="!lastNameGood" />
                    <InputGroup class="mb-4">
                        <InputGroupAddon>
                            <i class="pi pi-envelope"></i>
                        </InputGroupAddon>
                        <InputText id="email" v-model="email" class="w-full p-inputtext-sm"
                            placeholder="Enter your email" :invalid="!emailGood" />
                    </InputGroup>
                    <InputGroup class="mb-6">
                        <Password id="password" v-model="password" class="w-full p-inputtext-sm rounded-l-none"
                            placeholder="Enter your password" toggleMask :invalid="!passwordGood" />
                    </InputGroup>
                    <Message v-if="errorMsg" class="text-red-500 text-sm mb-4 mt-2" severity="error">{{ errorMsg }}
                    </Message>
                    <Button label="Sign Up" type="submit" class="w-full" />
                    <router-link to="/auth/login" class="flex justify-around pt-2">
                        <a class="underline">Already have an account?</a>
                    </router-link>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Logo from '@/components/Logo.vue';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Message from 'primevue/message';
import Password from 'primevue/password';
import { ref } from 'vue';
import api from '@/axios'; // Importe l'instance Axios configurée
import router from '@/router'; // Importe le router pour rediriger l'utilisateur


// Data
const firstName = ref('');
const firstNameGood = ref(true); // Indique si le prénom est valide
const lastName = ref('');
const lastNameGood = ref(true); // Indique si le nom est valide
const email = ref('');
const emailGood = ref(true); // Indique si l'email est valide
const password = ref('');
const passwordGood = ref(true); // Indique si le mot de passe est valide
const errorMsg = ref(''); // Message d'erreur général (si besoin)

// Methods
const register = function () {
    // Réinitialisation des indicateurs de validation
    firstNameGood.value = !!firstName.value.trim();
    lastNameGood.value = !!lastName.value.trim();
    emailGood.value = isValidEmail(email.value);
    passwordGood.value = !!lastName.value.trim();

    // Vérification si tous les champs sont valides
    if (firstNameGood.value && lastNameGood.value && emailGood.value && passwordGood.value) {
        // Envoi de la requête à l'API
        api.post('/auth/register', {
            name: lastName.value,
            firstname: firstName.value,
            email: email.value,
            password: password.value,
        }).then(() => {
            // Rediriger l'utilisateur vers la page de connexion
            router.push({ path: '/auth/login', query: { message: 'Registration successful. You can now login.' } });
        }).catch((error) => {
            // Afficher l'erreur
            console.log(error);
            errorMsg.value = error.response?.data?.error || 'Register failed';
        });
    } else {
        if (!emailGood.value) {
            errorMsg.value = 'Please enter a valid email address.';
        }
    }
};

const isValidEmail = function (email) {
    // Regex simple pour valider un email
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
};


</script>

<style scoped>
/* Custom styling if needed */
</style>