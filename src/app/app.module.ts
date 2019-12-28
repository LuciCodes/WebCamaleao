
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
import { UserFirebaseService } from './services/user.firebase.service';
import { UserMockService } from './services/user.mock.service';

import { CandidateService } from './services/candidate.service';
import { CandidateFirebaseService } from './services/candidate.firebase.service';
import { CandidateMockService } from './services/candidate.mock.service';

import { CompanyService } from './services/company.service';
import { CompanyFirebaseService } from './services/company.firebase.service';
import { CompanyMockService } from './services/company.mock.service';

import { JobOfferService } from './services/job-offer.service';
import { JobOfferFirebaseService } from './services/job-offer.firebase.service';
import { JobOfferMockService } from './services/job-offer.mock.service';

import { AppIndexComponent } from './views/app-index/app-index.component';
import { LogoutComponent } from './views/logout/logout.component';
import { OnboardComponent } from './views/onboard/onboard.component';
import { AppHeaderComponent } from './views/app-common/app-header/app-header.component';
import { CamaleaoTagsComponent } from './views/app-common/camaleao-tags/camaleao-tags.component';

import { HomeCandidateComponent } from './views/home/home-candidate/home-candidate.component';
import { HomeCompanyComponent } from './views/home/home-company/home-company.component';

import { SharedModule } from './shared.module';
import { ImageService } from './services/image.service';
import { AngularFireFunctionsModule } from '@angular/fire/functions';


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
    CamaleaoTagsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AngularFireFunctionsModule
  ],
  exports: [
    AngularFireFunctionsModule
  ],
  providers: [
    WebApiService,
    WebApiFirebaseService,
    WebApiMockService,
    UserService,
    UserFirebaseService,
    UserMockService,
    CandidateService,
    CandidateFirebaseService,
    CandidateMockService,
    CompanyService,
    CompanyFirebaseService,
    CompanyMockService,
    JobOfferService,
    JobOfferFirebaseService,
    JobOfferMockService,
    ImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
