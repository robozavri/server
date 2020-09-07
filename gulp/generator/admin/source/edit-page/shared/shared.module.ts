import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicInfoComponent } from './baisc-info/basic-info.component';

import { SharedModule as _SharedModule } from '../../../../../shared/shared.module';

@NgModule({
  declarations: [BasicInfoComponent],
  imports: [
    CommonModule,
    _SharedModule,
  ],
  exports: [BasicInfoComponent, _SharedModule]
})
export class SharedModule { }
