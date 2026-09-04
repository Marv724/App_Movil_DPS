import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { Sala } from "../../types/sala";
import { useAppDispatch } from "../../redux/hooks";
import { removeSala, selectSala } from "../../redux/slices/salasSlice";

interface Props{ sala: Sala}

export default function SalaFila({sala}: Props){
    const dispatch = useAppDispatch();

    const eliminarSala = (id: string) =>{
        dispatch(removeSala(id));
    }
    const editarSala = () =>{
        dispatch(selectSala(sala));
    }

    return(
        <View>
            <Text>{sala.id}</Text>
            <Text>{sala.nombre}</Text>
            <Text>{sala.tipo_butacas}</Text>
            <Text>{sala.filas}</Text>
            <Text>{sala.columnas}</Text>
            <Text>{sala.asientos.length}</Text>

            <View>
                <TouchableOpacity onPress={editarSala}>
                    <Text>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => eliminarSala(sala.id)}>
                    <Text>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}