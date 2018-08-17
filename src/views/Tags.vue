/*
 * Project: blog
 * File Created: Monday, 6th August 2018 10:13:34 am
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Thursday, 9th August 2018 2:28:18 pm
 */
<template>
    <div id="tags">
        <div class="title">标签</div>
        <ul>
            <li v-for="(item, index) in data" :key="index">
                <router-link :to="item.path"><md-chip class="md-primary" md-clickable>{{ item.name }}</md-chip></router-link>

            </li>
        </ul>
    </div>
</template>

<script>
import api from '../../config/config.js';
export default {
    beforeRouteLeave(to, from, next) {
        document.querySelector('.md-content > div').classList.add('r-b');
        setTimeout(() => {
            setTimeout(() => {
                document
                    .querySelector('.md-content > div')
                    .classList.remove('r-b');
            }, 500);
            next();
        }, 500);
    },
    created() {
        this.$http
            .get(api.tags.get)
            .then(e => {
                if (e.data.code === 200) {
                    this.data = e.data.data;
                } else {
                    this.$store.commit(
                        'snackbar',
                        '请求错误, 请稍后重试' + e.data.msg
                    );
                }
                setTimeout(() => {
                    this.$store.commit('setGlobalProgress', false);
                }, 1000);
            })
            .catch(err => {
                this.$store.commit('snackbar', '请求错误, 请稍后重试' + err);
            });
    },
    activated() {
        if (this.data.length) {
            this.$store.commit('setGlobalProgress', false);
        }
    },
    data: () => ({
        data: []
    })
};
</script>

<style lang="scss">
#tags {
    padding-top: 15px;
    max-width: 1084px;
    margin: 0 auto;
    min-height: 500px;
    .title {
        color: rgba(0, 0, 0, 0.54);
        font-size: 17px;
        padding: 0 12px;
        margin-bottom: 10px;
    }
    ul {
        margin: 0;
        padding: 0 10px;
        li {
            list-style: none;
            display: inline-block;
            margin: 5px 3px;
        }
        a {
            transition: all 0.3s ease;
            &:hover {
                text-decoration: none;
            }
        }
    }
}
</style>
