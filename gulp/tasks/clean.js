'use strict';

import gulp from 'gulp';
import path from 'path';
import del from 'del';
import Promise from 'bluebird';
import runSequence from 'run-sequence';
import paths from '../paths';
import {getNameFromArgv, firstUC, plural} from '../helpers';



gulp.task('cleanApi', (done) => {
  const name = getNameFromArgv();

  Promise.all([
    del(path.join(paths.server.src, 'api', plural(name))),
    del(path.join(paths.server.src, 'stubs', `${name}.stub.js`))
  ])
  .then(() => runSequence('inject', done));
});
