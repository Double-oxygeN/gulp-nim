# gulp-nim

[![npm version](https://badge.fury.io/js/gulp-nim.svg)](https://badge.fury.io/js/gulp-nim)

Gulp plugin to compile [Nim](https://nim-lang.org/) files.

## Installation

    npm i -D gulp-nim

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

## API

### nim([opts])

Compiles Nim source code files to JavaScript files.

`opts` is an object of compiler options.
Each of key-value pairs corresponds to one compiler option.
`{d: 'release'}` means `-d:release`, `{opt: 'size'}` means `--opt:size`, `{colors: true}` means `--colors:on`, and `{skipCfg: ''}` means `--skipCfg`.

For more details, see [Nim Compiler User Guide](https://nim-lang.org/docs/nimc.html).

#### Multiple value support

Values of `opts` allow multiple values.
For example, `{d: ['release', 'nodejs']}` means `-d:release -d:nodejs`.

## License

Apache-2.0
