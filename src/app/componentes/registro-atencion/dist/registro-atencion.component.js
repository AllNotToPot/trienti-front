"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegistroAtencionComponent = void 0;
var core_1 = require("@angular/core");
var cliente_1 = require("src/app/models/cliente");
var RegistroAtencionComponent = /** @class */ (function () {
    function RegistroAtencionComponent(clienteService) {
        this.clienteService = clienteService;
        this.cliente = new cliente_1.Cliente();
    }
    RegistroAtencionComponent.prototype.ngOnInit = function () {
    };
    RegistroAtencionComponent.prototype.findByDNI = function () {
        var _this = this;
        this.clienteService.getClienteByDNI(this.dni).subscribe(function (res) {
            var cliente = JSON.parse(JSON.stringify(res));
            if (cliente) {
                _this.dni = cliente.dni;
                _this.nombre = cliente.nombre;
                _this.apellido = cliente.apellido;
                _this.telefono = cliente.telefono;
                _this.prioridad = cliente.prioridad;
            }
            else {
                console.log('No encontrado');
            }
        });
    };
    RegistroAtencionComponent = __decorate([
        core_1.Component({
            selector: 'app-registro-atencion',
            templateUrl: './registro-atencion.component.html',
            styleUrls: ['./registro-atencion.component.sass']
        })
    ], RegistroAtencionComponent);
    return RegistroAtencionComponent;
}());
exports.RegistroAtencionComponent = RegistroAtencionComponent;
