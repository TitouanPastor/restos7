// src/axios.js
import axios from 'axios';
import router from './router/index.js'; // Assurez-vous que votre routeur est importé si nécessaire

// Crée une instance Axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL de base de votre API
});

// Intercepteur de requêtes : Ajouter le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Récupère le token depuis localStorage (ou sessionStorage/cookies)

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Ajoute le token dans les headers
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponses : Gérer les erreurs 401 (non autorisé)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si l'erreur est 401, rediriger vers la page de login
      localStorage.removeItem('authToken'); // Supprimer le token si nécessaire
      router.push('/login'); // Rediriger l'utilisateur vers la page de login
    }
    return Promise.reject(error);
  }
);

export default api;
