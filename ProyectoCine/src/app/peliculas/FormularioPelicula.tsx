import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Pelicula } from "../../types/pelicula";
import { addPelicula, updatePelicula, selectPelicula } from "../../redux/slices/peliculaSlice";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch
} from "react-native";

export const PelisIni: Pelicula = {
  codigo: "",
  nombre: "",
  genero: "",
  duracion: 0,
  clasificacion: "",
  precio: 0,
  disponible: true,
};

export default function FormuPeli() {
  const [error, setError] = useState("");
  const [pelicula, setPelicula] = useState<Pelicula>(PelisIni);

  const dispatch = useAppDispatch();
  const peliSelect = useAppSelector(state => state.peliculas.peliculaSeleccionada);
  const peliculas = useAppSelector(state => state.peliculas.peliculas);

  useEffect(() => {
    if (peliSelect) {
      setPelicula(peliSelect);
    }
  }, [peliSelect]);

  const Guardarpeli = () => {
    const existe = peliculas.some(p => p.codigo === pelicula.codigo);

    if (!pelicula.nombre.trim()) {
      setError("El nombre de la película es obligatorio");
      return;
    }
    if (!pelicula.codigo.trim()) {
      setError("El código de la película es obligatorio");
      return;
    }
    if (!pelicula.genero.trim()) {
      setError("El género de la película es obligatorio");
      return;
    }
    if (pelicula.duracion <= 0) {
      setError("Debe de asignar tiempo a la película");
      return;
    }
    if (!pelicula.clasificacion.trim()) {
      setError("Debe de asignar clasificación a la película");
      return;
    }
    if (pelicula.precio <= 0) {
      setError("La película no es gratis, asignar precio");
      return;
    }
    if (!peliSelect && existe) {
      setError("Ya existe una película con el mismo código");
      return;
    }

    if (peliSelect) {
      dispatch(updatePelicula(pelicula));
    } else {
      dispatch(addPelicula(pelicula));
    }

    setError("");
    setPelicula(PelisIni);
    dispatch(selectPelicula(null));
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.titleHeader}>
        {peliSelect ? "Editar Película" : "Registro de Películas"}
      </Text>

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre de la película</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Inception"
          placeholderTextColor="#64748B"
          value={pelicula.nombre}
          onChangeText={(text) => setPelicula({ ...pelicula, nombre: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Código de la película</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. PEL-001"
          placeholderTextColor="#64748B"
          value={pelicula.codigo}
          onChangeText={(text) => setPelicula({ ...pelicula, codigo: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Género</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={pelicula.genero}
            dropdownIconColor="#38BDF8"
            style={styles.picker}
            onValueChange={(itemValue) => setPelicula({ ...pelicula, genero: itemValue })}
          >
            <Picker.Item label="Seleccione un género" value="" color="#94A3B8" />
            <Picker.Item label="Acción" value="Accion" color="#0F172A" />
            <Picker.Item label="Comedia" value="Comedia" color="#0F172A" />
            <Picker.Item label="Drama" value="Drama" color="#0F172A" />
            <Picker.Item label="Terror" value="Terror" color="#0F172A" />
            <Picker.Item label="Thriller" value="Thriller" color="#0F172A" />
            <Picker.Item label="Ciencia ficción" value="Ciencia ficcion" color="#0F172A" />
          </Picker>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.label}>Duración (min)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. 120"
            placeholderTextColor="#64748B"
            keyboardType="numeric"
            value={pelicula.duracion ? pelicula.duracion.toString() : ""}
            onChangeText={(text) =>
              setPelicula({ ...pelicula, duracion: Number(text) || 0 })
            }
          />
        </View>

        <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.label}>Precio ($)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. 5.50"
            placeholderTextColor="#64748B"
            keyboardType="numeric"
            value={pelicula.precio ? pelicula.precio.toString() : ""}
            onChangeText={(text) =>
              setPelicula({ ...pelicula, precio: Number(text) || 0 })
            }
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Clasificación</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={pelicula.clasificacion}
            dropdownIconColor="#38BDF8"
            style={styles.picker}
            onValueChange={(itemValue) =>
              setPelicula({ ...pelicula, clasificacion: itemValue })
            }
          >
            <Picker.Item label="Seleccione una clasificación" value="" color="#94A3B8" />
            <Picker.Item label="G - Todas las audiencias" value="G" color="#0F172A" />
            <Picker.Item label="PG - Guía Paternal Sugerida" value="PG" color="#0F172A" />
            <Picker.Item label="PG-13 - Guía Paternal Estricta" value="PG-13" color="#0F172A" />
            <Picker.Item label="NC-17 - Mayores de 17 años" value="NC-17" color="#0F172A" />
            <Picker.Item label="NR - No clasificada" value="NR" color="#0F172A" />
          </Picker>
        </View>
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.labelSwitch}>Disponible en cartelera</Text>
        <Switch
          trackColor={{ false: "#334155", true: "#0284C7" }}
          thumbColor={pelicula.disponible ? "#38BDF8" : "#94A3B8"}
          value={pelicula.disponible}
          onValueChange={(value) => setPelicula({ ...pelicula, disponible: value })}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={Guardarpeli} activeOpacity={0.8}>
        <Text style={styles.submitButtonText}>
          {peliSelect ? "Actualizar Película" : "Guardar Película"}
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