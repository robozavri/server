import * as _ from 'lodash';

export function metaBuilder(key) { console.log('movedit metashi')
    return {
        modalImportsArea: generateMeta('modalImports'),
        modalComponentClassPropertiesArea: generateMeta('modalClassProperties'),
        modalComponentClassViewChildArea: generateMeta('modalViewChild'),
        modalComponentClassNgAfterViewInitArrayArea: generateMeta('modalNgAfterViewInit'),
        modalComponentClassFormValuesMergeArea: generateMeta('modalMerge'),
        modalHtmlTabArea: generateMeta('modalHtml'),
        modalComponentClassPropertiesArea: generateMeta('modalClassProperties'),
        modalComponentClassOnInitBodyArea: generateMeta('modalOnInitBody'),

        editPageComponentImportsArea: generateMeta('editPageImports'),
        editPageComponentClassViewChildArea: generateMeta('editPageViewChild'),
        editPageComponentClassNgAfterViewInitArrayArea: generateMeta('editPageNgAfterViewInit'),
        editPageComponentClassFormValuesMergeArea: generateMeta('editPageMerge'),
        editPageHtmlTabArea: generateMeta('editPageHtml'),
        editPageComponentClassPropertiesArea: generateMeta('editPageClassProperties'),
        editPageComponentClassOnInitBodyArea: generateMeta('editPageOnInitBody'),
        editPageComponentClassPageLoadDataMeta: generateMeta('editPageLoadDataMeta'),

        listHtmlTabArea: generateMeta('listComponentMetaHtml'),
    }
}

function generateMeta(property){
    let obj = {
      modalImports: `
import { MetaFormComponent } from '../../../../../../../shared/components/meta-form/meta-form.component';`,
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
      modalClassProperties: `
  metas: any;`,
      modalOnInitBody: `
    this.metas = {};`,  
  
      editPageImports: `
import { MetaFormComponent } from '../../../../shared/components/meta-form/meta-form.component';`,
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
      editPageClassProperties: `
  meta: any;`,
      editPageOnInitBody: `
    this.meta = {};`, 
      editPageLoadDataMeta: `this.meta = this.mainData.hasOwnProperty('meta') ? this.mainData.meta : {};`, 
  
      listComponentMetaHtml: `<mat-tab label="Meta">
                                  <app-meta-form [meta]="item.meta" (submitMeta)="submitMeta($event, item._id)">
                                  </app-meta-form>
                              </mat-tab>`, 
    };
    return obj[property];
  
  }
  /*
  
function generateViewChild() {
   return `@ViewChild('MetaForm', { static: false }) MetaComponent: MetaFormComponent;`;.
}

function generateNgAfterViewInit() {
 return `this.MetaComponent,`;
}

function generateMerge() {
    return `this.MetaComponent.getFormValue(),`;
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
  import { MetaFormComponent } from '../../../../../../../shared/components/meta-form/meta-form.component';`;
}

function geenrateTabHtml() {
    return `
            <mat-tab label="metas">
                <div class="page_body">
                    <app-meta-form [meta]="metas" [showSubmit]="showSubmit" #MetaForm>
                    </app-meta-form>
                </div>
            </mat-tab>
      `
}

function generateOnInitBody() {
    return `
    this.metas = {};`;
}

function generateClassProperties(key) {
    return `metas: any;`;
}

function generateConstructorArgument(key) {
  
}

function generateApiCall(key) {
 
}
  */