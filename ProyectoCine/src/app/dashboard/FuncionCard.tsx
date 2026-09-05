import React from "react";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Funcion } from "../../types/funcion";
import Modalreserv from "../reservas/ModalReserva";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

interface Props {
    funcion: Funcion;
}

export default function FuncionCard({ funcion }: Props) {
    const [mostrarModal, setMostrarModal] = useState(false);

    const peliculas = useAppSelector(state => state.peliculas.peliculas);
    const salas = useAppSelector(state => state.salas.salas);

    const pelicula = peliculas.find(
        pelicula => pelicula.codigo === funcion.peliculaCodigo
    );

    const sala = salas.find(sala => sala.id === funcion.salaId);

    if (!pelicula || !sala) {
        return null;
    }

    return(
        <View>
            <Text>{pelicula.nombre}</Text>
            <View>
                <Text>Sala: {sala.nombre}</Text>
                <Text>Fecha: {funcion.fecha}</Text>
                <Text> Hora: {funcion.hora}</Text>
                <Text>${pelicula.precio.toFixed(2)}</Text>
            </View>
        </View>
    );
}