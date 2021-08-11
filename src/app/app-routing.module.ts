import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { HomeComponent } from './componentes/home/home.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';

import { AuthGuard } from './guards/auth.guard';
import { RegistroAtencionComponent } from './componentes/registro-atencion/registro-atencion.component';
import { RegistroReclamoComponent } from './componentes/registro-reclamo/registro-reclamo.component';
import { ConsultarServiciosComponent } from './componentes/consultar-servicios/consultar-servicios.component';
import { ConsultarReclamosComponent } from './componentes/consultar-reclamos/consultar-reclamos.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'login' ,component: LoginComponent},
  {path: 'dashboard',component: DashboardComponent,canActivate:[AuthGuard]},
  {path: 'dashboard/registroAtencion', component: RegistroAtencionComponent,canActivate:[AuthGuard]},
  {path: 'dashboard/registroReclamo', component: RegistroReclamoComponent,canActivate:[AuthGuard]},
  {path: 'dashboard/consultarAtencion', component: ConsultarServiciosComponent ,canActivate:[AuthGuard]},
  {path: 'dashboard/consultarReclamo', component: ConsultarReclamosComponent ,canActivate:[AuthGuard]},
  {path: 'perfil',component: PerfilComponent,canActivate:[AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
