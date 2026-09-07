import React, { ReactElement } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import { useAppSelector } from "../../redux/hooks";
import FuncionFila from "./FuncionFila";

interface Tablafunciones {
  ListHeaderComponent?: ReactElement;
}

export default function TablaFunciones({ ListHeaderComponent }: Tablafunciones) {
  const funciones = useAppSelector((state) => state.funciones.funciones);

  const renderEncabezado = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.headerCell, { width: 80 }]}>ID</Text>
      <Text style={[styles.headerCell, { width: 110 }]}>Película</Text>
      <Text style={[styles.headerCell, { width: 100 }]}>Sala</Text>
      <Text style={[styles.headerCell, { width: 100 }]}>Fecha</Text>
      <Text style={[styles.headerCell, { width: 80 }]}>Hora</Text>
      <Text style={[styles.headerCell, { width: 100, textAlign: "center" }]}>
        Acciones
      </Text>
    </View>
  );

  return (
    <FlatList
      data={funciones}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FuncionFila funcion={item} />
        </ScrollView>
      )}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={
        <View>
          {ListHeaderComponent}

          <Text style={styles.sectionTitle}>Funciones Programadas</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {renderEncabezado()}
          </ScrollView>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay funciones registradas</Text>
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