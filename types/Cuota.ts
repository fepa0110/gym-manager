import { TipoCuota } from "./TipoCuota";

export interface Cuota {
    id: number;
    fecha_creacion: string;
    abonada: boolean;
    tipo_cuota: TipoCuota;
}