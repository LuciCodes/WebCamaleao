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
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule } from '@angular/material/chips'; 
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './views/home/home.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BuscarVagasComponent } from './views/vagas/buscar-vagas/buscar-vagas.component';
import { EditarVagasComponent } from './views/vagas/editar-vagas/editar-vagas.component';
import { HomeVagasComponent } from './views/vagas/home-vagas/home-vagas.component';
import { IndexVagasComponent } from './views/vagas/index-vagas/index-vagas.component';

import { TextMaskModule } from 'angular2-text-mask';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './views/login/login.component';

import { AppAuthenticationService } from './services/appAuthentication.service';
import { WebApiService } from './services/webApi.service';

import { LoggedUserRouteActivator } from './etc/loggedUserRouteActivator';
import { AppIndexComponent } from './views/app-index/app-index.component';
import { LogoutComponent } from './views/logout/logout.component';
import { OnboardComponent } from './views/onboard/onboard.component';
import { AppHeaderComponent } from './views/app-common/app-header/app-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BuscarVagasComponent,
    EditarVagasComponent,
    HomeVagasComponent,
    IndexVagasComponent,
    LoginComponent,
    AppIndexComponent,
    LogoutComponent,
    OnboardComponent,
    AppHeaderComponent
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
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatMomentDateModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatStepperModule,
    ReactiveFormsModule
  ],
  providers: [
    AppAuthenticationService,
    LoggedUserRouteActivator,
    WebApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
