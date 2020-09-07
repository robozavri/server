import * as _ from 'lodash';
import { availableLangs, refFields, selectFields } from './fields';

export function generateSchema(fields = false) {
    if(!fields) {
        return '';
    }
    let template = '';

    Object.keys(fields).map((key, index) => {
        switch( fields[key] ) {
            case 'multilingualSchema-Textarea':  template += build(key, 'multilingualSchema');
              break;
            case 'multilingualSchema-quill-editor':  template += build(key, 'multilingualSchema');
              break;
            case 'multilingualSchema':  template += build(key, 'multilingualSchema');
              break;
            case 'quill-editor': template += build(key, 'String');
              break;
            case 'Textarea': template += build(key, 'String');
              break;
            case 'String': template += build(key, 'String');
              break;
            case 'Number': template += build(key, 'Number');
              break;
            case 'imageSchema':  template += build(key, 'imageSchema');
              break;
            case 'Date':  template += build(key, 'Date');
              break;
            case '[imageSchema]': template += build(key, '[imageSchema]');
              break;
            case 'Socials': template += build(key, '[{ account: String, link: String }]');
              break;
            case 'Reference': template += buildReference(key);
              break;
            case 'Select': template += buildSelect(key);
              break;
            case 'Slide-toggle': template += build(key, 'Boolean');
              break;
            case 'Meta': template += build(key, 'metaTagsSchema');
              break;
        }
    });
    return template;
}


function buildSelect(key) {
  if ( selectFields[key].selectType === 'multiple' ) {
    return build(key, `[String]`);
  }
  return build(key, `String`);
}

function buildReference(key) {
  if ( refFields[key].referenceType === 'multiple' ) {
    return build(key, `[{ type: Schema.Types.ObjectId, ref: '${ refFields[key].reference}' }]`);
  }
  return build(key, `{ type: Schema.Types.ObjectId, ref: '${ refFields[key].reference}'}`);
}

export function generateKeywordSearch(fields = false) {
    if(!fields) {
        return '';
    }
    let template = '';
    Object.keys(fields).map((key, index) => {
        switch( fields[key] ) {
            case 'multilingualSchema':  template += buildKeyword(key, 'multilingualSchema');
               break;
            case 'String': template += buildKeyword(key, 'String');
               break;
        }
    });
    return template;
}

export function generateBaseProps(fields = false) {
    if(!fields) {
        return '';
    }
    let template = '';

    Object.keys(fields).map((key, index) => {
        template += `
    '${key}',`;
    });
    
    return template;
}

export function generateSingleStub(fields = false) {
    if(!fields) {
        return  {objectNames: '', stubObjectMethods: ''};
    }
    let objectNames = '';
    let objectNamesWithI = '';
    let stubObjectMethods = '';

    Object.keys(fields).map((key, index) => {
      if (index == 0) {
        objectNames +=
          `  ${key}: get${_.upperFirst(key)}Object(),`;
   objectNamesWithI +=
          `${key}: get${_.upperFirst(key)}Object(i),`;
            stubObjectMethods += buildSingleStubObject(key, fields[key]);
      } else {
          objectNames += `
    ${key}: get${_.upperFirst(key)}Object(),`;
        objectNamesWithI += `
    ${key}: get${_.upperFirst(key)}Object(i),`;
            stubObjectMethods += buildSingleStubObject(key, fields[key]);
      }
    });
    
    return {objectNames: objectNames, objectNamesWithI: objectNamesWithI, stubObjectMethods: stubObjectMethods};
}

function build(key, value) {
    return `
  ${key}: ${value},`;
}

function buildKeyword(key, value) {
    let template = '';
    if (value == 'String') {
        return `
        { '${key}': { $regex: keyword, $options: 'i' } },
        `;
    }

    if (value == 'multilingualSchema') {
       
        availableLangs.map( (lang) => {
template += 
        `
        { '${key}.${lang}': { $regex: keyword, $options: 'i' } },
       `
        });
        return template;
    }
    
}

function buildSingleStubObject(key, type) {

    let templateContent = '';
    let socialGenHelper;
    switch( type ) {
        case 'multilingualSchema-Textarea':   
templateContent += `{
        ${buildMultilingualelement(key)}
    }`;
          break;
        case 'multilingualSchema-quill-editor':   
templateContent += `{
        ${buildMultilingualelement(key)}
    }`;
          break;
        case 'multilingualSchema':   
templateContent += `{
        ${buildMultilingualelement(key)}
    }`;
          break;
        case 'quill-editor':  templateContent += `'${key}'`;
          break;
        case 'Textarea':  templateContent += `'${key}'`;
          break;
        case 'String':  templateContent += `'${key}'`;
          break;

        case 'Number':  templateContent += `_.random(1, 20)`;
          break;

        case 'imageSchema':  templateContent += `{ url: generateImage()}`;
          break;

        case 'Date': templateContent += `new Date()`;
          break;
        case 'Slide-toggle': templateContent += `false`;
          break;
        case 'Select': templateContent += generateSelect(key);
          break;
        case 'Meta': templateContent += generateMetaObj(key);
          break;

        case '[imageSchema]':  
    templateContent += `[
        { url:  generateImage()},
        { url:  generateImage()},
        { url:  generateImage()}
    ]`;
          break;
        case 'Socials': 
    templateContent += `[
          { account: social, link: \`https://www.\${social}.com/\` },
          { account: social, link: \`https://www.\${social}.com/\` },
          { account: social, link: \`https://www.\${social}.com/\` }
    ]`;
      socialGenHelper = 'const social = generateSocials();';
          break;
    }

    if ( socialGenHelper !== undefined ) {
      return `
function get${_.upperFirst(key)}Object(i: number = 0): any {
    ${socialGenHelper}
    return ${templateContent};
}`;
    }else {
      return `

function get${_.upperFirst(key)}Object(i: number = 0): any {
    return ${templateContent};
}`;
    }
  
}

function buildMultilingualelement(key) {
  let template = '';
  availableLangs.map( (lang) => {
    template += 
        `
        ${lang}: \`${key} ${lang} \${i}\`,`;
  });
  return template;
}

function generateMetaObj(key) {
  return  `{
      title : {
         ${buildMultilingualelement(key)}
      },
      description : {
         ${buildMultilingualelement(key)}
      },
      keywords: ['${key} meta keyword1', '${key} meta keyword2', '${key} meta keyword3'],
      image: { url: generateImage() },
  }`;
}

function generateSelect(key) {

  if( selectFields[key].selectType === 'multiple' ) {
      let template = '';
      selectFields[key].values.map( (value) => {
        template += `'${value}',`;
      });
      return `[${template}]`;
  }
  const randomValue = selectFields[key].values[Math.floor(Math.random() * selectFields[key].values.length)];
  return `'${randomValue}'`;
 }