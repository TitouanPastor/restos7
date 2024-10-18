<template>
    <div class="flex flex-col">
        <div class="pt-14 flex items-center justify-center">
            <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 class="flex justify-center text-2xl font-bold text-center mb-6"><Logo/>&nbsp;- Sign Up</h2>
                <form @submit.prevent="signup">
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
                    <router-link to="/login" class="flex justify-around pt-2">
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
const signup = function () {
    // Réinitialisation des indicateurs de validation
    firstNameGood.value = !!firstName.value.trim();
    lastNameGood.value = !!lastName.value.trim();
    emailGood.value = isValidEmail(email.value);
    passwordGood.value = !!lastName.value.trim();

    // Vérification si tous les champs sont valides
    if (firstNameGood.value && lastNameGood.value && emailGood.value && passwordGood.value) {
        console.log('Signing up with:', firstName.value, lastName.value, email.value, password.value);
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