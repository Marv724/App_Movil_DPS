import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Funcion } from "../../types/funcion";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addFuncion,
  updateFuncion,
  selectFuncion,
} from "../../redux/slices/funcionesSlice";

export const funcionIni: Funcion = {
  id: "",
  peliculaCodigo: "",
  salaId: "",
  fecha: "",
  hora: "",
};

export default function FormularioFuncion() {
  const dispatch = useAppDispatch();
  const [funcion, setFuncion] = useState<Funcion>(funcionIni);
  const [error, setError] = useState("");

  const funciones = useAppSelector((state) => state.funciones.funciones);
  const peliculas = useAppSelector((state) => state.peliculas.peliculas);
  const salas = useAppSelector((state) => state.salas.salas);
  const funcionSeleccionada = useAppSelector(
    (state) => state.funciones.funcionSeleccionada
  );

  useEffect(() => {
    if (funcionSeleccionada) {
      setFuncion(funcionSeleccionada);
    }
  }, [funcionSeleccionada]);

  const handleInputChange = (field: keyof Funcion, value: string) => {
    setFuncion({
      ...funcion,
      [field]: value,
    });
  };

  const guardarFunc = () => {
    setError("");

    if (!funcion.id.trim()) {
      setError("El ID es obligatorio");
      return;
    }
    if (!funcion.peliculaCodigo) {
      setError("El código de la película es obligatorio");
      return;
    }
    if (!funcion.salaId) {
      setError("Debe de seleccionar una sala");
      return;
    }
    if (!funcion.fecha.trim()) {
      setError("Debe de ingresar una fecha");
      return;
    }
    if (!funcion.hora.trim()) {
      setError("Debe de ingresar una hora");
      return;
    }

    const existID = funciones.some(
      (f) => f.id === funcion.id && f.id !== funcionSeleccionada?.id
    );
    if (existID) {
      setError("Ya existe una función con ese ID");
      return;
    }

    const ExistHorario = funciones.some(
      (f) =>
        f.id !== funcionSeleccionada?.id &&
        f.salaId === funcion.salaId &&
        f.fecha === funcion.fecha &&
        f.hora === funcion.hora
    );
    if (ExistHorario) {
      setError("Ya hay una función en esa sala en el mismo horario");
      return;
    }

    if (funcionSeleccionada) {
      dispatch(updateFuncion(funcion));
    } else {
      dispatch(addFuncion(funcion));
    }

    setFuncion(funcionIni);
    dispatch(selectFuncion(null));
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.titleHeader}>
        {funcionSeleccionada ? "Editar Función" : "Gestión de Funciones"}
      </Text>

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <View style={styles.formGroup}>
        <Text style={styles.label}>ID Función</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. FUNC-01"
          placeholderTextColor="#64748B"
          value={funcion.id}
          onChangeText={(text) => handleInputChange("id", text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Película</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={funcion.peliculaCodigo}
            dropdownIconColor="#38BDF8"
            style={styles.picker}
            onValueChange={(itemValue) =>
              handleInputChange("peliculaCodigo", itemValue)
            }
          >
            <Picker.Item label="Seleccione una película" value="" color="#94A3B8" />
            {peliculas.map((pelicula) => (
              <Picker.Item
                key={pelicula.codigo}
                label={`${pelicula.codigo} - ${pelicula.nombre}`}
                value={pelicula.codigo}
                color="#0F172A"
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Sala</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={funcion.salaId}
            dropdownIconColor="#38BDF8"
            style={styles.picker}
            onValueChange={(itemValue) => handleInputChange("salaId", itemValue)}
          >
            <Picker.Item label="Seleccione una sala" value="" color="#94A3B8" />
            {salas.map((sala) => (
              <Picker.Item
                key={sala.id}
                label={sala.nombre}
                value={sala.id}
                color="#0F172A"
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.label}>Fecha</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. YYYY-MM-DD"
            placeholderTextColor="#64748B"
            value={funcion.fecha}
            onChangeText={(text) => handleInputChange("fecha", text)}
          />
        </View>

        <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.label}>Hora</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. 18:30"
            placeholderTextColor="#64748B"
            value={funcion.hora}
            onChangeText={(text) => handleInputChange("hora", text)}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={guardarFunc} activeOpacity={0.8}>
        <Text style={styles.submitButtonText}>
          {funcionSeleccionada ? "Actualizar Función" : "Guardar Función"}
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