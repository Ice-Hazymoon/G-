import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        drawerVisible: true,
        snackbar: {
            showSnackbar: false,
            position: "center",
            duration: 4000,
            isInfinity: false,
            content: "Snackbar"
        },
        globalProgress: false
    },
    mutations: {
        switchSidebar(state, e) {
            state.drawerVisible = e;
        },
        snackbar(state, content, config) {
            state.snackbar.content = content;
            state.snackbar.showSnackbar = true;
            if (config) state.snackbar = config;
        },
        setGlobalProgress(state, val) {
            state.globalProgress = val;
        }
    },
    actions: {}
});
