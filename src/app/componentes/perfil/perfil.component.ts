import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.sass']
})
export class PerfilComponent implements OnInit {
 usuario = new Object; 
  constructor(
    private auth: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.auth.getPerfil()
    .subscribe(perfil => {
      
      var resultado = JSON.parse(JSON.stringify(perfil)); 
      this.usuario = resultado.usuario;
      console.log(this.usuario);      
    },
    err => {
      console.error(err);
      return false
    });
  }

}
