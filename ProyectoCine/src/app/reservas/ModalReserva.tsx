import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ViewStyle,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Funcion } from "../../types/funcion";
import { addReserva } from "../../redux/slices/reservasSlice";
import { generarAsientos } from "../../helpers/generarAsiento";
import { AsientoFuncion } from "../../types/asientofuncion";

interface Props {
  visible: boolean;
  funcion: Funcion | null;
  onClose: () => void;
}

export default function ModalReserva({ visible, funcion, onClose }: Props) {
  const dispatch = useAppDispatch();
  const salas = useAppSelector((state) => state.salas.salas);
  const peliculas = useAppSelector((state) => state.peliculas.peliculas);
  const reservas = useAppSelector((state) => state.reservas.reservas);

  const [mapaAsientos, setMapaAsientos] = useState<AsientoFuncion[]>([]);

  // 1. Obtener la película y asegurar que el precio incremente $5 por asiento seleccionable
  const peliculaActual = peliculas.find((p: any) => {
    const idPeliEnFuncion = (funcion as any)?.idPelicula || (funcion as any)?.peliculaId || (funcion as any)?.pelicula;
    return (
      p.codigo === idPeliEnFuncion ||
      p.nombre === idPeliEnFuncion ||
      p.titulo === idPeliEnFuncion
    );
  });

  // Si la película tiene precio se usa, si es 0 o no existe, el valor por defecto es $5.00
  const precioUnitario = peliculaActual?.precio && peliculaActual.precio > 0 ? peliculaActual.precio : 5;

  useEffect(() => {
    if (visible && funcion) {
      const sala = salas.find(
        (s: any) =>
          s.id === (funcion as any).idSala ||
          s.id === (funcion as any).salaId ||
          s.nombre === (funcion as any).idSala ||
          s.nombre === (funcion as any).sala
      );

      const filas = sala?.filas || 5;
      const columnas = sala?.columnas || 6;

      const asientosBase = generarAsientos(filas, columnas);

      // Obtener los IDs o identificadores de los asientos reservados previamente para esta función
      const asientosOcupadosIds = reservas
        .filter((r: any) => r.funcionId === (funcion as any).id)
        .flatMap((r: any) => r.asientos || []);

      const mapaInicial: AsientoFuncion[] = asientosBase.map((asiento: any) => {
        // Soporta comparación por ID numérico o por código de etiqueta ("A1", "A", etc.)
        const estaOcupado =
          asientosOcupadosIds.includes(asiento.id.toString()) ||
          asientosOcupadosIds.includes(asiento.numero) ||
          asientosOcupadosIds.includes(asiento.codigo);

        return {
          asiento,
          estado: estaOcupado ? "ocupado" : "libre",
        };
      });

      setMapaAsientos(mapaInicial);
    }
  }, [visible, funcion]);

  const toggleAsiento = (id: number) => {
    setMapaAsientos((prev) =>
      prev.map((item: any) => {
        if (item.asiento.id !== id || item.estado === "ocupado") return item;
        return {
          ...item,
          estado: item.estado === "elegido" ? "libre" : "elegido",
        };
      })
    );
  };

  const asientosElegidos = mapaAsientos.filter((a) => a.estado === "elegido");
  
  // El precio incrementa automáticamente $5 por cada asiento seleccionado
  const totalPagar = precioUnitario * asientosElegidos.length;

  const handleConfirmarReserva = () => {
    if (asientosElegidos.length === 0) {
      Alert.alert("Selección vacía", "Por favor selecciona al menos un asiento.");
      return;
    }

    const nuevaReserva = {
      id: Date.now().toString(),
      funcionId: (funcion as any).id,
      cantidad: asientosElegidos.length,
      asientos: asientosElegidos.map((a: any) => a.asiento.id.toString()),
      total: totalPagar,
      fechaReserva: new Date().toISOString(),
    };

    dispatch(addReserva(nuevaReserva));

    Alert.alert(
      "¡Reserva Confirmada! 🎟️",
      `Has reservado ${asientosElegidos.length} asiento(s) por un total de $${totalPagar.toFixed(2)}.`
    );
    onClose();
  };

  if (!funcion) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Reservar Asientos</Text>
          <Text style={styles.subtitle}>
            {peliculaActual?.nombre || "Película"} — ${precioUnitario.toFixed(2)} c/u
          </Text>

          <Text style={styles.sectionTitle}>PANTALLA DEL CINE 🎬</Text>
          <View style={styles.pantallaLine} />

          <ScrollView
            contentContainerStyle={styles.gridAsientos}
            showsVerticalScrollIndicator={false}
          >
            {mapaAsientos.map((item: any) => {
              const { id, numero } = item.asiento;
              const { estado } = item;

              let styleAsiento: ViewStyle = styles.asientoLibre;
              if (estado === "ocupado") styleAsiento = styles.asientoOcupado; // Rojo por defecto
              if (estado === "elegido") styleAsiento = styles.asientoElegido; // Amarillo al seleccionar

              return (
                <TouchableOpacity
                  key={id}
                  style={[styles.asiento, styleAsiento]}
                  disabled={estado === "ocupado"}
                  onPress={() => toggleAsiento(id)}
                >
                  <Text style={styles.asientoTexto}>{numero}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Sección de resumen con textos ajustados */}
          <View style={styles.resumenContainer}>
            <View style={styles.resumenCol}>
              <Text style={styles.resumenLabel}>Asientos:</Text>
              <Text style={styles.resumenValue} numberOfLines={1}>
                {asientosElegidos.length > 0
                  ? asientosElegidos.map((a: any) => a.asiento.numero).join(", ")
                  : "Ninguno"}
              </Text>
            </View>

            <View style={styles.resumenColRight}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>${totalPagar.toFixed(2)}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.btnPagar} onPress={handleConfirmarReserva}>
            <Text style={styles.btnPagarText}>Confirmar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnCancelar} onPress={onClose}>
            <Text style={styles.btnCancelarText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  container: {
    width: "92%",
    maxHeight: "85%",
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  title: {
    color: "#F8FAFC",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#64748B",
    fontSize: 11,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  pantallaLine: {
    height: 3,
    backgroundColor: "#38BDF8",
    borderRadius: 2,
    marginVertical: 8,
  },
  gridAsientos: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
  },
  asiento: {
    width: 42,
    height: 42,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  asientoLibre: {
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "#334155",
  },
  // Amarillo cuando se está seleccionando
  asientoElegido: {
    backgroundColor: "#EAB308",
  },
  // Rojo cuando ya fue seleccionado/reservado con anterioridad
  asientoOcupado: {
    backgroundColor: "#EF4444",
    opacity: 0.8,
  },
  asientoTexto: {
    color: "#F8FAFC",
    fontSize: 12,
    fontWeight: "bold",
  },
  resumenContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#1E293B",
  },
  resumenCol: {
    flex: 1,
    marginRight: 8,
  },
  resumenColRight: {
    alignItems: "flex-end",
  },
  resumenLabel: {
    color: "#94A3B8",
    fontSize: 13,
  },
  resumenValue: {
    color: "#F8FAFC",
    fontSize: 14,
    fontWeight: "600",
  },
  totalLabel: {
    color: "#38BDF8",
    fontSize: 13,
    fontWeight: "bold",
  },
  totalValue: {
    color: "#38BDF8",
    fontSize: 20,
    fontWeight: "bold",
  },
  btnPagar: {
    backgroundColor: "#38BDF8",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 4,
  },
  btnPagarText: {
    color: "#0F172A",
    fontWeight: "bold",
    fontSize: 15,
  },
  btnCancelar: {
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 4,
  },
  btnCancelarText: {
    color: "#94A3B8",
    fontSize: 13,
  },
});