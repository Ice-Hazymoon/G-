<template>
    <div id="app">
        <md-snackbar :md-position="$store.state.snackbar.position" :md-duration="$store.state.snackbar.isInfinity ? Infinity : $store.state.snackbar.duration" :md-active.sync="$store.state.snackbar.showSnackbar" md-persistent>
            <span>{{ $store.state.snackbar.content }}</span>
            <md-button class="md-primary" @click="$store.state.snackbar.showSnackbar = false">OK</md-button>
        </md-snackbar>
        <div class="forbidMask" v-show="$store.state.forbidMask"></div>
        <md-progress-bar v-show="$store.state.globalProgress" class="global-progress-bar" md-mode="indeterminate"></md-progress-bar>
        <Appbar/>
        <md-app>
            <md-app-content>
                <keep-alive exclude="Posts">
                    <router-view v-if="$route.meta.keep_alive"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keep_alive"></router-view>
            </md-app-content>
            <md-app-drawer :md-active.sync="$store.state.drawerVisible" md-persistent="full">
                <Sidebar/>
            </md-app-drawer>
        </md-app>
    </div>
</template>
<script>
import Sidebar from "./template/Sidebar";
import Appbar from "./template/Appbar";
export default {
    components: {
        Sidebar,
        Appbar
    },
    computed: {
        drawerVisible() {
            return this.$store.state.drawerVisible;
        }
    },
    mounted() {
        function d() {
            let w = window.innerWidth;
            if (w <= 750) {
                this.$store.commit("switchSidebar", false);
            }
            if (w > 750) {
                this.$store.commit("switchSidebar", true);
            }
        }
        d.bind(this)();
        window.addEventListener("resize", d.bind(this));
    }
};
</script>

<style lang="scss">
#app {
    position: relative;
    font-smoothing: antialiased;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f1f1f1;
    .md-content > div {
        transition: all 0.5s cubic-bezier(0, 0, 0.2, 1);
        animation: ru 0.5s cubic-bezier(0, 0, 0.2, 1);
    }
    .global-progress-bar {
        z-index: 10;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
    }
    .forbidMask {
        z-index: 11;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    @keyframes ru {
        0% {
            transform: translateY(15vh);
            opacity: 0;
        }
        100% {
            transform: translateY(0px);
            opacity: 1;
        }
    }
}
</style>
