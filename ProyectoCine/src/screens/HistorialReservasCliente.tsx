import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
// Asegúrate de importar la acción para eliminar de tu reservasSlice
import { removeReserva } from "../redux/slices/reservasSlice"; 
import QrModal from "./QrModal";

export default function HistorialReservasCliente() {
  const dispatch = useAppDispatch();
  const reservas = useAppSelector((state) => state.reservas.reservas);
  const funciones = useAppSelector((state) => state.funciones.funciones);
  const peliculas = useAppSelector((state) => state.peliculas.peliculas);
  const salas = useAppSelector((state) => state.salas.salas);

  const [reservaSeleccionada, setReservaSeleccionada] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const abrirModalQR = (reservaData: any) => {
    setReservaSeleccionada(reservaData);
    setModalVisible(true);
  };

  // Función para confirmar y eliminar la reserva en Redux
  const handleEliminarReserva = (idReserva: string) => {
    Alert.alert(
      "Eliminar Reserva",
      `¿Estás seguro de que deseas cancelar y eliminar la reserva #${idReserva}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            dispatch(removeReserva(idReserva));
          },
        },
      ]
    );
  };

  const renderReservaItem = ({ item: reserva }: { item: any }) => {
    const funcion = funciones.find((f: any) => f.id === reserva.funcionId);
    const pelicula = peliculas.find((p: any) => {
      const pCodigo = funcion?.peliculaCodigo || (funcion as any)?.idPelicula;
      return p.codigo === pCodigo || p.id === pCodigo;
    });
    const sala = salas.find((s: any) => {
      const sId = funcion?.salaId || (funcion as any)?.idSala;
      return s.id === sId || s.nombre === sId;
    });

    const asientosFormateados = Array.isArray(reserva.asientos)
      ? reserva.asientos.filter(Boolean).join(", ")
      : typeof reserva.asientos === "string" && reserva.asientos.trim() !== ""
      ? reserva.asientos.replace(/,\s*$/, "")
      : "Sin especificar";

    const datosCompletos = {
      id: reserva.id,
      pelicula: pelicula?.nombre || "Película no encontrada",
      sala: sala?.nombre || "N/A",
      fecha: funcion?.fecha || "N/A",
      hora: funcion?.hora || "N/A",
      asientos: asientosFormateados,
      total: reserva.total ? Number(reserva.total).toFixed(2) : "0.00",
    };

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.idPelicula}>Reserva #{reserva.id}</Text>

          <View style={styles.actionsRow}>
            {/* Botón QR */}
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => abrirModalQR(datosCompletos)}
            >
              <Text style={styles.btnIcon}>QR </Text>
            </TouchableOpacity>

            {/* Botón Eliminar Reserva */}
            <TouchableOpacity
              style={[styles.actionBtn, styles.btnDelete]}
              onPress={() => handleEliminarReserva(reserva.id)}
            >
              <Text style={styles.btnDeleteText}>Eliminar  </Text>
            </TouchableOpacity>

            <Text style={styles.totalBadge}>${datosCompletos.total}</Text>
          </View>
        </View>

        <Text style={styles.tituloPelicula}>{datosCompletos.pelicula}</Text>

        <View style={styles.detallesRow}>
          <View style={styles.detalleCol}>
            <Text style={styles.label}>Sala:</Text>
            <Text style={styles.value}>{datosCompletos.sala}</Text>
          </View>
          <View style={styles.detalleCol}>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>{datosCompletos.fecha}</Text>
          </View>
          <View style={styles.detalleCol}>
            <Text style={styles.label}>Hora:</Text>
            <Text style={styles.value}>{datosCompletos.hora}</Text>
          </View>
        </View>

        <View style={styles.asientosContainer}>
          <Text style={styles.labelAsientos}>Asientos seleccionados:</Text>
          <Text
            style={styles.asientosValue}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {datosCompletos.asientos}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Mis Reservaciones</Text>

      {reservas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aún no has realizado reservaciones.</Text>
        </View>
      ) : (
        <FlatList
          data={reservas}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderReservaItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <QrModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        reservaData={reservaSeleccionada}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F8FAFC",
    marginBottom: 16,
  },
  listContent: { paddingBottom: 20 },
  card: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  idPelicula: { color: "#64748B", fontSize: 12, fontWeight: "600" },
  actionsRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  actionBtn: {
    backgroundColor: "#1E293B",
    borderColor: "#38BDF8",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  btnDelete: {
    borderColor: "#EF4444",
    backgroundColor: "#1E293B",
  },
  btnDeleteText: {
    fontSize: 12,
    color:"#F8FAFC"
  },
  btnIcon: { color: "#F8FAFC", fontSize: 12, fontWeight: "bold" },
  totalBadge: {
    color: "#38BDF8",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 4,
  },
  tituloPelicula: {
    color: "#F8FAFC",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  detallesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1E293B",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  detalleCol: { alignItems: "center" },
  label: { color: "#94A3B8", fontSize: 12, marginBottom: 2 },
  value: { color: "#F8FAFC", fontSize: 13, fontWeight: "600" },
  asientosContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
    width: "100%",
  },
  labelAsientos: {
    color: "#94A3B8",
    fontSize: 12,
    marginRight: 8,
  },
  asientosValue: {
    color: "#EAB308",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
    flex: 1,
  },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { color: "#64748B", fontSize: 15 },
});