import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MaterialTreeComponent} from './material-tree.component';

const routes: Routes = [
  { path: '', component: MaterialTreeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialTreeRoutingModule { }
