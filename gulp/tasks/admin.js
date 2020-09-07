'use strict';

import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';
import paths from '../paths';
import * as _ from 'lodash';
import { fields, refFields } from './fields';
import { generateArticlesList } from './admin/articles-list';
import { generateInterface } from './admin/model';
import { getIsGeenerateArgv, getNameFromArgv, firstUC, firstLC, plural, singular} from '../helpers';
const $ = require('gulp-load-plugins')();

gulp.task('admin', (done) => {
  runSequence('generateArticlesAdminComponent2', 'generateHttp2', 'generateModel2', 'generateEditPage2', done);
});

gulp.task('generateArticlesAdminComponent2', () => {
    const name = getNameFromArgv();
    let src, dest = path.join(paths.admin.adminModules, _.kebabCase(plural(name)));

    if('false' === getIsGeenerateArgv()) { 
       src = paths.adminGeneratorTemplates.articlesWithModalTest;
    } else {
       src = paths.adminGeneratorTemplates.articlesTest;
    }

    return insertArticlesTemplate2(name, src, dest);
});

gulp.task('generateHttp2', () => {
  const name = getNameFromArgv();
  const src = paths.adminGeneratorTemplates.http;
  const dest = paths.admin.http; 
  return insertHttpTemplate(name, src, dest, true);
});

gulp.task('generateModel2', () => {
  const name = getNameFromArgv();
  const src = paths.adminGeneratorTemplates.model;
  const dest = paths.admin.model;
  return insertModelTemplate(name, src, dest, fields);
});

gulp.task('generateEditPage2', () => {
  let name = getNameFromArgv();
  if('false' === getIsGeenerateArgv()) { 
      return;
  }
  let destDirName ='';
  if(singular(name) === plural(name) ){
      name = name + '-details';
      destDirName = name;
  }else{
      destDirName = singular(name);
  }
  const src = paths.adminGeneratorTemplates.editPageTest;
  const dest = path.join(paths.admin.adminModules, _.kebabCase(destDirName));
  return insertEditPageTemplate(name, src, dest, fields);
});

function insertEditPageTemplate(name, src, dest, fields) {
  const articlesList = generateArticlesList(fields, refFields);
  // ყველა ობიექტებს ამოიღებს და არეების მიხედვით გაერთიანებს მაგათ ფილდებს
  const data = mergeProperties(articlesList,name);

  return gulp.src(src)
        .pipe($.template(data, {
            interpolate: /<%=([\s\S]+?)%>/g
        }))
        .pipe($.rename(path => {
            path.basename = getFileName(name, path.basename);
        }))
        .pipe(gulp.dest(dest));
}

function insertArticlesTemplate2(name, src, dest) {
    const articlesList = generateArticlesList(fields, refFields);
    // ყველა ობიექტებს ამოიღებს და არეების მიხედვით გაერთიანებს მაგათ ფილდებს
    const data = mergeProperties(articlesList,name);

    return gulp.src(src)
        .pipe($.template(data, {
            interpolate: /<%=([\s\S]+?)%>/g
        }))
        .pipe($.rename(path => {
            path.basename = getFileName(name, path.basename);
        }))
        .pipe(gulp.dest(dest));
}

function mergeProperties(data,name) {

  const names = {
    nameSingularUC: firstUC(singular(name)),
    namePluralLC: plural(name.toLowerCase()),
    namePluralFUC: firstUC(plural(name)),
    nameSingularLC: singular(name),
    nameSingularFUC: firstUC(singular(name)),
    singularFileName: _.kebabCase(singular(name)),
    pluralFileName: _.kebabCase(plural(name)),
  };

  const areas = [
    'formComponentImporArea',
    'formComponentClassInputArea',
    'formComponentClassPropertiesArea',
    'formComponentClassConstructorArgumentsArea',
    'formComponentClassOnInitBodyArea',

    'formComponentFormGroupArea',

    'formComponentClassBodyArea',
    'formComponentHtmlArea',

    'emptyObjectsForOpenModal',
    'modalImportsArea',
    'modalComponentClassPropertiesArea',
    'modalComponentClassViewChildArea',
    'modalComponentClassConstructorArgumentsArea',
    'modalComponentClassOnInitBodyArea',
    'modalComponentClassNgAfterViewInitArrayArea',
    'modalComponentClassFormValuesMergeArea',
    'formComponentBindParams',
    'modalHtmlTabArea',

    'listImportsArea',
    'listComponentClassPropertiesArea',
    'listComponentClassConstructorArgumentsArea',
    'listComponentClassOnInitBodyArea',
    'listHtmlColumnsArea',
    'listHtmlTabArea',

    'editPageComponentImportsArea',
    'editPageComponentClassPropertiesArea',
    'editPageComponentClassViewChildArea',
    'editPageComponentClassNgAfterViewInitArrayArea',
    'editPageComponentClassFormValuesMergeArea',
    'editPageComponentClassConstructorArgumentsArea',
    'editPageComponentClassOnInitBodyArea',
    'editPageComponentClassPageLoadDataMeta',
    'editPageHtmlTabArea',
  ];

  const areasObj = {};
  areas.map((area) => { areasObj[area] = ''});
 
  _.forEach(data, function (obj, key) {
        areas.map( (area) => {
            if (_.has(obj, area)) {
              areasObj[area] += obj[area];
            }
        });
  });
  
  return _.merge(areasObj,names);
}

function insertModelTemplate(name, src, dest, fields) {
  return gulp.src(src)
    .pipe($.template({
      nameUC: firstUC(name),
      nameLC: firstLC(name),
      namePlural: plural(name),
      nameSingularUC: firstUC(singular(name)),
      singularFileName: _.kebabCase(singular(name)),
      pluralFileName: _.kebabCase(plural(name)),
      interfaceFields: generateInterface(fields),
    }, {
      interpolate: /<%=([\s\S]+?)%>/g
    }))
    .pipe($.rename(path => {
      path.basename = getFileName(name, path.basename);
    }))
    .pipe(gulp.dest(dest));
}

function insertHttpTemplate(name, src, dest) {
  return gulp.src(src)
    .pipe($.template({
      nameUC: firstUC(name),
      nameLC: firstLC(name),
      namePlural: plural(name),
      nameSingular: singular(name),
      nameSingularUC: firstUC(singular(name)),
      singularFileName: _.kebabCase(singular(name)),
      pluralFileName: _.kebabCase(plural(name)),
    }, {
      interpolate: /<%=([\s\S]+?)%>/g
    }))
    .pipe($.rename(path => {
      path.basename = getFileName(name, path.basename);
    }))
    .pipe(gulp.dest(dest));
}

function getFileName(name, basename) {
  if (basename.includes('pluralFileName')) {
    return basename.replace('pluralFileName', _.kebabCase(plural(name)));
  } else if (basename.includes('singularFileName')) {
    return basename.replace('singularFileName', _.kebabCase(singular(name)));
  } else if (basename.includes('nameUC')) {
    return basename.replace('nameUC', firstUC(name));
  } else {
    return basename.replace('name', name);
  }
}
