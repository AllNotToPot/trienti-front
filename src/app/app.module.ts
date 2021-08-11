import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http' ; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './componentes/nav/nav.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { HomeComponent } from './componentes/home/home.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';

//Servicios
import { AuthService } from './servicios/auth.service';
import { ClienteService } from './servicios/cliente.service';
import { AtencionService } from './servicios/atencion.service';
import { ServicioService } from './servicios/servicio.service'
import { AuthGuard } from './guards/auth.guard';
import { RegistroAtencionComponent } from './componentes/registro-atencion/registro-atencion.component';
import { RegistroReclamoComponent } from './componentes/registro-reclamo/registro-reclamo.component';
import { ConsultarServiciosComponent} from './componentes/consultar-servicios/consultar-servicios.component';
import { ConsultarReclamosComponent } from './componentes/consultar-reclamos/consultar-reclamos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    PerfilComponent,
    DashboardComponent,
    RegistroAtencionComponent,
    RegistroReclamoComponent,
    ConsultarServiciosComponent,
    ConsultarReclamosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,AuthGuard,ClienteService,ServicioService, AtencionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
