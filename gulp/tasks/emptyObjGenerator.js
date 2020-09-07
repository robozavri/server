import { availableLangs, refFields, selectFields } from './fields';

export function generateEmptyObjModal(fields = false) {
    let template = '';
    if(!fields) {
        return '';
    }

    Object.keys(fields).map((key, index) => {
        switch( fields[key] ) {
            case 'multilingualSchema-quill-editor': template += `
      ${key}: {},`;
            break;
            case 'multilingualSchema-Textarea': template += `
      ${key}: {},`;
            break;
            case 'multilingualSchema': template += `
      ${key}: {},`;
              break;
            case 'quill-editor':  template += `
      ${key}: '',`;
              break;
            case 'Textarea':  template += `
      ${key}: '',`;
              break;
            case 'String':  template += `
      ${key}: '',`;
              break;
            case 'Number': template += `
      ${key}: '',`;
              break;
            case 'imageSchema': template += `
      ${key}: {},`;
              break;
            case '[imageSchema]': template += `
      ${key}: [],`;
              break;
            case 'Date': template += `
      ${key}: new Date(),`;
              break;
            case 'Socials': template += `
      ${key}: [],`;
            break;
            case 'Meta': template += `
      ${key}: {},`;
            break;
            case 'Slide-toggle': template += `
      ${key}: false,`;
              break;
            case 'Reference':
                   template += detectReference(key);
              break;
            case 'Select':
                   template += detectSelect(key);
              break;
        }
    });
    return template;
  }
  
  function detectSelect(key) {
      if (selectFields[key].selectType === 'single') {
            return  `
      ${key}: '',`;
      }

      return  `
      ${key}: [],`;   
  }

  function detectReference(key) {
      if (refFields[key].referenceType === 'single') {
            return  `
      ${key}: '',`;
      }

      return  `
      ${key}: [],`;   
  }