import { Cliente } from "../Cliente";

interface Rutina{
    id: string;
    fecha_creacion: Date;
    nombre: string;
    descripcion: string;
    cliente: Cliente;
}