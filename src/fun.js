/*
 * Project: blog
 * File Created: Monday, 30th July 2018 3:09:04 pm
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Monday, 6th August 2018 11:17:02 am
 */

export default {
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
    },
    dateFormat(date, format) {
        const d = new Date(date);
        let fmt = format;
        let o = {
            "M+": d.getMonth() + 1, //月份
            "d+": d.getDate(), //日
            "h+": d.getHours(), //小时
            "m+": d.getMinutes(), //分
            "s+": d.getSeconds(), //秒
            "q+": Math.floor((d.getMonth() + 3) / 3), //季度
            S: d.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                (d.getFullYear() + "").substr(4 - RegExp.$1.length)
            );
        }
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    RegExp.$1.length == 1
                        ? o[k]
                        : ("00" + o[k]).substr(("" + o[k]).length)
                );
            }
        }
        return fmt;
    },
    scollPostion() {
        //滚动条位置
        var t, l, w, h;
        if (document.documentElement && document.documentElement.scrollTop) {
            t = document.documentElement.scrollTop;
            l = document.documentElement.scrollLeft;
            w = document.documentElement.scrollWidth;
            h = document.documentElement.scrollHeight;
        } else if (document.body) {
            t = document.body.scrollTop;
            l = document.body.scrollLeft;
            w = document.body.scrollWidth;
            h = document.body.scrollHeight;
        }
        return {
            top: t,
            left: l,
            width: w,
            height: h
        };
    }
};
