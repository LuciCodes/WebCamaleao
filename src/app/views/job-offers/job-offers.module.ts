
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';

import { JobOffersRoutingModule } from './job-offers.routing.module';

import { JobOffersIndexComponent } from './job-offers-index/job-offers-index.component';
import { JobOffersBasicInfoComponent } from './job-offers-basic-info/job-offers-basic-info.component';
import { JobOffersSearchComponent } from './job-offers-search/job-offers-search.component';
import { JobOffersHomeComponent } from './job-offers-home/job-offers-home.component';

@NgModule({
  declarations: [
    JobOffersIndexComponent,
    JobOffersBasicInfoComponent,
    JobOffersSearchComponent,
    JobOffersHomeComponent
  ],
  imports: [
    SharedModule,
    JobOffersRoutingModule
  ]
})
export class JobOffersModule {}
