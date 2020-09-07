'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';
import paths from '../paths';
const $ = require('gulp-load-plugins')();

const isTestRunning = {
  server: false,
};


gulp.task('watch', () => {
  $.watch(paths.server.specs, () => {
    if (!isTestRunning.server) {
      isTestRunning.server = true;
      runSequence('test:server', () => {
        isTestRunning.server = false;
      });
    }
  });

  $.watch(paths.gulpfiles, () => {
    console.info($.util.colors.red('\n---------------\nRestart Gulp\n---------------'));
  });
});
