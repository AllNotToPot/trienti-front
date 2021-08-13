import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Cliente } from '../models/cliente'
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  authToken: any;
  clienteSeleccionado: Cliente;

  constructor(private http: HttpClient) { }

  listaClientes() {
    this.authToken = localStorage.getItem('id_token');
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',`${this.authToken}`)
    }
    return this.http.get('https://68.183.116.158/api/clientes',header);
  }

  getClienteByDNI(dni){
    return this.http.get('https://68.183.116.158/api/clientes/dni/'+dni);
  }

  postCliente(cliente){
    return this.http.post('https://68.183.116.158/api/clientes/', cliente)
  }

}
