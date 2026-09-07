import React from "react";
import { View, StyleSheet } from "react-native";
import Dashboard from "../app/dashboard/Dashboard";

export default function DashBoardScreen() {
  return (
    <View style={styles.container}>
      <Dashboard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0F1D",
    width: "100%",
  },
});