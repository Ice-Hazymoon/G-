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
    }
};
