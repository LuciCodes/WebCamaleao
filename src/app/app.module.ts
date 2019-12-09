
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './views/home/home.component';

import { LoginComponent } from './views/login/login.component';

import { WebApiService } from './services/webApi.service';
import { WebApiFirebaseService } from './services/webApi.firebase.service';
import { WebApiMockService } from './services/webApi.mock.service';
import { UserService } from './services/user.service';

import { CandidateService } from './services/candidate.service';
import { CandidateFirebaseService } from './services/candidate.firebase.service';
import { CandidateMockService } from './services/candidate.mock.service';

import { JobOfferService } from './services/job-offer.service';
import { JobOfferFirebaseService } from './services/job-offer.firebase.service';
import { JobOfferMockService } from './services/job-offer.mock.service';

import { AppIndexComponent } from './views/app-index/app-index.component';
import { LogoutComponent } from './views/logout/logout.component';
import { OnboardComponent } from './views/onboard/onboard.component';
import { AppHeaderComponent } from './views/app-common/app-header/app-header.component';
import { CamaleaoTagsComponent } from './views/app-common/camaleao-tags/camaleao-tags.component';

import { UserIndexComponent } from './views/users/user-index/user-index.component';
import { UserHomeComponent } from './views/users/user-home/user-home.component';
import { UserBasicInfoComponent } from './views/users/user-basic-info/user-basic-info.component';
import { UserSearchComponent } from './views/users/user-search/user-search.component';

import { HomeCandidateComponent } from './views/home/home-candidate/home-candidate.component';
import { HomeCompanyComponent } from './views/home/home-company/home-company.component';

import { SharedModule } from './shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeCandidateComponent,
    HomeCompanyComponent,
    LoginComponent,
    AppIndexComponent,
    LogoutComponent,
    OnboardComponent,
    AppHeaderComponent,
    CamaleaoTagsComponent,
    UserIndexComponent,
    UserHomeComponent,
    UserBasicInfoComponent,
    UserSearchComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    WebApiService,
    WebApiFirebaseService,
    WebApiMockService,
    UserService,
    CandidateService,
    CandidateFirebaseService,
    CandidateMockService,
    JobOfferService,
    JobOfferFirebaseService,
    JobOfferMockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
