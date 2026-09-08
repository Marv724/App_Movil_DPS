import React, { useState, useEffect } from "react";
import { Sala } from "../../types/sala";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addSala, updateSala, selectSala } from "../../redux/slices/salasSlice";
import { generarAsientos } from "../../helpers/generarAsiento";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export const SalaInicial: Sala = {
  id: "",
  nombre: "",
  tipo_butacas: "",
  filas: 0,
  columnas: 0,
  asientos: [],
};

export default function FormularioSala({ navigation }: any) {
  const dispatch = useAppDispatch();
  const [error, seterror] = useState("");
  const [sala, setSala] = useState<Sala>(SalaInicial);
  const salas = useAppSelector((state) => state.salas.salas);
  const salaSeleccionada = useAppSelector(
    (state) => state.salas.salaSeleccionada
  );

  useEffect(() => {
    if (salaSeleccionada) {
      setSala(salaSeleccionada);
    }
  }, [salaSeleccionada]);

  const handleChangeText = (name: keyof Sala, value: string) => {
    setSala({
      ...sala,
      [name]:
        name === "filas" || name === "columnas" ? Number(value) : value,
    });
  };

  const guardarSala = () => {
    seterror("");
    const existe = salas.some(
      (s) => s.id === sala.id && s.id !== salaSeleccionada?.id
    );

    if (!sala.id.trim()) {
      seterror("El ID de la sala es obligatorio.");
      return;
    }
    if (!sala.nombre.trim()) {
      seterror("El nombre de la sala es obligatorio.");
      return;
    }
    if (!sala.tipo_butacas.trim()) {
      seterror("Debe de seleccionar un tipo de butaca.");
      return;
    }
    if (sala.filas <= 0) {
      seterror("Debe de ingresar una cantidad válida de filas.");
      return;
    }
    if (existe) {
      seterror("Ya existe una sala con el mismo ID.");
      return;
    }

    const asientos =
      salaSeleccionada &&
      salaSeleccionada.filas === sala.filas &&
      salaSeleccionada.columnas === sala.columnas
        ? salaSeleccionada.asientos
        : generarAsientos(sala.filas, sala.columnas);

    if (salaSeleccionada) {
      dispatch(updateSala({ ...sala, asientos }));
    } else {
      dispatch(addSala({ ...sala, asientos }));
    }

    setSala(SalaInicial);
    dispatch(selectSala(null));
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.titleHeader}>
        {salaSeleccionada ? "Editar Sala" : "Registro de Salas"}
      </Text>

      {error !== "" && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.formGroup}>
        <Text style={styles.label}>ID de la Sala</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. SALA-01"
          placeholderTextColor="#64748B"
          value={sala.id}
          onChangeText={(text) => handleChangeText("id", text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre de la Sala</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Sala IMAX 3D"
          placeholderTextColor="#64748B"
          value={sala.nombre}
          onChangeText={(text) => handleChangeText("nombre", text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tipo de Butaca</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={sala.tipo_butacas}
            dropdownIconColor="#38BDF8"
            style={styles.picker}
            onValueChange={(value) => handleChangeText("tipo_butacas", value)}
          >
            <Picker.Item label="Seleccione un tipo de butaca" value="" color="#94A3B8" />
            <Picker.Item label="Tradicionales" value="Tradicionales" color="#0F172A" />
            <Picker.Item label="Exclusivas" value="Exclusivas" color="#0F172A" />
            <Picker.Item label="Experiencia 4D" value="Experiencia-4D" color="#0F172A" />
          </Picker>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.label}>Cantidad de Filas</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. 10"
            placeholderTextColor="#64748B"
            keyboardType="numeric"
            value={sala.filas ? String(sala.filas) : ""}
            onChangeText={(text) => handleChangeText("filas", text)}
          />
        </View>

        <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.label}>Cantidad de Columnas</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. 12"
            placeholderTextColor="#64748B"
            keyboardType="numeric"
            value={sala.columnas ? String(sala.columnas) : ""}
            onChangeText={(text) => handleChangeText("columnas", text)}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={guardarSala} activeOpacity={0.8}>
        <Text style={styles.submitButtonText}>
          {salaSeleccionada ? "Actualizar Sala" : "Guardar Sala"}
        </Text>
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
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingVertical: 4,
  },
  labelSwitch: {
    fontSize: 14,
    color: "#E2E8F0",
    fontWeight: "500",
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
  errorBox: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderWidth: 1,
    borderColor: "#EF4444",
    borderRadius: 8,
    padding: 10,
    marginBottom: 14,
  },
  errorText: {
    color: "#FCA5A5",
    fontSize: 13,
    textAlign: "center",
  },
});