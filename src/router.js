import Vue from "vue";
import Router from "vue-router";
const Links = () => import("./views/Links.vue");
const NotFound = () => import("./views/404.vue");
const Posts = () => import("./views/Posts.vue");
const Categories = () => import("./views/Categories.vue");
const Tags = () => import("./views/Tags.vue");
const ArticleList = () => import("./views/ArticleList.vue");
const Archives = () => import("./views/Archives.vue");

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            name: "Home",
            path: "/",
            component: ArticleList,
            meta: {
                keep_alive: true
            }
        },
        {
            name: "Posts",
            path: "/:year/:month/:day/:id.html",
            component: Posts,
            props: true,
            meta: {
                keep_alive: false
            }
        },
        {
            name: "Links",
            path: "/links",
            component: Links,
            meta: {
                keep_alive: true
            }
        },
        {
            name: "Categories",
            path: "/categories",
            component: Categories,
            meta: {
                keep_alive: true
            }
        },
        {
            name: "Archives",
            path: "/archive",
            component: Archives,
            meta: {
                keep_alive: true
            }
        },
        {
            name: "Tags",
            path: "/tags",
            component: Tags,
            meta: {
                keep_alive: true
            }
        },
        {
            path: "*",
            component: NotFound,
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
