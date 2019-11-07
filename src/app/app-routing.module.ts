import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { BuscarVagasComponent } from './views/vagas/buscar-vagas/buscar-vagas.component';
import { IndexVagasComponent } from './views/vagas/index-vagas/index-vagas.component';
import { EditarVagasComponent } from './views/vagas/editar-vagas/editar-vagas.component';
import { HomeVagasComponent } from './views/vagas/home-vagas/home-vagas.component';

import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './views/logout/logout.component';

import { AppIndexComponent } from './views/app-index/app-index.component';

import {LoggedInGuard} from 'ngx-auth-firebaseui';
import { OnboardComponent } from './views/onboard/onboard.component';
import { CandidateIndexComponent } from './views/candidates/candidate-index/candidate-index.component';
import { CandidateProfileComponent } from './views/candidates/candidate-profile/candidate-profile.component';
import { CandidateExperiencesComponent } from './views/candidates/candidate-experiences/candidate-experiences.component';
import { CandidateHabilitiesComponent } from './views/candidates/candidate-habilities/candidate-habilities.component';
import { CandidatePreferencesComponent } from './views/candidates/candidate-preferences/candidate-preferences.component';
import { CandidateEducationComponent } from './views/candidates/candidate-education/candidate-education.component';
import { CandidateBasicInfoComponent } from './views/candidates/candidate-basic-info/candidate-basic-info.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent,  },
  { path: 'logout', component: LogoutComponent,  },
  { path: 'cadastro', component: OnboardComponent },
  { path: '', component: AppIndexComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'vagas',
      component: IndexVagasComponent,
      canActivate: [LoggedInGuard],
      children: [
          { path: '', component: HomeVagasComponent },
          { path: 'abrir', component: EditarVagasComponent },
          { path: 'editar/:id', component: EditarVagasComponent },
          { path: 'buscar', component: BuscarVagasComponent }
        ]
      },
      { path: 'candidate',
        component: CandidateIndexComponent,
        canActivate: [LoggedInGuard],
        children: [
            { path: '', component: CandidateBasicInfoComponent },
            { path: 'perfil', component: CandidateProfileComponent },
            { path: 'escolaridade', component: CandidateEducationComponent },
            { path: 'experiencias', component: CandidateExperiencesComponent },
            { path: 'habilidades', component: CandidateHabilitiesComponent },
            { path: 'preferencias', component: CandidatePreferencesComponent }
          ]
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
