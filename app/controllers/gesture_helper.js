/**
 * ZUIX - Gesture Controller
 *
 * @version 1.0.0 (2018-03-11)
 * @author Gene
 *
 */

zuix.controller(function (cp) {

    var touchPointer = null, ignoreSession = false;

    cp.init = function () {
        cp.options().html = false;
        cp.options().css = false;
    };

    cp.create = function () {
        cp.view().on('dragstart', function(e) {
            if (!ignoreSession)
                e.preventDefault();
        }).on('mousedown', function (e) {
            var targetElement = zuix.$(e.target);
            if (targetElement.hasClass('no-gesture') || targetElement.parent('[class*="no-gesture"]').length() === 0) {
                ignoreSession = false;
                dragStart(e.x, e.y);
            } else ignoreSession = true;
        }).on('mousemove', function (e) {
            if (!ignoreSession)
                dragMove(e.x, e.y);
        }).on('mouseup', function (e) {
            if (!ignoreSession)
                dragStop(e);
        }).on('touchstart', function (e) {
            var targetElement = zuix.$(e.target);
            if (targetElement.hasClass('no-gesture') || targetElement.parent('[class*="no-gesture"]').length() === 0) {
                ignoreSession = false;
                dragStart(e.touches[0].clientX, e.touches[0].clientY);
            } else ignoreSession = true;
        }).on('touchmove', function (e) {
            if (!ignoreSession)
                dragMove(e.touches[0].clientX, e.touches[0].clientY);
        }).on('touchend', function (e) {
            if (!ignoreSession)
                dragStop(e);
        });
    };

    function dragStart(x, y) {
        touchPointer = {
            startTime: new Date().getTime(),
            startX: x,
            startY: y,
            shiftX: 0,
            shiftY: 0,
            'x': x,
            'y': y
        };
        cp.trigger('gesture:touch', touchPointer);
    }
    function dragMove(x, y) {
        if (touchPointer != null) {
            touchPointer.x = x;
            touchPointer.y = y;
            touchPointer.shiftX = (x - touchPointer.startX);
            touchPointer.shiftY = (y - touchPointer.startY);
            cp.trigger('gesture:pan', touchPointer);
        }
    }
    function dragStop(e) {
        var elapsedTime = new Date().getTime() - touchPointer.startTime;
        cp.trigger('gesture:release', touchPointer);
        if (cp.options().tapDisable !== true && touchPointer.shiftX === 0 && touchPointer.shiftY === 0 && elapsedTime < 1000) {
            // gesture TAP
            cp.trigger('gesture:tap', touchPointer);
            e.preventDefault(); // avoid conflicts with 'click' event
        } else if (touchPointer.shiftX > 30) {
            // gesture slide LEFT
            cp.trigger('gesture:swipe', 'left');
        } else if (touchPointer.shiftX < -30) {
            // gesture slide RIGHT
            cp.trigger('gesture:swipe', 'right');
        }
        touchPointer = null;
    }

});