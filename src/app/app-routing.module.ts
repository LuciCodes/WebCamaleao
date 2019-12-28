import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';

import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './views/logout/logout.component';

import { AppIndexComponent } from './views/app-index/app-index.component';

import {LoggedInGuard} from 'ngx-auth-firebaseui';

const routes: Routes = [
  { path: 'login', component: LoginComponent,  },
  { path: 'logout', component: LogoutComponent,  },
  { path: 'cadastro', component: LoginComponent },
  { path: '', component: AppIndexComponent, canActivate: [LoggedInGuard], 
    children: [
      { path: '', component: HomeComponent },
      { path: 'vagas', loadChildren: './views/job-offers/job-offers.module#JobOffersModule' },
      { path: 'empresas', loadChildren: './views/companies/companies.module#CompaniesModule' },
      { path: 'matches', loadChildren: './views/matches/matches.module#MatchesModule' },
      { path: 'candidate', loadChildren: './views/candidate/candidate.module#CandidateModule' },
      { path: 'candidates', loadChildren: './views/candidates/candidates.module#CandidatesModule' },
      { path: 'usuarios', loadChildren: './views/users/users.module#UsersModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
