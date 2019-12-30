
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';

import { CandidateRoutingModule } from './candidate.routing.module';

import { CandidateIndexComponent } from './candidate-index/candidate-index.component';
import { CandidateCvComponent } from './candidate-cv/candidate-cv.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { CandidateExperiencesComponent } from './candidate-experiences/candidate-experiences.component';
import { CandidateHabilitiesComponent } from './candidate-habilities/candidate-habilities.component';
import { CandidatePreferencesComponent } from './candidate-preferences/candidate-preferences.component';
import { CandidateEducationComponent } from './candidate-education/candidate-education.component';
import { CandidateBasicInfoComponent } from './candidate-basic-info/candidate-basic-info.component';
import { CandidateSocialNetworksComponent } from './candidate-social-networks/candidate-social-networks.component';
import { CandidateCertificationsComponent } from './candidate-certifications/candidate-certifications.component';

@NgModule({
  declarations: [
    CandidateIndexComponent,
    CandidateCvComponent,
    CandidateProfileComponent,
    CandidateExperiencesComponent,
    CandidateHabilitiesComponent,
    CandidatePreferencesComponent,
    CandidateEducationComponent,
    CandidateBasicInfoComponent,
    CandidateSocialNetworksComponent,
    CandidateCertificationsComponent
  ],
  imports: [
    SharedModule,
    CandidateRoutingModule
  ]
})
export class CandidateModule {}
