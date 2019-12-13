
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
 
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

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
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

import { AreaNamePipe } from './pipes/area-name.pipe';
import { SimpleLabelPipe } from './pipes/simple-label.pipe';
import { EducationLevelPipe } from './pipes/education-level.pipe';
import { JobOfferLevelNamePipe } from './pipes/job-offer-level-name.pipe';
import { JobOfferTypeNamePipe } from './pipes/job-offer-type-name.pipe';
import { StringToListPipe } from './pipes/string-to-list.pipe';
import { GenderNamePipe } from './pipes/gender-name.pipe';
import { SexNamePipe } from './pipes/sex-name.pipe';
import { EthnicityNamePipe } from './pipes/ethnicity-name.pipe';
import { CourseLevelNamePipe } from './pipes/course-level-name.pipe';
import { BusinessAreaNamePipe } from './pipes/business-area-name.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AreaNamePipe,
    SimpleLabelPipe,
    EducationLevelPipe,
    GenderNamePipe,
    JobOfferLevelNamePipe,
    JobOfferTypeNamePipe,
    StringToListPipe,
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
    CommonModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    FontAwesomeModule,
    FlexLayoutModule,
    TextMaskModule,
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
  exports: [
    NgxAuthFirebaseUIModule,
    CommonModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    FontAwesomeModule,
    FlexLayoutModule,
    TextMaskModule,
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
    ReactiveFormsModule,
    AreaNamePipe,
    SimpleLabelPipe,
    EducationLevelPipe,
    GenderNamePipe,
    JobOfferLevelNamePipe,
    JobOfferTypeNamePipe,
    StringToListPipe,
    SexNamePipe,
    EthnicityNamePipe,
    CourseLevelNamePipe,
    BusinessAreaNamePipe
  ]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
