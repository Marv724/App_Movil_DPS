import React from "react";
import { Funcion } from "../../types/funcion";
import { useAppDispatch } from "../../redux/hooks";
import { removeFuncion, selectFuncion } from "../../redux/slices/funcionesSlice";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

interface Props {
    funcion: Funcion;
}

export default function FuncFil({funcion}: Props){
const dispatch = useAppDispatch();
const EliminarFunc = () => {
    dispatch(removeFuncion(funcion.id))
};
const EditarFunc = () => {
    dispatch(selectFuncion(funcion));
};

return(
    <View>
        <Text>{funcion.id}</Text>
        <Text>{funcion.peliculaCodigo}</Text>
        <Text>{funcion.salaId}</Text>
        <Text>{funcion.fecha}</Text>
        <Text>{funcion.hora}</Text>
        <View>
            <TouchableOpacity onPress={EditarFunc}>
                <Text>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={EliminarFunc}>
                <Text>Eliminar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => dispatch(selectFuncion(funcion))}>
                <Text>Asientos</Text>
            </TouchableOpacity>
        </View>
    </View>
);

}