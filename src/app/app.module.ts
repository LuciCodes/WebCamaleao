import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularFirestoreModule } from '@angular/fire/firestore';
//import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule } from '@angular/material/chips'; 
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './views/home/home.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { JobOfferSearchComponent } from './views/job-offers/job-offer-search/job-offer-search.component';
import { JobOfferIndexComponent } from './views/job-offers/job-offer-index/job-offer-index.component';
import { JobOfferHomeComponent } from './views/job-offers/job-offer-home/job-offer-home.component';
import { JobOfferBasicInfoComponent } from './views/job-offers/job-offer-basic-info/job-offer-basic-info.component';

import { TextMaskModule } from 'angular2-text-mask';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './views/login/login.component';

import { WebApiService } from './services/webApi.service';
import { WebApiFirebaseService } from './services/webApi.firebase.service';
import { WebApiMockService } from './services/webApi.mock.service';
import { UserService } from './services/user.service';
import { CandidateService } from './services/candidate.service';
import { CandidateFirebaseService } from './services/candidate.firebase.service';
import { CandidateMockService } from './services/candidate.mock.service';

import { AppIndexComponent } from './views/app-index/app-index.component';
import { LogoutComponent } from './views/logout/logout.component';
import { OnboardComponent } from './views/onboard/onboard.component';
import { AppHeaderComponent } from './views/app-common/app-header/app-header.component';
import { CamaleaoTagsComponent } from './views/app-common/camaleao-tags/camaleao-tags.component';
import { CandidateIndexComponent } from './views/candidates/candidate-index/candidate-index.component';
import { CandidateProfileComponent } from './views/candidates/candidate-profile/candidate-profile.component';
import { CandidateExperiencesComponent } from './views/candidates/candidate-experiences/candidate-experiences.component';
import { CandidateHabilitiesComponent } from './views/candidates/candidate-habilities/candidate-habilities.component';
import { CandidatePreferencesComponent } from './views/candidates/candidate-preferences/candidate-preferences.component';

import { CompanyIndexComponent } from './views/companies/company-index/company-index.component';
import { CompanyHomeComponent } from './views/companies/company-home/company-home.component';
import { CompanyBasicInfoComponent } from './views/companies/company-basic-info/company-basic-info.component';
import { CompanySearchComponent } from './views/companies/company-search/company-search.component';

import { MatchIndexComponent } from './views/matches/match-index/match-index.component';
import { MatchHomeComponent } from './views/matches/match-home/match-home.component';
import { MatchBasicInfoComponent } from './views/matches/match-basic-info/match-basic-info.component';
import { MatchSearchComponent } from './views/matches/match-search/match-search.component';

import { UserIndexComponent } from './views/users/user-index/user-index.component';
import { UserHomeComponent } from './views/users/user-home/user-home.component';
import { UserBasicInfoComponent } from './views/users/user-basic-info/user-basic-info.component';
import { UserSearchComponent } from './views/users/user-search/user-search.component';

import { HomeCandidateComponent } from './views/home/home-candidate/home-candidate.component';
import { HomeCompanyComponent } from './views/home/home-company/home-company.component';
import { CandidateSearchComponent } from './views/candidates/candidate-search/candidate-search.component';
import { CandidateEducationComponent } from './views/candidates/candidate-education/candidate-education.component';
import { CandidateBasicInfoComponent } from './views/candidates/candidate-basic-info/candidate-basic-info.component';
import { CandidateSocialNetworksComponent } from './views/candidates/candidate-social-networks/candidate-social-networks.component';
import { AreaNamePipe } from './pipes/area-name.pipe';
import { SimpleLabelPipe } from './pipes/simple-label.pipe';
import { CandidateCertificationsComponent } from './views/candidates/candidate-certifications/candidate-certifications.component';
import { CandidadeCardComponent } from './views/app-common/candidade-card/candidade-card.component';
import { CandidateDetailsComponent } from './views/candidates/candidate-details/candidate-details.component';
import { CandidatePanelBasicInfoComponent } from './views/app-common/candidate-panel-basic-info/candidate-panel-basic-info.component';
import { CandidatePanelDetailsComponent } from './views/app-common/candidate-panel-details/candidate-panel-details.component';
import { CandidatePanelEducationComponent } from './views/app-common/candidate-panel-education/candidate-panel-education.component';
import { CandidatePanelHabilitiesComponent } from './views/app-common/candidate-panel-habilities/candidate-panel-habilities.component';
import { CandidatePanelExperienceComponent } from './views/app-common/candidate-panel-experience/candidate-panel-experience.component';
import { EducationLevelPipe } from './pipes/education-level.pipe';
import { GenderNamePipe } from './pipes/gender-name.pipe';
import { SexNamePipe } from './pipes/sex-name.pipe';
import { EthnicityNamePipe } from './pipes/ethnicity-name.pipe';
import { CourseLevelNamePipe } from './pipes/course-level-name.pipe';
import { BusinessAreaNamePipe } from './pipes/business-area-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JobOfferIndexComponent,
    JobOfferHomeComponent,
    JobOfferSearchComponent,
    JobOfferBasicInfoComponent,
    LoginComponent,
    AppIndexComponent,
    LogoutComponent,
    OnboardComponent,
    AppHeaderComponent,
    CamaleaoTagsComponent,
    CandidateIndexComponent,
    CandidateSearchComponent,
    CandidateProfileComponent,
    CandidateExperiencesComponent,
    CandidateHabilitiesComponent,
    CandidatePreferencesComponent,
    CompanyIndexComponent,
    CompanyHomeComponent,
    CompanyBasicInfoComponent,
    CompanySearchComponent,
    UserIndexComponent,
    UserHomeComponent,
    UserBasicInfoComponent,
    UserSearchComponent,
    MatchIndexComponent,
    MatchHomeComponent,
    MatchBasicInfoComponent,
    MatchSearchComponent,
    HomeCandidateComponent, 
    HomeCompanyComponent,
    CandidateEducationComponent,
    CandidateBasicInfoComponent,
    CandidateSocialNetworksComponent,
    AreaNamePipe,
    SimpleLabelPipe,
    CandidateCertificationsComponent,
    CandidadeCardComponent,
    CandidateDetailsComponent,
    CandidatePanelBasicInfoComponent,
    CandidatePanelDetailsComponent,
    CandidatePanelEducationComponent,
    CandidatePanelHabilitiesComponent,
    CandidatePanelExperienceComponent,
    EducationLevelPipe,
    GenderNamePipe,
    SexNamePipe,
    EthnicityNamePipe,
    CourseLevelNamePipe,
    BusinessAreaNamePipe
  ],
  imports: [
    //AngularFireModule.initializeApp(environment.firebase),
    NgxAuthFirebaseUIModule.forRoot(environment.firebase,
      () => 'camaleao',
     {
       enableFirestoreSync: true, // enable/disable autosync users with firestore
       toastMessageOnAuthSuccess: true, // whether to open/show a snackbar message on auth success - default : true
       toastMessageOnAuthError: true, // whether to open/show a snackbar message on auth error - default : true
       authGuardFallbackURL: '/login', // url for unauthenticated users - to use in combination with canActivate feature on a route
       authGuardLoggedInURL: '/', // url for authenticated users - to use in combination with canActivate feature on a route
       passwordMaxLength: 50, // `min/max` input parameters in components should be within this range.
       passwordMinLength: 5, // Password length min/max in forms independently of each componenet min/max.
       nameMaxLength: 50,
       nameMinLength: 2,
       // If set, sign-in/up form is not available until email has been verified.
       // Plus protected routes are still protected even though user is connected.
       guardProtectedRoutesUntilEmailIsVerified: false
     }),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FlexLayoutModule,
    TextMaskModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatGridListModule,
    MatCardModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatMomentDateModule,
    LayoutModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatStepperModule,
    ReactiveFormsModule
  ],
  providers: [
    WebApiService,
    WebApiFirebaseService,
    WebApiMockService,
    UserService,
    CandidateService,
    CandidateFirebaseService,
    CandidateMockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
