import React from "react";
import { useAppSelector } from "../../redux/hooks";
import TargetaEsta from "./TargetaEst";
import Cartelera from "./Cartelera";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from "react-native";

export default function Dashboard(){
    const pelis = useAppSelector(state => state.peliculas.peliculas);
    const funciones = useAppSelector(state => state.funciones.funciones);
    const salas = useAppSelector(state => state.salas.salas);
    const reservas = useAppSelector(state => state.reservas.reservas);

    const totalPeliculas = pelis.length;
    const TotalFunciones = funciones.length;

    const boletosVend = reservas.reduce(
        (total, reserva) => total + reserva.cantidad, 0
    );

    const asientosTots = salas.reduce(
        (total, sala) => total + sala.asientos.length, 0 
    );

    const asientosOcup = reservas.reduce(
        (total, reserva) => total + reserva.asientos.length, 0
    );

    const asientosDisp = asientosTots - asientosOcup;

    const ingresos = reservas.reduce(
        (total,reserva) => total + reserva.total, 0
    );

    const contadorPelis: Record<string, number> = {};

    reservas.forEach(reserva =>{
        const funcion = funciones.find(f =>f.id === reserva.funcionId);
        if (!funcion) return;

        (contadorPelis[funcion.peliculaCodigo] ?? 0) + reserva.cantidad;
    });

    let peliculaMasReserv = "Sin reservas";
    let mayor = 0;

    Object.entries(contadorPelis).forEach(([codigo, cantidad]) => {
        if (cantidad > mayor) {
            mayor = cantidad;
            peliculaMasReserv =
                pelis.find(pelicula => pelicula.codigo === codigo)?.nombre ??
                "Desconocida";
        }
    });

    return(
        <ScrollView>
            <Text>DashBoard</Text>
            <View>
                <TargetaEsta titulo="Peliculas" valor={totalPeliculas} />
                <TargetaEsta titulo="Funciones" valor={TotalFunciones} />
                <TargetaEsta titulo="Boletos" valor={boletosVend} />
                <TargetaEsta titulo="Disponibles" valor={asientosDisp} />
                <TargetaEsta titulo="Ocupados" valor={asientosOcup}/>
                <TargetaEsta titulo="Ingresos" valor={'$${ingresos.toFixed(2)'} />
                <TargetaEsta titulo="Mas reservados" valor={peliculaMasReserv} />
            </View>
        </ScrollView>
    );
}