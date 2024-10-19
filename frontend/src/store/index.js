// store/index.js
import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

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
        }
    },
    getters: {
        isLoggedIn(state) {
            return !!state.token;
        },
        currentUser(state) {
            return state.user;
        }
    },
});
