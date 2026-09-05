import { Asiento } from "./asiento"

export interface AsientoFuncion {

    asiento: Asiento;

    estado:"libre"|"ocupado"|"elegido";

}