import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        drawerVisible: true
    },
    mutations: {
        switchSidebar(state, e) {
            state.drawerVisible = e;
        }
    },
    actions: {}
});
