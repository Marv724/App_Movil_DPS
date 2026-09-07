import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { Funcion } from "../../types/funcion";

// 1. Asegúrate de definir las Props correctas aquí
interface FuncionCardProps {
  funcion: Funcion;
}

// 2. IMPORTANTE: El nombre del componente DEBE ser FuncionCard
export default function FuncionCard({ funcion }: FuncionCardProps) {
  const [mostrarModal, setMostrarModal] = useState(false);

  const peliculas = useAppSelector((state) => state.peliculas.peliculas);
  const salas = useAppSelector((state) => state.salas.salas);

  const pelicula = peliculas.find(
    (p) => p.codigo === funcion.peliculaCodigo
  );
  const sala = salas.find((s) => s.id === funcion.salaId);

  if (!pelicula || !sala) {
    return null;
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.movieTitle}>{pelicula.nombre}</Text>
        <Text style={styles.priceBadge}>${pelicula.precio.toFixed(2)}</Text>
      </View>

      <View style={styles.infoGrid}>
        <View style={styles.infoBadge}>
          <Text style={styles.infoLabel}>Sala:</Text>
          <Text style={styles.infoValue}>{sala.nombre}</Text>
        </View>

        <View style={styles.infoBadge}>
          <Text style={styles.infoLabel}>Fecha:</Text>
          <Text style={styles.infoValue}>{funcion.fecha}</Text>
        </View>

        <View style={styles.infoBadge}>
          <Text style={styles.infoLabel}>Hora:</Text>
          <Text style={styles.infoValue}>{funcion.hora}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#111827",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1E293B",
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F8FAFC",
    flex: 1,
    marginRight: 8,
  },
  priceBadge: {
    backgroundColor: "rgba(56, 189, 248, 0.15)",
    color: "#38BDF8",
    fontWeight: "bold",
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.3)",
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  infoBadge: {
    flexDirection: "row",
    backgroundColor: "#1E293B",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: "center",
  },
  infoLabel: {
    color: "#94A3B8",
    fontSize: 12,
    marginRight: 4,
  },
  infoValue: {
    color: "#E2E8F0",
    fontSize: 12,
    fontWeight: "600",
  },
});