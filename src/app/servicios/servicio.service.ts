import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }


  listaServicios(){
    return this.http.get('https://back-trienti.herokuapp.com/api/servicios');
  }

  listaTiposServicios(){
    return this.http.get('https://back-trienti.herokuapp.com/api/servicios/tipos')
  }

  filtroServicios(tipo_servicio){
    return this.http.get('https://back-trienti.herokuapp.com/api/servicios/filtro/'+tipo_servicio)
  }

}

