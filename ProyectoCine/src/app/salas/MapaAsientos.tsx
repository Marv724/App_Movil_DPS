import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { Funcion } from "../../types/funcion";
import { Dispatch, SetStateAction } from "react";

interface props {
    funcion: Funcion;
    asientosSelc: string[];
    setAsientosSelc: Dispatch<SetStateAction<string[]>>;
}

export default function MapaAsientos({
    funcion,
    asientosSelc,
    setAsientosSelc
}: props) {
    const asientosOcupados = [
        "A2",
        "B3"
    ];
    
    const salas = useAppSelector(state => state.salas.salas);
    const sala = salas.find(sala => sala.id === funcion.salaId);

    if (!sala) {
        return (
            <View>
                <Text>No existe la sala asociada</Text>
            </View>
        );
    }

    const seleccionarAsiento = (numero: string) => {
        if (asientosOcupados.includes(numero)) {
            return;
        }
        if (asientosSelc.includes(numero)) {
            setAsientosSelc(
                asientosSelc.filter(
                    asiento => asiento !== numero
                )
            );
        } else {
            setAsientosSelc([
                ...asientosSelc, numero
            ]);
        }
    };

    const obtenerEstadoAsiento = (numero: string) => {
        if (asientosOcupados.includes(numero)) {
            return "ocupado";
        }
        if (asientosSelc.includes(numero)) {
            return "seleccionado";
        }
        return "libre";
    };

    return (
        <View>
            <Text>Sala: {sala.nombre}</Text>
            <Text>Funcion: {funcion.fecha} {funcion.hora}</Text>
            <View>
                {
                    sala.asientos.map(asiento => {
                        const estado = obtenerEstadoAsiento(asiento.numero);

                        return (
                            <TouchableOpacity 
                                key={asiento.id} 
                                disabled={estado === "ocupado"} 
                                onPress={() => seleccionarAsiento(asiento.numero)} 
                            >
                                <Text>{asiento.numero}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <Text>
                Asientos seleccionados: {""}
                {asientosSelc.join(",")}
            </Text>
        </View>
    );
}