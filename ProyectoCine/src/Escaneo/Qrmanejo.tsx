import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

interface QRDisplayprops {
    data: string | object;
    size ? :number
    label ? : string
}

export const Qrdisplay = ({data, size = 200, label}: QRDisplayprops) =>
{
    const value = typeof data === 'string' ? data: JSON.stringify(data);

    return(
        <View>
            <QRCode value={value} size={size} />
            {label && <Text>{label}</Text>}
        </View>
    )
}

