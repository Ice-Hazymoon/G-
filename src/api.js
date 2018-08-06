export default {
    posts: {
        get: "http://192.168.2.194:8090/posts/"
    },
    like: {
        get: "http://192.168.2.194:8090/like/",
        post: "http://192.168.2.194:8090/like/"
    },
    comment: {
        post: "http://192.168.2.194:8090/comment/"
    }
};
