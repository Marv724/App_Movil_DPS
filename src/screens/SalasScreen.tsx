import React from "react";
import { View, StyleSheet } from "react-native";
import FormularioSala from "../app/salas/formulariosala";
import TablaSalas from "../app/salas/tablasalas";

export default function SalaScreen() {
  return (
    <View style={styles.container}>
      <TablaSalas ListHeaderComponent={<FormularioSala />} />
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