import { Component, OnInit } from '@angular/core';
import { Atencion } from 'src/app/models/atencion';
import { Cliente } from 'src/app/models/cliente';
import { Direccion } from 'src/app/models/direccion';
import { Servicio } from 'src/app/models/servicio';
import { Usuario } from 'src/app/models/usuario';
import { AtencionService } from 'src/app/servicios/atencion.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { ServicioService } from 'src/app/servicios/servicio.service';

@Component({
  selector: 'app-registro-reclamo',
  templateUrl: './registro-reclamo.component.html',
  styleUrls: ['./registro-reclamo.component.sass']
})
export class RegistroReclamoComponent implements OnInit {

  //Para clientes ngModel
  _id:String;
  dni: String;
  nombre: String;
  apellido: String;
  telefono: String;
  tipo_cliente: String;
  correo:String;
  direccion = new Direccion();
  ciudad:String;
  distrito:String;
  numero: String;
  calle: String;

  cliente = new Cliente();

  //Para servicios ngModel
  servicio_id: String;
  nombreServicio: String;
  tipo_servicio: String;
  detallesServicio:String;
  precio_referencial:Number;

  servicio = new Servicio();


  // Para filtrar
  ListaTiposServicio: any;
  serviciosFiltrados: any;
  tipoSeleccionado: String;
  servicioSeleccionado: Servicio;


  clienteExiste: boolean = true;

  descripcionReclamo:String;

  
  usuario = new Usuario(); 


  //Comboboxes
      prioridades = ["Alta","Media","Baja"];
      prioridadSeleccionada = null;


  constructor(private clienteService:ClienteService,
              private servicioService:ServicioService,
              private atencionService:AtencionService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getPerfil()
    .subscribe(perfil => {
      
      var resultado = JSON.parse(JSON.stringify(perfil)); 
      this.usuario = resultado.usuario;
    },
    err => {
      console.error(err);
      return false
    });
    
    this.listaTiposServicios();
    
  }

  crearClienteNoExistente(){

      let direccion = {
        numero : this.numero,
        calle : this.calle,
        ciudad : this.ciudad,
        distrito : this.distrito
      }

      let clienteNuevo = new Cliente(); 
      clienteNuevo.dni = this.dni;
      clienteNuevo.nombre = this.nombre;
      clienteNuevo.apellido = this.apellido;
      clienteNuevo.tipo_cliente = this.tipo_cliente;
      clienteNuevo.telefono = this.telefono;
      clienteNuevo.correo = this.correo;
      clienteNuevo.direccion = direccion;

      this.clienteService.postCliente(clienteNuevo).subscribe((res)=>{
        console.log(res);
      });
  }




  findByDNI(){
    this.clienteService.getClienteByDNI(this.dni).subscribe((res)=>{

      var cliente = JSON.parse(JSON.stringify(res)); 
      if(cliente){
        console.log(cliente);
        this.clienteExiste = true; 
        this._id = cliente._id;
        this.dni = cliente.dni;
        this.nombre = cliente.nombre;
        this.apellido = cliente.apellido;
        this.telefono = cliente.telefono;
        this.tipo_cliente = cliente.tipo_cliente;
        this.correo = cliente.correo;
        this.ciudad = cliente.direccion.ciudad;
        this.distrito = cliente.direccion.distrito;
        this.calle = cliente.direccion.calle;
        this.numero = cliente.direccion.numero;

      } else{
        console.log('No encontrado')
        this.clienteExiste = false; 
      }
      
  })
  }


  listaTiposServicios(){
    this.servicioService.listaTiposServicios().subscribe((res)=>{
      this.ListaTiposServicio = res;
    })
  }

  filtrarPlanes(servicio){
    this.tipoSeleccionado = servicio;
    this.servicioService.filtroServicios(this.tipoSeleccionado).subscribe((res)=>{
        this.serviciosFiltrados = res; 
        console.log(this.serviciosFiltrados);
    });
  }

  mostrarDetallesPlan(plan){
    this.servicioSeleccionado = plan
    this.precio_referencial = this.servicioSeleccionado.precio_referencial;
    this.servicio_id = this.servicioSeleccionado._id;
    this.detallesServicio = this.servicioSeleccionado.detalles;
    this.nombreServicio = this.servicioSeleccionado.nombre;
  }


  registrarAtencion(){

    let reclamo_serv = {
      servicio_id : this.servicio_id,
      descripcion: this.descripcionReclamo,
      usuario_id:  this.usuario.username,
      fecha_atencion: new Date(),
      prioridad: this.prioridadSeleccionada,
      estado: "Sin atender"
    }
  
    let atencion = new Atencion();

    atencion.cliente_dni = this.dni;
    atencion.atencion_reclamo = reclamo_serv;


    this.atencionService.registrarReclamoCliente(atencion).subscribe((res)=>{


      let estado = JSON.parse(JSON.stringify(res));

        console.log(estado);

        this._id = "";
        this.dni = "";
        this.nombre ="";
        this.apellido = "";
        this.telefono = "";
        this.tipo_cliente = "";
        this.correo = "";
        this.ciudad = "";
        this.distrito = "";
        this.calle = "";
        this.numero = "";
        this.descripcionReclamo= "",
        this.prioridadSeleccionada =""

    });
    this.clienteExiste = true; 

  }

}
