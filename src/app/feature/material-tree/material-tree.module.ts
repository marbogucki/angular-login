import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialTreeRoutingModule } from './material-tree-routing.module';
import { MaterialTreeComponent } from './material-tree.component';

@NgModule({
  declarations: [MaterialTreeComponent],
  imports: [
    CommonModule,
    MaterialTreeRoutingModule
  ]
})
export class MaterialTreeModule { }
