import Vue from "vue";
import Router from "vue-router";
const Articles = () => import("./views/Articles.vue");
const Links = () => import("./views/Links.vue");
const Nya = () => import("./views/Nya.vue");
const Posts = () => import("./views/Posts.vue");

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            component: Articles,
            meta: {
                keep_alive: true
            }
        },
        {
            path: "/links",
            component: Links,
            meta: {
                keep_alive: true
            }
        },
        {
            path: "/:year/:month/:day/:id.html",
            component: Posts,
            meta: {
                keep_alive: false
            }
        },
        {
            path: "*",
            component: Nya,
            meta: {
                keep_alive: true
            }
        }
    ],
    scrollBehavior(to) {
        if (to.fullPath === "/") {
            return "falsy";
        } else {
            return { x: 0, y: 0 };
        }
    }
});
