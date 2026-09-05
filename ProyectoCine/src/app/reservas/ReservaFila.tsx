import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Reserva } from "../../types/reserva";
import { removeReserva, selectReserva } from "../../redux/slices/reservasSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

interface Props{
    reserva: Reserva;
}

export default function ReservaFila({reserva}: Props){
    const dispatch = useAppDispatch();
    const funciones = useAppSelector(state => state.funciones.funciones);
    const peliculas = useAppSelector(state => state.peliculas.peliculas);
    const funcion = funciones.find( a => a.id === reserva.funcionId);
    const pelicula = peliculas.find( b => b.codigo === funcion?.peliculaCodigo);

    return(
        <View>
            <Text>{reserva.id.slice(0,6)}...</Text>
            <Text>{pelicula?.nombre ?? "N/A"}</Text>
            <Text>{funcion?.fecha}{funcion?.hora}</Text>
            <Text>{reserva.cantidad}</Text>
            <Text>{reserva.asientos}</Text>
            <Text>{reserva.asientos.join(",")}</Text>
            <Text>{new Date(reserva.fechaReserva).toLocaleDateString()}</Text>
            <View>
                <TouchableOpacity
                onPress={()=> dispatch(selectReserva(reserva))}
                >
                    <Text>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => dispatch(removeReserva(reserva.id))}
                >
                    <Text>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}