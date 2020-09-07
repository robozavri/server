import * as _ from 'lodash';
import { availableLangs, refFields, selectFields } from '../fields';

export function generateSchema(fields = false) {
    if(!fields) {
        return '';
    }
    let template = '';

    for (let key in fields) {
        if (typeof fields[key] === 'object') {
          template += buildFieldObject(key, fields[key]);
        } else {
          template += detectFieldType(key, fields[key]);
        }
    }
  return template;
}

function detectFieldType(key, type){
    switch( type ) {
      case 'multilingualSchema-Textarea':  return build(key, 'multilingualSchema');
      break;
    case 'multilingualSchema-quill-editor':  return build(key, 'multilingualSchema');
      break;
    case 'multilingualSchema':  return build(key, 'multilingualSchema');
      break;
    case 'quill-editor': return build(key, 'String');
      break;
    case 'Textarea': return build(key, 'String');
      break;
    case 'String': return build(key, 'String');
      break;
    case 'Number': return build(key, 'Number');
      break;
    case 'imageSchema': return build(key, 'imageSchema');
      break;
    case 'Date': return build(key, 'Date');
      break;
    case '[imageSchema]': return build(key, '[imageSchema]');
      break;
    case 'Socials': return build(key, '[{ account: String, link: String }]');
      break;
    case 'Reference': return build(key, buildReference(key));
      break;
    case 'Select': return build(key, buildSelect(key));
      break;
    case 'Slide-toggle': return build(key, 'Boolean');
      break;
    case 'Meta': return build(key, 'metaTagsSchema');
      break;
  }
}

function getSchemaType(key, type){
      switch( type ) {
        case 'multilingualSchema-Textarea':  return 'multilingualSchema';
        break;
      case 'multilingualSchema-quill-editor':  return 'multilingualSchema';
        break;
      case 'multilingualSchema':  return 'multilingualSchema';
        break;
      case 'quill-editor': return 'String';
        break;
      case 'Textarea': return 'String';
        break;
      case 'String': return 'String';
        break;
      case 'Number': return 'Number';
        break;
      case 'imageSchema': return 'imageSchema';
        break;
      case 'Date': return 'Date';
        break;
      case '[imageSchema]': return '[imageSchema]';
        break;
      case 'Socials': return '[{ account: String, link: String }]';
        break;
      case 'Reference': return buildReference(key);
        break;
      case 'Select': return buildSelect(key);
        break;
      case 'Slide-toggle': return'Boolean';
        break;
      case 'Meta': return 'metaTagsSchema';
        break;
    }
}

function buildFieldObject(key, obj) {
    let buildedObj = `${key}: `;
    buildedObj += nestedBuilder(key, obj);
    return buildedObj;
}

function nestedBuilder(key, obj) {
  let temp = ``
  if (typeof obj == "object") {
    temp +=  `{`;
      for (let property in obj) {
        temp += ` ${property}: `
        temp += nestedBuilder(property, obj[property]);
      }
    temp += `},`
  } else {
    temp += `${getSchemaType(key, obj)},`;
  }
  return temp;
}

function nestedStubBuilder(key, obj) {
  let temp = ``
  if (typeof obj == "object") {
    temp +=  `{`;
      for (let property in obj) {
        temp += ` ${property}: `
        temp += nestedStubBuilder(property, obj[property]);
      }
    temp += `},`
  } else {
    temp += `${buildStubObj(key, obj)},`;
  }
  return temp;
}

function buildStubObj(key, type) {
  let templateContent = '';

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
          case 'Reference': templateContent += `null`;
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
          { account: generateSocials(), link: \`https://www.\${generateSocials()}.com/\` },
          { account: generateSocials(), link: \`https://www.\${generateSocials()}.com/\` },
          { account: generateSocials(), link: \`https://www.\${generateSocials()}.com/\` }
    ]`;
    }
    return templateContent;
}

function buildSelect(key) {
  if ( selectFields[key].selectType === 'multiple' ) {
    return `[String]`;
  }
  return `String`;
}

function buildReference(key) {
  if ( refFields[key].referenceType === 'multiple' ) {
    return `[{ type: Schema.Types.ObjectId, ref: '${ refFields[key].reference}' }]`;
  }
  return`{ type: Schema.Types.ObjectId, ref: '${ refFields[key].reference}'}`;
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
// here starts stub generator
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
    if (typeof type == "object") {
      let result = nestedStubBuilder(key, type);
      return `
function get${_.upperFirst(key)}Object(i: number = 0): any {
    return ${ result.substring(0, result.length - 1) };
}`;
    }
    

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
        case 'Reference': templateContent += '';
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
    } else {
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