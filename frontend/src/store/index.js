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
            console.log("VueX login");
            commit('setUser', user);
            commit('setToken', token);
        },
        logout({ commit }) {
            console.log("VueX logout");
            commit('logout');
        }
    },
    getters: {
        isLoggedIn(state) {
            console.log(state.token);
            return !!state.token;
        },
        currentUser(state) {
            console.log(state.user);
            return state.user;
        }
    },
});
