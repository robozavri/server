import * as _ from 'lodash';
import { 
    buildMultilingual,
    buildCheckFormElementEmpty,
    buildForModalEmpty
} from '../fields-helper';
import { availableLangs, refFields } from '../../fields';
import { plural, firstLC, firstUC, singular } from '../../../helpers';

export function referenceBuilder(key, nested = null) {
  const selectType = refFields[key].referenceType === 'single' ? "''" : '[]';
    return {
        formComponentClassOnInitBodyArea: buildCheckFormElementEmpty(key, nested,selectType),
        emptyObjectsForOpenModal:  buildForModalEmptyObj(key),
        formComponentFormGroupArea: buildFormGroup(key, nested),
        formComponentHtmlArea: buildHtml(key),
        
        formComponentClassInputArea: generateInputs(key),

        modalImportsArea: generateImport(key),
        modalComponentClassPropertiesArea: generateClassProperties(key),
        modalComponentClassConstructorArgumentsArea: generateConstructorArgument(key),
        modalComponentClassOnInitBodyArea: generateApiCall(key),

        formComponentBindParams: generateBindParams(key),

        listImportsArea: generateImport(key),
        listComponentClassOnInitBodyArea: generateApiCall(key),
        listComponentClassPropertiesArea: generateClassProperties(key),
        listComponentClassConstructorArgumentsArea: generateConstructorArgument(key),

        editPageComponentImportsArea: generateImport(key),
        editPageComponentClassPropertiesArea: generateClassProperties(key),
        editPageComponentClassConstructorArgumentsArea: generateConstructorArgument(key),
        editPageComponentClassOnInitBodyArea: generateApiCall(key),
    }
}


function buildForModalEmptyObj(key) {
  if (refFields[key].referenceType === 'single') {
        return  `
        ${key}: '',`;
  }

  return  `
        ${key}: [],`;   
}

function buildFormGroup(key, nested = null) {
  if (nested === null) {
      nested = key;
  }else{
      nested += key;
  }
  if (refFields[key].referenceType === 'single') {
    return   `
        ${key}: [this.formData.${nested} || ''],`;
}

    return   `
        ${key}: [this.formData.${nested} || []],`;  
}

function buildHtml(key) {
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


function generateInputs(key) {
  return  `  
  @Input() ${ plural(key) }: any;
   `
}

function generateBindParams(key) {
  return  ` [${ plural(key) }]="${ plural(key) }" `;
}

function generateImport(key) {
  return `
import { ${ firstUC(singular( refFields[key].reference )) }ApiService } from 'app/shared/http/${_.kebabCase(singular( refFields[key].reference ))}-api.service';
`;
}

function generateClassProperties(key) {
   return  `  
  ${ plural(key) }: any;
   `
}

function generateConstructorArgument(key) {
      return  `
    private ${ firstLC(singular( refFields[key].reference  )) }ApiService: ${ firstUC(singular( refFields[key].reference  )) }ApiService,
      `;
}

function generateApiCall(key) {
  return  `
    this.${ firstLC(singular( refFields[key].reference  )) }ApiService.getByQuery({all: true}).subscribe((data: any) => {
        this.${ plural(key) } = data.items;
    });
  `;
}