
import * as _ from 'lodash';
import { 
    buildCheckFormElementEmpty,
} from '../fields-helper';
import { availableLangs, listFields } from '../../fields';


export function buildListColumns() {
    return {
        listHtmlColumnsArea: generateListHtmlColumns(listFields),
        listComponentClassPropertiesArea: buildColumns(listFields)
    }
}

function buildColumns(listFields) {
    let columns ='';
    if(!listFields) {
        return '';
    }
    Object.keys(listFields).map((key, index) => {
        columns += `'${key}', `;
    });
  return `
  displayedColumns = [${columns}];`;
}

function generateListHtmlColumns(listFields) {
    let template ='';
    if(!listFields) {
        return '';
    }  
    Object.keys(listFields).map((key, index) => {
        switch( listFields[key] ) {
            case 'multilingualSchema': template += listColumnHtmlMultilingual(key);
              break;
            case 'String': template += listColumnHtmlString(key);
              break;
        }
    });
    return template;
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
  