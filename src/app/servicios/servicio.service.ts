import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }


  listaServicios(){
    return this.http.get('http://localhost:3000/api/servicios');
  }

  listaTiposServicios(){
    return this.http.get('http://localhost:3000/api/servicios/tipos')
  }

  filtroServicios(tipo_servicio){
    return this.http.get('http://localhost:3000/api/servicios/filtro/'+tipo_servicio)
  }

}

