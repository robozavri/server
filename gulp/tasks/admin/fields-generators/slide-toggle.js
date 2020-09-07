import * as _ from 'lodash';
import { 
    buildMultilingual,
    buildCheckFormElementEmpty,
    buildForModalEmpty
} from '../fields-helper';

export function slideToggleBuilder(key, nested = null) {
    return {
        formComponentClassOnInitBodyArea: buildCheckEmptyObj(key, nested),
        emptyObjectsForOpenModal:  buildForModalEmpty(key,"false"),
        formComponentFormGroupArea: buildFormGroup(key, nested),
        formComponentHtmlArea: buildHtml(key),
    }
}

function buildCheckEmptyObj(key, nested = null) {
    if (nested === null) {
        nested = key;
    }else{
        nested += key;
    }
    return `
    this.formData.${nested} = this.formData.${nested} === undefined ? false : this.formData.${nested};`;
}


function buildFormGroup(key, nested) {
    if (nested === null) {
        nested = key;
    }else{
        nested += key;
    }
  return  `
        ${key}: [this.formData.${nested}],`;
}

function buildHtml(key) {
    return `
        <div class="custom-slied-toggle">
            <mat-slide-toggle formControlName="${key}">${_.kebabCase(key)}</mat-slide-toggle>
        </div>
`;
}
