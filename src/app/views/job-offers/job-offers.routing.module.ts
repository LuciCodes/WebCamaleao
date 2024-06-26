
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoggedInGuard} from 'ngx-auth-firebaseui';

import { JobOffersIndexComponent } from './job-offers-index/job-offers-index.component';
import { JobOffersSearchComponent } from './job-offers-search/job-offers-search.component';
import { JobOffersHomeComponent } from './job-offers-home/job-offers-home.component';
import { JobOffersDetailComponent } from './job-offers-detail/job-offers-detail.component';
import { JobOffersEditComponent } from './job-offers-edit/job-offers-edit.component';

const routes: Routes = [
  { 
    path: '',
    component: JobOffersIndexComponent,
      canActivate: [LoggedInGuard],
      children: [
        { path: '', component: JobOffersHomeComponent },
        { path: 'buscar', component: JobOffersSearchComponent },
        { path: 'incluir', component: JobOffersEditComponent },
        { path: 'editar/:id', component: JobOffersEditComponent },
        { path: ':id', component: JobOffersDetailComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobOffersRoutingModule { }