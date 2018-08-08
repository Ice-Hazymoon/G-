/*
 * Project: blog
 * File Created: Monday, 6th August 2018 10:12:40 am
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Wednesday, 8th August 2018 12:43:00 pm
 */
<template>
    <div id="categories">
        <div class="title">分类</div>
        <ul>
            <li v-for="(item, index) in data" :key="index">
                <a :href="item.link">
                    <div class="number">{{ item.number > 99 ? '99+' : item.number }}</div>
                    <img class="bg" :src="item.background">
                    <img class="avatar" :src="item.avatar">
                    <div class="name">{{ item.name }}</div>
                    <div class="description">共 {{ item.number }} 篇文章</div>
                </a>
            </li>
        </ul>
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
        this.$http
            .get(api.categories.get)
            .then(e => {
                if (e.data.code === 200) {
                    this.data = e.data.data;
                } else {
                    this.$store.commit(
                        "snackbar",
                        "请求错误, 请稍后重试" + e.data.msg
                    );
                }
                setTimeout(() => {
                    this.$store.commit("setForbidMask", false);
                    this.$store.commit("setGlobalProgress", false);
                }, 1000);
            })
            .catch(err => {
                this.$store.commit("snackbar", "请求错误, 请稍后重试" + err);
            });
        setTimeout(() => {
            this.$store.commit("setForbidMask", false);
            this.$store.commit("setGlobalProgress", false);
        }, 1000);
    },
    activated() {
        if (this.data.length) {
            this.$store.commit("setGlobalProgress", false);
        }
    },
    data: () => ({
        data: []
    })
};
</script>

<style lang="scss">
#categories {
    padding-top: 15px;
    max-width: 1084px;
    margin: 0 auto;
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
        a {
            &:hover {
                text-decoration: none !important;
            }
        }
        li {
            position: relative;
            display: inline-block;
            margin: 12px;
            box-sizing: border-box;
            width: calc(25% - 24px);
            height: 220px;
            list-style: none;
            background-color: #fff;
            border-radius: 3px;
            overflow: hidden;
            box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
            @media (max-width: 1080px) {
                width: calc(50% - 24px);
            }

            @media (max-width: 350px) {
                width: calc(100% - 24px);
            }
        }
        .number {
            position: absolute;
            right: 8px;
            top: 10px;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            color: #fff;
            font-size: 13px;
            text-align: center;
            line-height: 28px;
            background-color: #ff5252;
            pointer-events: none;
        }
        .bg {
            width: 100%;
            height: 95px;
            object-fit: cover;
        }
        .avatar {
            position: absolute;
            top: 72.5px;
            left: 20px;
            width: 45px;
            height: 45px;
            border-radius: 50%;
        }
        .name {
            color: #000;
            margin-top: 27px;
            padding: 0 20px 3px 20px;
            font-size: 16px;
        }
        .description {
            padding: 0 20px 16px 20px;
            font-size: 12px;
            color: rgba(0, 0, 0, 0.54);
        }
    }
}
</style>
