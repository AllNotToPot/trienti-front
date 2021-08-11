import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  formLogin = new FormGroup({
    username : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
  })

  username : String;
  password : String 
  
  constructor(
                private auth: AuthService,
                private router: Router,
                private zone: NgZone) { }

  ngOnInit(): void {
    
  }
  onLoginSubmit(){
    
    const usuario =  {
      username: this.username,
      password: this.password
    }

    var mensaje=document.getElementById("mensajeNoEncontrado");  
    var inputs = document.querySelectorAll("input");     
    inputs.forEach(input => input.addEventListener('click',function(){
      mensaje.querySelector('label').innerHTML = "";
      mensaje.style.display = 'none';   
    })); 

    this.auth.autenticarUsuario(usuario).subscribe(data =>{
      
        var resultado = JSON.parse(JSON.stringify(data)); 
        if(resultado.success){
          console.log(resultado);
          this.auth.guardarUsuarioData(resultado.token, resultado.usuario);

          console.log('Usuario Logueado '+resultado.token + resultado.usuario);
          this.router.navigate(['dashboard']);

        } else{
          mensaje.style.display = 'block';
          inputs.forEach(input => input.value = '');      
          document.querySelector("form").reset();   
          mensaje.querySelector('label').innerHTML = `Nombre de usuario y/o contraseña incorrectos`;
        }
  });
  }
}
