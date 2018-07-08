zuix.controller(function(cp) {
    let isMenuOpen = true;
    let isLocked = false;
    let smallScreen = false;
    let firstCheck = true;

    let overlay = null;
    let sideMenu = null;
    let sideMenuWidth = 0;

    let autoHideWidth = 960;

    cp.init = function () {
        this.options().html = false;
        this.options().css = false;
    };

    cp.create = function() {
        const config = cp.options().config;
        sideMenu = zuix.field(config.sideMenuElement);
        if (config.autoHideWidth != null) {
            autoHideWidth = config.autoHideWidth;
        }
        // listen to window resize event to make layout responsive
        window.addEventListener('resize', function () {
            sizeCheck();
        });
        // add overlay for small screens when menu is open
        overlay = zuix.$(document.createElement('div'));
        overlay.css({
            'position': 'absolute',
            'top': sideMenu.position().y+'px',
            'left': 0,
            'bottom': 0,
            'right': 0,
            'z-index': 10,
            'background-color': 'rgba(0, 0, 0, 0.35)'
        }).on('click', function () {
            closeMenu();
        }).hide();
        sideMenu.css({
            'left': 0,
            'z-index': 100
        });
        sideMenu.parent().append(overlay.get());

        let isDragging = false;
        // handle gesture to open/close side menu
        zuix.load('@lib/controllers/gesture_helper', {
            view: sideMenu.parent(),
            on: {
                'gesture:touch': function(e, tp) {
                    if (isLocked) return;
                    transitionOn();
                },
                'gesture:release': function(e, tp) {
                    if (isLocked) return;
                    if (isDragging) {
                        isDragging = false;
                        transitionOn();
                        if (tp.velocity > 0) {
                            openMenu();
                        } else {
                            closeMenu();
                        }
                    }
                },
                'gesture:pan': function (e, tp) {
                    if (isLocked) return;
                    if ((isDragging || isMenuOpen) && tp.x < sideMenuWidth || (!isDragging && tp.x < 50)) {
                        if (!isDragging) {
                            isDragging = true;
                        }
                        transitionOn();
                        dragBy(tp.x);
                        transitionOff();
                    }
                }
            }
        });

        // public component methods
        cp.expose('toggle', toggleMenu);
        cp.expose('open', function () {
            transitionOn();
            return openMenu();
        });
        cp.expose('close', function () {
            transitionOn();
            return closeMenu();
        });
        cp.expose('isOpen', isOpen);
        // TODO: refactor to 'dragTo'
        cp.expose('dragBy', dragBy);
        cp.expose('lock', function(locked) {
            isLocked = locked;
        });

        // detect screen size and set large/small layout
        sizeCheck();
        firstCheck = false;
    };

    function sizeCheck() {
        sideMenuWidth = sideMenu.get().clientWidth;
        const width = document.body.clientWidth;
        if (width < autoHideWidth) {
            if (!smallScreen || firstCheck) {
                smallScreen = true;
                cp.trigger('auto_hide', true);
                closeMenu();
            }
        } else {
            if (smallScreen || firstCheck) {
                if (smallScreen) {
                    overlay.hide();
                    if (isMenuOpen)
                        closeMenu();
                }
                smallScreen = false;
                cp.trigger('auto_hide', false);
                openMenu();
            }
        }
    }

    function openMenu() {
        sideMenu.show().css('left', 0);
        isMenuOpen = true;
        cp.trigger('menu_open', { smallScreen: smallScreen });
        if (smallScreen) {
            overlay.css('opacity', 'initial');
            overlay.show();
            sideMenu.find('a').one('click', function() {
                closeMenu();
            });
        }
    }

    function closeMenu() {
        if (smallScreen) {
            isMenuOpen = false;
            sideMenu.css('left', -sideMenuWidth+'px');
            /*
            sideMenu.animateCss(function () {
                if (!isMenuOpen) {
                    this.hide();
                }
            });
            */
            if (smallScreen) {
                overlay.hide();
            }
            cp.trigger('menu_close', { smallScreen: smallScreen });
        }
    }

    function toggleMenu() {
        if (isMenuOpen)
            closeMenu();
        else
            openMenu();
    }

    function dragBy(x) {
        if (x > 0 && x < sideMenuWidth) {
            x = -sideMenuWidth+x;
            if (sideMenu.display() === 'none') {
                sideMenu.show();
            }
            sideMenu.css('left', x + 'px');
            if (overlay.display() === 'none') {
                overlay.show();
            }
            overlay.css('opacity', (sideMenuWidth + x) / sideMenuWidth)
        }
    }

    function isOpen() {
        return isMenuOpen;
    }

    let isTransitionOn = false;
    function transitionOn(duration) {
        if (!isTransitionOn) {
            if (duration == null) {
                duration = 0.3;
            }
            isTransitionOn = true;
            const transition = 'ease '+duration+'s';
            sideMenu.css({
                'transition-property': 'left',
                '-webkit-transition': transition,
                '-moz-transition': transition,
                '-ms-transition': transition,
                '-o-transition': transition,
                'transition': transition
            });
            overlay.css({
                'transition-property': 'display, opacity',
                '-webkit-transition': transition,
                '-moz-transition': transition,
                '-ms-transition': transition,
                '-o-transition': transition,
                'transition': transition
            });
        }
    }
    function transitionOff() {
        if (isTransitionOn) {
            isTransitionOn = false;
            const transition = 'none';
            sideMenu.css({
                '-webkit-transition': transition,
                '-moz-transition': transition,
                '-ms-transition': transition,
                '-o-transition': transition,
                'transition': transition
            });
            overlay.css({
                '-webkit-transition': transition,
                '-moz-transition': transition,
                '-ms-transition': transition,
                '-o-transition': transition,
                'transition': transition
            });
        }
    }

});
