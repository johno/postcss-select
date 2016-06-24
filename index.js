'use strict'

var postcss = require('postcss')
var isBlank = require('is-blank')
var isRoot = require('is-css-root')
var getCssClasses = require('get-css-classes')
var stripPseudos = require('strip-pseudos')

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
    return potentialMatch === selector ||
           containsWithoutPseudos(selector, potentialMatch)
  })
}

// If selecting for class .clearfix, .clearfix:after should
// also match
function containsWithoutPseudos(selector, potentialMatch) {
  var classesInPotentialMatch = getCssClasses(potentialMatch).map(stripPseudos)

  return classesInPotentialMatch.some(function (c) {
    return selector === c
  })
}
