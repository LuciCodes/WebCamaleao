import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';

import { CompanyIndexComponent } from './views/companies/company-index/company-index.component';
import { CompanyHomeComponent } from './views/companies/company-home/company-home.component';
import { CompanyBasicInfoComponent } from './views/companies/company-basic-info/company-basic-info.component';
import { CompanySearchComponent } from './views/companies/company-search/company-search.component';

import { JobOfferSearchComponent } from './views/job-offers/job-offer-search/job-offer-search.component';
import { JobOfferIndexComponent } from './views/job-offers/job-offer-index/job-offer-index.component';
import { JobOfferHomeComponent } from './views/job-offers/job-offer-home/job-offer-home.component';
import { JobOfferBasicInfoComponent } from './views/job-offers/job-offer-basic-info/job-offer-basic-info.component';

import { MatchSearchComponent } from './views/matches/match-search/match-search.component';
import { MatchIndexComponent } from './views/matches/match-index/match-index.component';
import { MatchHomeComponent } from './views/matches/match-home/match-home.component';
import { MatchBasicInfoComponent } from './views/matches/match-basic-info/match-basic-info.component';

import { UserSearchComponent } from './views/users/user-search/user-search.component';
import { UserIndexComponent } from './views/users/user-index/user-index.component';
import { UserHomeComponent } from './views/users/user-home/user-home.component';
import { UserBasicInfoComponent } from './views/users/user-basic-info/user-basic-info.component';

import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './views/logout/logout.component';

import { AppIndexComponent } from './views/app-index/app-index.component';

import {LoggedInGuard} from 'ngx-auth-firebaseui';
import { OnboardComponent } from './views/onboard/onboard.component';

import { CandidateIndexComponent } from './views/candidates/candidate-index/candidate-index.component';
import { CandidateSearchComponent } from './views/candidates/candidate-search/candidate-search.component';
import { CandidateProfileComponent } from './views/candidates/candidate-profile/candidate-profile.component';
import { CandidateExperiencesComponent } from './views/candidates/candidate-experiences/candidate-experiences.component';
import { CandidateHabilitiesComponent } from './views/candidates/candidate-habilities/candidate-habilities.component';
import { CandidatePreferencesComponent } from './views/candidates/candidate-preferences/candidate-preferences.component';
import { CandidateEducationComponent } from './views/candidates/candidate-education/candidate-education.component';
import { CandidateBasicInfoComponent } from './views/candidates/candidate-basic-info/candidate-basic-info.component';
import { CandidateCertificationsComponent } from './views/candidates/candidate-certifications/candidate-certifications.component';
import { CandidateDetailsComponent } from './views/candidates/candidate-details/candidate-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent,  },
  { path: 'logout', component: LogoutComponent,  },
  { path: 'cadastro', component: OnboardComponent },
  { path: '', component: AppIndexComponent, 
    children: [
      { path: '', component: HomeComponent },
      { path: 'vagas',
        component: JobOfferIndexComponent,
        canActivate: [LoggedInGuard],
        children: [
          { path: '', component: JobOfferHomeComponent },
          { path: 'buscar', component: JobOfferSearchComponent },
          { path: ':id', component: JobOfferBasicInfoComponent }
        ]
      },
      { path: 'empresas',
        component: CompanyIndexComponent,
        canActivate: [LoggedInGuard],
        children: [
          { path: '', component: CompanyHomeComponent },
          { path: 'buscar', component: CompanySearchComponent },
          { path: ':id', component: CompanyBasicInfoComponent }
        ]
      },
      { path: 'matches',
        component: MatchIndexComponent,
        canActivate: [LoggedInGuard],
        children: [
          { path: '', component: MatchHomeComponent },
          { path: 'buscar', component: MatchSearchComponent },
          { path: ':id', component: MatchBasicInfoComponent }
        ]
      },
      { path: 'candidates',
        component: CandidateIndexComponent,
        canActivate: [LoggedInGuard],
        children: [
          { path: 'buscar', component: CandidateSearchComponent },
          { path: ':id', component: CandidateDetailsComponent }
        ]
      },
      { path: 'usuarios',
        component: UserIndexComponent,
        canActivate: [LoggedInGuard],
        children: [
          { path: '', component: UserHomeComponent },
          { path: 'buscar', component: UserSearchComponent },
          { path: ':id', component: UserBasicInfoComponent }
        ]
      },
      { path: 'candidate',
        component: CandidateIndexComponent,
        canActivate: [LoggedInGuard],
        children: [
          { path: '', component: CandidateBasicInfoComponent },
          { path: 'buscar', component: CandidateSearchComponent },
          { path: 'certificacoes', component: CandidateCertificationsComponent },
          { path: 'perfil', component: CandidateProfileComponent },
          { path: 'escolaridade', component: CandidateEducationComponent },
          { path: 'experiencias', component: CandidateExperiencesComponent },
          { path: 'habilidades', component: CandidateHabilitiesComponent },
          { path: 'preferencias', component: CandidatePreferencesComponent }
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
