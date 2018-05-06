'use strict'

const webpack = require("webpack")
const Jquery = new webpack.ProvidePlugin({ $: "jquery", jquery: "jquery" })

module.exports = function JqueryModule(moduleOptions) {
  const defaults = {
    plugin: true
  }

  const options = Object.assign(defaults, this.options.jquery, moduleOptions)

  if (options.plugin === true) {
    this.options.build.plugins.push(Jquery)
  }
};
