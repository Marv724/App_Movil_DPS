import React, { ReactElement } from "react";
import PeliFila from "./PeliculaFila";
import { useAppSelector } from "../../redux/hooks";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView
} from "react-native";

interface TablaPelis {
  ListHeaderComponent?: ReactElement;
}

export default function TablaPeliculas({ ListHeaderComponent }: TablaPelis) {
  const pelis = useAppSelector((state) => state.peliculas.peliculas);

  const renderEncabezado = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.headerCell, { width: 80 }]}>Código</Text>
      <Text style={[styles.headerCell, { width: 140 }]}>Nombre</Text>
      <Text style={[styles.headerCell, { width: 100 }]}>Género</Text>
      <Text style={[styles.headerCell, { width: 80 }]}>Duración</Text>
      <Text style={[styles.headerCell, { width: 100 }]}>Clasif.</Text>
      <Text style={[styles.headerCell, { width: 80 }]}>Precio</Text>
      <Text style={[styles.headerCell, { width: 90 }]}>Disponible</Text>
      <Text style={[styles.headerCell, { width: 100, textAlign: "center" }]}>Acciones</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Películas Disponibles</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View>
          {renderEncabezado()}
          <FlatList
            data={pelis}
            keyExtractor={(item) => item.codigo.toString()}
            renderItem={({ item }) => <PeliFila pelicula={item} />}
            ListHeaderComponent={ListHeaderComponent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No hay películas registradas</Text>
              </View>
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F8FAFC",
    marginBottom: 16,
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