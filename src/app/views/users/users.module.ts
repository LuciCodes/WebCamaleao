
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';

import { UsersRoutingModule } from './users.routing.module';

import { UsersIndexComponent } from './users-index/users-index.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { UsersSearchComponent } from './users-search/users-search.component';
import { UsersHomeComponent } from './users-home/users-home.component';
import { UsersEditComponent } from './users-edit/users-edit.component';

@NgModule({
  declarations: [
    UsersIndexComponent,
    UsersDetailComponent,
    UsersEditComponent,
    UsersSearchComponent,
    UsersHomeComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule {}
