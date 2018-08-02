/*
 * Project: blog
 * File Created: Monday, 30th July 2018 2:26:45 pm
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Thursday, 2nd August 2018 7:01:43 pm
 */
<template>
    <div class="article">
        <md-dialog class="addList" :md-active.sync="add.linkDialog">
            <md-dialog-title>{{ add.img ? '添加图片' : '添加链接' }} <small v-show="add.img"><a target="_blank" href="https://sm.ms">图床</a></small></md-dialog-title>
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

        <article class="grid-item" v-for="(item, index) in data" :key="index" :index="index">
            <md-card @click.native="handleActive(item, $event)" :class="{'active': item.tmp.m}">
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
                        <md-button :md-ripple="false" class="md-icon-button md-dense" @click.stop="$router.push(item.path)">
                            <md-icon class="open-post">open_in_new</md-icon>
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

                <md-progress-bar md-mode="indeterminate" v-show="item.tmp.b"></md-progress-bar>

                <div class="comment-list-open" v-show="item.tmp.m" :index="item.id">
                    <div class="status">共 {{ item.commentsNum }} 条评论</div>
                    <ul>
                        <li v-for="(item2, index2) in item.commentList" :key="index2">
                            <div class="avatar">
                                <md-avatar>
                                    <img :src="item2.avatar" alt="Avatar">
                                </md-avatar>
                            </div>

                            <div class="comment-content">
                                <div class="name" v-text="item2.name">Hazymoon</div>
                                <div class="con" v-html="(item2.reply ? '<a>@ + ' + item2.reply +'</a> ' : '') + item2.content">评论内容</div>
                            </div>

                            <div class="date" v-text="handleDate(item2.date)">1 小时</div>

                            <md-button class="md-icon-button md-dense" :md-ripple="false" @click.stop="reply(item, item2, index, $event)">
                                <md-icon>reply</md-icon>
                                <md-tooltip md-direction="bottom">回复</md-tooltip>
                            </md-button>
                        </li>
                    </ul>
                </div>

                <div class="comment-list" v-show="!item.tmp.m">
                    <div class="status">显示所有评论（共 {{ item.commentsNum }} 条）</div>
                    <ul tabindex="0">
                        <li v-if="index2<3" v-for="(item2, index2) in item.comments" :key="index2" v-html="'<b>' + item2.name + '</b>' + ' : ' + (item2.reply ? '<a>@ + ' + item2.reply +'</a> ' : '') + item2.content">评论内容</li>
                    </ul>
                </div>

                <div class="comment">
                    <div class="t">
                        <md-avatar class="md-small">
                            <img :src="item.avatar" alt="Avatar">
                        </md-avatar>
                        <textarea v-show="item.tmp.c" type="text" :placeholder="item.tmp.r ? '回复给: ' + item.tmp.r : '发表评论...'" @input="autogrow" v-model.trim="item.commentVal" @click.stop></textarea>
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
                    <div class="m" v-show="item.tmp.c">
                        <md-field>
                            <label>邮箱</label>
                            <md-input @click.stop v-model="comment.email"></md-input>
                            <md-icon>email</md-icon>
                        </md-field>
                        <md-field>
                            <label>昵称</label>
                            <md-input @click.stop v-model="comment.nickname"></md-input>
                            <md-icon>person</md-icon>
                        </md-field>
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
                            <md-button @click.stop="cancelReply(item)" class="md-primary cancel">{{ item.tmp.r ? '取消回复' : '取消' }}</md-button>
                            <md-button @click.stop="sendReply(item, $event)" :disabled="item.commentVal=='' || comment.nickname=='' || comment.email==''" class="submit">发布</md-button>
                        </div>
                    </div>
                </div>
            </md-card>
        </article>
    </div>
</template>

<script>
import imagesLoaded from "imagesloaded";

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
        },
        comment: {
            email: "",
            nickname: ""
        }
    }),
    methods: {
        handleActive(item) {
            if (item.commentList.length) {
                item.tmp.m = !item.tmp.m;
                this.layout();
                return false;
            }
            item.tmp.b = true;
            item.commentList = item.comments;
            item.tmp.m = !item.tmp.m;
            this.$nextTick(() => {
                imagesLoaded(
                    document.querySelector('[index="' + item.id + '"]'),
                    () => {
                        item.tmp.b = false;
                        this.$nextTick(() => {
                            this.layout();
                        });
                    }
                );
                this.layout();
            });
        },
        layout() {
            this.$emit("layout");
        },
        focus(e) {
            this.$nextTick(() => {
                setTimeout(
                    () => e.path[1].querySelector("textarea").focus(),
                    0
                );
            });
        },
        handleDate: require("../fun.js").handleDate,
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
        },
        autogrow(e) {
            let o = e.target;
            o.style.height = 0;
            o.style.height = o.scrollTop + o.scrollHeight + "px";
        },
        reply(item, item2, index) {
            item.commentVal = "";
            this.data[index].tmp.c = true;
            item.tmp.x = item2.id;
            item.tmp.r = item2.name;
            this.$nextTick(() => {
                document
                    .querySelector('[index="' + index + '"] textarea')
                    .focus();
                this.layout();
            });
        },
        cancelReply(item) {
            item.tmp.r = "";
            item.tmp.x = "";
            item.tmp.c = false;
            this.$emit("layout");
        },
        sendReply(item) {
            this.$http
                .post("http://127.0.0.1:8090/comment/" + item.id, {
                    content: item.tmp.r,
                    name: this.comment.nickname,
                    email: this.comment.email,
                    replyId: item.tmp.x
                })
                .then(e => {
                    if (e.data.code === 200) {
                        console.log(e);
                        item.comments.unshift(e.data.data);
                        this.$store.commit("snackbar", "评论提交成功");
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
    }
};
</script>

<style lang="scss">
.grid-item {
    .md-progress-bar {
        position: absolute;
        width: 100%;
        height: 5px;
    }
    .comment {
        .t {
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
    }
    .comment {
        position: relative;
        background-color: #fafafa;
        .placeholder {
            display: inline-block;
            width: 200px;
            margin-left: 16px;
            color: #999;
            font-size: 14px;
            height: 36px;
            line-height: 36px;
        }
    }
}
</style>
