import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useAppSelector } from "../redux/hooks";
import { Funcion } from "../types/funcion";
import ModalReserva from "../app/reservas/ModalReserva";

export default function CarteleraCliente() {
  const peliculas = useAppSelector((state) => state.peliculas.peliculas);
  const funciones = useAppSelector((state) => state.funciones.funciones);
  const salas = useAppSelector((state) => state.salas.salas);

  const [selectedFuncion, setSelectedFuncion] = useState<Funcion | null>(null);

  const renderPeliculaItem = ({ item: pelicula }: { item: any }) => {
  // Filtrado exacto usando la propiedad de la interface Funcion (peliculaCodigo)
  const funcionesPeli = funciones.filter((f: any) => {
    // 1. Coincidencia directa por el código de la película asignado en la función
    if (f.peliculaCodigo && pelicula.codigo) {
      return f.peliculaCodigo.toString().trim() === pelicula.codigo.toString().trim();
    }

    // 2. Compatibilidad alternativa en caso de que alguna función antigua tenga otra propiedad
    const altPeliId = f.idPelicula || f.peliculaId || f.pelicula;
    return (
      altPeliId === pelicula.codigo ||
      altPeliId === pelicula.nombre
    );
  });

  return (
    <View style={styles.card}>
      <Text style={styles.peliTitle}>{pelicula.nombre}</Text>
      <Text style={styles.peliDetail}>
        {pelicula.genero} • {pelicula.duracion} min • {pelicula.clasificacion}
      </Text>

      <Text style={styles.precioPeli}>
        Precio: ${pelicula.precio ? pelicula.precio.toFixed(2) : "5.00"}
      </Text>

      <Text style={styles.horariosHeader}>Horarios disponibles:</Text>
      <View style={styles.horariosGrid}>
        {funcionesPeli.length > 0 ? (
          funcionesPeli.map((func: any, index: number) => {
            // Se obtiene la sala según el ID guardado en la función (func.salaId)
            const sala = salas.find(
              (s: any) =>
                s.id === func.salaId ||
                s.nombre === func.salaId ||
                s.id === func.idSala
            );

            const horaMostrar = func.hora || func.horaInicio || func.horario || "18:00";

            return (
              <TouchableOpacity
                key={func.id || index}
                style={styles.horarioChip}
                onPress={() => setSelectedFuncion(func)}
              >
                <Text style={styles.horarioText}>{horaMostrar}</Text>
                <Text style={styles.salaText}>
                  {sala?.nombre || func.salaId || "Sala"}
                </Text>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={styles.noHorarios}>Sin funciones disponibles</Text>
        )}
      </View>
    </View>
  );
};

  return (
    <View style={styles.container}>
      <FlatList
        data={peliculas.filter((p) => p.disponible)}
        keyExtractor={(item) => item.codigo}
        renderItem={renderPeliculaItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay películas disponibles en cartelera.</Text>
          </View>
        }
      />

      <ModalReserva
        visible={selectedFuncion !== null}
        funcion={selectedFuncion}
        onClose={() => setSelectedFuncion(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F17",
    padding: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  peliTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F8FAFC",
  },
  peliDetail: {
    fontSize: 13,
    color: "#94A3B8",
    marginTop: 2,
  },
  precioPeli: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#38BDF8",
    marginTop: 4,
    marginBottom: 12,
  },
  horariosHeader: {
    fontSize: 12,
    color: "#64748B",
    textTransform: "uppercase",
    marginBottom: 8,
    fontWeight: "600",
  },
  horariosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  horarioChip: {
    backgroundColor: "#1E293B",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  horarioText: {
    color: "#38BDF8",
    fontWeight: "bold",
    fontSize: 13,
  },
  salaText: {
    color: "#94A3B8",
    fontSize: 11,
    marginTop: 2,
  },
  noHorarios: {
    color: "#64748B",
    fontSize: 13,
    fontStyle: "italic",
  },
  emptyContainer: {
    padding: 24,
    alignItems: "center",
  },
  emptyText: {
    color: "#94A3B8",
  },
});