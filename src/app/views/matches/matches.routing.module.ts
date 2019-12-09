
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoggedInGuard} from 'ngx-auth-firebaseui';

import { MatchesIndexComponent } from './matches-index/matches-index.component'
import { MatchesSearchComponent } from './matches-search/matches-search.component';
import { MatchesHomeComponent } from './matches-home/matches-home.component';
import { MatchesBasicInfoComponent } from './matches-basic-info/matches-basic-info.component';

const routes: Routes = [
  { 
    path: '',
    component: MatchesIndexComponent,
      canActivate: [LoggedInGuard],
      children: [
        { path: '', component: MatchesHomeComponent },
        { path: 'buscar', component: MatchesSearchComponent },
        { path: ':id', component: MatchesBasicInfoComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchesRoutingModule { }