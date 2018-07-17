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
let autoHidingMenu = false;

// component options must be in the global scope, so must be
// defined as 'var' or as window.siteOptions = { ... }
var siteOptions = {
    drawerLayout: {
        // configuration
        drawerWidth: 300,
        autoHideWidth: 960,
        // event listeners
        on: {
            'drawer:open': sideMenuOpen,
            'drawer:close': sideMenuClose,
            'layout:change': function (e) {
                autoHidingMenu = e.detail.smallScreen;
                if (autoHidingMenu) {
                    pageContainer
                        .removeClass('main-side-menu main-side-menu-pull')
                        .addClass('main-side-menu-off')
                        .css('margin-left', '0');
                    headerTitle.css('margin-left', '0');
                    menuButton.show();
                    showHeader();
                } else {
                    pageContainer
                        .removeClass('main-side-menu-off main-side-menu')
                        .addClass('main-side-menu-pull')
                        .css('margin-left', siteOptions.drawerLayout.drawerWidth+'px');
                    headerTitle.css('margin-left', siteOptions.drawerLayout.drawerWidth+'px');
                    menuButton.hide();
                    hideHeader();
                }
                if (sideMenuPanel != null) sideMenuPanel.lock(!autoHidingMenu);
            }
        },
        ready: function (ctx) {
            // store a global reference to the side-menu navigator component
            sideMenuPanel = ctx;
            sideMenuPanel.lock(!autoHidingMenu);
        }
    },
    contentLoader: {
        on: {
            'path:change': showPage,
            'scroll:change': function (e, data) {
                if (pageContainer.hasClass('main-side-menu-off')) {
                    switch (data.event) {
                        case 'hit-top':
                            // reached top of page
                            showHeader();
                            break;
                        case 'scroll':
                            if (data.info.shift.y < 0) {
                                // scrolling up
                                hideHeader();
                            } else if (data.info.shift.y > 0) {
                                // scrolling down
                                showHeader();
                            }
                            break;
                        case 'hit-bottom':
                            // reached end of page
                            showHeader();
                            break;
                    }
                }
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

zuix.$.ZxQuery.prototype.animateCss = function(animationName, param1, param2) {}; // forward declaration (kind of)
zuix.using('component', '@lib/extensions/animate_css', function(res, ctx) {
    console.log("AnimateCSS extension loaded.", res, ctx);
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
        .attr('rel','noopener')
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
        if (varName.indexOf('{-') >= 0) {
            // ignore braces var if starting with '-'
            return varName.replace('{-', '{');
        } else {
            // remove braces from varName
            varName = varName.replace(/[{}]/g, '');
            const dataField = fetchFromObject(braces, varName);
            if (dataField != null) {
                return dataField;
            } else return '';
        }
    });
}

function fetchFromObject(obj, prop) {
    if(typeof obj === 'undefined') {
        return false;
    }
    const _index = prop.indexOf('.');
    if(_index > -1) {
        return fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
    }
    return obj[prop];
}

function sideMenuOpen(e, status) {
    // animate menu button
    menuButton.animateCss('rotateOut', { duration: '0.25s' }, function () {
        this.find('i').html('arrow_back').animateCss('rotateIn', { duration: '0.25s' });
    }).addClass('reverse');
}
function sideMenuClose(e, status) {
    // animate menu button
    menuButton.animateCss('rotateOut', { duration: '0.25s' }, function () {
        this.find('i').html('menu').animateCss('rotateIn', { duration: '0.25s' });
    });
    menuButton.removeClass('reverse');
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

function showHeader() {
    if (headerElement.hasClass('header-collapse')) {
        headerElement.removeClass('header-collapse').addClass('header-expand');
    }
}
function hideHeader() {
    if (!headerElement.hasClass('header-collapse')) {
        headerElement.removeClass('header-expand').addClass('header-collapse');
    }
}
