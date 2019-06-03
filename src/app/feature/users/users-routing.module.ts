import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import {UsersListComponent} from './users-list/users-list.component';
import {UsersAddComponent} from './users-add/users-add.component';
import {AuthGuard} from '../../core/auth/shared/auth.guard';

const usersRoutes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: UsersListComponent },
      { path: 'add', component: UsersAddComponent },
      { path: ':id', component: UsersDetailsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
