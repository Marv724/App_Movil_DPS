import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  titulo: string;
  valor: string | number;
  fullWidth?: boolean;
}

export default function TargetaEsta({ titulo, valor, fullWidth = false }: Props) {
  return (
    <View style={[styles.card, fullWidth && styles.fullWidthCard]}>
      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.value} numberOfLines={1}>
        {valor}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1E293B",
    width: "48%",
    marginBottom: 12,
    justifyContent: "center",
  },
  fullWidthCard: {
    width: "100%",
  },
  title: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#38BDF8",
  },
});