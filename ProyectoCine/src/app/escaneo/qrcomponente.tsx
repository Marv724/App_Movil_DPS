import React from "react";
import { View, Text, StyleSheet  } from "react-native";
import { UseSelector } from "react-redux";
import type { RootState } from "@reduxjs/toolkit/query";
import {Qrdisplay} from "./Qrmanejo"
import { useAppSelector } from "../../redux/hooks";

interface Props{
    reservaid: string;
}

export const CreacionQr = ({reservaid}: Props) =>
{
    const reserva = useAppSelector((state) =>
        state.reservas.reservas.find((r) => r.id === reservaid)
    );
    if(!reserva){
        return(
            <View>
                <Text>Reserva no encontrada</Text>
            </View>
        )
    }
    return(
        <View>
            <Qrdisplay
            data={{
                id: reserva.id,
                funcionId: reserva.funcionId,
                asientos: reserva.asientos,
                total: reserva.total
            }}
            label="Tu codigo de QR de reserva"
            />
        </View>
    )
}