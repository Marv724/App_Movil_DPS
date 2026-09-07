import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Funcion } from "../../types/funcion";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeFuncion, selectFuncion } from "../../redux/slices/funcionesSlice";

interface Props {
  funcion: Funcion;
}

export default function FuncionFila({ funcion }: Props) {
  const dispatch = useAppDispatch();
  const peliculas = useAppSelector((state) => state.peliculas.peliculas);
  const salas = useAppSelector((state) => state.salas.salas);

  const pelicula = peliculas.find((p) => p.codigo === funcion.peliculaCodigo);
  const sala = salas.find((s) => s.id === funcion.salaId);

  return (
    <View style={styles.tableRow}>
      <Text style={[styles.cell, styles.colId]} numberOfLines={1}>{funcion.id}</Text>
      <Text style={[styles.cell, styles.colPeli]} numberOfLines={1}>
        {pelicula?.nombre ?? funcion.peliculaCodigo}
      </Text>
      <Text style={[styles.cell, styles.colSala]} numberOfLines={1}>
        {sala?.nombre ?? funcion.salaId}
      </Text>
      <Text style={[styles.cell, styles.colFecha]}>{funcion.fecha}</Text>
      <Text style={[styles.cell, styles.colHora]}>{funcion.hora}</Text>

      <View style={[styles.cellActions, styles.colAcciones]}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.btnEdit]}
          onPress={() => dispatch(selectFuncion(funcion))}
        >
          <Text style={styles.btnEditText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.btnDelete]}
          onPress={() => dispatch(removeFuncion(funcion.id))}
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
  colId: { width: 70, fontWeight: "600", color: "#38BDF8" },
  colPeli: { width: 140, fontWeight: "500" },
  colSala: { width: 100 },
  colFecha: { width: 90 },
  colHora: { width: 80 },
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