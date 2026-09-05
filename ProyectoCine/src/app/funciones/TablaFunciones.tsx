import React, { ReactElement } from "react";
import { useAppSelector } from "../../redux/hooks";
import FuncionFila from "./FuncionFila"
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from "react-native";

interface Tablafunciones{
    ListHeaderComponent? : ReactElement;
}

export default function TablaFucniones({ListHeaderComponent}: Tablafunciones) {
    const funciones = useAppSelector(
        state => state.funciones.funciones
    );

    const renderEncabezado = () => (
        <View>
            <Text>ID</Text>
            <Text>Peliculas</Text>
            <Text>Sala</Text>
            <Text>Fecha</Text>
            <Text>Hora</Text>
            <Text>Acciones</Text>
        </View>
    );

    return(
        <View>
            <Text>Tabla de funciones</Text>
            <View>
                <FlatList
                data={funciones}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <FuncionFila funcion={item} />}
                ListHeaderComponent={
                    <View>
                        {ListHeaderComponent}
                        <Text>Tabla funciones</Text>
                        {renderEncabezado()}
                    </View>
                }
                ListEmptyComponent={
                    <View>
                        <Text>No hay funciones reguistradas</Text>
                    </View>
                }
                />
            </View>
        </View>
    )
}