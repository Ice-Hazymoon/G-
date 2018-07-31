/*
 * Project: blog
 * File Created: Monday, 30th July 2018 3:09:04 pm
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Tuesday, 31st July 2018 11:43:38 am
 */

module.exports = {
    toggleClass(el, className) {
        if (el.classList.contains(className)) {
            el.classList.remove(className);
        } else {
            el.classList.add(className);
        }
    },
    handleDate(date) {
        let [t, d] = [new Date().getTime(), new Date(date).getTime()];
        let e = (t - d) / 86400000;
        if (e <= 1) return "今天";
        if (e > 1 && e <= 7) return (e / 1).toFixed(0) + "天";
        if (e > 7 && e <= 30) return (e / 30).toFixed(0) + "周";
        if (e > 30 && e <= 365) return (e / 30).toFixed(0) + "月";
        if (e > 365) return (e / 365).toFixed(0) + "年";
    }
};
