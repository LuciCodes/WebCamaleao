
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';

import { JobOffersRoutingModule } from './job-offers.routing.module';

import { JobOffersIndexComponent } from './job-offers-index/job-offers-index.component';
import { JobOffersDetailComponent } from './job-offers-detail/job-offers-detail.component';
import { JobOffersSearchComponent } from './job-offers-search/job-offers-search.component';
import { JobOffersHomeComponent } from './job-offers-home/job-offers-home.component';

import { JobOfferCardComponent } from '../app-common/job-offer-card/job-offer-card.component';

@NgModule({
  declarations: [
    JobOfferCardComponent,
    JobOffersIndexComponent,
    JobOffersDetailComponent,
    JobOffersSearchComponent,
    JobOffersHomeComponent
  ],
  imports: [
    SharedModule,
    JobOffersRoutingModule
  ]
})
export class JobOffersModule {}
