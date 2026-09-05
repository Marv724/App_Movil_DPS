import React, { ReactElement } from "react";
import { useAppSelector } from "../../redux/hooks";
import FuncionCard from "./FuncionCard";
import {
    View,
    Text,
    FlatList,
} from "react-native";

interface CarteleraProps {
    ListHeaderComponent?: ReactElement;
}

export default function Cartelera({
    ListHeaderComponent
}: CarteleraProps) {

    const funciones = useAppSelector(
        state => state.funciones.funciones
    );

    return (
        <FlatList
            data={funciones}

            keyExtractor={(item) => item.id.toString()}

            renderItem={({ item }) => (
                <FuncionCard funcion={item} />
            )}

            ListHeaderComponent={
                <View>
                    {ListHeaderComponent}

                    <Text>Cartelera</Text>
                </View>
            }

            ListEmptyComponent={
                <View>
                    <Text>No hay en Cartelera</Text>
                </View>
            }
        />
    );
}
