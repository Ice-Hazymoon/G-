/*
 * Project: blog
 * File Created: Wednesday, 1st August 2018 5:08:47 pm
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Thursday, 2nd August 2018 7:04:18 pm
 */
<template>
    <div id="posts">
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

        <md-card v-if="data">
            <md-card-header>
                <md-avatar>
                    <img :src="data.avatar" alt="Avatar">
                </md-avatar>

                <div class="md-title">
                    <span v-text="data.author">Ice-Hazymoon</span>
                    <div class="classN">
                        <md-icon class="md-primary">play_arrow</md-icon>
                        <span v-text="data.className">Love Live!!</span>
                    </div>
                </div>
                <div class="md-subhead" v-text="data.status">管理员</div>

                <div class="date" v-text="handleDate(data.date)">3 分钟</div>
                <div class="toolsbar">
                    <md-button :md-ripple="false" class="md-icon-button md-dense">
                        <md-icon class="open-post">open_in_new</md-icon>
                    </md-button>
                    <md-button :md-ripple="false" class="md-icon-button md-dense">
                        <md-icon>more_vert</md-icon>
                    </md-button>
                </div>
            </md-card-header>

            <md-card-content>
                <div class="title" v-text="data.title">文章标题</div>
                <div class="content" v-text="data.summary">文章摘要</div>
            </md-card-content>

            <md-card-media>
                <img :src="data.cover" alt="Cover">
            </md-card-media>

            <div class="comment-list-open">
                <div class="status">共 {{ data.commentsNum }} 条评论</div>
                <ul>
                    <li v-for="(item, index) in data.comments" :key="index">
                        <div class="avatar">
                            <md-avatar>
                                <img :src="item.avatar" alt="Avatar">
                            </md-avatar>
                        </div>

                        <div class="comment-content">
                            <div class="name" v-text="item.name">Hazymoon</div>
                            <div class="con" v-html="(item.reply ? '<a>@ + ' + item.reply +'</a> ' : '') + item.content">评论内容</div>
                        </div>

                        <div class="date" v-text="handleDate(item.date)">1 小时</div>

                        <md-button class="md-icon-button md-dense" :md-ripple="false" @click="reply(item)">
                            <md-icon>reply</md-icon>
                            <md-tooltip md-direction="bottom">回复</md-tooltip>
                        </md-button>
                    </li>
                </ul>
            </div>

            <div class="comment">
                <div class="t">
                    <md-avatar class="md-small">
                        <img :src="data.avatar" alt="Avatar">
                    </md-avatar>
                    <textarea type="text" :placeholder="data.tmp.r ? '回复给: ' + data.tmp.r : '发表评论...'" @input="autogrow" v-model.trim="commentVal"></textarea>
                </div>
                <div class="m">
                    <md-field>
                        <label>邮箱</label>
                        <md-input v-model="comment.email"></md-input>
                        <md-icon>email</md-icon>
                    </md-field>
                    <md-field>
                        <label>昵称</label>
                        <md-input v-model="comment.nickname"></md-input>
                        <md-icon>person</md-icon>
                    </md-field>
                </div>
                <div class="b">
                    <md-button @click="(add.linkDialog = true) | (add.img = true)" :md-ripple="false" class="md-icon-button">
                        <md-icon>camera_alt</md-icon>
                        <md-tooltip md-direction="bottom">添加图片</md-tooltip>
                    </md-button>
                    <md-button @click="(add.linkDialog = true) | (add.img = false)" :md-ripple="false" class="md-icon-button">
                        <md-icon>link</md-icon>
                        <md-tooltip md-direction="bottom">添加链接</md-tooltip>
                    </md-button>
                    <div class="toolsbar">
                        <md-button @click="cancelReply" v-if="data.tmp.r" class="md-primary cancel">取消回复</md-button>
                        <md-button @click="sendReply(data, $event)" :disabled="commentVal=='' || comment.nickname=='' || comment.email==''" class="submit">发布</md-button>
                    </div>
                </div>
            </div>
        </md-card>
    </div>
</template>

<script>
export default {
    props: ["id"],
    created() {
        this.$http
            .get("http://127.0.0.1:8090/posts/" + this.id)
            .then(e => {
                if (e.data.code === 200) {
                    e.data.data.tmp = {
                        r: "", //replyComtent
                        x: "" //replyId
                    };
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
    data: () => ({
        data: null,
        add: {
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
        },
        commentVal: ""
    }),
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
    methods: {
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
                this.commentVal += a;
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
        reply(item) {
            this.commentVal = "";
            this.data.tmp.x = item.id;
            this.data.tmp.r = item.name;
            document.getElementsByTagName("textarea")[0].focus();
        },
        cancelReply() {
            this.data.tmp.r = "";
            this.data.tmp.x = "";
        },
        sendReply() {
            this.$http
                .post("http://127.0.0.1:8090/comment/" + this.data.id, {
                    content: this.data.tmp.r,
                    name: this.comment.nickname,
                    email: this.comment.email,
                    replyId: this.data.tmp.x
                })
                .then(e => {
                    if (e.data.code === 200) {
                        this.data.comments.unshift(e.data.data);
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
#posts {
    margin: 0 auto;
    max-width: 530px;
    min-height: 1000px;
    margin-bottom: 50px;
}
</style>
