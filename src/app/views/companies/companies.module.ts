
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';

import { CompaniesRoutingModule } from './companies.routing.module';

import { CompaniesIndexComponent } from './companies-index/companies-index.component';
import { CompaniesDetailComponent } from './companies-detail/companies-detail.component';
import { CompaniesSearchComponent } from './companies-search/companies-search.component';
import { CompaniesHomeComponent } from './companies-home/companies-home.component';
import { CompaniesEditComponent } from './companies-edit/companies-edit.component';

@NgModule({
  declarations: [
    CompaniesIndexComponent,
    CompaniesDetailComponent,
    CompaniesEditComponent,
    CompaniesSearchComponent,
    CompaniesHomeComponent
  ],
  imports: [
    SharedModule,
    CompaniesRoutingModule
  ]
})
export class CompaniesModule {}
