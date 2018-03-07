/**
 * ZUIX - scrollHelper Component
 *
 * @version 1.0.1 (2017-06-16)
 * @author Gene
 *
 */

zuix.controller(function (cp) {

    cp.init = function () {
        cp.options().html = false;
        cp.options().css = false;
    };

    cp.create = function () {
        cp.view().on('scroll', scrollCheck);
    };

    var scrollInfo = {
        lastTop: 0,
        timestamp: 0,
        timeout: null
    };

    function scrollCheck(e) {
        var scrollable = e.target;
        var scrollTop;
        var scrollHeight;
        var visibleHeight;

        if (scrollable === document) {
            //var x = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
            scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            scrollHeight = document.body.offsetHeight;
            visibleHeight = document.documentElement.offsetHeight;
        } else {
            scrollTop = scrollable.scrollTop;
            scrollHeight = scrollable.scrollHeight;
            visibleHeight = scrollable.offsetHeight;
        }

        var now = new Date().getTime();
        //if (scrollInfo.timeout != null)
        //    clearTimeout(scrollInfo.timeout);
        var endScroll = scrollHeight-scrollTop-visibleHeight;
        var dy = scrollTop - scrollInfo.lastTop;
        if ((endScroll === 0 || scrollTop === 0)) {
            //scrollInfo.timeout = setTimeout(function () {
                cp.trigger('scroll_change', { event: scrollTop === 0 ? 'hitTop' : 'hitBottom', delta: dy });
            //}, 100);
        } else if (now - scrollInfo.timestamp > 200) {
            scrollInfo.timestamp = now;
            //if (Math.abs(dy) > 20) {
                cp.trigger('scroll_change', { event: 'moving', delta: dy });
                scrollInfo.lastTop = scrollTop;
            //}
        }
    }

});