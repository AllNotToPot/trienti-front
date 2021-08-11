"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegistroComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RegistroComponent = /** @class */ (function () {
    function RegistroComponent(auth, router, zone) {
        this.auth = auth;
        this.router = router;
        this.zone = zone;
        this.formRegistro = new forms_1.FormGroup({
            nombre: new forms_1.FormControl('', forms_1.Validators.required),
            nombreUsuario: new forms_1.FormControl('', forms_1.Validators.required),
            correo: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.email]),
            password: new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    RegistroComponent.prototype.ngOnInit = function () {
    };
    RegistroComponent.prototype.onRegisterSubmit = function () {
        var _this = this;
        var usuario = {
            nombre: this.nombre,
            correo: this.correo,
            username: this.username,
            password: this.password
        };
        var mensaje = document.getElementById("mensajeDuplicado");
        var inputs = document.querySelectorAll("input");
        inputs.forEach(function (input) { return input.addEventListener('click', function () {
            mensaje.querySelector('label').innerHTML = "";
            mensaje.style.display = 'none';
        }); });
        //Registrar Usuario
        this.auth.registrarUsuario(usuario).subscribe(function (data) {
            var resultado = JSON.parse(JSON.stringify(data));
            if (resultado.success) {
                console.log('Usuario Registrado');
                _this.router.navigate(['/login']);
            }
            else {
                mensaje.style.display = 'block';
                var inputs = document.querySelectorAll("input");
                inputs.forEach(function (input) { return input.value = ''; });
                document.querySelector("form").reset();
                mensaje.querySelector('label').innerHTML = "El usuario " + resultado.nombre + " ya esta registrado";
            }
        });
    };
    RegistroComponent = __decorate([
        core_1.Component({
            selector: 'app-registro',
            templateUrl: './registro.component.html',
            styleUrls: ['./registro.component.sass']
        })
    ], RegistroComponent);
    return RegistroComponent;
}());
exports.RegistroComponent = RegistroComponent;
