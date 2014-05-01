var Transform = require('stream').Transform

function through(fn) {
  var transform = new Transform({objectMode: true})
  transform._transform = function (chunk, encoding, done) {
    var result = fn(chunk)
    if (isPromise(result)) {
      result.then(function (val) {
        transform.push(val)
        done()
      })
    } else if (isStream(result)) {
      result.on('data', function (val) { transform.push(val) })
      result.on('end', done)
    } else {
      transform.push(result)
      done()
    }
  }
  return transform
}

function isPromise(val) {
  return val && typeof val.then === 'function'
}

function isStream(val) {
  return val && typeof val.pipe === 'function'
}

module.exports = through