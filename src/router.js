import Vue from "vue";
import Router from "vue-router";
const Links = () => import("./views/Links.vue");
const Nya = () => import("./views/Nya.vue");
const Posts = () => import("./views/Posts.vue");
const Categories = () => import("./views/Categories.vue");
const Tags = () => import("./views/Tags.vue");
const Articles = () => import("./views/Articles.vue");
const Archives = () => import("./views/Archives.vue");

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
            path: "/:year/:month/:day/:id.html",
            component: Posts,
            props: true,
            meta: {
                keep_alive: false
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
            path: "/categories",
            component: Categories,
            meta: {
                keep_alive: true
            }
        },
        {
            path: "/archive",
            component: Archives,
            meta: {
                keep_alive: true
            }
        },
        {
            path: "/tags",
            component: Tags,
            meta: {
                keep_alive: true
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
