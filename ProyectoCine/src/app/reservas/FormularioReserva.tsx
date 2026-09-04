import React from "react";
import {useEffect, useState} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Reserva } from "../../types/reserva";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateReserva, selectReserva } from "../../redux/slices/reservasSlice";

const reservaIni: Reserva = {
    id: "",
    funcionId: "",
    cantidad: 0,
    asientos: [],
    total: 0,
    fechaReserva: ""
};

export default function FormularioRers(){
    const dispatch = useAppDispatch();

    const reservaSelec = useAppSelector(
        state => state.reservas.reservaSeleccionada
    );

    const funciones = useAppSelector(
        state => state.funciones.funciones
    );

    const [reserva, setReserva] = useState<Reserva>(reservaIni);
    useEffect(() =>{
        if(reservaSelec){
            setReserva(reservaSelec);
        }
    },[reservaSelec]);

    const guardar = () => {
        dispatch(updateReserva(reserva));
        dispatch(selectReserva(null));
        setReserva(reservaIni);
    };
    return(
        <ScrollView>
            <Text>Editar reserva</Text>
                <View>
                    <Text>Funcion</Text>
                    <View>
                        <Picker
                         selectedValue={reserva.funcionId}
                         onValueChange={(itemValue) =>
                            setReserva({
                            ...reserva,
                            funcionId: itemValue
                         })
                }
                >
                    <Picker.Item label="Seleccione una opcion" value="" />
                    {
                        funciones.map(funcion =>(
                            <Picker.Item
                            key={funcion.id}
                            label={funcion.id}
                            value={funcion.id}
                            />
                        )
                    )
                    }
                </Picker>
                    </View>
                </View>
                <View>
                    <Text>Cantidad</Text>
                    <TextInput
                    keyboardType="numeric"
                    value={reserva.cantidad ? reserva.cantidad.toString():""}
                    onChangeText={(text) =>
                        setReserva({
                            ...reserva,
                            cantidad: Number(text) || 0
                        })
                    }
                    />
                </View>
                <View>
                    <Text>Total</Text>
                    <TextInput
                    keyboardType="numeric"
                    value={reserva.total ? reserva.total.toString(): ""}
                        onChangeText ={(text) =>
                            setReserva({
                                ...reserva,
                                total: Number(text) || 0
                            })
                        }
                        />
                </View>
                <TouchableOpacity onPress={guardar}>
                    <Text>Guardar cambios</Text>
                </TouchableOpacity>
        </ScrollView>
    )
}