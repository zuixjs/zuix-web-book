zuix.controller(function(cp){
    var currentIndex = 0, loadProgress = 0;
    /** @typedef {ZxQuery} */
    var imageList;
    /** @typedef {ZxQuery} */
    var buttonNext;
    /** @typedef {ZxQuery} */
    var buttonPrev;
    /** @typedef {ZxQuery} */
    var buttonClose;

    cp.create = function() {
        cp.view().css({
            'position': 'fixed',
            'left': 0,
            'right': 0,
            'top': 0,
            'bottom': 0,
            'z-index': 1000
        }).hide();
        buttonPrev = cp.field('nav-prev').on('click', navigatePrevious);
        buttonNext = cp.field('nav-next').on('click', navigateNext);
        buttonClose = cp.field('nav-close').on('click', function () {
            closeBrowser();
        });
        // export public component methods
        cp.expose('open', openBrowser)
            .expose('close', closeBrowser)
            .expose('items', setItems)
            .expose('current', setCurrent);
        // add gesture to slide left/right
        zuix.load('app/controllers/gesture_helper', {
            view: cp.view(),
            on: {
                'gesture:swipe': function (e, direction) {
                    switch (direction) {
                        case 'left':
                            navigatePrevious();
                            break;
                        case 'right':
                            navigateNext();
                            break;
                    }
                }
            }
        });
    }

    function setItems(itemList, current) {
        // remove any existing image
        cp.field('media').find('img').each(function (idx,el) {
            this.detach();
        });
        // initial loading progress state
        loadProgress = 0;
        cp.field('load-progress').get()
            .MaterialProgress.setProgress(10);
        cp.field('progress-container').show();
        // add provided itemList
        zuix.$.each(itemList, function (idx,el) {
            var img = document.createElement('img');
            zuix.$(img)
                .attr({'src': this.url, 'title': this.description })
                .one('load', function () {
                    // update loading progress
                    loadProgress += (100/itemList.length);
                    cp.field('load-progress').get()
                        .MaterialProgress.setProgress(loadProgress);
                    if (loadProgress >= 100) {
                        cp.field('progress-container').animateCss('fadeOutUp', function () {
                            this.hide();
                        });
                    }
                }).hide();
            cp.field('media').append(img);
        });
        imageList = cp.field('media').children();
        if (current != null) {
            setCurrent(current);
        }
        return cp.context;
    }

    function setCurrent(current) {
        currentIndex = current;
        imageList.eq(currentIndex).animateCss('fadeIn').show();
        return cp.context;
    }

    function openBrowser() {
        // hide navigation buttons
        buttonClose.animateCss('bounceInUp', { duration: '2s' });
        buttonNext.hide();
        buttonPrev.hide();
        // show the media browser and update buttons
        cp.view().animateCss('zoomIn', function () {
            updateButtons();
        }).show();
        return cp.context;
    }

    function closeBrowser() {
        cp.view().animateCss('zoomOut', function () {
            this.hide();
        });
        return cp.context;
    }

    function navigateNext() {
        if (currentIndex < imageList.length() - 1) {
            imageList.eq(currentIndex).css('z-index', '0').animateCss('fadeOutLeft', function () {
                this.hide();
            }).show();
            imageList.eq(++currentIndex).css('z-index', '1').animateCss('fadeInRight').show();
            updateButtons();
        }
    }
    function navigatePrevious() {
        if (currentIndex > 0) {
            imageList.eq(currentIndex).css('z-index', '0').animateCss('fadeOutRight', function () {
                this.hide();
            }).show();
            imageList.eq(--currentIndex).css('z-index', '1').animateCss('fadeInLeft').show();
            updateButtons();
        }
    }

    function updateButtons() {
        // show navigation buttons as needed
        if (currentIndex < imageList.length() - 1) {
            if (buttonNext.display() === 'none') {
                buttonNext.animateCss('rotateIn').show();
            }
        } else {
            if (buttonNext.display() !== 'none') {
                buttonNext.animateCss('rotateOut', function () {
                    this.hide();
                });
            }
        }
        if (currentIndex > 0 && imageList.length() > 1) {
            if (buttonPrev.display() === 'none') {
                buttonPrev.animateCss('rotateIn').show();
            }
        } else {
            if (buttonPrev.display() !== 'none') {
                buttonPrev.animateCss('rotateOut', function () {
                    this.hide();
                });
            }
        }
    }
});