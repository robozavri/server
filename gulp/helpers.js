// 'use strict';

import gulp from 'gulp';
import _ from 'lodash';
import pluralize from 'pluralize';
const $ = require('gulp-load-plugins')();
const argv = $.util.env;
const log = $.util.log;
const colors = $.util.colors;


export function copy(src, dest) {
  return gulp.src(src)
    .pipe(gulp.dest(dest));
}

export function firstUC(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function firstLC(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function plural(str) {
  return pluralize.plural(str);
}

export function singular(str) {
  return pluralize.singular(str);
}

export function getIsGeenerateArgv() {
  const edit = argv.edit || argv.n;
  if (!edit) {
    log(colors.red('Error: name parameter is required (e.g. --edit <edit>) value: true or false'));
    process.exit(1);
  }
  return edit;
}

export function getNameFromArgv() {
  const name = argv.name || argv.n;
  if (!name) {
    log(colors.red('Error: name parameter is required (e.g. --name <myName>)'));
    process.exit(1);
  }
  return firstLC(name);
}

export function getDirFromArgv() {
  return argv.dir || argv.d;
}

export function getDefFieldFromArgv() {
  const field = argv.f;
  if (!field) {
    log(colors.red('Error: default field is required (e.g. -f <myField>)'));
    process.exit(1);
  }
  return field;
}

export function getDefFieldsFromArgv() {
  // { name: string, title: 'multilingual', description: 'multilingual', count: 'number', thumbnail: 'image', images: 'images' }
  // { \"name\": \"string\", \"title\": \"multilingual\", \"description\": \"multilingual\", \"count\": \"number\", \"thumbnail\": \"image\", \"images\": \"images\" }
  // { \"name\": \"string\", \"title\": \"multilingual\", \"description\": \"multilingual\", \"count\": \"number\", \"thumbnail\": \"image\" }
  const fields = argv.fields;
  if (!fields) {
    log(colors.red('Error: default fields is required (e.g. --fields <myField>)'));
    process.exit(1);
  }
  return JSON.parse(fields);
  // return fields;
}

export function getMinifyFromArgv() {
  return argv.m || argv.minify;
}
