import { Component, OnInit, NgZone } from '@angular/core';

//Servicios
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router'
import { FormGroup,FormControl,Validators} from '@angular/forms';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.sass']
})


export class RegistroComponent implements OnInit {

  formRegistro = new FormGroup({
    nombre : new FormControl('',Validators.required),
    nombreUsuario : new FormControl('',Validators.required),
    correo: new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',Validators.required),
  })
 

  nombre: String;
  correo: String;
  username: String;
  password: String;

  constructor(
            private auth: AuthService,
            private router: Router,
            private zone: NgZone
            ) {}

  ngOnInit(): void {
   
  }

  onRegisterSubmit(){
    var usuario = {
      nombre: this.nombre,
      correo: this.correo,
      username: this.username,
      password: this.password
    }
    var mensaje=document.getElementById("mensajeDuplicado");  

    var inputs = document.querySelectorAll("input");     
    inputs.forEach(input => input.addEventListener('click',function(){
      mensaje.querySelector('label').innerHTML = "";
      mensaje.style.display = 'none';   
    })); 

    //Registrar Usuario
    this.auth.registrarUsuario(usuario).subscribe(data =>{
        
        var resultado = JSON.parse(JSON.stringify(data)); 

        if(resultado.success){
          console.log('Usuario Registrado');
          this.router.navigate(['/login']);

        }else{              
          mensaje.style.display = 'block';
          var inputs = document.querySelectorAll("input");
          inputs.forEach(input => input.value = '');      
          document.querySelector("form").reset();   
          mensaje.querySelector('label').innerHTML = `El usuario ${resultado.nombre} ya esta registrado`;
        }

  } )
  

}}
