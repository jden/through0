# through0

the prequel to [`through`](https://npm.im/through) - you'll love it or hate it

this module makes it dead simple to transform object mode streams in a functional manner, based on streams2 Transform class

## usage

```js
var through = require('through0')

// simple synchronous case

someObjectStream()
  .pipe(through(function (x) {
    return JSON.stringify(x).toUpperCase()
  }))


// silly async case, wait for keypress before sending each chunk

someObjectStream()
  .pipe(through(getch))

function getch() {
  return new Promise(function (resolve) {
    process.stdin.setRawMode(true)
    process.stdin.on('keypress', resolve)
    console.log('press the any key')
  })
}

// if you want, you can emit any number of chunks as a result of a received chunk.
// of course, you do this by returning a stream

someObjectStream()
  .pipe(through(function doubler(x) {
    return streamArray([x, x])
  }))
```

See `test/` directory for more examples


## installation
```
$ npm install through0
```

## running the tests
from the project root directory
```
$ npm install
$ npm test
```

## contributions
this project's api is considered stable. please report bugs, etc by opening an issue or pull request.


## license
by jden <jason@denizac.org>. ISC license.