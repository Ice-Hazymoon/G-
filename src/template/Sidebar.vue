/*
 * Project: blog
 * File Created: Tuesday, 24th July 2018 4:10:42 pm
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Tuesday, 7th August 2018 5:19:22 pm
 */
<template>
    <div id="sidebar">
        <md-toolbar class="md-transparent header" md-elevation="0">
            <span class="md-title">Ice-Hazymoon</span>
            <md-button @click="darkTheme" class="md-icon-button">
                <md-icon>brightness_6</md-icon>
            </md-button>
            <md-button @click="switchSidebar" class="md-dense md-icon-button closeDrawer">
                <md-icon>chevron_left</md-icon>
            </md-button>
        </md-toolbar>
        <md-list class="links">
            <md-list-item to="/">
                <md-icon>home</md-icon>
                <span class="md-list-item-text">首页</span>
            </md-list-item>

            <md-list-item to="/archive">
                <md-icon>archive</md-icon>
                <span class="md-list-item-text">归档</span>
            </md-list-item>

            <md-list-item to="/links">
                <md-icon>supervisor_account</md-icon>
                <span class="md-list-item-text">链接</span>
            </md-list-item>

            <md-list-item to="/categories">
                <md-icon>class</md-icon>
                <span class="md-list-item-text">分类</span>
            </md-list-item>

            <md-list-item to="/tags">
                <md-icon>loyalty</md-icon>
                <span class="md-list-item-text">标签</span>
            </md-list-item>
        </md-list>
        <md-list class="info">
            <md-list-item>
                <span class="md-list-item-text">设置</span>
            </md-list-item>

            <md-list-item>
                <span class="md-list-item-text">报告问题</span>
            </md-list-item>

            <md-list-item>
                <span class="md-list-item-text">帮助</span>
            </md-list-item>
        </md-list>

        <div class="copy">
            @2018 Ice-Hazymoon<br/>
            Designed by <a href="https://plus.google.com/">Google Plus</a><br/>
            Theme by <a href="https://imiku.me/">XXX</a><br/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#sidebar {
    .md-list-item-content {
        i {
            margin-right: 22px;
            color: #888888;
        }
    }
    .md-list-item-text {
        color: rgba(0, 0, 0, 0.87);
        font-size: 15px;
    }
    .header {
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
    }
    .closeDrawer {
        position: absolute;
        right: 20px;
        i {
            font-size: 32px !important;
            color: rgb(117, 117, 117);
        }
    }
    .links {
        border-bottom: 1px solid #ddd;
    }
    .info {
        span {
            color: rgba(0, 0, 0, 0.54);
            font-size: 15px;
        }
    }
    .copy {
        position: absolute;
        bottom: 0;
        left: 0;
        margin: 0 0 24px 24px;
        font-size: 13px;
        color: rgba(0, 0, 0, 0.54);
    }
}
@media (min-width: 599px) {
    .header {
        display: none !important;
    }
}
</style>

<script>
export default {
    methods: {
        switchSidebar() {
            this.$store.commit('switchSidebar', false);
        },
        darkTheme() {
            this.$material.theming.theme =
                this.$material.theming.theme === 'default-dark'
                    ? 'default'
                    : 'default-dark';
        }
    }
};
</script>
