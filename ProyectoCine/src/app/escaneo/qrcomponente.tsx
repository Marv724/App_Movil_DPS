import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { Qrdisplay } from "./Qrmanejo";

interface Props {
  reservaid: string;
}

export const CreacionQr = ({ reservaid }: Props) => {
  const reserva = useAppSelector((state) =>
    state.reservas.reservas.find((r) => r.id === reservaid)
  );

  if (!reserva) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Reserva no encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Qrdisplay
        data={{
          id: reserva.id,
          funcionId: reserva.funcionId,
          asientos: reserva.asientos,
          total: reserva.total,
        }}
        label="Tu código QR de reserva"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 14,
  },
});