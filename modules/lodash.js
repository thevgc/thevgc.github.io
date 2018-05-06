'use strict'

const webpack = require('webpack')
const Lodash = new webpack.ProvidePlugin({
  _: "lodash"
})

module.exports = function LodashModule(moduleOptions) {
  const defaults = {
    plugin: true
  }

  const options = Object.assign(defaults, this.options.lodash, moduleOptions);

  if (options.plugin === true) {
    this.options.build.plugins.push(
      Lodash
    )
  }
}

