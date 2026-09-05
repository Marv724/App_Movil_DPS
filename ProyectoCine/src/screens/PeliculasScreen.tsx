import React from "react";
import { View, Text } from "react-native";
import FormularioPeliculas from "../app/peliculas/FormularioPelicula"
import TablaPeliculas from "../app/peliculas/TablaPeliculas";

export default function PeliScreen(){
    return(
        <View>
            <Text>Reguistrar peliculas</Text>
            <FormularioPeliculas />
            <Text>Tabla de peliculas</Text>
            <TablaPeliculas />
        </View>
    );
}