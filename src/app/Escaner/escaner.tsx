import React, { useState, useEffect } from "react";
import {View, TouchableOpacity, Text, StyleSheet} from "react-native"
import {CameraComponent} from "./camaraescaner"

type TabKey = "camara";

export default function Escaner_Layout() {
    const [activeTab, setTab] = useState<TabKey>("camara");
    return(
      <View style={styles.contenedor}>
        <View style={styles.contenido}>
            {activeTab === "camara" && <CameraComponent />}
        </View>
        <View style={styles.tabs}>
            <TouchableOpacity onPress={() => setTab("camara")} style={styles.botones}>
                <Text>Abrir camara para QR</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    contenedor: { flex: 1},
    contenido: { flex: 1},
    tabs: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        height: 60,
    },
    botones: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})