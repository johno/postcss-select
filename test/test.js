'use strict'

var fs = require('fs')
var test = require('tape')
var postcss = require('postcss')
var select = require('..')

test('postcss-select', function (t) {
  t.plan(1)

  testFixture(t, 'input.css', 'output.css')
})

function fixture (name) {
  return fs.readFileSync('test/fixtures/' + name, 'utf8')
}

function testFixture (t, input, output) {
  t.equal(
    postcss([ select(['.input', '.foo input', '[type="text"]', '#foo.bar.baz']) ])
      .process(fixture(input)).css,
    fixture(output)
  )
}
