import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Reserva } from "../../types/reserva";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addReserva, selectReserva } from "../../redux/slices/reservasSlice";

const reservaIni: Reserva = {
  id: "",
  funcionId: "",
  cantidad: 0,
  asientos: [],
  total: 0,
  fechaReserva: "",
};

export default function FormularioReserva() {
  const dispatch = useAppDispatch();

  const reservaSelec = useAppSelector(
    (state) => state.reservas.reservaSeleccionada
  );

  const funciones = useAppSelector((state) => state.funciones.funciones);

  const [reserva, setReserva] = useState<Reserva>(reservaIni);

  useEffect(() => {
    if (reservaSelec) {
      setReserva(reservaSelec);
    }
  }, [reservaSelec]);

  const guardar = () => {
    dispatch(addReserva(reserva));
    dispatch(selectReserva(null));
    setReserva(reservaIni);
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.titleHeader}>
        {reservaSelec ? "Editar Reserva" : "Gestión de Reserva"}
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Función</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={reserva.funcionId}
            dropdownIconColor="#38BDF8"
            style={styles.picker}
            onValueChange={(itemValue) =>
              setReserva({
                ...reserva,
                funcionId: itemValue,
              })
            }
          >
            <Picker.Item label="Seleccione una opción" value="" color="#94A3B8" />
            {funciones.map((funcion) => (
              <Picker.Item
                key={funcion.id}
                label={`Función: ${funcion.id}`}
                value={funcion.id}
                color="#0F172A"
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.label}>Cantidad</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#64748B"
            value={reserva.cantidad ? reserva.cantidad.toString() : ""}
            onChangeText={(text) =>
              setReserva({
                ...reserva,
                cantidad: Number(text) || 0,
              })
            }
          />
        </View>

        <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.label}>Total ($)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="0.00"
            placeholderTextColor="#64748B"
            value={reserva.total ? reserva.total.toString() : ""}
            onChangeText={(text) =>
              setReserva({
                ...reserva,
                total: Number(text) || 0,
              })
            }
          />
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={guardar} activeOpacity={0.8}>
        <Text style={styles.submitButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1E293B",
    marginBottom: 20,
  },
  titleHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F8FAFC",
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#1E293B",
    color: "#F8FAFC",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#334155",
  },
  pickerContainer: {
    backgroundColor: "#1E293B",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#334155",
    overflow: "hidden",
    justifyContent: "center",
  },
  picker: {
    color: "#F8FAFC",
  },
  submitButton: {
    backgroundColor: "#0284C7",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#38BDF8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});