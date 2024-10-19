import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DetailView from '@/views/DetailView.vue'
import ProfilView from '@/views/ProfilView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/auth/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/users/me',
      name: 'profil',
      component: ProfilView
    },
    {
      path: '/detail',
      name: 'detail',
      component: DetailView
    }
  ]
})

export default router;
