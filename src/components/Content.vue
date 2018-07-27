/*
 * Project: blog
 * File Created: Wednesday, 25th July 2018 11:55:37 am
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Friday, 27th July 2018 5:57:49 pm
 */
<template>
    <div id="content">
        <div class="grid">
            <div class="grid-sizer"></div>
            <div class="grid-item">
                <md-card>
                    <md-card-header>
                        <md-avatar>
                            <img src="../assets/images/avatar.jpg" alt="Avatar">
                        </md-avatar>

                        <div class="md-title">
                            <span>Ice-Hazymoon</span>
                        </div>
                        <div class="md-subhead">聆听最初的声音，向往无尽的未来</div>

                        <md-button class="md-icon-button like" :md-ripple="false">
                            <md-icon>favorite_border</md-icon>
                            <md-tooltip md-direction="left">Do you like me?</md-tooltip>
                        </md-button>
                    </md-card-header>
                </md-card>
            </div>

            <div class="grid-item">
                <md-card class="active" @click.native="handleActive">
                    <md-card-header>
                        <md-avatar>
                            <img src="../assets/images/avatar.jpg" alt="Avatar">
                        </md-avatar>

                        <div class="md-title">
                            <span>Ice-Hazymoon</span>
                            <div class="classN">
                                <md-icon class="md-primary">play_arrow</md-icon>
                                <span>Love Live</span>
                            </div>
                        </div>
                        <div class="md-subhead">管理员</div>

                        <div class="date">3 分钟</div>
                        <div class="toolsbar">
                            <md-button class="md-icon-button md-dense">
                                <md-icon>open_in_new</md-icon>
                            </md-button>
                            <md-button class="md-icon-button md-dense">
                                <md-icon>more_vert</md-icon>
                            </md-button>
                        </div>
                    </md-card-header>

                    <md-card-media>
                        <img src="../assets/images/aa.webp" alt="People">
                    </md-card-media>

                    <md-card-content>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.
                    </md-card-content>

                    <md-card-actions>
                        <md-button>Action</md-button>
                        <md-button>Action</md-button>
                    </md-card-actions>
                </md-card>
            </div>

            <div class="grid-item">
                <md-card @click.native="handleActive">
                    <md-card-header>
                        <md-avatar>
                            <img src="../assets/images/avatar.jpg" alt="Avatar">
                        </md-avatar>

                        <div class="md-title">
                            <span>Ice-Hazymoon</span>
                            <div class="classN">
                                <md-icon class="md-primary">play_arrow</md-icon>
                                <span>Love Live</span>
                            </div>
                        </div>

                        <div class="md-subhead">管理员</div>

                        <div class="date">3 分钟</div>
                        <div class="toolsbar">
                            <md-button class="md-icon-button md-dense">
                                <md-icon>open_in_new</md-icon>
                            </md-button>
                            <md-button class="md-icon-button md-dense">
                                <md-icon>more_vert</md-icon>
                            </md-button>
                        </div>
                    </md-card-header>

                    <md-card-content>
                        <div class="content">
                            尽管被微软收购，GitHub 仍然表现出自己是独立运作的公司。周四，GitHub 和 Google Cloud 宣布合作，将使开发者更容易使用到本周 Google Cloud Next 宣布的软件开发工具。<br><br>如果开发者使用 Docker 打包其应用，他们可以在 GitHub 内选择 Google Cloud Build。将来，GitHub 会自动检测文件类型，推荐 Google Cloud Build。<br><br>Google Cloud Build 是一个持续集成服务，自动化软件开发过程，迅速而方便地把新代码加入经过测试的应用里。这种自动化过程可以极大地提升软件分发速度。<br><br>6 月，微软 75 亿美元收购 GitHub，协议在今年晚些时候完成。微软坚持将使 GitHub 作为独立的公司运营。<br><br>
                        </div>
                        <div class="more">
                            <md-button @click.stop="handleMore" class="md-icon-button md-dense md-primary">
                                <md-icon>more_horiz</md-icon>
                            </md-button>
                        </div>
                        <md-divider></md-divider>
                        <div class="title">As it awaits the close of the Microsoft deal, GitHub strikes partnership deal with Google Cloud</div>
                    </md-card-content>

                    <md-card-media>
                        <img src="../assets/images/unnamed.webp" alt="People">
                    </md-card-media>

                    <div class="comment">
                        <div class="t">
                            <md-avatar class="md-small">
                                <img src="../assets/images/avatar.jpg" alt="People">
                            </md-avatar>
                            <input type="text" placeholder="发表评论...">
                        <!-- <div class="placeholder" @click="comment">发表评论...</div> -->
                            <div class="toolsbar">
                                <md-button class="md-icon-button">
                                    <md-icon>plus_one</md-icon>
                                </md-button>
                                <md-button class="md-icon-button">
                                    <md-icon>share</md-icon>
                                </md-button>
                            </div>
                        </div>
                        <div class="b">
                            <md-button class="md-icon-button">
                                <md-icon>camera_alt</md-icon>
                            </md-button>
                            <md-button class="md-icon-button">
                                <md-icon>link</md-icon>
                            </md-button>
                            <div class="toolsbar">
                                <md-button class="md-primary">取消</md-button>
                            </div>
                        </div>
                    </div>

                    <!-- <md-card-actions>
                        <md-button>Action</md-button>
                        <md-button>Action</md-button>
                    </md-card-actions> -->
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

export default {
    data: () => ({
        more: true,
        msnry: null
    }),
    mounted() {
        imagesLoaded(document.querySelector(".grid-item"), () => {
            this.msnry = new Masonry(".grid", {
                percentPosition: true,
                columnWidth: ".grid-sizer",
                itemSelector: ".grid-item",
                // fitWidth: true,
                stagger: 50
            });
        });
    },
    methods: {
        handleMore(e) {
            let el = e.currentTarget.parentNode.previousSibling;
            if (el.classList.contains("showMore")) {
                el.classList.remove("showMore");
            } else {
                el.classList.add("showMore");
            }
            this.$nextTick(() => {
                this.msnry.layout();
            });
        },
        handleActive(e) {
            let el = e.currentTarget;
            if (el.classList.contains("active")) {
                el.classList.remove("active");
            } else {
                el.classList.add("active");
            }
        },
        comment() {}
    }
};
</script>

<style lang="scss">
#content {
    min-height: 1000px;
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
            width: 40px;
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
            margin: 16px;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            line-height: 28px;
            font-size: 21px;
            font-weight: 300;
            color: rgba(0, 0, 0, 0.87);
            overflow: hidden;
            max-height: 56px;
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
            display: flex;
            align-items: center;
            width: 100%;
            height: 48px;
            button {
                i {
                    width: 20px;
                    height: 20px;
                }
            }
            .toolsbar {
                display: inline-block;
                position: absolute;
                right: 16px;
                top: 12px;
            }
        }
        .placeholder {
            display: inline-block;
            margin-left: 16px;
            color: #999;
            font-size: 14px;
            height: 36px;
            line-height: 36px;
        }
        input {
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
