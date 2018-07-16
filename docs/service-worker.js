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
    "revision": "d23178763ad286b1ec0c1d445580b164"
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
    "revision": "20efe213b61b648aa7c9d03d80ba3028"
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
    "revision": "26ae89d92a890559456910b095d2d1ca"
  },
  {
    "url": "content/about.html",
    "revision": "14e81589212437a769ff449231477b70"
  },
  {
    "url": "content/docs/content_files.html",
    "revision": "4dfa1b1c8e2f16195412db17dc5e73f9"
  },
  {
    "url": "content/docs/side_menu.html",
    "revision": "04e8f73f0b960e40b3c79fc71f6f2c2b"
  },
  {
    "url": "content/docs/theme.html",
    "revision": "e17d2cfb0a43c9adbbc34b65f3798d07"
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
    "revision": "ee2aa667a231c7c1e0b6c077e6c922c9"
  },
  {
    "url": "index.html",
    "revision": "84e87696cc8790a2d95af6d5c529f17c"
  },
  {
    "url": "index.js",
    "revision": "dba446c8d302f319490ede081aa2ed59"
  },
  {
    "url": "js/mdl/material.green-pink.min.css",
    "revision": "4dfad3cb6c678cb2e5aaedd81ebe8b46"
  },
  {
    "url": "js/mdl/material.js",
    "revision": "60f3ee61721d5bbac709fad9c239f2ac"
  },
  {
    "url": "js/mdl/material.light_green-pink.min.css",
    "revision": "45d2af18d4499a5d70c7bdfc932f9bbf"
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
    "revision": "35c84557c6e69dd617f2b53c257f87c8"
  },
  {
    "url": "js/zuix-bundler.min.js",
    "revision": "4a6cd94ba1dd8e686761885c919b08a5"
  },
  {
    "url": "js/zuix.js",
    "revision": "8058fa8162770a99fb4423f8496b0b07"
  },
  {
    "url": "js/zuix.min.js",
    "revision": "a55a3c2ce36dda552321378be47a6a10"
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
    "revision": "d1c5d94d44d17e5619a1404eab20f862"
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
