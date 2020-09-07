import * as _ from 'lodash';
import { availableLangs, refFields, selectFields } from './fields';

export function generateImageMethods(fields = false) {
    let template = '';

    Object.keys(fields).map((key, index) => {
        if ( fields[key] == 'imageSchema') {
            template += imageMethodTemplate(key);
        }
    });

    return template;
}

export function generateImagesMethods(fields = false) {
    let template = '';

    Object.keys(fields).map((key, index) => {
        if ( fields[key] == '[imageSchema]') {
            template += imagesMethodTemplate(key);
        }
    });
    const properties = `
  public images = [];
  public items: FormArray;
    `;

    return {methods: template, properties: properties };
}

export function generateFormGroup(fields = false) {
    let formTemplate = '';
    if(!fields) {
        return '';
    }
    
    Object.keys(fields).map((key, index) => {
        switch( fields[key] ) {
            case 'multilingualSchema-Textarea': formTemplate += `
            ${key}: this.fb.group({
                ${buildMultilingual(key)}
            }),`;
            break;
            case 'multilingualSchema-quill-editor': formTemplate += `
            ${key}: this.fb.group({
                ${buildMultilingual(key)}
            }),`;
            break;
            case 'multilingualSchema': formTemplate += `
            ${key}: this.fb.group({
                ${buildMultilingual(key)}
            }),`;
            break;
            case 'quill-editor': formTemplate += `
            ${key}: [this.formData.${key} || ''],`;
            break;
            case 'Textarea': formTemplate += `
            ${key}: [this.formData.${key} || ''],`;
            break;
            case 'String': formTemplate += `
            ${key}: [this.formData.${key} || ''],`;
            break;
            case 'Number': formTemplate += `
            ${key}: [this.formData.${key} || ''],`;
            break;
            case 'imageSchema': formTemplate += ` 
            ${key}: this.fb.group({
                url: [this.formData.${key}.url || '']
            }),`;
            break;
            case '[imageSchema]': formTemplate += `
            ${key}: this.fb.array(this.formData.${key} || []),`;
            break;
            case 'Date': formTemplate += `
            ${key}: [this.formData.${key} || new Date()],`;
            break;
            case 'Slide-toggle': formTemplate += `
            ${key}: [this.formData.${key} ],`;
            break;
            case 'Socials': formTemplate += `
            ${key}: this.fb.array( socialArray ),`;  
            break;
            case 'Reference': formTemplate += detectReference(key); 
            break;
            case 'Select': formTemplate += detectSelect(key); 
            break;
        }
    });

    return `this.fb.group({
        ${formTemplate}
    });
    `;
}

function detectSelect(key) {
    if (selectFields[key].selectType === 'single') {
          return   `
            ${key}: [this.formData.${key} || ''],`;
    }

    return   `
            ${key}: [this.formData.${key} || []],`;  
}

function detectReference(key) {
    if (refFields[key].referenceType === 'single') {
          return   `
            ${key}: [this.formData.${key} || ''],`;
    }

    return   `
            ${key}: [this.formData.${key} || []],`;  
}

function buildMultilingual(key) {
    let template = '';
    availableLangs.map( (lang) => {
        template += 
        `
                ${lang}: [this.formData.${key}.${lang} || ''],`;
    });
    return template;
}

export function generateFormEmptyObjects(fields = false) {
    let template = '';

    if(!fields) {
        return '';
    }

    Object.keys(fields).map((key, index) => {
        switch( fields[key] ) {
            case 'multilingualSchema-Textarea': template += `
    this.formData.${key} = this.formData.${key} || {};`;
            break;
            case 'multilingualSchema-quill-editor': template += `
    this.formData.${key} = this.formData.${key} || {};`;
            break;
            case 'multilingualSchema': template += `
    this.formData.${key} = this.formData.${key} || {};`;
            break;
            case 'quill-editor':  template += `
    this.formData.${key} = this.formData.${key} || '';`;
            break;
            case 'Textarea':  template += `
    this.formData.${key} = this.formData.${key} || '';`;
            break;
            case 'String':  template += `
    this.formData.${key} = this.formData.${key} || '';`;
            break;
            case 'Number':  template += `
    this.formData.${key} = this.formData.${key} || '';`;
            break;
            case 'imageSchema': template +=  `
    this.formData.${key} = this.formData.${key} || {};`;
            break;
            case '[imageSchema]':  template +=  `
    this.images = this.formData.${key} || [];`;
            break;
            case 'Date':  template += `
    this.formData.${key} = this.formData.${key} || new Date();`;
            break;
            case 'Socials': template += `
    const socialObj = { account: '', link: ''};
    const socialArray = (this.formData.${key} || [socialObj]).map((socialItem: any) => this.createSocials(socialItem));
    `;       break;
        }
    });
    return template;
}

export function generateSocialMethods(fields = false){
    if(!fields) {
        return '';
    }
    let template = '';
    Object.keys(fields).map((key, index) => {
        if (fields[key] === 'Socials') {
            template += `
  // ${key} methods
  createSocials(data: any): FormGroup {
      return this.fb.group({
          account: [ data.account || ''],
          link: [ data.link || ''],
      });
  }
  
  addSocials(details: string): void {
      const detailsForm = this.fb.group({
          account: [''],
          link: [''],
      });
      this[details].push(detailsForm);
  }

  deleteSocials(i: any): void{
      this.socials.removeAt(i);
  }`;
        }
    });
    return template;
}

export function getterForSocials(fields = false){
    let template = '';
    Object.keys(fields).map((key, index) => {
        if( fields[key] === 'Socials') {
            template += `
  get accounts(): any { return accounts; }

  get socials(): FormArray {
      return this.form.get('${key}') as FormArray;
  }`;
        }
    });

  return template;
}

export function importsForSocials(fields = false){
    let template = '';
    Object.keys(fields).map((key, index) => {
        if( fields[key] === 'Socials') {
            template += 
`import { accounts } from '../../../../../../shared/constants/socials';
            `;
        }
    });
  return template;
}

function imageMethodTemplate(key) {
 return `
  onUploadComplete${_.upperFirst(key)}(data: any): void {
      this.form.get('${key}').get('url').markAsTouched();
      this.form.get('${key}').get('url').setValue(data.url);
  }`
}

function imagesMethodTemplate(key) {
    return `
  // ${key} upload methods
  deleteImage${_.upperFirst(key)}(index: any): void {
     this.images.splice(index, 1);
     this.items = this.form.get('${key}') as FormArray;
     this.items.removeAt(index);
  }

  createItem${_.upperFirst(key)}(url= ''): FormGroup {
       return this.fb.group({
           url: url,
       });
  }

  addItem${_.upperFirst(key)}(url: any): void {
       this.items = this.form.get('images') as FormArray;
       this.items.push(this.createItem${_.upperFirst(key)}(url));
       this.images.push({ url: url });
  }

  onUploadComplete${_.upperFirst(key)}(data: any): void {
       this.addItem${_.upperFirst(key)}(data.url);
  }
   `
}

