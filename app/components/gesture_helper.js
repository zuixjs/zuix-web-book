/**
 * ZUIX - Gesture Controller
 *
 * @version 1.0.0 (2018-03-11)
 * @author Gene
 *
 */

zuix.controller(function (cp) {

    var touchPointer = null;

    cp.init = function () {
        cp.options().html = false;
        cp.options().css = false;
    };

    cp.create = function () {
        cp.view().on('dragstart', function(e) {
            e.preventDefault();
        }).on('mousedown', function (e) {
            dragStart(e.x, e.y);
        }).on('mousemove', function (e) {
            dragMove(e.x, e.y);
        }).on('mouseup', function (e) {
            dragStop();
        }).on('touchstart', function (e) {
            dragStart(e.touches[0].clientX, e.touches[0].clientY);
        }).on('touchmove', function (e) {
            dragMove(e.touches[0].clientX, e.touches[0].clientY);
        }).on('touchend', function (e) {
            dragStop();
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
            cp.trigger('gesture:move', touchPointer);
        }
    }
    function dragStop() {
        var elapsedTime = new Date().getTime() - touchPointer.startTime;
        cp.trigger('gesture:release', touchPointer);
        if (touchPointer.shiftX === 0 && touchPointer.shiftY === 0 && elapsedTime < 1000) {
            // gesture TAP
            cp.trigger('gesture:tap', touchPointer);
        } else if (touchPointer.shiftX > 30) {
            // gesture slide LEFT
            cp.trigger('gesture:slide', 'left');
        } else if (touchPointer.shiftX < -30) {
            // gesture slide RIGHT
            cp.trigger('gesture:slide', 'right');
        }
        touchPointer = null;
    }

});