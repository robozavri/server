import * as _ from 'lodash';
import { 
    buildMultilingual,
    buildCheckFormElementEmpty,
    buildForModalEmpty
} from '../fields-helper';
import { availableLangs } from '../../fields';

export function quillEditorBuilder(key, nested = null) {
    return {
        formComponentClassOnInitBodyArea: buildCheckFormElementEmpty(key, nested,"''"),
        emptyObjectsForOpenModal:  buildForModalEmpty(key,"''"),
        formComponentFormGroupArea: buildFormGroup(key, nested),
        formComponentHtmlArea: buildHtml(key),
    }
}

function buildFormGroup(key, nested = null) {
    if (nested === null) {
        nested = key;
    }else{
        nested += key;
    }
    return `
        ${key}: [this.formData.${nested} || ''],`;
}

function buildHtml(key) {
    return `
        <div>
            <label class="formLabel">${_.kebabCase(key)}</label>
            <quill-editor formControlName="${key}"></quill-editor>
        </div>
    `;
}