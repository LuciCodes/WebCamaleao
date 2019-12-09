
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';

import { CandidatesRoutingModule } from './candidates.routing.module';

import { CandidatesIndexComponent } from './candidates-index/candidates-index.component';
import { CandidatesSearchComponent } from './candidates-search/candidates-search.component';
import { CandidatesDetailsComponent } from './candidates-details/candidates-details.component';

import { CandidadeCardComponent } from '../app-common/candidade-card/candidade-card.component';
import { CandidatePanelBasicInfoComponent } from '../app-common/candidate-panel-basic-info/candidate-panel-basic-info.component';
import { CandidatePanelDetailsComponent } from '../app-common/candidate-panel-details/candidate-panel-details.component';
import { CandidatePanelEducationComponent } from '../app-common/candidate-panel-education/candidate-panel-education.component';
import { CandidatePanelHabilitiesComponent } from '../app-common/candidate-panel-habilities/candidate-panel-habilities.component';
import { CandidatePanelExperienceComponent } from '../app-common/candidate-panel-experience/candidate-panel-experience.component';

@NgModule({
  declarations: [
    CandidatesIndexComponent,
    CandidatesSearchComponent,
    CandidatesDetailsComponent,
    CandidadeCardComponent,
    CandidatePanelBasicInfoComponent,
    CandidatePanelDetailsComponent,
    CandidatePanelEducationComponent,
    CandidatePanelHabilitiesComponent,
    CandidatePanelExperienceComponent
  ],
  imports: [
    SharedModule,
    CandidatesRoutingModule
  ]
})
export class CandidatesModule {}
