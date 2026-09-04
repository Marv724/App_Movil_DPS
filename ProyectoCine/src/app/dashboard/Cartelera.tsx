import React from "react";
import { useAppSelector } from "../../redux/hooks";
import FuncionCard from "./FuncionCard";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList
} from "react-native";

export default function Cartelera() {
    const funciones = useAppSelector(
        state => state.funciones.funciones
    );

    return(
        <View>
            <Text>Cartelera</Text>
            <FlatList
            data={funciones}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <FuncionCard funcion={item} />}
            ListEmptyComponent={
                <View>
                    <Text>No hay funciones disponibles</Text>
                </View>
            }
            />
        </View>
    );
}