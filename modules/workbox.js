'use strict'

const webpack = require('webpack')
// Inside of webpack.config.js:
const Workbox = require('workbox-webpack-plugin');

const WorkboxPlugin = new webpack.ProvidePlugin({
  Workbox: 'workbox-webpack-plugin'
})

module.exports = function WorkboxModule(moduleOptions) {
  const defaults = {
    plugin: true
  }

  const options = Object.assign(defaults, this.options.workbox, moduleOptions);

  if (options.plugin === true) {
    this.options.build.plugins.push(
      new Workbox.GenerateSW()
    )
  }
}

