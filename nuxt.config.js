'use strict';

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'The VGC',
    meta: [{
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, user-scalable=no"
      },
      {
        hid: "description",
        name: "description",
        content: "The frontend web app for The Virtual Gaming Community"
      },
      {
        name: "apple-mobile-web-app-capable",
        content: "yes"
      },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black"
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  modules: [
    // Simple usage
    ["bootstrap-vue/nuxt", {
      css: false
    }],
    "@nuxtjs/font-awesome",
    "@nuxtjs/axios",
    // "~/modules/modernizr",
    // "~/modules/gsap",
    // "~/modules/jquery",
    // "~/modules/lodash",
    // With options
    [
      "nuxt-facebook-pixel-module",
      {
        /* module options */
        track: "PageView",
        pixelId: "2179837682251381"
      }
    ]
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
