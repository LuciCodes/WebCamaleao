import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule } from '@angular/material/chips'; 
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './views/home/home.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { BuscarVagasComponent } from './views/vagas/buscar-vagas/buscar-vagas.component';
import { EditarVagasComponent } from './views/vagas/editar-vagas/editar-vagas.component';
import { HomeVagasComponent } from './views/vagas/home-vagas/home-vagas.component';
import { IndexVagasComponent } from './views/vagas/index-vagas/index-vagas.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './views/login/login.component';

import { AppAuthenticationService } from './services/appAuthentication.service';
import { WebApiService } from './services/webApi.service';

import { LoggedUserRouteActivator } from './etc/loggedUserRouteActivator';
import { AppIndexComponent } from './views/app-index/app-index.component';
import { LogoutComponent } from './views/logout/logout.component';
import { SignupComponent } from './views/signup/signup.component';

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
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
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
