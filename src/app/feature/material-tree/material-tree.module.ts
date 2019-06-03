import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';

import { MaterialTreeRoutingModule } from './material-tree-routing.module';
import { MaterialTreeComponent } from './material-tree.component';
import {MatProgressSpinnerModule} from '@angular/material';

@NgModule({
  declarations: [MaterialTreeComponent],
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MaterialTreeRoutingModule
  ]
})
export class MaterialTreeModule { }
