import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { Sala } from "../../types/sala";
import SalaFila from "./SalaFila";
import { useAppSelector } from "../../redux/hooks";
import { FlatList } from "react-native";

export default function TablaSalas(){
    const salas = useAppSelector((state) => state.salas.salas);

    const renderencabezado = () => (
    <View>
        <Text>ID</Text>
        <Text>Nombre</Text>
        <Text>Tipo</Text>
        <Text>Filas</Text>
        <Text>Column.</Text>
        <Text>Asientos</Text>
        <Text>Acciones</Text>
    </View> );

    return(
        <View>
            <Text>Tabla de Salas</Text>
            <View>
                {renderencabezado()}
                <FlatList
                data={salas}
                keyExtractor ={(item) => item.id.toString()}
                renderItem ={({item}) => <SalaFila sala={item} />}
                ListEmptyComponent={
                    <View>
                        <Text>No hay salas registradas</Text>
                    </View>
                }
                />
            </View>
        </View>
    );
}
    
    
