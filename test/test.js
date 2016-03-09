'use strict'

var fs = require('fs')
var test = require('tape')
var postcss = require('postcss')
var isBlank = require('is-blank')
var select = require('..')

test('postcss-select', function (t) {
  t.plan(2)

  testFixture(t, 'input.css', 'output.css')
  t.ok(
    !isBlank(postcss([ select() ]).process(fixture('input.css')).messages)
  )
})

function fixture (name) {
  return fs.readFileSync('test/fixtures/' + name, 'utf8')
}

function testFixture (t, input, output) {
  var selectResult = postcss([ select(['.input', '.foo input', 'input[type="text"]', '#foo.bar.baz']) ])
      .process(fixture(input)).css

  t.equal(
    selectResult,
    fixture(output)
  )
}
