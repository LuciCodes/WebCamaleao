
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';

import { CandidatesRoutingModule } from './candidates.routing.module';

import { CandidatesIndexComponent } from './candidates-index/candidates-index.component';
import { CandidatesSearchComponent } from './candidates-search/candidates-search.component';
import { CandidatesDetailsComponent } from './candidates-details/candidates-details.component';
import { CandidatesEditComponent } from './candidates-edit/candidates-edit.component';

import { CandidadeCardComponent } from '../app-common/candidade-card/candidade-card.component';
import { CandidatePanelBasicInfoComponent } from '../app-common/candidate-panel-basic-info/candidate-panel-basic-info.component';
import { CandidatePanelDetailsComponent } from '../app-common/candidate-panel-details/candidate-panel-details.component';
import { CandidatePanelEducationComponent } from '../app-common/candidate-panel-education/candidate-panel-education.component';
import { CandidatePanelHabilitiesComponent } from '../app-common/candidate-panel-habilities/candidate-panel-habilities.component';
import { CandidatePanelExperienceComponent } from '../app-common/candidate-panel-experience/candidate-panel-experience.component';

import { CandidatePanelBasicInfoEditComponent } from '../app-common/candidate-panel-basic-info-edit/candidate-panel-basic-info-edit.component';
import { CandidatePanelDetailsEditComponent } from '../app-common/candidate-panel-details-edit/candidate-panel-details-edit.component';
import { CandidatePanelEducationEditComponent } from '../app-common/candidate-panel-education-edit/candidate-panel-education-edit.component';
import { CandidatePanelHabilitiesEditComponent } from '../app-common/candidate-panel-habilities-edit/candidate-panel-habilities-edit.component';
import { CandidatePanelExperienceEditComponent } from '../app-common/candidate-panel-experience-edit/candidate-panel-experience-edit.component';


@NgModule({
  declarations: [
    CandidatesIndexComponent,
    CandidatesSearchComponent,
    CandidatesDetailsComponent,
    CandidatesEditComponent,
    CandidadeCardComponent,
    CandidatePanelBasicInfoComponent,
    CandidatePanelDetailsComponent,
    CandidatePanelEducationComponent,
    CandidatePanelHabilitiesComponent,
    CandidatePanelExperienceComponent,
    CandidatePanelBasicInfoEditComponent,
    CandidatePanelDetailsEditComponent,
    CandidatePanelEducationEditComponent,
    CandidatePanelHabilitiesEditComponent,
    CandidatePanelExperienceEditComponent
  ],
  imports: [
    SharedModule,
    CandidatesRoutingModule
  ]
})
export class CandidatesModule {}
