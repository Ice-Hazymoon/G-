/*
 * Project: blog
 * File Created: Monday, 30th July 2018 3:09:04 pm
 * Author: Ice-Hazymoon (imiku.me@gmail.com)
 * -----
 * Last Modified: Monday, 30th July 2018 3:09:40 pm
 */

module.exports = {
    toggleClass(el, className) {
        if (el.classList.contains(className)) {
            el.classList.remove(className);
        } else {
            el.classList.add(className);
        }
    }
};
