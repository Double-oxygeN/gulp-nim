/**
 *   Copyright 2018 Double-oxygeN
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
const through = require('through2')
const PluginError = require('plugin-error')
const replaceExtension = require('replace-ext')
const { readFile } = require('fs')
const { exec } = require('child_process')
const tempy = require('tempy')

const PLUGIN_NAME = 'gulp-nim'
const ALNUM_ONLY = /^[A-Za-z0-9]+$/

module.exports = (opts = {}) => {
  const optsStr = Object.entries(opts)
    .filter(([key, val]) => ALNUM_ONLY.test(key) && ALNUM_ONLY.test(val))
    .map(([key, val]) => [key, (typeof val !== 'boolean') ? val : val ? 'on' : 'off'])
    .map(([key, val]) => /^.$/.test(key) ? `-${key}:${val}` : `--${key}:${val}`)
    .join(' ')
  const transform = (file, enc, cb) => {
    if (file.isNull()) {
      return cb(null, file)
    }
    
    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, "Streaming not supported"))
    }
    
    if (file.isBuffer()) {
      const tempOut = tempy.file({ extension: 'js' })

      exec(`nim js -o:${tempOut} ${optsStr} ${file.path}`, (errExec, stdout, stderr) => {
        console.log(stderr)

        if (errExec !== null) {
          return cb(new PluginError(PLUGIN_NAME, errExec.message))
        }

        readFile(tempOut, (errReadFile, data) => {
          if (errReadFile !== null) {
            return cb(new PluginError(PLUGIN_NAME, errReadFile.message))
          }

          file.contents = data
          file.path = replaceExtension(file.path, '.js')

          cb(null, file)
        })
      })
    }
  }

  return through.obj(transform)
}

