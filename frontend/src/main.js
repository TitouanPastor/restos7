import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import store from './store';
import PrimeVue from 'primevue/config'
import Aura from '@/presets/aura';
import 'primeicons/primeicons.css';

const app = createApp(App)

app.use(store);
app.use(router)

app.use(PrimeVue, {
    unstyled: true,
    pt: Aura
});

app.mount('#app')
