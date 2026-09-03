
import { Asiento } from "./asiento";

export interface Sala {

    id:string;

    nombre:string;

    tipo_butacas:string;

    filas:number;

    columnas:number;

    asientos: Asiento[];

}