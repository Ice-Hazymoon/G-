/*
 * Project: blog
 * File Created: Monday, 30th July 2018 2:26:45 pm
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Monday, 30th July 2018 4:14:08 pm
 */
<template>
    <div class="article">
        <md-dialog class="addList" :md-active.sync="add.linkDialog">
            <md-dialog-title>{{ add.img ? '添加图片' : '添加链接' }}</md-dialog-title>
            <md-dialog-content>
                <md-field md-clearable>
                    <label>{{ add.img ? '图片名称' : '链接名称' }}</label>
                    <md-input v-model.trim="add.link.linkName"></md-input>
                </md-field>
                <md-field md-clearable>
                    <label>{{ add.img ? '图片地址' : '链接地址' }}</label>
                    <md-textarea v-model.trim="add.link.linkAddress" md-autogrow md-counter="200"></md-textarea>
                </md-field>
            </md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-primary" @click="add.linkDialog = false">Close</md-button>
                <md-button class="md-primary" @click="addlink">OK</md-button>
            </md-dialog-actions>
        </md-dialog>

        <article class="grid-item" v-for="(item, index) in data" :key="index">
            <md-card @click.native="handleActive">
                <md-card-header>
                    <md-avatar>
                        <img :src="item.avatar" alt="Avatar">
                    </md-avatar>

                    <div class="md-title">
                        <span v-text="item.author">Ice-Hazymoon</span>
                        <div class="classN">
                            <md-icon class="md-primary">play_arrow</md-icon>
                            <span v-text="item.className">Love Live!!</span>
                        </div>
                    </div>
                    <div class="md-subhead" v-text="item.status">管理员</div>

                    <div class="date" v-text="handleDate(item.date)">3 分钟</div>
                    <div class="toolsbar">
                        <md-button @click.stop :md-ripple="false" class="md-icon-button md-dense">
                            <md-icon>open_in_new</md-icon>
                        </md-button>
                        <md-button @click.stop :md-ripple="false" class="md-icon-button md-dense">
                            <md-icon>more_vert</md-icon>
                        </md-button>
                    </div>
                </md-card-header>

                <md-card-content>
                    <div class="title" v-text="item.title">文章标题</div>
                    <div class="content" v-text="item.summary">文章摘要</div>
                </md-card-content>

                <md-card-media>
                    <img :src="item.cover" alt="Cover">
                </md-card-media>

                <div class="comment-list">
                    <ul tabindex="0">
                        <li class="show-more">显示所有评论（共 4 条）</li>
                        <li>神楽坂玲奈（zh99998）: 摸摸..</li>
                        <li>SASHIHARA WONG (AKIRAMENAI): 默默支持</li>
                        <li>咩唔栗栗子: 路漫漫其修远兮…</li>
                    </ul>
                </div>

                <div class="comment">
                    <div class="t">
                        <md-avatar class="md-small">
                            <img :src="item.avatar" alt="Avatar">
                        </md-avatar>
                        <input v-show="item.tmp.c" type="text" placeholder="发表评论..." v-model.trim="item.commentVal" @click.stop>
                        <div v-show="!item.tmp.c" class="placeholder" @click.stop="item.tmp.c = true | layout() | focus($event)" tabindex="1">发表评论...</div>
                        <div class="toolsbar" v-show="!item.tmp.c">
                            <md-button @click.stop :md-ripple="false" class="md-icon-button">
                                <md-icon>plus_one</md-icon>
                            </md-button>
                            <md-button @click.stop :md-ripple="false" class="md-icon-button">
                                <md-icon>share</md-icon>
                            </md-button>
                        </div>
                    </div>
                    <div class="b" v-show="item.tmp.c">
                        <md-button @click.stop="(add.linkDialog = true) | (add.index = index) | (add.img = true)" :md-ripple="false" class="md-icon-button">
                            <md-icon>camera_alt</md-icon>
                            <md-tooltip md-direction="bottom">添加图片</md-tooltip>
                        </md-button>
                        <md-button @click.stop="(add.linkDialog = true) | (add.index = index) | (add.img = false)" :md-ripple="false" class="md-icon-button">
                            <md-icon>link</md-icon>
                            <md-tooltip md-direction="bottom">添加链接</md-tooltip>
                        </md-button>
                        <div class="toolsbar">
                            <md-button @click.stop="item.tmp.c = false | $emit('layout')" class="md-primary cancel">取消</md-button>
                            <md-button @click.stop :disabled="item.commentVal =='' " class="submit">发布</md-button>
                        </div>
                    </div>
                </div>
            </md-card>
        </article>
    </div>
</template>

<script>
export default {
    props: ["data"],
    data: () => ({
        add: {
            index: 0,
            img: true,
            link: {
                linkName: "",
                linkAddress: ""
            },
            linkDialog: false
        }
    }),
    methods: {
        toggleClass: require("../fun.js").toggleClass,
        handleActive(e) {
            this.toggleClass(e.currentTarget, "active");
        },
        layout() {
            this.$emit("layout");
        },
        focus(e) {
            this.$nextTick(() => {
                setTimeout(() => e.path[1].querySelector("input").focus(), 0);
            });
        },
        handleDate(date) {
            let [t, d] = [new Date().getTime(), new Date(date).getTime()];
            let e = (t - d) / 86400000;
            if (e <= 1) return "今天";
            if (e > 1 && e <= 7) return (e / 1).toFixed(0) + "天";
            if (e > 7 && e <= 30) return (e / 30).toFixed(0) + "周";
            if (e > 30 && e <= 365) return (e / 30).toFixed(0) + "月";
            if (e > 365) return (e / 365).toFixed(0) + "年";
        },
        addlink() {
            if (this.add.link.linkName && this.add.link.linkAddress) {
                let a = this.add.img
                    ? '<img src="' +
                      this.add.link.linkAddress +
                      '" alt="' +
                      this.add.link.linkName +
                      '" title="' +
                      this.add.link.linkName +
                      '">'
                    : '<a href="' +
                      this.add.link.linkAddress +
                      '" title="' +
                      this.add.link.linkName +
                      '" alt="' +
                      this.add.link.linkName +
                      '"></a>';
                this.data[this.add.index].commentVal += a;
                this.add.link = {
                    linkName: "",
                    linkAddress: ""
                };
                this.add.linkDialog = false;
            } else {
                this.$store.commit("snackbar", "请输入正确的信息");
            }
        }
    }
};
</script>

<style lang="scss">
.grid-item {
    .md-card {
        margin: 0 12px !important;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
        transition: box-shadow 0.2s ease;
    }
    .md-card-header {
        margin-bottom: 0;
        .classN {
            display: inline-block;
            i {
                font-size: 15px !important;
                line-height: 24px;
            }
            span {
                color: #448aff;
            }
        }
        .like {
            position: absolute;
            top: 16px;
            right: 16px;
        }
        .date {
            position: absolute;
            height: 40px;
            right: 16px;
            top: 16px;
            line-height: 40px;
            color: #9e9e9e;
            font-size: 13px;
        }
        .toolsbar {
            position: absolute;
            width: 80px;
            height: 40px;
            right: 16px;
            top: 16px;
            display: flex;
            align-items: center;
            display: none;
        }
        &:hover {
            .date {
                display: none;
            }
            .toolsbar {
                display: flex;
            }
        }
    }
    .md-card-content {
        .showMore {
            max-height: 180px;
            overflow: hidden;
            -webkit-line-clamp: 5;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
        }
        .more {
            display: flex;
            justify-content: flex-end;
            position: relative;
            margin-bottom: 15px;
            i {
                color: #4285f4;
                font-size: 34px;
                margin: 0;
            }
        }
        .title {
            margin-bottom: 15px;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.87);
        }
    }
    .comment-list {
        background-color: #fafafa;
        overflow: hidden;
        border-top: 1px solid #ebebeb;
        padding-top: 12px;
        ul {
            margin: 12px 8px 0;
            padding: 0;
            li {
                margin: 8px;
                padding: 0;
                list-style: none;
                overflow: hidden;
                text-overflow: ellipsis;
                font-weight: 500;
                &.show-more {
                    color: #448aff;
                }
            }
        }
    }
    .comment {
        position: relative;
        background-color: #fafafa;
        .t {
            padding: 12px 16px;
            .toolsbar {
                display: inline-block;
                position: absolute;
                right: 16px;
                top: 12px;
                button {
                    margin: 0 8px;
                    min-width: 36px;
                    width: 36px;
                    height: 36px;
                    background-color: #eeeeee;
                    &:hover {
                        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.26);
                        background-color: #fff;
                    }
                }
                i {
                    color: #000;
                    font-size: 18px !important;
                }
            }
        }
        .b {
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
            height: 48px;
            .toolsbar {
                display: inline-block;
                position: absolute;
                right: 16px;
            }
            .cancel {
                margin-right: 0;
            }
        }
        .placeholder {
            display: inline-block;
            width: 200px;
            margin-left: 16px;
            color: #999;
            font-size: 14px;
            height: 36px;
            line-height: 36px;
        }
        input {
            width: calc(100% - 56px);
            height: 36px;
            margin-left: 16px;
            font-size: 15px;
            outline: none;
            background-color: transparent;
            border: none;
            box-shadow: none;
        }
    }
}
</style>
