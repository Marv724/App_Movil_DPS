import React, {useState, useEffect} from "react";
import { Sala } from "../../types/sala";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addSala, updateSala, selectSala } from "../../redux/slices/salasSlice";
import { generarAsientos } from "../../helpers/generarAsiento";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export const SalaInicial: Sala = {
    id: "",
    nombre: "",
    tipo_butacas:"",
    filas: 0,
    columnas: 0,
    asientos: [],
};

export default function FormularioSala({navigation}: any){
    const dispatch = useAppDispatch();
    const [error, seterror] = useState("");
    const [sala, setSala] = useState<Sala>(SalaInicial);
    const salas = useAppSelector(state => state.salas.salas);
    const salaSeleccionada = useAppSelector(
        state => state.salas.salaSeleccionada
    );
    useEffect(() =>
    {
        if (salaSeleccionada){
            setSala(salaSeleccionada);
        }
    }, [salaSeleccionada]);
    const handleChangeText = (name: keyof Sala, value: string) => {
        setSala({
            ...sala,
            [name]: name === "filas" || name === "columnas" 
            ? Number(value): value
        });
    };
    const guardarSala = () => {
        seterror("");
        const existe = salas.some(
            s => s.id === sala.id && s.id !== salaSeleccionada?.id
        );
        if(!sala.id.trim()){
            seterror("El ID de la sala es obligatorio.");
            return;
        }
         if(!sala.nombre.trim()){
            seterror("El nombre de la sala es obligatorio.");
            return;
        }
         if(!sala.tipo_butacas.trim()){
            seterror("Debe de seleccionar un tipo de butaca");
            return;
        }
         if(sala.filas <= 0){
            seterror("Debe de ingresar una cantidad valida de filas");
            return;
        }
        if(existe){
            seterror("Ya exite una sala con mismo ID.");
            return;
        }

        const asientos = 
        salaSeleccionada && salaSeleccionada.filas === sala.filas &&
        salaSeleccionada.columnas === sala.columnas ? salaSeleccionada.asientos:
        generarAsientos(sala.filas, sala.columnas);

        if(salaSeleccionada){
            dispatch(updateSala({ ...sala, asientos}));
        }
        else{
            dispatch(addSala({...sala, asientos}));
        }

        setSala(SalaInicial);
        dispatch(selectSala(null));
    };
    return(
        <View style={styles.container}>
            <TextInput placeholder="ID de la sala" value={sala.id} onChangeText={text => handleChangeText("id",text)}></TextInput>
            <TextInput placeholder="Nombre de sala" value={sala.nombre} onChangeText={text => handleChangeText("nombre", text)}></TextInput>
            <View>
                <Picker selectedValue={sala.tipo_butacas} onValueChange={value => handleChangeText("tipo_butacas", value)}>
                <Picker.Item label="Seleccione un tipo de butaca" value=""/>
                <Picker.Item label="Tradicionales" value="Tradicionales" />
                <Picker.Item label="Exclusivas" value="Exclusivas" />
                <Picker.Item label="Experiencia 4D" value="Experiencia-4D" />
                </Picker>
            </View>
            <TextInput placeholder="Cantidad de filas" keyboardType="numeric" value={sala.filas ? String(sala.filas): ""} onChangeText={text => handleChangeText("filas",text)} />
            <TextInput placeholder="Cantidad de columnas" keyboardType="numeric" value={sala.columnas ? String(sala.columnas): ""} onChangeText={text => handleChangeText("columnas",text)} />
            <TouchableOpacity onPress={guardarSala}>
                <Text>Guardad</Text>
            </TouchableOpacity>
            {
                error !== "" && (
                    <Text>{error}</Text>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 16
    }
})