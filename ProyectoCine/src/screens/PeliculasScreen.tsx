import React from "react";
import { ScrollView } from "react-native";
import FormularioPeliculas from "../app/peliculas/FormularioPelicula"
import TablaPeliculas from "../app/peliculas/TablaPeliculas";

export default function PeliScreen(){
    return(
        <ScrollView contentContainerStyle={{padding: 16}}>
            <FormularioPeliculas />
            <TablaPeliculas />
        </ScrollView>
    );
}