import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import {CategoriesListComponent} from './categories-list/categories-list.component';
import { CategoriesAddComponent } from './categories-add/categories-add.component';

@NgModule({
  declarations: [CategoriesComponent, CategoriesListComponent, CategoriesAddComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
