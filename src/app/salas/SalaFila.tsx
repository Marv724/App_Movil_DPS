import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Sala } from "../../types/sala";
import { useAppDispatch } from "../../redux/hooks";
import { removeSala, selectSala } from "../../redux/slices/salasSlice";

interface Props {
  sala: Sala;
}

export default function SalaFila({ sala }: Props) {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.tableRow}>
      <Text style={[styles.cell, styles.colId]} numberOfLines={1}>{sala.id}</Text>
      <Text style={[styles.cell, styles.colNombre]} numberOfLines={1}>{sala.nombre}</Text>
      <Text style={[styles.cell, styles.colTipo]}>{sala.tipo_butacas}</Text>
      <Text style={[styles.cell, styles.colDim]}>{sala.filas}x{sala.columnas}</Text>
      <Text style={[styles.cell, styles.colAsientos]}>{sala.asientos?.length ?? 0}</Text>

      <View style={[styles.cellActions, styles.colAcciones]}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.btnEdit]}
          onPress={() => dispatch(selectSala(sala))}
        >
          <Text style={styles.btnEditText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.btnDelete]}
          onPress={() => dispatch(removeSala(sala.id))}
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
  colNombre: { width: 130, fontWeight: "500" },
  colTipo: { width: 100 },
  colDim: { width: 80 },
  colAsientos: { width: 80 },
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