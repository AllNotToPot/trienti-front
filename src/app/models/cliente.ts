export class Cliente{
    _id: String;
    dni: String;
    nombre: String;
    apellido: String;
    telefono: String;
    tipo_cliente: String;
    correo: String;
    atenciones: [String];
    direccion: {
        ciudad: String;
        distrito: String;
        calle: String;
        numero: String;
    }

}