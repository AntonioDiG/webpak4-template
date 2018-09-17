'use strict';

/*
 * There are some useful switch functions in functional programmin paradigm.
 * Credits to Joel Thoms (https://hackernoon.com/rethinking-javascript-eliminate-the-switch-statement-for-better-code-5c81c044716d)
*/
const switchcase = cases => defaultCase => key =>
  cases.hasOwnProperty(key) ? cases[key] : defaultCase
const executeIfFunction = f =>
  typeof f === 'function' ? f() : f
const switchcaseF = cases => defaultCase => key =>
  executeIfFunction(switchcase(cases)(defaultCase)(key))

/*
 * There are the funtions to exports and use into webpack.config.js
*/
module.exports = {
  /**
   * Functions for autoconfigured htmlPlugin with extension of file.
   *
   * @param {*} options
   * @param {string} name
   * @param {string} extension
   * @returns {object}
   * @memberof ConfHelper
   */
  htmlPluginMinified: function (options, name, extension = 'html') {
    return {
      template: `./src/${name}.${extension}`,
      filename: `./${name}.html`,
      minify: this.htmlMinify(0),
      // include stylesheet into html
      inlineSource: (options.mode === 'production' ? '.(css)$' : false),
      // exclude style.js or style.[chunkhash].js
      excludeAssets: (options.mode === 'production' ? [/.js$/] : false )
    }
  },
  /**
   * Functions for autoconfigured htmlPlugin with mode-case
   *
   * @param {number} type 0 to 1 with 0 less invasive minify
   * @returns {object}
   * @memberof ConfHelper
   */
  htmlMinify: function (type = 0) {
    const minifyOptions = switchcase({
      0: {removeComments: true,minifyCSS: true},
      1: {html5: true,removeComments: true,minifyCSS: true, conservativeCollapse: true, collapseWhitespace: true}
    }) ('error')
    const getMinifyOption = () => minifyOptions(type)
    return getMinifyOption();
  }
}
