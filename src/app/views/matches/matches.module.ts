
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';

import { MatchesRoutingModule } from './matches.routing.module';

import { MatchesIndexComponent } from './matches-index/matches-index.component';
import { MatchesBasicInfoComponent } from './matches-basic-info/matches-basic-info.component';
import { MatchesSearchComponent } from './matches-search/matches-search.component';
import { MatchesHomeComponent } from './matches-home/matches-home.component';

@NgModule({
  declarations: [
    MatchesIndexComponent,
    MatchesBasicInfoComponent,
    MatchesSearchComponent,
    MatchesHomeComponent
  ],
  imports: [
    SharedModule,
    MatchesRoutingModule
  ]
})
export class MatchesModule {}
