import * as _ from 'lodash';
import { 
    buildMultilingual,
    buildCheckFormElementEmpty,
    buildForModalEmpty
} from '../fields-helper';
import { availableLangs } from '../../fields';

export function multilingualQuillEditorBuilder(key, nested) {
    return {
        formComponentClassOnInitBodyArea: buildCheckFormElementEmpty(key, nested, '{}'),
        emptyObjectsForOpenModal:  buildForModalEmpty(key, '{}'),
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
        ${key}: this.fb.group({
            ${buildMultilingual(nested)}
        }),`;
}

function buildHtml(key) {
    let templete = '';
    availableLangs.map((lang)=>{
templete +=  `
            <label class="formLabel">${_.kebabCase(key)} ${lang}</label>
            <quill-editor formControlName="${lang}"></quill-editor>
            `;
    });
    return `
        <div formGroupName='${key}'>
            ${templete}
        </div>
        `;
}