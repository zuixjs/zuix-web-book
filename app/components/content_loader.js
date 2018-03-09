zuix.controller(function (cp) {

    cp.init = function () {
        this.options().css = false;
        this.options().html = false;
    };

    cp.create = function () {
        window.onhashchange = function () {
            navigate();
        };
        cp.expose('data', data);
        cp.expose('path', getCurrentPath);
        cp.expose('list', list);
        cp.expose('getContent', getContent);
        cp.expose('navigate', navigate);
    };


    // this is the JSON site data
    var contentTree = null;

    var tapTimeout = null;
    var dummyController = zuix.controller(function(ctrl){});
    var contentController = zuix.controller(function(contentCtx){
        contentCtx.create = function () {
            contentCtx.view()
                .hide()
                .on('mousedown', function (e) {
                    if (tapTimeout != null)
                        clearTimeout(tapTimeout);
                    tapTimeout = setTimeout(function () {
                        cp.trigger('page_tap');
                    }, 500);
                })
                .on('mouseup', function () {
                    if (tapTimeout != null)
                        clearTimeout(tapTimeout);
                });
            zuix.load('app/components/scroll_helper', {
                view: contentCtx.view(),
                ready: function (scrollCtx) {
                    scrollCtx.on('scroll_change', function (e, data) {
                        // route event through the main context
                        // `cp` is the main `content_loader` context
                        data.page = contentCtx;
                        cp.trigger('page_scroll', data);
                    });
                }
            })
        };
    });

    function data(d) {
        if (d != null)
            contentTree = d;
        return contentTree;
    }

    function getCurrentPath() {
        if (window.location.hash.length > 0)
            return window.location.hash;
        return '';
    }

    function list(items, container, callback) {
        zuix.$.each(items, function (k, v) {
            (function(item, isLast) {
                var itemId = v.id+'['+item.template+']';
                var ctx = zuix.context(itemId);
                if (ctx == null) {
                    zuix.load(item.template, {
                        contextId: itemId,
                        css: false,
                        braces: item.data,
                        controller: dummyController,
                        ready: function (c) {
                            c.options().data = item;
                            c.view().setAttribute('data-id', item.id);
                            zuix.$(container).append(c.view());
                            callback(c, isLast);
                            if (item.list != null) {
                                list(item.list, c.view(), function () {
                                   // TODO: ...
                                });
                            }
                        }
                    });
                } else {
                    callback(ctx, isLast);
                }
            })(v, k == items.length - 1);
        });
    }

    function getContent(data, callback) {
        var path = data.file;
        // exit if no content path specified
        if (path == null || path.length == 0) return;
        var content = zuix.context(path);
        if (content == null) {
            zuix.load(path, {
                contextId: path,
                wrapContent: true,
                markdown: true,
                prism: true,
                braces: data,
                css: false,
                cext: '',
                controller: contentController,
                ready: function (c) {
                    callback(c, true);
                },
                error: function(err) {
                    document.location.replace('404.html');
                }
            });
        } else {
            callback(content, false);
        }
    }

    function navigate() {
        var path = getCurrentPath();
        cp.trigger('path_change', path);
    }

});
