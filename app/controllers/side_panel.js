zuix.controller(function (cp) {
    var isMenuOpen = true;
    var smallScreen = false;
    var firstCheck = true;

    var overlay = null;
    var sideMenu = null;

    var autoHideWidth = 960;

    cp.init = function () {
        this.options().html = false;
        this.options().css = false;
    };

    cp.create = function() {
        var config = cp.options().config;
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
        sideMenu.css('z-index', 15)
            .parent().append(overlay.get());
        // public component methods
        cp.expose('toggle', toggleMenu);
        cp.expose('open', openMenu);
        cp.expose('close', closeMenu);
        cp.expose('isOpen', isOpen);
        // detect screen size and set large/small layout
        sizeCheck();
        firstCheck = false;
    };

    function sizeCheck() {
        var width = document.body.clientWidth;
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
        sideMenu.show();
        if (!isMenuOpen) {
            isMenuOpen = true;
            sideMenu.animateCss('slideInLeft', { delay: '0.1s', duration: '0.3s' });
            cp.trigger('menu_open', { smallScreen: smallScreen });
            if (smallScreen) {
                overlay.show().animateCss('fadeIn');
                sideMenu.find('a').one('click', function() {
                    closeMenu();
                });
            }
        }
    }

    function closeMenu() {
        if (isMenuOpen && smallScreen) {
            isMenuOpen = false;
            sideMenu.animateCss('slideOutLeft', { delay: '0.1s', duration: '0.3s' }, function () {
                if (!isMenuOpen) {
                    this.hide();
                }
            });
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

    function isOpen() {
        return isMenuOpen;
    }

});
