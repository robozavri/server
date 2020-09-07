'use strict';

import gulp from 'gulp';
import path from 'path';
import es from 'event-stream';
import paths from '../paths';
import {firstUC, singular} from '../helpers';
const $ = require('gulp-load-plugins')();


gulp.task('inject', () => {
  return es.merge(
    injectRoutes(),
    injectSeed()
  );
});

function injectRoutes() {
  const base = paths.server.src;
  const src = `${base}/routes.js`;
  const fileNames = [`${base}/api/*`];

  return gulp.src(src)
    .pipe(inject(
      fileNames,
      '//inject:routes',
      n => `app.use('/api/${n}', require('./api/${n}'));`
    ))
    .pipe(gulp.dest(base));
}

function injectSeed() {
  const base = paths.server.src;
  const src = `${base}/config/seed.js`;
  const fileNames = [`${base}/api/*`];

  return gulp.src(src)
    .pipe(inject(
      fileNames,
      '//inject:require.daos',
      n => `const ${firstUC(singular(n))} = require('../api/${n}/${singular(n)}.dao');`
    ))
    .pipe(inject(
      fileNames,
      '//inject:require.stubs',
      n => `const ${firstUC(singular(n))}Stub = require('../stubs/${singular(n)}.stub');`
    ))
    .pipe(inject(
      fileNames,
      '//inject:daos.destroyAll',
      n => `${firstUC(singular(n))}.destroyAll(),`
    ))
    .pipe(gulp.dest(`${base}/config`));
}

function inject(fileNames, starttag, transformFileName) {
  return $.inject(
    gulp.src(fileNames, {read: false}), {
      starttag,
      endtag: '//endinject',
      transform: filePath => {
        const ext = path.extname(filePath);
        const name = path.basename(filePath).replace(ext, '');
        return transformFileName(name);
      }
    }
  );
}
