zuix.controller(function (cp) {
    var current = 0, sliderTimeout = null;
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
        }).on('dragstart', function(e) {
            e.preventDefault();
        }).on('mousedown', function (e) {
            dragStart(e.x);
        }).on('mousemove', function (e) {
            dragMove(e.x);
        }).on('mouseup', function (e) {
            dragStop();
        }).on('touchstart', function (e) {
            dragStart(e.touches[0].clientX);
        }).on('touchmove', function (e) {
            dragMove(e.touches[0].clientX);
        }).on('touchend', function (e) {
            dragStop();
        }).on('scroll', function (e) {
            resetSlideTimeout();
        });
        // thumbnails
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
                // build JSON image list that will be passed as event argument
                var images = [];
                cp.view('img').each(function(idx, el) {
                    images.push({
                        'url': this.attr('data-src-full'),
                        'thumbnail': this.attr('src'),
                        'description': this.attr('title') != null ? this.attr('title') : ''
                    });
                });
                cp.trigger('image:click', { 'list': images, 'current': i });
            });
        });
        if (imageList.length() > 1) {
            sliderTimeout = setTimeout(showNext, slideInterval);
        }
    };

    function showNext() {
        var offsetX = 0;
        imageList.each(function (i, el) {
            offsetX += this.get().offsetWidth/2;
            if (i == current)
                return false;
            offsetX += this.get().offsetWidth/2;
        });
        offsetX -= (cp.view().get().clientWidth / 2);
        scrollFocusing = true;
        scrollTo(offsetX, 300);
        current++;
        if (current >= imageList.length())
            current = 0;
        resetSlideTimeout();
    }

    function resetSlideTimeout() {
        if (sliderTimeout != null)
            clearTimeout(sliderTimeout);
        sliderTimeout = setTimeout(showNext, slideInterval);
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
            if (container.scrollLeft >= offsetX && container.scrollLeft <= offsetX+this.get().offsetWidth)
                scrollFocusing = true;
            offsetX += this.get().offsetWidth/2;
            selected = i;
            if (scrollFocusing)
                return false;
            offsetX += this.get().offsetWidth/2;
        });

        // cancel scroll if at start or end of scroll area
        if (container.scrollLeft <= 0) {
            current = 0;
            scrollFocusing = false;
        } else if (container.scrollLeft+container.clientWidth >= totalLength) {
            current = imageList.length()-1;
            scrollFocusing = false;
        } else current = selected;

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

    var startDragX = -1, startScrollX = 0;
    function dragStart(x) {
        var container = cp.view().get();
        startDragX = x;
        startScrollX = container.scrollLeft;
    }
    function dragMove(x) {
        if (startDragX >= 0) {
            resetSlideTimeout();
            var container = cp.view().get();
            container.scrollLeft = startScrollX - (x - startDragX);
        }
    }
    function dragStop() {
        startDragX = -1;
        scrollFocusing = false;
        scrollEnd();
    }
});