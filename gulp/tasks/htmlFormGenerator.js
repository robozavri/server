import * as _ from 'lodash';
import { availableLangs, refFields, selectFields } from './fields';
import {firstUC, firstLC, plural, singular} from '../helpers';


export function generateFormHtml(fields = false) {
    let emptyObj = {};
    let formTemplate = '';
    if(!fields) {
        return '';
    }
  
    Object.keys(fields).map((key, index) => {
        switch( fields[key] ) {
            case 'Textarea':  emptyObj[key] = textarea(key);
              break;
            case 'quill-editor':  emptyObj[key] = quillEditor(key);
              break;
            case 'multilingualSchema-quill-editor':  emptyObj[key] = multilingualSchemaQuillEditor(key);
              break;
            case 'multilingualSchema-Textarea':  emptyObj[key] = multilingualTextarea(key);
              break;
            case 'multilingualSchema':  emptyObj[key] = multilingual(key);
              break;
            case 'String':  emptyObj[key] = string(key);
              break;
            case 'Number':  emptyObj[key] = number(key);
              break;
            case 'imageSchema':  emptyObj[key] =  image(key);
              break;
            case 'Date':  emptyObj[key] = date(key);
              break;
            case '[imageSchema]':  emptyObj[key] = images(key);
              break;
            case 'Socials':  emptyObj[key] = socials(key);
              break;
            case 'Reference': emptyObj[key] = reference(key); 
              break;
            case 'Select': emptyObj[key] = Select(key); 
              break;
            case 'Slide-toggle': emptyObj[key] = slideToggle(key); 
              break;
        }
    });
    Object.keys(emptyObj).map((key, index) => {
        formTemplate += emptyObj[key];
    });
   
    return formTemplate;
}

function slideToggle(key) {
    return `
        <div class="custom-slied-toggle">
            <mat-slide-toggle formControlName="${key}">${_.kebabCase(key)}</mat-slide-toggle>
        </div>
`;
}

function Select(key) {
    const pluralName = plural(key);
    const multiple = selectFields[key].selectType === 'multiple' ? 'multiple': '';

    return `
        <mat-form-field [style.width.px]=500 *ngIf="${pluralName}">
            <mat-label>${_.kebabCase(key)}</mat-label>
            <mat-select formControlName="${key}" ${multiple}>
                <mat-option *ngFor="let item of ${pluralName}" [value]="item">{{ item }}</mat-option>
            </mat-select>
        </mat-form-field>
`;
}

function reference(key) {
    const pluralName = plural(key);
    const multiple = refFields[key].referenceType === 'multiple' ? 'multiple': '';

    return `
        <mat-form-field [style.width.px]=500 *ngIf="${pluralName}">
            <mat-label>${_.kebabCase(key)}</mat-label>
            <mat-select formControlName="${key}" ${multiple}>
                <mat-option *ngFor="let item of ${pluralName}" [value]="item.${refFields[key].value}">{{ item.${refFields[key].displayFieldName} }}</mat-option>
            </mat-select>
        </mat-form-field>
`;
}

function textarea(key) {
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

function quillEditor(key) {
    return `
        <div>
            <label class="formLabel">${_.kebabCase(key)}</label>
            <quill-editor formControlName="${key}"></quill-editor>
        </div>
    `;
}

function multilingualSchemaQuillEditor(key) {
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

function multilingualTextarea(key) {
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


function multilingual(key) {
    let templete = '';
    availableLangs.map((lang)=>{
templete +=  `
            <mat-form-field appearance="outline" floatLabel="always" fxFlex="30">
                <mat-label> ${_.kebabCase(key)} ${lang} </mat-label>
                <input matInput placeholder="${_.kebabCase(key)} ${lang}" formControlName="${lang}">
            </mat-form-field>
                `
    });
    return `
        <div fxLayout="row" fxLayoutAlign="space-between" formGroupName='${key}'>
            ${templete}
        </div>
    `;
}

function string(key) {
  return  `
        <div fxLayout="row" fxLayoutAlign="space-between">
            <mat-form-field appearance="outline" floatLabel="always" fxFlex="50">
                <mat-label> ${_.kebabCase(key)}</mat-label>
                <input matInput placeholder="${key}" formControlName="${key}">
            </mat-form-field>
        </div>
    `;
}

function number(key) {
  return  `
        <div fxLayout="row" fxLayoutAlign="space-between">
            <mat-form-field appearance="outline" floatLabel="always" fxFlex="20">
                <mat-label>${_.kebabCase(key)}</mat-label>
                <input matInput type="number" min="0" formControlName="${key}">
            </mat-form-field>
        </div>
    `;
}

function image(key) {
    return  `
        <h3>${_.kebabCase(key)}</h3>
        <div class="inputs_container">
            <app-image-upload [image]="formData.${key}" (uploadComplete)="onUploadComplete${_.upperFirst(key)}($event)"></app-image-upload>
        </div>
      `;
}

function date(key) {
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

function images(key) {
    return  `
        <h3>${_.kebabCase(key)}</h3>
        <div class="inputs_container">
            <app-images-upload *ngIf="images" [images]="images" (removeImage)="deleteImage${_.upperFirst(key)}($event)" (uploadComplete)="onUploadComplete${_.upperFirst(key)}($event)"></app-images-upload>
        </div>
  `;
}

function socials(key){
    return `
        <h2>${_.kebabCase(key)}</h2>
        <div formArrayName="${key}">
            <mat-card *ngFor="let item of socials.controls; let i = index;" style="margin-bottom: 20px;">
                <h2>Account {{i + 1}}</h2>
                <div [formGroupName]="i" style="margin: 20px">
                    <div fxLayout="column" fxLayoutAlign="">

                        <mat-form-field  [style.width.px]=300 >
                            <mat-label>Account</mat-label>
                            <mat-select  formControlName="account">
                                <mat-option *ngFor="let account of accounts" [value]="account">{{ account }}</mat-option>
                            </mat-select>
                        </mat-form-field>

                        <mat-form-field appearance="outline" floatLabel="always" fxFlex="40">
                            <mat-label> link </mat-label>
                            <input matInput placeholder="link" name="link" formControlName="link">
                        </mat-form-field>
                    </div>
                    <button type="button" mat-raised-button color="warn" (click)="deleteSocials(i)">
                        <mat-icon>delete</mat-icon>
                    </button>
                </div>
            </mat-card>
            <button type="button" mat-raised-button color="accent" (click)="addSocials('socials')"
                    style="margin-bottom: 30px;">
                <mat-icon>add</mat-icon>
            </button>
        </div>

    `;
}
