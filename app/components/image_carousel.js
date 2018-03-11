// Basic image carousel
zuix.controller(function (cp) {
    var SLIDE_DIRECTION_FORWARD = 1, SLIDE_DIRECTION_BACKWARD = -1;
    var currentSlide = 0, slideDirection = SLIDE_DIRECTION_FORWARD, slideTimeout = null;
    /** @typedef {ZxQuery} */
    var imageList = null;
    // options
    var imageHeight = 300;
    var imageMargin = 8;
    var slideInterval = 2500;

    cp.init = function() {
        cp.options().html = false;
        cp.options().css = false;
    };

    cp.create = function () {
        cp.view().css({
            'overflow': 'hidden',
            'overflow-x': 'hidden',
            //'width': '400px',
            // disable selection/highlight
            '-webkit-touch-callout': 'none',
            '-webkit-user-select': 'none',
            '-khtml-user-select': 'none',
            '-moz-user-select': 'none',
            '-ms-user-select': 'none',
            'user-select': 'none',
            'background-color': 'black'
        }).on('scroll', function (e) {
            resetSlideTimeout();
        });
        // gestures handling
        var container = cp.view().get();
        var startScrollX; var cancelClick;
        zuix.load('app/components/gesture_helper', {
            view: cp.view(),
            on: {
                'gesture:touch': function (e, tp) {
                    var container = cp.view().get();
                    startScrollX = container.scrollLeft;
                },
                'gesture:move': function (e, tp) {
                    cancelClick = true;
                    resetSlideTimeout();
                    container.scrollLeft = startScrollX - tp.shiftX;
                },
                'gesture:release': function (e, tp) {
                    scrollFocusing = false;
                    scrollEnd();
                },
                'gesture:slide': function (e, direction) {
                    switch(direction) {
                        case 'left':
                            currentSlide--;
                            direction = -SLIDE_DIRECTION_BACKWARD;
                            break;
                        case 'right':
                            currentSlide++;
                            direction = SLIDE_DIRECTION_FORWARD;
                            break;
                    }
                    showNext();
                }
            }
        });
        // thumbnails styling and events
        imageList = cp.view().children();
        imageList.each(function (i, el) {
            this.css({
                'height': imageHeight+'px',
                'width': 'auto',
                'padding-top': imageMargin+'px',
                'padding-bottom': imageMargin+'px',
                'padding-left': (imageMargin/2)+'px',
                'padding-right': (imageMargin/2)+'px',
                'cursor': 'pointer'
            }).on('click', function () {
                if (cancelClick) {
                    cancelClick = false;
                    return;
                }
                // build JSON image list that will be passed as event argument
                var images = [];
                cp.view('img').each(function(idx, el) {
                    images.push({
                        'url': this.attr('data-src-full'),
                        'thumbnail': this.attr('src'),
                        'description': this.attr('title') != null ? this.attr('title') : ''
                    });
                });
                cp.trigger('image:click', { 'list': images, 'currentSlide': i });
            });
        });
        if (imageList.length() > 1) {
            slideTimeout = setTimeout(showNext, slideInterval);
        }
    };

    function showNext() {
        if (currentSlide < 0) {
            slideDirection = 1;
            currentSlide++;
        }
        var offsetX = 0;
        imageList.each(function (i, el) {
            offsetX += this.get().offsetWidth/2;
            if (i == currentSlide)
                return false;
            offsetX += this.get().offsetWidth/2;
        });
        offsetX -= (cp.view().get().clientWidth / 2);
        scrollFocusing = true;
        scrollTo(offsetX, 300);
        currentSlide+=slideDirection;
        if (currentSlide >= imageList.length()) {
            slideDirection = -1;
            currentSlide--;
        }
        resetSlideTimeout();
    }

    function resetSlideTimeout() {
        if (slideTimeout != null)
            clearTimeout(slideTimeout);
        slideTimeout = setTimeout(showNext, slideInterval);
    }

    var scrollFocusing = false;
    function scrollEnd() {

        if (scrollFocusing) {
            scrollFocusing = false;
            return;
        }

        var container = cp.view().get();

        var totalLength = 0;
        imageList.each(function (i, el) {
            totalLength += this.get().offsetWidth;
        });

        var offsetX = -(container.clientWidth / 2);
        var selected = 0;
        imageList.each(function (i, el) {
            if (container.scrollLeft >= offsetX && container.scrollLeft <= offsetX+this.get().clientWidth)
                scrollFocusing = true;
            offsetX += this.get().clientWidth/2;
            selected = i;
            if (scrollFocusing)
                return false;
            offsetX += this.get().clientWidth/2;
        });

        // cancel scroll if at start or end of scroll area
        if (container.scrollLeft <= 0) {
            currentSlide = 0;
            scrollFocusing = false;
        } else if (container.scrollLeft+container.clientWidth >= totalLength) {
            currentSlide = imageList.length()-1;
            scrollFocusing = false;
        } else currentSlide = selected;

        if (scrollFocusing)
            scrollTo(offsetX, 300);
    }

    var scrollEndTs, scrollInterval;
    function scrollTo(to, duration) {
        var container = cp.view().get();
        if (to instanceof Element) {
            to = container.scrollLeft+zuix.$(to).position().x;
        }
        if (scrollInterval != null) {
            clearTimeout(scrollInterval);
        }
        var currentTs = Date.now();
        if (duration != null) {
            scrollEndTs = currentTs + duration;
        }
        duration = scrollEndTs-currentTs;
        if (duration <= 0) {
            container.scrollLeft = to;
            return;
        }
        scrollInterval = setTimeout(function() {
            var increment = (to - container.scrollLeft) / (duration/10);
            container.scrollLeft += increment;
            scrollTo(to);
        });
    }

});