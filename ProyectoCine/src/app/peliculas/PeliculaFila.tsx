import React from "react";
import { Pelicula } from "../../types/pelicula";
import { removePelicula, selectPelicula } from "../../redux/slices/peliculaSlice";
import { useAppDispatch } from "../../redux/hooks";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

interface Props {
    pelicula: Pelicula;
}

export default function PeliFila({pelicula}: Props){
    const dispatch = useAppDispatch();

    const eliminarPeli = (codigo: string) => {
        dispatch(removePelicula(codigo));
    }

    const editarPeli = (pelicula: Pelicula) => {
        dispatch(selectPelicula(pelicula));
    };

    return(
        <View>
            <Text>{pelicula.codigo}</Text>
            <Text>{pelicula.nombre}</Text>
            <Text>{pelicula.genero}</Text>
            <Text>{pelicula.duracion} min</Text>
            <Text>{pelicula.clasificacion}</Text>
            <Text>{pelicula.precio.toFixed(2)}</Text>
            <Text>{pelicula.disponible ? "Si" : "No"}</Text>
            <View>
                <TouchableOpacity
                onPress={() => editarPeli(pelicula)}
                >
                    <Text>Editar pelicula</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => eliminarPeli(pelicula.codigo)}
                >
                    <Text>Eliminar Pelicula</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}