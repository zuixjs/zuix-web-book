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
    let contentTree = null;

    const dummyController = zuix.controller(function(ctrl){});
    const contentController = zuix.controller(function(contentCtrl){
        contentCtrl.create = function () {
            contentCtrl.view().hide();
            zuix.load('@lib/controllers/scroll_helper', {
                view: contentCtrl.view(),
                ready: function (scrollCtx) {
                    const watchList = contentCtrl.options().watchList;
                    if (watchList != null)
                        scrollCtx.watch(watchList.filter, watchList.callback);
                    scrollCtx.on('scroll:change', function (e, data) {
                        // route event through the main context
                        // `cp` is the main `content_loader` context
                        data.page = contentCtrl;
                        cp.trigger('scroll:change', data);
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
                const itemId = v.id+'['+item.template+']';
                const ctx = zuix.context(itemId);
                if (ctx == null) {
                    zuix.load(item.template, {
                        contextId: itemId,
                        css: false,
                        braces: { data: item.data },
                        controller: dummyController,
                        ready: function (c) {
                            c.options().data = item;
                            c.view().setAttribute('data-id', item.id);
                            zuix.$(container).append(c.view());
                            callback(c, isLast);
                            if (item.list != null) {
                                list(item.list, c.view(), function(c, isLast) {
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
        const path = '../'+data.file;
        // exit if no content path specified
        if (path == null || path.length == 0) return;
        const content = zuix.context(path);
        if (content == null) {
            zuix.load(path, {
                contextId: path,
                wrapContent: true,
                prism: true,
                //braces: { data: data },
                css: false,
                cext: '',
                controller: contentController,
                ready: function (c) {
                    // extend context with 'watch' method
                    c.watch = function (filter, fn) {
                        c.options().watchList = {
                            filter: filter,
                            callback: fn
                        }
                    };
                    callback(c, true);
                    // TODO: zuix.componentize(c.view());
                },
                error: function(err) {
                    //document.location.replace('404.html');
                }
            });
        } else {
            callback(content, false);
        }
    }

    function navigate() {
        const path = getCurrentPath();
        cp.trigger('path:change', path);
    }

});
