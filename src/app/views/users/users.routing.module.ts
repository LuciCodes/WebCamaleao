
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoggedInGuard} from 'ngx-auth-firebaseui';

import { UsersIndexComponent } from './users-index/users-index.component'
import { UsersSearchComponent } from './users-search/users-search.component';
import { UsersHomeComponent } from './users-home/users-home.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { UsersEditComponent } from './users-edit/users-edit.component';

const routes: Routes = [
  { 
    path: '',
    component: UsersIndexComponent,
      canActivate: [LoggedInGuard],
      children: [
        { path: '', component: UsersHomeComponent },
        { path: 'buscar', component: UsersSearchComponent },
        { path: 'incluir', component: UsersEditComponent },
        { path: 'editar/:id', component: UsersEditComponent },
        { path: ':id', component: UsersDetailComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }