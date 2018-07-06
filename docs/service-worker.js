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
    "revision": "3ed2e989f5ac242be65a6307e709a77d"
  },
  {
    "url": "app/controllers/side_panel.js",
    "revision": "b9363b162001e7f7124ebfbff99aede0"
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
    "revision": "5a643a6bc59eebebecc710f2cb73bc64"
  },
  {
    "url": "app/layout/side_menu_subitem.html",
    "revision": "ac049b78d50c4d8bdf334eed36270e53"
  },
  {
    "url": "app/layout/side_menu.css",
    "revision": "bbe4334f16a6d905ba891a5eb4af964a"
  },
  {
    "url": "app/layout/side_menu.html",
    "revision": "ba4bda0d1f8272fce280769f3fb92ea0"
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
    "revision": "638e1f8525a3aaae06e5d367a2a01c19"
  },
  {
    "url": "content/docs/content_files.html",
    "revision": "01d5cc2c25576a2155d00dbcbc97723c"
  },
  {
    "url": "content/docs/side_menu.html",
    "revision": "6b0057f93d3541f21f0f360c7a4e353b"
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
    "revision": "ddb2b14aa6296b287e757fc9ab19b17a"
  },
  {
    "url": "index.html",
    "revision": "3a48e0afd8dfb2d59014a111a3e78c86"
  },
  {
    "url": "index.js",
    "revision": "0949d51cbce834d8b3e41253d9eeb222"
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
    "revision": "251f458d3ddd0bce611235aa349a6d2e"
  },
  {
    "url": "js/zuix/zuix.min.js",
    "revision": "01c3ac9bce0e5018baca545e35f1e1d1"
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
