/*
 * Project: blog
 * File Created: Wednesday, 25th July 2018 10:35:36 am
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Saturday, 4th August 2018 1:29:46 pm
 */
<template>
    <div id="appbar" class="md-elevation-2">
        <md-button class="md-icon-button" @click="switchSidebar">
            <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title title">Ice-Hazymoon</span>
        <div class="hr"></div>
        <div class="sub-title md-title">首页</div>
        <div class="search">
            <md-icon>search</md-icon>
            <input @focus="showRi = true" type="text" @blur="showRi = false" placeholder="搜索文章" v-model="searchVal">
            <div class="removeInput" v-show="showRi" @mousedown="searchVal = ''">
                <md-icon>close</md-icon>
            </div>
        </div>
        <div class="end">
            <md-button class="md-icon-button _search">
                <md-icon>search</md-icon>
            </md-button>
            <md-button class="md-icon-button apps" @click="darkTheme">
                <md-icon>brightness_6</md-icon>
            </md-button>
            <md-button href="http://github.com/Ice-Hazymoon" target="_blank" class="md-icon-button github">
                <md-icon md-src="/icon/icon-github.svg"/>
            </md-button>
            <md-avatar class="avatar">
                <img src="http://imiku.me/avatar.jpg" alt="Avatar">
            </md-avatar>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        searchVal: "",
        showRi: false,
        countries: [
            "Algeria",
            "Argentina",
            "Brazil",
            "Canada",
            "Italy",
            "Japan",
            "United Kingdom",
            "United States"
        ]
    }),
    methods: {
        switchSidebar() {
            this.$store.commit(
                "switchSidebar",
                !this.$store.state.drawerVisible
            );
        },
        removeInput() {
            this.searchVal = "";
        },
        darkTheme() {
            this.$material.theming.theme =
                this.$material.theming.theme === "default-dark"
                    ? "default"
                    : "default-dark";
        }
    }
};
</script>

<style lang="scss">
#appbar {
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 64px;
    background-color: #fff;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    .title {
        color: #757575;
        font-size: 24px;
    }
    .sub-title {
        color: #757575;
    }
    .hr {
        margin: 0 24px;
        width: 1px;
        height: 35px;
        background-color: #e0e0e0;
    }
    ._search {
        display: none;
    }
    .search {
        max-width: 720px;
        position: relative;
        display: flex;
        flex: auto;
        align-items: center;
        padding-left: 10px;
        box-sizing: border-box;
        flex-grow: 100;
        // width: 100%;
        // max-width: 720px;
        height: 48px;
        margin-left: 24px;
        background-color: #e5e5e5;
        border-radius: 4px;
        i {
            font-size: 24px;
            margin: 0;
        }
        input {
            width: calc(100% - 100px);
            margin-left: 16px;
            font-size: 17px;
            background-color: transparent;
            outline: none;
            border: none;
            &::placeholder {
                color: #a9a9a9;
            }
        }
        .removeInput {
            position: absolute;
            right: 24px;
            cursor: pointer;
        }
    }
    .end {
        // position: absolute;
        margin-left: 85px;
        margin-right: 30px;
        display: flex;
        flex-grow: 1;
        justify-content: flex-end;
        align-items: center;
        i {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        svg {
            width: 20px;
            height: 20px;
        }
        .avatar {
            min-width: auto;
            width: 32px !important;
            height: 32px !important;
            margin: 0 0 0 10px;
        }
    }
}
@media (max-width: 800px) {
    #appbar {
        height: 55px;
    }
    .apps,
    .github,
    .search,
    .hr,
    .sub-title {
        display: none !important;
    }
    .end {
        right: 16px !important;
    }
    ._search {
        display: block !important;
    }
}
</style>
