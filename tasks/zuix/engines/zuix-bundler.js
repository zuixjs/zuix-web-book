/*
 * Copyright 2017-2018 G-Labs. All Rights Reserved.
 *         https://genielabs.github.io/zuix
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 *
 *  This file is part of
 *  zUIx, Javascript library for component-based development.
 *        https://genielabs.github.io/zuix
 *
 * @author Generoso Martello <generoso@martello.com>
 */

// common
const fs = require('fs');
const util = require('util');
const request = require('sync-request');
const stringify = require('json-stringify');
// swig-markdown (static-site)
const staticSite = require('./swig-md');
// logging
const tlog = require('../lib/logger');
// ESLint
const linter = require('eslint').linter;
const lintConfig = require(process.cwd()+'/.eslintrc');
// LESS
const less = require('less');
const lessConfig = require(process.cwd()+'/.lessrc');
// config
const config = require('config');
const zuixConfig = config.get('zuix');
// zuix-bundler cli
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

const LIBRARY_PATH_DEFAULT = 'https://genielabs.github.io/zkit/lib';

const zuixBundle = {
    viewList: [],
    styleList: [],
    controllerList: [],
    assetList: []
};
let stats;
let hasErrors;

function createBundle(sourceFolder, data) {
    const dom = new JSDOM(data.content);

    // JavaScript resources
    if (zuixConfig.build.bundle && zuixConfig.build.bundle.js) {
        // TODO: check/parse scripts
        const scriptList = dom.window.document.querySelectorAll('script[src]');
        if (scriptList != null) {
            scriptList.forEach(function (el) {
                if (el.getAttribute('defer') != null) {
                    return;
                }
                let path = el.getAttribute('src');
                if (!(path.startsWith('http') || path.startsWith('//'))) {
                    path = sourceFolder + '/' + path;
                }
                let scriptText = fetchResource(path, null, false);
                if (scriptText == null) {
                    scriptText = fetchResource(zuixConfig.build.output+'/'+el.getAttribute('src'), null, true);
                }
                if (scriptText != null) {
                    scriptText = '//{% raw %}\n' + scriptText + '\n//{% endraw %}';
                    el.innerHTML = scriptText;
                    el.removeAttribute('src');
                    zuixBundle.assetList.push({path: path, content: scriptText, type: 'script'});
                }
            });
        }
    }

    // CSS resources
    if (zuixConfig.build.bundle && zuixConfig.build.bundle.css) {
        // TODO: check/parse css
        const styleList = dom.window.document.querySelectorAll('link[rel="stylesheet"][href]');
        if (styleList != null) {
            styleList.forEach(function(el) {
                let path = el.getAttribute('href');
                if (!(path.startsWith('http') || path.startsWith('//'))) {
                    path = sourceFolder+'/'+path;
                }
                let cssText = fetchResource(path, null, false);
                if (cssText == null) {
                    cssText = fetchResource(zuixConfig.build.output+'/'+el.getAttribute('href'), null, true);
                }
                if (cssText != null) {
                    el.outerHTML = '<style>\n/*{% raw %}*/\n'+cssText+'\n/*{% endraw %}*/\n</style>';
                    zuixBundle.assetList.push({path: path, content: cssText, type: 'style'});
                }
            });
        }
    }

    // zUIx resources
    if (zuixConfig.build.bundle.zuix !== false) {
        const nodeList = dom.window.document.querySelectorAll('[data-ui-include],[data-ui-load]');
        if (nodeList != null) {
            nodeList.forEach(function (el) {
                let skipElement = false;
                let parent = el.parentNode;
                while (parent != null) {
                    if (parent.tagName == 'PRE') {
                        skipElement = true;
                        break;
                    }
                    parent = parent.parentNode;
                }
                if (skipElement) {
                    return;
                }

                let hasJsFile = false;
                let path = el.getAttribute('data-ui-include');
                if (path == null || path === '') {
                    hasJsFile = true;
                    path = el.getAttribute('data-ui-load');
                }
                // do not process inline views
                if (dom.window.document.querySelectorAll('[data-ui-view="' + path + '"]').length > 0) {
                    return;
                }

                let content;
                if (hasJsFile) {
                    if (isBundled(zuixBundle.controllerList, path)) {
                        return;
                    }
                    content = fetchResource(path + '.js', sourceFolder, true);
                    if (content != null) {
                        zuixBundle.controllerList.push({path: path, content: content});
                    }
                }
                // HTML
                const item = isBundled(zuixBundle.viewList, path);
                if (item !== false) {
                    item.count++;
                    return;
                }
                content = fetchResource(path + '.html', sourceFolder, !hasJsFile);
                if (content != null) {
                    // Run static-site processing
                    content = staticSite.swig({ file: path + '.html', content: content, data: data.data, app: data.app })._result.contents;
                    // check markdown option
                    const md = el.getAttribute('data-o-markdown');
                    if (md != null && md.trim() === 'true') {
                        content = staticSite.markdown(content);
                        el.removeAttribute('data-o-markdown');
                    }
                    const d = {
                        file: sourceFolder + '/' + zuixConfig.app.resourcePath + '/' + path + '.html',
                        content: content
                    };
                    const dm = createBundle(sourceFolder, d);
                    content = dm.window.document.body.innerHTML;
                    if (el.getAttribute('data-ui-mode') === 'unwrap') {
                        // TODO: add HTML comment with file info
                        el.outerHTML = content;
                    } else {
                        // Lazy-loaded elements and components (data-ui-load) can't be defined inline
                        let inline = false;
                        // TODO: improve lazy-load check (inherit flag from parents)
                        if (el.getAttribute('data-ui-lazyload') != 'true' && el.getAttribute('data-ui-load') == null) {
                            inline = true;
                            el.innerHTML = '\n' + content + '\n';
                            let p = resolveAppPath(sourceFolder, path);
                            p = p.lib ? p.path : path;
                            el.setAttribute('data-ui-view', p);
                        }
                        zuixBundle.viewList.push({path: path, content: content, element: el, bundle: !inline});
                    }
                }
                // CSS
                content = fetchResource(path + '.css', sourceFolder);
                if (content != null) {
                    if (el.getAttribute('data-ui-mode') === 'unwrap') {
                        // TODO: add // comment with file info
                        content = util.format('\n<style id="%s">\n%s\n</style>\n', path, content);
                        dom.window.document.querySelector('head').innerHTML += util.format('\n<!--{[%s]}-->\n%s', path, content);
                    } else {
                        zuixBundle.styleList.push({path: path, content: content});
                    }
                }
            });
        }
    }
    return dom;
}

function resolveAppPath(sourceFolder, path) {
    let isLibraryPath = false;
    if (!isUrl(path)) {
        if (path.startsWith('@lib/')) {
            // resolve components library path
            if (zuixConfig.app.libraryPath != null) {
                if (zuixConfig.app.libraryPath.indexOf('://') > 0 || zuixConfig.app.libraryPath.startsWith('//')) {
                    path = zuixConfig.app.libraryPath + path.substring(4);
                } else {
                    path = sourceFolder + '/' + zuixConfig.app.libraryPath + path.substring(4);
                }
            } else {
                path = LIBRARY_PATH_DEFAULT + path.substring(4);
            }
            isLibraryPath = true;
        }
        path = isLibraryPath ? path : sourceFolder + '/' + zuixConfig.app.resourcePath + '/' + path;
    }
    return {
        lib: isLibraryPath,
        path: path
    };
}

function isBundled(list, path) {
    list.forEach(function(b) {
        if (b.path === path) {
            return b;
        }
    });
    return false;
}

function isUrl(path) {
    return path.indexOf('://') > 0 || path.startsWith('//');
}

function fetchResource(path, sourceFolder, reportError) {
    let content = null;
    if (sourceFolder != null) {
        path = resolveAppPath(sourceFolder, path).path;
    }
    const error = '   ^#^R^W[%s]^:';
    if (isUrl(path)) {
        if (path.startsWith('//')) {
            path = 'https:'+path;
        }
        tlog.overwrite('   ^C%s^: downloading "%s"', tlog.busyCursor(), path);
        const res = request('GET', path);
        if (res.statusCode === 200) {
            content = res.getBody('utf8');
            tlog.overwrite('');
        } else if (reportError) {
            hasErrors = true;
            tlog.term.previousLine();
            tlog.error(error+' %s', res.statusCode, path)
                .br();
        }
    } else {
        tlog.overwrite('   ^C%s^: reading "%s"', tlog.busyCursor(), path);
        try {
            content = fs.readFileSync(path).toString();
            tlog.overwrite('');
        } catch (e) {
            if (reportError) {
                hasErrors = true;
                tlog.term.previousLine();
                tlog.error(error+' %s', e.code, path)
                    .br();
            }
        }
    }
    return content;
}

function getBundleItem(bundle, path) {
    let item = null;
    const AlreadyExistsException = {};
    try {
        bundle.forEach(function(b) {
            if (b.componentId === path) {
                item = b;
                throw AlreadyExistsException;
            }
        });
    } catch (e) {
        if (e === AlreadyExistsException) {
            return item;
        }
    }
    item = {
        componentId: path
    };
    bundle.push(item);
    return item;
}

function generateApp(sourceFolder, data) {
    const dom = createBundle(sourceFolder, data);
    if (dom != null) {

        if (zuixConfig.build.bundle.zuix !== false) {
            let bundleViews = '<!-- zUIx inline resource resourceBundle -->';
            zuixBundle.viewList.forEach(function (v) {
                if (v.bundle) {
                    let path = resolveAppPath(sourceFolder, v.path);
                    path = path.lib ? path.path : v.path;
                    const content = util.format('<div data-ui-view="%s">\n%s\n</div>', path, v.content);
                    bundleViews += util.format('\n<!--{[%s]}-->\n%s', v.path, content);
                }
                stats[v.path] = stats[v.path] || {};
                stats[v.path].view = true;
            });
            let resourceBundle = [];
            zuixBundle.controllerList.forEach(function (s) {
                // TODO: ensure it ends with ';'
                let path = resolveAppPath(sourceFolder, s.path);
                path = path.lib ? path.path : s.path;
                getBundleItem(resourceBundle, path).controller = s.content;
                stats[s.path] = stats[s.path] || {};
                stats[s.path].controller = true;
            });
            zuixBundle.styleList.forEach(function (s) {
                let path = resolveAppPath(sourceFolder, s.path);
                path = path.lib ? path.path : s.path;
                getBundleItem(resourceBundle, path).css = s.content;
                stats[s.path] = stats[s.path] || {};
                stats[s.path].css = true;
            });

            // add style to hide inline views
            const head = dom.window.document.querySelector('head');
            head.innerHTML += '    <style>[data-ui-view]:not([data-ui-include]):not([data-ui-load]) { display: none; }</style>\n';

            // add inline views
            dom.window.document.body.innerHTML += bundleViews;
            // add zuix resource bundle (css,js)
            const json = stringify(resourceBundle, null, 2);
            if (resourceBundle.length > 0) {
                let jsonBundle = '\n<script>zuix.bundle(' + json + ')</script>\n';
                dom.window.document.body.innerHTML += jsonBundle;
            }
        }

        if (zuixConfig.build.bundle.js !== false) {
            // TODO: report in final summary
            zuixBundle.assetList.forEach(function (a) {
                stats[a.path] = stats[a.path] || {};
                stats[a.path].script = true;
            });
        }
        if (zuixConfig.build.bundle.css !== false) {
            // TODO: report in final summary
            zuixBundle.assetList.forEach(function (a) {
                stats[a.path] = stats[a.path] || {};
                stats[a.path].style = true;
            });
        }

        data.content = dom.serialize();
    }
}

module.exports = function(options, template, data, cb) {
    // reset globals for every page
    stats = {};
    hasErrors = false;
    // zUIx bundle
    tlog.br().info('^w%s^:', data.file);
    let postProcessed = false;
    // Default static-site processing
    tlog.info(' ^r*^: static-site content');
    let html = staticSite.swig(data)._result.contents;
    let isStaticSite = (html != data.content);
    if (isStaticSite) {
        data.content = html;
    }

    if (data.file.endsWith('.html')) {
        // Generate resources bundle
        tlog.overwrite(' ^r*^: resource bundle');
        generateApp(options.source, data);
        if (Object.keys(stats).length > 0) {
            if (!hasErrors) {
                tlog.overwrite(' ^G\u2713^: resource bundle');
            }
            // output stats
            for (const key in stats) {
                const s = stats[key];
                const ok = '^+^g';
                const ko = '^w';
                tlog.info('   ^w[^:%s^:%s^:%s^:^w]^: %s',
                    s.view ? ok + 'v' : ko + '-',
                    s.css ? ok + 's' : ko + '-',
                    s.controller ? ok + 'c' : ko + '-',
                    '^:' + key
                );
            }
            tlog.info();
            postProcessed = true;
        } else {
            tlog.overwrite();
        }
    } else {
        tlog.overwrite();
    }

    if (isStaticSite) {
        tlog.info(' ^G\u2713^: static-site content').br();
        postProcessed = true;
    }

    if (zuixConfig.build.esLint) {
        // run ESlint
        if (data.file.endsWith('.js')) {
            tlog.info(' ^r*^: lint');
            const issues = linter.verify(data.content, lintConfig, data.file);
            issues.forEach(function(m) {
                if (m.fatal || m.severity > 1) {
                    tlog.error('   ^RError^: %s ^R(^Y%s^w:^Y%s^R)', m.message, m.line, m.column);
                } else {
                    tlog.warn('   ^YWarning^: %s ^R(^Y%s^w:^Y%s^R)', m.message, m.line, m.column);
                }
            });
            if (issues.length === 0) {
                tlog.overwrite(' ^G\u2713^: lint');
            }
            tlog.info();
            postProcessed = true;
        }
    }

    if (zuixConfig.build.less) {
        // run LESS
        if (data.file.endsWith('.less')) {
            tlog.info(' ^r*^: less');
            less.render(data.content, lessConfig, function(error, output) {
                const baseName = data.dest.substring(0, data.dest.length - 5);
                fs.writeFileSync(baseName + '.css', output.css);
                // TODO: source map generation disabled
                //fs.writeFileSync(baseName+'.css.map', output.map);
                tlog.overwrite(' ^G\u2713^: less');
            });
            tlog.info();
            postProcessed = true;
        }
    }

    cb(null, data.content);
    if (!postProcessed) {
        tlog.info();
    }
    tlog.overwrite(' ^G\u2713^: done');
};
