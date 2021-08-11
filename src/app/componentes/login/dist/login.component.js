"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(auth, router, zone) {
        this.auth = auth;
        this.router = router;
        this.zone = zone;
        this.formLogin = new forms_1.FormGroup({
            username: new forms_1.FormControl('', forms_1.Validators.required),
            password: new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onLoginSubmit = function () {
        var _this = this;
        var usuario = {
            username: this.username,
            password: this.password
        };
        var mensaje = document.getElementById("mensajeNoEncontrado");
        var inputs = document.querySelectorAll("input");
        inputs.forEach(function (input) { return input.addEventListener('click', function () {
            mensaje.querySelector('label').innerHTML = "";
            mensaje.style.display = 'none';
        }); });
        this.auth.autenticarUsuario(usuario).subscribe(function (data) {
            var resultado = JSON.parse(JSON.stringify(data));
            if (resultado.success) {
                console.log(resultado);
                _this.auth.guardarUsuarioData(resultado.token, resultado.usuario);
                console.log('Usuario Logueado ' + resultado.token + resultado.usuario);
                _this.router.navigate(['dashboard']);
            }
            else {
                mensaje.style.display = 'block';
                inputs.forEach(function (input) { return input.value = ''; });
                document.querySelector("form").reset();
                mensaje.querySelector('label').innerHTML = "Nombre de usuario y/o contrase\u00F1a incorrectos";
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.sass']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
