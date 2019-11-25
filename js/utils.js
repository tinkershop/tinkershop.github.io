/*
//  utils.js
//  Primer
//  https://github.com/j4cq/primer
//
//  Copyright (c) 2015 Jacqueline Wheeler. All rights reserved.
//  Licensed under MIT.
*/

var utils = (function ($) {
    var $window = $(window);

    function isMobile() {
        return $window.width() < (40 * 16) || /Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile/i.test(navigator.userAgent);
    }

    function createNodes(list) {
        var result = {};

        for (key in list) {
            result[key] = $(list[key]);
        }

        return result;
    }

    function escapeForRegEx(string) {
        return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    return {
        createNodes: createNodes,
        isMobile: isMobile,
        escapeForRegEx: escapeForRegEx
    }
})(jQuery);
