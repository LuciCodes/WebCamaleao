
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoggedInGuard} from 'ngx-auth-firebaseui';

import { CandidatesIndexComponent } from './candidates-index/candidates-index.component'
import { CandidatesEditComponent } from './candidates-edit/candidates-edit.component'
import { CandidatesSearchComponent } from './candidates-search/candidates-search.component';
import { CandidatesDetailsComponent } from './candidates-details/candidates-details.component';

const routes: Routes = [
  { 
    path: '',
    component: CandidatesIndexComponent,
    canActivate: [LoggedInGuard],
    children: [
      { path: '', component: CandidatesSearchComponent },
      { path: 'buscar', component: CandidatesSearchComponent },
      { path: 'editar/:id', component: CandidatesEditComponent },
      { path: ':id', component: CandidatesDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatesRoutingModule { }