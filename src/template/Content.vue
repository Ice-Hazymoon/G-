/*
 * Project: blog
 * File Created: Wednesday, 25th July 2018 11:55:37 am
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Tuesday, 31st July 2018 4:35:50 pm
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

                        <md-button @click.stop class="md-icon-button like" :md-ripple="false">
                            <md-icon>favorite_border</md-icon>
                            <md-tooltip md-direction="left">Do you like me?</md-tooltip>
                        </md-button>
                    </md-card-header>
                </md-card>
            </div>

            <ArticleCard @layout="layout" :data="data"></ArticleCard>
        </div>
    </div>
</template>

<script>
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import ArticleCard from "../components/ArticleCard";

export default {
    created() {
        this.$http
            .get("http://192.168.31.32:8090/posts")
            .then(e => {
                if (e.data.code === 200) {
                    this.data = e.data.data.map(item => {
                        item.commentVal = "";
                        item.commentList = [];
                        item.tmp = {
                            c: false, //Cardactive
                            m: false, //Comment
                            b: false, //Progress Bar
                            r: "" //reply
                        };
                        return item;
                    });
                    this.$nextTick(() => {
                        imagesLoaded(document.querySelector(".grid"), () => {
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
        the: _ => {
            return {
                "": _
            };
        }
    }),
    methods: {
        layout() {
            this.$nextTick(() => {
                setTimeout(() => this.msnry.layout(), 0);
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
