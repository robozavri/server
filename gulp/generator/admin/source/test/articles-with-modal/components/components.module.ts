import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './filters/filters.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [FiltersComponent, ListComponent],
  imports: [
    CommonModule,
    SharedModule,
    DragDropModule,
  ],
  exports: [FiltersComponent, ListComponent, DragDropModule]
})
export class ComponentsModule { }
