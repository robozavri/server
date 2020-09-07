import * as _ from 'lodash';
import { 
    buildMultilingual,
    buildCheckFormElementEmpty,
    buildForModalEmpty
} from '../fields-helper';
import { availableLangs } from '../../fields';

export function textareaBuilder(key, nested = null) {
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
        <div fxLayout="row" fxLayoutAlign="space-between">
            <mat-form-field appearance="outline" floatLabel="always" class="w-100-p">
                <mat-label> ${_.kebabCase(key)} </mat-label>
                <textarea matInput placeholder="${_.kebabCase(key)}" formControlName="${key}" rows="5">
                </textarea>
            </mat-form-field>
        </div>
    `;
}