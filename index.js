'use strict'

var postcss = require('postcss')
var isRoot = require('is-css-root')

module.exports = postcss.plugin('postcss-select', function (selectors) {
  return function removePrefixes (root, result) {
    root.walkRules(function (rule) {
      var selected = rule.selectors.filter(function (selector) {
        if (isRoot(selector)) {
          return true
        } else {
          return hasSelector(selectors, selector)
        }
      })

      if (selected.length) {
        rule.selectors = selected
      } else {
        rule.remove()
      }
    })
  }
})

function hasSelector(selectors, potentialMatch) {
  return selectors.some(function (selector) {
    return potentialMatch.indexOf(selector) !== -1
  })
}
