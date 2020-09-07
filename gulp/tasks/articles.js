'use strict';

import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';
import paths from '../paths';
import * as _ from 'lodash';
import { fields, refFields, selectFields } from './fields';
import { generateListPropeties, genrateRefernce, generateSelect, generateMeta } from './adminHelper';
import { generateEmptyObjModal } from './emptyObjGenerator';
import { 
  generateFormGroup,
  generateImageMethods, 
  generateImagesMethods, 
  generateFormEmptyObjects, 
  generateSocialMethods,
  getterForSocials,
  importsForSocials
 } from './formGroupGenerator';
import { generateFormHtml } from './htmlFormGenerator';
import { generateInterface } from './generateInterface';
import { getIsGeenerateArgv, getNameFromArgv, getDefFieldsFromArgv, getDirFromArgv, firstUC, firstLC, plural, singular} from '../helpers';
const $ = require('gulp-load-plugins')();
const argv = $.util.env;


gulp.task('articles', (done) => {
  // runSequence('generateArticlesAdminComponent');
  runSequence('generateArticlesAdminComponent', 'generateHttp', 'generateModel', 'generateEditPage', done);
});


gulp.task('generateArticlesAdminComponent', () => {
    insertArticleMainTemplate();
});

function insertArticleMainTemplate(){
    const name = getNameFromArgv();
    let src,dest;
    
    if('false' === getIsGeenerateArgv()) { 
       src = paths.adminGeneratorTemplates.articlesWithModal;
       dest = path.join(paths.admin.adminModules, _.kebabCase(plural(name)));
    } else {
       src = paths.adminGeneratorTemplates.articles;
       dest = path.join(paths.admin.adminModules, _.kebabCase(plural(name)));
    }

    return insertArticlesTemplate(name, src, dest, fields);
}

gulp.task('generateHttp', () => {
  const name = getNameFromArgv();
  const src = paths.adminGeneratorTemplates.http;
  const dest = paths.admin.http; 
  return insertHttpTemplate(name, src, dest, true);
});

gulp.task('generateModel', () => {
  const name = getNameFromArgv();
  // const fields = getDefFieldsFromArgv();
  const src = paths.adminGeneratorTemplates.model;
  const dest = paths.admin.model;
  return insertModelTemplate(name, src, dest, fields);
});

gulp.task('generateEditPage', () => {
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
  // const fields = getDefFieldsFromArgv();
  const src = paths.adminGeneratorTemplates.editPage;
  const dest = path.join(paths.admin.adminModules, _.kebabCase(destDirName));
  return insertEditPageTemplate(name, src, dest, fields);
});

function insertEditPageTemplate(name, src, dest, fields) {
  const imagesMethods = generateImagesMethods(fields);
  const referObject = genrateRefernce(fields,refFields);
  const selectProperty = generateSelect(fields,selectFields);
  const meta = generateMeta(fields);

  return gulp.src(src)
        .pipe($.template({
            nameUC: firstUC(name),
            nameLC: firstLC(name),
            namePlural: plural(name),
            namePluralLC: plural(name.toLowerCase()),
            namePluralFUC: firstUC(plural(name)),
            nameSingularUC: firstUC(singular(name)),
            nameSingularLC: singular(name),
            nameSingularFUC: firstUC(singular(name)),
            singularFileName: _.kebabCase(singular(name)),
            pluralFileName: _.kebabCase(plural(name)),
            formModalEmptyObj: generateEmptyObjModal(fields),
            formGroup: generateFormGroup(fields),
            formEmptyObjects: generateFormEmptyObjects(fields),
            formHtml: generateFormHtml(fields),
            imageMethods: generateImageMethods(fields),
            imagesMethods: imagesMethods.methods,
            imagesProperties: imagesMethods.properties,
            socialsMethods: generateSocialMethods(fields),
            socialsGetter: getterForSocials(fields),
            socialsImport: importsForSocials(fields),

            imports: referObject.imports,
            classProperties: referObject.classProperties,
            constructorArtuments: referObject.constructorArtuments,
            onInitBody: referObject.onInitBody,

            selectProperty: selectProperty,

            editPageImports: meta.editPageImports,
            editPageViewChild: meta.editPageViewChild,
            editPageNgAfterViewInit: meta.editPageNgAfterViewInit,
            editPageMerge: meta.editPageMerge,
            editPageHtml: meta.editPageHtml,
            editPageClassProperties: meta.editPageClassProperties,
            editPageOnInitBody: meta.editPageOnInitBody, 
            editPageLoadDataMeta: meta.editPageLoadDataMeta, 
        }, {
            interpolate: /<%=([\s\S]+?)%>/g
        }))
        .pipe($.rename(path => {
            path.basename = getFileName(name, path.basename);
        }))
        .pipe(gulp.dest(dest));
}

function insertArticlesTemplate(name, src, dest, fields) {
    const imagesMethods = generateImagesMethods(fields);
    const listProperties = generateListPropeties();
    const referObject = genrateRefernce(fields,refFields);
    const selectProperty = generateSelect(fields,selectFields);
    const meta = generateMeta(fields);

    return gulp.src(src)
        .pipe($.template({
            nameUC: firstUC(name),
            nameLC: firstLC(name),
            namePlural: plural(name),
            namePluralLC: plural(name.toLowerCase()),
            namePluralFUC: firstUC(plural(name)),
            nameSingularLC: singular(name),
            nameSingularFUC: firstUC(singular(name)),
            singularFileName: _.kebabCase(singular(name)),
            pluralFileName: _.kebabCase(plural(name)),
            formModalEmptyObj: generateEmptyObjModal(fields),
            formGroup: generateFormGroup(fields),
            formEmptyObjects: generateFormEmptyObjects(fields),
            formHtml: generateFormHtml(fields),
            imageMethods: generateImageMethods(fields),
            imagesMethods: imagesMethods.methods,
            imagesProperties: imagesMethods.properties,
            listColumnsHtml: listProperties.template,
            listColumntTitles: listProperties.columns,

            socialsMethods: generateSocialMethods(fields),
            socialsGetter: getterForSocials(fields),
            socialsImport: importsForSocials(fields),

            modalImports: referObject.imports,
            modalClassProperties: referObject.classProperties,
            modalConstructorArtuments: referObject.constructorArtuments,
            modalOnInitBody: referObject.onInitBody,

            listImports: referObject.imports,
            formInputs: referObject.inputs,
            ListClassProperties: referObject.classProperties,
            listConstructorArtuments: referObject.constructorArtuments,
            listOnInitBody: referObject.onInitBody,
            listComponentBindParams: referObject.componentBindParams,

            selectProperty: selectProperty,

            MetaModalImports: meta.modalImports,
            MetaModalViewChild: meta.modalViewChild,
            MetaModalNgAfterViewInit: meta.modalNgAfterViewInit,
            MetaModalMerge: meta.modalMerge,
            MetaModalHtml: meta.modalHtml,
            MetaModalClassProperties: meta.modalClassProperties,
            MetaModalOnInitBody: meta.modalOnInitBody,  
      
            listComponentMetaHtml: meta.listComponentMetaHtml, 
        }, {
            interpolate: /<%=([\s\S]+?)%>/g
        }))
        .pipe($.rename(path => {
            path.basename = getFileName(name, path.basename);
        }))
        .pipe(gulp.dest(dest));
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
