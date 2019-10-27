import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { BuscarVagasComponent } from './views/vagas/buscar-vagas/buscar-vagas.component';
import { IndexVagasComponent } from './views/vagas/index-vagas/index-vagas.component';
import { EditarVagasComponent } from './views/vagas/editar-vagas/editar-vagas.component';
import { HomeVagasComponent } from './views/vagas/home-vagas/home-vagas.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'vagas', component: IndexVagasComponent, children: [
    { path: '', component: HomeVagasComponent },
    { path: 'abrir', component: EditarVagasComponent },
    { path: 'editar/:id', component: EditarVagasComponent },
    { path: 'buscar', component: BuscarVagasComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
