import React, { useState, useMemo } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Funcion } from "../../types/funcion";
import { Reserva } from "../../types/reserva";
import { addReserva } from "../../redux/slices/reservasSlice";

interface ModalReservaProps {
  visible: boolean;
  funcion: Funcion | null;
  onClose: () => void;
}

export default function ModalReserva({
  visible,
  funcion,
  onClose,
}: ModalReservaProps) {
  const dispatch = useAppDispatch();

  // 1. Redux Selectors
  const peliculas = useAppSelector((state) => state.peliculas.peliculas);
  const salas = useAppSelector((state) => state.salas.salas);
  const reservas = useAppSelector((state) => state.reservas.reservas);

  // 2. React State
  const [asientosSeleccionados, setAsientosSeleccionados] = useState<string[]>([]);

  // 3. React Hooks (useMemo) - Deben ejecutarse ANTES de cualquier 'return'
  const peliculaAsociada = useMemo(() => {
    if (!funcion) return null;
    const codigoPeli = (funcion as any).peliculaCodigo || (funcion as any).idPelicula;
    return peliculas.find(
      (p) =>
        p.codigo?.toString().trim() === codigoPeli?.toString().trim() ||
        p.nombre === codigoPeli
    );
  }, [peliculas, funcion]);

  const salaAsociada = useMemo(() => {
    if (!funcion) return null;
    const idSala = funcion.salaId || (funcion as any).idSala;
    return salas.find((s: any) => s.id === idSala || s.nombre === idSala);
  }, [salas, funcion]);

  const asientosOcupados = useMemo(() => {
    if (!funcion) return [];
    return reservas
      .filter((r) => r.funcionId === funcion.id)
      .flatMap((r) => r.asientos || []);
  }, [reservas, funcion]);

  const { filas, columnas } = useMemo(() => {
    const totalFilasNum = (salaAsociada as any)?.filas || (salaAsociada as any)?.numFilas || 6;
    const totalColsNum =
      (salaAsociada as any)?.columnas ||
      (salaAsociada as any)?.numColumnas ||
      ((salaAsociada as any)?.capacidad
        ? Math.ceil(((salaAsociada as any)?.capacidad || 36) / totalFilasNum)
        : 6);

    const letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
    const arrayFilas = letras.slice(0, Math.min(totalFilasNum, letras.length));
    const arrayCols = Array.from({ length: totalColsNum }, (_, i) => i + 1);

    return { filas: arrayFilas, columnas: arrayCols };
  }, [salaAsociada]);

  // 4. Retorno anticipado (DESPUÉS de todos los Hooks)
  if (!funcion) return null;

  // Variables calculadas
  const nombrePelicula = peliculaAsociada?.nombre || "Película no encontrada";
  const nombreSala = salaAsociada?.nombre || "Sala Principal";
  const precioUnitario = peliculaAsociada?.precio ?? 5.0;
  const totalCalculado = asientosSeleccionados.length * precioUnitario;

  const toggleAsiento = (asientoId: string) => {
    if (asientosOcupados.includes(asientoId)) {
      Alert.alert("Asiento ocupado", "Este asiento ya ha sido reservado.");
      return;
    }

    if (asientosSeleccionados.includes(asientoId)) {
      setAsientosSeleccionados(
        asientosSeleccionados.filter((id) => id !== asientoId)
      );
    } else {
      setAsientosSeleccionados([...asientosSeleccionados, asientoId]);
    }
  };

  const handleConfirmar = () => {
    if (asientosSeleccionados.length === 0) {
      Alert.alert("Atención", "Por favor selecciona al menos un asiento.");
      return;
    }

    const nuevaReserva: Reserva = {
      id: String(Date.now()),
      funcionId: funcion.id,
      asientos: asientosSeleccionados,
      total: totalCalculado,
      cantidad: asientosSeleccionados.length,
      fechaReserva: new Date().toISOString(),
    };

    dispatch(addReserva(nuevaReserva));
    Alert.alert("¡Éxito!", "Tu reserva se ha procesado correctamente.");
    setAsientosSeleccionados([]);
    onClose();
  };

  const handleClose = () => {
    setAsientosSeleccionados([]);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.cardModal}>
          <Text style={styles.modalTitle}>Reservar Asientos</Text>

          <Text style={styles.modalSubtitle}>
            {nombrePelicula} ({nombreSala}) — ${precioUnitario.toFixed(2)} c/u
          </Text>

          <Text style={styles.screenHeader}>PANTALLA DEL CINE 🎬</Text>
          <View style={styles.screenDivider} />

          {/* Grilla Dinámica de Asientos */}
          <ScrollView style={styles.gridScroll} contentContainerStyle={styles.gridContainer}>
            {filas.map((fila) => (
              <View key={fila} style={styles.filaRow}>
                {columnas.map((col) => {
                  const asientoId = `${fila}${col}`;
                  const isSelected = asientosSeleccionados.includes(asientoId);
                  const isOccupied = asientosOcupados.includes(asientoId);

                  return (
                    <TouchableOpacity
                      key={asientoId}
                      disabled={isOccupied}
                      style={[
                        styles.asientoBox,
                        isSelected && styles.asientoSelected,
                        isOccupied && styles.asientoOccupied,
                      ]}
                      onPress={() => toggleAsiento(asientoId)}
                    >
                      <Text
                        style={[
                          styles.asientoText,
                          isSelected && styles.asientoTextSelected,
                          isOccupied && styles.asientoTextOccupied,
                        ]}
                      >
                        {asientoId}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </ScrollView>

          {/* Leyenda de estado de asientos */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, styles.asientoBox]} />
              <Text style={styles.legendText}>Libre</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, styles.asientoSelected]} />
              <Text style={styles.legendText}>Selección</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, styles.asientoOccupied]} />
              <Text style={styles.legendText}>Ocupado</Text>
            </View>
          </View>

          {/* Resumen de Compra Dinámico */}
          <View style={styles.footerSummary}>
            <View>
              <Text style={styles.labelAsientos}>Asientos:</Text>
              <Text style={styles.valueAsientos}>
                {asientosSeleccionados.length > 0
                  ? asientosSeleccionados.join(", ")
                  : "Ninguno"}
              </Text>
            </View>

            <View style={styles.totalBox}>
              <Text style={styles.labelTotal}>Total</Text>
              <Text style={styles.valueTotal}>
                ${totalCalculado.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Botones */}
          <TouchableOpacity style={styles.btnConfirm} onPress={handleConfirmar}>
            <Text style={styles.btnConfirmText}>Confirmar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnCancel} onPress={handleClose}>
            <Text style={styles.btnCancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  cardModal: {
    width: "100%",
    maxHeight: "90%",
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F8FAFC",
  },
  modalSubtitle: {
    fontSize: 13,
    color: "#94A3B8",
    marginTop: 4,
    marginBottom: 12,
    textAlign: "center",
  },
  screenHeader: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
    letterSpacing: 1,
  },
  screenDivider: {
    height: 3,
    backgroundColor: "#38BDF8",
    width: "80%",
    marginTop: 6,
    marginBottom: 16,
    borderRadius: 2,
  },
  gridScroll: {
    width: "100%",
    maxHeight: 260,
  },
  gridContainer: {
    alignItems: "center",
    paddingBottom: 10,
  },
  filaRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 6,
  },
  asientoBox: {
    width: 38,
    height: 38,
    backgroundColor: "#1E293B",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  asientoSelected: {
    backgroundColor: "#EAB308",
    borderColor: "#CA8A04",
  },
  // 🔴 Color Rojo para los asientos Ocupados
  asientoOccupied: {
    backgroundColor: "#7F1D1D", // Rojo oscuro
    borderColor: "#EF4444",     // Borde rojo brillante
  },
  asientoText: {
    color: "#94A3B8",
    fontWeight: "bold",
    fontSize: 11,
  },
  asientoTextSelected: {
    color: "#0F172A",
  },
  asientoTextOccupied: {
    color: "#FCA5A5", // Texto en rojo claro
  },
  legendRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
    marginBottom: 4,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  legendBox: {
    width: 14,
    height: 14,
    borderRadius: 3,
  },
  legendText: {
    color: "#94A3B8",
    fontSize: 11,
  },
  footerSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#1E293B",
  },
  labelAsientos: {
    color: "#64748B",
    fontSize: 12,
  },
  valueAsientos: {
    color: "#F8FAFC",
    fontWeight: "bold",
    fontSize: 13,
    marginTop: 2,
    maxWidth: 180,
  },
  totalBox: {
    alignItems: "flex-end",
  },
  labelTotal: {
    color: "#64748B",
    fontSize: 12,
  },
  valueTotal: {
    color: "#38BDF8",
    fontWeight: "bold",
    fontSize: 18,
  },
  btnConfirm: {
    backgroundColor: "#38BDF8",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 8,
  },
  btnConfirmText: {
    color: "#0F172A",
    fontWeight: "bold",
    fontSize: 15,
  },
  btnCancel: {
    paddingVertical: 6,
  },
  btnCancelText: {
    color: "#64748B",
    fontSize: 14,
  },
});