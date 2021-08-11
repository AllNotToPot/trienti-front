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
    return this.http.get('http://localhost:3000/api/clientes',header);
  }

  getClienteByDNI(dni){
    return this.http.get('http://localhost:3000/api/clientes/dni/'+dni);
  }

  postCliente(cliente){
    return this.http.post('http://localhost:3000/api/clientes/', cliente)
  }

}
