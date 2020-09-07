import * as _ from 'lodash';
import { 
    buildMultilingual,
    buildCheckFormElementEmpty,
    buildForModalEmpty
} from '../fields-helper';
import { availableLangs } from '../../fields';

export function imageBuilder(key, nested = null) {
    return {
        formComponentClassOnInitBodyArea: buildCheckFormElementEmpty(key, nested,"{}"),
        emptyObjectsForOpenModal:  buildForModalEmpty(key,"{}"),
        formComponentFormGroupArea: buildFormGroup(key, nested),
        formComponentHtmlArea: buildHtml(key, nested),
        formComponentClassBodyArea: imageMethodTemplate(key, nested)
    }
}

function buildFormGroup(key, nested = null) {
    if (nested === null) {
        nested = key;
    }else{
        nested += key;
    }
    return ` 
        ${key}: this.fb.group({
            url: [this.formData.${nested}.url || '']
        }),`;
}

function buildHtml(key, nested = null) {
    if (nested === null) {
        nested = key;
    }else{
        nested += key;
    }
    return  `
        <h3>${_.kebabCase(key)}</h3>
        <div class="inputs_container">
            <app-image-upload [image]="formData.${nested}" (uploadComplete)="onUploadComplete${_.upperFirst(key)}($event)"></app-image-upload>
        </div>
      `;
}

function imageMethodTemplate(key, nested = null) {
    if (nested === null) {
        nested = key;
    }else{
        nested += key;
    }
    return `
  onUploadComplete${_.upperFirst(key)}(data: any): void {
      this.form.get('${nested}').get('url').markAsTouched();
      this.form.get('${nested}').get('url').setValue(data.url);
  }
     `;
}