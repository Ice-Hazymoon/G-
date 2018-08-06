/*
 * Project: blog
 * File Created: Wednesday, 1st August 2018 4:59:07 pm
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Monday, 6th August 2018 7:07:19 pm
 */
<template>
    <div>Links</div>
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
        console.log(1);
        this.$store.commit("setGlobalProgress", false);
        // }
    },
    data: () => ({})
};
</script>
