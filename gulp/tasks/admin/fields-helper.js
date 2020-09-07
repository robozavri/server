import {  availableLangs } from '../fields';

export function buildForModalEmpty(key, value){
    return `
        ${key}: ${value},`;
}

export function buildCheckFormElementEmpty(key, nested = null, obj){
    if (nested === null) {
        nested = key;
    }else{
        nested += key;
    }
    return `
    this.formData.${nested} = this.formData.${nested} || ${obj};`;
}

export function buildMultilingual(key) {
    let template = '';
    availableLangs.map( (lang) => {
        template += `
           ${lang}: [this.formData.${key}.${lang} || ''],`;
    });
    return template;
}