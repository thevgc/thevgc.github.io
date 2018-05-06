'use strict';

module.exports = {
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
  auth: {
    redirect: {
      callback: '/callback'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            propertyName: 'token.accessToken'
          }
        }
      },
      auth0: {
        domain: 'nuxt-auth.auth0.com',
        client_id: 'q8lDHfBLJ-Fsziu7bf351OcYQAIe3UJv'
      },
      facebook: {
        client_id: '225940131320984',
        userinfo_endpoint: 'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
        scope: ['public_profile', 'email', 'user_birthday']
      },
      google: {
        client_id: '956748748298-kr2t08kdbjq3ke18m3vkl6k843mra1cg.apps.googleusercontent.com'
      },
      github: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET
      },
      twitter: {
        client_id: 'FAJNuxjMTicff6ciDKLiZ4t0D'
      }
    }
  },
  css: ["@/assets/css/bootstrap.scss"],
  modules: [
    ["bootstrap-vue/nuxt", {
      css: false
    }],
    "@nuxtjs/font-awesome",
    "@nuxtjs/axios",
    '@nuxtjs/auth',
    "~/modules/jquery",
    "~/modules/lodash",
    [
      "nuxt-facebook-pixel-module",
      {
        track: "PageView",
        pixelId: "2179837682251381"
      }
    ]
  ],
  loading: {
    color: '#3B8070'
  },
  build: {
    analyze: {
      analyzerMode: 'static'
    },
    extractCSS: true,
    filenames: {
      css: 'common.[contenthash].css',
      manifest: 'manifest.[hash].js',
      vendor: 'common.[chunkhash].js',
      app: 'app.[chunkhash].js',
      chunk: '[name].[chunkhash].js'
    },
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
