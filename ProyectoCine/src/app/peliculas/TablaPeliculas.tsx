import React from "react";
import PeliFila from "./PeliculaFila";
import { useAppSelector } from "../../redux/hooks";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList
} from "react-native";

export default function TablaPeliculas(){
    const pelis = useAppSelector(
        (state) => state.peliculas.peliculas
    );

    const renderEncabezado = () =>
    (
        <View>
            <Text>Codigo</Text>
            <Text>Nombre</Text>
            <Text>Genero</Text>
            <Text>Dureacion</Text>
            <Text>Clasificacion</Text>
            <Text>Sala</Text>
            <Text>Precio</Text>
            <Text>Disponible</Text>
            <Text>Acciones</Text>
        </View>
    )

    return(
        <View>
            <Text>Peliculas Disponibles</Text>
            <View>
                {renderEncabezado()}
            <FlatList
            data={pelis}
            keyExtractor={(item) => item.codigo.toString()}
            renderItem={({item}) => <PeliFila pelicula={item}/>}
            ListEmptyComponent={
                <Text>No hay peliculas</Text>
            }
            />
            </View>
        </View>
    )
}