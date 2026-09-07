import React, { ReactElement } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import FuncionCard from "./FuncionCard";

interface CarteleraProps {
  ListHeaderComponent?: ReactElement;
}

export default function Cartelera({ ListHeaderComponent }: CarteleraProps) {
  const funciones = useAppSelector((state) => state.funciones.funciones);

  return (
    <FlatList
      data={funciones}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <FuncionCard funcion={item} />}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={
        <View>
          {ListHeaderComponent}
          <Text style={styles.sectionTitle}>Películas en Cartelera</Text>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay funciones programadas en cartelera</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F8FAFC",
    marginBottom: 14,
    marginTop: 8,
  },
  emptyContainer: {
    padding: 30,
    alignItems: "center",
  },
  emptyText: {
    color: "#64748B",
    fontSize: 14,
    fontStyle: "italic",
  },
});