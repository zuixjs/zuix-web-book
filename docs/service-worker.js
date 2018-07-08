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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js");

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
    "revision": "d23178763ad286b1ec0c1d445580b164"
  },
  {
    "url": "app/controllers/side_panel.js",
    "revision": "b667fc7d2bed16dcfd721254f953702d"
  },
  {
    "url": "app/layout/header.css",
    "revision": "caff0f91b7bfa3ed6a68ce1496cb433f"
  },
  {
    "url": "app/layout/header.html",
    "revision": "e1bd53deed18140e737118892c60f27d"
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
    "revision": "afd3fbb725ece38374d1c0d0bce7872c"
  },
  {
    "url": "app/layout/side_menu.html",
    "revision": "09d0d3dfc25b85c98cdf50cc21dbb77f"
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
    "revision": "cc0a7c1d2cdaf17fb9c4dabd0dba8d4a"
  },
  {
    "url": "content/about.html",
    "revision": "143d77f0a7dbebfb8cbf180f3f41576e"
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
    "revision": "49bd224eb6225e1e90a7a1b7630c8358"
  },
  {
    "url": "index.html",
    "revision": "54ee7bc20c6612a0f1638cf7d61894d5"
  },
  {
    "url": "index.js",
    "revision": "07267ef39375fd56ecde466707f52616"
  },
  {
    "url": "js/mdl/material.green-pink.min.css",
    "revision": "daf3014760a1ad146d1552cda2b48ab3"
  },
  {
    "url": "js/mdl/material.js",
    "revision": "e2ff1b08544fdef6afe46d6bf9425ba9"
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
    "revision": "5191594859c55f8c6c456ce7097c25bb"
  },
  {
    "url": "js/zuix-bundler.min.js",
    "revision": "3e2ea7573c06004baf0da1e87ef8ce0a"
  },
  {
    "url": "js/zuix.js",
    "revision": "f50f7cc0026edf389f066b40c5069e36"
  },
  {
    "url": "js/zuix.min.js",
    "revision": "828fc3efc12e1d0861cf7e3a0a0ec2e1"
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
    "revision": "630e5b6805eeddd575fa2948502254d3"
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
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
