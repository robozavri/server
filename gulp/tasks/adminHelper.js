import { listFields, availableLangs, selectFields } from './fields';
import * as _ from 'lodash';
import { firstUC, firstLC, plural, singular} from '../helpers';

export function generateListPropeties() {
    let template ='';
    let columns ='';
    if(!listFields) {
        return emptyObj;
    }

    Object.keys(listFields).map((key, index) => {
        columns += `'${key}', `;
        switch( listFields[key] ) {
            case 'multilingualSchema': template += listColumnHtmlMultilingual(key);
              break;
            case 'String': template += listColumnHtmlString(key);
              break;
        }
    });
    return {template: template, columns: columns};
  }
  
function listColumnHtmlMultilingual(key){
  return `
        <!-- ${key} Column -->
        <ng-container matColumnDef="${key}">
            <mat-header-cell *matHeaderCellDef #${key}Label>${_.upperFirst(key)}</mat-header-cell>
            <mat-cell *matCellDef="let item">
                <p class="text-truncate">{{item.${key}?.${availableLangs[0]}}}</p>
            </mat-cell>
        </ng-container>
  `;
}

function listColumnHtmlString(key){
  return `
        <!-- ${key} Column -->
        <ng-container matColumnDef="${key}">
            <mat-header-cell *matHeaderCellDef #${key}Label>${_.upperFirst(key)}</mat-header-cell>
            <mat-cell *matCellDef="let item">
                <p class="text-truncate">{{item?.${key}}}</p>
            </mat-cell>
        </ng-container>
  `;
}

export function generateMeta(fields){
  let obj = {
    modalImports: `import { MetaFormComponent } from '../../../../../../../shared/components/meta-form/meta-form.component';`,
    modalViewChild: `@ViewChild('MetaForm', { static: false }) MetaComponent: MetaFormComponent;`,
    modalNgAfterViewInit: `this.MetaComponent,`,
    modalMerge: `this.MetaComponent.getFormValue(),`,
    modalHtml: `
            <mat-tab label="metas">
                <div class="page_body">
                    <app-meta-form [meta]="metas" [showSubmit]="showSubmit" #MetaForm>
                    </app-meta-form>
                </div>
            </mat-tab>
    `,
    modalClassProperties: `metas: any;`,
    modalOnInitBody: `  
    // empty meta data object for making new meta object
    this.metas = {};`,  

    editPageImports: `import { MetaFormComponent } from '../../../../shared/components/meta-form/meta-form.component';`,
    editPageViewChild: `@ViewChild('MetaForm', { static: false }) MetaComponent: MetaFormComponent;`,
    editPageNgAfterViewInit: `this.MetaComponent,`,
    editPageMerge: `this.MetaComponent.getFormValue(),`,
    editPageHtml: `
                    <mat-tab label="metas">
                        <div class="page_body">
                            <app-meta-form [meta]="meta" [showSubmit]="showSubmit" #MetaForm></app-meta-form>
                        </div>
                    </mat-tab>
`,
    editPageClassProperties: `meta: any;`,
    editPageOnInitBody: `this.meta = {};`, 
    editPageLoadDataMeta: `this.meta = this.mainData.hasOwnProperty('meta') ? this.mainData.meta : {};`, 

    listComponentMetaHtml: `<mat-tab label="Meta">
                                <app-meta-form [meta]="item.meta" (submitMeta)="submitMeta($event, item._id)">
                                </app-meta-form>
                            </mat-tab>`, 
  };
  
  let hasMeta = false;
  Object.keys(fields).map((key, index) => {
      if (fields[key] === 'Meta' ) {
        hasMeta = true;
      }
  });

  if(hasMeta) {
    return obj;
  }
     return {
        modalImports: ``,
        modalViewChild: ``,
        modalNgAfterViewInit: ``,
        modalMerge: ``,
        modalHtml: ``,
        modalClassProperties: ``,
        modalOnInitBody: ``,  
    
        editPageImports: ``,
        editPageViewChild: ``,
        editPageNgAfterViewInit: ``,
        editPageMerge: ``,
        editPageHtml: ``,
        editPageClassProperties: ``,
        editPageOnInitBody: ``, 
        editPageLoadDataMeta: ``, 
        listComponentMetaHtml: ``, 
      };
}



export function generateSelect(fields) {
  let template = '';
  if(!fields) {
      return '';
  }

  Object.keys(fields).map((key, index) => {
    if (fields[key] === 'Select' ) {
      template += generateSelectArray(key);
    }
  });
  return template;
}

function generateSelectArray(key) {
  let template = '';
  selectFields[key].values.map( (value) => {
    template += `'${value}',`;
  });
  return `${ plural(key) } = [${template}];`;
}

export function genrateRefernce(fields, refFields) {
  let obj = {
    imports: '',
    inputs: '',
    classProperties: '',
    constructorArtuments: '',
    onInitBody: '',
    componentBindParams: '',
  };
  
  if(!fields) {
      return obj;
  }

  Object.keys(fields).map((key, index) => {
      if (fields[key] === 'Reference' ) {
          obj.imports = generateImport(key, refFields);
          obj.inputs = generateInputs(key, refFields);
          obj.classProperties = generateClassProperties(key, refFields);
          obj.constructorArtuments = generateConstructorArgument(key, refFields);
          obj.onInitBody = generateApiCall(key, refFields);
          obj.componentBindParams = generateBindParams(key, refFields);
      }
  });
  return obj;
}

function generateInputs(key, refFields) {
  return  `  
  @Input() ${ plural(key) }: any;
   `
}

function generateBindParams(key, refFields) {
  return  ` [${ plural(key) }]="${ plural(key) }" `;
}

function generateImport(key, refFields) {
  return `
import { ${ firstUC(singular( refFields[key].reference )) }ApiService } from 'app/shared/http/${_.kebabCase(singular( refFields[key].reference ))}-api.service';`;
}

function generateClassProperties(key, refFields) {
   return  `  
  ${ plural(key) }: any;
   `
}

function generateConstructorArgument(key, refFields) {
      return  `
    private ${ firstLC(singular( refFields[key].reference  )) }ApiService: ${ firstUC(singular( refFields[key].reference  )) }ApiService,
      `;
}

function generateApiCall(key, refFields) {
  return  `
    this.${ firstLC(singular( refFields[key].reference  )) }ApiService.getByQuery({all: true}).subscribe((data: any) => {
        this.${ plural(key) } = data.items;
    });
  `;
}