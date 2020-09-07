'use strict';

import path from 'path';
const $ = require('gulp-load-plugins')();
const argv = $.util.env;

const root = path.dirname(__dirname);
const watchSpecs = argv.t;

const paths = {
  root,

  gulpfiles: [`${root}/gulpfile.js`, `${root}/gulp/**/*.js`],

  generatorTemplates: {
    directive: `${root}/gulp/generator/directive/**`,
    modal: `${root}/gulp/generator/modal/**`,
    service: `${root}/gulp/generator/service/**`,
    resource: `${root}/gulp/generator/resource/**`,
    validator: `${root}/gulp/generator/validator/**`,
    mainComponent: `${root}/gulp/generator/main-component/**`,
    adminComponent: `${root}/gulp/generator/admin-component/**`,
    api: `${root}/gulp/generator/api/**`,
    stub: `${root}/gulp/generator/stub/**`
  },

  adminGeneratorTemplates: {
    modal: `${root}/gulp/generator/modal/**`,
    service: `${root}/gulp/generator/service/**`,
    articles: `${root}/gulp/generator/admin/source/articles/**`,
    articlesWithModal: `${root}/gulp/generator/admin/source/articles-with-modal/**`,
    articlesWithModalTest: `${root}/gulp/generator/admin/source/test/articles-with-modal/**`,
    articlesTest: `${root}/gulp/generator/admin/source/test/articles/**`,
    editPageTest: `${root}/gulp/generator/admin/source/test/edit-page/**`,
    editPage: `${root}/gulp/generator/admin/source/edit-page/**`,
    http: `${root}/gulp/generator/admin/source/http/**`,
    model: `${root}/gulp/generator/admin/source/model/**`,
  },

  server: {
    src: `${root}/src`,
    starter: 'src/server.js',
    scripts: `${root}/src/**/*.js`,
    specs: `${root}/src/**/*${watchSpecs ? '' : '.spec'}.js`
  },

  admin: {
    src: `${root}/src`,
    adminModules: `${root}/src/app/routes/admin/routes`,
    http: `${root}/src/app/shared/http`,
    model: `${root}/src/app/shared/models`,
  },

  test: {
    unit: `${root}/client/test/unit/**/*.js`
  },
};

export default paths;
