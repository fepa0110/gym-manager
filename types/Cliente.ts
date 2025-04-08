import { TipoCuota } from "./TipoCuota"

export interface Cliente{
    id: string
    fecha_creacion: Date
    nombre: string
    apellido: string
    dni: string
    tipo_cuota_actual: string;
    observaciones?: string;
    // genero?: string
}