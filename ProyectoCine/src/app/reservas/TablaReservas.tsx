import React, { ReactElement } from "react";
import {View, Text, FlatList, StyleSheet} from "react-native";
import { useAppSelector } from "../../redux/hooks";
import ReservaFila from "./ReservaFila";

interface TablaReserva{
    ListHeaderComponent? : ReactElement;
}

export default function TablaRervs({ListHeaderComponent}: TablaReserva){
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
                ListHeaderComponent={
                    <View>
                        {ListHeaderComponent}
                        <Text>Tabla de salas</Text>
                        {renderEncabezado()}
                    </View>
                }
                ListEmptyComponent={
                    <View>
                        <Text>No hay salas reguistradas</Text>
                    </View>
                }
                />
            </View>
        </View>
    )
}