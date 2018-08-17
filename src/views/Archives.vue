/*
 * Project: blog
 * File Created: Monday, 6th August 2018 10:23:17 am
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Thursday, 9th August 2018 2:30:28 pm
 */
<template>
    <div id="archives">
        <div class="container">
            <h1 class="project-name">TIMELINE</h1>
            <div id="timeline">
                <div class="timeline-item" v-for="(item, index) in data" :key="index">
                    <div class="timeline-icon">
                        <md-icon>star</md-icon>
                    </div>
                    <div class="timeline-content md-elevation-3" :class="{'right': index%2!==0}">
                        <h2>{{ item.title }}</h2>
                        <p>{{ item.summary }}</p>
                        <router-link :to="item.path" class="btn">查看更多</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="load-more" :style="{'visibility': !reachBottom ? 'hidden' : ''}">
            <md-progress-spinner :md-diameter="35" :md-stroke="5" md-mode="indeterminate"></md-progress-spinner>
        </div>
    </div>
</template>

<script>
import api from '../../config/config.js';
export default {
    beforeRouteLeave(to, from, next) {
        window.removeEventListener('scroll', this.load);
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
            .get(api.archives.get + '?page=1')
            .then(e => {
                if (e.data.code === 200) {
                    this.data = e.data.data;
                    window.addEventListener('scroll', this.load);
                    this.handleScrollH();
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
            window.addEventListener('scroll', this.load);
            this.handleScrollH();
            this.$store.commit('setGlobalProgress', false);
        }
    },
    data: () => ({
        data: [],
        scrollH: 0,
        page: 1,
        reachBottom: false
    }),
    methods: {
        load() {
            if (window.scrollY >= this.scrollH) {
                this.page += 1;
                this.reachBottom = true;
                this.$http
                    .get(api.archives.get + '?page=' + this.page)
                    .then(e => {
                        if (e.data.code === 200) {
                            this.data = this.data.concat(e.data.data);
                            this.handleScrollH();
                            this.reachBottom = false;
                        } else {
                            this.$store.commit(
                                'snackbar',
                                '请求错误, 请稍后重试' + e.data.msg
                            );
                        }
                    })
                    .catch(err => {
                        this.$store.commit(
                            'snackbar',
                            '请求错误, 请稍后重试' + err
                        );
                    });
            }
        },
        handleScrollH() {
            this.$nextTick(() => {
                let r = window.scrollY;
                window.scrollTo(0, document.body.scrollHeight);
                let h = window.scrollY;
                window.scrollTo(0, r);
                this.scrollH = h;
            });
        }
    },
    computed: {}
};
</script>

<style lang="scss">
#archives {
    .load-more {
        text-align: center;
    }
    // Variables
    $primary-color: #ff5252;
    $secondary-color: #2b2e48;

    // Mixins and Placeholders
    %clearfix {
        &:after,
        &:before {
            content: '';
            display: block;
            width: 100%;
            clear: both;
        }
    }

    .project-name {
        text-align: center;
        padding: 10px 0;
        color: #676767;
    }

    // Timeline
    #timeline {
        width: 100%;
        margin: 30px auto;
        position: relative;
        padding: 0 10px;
        transition: all 0.4s ease;

        &:before {
            content: '';
            width: 3px;
            height: 100%;
            background: $primary-color;
            left: 50%;
            top: 0;
            position: absolute;
        }

        &:after {
            content: '';
            clear: both;
            display: table;
            width: 100%;
        }

        .timeline-item {
            margin-bottom: 50px;
            position: relative;
            @extend %clearfix;

            .timeline-icon {
                background: $primary-color;
                width: 50px;
                height: 50px;
                position: absolute;
                top: 0;
                left: 50%;
                overflow: hidden;
                margin-left: -23px;
                border-radius: 50%;

                i {
                    position: relative;
                    top: 13px;
                    left: 13px;
                    color: #fff;
                }
            }

            .timeline-content {
                width: 45%;
                background: #fff;
                padding: 20px;
                transition: all 0.3s ease;
                h2 {
                    padding: 15px;
                    background: $primary-color;
                    color: #fff;
                    margin: -20px -20px 0 -20px;
                    font-weight: 300;
                }

                &:before {
                    content: '';
                    position: absolute;
                    left: 45%;
                    top: 20px;
                    width: 0;
                    height: 0;
                    border-top: 7px solid transparent;
                    border-bottom: 7px solid transparent;
                    border-left: 7px solid $primary-color;
                }

                &.right {
                    float: right;

                    &:before {
                        content: '';
                        right: 45%;
                        left: inherit;
                        border-left: 0;
                        border-right: 7px solid $primary-color;
                    }
                }
            }
        }
    }

    // Buttons
    .btn {
        padding: 5px 15px;
        text-decoration: none;
        background: transparent;
        border: 2px solid lighten($primary-color, 10%) !important;
        color: lighten($primary-color, 10%) !important;
        display: inline-block;
        position: relative;
        text-transform: uppercase;
        font-size: 12px;
        border-radius: 5px;
        transition: background 0.3s ease;
        box-shadow: 2px 2px 0 lighten($primary-color, 10%);
        &:hover {
            box-shadow: none;
            top: 2px;
            left: 2px;
            box-shadow: 2px 2px 0 transparent;
            text-decoration: none !important;
        }
    }

    @media screen and (max-width: 768px) {
        #timeline {
            margin: 30px;
            padding: 0px;
            width: 90%;
            &:before {
                left: 0;
                top: 10px;
            }

            .timeline-item {
                .timeline-content {
                    width: 90%;
                    float: right;
                    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);

                    &:before,
                    &.right:before {
                        left: 10%;
                        margin-left: -6px;
                        border-left: 0;
                        border-right: 7px solid $primary-color;
                    }
                }

                .timeline-icon {
                    transform: scale(0.8);
                    left: 0;
                }
            }
        }
    }
}
</style>
