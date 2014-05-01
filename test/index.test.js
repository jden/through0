require('chai').should()
require('polyfill-promise')

var streamArray = require('stream-array')
var through = require('../.')

function sampleData (arr) {
  return streamArray(arr || [1,2,3])
}

describe('through0', function () {  
  it('creates a simple functional transform', function (done) {

    var out = []

    sampleData()
      .pipe(through(function (x) { return x * 2 }))
      .on('data', out.push.bind(out))
      .on('end', function () {
        out.should.deep.equal([2,4,6])
        done()
      })

  })

  it('supports async transforms using promises', function (done) {

    var out = []

    sampleData()
      .pipe(through(function (x) {
        return Promise.cast(x)
      }))
      .on('data', out.push.bind(out))
      .on('end', function () {
        out.should.deep.equal([1,2,3])
        done()
      })

  })

  it('supports chunked transforms via streams', function (done) {

    var out = []

    sampleData()
      .pipe(through(function (x) {
        var chunks = []
        for (var i = 0; i < x; i++) {
          chunks.push(String.fromCharCode(64+x))
        }
        return streamArray(chunks)
      }))
      .on('data', out.push.bind(out))
      .on('end', function () {
        out.should.deep.equal(['A','B','B','C','C','C'])
        done()
      })
  })
})