import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './core/auth/login/login.component';
import {RegisterComponent} from './core/auth/register/register.component';

const routes: Routes = [
  { path: 'home', loadChildren: './feature/home/home.module#HomeModule' },
  { path: 'users', loadChildren: './feature/users/users.module#UsersModule' },
  { path: 'material-tree', loadChildren: './feature/material-tree/material-tree.module#MaterialTreeModule' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
