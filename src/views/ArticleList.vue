/*
 * Project: blog
 * File Created: Wednesday, 1st August 2018 4:53:33 pm
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Tuesday, 7th August 2018 2:47:06 pm
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
        <div class="load-more" :style="{'visibility': !reachBottom ? 'hidden' : ''}">
            <md-progress-spinner :md-diameter="35" :md-stroke="5" md-mode="indeterminate"></md-progress-spinner>
        </div>
    </div>
</template>

<script>
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import ArticleCard from "../components/ArticleCard";
import api from "../../config/config.js";

export default {
    beforeRouteLeave(to, from, next) {
        window.removeEventListener("scroll", this.klajsdklajs);
        document.querySelector(".md-content > div").classList.add("r-b");
        setTimeout(() => {
            setTimeout(() => {
                document
                    .querySelector(".md-content > div")
                    .classList.remove("r-b");
            }, 500);
            next();
        }, 500);
    },
    activated() {
        if (this.data.length) {
            window.addEventListener("scroll", this.klajsdklajs);
            this.$store.commit("setGlobalProgress", false);
        }
    },
    created() {
        this.$store.commit("setForbidMask", true); // 打开遮罩
        this.$http
            .get(api.posts.get + "?page=1")
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
                            if (window.innerWidth < 600) {
                                //如果在移动设备上不执行 msnry
                                this.$store.commit("setForbidMask", false);
                            } else {
                                this.msnry = new Masonry(".grid", {
                                    percentPosition: true,
                                    columnWidth: ".grid-sizer",
                                    itemSelector: ".grid-item",
                                    stagger: 50
                                });
                            }
                            this.$store.commit("setForbidMask", false);
                            window.scrollTo(0, 0);
                            this.handleScroll();
                            window.addEventListener("scroll", this.klajsdklajs);
                        });
                    });
                } else {
                    this.$store.commit("setGlobalProgress", false);
                    this.$store.commit(
                        "snackbar",
                        "请求错误, 请稍后重试" + e.data.msg
                    );
                }
            })
            .catch(err => {
                this.$store.commit("setGlobalProgress", false);
                this.$store.commit("snackbar", "请求错误, 请稍后重试" + err);
            });
    },
    data: () => ({
        more: true,
        scrollHeight: 0,
        page: 1,
        msnry: {
            layout() {
                return false;
            }
        },
        data: [],
        likeNum: [false, 0],
        reachBottom: false,
        loadMore: false
    }),
    methods: {
        layout() {
            this.$nextTick(() => {
                setTimeout(() => this.msnry.layout(), 0);
            });
        },
        like() {
            this.$http
                .get(api.like.get)
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
        },
        handleScroll() {
            this.$nextTick(() => {
                let r = window.scrollY;
                window.scrollTo(0, document.body.scrollHeight);
                this.scrollHeight = window.scrollY;
                window.scrollTo(0, r);
                this.reachBottom = false;
            });
        },
        load() {
            this.$http
                .get(api.posts.get + "?page=" + this.page++)
                .then(e => {
                    if (e.data.code === 200) {
                        this.data = this.data.concat(
                            e.data.data.map(item => {
                                item.commentVal = "";
                                item.commentList = [];
                                item.show = true;
                                item.tmp = {
                                    c: false, //Cardactive
                                    m: false, //Comment
                                    b: false, //Progress Bar
                                    r: "", //replyComtent
                                    x: "" //replyId
                                };
                                return item;
                            })
                        );
                        this.$nextTick(() => {
                            imagesLoaded(
                                document.querySelector(".grid"),
                                () => {
                                    if (!this.isMobile) {
                                        this.msnry = new Masonry(".grid", {
                                            percentPosition: true,
                                            columnWidth: ".grid-sizer",
                                            itemSelector: ".grid-item",
                                            stagger: 50
                                        });
                                    }
                                    this.data.map(item => {
                                        item.show = false;
                                    });
                                    this.handleScroll();
                                }
                            );
                        });
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
        },
        klajsdklajs() {
            if (window.scrollY === this.scrollHeight) {
                this.reachBottom = true;
            }
        }
    },
    components: {
        ArticleCard
    },
    watch: {
        reachBottom(val) {
            if (val) {
                this.scrollHeight = window.scrollY;
                this.load();
            }
        },
        drawerStatus() {
            setTimeout(() => this.layout(), 500);
        }
    },
    computed: {
        drawerStatus() {
            return this.$store.state.drawerVisible;
        },
        isMobile() {
            return window.innerWidth < 650;
        }
    }
};
</script>

<style lang="scss">
@media (max-width: 599px) {
    #content > .grid {
        margin-top: 16px !important;
    }
}
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
    .load-more {
        width: 100%;
        margin: 24px 0;
        text-align: center;
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
