import * as _ from 'lodash';
import { 
    buildMultilingual,
    buildCheckFormElementEmpty,
    buildForModalEmpty
} from '../fields-helper';
import { availableLangs } from '../../fields';

export function multilingualTextareaBuilder(key, nested = null) {
    return {
        formComponentClassOnInitBodyArea: buildCheckFormElementEmpty(key, nested, '{}'),
        emptyObjectsForOpenModal: buildForModalEmpty(key, '{}'),
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
templete += 
           `<mat-form-field appearance="outline" floatLabel="always" class="w-100-p">
                <mat-label> ${_.kebabCase(key)} ${lang} </mat-label>
                <textarea matInput placeholder="${_.kebabCase(key)} ${lang}" formControlName="${lang}" rows="5">
                </textarea>
            </mat-form-field>
            `;
    });
    return `
        <div formGroupName='${key}'>
            ${templete}
        </div>
    `;
}