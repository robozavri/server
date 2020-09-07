import * as _ from 'lodash';
import { 
    buildMultilingual,
    buildCheckFormElementEmpty,
    buildForModalEmpty
} from '../fields-helper';
import { availableLangs } from '../../fields';

export function dateBuilder(key, nested = null) {
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
        ${key}: [this.formData.${nested} || new Date()],`;
}

function buildHtml(key) {
    return  ` 
        <div fxLayout="row" fxLayoutAlign="space-between">
            <mat-form-field appearance="outline" fxFlex="50">
            <mat-label>${_.kebabCase(key)}</mat-label>
            <input matInput [matDatepicker]="startDatePicker" formControlName="${key}">
            <mat-datepicker-toggle matSuffix [for]="startDatePicker"></mat-datepicker-toggle>
            <mat-datepicker #startDatePicker></mat-datepicker>
            </mat-form-field>
        </div>
`;
}