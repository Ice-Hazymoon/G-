/*
 * Project: blog
 * File Created: Tuesday, 7th August 2018 2:37:50 pm
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Tuesday, 7th August 2018 4:54:12 pm
 */
export default {
    posts: {
        get: "http://192.168.31.32:8090/posts/"
    },
    like: {
        get: "http://192.168.31.32:8090/like/",
        post: "http://192.168.31.32:8090/like/"
    },
    comment: {
        post: "http://192.168.31.32:8090/comment/"
    },
    owo: {
        get: "http://192.168.31.32:8090/owojson/"
    },
    links: {
        get: "http://192.168.31.32:8090/links"
    }
};
