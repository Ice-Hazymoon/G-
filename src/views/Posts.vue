/*
 * Project: blog
 * File Created: Wednesday, 1st August 2018 5:08:47 pm
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Wednesday, 8th August 2018 10:05:16 am
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

        <!-- owo -->
        <md-dialog class="owo" :md-active.sync="owoDialog">
            <md-dialog-title>添加表情</md-dialog-title>
            <md-dialog-content class="md-scrollbar">
                <md-tabs md-alignment="fixed">
                    <md-tab :md-label="index" v-for="(item, index) in owoData" :key="index">
                        <div @click="addOwo(item.name, item2)" class="owobtn" :title="item2.text" v-for="(item2, index2) in item.container" :key="index2" v-html="item2.icon"></div>
                    </md-tab>
                </md-tabs>
            </md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary" @click="owoDialog = false">Close</md-button>
            </md-dialog-actions>
        </md-dialog>

        <md-card v-if="data">
            <md-card-header>
                <md-avatar>
                    <img :src="data.avatar" alt="Avatar">
                </md-avatar>

                <div class="md-title">
                    <span>{{ data.author }}</span>
                    <div class="classN">
                        <md-icon class="md-primary">play_arrow</md-icon>
                        <span>{{ data.className }}</span>
                    </div>
                </div>
                <div class="md-subhead">{{ data.status }}</div>

                <div class="r">
                    <div class="date">{{ dateFormat(data.date, 'yyyy年MM月dd日') }}</div>
                    <div class="toolsbar">
                        <md-menu :md-offset-x="5" :md-offset-y="10">
                            <md-button :md-ripple="false" class="md-icon-button md-dense" md-menu-trigger>
                                <md-icon>devices</md-icon>
                                <md-tooltip md-direction="bottom">二维码</md-tooltip>
                            </md-button>
                            <md-menu-content class="qrcode">
                                <span>在其它设备中阅读本文章</span>
                                <img :src="'https://api.imjad.cn/qrcode/?encode=raw&size=180&text=' + data.url" alt="">
                            </md-menu-content>
                        </md-menu>
                    </div>
                </div>
            </md-card-header>

            <md-card-content>
                <div class="title">{{ data.title }}</div>
                <!-- <div class="content neko-typo" id="lightgallery">{{ data.summary }}</div> -->
                <div class="content neko-typo" id="lightgallery">
                    <h3>中文文章排版实例：论语学而篇第一</h3>
                    <p>
                        <small><b>作者：</b><abbr title="名丘，字仲尼">孔子</abbr>（
                        <time>前551年9月28日－前479年4月11日</time>
                        ）
                        </small>
                    </p>
                    <div data-sub-html=".caption" class="lightgallery" data-src="https://myblogpic.b0.upaiyun.com/2018/04/2018040713220825.jpg">
                        <img src="https://myblogpic.b0.upaiyun.com/2018/04/2018040713220825.jpg" alt="巡音露卡">
                        <div class="caption">
                            <h4>巡音露卡</h4><p>嘎嘎嘎</p>
                        </div>
                    </div>
                    <h4>本篇引语</h4>
                    <p>《学而》是《论语》第一篇的篇名。《论语》中各篇一般都是以第一章的前二三个字作为该篇的篇名。《学而》一篇包括16章，内容涉及诸多方面。其中重点是「吾日三省吾身」；「节用而爱人，使民以时」；「礼之用，和为贵」以及仁、孝、信等道德范畴。 </p>
                    <h4>原文</h4>
                    <p>子曰：「学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知，而不愠，不亦君子乎？」 </p>
                    <h4>译文</h4>
                    <div data-sub-html=".caption" class="lightgallery" data-src="https://myblogpic.b0.upaiyun.com/2018/07/201807050308486.jpg">
                        <img src="https://myblogpic.b0.upaiyun.com/2018/07/201807050308486.jpg" alt="镜音双子">
                        <div class="caption">
                            <h4>镜音双子</h4><p>汪汪汪</p>
                        </div>
                    </div>
                    <p>孔子说：「学了又时常温习和练习，不是很愉快吗？有志同道合的人从远方来，不是很令人高兴的吗？人家不了解我，我也不怨恨、恼怒，不也是一个有德的君子吗？」 </p>
                    <h4>评析</h4>
                    <p>宋代著名学者<u>朱熹</u>对此章评价极高，说它是「入道之门，积德之基」。本章这三句话是人们非常熟悉的。历来的解释都是：学了以后，又时常温习和练习，不也高兴吗等等。三句话，一句一个意思，前后句子也没有什么连贯性。但也有人认为这样解释不符合原义，指出这里的「学」不是指学习，而是指学说或主张；「时」不能解为时常，而是时代或社会的意思，「习」不是温习，而是使用，引申为采用。而且，这三句话不是孤立的，而是前后相互连贯的。这三句的意思是：自己的学说，要是被社会采用了，那就太高兴了；退一步说，要是没有被社会所采用，可是很多朋友赞同<abbr title="张燕婴">我</abbr>的学说，纷纷到我这里来讨论问题，我也感到快乐；再退一步说，即使社会不采用，人们也不理解我，我也不怨恨，这样做，不也就是君子吗？（见《齐鲁学刊》1986年第6期文）这种解释可以自圆其说，而且也有一定的道理，供读者在理解本章内容时参考。</p>
                    <p>此外，在对「人不知，而不愠」一句的解释中，也有人认为，「人不知」的后面没有宾语，人家不知道什么呢？当时因为孔子有说话的特定环境，他不需要说出知道什么，别人就可以理解了，却给后人留下一个谜。有人说，这一句是接上一句说的，从远方来的朋友向我求教，我告诉他，他还不懂，我却不怨恨。这样，「人不知」就是「人家不知道我所讲述的」了。这样的解释似乎有些牵强。</p>
                    <p>总之，本章提出以学习为乐事，做到人不知而不愠，反映出孔子学而不厌、诲人不倦、注重修养、严格要求自己的主张。这些思想主张在《论语》书中多处可见，有助于对第一章内容的深入了解。</p>
                    <div data-sub-html=".caption" class="lightgallery" data-src="https://myblogpic.b0.upaiyun.com/2018/07/2018070516124833.jpg">
                        <img src="https://myblogpic.b0.upaiyun.com/2018/07/2018070516124833.jpg" alt="初音未来">
                        <div class="caption">
                            <h4>初音未来</h4><p>喵喵喵</p>
                        </div>
                    </div>
                </div>
            </md-card-content>

            <!-- <md-card-media>
                <img :src="data.cover" alt="Cover">
            </md-card-media> -->

            <md-card-actions>
                <md-button class="md-icon-button" @click="focus">
                    <md-icon>message</md-icon>
                </md-button>

                <span>{{ data.commentsNum }}</span>

                <md-button class="md-icon-button" @click="likeArticles" :class="{'liked': data.isLike}">
                    <md-icon>plus_one</md-icon>
                </md-button>

                <span>{{ data.like }}</span>

                <md-menu  :md-offset-x="5" :md-offset-y="10">
                    <md-button class="md-icon-button" md-menu-trigger>
                        <md-icon>share</md-icon>
                    </md-button>
                    <md-menu-content>
                        <md-menu-item target="_blank" :href="shareUrl.weibo + 'appkey=&searchPic=false&style=simple&title=' + data.title + '&url=' + data.url">
                            <span>分享到 微博</span>
                        </md-menu-item>

                        <md-menu-item target="_blank" :href="shareUrl.twitter + 'via=Ice-Hazymoon&url=' + data.url + '&text=' + data.title">
                            <span>分享到 Twitter</span>
                        </md-menu-item>

                        <md-menu-item target="_blank" :href="shareUrl.qq + 'site=Ice-Hazymoon%20blog&url=' + data.url + '&pics=' + data.cover + '&summary=' + data.summary + '&title' + data.title">
                            <span>分享到 QQ</span>
                        </md-menu-item>

                        <md-menu-item target="_blank" :href="shareUrl.google_plus + 'url=' + data.url">
                            <span>分享到 Google+</span>
                        </md-menu-item>

                        <md-menu-item target="_blank" :href="shareUrl.telegram + 'url=' + data.url">
                            <span>分享到 Telegram</span>
                        </md-menu-item>
                    </md-menu-content>
                </md-menu>
            </md-card-actions>

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
                            <div class="name">{{ item.name }}</div>
                            <div class="con" v-html="(item.reply ? '<a>@ + ' + item.reply +'</a> ' : '') + item.content">评论内容</div>
                        </div>

                        <div class="date">{{ handleDate(item.date) }}</div>

                        <md-button class="md-icon-button md-dense" :md-ripple="false" @click="reply(item)">
                            <md-icon>reply</md-icon>
                            <md-tooltip v-if="!isMobile" md-direction="bottom">回复</md-tooltip>
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
                        <md-input v-model.trim="comment.email"></md-input>
                        <md-icon>email</md-icon>
                    </md-field>
                    <md-field>
                        <label>昵称</label>
                        <md-input v-model.trim="comment.nickname"></md-input>
                        <md-icon>person</md-icon>
                    </md-field>
                </div>
                <div class="b">
                    <md-button @click="(add.linkDialog = true) | (add.img = true)" :md-ripple="false" class="md-icon-button">
                        <md-icon>camera_alt</md-icon>
                        <md-tooltip v-if="!isMobile" md-direction="bottom">添加图片</md-tooltip>
                    </md-button>
                    <md-button @click="(add.linkDialog = true) | (add.img = false)" :md-ripple="false" class="md-icon-button">
                        <md-icon>link</md-icon>
                        <md-tooltip v-if="!isMobile" md-direction="bottom">添加链接</md-tooltip>
                    </md-button>
                    <md-button @click="owoDialog = true" class="md-icon-button" md-menu-trigger>
                        <md-tooltip v-if="!isMobile" md-direction="bottom">添加表情</md-tooltip>
                        <md-icon>mood</md-icon>
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
import "lightgallery.js/dist/css/lightgallery.min.css";
import api from "../../config/config.js";
export default {
    props: ["id"],
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
        this.getOwoData();
        this.$http
            .get(api.posts.get + this.id)
            .then(e => {
                if (e.data.code === 200) {
                    e.data.data.tmp = {
                        r: "", //replyComtent
                        x: "" //replyId
                    };
                    this.data = e.data.data;
                    this.$nextTick(this.handleLightGallery);
                    setTimeout(() => {
                        this.$store.commit("setGlobalProgress", false);
                        this.$store.commit("setForbidMask", false);
                    }, 500);
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
        owoData: {},
        comment: {
            email: "",
            nickname: ""
        },
        commentVal: "",
        owoDialog: false
    }),
    methods: {
        handleDate: require("../fun.js").default.handleDate,
        dateFormat: require("../fun.js").default.dateFormat,
        focus() {
            document.getElementsByTagName("textarea")[0].focus();
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
                .post(api.comment.post + this.data.id, {
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
        },
        likeArticles() {
            if (this.data.isLike) return false;
            this.$http
                .post(api.like.post, {
                    id: this.data.id
                })
                .then(e => {
                    if (e.data.code === 200) {
                        this.data.isLike = true;
                        this.data.like = e.data.likeNum;
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
        getOwoData() {
            this.$http
                .get(api.owo.get)
                .then(e => {
                    if (e.data.code === 200) {
                        this.owoData = e.data.data;
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
        handleLightGallery() {
            require(["lightgallery.js"], () => {
                require(["lg-zoom.js", "lg-fullscreen.js"], () => {
                    window.lightGallery(
                        document.getElementById("lightgallery"),
                        {
                            loop: false,
                            slideEndAnimatoin: true,
                            hideControlOnEnd: true,
                            subHtmlSelectorRelative: true,
                            selector: ".lightgallery"
                        }
                    );
                });
            });
        },
        addOwo(name, item) {
            if (name === "emoticon") {
                this.commentVal += item.icon;
            }
            if (name === "alu") {
                this.commentVal += "@(" + item.text + ")";
            }
            if (name === "paopao") {
                this.commentVal += "@[" + item.text + "]";
            }
            this.owoDialog = false;
        }
    },
    computed: {
        shareUrl() {
            return {
                weibo: "http://service.weibo.com/share/share.php?",
                twitter: "https://twitter.com/intent/tweet?",
                qq: "http://connect.qq.com/widget/shareqq/index.html?",
                telegram: "https://telegram.me/share/url?",
                google_plus: "https://plus.google.com/share?"
            };
        },
        getUrl() {
            return window.location.href;
        },
        isMobile() {
            return window.innerWidth < 650;
        }
    }
};
</script>

<style lang="scss">
@media (max-width: 599px) {
    #posts {
        .md-card {
            box-shadow: none !important;
        }
        .md-card-header {
            .r {
                .toolsbar {
                    display: none !important;
                }
            }
        }
        .md-card {
            margin: 0 !important;
        }
    }
    .md-content {
        padding-top: 55px !important;
    }
}
#posts {
    margin: 0 auto;
    max-width: 530px;
    min-height: 1000px;
    margin-bottom: 50px;
    .md-card {
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
    }
    .md-card-header {
        .date,
        .toolsbar {
            display: inline-flex;
        }
        .toolsbar {
            width: 40px;
            margin-left: 10px;
        }
    }
    .md-card-content .content {
        max-height: none;
        -webkit-line-clamp: inherit;
        text-overflow: inherit;
        display: block;
        overflow: auto;
        .caption {
            display: none;
        }
    }
    .md-card-actions {
        .liked {
            background-color: #ff5252;
            i {
                color: #ffffff;
            }
            &:hover {
                box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.26);
                background-color: #ff3333;
            }
        }
        span {
            margin-right: 6px;
        }
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
            i {
                color: #757575;
                font-size: 18px !important;
            }
        }
    }
    .comment,
    .comment-list-open {
        background-color: #fff;
    }
}
</style>
