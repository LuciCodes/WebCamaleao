
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoggedInGuard} from 'ngx-auth-firebaseui';

import { JobOffersIndexComponent } from './job-offers-index/job-offers-index.component';
import { JobOffersSearchComponent } from './job-offers-search/job-offers-search.component';
import { JobOffersHomeComponent } from './job-offers-home/job-offers-home.component';
import { JobOffersBasicInfoComponent } from './job-offers-basic-info/job-offers-basic-info.component';

const routes: Routes = [
  { 
    path: 'vagas',
    component: JobOffersIndexComponent,
      canActivate: [LoggedInGuard],
      children: [
        { path: '', component: JobOffersHomeComponent },
        { path: 'buscar', component: JobOffersSearchComponent },
        { path: ':id', component: JobOffersBasicInfoComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobOffersRoutingModule { }