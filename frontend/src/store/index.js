// store/index.js
import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
import api from '@/axios';

export default createStore({
    plugins: [createPersistedState()],
    state: {
        user: null,
        token: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('authToken', token);
        },
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('authToken');
        },
    },
    actions: {
        login({ commit }, { user, token }) {
            commit('setUser', user);
            commit('setToken', token);
        },
        logout({ commit }) {
            commit('logout');
        },
        async checkTokenValidity({ state, commit }) {
            if (state.token) {
                try {
                    await api.get('auth/verify-token', {
                        headers: {
                            Authorization: `Bearer ${state.token}`
                        }
                    });
                    // Si le token est valide, on ne fait rien
                } catch (error) {
                    // Si le token est invalide, déconnecter l'utilisateur
                    console.log('Token is invalid, logging out :', error);
                    commit('logout');
                }
            }
        }
    },
    getters: {
        isLoggedIn(state) {
            return !!state.token;
        },
        currentUser(state) {
            return state.user;
        },
        isAdmin(state) {
            console.log(state.user);
            return state.user && state.user.userPermissions.some(perm => perm.permission.name === 'administrator');
        },
        isCreator(state) {
            return state.user && state.user.userPermissions.some(perm => perm.permission.name === 'creator');
        },
    },
});
