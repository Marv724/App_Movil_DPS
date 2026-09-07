import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import TargetaEsta from "./TargetaEst";
import Cartelera from "./Cartelera";

export default function Dashboard() {
  const pelis = useAppSelector((state) => state.peliculas.peliculas);
  const funciones = useAppSelector((state) => state.funciones.funciones);
  const salas = useAppSelector((state) => state.salas.salas);
  const reservas = useAppSelector((state) => state.reservas.reservas);

  const totalPeliculas = pelis.length;
  const TotalFunciones = funciones.length;

  const boletosVend = reservas.reduce(
    (total, reserva) => total + reserva.cantidad,
    0
  );

  const asientosTots = salas.reduce(
    (total, sala) => total + (sala.asientos?.length || 0),
    0
  );

  const asientosOcup = reservas.reduce(
    (total, reserva) => total + (reserva.asientos?.length || 0),
    0
  );

  const asientosDisp = asientosTots - asientosOcup;

  const ingresos = reservas.reduce(
    (total, reserva) => total + reserva.total,
    0
  );

  const contadorPelis: Record<string, number> = {};

  reservas.forEach((reserva) => {
    const funcion = funciones.find((f) => f.id === reserva.funcionId);
    if (!funcion) return;

    contadorPelis[funcion.peliculaCodigo] =
      (contadorPelis[funcion.peliculaCodigo] ?? 0) + reserva.cantidad;
  });

  let peliculaMasReserv = "Sin reservas";
  let mayor = 0;

  Object.entries(contadorPelis).forEach(([codigo, cantidad]) => {
    if (cantidad > mayor) {
      mayor = cantidad;
      peliculaMasReserv =
        pelis.find((pelicula) => pelicula.codigo === codigo)?.nombre ??
        "Desconocida";
    }
  });

  const Resumen = (
    <View style={styles.dashboardContainer}>
      <Text style={styles.mainTitle}>Dashboard General</Text>
      <View style={styles.gridContainer}>
        <TargetaEsta titulo="Películas" valor={totalPeliculas} />
        <TargetaEsta titulo="Funciones" valor={TotalFunciones} />
        <TargetaEsta titulo="Boletos" valor={boletosVend} />
        <TargetaEsta titulo="Disponibles" valor={asientosDisp} />
        <TargetaEsta titulo="Ocupados" valor={asientosOcup} />
        <TargetaEsta titulo="Ingresos" valor={`$${ingresos.toFixed(2)}`} />
        <TargetaEsta titulo="Más Reservada" valor={peliculaMasReserv}  />
      </View>
    </View>
  );
  
  return <Cartelera ListHeaderComponent={Resumen} />;
}

const styles = StyleSheet.create({
  dashboardContainer: {
    paddingBottom: 10,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F8FAFC",
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});