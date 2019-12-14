
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoggedInGuard} from 'ngx-auth-firebaseui';

import { CompaniesIndexComponent } from './companies-index/companies-index.component'
import { CompaniesSearchComponent } from './companies-search/companies-search.component';
import { CompaniesHomeComponent } from './companies-home/companies-home.component';
import { CompaniesDetailComponent } from './companies-detail/companies-detail.component';
import { CompaniesEditComponent } from './companies-edit/companies-edit.component';

const routes: Routes = [
  { 
    path: '',
    component: CompaniesIndexComponent,
      canActivate: [LoggedInGuard],
      children: [
        { path: '', component: CompaniesHomeComponent },
        { path: 'buscar', component: CompaniesSearchComponent },
        { path: 'incluir', component: CompaniesEditComponent },
        { path: 'editar/:id', component: CompaniesEditComponent },
        { path: ':id', component: CompaniesDetailComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }