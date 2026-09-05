import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

interface Props{
    titulo: string;
    valor: string | number;
}

export default function TargetaEsta({
    titulo, valor}: Props
){
    return(
        <View>
            <Text>{titulo}</Text>
            <Text>{valor}</Text>
        </View>
    );
}