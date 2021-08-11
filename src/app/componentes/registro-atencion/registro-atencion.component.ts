import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { Servicio } from 'src/app/models/servicio';
import { Direccion } from 'src/app/models/direccion';
import { Usuario } from 'src/app/models/usuario';
import { Atencion } from 'src/app/models/atencion';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { AtencionService } from 'src/app/servicios/atencion.service';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-registro-atencion',
  templateUrl: './registro-atencion.component.html',
  styleUrls: ['./registro-atencion.component.sass']
})
export class RegistroAtencionComponent implements OnInit {
  
  //Para el usuario



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
  duracionServicio:String;

  servicio = new Servicio();


  // Para filtrar
  ListaTiposServicio: any;
  serviciosFiltrados: any;
  tipoSeleccionado: String;
  servicioSeleccionado: Servicio;


  clienteExiste: boolean = true;


  usuario = new Usuario(); 

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
    console.log(this.usuario.username);
    
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
  }

  registrarAtencion(){

    let atencion_serv = {
      servicio_id : this.servicio_id,
      descripcion: this.detallesServicio,
      precio_servicio : this.precio_referencial,
      usuario_id: this.usuario.username,
      fecha_atencion: new Date(),
      duracion_servicio: this.duracionServicio
    }
  
    let atencion = new Atencion();

    atencion.cliente_dni = this.dni;
    atencion.atencion_servicio = atencion_serv;

    console.log(atencion);

    this.atencionService.registrarAtencionCliente(atencion).subscribe((res)=>{


      let estado = JSON.parse(JSON.stringify(res));

      if(estado.status == "Este cliente ya tiene un registro"){
        console.log('Este cliente ya tiene un historial')
      } else if (estado.cliente == "Cliente encontrado"){
        console.log('Este cliente no tiene un historial pero ha sido encontrado en la coleccion de clientes')
      } else {
        console.log('Este cliente no tiene historial y tampoco ha sido encontrado en la coleccion clientes, se procedera a registrarlo')
        this.crearClienteNoExistente();
      }
      
      
      


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

    });
    this.clienteExiste = true; 

  }

}
