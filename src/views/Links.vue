/*
 * Project: blog
 * File Created: Wednesday, 1st August 2018 4:59:07 pm
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Tuesday, 7th August 2018 6:36:55 pm
 */
<template>
    <div id="links">
        <div v-for="(item, index) in data" :key="index">
            <div class="title">{{ item.title }}</div>
            <ul>
                <li v-for="(item2, index2) in item.list" :key="index2">
                    <img :src="item2.avatar" alt="" class="avatar">
                    <div class="name">{{ item2.name }}</div>
                    <div class="description">{{ item2.description }}</div>
                    <div class="h"></div>
                    <md-button target="_blank" :href="item2.link"  class="md-primary">访问</md-button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import api from "../../config/config.js";
export default {
    beforeRouteLeave(to, from, next) {
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
    created() {
        this.$store.commit("setForbidMask", true); // 打开遮罩
        setTimeout(() => {
            this.$store.commit("setForbidMask", false);
            this.$store.commit("setGlobalProgress", false);
        }, 1000);
        this.$http
            .get(api.links.get)
            .then(e => {
                if (e.data.code === 200) {
                    this.data = e.data.data;
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
    activated() {
        // if (true) {
        this.$store.commit("setGlobalProgress", false);
        // }
    },
    data: () => ({
        data: []
    })
};
</script>

<style lang="scss">
#links {
    padding-top: 15px;
    max-width: 1084px;
    .title {
        color: rgba(0, 0, 0, 0.54);
        font-size: 17px;
        padding: 0 12px;
        margin-bottom: 10px;
    }
    ul {
        margin: 0;
        margin-bottom: 25px;
        padding: 0;
        li {
            position: relative;
            list-style: none;
            padding: 0 16px;
            background-color: #fff;
            box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
            margin: 12px;
            box-sizing: border-box;
            width: calc(25% - 24px);
            height: 280px;
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .avatar {
            border-radius: 50%;
            width: 90px;
            height: 90px;
            margin: 24px auto 12px;
        }
        .name {
            font-size: 17px;
        }
        .h {
            height: 80px;
        }
        .description {
            width: 100%;
            margin-top: 10px;
            font-size: 15px;
            color: rgba(0, 0, 0, 0.54);
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        a {
            position: absolute;
            bottom: 8px;
            box-sizing: border-box;
            left: -8px;
            right: 0;
            width: 100%;
        }
    }
}

@media (max-width: 1080px) {
    #links {
        ul > li {
            width: calc(50% - 24px);
        }
    }
}

@media (max-width: 400px) {
    #links {
        ul > li {
            width: calc(100% - 24px);
        }
    }
}
</style>
