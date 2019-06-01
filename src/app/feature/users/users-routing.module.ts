import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import {UsersListComponent} from './users-list/users-list.component';
import {UsersAddComponent} from './users-add/users-add.component';

const usersRoutes: Routes = [
  {
    path: '',
    component: UsersComponent,
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
