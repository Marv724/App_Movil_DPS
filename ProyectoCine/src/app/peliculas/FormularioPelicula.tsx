import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Pelicula } from "../../types/pelicula";
import { useState, useEffect } from "react";
import { addPelicula, updatePelicula, selectPelicula } from "../../redux/slices/peliculaSlice";
import { Picker } from "@react-native-picker/picker";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Switch
} from "react-native";

export const PelisIni: Pelicula = {
    codigo: "",
    nombre: "",
    genero: "",
    duracion: 0,
    clasificacion: "",
    precio: 0,
    disponible: true,
};

export default function FormuPeli(){
    const[error, setError] = useState("");
    const[pelicula, setPelicula] = useState<Pelicula>(PelisIni);
    
    const dispatch = useAppDispatch();
    const peliSelect = useAppSelector(
        state => state.peliculas.peliculaSeleccionada
    );
    
    useEffect(() => {
        if(peliSelect){
            setPelicula(peliSelect);
        }
    }, [peliSelect]);

    const peliculas = useAppSelector(
        state => state.peliculas.peliculas
    );

    const Guardarpeli = () => {
        const existe = peliculas.some(
            p => p.codigo === pelicula.codigo
        );

        if(!pelicula.nombre.trim()){
            setError("El nombre de la pelicula es obligatorio");
            return;
        }

        if(!pelicula.codigo.trim()){
            setError("El codigo de la pelicula es obligatoria")
            return;
        }

        if(!pelicula.genero.trim()){
            setError("El genero de la pelicula es obligatoria")
            return;
        }

        if(pelicula.duracion <= 0){
            setError("Debe de asignar tiempo a la pelicula")
            return;
        }

        if(!pelicula.clasificacion.trim()){
            setError("Debe de asignar clasificacion a la pelicula")
            return;
        }

        if(pelicula.precio <= 0){
            setError("La pelicula no es gratis, asignar precio")
            return;
        }

        if(!peliSelect && existe){
            setError("Ya existe una pelicula con el mismo codigo")
            return;
        }

        if(peliSelect){
            dispatch(updatePelicula(pelicula));
        }
        else{
            dispatch(addPelicula(pelicula));
        }

        setPelicula(PelisIni);
        dispatch(selectPelicula(null));
    }

    return(
        <View>
            <Text>Reguistro de peliculas</Text>
            <View>
                <TextInput
                placeholder="Nombre de la pelicula"
                value={pelicula.nombre}
                onChangeText={(Text) =>
                    setPelicula({...pelicula, nombre: Text})
                }
                />
                <TextInput
                placeholder="Codigo de la pelicula"
                value={pelicula.codigo}
                onChangeText={(Text) =>
                    setPelicula({
                        ...pelicula, codigo: Text
                    })
                }
                />
                <View>
                    <Picker
                    selectedValue={pelicula.genero}
                    onValueChange={(itemValue) =>
                        setPelicula({
                            ...pelicula, genero:itemValue
                        })
                    }>
                        <Picker.Item label="Seleccione un genero" value="" />
                        <Picker.Item label="Accion" value="Accion"/>
                        <Picker.Item label="Comedia" value="Comedia" />
                        <Picker.Item label="Drama" value="Drama" />
                        <Picker.Item label="Terror" value="Terrot" />
                        <Picker.Item label="Thriller" value="Thriller" />
                        <Picker.Item label="Ciencia ficcion" value="Ciencia fiction" />
                    </Picker>
                </View>
                <TextInput
                    placeholder="Precio de pelicula"
                    keyboardType="numeric"
                    value={pelicula.duracion ? pelicula.duracion.toString(): ""}
                    onChangeText={(text) =>
                        setPelicula({
                            ...pelicula, duracion: Number(text) || 0
                        })
                    }
                />
                <View>
                    <Picker 
                    selectedValue={pelicula.clasificacion}
                    onValueChange={(itemValue) => 
                        setPelicula({
                            ...pelicula, clasificacion:itemValue
                        })
                    }>
                        <Picker.Item label="Seleccione una clasifiacion" value="" />
                        <Picker.Item label="G - todas las audencias" value="G" />
                        <Picker.Item label="PG - Guia Paternal Sugerida" value="PG" />
                        <Picker.Item label="PG-13 - Guia Paternal Estricta" value="PG-13" />
                        <Picker.Item label="NC-17 - Sin Admitir menores de edad y 17" value="NC-17" />
                        <Picker.Item label="NR - No clasificada" value="NR" />
                    </Picker>
                </View>
                <TextInput
                    placeholder="Precio de la pelicula"
                    keyboardType="numeric"
                    value={pelicula.precio ? pelicula.duracion.toString(): ""}
                    onChangeText={(text) =>
                        setPelicula({
                            ...pelicula, precio: Number(text) || 0
                        })
                    }
                />
                <View>
                    <Text>Disponible</Text>
                    <Switch
                    value={pelicula.disponible}
                    onValueChange={(value: any) =>
                        setPelicula({
                            ...pelicula, disponible:value
                        })
                    }
                    />
                </View>
                <TouchableOpacity onPress={Guardarpeli}>
                    <Text>Guardar</Text>
                </TouchableOpacity>
            </View>
            {error && <Text>{error}</Text>}
        </View>
    );
}