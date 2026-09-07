import React, { ReactElement } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useAppSelector } from "../../redux/hooks";
import ReservaFila from "./ReservaFila";

interface TablaReserva {
  ListHeaderComponent?: ReactElement;
}

export default function TablaReservas({ ListHeaderComponent }: TablaReserva) {
  const reservas = useAppSelector((state) => state.reservas.reservas);

  const renderEncabezado = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.headerCell, { width: 70 }]}>ID</Text>
      <Text style={[styles.headerCell, { width: 110 }]}>Película</Text>
      <Text style={[styles.headerCell, { width: 90 }]}>Función</Text>
      <Text style={[styles.headerCell, { width: 70 }]}>Boletos</Text>
      <Text style={[styles.headerCell, { width: 100 }]}>Asientos</Text>
      <Text style={[styles.headerCell, { width: 80 }]}>Total</Text>
      <Text style={[styles.headerCell, { width: 100 }]}>Compra</Text>
      <Text style={[styles.headerCell, { width: 100, textAlign: "center" }]}>
        Acciones
      </Text>
    </View>
  );

  return (
    <FlatList
      data={reservas}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ReservaFila reserva={item} />
        </ScrollView>
      )}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={
        <View>
          {ListHeaderComponent}

          <Text style={styles.sectionTitle}>Reservas Realizadas</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {renderEncabezado()}
          </ScrollView>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay reservas registradas</Text>
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