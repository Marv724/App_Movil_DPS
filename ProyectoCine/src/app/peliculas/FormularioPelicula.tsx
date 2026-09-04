import React from "react";
import { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from "react-native";
import { updateReserva, selectReserva } from "../../redux/slices/reservasSlice";
import { Picker } from "@react-native-picker/picker";
import { Reserva } from "../../types/reserva";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const reservaIni: Reserva = {
    id: "",
    funcionId: "",
    cantidad: 0,
    asientos: [],
    total: 0,
    fechaReserva: ""
};

export default function FormularioResv(){
    const dispatch = useAppDispatch();

    const reservarS = useAppSelector(
        state => state.reservas.reservaSeleccionada
    );

    const funciones = useAppSelector(
        state => state.funciones.funciones
    );

    const[reserv, setReserv] = useState<Reserva>(reservaIni);

    useEffect(() =>{
        if(reservarS){
            setReserv(reservarS);
        }
    },[reservarS]);

    const Guardar = () => {
        dispatch(updateReserva(reserv));
        dispatch(selectReserva(null));
        setReserv(reservaIni);
    }

    return(
        <ScrollView>
            <Text>Editar reservas</Text>
            <View>
                <Text>Funcion</Text>
                <View>
                    <Picker
                    selectedValue={reservaIni.funcionId}
                    onValueChange={(ItemValue) =>
                        setReserv({
                            ...reserv,
                            funcionId: ItemValue
                        })
                    }
                    >
                        <Picker.Item label="Seleccione una funcion" value="" />
                        {funciones.map(funciones =>
                            (
                                <Picker.Item
                                key={funciones.id}
                                label={funciones.id}
                                value={funciones.id}
                                />
                            )
                        )}
                    </Picker>
                </View>
            </View>
            <View>
                <Text>Cantidad</Text>
                <TextInput
                keyboardType="numeric"
                value={reservarS?.cantidad ? reservarS.cantidad.toString(): ""}
                onChangeText={(text) => 
                    setReserv({
                        ...reserv,
                        cantidad: Number(text) || 0
                    })
                }
                />
            </View>
            <View>
                <TextInput
                keyboardType="numeric"
                value={reserv.total ? reserv.total.toString(): ""}
                onChangeText={(text) =>
                    setReserv({
                        ...reserv,
                        total: Number(text) || 0
                    })
                }
                />
            </View>
            <TouchableOpacity onPress={Guardar}>
                <Text>Guardar cambioas</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}