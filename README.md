# gulp-nim

Gulp plugin to compile Nim files.

## Installation

    npm i -D Double-oxygeN/gulp-nim

## Usage

`gulpfile.js`

```js
const { src, dest } = require('gulp')
const nim = require('gulp-nim')

exports.default = function() {
  return src('./src/nim/app.nim')
    .pipe(nim({ d: 'release', opt: 'size', colors: true, skipCfg: '' }))
    .pipe(dest('./script'))
}
```

`gulpfile.ls`

```ls
require! {
  gulp: { src, dest }
  \gulp-nim
}

export default: ->
  src "./src/nim/app.nim"
    .pipe gulp-nim { d: \release, opt: \size, colors: on, skip-cfg: '' }
    .pipe dest "./script"
```

## License

Apache-2.0

