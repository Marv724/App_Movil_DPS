import React from "react";
import { View, StyleSheet } from "react-native";
import FormularioReserva from "../app/reservas/FormularioReserva";
import TablaReservas from "../app/reservas/TablaReservas";

export default function ReservaScreen() {
  return (
    <View style={styles.container}>
      <TablaReservas ListHeaderComponent={<FormularioReserva />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0F1D",
    width: "100%",
  },
});