const { src, dest } = require('gulp')
const nim = require('../main')

// Just run 'npx gulp'.
exports.default = function () {
  return src('main.nim')
    .pipe(nim({
      d: 'release'
    }))
    .pipe(dest('dest'))
}
