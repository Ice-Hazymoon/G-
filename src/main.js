import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'normalize.css';
import './assets/styles/styles.scss';
import axios from 'axios';
Vue.prototype.$http = axios;

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.use(VueMaterial);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

router.beforeEach((to, from, next) => {
    store.commit('setGlobalProgress', true);
    store.commit('setForbidMask', true); // 打开遮罩
    if (window.innerWidth <= 750) store.commit('switchSidebar', false);
    document.title = to.meta.title;
    next();
});
