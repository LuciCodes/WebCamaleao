
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoggedInGuard} from 'ngx-auth-firebaseui';

import { CandidateIndexComponent } from './candidate-index/candidate-index.component';
import { CandidateBasicInfoComponent } from './candidate-basic-info/candidate-basic-info.component';
import { CandidateCertificationsComponent } from './candidate-certifications/candidate-certifications.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { CandidateExperiencesComponent } from './candidate-experiences/candidate-experiences.component';
import { CandidateEducationComponent } from './candidate-education/candidate-education.component';
import { CandidateHabilitiesComponent } from './candidate-habilities/candidate-habilities.component';
import { CandidatePreferencesComponent } from './candidate-preferences/candidate-preferences.component';

const routes: Routes = [
  { 
    path: '',
    component: CandidateIndexComponent,
    canActivate: [LoggedInGuard],
    children: [
      { path: '', component: CandidateBasicInfoComponent },
      { path: 'certificacoes', component: CandidateCertificationsComponent },
      { path: 'perfil', component: CandidateProfileComponent },
      { path: 'escolaridade', component: CandidateEducationComponent },
      { path: 'experiencias', component: CandidateExperiencesComponent },
      { path: 'habilidades', component: CandidateHabilitiesComponent },
      { path: 'preferencias', component: CandidatePreferencesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }