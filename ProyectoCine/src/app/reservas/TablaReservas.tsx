import React from "react";
import {View, Text, FlatList, StyleSheet} from "react-native";
import { useAppSelector } from "../../redux/hooks";
import ReservaFila from "./ReservaFila";

export default function TablaRervs(){
    const reservas = useAppSelector(state => state.reservas.reservas);

    const  renderEncabezado = () => (
        <View>
            <Text>ID</Text>
            <Text>Peliculas</Text>
            <Text>Funcion</Text>
            <Text>Boletos</Text>
            <Text>Asientos</Text>
            <Text>Total</Text>
            <Text>Compra</Text>
            <Text>Acciones</Text>
        </View>
    );
    return(
        <View>
            <Text>Reservas realizadas</Text>
            <View>
                {renderEncabezado()}
                <FlatList
                data={reservas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <ReservaFila reserva={item} />}
                ListEmptyComponent={
                    <View>
                        <Text>No hay reservas hechas</Text>
                    </View>
                }
                />
            </View>
        </View>
    )
}