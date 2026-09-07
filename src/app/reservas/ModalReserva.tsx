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
import MapaAsientos from "../salas/MapaAsientos";
import { Funcion } from "../../types/funcion";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addReserva } from "../../redux/slices/reservasSlice";
import { Modal } from "react-native";

interface Props{
    visible: boolean;
    funcion: Funcion;
    cerrar: () => void;
}

export default function Modalreserv({
    visible, funcion, cerrar
}: Props){
    const dispatch = useAppDispatch();
    const[asientoSelect, setAsientoSelec] = useState<string[]>([]);

    const peliculas = useAppSelector(
        state => state.peliculas.peliculas
    );
    
    const pelicula = peliculas.find(
        p => p.codigo === funcion.peliculaCodigo
    );

    const total = (pelicula?.precio ?? 0 ) * asientoSelect.length;

    const confirmarReserv = () => {
        if(asientoSelect.length === 0){
            return;
        }

        dispatch(
            addReserva({
                id: crypto.randomUUID(),
                funcionId: funcion.id,
                cantidad: asientoSelect.length,
                asientos: asientoSelect,
                total,
                fechaReserva: new Date().toISOString()
            })
        );
        setAsientoSelec([]);
        cerrar();
    };
    return(
        <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={cerrar}
        >
        <View>
            <View>
                <TouchableOpacity onPress={cerrar}>
                    <Text>X</Text>
                </TouchableOpacity>
                <Text>Comprar boleto</Text>
                <ScrollView>
                    <MapaAsientos
                    funcion={funcion}
                    asientosSelc={asientoSelect}
                    setAsientosSelc={setAsientoSelec}
                    />
                    <Text>
                        cantidad: {asientoSelect.length}
                    </Text>
                    <Text>
                        Total: ${total}
                    </Text>
                    <TouchableOpacity
                    onPress={confirmarReserv}
                    disabled={asientoSelect.length === 0}
                    >
                        <Text>Confirmar compra</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
        </Modal>
    );
}