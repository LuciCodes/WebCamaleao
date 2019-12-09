import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';

import { UserSearchComponent } from './views/users/user-search/user-search.component';
import { UserIndexComponent } from './views/users/user-index/user-index.component';
import { UserHomeComponent } from './views/users/user-home/user-home.component';
import { UserBasicInfoComponent } from './views/users/user-basic-info/user-basic-info.component';

import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './views/logout/logout.component';

import { AppIndexComponent } from './views/app-index/app-index.component';

import {LoggedInGuard} from 'ngx-auth-firebaseui';
import { OnboardComponent } from './views/onboard/onboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent,  },
  { path: 'logout', component: LogoutComponent,  },
  { path: 'cadastro', component: OnboardComponent },
  { path: 'candidate', loadChildren: './views/candidate/candidate.module#CandidateModule' },
  { path: '', component: AppIndexComponent, 
    children: [
      { path: '', component: HomeComponent },
      { path: 'vagas', loadChildren: './views/job-offers/job-offers.module#JobOffersModule' },
      { path: 'empresas', loadChildren: './views/companies/companies.module#CompaniesModule' },
      { path: 'matches', loadChildren: './views/matches/matches.module#MatchesModule' },
      { path: 'candidates', loadChildren: './views/candidates/candidates.module#CandidatesModule' },
      { path: 'usuarios',
        component: UserIndexComponent,
        canActivate: [LoggedInGuard],
        children: [
          { path: '', component: UserHomeComponent },
          { path: 'buscar', component: UserSearchComponent },
          { path: ':id', component: UserBasicInfoComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
