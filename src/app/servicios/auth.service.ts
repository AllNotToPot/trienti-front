import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";  
import { JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  usuario: any; 

  constructor(private http:HttpClient) {
  
   }

  registrarUsuario(usuario){
    const headers = new HttpHeaders();
    headers.append('Content-Type','aplication/json');
    console.log(headers);
    return this.http.post('http://localhost:3000/usuarios/registro',usuario,{headers: headers});
  }

  autenticarUsuario(usuario){
    const headers = new HttpHeaders();
    headers.append('Content-Type','aplication/json');
    return this.http.post('http://localhost:3000/usuarios/autenticacion',usuario, {headers: headers});
  }

  getPerfil(){
    this.cargarToken(); 
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',`${this.authToken}`).set('Content-Type','aplication/json')
    }
    
    return this.http.get('http://localhost:3000/usuarios/perfil',header);
  } 

  cargarToken(){
    const token  = localStorage.getItem('id_token');
    this.authToken = token;
    console.log(this.authToken)
  }

  guardarUsuarioData(token,usuario){
    localStorage.setItem('id_token',token);
    localStorage.setItem('usuario',JSON.stringify(usuario));
    this.authToken = token;
    this.usuario = usuario;
  }

  loggedIn() {
    const jwt  = new JwtHelperService()
    const token: string = localStorage.getItem('id_token');
    return token != null && !jwt.isTokenExpired(token);
    }

  cerrarSesion(){
    this.authToken = null;
    this.usuario = null;
    localStorage.clear()
  }
}
