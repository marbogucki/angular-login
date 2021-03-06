import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CategoriesComponent} from './categories.component';
import {CategoriesListComponent} from './categories-list/categories-list.component';
import {CategoriesAddComponent} from './categories-add/categories-add.component';
import {RoleGuard} from '../../core/auth/shared/role.guard';
import {AuthGuard} from '../../core/auth/shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['admin']
    },
    component: CategoriesComponent,
    children: [
      {path: '', component: CategoriesListComponent},
      {path: 'add', component: CategoriesAddComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {
}
