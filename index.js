'use strict'

var postcss = require('postcss')
var isBlank = require('is-blank')
var isRoot = require('is-css-root')

module.exports = postcss.plugin('postcss-select', function (selectors) {
  return function removePrefixes (root, result) {
    selectors = selectors || []
    if (isBlank(selectors)) {
      result.warn('No selectors were provide to filter with')
    }

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
