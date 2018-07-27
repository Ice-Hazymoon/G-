<template>
    <div id="app">
        <Appbar/>
        <md-app>
            <md-app-content>
                <Content/>
            </md-app-content>
            <md-app-drawer :md-active.sync="$store.state.drawerVisible" md-persistent="full">
                <Sidebar/>
            </md-app-drawer>
        </md-app>
    </div>
</template>
<script>
import Sidebar from "./components/Sidebar";
import Appbar from "./components/Appbar";
import Content from "./components/Content";
export default {
    components: {
        Sidebar,
        Appbar,
        Content
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
}
</style>
