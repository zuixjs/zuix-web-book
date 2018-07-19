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
    "revision": "c29865361485f38733f24cadf4e499d5"
  },
  {
    "url": "app/controllers/content_loader.js",
    "revision": "bbe987438cd8c0c500bc125273de9ea2"
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
    "revision": "0425f634fb0146c41343ecdb0161e8cd"
  },
  {
    "url": "content/docs/content_files.html",
    "revision": "fab85b18c951dc43a49275f6fedd451b"
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
    "revision": "33292085b6be4f556fb8ac4883e43b8a"
  },
  {
    "url": "index.js",
    "revision": "76e88bf90439617d2cee139d334bfc0e"
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
    "revision": "67a24452f8ec6ef4449b7ee030e16ac6"
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
    "revision": "de8b1bc31250b8b6e3f63d84bf3cd9d7"
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
    "url": "images/card_cover.jpg",
    "revision": "056b0eb64ac30441bd6aca8e3798286b"
  },
  {
    "url": "images/github.png",
    "revision": "bc0550c0fe9c550342b069ada1b33272"
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
