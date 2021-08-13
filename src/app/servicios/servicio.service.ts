import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }


  listaServicios(){
    return this.http.get('https://68.183.116.158/api/servicios');
  }

  listaTiposServicios(){
    return this.http.get('https://68.183.116.158/api/servicios/tipos')
  }

  filtroServicios(tipo_servicio){
    return this.http.get('https://68.183.116.158/api/servicios/filtro/'+tipo_servicio)
  }

}

