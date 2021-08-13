import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Atencion } from '../models/atencion';
@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  constructor(private http:HttpClient) { }


  registrarAtencionCliente(atencion: Atencion){
    return this.http.post('http://68.183.116.158:3000/api/atenciones/servicio',atencion);
  }

  registrarReclamoCliente(reclamo: Atencion){
    return this.http.post('http://68.183.116.158:3000/api/atenciones/reclamo',reclamo);

  }

}

