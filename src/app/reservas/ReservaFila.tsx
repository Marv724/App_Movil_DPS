import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Reserva } from "../../types/reserva";
import { removeReserva, selectReserva } from "../../redux/slices/reservasSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

interface Props {
  reserva: Reserva;
}

export default function ReservaFila({ reserva }: Props) {
  const dispatch = useAppDispatch();
  const funciones = useAppSelector((state) => state.funciones.funciones);
  const peliculas = useAppSelector((state) => state.peliculas.peliculas);

  const funcion = funciones.find((a) => a.id === reserva.funcionId);
  const pelicula = peliculas.find((b) => b.codigo === funcion?.peliculaCodigo);

  return (
    <View style={styles.tableRow}>
      <Text style={[styles.cell, styles.colId]} numberOfLines={1}>
        #{String(reserva.id).slice(0, 6)}
      </Text>
      <Text style={[styles.cell, styles.colPeli]} numberOfLines={1}>
        {pelicula?.nombre ?? "N/A"}
      </Text>
      <Text style={[styles.cell, styles.colFecha]}>
        {funcion ? `${funcion.fecha} ${funcion.hora}` : "N/A"}
      </Text>
      <Text style={[styles.cell, styles.colCantidad]}>{reserva.cantidad}</Text>
      <Text style={[styles.cell, styles.colAsientos]} numberOfLines={1}>
        {Array.isArray(reserva.asientos) ? reserva.asientos.join(", ") : "N/A"}
      </Text>

      <View style={[styles.cellActions, styles.colAcciones]}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.btnEdit]}
          onPress={() => dispatch(selectReserva(reserva))}
        >
          <Text style={styles.btnEditText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.btnDelete]}
          onPress={() => dispatch(removeReserva(reserva.id))}
        >
          <Text style={styles.btnDeleteText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
  colId: { width: 80, fontWeight: "600", color: "#38BDF8" },
  colPeli: { width: 130, fontWeight: "500" },
  colFecha: { width: 130 },
  colCantidad: { width: 60 },
  colAsientos: { width: 100 },
  colAcciones: { width: 150 },

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