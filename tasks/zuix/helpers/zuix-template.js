/*
 * Copyright 2017-2018 G-Labs. All Rights Reserved.
 *         https://zuixjs.github.io/zuix
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
 *        https://zuixjs.github.io/zuix
 *
 * @author Generoso Martello <generoso@martello.com>
 */

// config
const path = require('path');
const config = require('config');
const zuixConfig = config.get('zuix');
const siteConfig = require(path.resolve(zuixConfig.build.input, 'site_config.js'));
// static-site module helper

function getItemData(path) {
    let data = null;
    const BreakException = {};
    try {
        siteConfig.content.forEach(function (item) {
            let pageFile = item.data.file;
            if (pageFile != null) {
                pageFile = pageFile.replace('.html', '.md');
                if (path.indexOf(pageFile) > 0) {
                    data = item.data;
                }
            }
            if (item.list != null) {
                item.list.forEach(function (subItem) {
                    pageFile = subItem.data.file;
                    if (pageFile != null) {
                        pageFile = pageFile.replace('.html', '.md');
                        if (path.indexOf(pageFile) > 0) {
                            data = subItem.data;
                        }
                    }
                });
            }
            if (data != null) {
                throw BreakException;
            }
        });
    } catch (e) {
        // noop
    }
    return data;
}

module.exports = function (site, cb) {
    site.forEach(function(t) {
        const path = t.file;
        const data = getItemData(path);
        if (data != null) {
            t.data = data;
        }
    });
    //site = site.map(function(page) {
    //    return page;
    //});
    cb(null, site);
};
