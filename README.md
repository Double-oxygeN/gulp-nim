# gulp-nim

Gulp plugin to compile Nim files.

## Installation

    npm i -D Double-oxygeN/gulp-nim

## Usage

`gulpfile.ls`

```ls
require! {
  gulp: { src, dest }
  \gulp-nim
}

export nim = ->
  src "./src/nim/**/*.nim"
    .pipe gulp-nim { d: \release, opt: \size }
    .pipe dest "./script"
```

## License

Apache-2.0

