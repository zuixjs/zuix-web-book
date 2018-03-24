// Store a global reference to elements of site structure
var pageContainer = zuix.field('content-pages');
var headerElement = zuix.$.find('header');
// The following two elements are available only after the
// layout file of the header has been included so, we wait
// for header content to be loaded before assigning these.
var headerTitle;
var menuButton;
headerElement.on('component:ready', function() {
    headerTitle = zuix.field('header-title');
    menuButton = zuix.field('menu-button').on('click', function () {
        sideMenuPanel.toggle();
    });
});
// The above event listener is same as `zuix.context(headerElement, function(ctx){..})`

var sideMenuPanel = null;
var contentLoader = null;
var currentPage = null;

var contentOptions = {
    markdown: {
        css: false,
        markdown: true,
        braces: true
    },
    braces: {
        css: false,
        braces: true
    },
    bracesVars: {
        braces: true
    },
    sidePanel: {
        // configuration
        config: {
            sideMenuElement: 'side-menu',
            autoHideWidth: 960
        },
        // event listeners
        on: {
            'menu_open': sideMenuOpen,
            'menu_close': sideMenuClose,
            'auto_hide': function (e, autoHide) {
                if (autoHide) {
                    pageContainer
                        .removeClass('main-side-menu main-side-menu-pull')
                        .addClass('main-side-menu-off');
                    headerTitle.css('margin-left', '0');
                    menuButton.show();
                } else {
                    pageContainer
                        .removeClass('main-side-menu-off main-side-menu')
                        .addClass('main-side-menu-pull');
                    headerTitle.css('margin-left', '250px');
                    menuButton.hide();
                }
            }
        },
        ready: function (ctx) {
            // store a global reference to the side-menu navigator component
            sideMenuPanel = ctx;
        }
    },
    contentLoader: {
        on: {
            'path:change': showPage,
            'content:scroll': function (e, data) {
                if (pageContainer.hasClass('main-side-menu-off')) {
                    if (data.event === 'moving' || data.event === 'hitTop' || data.event === 'hitBottom') {
                        if (data.delta < 0) {
                            showHeader();
                        } else {
                            hideHeader();
                        }
                    }
                }
                if (data.event === 'hitBottom') {
                    showNavigation();
                } else hideNavigation();
            }
        },
        ready: function (ctx) {
            contentLoader = ctx;
            contentLoader.data(siteConfig);
            var showDelay = 0;
            contentLoader.list(
                // the list items to load
                siteConfig.content,
                // the container where to append items
                zuix.field('menu'),
                // the callback function to call once each item is loaded
                function(c, eol) {
                    // animate menu item once its loaded
                    zuix.$(c.view())
                        .animateCss('bounceInLeft', { delay: showDelay+'s' });
                    showDelay += 0.1;
                    // load page content once menu has completed loading
                    if (eol) {setTimeout(function(){
                        contentLoader.navigate();
                    }, 1000);}
                });

            zuix.load('https://genielabs.github.io/zuix/kit/controllers/gesture_helper', {
                view: document.documentElement,
                on: {
                    'gesture:tap': function(e, tp) {
                        if (sideMenuPanel.isOpen())
                            sideMenuPanel.close();
                        else
                            toggleControls();
                    },
                    'gesture:swipe': function (e, tp) {
                        if (!sideMenuPanel.isOpen() && tp.direction === 'left' && tp.startX < 100) {
                            showHeader();
                            sideMenuPanel.open();
                        } else if (sideMenuPanel.isOpen() && tp.direction === 'right') {
                            sideMenuPanel.close();
                        }
                    }
                }
            });
        }
    },
    imageCarousel: {
        contextId: 'image-carousel',
        on: {
            'page:tap': function(e, pageIndex, tp) {
                var pageView = zuix.context('image-carousel');
                pageView.slide(false);
                var images = [];
                this.find('img').each(function(idx, el) {
                    images.push({
                        'url': this.attr('data-src-full'),
                        'thumbnail': this.attr('src'),
                        'description': this.attr('title') != null ? this.attr('title') : ''
                    });
                });
                // open the full screen viewer
                var view = zuix.context('image-browser')
                    // methods of 'media-browser' component
                    .items(images)
                    .current(pageIndex)
                    .open().view();
                zuix.$(view).one('close', function () {
                    pageView.slide(true);
                });
            }
        }
    }
};


// Load AnimateCSS extension

zuix.$.ZxQuery.prototype.animateCss  = function (animationName, param1, param2){}; // // forward declaration (kind of)
zuix.using('component', 'https://genielabs.github.io/zuix/kit/extensions/animate_css', function(res, ctx) {
    console.log("AnimateCSS extension loaded.", res, ctx);
});


// Add hooks for custom content processing

zuix.hook('html:parse', function (data) {

    // ShowDown - Markdown compiler
    if (this.options().markdown === true && typeof showdown !== 'undefined') {
        data.content = new showdown.Converter()
            .makeHtml(data.content);
    }
    if (this.options().wrapContent === true) {
        data.content = '<div class="page content-padding mdl-shadow--2dp" self="size-xlarge">'+data.content+'</div>';
    }
    if (this.options().braces != null) {
        var _vars = this.options().braces;
        var parsedHtml = parseBraces(data.content, _vars);
        if (parsedHtml != null)
            data.content = parsedHtml;
    }

}).hook('view:process', function (view) {

    // Prism code syntax highlighter
    if (this.options().prism && typeof Prism !== 'undefined') {
        view.find('code').each(function (i, block) {
            this.addClass('language-javascript');
            Prism.highlightElement(block);
        });
    }

    // Force opening of all non-local links in a new window
    view.find('a[href*="://"]:not([target])').attr('target','_blank');

    // Material Design Light integration - DOM upgrade
    if (/*this.options().mdl &&*/ typeof componentHandler !== 'undefined')
        componentHandler.upgradeElements(view.get());

    //zuix.componentize(view);

}).hook('component:ready', function (ctx) {

    console.log("Component loaded", ctx);

});


// Index content items
var index = 0;
zuix.$.each(siteConfig.content, function (k, v) {
    v.index = index++;
    if (v.list != null) {
        zuix.$.each(v.list, function (k1, v1) {
            v1.index = index++;
        });
    }
});


// Other utility methods


function sideMenuOpen(e, status) {
    if (status.smallScreen) {
        pageContainer.addClass('main-side-menu-pull');
        headerTitle.parent().addClass('main-side-menu-off main-side-menu-pull');
        hideNavigation();
    } else showHeader();
    menuButton.animateCss('rotateOut', { duration: '0.25s' }, function () {
        this.find('i').html('arrow_back').animateCss('rotateIn', { duration: '0.25s' });
    });
}
function sideMenuClose(e, status) {
    if (status.smallScreen) {
        pageContainer.removeClass('main-side-menu-pull');
        headerTitle.parent().removeClass('main-side-menu-pull');
    }
    menuButton.animateCss('rotateOut', { duration: '0.25s' }, function () {
        this.find('i').html('menu').animateCss('rotateIn', { duration: '0.25s' });
    });
}

function showPage(e, path) {
    // parse path or use default
    if (path == null || path.length === 0)
        path = siteConfig.strings.startPage;
    if (path.lastIndexOf('?') > 0) {
        // TODO: should parse query string, not used in this version though
        path = path.substring(0, path.lastIndexOf('?'));
    }
    path = path.replace('#/', '').split('/');
    // get content item by path
    var item = getItemFromPath(path);
    if (item == null) {
        alert('Error parsing path.');
        return;
    }
    // get and show the page
    contentLoader.getContent(item.data, function(pageContext, isNew){
        if (isNew) {
            var view = pageContext.view();
            makeScrollable(view);
            pageContainer.append(view);
            zuix.componentize(view);
            // mdl accent color for anchor links
            zuix.$(view).find('a').addClass('mdl-color-text--accent');
            pageContext.index = item.index;
        }
        revealPage(pageContext);
    });
    // update the title bar and highlight current menu item
    zuix.$('.side-menu div > a').removeClass('current');
    zuix.$.each(path, function (k, v) {
        zuix.$('.side-menu div[data-id="' + v + '"] > a').addClass('current');
    });
    zuix.field('header-title').html(item.data.title);
}

function revealPage(pageContext) {
    var directionOut = 'Left';
    var directionIn = 'Right';
    var crossFadeDuration = '0.5s';
    if (currentPage != null) {
        var oldPage = currentPage;
        if (pageContext.index < oldPage.index) {
            directionOut = 'Right';
            directionIn = 'Left';
        }
        zuix.$(oldPage.view()).animateCss('fadeOut'+directionOut, { duration: crossFadeDuration }, function () {
            if (oldPage !== currentPage) this.hide();
        });
    }
    zuix.$(pageContext.view()).animateCss('fadeIn'+directionIn, { duration: crossFadeDuration }).show();
    currentPage = pageContext;
    updateNavigation();
}

function makeScrollable(div) {
    // turn content into an absolute positioned and scrollable element
    // so each page has its own independent scroll
    div.style.position = 'absolute';
    div.style.left = '0';
    div.style.right = '0';
    div.style.bottom = '0';
    div.style.top = '0';
    div.style['overflow'] = 'hidden';
    div.style['overflow-y'] = 'auto';
    div.setAttribute('layout', 'columns stretch-center');
}

function getItemFromPath(path) {
    var item = null, list = siteConfig.content;
    for(var p = 0; p < path.length; p++) {
        zuix.$.each(list, function (k, v) {
            if (v.id === path[p]) {
                item = v;
                list = item.list;
                return false;
            }
        });
    }
    return item;
}

function getPrevNextFromLocation() {
    var nextItem = null, prevItem = null;
    var list = siteConfig.content;
    var path = window.location.hash;
    if (path === '')
        path = siteConfig.strings.startPage;
    var pickNext = false;
    zuix.$.each(list, function (k, v) {
        if (v.list != null) {
            zuix.$.each(v.list, function(k1,v1){
                if (v1.data != null && v1.data.link === path) {
                    pickNext = true;
                } else if (pickNext) {
                    nextItem = v1;
                    return false;
                }
                if (!pickNext) {
                    prevItem = v1;
                }
            });
            return nextItem == null;
        } else if (v.data != null && v.data.link === path) {
            pickNext = true;
        } else if (pickNext) {
            nextItem = v;
            return false;
        }
        if (!pickNext) {
            prevItem = v;
        }
    });
    return { prev: prevItem, next: nextItem };
}

function parseBraces(content, braces) {
    return zuix.$.replaceBraces(content, function (varName) {
        if (varName[0] === '-') {
            // ignore braces if starting with '-'
            return '{' + varName.substring(1) + '}';
        } else if(varName.startsWith('strings.') && siteConfig.strings[varName.substring(8)]) {
            return siteConfig.strings[varName.substring(8)];
        } else if (braces[varName]) {
            return braces[varName];
        }
    });
}

var navigationButtons = zuix.field('fab-navigation').hide();
var navigateBack = navigationButtons.find('a').eq(0);
var navigateNext = navigationButtons.find('a').eq(1);
function updateNavigation() {
    var prevNext = getPrevNextFromLocation();
    if (prevNext.next != null) {
        navigateNext.parent().show()
            .find('label').html(prevNext.next.data.title);
        navigateNext
            .attr('href', prevNext.next.data.link)
            .attr('title', 'Next: '+prevNext.next.data.title);
    } else {
        navigateNext.attr('href', '').parent().hide();
    }
    if (prevNext.prev != null) {
        navigateBack.parent().show()
            .find('label').html(prevNext.prev.data.title);
        navigateBack
            .attr('href', prevNext.prev.data.link)
            .attr('title', 'Previous: '+prevNext.prev.data.title);
    } else {
        navigateBack.attr('href', '').parent().hide();
    }
    hideNavigation();
}

function showNavigation() {

    if (navigationButtons.display() === 'none') {
        navigationButtons.show()
            .animateCss('fadeInUp');
    }
    else hideNavigation();
}

function hideNavigation() {
    if (navigationButtons.display() !== 'none' && !navigationButtons.hasClass('animated')) {
        navigationButtons.animateCss('fadeOutDown', { duration: '0.3s' }, function () {
            this.hide();
        });
    }
}

function showHeader() {
    if (headerElement.hasClass('header-collapse')) {
        headerElement.removeClass('header-collapse').addClass('header-expand');
    }
}
function hideHeader() {
    headerElement.removeClass('header-expand').addClass('header-collapse');
}

function toggleControls() {
    if (navigationButtons.display() !== 'none') {
        hideNavigation();
    } else {
        showHeader();
        showNavigation();
    }
}

var scrollEndTs, scrollInterval;
function scrollTo(to, duration) {
    if (to instanceof Element) {
        to = currentPage.view().scrollTop + zuix.$(to).position().y-100;
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
        currentPage.view().scrollTop = to;
        return;
    }
    scrollInterval = setTimeout(function() {
        var increment = (to - currentPage.view().scrollTop) / (duration/10);
        currentPage.view().scrollTop += increment;
        scrollTo(to);
    });
}