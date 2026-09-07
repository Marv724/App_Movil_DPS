import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import FormularioPeliculas from "../app/peliculas/FormularioPelicula";
import TablaPeliculas from "../app/peliculas/TablaPeliculas";

export default function PeliScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <FormularioPeliculas />
      <View style={styles.separator} />
      <TablaPeliculas />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0F1D", // Azul noche/negro muy oscuro
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  separator: {
    height: 1,
    backgroundColor: "#1E293B",
    marginVertical: 20,
  },
});