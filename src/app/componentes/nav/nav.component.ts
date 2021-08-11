import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {

  constructor(
              public auth: AuthService,
              private router: Router,
              private zone: NgZone) { }

  ngOnInit(): void {
  }

  onLogoutClick(){
          this.auth.cerrarSesion();
          console.log('Has cerrado sesion')
          this.router.navigate(['/login'])
          return false;
  }
}
