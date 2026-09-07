import React from "react";
import { View, StyleSheet } from "react-native";
import FormularioFuncion from "../app/funciones/FormularioFuncion";
import TablaFunciones from "../app/funciones/TablaFunciones";

export default function FuncionScreen() {
  return (
    <View style={styles.container}>
      <TablaFunciones ListHeaderComponent={<FormularioFuncion />} />
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