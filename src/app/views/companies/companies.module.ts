
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';

import { CompaniesRoutingModule } from './companies.routing.module';

import { CompaniesIndexComponent } from './companies-index/companies-index.component';
import { CompaniesBasicInfoComponent } from './companies-basic-info/companies-basic-info.component';
import { CompaniesSearchComponent } from './companies-search/companies-search.component';
import { CompaniesHomeComponent } from './companies-home/companies-home.component';

@NgModule({
  declarations: [
    CompaniesIndexComponent,
    CompaniesBasicInfoComponent,
    CompaniesSearchComponent,
    CompaniesHomeComponent
  ],
  imports: [
    SharedModule,
    CompaniesRoutingModule
  ]
})
export class CompaniesModule {}
