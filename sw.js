importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "vgc-frontend",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/6.893b42a475bbf80e33c9.js",
    "revision": "4b61c9ff7324f6e40356478a3dbc5572"
  },
  {
    "url": "/_nuxt/7.fa47b00d1dd7456893fc.js",
    "revision": "0fd726ce865d7618e64cc64adc6da9fc"
  },
  {
    "url": "/_nuxt/8.8f725a1a64a4157b970c.js",
    "revision": "519e69d0e3982cba4217138d8debcce4"
  },
  {
    "url": "/_nuxt/9.bf8d4e5a738380c900b0.js",
    "revision": "04a75507c12e5697401d82df1d779119"
  },
  {
    "url": "/_nuxt/app.1983e29eecf6288d7ecf.js",
    "revision": "d543ea548d3bac7147bef8faca4904b2"
  },
  {
    "url": "/_nuxt/common.0cb13ec7dbef1487558f3dd0b035b1cd.css",
    "revision": "d0600b57dca7a0a836cb9234de58d63f"
  },
  {
    "url": "/_nuxt/common.a9996502ceff095f7b4f.js",
    "revision": "8d5ea1da0e9d5075cd4a0e90e07993ce"
  },
  {
    "url": "/_nuxt/layouts_default.3ea92cf8ec1a682e83e4.js",
    "revision": "3ee931eda3f9f661a28e6da08e176f10"
  },
  {
    "url": "/_nuxt/manifest.2a8105fd6d723e815e18.js",
    "revision": "4239d0b631820f618a68174e928185aa"
  },
  {
    "url": "/_nuxt/pages_blog_index.c69f0f472c3cf958c27e.js",
    "revision": "38bf5f419cc8217f3246d583014c25a9"
  },
  {
    "url": "/_nuxt/pages_index.6b068b2edca8d4dbd9f6.js",
    "revision": "8adcf7c59cabc35b12631c74fb1ec23f"
  },
  {
    "url": "/_nuxt/pages_leagues_index.219221d0b1f4a2e4bb30.js",
    "revision": "469e91c4a8feb000bc414347d760e702"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

