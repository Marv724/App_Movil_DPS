import React from "react";
import { Funcion } from "../../types/funcion";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addFuncion, updateFuncion, selectFuncion } from "../../redux/slices/funcionesSlice";
import { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export const funcionIni: Funcion = {
     id: "",
     peliculaCodigo: "",
     salaId: "",
     fecha: "",
     hora: ""
 }

 export default function FomularioFunc() {
    const funciones = useAppSelector(
        state => state.funciones.funciones
    );

    const dispatch = useAppDispatch();

    const [funcion, setFuncion] =
        useState<Funcion>(funcionIni);


    const [error, setError] =
        useState("");



    const peliculas =
        useAppSelector(
            state => state.peliculas.peliculas
        );


    const salas =
        useAppSelector(
            state => state.salas.salas
        );


    const funcionSeleccionada =
        useAppSelector(
            state => state.funciones.funcionSeleccionada
        );



    useEffect(() => {


        if(funcionSeleccionada){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFuncion(funcionSeleccionada);
        }

    },[funcionSeleccionada]);

    const handleInputChange = (field: keyof  Funcion, value: string) => {
        setFuncion({
            ...funcion,
            [field]: value
        })
    };

    const guardarFunc = () =>
    {
        setError("");
        if(!funcion.id.trim()){
            setError("El ID es obligatorio");
            return;
        }

        if(!funcion.peliculaCodigo){
            setError("El codigo de la pelicula es obligatorio")
            return;
        }

        if(!funcion.salaId){
            setError("Debe de seleccionar una sala")
            return;
        }

        if(!funcion.hora){
            setError("Debe de ingresar una hora")
            return;
        }

        if(!funcion.fecha){
            setError("Debe de ingresar una fecha")
            return;
        }

        const existID = funciones.some(
            f => f.id === funcion.id && f.id !== funcionSeleccionada?.id
        );
        if(existID){
            setError("Ya existe una pelicula con ese ID");
            return;
        }

        const ExistHorario = funciones.some(
            f => 
                f.id !== funcionSeleccionada?.id &&
                f.salaId !== funcion.salaId &&
                f.fecha !== funcion.fecha &&
                f.hora !== funcion.hora
        );
        if(ExistHorario){
            setError("Ya hay una funcion en esa sala en el mismo horario")
            return;
        }

        if(funcionSeleccionada){
            dispatch(updateFuncion(funcion));
        }
        else{
            dispatch(addFuncion(funcion));
        }

        setFuncion(funcionIni);
        dispatch(selectFuncion(null))
    };

    return(
        <ScrollView>
            <Text>Gestion de Funciones</Text>
            <View>
                <TextInput
                placeholder="ID Funcion"
                placeholderTextColor="ID funcion"
                value={funcion.id}
                onChangeText={(text => handleInputChange("id", text))}
                />
                <Text>Pelicula</Text>
                <View>
                    <Picker
                    selectedValue={funcion.peliculaCodigo}
                    onValueChange={(itemValue) => handleInputChange("peliculaCodigo", itemValue)}
                    >
                        <Picker.Item label="Seleccione pelicula" value=""/>
                        {peliculas.map(pelicula => (
                            <Picker.Item
                            key={pelicula.codigo}
                            label={pelicula.codigo}
                            value={pelicula.codigo}
                            />
                       ))}
                    </Picker>
                </View>
                <Text>Sala</Text>
                <View>
                    <Picker
                    selectedValue={funcion.salaId}
                    onValueChange={(itemValue) => handleInputChange("salaId", itemValue)} >
                        <Picker.Item label="Seleccione una sala" value="" />
                        {salas.map(sala =>(
                            <Picker.Item
                            key={sala.id}
                            label={sala.nombre}
                            value={sala.id}
                            />
                        ))}
                    </Picker>
                </View>
                <TextInput placeholder="Fecha"
                placeholderTextColor="#888"
                value={funcion.fecha}
                onChangeText={(text) => handleInputChange("fecha", text)}
                />
                <TextInput placeholder="Hora"
                placeholderTextColor="#888"
                value={funcion.hora}
                onChangeText={(text) => handleInputChange("hora", text)}
                />

                <TouchableOpacity onPress={guardarFunc}>
                    <Text>Guardar</Text>
                </TouchableOpacity>
                {error ?<Text>{error}</Text>: null}
            </View>
        </ScrollView>
    )

    

 }