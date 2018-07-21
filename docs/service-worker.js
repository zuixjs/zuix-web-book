/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "d192726332dd00875b0d5bf92d3feb7c"
  },
  {
    "url": "app/controllers/content_loader.js",
    "revision": "678b2198197dca1ef8809969dba2e182"
  },
  {
    "url": "app/layout/header.css",
    "revision": "1d2f7ed099bd239f8ad4800b2f38674c"
  },
  {
    "url": "app/layout/header.html",
    "revision": "03e1aad7562a8786cd7fcd11d822eb65"
  },
  {
    "url": "app/layout/side_menu_item.html",
    "revision": "94587de6b6ddbd19c9a084195df8de38"
  },
  {
    "url": "app/layout/side_menu_subitem.html",
    "revision": "0aa41cdfd7240f9be0b279702ec8ba51"
  },
  {
    "url": "app/layout/side_menu.css",
    "revision": "769ee18bca4872b7823af3c6c6a286ce"
  },
  {
    "url": "app/layout/side_menu.html",
    "revision": "0068c3511cbcf5e0e89b98fb42f6eb49"
  },
  {
    "url": "app/templates/mdl_card.css",
    "revision": "5895d6fc071fff05095f5872277242e6"
  },
  {
    "url": "app/templates/mdl_card.html",
    "revision": "61f9c04d0602223d14da9df3ffcefd14"
  },
  {
    "url": "config.js",
    "revision": "26ae89d92a890559456910b095d2d1ca"
  },
  {
    "url": "content/about.html",
    "revision": "03e42e214b588b614a92668ccd5415f3"
  },
  {
    "url": "content/docs/content_files.html",
    "revision": "2f5b44c506e4e07ce8d46a7b66097c13"
  },
  {
    "url": "content/docs/side_menu.html",
    "revision": "f31a04f74681428b1b75e65d5967bd19"
  },
  {
    "url": "content/docs/theme.html",
    "revision": "3a731221e132535461645cce0349bd3c"
  },
  {
    "url": "css/animate.css",
    "revision": "07f146141537e04ee282a965d8053198"
  },
  {
    "url": "css/animate.min.css",
    "revision": "178b651958ceff556cbc5f355e08bbf1"
  },
  {
    "url": "css/flex-layout-attribute.min.css",
    "revision": "c55488315343d9afb4d13ebf9cc8f97b"
  },
  {
    "url": "index.css",
    "revision": "ef8cd8cee6cd19f1b8903d2eedc9fbcf"
  },
  {
    "url": "index.html",
    "revision": "d8eb9b3bc556596a730ad0849646a5ab"
  },
  {
    "url": "index.js",
    "revision": "d00f314f26a248801b898f1a8173b52e"
  },
  {
    "url": "js/mdl/material.green-pink.min.css",
    "revision": "2bee21872f78a29d249fe8d731853d7e"
  },
  {
    "url": "js/mdl/material.js",
    "revision": "b50a9d9f625f6eb4e09c40957f2e4e02"
  },
  {
    "url": "js/mdl/material.light_green-pink.min.css",
    "revision": "701b49acef871ef13bcbbd95b4ac33fe"
  },
  {
    "url": "js/mdl/material.min.js",
    "revision": "713af0c6ce93dbbce2f00bf0a98d0541"
  },
  {
    "url": "js/prism/clipboard.min.js",
    "revision": "3e5e0fa949e0e7c5ed5fed7b4cc0ee00"
  },
  {
    "url": "js/prism/prism.css",
    "revision": "485c9fc9787ea73d7c802822096c5dfe"
  },
  {
    "url": "js/prism/prism.js",
    "revision": "1a7c3a75daca45e74ca45b4efa3b1bca"
  },
  {
    "url": "js/zuix-bundler.js",
    "revision": "cd4d2491f787cab75e871ce3c7c2a1fd"
  },
  {
    "url": "js/zuix-bundler.min.js",
    "revision": "f0869de8aea2e54e9dea19fc6bf15edd"
  },
  {
    "url": "js/zuix.js",
    "revision": "212883fdac0b3dc43377c546db1806c5"
  },
  {
    "url": "js/zuix.min.js",
    "revision": "c41a4bbdc3dc4c0fdb4df45988b1990f"
  },
  {
    "url": "js/zuix/zuix-bundler.js",
    "revision": "eb1e6896190dc168976e3bfade74e1dc"
  },
  {
    "url": "js/zuix/zuix-bundler.min.js",
    "revision": "b35b5244abbd5fa7d894d5bdba111209"
  },
  {
    "url": "js/zuix/zuix.js",
    "revision": "4b5c494b8a1259cc0e992e7fd7973afd"
  },
  {
    "url": "js/zuix/zuix.min.js",
    "revision": "17b65a7df5599d242e5caae2549c12f2"
  },
  {
    "url": "manifest.json",
    "revision": "acc8842916250ef3359d72add1941b7c"
  },
  {
    "url": "site_config.js",
    "revision": "59e186de7ee5aa92310336e75a4b6cb2"
  },
  {
    "url": "workbox-sw.js",
    "revision": "ed25dc64f757df940d68d70073faac6c"
  },
  {
    "url": "images/banners/about.jpg",
    "revision": "b7a56c60596902441413e7dcb87f4c68"
  },
  {
    "url": "images/banners/content-files.jpg",
    "revision": "cf35262e560cf8c9b00d8df5e346f420"
  },
  {
    "url": "images/banners/mdl-banner.jpg",
    "revision": "2719730af09506f3104f4fc44bf29647"
  },
  {
    "url": "images/banners/side-menu.jpg",
    "revision": "b9ee631dc4355f8148c57e616af55fc5"
  },
  {
    "url": "images/gifs/zuix-build.gif",
    "revision": "9272952e14b8634c6c3590ac17cc955e"
  },
  {
    "url": "images/icons/desktop/android-chrome-192x192.png",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/icons/desktop/android-chrome-512x512.png",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/icons/desktop/apple-touch-icon.png",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/icons/desktop/favicon-16x16.png",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/icons/desktop/favicon-32x32.png",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/icons/desktop/mstile-150x150.png",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/icons/desktop/safari-pinned-tab.svg",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/icons/icon-128x128.png",
    "revision": "69f3f1f3f956bb71f35ce66b7717e1a0"
  },
  {
    "url": "images/icons/icon-144x144.png",
    "revision": "45e24db8671c41ca95c440df0cadf2a3"
  },
  {
    "url": "images/icons/icon-152x152.png",
    "revision": "e0867fd6e9bc25afd831b1eabdd83f8d"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "cf383c3d4500d31884326cc9d53a8c3a"
  },
  {
    "url": "images/icons/icon-384x384.png",
    "revision": "19007d16c73f442f44c926beddc34637"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "274298ed7162d12352fa836d3a2cb11e"
  },
  {
    "url": "images/icons/icon-72x72.png",
    "revision": "919cb6b3e8a1b5d0c963921dba0e4388"
  },
  {
    "url": "images/icons/icon-96x96.png",
    "revision": "5547ad1a33334c0f5c04f6de1f6d2c52"
  },
  {
    "url": "images/lighthouse_score.png",
    "revision": "296a96f22ac35d6653648986e4671192"
  },
  {
    "url": "images/menu_template_preview_1.png",
    "revision": "f7eaf15c9b4dc3e25a3ca16da5e6e0e1"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg)$/, workbox.strategies.cacheFirst({ cacheName: "images", plugins: [new workbox.expiration.Plugin({"maxEntries":50,"purgeOnQuotaError":false})] }), 'GET');
workbox.routing.registerRoute(/\.(?:html|json|js|css)$/, workbox.strategies.cacheFirst({ cacheName: "default", plugins: [new workbox.expiration.Plugin({"maxEntries":50,"purgeOnQuotaError":false})] }), 'GET');
