import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Pelicula } from "../../types/pelicula";
import { removePelicula, selectPelicula } from "../../redux/slices/peliculaSlice";
import { useAppDispatch } from "../../redux/hooks";

interface Props {
  pelicula: Pelicula;
}

export default function PeliculaFila({ pelicula }: Props) {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.tableRow}>
      {/* Las celdas deben coincidir en orden y ancho con el encabezado */}
      <Text style={[styles.cell, styles.colCodigo]} numberOfLines={1}>
        {pelicula.codigo}
      </Text>
      <Text style={[styles.cell, styles.colNombre]} numberOfLines={1}>
        {pelicula.nombre}
      </Text>
      <Text style={[styles.cell, styles.colGenero]} numberOfLines={1}>
        {pelicula.genero}
      </Text>
      <Text style={[styles.cell, styles.colDuracion]}>
        {pelicula.duracion} min
      </Text>
      <Text style={[styles.cell, styles.colClasif]}>
        {pelicula.clasificacion}
      </Text>
      <Text style={[styles.cell, styles.colPrecio]}>
        ${pelicula.precio.toFixed(2)}
      </Text>
      <Text style={[styles.cell, styles.colDisp, pelicula.disponible ? styles.txtActive : styles.txtInactive]}>
        {pelicula.disponible ? "Sí" : "No"}
      </Text>

      <View style={[styles.cellActions, styles.colAcciones]}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.btnEdit]}
          onPress={() => dispatch(selectPelicula(pelicula))}
        >
          <Text style={styles.btnEditText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.btnDelete]}
          onPress={() => dispatch(removePelicula(pelicula.codigo))}
        >
          <Text style={styles.btnDeleteText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Anchos estandarizados para alinear con el header
const styles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
  },
  cell: {
    color: "#E2E8F0",
    fontSize: 13,
    paddingHorizontal: 4,
  },
  cellActions: {
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 4,
  },
  // Anchos de cada columna
  colCodigo: { width: 90, fontWeight: "600", color: "#38BDF8" },
  colNombre: { width: 140, fontWeight: "500" },
  colGenero: { width: 100 },
  colDuracion: { width: 80 },
  colClasif: { width: 70 },
  colPrecio: { width: 70 },
  colDisp: { width: 50 },
  colAcciones: { width: 150 },

  txtActive: { color: "#34D399" },
  txtInactive: { color: "#F87171" },

  actionBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  btnEdit: {
    backgroundColor: "rgba(56, 189, 248, 0.15)",
  },
  btnEditText: {
    color: "#38BDF8",
    fontSize: 12,
    fontWeight: "600",
  },
  btnDelete: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
  },
  btnDeleteText: {
    color: "#F87171",
    fontSize: 12,
    fontWeight: "600",
  },
});