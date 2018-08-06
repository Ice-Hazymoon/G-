/*
 * Project: blog
 * File Created: Monday, 6th August 2018 10:13:34 am
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Monday, 6th August 2018 7:06:39 pm
 */
<template>
    <div>Tags</div>
</template>

<script>
export default {
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
        this.$store.commit("setForbidMask", true); // 打开遮罩
        setTimeout(() => {
            this.$store.commit("setForbidMask", false);
            this.$store.commit("setGlobalProgress", false);
        }, 1000);
    },
    activated() {
        // if (true) {
        this.$store.commit("setGlobalProgress", false);
        // }
    },
    data: () => ({})
};
</script>
