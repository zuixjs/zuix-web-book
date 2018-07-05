// Store a global reference to elements of site structure
const pageContainer = zuix.field('content-pages');
const headerElement = zuix.$.find('header');
// The following two elements are available only after the
// layout file of the header has been included so, we wait
// for header content to be loaded before assigning these.
let headerTitle;
let menuButton;
headerElement.on('component:ready', function() {
    headerTitle = zuix.field('header-title');
    menuButton = zuix.field('menu-button').on('click', function () {
        sideMenuPanel.toggle();
    });
});
// The above event listener ('component:ready') is same as `zuix.context(headerElement, function(ctx){..})`

let sideMenuPanel = null;
let contentLoader = null;
let currentPage = null;

// component options must be in the global scope, so must be
// defined as 'var' or as window.contentOptions = { ... }
var contentOptions = {
    sidePanel: {
        css: false,
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
                    if (data.event === 'scroll' || data.event === 'hit-top' || data.event === 'hit-bottom') {
                        if (data.info.shift.y < 0) {
                            showHeader();
                        } else {
                            hideHeader();
                        }
                    }
                }
                if (data.event === 'hit-bottom') {
                    showNavigation();
                } else hideNavigation();
            }
        },
        ready: function (ctx) {
            contentLoader = ctx;
            contentLoader.data(siteConfig);
            let showDelay = 0;
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
                    }, 100);}
                });
            contentLoader.on('scroll:change', function(e, data) {
                switch (data.event) {
                    case 'hit-top':
                        // reached top of page
                        break;
                    case 'scroll':
                        if (data.info.shift.y < 0) {
                            // scrolling up
                        } else if (data.info.shift.y > 0) {
                            // scrolling down
                        }
                        // for all fields of the data.info
                        // object see next paragraph
                        break;
                    case 'hit-bottom':
                        // reached end of page
                        break;
                }
            });
        }
    },
    imageCarousel: {
        contextId: 'image-carousel',
        on: {
            'page:tap': function(e, pageIndex, tp) {
                // TODO: handle page tap
            }
        }
    }
};


// Load AnimateCSS extension

zuix.$.ZxQuery.prototype.animateCss  = function (animationName, param1, param2){}; // // forward declaration (kind of)
zuix.using('component', '@lib/extensions/animate_css', function(res, ctx) {
    console.log("AnimateCSS extension loaded.", res, ctx);
});

// handle gesture to open/close side menu
zuix.load('@lib/controllers/gesture_helper', {
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

// Add hooks for custom content processing

zuix.hook('html:parse', function (data) {

    if (this.options().wrapContent === true) {
        data.content = '<div class="page content-padding mdl-shadow--2dp" self="size-xlarge">'+data.content+'</div>';
    }
    if (this.options().braces != null) {
        const _vars = this.options().braces;
        const parsedHtml = parseBraces(data.content, _vars);
        if (parsedHtml != null) {
            data.content = parsedHtml;
        }
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
    view.find('a[href*="://"]:not([target])')
        .attr('rel','_noopener')
        .attr('target','_blank');

    // Material Design Light integration - DOM upgrade
    if (/*this.options().mdl &&*/ typeof componentHandler !== 'undefined')
        componentHandler.upgradeElements(view.get());

}).hook('component:ready', function (ctx) {

    console.log("Component loaded", ctx);

});


// Index content items
let index = 0;
zuix.$.each(siteConfig.content, function (k, v) {
    v.index = index++;
    if (v.list != null) {
        zuix.$.each(v.list, function (k1, v1) {
            v1.index = index++;
        });
    }
});


// Other utility methods


function parseBraces(content, braces) {
    return zuix.$.replaceBraces(content, function (varName) {
        if (varName[0] === '-') {
            // ignore braces if starting with '-'
            return '{' + varName.substring(1) + '}';
        } else {
            const dataField = fetchFromObject(braces, varName);
            if (dataField != null) {
                return dataField;
            }
        }
    });
}

function fetchFromObject(obj, prop) {

    if(typeof obj === 'undefined') {
        return false;
    }

    var _index = prop.indexOf('.')
    if(_index > -1) {
        return fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
    }

    return obj[prop];
}

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
    const item = getItemFromPath(path);
    if (item == null) {
        alert('Error parsing path.');
        return;
    }
    // get and show the page
    contentLoader.getContent(item.data, function(pageContext, isNew){
        if (isNew) {
            const view = pageContext.view();
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
    const crossFadeDuration = '0.5s';
    let directionOut = 'Left';
    let directionIn = 'Right';
    if (currentPage != null) {
        const oldPage = currentPage;
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
    let item = null;
    let list = siteConfig.content;
    for(let p = 0; p < path.length; p++) {
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
    const list = siteConfig.content;
    let nextItem = null;
    let prevItem = null;
    let path = window.location.hash;
    if (path === '')
        path = siteConfig.strings.startPage;
    let pickNext = false;
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

const navigationButtons = zuix.field('fab-navigation').hide();
const navigateBack = navigationButtons.find('a').eq(0);
const navigateNext = navigationButtons.find('a').eq(1);
function updateNavigation() {
    const prevNext = getPrevNextFromLocation();
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
