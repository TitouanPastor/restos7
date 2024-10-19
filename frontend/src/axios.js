// src/axios.js
import axios from 'axios';
import store from './store'; // Importer Vuex store
import router from './router'; // Importer Vue Router si nécessaire

// Crée une instance Axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL de base de votre API
});

// Intercepteur de requêtes : Ajouter le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = store.state.token; // Récupérer le token depuis Vuex
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur de réponses : Gérer les erreurs 401 (non autorisé)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch('logout'); // Déconnecter l'utilisateur en cas d'erreur 401
      router.push('/login'); // Rediriger vers la page de login
    }
    return Promise.reject(error);
  }
);

export default api;
