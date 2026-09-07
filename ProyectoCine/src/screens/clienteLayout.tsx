import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import CarteleraCliente from "./CarteleraClienteScreen";
import HistorialReservasCliente from "./HistorialReservasCliente";

export default function ClienteLayout() {
  const [tab, setTab] = useState<"cartelera" | "reservas">("cartelera");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contenido}>
        {tab === "cartelera" ? <CarteleraCliente /> : <HistorialReservasCliente />}
      </View>

      {/* Barra de pestañas inferiores */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, tab === "cartelera" && styles.tabActive]}
          onPress={() => setTab("cartelera")}
        >
          <Text style={[styles.tabText, tab === "cartelera" && styles.tabTextActive]}>
            Carteleraa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, tab === "reservas" && styles.tabActive]}
          onPress={() => setTab("reservas")}
        >
          <Text style={[styles.tabText, tab === "reservas" && styles.tabTextActive]}>
            Reservacioness
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" },
  contenido: { flex: 1 },
  tabBar: {
    flexDirection: "row",
    height: 65, // Ligera elevación de altura para mejor lectura
    backgroundColor: "#111827",
    borderTopWidth: 1,
    borderTopColor: "#1E293B",
    paddingBottom: 5, // Espacio preventivo para barras gestuales en Android/iOS
  },
  tabButton: {
    flex: 1,
    height: "100%", // Asegura que el botón use todo el alto sin recortar texto
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
  },
  tabActive: {
    borderTopWidth: 2,
    borderTopColor: "#38BDF8",
  },
  tabText: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "600",
    includeFontPadding: false, // Quita el padding por defecto de tipografía en Android
  },
  tabTextActive: {
    color: "#38BDF8",
  },
});