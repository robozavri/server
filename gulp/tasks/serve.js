'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';
import paths from '../paths';
const $ = require('gulp-load-plugins')();


gulp.task('serve', ['inject'], () => {
  $.nodemon({
    script: paths.server.starter,
    watch: paths.server.scripts
  });
});
