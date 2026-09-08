import React, { ReactElement } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import SalaFila from "./SalaFila";
import { useAppSelector } from "../../redux/hooks";

interface TablaSala {
  ListHeaderComponent?: ReactElement;
}

export default function TablaSalas({ ListHeaderComponent }: TablaSala) {
  const salas = useAppSelector((state) => state.salas.salas);

  const renderencabezado = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.headerCell, { width: 70 }]}>ID</Text>
      <Text style={[styles.headerCell, { width: 130 }]}>Nombre</Text>
      <Text style={[styles.headerCell, { width: 110 }]}>Tipo</Text>
      <Text style={[styles.headerCell, { width: 50 }]}>Filas</Text>
      <Text style={[styles.headerCell, { width: 70 }]}>Column.</Text>
      <Text style={[styles.headerCell, { width: 70 }]}>Asientos</Text>
      <Text style={[styles.headerCell, { width: 90, textAlign: "center" }]}>
        Acciones
      </Text>
    </View>
  );

  return (
    <FlatList
      data={salas}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <SalaFila sala={item} />
        </ScrollView>
      )}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={
        <View>
          {/* El formulario permanece fijo al ancho de la pantalla */}
          {ListHeaderComponent}

          <Text style={styles.sectionTitle}>Salas Registradas</Text>

          {/* Solo el encabezado de la tabla permite Scroll Horizontal si falta espacio */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {renderencabezado()}
          </ScrollView>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay salas registradas</Text>
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
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1E293B",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  headerCell: {
    color: "#38BDF8",
    fontWeight: "bold",
    fontSize: 13,
    paddingHorizontal: 4,
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