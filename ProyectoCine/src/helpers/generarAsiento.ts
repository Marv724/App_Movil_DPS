import { Asiento } from "../types/asiento";

function obtenerNombreFila(indice: number): string {

    let nombre = "";

    indice++;

    while (indice > 0) {

        const residuo = (indice - 1) % 26;

        nombre = String.fromCharCode(65 + residuo) + nombre;

        indice = Math.floor((indice - 1) / 26);

    }

    return nombre;

}

export function generarAsientos(
    filas: number,
    columnas: number
): Asiento[] {

    const asientos: Asiento[] = [];

    let id = 1;

    for (let fila = 0; fila < filas; fila++) {

        const nombreFila = obtenerNombreFila(fila);

        for (let columna = 1; columna <= columnas; columna++) {

            asientos.push({
                id,
                numero: `${nombreFila}${columna}`,
            });

            id++;

        }

    }

    return asientos;

}