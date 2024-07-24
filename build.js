const electron = require('gulp-atom-electron');
const vfs = require('vinyl-fs')
const _ = require('underscore')
const json = require('gulp-json-editor')
const gulpIf = require('gulp-if');
const path = require('path');

function isNotPackageJson(file) {
  return !path.basename(file.path).includes('package.json');
}

function getElectron(arch) {
  // return () => {
  console.log(arch)
  const electronOpts = _.extend({}, {
    productAppName: 'login',
    version: '31.2.1'
  }, {
    version: '31.2.1',
    platform: process.platform,
    arch: arch === 'armhf' ? 'arm' : arch,
    ffmpegChromium: true,
    keepDefaultApp: true
  });

  return vfs.src('package.json')
    .pipe(json({ name: 'login' }))
    .pipe(electron(electronOpts))
    .pipe(gulpIf(isNotPackageJson, vfs.dest('.build/electron')));
      // };
}
getElectron(process.arch)
