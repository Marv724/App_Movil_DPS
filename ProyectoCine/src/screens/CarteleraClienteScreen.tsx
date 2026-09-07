import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { useAppSelector } from "../redux/hooks";
import { Funcion } from "../types/funcion";
import ModalReserva from "../app/reservas/ModalReserva";

export default function CarteleraCliente() {
  const peliculas = useAppSelector((state) => state.peliculas.peliculas);
  const funciones = useAppSelector((state) => state.funciones.funciones);
  const salas = useAppSelector((state) => state.salas.salas);

  const [selectedFuncion, setSelectedFuncion] = useState<Funcion | null>(null);

  // Estados para los Filtros de Búsqueda
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenero, setSelectedGenero] = useState<string>("Todos");
  const [selectedSala, setSelectedSala] = useState<string>("Todas");
  const [maxPrecio, setMaxPrecio] = useState<string>("");

  // Extracción dinámica de géneros y salas disponibles para los chips
  const generosDisponibles = useMemo(() => {
    const generosSet = new Set<string>();
    peliculas.forEach((p) => {
      if (p.genero) generosSet.add(p.genero);
    });
    return ["Todos", ...Array.from(generosSet)];
  }, [peliculas]);

  const salasDisponibles = useMemo(() => {
    return ["Todas", ...salas.map((s) => s.nombre)];
  }, [salas]);

  // Lógica de Filtrado Principal
  const peliculasFiltradas = useMemo(() => {
    return peliculas.filter((pelicula) => {
      if (!pelicula.disponible) return false;

      // 1. Filtro por Nombre de Película
      const coincideNombre = pelicula.nombre
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // 2. Filtro por Género/Tipo
      const coincideGenero =
        selectedGenero === "Todos" || pelicula.genero === selectedGenero;

      // 3. Filtro por Precio/Costo Máximo
      const precioPeli = pelicula.precio ?? 5.0;
      const coincidePrecio =
        maxPrecio === "" || precioPeli <= parseFloat(maxPrecio || "0");

      // 4. Filtro por Tipo de Sala (Valida si la película tiene funciones en esa sala)
      const funcionesDePeli = funciones.filter((f: any) => {
        const pCodigo = f.peliculaCodigo || f.idPelicula || f.peliculaId;
        return (
          pCodigo?.toString().trim() === pelicula.codigo?.toString().trim() ||
          pCodigo === pelicula.nombre
        );
      });

      const coincideSala =
        selectedSala === "Todas" ||
        funcionesDePeli.some((func: any) => {
          const salaData = salas.find(
            (s: any) =>
              s.id === func.salaId ||
              s.nombre === func.salaId ||
              s.id === func.idSala
          );
          return salaData?.nombre === selectedSala;
        });

      return coincideNombre && coincideGenero && coincidePrecio && coincideSala;
    });
  }, [peliculas, funciones, salas, searchQuery, selectedGenero, selectedSala, maxPrecio]);

  const renderPeliculaItem = ({ item: pelicula }: { item: any }) => {
    // Filtrado de funciones asociadas
    const funcionesPeli = funciones.filter((f: any) => {
      const pCodigo = f.peliculaCodigo || f.idPelicula || f.peliculaId;
      const esMismaPeli =
        pCodigo?.toString().trim() === pelicula.codigo?.toString().trim() ||
        pCodigo === pelicula.nombre;

      if (!esMismaPeli) return false;

      // Si hay un filtro de sala activo, solo muestra los chips de esa sala
      if (selectedSala !== "Todas") {
        const salaData = salas.find(
          (s: any) =>
            s.id === f.salaId || s.nombre === f.salaId || s.id === f.idSala
        );
        return salaData?.nombre === selectedSala;
      }

      return true;
    });

    return (
      <View style={styles.card}>
        <Text style={styles.peliTitle}>{pelicula.nombre}</Text>
        <Text style={styles.peliDetail}>
          {pelicula.genero} • {pelicula.duracion} min • {pelicula.clasificacion}
        </Text>

        <Text style={styles.precioPeli}>
          Precio: ${pelicula.precio ? pelicula.precio.toFixed(2) : "5.00"}
        </Text>

        <Text style={styles.horariosHeader}>Horarios disponibles:</Text>
        <View style={styles.horariosGrid}>
          {funcionesPeli.length > 0 ? (
            funcionesPeli.map((func: any, index: number) => {
              const sala = salas.find(
                (s: any) =>
                  s.id === func.salaId ||
                  s.nombre === func.salaId ||
                  s.id === func.idSala
              );

              const horaMostrar =
                func.hora || func.horaInicio || func.horario || "18:00";

              return (
                <TouchableOpacity
                  key={func.id || index}
                  style={styles.horarioChip}
                  onPress={() => setSelectedFuncion(func)}
                >
                  <Text style={styles.horarioText}>{horaMostrar}</Text>
                  <Text style={styles.salaText}>
                    {sala?.nombre || func.salaId || "Sala"}
                  </Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={styles.noHorarios}>Sin funciones para esta sala</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* SECCIÓN DE BÚSQUEDA Y FILTROS */}
      <View style={styles.filterSection}>
        {/* Input Nombre y Precio */}
        <View style={styles.inputsRow}>
          <TextInput
            style={[styles.searchInput, { flex: 2 }]}
            placeholder="Buscar película..."
            placeholderTextColor="#64748B"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <TextInput
            style={[styles.searchInput, { flex: 1 }]}
            placeholder="Máx $"
            placeholderTextColor="#64748B"
            keyboardType="numeric"
            value={maxPrecio}
            onChangeText={setMaxPrecio}
          />
        </View>

        {/* Filtro por Tipo de Género */}
        <Text style={styles.filterLabel}>Género / Tipo:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
          {generosDisponibles.map((genero) => (
            <TouchableOpacity
              key={genero}
              style={[styles.chip, selectedGenero === genero && styles.chipActive]}
              onPress={() => setSelectedGenero(genero)}
            >
              <Text style={[styles.chipText, selectedGenero === genero && styles.chipTextActive]}>
                {genero}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Filtro por Tipo de Sala */}
        <Text style={styles.filterLabel}>Tipo de Sala:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
          {salasDisponibles.map((sala) => (
            <TouchableOpacity
              key={sala}
              style={[styles.chip, selectedSala === sala && styles.chipActive]}
              onPress={() => setSelectedSala(sala)}
            >
              <Text style={[styles.chipText, selectedSala === sala && styles.chipTextActive]}>
                {sala}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* LISTA DE RESULTADOS */}
      <FlatList
        data={peliculasFiltradas}
        keyExtractor={(item) => item.codigo}
        renderItem={renderPeliculaItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No se encontraron funciones con los filtros seleccionados.
            </Text>
          </View>
        }
      />

      <ModalReserva
        visible={selectedFuncion !== null}
        funcion={selectedFuncion}
        onClose={() => setSelectedFuncion(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F17",
    padding: 16,
  },
  filterSection: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  inputsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: "#1E293B",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: "#F8FAFC",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#334155",
  },
  filterLabel: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 4,
    textTransform: "uppercase",
  },
  chipsScroll: {
    flexDirection: "row",
    marginBottom: 6,
  },
  chip: {
    backgroundColor: "#1E293B",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 6,
    borderWidth: 1,
    borderColor: "#334155",
  },
  chipActive: {
    backgroundColor: "#38BDF8",
    borderColor: "#38BDF8",
  },
  chipText: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#0F172A",
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  peliTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F8FAFC",
  },
  peliDetail: {
    fontSize: 13,
    color: "#94A3B8",
    marginTop: 2,
  },
  precioPeli: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#38BDF8",
    marginTop: 4,
    marginBottom: 12,
  },
  horariosHeader: {
    fontSize: 12,
    color: "#64748B",
    textTransform: "uppercase",
    marginBottom: 8,
    fontWeight: "600",
  },
  horariosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  horarioChip: {
    backgroundColor: "#1E293B",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  horarioText: {
    color: "#38BDF8",
    fontWeight: "bold",
    fontSize: 13,
  },
  salaText: {
    color: "#94A3B8",
    fontSize: 11,
    marginTop: 2,
  },
  noHorarios: {
    color: "#64748B",
    fontSize: 13,
    fontStyle: "italic",
  },
  emptyContainer: {
    padding: 24,
    alignItems: "center",
  },
  emptyText: {
    color: "#94A3B8",
    textAlign: "center",
  },
});