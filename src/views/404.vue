/*
 * Project: blog
 * File Created: Wednesday, 1st August 2018 5:05:21 pm
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Thursday, 9th August 2018 2:25:34 pm
 */
<template>
    <div>404</div>
</template>

<script>
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
        setTimeout(() => {
            this.$store.commit('setForbidMask', false);
            this.$store.commit('setGlobalProgress', false);
        }, 1000);
    },
    activated() {
        // if (true) {
        this.$store.commit('setGlobalProgress', false);
        // }
    },
    data: () => ({})
};
</script>
