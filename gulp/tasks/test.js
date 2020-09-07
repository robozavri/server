'use strict';

import gulp from 'gulp';
const $ = require('gulp-load-plugins')();
const argv = $.util.env;

gulp.task('test', ['test:server']);

gulp.task('test:server', () => {
  return gulp.src('src/**/*.spec.js', {read: false})
    .pipe($.plumber())
    .pipe($.spawnMocha({
      env: {'NODE_ENV': 'test'},
      reporter: 'spec'
    }));
});
