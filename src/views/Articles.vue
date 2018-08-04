/*
 * Project: blog
 * File Created: Wednesday, 1st August 2018 4:53:33 pm
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Friday, 3rd August 2018 4:25:15 pm
 */
<template>
    <div id="content">
        <div class="grid">
            <div class="grid-sizer"></div>
            <div class="grid-item c-header">
                <md-card>
                    <md-card-header>
                        <md-avatar>
                            <img src="../assets/images/avatar.jpg" alt="Avatar">
                        </md-avatar>

                        <div class="md-title">
                            <span>Ice-Hazymoon</span>
                        </div>
                        <div class="md-subhead">聆听最初的声音，向往无尽的未来</div>

                        <div class="like">
                            <span class="like-number">{{ likeNum[1] }}</span>
                            <md-button @click.stop="like" class="md-icon-button" :class="{'liked': likeNum[0]}" :md-ripple="false">
                                <md-icon v-if="likeNum[0]">favorite</md-icon>
                                <md-icon v-else>favorite_border</md-icon>
                                <md-tooltip md-direction="left">Do you like me?</md-tooltip>
                            </md-button>
                        </div>
                    </md-card-header>
                </md-card>
            </div>

            <ArticleCard @layout="layout" :data.sync="data"></ArticleCard>
        </div>
    </div>
</template>

<script>
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import ArticleCard from "../components/ArticleCard";

export default {
    beforeRouteLeave(to, from, next) {
        document.querySelector(".md-content > div").classList.add("r-b");
        setTimeout(() => {
            setTimeout(() => {
                document
                    .querySelector(".md-content > div")
                    .classList.remove("r-b");
            }, 500);
            // window.scrollTo(0,0);
            next();
        }, 500);
    },
    activated() {
        if (this.data.length) {
            this.$store.commit("setGlobalProgress", false);
        }
    },
    created() {
        this.$http
            .get("http://192.168.31.32:8090/posts")
            .then(e => {
                if (e.data.code === 200) {
                    this.likeNum =
                        localStorage.getItem("like") === "true"
                            ? [true, e.data.likeNum]
                            : [false, e.data.likeNum];
                    this.data = e.data.data.map(item => {
                        item.commentVal = "";
                        item.commentList = [];
                        item.tmp = {
                            c: false, //Cardactive
                            m: false, //Comment
                            b: false, //Progress Bar
                            r: "", //replyComtent
                            x: "" //replyId
                        };
                        return item;
                    });
                    this.$nextTick(() => {
                        imagesLoaded(document.querySelector(".grid"), () => {
                            this.$store.commit("setGlobalProgress", false);
                            if (window.innerWidth < 600) return false;
                            this.msnry = new Masonry(".grid", {
                                percentPosition: true,
                                columnWidth: ".grid-sizer",
                                itemSelector: ".grid-item",
                                stagger: 50
                            });
                        });
                    });
                } else {
                    this.$store.commit(
                        "snackbar",
                        "请求错误, 请稍后重试" + e.data.msg
                    );
                }
            })
            .catch(err => {
                this.$store.commit("snackbar", "请求错误, 请稍后重试" + err);
            });
    },
    data: () => ({
        more: true,
        msnry: {
            layout() {
                return false;
            }
        },
        data: [],
        likeNum: [false, 0]
    }),
    methods: {
        layout() {
            this.$nextTick(() => {
                setTimeout(() => this.msnry.layout(), 0);
            });
        },
        like() {
            this.$http
                .get("http://192.168.31.32:8090/like")
                .then(e => {
                    if (e.data.code === 200) {
                        this.likeNum = [true, e.data.likeNum];
                        localStorage.setItem("like", true);
                        this.$store.commit("snackbar", "我也喜欢你~");
                    } else {
                        this.$store.commit(
                            "snackbar",
                            "请求错误, 请稍后重试" + e.data.msg
                        );
                    }
                })
                .catch(err => {
                    this.$store.commit(
                        "snackbar",
                        "请求错误, 请稍后重试" + err
                    );
                });
        }
    },
    watch: {
        drawerStatus() {
            setTimeout(() => this.layout(), 500);
        }
    },
    computed: {
        drawerStatus() {
            return this.$store.state.drawerVisible;
        }
    },
    components: {
        ArticleCard
    }
};
</script>

<style lang="scss">
#content {
    min-height: 1000px;
    .c-header {
        margin-bottom: 16px !important;
    }
    .grid {
        margin: 0 auto;
        max-width: 1590px;
        &:after {
            content: "";
            display: block;
            clear: both;
        }
    }
    .grid-item {
        max-width: 530px;
        min-width: 140px;
        margin: 0 auto;
        margin-bottom: 24px;
        box-sizing: border-box;
        transform: translate3d(0, 0, 0);
        .active {
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        }
    }
}
@media screen and (min-width: 1400px) {
    .grid-sizer,
    .grid-item {
        width: 33.3333%;
    }
}
@media only screen and (max-width: 1400px) {
    .grid {
        max-width: 1060px !important;
    }
    .grid-sizer,
    .grid-item {
        width: 50%;
    }
}
@media only screen and (max-width: 1023px) {
    .grid-sizer,
    .grid-item {
        right: 0;
        width: 100%;
    }
}
</style>
